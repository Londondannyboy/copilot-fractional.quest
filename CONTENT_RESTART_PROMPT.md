# Content Creation Restart Prompt

Use this prompt when starting a new session for content/job creation tasks.

---

## Context

I'm working on Fractional Quest at `/Users/dankeegan/fractional.quest`. The site is a UK executive job marketplace covering fractional, interim, part-time, and advisory C-suite roles.

## Database

- **Project**: `plain-glade-34229418`
- **Table**: `public.jobs`

## Reference Files (Read These First)

Before creating jobs or content, read:
1. `.claude/reference/job-schema.md` - Database schema, required fields
2. `.claude/reference/seo-templates.md` - Description templates, authority links
3. `.claude/reference/role-data.md` - Day rates, role categories

## Current Job Coverage

**11 Roles**: CCO, CEO, CFO, CHRO, CIO, CISO, CMO, COO, CPO, CRO, CTO

**4 Engagement Types per role**: Fractional, Interim, Part-Time, Advisory

**Total**: 44 job entries in database

## Page Coverage (Static Files)

| Page Type | Roles | Status |
|-----------|-------|--------|
| Fractional Jobs UK | All 11 | Complete |
| Interim Jobs UK | All 11 | Complete |
| Part-Time Jobs UK | All 11 | Complete |
| Advisory Jobs UK | All 11 | Complete |
| Role Definitions | All 11 | Complete |
| Salary Guides | All 11 | Complete |
| Hire Pages | All 11 | Complete |

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Check for errors
git add -A && git commit -m "message" && git push  # Deploy
```

## Creating New Job Entries

### Quick SQL Template

```sql
INSERT INTO jobs (
  slug, external_id, company_name, title, url,
  location, country, workplace_type, is_remote,
  employment_type, compensation, salary_min, salary_max, salary_currency,
  posted_date, application_deadline,
  is_active, is_fractional, is_interim,
  role_category, executive_title, site_tags, source,
  description_snippet
) VALUES (
  '{engagement}-{role}-uk',
  'fq-{engagement}-{role}-uk',
  'Fractional Quest',
  '{Title} / {Alternative} — UK',
  'https://fractional.quest/{engagement}-{role}-jobs-uk',
  'United Kingdom', 'United Kingdom', 'Hybrid', true,
  'Contract', '£{min}-{max}/day', {min}, {max}, 'GBP',
  CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days',
  true, {is_fractional}, {is_interim},
  '{category}', '{ROLE}',
  ARRAY['{engagement}', 'poster-card', 'uk'],
  'fractional-quest',
  '{Engagement} {Role} opportunities across the UK. £{min}-{max}/day. Remote & hybrid options.'
);
```

### Engagement Type Settings

| Type | is_fractional | is_interim | employment_type |
|------|---------------|------------|-----------------|
| Fractional | true | false | Contract |
| Interim | false | true | Contract |
| Part-Time | true | false | Part-Time |
| Advisory | true | false | Contract |

## Creating New Pages

1. Copy existing template from `src/app/fractional-cfo-jobs-uk/`
2. Create SEO content file in `src/lib/seo-content/`
3. Add slug to `STATIC_ROUTE_SLUGS` in `src/app/[slug]/page.tsx`
4. Build and verify

## Key Components

- `JobPageClient` - Full job page with CopilotKit sidebar
- `EmbeddedJobBoard` - Filterable job grid
- `RoleCalculator` - Day rate calculator
- `ServerJobGrid` - Server-rendered jobs
- `HotJobsLines` - Featured carousel

## Authority Links Quick Reference

| Role | Key Links |
|------|-----------|
| CFO | ICAEW, ACCA, CIMA, FRC, British Business Bank |
| CTO | BCS, Tech Nation, IET, GDS |
| CMO | CIM, DMA, Marketing Week, IPA |
| COO | CMI, IOD, CIPS |
| CHRO | CIPD, ACAS |
| CISO | NCSC, ISC2, ISACA, ICO |
| CPO | Product School, Mind the Product, SVPG |
| CRO | ISM |
| CCO | IOD, CBI |

---

**Last Updated**: 2026-01-26
