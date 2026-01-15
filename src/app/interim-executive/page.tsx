import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createDbQuery } from '@/lib/db'
import { FAQ } from '@/components/seo/FAQ'
import { ServerJobGrid } from '@/components/ServerJobGrid'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema, LastUpdatedBadge } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { HotJobsLines } from '@/components/HotJobsLines'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Interim Executive Jobs UK',
  description: 'Interim executive jobs UK. Find interim CEO, CFO, CTO, CMO, COO, CHRO roles. Day rates £800-£2,000.',
  keywords: 'interim executive jobs uk, interim c-suite jobs, interim director jobs, interim management, interim leadership roles uk',
  alternates: { canonical: 'https://fractional.quest/interim-executive' },
  openGraph: {
    title: 'Interim Executive Jobs UK | C-Suite & Director Roles',
    description: 'Find interim executive and C-suite jobs across the UK. Day rates £800-£2,000.',
    url: 'https://fractional.quest/interim-executive',
  },
}

const INTERIM_EXECUTIVE_FAQS = [
  { question: "What is an interim executive?", answer: "An interim executive is a senior leader who joins an organisation temporarily to fill a leadership gap, drive a transformation, or manage a specific project. Unlike permanent hires, interim executives typically work full-time for 3-18 months, bringing immediate expertise without long-term commitment." },
  { question: "What types of interim executive roles are available?", answer: "Common interim executive roles include: Interim CEO/Managing Director, Interim CFO/Finance Director, Interim CTO/Technology Director, Interim CMO/Marketing Director, Interim COO/Operations Director, Interim CHRO/HR Director, and Interim CISO/Security Director." },
  { question: "What are typical interim executive day rates in the UK?", answer: "Interim executive day rates in the UK range from £800-£2,000+ depending on role and seniority. Interim CFOs typically earn £850-£1,200/day, CTOs £900-£1,400/day, CEOs £1,200-£2,000/day. Complex turnarounds and regulated sectors command premium rates." },
  { question: "When should a company hire an interim executive?", answer: "Companies hire interim executives for: leadership gaps (departures, illness), transformations (digital, operational), turnarounds (crisis management), M&A transitions (integration, carve-outs), special projects (IPO preparation, new market entry), and maternity/paternity cover." },
  { question: "What's the difference between interim and fractional executives?", answer: "Interim executives work full-time for a fixed period (typically 3-12 months) on intensive projects. Fractional executives work part-time (1-3 days/week) on an ongoing basis. Interim suits urgent needs; fractional suits ongoing strategic support." },
]

const INTERIM_ROLES = [
  { role: 'CEO', href: '/interim-ceo-jobs-uk', description: 'Chief Executive Officer', dayRate: '£1,200-£2,000', color: 'amber' },
  { role: 'CFO', href: '/interim-cfo-jobs-uk', description: 'Chief Financial Officer', dayRate: '£850-£1,200', color: 'emerald' },
  { role: 'CTO', href: '/interim-cto-jobs-uk', description: 'Chief Technology Officer', dayRate: '£900-£1,400', color: 'cyan' },
  { role: 'CMO', href: '/interim-cmo-jobs-uk', description: 'Chief Marketing Officer', dayRate: '£850-£1,300', color: 'amber' },
  { role: 'COO', href: '/interim-coo-jobs-uk', description: 'Chief Operating Officer', dayRate: '£900-£1,300', color: 'slate' },
  { role: 'CHRO', href: '/interim-chro-jobs-uk', description: 'Chief HR Officer', dayRate: '£800-£1,200', color: 'purple' },
  { role: 'CPO', href: '/interim-cpo-jobs-uk', description: 'Chief Product Officer', dayRate: '£900-£1,300', color: 'indigo' },
  { role: 'CISO', href: '/interim-ciso-jobs-uk', description: 'Chief Security Officer', dayRate: '£1,000-£1,500', color: 'red' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Interim Executive Jobs', href: '/interim-executive' }]

async function getInterimExecutiveStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND title ILIKE '%interim%' AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND title ILIKE '%interim%' AND is_remote = true AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 50), avgRate: 1100, remoteCount: Number(remoteCount?.count || 15) }
  } catch { return { total: 50, avgRate: 1100, remoteCount: 15 } }
}

