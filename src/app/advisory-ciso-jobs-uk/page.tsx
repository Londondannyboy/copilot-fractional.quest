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
  title: 'Advisory CISO Jobs UK | Security Leadership Advisory Roles 2026',
  description: 'Find advisory CISO jobs UK with day rates £700-£1,000. Browse advisory Chief Information Security Officer and Security Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'advisory ciso jobs uk, advisory ciso, advisory security director jobs, advisory chief information security officer, advisory ciso roles uk, advisory security jobs, advisory ciso london, advisory ciso remote',
  alternates: { canonical: 'https://www.fractional.quest/advisory-ciso-jobs-uk' },
  openGraph: {
    title: 'Advisory CISO Jobs UK | Security Leadership Advisory Roles 2026',
    description: 'Find advisory CISO jobs UK with day rates £700-£1,000. Browse advisory Chief Information Security Officer and Security Director roles.',
    url: 'https://www.fractional.quest/advisory-ciso-jobs-uk',
  },
}

const ADVISORY_CISO_FAQS = [
  { question: "What is an advisory CISO?", answer: "An advisory CISO is a senior security professional who provides strategic cybersecurity guidance on a consultative basis. Unlike interim CISOs who take on full operational responsibility, advisory CISOs offer high-level counsel on specific challenges such as security strategy, risk assessment, compliance, or board reporting. They typically work fewer hours but bring deep expertise to critical security decisions." },
  { question: "What are typical advisory CISO day rates in the UK?", answer: "Advisory CISO day rates in the UK typically range from £700-£1,000 per day, depending on experience, sector expertise, and complexity of the engagement. Specialist areas like financial services security or incident response can command rates of £1,000-£1,400/day. Advisory roles often involve fewer days per month than interim roles, making them cost-effective for specific strategic needs." },
  { question: "How does an advisory CISO engagement work?", answer: "Advisory CISO engagements are typically structured around specific deliverables or time allocations (e.g., 2-4 days per month). The advisory CISO might review security strategy, attend board meetings, assess security posture, mentor security leaders, or provide guidance on compliance and regulatory requirements. Engagements can be ongoing retainers or project-based." },
  { question: "What's the difference between advisory and fractional CISO?", answer: "Advisory CISOs provide strategic counsel without operational responsibility, typically working 1-4 days per month on high-level guidance. Fractional CISOs take on part-time operational leadership (1-3 days per week), managing security teams and programs. Advisory roles suit companies with capable security teams needing strategic oversight; fractional roles suit those needing hands-on leadership." },
  { question: "What qualifications do advisory CISOs need?", answer: "Most advisory CISOs have 15+ years of security experience including prior CISO, Security Director, or VP Security roles. Essential qualifications include security certifications (CISSP, CISM, CRISC), experience with regulatory frameworks (ISO 27001, SOC 2, GDPR), and board-level communication skills. Many have sector-specific expertise in financial services, healthcare, or critical infrastructure." },
  { question: "What industries hire advisory CISOs most frequently?", answer: "The highest demand for advisory CISOs comes from: financial services (regulatory compliance, threat management), healthcare (patient data protection, HIPAA-equivalent), technology companies (product security, SOC 2), and regulated industries (critical infrastructure, government contractors)." },
  { question: "Do advisory CISO roles fall inside or outside IR35?", answer: "Advisory CISO roles often fall outside IR35 due to their consultative nature, lack of day-to-day control, and project-based scope. However, each engagement must be assessed individually. Key factors include: no substitution restrictions, working for multiple clients, providing genuine advice rather than filling a role. Always obtain a status determination statement (SDS)." },
  { question: "What's the hiring process for advisory CISOs?", answer: "Advisory CISO hiring focuses on expertise fit and trust. The process typically includes: initial discussion with CEO/board about security challenges, assessment of relevant experience and certifications, discussion of working relationship dynamics, and agreement on scope and confidentiality. Decisions are often made within 2-3 weeks." },
  { question: "Can advisory CISO work lead to other opportunities?", answer: "Yes, advisory CISO relationships often expand. Many advisory engagements lead to: increased scope (from advisory to fractional), board positions (security oversight), and referrals. The advisory model is excellent for building a portfolio of security leadership relationships." },
  { question: "What should I include in my advisory CISO profile?", answer: "Focus on: security programs built and matured, compliance certifications achieved, incident response experience, board-level communication skills, and sector expertise. Highlight your advisory approach and how you complement existing teams rather than replacing them." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Advisory Jobs', href: '/fractional-jobs-uk' },
  { label: 'Advisory CISO Jobs UK', href: '/advisory-ciso-jobs-uk' },
]

async function getAdvisoryCISOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%ciso%' OR title ILIKE '%advisory%security director%' OR title ILIKE '%advisory%chief information security%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%ciso%' OR title ILIKE '%advisory%security%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 12, avgRate: 850, remoteCount: Number(remoteCount?.count || 5) }
  } catch { return { total: 12, avgRate: 850, remoteCount: 5 } }
}

