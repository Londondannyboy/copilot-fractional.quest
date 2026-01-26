# Content Creation Restart Prompt

Use this prompt to continue creating job pages and content for Fractional Quest.

---

## Context

I'm working on Fractional Quest at `/Users/dankeegan/fractional.quest`. We're creating comprehensive job pages for all C-suite roles across all engagement types.

## Database Status: COMPLETE

The Neon database (`sweet-hat-02969611` / `deep-fractional`) has **44 jobs** covering:

**11 Roles:** CCO, CEO, CFO, CHRO, CIO, CISO, CMO, COO, CPO, CRO, CTO

**4 Engagement Types per role:** Fractional, Interim, Part-Time, Advisory

## Page Coverage Status: ALL COMPLETE ✅

### Completed Pages (2026-01-26)

| Type | Roles Covered | Status |
|------|---------------|--------|
| **Fractional Jobs UK** | CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, CIO, CRO, CSO (11) | ✅ Complete |
| **Interim Jobs UK** | CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, CIO, CSO, CRO, CCO (12) | ✅ Complete |
| **Part-Time Jobs UK** | CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, CIO, CSO, CRO, CCO (12) | ✅ Complete |
| **Advisory Jobs UK** | CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, CIO, CRO, CCO (11) | ✅ Complete |
| **Fractional Services** | CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, CRO, CCO, Procurement (11) | ✅ Complete |
| **Hire Pages** | CFO, CTO, CMO, COO, CEO, CHRO, CPO, CRO, CISO, CCO, Procurement (11) | ✅ Complete |
| **Role Definitions** | CFO, CTO, CMO, COO, CEO, CHRO, CIO, CISO, CPO, CRO, CSO, CCO (12) | ✅ Complete |

### Pages Created This Session (16 total)

**Services Pages (2):**
- `src/app/fractional-cro-services/page.tsx` ✅
- `src/app/fractional-cco-services/page.tsx` ✅

**Hire Pages (1):**
- `src/app/hire-fractional-cco/page.tsx` + `HireFractionalCCOClient.tsx` ✅

**Role Definition Pages (2):**
- `src/app/fractional-cso/page.tsx` ✅
- `src/app/fractional-cco/page.tsx` ✅

**Advisory Job Pages (11):**
- `src/app/advisory-cfo-jobs-uk/page.tsx` ✅
- `src/app/advisory-cto-jobs-uk/page.tsx` ✅
- `src/app/advisory-cmo-jobs-uk/page.tsx` ✅
- `src/app/advisory-coo-jobs-uk/page.tsx` ✅
- `src/app/advisory-ceo-jobs-uk/page.tsx` ✅
- `src/app/advisory-chro-jobs-uk/page.tsx` ✅
- `src/app/advisory-cpo-jobs-uk/page.tsx` ✅
- `src/app/advisory-ciso-jobs-uk/page.tsx` ✅
- `src/app/advisory-cio-jobs-uk/page.tsx` ✅
- `src/app/advisory-cro-jobs-uk/page.tsx` ✅
- `src/app/advisory-cco-jobs-uk/page.tsx` ✅

---

## IMPORTANT: Future Page Architecture

**Current pages were created as static files** following the high-quality interim/part-time template pattern. These include:
- Full SEO metadata
- 10 role-specific FAQs
- External authority links (ICAEW, ACCA, CIPD, BCS, etc.)
- Internal linking sections
- Database queries for job stats
- All key components (RoleCalculator, IR35Calculator, etc.)

**For future pages: Use Neon Database + PageRenderer approach** for easier content updates and MDX support. This allows:
- Content changes without code deploys
- MDX components within content
- Easier A/B testing
- CMS-like experience

To migrate existing pages to Neon in future:
1. Convert page content to JSONB sections format
2. INSERT into `pages` table
3. Add slug to `STATIC_ROUTE_SLUGS` exclusion list
4. Delete static file after verification

---

## Template Files Reference

| Page Type | Template Location |
|-----------|-------------------|
| Advisory Jobs | `src/app/advisory-cfo-jobs-uk/page.tsx` |
| Interim Jobs | `src/app/interim-cto-jobs-uk/page.tsx` |
| Part-Time Jobs | `src/app/part-time-cto-jobs-uk/page.tsx` |
| Services | `src/app/fractional-cto-services/page.tsx` |
| Hire | `src/app/hire-fractional-cto/page.tsx` |
| Role Definition | `src/app/fractional-cto/page.tsx` |
| Fractional Jobs UK | `src/app/fractional-cto-jobs-uk/page.tsx` |

## Key Components Used

- `RoleCalculator` - Day rate calculator (role prop: cfo, cto, cmo, coo, ceo, chro, ciso, cpo, cro, cio, cso, cco)
- `RoleContentHub` - Internal linking component
- `ServerJobGrid` - Job listings display
- `HotJobsLines` - Hot jobs carousel
- `IR35Calculator` - IR35 tax calculator
- `ExpertProfile` - Expert profile section
- `CaseStudy` - Case study section
- `FAQ` - FAQ accordion with schema
- `EmbeddedJobBoard` - Interactive job board with filters (for hire/role pages)

## SEO Content Files

Location: `src/lib/seo-content/`

Existing files: birmingham, bristol, ceo-jobs-uk, cfo-jobs-uk, chro-jobs-uk, cio-jobs-uk, ciso-jobs-uk, cmo-jobs-uk, coo-jobs-uk, cpo-jobs-uk, cro-jobs-uk, cso-jobs-uk, cto-jobs-uk, edinburgh, fd-jobs-uk, glasgow, leeds, london, manchester, procurement-jobs-uk, remote, uk

## Day Rate Ranges by Role

| Role | Fractional | Interim | Part-Time | Advisory |
|------|------------|---------|-----------|----------|
| CCO | £800-1,200 | £850-1,300 | £800-1,200 | £600-900 |
| CEO | £1,000-1,500 | £1,200-1,800 | £1,000-1,600 | £800-1,200 |
| CFO | £800-1,200 | £900-1,500 | £800-1,200 | £700-1,000 |
| CHRO | £750-1,100 | £800-1,200 | £750-1,100 | £600-900 |
| CIO | £850-1,250 | £900-1,400 | £850-1,300 | £650-950 |
| CISO | £900-1,350 | £1,000-1,500 | £900-1,400 | £700-1,000 |
| CMO | £800-1,200 | £900-1,350 | £850-1,300 | £600-900 |
| COO | £850-1,200 | £900-1,350 | £850-1,300 | £650-950 |
| CPO | £850-1,300 | £900-1,400 | £850-1,300 | £650-950 |
| CRO | £850-1,250 | £900-1,400 | £850-1,300 | £650-950 |
| CTO | £900-1,400 | £1,100-1,400 | £900-1,400 | £700-1,000 |

## Commands

```bash
npm run build    # Build (check for errors)
npm run dev      # Development server
git add -A && git commit -m "message" && git push  # Deploy
```

## Potential Future Work

1. **CDO Pages** (if needed):
   - CDO role exists in database but no pages created yet
   - Would need: jobs-uk, interim, part-time, advisory, services, hire, definition

2. **Migrate pages to Neon** for MDX support (when needed)

3. **Add CIO pages** - Some page types may be missing for CIO role

---

**Last Updated:** 2026-01-26
**Commit:** 33beafd - Add services, hire, role definition and advisory job pages
