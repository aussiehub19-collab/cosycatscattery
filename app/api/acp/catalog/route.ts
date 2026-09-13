// app/api/acp/catalog/route.ts - Live ACP Catalog Endpoint
import { NextResponse } from 'next/server';
import { PRODUCTS, CATEGORIES, SHOP, SITE } from '@/config/site';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      catalog: CATEGORIES.map(c => ({
        ...c,
        url: `https://${SITE.domain}/shop/`,
        products: PRODUCTS.filter(p => c.slug === 'all' || p.category === c.slug).map(p => ({
          slug: p.slug,
          name: p.name,
          price: p.price,
          currency: SITE.currency,
          url: `https://${SITE.domain}/shop/${p.slug}/`,
        })),
      })),
      currency: SITE.currency,
      minimumOrder: SHOP.minOrder,
      paymentMethods: SHOP.paymentMethods,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
        'Content-Type': 'application/json',
      },
    }
  );
}
