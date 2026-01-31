# Tavily Content Enrichment PRD

## Overview

This document defines the systematic process for enriching SEO content pages using Tavily's API suite. The goal is to transform baseline content (Quality 5-6) into competitor-validated, authoritative content (Quality 9+) through structured research, competitor analysis, and citation.

**Philosophy:** Don't just validate data - study how competitors structure their content, what sections they include, and what narrative arc they follow. Then match or exceed their depth while adding unique value.

---

## Quick Start Checklist

For each page enrichment:

- [ ] **Research Phase** (Day 1 if needed)
  - [ ] Tavily Search: Find top 5-8 competitors
  - [ ] Tavily Extract: Pull full content from top 3
  - [ ] Analyze competitor narrative arc and sections
  - [ ] Identify gaps in our content vs competitors
  - [ ] Note all pricing data with sources

- [ ] **Content Creation Phase**
  - [ ] Add/update definition box with £ ranges + source
  - [ ] Add 3-way comparison table (Fractional vs Interim vs Full-Time)
  - [ ] Add hourly rates table
  - [ ] Add monthly retainer pricing cards (3 tiers)
  - [ ] Add authority context box with primary source
  - [ ] Add professional bodies section with clickable cards
  - [ ] Add EmbeddedJobBoard section
  - [ ] Ensure 8+ FAQs
  - [ ] Ensure 2000+ words for Q9

- [ ] **Technical Implementation**
  - [ ] Add Mobile TOC (TableOfContentsMobile)
  - [ ] Restructure with sidebar layout
  - [ ] Update dateModified
  - [ ] Build and verify
  - [ ] Track in database

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

## Competitor Analysis Framework

### What to Extract from Competitors

When analyzing competitor pages, document:

#### 1. Content Structure (Narrative Arc)
```
Competitor: [URL]
Word Count: ~[X]

Section Order:
1. Hero + breadcrumbs
2. Definition box (with/without pricing)
3. Key stats bar
4. Main content with TOC
5. [List all H2 sections in order]
...

Observations:
- Leads with: [definition/stat/question]
- Pricing placement: [early/middle/late]
- CTA frequency: [X CTAs total]
```

#### 2. Pricing Data
```
Day Rates:
- Junior/Entry: £X-£Y
- Mid-level: £X-£Y
- Senior: £X-£Y
- Specialist: £X-£Y

Monthly Retainers:
- Tier 1 (X days/week): £X-£Y
- Tier 2 (X days/week): £X-£Y
- Tier 3 (X days/week): £X-£Y

Hourly Rates:
- Standard: £X-£Y
- Premium: £X-£Y

Sources cited: [list]
```

#### 3. Sections We're Missing
```
Sections competitors have that we don't:
- [ ] Section name
- [ ] Section name
- [ ] Section name
```

#### 4. Authority & Trust Signals
```
Professional bodies mentioned:
- [Body 1] - linked: yes/no
- [Body 2] - linked: yes/no

Data sources cited:
- [Source 1]
- [Source 2]

Case studies/testimonials: yes/no
```

#### 5. FAQ Patterns
```
Questions competitors answer:
1. [Question]
2. [Question]
3. [Question]
...

Questions we should add:
1. [Question]
2. [Question]
```

### Competitive Gap Analysis Template

After extracting from 3 competitors, summarize:

```markdown
## Gap Analysis: [Page Slug]

### We Have (Keep):
- [Element we already do well]
- [Element we already do well]

### They Have, We Don't (Add):
- [ ] [Missing element] - Priority: High/Medium/Low
- [ ] [Missing element] - Priority: High/Medium/Low

### We Have Better (Differentiate):
- [Our unique advantage]
- [Our unique advantage]

### Content Depth Comparison:
| Element | Us | Competitor 1 | Competitor 2 | Competitor 3 |
|---------|-----|--------------|--------------|--------------|
| Word count | X | X | X | X |
| Day rate tiers | X | X | X | X |
| Monthly retainers | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| Hourly rates | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| 3-way comparison | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| FAQ count | X | X | X | X |
| Authority links | X | X | X | X |
```

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

---

## Q9 Template Pattern (Full Code Examples)

### Required Imports

```tsx
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { FAQ } from '@/components/seo/FAQ'
import { RoleCalculator } from '@/components/RoleCalculator'
import { RoleContentHub } from '@/components/RoleContentHub'
```

