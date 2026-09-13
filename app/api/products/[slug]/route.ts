// app/api/products/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS, SITE } from '@/config/site';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found', slug },
      {
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return NextResponse.json(
    {
      ...product,
      currency: SITE.currency,
      url: `https://${SITE.domain}/shop/${product.slug}/`,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
