# Fractional.Quest v2 Content Migration Plan

## Overview
Migrating content from fractional.quest (v1) to fractional.quest (v2) with CopilotKit + Pydantic AI integration.

## Quality Standards

### Each page MUST have:
1. **SEO Components**: `WebPageSchema`, `FAQPageSchema`, proper metadata export
2. **Internal Links**: 15-20+ links per page including:
   - Links to related role pages (jobs, salary, hiring guide, role definition)
   - Location-based job search links grid (London, Manchester, Birmingham, etc.)
   - Cross-links to other C-suite roles
3. **External Authority Links**: 3-5 links to professional bodies relevant to the role:
   - CHRO: CIPD, ACAS, GOV.UK Employment
   - CEO: IOD, British Business Bank, BVCA
   - CPO: Mind the Product, Product School, Lenny's Newsletter
   - CISO: NCSC, ICO, ISACA, ISC2
   - CFO: ICAEW, ACCA, CIMA, FRC
   - CTO: BCS, IET, Tech Nation
   - CMO: CIM, DMA, Marketing Week
   - COO: IOD, CMI, CIPS
4. **Color Theme**: Each role has a consistent theme color
5. **RoleContentHub**: Footer component for cross-linking

### Color Themes by Role:
| Role | Color | Tailwind Class |
|------|-------|----------------|
| CMO | Amber | `amber-*` |
| CTO | Cyan | `cyan-*` |
| CFO | Emerald | `emerald-*` |
| COO | Slate | `slate-*` |
| CHRO | Purple | `purple-*` |
| CEO | Yellow/Gold | `yellow-*` |
| CPO | Indigo | `indigo-*` |
| CISO | Red | `red-*` |

---

## Page Types (4 per role)

### 1. Jobs UK Pages (`/fractional-{role}-jobs-uk`)
- Server component with database queries
- Hero with background image
- Stats bar (live roles, avg rate, remote count)
- HotJobsLines ticker
- ServerJobGrid with job cards
- RoleCalculator
- Editorial section with internal/external links + location grid
- IR35Calculator
- FAQ section
- Related Jobs
- CTA section
- RoleContentHub

### 2. Role Definition Pages (`/fractional-{role}`)
- Hero with role definition
- Definition box
- What does a fractional {role} do? (6 responsibility cards)
- Comparison table (fractional vs full-time)
- When do you need one? (bullet list)
- Cost section with pricing tiers
- RoleCalculator
- FAQ section
- Related Resources (3 cards: jobs, salary, hiring guide + external links)
- CTA section
- RoleContentHub

### 3. Salary Guide Pages (`/fractional-{role}-salary`)
- Hero with salary focus
- Stats bar
- Day rates table by experience level
- Regional salary data (London premium, etc.)
- Specialization premiums table
- RoleCalculator
- IR35Calculator
- Related Resources (4 cards + external salary links)
- CTA section
- RoleContentHub

### 4. Hiring Guide Pages (`/hire-fractional-{role}`)
- Client component ("use client") with CopilotKit integration
- VoiceInput component
- CopilotSidebar with page-specific instructions
- Hero section
- Quick stats bar
- Where to find (sourcing channels grid)
- Evaluation criteria (what to look for / red flags)
- HireProcessStepper component
- FAQ section
- CTA section

---

## Completion Status

### Page Creation Status:

| Role | Jobs UK | Definition | Salary | Hiring | Audit Fixes |
|------|---------|------------|--------|--------|-------------|
| CMO | ✅ | ✅ | ✅ | ✅ | ⚠️ NEEDS AUDIT |
| CTO | ✅ | ✅ | ✅ | ✅ | ⚠️ NEEDS AUDIT |
| CFO | ✅ | ✅ | ✅ | ✅ | ⚠️ NEEDS AUDIT |
| COO | ✅ | ✅ | ✅ | ✅ | ⚠️ NEEDS AUDIT |
| CHRO | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| CEO | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| CPO | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| CISO | ✅ | ✅ | ✅ | ✅ | ✅ DONE |

### What "Audit Fixes" means:
The CHRO, CEO, CPO, CISO pages received these improvements that CMO, CTO, CFO, COO still need:

**Jobs UK pages need:**
- Internal links to role definition, salary guide, hiring guide pages
- External authority links (professional bodies)
- Location-based job search links grid (London, Manchester, etc.)

**Role Definition pages need:**
- Expanded Related Resources (3 cards including hiring guide)
- External Resources section with professional body links

**Salary pages need:**
- 4 resource cards (including hiring guide)
- External Salary Resources links (Glassdoor, HMRC, etc.)

### TODO - Audit Fixes for Original Pages:

| Role | Jobs UK Links | Definition Resources | Salary Resources |
|------|---------------|---------------------|------------------|
| CMO | ❌ Needs 15+ links | ❌ Needs expansion | ❌ Needs expansion |
| CTO | ❌ Needs 15+ links | ❌ Needs expansion | ❌ Needs expansion |
| CFO | ❌ Needs 15+ links | ❌ Needs expansion | ❌ Needs expansion |
| COO | ❌ Needs 15+ links | ❌ Needs expansion | ❌ Needs expansion |

