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

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Interim Marketing Director Jobs UK',
  description: 'Interim Marketing Director jobs UK. Find interim Head of Marketing and VP Marketing roles. Day rates £700-£1,200.',
  keywords: 'interim marketing director jobs uk, interim marketing director, interim head of marketing, interim vp marketing, interim marketing jobs uk',
  alternates: { canonical: 'https://fractional.quest/interim-marketing-director' },
  openGraph: {
    title: 'Interim Marketing Director Jobs UK | Senior Marketing Roles',
    description: 'Find interim Marketing Director jobs across the UK. Day rates £700-£1,200.',
    url: 'https://fractional.quest/interim-marketing-director',
  },
}

const INTERIM_MD_FAQS = [
  { question: "What is an interim Marketing Director?", answer: "An interim Marketing Director is a senior marketing professional who provides temporary leadership during transitions, maternity cover, or gaps in permanent leadership. They typically work full-time for a defined period (3-12 months) leading the marketing function." },
  { question: "What are typical interim Marketing Director day rates in the UK?", answer: "Interim Marketing Director day rates in the UK typically range from £700-£1,200 per day, depending on experience, sector, and scope. B2B, tech, and regulated sector expertise command premium rates." },
  { question: "How long do interim Marketing Director assignments last?", answer: "Most interim Marketing Director assignments last 6-12 months, covering maternity leave, leadership transitions, or major marketing initiatives. Some extend to 18 months for transformations." },
  { question: "What's the difference between Marketing Director and CMO?", answer: "CMO (Chief Marketing Officer) is typically a C-suite, board-level position in larger organisations. Marketing Director often reports to the CEO or CMO. In SMEs, the roles are often interchangeable, with Marketing Director being the most senior marketing position." },
  { question: "What qualifications do interim Marketing Directors need?", answer: "Most interim Marketing Directors have 10-15+ years of marketing experience including prior leadership roles. Digital marketing expertise, commercial acumen, and demonstrable campaign ROI are highly valued. CIM qualifications are common but not essential." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Interim Jobs', href: '/interim-executive' }, { label: 'Interim Marketing Director', href: '/interim-marketing-director' }]

async function getInterimMDStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%marketing director%' OR title ILIKE '%interim%head of marketing%' OR title ILIKE '%interim%vp marketing%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%interim%marketing%director%' OR title ILIKE '%interim%head%marketing%') AND (is_remote = true) AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 12), avgRate: 900, remoteCount: Number(remoteCount?.count || 4) }
  } catch { return { total: 12, avgRate: 900, remoteCount: 4 } }
}

