import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import { createDbQuery } from '@/lib/db'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { JobPostingSchema, parseCompensation } from '@/components/seo/JobPostingSchema'
import { getRoleImageCategory, getHeroImageUrl } from '@/lib/images'

// Comprehensive role data for SEO optimization
interface RoleData {
  displayName: string
  shortDescription: string
  fullDescription: string
  typicalDayRate: { min: number; max: number; typical: number }
  occupationalCategory: string
  pageSlug: string
  salaryPageSlug: string
  hirePageSlug: string
  faqs: Array<{ question: string; answer: string }>
}

const ROLE_DATA: Record<string, RoleData> = {
  cfo: {
    displayName: 'Fractional CFO',
    shortDescription: 'Part-time Chief Financial Officer providing strategic financial leadership',
    fullDescription: 'A Fractional CFO provides part-time strategic financial leadership to growing businesses. They bring the expertise of a full-time CFO—financial strategy, fundraising support, cash flow management, and board reporting—without the full-time cost. Ideal for scale-ups, PE-backed companies, and businesses preparing for exit.',
    typicalDayRate: { min: 900, max: 1500, typical: 1100 },
    occupationalCategory: '11-3031.00',
    pageSlug: 'fractional-cfo',
    salaryPageSlug: 'fractional-cfo-salary',
    hirePageSlug: 'hire-fractional-cfo',
    faqs: [
      { question: 'What does a Fractional CFO do?', answer: 'A Fractional CFO provides part-time strategic financial leadership, including financial planning, cash flow management, fundraising support, investor relations, and board reporting.' },
      { question: 'How much does a Fractional CFO cost?', answer: 'Fractional CFOs typically charge £900-£1,500 per day in the UK, working 1-3 days per week. This is significantly less than a full-time CFO salary of £150,000-£250,000+.' },
      { question: 'When should I hire a Fractional CFO?', answer: 'Consider a Fractional CFO when you need strategic financial guidance but cannot justify a full-time hire—typically at £2-20M revenue, during fundraising, or preparing for exit.' },
    ]
  },
  cto: {
    displayName: 'Fractional CTO',
    shortDescription: 'Part-time Chief Technology Officer providing technical strategy and leadership',
    fullDescription: 'A Fractional CTO provides part-time technical leadership to businesses that need senior technology expertise. They oversee technology strategy, team building, architecture decisions, and digital transformation—without the commitment of a full-time executive hire.',
    typicalDayRate: { min: 850, max: 1600, typical: 1100 },
    occupationalCategory: '11-3021.00',
    pageSlug: 'fractional-cto',
    salaryPageSlug: 'fractional-cto-salary',
    hirePageSlug: 'hire-fractional-cto',
    faqs: [
      { question: 'What does a Fractional CTO do?', answer: 'A Fractional CTO provides part-time technical leadership including technology strategy, team management, architecture decisions, vendor selection, and digital transformation guidance.' },
      { question: 'How much does a Fractional CTO cost?', answer: 'Fractional CTOs typically charge £850-£1,600 per day in the UK, often working 1-2 days per week initially.' },
      { question: 'When should I hire a Fractional CTO?', answer: 'Consider a Fractional CTO when you need senior technical leadership but your business is not ready for a £180,000+ full-time hire—common at seed to Series B stage.' },
    ]
  },
  cmo: {
    displayName: 'Fractional CMO',
    shortDescription: 'Part-time Chief Marketing Officer driving growth and brand strategy',
    fullDescription: 'A Fractional CMO provides part-time marketing leadership to businesses seeking growth. They bring strategic marketing expertise—brand positioning, demand generation, team building, and marketing ROI optimization—at a fraction of the cost of a full-time CMO.',
    typicalDayRate: { min: 800, max: 1400, typical: 1000 },
    occupationalCategory: '11-2021.00',
    pageSlug: 'fractional-cmo',
    salaryPageSlug: 'fractional-cmo-salary',
    hirePageSlug: 'hire-fractional-cmo',
    faqs: [
      { question: 'What does a Fractional CMO do?', answer: 'A Fractional CMO provides part-time marketing leadership including brand strategy, demand generation, marketing team management, and growth planning.' },
      { question: 'How much does a Fractional CMO cost?', answer: 'Fractional CMOs typically charge £800-£1,400 per day in the UK, often working 2-3 days per week.' },
      { question: 'When should I hire a Fractional CMO?', answer: 'Consider a Fractional CMO when you need senior marketing strategy but cannot justify a £150,000+ full-time salary—typically at £1-15M revenue.' },
    ]
  },
  coo: {
    displayName: 'Fractional COO',
    shortDescription: 'Part-time Chief Operating Officer optimizing business operations',
    fullDescription: 'A Fractional COO provides part-time operational leadership to businesses needing to scale efficiently. They focus on process optimization, team structure, operational excellence, and turning strategy into execution.',
    typicalDayRate: { min: 850, max: 1400, typical: 1050 },
    occupationalCategory: '11-1021.00',
    pageSlug: 'fractional-coo',
    salaryPageSlug: 'fractional-coo-salary',
    hirePageSlug: 'hire-fractional-coo',
    faqs: [
      { question: 'What does a Fractional COO do?', answer: 'A Fractional COO provides part-time operational leadership including process optimization, team structure, KPI frameworks, and scaling operations.' },
      { question: 'How much does a Fractional COO cost?', answer: 'Fractional COOs typically charge £850-£1,400 per day in the UK.' },
      { question: 'When should I hire a Fractional COO?', answer: 'Consider a Fractional COO when your business is growing but operations are becoming a bottleneck—common at £3-30M revenue.' },
    ]
  },
  chro: {
    displayName: 'Fractional CHRO',
    shortDescription: 'Part-time Chief Human Resources Officer building people strategy',
    fullDescription: 'A Fractional CHRO provides part-time HR leadership to businesses building their people function. They bring expertise in talent strategy, culture development, HR compliance, and organizational design.',
    typicalDayRate: { min: 800, max: 1300, typical: 950 },
    occupationalCategory: '11-3121.00',
    pageSlug: 'fractional-chro',
    salaryPageSlug: 'fractional-chro-salary',
    hirePageSlug: 'hire-fractional-chro',
    faqs: [
      { question: 'What does a Fractional CHRO do?', answer: 'A Fractional CHRO provides part-time HR leadership including talent strategy, culture development, HR compliance, compensation design, and organizational development.' },
      { question: 'How much does a Fractional CHRO cost?', answer: 'Fractional CHROs typically charge £800-£1,300 per day in the UK.' },
      { question: 'When should I hire a Fractional CHRO?', answer: 'Consider a Fractional CHRO when you have 30+ employees and need strategic HR leadership but not a full-time hire.' },
    ]
  },
  ciso: {
    displayName: 'Fractional CISO',
    shortDescription: 'Part-time Chief Information Security Officer protecting digital assets',
    fullDescription: 'A Fractional CISO provides part-time cybersecurity leadership to businesses that need to protect their digital assets and meet compliance requirements. They bring expertise in security strategy, risk management, and regulatory compliance.',
    typicalDayRate: { min: 900, max: 1500, typical: 1150 },
    occupationalCategory: '11-3021.00',
    pageSlug: 'fractional-ciso',
    salaryPageSlug: 'fractional-ciso-salary',
    hirePageSlug: 'hire-fractional-ciso',
    faqs: [
      { question: 'What does a Fractional CISO do?', answer: 'A Fractional CISO provides part-time security leadership including security strategy, risk assessment, compliance management, incident response planning, and security awareness training.' },
      { question: 'How much does a Fractional CISO cost?', answer: 'Fractional CISOs typically charge £900-£1,500 per day in the UK due to specialized expertise.' },
      { question: 'When should I hire a Fractional CISO?', answer: 'Consider a Fractional CISO when you handle sensitive data, need compliance (SOC2, ISO27001), or have regulatory requirements.' },
    ]
  },
  cpo: {
    displayName: 'Fractional CPO',
    shortDescription: 'Part-time Chief Product Officer driving product strategy',
    fullDescription: 'A Fractional CPO provides part-time product leadership to businesses building and scaling products. They bring expertise in product strategy, roadmap development, user research, and product team management.',
    typicalDayRate: { min: 800, max: 1300, typical: 1000 },
    occupationalCategory: '11-2021.00',
    pageSlug: 'fractional-cpo',
    salaryPageSlug: 'fractional-cpo-salary',
    hirePageSlug: 'hire-fractional-cpo',
    faqs: [
      { question: 'What does a Fractional CPO do?', answer: 'A Fractional CPO provides part-time product leadership including product strategy, roadmap development, user research, and product team management.' },
      { question: 'How much does a Fractional CPO cost?', answer: 'Fractional CPOs typically charge £800-£1,300 per day in the UK.' },
      { question: 'When should I hire a Fractional CPO?', answer: 'Consider a Fractional CPO when you need product strategy expertise but are too early for a £160,000+ full-time hire.' },
    ]
  },
  ceo: {
    displayName: 'Fractional CEO',
    shortDescription: 'Part-time Chief Executive Officer providing executive leadership',
    fullDescription: 'A Fractional CEO provides part-time executive leadership to businesses in transition. They bring experience in strategic direction, board management, fundraising, and organizational leadership during growth phases or turnarounds.',
    typicalDayRate: { min: 1000, max: 2000, typical: 1400 },
    occupationalCategory: '11-1011.00',
    pageSlug: 'fractional-ceo',
    salaryPageSlug: 'fractional-ceo-salary',
    hirePageSlug: 'hire-fractional-ceo',
    faqs: [
      { question: 'What does a Fractional CEO do?', answer: 'A Fractional CEO provides part-time executive leadership including strategic direction, board management, fundraising support, and organizational leadership.' },
      { question: 'How much does a Fractional CEO cost?', answer: 'Fractional CEOs typically charge £1,000-£2,000 per day in the UK, reflecting their senior experience.' },
      { question: 'When should I hire a Fractional CEO?', answer: 'Consider a Fractional CEO during transitions, turnarounds, or when you need experienced executive leadership without a permanent hire.' },
    ]
  },
  cro: {
    displayName: 'Fractional CRO',
    shortDescription: 'Part-time Chief Revenue Officer driving revenue growth',
    fullDescription: 'A Fractional CRO provides part-time revenue leadership aligning sales, marketing, and customer success. They focus on revenue strategy, sales process optimization, and predictable revenue growth.',
    typicalDayRate: { min: 850, max: 1400, typical: 1100 },
    occupationalCategory: '11-2022.00',
    pageSlug: 'fractional-cro-jobs-uk',
    salaryPageSlug: 'fractional-cro-salary',
    hirePageSlug: 'hire-fractional-cro',
    faqs: [
      { question: 'What does a Fractional CRO do?', answer: 'A Fractional CRO provides part-time revenue leadership aligning sales, marketing, and customer success for predictable growth.' },
      { question: 'How much does a Fractional CRO cost?', answer: 'Fractional CROs typically charge £850-£1,400 per day in the UK.' },
      { question: 'When should I hire a Fractional CRO?', answer: 'Consider a Fractional CRO when you need to align revenue functions and scale from founder-led sales.' },
    ]
  },
  finance: {
    displayName: 'Fractional Finance Director',
    shortDescription: 'Part-time Finance Director managing financial operations',
    fullDescription: 'A Fractional Finance Director provides part-time financial management to growing businesses. They handle financial reporting, budgeting, cash flow management, and financial controls—a step before needing a full CFO.',
    typicalDayRate: { min: 700, max: 1200, typical: 900 },
    occupationalCategory: '11-3031.00',
    pageSlug: 'fractional-cfo-jobs-uk',
    salaryPageSlug: 'fractional-cfo-salary',
    hirePageSlug: 'hire-fractional-cfo',
    faqs: [
      { question: 'What does a Fractional Finance Director do?', answer: 'A Fractional Finance Director manages financial operations including reporting, budgeting, cash flow, and controls.' },
      { question: 'How is this different from a Fractional CFO?', answer: 'A Finance Director is more operational (day-to-day finance) while a CFO is more strategic (fundraising, M&A, board).' },
      { question: 'How much does a Fractional Finance Director cost?', answer: 'Fractional Finance Directors typically charge £700-£1,200 per day in the UK.' },
    ]
  },
  marketing: {
    displayName: 'Fractional Marketing Director',
    shortDescription: 'Part-time Marketing Director executing growth strategies',
    fullDescription: 'A Fractional Marketing Director provides part-time marketing leadership focused on execution. They manage marketing teams, campaigns, and day-to-day marketing operations.',
    typicalDayRate: { min: 650, max: 1100, typical: 850 },
    occupationalCategory: '11-2021.00',
    pageSlug: 'fractional-cmo-jobs-uk',
    salaryPageSlug: 'fractional-cmo-salary',
    hirePageSlug: 'hire-fractional-cmo',
    faqs: [
      { question: 'What does a Fractional Marketing Director do?', answer: 'A Fractional Marketing Director manages marketing execution including campaigns, team management, and performance.' },
      { question: 'How is this different from a Fractional CMO?', answer: 'A Marketing Director focuses on execution while a CMO focuses on strategy and board-level marketing leadership.' },
      { question: 'How much does a Fractional Marketing Director cost?', answer: 'Fractional Marketing Directors typically charge £650-£1,100 per day in the UK.' },
    ]
  },
  sales: {
    displayName: 'Fractional Sales Director',
    shortDescription: 'Part-time Sales Director building and leading sales teams',
    fullDescription: 'A Fractional Sales Director provides part-time sales leadership to businesses scaling their sales function. They focus on sales process, team building, pipeline management, and revenue acceleration.',
    typicalDayRate: { min: 700, max: 1200, typical: 900 },
    occupationalCategory: '11-2022.00',
    pageSlug: 'fractional-cro-jobs-uk',
    salaryPageSlug: 'fractional-cro-salary',
    hirePageSlug: 'hire-fractional-cro',
    faqs: [
      { question: 'What does a Fractional Sales Director do?', answer: 'A Fractional Sales Director builds and leads sales teams, optimizes sales processes, and drives revenue growth.' },
      { question: 'How much does a Fractional Sales Director cost?', answer: 'Fractional Sales Directors typically charge £700-£1,200 per day in the UK.' },
      { question: 'When should I hire a Fractional Sales Director?', answer: 'Consider a Fractional Sales Director when transitioning from founder-led sales to a scalable sales team.' },
    ]
  },
  hr: {
    displayName: 'Fractional HR Director',
    shortDescription: 'Part-time HR Director building people operations',
    fullDescription: 'A Fractional HR Director provides part-time HR leadership to growing businesses. They establish HR processes, policies, and the foundation for scaling the people function.',
    typicalDayRate: { min: 600, max: 1000, typical: 750 },
    occupationalCategory: '11-3121.00',
    pageSlug: 'fractional-chro-jobs-uk',
    salaryPageSlug: 'fractional-chro-salary',
    hirePageSlug: 'hire-fractional-chro',
    faqs: [
      { question: 'What does a Fractional HR Director do?', answer: 'A Fractional HR Director establishes HR processes, policies, and infrastructure for scaling businesses.' },
      { question: 'How is this different from a Fractional CHRO?', answer: 'An HR Director is more operational (policies, compliance) while a CHRO is more strategic (culture, board-level people strategy).' },
      { question: 'How much does a Fractional HR Director cost?', answer: 'Fractional HR Directors typically charge £600-£1,000 per day in the UK.' },
    ]
  },
  operations: {
    displayName: 'Fractional Operations Director',
    shortDescription: 'Part-time Operations Director optimizing business processes',
    fullDescription: 'A Fractional Operations Director provides part-time operational leadership focused on process optimization, efficiency improvements, and operational excellence.',
    typicalDayRate: { min: 650, max: 1100, typical: 850 },
    occupationalCategory: '11-1021.00',
    pageSlug: 'fractional-coo-jobs-uk',
    salaryPageSlug: 'fractional-coo-salary',
    hirePageSlug: 'hire-fractional-coo',
    faqs: [
      { question: 'What does a Fractional Operations Director do?', answer: 'A Fractional Operations Director optimizes business processes, improves efficiency, and implements operational best practices.' },
      { question: 'How is this different from a Fractional COO?', answer: 'An Operations Director focuses on execution while a COO takes a more strategic, cross-functional leadership role.' },
      { question: 'How much does a Fractional Operations Director cost?', answer: 'Fractional Operations Directors typically charge £650-£1,100 per day in the UK.' },
    ]
  },
  technology: {
    displayName: 'Fractional Technology Director',
    shortDescription: 'Part-time Technology Director managing technical delivery',
    fullDescription: 'A Fractional Technology Director provides part-time technical leadership focused on delivery. They manage development teams, technical projects, and engineering operations.',
    typicalDayRate: { min: 700, max: 1200, typical: 900 },
    occupationalCategory: '11-3021.00',
    pageSlug: 'fractional-cto-jobs-uk',
    salaryPageSlug: 'fractional-cto-salary',
    hirePageSlug: 'hire-fractional-cto',
    faqs: [
      { question: 'What does a Fractional Technology Director do?', answer: 'A Fractional Technology Director manages technical delivery, development teams, and engineering operations.' },
      { question: 'How is this different from a Fractional CTO?', answer: 'A Technology Director focuses on delivery and team management while a CTO focuses on strategy and architecture.' },
      { question: 'How much does a Fractional Technology Director cost?', answer: 'Fractional Technology Directors typically charge £700-£1,200 per day in the UK.' },
    ]
  },
}

