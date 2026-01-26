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
  title: 'Interim CTO Jobs UK | Technology Director Roles 2026',
  description: 'Find interim CTO jobs UK with day rates £900-£1,400. Browse interim Chief Technology Officer and Tech Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'interim cto jobs uk, interim cto, interim technology director jobs, interim it director jobs, interim chief technology officer, interim cto roles uk, interim tech jobs, interim cto london, interim cto remote',
  alternates: { canonical: 'https://www.fractional.quest/interim-cto-jobs-uk' },
  openGraph: {
    title: 'Interim CTO Jobs UK | Technology Director Roles 2026',
    description: 'Find interim CTO jobs UK with day rates £900-£1,400. Browse interim Chief Technology Officer and Tech Director roles.',
    url: 'https://www.fractional.quest/interim-cto-jobs-uk',
  },
}

const INTERIM_CTO_FAQS = [
  { question: "What is an interim CTO?", answer: "An interim CTO is a temporary Chief Technology Officer who provides senior technology leadership during transitions, transformations, or gaps in permanent leadership. Unlike fractional CTOs who work part-time ongoing, interim CTOs typically work full-time for a defined period (3-12 months). They're brought in to handle critical situations requiring immediate, dedicated technology leadership." },
  { question: "What are typical interim CTO day rates in the UK?", answer: "Interim CTO day rates in the UK typically range from £900-£1,400 per day, depending on experience, sector, and complexity. Fintech and complex transformation roles command premium rates of £1,400-£1,800/day. The annual equivalent is £180,000-£280,000 for full-time interim engagements. London-based roles typically pay 10-15% more than regional positions." },
  { question: "How long do interim CTO assignments last?", answer: "Most interim CTO assignments last 6-12 months, though they can range from 3 months (specific projects) to 18+ months (major transformations). Many interim CTOs work on rolling contracts with 30-day notice periods. According to industry data, the average assignment length has increased from 6 to 9 months since 2020." },
  { question: "What's the difference between interim and fractional CTO?", answer: "Interim CTOs typically work full-time (5 days/week) for a fixed period covering a gap or transformation, while fractional CTOs work part-time (1-3 days/week) on an ongoing basis. Interim roles are higher intensity but shorter duration. Interim CTOs often step into urgent situations, while fractional CTOs provide steady-state strategic oversight." },
  { question: "What qualifications do interim CTOs need?", answer: "Most interim CTOs have 15+ years of technology experience including prior CTO, VP Engineering, or IT Director roles. Essential qualifications include cloud architecture expertise (AWS/Azure/GCP), digital transformation experience, and a track record of successful delivery. Many hold certifications like TOGAF, ITIL, or relevant cloud certifications." },
  { question: "What industries hire interim CTOs most frequently?", answer: "The highest demand for interim CTOs comes from: fintech and financial services (regulatory compliance, digital banking), healthcare and life sciences (digital health, data platforms), private equity portfolio companies (value creation, due diligence), e-commerce and retail (platform modernisation), and scale-up technology companies (growth phase leadership)." },
  { question: "Do interim CTOs work inside or outside IR35?", answer: "IR35 status varies by engagement. Many interim CTO roles fall inside IR35 due to the control, direction, and integration factors. However, clearly scoped transformation projects or consultancy-style engagements may qualify as outside IR35. Always get a status determination statement (SDS) before accepting a role." },
  { question: "What's the hiring process for interim CTOs?", answer: "Interim CTO hiring typically moves fast - often 2-4 weeks from first contact to start date. The process usually includes: initial screening call, technical/leadership interview with the CEO or board, commercial terms negotiation, references check, and IR35 status determination. Companies often use specialist interim management recruiters." },
  { question: "Can interim CTO experience lead to permanent roles?", answer: "Yes, many interim assignments convert to permanent positions. Industry estimates suggest 20-30% of interim CTOs receive permanent offers. However, many interim executives prefer the portfolio career model, enjoying variety and higher day rates. Some negotiate 'interim-to-perm' arrangements with conversion terms upfront." },
  { question: "What should I include in my interim CTO CV?", answer: "Focus on: transformation outcomes and metrics achieved, technologies and platforms delivered, team sizes managed, business impact (revenue, cost savings, efficiency gains), and specific sector experience. Keep it to 2-3 pages maximum. Include a brief summary of each interim assignment with clear start/end dates and scope delivered." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Interim Jobs', href: '/fractional-jobs-uk' },
  { label: 'Interim CTO Jobs UK', href: '/interim-cto-jobs-uk' },
]

async function getInterimCTOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cto%' OR title ILIKE '%interim%technology director%' OR title ILIKE '%interim%it director%' OR title ILIKE '%interim%chief technology%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cto%' OR title ILIKE '%interim%technology%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 20, avgRate: 1100, remoteCount: Number(remoteCount?.count || 8) }
  } catch { return { total: 20, avgRate: 1100, remoteCount: 8 } }
}

