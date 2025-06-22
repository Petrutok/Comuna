import {initializeApp, getApps, cert} from 'firebase-admin/app';
import {getMessaging} from 'firebase-admin/messaging';

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
);

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export async function POST(request: Request) {
  try {
    const {title, body} = await request.json();

    const message = {
      notification: {
        title,
        body,
      },
      topic: 'village-hub-updates', // Replace with your topic
    };

    await getMessaging().send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });

    return new Response(JSON.stringify({data: 'Notification sent successfully'}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Error sending notification:', error);
    return new Response(JSON.stringify({error: error.message}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}