// Default role data for unknown categories
const DEFAULT_ROLE_DATA: RoleData = {
  displayName: 'Fractional Executive',
  shortDescription: 'Part-time executive leadership for growing businesses',
  fullDescription: 'A Fractional Executive provides part-time senior leadership to businesses that need expertise without the commitment of a full-time hire. They bring years of experience and can make an immediate impact.',
  typicalDayRate: { min: 700, max: 1200, typical: 900 },
  occupationalCategory: '11-1021.00',
  pageSlug: 'fractional-jobs-uk',
  salaryPageSlug: 'fractional-jobs-uk',
  hirePageSlug: 'fractional-jobs-uk',
  faqs: [
    { question: 'What is a fractional executive?', answer: 'A fractional executive is a senior leader who works part-time across multiple companies, bringing C-suite expertise at a fraction of the cost.' },
    { question: 'How much does a fractional executive cost?', answer: 'Fractional executives typically charge £700-£1,500 per day depending on the role and seniority.' },
    { question: 'When should I hire a fractional executive?', answer: 'Consider a fractional executive when you need senior expertise but cannot justify a full-time hire—common for growing businesses.' },
  ]
}

function getRoleData(roleCategory: string | null, executiveTitle?: string | null): RoleData {
  // Check executive_title first (more specific: CFO, CTO, CMO, etc.)
  if (executiveTitle) {
    const etKey = executiveTitle.toLowerCase()
    if (ROLE_DATA[etKey]) return ROLE_DATA[etKey]
  }
  if (!roleCategory) return DEFAULT_ROLE_DATA
  return ROLE_DATA[roleCategory.toLowerCase()] || DEFAULT_ROLE_DATA
}

