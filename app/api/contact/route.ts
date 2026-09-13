// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CONTACT } from '@/config/site';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, subject } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // In a live environment with RESEND_API_KEY, we could send via Resend.
    // By default, we acknowledge and log safely.
    console.log(`📨 Received adoption contact from ${name} (${email}): ${subject || 'Enquiry'}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been received by our Canberra concierge.',
        recipient: CONTACT.email,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process contact request' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
