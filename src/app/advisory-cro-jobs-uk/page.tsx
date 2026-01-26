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
  title: 'Advisory CRO Jobs UK | Revenue Leadership Advisory Roles 2026',
  description: 'Find advisory CRO jobs UK with day rates £650-£950. Browse advisory Chief Revenue Officer and Revenue Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'advisory cro jobs uk, advisory cro, advisory revenue director jobs, advisory chief revenue officer, advisory cro roles uk, advisory revenue jobs, advisory cro london, advisory cro remote',
  alternates: { canonical: 'https://www.fractional.quest/advisory-cro-jobs-uk' },
  openGraph: {
    title: 'Advisory CRO Jobs UK | Revenue Leadership Advisory Roles 2026',
    description: 'Find advisory CRO jobs UK with day rates £650-£950. Browse advisory Chief Revenue Officer and Revenue Director roles.',
    url: 'https://www.fractional.quest/advisory-cro-jobs-uk',
  },
}

const ADVISORY_CRO_FAQS = [
  { question: "What is an advisory CRO?", answer: "An advisory CRO is a senior revenue professional who provides strategic revenue leadership guidance on a consultative basis. Unlike interim CROs who take on full operational responsibility, advisory CROs offer high-level counsel on specific challenges such as revenue strategy, go-to-market planning, sales team development, or revenue operations. They typically work fewer hours but bring deep expertise to critical revenue decisions." },
  { question: "What are typical advisory CRO day rates in the UK?", answer: "Advisory CRO day rates in the UK typically range from £650-£950 per day, depending on experience, sector expertise, and complexity of the engagement. Specialist areas like SaaS revenue optimisation or enterprise sales strategy can command rates of £950-£1,200/day. Advisory roles often involve fewer days per month than interim roles, making them cost-effective for specific strategic needs." },
  { question: "How does an advisory CRO engagement work?", answer: "Advisory CRO engagements are typically structured around specific deliverables or time allocations (e.g., 2-4 days per month). The advisory CRO might review revenue strategy, attend board meetings, mentor sales leaders, assess go-to-market approach, or provide guidance on revenue operations. Engagements can be ongoing retainers or project-based." },
  { question: "What's the difference between advisory CRO and advisory CMO?", answer: "Advisory CROs focus on the entire revenue engine including sales, customer success, and revenue operations, while advisory CMOs focus on marketing and demand generation. CROs typically own revenue targets and sales teams; CMOs own brand and pipeline generation. Many organisations benefit from both perspectives." },
  { question: "What qualifications do advisory CROs need?", answer: "Most advisory CROs have 15+ years of revenue experience including prior CRO, VP Sales, or Revenue Director roles. Essential qualifications include experience with revenue strategy, sales methodology, revenue operations, and board-level communication. Many have sector-specific expertise in SaaS, B2B enterprise, or specific verticals." },
  { question: "What industries hire advisory CROs most frequently?", answer: "The highest demand for advisory CROs comes from: SaaS and technology companies (revenue growth, GTM strategy), PE-backed companies (revenue acceleration), scale-ups expanding to new markets, and established businesses transforming their sales approach." },
  { question: "Do advisory CRO roles fall inside or outside IR35?", answer: "Advisory CRO roles often fall outside IR35 due to their consultative nature, lack of day-to-day operational control, and project-based scope. However, each engagement must be assessed individually. Key factors include: no substitution restrictions, working for multiple clients, providing genuine advice rather than filling a role. Always obtain a status determination statement (SDS)." },
  { question: "What's the hiring process for advisory CROs?", answer: "Advisory CRO hiring focuses on expertise fit and chemistry. The process typically includes: initial discussion with CEO/board about revenue challenges, assessment of relevant experience and track record, discussion of working relationship dynamics, and agreement on scope and deliverables. Decisions are often made within 2-3 weeks." },
  { question: "Can advisory CRO work lead to other opportunities?", answer: "Yes, advisory CRO relationships often expand. Many advisory engagements lead to: increased scope (from advisory to fractional), board positions (revenue oversight), equity opportunities in portfolio companies, and referrals. The advisory model is excellent for building a portfolio of revenue leadership relationships." },
  { question: "What should I include in my advisory CRO profile?", answer: "Focus on: revenue growth achievements (ARR growth, quota attainment), GTM strategies implemented, team building and scaling experience, board-level communication skills, and sector expertise. Highlight your advisory approach and how you complement existing teams rather than replacing them." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Advisory Jobs', href: '/fractional-jobs-uk' },
  { label: 'Advisory CRO Jobs UK', href: '/advisory-cro-jobs-uk' },
]

async function getAdvisoryCROStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cro%' OR title ILIKE '%advisory%revenue director%' OR title ILIKE '%advisory%chief revenue%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cro%' OR title ILIKE '%advisory%revenue%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 10, avgRate: 800, remoteCount: Number(remoteCount?.count || 4) }
  } catch { return { total: 10, avgRate: 800, remoteCount: 4 } }
}

