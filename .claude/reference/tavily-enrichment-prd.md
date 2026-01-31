# Tavily Content Enrichment PRD

## Overview

This document defines the systematic process for enriching SEO content pages using Tavily's API suite. The goal is to transform baseline content (Quality 5-6) into competitor-validated, authoritative content (Quality 8+) through structured research and citation.

---

## Database Schema

### content_enrichment Table

```sql
CREATE TABLE content_enrichment (
  id SERIAL PRIMARY KEY,
  page_slug VARCHAR(255) NOT NULL,
  enrichment_type VARCHAR(50) DEFAULT 'tavily_competitive',
  tavily_apis_used TEXT[], -- ARRAY['search', 'extract', 'research']
  enrichment_depth VARCHAR(20), -- 'basic', 'moderate', 'comprehensive'
  quality_score_before INTEGER,
  quality_score_after INTEGER,
  word_count_before INTEGER,
  word_count_after INTEGER,
  needs_revisit BOOLEAN DEFAULT false,
  revisit_priority INTEGER, -- 1=high, 2=medium, 3=low
  changes_made TEXT,
  notes TEXT,
  primary_sources TEXT[], -- competitor URLs used
  enriched_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(page_slug, enrichment_type)
);
```

### Key Queries

```sql
-- Check enrichment status
SELECT page_slug, enrichment_depth, quality_score_after, needs_revisit, word_count_after
FROM content_enrichment
WHERE enrichment_type = 'tavily_competitive'
ORDER BY needs_revisit DESC, quality_score_after;

-- Find pages needing work
SELECT page_slug, quality_score_after, revisit_priority
FROM content_enrichment
WHERE needs_revisit = true OR quality_score_after < 8
ORDER BY revisit_priority, quality_score_after;

-- Track word counts for long-form content
SELECT page_slug, word_count_before, word_count_after,
       (word_count_after - word_count_before) as words_added
FROM content_enrichment
WHERE word_count_after IS NOT NULL
ORDER BY words_added DESC;
```

---

## Quality Scoring System (1-10)

### Score 5-6: Baseline Content
- Original content without external validation
- Generic pricing ranges
- No competitor citations
- Basic FAQs without sources
- < 1000 words

### Score 7: Validated Content
- Validated pricing from 1-2 competitors
- Day rate table with 3-4 sectors
- Basic monthly retainer mention
- FAQs include cost question
- 1000-1500 words

### Score 8: Comprehensive Content (Target)
**Required Elements:**
- [ ] Definition box with specific £ ranges AND source citation
- [ ] Day rate table with 5+ sectors
- [ ] Monthly retainer section with 3 tiers
- [ ] Savings vs full-time comparison with % AND source
- [ ] 2+ competitor-validated data points with citations
- [ ] 5+ FAQs including cost question with citation
- [ ] Authority links section (professional bodies)
- [ ] 1500-2000 words

### Score 9: Premium Content
All of Score 8, plus:
- [ ] Long-form content (2000+ words)
- [ ] 3-way comparison table (Fractional vs Interim vs Full-Time)
- [ ] Primary source citations (ICAEW, CIPD, IOD reports)
- [ ] PAA-style questions from Tavily research
- [ ] Internal links to 10+ related pages
- [ ] Case study or data point reference

### Score 10: Best-in-Class
All of Score 9, plus:
- [ ] 2500+ words
- [ ] Multiple primary sources with dates
- [ ] Original research or survey data
- [ ] Expert quotes with attribution
- [ ] Comprehensive FAQ (8+ questions)
- [ ] Video/infographic references

---

## Tavily API Suite

### API Key Management
```bash
# Check usage before starting
curl -s -H "Authorization: Bearer $TAVILY_API_KEY" https://api.tavily.com/usage
```

### API Credits by Type
| API | Credits/Call | Use Case |
|-----|--------------|----------|
| Search | 1 | Find competitors, get AI summary |
| Extract | 1 | Pull full content from URLs |
| Research | 5 | Comprehensive market analysis |
| Crawl | 2 | Map entire competitor sites |
| Map | 1 | Get site structure |

### Recommended Usage per Page
| Depth | APIs Used | Credits | Quality Target |
|-------|-----------|---------|----------------|
| Basic | Search only | 1 | 6→7 |
| Moderate | Search + Extract (2 URLs) | 3 | 6→7.5 |
| Comprehensive | Search + Extract (3 URLs) | 4 | 6→8+ |
| Premium | Search + Extract + Research | 9 | 6→9 |

---

## Enrichment Workflow

### Step 1: Search (Find Competitors)

```bash
cat > /tmp/tav.json << 'EOF'
{
  "api_key": "YOUR_API_KEY",
  "query": "fractional [ROLE] cost UK 2025 day rate monthly retainer",
  "search_depth": "advanced",
  "include_answer": true,
  "max_results": 8
}
EOF

curl -s -X POST "https://api.tavily.com/search" \
  -H "Content-Type: application/json" \
  -d @/tmp/tav.json | jq '{answer, urls: [.results[:5] | .[] | .url]}'
```

**Output:** AI-generated answer with pricing + top 5 competitor URLs

