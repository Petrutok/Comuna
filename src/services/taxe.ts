/**
 * Represents a document with a title and URL.
 */
export interface Document {
  /**
   * The title of the document.
   */
  title: string;
  /**
   * The URL where the document can be accessed.
   */
  url: string;
}

/**
 * Asynchronously retrieves a list of essential documents.
 *
 * @returns A promise that resolves to an array of Document objects.
 */
export async function getDocuments(): Promise<Document[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      title: 'Permit Application Form',
      url: 'https://example.com/permit-form.pdf',
    },
    {
      title: 'Village History',
      url: 'https://example.com/village-history.pdf',
    },
  ];
}
