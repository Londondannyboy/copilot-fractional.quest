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
  title: 'Advisory CMO Jobs UK | Marketing Leadership Advisory Roles 2026',
  description: 'Find advisory CMO jobs UK with day rates £600-£900. Browse advisory Chief Marketing Officer and Marketing Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'advisory cmo jobs uk, advisory cmo, advisory marketing director jobs, advisory chief marketing officer, advisory cmo roles uk, advisory marketing jobs, advisory cmo london, advisory cmo remote',
  alternates: { canonical: 'https://www.fractional.quest/advisory-cmo-jobs-uk' },
  openGraph: {
    title: 'Advisory CMO Jobs UK | Marketing Leadership Advisory Roles 2026',
    description: 'Find advisory CMO jobs UK with day rates £600-£900. Browse advisory Chief Marketing Officer and Marketing Director roles.',
    url: 'https://www.fractional.quest/advisory-cmo-jobs-uk',
  },
}

const ADVISORY_CMO_FAQS = [
  { question: "What is an advisory CMO?", answer: "An advisory CMO is a senior marketing professional who provides strategic marketing guidance and expertise on a consultative basis. Unlike interim CMOs who take on full operational responsibility, advisory CMOs offer high-level counsel on specific challenges such as brand strategy, go-to-market planning, marketing team development, or growth strategy. They typically work fewer hours but bring deep expertise to critical marketing decisions." },
  { question: "What are typical advisory CMO day rates in the UK?", answer: "Advisory CMO day rates in the UK typically range from £600-£900 per day, depending on experience, sector expertise, and complexity of the engagement. Specialist areas like B2B SaaS growth or brand repositioning can command rates of £900-£1,200/day. Advisory roles often involve fewer days per month than interim roles, making them cost-effective for specific strategic needs." },
  { question: "How does an advisory CMO engagement work?", answer: "Advisory CMO engagements are typically structured around specific deliverables or time allocations (e.g., 2-4 days per month). The advisory CMO might review marketing strategy, attend board meetings, mentor marketing leaders, assess agency relationships, or provide guidance on brand positioning. Engagements can be ongoing retainers or project-based." },
  { question: "What's the difference between advisory and fractional CMO?", answer: "Advisory CMOs provide strategic counsel without operational responsibility, typically working 1-4 days per month on high-level guidance. Fractional CMOs take on part-time operational leadership (1-3 days per week), managing marketing teams and campaigns. Advisory roles suit companies with capable marketing teams needing strategic oversight; fractional roles suit those needing hands-on leadership." },
  { question: "What qualifications do advisory CMOs need?", answer: "Most advisory CMOs have 15+ years of marketing experience including prior CMO, VP Marketing, or Marketing Director roles. Essential qualifications include experience with brand strategy, growth marketing, team building, and board-level communication. Many have specific expertise in B2B, B2C, SaaS, or particular industry verticals." },
  { question: "What industries hire advisory CMOs most frequently?", answer: "The highest demand for advisory CMOs comes from: venture-backed startups and scale-ups (growth strategy, positioning), private equity portfolio companies (brand development, marketing efficiency), established businesses undergoing repositioning, and boards seeking independent marketing oversight." },
  { question: "Do advisory CMO roles fall inside or outside IR35?", answer: "Advisory CMO roles often fall outside IR35 due to their consultative nature, lack of day-to-day control, and project-based scope. However, each engagement must be assessed individually. Key factors include: no substitution restrictions, working for multiple clients, providing genuine advice rather than filling a role. Always obtain a status determination statement (SDS)." },
  { question: "What's the hiring process for advisory CMOs?", answer: "Advisory CMO hiring focuses on expertise fit and chemistry. The process typically includes: initial discussion with CEO/founders about marketing challenges, assessment of relevant experience and track record, discussion of working style and availability, and agreement on scope and deliverables. Decisions are often made within 2-3 weeks." },
  { question: "Can advisory CMO work lead to other opportunities?", answer: "Yes, advisory CMO relationships often expand. Many advisory engagements lead to: increased scope (from advisory to fractional), board positions (NED or advisory board), equity opportunities, and referrals. The advisory model is excellent for building a portfolio of strategic relationships." },
  { question: "What should I include in my advisory CMO profile?", answer: "Focus on: specific growth outcomes achieved, brand transformations delivered, team building and mentoring experience, board-level communication skills, and sector expertise. Highlight your advisory approach and how you complement existing teams rather than replacing them." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Advisory Jobs', href: '/fractional-jobs-uk' },
  { label: 'Advisory CMO Jobs UK', href: '/advisory-cmo-jobs-uk' },
]

async function getAdvisoryCMOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cmo%' OR title ILIKE '%advisory%marketing director%' OR title ILIKE '%advisory%chief marketing%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cmo%' OR title ILIKE '%advisory%marketing%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 12, avgRate: 750, remoteCount: Number(remoteCount?.count || 5) }
  } catch { return { total: 12, avgRate: 750, remoteCount: 5 } }
}

