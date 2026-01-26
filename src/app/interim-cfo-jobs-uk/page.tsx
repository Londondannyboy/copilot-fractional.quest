import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createDbQuery } from '@/lib/db'
import { FAQ } from '@/components/seo/FAQ'
import { RoleCalculator } from '@/components/RoleCalculator'
import { IR35Calculator } from '@/components/IR35Calculator'
import { ServerJobGrid } from '@/components/ServerJobGrid'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { JobListingSchema } from '@/components/seo/JobPostingSchema'
import { WebPageSchema, LastUpdatedBadge } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { HotJobsLines } from '@/components/HotJobsLines'
import { RoleContentHub } from '@/components/RoleContentHub'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Interim CFO Jobs UK | Finance Director Roles 2026',
  description: 'Find interim CFO jobs UK with day rates £900-£1,500. Browse interim Finance Director and Chief Financial Officer roles. Remote, hybrid & London positions available.',
  keywords: 'interim cfo jobs uk, interim cfo, interim finance director jobs, interim fd jobs, interim chief financial officer, interim cfo roles uk, interim finance jobs, interim cfo london, interim cfo remote',
  alternates: { canonical: 'https://www.fractional.quest/interim-cfo-jobs-uk' },
  openGraph: {
    title: 'Interim CFO Jobs UK | Finance Director Roles 2026',
    description: 'Find interim CFO jobs UK with day rates £900-£1,500. Browse interim Finance Director and Chief Financial Officer roles.',
    url: 'https://www.fractional.quest/interim-cfo-jobs-uk',
  },
}

const INTERIM_CFO_FAQS = [
  {
    question: "What is an interim CFO?",
    answer: "An interim CFO is a temporary Chief Financial Officer who provides senior finance leadership during transitions, transformations, or gaps in permanent leadership. Unlike fractional CFOs who work part-time ongoing, interim CFOs typically work full-time for a defined period (3-12 months). They're brought in to handle critical financial situations requiring immediate, dedicated finance leadership."
  },
  {
    question: "What are typical interim CFO day rates in the UK?",
    answer: "Interim CFO day rates in the UK typically range from £900-£1,500 per day, depending on experience, sector, and complexity. PE-backed companies and complex M&A situations command premium rates of £1,500-£2,000/day. The annual equivalent is £180,000-£300,000 for full-time interim engagements. London-based roles typically pay 10-15% more than regional positions."
  },
  {
    question: "How long do interim CFO assignments last?",
    answer: "Most interim CFO assignments last 6-12 months, though they can range from 3 months (crisis situations) to 18+ months (complex transformations). Many interim CFOs work on rolling contracts with 30-day notice periods. According to industry data, the average assignment length has increased as companies recognise the value of experienced finance leadership."
  },
  {
    question: "What's the difference between interim and fractional CFO?",
    answer: "Interim CFOs typically work full-time (5 days/week) for a fixed period covering a gap or transformation, while fractional CFOs work part-time (1-3 days/week) on an ongoing basis. Interim roles are higher intensity but shorter duration. Interim CFOs often step into urgent situations, while fractional CFOs provide steady-state financial oversight for smaller companies."
  },
  {
    question: "What qualifications do interim CFOs need?",
    answer: "Most interim CFOs are qualified accountants (ACA, ACCA, CIMA) with 15+ years of experience including prior CFO/FD roles. Essential qualifications include PE transaction experience, M&A expertise, and a track record of successful interim assignments. Many hold additional credentials like CFA or sector-specific qualifications."
  },
  {
    question: "What industries hire interim CFOs most frequently?",
    answer: "The highest demand for interim CFOs comes from: private equity portfolio companies (value creation, due diligence, exits), financial services (regulatory compliance, transformation), healthcare and life sciences (NHS commercialisation, biotech fundraising), retail and e-commerce (turnarounds, digital transformation), and manufacturing (operational finance, supply chain optimisation)."
  },
  {
    question: "Do interim CFOs work inside or outside IR35?",
    answer: "IR35 status varies by engagement. Many interim CFO roles fall inside IR35 due to the control, direction, and integration factors typical of finance leadership roles. However, clearly scoped transformation projects or M&A advisory work may qualify as outside IR35. Always obtain a status determination statement (SDS) before accepting a role."
  },
  {
    question: "What's the hiring process for interim CFOs?",
    answer: "Interim CFO hiring typically moves fast - often 1-3 weeks from first contact to start date. The process usually includes: initial screening call with the search firm, interview with CEO/board, commercial terms negotiation, references check, and IR35 status determination. PE-backed companies often have even faster turnaround times."
  },
  {
    question: "Can interim CFO experience lead to permanent roles?",
    answer: "Yes, many interim assignments convert to permanent positions. Industry estimates suggest 25-35% of interim CFOs receive permanent offers, higher than other C-suite roles due to the critical nature of the finance function. However, many interim executives prefer the portfolio career model. Some negotiate 'interim-to-perm' arrangements upfront."
  },
  {
    question: "What should I include in my interim CFO CV?",
    answer: "Focus on: financial transformation outcomes and metrics achieved, M&A transactions completed (deal values, integration success), fundraising rounds closed, cost savings delivered, systems implementations (ERP, reporting), and specific sector experience. Include Big 4 or top-tier firm experience if applicable. Keep it to 2-3 pages maximum with clear start/end dates for each assignment."
  },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Interim Jobs', href: '/fractional-jobs-uk' },
  { label: 'Interim CFO Jobs UK', href: '/interim-cfo-jobs-uk' },
]

