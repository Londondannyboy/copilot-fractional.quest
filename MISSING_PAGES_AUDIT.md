# Missing Pages Audit - GSC Indexed URLs

## CRITICAL: Dynamic Routes Needed

### 1. Job Detail Pages (`/fractional-job/[slug]`)
Google has indexed ~50+ individual job pages. Need dynamic route.
Examples:
- /fractional-job/fractional-hr-consultant-adams-hr-group-llc-tu2j
- /fractional-job/fractional-cto-bestman-solutions-jfj1
- /fractional-job/part-time-head-of-finance-camino-partners-ltd-4348882116

**ACTION**: Create `/src/app/fractional-job/[slug]/page.tsx` that queries jobs table

### 2. Company Pages (`/company/[domain]`)
- /company/www.zuehlke.com
- /company/hellolunajoy.com
- /company/ct.catapult.org.uk

**ACTION**: Create `/src/app/company/[domain]/page.tsx` OR redirect to homepage

---

## Missing Content Pages (Need Articles or Redirects)

### Location Pages
| URL | Status | Action |
|-----|--------|--------|
| /fractional-jobs-belfast | MISSING | Create article |
| /fractional-jobs-leeds | MISSING | Create article |
| /fractional-jobs-ecommerce | MISSING | Create article |
| /fractional-jobs-au | MISSING | Redirect to /fractional-jobs-uk |
| /fractional-jobs-us | MISSING | Redirect to /fractional-jobs-uk |
| /fractional-jobs-professional-services | MISSING | Create article |

### Guide/Content Pages
| URL | Status | Action |
|-----|--------|--------|
| /fractional-head-of-ai-jobs-uk | MISSING | Create article |
| /fractional-controller-jobs | MISSING | Create article |
| /fractional-cfo-vs-full-time-cfo-comparison | MISSING | Create article |
| /portfolio-career | MISSING | Create article |
| /fractional-executive-salary-guide-2025 | MISSING | Create article |
| /what-is-a-fractional-cto | MISSING | Redirect to /fractional-cto |
| /fractional-cfo-near-me | MISSING | Redirect to /fractional-cfo-jobs-uk |
| /fractional-hr-salary | MISSING | Redirect to /fractional-chro-salary |
| /fractional-hr-vs-full-time | MISSING | Create article |
| /fractional-compliance-fintech | MISSING | Create article |
| /fractional-hr-roles | MISSING | Redirect to /fractional-chro-jobs-uk |
| /what-is-fractional | MISSING | Redirect to /fractional-jobs-uk |
| /what-is-a-fractional-ceo-guide | MISSING | Redirect to /fractional-ceo |
| /fractional-sales-director | MISSING | Create article |
| /fractional-agency | MISSING | Redirect to /fractional-jobs-uk |
| /fractional-hr-director | MISSING | Redirect to /fractional-chro-jobs-uk |
| /fractional-roles | MISSING | Redirect to /fractional-jobs-uk |
| /fractional-services | MISSING | Redirect to /fractional-jobs-uk |
| /how-to-become-a-fractional-cto | MISSING | Create article |
| /how-to-become-fractional-cfo | MISSING | Create article |
| /fractional-dpo-services | MISSING | Create article |
| /fractional-property-ownership-uk | OFF-TOPIC | Redirect to homepage (property, not jobs) |
| /fractional-client-services-services | MISSING | Redirect to /fractional-jobs-uk |
| /fractional-coo-meaning | MISSING | Redirect to /fractional-coo |
| /fractional-marketing | MISSING | Redirect to /fractional-cmo-jobs-uk |
| /fractional-executives-for-startups | MISSING | Create article |
| /fractional-executive | MISSING | Redirect to /fractional-jobs-uk |
| /fractional-cto-hourly-rate | MISSING | Redirect to /fractional-cto-salary |
| /fractional-hr-jobs-uk | MISSING | Redirect to /fractional-chro-jobs-uk |
| /benefits-of-fractional-executives | MISSING | Create article |
| /fractional-executive-guide | MISSING | Redirect to /fractional-jobs-uk |
| /interim-jobs-uk | MISSING | Redirect to /fractional-jobs-uk |
| /fractional-operations-director | MISSING | Redirect to /fractional-coo-jobs-uk |
| /linkedin-content-strategy-fractional-executives | MISSING | Create article |
| /linkedin-profile-optimization-fractional-executives | MISSING | Create article |
| /remote-fractional-jobs-guide | MISSING | Redirect to /remote-fractional-jobs |
| /fractional-data | MISSING | Redirect to /fractional-jobs-uk |
| /fractional-consulting | MISSING | Redirect to /fractional-jobs-uk |
| /fractional-operations-jobs | MISSING | Redirect to /fractional-coo-jobs-uk |

### Article URLs (need /articles/ route or redirect)
| URL | Action |
|-----|--------|
| /articles/fractional-executive-salary-guide-2025 | Create article |
| /articles/remote-fractional-jobs | Redirect to /remote-fractional-jobs |
| /articles/fractional-jobs-manchester | Redirect to /manchester |
| /articles/fractional-roles | Redirect to /fractional-jobs-uk |
| /articles/fractional-executives-for-startups | Create article |
| /articles/remote-fractional-jobs-guide | Redirect to /remote-fractional-jobs |
| /articles/benefits-of-fractional-executives | Create article |
| /articles/fractional-cfo-services-uk | Redirect to /fractional-cfo-services |
| /articles/fractional-cfo-jobs-uk | Redirect to /fractional-cfo-jobs-uk |

### Query String URLs (should 404 or redirect to base)
- /fractional-jobs-articles?category=cfo
- /jobs?role=coo
- /fractional-jobs?industry=Professional Services
- /articles?keyword=part-time ceo

---

## Summary

| Category | Count | Action |
|----------|-------|--------|
| Job detail pages | ~50 | Create dynamic route |
| Company pages | 3 | Create route or redirect |
| Location pages | 6 | Mix of articles and redirects |
| Guide/content pages | 40+ | Mix of articles and redirects |
| Article redirects | 9 | Add redirects |

**Total gaps: ~100 URLs**
