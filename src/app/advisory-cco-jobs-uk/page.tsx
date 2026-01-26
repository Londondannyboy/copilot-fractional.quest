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
  title: 'Advisory CCO Jobs UK | Compliance Leadership Advisory Roles 2026',
  description: 'Find advisory CCO jobs UK with day rates £600-£900. Browse advisory Chief Compliance Officer and Compliance Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'advisory cco jobs uk, advisory cco, advisory compliance director jobs, advisory chief compliance officer, advisory cco roles uk, advisory compliance jobs, advisory cco london, advisory cco remote',
  alternates: { canonical: 'https://www.fractional.quest/advisory-cco-jobs-uk' },
  openGraph: {
    title: 'Advisory CCO Jobs UK | Compliance Leadership Advisory Roles 2026',
    description: 'Find advisory CCO jobs UK with day rates £600-£900. Browse advisory Chief Compliance Officer and Compliance Director roles.',
    url: 'https://www.fractional.quest/advisory-cco-jobs-uk',
  },
}

const ADVISORY_CCO_FAQS = [
  { question: "What is an advisory CCO?", answer: "An advisory CCO is a senior compliance professional who provides strategic compliance guidance on a consultative basis. Unlike interim CCOs who take on full operational responsibility, advisory CCOs offer high-level counsel on specific challenges such as regulatory strategy, compliance framework development, or board-level compliance reporting. They typically work fewer hours but bring deep expertise to critical compliance decisions." },
  { question: "What are typical advisory CCO day rates in the UK?", answer: "Advisory CCO day rates in the UK typically range from £600-£900 per day, depending on experience, sector expertise, and complexity of the engagement. Specialist areas like FCA compliance or financial crime can command rates of £900-£1,200/day. Advisory roles often involve fewer days per month than interim roles, making them cost-effective for specific strategic needs." },
  { question: "How does an advisory CCO engagement work?", answer: "Advisory CCO engagements are typically structured around specific deliverables or time allocations (e.g., 2-4 days per month). The advisory CCO might review compliance strategy, attend board meetings, mentor compliance leaders, assess regulatory risks, or provide guidance on regulatory change. Engagements can be ongoing retainers or project-based." },
  { question: "What's the difference between advisory and fractional CCO?", answer: "Advisory CCOs provide strategic counsel without operational responsibility, typically working 1-4 days per month on high-level guidance. Fractional CCOs take on part-time operational leadership (1-3 days per week), managing compliance teams and programmes. Advisory roles suit companies with capable compliance teams needing strategic oversight; fractional roles suit those needing hands-on leadership." },
  { question: "What qualifications do advisory CCOs need?", answer: "Most advisory CCOs have 15+ years of compliance experience including prior CCO, Compliance Director, or Head of Compliance roles. Essential qualifications include experience with regulatory frameworks (FCA, PRA, GDPR), risk management, and board-level communication. Many have sector-specific expertise in financial services, payments, or regulated industries." },
  { question: "What industries hire advisory CCOs most frequently?", answer: "The highest demand for advisory CCOs comes from: fintech and payments companies (FCA authorisation, ongoing compliance), financial services (regulatory change, conduct risk), healthcare (MHRA, CQC compliance), and any regulated business needing independent compliance oversight." },
  { question: "Do advisory CCO roles fall inside or outside IR35?", answer: "Advisory CCO roles often fall outside IR35 due to their consultative nature, lack of day-to-day operational control, and project-based scope. However, each engagement must be assessed individually. Key factors include: no substitution restrictions, working for multiple clients, providing genuine advice rather than filling a role. Always obtain a status determination statement (SDS)." },
  { question: "What's the hiring process for advisory CCOs?", answer: "Advisory CCO hiring focuses on expertise fit and trust. The process typically includes: initial discussion with CEO/board about compliance challenges, assessment of relevant regulatory experience and track record, discussion of working relationship dynamics, and agreement on scope and confidentiality. Decisions are often made within 2-3 weeks." },
  { question: "Can advisory CCO work lead to other opportunities?", answer: "Yes, advisory CCO relationships often expand. Many advisory engagements lead to: increased scope (from advisory to fractional), board positions (risk/audit committee), and referrals. The advisory model is excellent for building a portfolio of compliance leadership relationships." },
  { question: "What should I include in my advisory CCO profile?", answer: "Focus on: regulatory frameworks mastered, compliance programmes built, regulatory relationships developed, board-level communication skills, and sector expertise. Highlight your advisory approach and how you complement existing teams rather than replacing them." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Advisory Jobs', href: '/fractional-jobs-uk' },
  { label: 'Advisory CCO Jobs UK', href: '/advisory-cco-jobs-uk' },
]

async function getAdvisoryCCOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cco%' OR title ILIKE '%advisory%compliance director%' OR title ILIKE '%advisory%chief compliance%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cco%' OR title ILIKE '%advisory%compliance%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 10, avgRate: 750, remoteCount: Number(remoteCount?.count || 4) }
  } catch { return { total: 10, avgRate: 750, remoteCount: 4 } }
}

