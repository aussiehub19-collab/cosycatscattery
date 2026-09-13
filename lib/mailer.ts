import nodemailer from 'nodemailer';
import { SITE } from '@/config/site';

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASSWORD;
  if (!user || !pass) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    });
  }
  return transporter;
}

export function isMailerConfigured(): boolean {
  return Boolean(process.env.ZOHO_SMTP_USER && process.env.ZOHO_SMTP_PASSWORD);
}

export async function sendMail({
  subject,
  text,
  html,
  replyTo,
}: {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}): Promise<void> {
  const t = getTransporter();
  const to = process.env.ZOHO_SMTP_USER;
  if (!t || !to) {
    throw new Error('Email is not configured — set ZOHO_SMTP_USER and ZOHO_SMTP_PASSWORD in Vercel.');
  }
  await t.sendMail({
    from: `"${SITE.name} Website" <${to}>`,
    to,
    replyTo,
    subject,
    text,
    html,
  });
}