### Step 2: Extract (Get Full Competitor Content)

```bash
cat > /tmp/tav_extract.json << 'EOF'
{
  "api_key": "YOUR_API_KEY",
  "urls": ["URL1", "URL2", "URL3"],
  "extract_depth": "advanced"
}
EOF

curl -s -X POST "https://api.tavily.com/extract" \
  -H "Content-Type: application/json" \
  -d @/tmp/tav_extract.json | jq '.results[] | {url, content: .raw_content[:2500]}'
```

**Output:** Full page content from each competitor URL (truncated to 2500 chars)

### Step 2.5: Research API (Comprehensive Analysis - RECOMMENDED)

**Use the Research API for long-form content creation, NOT just fact-checking.**

```bash
cat > /tmp/tav_research.json << 'EOF'
{
  "api_key": "YOUR_API_KEY",
  "query": "comprehensive guide fractional [ROLE] UK responsibilities qualifications cost when to hire comparison 2026",
  "search_depth": "advanced",
  "include_answer": true,
  "max_results": 15,
  "include_raw_content": true
}
EOF

curl -s -X POST "https://api.tavily.com/search" \
  -H "Content-Type: application/json" \
  -d @/tmp/tav_research.json
```

**What Research API Provides:**
- **Narrative arc:** How competitors structure content (intro → definition → responsibilities → costs → FAQs)
- **Section ordering:** What sections come first (definition box), middle (pricing), end (CTA)
- **Content gaps:** Sections competitors have that we're missing
- **Long-form patterns:** How 2000+ word pages are organized
- **SEO signals:** H2/H3 structure, keyword placement, internal linking patterns

**Research-Driven Content Creation Checklist:**
1. What does the #1 competitor lead with? (definition box, stat, question)
2. What sections do top 3 competitors ALL have? (add if missing)
3. What unique sections differentiate #1? (consider adding)
4. What's the narrative flow? (problem → solution → proof → action)
5. What pricing structure do they use? (day rate vs monthly vs hourly)
6. What FAQs do they answer? (add missing ones)
7. What authority sources do they cite? (match or exceed)

### Step 3: Analyze & Enrich

From extracted content, identify:
1. **Pricing data:** Day rates, monthly retainers, hourly rates
2. **Sector breakdowns:** How competitors segment pricing
3. **Savings calculations:** % vs full-time comparisons
4. **FAQ patterns:** Common questions competitors answer
5. **Authority sources:** Professional bodies they cite

### Step 4: Update Content

Update these sections in the content file:
1. `definitionBox.definition` - Add source citation at end
2. `statistics` - Add validated stats with sources
3. `dayRates.rates` - Align with competitor data, add sectors
4. `dayRates.monthlyRetainers` - Add 3 tiers with sources
5. `dayRates.savingsNote` - Add % and source
6. `faqs[0].answer` - Cost FAQ with competitor citations

### Step 5: Track in Database

```sql
INSERT INTO content_enrichment (
  page_slug, enrichment_type, tavily_apis_used, enrichment_depth,
  quality_score_before, quality_score_after,
  word_count_before, word_count_after,
  needs_revisit, changes_made, notes, primary_sources
) VALUES (
  'page-slug', 'tavily_competitive',
  ARRAY['search', 'extract'], 'comprehensive',
  6, 8,
  1200, 1850,
  false,
  'Added: monthly retainers, savings comparison, 3 authority links',
  'Primary sources: Competitor1, Competitor2',
  ARRAY['https://competitor1.com/page', 'https://competitor2.com/page']
);

-- Or UPDATE if exists
UPDATE content_enrichment SET
  tavily_apis_used = ARRAY['search', 'extract'],
  enrichment_depth = 'comprehensive',
  quality_score_after = 8,
  word_count_after = 1850,
  needs_revisit = false,
  changes_made = 'Description of changes',
  notes = 'Primary sources used',
  primary_sources = ARRAY['url1', 'url2']
WHERE page_slug = 'page-slug'
AND enrichment_type = 'tavily_competitive';
```

---

## Word Count Tracking

Word count is a strong indicator of content depth:

| Word Count | Content Type | Typical Score |
|------------|--------------|---------------|
| < 800 | Thin content | 5-6 |
| 800-1200 | Standard | 6-7 |
| 1200-1800 | Comprehensive | 7-8 |
| 1800-2500 | Long-form | 8-9 |
| 2500+ | Pillar content | 9-10 |

### Calculating Word Count

```bash
# For TypeScript content files
grep -oE '"[^"]*"' src/lib/seo-content/page.ts | wc -w
```

Or track in enrichment updates:
```sql
UPDATE content_enrichment
SET word_count_after = [COUNT]
WHERE page_slug = 'page-slug';
```

---

## Serper API for Google Ranking Checks

### API Key
```bash
SERPER_API_KEY="b0a322411802bafeb5753e8ca4b988631c56e06e"
```

