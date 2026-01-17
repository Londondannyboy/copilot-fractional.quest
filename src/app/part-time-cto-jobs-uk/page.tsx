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
  title: 'Part-Time CTO Jobs UK',
  description: 'Part-time CTO jobs UK for technology leaders. Find Chief Technology Officer and Tech Director roles. 1-3 days/week, £900-£1,400/day.',
  keywords: 'part time cto jobs uk, part time cto, part time technology director jobs, fractional cto jobs, part time chief technology officer',
  alternates: { canonical: 'https://fractional.quest/part-time-cto-jobs-uk' },
  openGraph: {
    title: 'Part-Time CTO Jobs UK | Fractional Technology Director Roles',
    description: 'Find part-time CTO and Technology Director jobs across the UK. 1-3 days per week.',
    url: 'https://fractional.quest/part-time-cto-jobs-uk',
  },
}

const PART_TIME_CTO_FAQS = [
  { question: "What is a part-time CTO?", answer: "A part-time CTO (also called fractional CTO) is a Chief Technology Officer who works with companies 1-3 days per week on an ongoing basis. This model provides senior technology leadership without the full-time commitment or cost." },
  { question: "What are typical part-time CTO day rates in the UK?", answer: "Part-time CTO day rates in the UK typically range from £900-£1,400 per day. For a 2-day per week engagement, annual costs are £90,000-£140,000 - significantly less than a full-time CTO package." },
  { question: "How many days per week do part-time CTOs work?", answer: "Most part-time CTO roles involve 1-3 days per week, with 2 days being most common. Many CTOs work with multiple clients to build a portfolio career." },
  { question: "What's the difference between part-time and fractional CTO?", answer: "The terms are often used interchangeably. 'Part-time CTO' emphasizes the reduced hours, while 'fractional CTO' emphasizes the shared/portfolio nature. Both refer to senior technology leaders working less than full-time." },
  { question: "Who hires part-time CTOs?", answer: "Startups, scale-ups, SMEs, and PE portfolio companies commonly hire part-time CTOs. They get experienced technology leadership at a fraction of full-time cost - ideal for companies needing strategic technical guidance." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Part-Time Jobs', href: '/fractional-jobs-uk' }, { label: 'Part-Time CTO Jobs UK', href: '/part-time-cto-jobs-uk' }]

async function getPartTimeCTOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cto%' OR title ILIKE '%part%time%technology director%' OR title ILIKE '%fractional%cto%' OR title ILIKE '%fractional%technology director%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cto%' OR title ILIKE '%fractional%cto%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 20), avgRate: 1100, remoteCount: Number(remoteCount?.count || 12) }
  } catch { return { total: 20, avgRate: 1100, remoteCount: 12 } }
}

async function getPartTimeCTOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cto%' OR title ILIKE '%part%time%technology director%' OR title ILIKE '%fractional%cto%' OR title ILIKE '%fractional%technology director%' OR (role_category = 'Technology' AND title NOT ILIKE '%interim%')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND role_category = 'Technology' AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%part%time%cfo%' OR title ILIKE '%part%time%cmo%' OR title ILIKE '%fractional%cto%' OR title ILIKE '%interim%cto%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function PartTimeCTOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getPartTimeCTOStats(), getFeaturedCompanies(), getPartTimeCTOJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Part-Time CTO Jobs UK | Fractional Technology Director Roles 2026" description="Find part-time CTO and Technology Director jobs across the UK." url="https://fractional.quest/part-time-cto-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={PART_TIME_CTO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/part-time-cto-jobs-uk" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80" alt="Part-Time CTO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/95 via-teal-800/90 to-blue-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Part-Time Technology Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Part-Time CTO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>part-time CTO</strong> and <strong>fractional Technology Director</strong> roles across the UK. Portfolio technology leadership positions, 1-3 days per week, day rates from £900-£1,400.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-cyan-900 font-bold rounded-lg hover:bg-cyan-50 transition-colors">Browse Part-Time CTO Jobs</a>
                <Link href="/interim-cto-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Interim CTO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-cyan-400">{stats.total}+</div><div className="text-gray-400 text-sm">Part-Time CTO Roles</div></div><div><div className="text-3xl font-black text-cyan-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-cyan-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-cyan-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-cyan-50 border-y border-cyan-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Part-Time CTO Jobs" maxJobs={10} /></div></section>)}

      <section id="jobs" className="py-16 md:py-20 bg-white"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Part-Time CTO & Fractional Technology Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live part-time technology roles</p></div><ServerJobGrid jobs={jobs} roleCategory="Technology" ctaLink="/fractional-cto-jobs-uk" ctaText="View All CTO Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Part-Time CTO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Part-Time CTO Day Rate Calculator</h2></div><RoleCalculator role="cto" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Part-Time CTOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-cyan-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Part-Time CTO Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>part-time CTO</strong> model (also known as fractional CTO) has become increasingly popular as companies recognise they can access senior technology leadership without the full-time cost. This creates opportunities for experienced tech leaders to build portfolio careers.</p><p>Unlike <Link href="/interim-cto-jobs-uk" className="text-cyan-600 hover:underline">interim CTO roles</Link> which are full-time for a fixed period, part-time CTO positions offer ongoing engagement typically 1-3 days per week. Many <Link href="/fractional-cto-jobs-uk" className="text-cyan-600 hover:underline">fractional CTOs</Link> work with multiple clients simultaneously.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Who Hires Part-Time CTOs?</h3><ul className="space-y-2 text-gray-600"><li><strong>Startups</strong> - Companies building their technical foundation</li><li><strong>Scale-ups</strong> - Fast-growing companies scaling their engineering</li><li><strong>SMEs</strong> - Companies needing strategic technology leadership</li><li><strong>PE portfolio companies</strong> - Businesses needing tech transformation</li><li><strong>Non-tech companies</strong> - Organisations digitising operations</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cto-jobs-uk" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CTO Jobs</h4><p className="text-sm text-gray-600">All fractional technology roles</p></Link><Link href="/interim-cto-jobs-uk" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CTO Jobs</h4><p className="text-sm text-gray-600">Full-time temporary roles</p></Link><Link href="/fractional-cto-salary" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">CTO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/hire-fractional-cto" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CTO</h4><p className="text-sm text-gray-600">Hiring guide</p></Link></div></article></div></section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Part-Time CTOs</h2></div><IR35Calculator defaultDayRate={1100} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Part-Time CTO Jobs UK</h2></div><FAQ items={PART_TIME_CTO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Part-Time Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Part-Time Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cto" />
    </div>
  )
}