### TOC Items Structure

```tsx
const tocItems = [
  { id: 'overview', title: 'Overview' },
  { id: 'responsibilities', title: 'Key Responsibilities' },
  { id: 'comparison', title: 'Fractional vs Interim vs Full-Time' },
  { id: 'cost-pricing', title: 'UK Cost Guide' },
  { id: 'hourly-rates', title: 'Hourly Rates' },
  { id: 'monthly-retainers', title: 'Monthly Retainers' },
  { id: 'qualifications', title: 'Qualifications' },
  { id: 'calculator', title: 'Calculator' },
  { id: 'jobs', title: 'Jobs' },
  { id: 'faq', title: 'FAQ' },
]
```

### Mobile TOC (After Hero/Stats)

```tsx
{/* Mobile Table of Contents */}
<div className="lg:hidden max-w-4xl mx-auto px-6 py-8">
  <TableOfContentsMobile items={tocItems} />
</div>
```

### Sidebar Layout Structure

```tsx
{/* Main Content with Sidebar */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid lg:grid-cols-[1fr_300px] gap-12">
      {/* Main Column */}
      <article className="prose prose-lg prose-gray max-w-none">

        <h2 id="overview" className="scroll-mt-24">...</h2>
        {/* Content sections with scroll-mt-24 on each h2 */}

      </article>

      {/* Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-6">
          <TableOfContents items={tocItems} />

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
            <div className="space-y-3">
              <Link href="/related-page" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                <span>📋</span> Related Page Title
              </Link>
              {/* More links */}
            </div>
          </div>

          {/* Authority Links */}
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
            <ul className="space-y-3">
              {authorityLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer"
                     className="text-sm text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
                    <span className="text-emerald-400">→</span> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gray-900 p-6 rounded-xl text-white">
            <p className="font-bold mb-2">Looking for a [Role]?</p>
            <p className="text-sm text-gray-300 mb-4">Browse pre-vetted leaders</p>
            <Link href="/jobs-page" className="block text-center bg-emerald-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-emerald-400 transition-colors text-sm">
              View Jobs
            </Link>
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>
```

### Authority Context Box

```tsx
{/* Authority context box - place after intro paragraph */}
<div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-6 not-prose">
  <p className="text-sm text-gray-700">
    <strong>UK Market Context:</strong> According to{' '}
    <a href="https://primary-source.org" target="_blank" rel="noopener noreferrer"
       className="text-emerald-700 hover:underline font-medium">Primary Source</a>{' '}
    and market research from{' '}
    <a href="https://competitor.com/page" target="_blank" rel="noopener noreferrer"
       className="text-emerald-700 hover:underline">Competitor Name</a>,
    fractional [Role] costs range from £X-£Y per month depending on engagement level.
  </p>
</div>
```

### 3-Way Comparison Table

