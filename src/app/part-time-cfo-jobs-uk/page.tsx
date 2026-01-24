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
  title: 'Part-Time CFO Jobs UK',
  description: 'Part-time CFO jobs UK for finance leaders. Find Chief Financial Officer and Finance Director roles. 1-3 days/week, £900-£1,500/day.',
  keywords: 'part time cfo jobs uk, part time cfo, part time finance director jobs, part time fd jobs, fractional cfo jobs, part time chief financial officer',
  alternates: { canonical: 'https://fractional.quest/part-time-cfo-jobs-uk' },
  openGraph: {
    title: 'Part-Time CFO Jobs UK | Fractional Finance Director Roles',
    description: 'Find part-time CFO and Finance Director jobs across the UK. 1-3 days per week.',
    url: 'https://fractional.quest/part-time-cfo-jobs-uk',
  },
}

const PART_TIME_CFO_FAQS = [
  { question: "What is a part-time CFO?", answer: "A part-time CFO (also called fractional CFO) is a Chief Financial Officer who works with companies 1-3 days per week on an ongoing basis. This model provides senior finance leadership without the full-time commitment or cost." },
  { question: "What are typical part-time CFO day rates in the UK?", answer: "Part-time CFO day rates in the UK typically range from £900-£1,500 per day. For a 2-day per week engagement, annual costs are £90,000-£150,000 - significantly less than a full-time CFO package of £150,000-£250,000+." },
  { question: "How many days per week do part-time CFOs work?", answer: "Most part-time CFO roles involve 1-3 days per week, with 2 days being most common. Some executives work with multiple clients to build a portfolio career, while others combine part-time CFO work with other activities." },
  { question: "What's the difference between part-time and fractional CFO?", answer: "The terms are often used interchangeably. 'Part-time CFO' emphasizes the reduced hours, while 'fractional CFO' emphasizes the shared/portfolio nature of the role. Both refer to senior finance leaders working less than full-time." },
  { question: "Who hires part-time CFOs?", answer: "SMEs, startups, scale-ups, and PE portfolio companies commonly hire part-time CFOs. They get experienced finance leadership at a fraction of full-time cost - ideal for companies that need strategic finance guidance but not 5 days per week." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Part-Time Jobs', href: '/fractional-jobs-uk' }, { label: 'Part-Time CFO Jobs UK', href: '/part-time-cfo-jobs-uk' }]

async function getPartTimeCFOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cfo%' OR title ILIKE '%part%time%finance director%' OR title ILIKE '%fractional%cfo%' OR title ILIKE '%fractional%finance director%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cfo%' OR title ILIKE '%fractional%cfo%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 30), avgRate: 1200, remoteCount: Number(remoteCount?.count || 12) }
  } catch { return { total: 30, avgRate: 1200, remoteCount: 12 } }
}

async function getPartTimeCFOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cfo%' OR title ILIKE '%part%time%finance director%' OR title ILIKE '%fractional%cfo%' OR title ILIKE '%fractional%finance director%' OR (role_category = 'Finance' AND title NOT ILIKE '%interim%')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND role_category = 'Finance' AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cto%' OR title ILIKE '%part%time%cmo%' OR title ILIKE '%fractional%cto%' OR title ILIKE '%interim%cfo%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function PartTimeCFOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getPartTimeCFOStats(), getFeaturedCompanies(), getPartTimeCFOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Part-Time CFO Jobs UK | Fractional Finance Director Roles 2026" description="Find part-time CFO and Finance Director jobs across the UK." url="https://fractional.quest/part-time-cfo-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={PART_TIME_CFO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/part-time-cfo-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80" alt="Part-Time CFO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-teal-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Part-Time Finance Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Part-Time CFO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>part-time CFO</strong> and <strong>fractional Finance Director</strong> roles across the UK. Portfolio finance leadership positions, 1-3 days per week, day rates from £900-£1,500.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors">Browse Part-Time CFO Jobs</a>
                <Link href="/interim-cfo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Interim CFO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-emerald-400">{stats.total}+</div><div className="text-gray-400 text-sm">Part-Time CFO Roles</div></div><div><div className="text-3xl font-black text-emerald-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-emerald-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-emerald-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-emerald-50 border-y border-emerald-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Part-Time CFO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Part-Time CFO & Fractional Finance Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live part-time finance roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Finance" ctaLink="/fractional-cfo-jobs-uk" ctaText="View All CFO Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Part-Time CFO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Part-Time CFO Day Rate Calculator</h2></div><RoleCalculator role="cfo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Part-Time CFOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-emerald-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Part-Time CFO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>part-time CFO</strong> model (also known as fractional CFO) has become increasingly popular as companies recognise they can access senior finance leadership without the full-time cost. This creates opportunities for experienced finance professionals to build portfolio careers.</p><p>Unlike <Link href="/interim-cfo-jobs-uk" className="text-emerald-600 hover:underline">interim CFO roles</Link> which are full-time for a fixed period, part-time CFO positions offer ongoing engagement typically 1-3 days per week. Many <Link href="/fractional-cfo-jobs-uk" className="text-emerald-600 hover:underline">fractional CFOs</Link> work with multiple clients simultaneously.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Who Hires Part-Time CFOs?</h3><ul className="space-y-2 text-gray-600"><li><strong>SMEs</strong> - Companies with £2-20m revenue needing finance leadership</li><li><strong>Startups</strong> - Series A/B companies preparing for growth</li><li><strong>Scale-ups</strong> - Fast-growing companies building finance function</li><li><strong>PE portfolio companies</strong> - Investor-backed businesses needing financial rigour</li><li><strong>Family businesses</strong> - Professionalising finance operations</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CFO Jobs</h4><p className="text-sm text-gray-600">All fractional finance roles</p></Link><Link href="/interim-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CFO Jobs</h4><p className="text-sm text-gray-600">Full-time temporary roles</p></Link><Link href="/fractional-cfo-salary" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">CFO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/hire-fractional-cfo" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CFO</h4><p className="text-sm text-gray-600">Hiring guide</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Part-Time CFOs</h2></div><IR35Calculator defaultDayRate={1200} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Part-Time CFO Jobs UK</h2></div><FAQ items={PART_TIME_CFO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Part-Time Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Part-Time Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cfo" />
    </div>
  )
}
