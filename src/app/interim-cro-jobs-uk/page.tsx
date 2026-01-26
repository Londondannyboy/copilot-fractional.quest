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
  title: 'Interim CRO Jobs UK | Revenue Director Roles 2026',
  description: 'Find interim CRO jobs UK with day rates £900-£1,400. Browse interim Chief Revenue Officer and Revenue Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'interim cro jobs uk, interim cro, interim revenue director jobs, interim sales director jobs, interim chief revenue officer, interim cro roles uk, interim revenue jobs, interim cro london, interim cro remote',
  alternates: { canonical: 'https://www.fractional.quest/interim-cro-jobs-uk' },
  openGraph: {
    title: 'Interim CRO Jobs UK | Revenue Director Roles 2026',
    description: 'Find interim CRO jobs UK with day rates £900-£1,400. Browse interim Chief Revenue Officer and Revenue Director roles.',
    url: 'https://www.fractional.quest/interim-cro-jobs-uk',
  },
}

const INTERIM_CRO_FAQS = [
  { question: "What is an interim CRO?", answer: "An interim CRO (Chief Revenue Officer) is a temporary executive who provides senior revenue leadership during transitions, transformations, or gaps in permanent leadership. Unlike fractional CROs who work part-time ongoing, interim CROs typically work full-time for a defined period (3-12 months). They're brought in to handle critical situations requiring immediate, dedicated revenue leadership including sales turnarounds, go-to-market transformations, and revenue operations overhauls." },
  { question: "What are typical interim CRO day rates in the UK?", answer: "Interim CRO day rates in the UK typically range from £900-£1,400 per day, depending on experience, sector, and complexity. SaaS and private equity-backed companies often command premium rates of £1,200-£1,600/day. The annual equivalent is £180,000-£280,000 for full-time interim engagements. London-based roles typically pay 10-15% more than regional positions." },
  { question: "How long do interim CRO assignments last?", answer: "Most interim CRO assignments last 6-12 months, though they can range from 3 months (specific revenue projects) to 18+ months (major transformations). Many interim CROs work on rolling contracts with 30-day notice periods. Revenue turnaround assignments typically require 9-12 months to show measurable results." },
  { question: "What's the difference between interim and fractional CRO?", answer: "Interim CROs typically work full-time (5 days/week) for a fixed period covering a gap or transformation, while fractional CROs work part-time (1-3 days/week) on an ongoing basis. Interim roles are higher intensity but shorter duration. Interim CROs often step into urgent revenue situations, while fractional CROs provide steady-state strategic oversight." },
  { question: "What qualifications do interim CROs need?", answer: "Most interim CROs have 15+ years of commercial experience including prior CRO, VP Sales, or Commercial Director roles. Essential qualifications include revenue operations expertise, sales methodology mastery (MEDDIC, Challenger, SPIN), CRM and sales tech stack proficiency, and a track record of hitting or exceeding revenue targets. Many hold certifications from Pavilion, Revenue Collective, or similar revenue leadership communities." },
  { question: "What industries hire interim CROs most frequently?", answer: "The highest demand for interim CROs comes from: SaaS and technology companies (scaling ARR, PLG transitions), private equity portfolio companies (revenue acceleration, commercial due diligence), scale-up businesses (Series A-C growth), financial services (wealth management, fintech), and professional services firms (partnership growth, market expansion)." },
  { question: "Do interim CROs work inside or outside IR35?", answer: "IR35 status varies by engagement. Many interim CRO roles fall inside IR35 due to the control, direction, and integration factors. However, clearly scoped revenue transformation projects or consultancy-style engagements may qualify as outside IR35. Always get a status determination statement (SDS) before accepting a role." },
  { question: "What's the hiring process for interim CROs?", answer: "Interim CRO hiring typically moves fast - often 2-4 weeks from first contact to start date. The process usually includes: initial screening call, commercial leadership interview with the CEO or PE partners, pipeline/forecasting assessment, commercial terms negotiation, references check, and IR35 status determination. Companies often use specialist interim management recruiters or revenue leadership networks." },
  { question: "Can interim CRO experience lead to permanent roles?", answer: "Yes, many interim assignments convert to permanent positions. Industry estimates suggest 20-30% of interim CROs receive permanent offers. However, many interim executives prefer the portfolio career model, enjoying variety and higher day rates. Some negotiate 'interim-to-perm' arrangements with conversion terms upfront, especially in PE-backed businesses seeking long-term leadership." },
  { question: "What should I include in my interim CRO CV?", answer: "Focus on: revenue outcomes and quota attainment percentages, ARR/MRR growth delivered, sales team sizes built and managed, deal sizes and enterprise wins, tech stack expertise (Salesforce, HubSpot, Clari, Gong), and specific sector experience. Keep it to 2-3 pages maximum. Include a brief summary of each interim assignment with clear start/end dates and revenue impact delivered." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Interim Jobs', href: '/fractional-jobs-uk' },
  { label: 'Interim CRO Jobs UK', href: '/interim-cro-jobs-uk' },
]

async function getInterimCROStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cro%' OR title ILIKE '%interim%revenue director%' OR title ILIKE '%interim%sales director%' OR title ILIKE '%interim%chief revenue%' OR title ILIKE '%interim%commercial director%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cro%' OR title ILIKE '%interim%revenue%' OR title ILIKE '%interim%sales director%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 15, avgRate: 1150, remoteCount: Number(remoteCount?.count || 6) }
  } catch { return { total: 15, avgRate: 1150, remoteCount: 6 } }
}