```tsx
{/* 3-Way Comparison Table */}
<section id="comparison" className="py-20 bg-gray-50 scroll-mt-24">
  <div className="max-w-4xl mx-auto px-6 lg:px-8">
    <div className="mb-12">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Comparison</span>
      <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional vs Interim vs Full-Time [Role]</h2>
      <p className="text-xl text-gray-600">Understanding the differences.</p>
    </div>

    <div className="overflow-x-auto my-8">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
            <th className="px-4 py-4 text-left text-sm font-bold text-emerald-700">Fractional</th>
            <th className="px-4 py-4 text-left text-sm font-bold text-blue-700">Interim</th>
            <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Full-Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-4 text-sm font-medium text-gray-900">Commitment</td>
            <td className="px-4 py-4 text-sm text-gray-600">1-3 days/week</td>
            <td className="px-4 py-4 text-sm text-gray-600">Full-time (temp)</td>
            <td className="px-4 py-4 text-sm text-gray-600">Full-time (perm)</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-4 py-4 text-sm font-medium text-gray-900">Duration</td>
            <td className="px-4 py-4 text-sm text-gray-600">Ongoing (6+ months)</td>
            <td className="px-4 py-4 text-sm text-gray-600">3-9 months typical</td>
            <td className="px-4 py-4 text-sm text-gray-600">Permanent</td>
          </tr>
          <tr>
            <td className="px-4 py-4 text-sm font-medium text-gray-900">Monthly Cost</td>
            <td className="px-4 py-4 text-sm text-emerald-700 font-semibold">£X-£Y</td>
            <td className="px-4 py-4 text-sm text-gray-600">£X-£Y</td>
            <td className="px-4 py-4 text-sm text-gray-600">£X-£Y+</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-4 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
            <td className="px-4 py-4 text-sm text-emerald-700 font-semibold">£X-£Y</td>
            <td className="px-4 py-4 text-sm text-gray-600">£X-£Y (3-6mo)</td>
            <td className="px-4 py-4 text-sm text-gray-600">£X-£Y+</td>
          </tr>
          <tr>
            <td className="px-4 py-4 text-sm font-medium text-gray-900">Primary Focus</td>
            <td className="px-4 py-4 text-sm text-gray-600">Strategy, growth</td>
            <td className="px-4 py-4 text-sm text-gray-600">Gap cover, turnaround</td>
            <td className="px-4 py-4 text-sm text-gray-600">Full ownership</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-4 py-4 text-sm font-medium text-gray-900">Flexibility</td>
            <td className="px-4 py-4 text-sm text-gray-600">Scale up/down easily</td>
            <td className="px-4 py-4 text-sm text-gray-600">Fixed contract term</td>
            <td className="px-4 py-4 text-sm text-gray-600">Limited flexibility</td>
          </tr>
          <tr className="bg-emerald-50">
            <td className="px-4 py-4 text-sm font-medium text-gray-900">Best For</td>
            <td className="px-4 py-4 text-sm text-emerald-800 font-medium">SMEs, startups</td>
            <td className="px-4 py-4 text-sm text-blue-800 font-medium">Vacancy, crisis, M&A</td>
            <td className="px-4 py-4 text-sm text-gray-700 font-medium">Large enterprises</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Cost comparison callout */}
    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-6">
      <p className="text-sm text-gray-700">
        <strong>Savings Summary:</strong> A fractional [Role] at 2 days/week costs £X-£Y/year vs £X-£Y+ for a full-time hire (including salary, NI, pension, benefits, equity, and recruitment fees). That's <strong>50-70% savings</strong>.
      </p>
    </div>
  </div>
</section>
```

### Hourly Rates Table

```tsx
{/* Hourly Rates */}
<section id="hourly-rates" className="py-20 bg-white scroll-mt-24">
  <div className="max-w-4xl mx-auto px-6 lg:px-8">
    <div className="mb-12">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Hourly</span>
      <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional [Role] Hourly Rates UK</h2>
      <p className="text-xl text-gray-600">For ad-hoc consultations and project-based work.</p>
    </div>

    <div className="overflow-x-auto my-8">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-emerald-700 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold">Level / Specialisation</th>
            <th className="px-6 py-4 text-left text-sm font-bold">Hourly Rate</th>
            <th className="px-6 py-4 text-left text-sm font-bold">Best For</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">Standard</td>
            <td className="px-6 py-4 text-sm text-gray-600">£100-£150/hour</td>
            <td className="px-6 py-4 text-sm text-gray-600">Reviews, ad-hoc advice</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior (15+ years)</td>
            <td className="px-6 py-4 text-sm text-gray-600">£150-£200/hour</td>
            <td className="px-6 py-4 text-sm text-gray-600">Strategic planning</td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">Specialist</td>
            <td className="px-6 py-4 text-sm text-emerald-700 font-semibold">£175-£250/hour</td>
            <td className="px-6 py-4 text-sm text-gray-600">Domain expertise</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">Premium Expert</td>
            <td className="px-6 py-4 text-sm text-emerald-700 font-semibold">£200-£300/hour</td>
            <td className="px-6 py-4 text-sm text-gray-600">M&A, exit prep</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

### Monthly Retainer Pricing Cards

```tsx
{/* Monthly Retainers */}
<section id="monthly-retainers" className="py-20 bg-gray-50 scroll-mt-24">
  <div className="max-w-4xl mx-auto px-6 lg:px-8">
    <div className="mb-12">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Retainers</span>
      <h2 className="text-3xl font-black text-gray-900 mb-4">Monthly Retainer Pricing</h2>
      <p className="text-xl text-gray-600">Ongoing leadership on a predictable budget.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 my-8">
      {/* Starter Tier */}
      <div className="bg-white p-6 border border-gray-200 rounded-lg">
        <div className="text-emerald-600 font-bold text-sm mb-2">STARTER</div>
        <div className="text-3xl font-black text-gray-900 mb-1">£2,500-£4,000</div>
        <div className="text-gray-500 text-sm mb-4">per month</div>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• 1 day per week (4 days/month)</li>
          <li>• Monthly reporting</li>
          <li>• Strategic advice</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-500">Best for: Seed/Series A</span>
        </div>
      </div>

      {/* Growth Tier - Popular */}
      <div className="bg-white p-6 border-2 border-emerald-500 rounded-lg relative">
        <div className="absolute -top-3 right-4 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">POPULAR</div>
        <div className="text-emerald-600 font-bold text-sm mb-2">GROWTH</div>
        <div className="text-3xl font-black text-gray-900 mb-1">£5,000-£8,000</div>
        <div className="text-gray-500 text-sm mb-4">per month</div>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• 2 days per week (8 days/month)</li>
          <li>• Full strategic support</li>
          <li>• Team/agency management</li>
          <li>• Board-level input</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-500">Best for: Series A-B scale-ups</span>
        </div>
      </div>

      {/* Enterprise Tier */}
      <div className="bg-white p-6 border border-gray-200 rounded-lg">
        <div className="text-emerald-600 font-bold text-sm mb-2">ENTERPRISE</div>
        <div className="text-3xl font-black text-gray-900 mb-1">£10,000-£15,000</div>
        <div className="text-gray-500 text-sm mb-4">per month</div>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• 3+ days per week</li>
          <li>• Full [Role] responsibilities</li>
          <li>• M&A / exit preparation</li>
          <li>• Team leadership</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-500">Best for: PE-backed, pre-IPO</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Professional Bodies Section

