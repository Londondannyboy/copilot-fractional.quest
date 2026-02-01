# Fractional Quest - Session Restart Prompt

## Session Context

You are continuing work on Fractional Quest, a UK-based platform for fractional and interim executive roles. The platform serves UK (primary), US, AU, and NZ markets.

## Quick Start

1. Read `CLAUDE.md` for project overview, architecture, and Tavily API access
2. Check `content_enrichment` table in Neon for pages already enhanced
3. Access GSC data at `/Users/dankeegan/Desktop/Queries.csv` and `Pages.csv`

---

## Architecture Overview (Feb 2026)

### Unified Template System

**ALL pages now served from Neon via IntelligentPageRenderer:**
```
src/app/[slug]/page.tsx → Neon pages table → IntelligentPageRenderer
```

- `STATIC_ROUTE_SLUGS` array is **empty** - all pages use Neon
- Static hardcoded page files exist as backup but `[slug]` route takes priority
- International pages (`/us/`, `/au/`, `/nz/`) also use IntelligentPageRenderer

### IntelligentPageRenderer Features

| Feature | Description |
|---------|-------------|
| Auto Internal Linking | 55+ terms, locale-aware (stays in market) |
| Auto External Linking | 20+ authority sources (Gartner, CIPD, ICAEW, etc.) |
| Visual Sections | Icons based on keywords, gradient cards |
| Industry Insights | Real HBR/Forbes/LinkedIn data (no fake testimonials) |
| Structured Data | FAQPage, BreadcrumbList schema.org |
| Charts | CostSavingsChart, SkillsBreakdownChart |
| Sidebar | Quick nav, newsletter CTA, related pages |
| Mobile | overflow-x-hidden, responsive grids |

### Locale-Aware Linking

```typescript
detectLocaleFromSlug(slug)  // us-fractional-cfo-jobs → 'us'
localizeUrl(url, locale)    // /fractional-cfo-jobs-uk → /us/fractional-cfo-jobs
localizeTitle(title, locale) // "Fractional CFO Jobs UK" → "Fractional CFO Jobs"
```

### URL Structure

| Market | URL Pattern | Neon Slug |
|--------|-------------|-----------|
| UK (default) | `/fractional-cfo-jobs-uk` | `fractional-cfo-jobs-uk` |
| US | `/us/fractional-cfo-jobs` | `us-fractional-cfo-jobs` |
| AU | `/au/fractional-cfo-jobs` | `au-fractional-cfo-jobs` |
| NZ | `/nz/fractional-cfo-jobs` | `nz-fractional-cfo-jobs` |

---

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project overview, patterns, session progress |
| `src/components/pages/IntelligentPageRenderer.tsx` | Main page template (2000+ lines) |
| `src/lib/international-page.tsx` | International page wrapper |
| `src/app/[slug]/page.tsx` | Dynamic route handler |
| `src/i18n/config.ts` | Locale definitions |
| `.claude/reference/*.md` | Job schema, SEO templates, role data |

---

## Database

**Neon Project**: `plain-glade-34229418`

| Table | Purpose |
|-------|---------|
| `pages` | All page content (800+ pages) |
| `jobs` | Job listings (213+ entries) |
| `content_enrichment` | Enrichment tracking |
| `articles` | Blog content |

**Quick Queries:**
```sql
-- Check page content
SELECT slug, title, hero_title, sections FROM pages WHERE slug LIKE '%cfo%';

-- Check enrichment status
SELECT page_slug, quality_score_after, needs_revisit FROM content_enrichment ORDER BY enriched_at DESC;

-- Find pages needing work
SELECT slug FROM pages WHERE slug NOT IN (SELECT page_slug FROM content_enrichment);
```

---

## Completed Work (Feb 2026)

### Template Unification
- Migrated ALL pages to Neon + IntelligentPageRenderer
- Cleared `STATIC_ROUTE_SLUGS` - no more hardcoded page priority
- Updated international pages (was using legacy PageWithCopilot)
- Added locale-aware internal linking

### IntelligentPageRenderer Enhancements
- Auto internal linking (55+ terms) with locale awareness
- Auto external linking (20+ authority sources)
- Enhanced section renderers with icons based on keywords
- Industry insights section (replaced fake testimonials)
- Mobile responsive fixes
- Sidebar improvements (quick nav, newsletter, related pages)
- New components: CostSavingsChart, SkillsBreakdownChart, KeyTakeawaysBox
- stripMdxComponents() to remove raw MDX tags

### Content Enrichment (Jan 2026)
- All 17 Role Jobs UK pages enriched with definition boxes, FAQs, authority links
- 3-way comparison tables (Fractional vs Interim vs Full-Time) for CFO, CMO, CTO
- Updated calculator pricing to realistic UK market rates
- 25+ enrichments tracked in `content_enrichment` table

---

## Known Issues / Next Steps

### Priority 1: Header/Footer Locale Awareness
- Header and Footer components have hardcoded UK links
- US/AU/NZ users clicking header nav go back to UK pages
- **Fix:** Pass locale to Header/Footer or make them detect from path

### Priority 2: International Content
- US/AU/NZ pages in Neon have sparse content (empty sections)
- Need to enrich international page content
- Consider locale-specific jobs in jobs table

### Priority 3: Content Enrichment
- Continue Tavily-based enrichment for remaining pages
- Track in `content_enrichment` table
- Target quality score 8+ for all lead pages

### Technical Debt
- Static hardcoded page files can be deleted (keep as backup)
- PageWithCopilot component is unused - can be removed
- Consider adding middleware.ts for proper i18n routing

---

## Tavily API

**API Key**: `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`

**Search API:**
```bash
cat > /tmp/tav.json << 'EOF'
{"api_key":"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","query":"fractional CFO cost UK 2026","search_depth":"advanced","include_answer":true,"max_results":8}
EOF
curl -s -X POST "https://api.tavily.com/search" -H "Content-Type: application/json" -d @/tmp/tav.json | jq '{answer, results: [.results[] | {title, url}]}'
```

**Extract API:**
```bash
cat > /tmp/tav_extract.json << 'EOF'
{"api_key":"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","urls":["https://competitor.com/page"],"extract_depth":"advanced"}
EOF
curl -s -X POST "https://api.tavily.com/extract" -H "Content-Type: application/json" -d @/tmp/tav_extract.json | jq '.results[] | {url, content: .raw_content[:3000]}'
```

---

## Commands

```bash
npm run dev      # Development server (port 3000)
npm run build    # Production build
git add -A && git commit -m "message" && git push  # Deploy
```

---

*Last Updated: 1 February 2026*
*Previous Session: Template unification, locale-aware linking, IntelligentPageRenderer enhancements*
