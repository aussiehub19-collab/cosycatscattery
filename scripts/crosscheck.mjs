// scripts/crosscheck.mjs - Pre-ship crosscheck
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function runCrosscheck() {
  console.log('🔍 Running WebForge v9.1 Pre-ship Crosscheck...');
  let hasErrors = false;

  const siteConfigModule = await import('../src/config/site.js');
  const { SITE, COMPLIANCE, PRODUCTS, CATEGORIES } = siteConfigModule;

  // 1. Check Agent Files A-N
  // Note: api-catalog, oauth-protected-resource, oauth-authorization-server,
  // openid-configuration, ucp, and ai-catalog.json (ARD) are served by Next.js
  // Route Handlers, not static public/ files — extensionless files in public/
  // were being served as application/octet-stream on Vercel regardless of
  // vercel.json header rules, which broke agent scanners that check Content-Type
  // before parsing JSON.
  const requiredFiles = [
    'public/robots.txt',
    'public/llms.txt',
    'public/auth.md',
    'app/.well-known/api-catalog/route.ts',
    'public/.well-known/agent-skills/index.json',
    'public/.well-known/mcp/server-card.json',
    'app/.well-known/oauth-protected-resource/route.ts',
    'app/.well-known/oauth-authorization-server/route.ts',
    'app/.well-known/openid-configuration/route.ts',
    'public/.well-known/acp.json',
    'app/.well-known/ucp/route.ts',
    'app/.well-known/ai-catalog.json/route.ts',
    'public/js/webmcp.js',
    'vercel.json',
  ];

  for (const relPath of requiredFiles) {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ [B6] Missing required agent-ready file: ${relPath}`);
      hasErrors = true;
    }
  }

  // 2. Check auth.md format (# Auth.md)
  const authPath = path.join(rootDir, 'public/auth.md');
  if (fs.existsSync(authPath)) {
    const content = fs.readFileSync(authPath, 'utf8');
    if (!content.startsWith('# Auth.md')) {
      console.error('❌ [B6] auth.md MUST start with exactly "# Auth.md" as the first line');
      hasErrors = true;
    }
  }

  // 3. Check .well-known/ucp route handler declares "ucp": "1.0"
  const ucpPath = path.join(rootDir, 'app/.well-known/ucp/route.ts');
  if (fs.existsSync(ucpPath)) {
    const ucpSrc = fs.readFileSync(ucpPath, 'utf8');
    if (!/ucp:\s*['"]1\.0['"]/.test(ucpSrc)) {
      console.error('❌ [B6] app/.well-known/ucp/route.ts MUST declare `ucp: \'1.0\'`');
      hasErrors = true;
    }
  }

  // 4. Check server-card.json tools
  const serverCardPath = path.join(rootDir, 'public/.well-known/mcp/server-card.json');
  if (fs.existsSync(serverCardPath)) {
    try {
      const card = JSON.parse(fs.readFileSync(serverCardPath, 'utf8'));
      if (!card.capabilities?.tools || card.capabilities.tools.length === 0) {
        console.error('❌ [B8] server-card.json tools array is missing or empty');
        hasErrors = true;
      }
      if (card.transport?.type !== 'streamable-http') {
        console.error('❌ [B8] server-card.json transport must be streamable-http on Vercel');
        hasErrors = true;
      }
    } catch (e) {
      console.error('❌ [B8] server-card.json parse error:', e.message);
      hasErrors = true;
    }
  }

  // 5. Compliance scan for banned terms
  if (COMPLIANCE?.bannedTerms && COMPLIANCE.bannedTerms.length > 0) {
    const filesToScan = [authPath, ucpPath, serverCardPath];
    for (const filePath of filesToScan) {
      if (fs.existsSync(filePath)) {
        const text = fs.readFileSync(filePath, 'utf8').toLowerCase();
        for (const term of COMPLIANCE.bannedTerms) {
          if (text.includes(term.toLowerCase())) {
            console.error(`❌ [B7] Compliance violation: banned term "${term}" found in ${filePath}`);
            hasErrors = true;
          }
        }
      }
    }
  }

  // 6. Products integrity check
  if (!PRODUCTS || PRODUCTS.length === 0) {
    console.error('❌ [B1] No products defined in src/config/site.js');
    hasErrors = true;
  }

  if (hasErrors) {
    console.error('🚨 Pre-ship Crosscheck FAILED. Fix the issues before deployment.');
    process.exit(1);
  } else {
    console.log('✨ All Pre-ship Crosscheck tests PASSED perfectly (B1–B8 and Agent-Ready A–N Verified).');
  }
}

runCrosscheck().catch(err => {
  console.error('❌ Crosscheck fatal error:', err);
  process.exit(1);
});