```tsx
{/* Qualifications Section */}
<section id="qualifications" className="py-20 bg-white scroll-mt-24">
  <div className="max-w-4xl mx-auto px-6 lg:px-8">
    <div className="mb-12">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Qualifications</span>
      <h2 className="text-3xl font-black text-gray-900 mb-4">Professional Bodies & Certifications</h2>
      <p className="text-xl text-gray-600">Key qualifications that impact earning potential.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-4 my-8">
      <a href="https://professional-body.org" target="_blank" rel="noopener noreferrer"
         className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏛️</span>
          <div>
            <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">Body Name (Acronym)</h4>
            <p className="text-sm text-gray-600">Full description</p>
            <p className="text-xs text-emerald-600 mt-1">+10-15% rate premium</p>
          </div>
        </div>
      </a>
      {/* Repeat for each professional body */}
    </div>
  </div>
</section>
```

### Job Board Section

```tsx
{/* Job Board Section */}
<section id="jobs" className="py-20 bg-white scroll-mt-24">
  <div className="max-w-6xl mx-auto px-6 lg:px-8">
    <div className="text-center mb-12">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Jobs</span>
      <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest [Role] Jobs</h2>
      <p className="text-xl text-gray-500">Find your next opportunity</p>
    </div>
    <EmbeddedJobBoard
      defaultDepartment="[Department]"
      title="Latest [Role] Jobs"
      accentColor="green"  {/* green, red, amber, blue */}
      jobsPerPage={6}
    />
  </div>
</section>
```

### Color Schemes by Role

| Role | Primary Color | Tailwind Classes |
|------|---------------|------------------|
| CFO/Finance | Emerald | `emerald-500`, `emerald-700`, `bg-emerald-50` |
| CMO/Marketing | Amber | `amber-500`, `amber-700`, `bg-amber-50` |
| CTO/Tech | Blue | `blue-500`, `blue-700`, `bg-blue-50` |
| COO/Ops | Indigo | `indigo-500`, `indigo-700`, `bg-indigo-50` |
| CISO/Security | Red | `red-500`, `red-700`, `bg-red-50` |
| CHRO/HR | Purple | `purple-500`, `purple-700`, `bg-purple-50` |

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
*Version: 2.0* - Complete rewrite with:
- Full competitor analysis framework
- Q9 template pattern with code examples
- All component patterns (sidebar, 3-way table, hourly rates, retainers, professional bodies)
- Color schemes by role
- Quick start checklist
