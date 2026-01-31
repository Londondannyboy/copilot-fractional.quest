# Fractional Quest - Content Enrichment Session Restart Prompt

## Session Context

You are continuing work on Fractional Quest, a UK-based platform for fractional and interim executive roles. This session focuses on **content enrichment and creation** based on GSC data analysis and Tavily competitive research.

## Quick Start

1. Read `CLAUDE.md` for project overview and Tavily API access
2. Read `.claude/reference/content-plan.md` for the content creation roadmap
3. Access GSC data at `/Users/dankeegan/Desktop/Queries.csv` and `Pages.csv`
4. Check `content_enrichment` table in Neon for pages already enhanced

---

## Enrichments Completed (31 Jan 2026)

### ✅ Calculator Pricing Update
Updated `RoleCalculator.tsx` and `src/i18n/currency.ts` with realistic UK market pricing:
- CMO: £900 avg (was £950), range £600-£1,500
- CFO: £1,000 avg (was £1,050), range £750-£1,500
- CTO: £1,050 avg (was £1,100), range £850-£1,600
- CISO: £1,350 avg (was £1,150), range £1,000-£2,000 (premium for security)
- CHRO: £900 avg (was £850), range £650-£1,400

### ✅ 3-Way Comparison Tables
Enhanced pillar pages with Fractional vs Interim vs Full-Time comparison tables:
- `/fractional-cfo` - 8-row comparison with UK market insight callout
- `/fractional-cmo` - 8-row comparison with amber brand colors
- `/fractional-cto` - 8-row comparison highlighting #1 ranking for CTO jobs

### ✅ Enrichment Tracking Database
Created `content_enrichment` table in Neon to track all page enrichments:
```sql
SELECT page_slug, enrichment_type, enriched_at::date FROM content_enrichment;
```

### Remaining Work
- [ ] Add 3-way comparison tables to COO, CISO, CHRO pages
- [ ] Add PAA-style FAQs to high-traffic pages
- [ ] Create /part-time-cmo and /interim-finance-director pages

---

## Research Completed (Jan 2026)

### Tavily API Access
```bash
curl -s -X POST "https://api.tavily.com/search" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "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",
    "query": "YOUR_KEYWORD_HERE",
    "search_depth": "advanced",
    "include_answer": true,
    "max_results": 5
  }'
```

### Key Findings: Pricing Reality Check

**Our current calculators/content skew HIGH.** Tavily research shows realistic UK rates:

| Role | Entry/Mid Level | Senior | Premium (PE/London) | Our Current Default |
|------|-----------------|--------|---------------------|---------------------|
| CMO | £600-£900/day | £900-£1,200/day | £1,200-£1,500/day | Too high |
| CTO | £850-£1,000/day | £1,000-£1,300/day | £1,300-£1,600/day | Slightly high |
| CFO | £800-£1,000/day | £1,000-£1,200/day | £1,200-£1,500/day | Too high |
| COO | £800-£1,000/day | £1,000-£1,200/day | £1,200-£1,400/day | Too high |
| FD | £500-£750/day | £750-£1,000/day | £1,000-£1,500/day | About right |

**Monthly Retainers (1-2 days/week):**
| Role | Typical Range | Common Mid-Point |
|------|---------------|------------------|
| CMO | £3,000-£6,000 | £4,500/month |
| CTO | £3,400-£6,400 | £5,000/month |
| CFO | £2,500-£5,000 | £4,000/month |
| COO | £3,200-£5,500 | £4,500/month |

### Key Findings: Engagement Length Patterns

| Engagement Type | Typical Duration | Notes |
|-----------------|------------------|-------|
| Fractional | 6+ months ongoing | Scale up/down as needed |
| Interim | 3-9 months | Most common is 6 months |
| Advisory | Ongoing | 2-4 days/month |
| Project-based | 90-day sprints | Transformation projects |

### Key Findings: Hours/Commitment

| Model | Hours/Week | Days/Week |
|-------|------------|-----------|
| Fractional | 10-25 hours | 1-3 days |
| Interim | 32-40 hours | 4-5 days (full-time temp) |
| Advisory | 8-16 hours/month | 2-4 days/month |

---

## Keyword Opportunities

### High-Impression, Zero-Click (Biggest Opportunities)

| Keyword | Impressions | Position | Action |
|---------|-------------|----------|--------|
| fractional cmo | 118 | 75 | Enrich /fractional-cmo page |
| fractional cmo uk | 115 | 35 | Add UK-specific section |
| interim cmo | 97 | 51 | Enrich /interim-cmo page |
| hire fractional coos | 71 | 28 | Enrich /hire-fractional-coo |
| part time cmo | 69 | 26 | Create /part-time-cmo page |
| interim finance director | 58 | 50 | Create dedicated page |
| fractional fd | 52 | 70 | Enrich /fractional-fd page |
| interim cfo | 51 | 72 | Enrich /interim-cfo page |

### Top Performing (Protect These)

| Keyword | Clicks | Position | Notes |
|---------|--------|----------|-------|
| fractional cto jobs | 17 | 1.6 | #1 position - protect this! |
| fractional jobs | 8 | 4.7 | Strong performer |
| interim cto jobs | 8 | 2.5 | Strong performer |

