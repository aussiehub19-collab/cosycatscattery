// app/.well-known/openid-configuration/route.ts
import { NextResponse } from 'next/server';
import { SITE } from '@/config/site';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = `https://${SITE.domain}`;

  const data = {
    issuer: baseUrl,
    note: `${SITE.name} does not operate an OpenID Connect provider. All resources publicly accessible.`,
    public_site: true,
    authorization_endpoint: null,
    token_endpoint: null,
    userinfo_endpoint: null,
    jwks_uri: null,
    scopes_supported: [],
    response_types_supported: [],
    grant_types_supported: [],
    subject_types_supported: [],
    id_token_signing_alg_values_supported: [],
  };

  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
