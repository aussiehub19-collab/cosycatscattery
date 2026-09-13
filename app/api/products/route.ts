// app/api/products/route.ts - GET /api/products
import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS, SITE } from '@/config/site';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const q = searchParams.get('q')?.toLowerCase();
  const limit = Number(searchParams.get('limit')) || 0;

  let filtered = PRODUCTS;

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (q) {
    filtered = filtered.filter(
      p => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
    );
  }

  if (limit > 0) {
    filtered = filtered.slice(0, limit);
  }

  const responseData = filtered.map(p => ({
    ...p,
    currency: SITE.currency,
    url: `https://${SITE.domain}/shop/${p.slug}/`,
  }));

  return NextResponse.json(responseData, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
