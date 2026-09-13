// middleware.ts - Markdown content negotiation
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|fonts/|api/).*)'],
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

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const accept = request.headers.get('accept') || '';

  // If client prefers markdown over HTML, serve markdown representation or redirect to llms.txt / API
  if (prefersMarkdownOverHtml(accept)) {
    if (url.pathname === '/' || url.pathname === '') {
      return NextResponse.rewrite(new URL('/llms.txt', request.url));
    }
  }

  return NextResponse.next();
}
