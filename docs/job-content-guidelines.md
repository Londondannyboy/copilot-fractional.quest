# Fractional Job Content Guidelines

This document provides SEO best practices for creating job listings on fractional.quest that rank well in Google Jobs and organic search.

## Keyword Density

**Target:** 1.5-2% keyword density (15-20 mentions per 1000 words)

### Primary Keyword Variations
Use multiple variations to avoid keyword stuffing:

| Role | Variations |
|------|------------|
| CFO | Fractional CFO, Part-Time Finance Director, Portfolio CFO, Interim CFO |
| CTO | Fractional CTO, Part-Time Technology Director, Technology Leader, Tech Lead |
| CMO | Fractional CMO, Part-Time Marketing Director, Marketing Leader |
| COO | Fractional COO, Part-Time Operations Director, Operations Leader |
| CHRO | Fractional CHRO, Part-Time HR Director, People Leader |
| CISO | Fractional CISO, Part-Time Security Director, Security Leader |
| CPO | Fractional CPO, Part-Time Product Director, Product Leader |
| CEO | Fractional CEO, Part-Time Managing Director, Business Leader |

### What to Avoid
- Using the exact primary keyword more than 25 times per 1000 words
- Repeating the keyword in every heading
- Forced or unnatural keyword placement

---

## Required H2 Headings

Each job description should have **8 H2 headings**. Only **4 maximum** should contain the primary keyword.

### Recommended Structure

1. **About This {Role} Opportunity in {Location}** (keyword)
2. **What Does a {Role} Do?** (keyword)
3. **Day Rates in {Location}** (no keyword)
4. **Who Should Apply?** (no keyword)
5. **Working Arrangements** (no keyword)
6. **{Location} Sectors Seeking This Role** (no keyword)
7. **The UK Market for This Role** (no keyword)
8. **How to Apply for {Role} Roles** (keyword)

### Keyword-Free Alternatives

Instead of repeating the keyword in every heading, use:
- "This Role" / "This Opportunity"
- "The Position"
- "Finance Leadership" / "Technology Leadership" / etc.
- "Ideal Candidate Profile"
- "Working Arrangements"

---

## Required Links

### External Authority Links (5+ required)

Each job description **MUST** include links to relevant professional bodies and authoritative sources:

| Role | Required External Links |
|------|------------------------|
| CFO | ICAEW, ACCA, CIMA, FRC, HMRC, Glassdoor, British Business Bank |
| CTO | BCS, IET, Tech Nation, GDS, Gartner |
| CMO | CIM, DMA, Marketing Week, IPA, WARC |
| COO | CMI, IOD, CIPS, APM |
| CHRO | CIPD, SHRM, ACAS, IOD |
| CISO | NCSC, ISC2, ISACA, CREST, ICO |
| CPO | Product School, Mind the Product, SVPG |
| CEO | IOD, ScaleUp Institute, British Business Bank |

**Format:** Inline Markdown links within paragraphs:
```markdown
According to [ICAEW](https://www.icaew.com), demand for flexible finance leadership...
```

### Internal Links (4+ required)

Every job description **MUST** include links to related fractional.quest pages at the bottom:

```markdown
Browse more opportunities:
[All Fractional {Role} Jobs UK](https://fractional.quest/fractional-{role}-jobs-uk) |
[{Location} Jobs](https://fractional.quest/fractional-jobs-{location}) |
[Remote Fractional Jobs](https://fractional.quest/remote-fractional-jobs) |
[{Role} Salary Guide](https://fractional.quest/fractional-{role}-salary) |
[What is a Fractional {Role}?](https://fractional.quest/fractional-{role})
```

---

## Image Requirements

Images are set by the template based on role category, but ensure:

- **Alt text format:** `{Role keyword} job opportunity - {title} at {company}`
- **Title attribute:** `{Role keyword} opportunity in {location}`

---

## Content Structure

### Opening Paragraph
- Bold the primary keyword **once** in the first paragraph
- Include location and day rate range
- Mention that this is a "portfolio role" or "part-time opportunity"

Example:
```markdown
We are seeking an experienced **Fractional CFO** (also known as a Part-Time Finance Director)
to provide strategic financial leadership to high-growth companies across London. This is a
portfolio role offering 1-3 days per week, with remote and hybrid working options available.
```

### Sector Breakdown
Include a bullet list of 4-6 sectors with day rates:

```markdown
## London Sectors Seeking Part-Time CFOs

- **Private Equity Portfolio** — Value creation, exit preparation, carve-outs (£1,200-£1,500/day)
- **SaaS & Tech Scale-Ups** — ARR metrics, runway management, Series A-C support
- **E-commerce** — Working capital, inventory financing, marketplace economics
- **Professional Services** — Partner economics, WIP management, cash conversion
- **HealthTech** — NHS contracts, clinical trial budgets, regulatory compliance
```

### Ideal Candidate
Focus on experience level and qualifications without repeating the keyword excessively:

```markdown
## Who Should Apply?

Ideal candidates will have 15+ years in finance leadership with ACA, ACCA, or CIMA
qualification. Experience as a Finance Director or CFO in companies generating
£5M-£100M+ revenue is essential.
```

---

## Word Count

- **Minimum:** 800 words
- **Target:** 1000-1200 words
- **Maximum:** 1500 words (to avoid thin content penalties while maintaining readability)

---

## Google Jobs Schema

The template automatically generates JobPosting schema with:
- `datePosted` and `validThrough` (90 days from posted date)
- `employmentType: ["CONTRACTOR"]`
- `jobLocation` with full address
- `baseSalary` with currency and day rate
- `hiringOrganization` with logo

Ensure the database fields are correctly populated:
- `salary_min` and `salary_max` (numeric)
- `salary_currency` (GBP)
- `city` and `country` (for accurate geolocation)
- `workplace_type` (Hybrid, Remote, On-site)

---

## Quality Checklist

Before publishing, verify:

- [ ] Word count: 800-1500 words
- [ ] Keyword density: 1.5-2% (use a tool to check)
- [ ] Headings: 8 H2s, max 4 with primary keyword
- [ ] External links: 5+ to professional bodies
- [ ] Internal links: 4+ to related fractional.quest pages
- [ ] Bold keyword: Once in opening paragraph
- [ ] Sector breakdown: 4-6 sectors with day rates
- [ ] Location mentioned: In title, first paragraph, and working arrangements
- [ ] Day rate range: Specified clearly

---

## Example: Well-Optimized Job Description

See the live example at:
- `/fractional-job/fractional-cfo-london`
- `/fractional-job/fractional-cto-london`

These follow all guidelines and can be used as templates for new job listings.
