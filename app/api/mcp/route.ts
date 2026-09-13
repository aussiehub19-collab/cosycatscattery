// app/api/mcp/route.ts - MCP Streamable HTTP Server
import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS, CATEGORIES, SHOP, SITE, BRAND, CONTACT } from '@/config/site';

export const dynamic = 'force-dynamic';

const tools = [
  {
    name: 'search_products',
    description: 'Search available Maine Coon kittens, castles, and nutrition by keyword, category, or max_price',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        category: { type: 'string' },
        max_price: { type: 'number' },
      },
    },
  },
  {
    name: 'get_product',
    description: 'Get full details for a specific kitten or care item by slug',
    inputSchema: {
      type: 'object',
      required: ['slug'],
      properties: {
        slug: { type: 'string' },
      },
    },
  },
  {
    name: 'list_categories',
    description: 'List all boutique categories and collections',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_policies',
    description: 'Get adoption guarantee, health screening, shipping, and payment policies',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'create_order_draft',
    description: 'Create prefilled kitten reservation order URL. Human completes — never captures payment.',
    inputSchema: {
      type: 'object',
      properties: {
        items: { type: 'array' },
        notes: { type: 'string' },
      },
    },
  },
];

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
    },
  });
}

export async function GET() {
  return NextResponse.json(
    {
      name: SITE.name,
      description: BRAND.description,
      tools: tools.map(t => ({ name: t.name, description: t.description })),
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { method, params, id = 1 } = body;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };

    if (method === 'initialize') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2025-03-26',
            serverInfo: {
              name: SITE.name,
              version: '1.0.0',
            },
            capabilities: {
              tools: {},
              resources: {},
            },
          },
        },
        { headers: corsHeaders }
      );
    }

    if (method === 'tools/list') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            tools,
          },
        },
        { headers: corsHeaders }
      );
    }

    if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};

      if (toolName === 'search_products') {
        const q = (args.query || '').toLowerCase();
        const cat = (args.category || '').toLowerCase();
        const maxPrice = Number(args.max_price) || Infinity;

        const results = PRODUCTS.filter(p => {
          const matchQuery = !q || p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q);
          const matchCat = !cat || cat === 'all' || p.category.toLowerCase() === cat;
          const matchPrice = p.price <= maxPrice;
          return matchQuery && matchCat && matchPrice;
        }).map(p => ({
          slug: p.slug,
          name: p.name,
          price: p.price,
          currency: SITE.currency,
          category: p.category,
          shortDescription: p.shortDescription,
          url: `https://${SITE.domain}/shop/${p.slug}/`,
        }));

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
            },
          },
          { headers: corsHeaders }
        );
      }

      if (toolName === 'get_product') {
        const product = PRODUCTS.find(p => p.slug === args.slug);
        if (!product) {
          return NextResponse.json(
            {
              jsonrpc: '2.0',
              id,
              error: { code: -32602, message: `Product with slug "${args.slug}" not found` },
            },
            { headers: corsHeaders, status: 404 }
          );
        }

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    {
                      ...product,
                      currency: SITE.currency,
                      url: `https://${SITE.domain}/shop/${product.slug}/`,
                    },
                    null,
                    2
                  ),
                },
              ],
            },
          },
          { headers: corsHeaders }
        );
      }

      if (toolName === 'list_categories') {
        const catList = CATEGORIES.map(c => ({
          ...c,
          productCount: PRODUCTS.filter(p => c.slug === 'all' || p.category === c.slug).length,
        }));

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: JSON.stringify(catList, null, 2) }],
            },
          },
          { headers: corsHeaders }
        );
      }

      if (toolName === 'get_policies') {
        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    {
                      healthGuarantee: '2-Year Genetic Health Warranty (HCM, SMA, PKDef negative certified parents)',
                      shipping: 'Free nationwide climate-controlled flight delivery across Australia',
                      payments: SHOP.paymentMethods,
                      minimumOrder: SHOP.minOrder,
                      registry: 'ANCATS and TICA Registered Breeder in Canberra',
                    },
                    null,
                    2
                  ),
                },
              ],
            },
          },
          { headers: corsHeaders }
        );
      }

      if (toolName === 'create_order_draft') {
        const items = Array.isArray(args.items) ? args.items : [];
        const draftUrl = `https://${SITE.domain}/contact/?draft=1`;
        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    draftUrl,
                    message: 'Draft order created. Human completes reservation.',
                    items,
                    notes: args.notes || '',
                  }),
                },
              ],
            },
          },
          { headers: corsHeaders }
        );
      }

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Tool "${toolName}" not found` },
        },
        { headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        error: { code: -32600, message: `Unsupported method: ${method}` },
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: { code: -32700, message: 'Parse error or invalid payload' },
      },
      { status: 400 }
    );
  }
}
