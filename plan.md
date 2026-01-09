# Fractional Quest v2 - Content Migration Plan

Last updated: 2026-01-09 (Session 4 - Static Page Cleanup)

---

## RESTART PROMPT (Copy/Paste to Continue)

```
I'm continuing work on the Fractional Quest v2 migration project in /Users/dankeegan/copilotkit-demo.

## Context
We're migrating content from the original fractional.quest website to a Neon PostgreSQL database so pages are served dynamically via the [slug] route. The agent (CopilotKit + Pydantic AI) can then see and interact with page content.

## Database
- **Neon Project ID:** `plain-glade-34229418`
- **Table:** `pages` with JSONB `sections` column for flexible content

## Current State (as of 2026-01-09)
- 80 pages now exist in the Neon database
- Dynamic route at `/src/app/[slug]/page.tsx` serves pages from database
- PageRenderer at `/src/components/pages/PageRenderer.tsx` renders section types
- 34 static page folders renamed to `-v1` (database content now served)
- PageRenderer extended with interactive component support (calculator, job_board, video, definition_box, etc.)

## Completed This Session
1. Verified key pages render from database (fractional-jobs-uk, fractional-jobs-london, london redirect)
2. Renamed 34 static folders to -v1 so database serves these routes
3. Extended PageRenderer with interactive components
4. Migrated 8 role definition pages (fractional-cfo/cto/cmo/coo/ceo/chro/cpo/ciso)
5. Migrated 8 salary guide pages (fractional-*-salary)
6. All builds passing

## Remaining Tasks
1. Migrate services pages to database if needed
2. Clean up any remaining static page overrides
3. Test all interactive components on production

## Key Files
- `/src/app/[slug]/page.tsx` - Dynamic route
- `/src/components/pages/PageRenderer.tsx` - Renders sections (now with interactive components)
- `/src/lib/pages.ts` - Database queries
- `PLAN.md` - This migration plan
- `CLAUDE.md` - Full project documentation

## Git Remote
origin = https://github.com/Londondannyboy/copilot-fractional.quest.git

Please read PLAN.md first, then continue with the role definition page migration.
```

---

## DATABASE MIGRATION STATUS (2026-01-09)

### Pages in Neon Database: 64 total

**Jobs UK Pages (15):** ✅
- fractional-jobs-uk (ADDED 2026-01-08!)
- fractional-cfo-jobs-uk, cto, cmo, coo, ciso, ceo, chro, cpo, cro, cdo, cco
- fractional-finance-director-jobs-uk
- fractional-vp-engineering-jobs-uk, vp-sales-jobs-uk

**Location Pages (9):** ✅
- fractional-jobs-london, london, manchester, birmingham, bristol, edinburgh, glasgow, cambridge, remote

**Hire/Service Pages (10):** ✅
- hire-fractional-cfo, cto, cmo, coo, chro, cpo, cro, cdo, ciso, cio

**STATIC PAGES RENAMED TO -v1 (database now serves these routes):**
- Jobs UK: fractional-cfo/cto/cmo/coo/ceo/chro/ciso/cpo/cco-jobs-uk, fractional-jobs-uk
- Location: birmingham, bristol, edinburgh, manchester
- Hire: hire-fractional-cfo/cto/cmo/coo/ceo/chro/cpo/ciso

**STILL NEED MIGRATION TO DATABASE:**
- Role definition pages: fractional-cfo, fractional-cto, fractional-cmo, etc. (8 pages)
- Salary pages: fractional-cfo-salary, fractional-cto-salary, etc. (8 pages)

---

## Session Progress - January 8, 2026

### Completed This Session:
1. **Jobs UK Pages Enriched (4 pages)**
   - fractional-cfo-jobs-uk - 8 role types, CIPD/ONS/BVCA links, location cards, related roles section
   - fractional-cto-jobs-uk - 8 role types, BCS/IET/Tech Nation links, location cards
   - fractional-cmo-jobs-uk - 8 role types, CIM/DMA/IPA links, location cards
   - fractional-coo-jobs-uk - 8 role types, CMI/IOD/CIPS links, location cards

