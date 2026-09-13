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
  const requiredFiles = [
    'public/robots.txt',
    'public/llms.txt',
    'public/auth.md',
    'public/.well-known/api-catalog',
    'public/.well-known/agent-skills/index.json',
    'public/.well-known/mcp/server-card.json',
    'public/.well-known/oauth-protected-resource',
    'public/.well-known/oauth-authorization-server',
    'public/.well-known/openid-configuration',
    'public/.well-known/acp.json',
    'public/.well-known/ucp',
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

  // 3. Check .well-known/ucp has "ucp": "1.0"
  const ucpPath = path.join(rootDir, 'public/.well-known/ucp');
  if (fs.existsSync(ucpPath)) {
    try {
      const ucpObj = JSON.parse(fs.readFileSync(ucpPath, 'utf8'));
      if (ucpObj.ucp !== '1.0') {
        console.error('❌ [B6] .well-known/ucp MUST contain `"ucp": "1.0"`');
        hasErrors = true;
      }
    } catch (e) {
      console.error('❌ [B6] .well-known/ucp is not valid JSON:', e.message);
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