async function getAdvisoryCCOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cco%' OR title ILIKE '%advisory%compliance director%' OR title ILIKE '%advisory%chief compliance%' OR (title ILIKE '%advisory%' AND role_category = 'Compliance')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%' AND role_category = 'Compliance') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cfo%' OR title ILIKE '%advisory%ciso%' OR title ILIKE '%fractional%cco%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function AdvisoryCCOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getAdvisoryCCOStats(), getFeaturedCompanies(), getAdvisoryCCOJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Advisory CCO Jobs UK | Compliance Leadership Advisory Roles 2026" description="Find advisory CCO jobs UK with day rates £600-£900. Browse advisory Chief Compliance Officer and Compliance Director roles." url="https://www.fractional.quest/advisory-cco-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={ADVISORY_CCO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/advisory-cco-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80" alt="Advisory CCO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 via-teal-800/90 to-cyan-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Advisory Compliance Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Advisory CCO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>advisory CCO</strong> and <strong>advisory Compliance Director</strong> roles across the UK. Premium advisory compliance leadership positions with day rates from £600-£900.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-teal-900 font-bold rounded-lg hover:bg-teal-50 transition-colors">Browse Advisory CCO Jobs</a>
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
            <div><div className="text-3xl font-black text-teal-400">{stats.total}+</div><div className="text-gray-400 text-sm">Advisory CCO Roles</div></div>
            <div><div className="text-3xl font-black text-teal-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-teal-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-teal-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-teal-50 border-y border-teal-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Advisory CCO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Advisory CCO & Compliance Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live advisory compliance roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Compliance" ctaLink="/fractional-jobs-uk?department=Compliance" ctaText="View All Compliance Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Advisory CCO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Advisory CCO Day Rate Calculator</h2></div><RoleCalculator role="cco" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Advisory CCOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-teal-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Advisory CCO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>advisory CCO</strong> market in the UK is growing as regulatory requirements increase and companies seek compliance expertise without full-time commitments. According to the <a href="https://www.fca.org.uk/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Financial Conduct Authority (FCA)</a>, demand for advisory compliance roles has increased as firms navigate evolving regulatory landscapes.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Advisory CCOs</h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Regulatory strategy</strong> — Developing compliance frameworks and strategies.</li>
              <li><strong>Authorisation support</strong> — Guiding FCA authorisation or variation of permissions.</li>
              <li><strong>Board-level oversight</strong> — Providing independent compliance perspective to boards.</li>
              <li><strong>Regulatory change</strong> — Assessing and implementing regulatory changes.</li>
              <li><strong>Risk assessment</strong> — Conducting compliance risk assessments and gap analyses.</li>
              <li><strong>Team development</strong> — Mentoring compliance leaders and building capability.</li>
            </ul>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cco-jobs-uk" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CCO Jobs</h4><p className="text-sm text-gray-600">Part-time CCO roles</p></Link>
              <Link href="/fractional-cco-salary" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">CCO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link>
              <Link href="/interim-cco-jobs-uk" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CCO Jobs UK</h4><p className="text-sm text-gray-600">Full-time interim compliance roles</p></Link>
              <Link href="/advisory-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">Advisory CFO Jobs UK</h4><p className="text-sm text-gray-600">Finance advisory roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.fca.org.uk/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">FCA</a> — Financial Conduct Authority</li>
              <li><a href="https://www.compliance-institute.com/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">ICA</a> — International Compliance Association</li>
              <li><a href="https://www.cisi.org/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">CISI</a> — Chartered Institute for Securities & Investment</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">IPSE</a> — Association of Independent Professionals</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Advisory CCOs</h2></div><IR35Calculator defaultDayRate={750} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Advisory CCO Jobs UK</h2></div><FAQ items={ADVISORY_CCO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Advisory Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Advisory Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cco" />
    </div>
  )
}