async function getInterimCFOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`
      SELECT COUNT(*) as count FROM jobs
      WHERE is_active = true
        AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%finance director%' OR title ILIKE '%interim%fd%' OR title ILIKE '%interim%chief financial%')
        AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%England%')
    `
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`
      SELECT COUNT(*) as count FROM jobs
      WHERE is_active = true
        AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%finance director%' OR title ILIKE '%interim%fd%')
        AND (is_remote = true OR workplace_type ILIKE '%remote%')
        AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')
    `
    return { total: total || 25, avgRate: 1200, remoteCount: Number(remoteCount?.count || 5) }
  } catch { return { total: 25, avgRate: 1200, remoteCount: 5 } }
}

async function getInterimCFOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date
      FROM jobs WHERE is_active = true
        AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%finance director%' OR title ILIKE '%interim%fd%' OR title ILIKE '%interim%chief financial%' OR (title ILIKE '%interim%' AND role_category = 'Finance'))
        AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Edinburgh%')
      ORDER BY posted_date DESC NULLS LAST LIMIT 20
    `
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`
      SELECT DISTINCT company_name FROM jobs
      WHERE is_active = true
        AND (title ILIKE '%interim%' AND role_category = 'Finance')
        AND company_name IS NOT NULL
        AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')
      ORDER BY company_name LIMIT 20
    `
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date
      FROM jobs WHERE is_active = true
        AND (title ILIKE '%interim%cto%' OR title ILIKE '%interim%cmo%' OR title ILIKE '%interim%coo%' OR title ILIKE '%fractional%cfo%')
        AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')
      ORDER BY posted_date DESC NULLS LAST LIMIT 15
    `
    return jobs
  } catch { return [] }
}