### Check Google UK Rankings
```bash
cat > /tmp/serper.json << 'EOF'
{"q": "fractional [role]", "gl": "uk", "hl": "en", "num": 50}
EOF

curl -s -X POST "https://google.serper.dev/search" \
  -H "X-API-KEY: b0a322411802bafeb5753e8ca4b988631c56e06e" \
  -H "Content-Type: application/json" \
  -d @/tmp/serper.json | jq '.organic[] | select(.link | contains("fractional.quest")) | {position, title, link}'
```

### Track Rankings in Database
```sql
-- Add ranking fields to content_enrichment if not exists
ALTER TABLE content_enrichment ADD COLUMN IF NOT EXISTS target_keyword VARCHAR(255);
ALTER TABLE content_enrichment ADD COLUMN IF NOT EXISTS google_uk_position_before INTEGER;
ALTER TABLE content_enrichment ADD COLUMN IF NOT EXISTS google_uk_position_after INTEGER;
ALTER TABLE content_enrichment ADD COLUMN IF NOT EXISTS ranking_check_date TIMESTAMP;
```

### Usage Note
- Serper checks **actual Google UK rankings** (SERP)
- Tavily search shows **Tavily's own results** (not Google rankings)
- Use Serper before/after enrichment to track ranking improvements

---

## Competitor Source Categories

### By Domain

| Domain | Primary Sources | What They Cover |
|--------|-----------------|-----------------|
| Finance | HireCFO, EmergeOne, FD Capital | CFO/FD pricing |
| Marketing | Porter Wills, VCMO, Communications Edge | CMO pricing |
| Technology | CodPal, Fractional CTO Experts, Full Stack | CTO/CIO |
| Security | CyPro, The Small Business Cyber Security Guy | CISO/vCISO |
| Operations | ScaleUpExec, Like Sunday | COO pricing |
| Revenue | Ready For The Next Level | CRO pricing |
| HR | sobo.ai, Pioneer HR, CIPD | CHRO/CPO |
| Legal | The Lawyer Portal, Legal 500 | GC/CLO |

### Primary Authoritative Sources

Always cite these where applicable:

| Domain | Professional Bodies |
|--------|---------------------|
| Finance | ICAEW, ACCA, CIMA, FCA, BVCA |
| Marketing | CIM, Marketing Week, IPA |
| Technology | BCS, Tech Nation, Gartner UK |
| HR | CIPD, SHRM, HR Magazine |
| Operations | CMI, IoD, APM |
| Security | (ISC)², ISACA, NCSC, CREST |
| Legal | Law Society, SRA, CILEX |

---

## Citation Formats

### In Definition Box
```
"...cost of a full-time hire. (Source: CompetitorA, CompetitorB Jan 2026)"
```

### In Day Rates Description
```
"(Source: Competitor1, Competitor2 Jan 2026):"
```

### In Savings Note
```
"Savings: £X-£Y (X-Y%). Source: Competitor UK Market Analysis 2026."
```

### In FAQ Answer
```
"According to CompetitorA and CompetitorB (Jan 2026): specific data..."
```

---

## CLAUDE.md Integration

Add this section to your project's CLAUDE.md:

```markdown
## Content Enrichment

### Tavily API
**API Key**: `[YOUR_KEY]`

**Check Usage:**
curl -s -H "Authorization: Bearer [KEY]" https://api.tavily.com/usage

### Enrichment Commands
See `.claude/reference/tavily-enrichment-prd.md` for full workflow.

### Quick Reference
| Quality | Requirements |
|---------|--------------|
| 8 | Definition+source, 5+ sector rates, 3-tier retainers, savings%, 2+ competitor citations, 5+ FAQs |
| 9 | Above + 2000 words, 3-way comparison, primary sources |

### Database
Track all enrichments in `content_enrichment` table.
```

---

## Restart Prompt Template

For new sessions, include:

```markdown
## Content Enrichment Session

**Project:** [Name]
**Tavily API Key:** [Key]
**Database:** [Neon project ID]

### Current Status
[Table of pages with quality scores]

### Priority Queue
1. Page needing Q8: [slug]
2. Page needing Q8: [slug]

### Workflow
1. Check Tavily usage
2. Search for competitor pricing
3. Extract top 2-3 competitor pages
4. Update content with validated data
5. Track in database

### Commands
- Check usage: `curl -s -H "Authorization: Bearer [KEY]" https://api.tavily.com/usage`
- Run dev: `npm run dev`
- Deploy: `git add -A && git commit -m "msg" && git push`
```

---

## Metrics & Reporting

### Session Summary Template

After each enrichment session, report:

```markdown
## Enrichment Summary - [Date]

**Pages Enriched:** X
**Quality Before → After:** 7 → 8 (avg)
**Tavily Credits Used:** X
**Credits Remaining:** X

| Page | Before | After | Sources Used |
|------|--------|-------|--------------|
| page-1 | 7 | 8 | Source1, Source2 |

**Key Data Points Added:**
- Day rates: £X-£Y validated by [Source]
- Monthly retainers: £X-£Y from [Source]
- Savings: X-Y% vs full-time

**Next Session Priority:**
1. [Page needing enrichment]
2. [Page needing enrichment]
```

---

*Last Updated: 31 January 2026*
*Version: 1.1* - Added Serper API for Google UK ranking checks
