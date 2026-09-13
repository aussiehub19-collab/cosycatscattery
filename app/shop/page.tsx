import type { Metadata } from 'next';
import { SITE, BRAND, PRODUCTS } from '@/config/site';
import JsonLd from '@/components/JsonLd';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: `Available Maine Coon Kittens & Royal Care | ${SITE.name}`,
  description: `Browse certified pedigree European and American Maine Coon kittens, solid timber castles, and nutrition complexes in Australia with 100% DNA health guarantee.`,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `Available Pedigree Maine Coon Kittens | ${SITE.name}`,
    description: `Adopt champion European and American XXL Maine Coon kittens in Australia. Free nationwide climate-controlled flight delivery.`,
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
    title: `Available Pedigree Maine Coon Kittens | ${SITE.name}`,
    description: `Adopt champion European and American XXL Maine Coon kittens in Australia.`,
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