2. **EmbeddedJobBoard Component Created**
   - `/src/components/EmbeddedJobBoard.tsx` - Reusable job board with filters
   - `/api/jobs/search` - API route for job filtering
   - Supports preset filters (department, location, work type)
   - Customizable accent colors

3. **Job Boards Added to Pages**
   - Role definition pages: fractional-cfo, cto, cmo, coo
   - Hire pages: hire-fractional-cfo, cto, cmo, coo

4. **Hero Images Added**
   - All location pages, role pages, salary pages, hire pages
   - Using centralized image library at `/src/lib/images.ts`

### Key Gaps Identified:
1. **Missing /london page** - 40 clicks going to redirect instead of rich page
2. **Missing /part-time-cfo** - 568 impressions with poor CTR
3. **Missing /fractional-hr** - 219 impressions
4. **Article pages not created** - /articles/* getting impressions
5. **Remaining jobs UK pages need same enrichment** (CISO, CPO, CHRO, CEO, CCO)

### Architecture Consideration: Database-First Content
User suggested moving page content to Neon database for:
- Agent can dynamically access page content
- Easier content updates without code deploys
- CMS-like experience

**Status: Future Phase 2 consideration**

---

## Google Search Console Rankings (Nov 2025 - Jan 2026)

### Top Performing Pages

| Rank | URL | Clicks | Impressions | CTR | Position | Status |
|------|-----|--------|-------------|-----|----------|--------|
| 1 | /fractional-jobs-london | 115 | 745 | 15.4% | 8.3 | ✅ EXISTS |
| 2 | /london | 40 | 200 | 20% | 10.0 | ✅ REDIRECT |
| 3 | / | 25 | 422 | 5.9% | 18.8 | ✅ EXISTS |
| 4 | /fractional-jobs-uk | 23 | 441 | 5.2% | 7.6 | ✅ EXISTS |
| 5 | /fractional-cmo-jobs-uk | 17 | 355 | 4.8% | 30.5 | ✅ EXISTS |
| 6 | /uk-fractional-jobs-uk-london... | 16 | 256 | 6.3% | 8.4 | Legacy URL |
| 7 | /fractional-cto-jobs-uk | 16 | 214 | 7.5% | 16.3 | ✅ EXISTS |
| 8 | /articles/fractional-cmo-jobs-uk | 12 | 307 | 3.9% | 55.3 | Legacy article |
| 9 | /fractional-coo-jobs-uk | 12 | 143 | 8.4% | 17.8 | ✅ EXISTS |
| 10 | /fractional-cfo-jobs-uk | 9 | 573 | 1.6% | 43.6 | ✅ EXISTS |

### All Indexed Pages from Search Console

#### Core Job Pages (by role)
| URL | Clicks | Impressions | Status |
|-----|--------|-------------|--------|
| /fractional-cmo-jobs-uk | 17 | 355 | ✅ |
| /fractional-cto-jobs-uk | 16 | 214 | ✅ |
| /fractional-coo-jobs-uk | 12 | 143 | ✅ |
| /fractional-cfo-jobs-uk | 9 | 573 | ✅ |
| /fractional-ciso-jobs-uk | 7 | 66 | ✅ |
| /fractional-cpo-jobs-uk | 6 | 205 | ✅ |
| /fractional-chro-jobs-uk | 5 | 90 | ✅ |
| /fractional-ceo-jobs-uk | 5 | 77 | ✅ |
| /fractional-cco-jobs-uk | 4 | 34 | ✅ BUILT |
| /fractional-cdo-jobs-uk | 3 | 66 | ❌ NEEDS PAGE |
| /fractional-cgo-jobs-uk | 0 | 4 | ❌ NEEDS PAGE |
| /fractional-cao-jobs-uk | 0 | 1 | ❌ NEEDS PAGE |
| /fractional-cso-jobs-uk | 1 | 13 | ❌ NEEDS PAGE |

#### Interim Pages
| URL | Clicks | Impressions | Status |
|-----|--------|-------------|--------|
| /interim-cfo | 0 | 66 | ✅ BUILT |
| /interim-cfo-jobs-uk | - | - | ✅ BUILT |
| /interim-cto-jobs-uk | - | - | ✅ BUILT |
| /interim-cmo-jobs-uk | - | - | ✅ BUILT |
| /interim-coo-jobs-uk | - | - | ✅ BUILT |
| /interim-ceo-jobs-uk | - | - | ✅ BUILT |
| /interim-chro-jobs-uk | - | - | ✅ BUILT |
| /interim-cpo-jobs-uk | - | - | ✅ BUILT |
| /interim-ciso-jobs-uk | - | - | ✅ BUILT |
| /interim-executive | 0 | 50 | ✅ BUILT |
| /interim-marketing-director | 0 | 38 | ✅ BUILT |
| /interim-hr-director | 0 | 7 | ❌ NEEDS PAGE |
| /interim-finance-director | 0 | 5 | ❌ NEEDS PAGE |
| /interim-coo | 0 | 2 | ❌ NEEDS PAGE |
| /interim-ciso | 0 | 9 | ❌ NEEDS PAGE |

#### Part-Time Pages
| URL | Clicks | Impressions | Status |
|-----|--------|-------------|--------|
| /part-time-cfo-jobs-uk | 2 | 973 | ✅ BUILT |
| /part-time-cmo-jobs-uk | 0 | 41 | ✅ BUILT |
| /part-time-cto-jobs-uk | - | - | ✅ BUILT |
| /part-time-coo-jobs-uk | - | - | ✅ BUILT |
| /part-time-ceo-jobs-uk | - | - | ✅ BUILT |
| /part-time-chro-jobs-uk | - | - | ✅ BUILT |
| /part-time-cpo-jobs-uk | - | - | ✅ BUILT |
| /part-time-ciso-jobs-uk | - | - | ✅ BUILT |
| /part-time-cfo | 1 | 568 | ❌ NEEDS PAGE |
| /part-time-cto | 0 | 1 | ❌ NEEDS PAGE |
| /part-time-compliance-jobs-uk | 2 | 20 | ❌ NEEDS PAGE |
| /part-time-executive-jobs | 0 | 5 | ❌ NEEDS PAGE |
| /part-time-project-manager-jobs-uk | 0 | 5 | ❌ NEEDS PAGE |

#### Location Pages
| URL | Clicks | Impressions | Status |
|-----|--------|-------------|--------|
| /fractional-jobs-london | 115 | 745 | ✅ |
| /london | 40 | 200 | ✅ REDIRECT |
| /fractional-jobs-uk | 23 | 441 | ✅ |
| /manchester | - | - | ✅ BUILT |
| /birmingham | - | - | ✅ BUILT |
| /edinburgh | - | - | ✅ BUILT |
| /bristol | - | - | ✅ BUILT |
| /fractional-jobs-edinburgh | 1 | 8 | ✅ EXISTS |
| /fractional-jobs-manchester | 0 | 8 | ✅ REDIRECT |
| /fractional-jobs-birmingham | 0 | 2 | ✅ REDIRECT |
| /fractional-jobs-belfast | 1 | 6 | ❌ NEEDS PAGE |
| /fractional-jobs-leeds | 0 | 14 | ❌ LOW PRIORITY |
| /fractional-jobs-cambridge | 0 | 2 | ❌ LOW PRIORITY |

#### Service/Hiring Pages
| URL | Clicks | Impressions | Status |
|-----|--------|-------------|--------|
| /fractional-coo-services | 0 | 151 | ✅ BUILT |
| /fractional-cmo-services | 0 | 51 | ✅ BUILT |
| /fractional-cfo-services | 0 | 49 | ✅ BUILT |
| /fractional-cto-services | 0 | - | ✅ BUILT |
| /fractional-ceo-services | 0 | 10 | ✅ BUILT |
| /fractional-cpo-services | 0 | 13 | ✅ BUILT |
| /fractional-cro-services | 0 | 13 | ❌ NEEDS PAGE |
| /fractional-chro-services | 0 | 6 | ✅ BUILT |
| /fractional-ciso-services | 0 | - | ✅ BUILT |
| /hire-fractional-cmo | - | - | ✅ EXISTS |
| /hire-fractional-cto | - | - | ✅ EXISTS |
| /hire-fractional-cfo | - | - | ✅ EXISTS |
| /hire-fractional-coo | - | - | ✅ EXISTS |
| /hire-fractional-ceo | - | - | ✅ EXISTS |
| /hire-fractional-chro | - | - | ✅ EXISTS |
| /hire-fractional-cpo | - | - | ✅ EXISTS |
| /hire-fractional-ciso | - | - | ✅ EXISTS |

#### Salary/Role Definition Pages
| URL | Clicks | Impressions | Status |
|-----|--------|-------------|--------|
| /fractional-cto-salary | 0 | 27 | ✅ EXISTS |
| /fractional-coo-salary | 0 | 17 | ✅ EXISTS |
| /fractional-cto | 0 | 29 | ✅ EXISTS |
| /fractional-cfo | 0 | 12 | ✅ EXISTS |
| /fractional-ceo | 0 | 6 | ✅ EXISTS |
| /fractional-hr | 1 | 219 | ❌ NEEDS PAGE |
| /fractional-hr-salary | 0 | 2 | ❌ NEEDS PAGE |
| /cmo | 1 | 30 | ❌ NEEDS PAGE |
| /cfo | 1 | 17 | ❌ NEEDS PAGE |

#### Meaning/Guide Pages
| URL | Clicks | Impressions | Status |
|-----|--------|-------------|--------|
| /fractional-cfo-meaning | 0 | 35 | ✅ BUILT |
| /fractional-ciso-meaning | 0 | 27 | ✅ BUILT |
| /fractional-executive | 0 | 22 | ❌ NEEDS PAGE |
| /what-is-fractional-work | 0 | 3 | ❌ NEEDS PAGE |
| /what-is-fractional-ciso | 0 | 1 | ❌ NEEDS PAGE |
| /guide | 1 | 13 | ❌ NEEDS PAGE |
| /fractional-executive-guide | 0 | 2 | ❌ NEEDS PAGE |
| /how-to-become-a-fractional-cto | 0 | 14 | ❌ NEEDS PAGE |
| /how-to-become-fractional-cfo | 0 | 12 | ❌ NEEDS PAGE |
| /how-to-become-fractional-coo | 0 | 1 | ❌ NEEDS PAGE |

#### Industry/Vertical Pages
| URL | Clicks | Impressions | Status |
|-----|--------|-------------|--------|
| /fractional-jobs-tech | 4 | 33 | ✅ BUILT |
| /fractional-jobs-startups | 1 | 18 | ❌ NEEDS PAGE |
| /fractional-jobs-ecommerce | 1 | 10 | ❌ NEEDS PAGE |
| /fractional-jobs-saas | 0 | 1 | ❌ NEEDS PAGE |
| /fractional-jobs-professional-services | 0 | 2 | ❌ NEEDS PAGE |

#### Comparison/Research Pages
| URL | Clicks | Impressions | Status |
|-----|--------|-------------|--------|
| /fractional-cfo-vs-full-time | 0 | 1 | ❌ NEEDS PAGE |
| /fractional-hr-vs-full-time | 0 | 8 | ❌ NEEDS PAGE |
| /fractional-vs-full-time-executive-comparison | 0 | 3 | ❌ NEEDS PAGE |
| /fractional-coo-for-startups | 0 | 1 | ❌ NEEDS PAGE |
| /fractional-coo-hourly-rate | 0 | 15 | ❌ NEEDS PAGE |
| /fractional-ciso-pricing-cost-guide | 0 | 7 | ❌ NEEDS PAGE |
| /fractional-cmo-cost | 0 | 1 | ❌ NEEDS PAGE |
| /best-fractional-cfo-companies | 0 | 26 | ✅ BUILT |
| /fractional-cfo-near-me | 0 | 2 | ❌ NEEDS PAGE |

#### Recruitment/Agency Pages
| URL | Clicks | Impressions | Status |
|-----|--------|-------------|--------|
| /top-fractional-recruitment-agencies-... | 8 | 123 | ❌ NEEDS PAGE |
| /fractional-recruitment-agency | 2 | 11 | ❌ NEEDS PAGE |
| /fractional-recruitment | 0 | 9 | ❌ NEEDS PAGE |
| /fractional-recruiter-jobs-uk | 0 | 1 | ❌ NEEDS PAGE |

#### Remote/Flexible Pages
| URL | Clicks | Impressions | Status |
|-----|--------|-------------|--------|
| /remote-fractional-jobs | 6 | 42 | ✅ BUILT |
| /fractional-hr-jobs-remote | 0 | 23 | ✅ BUILT |
| /fractional-cfo-jobs-remote | 0 | 18 | ❌ NEEDS PAGE |

---

## Current Build Status

### Total Pages Built: 100+ routes

**Core Pages (32):**
- 8 Jobs UK pages ✅
- 8 Role definition pages ✅
- 8 Salary guide pages ✅
- 8 Hire guide pages ✅

**Location Pages (6):**
- fractional-jobs-london ✅
- fractional-jobs-uk ✅
- manchester ✅
- birmingham ✅
- edinburgh ✅
- bristol ✅

**Interim Pages (9):**
- All 8 role-specific pages ✅
- interim-executive (landing page) ✅

**Part-Time Pages (8):**
- All 8 roles ✅

**Services Pages (8):**
- fractional-cfo-services ✅
- fractional-cmo-services ✅
- fractional-coo-services ✅
- fractional-cto-services ✅
- fractional-ceo-services ✅
- fractional-chro-services ✅
- fractional-cpo-services ✅
- fractional-ciso-services ✅

**Industry/Vertical Pages (1):**
- fractional-jobs-tech ✅

**Remote Pages (2):**
- remote-fractional-jobs ✅
- fractional-hr-jobs-remote ✅

**Other Job Pages (2):**
- fractional-cco-jobs-uk ✅
- interim-marketing-director ✅

**Meaning/Guide Pages (3):**
- fractional-cfo-meaning ✅
- fractional-ciso-meaning ✅
- best-fractional-cfo-companies ✅

---

## Priority Pages To Build Next

### High Priority (Impressions > 50, no page exists)
1. ✅ `/fractional-coo-services` - 151 impressions - **BUILT**
2. `/state-fractional-cfo-market-2025` - 76 impressions (article)
3. ✅ `/fractional-cmo-services` - 51 impressions - **BUILT**
4. ✅ `/interim-executive` - 50 impressions - **BUILT**
5. ✅ `/fractional-cfo-services` - 49 impressions - **BUILT**

### Medium Priority (Impressions 20-50)
6. ✅ `/interim-marketing-director` - 38 impressions - **BUILT**
7. ✅ `/fractional-cfo-meaning` - 35 impressions - **BUILT**
8. ✅ `/fractional-cco-jobs-uk` - 34 impressions - **BUILT**
9. ✅ `/fractional-jobs-tech` - 33 impressions - **BUILT**
10. ✅ `/fractional-ciso-meaning` - 27 impressions - **BUILT**
11. ✅ `/best-fractional-cfo-companies` - 26 impressions - **BUILT**
12. ✅ `/fractional-hr-jobs-remote` - 23 impressions - **BUILT**

### Lower Priority (Industry/Niche)
- `/fractional-jobs-startups`
- `/fractional-jobs-ecommerce`
- ✅ `/remote-fractional-jobs` - **BUILT**
- `/fractional-cfo-jobs-remote`

---

## Redirect Plan

Already implemented in `next.config.ts`:
```typescript
{ source: '/london', destination: '/fractional-jobs-london', permanent: true },
{ source: '/fractional-jobs-manchester', destination: '/manchester', permanent: true },
{ source: '/fractional-jobs-birmingham', destination: '/birmingham', permanent: true },
{ source: '/fractional-jobs-edinburgh', destination: '/edinburgh', permanent: true },
{ source: '/fractional-jobs-bristol', destination: '/bristol', permanent: true },
```

---

## Notes

- `/fractional-property-ownership-uk` (28 impressions) - Off-topic, do not build
- Legacy `/articles/*` URLs should redirect to new page structure
- Individual job pages (`/fractional-job/*`) are dynamic routes, not static pages
