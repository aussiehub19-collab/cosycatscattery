// app/.well-known/oauth-authorization-server/route.ts
import { NextResponse } from 'next/server';
import { SITE } from '@/config/site';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = `https://${SITE.domain}`;

  const data = {
    issuer: baseUrl,
    authorization_endpoint: null,
    token_endpoint: null,
    jwks_uri: null,
    grant_types_supported: [],
    response_types_supported: [],
    scopes_supported: [],
    note: `${SITE.name} has no protected APIs. All resources publicly accessible — this document exists to declare that fact, not to advertise a real auth flow.`,
    public_resources: [
      `${baseUrl}/shop/`,
      `${baseUrl}/blog/`,
      `${baseUrl}/faq/`,
      `${baseUrl}/about/`,
      `${baseUrl}/llms.txt`,
      `${baseUrl}/.well-known/api-catalog`,
      `${baseUrl}/.well-known/agent-skills/index.json`,
      `${baseUrl}/.well-known/mcp/server-card.json`,
    ],
    agent_auth: {
      skill: `${baseUrl}/.well-known/agent-skills/index.json`,
      register_uri: null,
      identity_types_supported: ['anonymous'],
      anonymous: {
        credential_types_supported: ['none'],
        claim_uri: null,
      },
      notes: 'No registration or credential required. All content is served anonymously to any agent.',
    },
  };

  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
