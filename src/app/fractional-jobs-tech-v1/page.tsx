import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createDbQuery } from '@/lib/db'
import { FAQ } from '@/components/seo/FAQ'
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
  title: 'Fractional Jobs in Tech 2026 | Technology Industry Executive Roles',
  description: 'Fractional jobs in tech: CTO, CPO, CISO roles in startups, SaaS, and fintech. Day rates £900-£1,500.',
  keywords: 'fractional jobs tech, fractional cto startup, tech industry executive jobs, saas fractional jobs, fintech fractional jobs, technology leadership',
  alternates: { canonical: 'https://fractional.quest/fractional-jobs-tech' },
  openGraph: {
    title: 'Fractional Jobs in Tech | Technology Industry Executive Roles',
    description: 'Find fractional executive jobs in tech startups, SaaS, and technology companies.',
    url: 'https://fractional.quest/fractional-jobs-tech',
  },
}

const TECH_FRACTIONAL_FAQS = [
  { question: "What fractional roles are common in tech companies?", answer: "Tech companies commonly hire: Fractional CTO (technical strategy, architecture), Fractional CPO (product leadership), Fractional CISO (security and compliance), Fractional CFO (financial planning, fundraising), and Fractional CMO (growth marketing, demand gen)." },
  { question: "Do tech startups hire fractional executives?", answer: "Yes, tech startups are among the biggest hirers of fractional executives. Early-stage startups need C-suite expertise but can't afford or don't need full-time leaders. Fractional CTOs and CFOs are particularly common at Series A and B startups." },
  { question: "What day rates do fractional tech executives earn?", answer: "Fractional tech executive day rates typically range from £900-£1,500 in the UK. Fractional CTOs with strong SaaS or fintech experience command £1,000-£1,400/day. Fractional CISOs in regulated fintech earn £1,100-£1,500/day." },
  { question: "What tech stack experience do companies look for?", answer: "It varies by role and company: Startups want modern stacks (React, Node, AWS/GCP), SaaS companies value specific platforms (Salesforce, HubSpot), fintech needs regulated tech experience, and enterprise tech values legacy modernisation experience." },
  { question: "Can fractional executives help with fundraising?", answer: "Yes, particularly fractional CFOs and CEOs. They help with financial modelling, pitch decks, investor introductions, due diligence preparation, and post-investment reporting. Many fractional CFOs specialise in helping startups raise Series A through C." },
]

const TECH_SECTORS = [
  { name: 'SaaS', description: 'Software-as-a-service companies', roles: 'CTO, CPO, CMO' },
  { name: 'Fintech', description: 'Financial technology', roles: 'CTO, CISO, CFO' },
  { name: 'Healthtech', description: 'Healthcare technology', roles: 'CTO, CPO, CISO' },
  { name: 'E-commerce', description: 'Online retail and marketplaces', roles: 'CTO, CMO, COO' },
  { name: 'AI/ML', description: 'Artificial intelligence startups', roles: 'CTO, CPO, CEO' },
  { name: 'Cybersecurity', description: 'Security technology', roles: 'CISO, CTO, CEO' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Fractional Jobs', href: '/fractional-jobs-uk' }, { label: 'Tech Industry', href: '/fractional-jobs-tech' }]

async function getTechJobStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%fractional%' OR title ILIKE '%part%time%') AND (role_category IN ('Technology', 'Product', 'Security') OR title ILIKE '%tech%' OR title ILIKE '%software%' OR title ILIKE '%saas%' OR title ILIKE '%fintech%')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND is_remote = true AND (title ILIKE '%fractional%' OR title ILIKE '%part%time%') AND role_category IN ('Technology', 'Product', 'Security')`
    return { total: Number(countResult?.count || 35), avgRate: 1150, remoteCount: Number(remoteCount?.count || 20) }
  } catch { return { total: 35, avgRate: 1150, remoteCount: 20 } }
}

