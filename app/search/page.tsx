import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SITE } from '@/config/site';
import JsonLd from '@/components/JsonLd';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: `Search Pedigree Kittens & Knowledge | ${SITE.name}`,
  description: `Search available European and American Maine Coon kittens, holistic feline nutrition, solid timber castles, and breed guides.`,
  alternates: {
    canonical: `https://${SITE.domain}/search/`,
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function SearchPage() {
  const schema = {
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
        name: 'Search',
        item: `https://${SITE.domain}/search/`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={schema} />
      <Suspense fallback={<div className="py-20 text-center text-slate-400 text-sm">Loading search directory...</div>}>
        <SearchClient />
      </Suspense>
    </>
  );
}
