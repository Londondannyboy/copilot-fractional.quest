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
  title: 'Fractional COO Services UK',
  description: 'Fractional COO services for UK businesses. Operations leadership 1-3 days/week. Process optimisation, scale-up support from £900/day.',
  keywords: 'fractional coo services, fractional coo uk, part time coo, fractional operations director, outsourced coo services',
  alternates: { canonical: 'https://fractional.quest/fractional-coo-services' },
  openGraph: {
    title: 'Fractional COO Services UK | Part-Time Operations Leadership',
    description: 'Get experienced COO leadership without full-time commitment. Operational transformation, process optimisation, scale-up support.',
    url: 'https://fractional.quest/fractional-coo-services',
  },
}

const SERVICE_FAQS = [
  { question: "What's included in fractional COO services?", answer: "Fractional COO services typically include: operational strategy development, process design and optimisation, team structure and hiring, KPI frameworks and reporting, vendor and supplier management, operational due diligence, and hands-on execution support. Scope is tailored to your specific needs." },
  { question: "How do fractional COO engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. You get a senior operations leader who attends key meetings, works with your team, and drives operational improvements. Engagements typically start with a 3-month trial period before moving to ongoing retainers." },
  { question: "What's the difference between fractional COO and consulting?", answer: "Consultants advise and produce reports. Fractional COOs are hands-on operators who become part of your leadership team. They attend board meetings, manage teams, make decisions, and are accountable for operational outcomes - not just recommendations." },
  { question: "How much do fractional COO services cost?", answer: "Fractional COO day rates in the UK range from £900-£1,300. A typical 2-day per week engagement costs £7,200-£10,400 per month (£86,000-£125,000 annually). This is 40-60% less than a full-time COO with benefits and equity." },
  { question: "When should a company use fractional COO services?", answer: "Ideal situations: scaling operations beyond founder capacity, preparing for fundraising or exit, post-merger integration, operational turnaround, implementing new systems or processes, or building operational foundations before hiring full-time." },
]

const SERVICES = [
  { title: 'Operational Strategy', description: 'Define operational priorities, KPIs, and roadmap aligned with business goals', icon: '🎯' },
  { title: 'Process Optimisation', description: 'Design and implement efficient processes that scale with your growth', icon: '⚙️' },
  { title: 'Team & Structure', description: 'Build the right team structure, hire key roles, develop operational talent', icon: '👥' },
  { title: 'Systems & Tools', description: 'Select and implement operational systems - ERP, project management, reporting', icon: '🔧' },
  { title: 'Vendor Management', description: 'Optimise supplier relationships, negotiate contracts, manage partnerships', icon: '🤝' },
  { title: 'Operational Due Diligence', description: 'Support for fundraising, M&A, or investor reporting on operations', icon: '📊' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Light Touch', days: '1 day/week', price: '£3,600-£5,200/month', description: 'Strategic oversight, monthly board participation, quarterly planning', best: 'Early-stage, founder-led operations' },
  { name: 'Standard', days: '2 days/week', price: '£7,200-£10,400/month', description: 'Active leadership, team management, process implementation', best: 'Scale-ups, operational transformation' },
  { name: 'Intensive', days: '3 days/week', price: '£10,800-£15,600/month', description: 'Deep involvement, hands-on execution, complex transformations', best: 'Turnarounds, M&A integration' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional COO Services', href: '/fractional-coo-services' }]

export default function FractionalCOOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional COO Services UK | Part-Time Operations Leadership" description="Get experienced COO leadership without full-time commitment." url="https://fractional.quest/fractional-coo-services" dateModified={new Date('2025-01-08')} />
      <FAQPageSchema faqs={SERVICE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80" alt="Fractional COO Services" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-gray-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Operations Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional COO Services</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced COO leadership</strong> without the full-time commitment. Scale operations, optimise processes, and build operational excellence with a senior operations leader working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-coo-jobs-uk" className="px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-colors">Find a Fractional COO</Link>
                <Link href="/hire-fractional-coo" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">How to Hire</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-slate-300">£900-£1,300</div><div className="text-gray-400 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-slate-300">1-3 days</div><div className="text-gray-400 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-slate-300">40-60%</div><div className="text-gray-400 text-sm">Cost Savings vs FT</div></div><div><div className="text-3xl font-black text-slate-300">3 months</div><div className="text-gray-400 text-sm">Typical Trial Period</div></div></div></div></section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional COO Service Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.title} className="p-6 border rounded-xl hover:border-slate-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Engagement Models</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Flexible options to match your operational needs and budget</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model) => (
              <div key={model.name} className="bg-white p-8 rounded-xl border hover:border-slate-400 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <div className="text-3xl font-black text-slate-700 mb-1">{model.days}</div>
                <div className="text-slate-600 font-semibold mb-4">{model.price}</div>
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

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional COO Services</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional COO</strong> provides senior operations leadership without the cost and commitment of a full-time hire. This model works exceptionally well for growing companies that need operational expertise but aren't ready for a full-time C-suite operations leader.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional COO Services</h3><ul className="space-y-2 text-gray-600"><li><strong>Founder bandwidth</strong> - When founders are stretched thin managing operations</li><li><strong>Pre-fundraise</strong> - Building operational maturity before Series A/B</li><li><strong>Rapid growth</strong> - Scaling operations from 20 to 100+ employees</li><li><strong>Process chaos</strong> - Bringing structure to ad-hoc operations</li><li><strong>Post-acquisition</strong> - Integrating operations after M&A</li><li><strong>Turnaround</strong> - Fixing operational issues affecting performance</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fractional COO vs Full-Time vs Consulting</h3><div className="not-prose overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">Aspect</th><th className="text-left py-3 px-4">Fractional COO</th><th className="text-left py-3 px-4">Full-Time COO</th><th className="text-left py-3 px-4">Consultant</th></tr></thead><tbody><tr className="border-b"><td className="py-3 px-4 font-semibold">Cost</td><td className="py-3 px-4">£85-125k/year</td><td className="py-3 px-4">£150-250k/year</td><td className="py-3 px-4">£100-200k/project</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Commitment</td><td className="py-3 px-4">1-3 days/week</td><td className="py-3 px-4">Full-time</td><td className="py-3 px-4">Project-based</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Accountability</td><td className="py-3 px-4">High - owns outcomes</td><td className="py-3 px-4">Highest</td><td className="py-3 px-4">Low - advises only</td></tr><tr><td className="py-3 px-4 font-semibold">Flexibility</td><td className="py-3 px-4">High - scale up/down</td><td className="py-3 px-4">Low</td><td className="py-3 px-4">Medium</td></tr></tbody></table></div><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-coo-jobs-uk" className="p-4 border rounded-lg hover:border-slate-300 transition-colors"><h4 className="font-bold text-gray-900">Find Fractional COOs</h4><p className="text-sm text-gray-600">Browse available fractional COOs</p></Link><Link href="/hire-fractional-coo" className="p-4 border rounded-lg hover:border-slate-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire</h4><p className="text-sm text-gray-600">Guide to hiring a fractional COO</p></Link><Link href="/fractional-coo-salary" className="p-4 border rounded-lg hover:border-slate-300 transition-colors"><h4 className="font-bold text-gray-900">COO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-coo" className="p-4 border rounded-lg hover:border-slate-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional COO?</h4><p className="text-sm text-gray-600">Understanding the role</p></Link></div></article></div></section>

      <section className="py-20 bg-slate-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional COO Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
