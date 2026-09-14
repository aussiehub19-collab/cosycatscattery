// app/.well-known/api-catalog/route.ts
import { NextResponse } from 'next/server';
import { SITE } from '@/config/site';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = `https://${SITE.domain}`;

  const data = {
    linkset: [
      {
        anchor: `${baseUrl}/`,
        'https://www.iana.org/assignments/link-relations/service-doc': [{ href: `${baseUrl}/faq/` }],
        title: `${SITE.name} — ${SITE.tagline}`,
      },
      { anchor: `${baseUrl}/shop/`, type: 'text/html', title: `${SITE.name} Catalog` },
      { anchor: `${baseUrl}/about/`, type: 'text/html', title: `${SITE.name} Pedigree Heritage` },
      { anchor: `${baseUrl}/api/products`, type: 'application/json', title: `${SITE.name} Products API` },
      { anchor: `${baseUrl}/api/categories`, type: 'application/json', title: `${SITE.name} Categories API` },
      { anchor: `${baseUrl}/api/search`, type: 'application/json', title: `${SITE.name} Search API` },
      {
        anchor: `${baseUrl}/api/mcp`,
        type: 'application/json',
        'https://www.iana.org/assignments/link-relations/service-desc': [
          { href: `${baseUrl}/.well-known/mcp/server-card.json` },
        ],
        title: `${SITE.name} MCP Server`,
      },
    ],
  };

  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/linkset+json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
