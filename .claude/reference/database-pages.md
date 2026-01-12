# Database Pages Development Rules

> Load this reference when working on Neon database pages.

## Overview

Database pages are stored in Neon PostgreSQL and rendered via PageRenderer (56 section types) or MDXRenderer (new).

## Database Connection

Project ID: `plain-glade-34229418`

```typescript
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);
```

## Pages Table Schema

```sql
CREATE TABLE pages (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  page_type TEXT NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT,
  keywords TEXT[],
  canonical_url TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_badge TEXT,
  image_category TEXT,
  sections JSONB DEFAULT '[]',
  job_board_enabled BOOLEAN DEFAULT true,
  job_board_department TEXT,
  job_board_location TEXT,
  job_board_title TEXT,
  accent_color TEXT DEFAULT 'emerald',
  internal_links JSONB DEFAULT '[]',
  external_links JSONB DEFAULT '[]',
  related_pages TEXT[],
  faqs JSONB DEFAULT '[]',
  stats JSONB DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Page Types

| Type | Count | Description |
|------|-------|-------------|
| jobs_uk | 42 | Role-specific UK job listings |
| specialist | 35 | Niche expertise pages |
| guide | 26 | How-to content |
| industry | 19 | Sector-specific |
| comparison | 12 | vs pages |
| definition | 12 | What is X |
| location | 23 | City-specific |
| pricing | 8 | Cost/rate pages |
| career_guide | 8 | How to become |

## Section Types (PageRenderer)

PageRenderer handles 56+ section types. Key ones:
- `role_cards` - Grid of role cards with links
- `stats_bar` - Statistics row
- `geographic_sectors` - Location grid
- `case_study` - Case study section
- `calculator` - Earnings calculator
- `job_board` - Embedded job listings
- `video` - YouTube embed
- `cta_section` - Call to action
- `prose_grid` - Text grid

## Inserting Pages

```sql
INSERT INTO pages (slug, title, page_type, hero_title, hero_subtitle, sections, faqs, is_published)
VALUES (
  'fractional-cfo-saas',
  'Fractional CFO for SaaS | Fractional Quest',
  'specialist',
  'Fractional CFO for SaaS',
  'Financial leadership for subscription businesses',
  '[{"type": "text", "title": "...", "content": "..."}]'::jsonb,
  '[{"question": "...", "answer": "..."}]'::jsonb,
  true
);
```

## Dynamic Route

`/src/app/[slug]/page.tsx` serves database pages:
```typescript
const page = await getPageBySlug(slug);
if (!page) notFound();

// Check if static route exists
if (STATIC_ROUTE_SLUGS.includes(slug)) notFound();

return <PageWithCopilot page={page} />;
```

## STATIC_ROUTE_SLUGS

Pages with static files are excluded from dynamic route:
```typescript
const STATIC_ROUTE_SLUGS = [
  'fractional-jobs-london',
  'fractional-jobs-uk',
  'fractional-cfo-jobs-uk',
  // ... all static pages
];
```

## When to Use Database vs Static

**Database (PageRenderer)**:
- Low-traffic supporting content
- Simple text/FAQ pages
- Quick iteration needed

**Static (JobPageClient)**:
- High-traffic job pages
- Complex interactive components
- SEO-critical pages

**MDX (New)**:
- Rich content with embedded components
- Personalized pages
- AI-generated content

## Best Practices

1. **Use ON CONFLICT** - Prevent duplicate slug errors
2. **JSONB for sections** - Flexible content structure
3. **TEXT[] for arrays** - Use ARRAY['a', 'b'] syntax
4. **Check page_type** - Match existing types
5. **Include FAQs** - Good for SEO
