// src/ai/flows/summarize-meeting-minutes.ts
'use server';
/**
 * @fileOverview Summarizes council meeting minutes to highlight key decisions and actions.
 *
 * - summarizeMeetingMinutes - A function that handles the summarization process.
 * - SummarizeMeetingMinutesInput - The input type for the summarizeMeetingMinutes function.
 * - SummarizeMeetingMinutesOutput - The return type for the summarizeMeetingMinutes function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeMeetingMinutesInputSchema = z.object({
  minutes: z.string().describe('The minutes of the council meeting.'),
});
export type SummarizeMeetingMinutesInput = z.infer<typeof SummarizeMeetingMinutesInputSchema>;

const SummarizeMeetingMinutesOutputSchema = z.object({
  summary: z.string().describe('A summary of the key decisions and actions from the meeting.'),
});
export type SummarizeMeetingMinutesOutput = z.infer<typeof SummarizeMeetingMinutesOutputSchema>;

export async function summarizeMeetingMinutes(
  input: SummarizeMeetingMinutesInput
): Promise<SummarizeMeetingMinutesOutput> {
  return summarizeMeetingMinutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeMeetingMinutesPrompt',
  input: {
    schema: z.object({
      minutes: z.string().describe('The minutes of the council meeting.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A summary of the key decisions and actions from the meeting.'),
    }),
  },
  prompt: `You are an AI expert in summarizing meeting minutes.

  Please summarize the following council meeting minutes, highlighting key decisions and actions.

  Minutes: {{{minutes}}}`,
});

const summarizeMeetingMinutesFlow = ai.defineFlow<
  typeof SummarizeMeetingMinutesInputSchema,
  typeof SummarizeMeetingMinutesOutputSchema
>({
  name: 'summarizeMeetingMinutesFlow',
  inputSchema: SummarizeMeetingMinutesInputSchema,
  outputSchema: SummarizeMeetingMinutesOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
