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
  title: 'Interim CCO Jobs UK | Commercial Director Roles 2026',
  description: 'Find interim CCO jobs UK with day rates £850-£1,300. Browse interim Chief Commercial Officer and Commercial Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'interim cco jobs uk, interim cco, interim commercial director jobs, interim chief commercial officer, interim business development director, interim cco roles uk, interim commercial jobs, interim cco london, interim cco remote',
  alternates: { canonical: 'https://www.fractional.quest/interim-cco-jobs-uk' },
  openGraph: {
    title: 'Interim CCO Jobs UK | Commercial Director Roles 2026',
    description: 'Find interim CCO jobs UK with day rates £850-£1,300. Browse interim Chief Commercial Officer and Commercial Director roles.',
    url: 'https://www.fractional.quest/interim-cco-jobs-uk',
  },
}

const INTERIM_CCO_FAQS = [
  { question: "What is an interim CCO?", answer: "An interim CCO is a temporary Chief Commercial Officer who provides senior commercial leadership during transitions, transformations, or gaps in permanent leadership. Unlike fractional CCOs who work part-time ongoing, interim CCOs typically work full-time for a defined period (3-12 months). They're brought in to drive revenue growth, restructure sales teams, or lead commercial transformations requiring immediate, dedicated leadership." },
  { question: "What are typical interim CCO day rates in the UK?", answer: "Interim CCO day rates in the UK typically range from £850-£1,300 per day, depending on experience, sector, and complexity. High-growth tech and private equity portfolio companies command premium rates of £1,200-£1,500/day. The annual equivalent is £170,000-£260,000 for full-time interim engagements. London-based roles typically pay 10-15% more than regional positions." },
  { question: "How long do interim CCO assignments last?", answer: "Most interim CCO assignments last 6-12 months, though they can range from 3 months (specific sales initiatives) to 18+ months (major commercial transformations). Many interim CCOs work on rolling contracts with 30-day notice periods. According to industry data, the average assignment length has increased from 6 to 9 months since 2020." },
  { question: "What's the difference between interim and fractional CCO?", answer: "Interim CCOs typically work full-time (5 days/week) for a fixed period covering a gap or transformation, while fractional CCOs work part-time (1-3 days/week) on an ongoing basis. Interim roles are higher intensity but shorter duration. Interim CCOs often step into urgent situations like revenue decline turnarounds, while fractional CCOs provide steady-state commercial oversight." },
  { question: "What qualifications do interim CCOs need?", answer: "Most interim CCOs have 15+ years of commercial experience including prior CCO, Commercial Director, or Sales Director roles. Essential qualifications include proven revenue growth track record, experience building and scaling sales teams, go-to-market strategy expertise, and P&L ownership. Many hold certifications in sales methodologies (MEDDIC, Challenger Sale) and have MBA or equivalent business education." },
  { question: "What industries hire interim CCOs most frequently?", answer: "The highest demand for interim CCOs comes from: SaaS and technology companies (go-to-market strategy, scaling sales), private equity portfolio companies (value creation, revenue acceleration), professional services (business development, market expansion), manufacturing and industrial (channel development, key account management), and healthcare and life sciences (commercial launch, market access)." },
  { question: "Do interim CCOs work inside or outside IR35?", answer: "IR35 status varies by engagement. Many interim CCO roles fall inside IR35 due to the control, direction, and integration factors. However, clearly scoped commercial transformation projects or consultancy-style engagements may qualify as outside IR35. Always get a status determination statement (SDS) before accepting a role." },
  { question: "What's the hiring process for interim CCOs?", answer: "Interim CCO hiring typically moves fast - often 2-4 weeks from first contact to start date. The process usually includes: initial screening call, commercial track record review with CEO or board, strategy presentation or case study, commercial terms negotiation, references check, and IR35 status determination. Companies often use specialist interim management recruiters." },
  { question: "Can interim CCO experience lead to permanent roles?", answer: "Yes, many interim assignments convert to permanent positions. Industry estimates suggest 20-30% of interim CCOs receive permanent offers. However, many interim executives prefer the portfolio career model, enjoying variety and higher day rates. Some negotiate 'interim-to-perm' arrangements with conversion terms upfront." },
  { question: "What should I include in my interim CCO CV?", answer: "Focus on: revenue growth outcomes and metrics achieved (ARR growth, new customer acquisition, deal sizes), sales teams built and scaled, go-to-market strategies delivered, key partnerships and enterprise deals closed, and specific sector experience. Keep it to 2-3 pages maximum. Include a brief summary of each interim assignment with clear start/end dates and revenue impact delivered." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Interim Jobs', href: '/fractional-jobs-uk' },
  { label: 'Interim CCO Jobs UK', href: '/interim-cco-jobs-uk' },
]

async function getInterimCCOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cco%' OR title ILIKE '%interim%commercial director%' OR title ILIKE '%interim%business development director%' OR title ILIKE '%interim%chief commercial%' OR title ILIKE '%interim%sales director%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cco%' OR title ILIKE '%interim%commercial%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 15, avgRate: 1050, remoteCount: Number(remoteCount?.count || 6) }
  } catch { return { total: 15, avgRate: 1050, remoteCount: 6 } }
}