---

## Content Gaps to Fill

### 1. Comparison Content (MAJOR GAP)

Competitors have "Fractional vs Interim vs Full-Time" tables. We don't.

**Template:**
```
| Feature | Fractional | Interim | Full-Time |
|---------|------------|---------|-----------|
| Commitment | 1-3 days/week | Full-time (temp) | Full-time (perm) |
| Duration | 6+ months ongoing | 3-9 months typical | Permanent |
| Cost | £3k-£6k/month | £8k-£12k/week | £150k-£250k/year |
| Focus | Strategic + operational | Gap-fill, transformation | All responsibilities |
| Best For | Growing companies | Leadership gaps | Large orgs |
```

### 2. FAQ Enrichment (PAA-Style Questions)

Add these high-volume questions to relevant pages:

**Cost Questions:**
- "How much does a fractional CMO cost UK?"
- "How much does a fractional CFO cost per month?"
- "What is the day rate for an interim CFO?"

**Comparison Questions:**
- "What is the difference between fractional and interim CFO?"
- "Fractional CMO vs full-time CMO"
- "When should I hire fractional vs interim?"

**When to Hire Questions:**
- "When should a startup hire a fractional CFO?"
- "At what revenue should I hire a fractional CTO?"
- "How do I know if I need a fractional CMO?"

**Hours/Commitment Questions:**
- "How many hours does a fractional CTO work?"
- "How many days a week does a fractional CMO work?"

### 3. Definition Boxes for AI Overview

Add 60-80 word definitions at top of pages:

```
A Fractional CMO is a part-time Chief Marketing Officer who provides
strategic marketing leadership to companies 1-3 days per week. They
typically charge £600-£1,200 per day in the UK, offering the same
expertise as a full-time CMO at 50-70% less cost. Ideal for companies
with £1M-£15M revenue that need senior marketing leadership without
full-time commitment.
```

---

## Competitor Intelligence

### Top Competitors by Role

**CMO:**
- Communications Edge - UK-specific, PDF downloads, £600-£1,500/day pricing
- VCMO - Investment calculator, comprehensive guides
- Chief Outsiders - 2,000+ clients, US-focused
- Porter Wills - Sport/DTC specialist

**CFO:**
- FD Capital - UK FD specialist, hourly/daily/monthly pricing
- Pitch Hill Partners - PE/VC focus, £800-£1,500/day
- Boardroom Advisors - Comprehensive guides
- EmergeOne - Startup focus, £2,000-£8,000/month

**CTO:**
- fractional.quest - WE'RE #1 for "fractional cto jobs" ✅
- Arc.dev - Freelance marketplace
- GoFractional - US-focused

**COO:**
- Tom Wardman - Agency-specific, £4,200-£6,900/month
- Chore - Startup operations
- Like Sunday - $1,800/month entry point

---

## New Pages to Create

1. `/part-time-cmo` - 69 impressions, position 26
2. `/interim-finance-director` - 58 impressions, position 50
3. `/fractional-cmo-vs-interim-cmo` - Comparison page
4. `/fractional-cfo-vs-interim-cfo` - Comparison page
5. `/when-to-hire-fractional-cfo` - Decision guide

---

## Site-Wide Content Updates

Based on Tavily research, update across all pages:

1. **Calculator Defaults** - Lower default day rates to realistic mid-points
2. **Pricing Tables** - Show ranges (entry → senior → premium)
3. **Engagement Length** - Add typical duration info
4. **Hours/Week** - Add commitment level info
5. **FAQ Answers** - Use Tavily AI Overview answers as templates

---

## Database Access

**Neon Project**: `plain-glade-34229418`

**Key Tables:**
- `pages` - Database-driven page content
- `jobs` - Job listings (213+ entries)

**Quick Commands:**
```sql
-- Check existing page
SELECT slug, title FROM pages WHERE slug = 'your-slug';

-- Update page sections (JSONB)
UPDATE pages SET sections = jsonb_insert(sections, '{0}', '...'::jsonb, true)
WHERE slug = 'your-slug';
```

---

## Keywords Still to Research

Use Tavily to research:
- fractional marketing director (15 impressions, pos 68)
- interim marketing director (39 impressions, pos 45)
- part time finance director (12 impressions, pos 53)
- fractional operations director (5 impressions, pos 44)
- interim chief operating officer (9 impressions, pos 60)
- fractional chief people officer (4 impressions, pos 6)
- fractional CISO cost

---

## Files to Reference

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project overview, Tavily API, patterns |
| `.claude/reference/content-plan.md` | Content creation roadmap |
| `.claude/reference/job-schema.md` | Job database schema |
| `.claude/reference/seo-templates.md` | SEO content templates |
| `.claude/reference/role-data.md` | Day rates, engagement types |
| `/public/llms.txt` | AI/LLM optimization file |

---

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Check for errors
git add -A && git commit -m "message" && git push  # Deploy
```

---

*Last Updated: 31 January 2026*
*Previous Session: GSC analysis + Tavily competitive research*
