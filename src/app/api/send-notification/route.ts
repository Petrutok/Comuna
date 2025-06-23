import { NextRequest, NextResponse } from 'next/server';

const ONESIGNAL_APP_ID = 'e8eac05e-f36d-453c-a3ff-f5532c618786';
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY; // Adaugă în .env.local

interface NotificationPayload {
  title: string;
  message: string;
  url?: string;
  segment?: 'all' | 'subscribed';
  userIds?: string[];
}

export async function POST(request: NextRequest) {
  try {
    // Verifică API key-ul
    if (!ONESIGNAL_REST_API_KEY) {
      return NextResponse.json(
        { error: 'OneSignal API key nu este configurat' },
        { status: 500 }
      );
    }

    // Verifică autorizarea (opțional - adaugă propria logică de autentificare)
    const authHeader = request.headers.get('authorization');
    // if (!authHeader || !isValidAuth(authHeader)) {
    //   return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
    // }

    const body: NotificationPayload = await request.json();
    const { title, message, url, segment = 'all', userIds } = body;

    // Validare
    if (!title || !message) {
      return NextResponse.json(
        { error: 'Titlul și mesajul sunt obligatorii' },
        { status: 400 }
      );
    }

    // Construiește payload-ul pentru OneSignal
    const notificationData: any = {
      app_id: ONESIGNAL_APP_ID,
      headings: { en: title, ro: title },
      contents: { en: message, ro: message },
    };

    // Adaugă URL dacă există
    if (url) {
      notificationData.url = url;
      notificationData.web_url = url;
    }

    // Setează ținta notificării
    if (userIds && userIds.length > 0) {
      // Trimite către utilizatori specifici
      notificationData.include_external_user_ids = userIds;
    } else {
      // Trimite către toți subscriberii
      notificationData.included_segments = ['All'];
    }

    // Trimite notificarea către OneSignal
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify(notificationData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Eroare OneSignal:', result);
      return NextResponse.json(
        { error: 'Eroare la trimiterea notificării', details: result },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      notificationId: result.id,
      recipients: result.recipients,
    });
  } catch (error) {
    console.error('Eroare server:', error);
    return NextResponse.json(
      { error: 'Eroare internă a serverului' },
      { status: 500 }
    );
  }
}

// Endpoint pentru a obține statistici despre notificări
export async function GET(request: NextRequest) {
  try {
    if (!ONESIGNAL_REST_API_KEY) {
      return NextResponse.json(
        { error: 'OneSignal API key nu este configurat' },
        { status: 500 }
      );
    }

    // Obține statistici despre aplicație
    const response = await fetch(
      `https://onesignal.com/api/v1/apps/${ONESIGNAL_APP_ID}`,
      {
        headers: {
          'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Eroare la obținerea statisticilor');
    }

    const data = await response.json();

    return NextResponse.json({
      totalSubscribers: data.players || 0,
      messagablePlayers: data.messagable_players || 0,
    });
  } catch (error) {
    console.error('Eroare:', error);
    return NextResponse.json(
      { error: 'Eroare la obținerea statisticilor' },
      { status: 500 }
    );
  }
}