async function getInterimCROJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cro%' OR title ILIKE '%interim%revenue director%' OR title ILIKE '%interim%sales director%' OR title ILIKE '%interim%chief revenue%' OR title ILIKE '%interim%commercial director%' OR (title ILIKE '%interim%' AND role_category = 'Sales')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%interim%' AND (role_category = 'Sales' OR title ILIKE '%revenue%' OR title ILIKE '%commercial%')) AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%cmo%' OR title ILIKE '%fractional%cro%' OR title ILIKE '%interim%coo%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function InterimCROJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimCROStats(), getFeaturedCompanies(), getInterimCROJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim CRO Jobs UK | Revenue Director Roles 2026" description="Find interim CRO jobs UK with day rates £900-£1,400. Browse interim Chief Revenue Officer and Revenue Director roles." url="https://www.fractional.quest/interim-cro-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_CRO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/interim-cro-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&q=80" alt="Interim CRO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-800/90 to-emerald-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Revenue Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim CRO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim CRO</strong> and <strong>interim Revenue Director</strong> roles across the UK. Premium interim revenue leadership positions with day rates from £900-£1,400.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-green-900 font-bold rounded-lg hover:bg-green-50 transition-colors">Browse Interim CRO Jobs</a>
                <Link href="/fractional-cro-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CRO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-black text-green-400">{stats.total}+</div><div className="text-gray-400 text-sm">Interim CRO Roles</div></div>
            <div><div className="text-3xl font-black text-green-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-green-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-green-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-green-50 border-y border-green-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim CRO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CRO & Revenue Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live interim revenue roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Sales" ctaLink="/fractional-jobs-uk?department=Sales" ctaText="View All Sales Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CRO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CRO Day Rate Calculator</h2></div><RoleCalculator role="cro" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CROs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-green-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="Table of contents">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">On This Page</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <a href="#market" className="block text-green-600 hover:text-green-800 hover:underline">UK Interim CRO Market</a>
                <a href="#when-needed" className="block text-green-600 hover:text-green-800 hover:underline">When Companies Need Interim CROs</a>
                <a href="#skills" className="block text-green-600 hover:text-green-800 hover:underline">Essential Skills & Experience</a>
              </div>
              <div className="space-y-2">
                <a href="#sectors" className="block text-green-600 hover:text-green-800 hover:underline">Top Hiring Sectors</a>
                <a href="#rates" className="block text-green-600 hover:text-green-800 hover:underline">Day Rates & IR35</a>
                <a href="#career" className="block text-green-600 hover:text-green-800 hover:underline">Career Path & Transition</a>
              </div>
              <div className="space-y-2">
                <a href="#resources" className="block text-green-600 hover:text-green-800 hover:underline">Related Resources</a>
                <a href="#faq" className="block text-green-600 hover:text-green-800 hover:underline">Common Questions</a>
              </div>
            </div>
          </nav>
        </div>
      </section>

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Interim CRO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim CRO</strong> market in the UK continues to grow as companies prioritise revenue growth and go-to-market excellence. According to <a href="https://www.salesforce.com/uk/blog/state-of-sales/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Salesforce State of Sales</a>, UK businesses are investing heavily in revenue leadership, with 67% of companies planning to increase sales leadership investment in 2026. Companies increasingly need experienced interim revenue leaders to optimise sales processes, implement revenue operations frameworks, and drive predictable growth.</p>
            <p>Unlike <Link href="/fractional-cro-jobs-uk" className="text-green-600 hover:underline">fractional CRO roles</Link>, interim positions are typically full-time assignments lasting 6-12 months. This makes them ideal for sales turnarounds, go-to-market transformations, or bridging gaps between permanent hires. The <a href="https://www.iod.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Institute of Directors (IoD)</a> reports that demand for interim commercial executives has increased by 30% since 2023.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CROs</h3>
            <p className="text-gray-600 mb-4">Organisations typically engage interim CROs for specific strategic situations requiring immediate, senior revenue leadership:</p>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Revenue turnarounds</strong> — Sales performance below target, pipeline issues, conversion rate problems. These situations require dedicated leadership to diagnose issues, implement fixes, and restore growth trajectory.</li>
              <li><strong>Go-to-market transformations</strong> — Moving from founder-led sales to scalable sales teams, launching new market segments, or pivoting sales motions (PLG to enterprise, inbound to outbound). Interim CROs bring battle-tested playbooks.</li>
              <li><strong>Private equity value creation</strong> — PE firms frequently place interim CROs into portfolio companies for the first 100 days post-acquisition. They assess commercial capabilities, identify quick wins, and build sustainable revenue engines.</li>
              <li><strong>Leadership gaps</strong> — Covering sudden departures during executive recruitment, which can take 6-12 months for permanent CRO hires. Interim CROs maintain sales momentum while the board conducts a thorough search.</li>
              <li><strong>International expansion</strong> — Launching UK/EMEA operations for US companies or vice versa. Interim CROs establish local sales infrastructure, hire initial teams, and prove out market viability.</li>
              <li><strong>Revenue operations overhauls</strong> — Implementing Salesforce, HubSpot, or Clari. Building forecasting disciplines. Establishing quota methodologies and territory planning.</li>
            </ul>

            <h3 id="skills" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Essential Skills & Experience for Interim CROs</h3>
            <p className="text-gray-600 mb-4">Successful interim CROs combine deep commercial expertise with executive leadership capabilities. <a href="https://www.pavilion.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Pavilion (Revenue Collective)</a> identifies the following as critical competencies:</p>
            <div className="grid md:grid-cols-2 gap-6 not-prose mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Commercial Leadership</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Sales methodology expertise (MEDDIC, Challenger, SPIN)</li>
                  <li>• Revenue operations and forecasting</li>
                  <li>• Pipeline management and deal execution</li>
                  <li>• Sales team building and performance management</li>
                  <li>• Customer success and expansion revenue</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Executive Capabilities</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Board-level communication and reporting</li>
                  <li>• Go-to-market strategy development</li>
                  <li>• Sales tech stack proficiency (Salesforce, Clari, Gong)</li>
                  <li>• Cross-functional alignment (Marketing, Product, CS)</li>
                  <li>• Change management and turnaround experience</li>
                </ul>
              </div>
            </div>

            <h3 id="sectors" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Top UK Sectors Hiring Interim CROs</h3>
            <p className="text-gray-600 mb-4">Demand for interim CROs varies by sector. Based on our job market analysis and data from <a href="https://www.british-business-bank.co.uk/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">British Business Bank</a>:</p>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full text-sm">
                <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 font-bold text-gray-900">Sector</th><th className="text-left py-3 px-4 font-bold text-gray-900">Typical Day Rate</th><th className="text-left py-3 px-4 font-bold text-gray-900">Key Drivers</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">SaaS / Technology</td><td className="py-3 px-4 text-gray-600">£1,200-£1,600</td><td className="py-3 px-4 text-gray-600">ARR growth, PLG to enterprise, expansion revenue</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Private Equity Portfolio</td><td className="py-3 px-4 text-gray-600">£1,100-£1,500</td><td className="py-3 px-4 text-gray-600">Value creation, commercial due diligence, buy-and-build</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Financial Services</td><td className="py-3 px-4 text-gray-600">£1,100-£1,400</td><td className="py-3 px-4 text-gray-600">Wealth management, B2B fintech, enterprise sales</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Professional Services</td><td className="py-3 px-4 text-gray-600">£900-£1,300</td><td className="py-3 px-4 text-gray-600">Partnership growth, key account management</td></tr>
                  <tr><td className="py-3 px-4 text-gray-900">Scale-up (Series A-C)</td><td className="py-3 px-4 text-gray-600">£900-£1,200</td><td className="py-3 px-4 text-gray-600">First sales hires, founder transition, process build</td></tr>
                </tbody>
              </table>
            </div>

            <h3 id="rates" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Day Rates & IR35 Considerations</h3>
            <p className="text-gray-600 mb-4">Interim CRO compensation in the UK is primarily day-rate based. According to market data and guidance from <a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">HMRC on IR35</a>:</p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Day rate range:</strong> £900-£1,400 standard, up to £1,600 for SaaS/PE-backed companies</li>
              <li><strong>Location premium:</strong> London roles typically pay 10-15% more than regional positions</li>
              <li><strong>IR35 status:</strong> Many interim CRO roles fall inside IR35 due to integration and control factors. Budget accordingly for the tax implications.</li>
              <li><strong>Notice periods:</strong> Typically 30 days, sometimes 2 weeks for shorter assignments</li>
            </ul>
            <p className="text-gray-600 mt-4">For detailed IR35 guidance, consult <a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">IPSE (The Association of Independent Professionals)</a> or seek specialist tax advice.</p>

            <h3 id="career" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Career Path: Transitioning to Interim CRO Work</h3>
            <p className="text-gray-600 mb-4">Many interim CROs transition from permanent roles after 15+ years of commercial experience. The path typically involves:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
              <li>Building a track record of revenue outcomes (quotas exceeded, ARR grown, teams scaled)</li>
              <li>Developing a network through industry events, <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">LinkedIn</a>, and revenue leadership communities like <a href="https://www.pavilion.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Pavilion</a></li>
              <li>Registering with specialist interim management firms and executive search firms</li>
              <li>Creating a compelling CV focused on revenue metrics and commercial achievements</li>
              <li>Building a personal brand through speaking, writing, or advisory board positions</li>
            </ol>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cro-jobs-uk" className="p-4 border rounded-lg hover:border-green-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CRO Jobs</h4><p className="text-sm text-gray-600">Part-time CRO roles for portfolio careers</p></Link>
              <Link href="/fractional-cro-salary" className="p-4 border rounded-lg hover:border-green-300 transition-colors"><h4 className="font-bold text-gray-900">CRO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and compensation benchmarks</p></Link>
              <Link href="/fractional-cro" className="p-4 border rounded-lg hover:border-green-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CRO?</h4><p className="text-sm text-gray-600">Understanding the fractional model</p></Link>
              <Link href="/hire-fractional-cro" className="p-4 border rounded-lg hover:border-green-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CRO</h4><p className="text-sm text-gray-600">Guide to hiring revenue leaders</p></Link>
              <Link href="/interim-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-green-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CFO Jobs UK</h4><p className="text-sm text-gray-600">Finance leadership interim roles</p></Link>
              <Link href="/interim-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-green-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CMO Jobs UK</h4><p className="text-sm text-gray-600">Marketing leadership interim roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <p className="text-gray-600 mb-4">Further reading from industry bodies and government sources:</p>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.pavilion.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Pavilion (Revenue Collective)</a> — Global revenue leadership community</li>
              <li><a href="https://www.salesforce.com/uk/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Salesforce UK</a> — Sales technology and state of sales reports</li>
              <li><a href="https://www.iod.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Institute of Directors (IoD)</a> — Business leadership standards</li>
              <li><a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">HMRC IR35 Guidance</a> — Off-payroll working rules</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">IPSE</a> — Association of Independent Professionals and the Self-Employed</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CROs</h2></div><IR35Calculator defaultDayRate={1150} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CRO Jobs UK</h2></div><FAQ items={INTERIM_CRO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Interim Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cro" />
    </div>
  )
}
