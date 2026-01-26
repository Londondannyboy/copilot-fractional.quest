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
  title: 'Part-Time CCO Jobs UK | Commercial Director Roles 2026',
  description: 'Part-time CCO jobs UK for commercial leaders. Find Chief Commercial Officer and Business Development Director roles. 1-3 days/week, £800-£1,200/day.',
  keywords: 'part time cco jobs uk, part time cco, part time commercial director jobs, fractional cco jobs, part time chief commercial officer, business development director jobs',
  alternates: { canonical: 'https://fractional.quest/part-time-cco-jobs-uk' },
  openGraph: {
    title: 'Part-Time CCO Jobs UK | Fractional Commercial Director Roles',
    description: 'Find part-time CCO and Commercial Director jobs across the UK. 1-3 days per week.',
    url: 'https://fractional.quest/part-time-cco-jobs-uk',
  },
}

const PART_TIME_CCO_FAQS = [
  { question: "What is a part-time CCO?", answer: "A part-time CCO (also called fractional CCO) is a Chief Commercial Officer who works with companies 1-3 days per week on an ongoing basis. This model provides senior commercial leadership, revenue strategy, and business development expertise without the full-time commitment or cost." },
  { question: "What are typical part-time CCO day rates in the UK?", answer: "Part-time CCO day rates in the UK typically range from £800-£1,200 per day. For a 2-day per week engagement, annual costs are £80,000-£120,000 - significantly less than a full-time CCO package." },
  { question: "How many days per week do part-time CCOs work?", answer: "Most part-time CCO roles involve 1-3 days per week, with 2 days being most common. Many CCOs work with multiple clients to build a portfolio career across different industries." },
  { question: "What's the difference between part-time and fractional CCO?", answer: "The terms are often used interchangeably. 'Part-time CCO' emphasizes the reduced hours, while 'fractional CCO' emphasizes the shared/portfolio nature. Both refer to senior commercial leaders working less than full-time." },
  { question: "Who hires part-time CCOs?", answer: "B2B companies, scale-ups, SMEs, and PE portfolio companies commonly hire part-time CCOs. They get experienced commercial leadership at a fraction of full-time cost - ideal for companies needing revenue growth strategy, partnerships, and sales transformation." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Part-Time Jobs', href: '/fractional-jobs-uk' }, { label: 'Part-Time CCO Jobs UK', href: '/part-time-cco-jobs-uk' }]

async function getPartTimeCCOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cco%' OR title ILIKE '%part%time%commercial director%' OR title ILIKE '%fractional%cco%' OR title ILIKE '%fractional%commercial director%' OR title ILIKE '%part%time%business development director%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cco%' OR title ILIKE '%fractional%cco%' OR title ILIKE '%commercial director%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 15), avgRate: 1000, remoteCount: Number(remoteCount?.count || 8) }
  } catch { return { total: 15, avgRate: 1000, remoteCount: 8 } }
}

async function getPartTimeCCOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cco%' OR title ILIKE '%part%time%commercial director%' OR title ILIKE '%fractional%cco%' OR title ILIKE '%fractional%commercial director%' OR title ILIKE '%part%time%business development director%' OR title ILIKE '%commercial%' OR (role_category = 'Commercial' AND title NOT ILIKE '%interim%')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (role_category = 'Commercial' OR title ILIKE '%commercial%' OR title ILIKE '%cco%' OR title ILIKE '%business development%') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cmo%' OR title ILIKE '%part%time%coo%' OR title ILIKE '%fractional%cco%' OR title ILIKE '%interim%cco%' OR title ILIKE '%sales director%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function PartTimeCCOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getPartTimeCCOStats(), getFeaturedCompanies(), getPartTimeCCOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Part-Time CCO Jobs UK | Fractional Commercial Director Roles 2026" description="Find part-time CCO and Commercial Director jobs across the UK." url="https://fractional.quest/part-time-cco-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={PART_TIME_CCO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/part-time-cco-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80" alt="Part-Time CCO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/95 via-amber-800/90 to-yellow-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Part-Time Commercial Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Part-Time CCO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>part-time CCO</strong> and <strong>fractional Commercial Director</strong> roles across the UK. Portfolio commercial leadership positions, 1-3 days per week, day rates from £800-£1,200.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-orange-900 font-bold rounded-lg hover:bg-orange-50 transition-colors">Browse Part-Time CCO Jobs</a>
                <Link href="/interim-cco-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Interim CCO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-orange-400">{stats.total}+</div><div className="text-gray-400 text-sm">Part-Time CCO Roles</div></div><div><div className="text-3xl font-black text-orange-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-orange-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-orange-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-orange-50 border-y border-orange-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Part-Time CCO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Part-Time CCO & Fractional Commercial Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live part-time commercial roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Commercial" ctaLink="/fractional-cco-jobs-uk" ctaText="View All CCO Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Part-Time CCO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Part-Time CCO Day Rate Calculator</h2></div><RoleCalculator role="cco" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Part-Time CCOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-orange-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Part-Time CCO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>part-time CCO</strong> model (also known as fractional CCO) has become increasingly popular as companies recognise they can access senior commercial leadership without the full-time cost. This creates opportunities for experienced commercial leaders to build portfolio careers.</p><p>Unlike <Link href="/interim-cco-jobs-uk" className="text-orange-600 hover:underline">interim CCO roles</Link> which are full-time for a fixed period, part-time CCO positions offer ongoing engagement typically 1-3 days per week. Many <Link href="/fractional-cco-jobs-uk" className="text-orange-600 hover:underline">fractional CCOs</Link> work with multiple clients simultaneously.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Who Hires Part-Time CCOs?</h3><ul className="space-y-2 text-gray-600"><li><strong>B2B SaaS Companies</strong> - Companies scaling their revenue operations</li><li><strong>Scale-ups</strong> - Fast-growing businesses building commercial teams</li><li><strong>SMEs</strong> - Companies needing strategic commercial leadership</li><li><strong>PE Portfolio Companies</strong> - Businesses focused on revenue growth</li><li><strong>Startups</strong> - Early-stage companies establishing go-to-market strategy</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cco-jobs-uk" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CCO Jobs</h4><p className="text-sm text-gray-600">All fractional commercial roles</p></Link><Link href="/interim-cco-jobs-uk" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CCO Jobs</h4><p className="text-sm text-gray-600">Full-time temporary roles</p></Link><Link href="/fractional-cco-salary" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">CCO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/hire-fractional-cco" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CCO</h4><p className="text-sm text-gray-600">Hiring guide</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Part-Time CCOs</h2></div><IR35Calculator defaultDayRate={1000} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Part-Time CCO Jobs UK</h2></div><FAQ items={PART_TIME_CCO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Part-Time Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Part-Time Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cco" />
    </div>
  )
}
