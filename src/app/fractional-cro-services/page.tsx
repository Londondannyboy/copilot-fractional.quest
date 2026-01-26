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
  title: 'Fractional CRO Services UK',
  description: 'Fractional CRO services for UK businesses. Revenue leadership 1-3 days/week. Sales strategy, revenue operations, GTM execution from £850/day.',
  keywords: 'fractional cro services, fractional cro uk, part time cro, fractional chief revenue officer, outsourced cro services, cro as a service',
  alternates: { canonical: 'https://fractional.quest/fractional-cro-services' },
  openGraph: {
    title: 'Fractional CRO Services UK | Part-Time Revenue Leadership',
    description: 'Get experienced CRO leadership without full-time commitment. Revenue strategy, sales operations, GTM execution, and growth acceleration.',
    url: 'https://fractional.quest/fractional-cro-services',
  },
}

const SERVICE_FAQS = [
  { question: "What's included in fractional CRO services?", answer: "Fractional CRO services typically include: revenue strategy and forecasting, sales team leadership and coaching, revenue operations (RevOps) optimisation, go-to-market strategy execution, pipeline management and deal strategy, sales process improvement, and board-level revenue reporting." },
  { question: "How do fractional CRO engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. Your fractional CRO joins leadership meetings, directs revenue strategy, coaches sales teams, and ensures commercial decisions align with growth goals. Engagements typically start with a revenue assessment and GTM audit." },
  { question: "What's the difference between fractional CRO and sales consultant?", answer: "Sales consultants advise on tactics. Fractional CROs provide strategic revenue leadership - they own revenue outcomes, manage sales teams, build compensation plans, and are accountable for hitting targets. Think of them as your revenue leader who drives the entire commercial engine." },
  { question: "How much do fractional CRO services cost?", answer: "Fractional CRO day rates in the UK range from £850-£1,250. A typical 2-day per week engagement costs £6,800-£10,000 per month (£81,600-£120,000 annually). This is 40-60% less than a full-time CRO with benefits, bonus, and equity." },
  { question: "When should a company use fractional CRO services?", answer: "Ideal situations: scaling from founder-led sales to sales team, professionalising revenue operations, preparing for fundraising with validated metrics, entering new markets, improving sales velocity and conversion, or bridging gap while hiring full-time CRO." },
]

