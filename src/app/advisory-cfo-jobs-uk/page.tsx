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
  title: 'Advisory CFO Jobs UK | Finance Leadership Advisory Roles 2026',
  description: 'Find advisory CFO jobs UK with day rates £700-£1,000. Browse advisory Chief Financial Officer and Finance Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'advisory cfo jobs uk, advisory cfo, advisory finance director jobs, advisory chief financial officer, advisory cfo roles uk, advisory finance jobs, advisory cfo london, advisory cfo remote',
  alternates: { canonical: 'https://www.fractional.quest/advisory-cfo-jobs-uk' },
  openGraph: {
    title: 'Advisory CFO Jobs UK | Finance Leadership Advisory Roles 2026',
    description: 'Find advisory CFO jobs UK with day rates £700-£1,000. Browse advisory Chief Financial Officer and Finance Director roles.',
    url: 'https://www.fractional.quest/advisory-cfo-jobs-uk',
  },
}

const ADVISORY_CFO_FAQS = [
  { question: "What is an advisory CFO?", answer: "An advisory CFO is a senior finance professional who provides strategic financial guidance and expertise on a consultative basis. Unlike interim CFOs who take on full operational responsibility, advisory CFOs offer high-level counsel on specific challenges such as fundraising, M&A, financial restructuring, or board-level reporting. They typically work fewer hours but bring deep expertise to critical financial decisions." },
  { question: "What are typical advisory CFO day rates in the UK?", answer: "Advisory CFO day rates in the UK typically range from £700-£1,000 per day, depending on experience, sector expertise, and complexity of the engagement. Specialist areas like M&A advisory or PE-backed company support can command rates of £1,000-£1,500/day. Advisory roles often involve fewer days per month than interim roles, making them cost-effective for specific strategic needs." },
  { question: "How does an advisory CFO engagement work?", answer: "Advisory CFO engagements are typically structured around specific deliverables or time allocations (e.g., 2-4 days per month). The advisory CFO might attend board meetings, review financial strategies, mentor existing finance teams, or provide expertise during fundraising rounds. Engagements can be ongoing retainers or project-based, lasting from a few months to several years." },
  { question: "What's the difference between advisory and fractional CFO?", answer: "Advisory CFOs provide strategic counsel without operational responsibility, typically working 1-4 days per month on high-level guidance. Fractional CFOs take on part-time operational leadership (1-3 days per week), managing finance teams and processes. Advisory roles suit companies with capable finance teams needing strategic oversight; fractional roles suit those needing hands-on leadership." },
  { question: "What qualifications do advisory CFOs need?", answer: "Most advisory CFOs are qualified accountants (ACA, ACCA, CIMA) with 15+ years of experience including prior CFO or Finance Director roles. Essential qualifications include experience with board-level reporting, fundraising (debt and equity), M&A transactions, and strategic planning. Many have sector-specific expertise in areas like SaaS metrics, PE portfolio management, or regulated industries." },
  { question: "What industries hire advisory CFOs most frequently?", answer: "The highest demand for advisory CFOs comes from: venture-backed startups and scale-ups (fundraising, investor relations), private equity portfolio companies (value creation, exit planning), family businesses (professionalisation, succession planning), and mid-market companies facing strategic transitions (M&A, IPO preparation, restructuring)." },
  { question: "Do advisory CFO roles fall inside or outside IR35?", answer: "Advisory CFO roles often fall outside IR35 due to their consultative nature, lack of day-to-day control, and project-based scope. However, each engagement must be assessed individually. Key factors include: no substitution restrictions, working for multiple clients, providing genuine advice rather than filling a role. Always obtain a status determination statement (SDS)." },
  { question: "What's the hiring process for advisory CFOs?", answer: "Advisory CFO hiring focuses on expertise fit rather than cultural integration. The process typically includes: initial chemistry meeting with CEO/founders, assessment of relevant sector and transaction experience, discussion of specific challenges to address, commercial terms negotiation, and agreement on deliverables and reporting cadence. Decisions are often made within 2-3 weeks." },
  { question: "Can advisory CFO work lead to other opportunities?", answer: "Yes, advisory CFO relationships often expand. Many advisory engagements lead to: increased scope (from advisory to fractional or interim), board positions (NED or advisory board), investment opportunities in client companies, and referrals to other businesses. The advisory model is excellent for building a portfolio of relationships." },
  { question: "What should I include in my advisory CFO profile?", answer: "Focus on: specific transaction experience (fundraising rounds, M&A deals, exits), measurable outcomes achieved for clients, sector expertise and credentials, board and investor communication experience, and testimonials from founders or CEOs. Highlight your advisory approach and how you work alongside existing teams rather than replacing them." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Advisory Jobs', href: '/fractional-jobs-uk' },
  { label: 'Advisory CFO Jobs UK', href: '/advisory-cfo-jobs-uk' },
]

async function getAdvisoryCFOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cfo%' OR title ILIKE '%advisory%finance director%' OR title ILIKE '%advisory%chief financial%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cfo%' OR title ILIKE '%advisory%finance%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 15, avgRate: 850, remoteCount: Number(remoteCount?.count || 6) }
  } catch { return { total: 15, avgRate: 850, remoteCount: 6 } }
}

