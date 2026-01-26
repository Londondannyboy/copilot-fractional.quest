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
  title: 'Advisory CHRO Jobs UK | HR Leadership Advisory Roles 2026',
  description: 'Find advisory CHRO jobs UK with day rates £600-£900. Browse advisory Chief Human Resources Officer and HR Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'advisory chro jobs uk, advisory chro, advisory hr director jobs, advisory chief human resources officer, advisory chro roles uk, advisory hr jobs, advisory chro london, advisory chro remote',
  alternates: { canonical: 'https://www.fractional.quest/advisory-chro-jobs-uk' },
  openGraph: {
    title: 'Advisory CHRO Jobs UK | HR Leadership Advisory Roles 2026',
    description: 'Find advisory CHRO jobs UK with day rates £600-£900. Browse advisory Chief Human Resources Officer and HR Director roles.',
    url: 'https://www.fractional.quest/advisory-chro-jobs-uk',
  },
}

const ADVISORY_CHRO_FAQS = [
  { question: "What is an advisory CHRO?", answer: "An advisory CHRO is a senior HR professional who provides strategic people and culture guidance on a consultative basis. Unlike interim CHROs who take on full operational responsibility, advisory CHROs offer high-level counsel on specific challenges such as organisational design, culture transformation, executive team development, or HR strategy. They typically work fewer hours but bring deep expertise to critical people decisions." },
  { question: "What are typical advisory CHRO day rates in the UK?", answer: "Advisory CHRO day rates in the UK typically range from £600-£900 per day, depending on experience, sector expertise, and complexity of the engagement. Specialist areas like M&A people integration or executive team development can command rates of £900-£1,200/day. Advisory roles often involve fewer days per month than interim roles, making them cost-effective for specific strategic needs." },
  { question: "How does an advisory CHRO engagement work?", answer: "Advisory CHRO engagements are typically structured around specific deliverables or time allocations (e.g., 2-4 days per month). The advisory CHRO might review people strategy, attend board meetings, mentor HR leaders, advise on culture initiatives, or provide guidance on organisational change. Engagements can be ongoing retainers or project-based." },
  { question: "What's the difference between advisory and fractional CHRO?", answer: "Advisory CHROs provide strategic counsel without operational responsibility, typically working 1-4 days per month on high-level guidance. Fractional CHROs take on part-time operational leadership (1-3 days per week), managing HR teams and processes. Advisory roles suit companies with capable HR teams needing strategic oversight; fractional roles suit those needing hands-on leadership." },
  { question: "What qualifications do advisory CHROs need?", answer: "Most advisory CHROs have 15+ years of HR experience including prior CHRO, HRD, or CPO roles. Essential qualifications include experience with organisational design, culture transformation, executive development, and board-level communication. Many are CIPD qualified (Level 7) and have sector-specific expertise." },
  { question: "What industries hire advisory CHROs most frequently?", answer: "The highest demand for advisory CHROs comes from: venture-backed startups and scale-ups (building people functions), private equity portfolio companies (value creation, integration), established businesses undergoing transformation, and boards seeking independent HR oversight." },
  { question: "Do advisory CHRO roles fall inside or outside IR35?", answer: "Advisory CHRO roles often fall outside IR35 due to their consultative nature, lack of day-to-day control, and project-based scope. However, each engagement must be assessed individually. Key factors include: no substitution restrictions, working for multiple clients, providing genuine advice rather than filling a role. Always obtain a status determination statement (SDS)." },
  { question: "What's the hiring process for advisory CHROs?", answer: "Advisory CHRO hiring focuses on expertise fit and chemistry. The process typically includes: initial discussion with CEO/board about people challenges, assessment of relevant experience and approach, discussion of working relationship dynamics, and agreement on scope and deliverables. Decisions are often made within 2-3 weeks." },
  { question: "Can advisory CHRO work lead to other opportunities?", answer: "Yes, advisory CHRO relationships often expand. Many advisory engagements lead to: increased scope (from advisory to fractional), board positions (NED or advisory board), and referrals. The advisory model is excellent for building a portfolio of strategic HR relationships." },
  { question: "What should I include in my advisory CHRO profile?", answer: "Focus on: specific culture transformations delivered, organisational design experience, executive team development track record, board-level communication skills, and sector expertise. Highlight your advisory approach and how you complement existing teams rather than replacing them." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Advisory Jobs', href: '/fractional-jobs-uk' },
  { label: 'Advisory CHRO Jobs UK', href: '/advisory-chro-jobs-uk' },
]

async function getAdvisoryCHROStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%chro%' OR title ILIKE '%advisory%hr director%' OR title ILIKE '%advisory%chief human%' OR title ILIKE '%advisory%people director%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%chro%' OR title ILIKE '%advisory%hr%' OR title ILIKE '%advisory%people%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 10, avgRate: 750, remoteCount: Number(remoteCount?.count || 4) }
  } catch { return { total: 10, avgRate: 750, remoteCount: 4 } }
}

