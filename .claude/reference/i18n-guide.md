# Internationalization (i18n) Guide

## Overview

Fractional.quest supports 4 markets: UK (default), US, Australia, New Zealand.

**Library**: next-intl
**Strategy**: UK pages stay at root for SEO preservation, international pages use locale prefix

## URL Structure

| Market | URL Pattern | Example |
|--------|-------------|---------|
| UK | `/fractional-{role}-jobs-uk` | `/fractional-cfo-jobs-uk` |
| US | `/us/fractional-{role}-jobs` | `/us/fractional-cfo-jobs` |
| AU | `/au/fractional-{role}-jobs` | `/au/fractional-cfo-jobs` |
| NZ | `/nz/fractional-{role}-jobs` | `/nz/fractional-cfo-jobs` |

## Key Configuration Files

### `src/i18n/config.ts`
- Locale definitions: `uk`, `us`, `au`, `nz`
- Locale metadata: name, language, hreflang, currency, symbol
- Location options per market (cities for job filtering)

### `src/i18n/currency.ts`
- Static exchange rates (GBP as base)
- Market-specific day rates by role (not just converted UK rates)
- Currency formatting utilities

### `src/i18n/routing.ts`
- next-intl routing configuration
- `localePrefix: 'as-needed'` (UK at root)

### `src/middleware.ts`
- Auto-redirect based on browser `Accept-Language` header
- Sets `NEXT_LOCALE` cookie for persistence
- Maps `en-US` → `us`, `en-AU` → `au`, `en-NZ` → `nz`, `en-GB` → `uk`

## Adding a New International Role Page

1. **Create SEO content file**:
   ```
   src/lib/seo-content/cto-jobs-us.ts
   src/lib/seo-content/cto-jobs-au.ts
   src/lib/seo-content/cto-jobs-nz.ts
   ```
   Copy from `cfo-jobs-us.ts` pattern and adapt:
   - Meta title/description with local currency
   - Local authority links (US: AICPA, AU: CPA Australia, etc.)
   - Local statistics
   - Local city references
   - Local FAQs

2. **Create page directory**:
   ```
   src/app/[locale]/fractional-cto-jobs/page.tsx
   ```
   Copy from `fractional-cfo-jobs/page.tsx` and update:
   - Import role-specific SEO content
   - Update role filter
   - Update image category

3. **Update sitemap** (optional, for existing roles):
   International roles are auto-generated in `sitemap.ts`

## Components Supporting Locales

### `EmbeddedJobBoard`
```tsx
<EmbeddedJobBoard locale="us" />
```
- Uses locale-specific location options
- Passes country to jobs API

### `RoleCalculator`
```tsx
<RoleCalculator role="cfo" locale="us" />
```
- Uses market-specific day rates
- Formats currency in locale

### `IntelligentJobPageClient`
```tsx
<IntelligentJobPageClient locale="us" ... />
```
- Accepts locale for child components

### `LocaleSwitcher`
- Header dropdown for manual locale switching
- Sets cookie for persistence

### `HreflangTags`
```tsx
<HreflangTags path="/fractional-cfo-jobs" />
```
- Generates hreflang links for all locales

## Jobs API

`/api/jobs/search?country=us`

- `country` parameter filters jobs by location keywords
- Defaults to `uk` for backwards compatibility
- Remote jobs show for all countries

## Currency Rates (src/i18n/currency.ts)

```typescript
const exchangeRates = {
  GBP: 1,
  USD: 1.27,
  AUD: 1.93,
  NZD: 2.08,
}
```

**Note**: Market-specific day rates in `roleDefaultsByLocale` are researched rates, not just converted UK rates.

## hreflang Tags

All pages should include hreflang tags pointing to alternates:
- `en-GB` → UK page
- `en-US` → US page
- `en-AU` → AU page
- `en-NZ` → NZ page
- `x-default` → UK page

Use `HreflangTags` component or `generateHreflangAlternates()` for metadata.

## Testing Locales

1. **Manual**: Add `?locale=us` or visit `/us/fractional-cfo-jobs`
2. **Browser**: Change browser language settings
3. **Cookie**: Set `NEXT_LOCALE=us` cookie

## Current International Page Coverage

As of Jan 2026:
- CFO jobs: US, AU, NZ (full pages with SEO content)
- Other roles: Pages exist but redirect to CFO (need SEO content)

## Next Steps for Full Coverage

1. Create SEO content files for remaining roles (CTO, CMO, etc.)
2. Create page files in `[locale]` directory
3. Add market-specific statistics and authority links
4. Populate database with international job listings