### Additional Pages:

| Page | Priority | Traffic | Status |
|------|----------|---------|--------|
| `/london` or `/fractional-jobs-london` | HIGH | 40 clicks/day | ✅ Exists |
| `/fractional-jobs-uk` | HIGH | Main hub | ✅ Exists |
| `/` (homepage) | HIGH | Main landing | ✅ Exists |
| `/profile` | MEDIUM | User feature | ✅ Exists |

---

## Component Dependencies

These components must exist for pages to work:

| Component | Path | Used By |
|-----------|------|---------|
| `FAQ` | `@/components/seo/FAQ` | All pages |
| `WebPageSchema` | `@/components/seo/WebPageSchema` | All pages |
| `FAQPageSchema` | `@/components/seo/FAQPageSchema` | All pages |
| `RoleContentHub` | `@/components/RoleContentHub` | All pages |
| `RoleCalculator` | `@/components/RoleCalculator` | Jobs, Definition, Salary |
| `IR35Calculator` | `@/components/IR35Calculator` | Jobs, Salary |
| `ServerJobGrid` | `@/components/ServerJobGrid` | Jobs pages |
| `HotJobsLines` | `@/components/HotJobsLines` | Jobs pages |
| `BreadcrumbsLight` | `@/components/Breadcrumbs` | Jobs, Definition, Salary |
| `HireProcessStepper` | `@/components/HireProcessStepper` | Hiring pages |
| `VoiceInput` | `@/components/voice-input` | Hiring pages |

---

## FAQ Data Location

FAQs are stored in `/src/components/seo/FAQ.tsx`:
- `CMO_FAQS`, `CTO_FAQS`, `CFO_FAQS`, `COO_FAQS`
- `CHRO_FAQS`, `CEO_FAQS`, `CPO_FAQS`, `CISO_FAQS`

---

## Database Queries

Jobs pages query the `jobs` table with:
- `role_category` filter (Marketing, Engineering, Finance, Operations, HR, Executive, Product, Security)
- UK location filter
- `is_active = true`
- Excludes interim roles

---

## Git Commits (Recent)

1. `1b6e0e6` - Improve internal linking and resources on CHRO, CEO, CPO, CISO pages
2. `a336bae` - Add hiring guide pages for CHRO, CEO, CPO, and CISO
3. `179a218` - Add salary guide pages for CHRO, CEO, CPO, and CISO
4. `71a7dee` - Add role definition pages for CHRO, CEO, CPO, and CISO
5. `2f08c57` - Add Jobs UK pages for CHRO, CEO, CPO, and CISO roles

---

## Next Steps (Priority Order)

### Priority 1: Apply Audit Fixes to CMO, CTO, CFO, COO Pages

**For each role (CMO, CTO, CFO, COO), update these 3 page types:**

1. **Jobs UK page** (`/fractional-{role}-jobs-uk/page.tsx`):
   - Add internal links to `/fractional-{role}`, `/fractional-{role}-salary`, `/hire-fractional-{role}`
   - Add external authority links (see list above for each role)
   - Add location grid (London, Manchester, Birmingham, Edinburgh, Bristol, Leeds, Glasgow, Remote UK)

2. **Role Definition page** (`/fractional-{role}/page.tsx`):
   - Change Related Resources from 2 to 3 cards (add hiring guide)
   - Add External Resources section with professional body links

3. **Salary page** (`/fractional-{role}-salary/page.tsx`):
   - Change Related Resources from 3 to 4 cards (add hiring guide)
   - Add External Salary Resources links

**Reference**: Look at `/fractional-chro-jobs-uk/page.tsx`, `/fractional-chro/page.tsx`, `/fractional-chro-salary/page.tsx` for the exact pattern to follow.

### Priority 2: Additional Tasks

1. **Test all pages** build and render correctly (`npm run build`)
2. **SEO audit** - ensure all canonical URLs and metadata are correct
3. **Add any missing components** (e.g., RoleNews if articles table is created)

---

## File Naming Convention

```
/src/app/
├── fractional-{role}/page.tsx          # Role definition
├── fractional-{role}-jobs-uk/page.tsx  # Jobs UK
├── fractional-{role}-salary/page.tsx   # Salary guide
└── hire-fractional-{role}/page.tsx     # Hiring guide
```

---

## Quality Checklist (Per Page)

- [ ] Metadata export with title, description, keywords
- [ ] Canonical URL set
- [ ] WebPageSchema component
- [ ] FAQPageSchema component (if FAQ exists)
- [ ] 15+ internal links
- [ ] 3+ external authority links
- [ ] Correct color theme
- [ ] RoleContentHub at bottom
- [ ] Builds without errors
- [ ] No hydration mismatches
