// app/api/order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SITE } from '@/config/site';
import { sendMail, isMailerConfigured } from '@/lib/mailer';
import { orderEmailHtml } from '@/lib/emailTemplates';

export const dynamic = 'force-dynamic';

const CORS_HEADERS = { 'Access-Control-Allow-Origin': '*' };

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      city,
      address,
      paymentMethod,
      notes,
      items,
      subtotal,
      botcheck,
    }: {
      name: string;
      email: string;
      phone: string;
      city?: string;
      address?: string;
      paymentMethod?: string;
      notes?: string;
      items: OrderItem[];
      subtotal: number;
      botcheck?: string;
    } = body;

    if (botcheck) {
      return NextResponse.json({ success: true, orderId: 'MC-000000' }, { headers: CORS_HEADERS });
    }

    if (!name || !email || !phone || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Name, email, phone, and at least one item are required' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const orderId = `MC-${Math.floor(100000 + Math.random() * 900000)}`;
    const itemLines = items
      .map(i => `  - ${i.name} x${i.quantity} — $${(i.price * i.quantity).toLocaleString()} AUD`)
      .join('\n');

    if (!isMailerConfigured()) {
      console.error('Order submission received but email is not configured:', { orderId, name, email });
      return NextResponse.json(
        { success: false, message: 'Email is not configured yet — please contact us via WhatsApp instead.' },
        { status: 503, headers: CORS_HEADERS }
      );
    }

    await sendMail({
      subject: `New Kitten Reservation — ${orderId} — ${name} ($${subtotal?.toLocaleString() || '?'} AUD)`,
      replyTo: email,
      text: [
        `New order on ${SITE.name}`,
        '',
        `Order ID: ${orderId}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Delivery city: ${city || '-'}`,
        `Address: ${address || '-'}`,
        `Payment preference: ${paymentMethod || '-'}`,
        '',
        'Items:',
        itemLines,
        '',
        `Subtotal: $${subtotal?.toLocaleString() || '-'} AUD`,
        '',
        'Notes:',
        notes || '-',
      ].join('\n'),
      html: orderEmailHtml({ orderId, name, email, phone, city, address, paymentMethod, notes, items, subtotal }),
    });

    return NextResponse.json(
      { success: true, orderId, message: 'Your reservation has been received.' },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit your reservation. Please try again or contact us via WhatsApp.' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
