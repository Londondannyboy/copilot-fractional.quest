# Neon Job Schema Reference

## Database Connection
- **Project ID**: `plain-glade-34229418`
- **Table**: `public.jobs`

## Required Fields for Job Entries

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | varchar | YES | URL-friendly unique identifier (e.g., `interim-cfo-uk`) |
| `external_id` | varchar | YES | Source identifier (e.g., `fq-interim-cfo-uk`) |
| `company_name` | varchar | YES | Always `Fractional Quest` for poster cards |
| `title` | varchar | YES | Job title with variants (e.g., `Interim CFO / Acting Finance Director — UK`) |
| `url` | text | YES | Link to cluster page (e.g., `https://fractional.quest/interim-cfo-jobs-uk`) |

## Key Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `location` | varchar | - | Display location (e.g., `United Kingdom`) |
| `city` | USER-DEFINED | - | City enum for filtering |
| `country` | varchar | - | Full country name (e.g., `United Kingdom`) |
| `workplace_type` | varchar | - | `Remote`, `Hybrid`, or `On-site` |
| `is_remote` | boolean | - | true for remote/hybrid roles |
| `employment_type` | varchar | - | e.g., `Contract`, `Part-Time` |
| `compensation` | varchar | - | Display rate (e.g., `£900-£1,500/day`) |
| `salary_min` | integer | - | Numeric min for schema (e.g., `900`) |
| `salary_max` | integer | - | Numeric max for schema (e.g., `1500`) |
| `salary_currency` | varchar | - | `GBP` |
| `posted_date` | date | - | `CURRENT_DATE` |
| `application_deadline` | date | - | `CURRENT_DATE + INTERVAL '90 days'` |
| `is_active` | boolean | true | Show in listings |
| `is_fractional` | boolean | false | true for fractional roles |
| `is_interim` | boolean | false | true for interim roles |
| `role_category` | USER-DEFINED | - | e.g., `Finance`, `Engineering`, `Marketing` |
| `executive_title` | USER-DEFINED | - | e.g., `CFO`, `CTO`, `CMO` |
| `site_tags` | text[] | '{}' | Array of tags (e.g., `['featured', 'poster-card', 'uk']`) |
| `source` | text | - | `fractional-quest` |
| `description_snippet` | text | - | Short summary for listings |
| `full_description` | text | - | Long-form markdown content |

## Engagement Type Mapping

| Type | is_fractional | is_interim | employment_type | site_tags |
|------|---------------|------------|-----------------|-----------|
| Fractional | true | false | Contract | `['fractional']` |
| Interim | false | true | Contract | `['interim']` |
| Part-Time | true | false | Part-Time | `['part-time']` |
| Advisory | true | false | Contract | `['advisory']` |

## Role Category Values

```
Finance, Engineering, Marketing, Operations, Executive,
Human Resources, Product, Security, Revenue, Commercial
```

## Executive Title Values

```
CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, CIO, CRO, CCO
```

## Example INSERT Statement

```sql
INSERT INTO jobs (
  slug, external_id, company_name, title, url,
  location, country, workplace_type, is_remote,
  employment_type, compensation, salary_min, salary_max, salary_currency,
  posted_date, application_deadline,
  is_active, is_fractional, is_interim,
  role_category, executive_title, site_tags, source,
  description_snippet, full_description
) VALUES (
  'interim-cfo-uk',
  'fq-interim-cfo-uk',
  'Fractional Quest',
  'Interim CFO / Acting Finance Director — UK',
  'https://fractional.quest/interim-cfo-jobs-uk',
  'United Kingdom',
  'United Kingdom',
  'Hybrid',
  true,
  'Contract',
  '£900-£1,500/day',
  900,
  1500,
  'GBP',
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '90 days',
  true,
  false,
  true,
  'Finance',
  'CFO',
  ARRAY['interim', 'poster-card', 'uk', 'featured'],
  'fractional-quest',
  'Interim CFO opportunities across the UK...',
  'Full markdown description...'
);
```

## URL Types

There are TWO URL types for jobs:

| Type | Pattern | Purpose |
|------|---------|---------|
| **Collection Page** | `/interim-cfo-jobs-uk` | Lists jobs, SEO landing page |
| **Job Post** | `/fractional-job/interim-cfo-uk` | Individual job, Google Jobs indexed |

The `url` field in job entries points to the **collection page**.
The **job post** URL is derived from slug: `https://fractional.quest/fractional-job/{slug}`

## Collection Page URL Patterns

| Type | URL Pattern |
|------|-------------|
| Fractional | `/fractional-{role}-jobs-uk` |
| Interim | `/interim-{role}-jobs-uk` |
| Part-Time | `/part-time-{role}-jobs-uk` |
| Advisory | `/advisory-{role}-jobs-uk` |

## Job Post URL Pattern

All individual job posts use: `/fractional-job/{slug}`

Example: Job with slug `interim-cfo-uk` has:
- Collection page URL (in `url` field): `https://fractional.quest/interim-cfo-jobs-uk`
- Job post URL: `https://fractional.quest/fractional-job/interim-cfo-uk`
