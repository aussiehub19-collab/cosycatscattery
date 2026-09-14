// app/.well-known/oauth-protected-resource/route.ts
import { NextResponse } from 'next/server';
import { SITE } from '@/config/site';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = `https://${SITE.domain}`;

  const data = {
    resource: baseUrl,
    resource_name: `${SITE.name} Public Catalog`,
    authorization_servers: [`${baseUrl}/.well-known/oauth-authorization-server`],
    scopes_supported: [],
    bearer_methods_supported: ['header'],
    resource_documentation: `${baseUrl}/auth.md`,
    resource_policy_uri: `${baseUrl}/faq/`,
    tls_client_certificate_bound_access_tokens: false,
    note: `All resources on ${SITE.domain} are publicly accessible — no bearer token is actually required to read them. Fields above are populated for OAuth PRM structural compliance only.`,
  };

  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