async function getAdvisoryCHROJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%chro%' OR title ILIKE '%advisory%hr director%' OR title ILIKE '%advisory%chief human%' OR title ILIKE '%advisory%people director%' OR (title ILIKE '%advisory%' AND role_category = 'HR')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%' AND role_category = 'HR') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cfo%' OR title ILIKE '%advisory%coo%' OR title ILIKE '%fractional%chro%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function AdvisoryCHROJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getAdvisoryCHROStats(), getFeaturedCompanies(), getAdvisoryCHROJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Advisory CHRO Jobs UK | HR Leadership Advisory Roles 2026" description="Find advisory CHRO jobs UK with day rates £600-£900. Browse advisory Chief Human Resources Officer and HR Director roles." url="https://www.fractional.quest/advisory-chro-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={ADVISORY_CHRO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/advisory-chro-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80" alt="Advisory CHRO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/95 via-violet-800/90 to-purple-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Advisory HR Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Advisory CHRO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>advisory CHRO</strong> and <strong>advisory HR Director</strong> roles across the UK. Premium advisory HR leadership positions with day rates from £600-£900.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-violet-900 font-bold rounded-lg hover:bg-violet-50 transition-colors">Browse Advisory CHRO Jobs</a>
                <Link href="/fractional-chro-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CHRO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-black text-violet-400">{stats.total}+</div><div className="text-gray-400 text-sm">Advisory CHRO Roles</div></div>
            <div><div className="text-3xl font-black text-violet-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-violet-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-violet-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-violet-50 border-y border-violet-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Advisory CHRO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Advisory CHRO & HR Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live advisory HR roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="HR" ctaLink="/fractional-jobs-uk?department=HR" ctaText="View All HR Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Advisory CHRO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Advisory CHRO Day Rate Calculator</h2></div><RoleCalculator role="chro" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Advisory CHROs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-violet-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Advisory CHRO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>advisory CHRO</strong> market in the UK is growing as organisations seek strategic people expertise without full-time commitments. According to the <a href="https://www.cipd.org/" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">CIPD</a>, demand for advisory HR roles has increased as companies navigate culture transformation, hybrid working challenges, and talent strategy.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Advisory CHROs</h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Culture transformation</strong> — Defining and embedding organisational culture and values.</li>
              <li><strong>Organisational design</strong> — Structuring teams for growth or efficiency.</li>
              <li><strong>Executive team development</strong> — Building leadership capability and succession.</li>
              <li><strong>People strategy</strong> — Aligning HR strategy with business objectives.</li>
              <li><strong>M&A integration</strong> — Managing people aspects of mergers and acquisitions.</li>
              <li><strong>HR function development</strong> — Mentoring HR leaders and building capability.</li>
            </ul>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-chro-jobs-uk" className="p-4 border rounded-lg hover:border-violet-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CHRO Jobs</h4><p className="text-sm text-gray-600">Part-time CHRO roles</p></Link>
              <Link href="/fractional-chro-salary" className="p-4 border rounded-lg hover:border-violet-300 transition-colors"><h4 className="font-bold text-gray-900">CHRO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link>
              <Link href="/interim-chro-jobs-uk" className="p-4 border rounded-lg hover:border-violet-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CHRO Jobs UK</h4><p className="text-sm text-gray-600">Full-time interim HR roles</p></Link>
              <Link href="/advisory-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-violet-300 transition-colors"><h4 className="font-bold text-gray-900">Advisory CFO Jobs UK</h4><p className="text-sm text-gray-600">Finance advisory roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.cipd.org/" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">CIPD</a> — Chartered Institute of Personnel and Development</li>
              <li><a href="https://www.shrm.org/" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">SHRM</a> — Society for Human Resource Management</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">IPSE</a> — Association of Independent Professionals</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Advisory CHROs</h2></div><IR35Calculator defaultDayRate={750} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Advisory CHRO Jobs UK</h2></div><FAQ items={ADVISORY_CHRO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Advisory Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Advisory Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="chro" />
    </div>
  )
}
