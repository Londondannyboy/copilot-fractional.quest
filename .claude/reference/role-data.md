# Role Data Reference

## Day Rates by Role & Engagement Type

### Fractional Rates (1-3 days/week ongoing)

| Role | Min | Max | Display |
|------|-----|-----|---------|
| CCO | 800 | 1200 | £800-1,200/day |
| CEO | 1000 | 1500 | £1,000-1,500/day |
| CFO | 800 | 1200 | £800-1,200/day |
| CHRO | 750 | 1100 | £750-1,100/day |
| CIO | 850 | 1250 | £850-1,250/day |
| CISO | 900 | 1350 | £900-1,350/day |
| CMO | 800 | 1200 | £800-1,200/day |
| COO | 850 | 1200 | £850-1,200/day |
| CPO | 850 | 1300 | £850-1,300/day |
| CRO | 850 | 1250 | £850-1,250/day |
| CTO | 900 | 1400 | £900-1,400/day |

### Interim Rates (Full-time 3-12 months)

| Role | Min | Max | Display |
|------|-----|-----|---------|
| CCO | 850 | 1300 | £850-1,300/day |
| CEO | 1200 | 1800 | £1,200-1,800/day |
| CFO | 900 | 1500 | £900-1,500/day |
| CHRO | 800 | 1200 | £800-1,200/day |
| CIO | 900 | 1400 | £900-1,400/day |
| CISO | 1000 | 1500 | £1,000-1,500/day |
| CMO | 900 | 1350 | £900-1,350/day |
| COO | 900 | 1350 | £900-1,350/day |
| CPO | 900 | 1400 | £900-1,400/day |
| CRO | 900 | 1400 | £900-1,400/day |
| CTO | 1100 | 1400 | £1,100-1,400/day |

### Part-Time Rates (Fixed days per week/month)

| Role | Min | Max | Display |
|------|-----|-----|---------|
| CCO | 800 | 1200 | £800-1,200/day |
| CEO | 1000 | 1600 | £1,000-1,600/day |
| CFO | 800 | 1200 | £800-1,200/day |
| CHRO | 750 | 1100 | £750-1,100/day |
| CIO | 850 | 1300 | £850-1,300/day |
| CISO | 900 | 1400 | £900-1,400/day |
| CMO | 850 | 1300 | £850-1,300/day |
| COO | 850 | 1300 | £850-1,300/day |
| CPO | 850 | 1300 | £850-1,300/day |
| CRO | 850 | 1300 | £850-1,300/day |
| CTO | 900 | 1400 | £900-1,400/day |

### Advisory Rates (Board/strategic advisor)

| Role | Min | Max | Display |
|------|-----|-----|---------|
| CCO | 600 | 900 | £600-900/day |
| CEO | 800 | 1200 | £800-1,200/day |
| CFO | 700 | 1000 | £700-1,000/day |
| CHRO | 600 | 900 | £600-900/day |
| CIO | 650 | 950 | £650-950/day |
| CISO | 700 | 1000 | £700-1,000/day |
| CMO | 600 | 900 | £600-900/day |
| COO | 650 | 950 | £650-950/day |
| CPO | 650 | 950 | £650-950/day |
| CRO | 650 | 950 | £650-950/day |
| CTO | 700 | 1000 | £700-1,000/day |

## Role Categories (role_category field)

**Valid enum values**: Engineering, Marketing, Finance, Operations, Sales, HR, Product, Design, Data, Legal, Executive, Other

| Category | Roles | Description |
|----------|-------|-------------|
| Finance | CFO | Financial strategy, reporting, funding |
| Engineering | CTO, CIO, CISO | Technology, development, infrastructure, security |
| Marketing | CMO | Brand, growth, demand generation |
| Operations | COO | Processes, efficiency, delivery |
| Executive | CEO | General management, strategy |
| HR | CHRO | People, culture, talent |
| Product | CPO | Product strategy, roadmap, development |
| Sales | CRO, CCO | Revenue, commercial, partnerships |

## Executive Titles (executive_title field)

**Valid enum values**: CFO, CMO, CTO, COO, CPO, CHRO, CIO, CDO, CSO, CCO, CEO, Managing Director, VP Finance, VP Marketing, VP Engineering, VP Operations, VP Product, Finance Director, Marketing Director, Technology Director, Operations Director, Product Director, HR Director, Other

**Note**: CRO and CISO are NOT valid enum values. Use:
- CISO roles: Use `CSO` (Chief Security Officer)
- CRO roles: Use `Other`

| Title | Full Name | executive_title Value |
|-------|-----------|----------------------|
| CFO | Chief Financial Officer | CFO |
| CTO | Chief Technology Officer | CTO |
| CMO | Chief Marketing Officer | CMO |
| COO | Chief Operating Officer | COO |
| CEO | Chief Executive Officer | CEO |
| CHRO | Chief Human Resources Officer | CHRO |
| CPO | Chief Product Officer | CPO |
| CISO | Chief Information Security Officer | CSO |
| CIO | Chief Information Officer | CIO |
| CRO | Chief Revenue Officer | Other |
| CCO | Chief Commercial Officer | CCO |

## Job Title Templates

### Pattern: `{Engagement} {Role} / {Alternative} — UK`

| Engagement | Example |
|------------|---------|
| Fractional | `Fractional CFO / Part-Time Finance Director — UK` |
| Interim | `Interim CFO / Acting Finance Director — UK` |
| Part-Time | `Part-Time CFO / Flexible Finance Director — UK` |
| Advisory | `Advisory CFO / Non-Executive Financial Advisor — UK` |

## Slug Patterns

| Engagement | Pattern | Example |
|------------|---------|---------|
| Fractional | `fractional-{role}-uk` | `fractional-cfo-uk` |
| Interim | `interim-{role}-uk` | `interim-cfo-uk` |
| Part-Time | `part-time-{role}-uk` | `part-time-cfo-uk` |
| Advisory | `advisory-{role}-uk` | `advisory-cfo-uk` |

## External ID Patterns

| Engagement | Pattern | Example |
|------------|---------|---------|
| Fractional | `fq-fractional-{role}-uk` | `fq-fractional-cfo-uk` |
| Interim | `fq-interim-{role}-uk` | `fq-interim-cfo-uk` |
| Part-Time | `fq-part-time-{role}-uk` | `fq-part-time-cfo-uk` |
| Advisory | `fq-advisory-{role}-uk` | `fq-advisory-cfo-uk` |

## URL Patterns (points to jobs page)

| Engagement | Pattern |
|------------|---------|
| Fractional | `https://fractional.quest/fractional-{role}-jobs-uk` |
| Interim | `https://fractional.quest/interim-{role}-jobs-uk` |
| Part-Time | `https://fractional.quest/part-time-{role}-jobs-uk` |
| Advisory | `https://fractional.quest/advisory-{role}-jobs-uk` |

## Quick Reference: All Roles

```
cfo, cto, cmo, coo, ceo, chro, cpo, ciso, cio, cro, cco
```

## Quick Reference: All Engagement Types

```
fractional, interim, part-time, advisory
```
