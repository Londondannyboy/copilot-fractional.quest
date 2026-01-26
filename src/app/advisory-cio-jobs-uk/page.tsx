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
  title: 'Advisory CIO Jobs UK | IT Leadership Advisory Roles 2026',
  description: 'Find advisory CIO jobs UK with day rates £650-£950. Browse advisory Chief Information Officer and IT Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'advisory cio jobs uk, advisory cio, advisory it director jobs, advisory chief information officer, advisory cio roles uk, advisory it jobs, advisory cio london, advisory cio remote',
  alternates: { canonical: 'https://www.fractional.quest/advisory-cio-jobs-uk' },
  openGraph: {
    title: 'Advisory CIO Jobs UK | IT Leadership Advisory Roles 2026',
    description: 'Find advisory CIO jobs UK with day rates £650-£950. Browse advisory Chief Information Officer and IT Director roles.',
    url: 'https://www.fractional.quest/advisory-cio-jobs-uk',
  },
}

const ADVISORY_CIO_FAQS = [
  { question: "What is an advisory CIO?", answer: "An advisory CIO is a senior IT professional who provides strategic IT leadership guidance on a consultative basis. Unlike interim CIOs who take on full operational responsibility, advisory CIOs offer high-level counsel on specific challenges such as IT strategy, digital transformation, vendor management, or IT governance. They typically work fewer hours but bring deep expertise to critical IT decisions." },
  { question: "What are typical advisory CIO day rates in the UK?", answer: "Advisory CIO day rates in the UK typically range from £650-£950 per day, depending on experience, sector expertise, and complexity of the engagement. Specialist areas like ERP implementation oversight or cloud transformation can command rates of £950-£1,200/day. Advisory roles often involve fewer days per month than interim roles, making them cost-effective for specific strategic needs." },
  { question: "How does an advisory CIO engagement work?", answer: "Advisory CIO engagements are typically structured around specific deliverables or time allocations (e.g., 2-4 days per month). The advisory CIO might review IT strategy, attend board meetings, mentor IT leaders, assess technology vendors, or provide guidance on digital transformation. Engagements can be ongoing retainers or project-based." },
  { question: "What's the difference between advisory CIO and advisory CTO?", answer: "Advisory CIOs focus on internal IT operations, infrastructure, and business systems, while advisory CTOs focus on technology product development and engineering. CIOs typically support the business with technology; CTOs build technology as the product. Many organisations need both perspectives at different stages." },
  { question: "What qualifications do advisory CIOs need?", answer: "Most advisory CIOs have 15+ years of IT experience including prior CIO, IT Director, or VP IT roles. Essential qualifications include experience with IT strategy, enterprise architecture (TOGAF), service management (ITIL), and board-level communication. Many have sector-specific expertise in financial services, healthcare, or public sector." },
  { question: "What industries hire advisory CIOs most frequently?", answer: "The highest demand for advisory CIOs comes from: mid-market companies undergoing digital transformation, PE-backed companies optimising IT operations, public sector organisations modernising systems, and organisations implementing major ERP or cloud programmes." },
  { question: "Do advisory CIO roles fall inside or outside IR35?", answer: "Advisory CIO roles often fall outside IR35 due to their consultative nature, lack of day-to-day operational control, and project-based scope. However, each engagement must be assessed individually. Key factors include: no substitution restrictions, working for multiple clients, providing genuine advice rather than filling a role. Always obtain a status determination statement (SDS)." },
  { question: "What's the hiring process for advisory CIOs?", answer: "Advisory CIO hiring focuses on expertise fit and chemistry. The process typically includes: initial discussion with CEO/board about IT challenges, assessment of relevant experience and approach, discussion of working relationship dynamics, and agreement on scope and deliverables. Decisions are often made within 2-3 weeks." },
  { question: "Can advisory CIO work lead to other opportunities?", answer: "Yes, advisory CIO relationships often expand. Many advisory engagements lead to: increased scope (from advisory to fractional), board positions (IT governance), and referrals. The advisory model is excellent for building a portfolio of IT leadership relationships." },
  { question: "What should I include in my advisory CIO profile?", answer: "Focus on: IT transformations delivered, cost optimisation achievements, vendor management experience, board-level communication skills, and sector expertise. Highlight your advisory approach and how you complement existing teams rather than replacing them." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Advisory Jobs', href: '/fractional-jobs-uk' },
  { label: 'Advisory CIO Jobs UK', href: '/advisory-cio-jobs-uk' },
]

async function getAdvisoryCIOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cio%' OR title ILIKE '%advisory%it director%' OR title ILIKE '%advisory%chief information officer%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cio%' OR title ILIKE '%advisory%it%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 12, avgRate: 800, remoteCount: Number(remoteCount?.count || 5) }
  } catch { return { total: 12, avgRate: 800, remoteCount: 5 } }
}

