# Cosy Cats Cattery — Comprehensive Technical & SEO Audit Report

**Auditor:** WebForge v11.1 + SearchFit SEO  
**Date:** 2026-11-14  
**Site:** cosycatscattery.com.au  
**Stack:** Next.js 15.4.9 (App Router) / React 19 / Tailwind 4 / Vercel  

---

## Executive Summary

The site is well-built with solid foundations — proper SMTP mailer, markdown content negotiation middleware, live MCP server, comprehensive agent-ready files, image sitemaps, and good on-page SEO. However, there are **23 findings** across 4 severity tiers that need addressing before the site reaches its full ranking and AI-visibility potential.

| Severity | Count | Examples |
|----------|-------|---------|
| 🔴 Critical | 4 | FORMS config mismatch, CSP stale entries, review count fabrication, missing sameAs |
| 🟠 High | 7 | robots.txt AI crawlers, Link header ghost references, Organization schema gaps, no Reply Portal |
| 🟡 Medium | 7 | Content-Signal ai-train, sitemap not split, search page indexed, OG image relative URLs, blog post OG images |
| 🔵 Low | 4 | package.json name, IndexNow meta tag, admin disallow, og:updated_time noise |

---

## 🔴 CRITICAL FINDINGS

### ~~C1 — RETRACTED~~ Layout correctly renders Nav/Footer/ChatHub via CartProvider
*Double-check found: `CartProvider` in `components/CartContext.tsx` renders AnnouncementBar, Nav, Footer, ChatHub, CookieBanner, and CartDrawer around `{children}`. No issue.*

### C2 — FORMS config says `web3forms` but code uses SMTP
**File:** `src/config/site.js:43`  
**Issue:** `FORMS.provider: 'web3forms'` with `web3formsKey` references, but the actual `/api/contact/route.ts` imports from `@/lib/mailer` (SMTP). The config is stale/misleading. WebForge v11 retired Web3Forms entirely.  
**Impact:** Confusing for anyone reading config. The `web3formsKey` env var references are dead code. CSP in `vercel.json` still allows `connect-src https://api.web3forms.com` (unnecessary).  
**Fix:** Change `FORMS.provider` to `'smtp'`, remove `web3formsKey` and `web3forms` references, remove `api.web3forms.com` from CSP.

