// middleware.ts - Markdown content negotiation
// Spec: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
import { NextRequest, NextResponse } from 'next/server';
import { SITE, BRAND, PRODUCTS, POSTS, FAQ } from '@/config/site';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|fonts/|api/|\\.well-known/).*)'],
};

function prefersMarkdownOverHtml(accept: string): boolean {
  let mdQ = -1;
  let htmlQ = -1;
  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().split(';').map(s => s.trim());
    let q = 1;
    for (const p of params) {
      const m = /^q=([\d.]+)$/.exec(p);
      if (m) q = parseFloat(m[1]);
    }
    if (type === 'text/markdown') mdQ = Math.max(mdQ, q);
    if (type === 'text/html') htmlQ = Math.max(htmlQ, q);
  }
  return mdQ > -1 && mdQ > htmlQ;
}

function toMarkdown(pathname: string): string | null {
  const baseUrl = `https://${SITE.domain}`;
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '' || clean === '/') {
    return `# ${SITE.name}\n\n> ${SITE.tagline}\n\n${BRAND.description}\n\n## Available Kittens\n\n${PRODUCTS.filter(p => p.category === 'kittens').map(p => `- [${p.name}](${baseUrl}/shop/${p.slug}/) — $${p.price.toLocaleString()} ${SITE.currency}`).join('\n')}\n\n## Learn More\n\n- [Full Catalog](${baseUrl}/shop/)\n- [Breed Guides & Care Articles](${baseUrl}/blog/)\n- [FAQ](${baseUrl}/faq/)\n- [About](${baseUrl}/about/)\n- [Contact](${baseUrl}/contact/)\n`;
  }

  if (clean === '/blog') {
    return `# ${SITE.name} — Breed Guides & Care Articles\n\n${POSTS.map(p => `- [${p.title}](${baseUrl}/blog/${p.slug}/) — ${p.excerpt}`).join('\n')}\n`;
  }

  const blogMatch = clean.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const post = POSTS.find(p => p.slug === blogMatch[1]);
    if (post) return `# ${post.title}\n\n${post.excerpt}\n\n${post.content.trim()}\n`;
  }

  if (clean === '/shop') {
    return `# ${SITE.name} — Full Catalog\n\n${PRODUCTS.map(p => `- [${p.name}](${baseUrl}/shop/${p.slug}/) — $${p.price.toLocaleString()} ${SITE.currency}. ${p.shortDescription}`).join('\n')}\n`;
  }

  const shopMatch = clean.match(/^\/shop\/([^/]+)$/);
  if (shopMatch) {
    const product = PRODUCTS.find(p => p.slug === shopMatch[1]);
    if (product) {
      const spec = product.specs ? Object.entries(product.specs).map(([k, v]) => `- **${k}:** ${v}`).join('\n') : '';
      return `# ${product.name}\n\n$${product.price.toLocaleString()} ${SITE.currency}\n\n${product.description}\n\n${spec}\n`;
    }
  }

  if (clean === '/faq') {
    return `# ${SITE.name} — Frequently Asked Questions\n\n${FAQ.map(f => `**${f.question}**\n${f.answer}`).join('\n\n')}\n`;
  }

  if (clean === '/about') {
    return `# About ${SITE.name}\n\n${BRAND.description}\n\nFounded ${BRAND.foundingYear} in ${BRAND.foundingLocation}.\n`;
  }

  return null;
}

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const accept = request.headers.get('accept') || '';

  if (prefersMarkdownOverHtml(accept)) {
    const markdown = toMarkdown(url.pathname);
    if (markdown) {
      const tokenEstimate = Math.ceil(markdown.length / 4);
      const response = new NextResponse(markdown, { status: 200 });
      response.headers.set('Content-Type', 'text/markdown; charset=utf-8');
      response.headers.set('x-markdown-tokens', String(tokenEstimate));
      return response;
    }
  }

  return NextResponse.next();
}
