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
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { HotJobsLines } from '@/components/HotJobsLines'
import { RoleContentHub } from '@/components/RoleContentHub'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Interim CIO Jobs UK',
  description: 'Interim CIO and IT Director jobs UK for technology leaders. Find interim Chief Information Officer and Technology Director roles. £900-£1,400/day.',
  keywords: 'interim cio jobs uk, interim cio, interim it director, interim technology director, interim chief information officer, interim it leadership uk',
  alternates: { canonical: 'https://fractional.quest/interim-cio-jobs-uk' },
  openGraph: {
    title: 'Interim CIO Jobs UK | IT Director Roles',
    description: 'Find interim CIO and IT Director jobs across the UK. Day rates £900-£1,400.',
    url: 'https://fractional.quest/interim-cio-jobs-uk',
  },
}

const INTERIM_CIO_FAQS = [
  { question: "What is an interim CIO?", answer: "An interim CIO is a temporary Chief Information Officer who provides senior IT and technology leadership during transitions, transformations, or gaps in permanent leadership. Unlike fractional CIOs who work part-time ongoing, interim CIOs typically work full-time for a defined period (6-12 months)." },
  { question: "What are typical interim CIO day rates in the UK?", answer: "Interim CIO day rates in the UK typically range from £900-£1,400 per day, depending on company size, sector, and complexity. Digital transformation and enterprise-scale IT programmes command premium rates." },
  { question: "How long do interim CIO assignments last?", answer: "Most interim CIO assignments last 6-12 months, covering IT transformations, system migrations, or technology strategy overhauls. Complex ERP implementations or cloud migrations may extend longer." },
  { question: "What's the difference between interim and fractional CIO?", answer: "Interim CIOs typically work full-time for a fixed period, while fractional CIOs work part-time (1-3 days/week) on an ongoing basis. Interim roles suit major IT transformations, system migrations, or post-merger technology integration." },
  { question: "What qualifications do interim CIOs need?", answer: "Most interim CIOs have 15+ years of IT leadership experience including prior CIO or IT Director roles. TOGAF, ITIL, and cloud certifications (AWS, Azure) are highly valued, along with experience in digital transformation and enterprise architecture." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Interim Jobs', href: '/fractional-jobs-uk' }, { label: 'Interim CIO Jobs UK', href: '/interim-cio-jobs-uk' }]

async function getInterimCIOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cio%' OR title ILIKE '%interim%it director%' OR title ILIKE '%interim%technology director%' OR title ILIKE '%interim%chief information officer%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cio%' OR title ILIKE '%interim%it director%' OR title ILIKE '%interim%technology director%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 10), avgRate: 1150, remoteCount: Number(remoteCount?.count || 5) }
  } catch { return { total: 10, avgRate: 1150, remoteCount: 5 } }
}

async function getInterimCIOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cio%' OR title ILIKE '%interim%it director%' OR title ILIKE '%interim%technology director%' OR title ILIKE '%interim%chief information officer%' OR (title ILIKE '%interim%' AND role_category = 'Engineering')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%interim%' AND role_category = 'Engineering') AND company_name IS NOT NULL ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cto%' OR title ILIKE '%interim%ciso%' OR title ILIKE '%fractional%cio%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function InterimCIOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimCIOStats(), getFeaturedCompanies(), getInterimCIOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim CIO Jobs UK | IT Director Roles 2026" description="Find interim CIO and IT Director jobs across the UK." url="https://fractional.quest/interim-cio-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_CIO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/interim-cio-jobs-uk" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80" alt="Interim CIO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-500/90 to-cyan-500/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim IT Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim CIO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim CIO</strong> and <strong>interim IT Director</strong> roles across the UK. Premium interim technology leadership positions with day rates from £900-£1,400.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors">Browse Interim CIO Jobs</a>
                <Link href="/fractional-cto-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CTO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-blue-400">{stats.total}+</div><div className="text-gray-400 text-sm">Interim CIO Roles</div></div><div><div className="text-3xl font-black text-blue-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-blue-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-blue-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-blue-50 border-y border-blue-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim CIO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CIO & IT Director Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live interim technology roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Engineering" ctaLink="/fractional-cto-jobs-uk" ctaText="View All Technology Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CIO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CIO Day Rate Calculator</h2></div><RoleCalculator role="cio" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CIOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-blue-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Interim CIO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim CIO</strong> market in the UK has grown significantly as companies face digital transformation challenges, cloud migration programmes, and the need for experienced IT leadership. Interim CIOs provide immediate expertise during critical technology transitions.</p><p>Unlike <Link href="/fractional-cto-jobs-uk" className="text-blue-600 hover:underline">fractional CTO roles</Link>, interim CIO positions are typically full-time assignments lasting 6-12 months, ideal for enterprise system migrations or major IT strategy overhauls.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CIOs</h3><ul className="space-y-2 text-gray-600"><li><strong>Digital transformation</strong> - Leading enterprise-wide IT modernisation</li><li><strong>Cloud migration</strong> - Managing large-scale infrastructure moves to cloud</li><li><strong>ERP implementations</strong> - Overseeing SAP, Oracle, or similar rollouts</li><li><strong>Post-merger integration</strong> - Consolidating IT systems after M&A</li><li><strong>Leadership gaps</strong> - Covering departures during recruitment</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cto-jobs-uk" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CTO Jobs</h4><p className="text-sm text-gray-600">Part-time CTO roles</p></Link><Link href="/interim-cto-jobs-uk" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CTO Jobs</h4><p className="text-sm text-gray-600">Interim technology leadership</p></Link><Link href="/fractional-cto" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CTO?</h4><p className="text-sm text-gray-600">Understanding the model</p></Link><Link href="/hire-fractional-cto" className="p-4 border rounded-lg hover:border-blue-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CTO</h4><p className="text-sm text-gray-600">Hiring guide</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CIOs</h2></div><IR35Calculator defaultDayRate={1150} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CIO Jobs UK</h2></div><FAQ items={INTERIM_CIO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Interim Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cio" />
    </div>
  )
}
