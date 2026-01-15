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
  title: 'Interim CMO Jobs UK',
  description: 'Interim CMO jobs UK for marketing leaders. Find interim Chief Marketing Officer and Marketing Director roles. £850-£1,300/day.',
  keywords: 'interim cmo jobs uk, interim cmo, interim marketing director jobs, interim chief marketing officer, interim cmo roles uk, interim marketing jobs',
  alternates: { canonical: 'https://fractional.quest/interim-cmo-jobs-uk' },
  openGraph: {
    title: 'Interim CMO Jobs UK | Marketing Director Roles',
    description: 'Find interim CMO and Marketing Director jobs across the UK. Day rates £850-£1,300.',
    url: 'https://fractional.quest/interim-cmo-jobs-uk',
  },
}

const INTERIM_CMO_FAQS = [
  { question: "What is an interim CMO?", answer: "An interim CMO is a temporary Chief Marketing Officer who provides senior marketing leadership during transitions, rebrand, or gaps in permanent leadership. Unlike fractional CMOs who work part-time ongoing, interim CMOs typically work full-time for a defined period (3-12 months)." },
  { question: "What are typical interim CMO day rates in the UK?", answer: "Interim CMO day rates in the UK typically range from £850-£1,300 per day, depending on experience, sector, and scope. Brand transformation and digital marketing expertise command premium rates." },
  { question: "How long do interim CMO assignments last?", answer: "Most interim CMO assignments last 6-12 months, covering rebrands, product launches, or leadership transitions. Some extend longer for major marketing transformations." },
  { question: "What's the difference between interim and fractional CMO?", answer: "Interim CMOs typically work full-time for a fixed period, while fractional CMOs work part-time (1-3 days/week) on an ongoing basis. Interim roles suit major campaigns or transitions." },
  { question: "What qualifications do interim CMOs need?", answer: "Most interim CMOs have 15+ years of marketing experience including prior CMO/Marketing Director roles. Digital marketing expertise, brand strategy experience, and demonstrable ROI track records are highly valued." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Interim Jobs', href: '/fractional-jobs-uk' }, { label: 'Interim CMO Jobs UK', href: '/interim-cmo-jobs-uk' }]

async function getInterimCMOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cmo%' OR title ILIKE '%interim%marketing director%' OR title ILIKE '%interim%chief marketing%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cmo%' OR title ILIKE '%interim%marketing%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 15), avgRate: 1000, remoteCount: Number(remoteCount?.count || 6) }
  } catch { return { total: 15, avgRate: 1000, remoteCount: 6 } }
}

async function getInterimCMOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cmo%' OR title ILIKE '%interim%marketing director%' OR title ILIKE '%interim%chief marketing%' OR (title ILIKE '%interim%' AND role_category = 'Marketing')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%interim%' AND role_category = 'Marketing') AND company_name IS NOT NULL ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cfo%' OR title ILIKE '%interim%cto%' OR title ILIKE '%fractional%cmo%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function InterimCMOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimCMOStats(), getFeaturedCompanies(), getInterimCMOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim CMO Jobs UK | Marketing Director Roles 2025" description="Find interim CMO and Marketing Director jobs across the UK." url="https://fractional.quest/interim-cmo-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_CMO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/interim-cmo-jobs-uk" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80" alt="Interim CMO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-orange-800/90 to-pink-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Marketing Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim CMO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim CMO</strong> and <strong>interim Marketing Director</strong> roles across the UK. Premium interim marketing leadership positions with day rates from £850-£1,300.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-colors">Browse Interim CMO Jobs</a>
                <Link href="/fractional-cmo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CMO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-amber-400">{stats.total}+</div><div className="text-gray-400 text-sm">Interim CMO Roles</div></div><div><div className="text-3xl font-black text-amber-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-amber-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-amber-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-amber-50 border-y border-amber-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim CMO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim CMO & Marketing Director Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live interim marketing roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Marketing" ctaLink="/fractional-jobs-uk?department=Marketing" ctaText="View All Marketing Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Interim CMO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim CMO Day Rate Calculator</h2></div><RoleCalculator role="cmo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Interim CMOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-amber-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Interim CMO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim CMO</strong> market in the UK has grown as companies recognize the need for experienced marketing leadership during critical phases - rebrands, product launches, or digital transformation initiatives.</p><p>Unlike <Link href="/fractional-cmo-jobs-uk" className="text-amber-600 hover:underline">fractional CMO roles</Link>, interim positions are typically full-time assignments lasting 6-12 months, ideal for intensive marketing transformations.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim CMOs</h3><ul className="space-y-2 text-gray-600"><li><strong>Brand transformations</strong> - Rebrands, repositioning, brand architecture</li><li><strong>Product launches</strong> - Go-to-market strategy and execution</li><li><strong>Digital transformation</strong> - Marketing technology implementation</li><li><strong>Leadership gaps</strong> - Covering departures during recruitment</li><li><strong>Growth initiatives</strong> - Scaling marketing teams and capabilities</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CMO Jobs</h4><p className="text-sm text-gray-600">Part-time CMO roles</p></Link><Link href="/fractional-cmo-salary" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">CMO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-cmo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CMO?</h4><p className="text-sm text-gray-600">Understanding the model</p></Link><Link href="/hire-fractional-cmo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CMO</h4><p className="text-sm text-gray-600">Hiring guide</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Interim CMOs</h2></div><IR35Calculator defaultDayRate={1000} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim CMO Jobs UK</h2></div><FAQ items={INTERIM_CMO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Interim Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Interim Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cmo" />
    </div>
  )
}