// Calculate validThrough date (30 days from posted date)
function calculateValidThrough(datePosted: string | null, days: number = 30): string {
  const base = datePosted ? new Date(datePosted) : new Date()
  base.setDate(base.getDate() + days)
  return base.toISOString().split('T')[0]
}

// BreadcrumbList Schema Component
function BreadcrumbListSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQ Schema Component
function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const revalidate = 3600

// Parse job description into structured sections
// Helper: render inline markdown (bold and links) within text
function renderInlineMarkdown(text: string): React.ReactNode {
  // Split on markdown patterns: **bold** and [text](url)
  const parts: React.ReactNode[] = []
  let remaining = text
  let partKey = 0

  while (remaining.length > 0) {
    // Find the next markdown pattern
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/)

    const boldIndex = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity
    const linkIndex = linkMatch ? remaining.indexOf(linkMatch[0]) : Infinity

    if (boldIndex === Infinity && linkIndex === Infinity) {
      // No more patterns, push remaining text
      parts.push(remaining)
      break
    }

    if (boldIndex <= linkIndex && boldMatch) {
      // Bold comes first
      if (boldIndex > 0) parts.push(remaining.slice(0, boldIndex))
      parts.push(<strong key={partKey++} className="font-semibold text-gray-900">{boldMatch[1]}</strong>)
      remaining = remaining.slice(boldIndex + boldMatch[0].length)
    } else if (linkMatch) {
      // Link comes first
      if (linkIndex > 0) parts.push(remaining.slice(0, linkIndex))
      parts.push(
        <a key={partKey++} href={linkMatch[2]} target={linkMatch[2].startsWith('http') ? '_blank' : undefined} rel={linkMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined} className="text-emerald-700 hover:text-emerald-900 underline font-medium">
          {linkMatch[1]}
        </a>
      )
      remaining = remaining.slice(linkIndex + linkMatch[0].length)
    }
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>
}

