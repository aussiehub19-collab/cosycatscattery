import type { Metadata } from 'next';
import { SITE } from '@/config/site';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: `Contact ${SITE.name} | Maine Coon Enquiries Australia-Wide`,
  description: `Contact ${SITE.name} in Canberra for Maine Coon kitten enquiries. Nationwide flight delivery to Sydney, Melbourne, Brisbane, Perth, Adelaide & beyond.`,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `Contact ${SITE.name} | Maine Coon Enquiries Australia-Wide`,
    description: `Get in touch about Maine Coon kittens, pricing, and nationwide flight delivery from our Canberra cattery.`,
    url: `https://${SITE.domain}/contact/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact ${SITE.name} | Maine Coon Enquiries Australia-Wide`,
    description: `Maine Coon kitten enquiries, pricing, and nationwide delivery from Canberra.`,
  },
  alternates: {
    canonical: `https://${SITE.domain}/contact/`,
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
