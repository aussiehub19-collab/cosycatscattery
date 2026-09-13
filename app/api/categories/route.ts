// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { CATEGORIES, PRODUCTS, SITE } from '@/config/site';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = CATEGORIES.map(c => ({
    ...c,
    url: `https://${SITE.domain}/shop/`,
    productCount: PRODUCTS.filter(p => c.slug === 'all' || p.category === c.slug).length,
  }));

  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
