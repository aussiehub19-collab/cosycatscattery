// scripts/gen-agent-files.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function run() {
  const siteConfigModule = await import('../src/config/site.js');
  const { SITE, CONTACT, SHOP, BRAND, CATEGORIES, PRODUCTS, FORMS, FAQ } = siteConfigModule;
  const domain = SITE.domain || 'DOMAIN.com';
  const proto = 'https';
  const baseUrl = `${proto}://${domain}`;

  // Ensure public dirs exist
  const publicDir = path.join(rootDir, 'public');
  const wellKnownDir = path.join(publicDir, '.well-known');
  const agentSkillsDir = path.join(wellKnownDir, 'agent-skills');
  const mcpDir = path.join(wellKnownDir, 'mcp');
  const jsDir = path.join(publicDir, 'js');

  [publicDir, wellKnownDir, agentSkillsDir, mcpDir, jsDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // 1. vercel.json
  const vercelJson = {
    $schema: 'https://openapi.vercel.sh/vercel.json',
    trailingSlash: true,
    redirects: [
      {
        source: '/:path*',
        has: [{ type: 'host', value: `www.${domain}` }],
        destination: `https://${domain}/:path*`,
        permanent: true,
      },
    ],
    headers: [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          {
            key: 'Content-Security-Policy',
            // script-src keeps 'unsafe-inline' because Next.js App Router bootstraps
            // hydration via inline scripts with no nonce configured — everything else
            // is scoped to only the hosts this site actually calls.
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.web3forms.com; font-src 'self' data:;",
          },
          {
            key: 'Link',
            value:
              '</.well-known/api-catalog>; rel="api-catalog", </.well-known/agent-skills/index.json>; rel="describedby", </llms.txt>; rel="describedby", </.well-known/mcp/server-card.json>; rel="service-desc", </auth.md>; rel="auth", </.well-known/openid-configuration>; rel="openid-configuration", </.well-known/ai-catalog.json>; rel="ai-catalog"',
          },
        ],
      },
      {
        // api-catalog, ucp, oauth-protected-resource, oauth-authorization-server,
        // openid-configuration and ai-catalog.json are Next.js Route Handlers
        // (app/.well-known/**/route.ts) — they set their own Content-Type directly
        // because extensionless static files in public/ were being served as
        // application/octet-stream on Vercel regardless of these header rules.
        source: '/.well-known/agent-skills/index.json',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/.well-known/mcp/server-card.json',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/.well-known/acp.json',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/auth.md',
        headers: [
          { key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/:path*.md',
        headers: [{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' }],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Accept, Mcp-Session-Id' },
        ],
      },
    ],
  };
  fs.writeFileSync(path.join(rootDir, 'vercel.json'), JSON.stringify(vercelJson, null, 2));

  // 2. public/robots.txt
  const robotsTxt = `User-agent: *
Disallow: /thank-you-contact/
Disallow: /thank-you-order/
Disallow: /thank-you-wholesale/
Disallow: /checkout/
Sitemap: ${baseUrl}/sitemap.xml
Agentmap: ${baseUrl}/.well-known/ai-catalog.json

Content-Signal: search=yes, ai-input=yes, ai-train=no

# AI crawlers — welcome to index product and content pages
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: cohere-ai
Allow: /

# Agent-readable resources
# llms.txt: ${baseUrl}/llms.txt
# API Catalog: ${baseUrl}/.well-known/api-catalog
# Agent Skills: ${baseUrl}/.well-known/agent-skills/index.json
# MCP Server Card: ${baseUrl}/.well-known/mcp/server-card.json
# ARD Capability Manifest: ${baseUrl}/.well-known/ai-catalog.json
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt.trim() + '\n');

  // 3. public/llms.txt
  const llmsTxt = `# ${SITE.name}

> ${SITE.tagline}

${BRAND.description}

## About & Ethical Pedigree Standards
- Location: ${CONTACT.hq}
- Founding Year: ${BRAND.foundingYear}
- Registry: ANCATS & TICA Registered Lineage
- DNA Screening: 100% Negative/Clear for HCM, SMA, PKDef, and PKD
- Delivery: VIP Climate-Controlled Flight & Courier Delivery Nationwide across Australia

## Boutique Catalog & Offerings
- [All Available Kittens & Royalty Catalog](${baseUrl}/shop/): Pedigree European & American Maine Coon kittens, solid timber chateaus, and grooming suites.
- [About the Cattery & Bloodlines](${baseUrl}/about/): Heritage breeding, DNA protocols, and sensory nursery standards.
- [Feline Knowledge & Breed Guides](${baseUrl}/blog/): Guides on Maine Coon nutrition, polydactyl traits, and genetic screenings.
- [Frequently Asked Questions](${baseUrl}/faq/): Kitten reservation process, interstate flight travel, and health guarantees.
- [Contact Concierge](${baseUrl}/contact/): Apply for adoption or schedule private Canberra consultation.
- [Boutique Search](${baseUrl}/search/): Live search across kittens, care items, and feline care articles.

## Payment & Reservation Terms
- Accepted Methods: Direct Australian Bank Transfer (EFT) and instant PayID.
- Order Rule: Human-in-the-loop reservation with verified adoption contract.
- Shipping: Flat-rate/Free nationwide temperature-controlled VIP flight travel.

## Optional & Agent Interfaces
- [RFC 9727 API Catalog](${baseUrl}/.well-known/api-catalog): Discovered REST & MCP services.
- [Agent Skills Registry](${baseUrl}/.well-known/agent-skills/index.json): High-level task execution capabilities.
- [Model Context Protocol Server Card](${baseUrl}/.well-known/mcp/server-card.json): Live MCP Streamable HTTP endpoint.
- [Authentication Policy](${baseUrl}/auth.md): Public read-only resource accessibility.
`;
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt.trim() + '\n');

  // 4. public/auth.md (MUST start with exactly "# Auth.md")
  const authMd = `# Auth.md

## Site: ${SITE.name} — Luxury Maine Coon Cattery & Boutique

## Agent Registration
No authentication required. All resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product & Kitten Catalog | ${baseUrl}/shop/ |
| Knowledge Blog | ${baseUrl}/blog/ |
| FAQ & Health Guides | ${baseUrl}/faq/ |
| About & Pedigree Standards | ${baseUrl}/about/ |

## Authentication

\`\`\`json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
\`\`\`

## Ordering
Human-in-the-loop required. Agents may browse catalog items and prepare order/enquiry drafts.
Final kitten adoptions and payments are completed by human verification via direct bank transfer or PayID.
`;
  fs.writeFileSync(path.join(publicDir, 'auth.md'), authMd.trim() + '\n');

  // 5. /.well-known/api-catalog is served by app/.well-known/api-catalog/route.ts

  // 6. public/.well-known/agent-skills/index.json
  const agentSkills = {
    $schema: 'https://agentskills.io/schema/v0.2.0/index.json',
    name: SITE.name,
    url: baseUrl,
    description: SITE.tagline,
    skills: [
      {
        name: 'search-products',
        type: 'commerce',
        description: 'Search available Maine Coon kittens, castles, and nutrition by keyword or price',
        url: `${baseUrl}/api/mcp`,
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      },
      {
        name: 'browse-catalog',
        type: 'navigation',
        description: 'Browse the full luxury Maine Coon catalog and available kittens',
        url: `${baseUrl}/shop/`,
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      },
      {
        name: 'order-draft',
        type: 'commerce',
        description: 'Create a prefilled kitten reservation or care draft. Human completes adoption.',
        url: `${baseUrl}/api/mcp`,
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      },
      {
        name: 'product-education',
        type: 'content',
        description: 'Educational articles on Maine Coon genetics, nutrition, and care',
        url: `${baseUrl}/blog/`,
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      },
      {
        name: 'contact',
        type: 'support',
        description: 'Contact Canberra cattery concierge for adoption enquiries',
        url: `${baseUrl}/contact/`,
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      },
    ],
  };
  fs.writeFileSync(path.join(agentSkillsDir, 'index.json'), JSON.stringify(agentSkills, null, 2));

  // 7. public/.well-known/mcp/server-card.json
  const serverCard = {
    $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
    serverInfo: {
      name: SITE.name,
      version: '1.0.0',
      description: BRAND.description,
      homepage: baseUrl,
      contact: {
        email: CONTACT.rawEmail,
        whatsapp: CONTACT.whatsapp,
      },
    },
    transport: {
      type: 'streamable-http',
      endpoint: `${baseUrl}/api/mcp`,
    },
    capabilities: {
      tools: [
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
      ],
      resources: [
        {
          name: 'product-catalog',
          description: 'Full Maine Coon boutique catalog',
          uri: `${baseUrl}/shop/`,
        },
        {
          name: 'blog',
          description: 'Educational Maine Coon care articles',
          uri: `${baseUrl}/blog/`,
        },
        {
          name: 'faq',
          description: 'Adoption and health screening FAQ',
          uri: `${baseUrl}/faq/`,
        },
      ],
      commerce: {
        ordering: 'human-assisted-order-form',
        payment: SHOP.paymentMethods,
        currency: SITE.currency,
        minimumOrder: SHOP.minOrder,
        freeShipping: 'Free nationwide climate-controlled flight delivery',
      },
    },
    legal: {
      ageRestriction: 'none',
      productType: 'Pedigree Feline Companions & Care',
      compliance: 'ANCATS & TICA Certified Pedigree Standards',
    },
  };
  fs.writeFileSync(path.join(mcpDir, 'server-card.json'), JSON.stringify(serverCard, null, 2));

  // 8. /.well-known/oauth-protected-resource is served by
  //    app/.well-known/oauth-protected-resource/route.ts

  // 9. /.well-known/oauth-authorization-server is served by
  //    app/.well-known/oauth-authorization-server/route.ts

  // 10. /.well-known/openid-configuration is served by
  //     app/.well-known/openid-configuration/route.ts

  // 11. public/.well-known/acp.json
  const acpJson = {
    protocol: { name: 'acp', version: '0.1.0' },
    name: SITE.name,
    description: BRAND.description,
    api_base_url: baseUrl,
    homepage: baseUrl,
    transports: ['https'],
    capabilities: {
      services: ['product-catalog', 'blog', 'faq', 'mcp-server'],
      ordering: 'human-assisted',
      payment_methods: SHOP.paymentMethods,
      currency: SITE.currency,
      minimum_order_usd: SHOP.minOrder,
      free_shipping_threshold_usd: SHOP.freeShippingThreshold,
    },
    contact: {
      whatsapp: `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`,
      email: CONTACT.rawEmail,
    },
    legal: {
      age_restriction: 'none',
      region: 'Australia',
      ships_to: 'Australia-wide (All States & Territories)',
      product_type: 'Pedigree Maine Coon Cats & Luxury Feline Care',
      compliance: 'ANCATS Registered Ethical Breeder Standards',
    },
  };
  fs.writeFileSync(path.join(wellKnownDir, 'acp.json'), JSON.stringify(acpJson, null, 2));

  // 12. /.well-known/ucp is served by app/.well-known/ucp/route.ts

  // 13. public/js/webmcp.js
  const webmcpJs = `(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search ${SITE.name} available kittens, castles, and nutrition by keyword or price",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
            category: { type: "string" },
            max_price: { type: "number" }
          }
        },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(\`${baseUrl}/api/search?\${params}\`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse kittens and products by collection",
        inputSchema: {
          type: "object",
          properties: { category: { type: "string" } }
        },
        execute: async ({ category }) => {
          const url = \`${baseUrl}/shop/\`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "contact",
        description: "Contact ${SITE.name} concierge for kitten adoption questions",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`${baseUrl}/contact/\`;
          return { url: \`${baseUrl}/contact/\` };
        }
      }
    ]
  });
})();
`;
  fs.writeFileSync(path.join(jsDir, 'webmcp.js'), webmcpJs);

  // 14. IndexNow key file
  if (SITE.indexNowKey) {
    fs.writeFileSync(path.join(publicDir, `${SITE.indexNowKey}.txt`), SITE.indexNowKey);
  }

  console.log('✅ Generated all agent-ready files from SITE.domain in src/config/site.js');
}

run().catch(err => {
  console.error('❌ Error generating agent files:', err);
  process.exit(1);
});
