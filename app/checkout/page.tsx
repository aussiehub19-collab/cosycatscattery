import type { Metadata } from 'next';
import { SITE } from '@/config/site';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: `Checkout | ${SITE.name}`,
  robots: { index: false, follow: true },
  alternates: {
    canonical: `https://${SITE.domain}/checkout/`,
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