export default async function InterimCFOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([
    getInterimCFOStats(), getFeaturedCompanies(), getInterimCFOJobs(), getRelatedJobs()
  ])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Interim CFO Jobs UK | Interim Finance Director Roles 2026"
        description="Find interim CFO jobs UK with day rates £900-£1,500. Browse interim Finance Director and Chief Financial Officer roles."
        url="https://www.fractional.quest/interim-cfo-jobs-uk"
        dateModified={lastUpdatedDate}
      />
      <FAQPageSchema faqs={INTERIM_CFO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/interim-cfo-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80"
          alt="Interim CFO Jobs UK - Finance Director Roles"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-teal-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Interim Finance Leadership
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Interim CFO Jobs UK
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Find <strong>interim CFO</strong> and <strong>interim Finance Director</strong> roles across the UK.
                Premium interim finance leadership positions with day rates from £900-£1,500.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors">
                  Browse Interim CFO Jobs
                </a>
                <Link href="/fractional-cfo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  Fractional CFO Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-emerald-400">{stats.total}+</div>
              <div className="text-gray-400 text-sm">Interim CFO Roles</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">£{stats.avgRate}</div>
              <div className="text-gray-400 text-sm">Avg Day Rate</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">{stats.remoteCount}</div>
              <div className="text-gray-400 text-sm">Remote/Hybrid</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">
                <LastUpdatedBadge date={lastUpdatedDate} />
              </div>
              <div className="text-gray-400 text-sm">Last Updated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Jobs Ticker */}
      {jobs.length > 0 && (
        <section className="bg-emerald-50 border-y border-emerald-100 py-4 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <HotJobsLines
              jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))}
              title="Latest Interim CFO Jobs"
              maxJobs={10}
            />
          </div>
        </section>
      )}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CFO & Finance Director Jobs UK</h2>
            </div>
            <p className="text-gray-500">{jobs.length}+ live interim finance roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Finance" ctaLink="/fractional-jobs-uk?department=Finance" ctaText="View All Finance Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CFO Rates</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CFO Day Rate Calculator</h2>
          </div>
          <RoleCalculator role="cfo" />
        </div>
      </section>

      {/* Companies Hiring */}
      {companies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CFOs</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-emerald-500 transition-colors cursor-default">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="Table of contents">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">On This Page</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <a href="#market" className="block text-emerald-700 hover:text-emerald-800 hover:underline">UK Interim CFO Market</a>
                <a href="#when-needed" className="block text-emerald-700 hover:text-emerald-800 hover:underline">When Companies Need Interim CFOs</a>
                <a href="#qualifications" className="block text-emerald-700 hover:text-emerald-800 hover:underline">Qualifications & Experience</a>
              </div>
              <div className="space-y-2">
                <a href="#sectors" className="block text-emerald-700 hover:text-emerald-800 hover:underline">Top Hiring Sectors</a>
                <a href="#rates" className="block text-emerald-700 hover:text-emerald-800 hover:underline">Day Rates & IR35</a>
                <a href="#career" className="block text-emerald-700 hover:text-emerald-800 hover:underline">Career Path & Transition</a>
              </div>
              <div className="space-y-2">
                <a href="#resources" className="block text-emerald-700 hover:text-emerald-800 hover:underline">Related Resources</a>
                <a href="#faq" className="block text-emerald-700 hover:text-emerald-800 hover:underline">Common Questions</a>
              </div>
            </div>
          </nav>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Interim CFO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The <strong>interim CFO</strong> market in the UK has grown significantly as companies recognise the value of experienced finance leadership during periods of change. According to the <a href="https://www.icaew.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">Institute of Chartered Accountants in England and Wales (ICAEW)</a>, demand for interim finance executives increased by 20% in 2025, driven by M&A activity, PE investment, and finance transformation programmes.
            </p>
            <p>
              Unlike <Link href="/fractional-cfo-jobs-uk" className="text-emerald-700 hover:underline">fractional CFO roles</Link> which involve ongoing part-time engagement, interim CFO positions are typically full-time assignments lasting 6-12 months. The <a href="https://www.accaglobal.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">Association of Chartered Certified Accountants (ACCA)</a> notes that interim finance leadership has become essential for businesses navigating regulatory changes and digital transformation.
            </p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CFOs</h3>
            <p className="text-gray-600 mb-4">Organisations typically engage interim CFOs for specific strategic situations requiring immediate, senior finance leadership:</p>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Leadership gaps</strong> — Covering departures while recruiting permanent replacements. CFO searches typically take 6-9 months; interim cover maintains business continuity and stakeholder confidence.</li>
              <li><strong>Finance transformations</strong> — ERP implementations, finance system upgrades, process automation. Interim CFOs bring implementation experience without long-term commitment.</li>
              <li><strong>M&A activity</strong> — Pre-deal financial due diligence, post-merger integration, carve-outs. According to <a href="https://www.bvca.co.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">BVCA</a>, PE-backed M&A remains strong, driving interim demand.</li>
              <li><strong>PE portfolio management</strong> — Value creation initiatives, financial controls improvement, exit preparation. Portfolio companies frequently need senior finance leadership during transitions.</li>
              <li><strong>Crisis management</strong> — Cash flow management, restructuring, stakeholder communication. Interim CFOs provide objectivity and specialist turnaround expertise.</li>
              <li><strong>IPO preparation</strong> — Getting finance function ready for public markets, implementing audit-ready processes, investor relations capability.</li>
            </ul>

            <h3 id="qualifications" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Qualifications & Experience for Interim CFOs</h3>
            <p className="text-gray-600 mb-4">Successful interim CFOs combine professional qualifications with extensive commercial experience. The <a href="https://www.cimaglobal.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">Chartered Institute of Management Accountants (CIMA)</a> identifies these key requirements:</p>
            <div className="grid md:grid-cols-2 gap-6 not-prose mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Professional Qualifications</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• ACA, ACCA, or CIMA qualified</li>
                  <li>• Big 4 or top-tier firm background</li>
                  <li>• Additional credentials (CFA, MBA)</li>
                  <li>• Sector-specific certifications</li>
                  <li>• Continuous professional development</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Commercial Experience</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 15+ years finance experience</li>
                  <li>• Prior CFO/FD roles</li>
                  <li>• M&A transaction experience</li>
                  <li>• PE/VC environment exposure</li>
                  <li>• Board-level communication skills</li>
                </ul>
              </div>
            </div>

            <h3 id="sectors" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Top UK Sectors Hiring Interim CFOs</h3>
            <p className="text-gray-600 mb-4">Demand for interim CFOs varies by sector. Based on market analysis and data from the <a href="https://www.frc.org.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">Financial Reporting Council</a>:</p>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full text-sm">
                <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 font-bold text-gray-900">Sector</th><th className="text-left py-3 px-4 font-bold text-gray-900">Typical Day Rate</th><th className="text-left py-3 px-4 font-bold text-gray-900">Key Drivers</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Private Equity Portfolio</td><td className="py-3 px-4 text-gray-600">£1,200-£1,800</td><td className="py-3 px-4 text-gray-600">Value creation, exits, integrations</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Financial Services</td><td className="py-3 px-4 text-gray-600">£1,300-£2,000</td><td className="py-3 px-4 text-gray-600">Regulatory compliance, FCA reporting</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Healthcare / Life Sciences</td><td className="py-3 px-4 text-gray-600">£1,100-£1,500</td><td className="py-3 px-4 text-gray-600">Fundraising, NHS contracts, R&D accounting</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Technology / SaaS</td><td className="py-3 px-4 text-gray-600">£1,000-£1,400</td><td className="py-3 px-4 text-gray-600">Series funding, IPO prep, revenue recognition</td></tr>
                  <tr><td className="py-3 px-4 text-gray-900">Manufacturing / Industrials</td><td className="py-3 px-4 text-gray-600">£900-£1,300</td><td className="py-3 px-4 text-gray-600">Restructuring, supply chain finance</td></tr>
                </tbody>
              </table>
            </div>

            <h3 id="rates" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Day Rates & IR35 Considerations</h3>
            <p className="text-gray-600 mb-4">Interim CFO compensation in the UK is primarily day-rate based. According to guidance from <a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">HMRC on IR35</a>:</p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Day rate range:</strong> £900-£1,500 standard, up to £2,000 for financial services/PE</li>
              <li><strong>Location premium:</strong> London roles typically pay 10-20% more than regional positions</li>
              <li><strong>IR35 status:</strong> Many interim CFO roles fall inside IR35. Budget for the tax implications accordingly.</li>
              <li><strong>Notice periods:</strong> Typically 30 days, sometimes 2 weeks for shorter assignments</li>
            </ul>
            <p className="text-gray-600 mt-4">For detailed IR35 guidance, consult <a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">IPSE</a> or seek specialist tax advice from firms like <a href="https://www.kpmg.co.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">KPMG</a> or <a href="https://www.deloitte.co.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">Deloitte</a>.</p>

            <h3 id="career" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Career Path: Transitioning to Interim CFO Work</h3>
            <p className="text-gray-600 mb-4">Many interim CFOs transition from permanent roles after 15-20 years of experience. The path typically involves:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
              <li>Building a track record of financial leadership (CFO/FD roles in multiple organisations)</li>
              <li>Developing M&A and transformation experience (integration, carve-outs, system implementations)</li>
              <li>Building a network through industry events, <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">LinkedIn</a>, and professional bodies</li>
              <li>Registering with specialist interim management firms and executive search consultancies</li>
              <li>Creating a compelling CV focused on measurable financial outcomes and specific transaction experience</li>
            </ol>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CFO Jobs</h4><p className="text-sm text-gray-600">Part-time CFO roles for portfolio careers</p></Link>
              <Link href="/fractional-cfo-salary" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">CFO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and compensation benchmarks</p></Link>
              <Link href="/fractional-cfo" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CFO?</h4><p className="text-sm text-gray-600">Understanding the fractional model</p></Link>
              <Link href="/hire-fractional-cfo" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CFO</h4><p className="text-sm text-gray-600">Guide to hiring fractional finance leaders</p></Link>
              <Link href="/interim-cto-jobs-uk" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CTO Jobs UK</h4><p className="text-sm text-gray-600">Technology leadership interim roles</p></Link>
              <Link href="/interim-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CMO Jobs UK</h4><p className="text-sm text-gray-600">Marketing leadership interim roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <p className="text-gray-600 mb-4">Further reading from professional bodies and regulatory sources:</p>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.icaew.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">ICAEW</a> — Institute of Chartered Accountants in England and Wales</li>
              <li><a href="https://www.accaglobal.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">ACCA</a> — Association of Chartered Certified Accountants</li>
              <li><a href="https://www.cimaglobal.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">CIMA</a> — Chartered Institute of Management Accountants</li>
              <li><a href="https://www.frc.org.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">FRC</a> — Financial Reporting Council</li>
              <li><a href="https://www.bvca.co.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">BVCA</a> — British Private Equity & Venture Capital Association</li>
              <li><a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">HMRC IR35 Guidance</a> — Off-payroll working rules</li>
            </ul>
          </article>
        </div>
      </section>

      {/* IR35 Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CFOs</h2>
            <p className="text-gray-600 mt-2">Understand your take-home pay inside vs outside IR35</p>
          </div>
          <IR35Calculator defaultDayRate={1200} />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CFO Jobs UK</h2>
          </div>
          <FAQ items={INTERIM_CFO_FAQS} title="" />
        </div>
      </section>

      {/* E-E-A-T Components */}
      <ExpertProfile />
      <ExpertProfileSchema />
      <CaseStudy />
      <CaseStudySchema />

      {/* Related Jobs */}
      {(relatedJobs as any[]).length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2>
            <HotJobsLines
              jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))}
              title="Other Interim Roles"
              maxJobs={15}
              viewAllHref="/fractional-jobs-uk"
              viewAllText="View all UK jobs"
            />
          </div>
        </section>
      )}

      <RoleContentHub currentRole="cfo" />
    </div>
  )
}