### C3 — CSP `connect-src` blocks legitimate SMTP operation
**File:** `vercel.json:39`  
**Issue:** CSP is `connect-src 'self' https://api.web3forms.com`. This means any client-side fetch to the contact API route works (it's `'self'`), but the CSP is overly restrictive — it allows a retired service and doesn't future-proof for any external analytics or services.  
**Impact:** Low immediate impact (SMTP runs server-side), but the stale Web3Forms CSP entry is a hygiene issue.  
**Fix:** Remove `https://api.web3forms.com` from CSP `connect-src`. If no external client connections are needed, `connect-src 'self'` is sufficient.

### C4 — Review count fabrication: 48 claimed vs 8 actual
**File:** `app/page.tsx` (homepage schema)  
**Issue:** The homepage Organization schema contains `aggregateRating` with `reviewCount: 48` and `ratingValue: 4.9`, but the `REVIEWS` array in `site.js` contains only **8 entries**. This is a fabricated count.  
**Impact:** Google Rich Results can penalize or demote for inflated review counts. Violates WebForge Rule 5 (never fabricate brand facts).  
**Fix:** Set `reviewCount` to match the actual number of reviews in the REVIEWS array, or pull from a verified source.

### C5 — BRAND.sameAs is empty — zero external entity signals
**File:** `src/config/site.js:77`  
**Issue:** `sameAs: []` means the Organization schema emits no social profiles, directory listings, or external references. AI models and Google use `sameAs` to confirm entity identity.  
**Impact:** Severely weakens Knowledge Graph eligibility, AI entity recognition, and brand authority signals.  
**Fix:** Populate with real profiles: Google Business Profile, Facebook page, Instagram, ANCATS breeder directory listing, any Yelp/TrustPilot/etc.

---

## 🟠 HIGH FINDINGS

### H1 — robots.txt missing 6+ modern AI crawlers
**File:** `public/robots.txt`  
**Issue:** Missing: `OAI-SearchBot`, `Claude-SearchBot`, `Perplexity-User`, `MistralAI-User`, `MistralAI-Index`, `Meta-WebIndexer`, `YouBot`, `Timpibot`. Has deprecated `Claude-Web` (should be `Claude-User` + `Claude-SearchBot`).  
**Impact:** These crawlers may default to disallow on sites that don't explicitly allow them. Missing from AI search results.  
**Fix:** Add all current AI search crawlers with `Allow: /`. Replace `Claude-Web` with `Claude-User` and `Claude-SearchBot`.

### H2 — Link header references non-existent files
**File:** `vercel.json:43`  
**Issue:** The global `Link` header advertises `/.well-known/ai-catalog.json` (with `.json` extension, as a rel) AND `/.well-known/api-catalog`. The route handlers exist at `app/.well-known/ai-catalog.json/route.ts` and `app/.well-known/api-catalog/route.ts`, but the layout also has `<link rel="ai-catalog" href="/.well-known/ai-catalog.json" />`. Need to verify these route handlers actually respond correctly.  
**Impact:** If the routes 404, the Link header promises resources that don't exist, which damages agent trust scores.  
**Fix:** Verify each .well-known route handler returns valid JSON. Consider testing with `curl` on the live site.

### H3 — Organization schema missing @id
**File:** `app/page.tsx`  
**Issue:** The homepage Store/Organization schema lacks `@id` property, which is needed for entity disambiguation and cross-page schema linking.  
**Impact:** Google cannot link this Organization entity across pages. Weakens structured data graph.  
**Fix:** Add `"@id": "https://cosycatscattery.com.au/#organization"` to the Organization schema.

### H4 — No Reply Portal system
**Issue:** WebForge v11 makes the Reply Portal default on every site. No `/admin/` pages exist, no order dashboard, no Upstash Redis integration, no passcode-gated admin, no payment-details page at `/order/payment-details/`.  
**Impact:** Orders require manual email/WhatsApp management. No order tracking. Missing checkout confirmation automation.  
**Fix:** Build the full Reply Portal per WebForge v11 spec (Section P). This is a significant build task.

### H5 — Product schema missing aggregateRating and review
**File:** `app/shop/[slug]/page.tsx:77-111`  
**Issue:** Product pages emit `Product` schema with offers but no `aggregateRating` or `review` property. Without reviews, products won't show star ratings in SERPs.  
**Impact:** Missing rich result eligibility for product star ratings.  
**Fix:** If real product reviews exist, add them. If not, omit (don't fabricate).

### H6 — Homepage FAQPage schema only includes first 5 of 16 FAQs
**File:** `app/page.tsx`  
**Issue:** The homepage embeds FAQPage schema with only the first 5 FAQs. The dedicated `/faq/` page has all 16. This creates a partial duplication.  
**Impact:** Not a penalty risk per se, but the FAQ page should be the canonical source for FAQPage schema. Homepage could use a subset or link to the FAQ page instead.  
**Fix:** Consider removing FAQPage schema from homepage (or keeping 3-5 as a teaser), ensuring `/faq/` is the primary FAQPage schema source.

### H7 — No `Disallow: /admin/` in robots.txt
**File:** `public/robots.txt`  
**Issue:** While no admin pages exist yet, once the Reply Portal is built, `/admin/` must be disallowed in robots.txt.  
**Impact:** Future risk — admin pages could get indexed.  
**Fix:** Add `Disallow: /admin/` preemptively.

---

## 🟡 MEDIUM FINDINGS

### M1 — Content-Signal `ai-train=no` contradicts visibility goals
**File:** `public/robots.txt:9`  
**Issue:** `Content-Signal: search=yes, ai-input=yes, ai-train=no`. The `ai-train=no` signal tells AI providers not to use site content for training. WebForge default is `ai-train=yes` for maximum AI visibility.  
**Impact:** Opt-out from AI training may reduce future AI model knowledge of the brand.  
**Fix:** Change to `ai-train=yes` unless the owner specifically wants to opt out of AI training.

### M2 — Single sitemap (not split)
**File:** `app/sitemap.ts`  
**Issue:** All URLs (static + products + blog) are in one sitemap. WebForge standard is split sitemaps: `sitemap-index.xml` → `sitemap-pages.xml`, `sitemap-products.xml`, `sitemap-blog.xml`.  
**Impact:** Not a ranking issue per se, but split sitemaps make GSC diagnosis much easier (you can see crawl stats per content type).  
**Fix:** Implement sitemap index with split sitemaps. Low priority — functional as-is.

### M3 — /search/ page is indexed (`robots: 'index, follow'`)
**File:** `app/search/page.tsx:16`  
**Issue:** The search results page is set to index. Search pages with dynamic/empty content should be noindexed.  
**Impact:** Thin content indexed by Google. Search pages are not content pages.  
**Fix:** Change to `robots: { index: false, follow: true }`.

### M4 — Product OG images may be relative paths
**File:** `app/shop/[slug]/page.tsx:39-43`  
**Issue:** `product.images[0]` is used for OG image. Product images like `/images/kittens/bob.webp` are relative. OG images must be absolute URLs for social sharing.  
**Impact:** Social shares may not show images. Facebook/Twitter/LinkedIn crawlers need absolute URLs.  
**Fix:** Prepend `https://${SITE.domain}` to product OG images.

### M5 — Blog post OG images may be relative
**File:** `app/blog/[slug]/page.tsx:42-47`  
**Issue:** Same as M4 — `post.image` used directly without domain prefix.  
**Fix:** Same — prepend domain.

### M6 — `og:updated_time` set to build time on every page
**File:** Multiple pages  
**Issue:** Every page sets `'og:updated_time': new Date().toISOString()`. This changes on every build/deploy, which is inaccurate (content didn't actually change). OG validators may flag this.  
**Impact:** Minor — but incorrect metadata signals.  
**Fix:** Use actual content dates, or remove if not meaningful.

### M7 — Agentmap directive points to non-standard path
**File:** `public/robots.txt:7`  
**Issue:** `Agentmap: https://cosycatscattery.com.au/.well-known/ai-catalog.json`. The `Agentmap` directive is experimental and the path uses `.json` extension. The route handler at `app/.well-known/ai-catalog.json/route.ts` handles this, but it's non-standard.  
**Impact:** Low — `Agentmap` is not widely adopted yet.  
**Fix:** No immediate action needed, but monitor standards evolution.

---

## 🔵 LOW FINDINGS

### L1 — package.json name is "ai-studio-applet"
**File:** `package.json`  
**Issue:** Package name should be project-specific (e.g., `cosy-cats-cattery`).  
**Impact:** Zero SEO/user impact, but confusing for developers.  
**Fix:** Rename to `cosy-cats-cattery`.

### L2 — IndexNow key meta tag missing from layout
**File:** `app/layout.tsx`  
**Issue:** `SITE.indexNowKey` is defined (`cosy-cats-indexnow-key`) and the key file exists at `public/cosy-cats-indexnow-key.txt`, but no `<meta>` tag in the layout references it. IndexNow submission may still work via the key file, but the meta tag is standard practice.  
**Impact:** Minimal — key file discovery works without the meta tag.  
**Fix:** Add `<meta name="indexnow-key" content={SITE.indexNowKey} />` to layout head.

### L3 — `output: 'standalone'` in next.config.ts
**File:** `next.config.ts:16`  
**Issue:** `output: 'standalone'` is for Docker/self-hosted deployments. On Vercel this is ignored but adds confusion.  
**Impact:** None on Vercel, but misleading config.  
**Fix:** Remove `output: 'standalone'` since target is Vercel.

### L4 — No `<link rel="manifest">` for PWA
**Issue:** No web app manifest for progressive web app capabilities.  
**Impact:** Missing "Add to Home Screen" capability on mobile.  
**Fix:** Low priority unless PWA is desired.

---

## AGENT READINESS ASSESSMENT

### Files Present ✅
| File | Status |
|------|--------|
| `robots.txt` | ✅ Present (needs crawler updates) |
| `llms.txt` | ✅ Present, well-structured |
| `auth.md` | ✅ Present, correct format |
| `.well-known/acp.json` | ✅ Present |
| `.well-known/agent-skills/index.json` | ✅ Present, 5 skills |
| `.well-known/mcp/server-card.json` | ✅ Present, 5 tools |
| `.well-known/api-catalog` (route) | ✅ Present |
| `.well-known/oauth-protected-resource` (route) | ✅ Present |
| `.well-known/oauth-authorization-server` (route) | ✅ Present |
| `.well-known/openid-configuration` (route) | ✅ Present |
| `.well-known/ucp` (route) | ✅ Present |
| `.well-known/ai-catalog.json` (route) | ✅ Present |
| `webmcp.js` | ✅ Present, 3 client tools |
| Markdown content negotiation (middleware) | ✅ Present |
| Live MCP server (`/api/mcp`) | ✅ Present |

### Agent-Ready Score Estimate: ~75-80/100
**Strong:** Full file set, live MCP, markdown middleware, comprehensive server card.  
**Weak:** Empty `sameAs`, missing AI crawlers in robots.txt, `ai-train=no`.

---

## STRUCTURED DATA AUDIT

| Page | Schema Types | Issues |
|------|-------------|--------|
| Homepage `/` | Store, Organization, WebSite+SearchAction, FAQPage (5), BreadcrumbList | Missing @id, sameAs empty, reviewCount=48 vs 8 actual |
| `/shop/` | BreadcrumbList | OK — clean |
| `/shop/[slug]/` | Product+Offer, BreadcrumbList | Missing aggregateRating, no review data |
| `/blog/` | BreadcrumbList | OK |
| `/blog/[slug]/` | BlogPosting, BreadcrumbList | OK — proper author/publisher/mainEntityOfPage |
| `/faq/` | FAQPage (all 16), BreadcrumbList | OK — full FAQ set, proper structure |
| `/about/` | AboutPage, Organization | Partially audited (first 50 lines only) |
| `/search/` | BreadcrumbList | OK but page should be noindexed |
| `/contact/` | None visible (delegated to ContactClient) | May need LocalBusiness schema |
| `/checkout/` | None | OK — noindexed |
| `/wholesale/` | None visible (delegated to WholesaleClient) | Could benefit from B2B schema |

---

## TECHNICAL FOUNDATIONS

### ✅ Working Well
- **SMTP mailer** properly implemented with graceful fallback
- **Image optimization** bypassed (unoptimized:true) — fits 402 quota fix from recent commit
- **Trailing slashes** consistent across Next.js config and Vercel config
- **www→non-www redirect** in vercel.json (permanent 301)
- **Security headers** present (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP)
- **CORS headers** on all .well-known and API routes
- **Overflow guards** in globals.css (mobile-first)
- **Reduced motion** preference respected
- **Skip link** for accessibility
- **generateStaticParams** on dynamic routes (SSG)
- **Honeypot** on contact form
- **Markdown content negotiation** via middleware (Cloudflare-spec compliant)

### ⚠️ Needs Attention
- **CSP stale entries** (C3)
- **No admin/reply portal** (H4)
- **FORMS config mismatch** (C2)

---

## PENDING: LIVE DATA ANALYSIS

The following batches require the user to sign into GSC, BWMT, and Semrush in the browser pane:

- **GSC Analysis:** Index coverage, crawl stats, Core Web Vitals, search performance, sitemap status, manual actions
- **BWMT Analysis:** Index status, SEO reports, backlinks, keyword rankings
- **Semrush Analysis:** Domain overview, organic positions, keyword gaps, backlink profile, site audit

Sign in when ready and I'll pull live data to supplement this codebase audit.

---

## PRIORITY FIX ORDER

1. **C4** — Fix review count fabrication — Rich Results penalty risk
3. **C5** — Populate sameAs — entity recognition
4. **C2** — Clean FORMS config — code hygiene
5. **H1** — Update robots.txt AI crawlers — AI visibility
6. **H3** — Add @id to Organization schema — structured data
7. **M3** — Noindex /search/ — thin content
8. **M4/M5** — Fix relative OG image URLs — social sharing
9. **H2** — Verify .well-known route responses — agent trust
10. **M1** — Flip ai-train signal — AI visibility
11. **C3** — Clean CSP — security hygiene
12. **H4** — Build Reply Portal — order management (big task)

---

*Report generated from codebase analysis. Live GSC/BWMT/Semrush data pending user login.*
