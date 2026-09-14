// app/.well-known/ai-catalog.json/route.ts — Agentic Resource Discovery (ARD) manifest
// Spec: https://agenticresourcediscovery.org/ — data model: https://github.com/Agent-Card/ai-catalog
import { NextResponse } from 'next/server';
import { SITE } from '@/config/site';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = `https://${SITE.domain}`;

  const data = {
    specVersion: '1.0',
    host: {
      displayName: SITE.name,
      identifier: `did:web:${SITE.domain}`,
    },
    entries: [
      {
        identifier: `urn:air:${SITE.domain}:server:mcp`,
        displayName: `${SITE.name} MCP Server`,
        type: 'application/mcp-server-card+json',
        url: `${baseUrl}/.well-known/mcp/server-card.json`,
        representativeQueries: [
          'find available maine coon kittens for sale',
          'what maine coon colours do you have available',
          'how much does a maine coon kitten cost',
        ],
      },
      {
        identifier: `urn:air:${SITE.domain}:api:products`,
        displayName: `${SITE.name} Product Catalog API`,
        type: 'application/json',
        url: `${baseUrl}/api/products`,
        representativeQueries: [
          'list all maine coon kittens currently available',
          'search kittens by price or colour',
        ],
      },
      {
        identifier: `urn:air:${SITE.domain}:content:blog`,
        displayName: 'Maine Coon Breed Guides & Care Articles',
        type: 'text/html',
        url: `${baseUrl}/blog/`,
        representativeQueries: [
          'how big do maine coons get',
          'are maine coons good family pets',
          'maine coon grooming guide',
        ],
      },
    ],
  };

  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