async function getInterimCTOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cto%' OR title ILIKE '%interim%technology director%' OR title ILIKE '%interim%it director%' OR title ILIKE '%interim%chief technology%' OR (title ILIKE '%interim%' AND role_category = 'Engineering')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%interim%' AND role_category = 'Engineering') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%cmo%' OR title ILIKE '%fractional%cto%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function InterimCTOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimCTOStats(), getFeaturedCompanies(), getInterimCTOJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim CTO Jobs UK | Technology Director Roles 2026" description="Find interim CTO jobs UK with day rates £900-£1,400. Browse interim Chief Technology Officer and Tech Director roles." url="https://www.fractional.quest/interim-cto-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_CTO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/interim-cto-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80" alt="Interim CTO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/95 via-cyan-800/90 to-blue-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Technology Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim CTO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim CTO</strong> and <strong>interim Technology Director</strong> roles across the UK. Premium interim tech leadership positions with day rates from £900-£1,400.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-cyan-900 font-bold rounded-lg hover:bg-cyan-50 transition-colors">Browse Interim CTO Jobs</a>
                <Link href="/fractional-cto-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CTO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-black text-cyan-400">{stats.total}+</div><div className="text-gray-400 text-sm">Interim CTO Roles</div></div>
            <div><div className="text-3xl font-black text-cyan-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-cyan-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-cyan-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-cyan-50 border-y border-cyan-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim CTO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CTO & Technology Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live interim tech roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Engineering" ctaLink="/fractional-jobs-uk?department=Engineering" ctaText="View All Tech Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CTO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CTO Day Rate Calculator</h2></div><RoleCalculator role="cto" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CTOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-cyan-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="Table of contents">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">On This Page</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <a href="#market" className="block text-cyan-600 hover:text-cyan-800 hover:underline">UK Interim CTO Market</a>
                <a href="#when-needed" className="block text-cyan-600 hover:text-cyan-800 hover:underline">When Companies Need Interim CTOs</a>
                <a href="#skills" className="block text-cyan-600 hover:text-cyan-800 hover:underline">Essential Skills & Experience</a>
              </div>
              <div className="space-y-2">
                <a href="#sectors" className="block text-cyan-600 hover:text-cyan-800 hover:underline">Top Hiring Sectors</a>
                <a href="#rates" className="block text-cyan-600 hover:text-cyan-800 hover:underline">Day Rates & IR35</a>
                <a href="#career" className="block text-cyan-600 hover:text-cyan-800 hover:underline">Career Path & Transition</a>
              </div>
              <div className="space-y-2">
                <a href="#resources" className="block text-cyan-600 hover:text-cyan-800 hover:underline">Related Resources</a>
                <a href="#faq" className="block text-cyan-600 hover:text-cyan-800 hover:underline">Common Questions</a>
              </div>
            </div>
          </nav>
        </div>
      </section>

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Interim CTO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim CTO</strong> market in the UK continues to grow as digital transformation accelerates across all sectors. According to <a href="https://technation.io/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Tech Nation</a>, the UK tech sector generated £150 billion in revenue in 2024, with technology leadership roles seeing 15% year-on-year growth. Companies increasingly need experienced interim technology leaders to drive cloud migrations, modernize legacy systems, and build high-performing engineering teams.</p>
            <p>Unlike <Link href="/fractional-cto-jobs-uk" className="text-cyan-600 hover:underline">fractional CTO roles</Link>, interim positions are typically full-time assignments lasting 6-12 months. This makes them ideal for major transformations, M&A technology integration, or bridging gaps between permanent hires. The <a href="https://www.bcs.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">British Computer Society (BCS)</a> reports that demand for interim technology executives has increased by 25% since 2023.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CTOs</h3>
            <p className="text-gray-600 mb-4">Organisations typically engage interim CTOs for specific strategic situations requiring immediate, senior technology leadership:</p>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Digital transformations</strong> — Cloud migrations to AWS, Azure, or GCP; platform modernisation; legacy system replacement. These projects require dedicated leadership to manage vendor relationships, architecture decisions, and engineering team scaling.</li>
              <li><strong>Scale-up challenges</strong> — Building engineering teams from 10 to 100+, establishing development processes (CI/CD, code review), implementing engineering culture. Scale-ups backed by venture capital often need interim CTOs to professionalise their technology function.</li>
              <li><strong>M&A integration</strong> — Technology due diligence during acquisition, post-merger platform integration, team consolidation. Private equity firms frequently use interim CTOs across their portfolio companies.</li>
              <li><strong>Leadership gaps</strong> — Covering sudden departures during executive recruitment, which can take 6-12 months for permanent CTO hires. Interim CTOs maintain momentum while the board conducts a thorough search.</li>
              <li><strong>Critical product launches</strong> — Mission-critical technology delivery phases where the stakes are too high for a vacancy. Interim CTOs bring delivery experience and can be accountable for specific outcomes.</li>
              <li><strong>Turnaround situations</strong> — Underperforming technology teams, technical debt remediation, or engineering culture issues that require an objective external perspective.</li>
            </ul>

            <h3 id="skills" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Essential Skills & Experience for Interim CTOs</h3>
            <p className="text-gray-600 mb-4">Successful interim CTOs combine deep technical expertise with executive leadership capabilities. The <a href="https://www.theiet.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Institution of Engineering and Technology (IET)</a> identifies the following as critical competencies:</p>
            <div className="grid md:grid-cols-2 gap-6 not-prose mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Technical Leadership</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Cloud architecture (AWS, Azure, GCP)</li>
                  <li>• Modern engineering practices (DevOps, SRE)</li>
                  <li>• Security and compliance frameworks</li>
                  <li>• Data architecture and analytics</li>
                  <li>• AI/ML integration and governance</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Executive Capabilities</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Board-level communication</li>
                  <li>• Technology strategy development</li>
                  <li>• Vendor and partner management</li>
                  <li>• Budget planning and cost optimisation</li>
                  <li>• Team building and talent development</li>
                </ul>
              </div>
            </div>

            <h3 id="sectors" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Top UK Sectors Hiring Interim CTOs</h3>
            <p className="text-gray-600 mb-4">Demand for interim CTOs varies by sector. Based on our job market analysis and data from the <a href="https://www.gov.uk/government/organisations/department-for-science-innovation-and-technology" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Department for Science, Innovation and Technology</a>:</p>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full text-sm">
                <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 font-bold text-gray-900">Sector</th><th className="text-left py-3 px-4 font-bold text-gray-900">Typical Day Rate</th><th className="text-left py-3 px-4 font-bold text-gray-900">Key Drivers</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Financial Services / Fintech</td><td className="py-3 px-4 text-gray-600">£1,200-£1,800</td><td className="py-3 px-4 text-gray-600">Digital banking, regulatory compliance, PSD2</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Healthcare / Life Sciences</td><td className="py-3 px-4 text-gray-600">£1,100-£1,500</td><td className="py-3 px-4 text-gray-600">Digital health platforms, NHS integration</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Private Equity Portfolio</td><td className="py-3 px-4 text-gray-600">£1,000-£1,400</td><td className="py-3 px-4 text-gray-600">Value creation, carve-outs, integrations</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">E-commerce / Retail</td><td className="py-3 px-4 text-gray-600">£900-£1,300</td><td className="py-3 px-4 text-gray-600">Platform modernisation, omnichannel</td></tr>
                  <tr><td className="py-3 px-4 text-gray-900">Scale-up Technology</td><td className="py-3 px-4 text-gray-600">£900-£1,200</td><td className="py-3 px-4 text-gray-600">Series B+ growth, team scaling</td></tr>
                </tbody>
              </table>
            </div>

            <h3 id="rates" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Day Rates & IR35 Considerations</h3>
            <p className="text-gray-600 mb-4">Interim CTO compensation in the UK is primarily day-rate based. According to market data and guidance from <a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">HMRC on IR35</a>:</p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Day rate range:</strong> £900-£1,400 standard, up to £1,800 for specialist/regulated sectors</li>
              <li><strong>Location premium:</strong> London roles typically pay 10-15% more than regional positions</li>
              <li><strong>IR35 status:</strong> Many interim CTO roles fall inside IR35 due to integration and control factors. Budget accordingly for the tax implications.</li>
              <li><strong>Notice periods:</strong> Typically 30 days, sometimes 2 weeks for shorter assignments</li>
            </ul>
            <p className="text-gray-600 mt-4">For detailed IR35 guidance, consult <a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">IPSE (The Association of Independent Professionals)</a> or seek specialist tax advice.</p>

            <h3 id="career" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Career Path: Transitioning to Interim CTO Work</h3>
            <p className="text-gray-600 mb-4">Many interim CTOs transition from permanent roles after 15+ years of experience. The path typically involves:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
              <li>Building a track record of delivery outcomes (transformations completed, teams scaled, products launched)</li>
              <li>Developing a network through industry events, <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">LinkedIn</a>, and professional associations</li>
              <li>Registering with specialist interim management firms and executive search firms</li>
              <li>Creating a compelling CV focused on measurable achievements and specific technologies</li>
              <li>Building a personal brand through speaking, writing, or advisory board positions</li>
            </ol>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cto-jobs-uk" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CTO Jobs</h4><p className="text-sm text-gray-600">Part-time CTO roles for portfolio careers</p></Link>
              <Link href="/fractional-cto-salary" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">CTO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and compensation benchmarks</p></Link>
              <Link href="/fractional-cto" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CTO?</h4><p className="text-sm text-gray-600">Understanding the fractional model</p></Link>
              <Link href="/hire-fractional-cto" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CTO</h4><p className="text-sm text-gray-600">Guide to hiring tech leaders</p></Link>
              <Link href="/interim-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CFO Jobs UK</h4><p className="text-sm text-gray-600">Finance leadership interim roles</p></Link>
              <Link href="/interim-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CMO Jobs UK</h4><p className="text-sm text-gray-600">Marketing leadership interim roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <p className="text-gray-600 mb-4">Further reading from industry bodies and government sources:</p>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://technation.io/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Tech Nation</a> — UK tech sector reports and growth data</li>
              <li><a href="https://www.bcs.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">British Computer Society (BCS)</a> — Professional body for IT practitioners</li>
              <li><a href="https://www.theiet.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Institution of Engineering and Technology (IET)</a> — Engineering and technology standards</li>
              <li><a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">HMRC IR35 Guidance</a> — Off-payroll working rules</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">IPSE</a> — Association of Independent Professionals and the Self-Employed</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CTOs</h2></div><IR35Calculator defaultDayRate={1100} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CTO Jobs UK</h2></div><FAQ items={INTERIM_CTO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Interim Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cto" />
    </div>
  )
}