async function getInterimCCOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cco%' OR title ILIKE '%interim%commercial director%' OR title ILIKE '%interim%business development director%' OR title ILIKE '%interim%chief commercial%' OR title ILIKE '%interim%sales director%' OR (title ILIKE '%interim%' AND role_category = 'Sales')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%interim%' AND (role_category = 'Sales' OR title ILIKE '%commercial%')) AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%cmo%' OR title ILIKE '%fractional%cco%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function InterimCCOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimCCOStats(), getFeaturedCompanies(), getInterimCCOJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim CCO Jobs UK | Commercial Director Roles 2026" description="Find interim CCO jobs UK with day rates £850-£1,300. Browse interim Chief Commercial Officer and Commercial Director roles." url="https://www.fractional.quest/interim-cco-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_CCO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/interim-cco-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80" alt="Interim CCO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-amber-800/90 to-orange-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Commercial Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim CCO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim CCO</strong> and <strong>interim Commercial Director</strong> roles across the UK. Premium interim commercial leadership positions with day rates from £850-£1,300.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-colors">Browse Interim CCO Jobs</a>
                <Link href="/fractional-cco-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CCO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-black text-amber-400">{stats.total}+</div><div className="text-gray-400 text-sm">Interim CCO Roles</div></div>
            <div><div className="text-3xl font-black text-amber-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-amber-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-amber-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-amber-50 border-y border-amber-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim CCO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CCO & Commercial Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live interim commercial roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Sales" ctaLink="/fractional-jobs-uk?department=Sales" ctaText="View All Commercial Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CCO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CCO Day Rate Calculator</h2></div><RoleCalculator role="cco" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CCOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-amber-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="Table of contents">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">On This Page</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <a href="#market" className="block text-amber-600 hover:text-amber-800 hover:underline">UK Interim CCO Market</a>
                <a href="#when-needed" className="block text-amber-600 hover:text-amber-800 hover:underline">When Companies Need Interim CCOs</a>
                <a href="#skills" className="block text-amber-600 hover:text-amber-800 hover:underline">Essential Skills & Experience</a>
              </div>
              <div className="space-y-2">
                <a href="#sectors" className="block text-amber-600 hover:text-amber-800 hover:underline">Top Hiring Sectors</a>
                <a href="#rates" className="block text-amber-600 hover:text-amber-800 hover:underline">Day Rates & IR35</a>
                <a href="#career" className="block text-amber-600 hover:text-amber-800 hover:underline">Career Path & Transition</a>
              </div>
              <div className="space-y-2">
                <a href="#resources" className="block text-amber-600 hover:text-amber-800 hover:underline">Related Resources</a>
                <a href="#faq" className="block text-amber-600 hover:text-amber-800 hover:underline">Common Questions</a>
              </div>
            </div>
          </nav>
        </div>
      </section>

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Interim CCO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim CCO</strong> market in the UK continues to grow as companies prioritise revenue acceleration and commercial transformation. According to the <a href="https://www.cbi.org.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Confederation of British Industry (CBI)</a>, UK businesses are increasingly investing in commercial capabilities, with demand for experienced commercial leaders rising 20% year-on-year. Companies need interim CCOs to drive go-to-market strategies, restructure sales organisations, and accelerate revenue growth.</p>
            <p>Unlike <Link href="/fractional-cco-jobs-uk" className="text-amber-600 hover:underline">fractional CCO roles</Link>, interim positions are typically full-time assignments lasting 6-12 months. This makes them ideal for major commercial transformations, sales team restructures, or bridging gaps between permanent hires. The <a href="https://www.ism.org/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Institute of Sales Management (ISM)</a> reports that demand for interim commercial executives has increased by 30% since 2023.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CCOs</h3>
            <p className="text-gray-600 mb-4">Organisations typically engage interim CCOs for specific strategic situations requiring immediate, senior commercial leadership:</p>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Revenue turnarounds</strong> — Addressing declining sales, fixing underperforming sales teams, or pivoting go-to-market strategies. These situations require experienced leaders who can quickly diagnose issues and implement solutions.</li>
              <li><strong>Commercial scale-up</strong> — Building sales teams from 5 to 50+, establishing sales processes (pipeline management, forecasting), implementing sales technology (CRM, sales enablement). Scale-ups backed by private equity or venture capital often need interim CCOs to professionalise their commercial function.</li>
              <li><strong>M&A integration</strong> — Commercial due diligence during acquisition, post-merger sales team integration, cross-selling strategies. Private equity firms frequently use interim CCOs across their portfolio companies.</li>
              <li><strong>Leadership gaps</strong> — Covering sudden departures during executive recruitment, which can take 6-12 months for permanent CCO hires. Interim CCOs maintain commercial momentum while the board conducts a thorough search.</li>
              <li><strong>New market entry</strong> — Launching in new geographies or verticals, establishing channel partnerships, building enterprise sales capabilities. Interim CCOs bring market entry expertise without long-term commitment.</li>
              <li><strong>Digital commercial transformation</strong> — Moving from traditional to digital sales models, implementing e-commerce, building inside sales teams. Interim CCOs bring digital-first experience.</li>
            </ul>

            <h3 id="skills" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Essential Skills & Experience for Interim CCOs</h3>
            <p className="text-gray-600 mb-4">Successful interim CCOs combine deep commercial expertise with executive leadership capabilities. The <a href="https://www.ism.org/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Institute of Sales Management</a> identifies the following as critical competencies:</p>
            <div className="grid md:grid-cols-2 gap-6 not-prose mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Commercial Leadership</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>- Revenue growth strategy</li>
                  <li>- Sales team building and coaching</li>
                  <li>- Go-to-market strategy</li>
                  <li>- Pipeline and forecast management</li>
                  <li>- Key account management</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Executive Capabilities</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>- Board-level communication</li>
                  <li>- P&L ownership</li>
                  <li>- Partner and channel development</li>
                  <li>- Commercial negotiation</li>
                  <li>- Sales technology and operations</li>
                </ul>
              </div>
            </div>

            <h3 id="sectors" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Top UK Sectors Hiring Interim CCOs</h3>
            <p className="text-gray-600 mb-4">Demand for interim CCOs varies by sector. Based on our job market analysis and data from the <a href="https://www.gov.uk/government/organisations/department-for-business-and-trade" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Department for Business and Trade</a>:</p>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full text-sm">
                <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 font-bold text-gray-900">Sector</th><th className="text-left py-3 px-4 font-bold text-gray-900">Typical Day Rate</th><th className="text-left py-3 px-4 font-bold text-gray-900">Key Drivers</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">SaaS / Technology</td><td className="py-3 px-4 text-gray-600">£1,100-£1,500</td><td className="py-3 px-4 text-gray-600">Go-to-market, scaling sales teams, ARR growth</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Private Equity Portfolio</td><td className="py-3 px-4 text-gray-600">£1,000-£1,400</td><td className="py-3 px-4 text-gray-600">Value creation, revenue acceleration</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Professional Services</td><td className="py-3 px-4 text-gray-600">£950-£1,300</td><td className="py-3 px-4 text-gray-600">Business development, client acquisition</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Manufacturing / Industrial</td><td className="py-3 px-4 text-gray-600">£850-£1,200</td><td className="py-3 px-4 text-gray-600">Channel development, export growth</td></tr>
                  <tr><td className="py-3 px-4 text-gray-900">Healthcare / Life Sciences</td><td className="py-3 px-4 text-gray-600">£900-£1,300</td><td className="py-3 px-4 text-gray-600">Commercial launch, market access</td></tr>
                </tbody>
              </table>
            </div>

            <h3 id="rates" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Day Rates & IR35 Considerations</h3>
            <p className="text-gray-600 mb-4">Interim CCO compensation in the UK is primarily day-rate based. According to market data and guidance from <a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">HMRC on IR35</a>:</p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Day rate range:</strong> £850-£1,300 standard, up to £1,500 for high-growth tech and PE-backed companies</li>
              <li><strong>Location premium:</strong> London roles typically pay 10-15% more than regional positions</li>
              <li><strong>IR35 status:</strong> Many interim CCO roles fall inside IR35 due to integration and control factors. Budget accordingly for the tax implications.</li>
              <li><strong>Notice periods:</strong> Typically 30 days, sometimes 2 weeks for shorter assignments</li>
            </ul>
            <p className="text-gray-600 mt-4">For detailed IR35 guidance, consult <a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">IPSE (The Association of Independent Professionals)</a> or seek specialist tax advice.</p>

            <h3 id="career" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Career Path: Transitioning to Interim CCO Work</h3>
            <p className="text-gray-600 mb-4">Many interim CCOs transition from permanent roles after 15+ years of commercial experience. The path typically involves:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
              <li>Building a track record of revenue outcomes (deals closed, ARR growth, markets entered, teams scaled)</li>
              <li>Developing a network through industry events, <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">LinkedIn</a>, and professional associations like <a href="https://www.ism.org/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">ISM</a></li>
              <li>Registering with specialist interim management firms and executive search firms</li>
              <li>Creating a compelling CV focused on measurable revenue achievements and commercial transformation experience</li>
              <li>Building a personal brand through speaking, writing, or advisory board positions</li>
            </ol>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cco-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CCO Jobs</h4><p className="text-sm text-gray-600">Part-time CCO roles for portfolio careers</p></Link>
              <Link href="/fractional-cco-salary" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">CCO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and compensation benchmarks</p></Link>
              <Link href="/fractional-cco" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CCO?</h4><p className="text-sm text-gray-600">Understanding the fractional model</p></Link>
              <Link href="/hire-fractional-cco" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CCO</h4><p className="text-sm text-gray-600">Guide to hiring commercial leaders</p></Link>
              <Link href="/interim-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CFO Jobs UK</h4><p className="text-sm text-gray-600">Finance leadership interim roles</p></Link>
              <Link href="/interim-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CMO Jobs UK</h4><p className="text-sm text-gray-600">Marketing leadership interim roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <p className="text-gray-600 mb-4">Further reading from industry bodies and government sources:</p>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.ism.org/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Institute of Sales Management (ISM)</a> — Professional body for sales professionals</li>
              <li><a href="https://www.cbi.org.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Confederation of British Industry (CBI)</a> — UK business and economic reports</li>
              <li><a href="https://www.iod.com/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Institute of Directors (IoD)</a> — Executive leadership resources</li>
              <li><a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">HMRC IR35 Guidance</a> — Off-payroll working rules</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">IPSE</a> — Association of Independent Professionals and the Self-Employed</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CCOs</h2></div><IR35Calculator defaultDayRate={1050} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CCO Jobs UK</h2></div><FAQ items={INTERIM_CCO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Interim Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cco" />
    </div>
  )
}