async function getAdvisoryCROJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cro%' OR title ILIKE '%advisory%revenue director%' OR title ILIKE '%advisory%chief revenue%' OR (title ILIKE '%advisory%' AND role_category = 'Sales')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%' AND role_category = 'Sales') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cmo%' OR title ILIKE '%advisory%coo%' OR title ILIKE '%fractional%cro%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function AdvisoryCROJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getAdvisoryCROStats(), getFeaturedCompanies(), getAdvisoryCROJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Advisory CRO Jobs UK | Revenue Leadership Advisory Roles 2026" description="Find advisory CRO jobs UK with day rates £650-£950. Browse advisory Chief Revenue Officer and Revenue Director roles." url="https://www.fractional.quest/advisory-cro-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={ADVISORY_CRO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/advisory-cro-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1920&q=80" alt="Advisory CRO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/95 via-orange-800/90 to-amber-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Advisory Revenue Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Advisory CRO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>advisory CRO</strong> and <strong>advisory Revenue Director</strong> roles across the UK. Premium advisory revenue leadership positions with day rates from £650-£950.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-orange-900 font-bold rounded-lg hover:bg-orange-50 transition-colors">Browse Advisory CRO Jobs</a>
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
            <div><div className="text-3xl font-black text-orange-400">{stats.total}+</div><div className="text-gray-400 text-sm">Advisory CRO Roles</div></div>
            <div><div className="text-3xl font-black text-orange-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-orange-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-orange-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-orange-50 border-y border-orange-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Advisory CRO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Advisory CRO & Revenue Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live advisory revenue roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Sales" ctaLink="/fractional-jobs-uk?department=Sales" ctaText="View All Sales Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Advisory CRO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Advisory CRO Day Rate Calculator</h2></div><RoleCalculator role="cro" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Advisory CROs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-orange-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Advisory CRO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>advisory CRO</strong> market in the UK is growing as companies seek strategic revenue expertise without full-time commitments. According to <a href="https://www.instituteprm.org/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">The Institute for Revenue Management</a>, demand for advisory revenue roles has increased as companies focus on sustainable growth and revenue efficiency.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Advisory CROs</h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Revenue strategy</strong> — Developing go-to-market and revenue growth strategies.</li>
              <li><strong>Sales transformation</strong> — Modernising sales approach and methodology.</li>
              <li><strong>Board-level oversight</strong> — Providing independent revenue perspective to boards.</li>
              <li><strong>Team development</strong> — Mentoring sales leaders and building capability.</li>
              <li><strong>Revenue operations</strong> — Optimising the revenue tech stack and processes.</li>
              <li><strong>Market expansion</strong> — Guiding expansion into new markets or segments.</li>
            </ul>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cro-jobs-uk" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CRO Jobs</h4><p className="text-sm text-gray-600">Part-time CRO roles</p></Link>
              <Link href="/fractional-cro-salary" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">CRO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link>
              <Link href="/interim-cro-jobs-uk" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CRO Jobs UK</h4><p className="text-sm text-gray-600">Full-time interim revenue roles</p></Link>
              <Link href="/advisory-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">Advisory CMO Jobs UK</h4><p className="text-sm text-gray-600">Marketing advisory roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.ism.org/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Institute of Sales Management</a> — Sales professional body</li>
              <li><a href="https://www.saastr.com/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">SaaStr</a> — SaaS revenue insights</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">IPSE</a> — Association of Independent Professionals</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Advisory CROs</h2></div><IR35Calculator defaultDayRate={800} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Advisory CRO Jobs UK</h2></div><FAQ items={ADVISORY_CRO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Advisory Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Advisory Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cro" />
    </div>
  )
}