const SERVICES = [
  { title: 'Revenue Strategy', description: 'Define revenue roadmap, pricing strategy, and commercial architecture aligned with growth goals', icon: '🎯' },
  { title: 'Sales Leadership', description: 'Build, coach and manage sales teams, define quotas, implement sales methodology', icon: '👥' },
  { title: 'RevOps & Systems', description: 'Optimise CRM, sales tools, forecasting, pipeline management and reporting', icon: '⚙️' },
  { title: 'Go-to-Market Execution', description: 'Launch new products, enter new markets, execute expansion strategies', icon: '🚀' },
  { title: 'Deal Strategy', description: 'Support complex enterprise deals, negotiate contracts, close strategic accounts', icon: '🤝' },
  { title: 'Board Reporting', description: 'Revenue metrics, pipeline reviews, investor updates and board presentations', icon: '📊' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Advisory', days: '1 day/week', price: '£3,400-£5,000/month', description: 'Strategic oversight, pipeline reviews, board reporting', best: 'Post-PMF with existing sales' },
  { name: 'Part-Time CRO', days: '2 days/week', price: '£6,800-£10,000/month', description: 'Active leadership, team management, RevOps', best: 'Series A/B, scaling revenue' },
  { name: 'Intensive CRO', days: '3 days/week', price: '£10,200-£15,000/month', description: 'Deep involvement, major GTM initiatives', best: 'New market entry, rapid scaling' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional CRO Services', href: '/fractional-cro-services' }]

export default function FractionalCROServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CRO Services UK | Part-Time Revenue Leadership" description="Get experienced CRO leadership without full-time commitment." url="https://fractional.quest/fractional-cro-services" dateModified={new Date('2026-01-26')} />
      <FAQPageSchema faqs={SERVICE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80" alt="Fractional CRO Services" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/95 via-orange-800/90 to-amber-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Revenue Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional CRO Services</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced CRO leadership</strong> without the full-time commitment. Revenue strategy, sales operations, GTM execution, and growth acceleration with a senior revenue leader working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-cro-jobs-uk" className="px-6 py-3 bg-white text-orange-900 font-bold rounded-lg hover:bg-orange-50 transition-colors">Find a Fractional CRO</Link>
                <Link href="/hire-fractional-cro" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">How to Hire</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orange-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-orange-200">£850-£1,250</div><div className="text-orange-300/70 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-orange-200">1-3 days</div><div className="text-orange-300/70 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-orange-200">40-60%</div><div className="text-orange-300/70 text-sm">Cost Savings vs FT</div></div><div><div className="text-3xl font-black text-orange-200">Revenue</div><div className="text-orange-300/70 text-sm">Growth Focused</div></div></div></div></section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CRO Service Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.title} className="p-6 border rounded-xl hover:border-orange-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Engagement Models</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Flexible options to match your revenue maturity and growth stage</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model) => (
              <div key={model.name} className="bg-white p-8 rounded-xl border hover:border-orange-400 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <div className="text-3xl font-black text-orange-700 mb-1">{model.days}</div>
                <div className="text-orange-600 font-semibold mb-4">{model.price}</div>
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

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional CRO Services</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional CRO</strong> provides senior revenue leadership without the cost and commitment of a full-time hire. This model is particularly valuable for companies that need strategic commercial direction but aren't yet at the scale to justify a full-time CRO.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional CRO Services</h3><ul className="space-y-2 text-gray-600"><li><strong>Scaling from founder-led sales</strong> - Building first sales team, processes</li><li><strong>Revenue operations overhaul</strong> - CRM, forecasting, pipeline management</li><li><strong>Pre-fundraise</strong> - Validating revenue metrics for investors</li><li><strong>New market entry</strong> - GTM strategy for expansion</li><li><strong>Sales team turnaround</strong> - Improving velocity and conversion</li><li><strong>Interim cover</strong> - Bridging gap while recruiting permanent CRO</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fractional CRO vs Sales Director vs VP Sales</h3><div className="not-prose overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">Aspect</th><th className="text-left py-3 px-4">Fractional CRO</th><th className="text-left py-3 px-4">Sales Director</th><th className="text-left py-3 px-4">VP Sales</th></tr></thead><tbody><tr className="border-b"><td className="py-3 px-4 font-semibold">Focus</td><td className="py-3 px-4">Full revenue strategy</td><td className="py-3 px-4">Team management</td><td className="py-3 px-4">Sales execution</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Accountability</td><td className="py-3 px-4">Revenue targets</td><td className="py-3 px-4">Team quota</td><td className="py-3 px-4">Sales pipeline</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">RevOps</td><td className="py-3 px-4">Yes - owns systems</td><td className="py-3 px-4">Uses systems</td><td className="py-3 px-4">Uses systems</td></tr><tr><td className="py-3 px-4 font-semibold">Board presence</td><td className="py-3 px-4">Yes</td><td className="py-3 px-4">Sometimes</td><td className="py-3 px-4">Rarely</td></tr></tbody></table></div><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cro-jobs-uk" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">Find Fractional CROs</h4><p className="text-sm text-gray-600">Browse available fractional CROs</p></Link><Link href="/hire-fractional-cro" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire</h4><p className="text-sm text-gray-600">Guide to hiring a fractional CRO</p></Link><Link href="/fractional-cro-salary" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">CRO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-cro" className="p-4 border rounded-lg hover:border-orange-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CRO?</h4><p className="text-sm text-gray-600">Understanding the role</p></Link></div></article></div></section>

      <section className="py-20 bg-orange-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CRO Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