async function getInterimExecutiveJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND title ILIKE '%interim%' AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

export default async function InterimExecutivePage() {
  const [stats, jobs] = await Promise.all([getInterimExecutiveStats(), getInterimExecutiveJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Interim Executive Jobs UK | C-Suite & Director Roles 2025" description="Find interim executive and C-suite jobs across the UK." url="https://fractional.quest/interim-executive" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={INTERIM_EXECUTIVE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80" alt="Interim Executive Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-800/90 to-gray-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Interim Executive Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Interim Executive Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>interim executive</strong> and <strong>interim C-suite</strong> roles across the UK. Full-time temporary leadership positions with day rates from £800-£2,000.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition-colors">Browse Interim Jobs</a>
                <Link href="/fractional-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-white">{stats.total}+</div><div className="text-gray-400 text-sm">Interim Executive Roles</div></div><div><div className="text-3xl font-black text-white">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-white">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-white"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-gray-50 border-y border-gray-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Interim Executive Jobs" maxJobs={10} /></div></section>)}

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Browse by Role</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Interim Executive Roles</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INTERIM_ROLES.map((item) => (
              <Link key={item.role} href={item.href} className="group p-6 border rounded-xl hover:border-gray-400 hover:shadow-lg transition-all">
                <div className="text-2xl font-black text-gray-900 mb-1">Interim {item.role}</div>
                <div className="text-gray-500 text-sm mb-3">{item.description}</div>
                <div className="text-gray-900 font-semibold">{item.dayRate}/day</div>
                <div className="mt-4 text-gray-400 group-hover:text-gray-900 transition-colors text-sm">View jobs →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="jobs" className="py-16 md:py-20 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">All Interim Executive Jobs UK</h2></div><p className="text-gray-500">{jobs.length}+ live interim roles</p></div><ServerJobGrid jobs={jobs} ctaLink="/fractional-jobs-uk" ctaText="View All Jobs" maxJobs={12} showViewAll={true} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">The UK Interim Executive Market</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>interim executive</strong> market in the UK has matured significantly, with companies increasingly turning to experienced interim leaders for critical transitions, transformations, and leadership gaps. Interim executives provide immediate expertise without the lengthy recruitment process of permanent hires.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Interim Executives</h3><ul className="space-y-2 text-gray-600"><li><strong>Leadership gaps</strong> - Sudden departures, illness, or garden leave</li><li><strong>Transformations</strong> - Digital, operational, or cultural change programmes</li><li><strong>Turnarounds</strong> - Crisis management and business recovery</li><li><strong>M&A transitions</strong> - Integration, carve-outs, due diligence</li><li><strong>Special projects</strong> - IPO preparation, new market entry, system implementations</li><li><strong>Maternity/paternity cover</strong> - Maintaining leadership continuity</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Interim vs Fractional vs Permanent</h3><div className="not-prose overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">Type</th><th className="text-left py-3 px-4">Commitment</th><th className="text-left py-3 px-4">Duration</th><th className="text-left py-3 px-4">Best For</th></tr></thead><tbody><tr className="border-b"><td className="py-3 px-4 font-semibold">Interim</td><td className="py-3 px-4">Full-time</td><td className="py-3 px-4">3-18 months</td><td className="py-3 px-4">Urgent gaps, transformations</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Fractional</td><td className="py-3 px-4">Part-time (1-3 days/week)</td><td className="py-3 px-4">Ongoing</td><td className="py-3 px-4">Strategic support, SMEs</td></tr><tr><td className="py-3 px-4 font-semibold">Permanent</td><td className="py-3 px-4">Full-time</td><td className="py-3 px-4">Indefinite</td><td className="py-3 px-4">Long-term leadership</td></tr></tbody></table></div><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-jobs-uk" className="p-4 border rounded-lg hover:border-gray-400 transition-colors"><h4 className="font-bold text-gray-900">Fractional Jobs UK</h4><p className="text-sm text-gray-600">Part-time executive roles</p></Link><Link href="/part-time-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-gray-400 transition-colors"><h4 className="font-bold text-gray-900">Part-Time Executive Jobs</h4><p className="text-sm text-gray-600">Flexible leadership positions</p></Link></div></article></div></section>

      <section className="py-20 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Interim Executive Jobs</h2></div><FAQ items={INTERIM_EXECUTIVE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
