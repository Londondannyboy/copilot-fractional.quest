# Create Page Command

Create a new page (database or static) with full quality.

## Usage

```
/create-page {slug} {type}
```

Types: `database`, `static`, `mdx`

## Instructions

### For Database Pages

1. **Determine Content**
   - What is the page about?
   - What page_type? (jobs_uk, specialist, guide, etc.)
   - What sections are needed?

2. **Read Reference**
   - Load `/.claude/reference/database-pages.md`

3. **Insert to Neon**

```sql
INSERT INTO pages (slug, title, meta_description, hero_title, hero_subtitle, page_type, sections, faqs, is_published)
VALUES (
  '{slug}',
  '{Title} | Fractional Quest',
  '{meta description}',
  '{Hero Title}',
  '{Hero subtitle}',
  '{page_type}',
  '[...]'::jsonb,
  '[...]'::jsonb,
  true
) ON CONFLICT (slug) DO NOTHING;
```

4. **Verify**
   - Check page renders at `/{slug}`
   - Verify CopilotKit works
   - Check mobile layout

### For Static Pages (JobPageClient)

1. **Create Directory**
   - `/src/app/{slug}/page.tsx`

2. **Create SEO Content**
   - `/src/lib/seo-content/{slug}.ts`

3. **Add to STATIC_ROUTE_SLUGS**
   - Update `/src/app/[slug]/page.tsx`

4. **Include All Components**
   - CopilotKit sidebar
   - EmbeddedJobBoard
   - HotJobs
   - EmailCapture
   - RoleCalculator
   - Hero with image
   - FAQs
   - Schema markup

### For MDX Pages

1. **Create Page File**
   - `/src/app/{slug}/page.tsx`

2. **Use MDX Components**
   - PersonalizedHero
   - SalaryBenchmarkChart
   - CareerTimeline
   - MarketOverview
   - CopilotMainPanel
   - EmbeddedJobBoard
   - RoleCalculator

3. **Include Voice + Sidebar**

## Quality Checklist

- [ ] Page renders without errors
- [ ] CopilotKit works (chat + voice)
- [ ] Mobile responsive
- [ ] SEO meta tags present
- [ ] Schema markup included
- [ ] Authority links (for high-traffic)
- [ ] FAQs included
- [ ] Internal links present
