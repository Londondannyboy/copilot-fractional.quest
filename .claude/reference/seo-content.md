# SEO Content Development Rules

> Load this reference when working on SEO content or high-traffic pages.

## SEO Content Structure

All SEO content files follow this pattern in `/src/lib/seo-content/`:

```typescript
export const LONDON_CONTENT: LocationSEOContent = {
  title: "Fractional Jobs London",
  introduction: "...",
  whyLocation: "...",

  dayRates: {
    junior: "£800-1,000",
    mid: "£1,000-1,200",
    senior: "£1,200-1,500",
    annual: "£150,000-225,000 equivalent"
  },

  authorityLinks: [
    { label: "City of London", url: "...", domain: "..." },
    // 8+ authority links for E-E-A-T
  ],

  statistics: [
    { value: "45%", label: "...", source: "..." },
    // 5+ with citations
  ],

  locations: [
    { name: "London", description: "...", sectors: ["Finance", "Tech"] },
  ],

  emergingRoles: [
    { title: "...", description: "...", rate: "£1,200-1,500" },
  ],

  faqs: [
    { question: "...", answer: "..." },
    // 6+ questions
  ],

  relatedPages: [
    "/fractional-cfo-jobs-uk",
    // 8+ internal links
  ],
};
```

## Required Elements for High-Traffic Pages

1. **Authority Links** (8+)
   - Professional bodies (ICAEW, CIPD, CIM, BCS)
   - Government sources (gov.uk, ONS)
   - Industry publications

2. **Statistics with Citations** (5+)
   - Market size/growth
   - Salary data
   - Demand trends
   - Source attribution

3. **FAQs** (6+)
   - Target featured snippets
   - Include in FAQ schema

4. **Internal Links** (8+)
   - Related role pages
   - Location variants
   - Service pages

## Schema Markup

### WebPage Schema
```typescript
<WebPageSchema
  title={page.title}
  description={page.meta_description}
  url={`https://fractional.quest/${slug}`}
/>
```

### FAQ Schema
```typescript
<FAQPageSchema faqs={page.faqs} />
```

### Job Posting Schema
For job pages, include JobPosting schema.

## Content Quality Checklist

- [ ] Title tag < 60 characters
- [ ] Meta description < 160 characters
- [ ] H1 matches search intent
- [ ] Keywords in first paragraph
- [ ] Authority links (8+)
- [ ] Statistics with sources (5+)
- [ ] FAQs (6+)
- [ ] Internal links (8+)
- [ ] Schema markup
- [ ] Mobile responsive
- [ ] Core Web Vitals pass

## Page Types by Priority

### High Priority (10+ clicks/month)
- /fractional-jobs-london (115)
- /london (40)
- /fractional-jobs-uk (23)
- /fractional-cmo-jobs-uk (17)
- /fractional-cto-jobs-uk (16)
- /fractional-coo-jobs-uk (12)

### Medium Priority (2-10 clicks)
- /fractional-cfo-jobs-uk
- /fractional-ciso-jobs-uk
- /remote-fractional-jobs

## V1 vs V2 Quality

V2 pages must match or exceed V1 in:
- Visual design (hero, layout, spacing)
- Content depth (word count, sections)
- Interactive elements (job board, calculator)
- SEO signals (schema, links, FAQs)

Use JobPageClient pattern for all high-traffic pages, not PageRenderer.