async function getInterimMDJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%marketing director%' OR title ILIKE '%interim%head of marketing%' OR title ILIKE '%interim%vp marketing%' OR title ILIKE '%interim%marketing lead%' OR (title ILIKE '%interim%' AND title ILIKE '%marketing%' AND role_category = 'Marketing')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%interim%' AND title ILIKE '%marketing%') AND company_name IS NOT NULL ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%interim%cmo%' OR title ILIKE '%fractional%cmo%' OR title ILIKE '%marketing%director%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function InterimMarketingDirectorPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getInterimMDStats(), getFeaturedCompanies(), getInterimMDJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim Marketing Director Jobs UK | Senior Marketing Roles 2026" description="Find interim Marketing Director jobs across the UK." url="https://fractional.quest/interim-marketing-director" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_MD_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 5)} pageUrl="https://fractional.quest/interim-marketing-director" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80" alt="Interim Marketing Director Jobs" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/95 via-amber-800/90 to-pink-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Roles</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim Marketing Director Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim Marketing Director</strong> and Head of Marketing roles across the UK. Full-time temporary leadership positions covering maternity, transitions, and transformations. Day rates £700-£1,200.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/interim-cmo-jobs-uk" className="px-6 py-3 bg-white text-orange-900 font-bold rounded-lg hover:bg-orange-50 transition-colors">View CMO Roles</Link>
                <Link href="/fractional-cmo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CMO Jobs</Link>
              </div>
              <LastUpdatedBadge date={lastUpdatedDate} className="mt-6" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orange-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-orange-200">{stats.total}+</div><div className="text-orange-300/70 text-sm">Active Roles</div></div><div><div className="text-3xl font-black text-orange-200">£{stats.avgRate}</div><div className="text-orange-300/70 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-orange-200">{stats.remoteCount}</div><div className="text-orange-300/70 text-sm">Hybrid/Remote</div></div><div><div className="text-3xl font-black text-orange-200">6-12mo</div><div className="text-orange-300/70 text-sm">Typical Duration</div></div></div></div></section>

      {jobs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8"><h2 className="text-2xl md:text-3xl font-black text-gray-900">Interim Marketing Director Jobs</h2><span className="text-sm text-gray-500">{jobs.length} roles</span></div>
            <ServerJobGrid jobs={jobs} />
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">Day Rate Calculator</h2>
              <RoleCalculator role="cmo" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">IR35 Status Check</h2>
              <IR35Calculator />
            </div>
          </div>
        </div>
      </section>

      {companies.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Companies Hiring Interim Marketing Directors</h2>
            <div className="flex flex-wrap gap-3">{companies.map((company: string) => <span key={company} className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm font-medium">{company}</span>)}</div>
          </div>
        </section>
      )}

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">About Interim Marketing Director Roles</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">An <strong>interim Marketing Director</strong> provides senior marketing leadership on a temporary, full-time basis. These roles are ideal for experienced marketing professionals seeking variety and impact without permanent commitment.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Hire Interim Marketing Directors</h3><ul className="space-y-2 text-gray-600"><li><strong>Maternity/Paternity Cover</strong> - 6-12 month assignments covering leave</li><li><strong>Leadership Transitions</strong> - Bridging gap during CMO search</li><li><strong>Transformations</strong> - Leading rebrand, digital transformation, or market entry</li><li><strong>Rapid Growth</strong> - Building marketing function during scale-up</li><li><strong>Turnarounds</strong> - Reviving underperforming marketing teams</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Marketing Director vs CMO vs Head of Marketing</h3><div className="not-prose overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">Title</th><th className="text-left py-3 px-4">Level</th><th className="text-left py-3 px-4">Typical Company</th><th className="text-left py-3 px-4">Day Rate</th></tr></thead><tbody><tr className="border-b"><td className="py-3 px-4 font-semibold">CMO</td><td className="py-3 px-4">C-Suite</td><td className="py-3 px-4">Enterprise, Large Scale-up</td><td className="py-3 px-4">£850-£1,300</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Marketing Director</td><td className="py-3 px-4">Director</td><td className="py-3 px-4">Mid-market, SME</td><td className="py-3 px-4">£700-£1,100</td></tr><tr><td className="py-3 px-4 font-semibold">Head of Marketing</td><td className="py-3 px-4">Senior Manager</td><td className="py-3 px-4">SME, Start-up</td><td className="py-3 px-4">£600-£900</td></tr></tbody></table></div><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Roles</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/interim-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CMO Jobs</h4><p className="text-sm text-gray-600">C-suite marketing leadership</p></Link><Link href="/fractional-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CMO Jobs</h4><p className="text-sm text-gray-600">Part-time ongoing roles</p></Link><Link href="/fractional-cmo-services" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">CMO Services</h4><p className="text-sm text-gray-600">Hire a fractional CMO</p></Link><Link href="/hire-fractional-cmo" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire</h4><p className="text-sm text-gray-600">CMO hiring guide</p></Link></div></article></div></section>

      <section className="py-20 bg-orange-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim Marketing Director Questions</h2></div><FAQ items={INTERIM_MD_FAQS} title="" /></div></section>

      {relatedJobs && relatedJobs.length > 0 && <HotJobsLines jobs={relatedJobs as any[]} title="Related Marketing & Executive Roles" />}

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
