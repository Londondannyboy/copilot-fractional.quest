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
  title: 'Interim CISO Jobs UK',
  description: 'Interim CISO jobs UK for security leaders. Find interim Chief Security Officer and Security Director roles. £1,000-£1,500/day.',
  keywords: 'interim ciso jobs uk, interim ciso, interim security director jobs, interim chief information security officer, interim infosec roles uk',
  alternates: { canonical: 'https://fractional.quest/interim-ciso-jobs-uk' },
  openGraph: {
    title: 'Interim CISO Jobs UK | Security Director Roles',
    description: 'Find interim CISO and Security Director jobs across the UK. Day rates £1,000-£1,500.',
    url: 'https://fractional.quest/interim-ciso-jobs-uk',
  },
}

const INTERIM_CISO_FAQS = [
  { question: "What is an interim CISO?", answer: "An interim CISO is a temporary Chief Information Security Officer who provides senior security leadership during transitions, incidents, or gaps in permanent leadership. Unlike fractional CISOs who work part-time ongoing, interim CISOs typically work full-time for a defined period (6-12 months)." },
  { question: "What are typical interim CISO day rates in the UK?", answer: "Interim CISO day rates in the UK typically range from £1,000-£1,500 per day, depending on company size, sector, and complexity. Incident response and regulated sector expertise command premium rates." },
  { question: "How long do interim CISO assignments last?", answer: "Most interim CISO assignments last 6-12 months, covering security transformations, incident recovery, or compliance programmes. Post-breach situations may extend longer." },
  { question: "What's the difference between interim and fractional CISO?", answer: "Interim CISOs typically work full-time for a fixed period, while fractional CISOs work part-time (1-3 days/week) on an ongoing basis. Interim roles suit major security transformations or incident response." },
  { question: "What qualifications do interim CISOs need?", answer: "Most interim CISOs have 15+ years of security experience including prior CISO roles. CISSP, CISM certifications, and regulatory compliance expertise (FCA, GDPR, ISO 27001) are highly valued." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Interim Jobs', href: '/fractional-jobs-uk' }, { label: 'Interim CISO Jobs UK', href: '/interim-ciso-jobs-uk' }]

async function getInterimCISOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%ciso%' OR title ILIKE '%interim%security director%' OR title ILIKE '%interim%chief information security%' OR title ILIKE '%interim%infosec%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%ciso%' OR title ILIKE '%interim%security director%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 10), avgRate: 1200, remoteCount: Number(remoteCount?.count || 5) }
  } catch { return { total: 10, avgRate: 1200, remoteCount: 5 } }
}

async function getInterimCISOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%ciso%' OR title ILIKE '%interim%security director%' OR title ILIKE '%interim%chief information security%' OR title ILIKE '%interim%infosec%' OR (title ILIKE '%interim%' AND role_category = 'Security')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%interim%' AND role_category = 'Security') AND company_name IS NOT NULL ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cto%' OR title ILIKE '%interim%cio%' OR title ILIKE '%fractional%ciso%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function InterimCISOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimCISOStats(), getFeaturedCompanies(), getInterimCISOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim CISO Jobs UK | Security Director Roles 2026" description="Find interim CISO and Security Director jobs across the UK." url="https://fractional.quest/interim-ciso-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_CISO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/interim-ciso-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80" alt="Interim CISO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/95 via-rose-500/90 to-orange-500/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Security Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim CISO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim CISO</strong> and <strong>interim Security Director</strong> roles across the UK. Premium interim security leadership positions with day rates from £1,000-£1,500.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-red-900 font-bold rounded-lg hover:bg-red-50 transition-colors">Browse Interim CISO Jobs</a>
                <Link href="/fractional-ciso-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CISO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-red-400">{stats.total}+</div><div className="text-gray-400 text-sm">Interim CISO Roles</div></div><div><div className="text-3xl font-black text-red-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-red-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-red-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-red-50 border-y border-red-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim CISO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CISO & Security Director Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live interim security roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Security" ctaLink="/fractional-ciso-jobs-uk" ctaText="View All CISO Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CISO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CISO Day Rate Calculator</h2></div><RoleCalculator role="ciso" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CISOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-red-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Interim CISO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim CISO</strong> market in the UK has grown as companies face increasing cyber threats, regulatory requirements, and the need for experienced security leadership. Interim CISOs provide immediate expertise during critical security situations.</p><p>Unlike <Link href="/fractional-ciso-jobs-uk" className="text-red-600 hover:underline">fractional CISO roles</Link>, interim positions are typically full-time assignments lasting 6-12 months, ideal for post-breach recovery or major security transformations.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CISOs</h3><ul className="space-y-2 text-gray-600"><li><strong>Incident response</strong> - Post-breach recovery and remediation</li><li><strong>Compliance programmes</strong> - ISO 27001, SOC 2, FCA requirements</li><li><strong>Security transformation</strong> - Modernising security posture</li><li><strong>M&A due diligence</strong> - Security assessment and integration</li><li><strong>Leadership gaps</strong> - Covering departures during recruitment</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-ciso-jobs-uk" className="p-4 border rounded-lg hover:border-red-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CISO Jobs</h4><p className="text-sm text-gray-600">Part-time CISO roles</p></Link><Link href="/fractional-ciso-salary" className="p-4 border rounded-lg hover:border-red-300 transition-colors"><h4 className="font-bold text-gray-900">CISO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-ciso" className="p-4 border rounded-lg hover:border-red-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CISO?</h4><p className="text-sm text-gray-600">Understanding the model</p></Link><Link href="/hire-fractional-ciso" className="p-4 border rounded-lg hover:border-red-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CISO</h4><p className="text-sm text-gray-600">Hiring guide</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CISOs</h2></div><IR35Calculator defaultDayRate={1200} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CISO Jobs UK</h2></div><FAQ items={INTERIM_CISO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Interim Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="ciso" />
    </div>
  )
}