async function getAdvisoryCIOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cio%' OR title ILIKE '%advisory%it director%' OR title ILIKE '%advisory%chief information officer%' OR (title ILIKE '%advisory%' AND role_category = 'IT')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%' AND role_category = 'IT') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cto%' OR title ILIKE '%advisory%ciso%' OR title ILIKE '%fractional%cio%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function AdvisoryCIOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getAdvisoryCIOStats(), getFeaturedCompanies(), getAdvisoryCIOJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Advisory CIO Jobs UK | IT Leadership Advisory Roles 2026" description="Find advisory CIO jobs UK with day rates £650-£950. Browse advisory Chief Information Officer and IT Director roles." url="https://www.fractional.quest/advisory-cio-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={ADVISORY_CIO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/advisory-cio-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80" alt="Advisory CIO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-sky-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Advisory IT Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Advisory CIO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>advisory CIO</strong> and <strong>advisory IT Director</strong> roles across the UK. Premium advisory IT leadership positions with day rates from £650-£950.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors">Browse Advisory CIO Jobs</a>
                <Link href="/fractional-cio-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CIO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-black text-blue-400">{stats.total}+</div><div className="text-gray-400 text-sm">Advisory CIO Roles</div></div>
            <div><div className="text-3xl font-black text-blue-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-blue-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-blue-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-blue-50 border-y border-blue-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Advisory CIO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Advisory CIO & IT Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live advisory IT roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="IT" ctaLink="/fractional-jobs-uk?department=IT" ctaText="View All IT Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Advisory CIO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Advisory CIO Day Rate Calculator</h2></div><RoleCalculator role="cio" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Advisory CIOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-blue-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Advisory CIO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>advisory CIO</strong> market in the UK is growing as organisations seek strategic IT leadership without full-time commitments. According to <a href="https://www.bcs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">BCS, The Chartered Institute for IT</a>, demand for advisory IT roles has increased as companies navigate digital transformation and IT optimisation.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Advisory CIOs</h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong>IT strategy</strong> — Developing IT roadmaps aligned with business objectives.</li>
              <li><strong>Digital transformation</strong> — Guiding cloud migration and modernisation programmes.</li>
              <li><strong>Board-level oversight</strong> — Providing independent IT perspective to boards.</li>
              <li><strong>Vendor management</strong> — Assessing and optimising technology vendor relationships.</li>
              <li><strong>IT governance</strong> — Establishing IT policies, standards, and controls.</li>
              <li><strong>Team development</strong> — Mentoring IT leaders and building capability.</li>
            </ul>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cio-jobs-uk" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CIO Jobs</h4><p className="text-sm text-gray-600">Part-time CIO roles</p></Link>
              <Link href="/fractional-cio-salary" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">CIO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link>
              <Link href="/interim-cio-jobs-uk" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CIO Jobs UK</h4><p className="text-sm text-gray-600">Full-time interim IT roles</p></Link>
              <Link href="/advisory-cto-jobs-uk" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Advisory CTO Jobs UK</h4><p className="text-sm text-gray-600">Technology advisory roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.bcs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">BCS</a> — The Chartered Institute for IT</li>
              <li><a href="https://www.isaca.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ISACA</a> — IT governance and assurance</li>
              <li><a href="https://www.axelos.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Axelos</a> — ITIL and service management</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IPSE</a> — Association of Independent Professionals</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Advisory CIOs</h2></div><IR35Calculator defaultDayRate={800} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Advisory CIO Jobs UK</h2></div><FAQ items={ADVISORY_CIO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Advisory Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Advisory Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cio" />
    </div>
  )
}
