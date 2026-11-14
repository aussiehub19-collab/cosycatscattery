import type { Metadata } from 'next';
import { SITE, BRAND, PRODUCTS } from '@/config/site';
import JsonLd from '@/components/JsonLd';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: `Buy Maine Coon Kittens Online — Available Now | ${SITE.name}`,
  description: `Browse our available Maine Coon kittens ready for adoption across Australia. DNA-tested, ANCATS registered, nationwide flight delivery from Canberra.`,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `Buy Maine Coon Kittens Online — Available Now | ${SITE.name}`,
    description: `Browse our available Maine Coon kittens ready for adoption across Australia. DNA-tested, ANCATS registered, nationwide flight delivery.`,
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
    title: `Buy Maine Coon Kittens Online | ${SITE.name}`,
    description: `Browse our available Maine Coon kittens ready for adoption across Australia.`,
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
  const shopSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `Buy Maine Coon Kittens — Available Now`,
      description: `Browse our available Maine Coon kittens ready for adoption across Australia. DNA-tested, ANCATS registered, nationwide flight delivery.`,
      url: `https://${SITE.domain}/shop/`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: PRODUCTS.length,
        itemListElement: PRODUCTS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `https://${SITE.domain}/shop/${p.slug}/`,
          name: p.name,
        })),
      },
    },
    {
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
    },
  ];

  return (
    <>
      <JsonLd schema={shopSchema} />
      <ShopClient />
    </>
  );
}
