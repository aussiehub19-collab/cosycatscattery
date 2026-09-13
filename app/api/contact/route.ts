// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SITE } from '@/config/site';
import { sendMail, isMailerConfigured } from '@/lib/mailer';
import { contactEmailHtml } from '@/lib/emailTemplates';

export const dynamic = 'force-dynamic';

const CORS_HEADERS = { 'Access-Control-Allow-Origin': '*' };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, location, interest, message, botcheck } = body;

    // Honeypot — a real visitor never fills this hidden field.
    if (botcheck) {
      return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (!isMailerConfigured()) {
      console.error('Contact form submission received but email is not configured:', { name, email });
      return NextResponse.json(
        { success: false, message: 'Email is not configured yet — please contact us via WhatsApp instead.' },
        { status: 503, headers: CORS_HEADERS }
      );
    }

    await sendMail({
      subject: `New Cattery Inquiry — ${name}`,
      replyTo: email,
      text: [
        `New contact form submission on ${SITE.name}`,
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '-'}`,
        `Location: ${location || '-'}`,
        `Interest: ${interest || '-'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: contactEmailHtml({ name, email, phone, location, interest, message }),
    });

    return NextResponse.json(
      { success: true, message: 'Your enquiry has been received by our Canberra concierge.' },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send your enquiry. Please try again or contact us via WhatsApp.' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
