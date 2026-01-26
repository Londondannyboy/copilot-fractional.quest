# Content Creation Restart Prompt

Use this prompt to continue creating job pages and content for Fractional Quest.

---

## Context

I'm working on Fractional Quest at `/Users/dankeegan/fractional.quest`. We're creating comprehensive job pages for all C-suite roles across all engagement types.

## Database Status: COMPLETE

The Neon database (`sweet-hat-02969611` / `deep-fractional`) has **44 jobs** covering:

**11 Roles:** CCO, CEO, CFO, CHRO, CIO, CISO, CMO, COO, CPO, CRO, CTO

**4 Engagement Types per role:** Fractional, Interim, Part-Time, Advisory

## Page Coverage Status

### Completed Pages

| Type | Roles Covered |
|------|---------------|
| **Fractional Jobs UK** | CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, CIO, CRO, CSO (11) |
| **Interim Jobs UK** | CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, CIO, CSO, CRO, CCO (12) |
| **Part-Time Jobs UK** | CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, CIO, CSO, CRO, CCO (12) |
| **Fractional Services** | CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, Procurement (9) |
| **Hire Pages** | CFO, CTO, CMO, COO, CEO, CHRO, CPO, CRO, CISO, Procurement (10) |
| **Role Definitions** | CFO, CTO, CMO, COO, CEO, CHRO, CIO, CISO, CPO, CRO (10) |

### Pages Still Needed

1. **Services Pages (2):**
   - `fractional-cro-services`
   - `fractional-cco-services`

2. **Hire Pages (1):**
   - `hire-fractional-cco`

3. **Role Definition Pages (2):**
   - `fractional-cso`
   - `fractional-cco`

4. **Advisory Job Pages (11 - NEW category):**
   - `advisory-cfo-jobs-uk`
   - `advisory-cto-jobs-uk`
   - `advisory-cmo-jobs-uk`
   - `advisory-coo-jobs-uk`
   - `advisory-ceo-jobs-uk`
   - `advisory-chro-jobs-uk`
   - `advisory-cpo-jobs-uk`
   - `advisory-ciso-jobs-uk`
   - `advisory-cio-jobs-uk`
   - `advisory-cro-jobs-uk`
   - `advisory-cco-jobs-uk`

5. **CDO Pages (if needed):**
   - CDO role exists in database but no pages created yet
   - Would need: jobs-uk, interim, part-time, advisory, services, hire, definition

## Template Files to Copy From

| Page Type | Template Location |
|-----------|-------------------|
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

## Next Steps

1. Create the 2 missing services pages (CRO, CCO)
2. Create the 1 missing hire page (CCO)
3. Create the 2 missing role definition pages (CSO, CCO)
4. Create all 11 advisory job pages
5. Consider CDO pages if needed

When creating pages:
- Copy from the appropriate template file
- Update metadata (title, description, keywords, canonical URL)
- Update FAQs for the specific role
- Update day rates for the role
- Update database queries for the role
- Update color theme/Unsplash image appropriately
- Update breadcrumbs
- Update internal links

---

**Last Updated:** 2026-01-26
**Commit:** 431c463 - Add interim and part-time job pages for CRO and CCO roles
