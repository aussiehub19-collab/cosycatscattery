import type { Metadata } from 'next';
import { SITE } from '@/config/site';
import WholesaleClient from './WholesaleClient';

export const metadata: Metadata = {
  title: `Maine Coon Cat Tower Wholesale & Trade Supply | ${SITE.name}`,
  description: `Wholesale Maine Coon cat towers and holistic nutrition supply for Australian veterinary clinics, feline hotels, and catteries. Register a trade account.`,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `Wholesale Cat Tower & Cattery Supply | ${SITE.name}`,
    description: `Bulk Maine Coon cat furniture and nutrition supply for Australian trade partners — vet clinics, feline hotels, and catteries.`,
    url: `https://${SITE.domain}/wholesale/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Wholesale Cat Tower & Cattery Supply | ${SITE.name}`,
    description: `Bulk Maine Coon cat furniture and nutrition supply for Australian trade partners.`,
  },
  alternates: {
    canonical: `https://${SITE.domain}/wholesale/`,
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function WholesalePage() {
  return <WholesaleClient />;
}