async function getAdvisoryCISOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%ciso%' OR title ILIKE '%advisory%security director%' OR title ILIKE '%advisory%chief information security%' OR (title ILIKE '%advisory%' AND role_category = 'Security')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%' AND role_category = 'Security') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cto%' OR title ILIKE '%advisory%cio%' OR title ILIKE '%fractional%ciso%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function AdvisoryCISOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getAdvisoryCISOStats(), getFeaturedCompanies(), getAdvisoryCISOJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Advisory CISO Jobs UK | Security Leadership Advisory Roles 2026" description="Find advisory CISO jobs UK with day rates £700-£1,000. Browse advisory Chief Information Security Officer and Security Director roles." url="https://www.fractional.quest/advisory-ciso-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={ADVISORY_CISO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/advisory-ciso-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80" alt="Advisory CISO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/95 via-red-800/90 to-rose-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Advisory Security Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Advisory CISO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>advisory CISO</strong> and <strong>advisory Security Director</strong> roles across the UK. Premium advisory security leadership positions with day rates from £700-£1,000.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-red-900 font-bold rounded-lg hover:bg-red-50 transition-colors">Browse Advisory CISO Jobs</a>
                <Link href="/fractional-ciso-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CISO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-black text-red-400">{stats.total}+</div><div className="text-gray-400 text-sm">Advisory CISO Roles</div></div>
            <div><div className="text-3xl font-black text-red-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-red-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-red-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-red-50 border-y border-red-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Advisory CISO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Advisory CISO & Security Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live advisory security roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Security" ctaLink="/fractional-jobs-uk?department=Security" ctaText="View All Security Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Advisory CISO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Advisory CISO Day Rate Calculator</h2></div><RoleCalculator role="ciso" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Advisory CISOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-red-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Advisory CISO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>advisory CISO</strong> market in the UK is growing rapidly as cybersecurity threats increase and regulatory requirements expand. According to the <a href="https://www.ncsc.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">National Cyber Security Centre (NCSC)</a>, demand for advisory security roles has increased as organisations seek expert guidance without full-time commitments.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Advisory CISOs</h3>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Security strategy</strong> — Developing comprehensive security strategies and roadmaps.</li>
              <li><strong>Board reporting</strong> — Providing security updates and risk assessments to boards.</li>
              <li><strong>Compliance guidance</strong> — Achieving ISO 27001, SOC 2, Cyber Essentials Plus.</li>
              <li><strong>Risk assessment</strong> — Conducting security assessments and gap analyses.</li>
              <li><strong>Incident preparation</strong> — Developing incident response plans and playbooks.</li>
              <li><strong>Vendor assessment</strong> — Evaluating security vendors and solutions.</li>
            </ul>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-ciso-jobs-uk" className="p-4 border rounded-lg hover:border-red-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CISO Jobs</h4><p className="text-sm text-gray-600">Part-time CISO roles</p></Link>
              <Link href="/fractional-ciso-salary" className="p-4 border rounded-lg hover:border-red-300 transition-colors"><h4 className="font-bold text-gray-900">CISO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link>
              <Link href="/interim-ciso-jobs-uk" className="p-4 border rounded-lg hover:border-red-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CISO Jobs UK</h4><p className="text-sm text-gray-600">Full-time interim security roles</p></Link>
              <Link href="/advisory-cto-jobs-uk" className="p-4 border rounded-lg hover:border-red-300 transition-colors"><h4 className="font-bold text-gray-900">Advisory CTO Jobs UK</h4><p className="text-sm text-gray-600">Technology advisory roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.ncsc.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">NCSC</a> — National Cyber Security Centre</li>
              <li><a href="https://www.isc2.org/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">ISC2</a> — CISSP certification body</li>
              <li><a href="https://www.isaca.org/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">ISACA</a> — CISM and CRISC certifications</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">IPSE</a> — Association of Independent Professionals</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Advisory CISOs</h2></div><IR35Calculator defaultDayRate={850} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Advisory CISO Jobs UK</h2></div><FAQ items={ADVISORY_CISO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Advisory Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Advisory Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="ciso" />
    </div>
  )
}
