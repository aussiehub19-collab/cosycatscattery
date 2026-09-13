import { SITE } from '@/config/site';

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapEmail(eyebrow: string, heading: string, bodyHtml: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#0b1220;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b1220;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#0f172a;border-radius:16px;overflow:hidden;border:1px solid #1e293b;">
            <tr>
              <td style="background-color:#0b1220;border-bottom:2px solid #d4af37;padding:24px 32px;">
                <p style="margin:0;color:#d4af37;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(eyebrow)}</p>
                <p style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:bold;">${escapeHtml(SITE.name)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 20px;color:#ffffff;font-size:19px;font-weight:bold;">${escapeHtml(heading)}</h1>
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:#0b1220;padding:18px 32px;border-top:1px solid #1e293b;">
                <p style="margin:0;color:#64748b;font-size:11px;font-family:Arial,Helvetica,sans-serif;">
                  Sent automatically from the ${escapeHtml(SITE.name)} website (${escapeHtml(SITE.domain)}).
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function fieldRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:11px;font-family:Arial,Helvetica,sans-serif;text-transform:uppercase;letter-spacing:0.5px;width:150px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;border-bottom:1px solid #1e293b;color:#f1f5f9;font-size:14px;font-family:Arial,Helvetica,sans-serif;vertical-align:top;">${escapeHtml(value || '-')}</td>
  </tr>`;
}

export function contactEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  interest?: string;
  message: string;
}): string {
  const rows = [
    fieldRow('Name', data.name),
    fieldRow('Email', data.email),
    fieldRow('Phone', data.phone || ''),
    fieldRow('Location', data.location || ''),
    fieldRow('Interest', data.interest || ''),
  ].join('');

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${rows}
    </table>
    <p style="margin:0 0 8px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;">Message</p>
    <div style="background-color:#0b1220;border:1px solid #1e293b;border-radius:10px;padding:16px;color:#f1f5f9;font-size:14px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
    <p style="margin:20px 0 0;">
      <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background:linear-gradient(90deg,#f59e0b,#d97706);color:#0b1220;text-decoration:none;font-weight:bold;font-size:13px;padding:10px 20px;border-radius:8px;font-family:Arial,Helvetica,sans-serif;">Reply to ${escapeHtml(data.name)}</a>
    </p>`;

  return wrapEmail('New Cattery Inquiry', 'Contact Form Submission', body);
}

export function orderEmailHtml(data: {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  address?: string;
  paymentMethod?: string;
  notes?: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
}): string {
  const itemRows = data.items
    .map(
      i => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #1e293b;color:#f1f5f9;font-size:14px;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(i.name)} <span style="color:#64748b;">x${i.quantity}</span></td>
        <td align="right" style="padding:10px 0;border-bottom:1px solid #1e293b;color:#fbbf24;font-size:14px;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">$${(i.price * i.quantity).toLocaleString()} AUD</td>
      </tr>`
    )
    .join('');

  const rows = [
    fieldRow('Name', data.name),
    fieldRow('Email', data.email),
    fieldRow('Phone', data.phone),
    fieldRow('Delivery city', data.city || ''),
    fieldRow('Address', data.address || ''),
    fieldRow('Payment preference', data.paymentMethod || ''),
  ].join('');

  const body = `
    <div style="display:inline-block;background-color:#78350f;color:#fde68a;font-size:11px;font-weight:bold;letter-spacing:0.5px;padding:6px 12px;border-radius:999px;margin-bottom:16px;font-family:Arial,Helvetica,sans-serif;">ORDER ${escapeHtml(data.orderId)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${rows}
    </table>
    <p style="margin:0 0 8px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;">Items</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
      ${itemRows}
      <tr>
        <td style="padding:14px 0 0;color:#ffffff;font-size:15px;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">Total</td>
        <td align="right" style="padding:14px 0 0;color:#fbbf24;font-size:16px;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">$${data.subtotal.toLocaleString()} AUD</td>
      </tr>
    </table>
    ${
      data.notes
        ? `<p style="margin:16px 0 8px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;">Notes</p>
    <div style="background-color:#0b1220;border:1px solid #1e293b;border-radius:10px;padding:16px;color:#f1f5f9;font-size:14px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;white-space:pre-wrap;">${escapeHtml(data.notes)}</div>`
        : ''
    }
    <p style="margin:20px 0 0;">
      <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background:linear-gradient(90deg,#f59e0b,#d97706);color:#0b1220;text-decoration:none;font-weight:bold;font-size:13px;padding:10px 20px;border-radius:8px;font-family:Arial,Helvetica,sans-serif;">Reply to ${escapeHtml(data.name)}</a>
    </p>`;

  return wrapEmail('New Kitten Reservation', `Order ${data.orderId}`, body);
}