function parseJobDescription(text: string): React.ReactNode[] {
  if (!text) return []

  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let key = 0

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-3 my-6 text-gray-600 pl-2">
          {currentList.map((item, i) => (
            <li key={i} className="leading-relaxed">{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    // Check for markdown headings (## and ###)
    if (line.startsWith('## ')) {
      flushList()
      const headingText = line.slice(3)
      elements.push(
        <h2 key={key++} className="text-xl sm:text-2xl font-bold text-gray-900 mt-10 mb-4 first:mt-0">
          {renderInlineMarkdown(headingText)}
        </h2>
      )
      continue
    }
    if (line.startsWith('### ')) {
      flushList()
      const headingText = line.slice(4)
      elements.push(
        <h3 key={key++} className="text-lg font-semibold text-gray-900 mt-8 mb-3">
          {renderInlineMarkdown(headingText)}
        </h3>
      )
      continue
    }

    // Check if it's a bullet point (starts with ·, •, -, *)
    if (/^[·•\-\*]\s*/.test(line)) {
      const bulletText = line.replace(/^[·•\-\*]\s*/, '')
      currentList.push(bulletText)
      continue
    }

    // Flush any pending list
    flushList()

    // Check if it's a section heading (short line, no ending punctuation, followed by content)
    const isHeading = line.length < 60 &&
                      !/[.,:;!?]$/.test(line) &&
                      !line.includes('[') &&
                      i < lines.length - 1 &&
                      (lines[i + 1]?.trim().length > 0 || /^[·•\-\*]/.test(lines[i + 1]?.trim() || ''))

    // Check if it looks like a metadata line (Key: Value format)
    const metaMatch = line.match(/^([A-Za-z\s]+):\s*(.+)$/)
    if (metaMatch && metaMatch[1].length < 30 && !line.includes('[') && !line.includes('**')) {
      elements.push(
        <div key={key++} className="flex flex-wrap gap-2 my-4 py-2 px-3 bg-gray-50 rounded-lg">
          <span className="font-semibold text-gray-700">{metaMatch[1]}:</span>
          <span className="text-gray-600">{renderInlineMarkdown(metaMatch[2])}</span>
        </div>
      )
      continue
    }

    if (isHeading) {
      elements.push(
        <h3 key={key++} className="text-lg font-semibold text-gray-900 mt-8 mb-3 first:mt-0">
          {renderInlineMarkdown(line)}
        </h3>
      )
    } else {
      // Regular paragraph - with better spacing for mobile
      elements.push(
        <p key={key++} className="text-gray-600 leading-relaxed my-4 text-base sm:text-lg">
          {renderInlineMarkdown(line)}
        </p>
      )
    }
  }

  // Flush any remaining list
  flushList()

  return elements
}

type Props = {
  params: Promise<{ slug: string }>
}

// Internal function to fetch job from database
async function fetchJob(slug: string) {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT
        id, slug, title, company_name, location, workplace_type, is_remote,
        compensation, posted_date, updated_date, description_snippet,
        full_description, requirements, responsibilities, benefits,
        qualifications, skills_required, role_category, executive_title,
        hours_per_week, url, about_company, about_team, appeal_summary,
        key_deliverables, city
      FROM jobs
      WHERE slug = ${slug} AND is_active = true
    `
    return jobs[0] as any || null
  } catch {
    return null
  }
}

// Cached version - revalidates every hour
const getJob = unstable_cache(
  fetchJob,
  ['job-by-slug'],
  { revalidate: 3600, tags: ['jobs'] }
)

// Internal function to fetch related jobs - only same role category for relevance
async function fetchRelatedJobs(jobId: number, roleCategory: string | null, companyName: string | null) {
  try {
    const sql = createDbQuery()
    // First try to find jobs with the same role category (most relevant)
    // If no role category, fall back to same company
    const jobs = roleCategory
      ? await sql`
          SELECT id, slug, title, company_name, location, compensation, role_category
          FROM jobs
          WHERE is_active = true
            AND id != ${jobId}
            AND role_category = ${roleCategory}
          ORDER BY posted_date DESC NULLS LAST
          LIMIT 6
        `
      : await sql`
          SELECT id, slug, title, company_name, location, compensation, role_category
          FROM jobs
          WHERE is_active = true
            AND id != ${jobId}
            AND company_name = ${companyName}
          ORDER BY posted_date DESC NULLS LAST
          LIMIT 6
        `
    return jobs as any[]
  } catch {
    return []
  }
}

// Cached version - revalidates every hour
const getRelatedJobsCached = unstable_cache(
  fetchRelatedJobs,
  ['related-jobs'],
  { revalidate: 3600, tags: ['jobs'] }
)

// Wrapper to match original interface
async function getRelatedJobs(job: any) {
  if (!job) return []
  return getRelatedJobsCached(job.id, job.role_category, job.company_name)
}

// Truncate title to fit SEO requirements (layout adds " | Fractional Quest" = 19 chars)
function truncateTitle(title: string, company: string, maxLength: number = 40): string {
  const fullTitle = `${title} at ${company}`
  if (fullTitle.length <= maxLength) return fullTitle

  // Try shorter format: "Title | Company"
  const shortTitle = `${title} | ${company}`
  if (shortTitle.length <= maxLength) return shortTitle

  // Truncate company name if needed
  const truncatedCompany = company.length > 15 ? company.slice(0, 12) + '...' : company
  const truncatedTitle = `${title} | ${truncatedCompany}`
  if (truncatedTitle.length <= maxLength) return truncatedTitle

  // Last resort: truncate job title
  return title.slice(0, maxLength - 3) + '...'
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const job = await getJob(slug)

  if (!job) {
    return { title: 'Job Not Found' }
  }

  // Get role data for SEO optimization
  const roleData = getRoleData(job.role_category, job.executive_title)
  const roleKeyword = roleData.displayName

  // SEO-optimized title: Put normalized role keyword FIRST for ranking
  // Pattern: "Fractional CFO Role | Sales Director at Acme"
  const jobAtCompany = truncateTitle(job.title, job.company_name, 35)
  const title = roleKeyword !== 'Fractional Executive'
    ? `${roleKeyword} Role | ${jobAtCompany}`
    : jobAtCompany

  // SEO-optimized description: Lead with keyword
  const description = [
    `${roleKeyword} opportunity:`,
    job.title,
    `at ${job.company_name}.`,
    job.location ? `Based in ${job.location}.` : null,
    job.compensation || `Typical rate: £${roleData.typicalDayRate.min}-£${roleData.typicalDayRate.max}/day.`,
    'Apply now.'
  ].filter(Boolean).join(' ').slice(0, 155)

  return {
    title,
    description,
    keywords: [
      roleKeyword,
      `${roleKeyword} jobs`,
      `${roleKeyword} UK`,
      job.location ? `${roleKeyword} ${job.location}` : null,
      'fractional executive',
      'part-time executive',
      job.role_category,
    ].filter(Boolean).join(', '),
    alternates: {
      canonical: `https://fractional.quest/fractional-job/${slug}`,
    },
    openGraph: {
      title: `${title} | Fractional Quest`,
      description,
      url: `https://fractional.quest/fractional-job/${slug}`,
      siteName: 'Fractional Quest',
      type: 'website',
      images: [{
        url: getHeroImageUrl(getRoleImageCategory(job.role_category || 'default'), 1200, 630),
        width: 1200,
        height: 630,
        alt: `${roleKeyword} - ${job.title} at ${job.company_name}`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Fractional Quest`,
      description,
      images: [getHeroImageUrl(getRoleImageCategory(job.role_category || 'default'), 1200, 630)],
    },
  }
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params
  const job = await getJob(slug)

  if (!job) {
    notFound()
  }

  const relatedJobs = await getRelatedJobs(job)

  // Get comprehensive role data for SEO
  const roleData = getRoleData(job.role_category, job.executive_title)
  const roleKeyword = roleData.displayName

  // Parse compensation for schema, fallback to role estimates
  const parsedSalary = parseCompensation(job.compensation) || {
    currency: 'GBP',
    minValue: roleData.typicalDayRate.min,
    maxValue: roleData.typicalDayRate.max,
    unitText: 'DAY' as const,
  }

  // Breadcrumb items for schema
  const breadcrumbItems = [
    { name: 'Home', url: 'https://fractional.quest/' },
    { name: `${roleKeyword} Jobs`, url: `https://fractional.quest/${roleData.pageSlug}` },
    { name: job.title, url: `https://fractional.quest/fractional-job/${slug}` },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Schema Markup for SEO */}
      <WebPageSchema
        title={`${roleKeyword} - ${job.title} at ${job.company_name}`}
        description={job.description_snippet || `${roleKeyword} role at ${job.company_name}`}
        url={`https://fractional.quest/fractional-job/${slug}`}
        datePublished={job.posted_date}
        dateModified={new Date(job.updated_date || job.posted_date || new Date())}
      />

      <BreadcrumbListSchema items={breadcrumbItems} />

      <FAQSchema faqs={roleData.faqs} />

      {/* Enhanced JobPosting Schema for Google Jobs */}
      <JobPostingSchema
        title={`${job.title} - ${roleKeyword}`}
        description={job.full_description || job.description_snippet || `${roleKeyword} position at ${job.company_name}. ${roleData.shortDescription}`}
        datePosted={job.posted_date || new Date().toISOString().split('T')[0]}
        validThrough={calculateValidThrough(job.posted_date, 30)}
        company={{
          name: job.company_name || 'Fractional Quest',
          logo: job.company_name === 'Fractional Quest'
            ? 'https://fractional.quest/logo.png'
            : undefined,
          url: job.company_name === 'Fractional Quest'
            ? 'https://fractional.quest'
            : undefined,
        }}
        location={{
          city: job.city || job.location?.split(',')[0]?.trim(),
          region: job.location?.split(',')[1]?.trim() || 'England',
          country: 'United Kingdom',
        }}
        isRemote={job.is_remote || job.workplace_type === 'Remote'}
        employmentType="CONTRACTOR"
        salary={parsedSalary}
        jobUrl={`https://fractional.quest/fractional-job/${slug}`}
        skills={job.skills_required ? (Array.isArray(job.skills_required) ? job.skills_required : job.skills_required.split(',').map((s: string) => s.trim())) : undefined}
        qualifications={job.qualifications ? [job.qualifications] : undefined}
        responsibilities={job.responsibilities ? [job.responsibilities] : undefined}
        benefits={job.benefits ? [job.benefits] : undefined}
        directApply={true}
      />

      {/* Hero with Image - SEO optimized alt text */}
      <section className="relative min-h-[350px] lg:min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getHeroImageUrl(getRoleImageCategory(job.role_category || 'default'), 1600, 600)}
            alt={`${roleKeyword} job opportunity - ${job.title} at ${job.company_name}`}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <BreadcrumbsLight
            items={[
              { label: 'Home', href: '/' },
              { label: `${roleKeyword} Jobs`, href: `/${roleData.pageSlug}` },
              { label: job.title },
            ]}
          />

          <div className="mt-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href={`/${roleData.pageSlug}`}
                className="px-3 py-1 bg-emerald-500/30 backdrop-blur-sm rounded-full text-sm text-emerald-300 hover:bg-emerald-500/50 transition-colors"
              >
                {roleKeyword}
              </Link>
              {job.workplace_type && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">{job.workplace_type}</span>
              )}
              {job.is_remote && (
                <span className="px-3 py-1 bg-green-500/30 backdrop-blur-sm text-green-300 rounded-full text-sm">Remote</span>
              )}
            </div>

            {/* H1: Normalized role keyword for SEO ranking */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white break-words">
              {roleKeyword} Opportunity
            </h1>

            {/* H2: Specific job title */}
            <h2 className="text-lg sm:text-xl lg:text-2xl text-emerald-400 font-medium mb-4">
              {job.title} at {job.company_name}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-gray-200">
              {job.location && <span className="flex items-center gap-1">📍 {job.location}</span>}
              {job.compensation && <span className="text-emerald-400 font-medium">💰 {job.compensation}</span>}
              {job.hours_per_week && <span>⏰ {job.hours_per_week} hrs/week</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 min-w-0">
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Role</h2>

                {job.full_description ? (
                  <div className="max-w-none overflow-hidden">
                    {/* Parse description into structured sections with headings, lists, and paragraphs */}
                    {job.full_description.includes('<p>') || job.full_description.includes('<br') ? (
                      <div
                        className="prose prose-sm sm:prose-lg text-gray-600 max-w-none break-words overflow-wrap-anywhere"
                        dangerouslySetInnerHTML={{ __html: job.full_description }}
                      />
                    ) : (
                      parseJobDescription(job.full_description)
                    )}
                  </div>
                ) : job.description_snippet ? (
                  <p className="text-gray-600 leading-relaxed">{job.description_snippet}</p>
                ) : (
                  <p className="text-gray-600">
                    This is a {job.workplace_type || 'flexible'} {job.title} role at {job.company_name}.
                    {job.location && ` Based in ${job.location}.`}
                    {job.compensation && ` Offering ${job.compensation}.`}
                  </p>
                )}

                {job.skills_required && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(job.skills_required) ? job.skills_required : job.skills_required.split(',')).map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>

                <dl className="space-y-4">
                  {job.company_name && (
                    <div>
                      <dt className="text-sm text-gray-500">Company</dt>
                      <dd className="font-medium text-gray-900">{job.company_name}</dd>
                    </div>
                  )}
                  {job.location && (
                    <div>
                      <dt className="text-sm text-gray-500">Location</dt>
                      <dd className="font-medium text-gray-900">{job.location}</dd>
                    </div>
                  )}
                  {job.compensation && (
                    <div>
                      <dt className="text-sm text-gray-500">Compensation</dt>
                      <dd className="font-medium text-emerald-600">{job.compensation}</dd>
                    </div>
                  )}
                  {job.hours_per_week && (
                    <div>
                      <dt className="text-sm text-gray-500">Hours/Week</dt>
                      <dd className="font-medium text-gray-900">{job.hours_per_week}</dd>
                    </div>
                  )}
                  {job.posted_date && (
                    <div>
                      <dt className="text-sm text-gray-500">Posted</dt>
                      <dd className="font-medium text-gray-900">
                        {new Date(job.posted_date).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </dd>
                    </div>
                  )}
                </dl>

                {job.url && (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block w-full text-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Apply Now
                  </a>
                )}

                <Link
                  href="/fractional-jobs-uk"
                  className="mt-3 block w-full text-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Browse All Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a {Role}? - SEO Content Section */}
      <section className="py-8 sm:py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              What is a {roleKeyword}?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {roleData.fullDescription}
            </p>

            {/* Salary Benchmarks */}
            <div className="bg-emerald-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {roleKeyword} Day Rates (UK Market)
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">£{roleData.typicalDayRate.min}</div>
                  <div className="text-sm text-gray-500">Minimum</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">£{roleData.typicalDayRate.typical}</div>
                  <div className="text-sm text-gray-500">Typical</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">£{roleData.typicalDayRate.max}</div>
                  <div className="text-sm text-gray-500">Maximum</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Based on UK market rates for {roleKeyword} roles working 2-3 days per week
              </p>
            </div>

            {/* Internal Links for Topical Authority */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Learn More About {roleKeyword} Roles
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href={`/${roleData.pageSlug}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium text-gray-900 mb-1">Browse All {roleKeyword} Jobs</div>
                <div className="text-sm text-gray-500">View all available opportunities</div>
              </Link>
              <Link
                href={`/${roleData.salaryPageSlug}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium text-gray-900 mb-1">{roleKeyword} Salary Guide</div>
                <div className="text-sm text-gray-500">Comprehensive rate benchmarks</div>
              </Link>
              <Link
                href={`/${roleData.hirePageSlug}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium text-gray-900 mb-1">Hire a {roleKeyword}</div>
                <div className="text-sm text-gray-500">Guide for businesses</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Rendered for users (schema already added above) */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions About {roleKeyword} Roles
            </h2>
            <div className="space-y-4">
              {roleData.faqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-lg p-4 border border-gray-200 group">
                  <summary className="font-medium text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Jobs */}
      {relatedJobs.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
              More {roleKeyword} Opportunities
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedJobs.map((relatedJob: any) => (
                <Link
                  key={relatedJob.id}
                  href={`/fractional-job/${relatedJob.slug}`}
                  className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-lg hover:border-emerald-200 transition-all"
                >
                  {relatedJob.role_category && (
                    <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-medium mb-2">
                      {relatedJob.role_category}
                    </span>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{relatedJob.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 truncate">{relatedJob.company_name}</p>
                  <div className="flex items-center justify-between text-sm gap-2">
                    <span className="text-gray-500 truncate">{relatedJob.location}</span>
                    {relatedJob.compensation && (
                      <span className="text-emerald-600 font-medium whitespace-nowrap">{relatedJob.compensation}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Find Your Next Fractional Role</h2>
          <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Browse hundreds of fractional and interim executive positions</p>
          <Link
            href="/fractional-jobs-uk"
            className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm sm:text-base"
          >
            View All Jobs
          </Link>
        </div>
      </section>
    </div>
  )
}