async function getAdvisoryCMOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cmo%' OR title ILIKE '%advisory%marketing director%' OR title ILIKE '%advisory%chief marketing%' OR (title ILIKE '%advisory%' AND role_category = 'Marketing')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%' AND role_category = 'Marketing') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cfo%' OR title ILIKE '%advisory%cto%' OR title ILIKE '%fractional%cmo%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function AdvisoryCMOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getAdvisoryCMOStats(), getFeaturedCompanies(), getAdvisoryCMOJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Advisory CMO Jobs UK | Marketing Leadership Advisory Roles 2026" description="Find advisory CMO jobs UK with day rates £600-£900. Browse advisory Chief Marketing Officer and Marketing Director roles." url="https://www.fractional.quest/advisory-cmo-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={ADVISORY_CMO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/advisory-cmo-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80" alt="Advisory CMO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-amber-800/90 to-orange-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Advisory Marketing Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Advisory CMO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>advisory CMO</strong> and <strong>advisory Marketing Director</strong> roles across the UK. Premium advisory marketing leadership positions with day rates from £600-£900.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-colors">Browse Advisory CMO Jobs</a>
                <Link href="/fractional-cmo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CMO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-black text-amber-400">{stats.total}+</div><div className="text-gray-400 text-sm">Advisory CMO Roles</div></div>
            <div><div className="text-3xl font-black text-amber-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-amber-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-amber-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-amber-50 border-y border-amber-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Advisory CMO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Advisory CMO & Marketing Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live advisory marketing roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Marketing" ctaLink="/fractional-jobs-uk?department=Marketing" ctaText="View All Marketing Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Advisory CMO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Advisory CMO Day Rate Calculator</h2></div><RoleCalculator role="cmo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Advisory CMOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-amber-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="Table of contents">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">On This Page</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <a href="#market" className="block text-amber-600 hover:text-amber-800 hover:underline">UK Advisory CMO Market</a>
                <a href="#when-needed" className="block text-amber-600 hover:text-amber-800 hover:underline">When Companies Need Advisory CMOs</a>
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
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Advisory CMO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>advisory CMO</strong> market in the UK is growing as businesses seek strategic marketing expertise without full-time commitments. According to the <a href="https://www.cim.co.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Chartered Institute of Marketing (CIM)</a>, demand for advisory marketing roles has increased as companies navigate digital transformation, brand evolution, and growth challenges.</p>
            <p>Unlike <Link href="/interim-cmo-jobs-uk" className="text-amber-600 hover:underline">interim CMO roles</Link>, advisory positions focus on strategic counsel rather than operational management. Advisory CMOs typically work with multiple clients simultaneously, providing high-value input on critical marketing decisions.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Advisory CMOs</h3>
            <p className="text-gray-600 mb-4">Organisations typically engage advisory CMOs for specific strategic situations:</p>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Brand strategy</strong> — Defining or repositioning brand identity, messaging, and market positioning.</li>
              <li><strong>Growth strategy</strong> — Developing go-to-market plans, channel strategy, and growth frameworks.</li>
              <li><strong>Board-level oversight</strong> — Providing independent marketing perspective to boards and investors.</li>
              <li><strong>Marketing team development</strong> — Mentoring marketing leaders and assessing team capabilities.</li>
              <li><strong>Agency and vendor management</strong> — Evaluating and optimising external marketing partnerships.</li>
              <li><strong>Digital transformation</strong> — Guiding marketing technology adoption and digital strategy.</li>
            </ul>

            <h3 id="skills" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Essential Skills & Experience for Advisory CMOs</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Marketing Expertise</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Brand strategy and positioning</li>
                  <li>• Growth marketing and demand generation</li>
                  <li>• Digital marketing and MarTech</li>
                  <li>• Content and communications</li>
                  <li>• Marketing analytics and ROI</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Advisory Capabilities</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Board-level communication</li>
                  <li>• Strategic planning facilitation</li>
                  <li>• Team mentoring and coaching</li>
                  <li>• Agency management</li>
                  <li>• Stakeholder alignment</li>
                </ul>
              </div>
            </div>

            <h3 id="sectors" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Top UK Sectors Hiring Advisory CMOs</h3>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full text-sm">
                <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 font-bold text-gray-900">Sector</th><th className="text-left py-3 px-4 font-bold text-gray-900">Typical Day Rate</th><th className="text-left py-3 px-4 font-bold text-gray-900">Key Drivers</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">B2B SaaS / Tech</td><td className="py-3 px-4 text-gray-600">£700-£1,000</td><td className="py-3 px-4 text-gray-600">Growth strategy, demand generation</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">E-commerce / DTC</td><td className="py-3 px-4 text-gray-600">£650-£950</td><td className="py-3 px-4 text-gray-600">Brand building, customer acquisition</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Financial Services</td><td className="py-3 px-4 text-gray-600">£750-£1,100</td><td className="py-3 px-4 text-gray-600">Regulated marketing, trust building</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Healthcare</td><td className="py-3 px-4 text-gray-600">£700-£1,000</td><td className="py-3 px-4 text-gray-600">Patient engagement, compliance</td></tr>
                  <tr><td className="py-3 px-4 text-gray-900">Professional Services</td><td className="py-3 px-4 text-gray-600">£600-£900</td><td className="py-3 px-4 text-gray-600">Thought leadership, lead generation</td></tr>
                </tbody>
              </table>
            </div>

            <h3 id="rates" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Day Rates & IR35 Considerations</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Day rate range:</strong> £600-£900 standard, up to £1,200 for specialist engagements</li>
              <li><strong>Monthly commitment:</strong> Typically 2-4 days per month for advisory roles</li>
              <li><strong>IR35 status:</strong> Advisory roles often fall outside IR35 due to their consultative nature</li>
              <li><strong>Retainer models:</strong> Some advisory CMOs work on monthly retainers for ongoing availability</li>
            </ul>

            <h3 id="career" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Career Path: Transitioning to Advisory CMO Work</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
              <li>Building deep expertise in specific sectors or growth stages</li>
              <li>Developing a reputation for strategic marketing leadership</li>
              <li>Building relationships with founders, investors, and boards</li>
              <li>Starting with 1-2 advisory clients while maintaining other income</li>
              <li>Gradually building a portfolio of 3-5 advisory relationships</li>
            </ol>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CMO Jobs</h4><p className="text-sm text-gray-600">Part-time CMO roles for portfolio careers</p></Link>
              <Link href="/fractional-cmo-salary" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">CMO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and compensation benchmarks</p></Link>
              <Link href="/fractional-cmo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CMO?</h4><p className="text-sm text-gray-600">Understanding the fractional model</p></Link>
              <Link href="/hire-fractional-cmo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CMO</h4><p className="text-sm text-gray-600">Guide to hiring marketing leaders</p></Link>
              <Link href="/interim-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CMO Jobs UK</h4><p className="text-sm text-gray-600">Full-time interim marketing roles</p></Link>
              <Link href="/advisory-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Advisory CFO Jobs UK</h4><p className="text-sm text-gray-600">Finance advisory roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.cim.co.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Chartered Institute of Marketing (CIM)</a> — Professional marketing body</li>
              <li><a href="https://dma.org.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Data & Marketing Association (DMA)</a> — Data-driven marketing standards</li>
              <li><a href="https://www.marketingweek.com/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Marketing Week</a> — Industry news and insights</li>
              <li><a href="https://ipa.co.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">IPA</a> — Institute of Practitioners in Advertising</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">IPSE</a> — Association of Independent Professionals</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Advisory CMOs</h2></div><IR35Calculator defaultDayRate={750} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Advisory CMO Jobs UK</h2></div><FAQ items={ADVISORY_CMO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Advisory Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Advisory Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cmo" />
    </div>
  )
}
