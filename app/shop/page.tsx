import type { Metadata } from 'next';
import { SITE, BRAND, PRODUCTS } from '@/config/site';
import JsonLd from '@/components/JsonLd';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: `Maine Coon Kittens for Sale Australia | ${SITE.name}`,
  description: `Browse available Maine Coon kittens for sale across Australia. DNA-tested, ANCATS registered, nationwide flight delivery from our Canberra cattery.`,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `Maine Coon Kittens for Sale Australia | ${SITE.name}`,
    description: `Browse available Maine Coon kittens for sale across Australia. DNA-tested, ANCATS registered, nationwide flight delivery.`,
    url: `https://${SITE.domain}/shop/`,
    images: [
      {
        url: `https://${SITE.domain}/images/hero/hero-1.webp`,
        width: 1920,
        height: 1280,
        alt: `${SITE.name} Available Kittens`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Maine Coon Kittens for Sale Australia | ${SITE.name}`,
    description: `Browse available Maine Coon kittens for sale across Australia.`,
    images: [`https://${SITE.domain}/images/hero/hero-1.webp`],
  },
  alternates: {
    canonical: `https://${SITE.domain}/shop/`,
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function ShopPage() {
  const shopSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${SITE.domain}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Available Kittens & Shop',
        item: `https://${SITE.domain}/shop/`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={shopSchema} />
      <ShopClient />
    </>
  );
}
