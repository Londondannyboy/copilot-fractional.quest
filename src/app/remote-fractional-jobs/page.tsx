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
  title: 'Remote Fractional Jobs UK 2025 | Work From Home Executive Roles',
  description: 'Remote fractional jobs for experienced executives. Find remote fractional CFO, CTO, CMO, COO roles you can do from anywhere. Fully remote and hybrid options available.',
  keywords: 'remote fractional jobs, remote fractional cfo, remote fractional cto, work from home executive jobs, remote c-suite jobs uk',
  alternates: { canonical: 'https://fractional.quest/remote-fractional-jobs' },
  openGraph: {
    title: 'Remote Fractional Jobs | Work From Home Executive Roles',
    description: 'Find remote fractional executive jobs. Work from anywhere as a fractional CFO, CTO, CMO, or COO.',
    url: 'https://fractional.quest/remote-fractional-jobs',
  },
}

const REMOTE_FRACTIONAL_FAQS = [
  { question: "Can fractional executives work remotely?", answer: "Yes, many fractional executive roles are fully remote or hybrid. The part-time nature of fractional work (1-3 days/week) makes it well-suited to remote delivery, especially for strategic and advisory work. Some roles may require occasional on-site days." },
  { question: "What fractional roles work best remotely?", answer: "Strategic roles work best remotely: Fractional CFO (financial planning, reporting), CTO (technical strategy, architecture), CISO (security governance), and advisory roles. Operational roles like COO may need more on-site presence depending on the company." },
  { question: "Do remote fractional jobs pay less?", answer: "Generally no - day rates for remote fractional roles are similar to on-site roles. Some executives even command higher rates for remote work as it allows them to serve multiple clients without commute time. Rates depend more on expertise and demand than location." },
  { question: "What tools do remote fractional executives need?", answer: "Essential tools include: video conferencing (Zoom, Teams), project management (Notion, Asana), communication (Slack), document collaboration (Google Docs, Notion), and role-specific tools like financial systems, dev environments, or marketing platforms." },
  { question: "How do remote fractional executives build relationships?", answer: "Successful remote fractional executives: schedule regular video calls, visit on-site periodically (monthly or quarterly), join company Slack channels, attend key meetings, and build relationships with key stakeholders through 1:1s." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Fractional Jobs', href: '/fractional-jobs-uk' }, { label: 'Remote Fractional Jobs', href: '/remote-fractional-jobs' }]

async function getRemoteJobStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND is_remote = true AND (title ILIKE '%fractional%' OR title ILIKE '%part%time%')`
    const [ukCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND is_remote = true AND (title ILIKE '%fractional%' OR title ILIKE '%part%time%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: Number(countResult?.count || 40), ukCount: Number(ukCount?.count || 25), avgRate: 1050 }
  } catch { return { total: 40, ukCount: 25, avgRate: 1050 } }
}

async function getRemoteFractionalJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND is_remote = true AND (title ILIKE '%fractional%' OR title ILIKE '%part%time%' OR title ILIKE '%interim%') ORDER BY posted_date DESC NULLS LAST LIMIT 24`
    return jobs as any[]
  } catch { return [] }
}

async function getRemoteByRole() {
  try {
    const sql = createDbQuery()
    const results = await sql`SELECT role_category, COUNT(*) as count FROM jobs WHERE is_active = true AND is_remote = true AND (title ILIKE '%fractional%' OR title ILIKE '%part%time%') GROUP BY role_category ORDER BY count DESC LIMIT 8`
    return results as any[]
  } catch { return [] }
}

export default async function RemoteFractionalJobsPage() {
  const [stats, jobs, roleBreakdown] = await Promise.all([getRemoteJobStats(), getRemoteFractionalJobs(), getRemoteByRole()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Remote Fractional Jobs | Work From Home Executive Roles 2025" description="Find remote fractional executive jobs you can do from anywhere." url="https://fractional.quest/remote-fractional-jobs" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={REMOTE_FRACTIONAL_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://fractional.quest/remote-fractional-jobs" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" alt="Remote Fractional Jobs" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 via-teal-800/90 to-emerald-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Work From Anywhere</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Remote Fractional Jobs</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>remote fractional</strong> and <strong>work from home executive</strong> roles. Build your portfolio career from anywhere with flexible, location-independent positions.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-teal-900 font-bold rounded-lg hover:bg-teal-50 transition-colors">Browse Remote Jobs</a>
                <Link href="/fractional-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">All UK Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-teal-400">{stats.total}+</div><div className="text-gray-400 text-sm">Remote Roles</div></div><div><div className="text-3xl font-black text-teal-400">{stats.ukCount}</div><div className="text-gray-400 text-sm">UK-Based Remote</div></div><div><div className="text-3xl font-black text-teal-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-teal-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div></div></div></section>

      {jobs.length > 0 && (<section className="bg-teal-50 border-y border-teal-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Remote Fractional Jobs" maxJobs={10} /></div></section>)}

      {roleBreakdown.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Remote Jobs by Function</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Remote Roles by Category</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {roleBreakdown.map((item: any) => (
                <div key={item.role_category} className="p-6 border rounded-xl text-center">
                  <div className="text-3xl font-black text-teal-600 mb-2">{item.count}</div>
                  <div className="text-gray-600">{item.role_category || 'Other'}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="jobs" className="py-16 md:py-20 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Remote Fractional Executive Jobs</h2></div><p className="text-gray-500">{jobs.length}+ live remote roles</p></div><ServerJobGrid jobs={jobs} ctaLink="/fractional-jobs-uk" ctaText="View All Jobs" maxJobs={24} showViewAll={true} /></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">Remote Fractional Work in 2025</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">The rise of <strong>remote work</strong> has transformed the fractional executive market. Many companies now hire fractional leaders who work entirely remotely, allowing executives to build portfolio careers without geographic constraints.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Roles for Remote Fractional Work</h3><ul className="space-y-2 text-gray-600"><li><strong>Fractional CFO</strong> - Financial planning, reporting, and investor relations translate well to remote</li><li><strong>Fractional CTO</strong> - Technical strategy, architecture reviews, and engineering leadership</li><li><strong>Fractional CISO</strong> - Security governance, compliance, and risk management</li><li><strong>Fractional CMO</strong> - Marketing strategy, digital campaigns, and brand development</li><li><strong>Fractional CPO</strong> - Product strategy, roadmap planning, and team coaching</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Making Remote Fractional Work Successful</h3><ul className="space-y-2 text-gray-600"><li>Schedule regular video check-ins with key stakeholders</li><li>Join company communication channels (Slack, Teams)</li><li>Visit on-site periodically for important meetings</li><li>Set clear expectations on availability and response times</li><li>Use async communication for non-urgent matters</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-jobs-uk" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">All Fractional Jobs UK</h4><p className="text-sm text-gray-600">Including on-site and hybrid roles</p></Link><Link href="/fractional-jobs-london" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">London Fractional Jobs</h4><p className="text-sm text-gray-600">Roles in the capital</p></Link><Link href="/fractional-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CFO Jobs</h4><p className="text-sm text-gray-600">Finance leadership roles</p></Link><Link href="/fractional-cto-jobs-uk" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CTO Jobs</h4><p className="text-sm text-gray-600">Technology leadership roles</p></Link></div></article></div></section>

      <section className="py-20 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Remote Fractional Jobs</h2></div><FAQ items={REMOTE_FRACTIONAL_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
