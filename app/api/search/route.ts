// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS, POSTS, SITE } from '@/config/site';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').toLowerCase().trim();

  if (!q) {
    return NextResponse.json(
      { products: [], posts: [], query: '' },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
        },
      }
    );
  }

  const matchedProducts = PRODUCTS.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  ).map(p => ({
    type: 'product',
    slug: p.slug,
    name: p.name,
    price: p.price,
    currency: SITE.currency,
    category: p.category,
    image: p.images[0],
    url: `https://${SITE.domain}/shop/${p.slug}/`,
  }));

  const matchedPosts = POSTS.filter(
    post =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
  ).map(post => ({
    type: 'post',
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    image: post.image,
    url: `https://${SITE.domain}/blog/${post.slug}/`,
  }));

  return NextResponse.json(
    {
      query: q,
      total: matchedProducts.length + matchedPosts.length,
      products: matchedProducts,
      posts: matchedPosts,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    }
  );
}