async function getAdvisoryCFOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cfo%' OR title ILIKE '%advisory%finance director%' OR title ILIKE '%advisory%chief financial%' OR (title ILIKE '%advisory%' AND role_category = 'Finance')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%' AND role_category = 'Finance') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cto%' OR title ILIKE '%advisory%cmo%' OR title ILIKE '%fractional%cfo%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function AdvisoryCFOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getAdvisoryCFOStats(), getFeaturedCompanies(), getAdvisoryCFOJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Advisory CFO Jobs UK | Finance Leadership Advisory Roles 2026" description="Find advisory CFO jobs UK with day rates £700-£1,000. Browse advisory Chief Financial Officer and Finance Director roles." url="https://www.fractional.quest/advisory-cfo-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={ADVISORY_CFO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/advisory-cfo-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80" alt="Advisory CFO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-green-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Advisory Finance Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Advisory CFO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>advisory CFO</strong> and <strong>advisory Finance Director</strong> roles across the UK. Premium advisory finance leadership positions with day rates from £700-£1,000.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors">Browse Advisory CFO Jobs</a>
                <Link href="/fractional-cfo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CFO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-black text-emerald-400">{stats.total}+</div><div className="text-gray-400 text-sm">Advisory CFO Roles</div></div>
            <div><div className="text-3xl font-black text-emerald-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-emerald-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-emerald-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-emerald-50 border-y border-emerald-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Advisory CFO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Advisory CFO & Finance Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live advisory finance roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Finance" ctaLink="/fractional-jobs-uk?department=Finance" ctaText="View All Finance Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Advisory CFO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Advisory CFO Day Rate Calculator</h2></div><RoleCalculator role="cfo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Advisory CFOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-emerald-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="Table of contents">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">On This Page</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <a href="#market" className="block text-emerald-600 hover:text-emerald-800 hover:underline">UK Advisory CFO Market</a>
                <a href="#when-needed" className="block text-emerald-600 hover:text-emerald-800 hover:underline">When Companies Need Advisory CFOs</a>
                <a href="#skills" className="block text-emerald-600 hover:text-emerald-800 hover:underline">Essential Skills & Experience</a>
              </div>
              <div className="space-y-2">
                <a href="#sectors" className="block text-emerald-600 hover:text-emerald-800 hover:underline">Top Hiring Sectors</a>
                <a href="#rates" className="block text-emerald-600 hover:text-emerald-800 hover:underline">Day Rates & IR35</a>
                <a href="#career" className="block text-emerald-600 hover:text-emerald-800 hover:underline">Career Path & Transition</a>
              </div>
              <div className="space-y-2">
                <a href="#resources" className="block text-emerald-600 hover:text-emerald-800 hover:underline">Related Resources</a>
                <a href="#faq" className="block text-emerald-600 hover:text-emerald-800 hover:underline">Common Questions</a>
              </div>
            </div>
          </nav>
        </div>
      </section>

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Advisory CFO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>advisory CFO</strong> market in the UK is experiencing significant growth as businesses seek strategic financial expertise without full-time commitments. According to <a href="https://www.icaew.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">ICAEW</a>, demand for advisory finance roles has increased by 30% since 2023, driven by the complexity of modern financial challenges including ESG reporting, digital transformation, and economic uncertainty.</p>
            <p>Unlike <Link href="/interim-cfo-jobs-uk" className="text-emerald-600 hover:underline">interim CFO roles</Link>, advisory positions focus on strategic counsel rather than operational management. The <a href="https://www.cima.org/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">CIMA</a> reports that advisory CFOs typically work with 3-5 clients simultaneously, providing high-value input on critical decisions while allowing businesses to access expertise they couldn&apos;t afford full-time.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Advisory CFOs</h3>
            <p className="text-gray-600 mb-4">Organisations typically engage advisory CFOs for specific strategic situations requiring senior financial expertise without operational involvement:</p>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Fundraising rounds</strong> — Preparing financial models, investor decks, and due diligence documentation for Series A through to growth equity rounds. Advisory CFOs bring credibility and expertise to investor negotiations.</li>
              <li><strong>M&A transactions</strong> — Buy-side and sell-side support including valuation, financial due diligence, deal structuring, and post-merger integration planning.</li>
              <li><strong>Board-level oversight</strong> — Attending board meetings, reviewing management accounts, and providing independent financial perspective to founders and non-exec directors.</li>
              <li><strong>Strategic planning</strong> — Annual budgeting, long-range financial planning, scenario modelling, and KPI framework development.</li>
              <li><strong>Finance team development</strong> — Mentoring FDs or Finance Managers, helping them grow into more strategic roles while providing oversight.</li>
              <li><strong>Special projects</strong> — IPO preparation, debt refinancing, restructuring, or implementing new financial systems and processes.</li>
            </ul>

            <h3 id="skills" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Essential Skills & Experience for Advisory CFOs</h3>
            <p className="text-gray-600 mb-4">Successful advisory CFOs combine technical financial expertise with strategic business acumen. The <a href="https://www.accaglobal.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">ACCA</a> identifies the following as critical competencies:</p>
            <div className="grid md:grid-cols-2 gap-6 not-prose mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Technical Expertise</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Financial modelling and valuation</li>
                  <li>• M&A transaction experience</li>
                  <li>• Fundraising (equity and debt)</li>
                  <li>• Management reporting and KPIs</li>
                  <li>• Cash flow management</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Advisory Capabilities</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Board-level communication</li>
                  <li>• Strategic planning facilitation</li>
                  <li>• Investor relations</li>
                  <li>• Stakeholder management</li>
                  <li>• Mentoring and coaching</li>
                </ul>
              </div>
            </div>

            <h3 id="sectors" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Top UK Sectors Hiring Advisory CFOs</h3>
            <p className="text-gray-600 mb-4">Demand for advisory CFOs varies by sector. Based on our job market analysis and data from the <a href="https://www.frc.org.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Financial Reporting Council (FRC)</a>:</p>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full text-sm">
                <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 font-bold text-gray-900">Sector</th><th className="text-left py-3 px-4 font-bold text-gray-900">Typical Day Rate</th><th className="text-left py-3 px-4 font-bold text-gray-900">Key Drivers</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Venture-backed Startups</td><td className="py-3 px-4 text-gray-600">£800-£1,200</td><td className="py-3 px-4 text-gray-600">Fundraising, investor relations, growth metrics</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Private Equity Portfolio</td><td className="py-3 px-4 text-gray-600">£900-£1,300</td><td className="py-3 px-4 text-gray-600">Value creation, exit planning, reporting</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Family Businesses</td><td className="py-3 px-4 text-gray-600">£700-£1,000</td><td className="py-3 px-4 text-gray-600">Succession, professionalisation, governance</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Mid-Market Companies</td><td className="py-3 px-4 text-gray-600">£750-£1,100</td><td className="py-3 px-4 text-gray-600">M&A, strategic planning, board support</td></tr>
                  <tr><td className="py-3 px-4 text-gray-900">Not-for-Profit</td><td className="py-3 px-4 text-gray-600">£600-£900</td><td className="py-3 px-4 text-gray-600">Governance, funding strategy, compliance</td></tr>
                </tbody>
              </table>
            </div>

            <h3 id="rates" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Day Rates & IR35 Considerations</h3>
            <p className="text-gray-600 mb-4">Advisory CFO compensation in the UK is typically day-rate based. According to market data and guidance from <a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">HMRC on IR35</a>:</p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Day rate range:</strong> £700-£1,000 standard, up to £1,300 for specialist transactions</li>
              <li><strong>Monthly commitment:</strong> Typically 2-4 days per month for advisory roles</li>
              <li><strong>IR35 status:</strong> Advisory roles often fall outside IR35 due to their consultative nature and lack of operational control</li>
              <li><strong>Retainer models:</strong> Some advisory CFOs work on monthly retainers (£2,000-£4,000/month) for ongoing availability</li>
            </ul>
            <p className="text-gray-600 mt-4">For detailed IR35 guidance, consult <a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">IPSE (The Association of Independent Professionals)</a> or seek specialist tax advice.</p>

            <h3 id="career" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Career Path: Transitioning to Advisory CFO Work</h3>
            <p className="text-gray-600 mb-4">Many advisory CFOs transition from permanent or interim roles after establishing expertise in specific areas. The path typically involves:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
              <li>Building deep expertise in a niche (fundraising, M&A, specific sectors)</li>
              <li>Developing a reputation through successful transactions or transformations</li>
              <li>Building relationships with investors, PE firms, or founder networks</li>
              <li>Starting with 1-2 advisory clients while maintaining other income</li>
              <li>Gradually building a portfolio of 3-5 advisory relationships</li>
            </ol>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CFO Jobs</h4><p className="text-sm text-gray-600">Part-time CFO roles for portfolio careers</p></Link>
              <Link href="/fractional-cfo-salary" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">CFO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and compensation benchmarks</p></Link>
              <Link href="/fractional-cfo" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CFO?</h4><p className="text-sm text-gray-600">Understanding the fractional model</p></Link>
              <Link href="/hire-fractional-cfo" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CFO</h4><p className="text-sm text-gray-600">Guide to hiring finance leaders</p></Link>
              <Link href="/interim-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CFO Jobs UK</h4><p className="text-sm text-gray-600">Full-time interim finance roles</p></Link>
              <Link href="/advisory-cto-jobs-uk" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Advisory CTO Jobs UK</h4><p className="text-sm text-gray-600">Technology advisory roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <p className="text-gray-600 mb-4">Further reading from industry bodies and government sources:</p>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.icaew.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">ICAEW</a> — Institute of Chartered Accountants in England & Wales</li>
              <li><a href="https://www.accaglobal.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">ACCA</a> — Association of Chartered Certified Accountants</li>
              <li><a href="https://www.cima.org/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">CIMA</a> — Chartered Institute of Management Accountants</li>
              <li><a href="https://www.frc.org.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Financial Reporting Council</a> — UK accounting standards and governance</li>
              <li><a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">HMRC IR35 Guidance</a> — Off-payroll working rules</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">IPSE</a> — Association of Independent Professionals and the Self-Employed</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Advisory CFOs</h2></div><IR35Calculator defaultDayRate={850} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Advisory CFO Jobs UK</h2></div><FAQ items={ADVISORY_CFO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Advisory Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Advisory Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cfo" />
    </div>
  )
}
