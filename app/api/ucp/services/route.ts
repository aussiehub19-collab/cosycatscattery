// app/api/ucp/services/route.ts - Live UCP Services Endpoint
import { NextResponse } from 'next/server';
import { SITE, BRAND, SHOP, CONTACT } from '@/config/site';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = `https://${SITE.domain}`;
  return NextResponse.json(
    {
      ucp: '1.0',
      protocol_version: '1.0',
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
        api_catalog: `${baseUrl}/.well-known/api-catalog`,
      },
      currency: SITE.currency,
      minimum_order_usd: SHOP.minOrder,
      payment_methods: SHOP.paymentMethods,
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
