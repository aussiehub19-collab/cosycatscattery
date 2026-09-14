// app/.well-known/ucp/route.ts
import { NextResponse } from 'next/server';
import { SITE, BRAND, SHOP } from '@/config/site';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = `https://${SITE.domain}`;

  const data = {
    ucp: '1.0',
    protocol_version: '1.0',
    spec: 'https://ucp.dev/specification/overview/',
    schema: 'https://ucp.dev/schema/v1.json',
    site: baseUrl,
    name: SITE.name,
    description: BRAND.description,
    services: [
      { id: 'product-catalog', type: 'catalog', url: `${baseUrl}/shop/`, description: 'Full Maine Coon boutique catalog' },
      { id: 'mcp-server', type: 'mcp', url: `${baseUrl}/api/mcp`, description: 'MCP Streamable HTTP server' },
      { id: 'order', type: 'commerce', url: `${baseUrl}/contact/`, description: 'Place kitten reservation or enquiry' },
    ],
    capabilities: ['browse', 'search', 'inquiry', 'content', 'mcp'],
    endpoints: {
      mcp: `${baseUrl}/api/mcp`,
      catalog: `${baseUrl}/shop/`,
      contact: `${baseUrl}/contact/`,
      agent_skills: `${baseUrl}/.well-known/agent-skills/index.json`,
      mcp_server_card: `${baseUrl}/.well-known/mcp/server-card.json`,
      api_catalog: `${baseUrl}/.well-known/api-catalog`,
      llms_txt: `${baseUrl}/llms.txt`,
    },
    currency: SITE.currency,
    minimum_order_usd: SHOP.minOrder,
    payment_methods: SHOP.paymentMethods,
    legal: {
      age_restriction: 'none',
      product_type: 'Pedigree Maine Coon Cats & Care',
      compliance: 'ANCATS Registered Pedigree Standards',
    },
  };

  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