async function getTechFractionalJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%fractional%' OR title ILIKE '%part%time%' OR title ILIKE '%interim%') AND (role_category IN ('Technology', 'Product', 'Security') OR title ILIKE '%tech%' OR title ILIKE '%software%' OR title ILIKE '%saas%' OR title ILIKE '%fintech%' OR title ILIKE '%cto%' OR title ILIKE '%cpo%' OR title ILIKE '%ciso%') ORDER BY posted_date DESC NULLS LAST LIMIT 24`
    return jobs as any[]
  } catch { return [] }
}

export default async function FractionalJobsTechPage() {
  const [stats, jobs] = await Promise.all([getTechJobStats(), getTechFractionalJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional Jobs in Tech | Technology Industry Executive Roles 2026" description="Find fractional executive jobs in tech startups and technology companies." url="https://fractional.quest/fractional-jobs-tech" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={TECH_FRACTIONAL_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/fractional-jobs-tech" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80" alt="Fractional Jobs in Tech" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/95 via-purple-800/90 to-indigo-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Technology Industry</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional Jobs in Tech</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>fractional executive roles</strong> in <strong>tech startups, SaaS, fintech</strong>, and technology companies. CTO, CPO, CISO, and CFO positions with day rates from £900-£1,500.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-violet-900 font-bold rounded-lg hover:bg-violet-50 transition-colors">Browse Tech Jobs</a>
                <Link href="/fractional-cto-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">CTO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-violet-400">{stats.total}+</div><div className="text-gray-400 text-sm">Tech Industry Roles</div></div><div><div className="text-3xl font-black text-violet-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-violet-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-violet-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-violet-50 border-y border-violet-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Tech Fractional Jobs" maxJobs={10} /></div></section>)}

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">By Sector</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Tech Sectors Hiring Fractional Leaders</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_SECTORS.map((sector) => (
              <div key={sector.name} className="p-6 border rounded-xl hover:border-violet-300 transition-colors">
                <div className="text-xl font-black text-gray-900 mb-2">{sector.name}</div>
                <div className="text-gray-500 text-sm mb-3">{sector.description}</div>
                <div className="text-violet-600 text-sm font-medium">Common roles: {sector.roles}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="jobs" className="py-16 md:py-20 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Tech Industry Fractional Jobs</h2></div><p className="text-gray-500">{jobs.length}+ live tech roles</p></div><ServerJobGrid jobs={jobs} ctaLink="/fractional-jobs-uk" ctaText="View All Jobs" maxJobs={24} showViewAll={true} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">Fractional Executives in Tech</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The technology industry has embraced fractional leadership more than any other sector. <strong>Tech startups and scale-ups</strong> need experienced C-suite guidance but often can't afford or don't need full-time executives until Series B or beyond.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why Tech Companies Hire Fractional</h3><ul className="space-y-2 text-gray-600"><li><strong>Capital efficiency</strong> - Get C-suite expertise without full-time cost</li><li><strong>Fundraising support</strong> - CFOs for financial modelling and investor relations</li><li><strong>Technical scaling</strong> - CTOs for architecture decisions and team building</li><li><strong>Product-market fit</strong> - CPOs for product strategy and roadmap</li><li><strong>Security compliance</strong> - CISOs for SOC 2, ISO 27001, fintech regulations</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cto-jobs-uk" className="p-4 border rounded-lg hover:border-violet-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CTO Jobs</h4><p className="text-sm text-gray-600">Technical leadership roles</p></Link><Link href="/fractional-cpo-jobs-uk" className="p-4 border rounded-lg hover:border-violet-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CPO Jobs</h4><p className="text-sm text-gray-600">Product leadership roles</p></Link><Link href="/fractional-ciso-jobs-uk" className="p-4 border rounded-lg hover:border-violet-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CISO Jobs</h4><p className="text-sm text-gray-600">Security leadership roles</p></Link><Link href="/remote-fractional-jobs" className="p-4 border rounded-lg hover:border-violet-300 transition-colors"><h4 className="font-bold text-gray-900">Remote Tech Jobs</h4><p className="text-sm text-gray-600">Work from anywhere roles</p></Link></div></article></div></section>

      <section className="py-20 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional Jobs in Tech</h2></div><FAQ items={TECH_FRACTIONAL_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
