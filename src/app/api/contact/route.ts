import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Contact form payload:', body);

    // TODO: Forward to n8n webhook
    // const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
    //   method: 'POST',
    //   body: JSON.stringify(body),
    // });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
