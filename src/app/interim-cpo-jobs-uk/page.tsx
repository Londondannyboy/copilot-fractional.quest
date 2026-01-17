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
  title: 'Interim CPO Jobs UK',
  description: 'Interim CPO jobs UK for product leaders. Find interim Chief Product Officer and Product Director roles. £900-£1,300/day.',
  keywords: 'interim cpo jobs uk, interim cpo, interim product director jobs, interim chief product officer, interim product roles uk',
  alternates: { canonical: 'https://fractional.quest/interim-cpo-jobs-uk' },
  openGraph: {
    title: 'Interim CPO Jobs UK | Product Director Roles',
    description: 'Find interim CPO and Product Director jobs across the UK. Day rates £900-£1,300.',
    url: 'https://fractional.quest/interim-cpo-jobs-uk',
  },
}

const INTERIM_CPO_FAQS = [
  { question: "What is an interim CPO?", answer: "An interim CPO is a temporary Chief Product Officer who provides senior product leadership during transitions, pivots, or gaps in permanent leadership. Unlike fractional CPOs who work part-time ongoing, interim CPOs typically work full-time for a defined period (6-12 months)." },
  { question: "What are typical interim CPO day rates in the UK?", answer: "Interim CPO day rates in the UK typically range from £900-£1,300 per day, depending on company size, sector, and complexity. B2B SaaS and fintech expertise command premium rates." },
  { question: "How long do interim CPO assignments last?", answer: "Most interim CPO assignments last 6-12 months, covering product pivots, launches, or leadership transitions. Complex transformations may extend longer." },
  { question: "What's the difference between interim and fractional CPO?", answer: "Interim CPOs typically work full-time for a fixed period, while fractional CPOs work part-time (1-3 days/week) on an ongoing basis. Interim roles suit major product transformations or launches." },
  { question: "What qualifications do interim CPOs need?", answer: "Most interim CPOs have 12+ years of product experience including prior CPO/VP Product roles. Technical background, agile expertise, and demonstrable product success are highly valued." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Interim Jobs', href: '/fractional-jobs-uk' }, { label: 'Interim CPO Jobs UK', href: '/interim-cpo-jobs-uk' }]

async function getInterimCPOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cpo%' OR title ILIKE '%interim%product director%' OR title ILIKE '%interim%chief product%' OR title ILIKE '%interim%vp product%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cpo%' OR title ILIKE '%interim%product director%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 12), avgRate: 1100, remoteCount: Number(remoteCount?.count || 6) }
  } catch { return { total: 12, avgRate: 1100, remoteCount: 6 } }
}

async function getInterimCPOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cpo%' OR title ILIKE '%interim%product director%' OR title ILIKE '%interim%chief product%' OR title ILIKE '%interim%vp product%' OR (title ILIKE '%interim%' AND role_category = 'Product')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%interim%' AND role_category = 'Product') AND company_name IS NOT NULL ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cto%' OR title ILIKE '%interim%cmo%' OR title ILIKE '%fractional%cpo%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function InterimCPOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimCPOStats(), getFeaturedCompanies(), getInterimCPOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim CPO Jobs UK | Product Director Roles 2026" description="Find interim CPO and Product Director jobs across the UK." url="https://fractional.quest/interim-cpo-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_CPO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/interim-cpo-jobs-uk" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80" alt="Interim CPO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/95 via-violet-500/90 to-purple-500/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Product Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim CPO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim CPO</strong> and <strong>interim Product Director</strong> roles across the UK. Premium interim product leadership positions with day rates from £900-£1,300.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-indigo-50 transition-colors">Browse Interim CPO Jobs</a>
                <Link href="/fractional-cpo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CPO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-indigo-400">{stats.total}+</div><div className="text-gray-400 text-sm">Interim CPO Roles</div></div><div><div className="text-3xl font-black text-indigo-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-indigo-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-indigo-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-indigo-50 border-y border-indigo-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim CPO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CPO & Product Director Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live interim product roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Product" ctaLink="/fractional-cpo-jobs-uk" ctaText="View All CPO Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CPO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CPO Day Rate Calculator</h2></div><RoleCalculator role="cpo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CPOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-indigo-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Interim CPO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim CPO</strong> market in the UK has grown as companies navigate product pivots, launches, and transformations. Experienced interim product leaders bring immediate impact to complex product challenges.</p><p>Unlike <Link href="/fractional-cpo-jobs-uk" className="text-indigo-600 hover:underline">fractional CPO roles</Link>, interim positions are typically full-time assignments lasting 6-12 months, ideal for intensive product transformations.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CPOs</h3><ul className="space-y-2 text-gray-600"><li><strong>Product pivots</strong> - Major strategic direction changes</li><li><strong>Platform launches</strong> - New product development</li><li><strong>Scale-up challenges</strong> - Building product teams and processes</li><li><strong>Post-acquisition</strong> - Product integration and rationalization</li><li><strong>Leadership gaps</strong> - Covering departures during recruitment</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cpo-jobs-uk" className="p-4 border rounded-lg hover:border-indigo-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CPO Jobs</h4><p className="text-sm text-gray-600">Part-time CPO roles</p></Link><Link href="/fractional-cpo-salary" className="p-4 border rounded-lg hover:border-indigo-300 transition-colors"><h4 className="font-bold text-gray-900">CPO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-cpo" className="p-4 border rounded-lg hover:border-indigo-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CPO?</h4><p className="text-sm text-gray-600">Understanding the model</p></Link><Link href="/hire-fractional-cpo" className="p-4 border rounded-lg hover:border-indigo-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CPO</h4><p className="text-sm text-gray-600">Hiring guide</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CPOs</h2></div><IR35Calculator defaultDayRate={1100} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CPO Jobs UK</h2></div><FAQ items={INTERIM_CPO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Interim Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cpo" />
    </div>
  )
}
