import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'

export const metadata: Metadata = {
  title: 'Fractional CFO Services UK',
  description: 'Fractional CFO services for UK businesses. Finance leadership 1-3 days/week. Strategy, fundraising, reporting from £850/day.',
  keywords: 'fractional cfo services, fractional cfo uk, part time cfo, fractional finance director, outsourced cfo services, cfo as a service',
  alternates: { canonical: 'https://fractional.quest/fractional-cfo-services' },
  openGraph: {
    title: 'Fractional CFO Services UK | Part-Time Finance Leadership',
    description: 'Get experienced CFO leadership without full-time commitment. Financial strategy, fundraising, reporting, compliance.',
    url: 'https://fractional.quest/fractional-cfo-services',
  },
}

const SERVICE_FAQS = [
  { question: "What's included in fractional CFO services?", answer: "Fractional CFO services typically include: financial strategy and planning, management reporting and dashboards, cash flow management, fundraising support (models, decks, investor relations), board reporting, compliance and audit preparation, team leadership, and financial systems implementation." },
  { question: "How do fractional CFO engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. Your fractional CFO attends leadership meetings, manages the finance function, produces board packs, and drives financial strategy. Engagements typically start with a financial health check and 90-day improvement plan." },
  { question: "What's the difference between fractional CFO and bookkeeper/accountant?", answer: "Bookkeepers record transactions. Accountants produce accounts and tax returns. Fractional CFOs provide strategic finance leadership - financial strategy, fundraising, investor relations, business partnering, and driving commercial decisions. They're C-suite leaders, not back-office." },
  { question: "How much do fractional CFO services cost?", answer: "Fractional CFO day rates in the UK range from £850-£1,200. A typical 2-day per week engagement costs £6,800-£9,600 per month (£81,600-£115,200 annually). This is 40-60% less than a full-time CFO with benefits, bonus, and equity." },
  { question: "When should a company use fractional CFO services?", answer: "Ideal situations: preparing for fundraising (Series A onwards), post-investment reporting requirements, scaling beyond founder-managed finances, M&A preparation, implementing financial systems, or professionalising the finance function pre-exit." },
]

const SERVICES = [
  { title: 'Financial Strategy', description: 'Develop financial roadmap, budgeting, forecasting, and scenario planning aligned with business goals', icon: '📊' },
  { title: 'Fundraising Support', description: 'Financial models, pitch decks, due diligence preparation, investor relations, and term sheet negotiation', icon: '💰' },
  { title: 'Management Reporting', description: 'Design and implement dashboards, KPIs, board packs, and investor reporting frameworks', icon: '📈' },
  { title: 'Cash Flow Management', description: 'Working capital optimisation, runway management, cash forecasting, and treasury', icon: '💵' },
  { title: 'Finance Team & Systems', description: 'Hire finance talent, implement accounting systems, and build scalable finance function', icon: '👥' },
  { title: 'Compliance & Audit', description: 'Statutory accounts, audit preparation, tax planning, and regulatory compliance', icon: '✅' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Oversight', days: '1 day/week', price: '£3,400-£4,800/month', description: 'Board reporting, strategic oversight, investor liaison', best: 'Post-seed with FD/controller' },
  { name: 'Part-Time CFO', days: '2 days/week', price: '£6,800-£9,600/month', description: 'Active leadership, fundraising, systems implementation', best: 'Series A/B, scaling finance' },
  { name: 'Full Engagement', days: '3 days/week', price: '£10,200-£14,400/month', description: 'Deep involvement, M&A, complex transactions', best: 'Fundraising, exit preparation' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional CFO Services', href: '/fractional-cfo-services' }]

export default function FractionalCFOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CFO Services UK | Part-Time Finance Leadership" description="Get experienced CFO leadership without full-time commitment." url="https://fractional.quest/fractional-cfo-services" dateModified={new Date('2025-01-08')} />
      <FAQPageSchema faqs={SERVICE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80" alt="Fractional CFO Services" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-teal-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Finance Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional CFO Services</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced CFO leadership</strong> without the full-time commitment. Financial strategy, fundraising support, and board-level finance leadership with a senior CFO working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-cfo-jobs-uk" className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors">Find a Fractional CFO</Link>
                <Link href="/hire-fractional-cfo" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">How to Hire</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-emerald-200">£850-£1,200</div><div className="text-emerald-300/70 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-emerald-200">1-3 days</div><div className="text-emerald-300/70 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-emerald-200">40-60%</div><div className="text-emerald-300/70 text-sm">Cost Savings vs FT</div></div><div><div className="text-3xl font-black text-emerald-200">ACA/ACCA</div><div className="text-emerald-300/70 text-sm">Typically Qualified</div></div></div></div></section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CFO Service Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.title} className="p-6 border rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Engagement Models</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Flexible options to match your finance maturity and growth stage</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model) => (
              <div key={model.name} className="bg-white p-8 rounded-xl border hover:border-emerald-400 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <div className="text-3xl font-black text-emerald-700 mb-1">{model.days}</div>
                <div className="text-emerald-600 font-semibold mb-4">{model.price}</div>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <div className="pt-4 border-t">
                  <span className="text-xs font-bold uppercase text-gray-500">Best for:</span>
                  <p className="text-gray-700 font-medium">{model.best}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional CFO Services</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional CFO</strong> provides senior finance leadership without the cost and commitment of a full-time hire. This is particularly valuable for venture-backed companies that need investor-grade financial management but aren't yet at the scale to justify a full-time CFO.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional CFO Services</h3><ul className="space-y-2 text-gray-600"><li><strong>Fundraising</strong> - Preparing for Series A, B, or growth rounds</li><li><strong>Post-investment</strong> - Meeting investor reporting requirements</li><li><strong>Scaling finance</strong> - Growing beyond founder-managed finances</li><li><strong>M&A preparation</strong> - Sell-side or buy-side transaction support</li><li><strong>Systems implementation</strong> - ERP, FP&A tools, and reporting infrastructure</li><li><strong>Interim cover</strong> - Bridging gap while recruiting permanent CFO</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fractional CFO vs Bookkeeper vs Accountant</h3><div className="not-prose overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">Role</th><th className="text-left py-3 px-4">Focus</th><th className="text-left py-3 px-4">Output</th></tr></thead><tbody><tr className="border-b"><td className="py-3 px-4 font-semibold">Bookkeeper</td><td className="py-3 px-4">Transaction recording</td><td className="py-3 px-4">Accurate books</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Accountant</td><td className="py-3 px-4">Compliance, tax</td><td className="py-3 px-4">Accounts, returns</td></tr><tr><td className="py-3 px-4 font-semibold">Fractional CFO</td><td className="py-3 px-4">Strategy, fundraising, decisions</td><td className="py-3 px-4">Growth, capital, value</td></tr></tbody></table></div><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Find Fractional CFOs</h4><p className="text-sm text-gray-600">Browse available fractional CFOs</p></Link><Link href="/hire-fractional-cfo" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire</h4><p className="text-sm text-gray-600">Guide to hiring a fractional CFO</p></Link><Link href="/fractional-cfo-salary" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">CFO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-cfo" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CFO?</h4><p className="text-sm text-gray-600">Understanding the role</p></Link></div></article></div></section>

      <section className="py-20 bg-emerald-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CFO Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
