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
  title: 'Fractional CCO Services UK',
  description: 'Fractional CCO services for UK businesses. Customer leadership 1-3 days/week. Customer success, retention strategy, CX transformation from £800/day.',
  keywords: 'fractional cco services, fractional cco uk, part time cco, fractional chief customer officer, outsourced cco services, cco as a service, customer success leadership',
  alternates: { canonical: 'https://fractional.quest/fractional-cco-services' },
  openGraph: {
    title: 'Fractional CCO Services UK | Part-Time Customer Leadership',
    description: 'Get experienced CCO leadership without full-time commitment. Customer success strategy, retention optimisation, CX transformation.',
    url: 'https://fractional.quest/fractional-cco-services',
  },
}

const SERVICE_FAQS = [
  { question: "What's included in fractional CCO services?", answer: "Fractional CCO services typically include: customer success strategy and framework design, retention and churn reduction programs, customer experience (CX) transformation, voice of customer programs, customer health scoring and metrics, team structure and playbook development, and board-level customer reporting." },
  { question: "How do fractional CCO engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. Your fractional CCO joins leadership meetings, directs customer strategy, builds CS teams, and ensures customer outcomes align with business goals. Engagements typically start with a customer health assessment and retention audit." },
  { question: "What's the difference between fractional CCO and customer success manager?", answer: "Customer success managers handle individual accounts. Fractional CCOs provide strategic customer leadership - they own retention metrics, design CS frameworks, build compensation plans, and are accountable for net revenue retention. Think of them as your customer leader who drives the entire post-sales engine." },
  { question: "How much do fractional CCO services cost?", answer: "Fractional CCO day rates in the UK range from £800-£1,200. A typical 2-day per week engagement costs £6,400-£9,600 per month (£76,800-£115,200 annually). This is 40-60% less than a full-time CCO with benefits, bonus, and equity." },
  { question: "When should a company use fractional CCO services?", answer: "Ideal situations: transitioning from reactive support to proactive success, scaling customer success teams, reducing churn in SaaS businesses, preparing for fundraising with strong NRR metrics, implementing customer health scoring, or bridging gap while hiring full-time CCO." },
]

const SERVICES = [
  { title: 'Customer Success Strategy', description: 'Define customer journey, health scoring, and success frameworks aligned with growth goals', icon: '🎯' },
  { title: 'Retention & Expansion', description: 'Reduce churn, increase NRR, develop upsell and cross-sell playbooks', icon: '📈' },
  { title: 'CS Team Building', description: 'Build, coach and manage customer success teams, define roles and career paths', icon: '👥' },
  { title: 'Customer Experience', description: 'Design end-to-end CX, voice of customer programs, NPS and CSAT improvement', icon: '⭐' },
  { title: 'Health Scoring & Ops', description: 'Implement customer health metrics, early warning systems, CS platforms', icon: '⚙️' },
  { title: 'Board Reporting', description: 'NRR metrics, churn analysis, customer cohort reports, investor updates', icon: '📊' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Advisory', days: '1 day/week', price: '£3,200-£4,800/month', description: 'Strategic oversight, metrics reviews, board reporting', best: 'Post-PMF with existing CS team' },
  { name: 'Part-Time CCO', days: '2 days/week', price: '£6,400-£9,600/month', description: 'Active leadership, team management, CX ops', best: 'Series A/B, scaling CS function' },
  { name: 'Intensive CCO', days: '3 days/week', price: '£9,600-£14,400/month', description: 'Deep involvement, major CX initiatives', best: 'Churn crisis, rapid scaling' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional CCO Services', href: '/fractional-cco-services' }]

export default function FractionalCCOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CCO Services UK | Part-Time Customer Leadership" description="Get experienced CCO leadership without full-time commitment." url="https://fractional.quest/fractional-cco-services" dateModified={new Date('2026-01-26')} />
      <FAQPageSchema faqs={SERVICE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1553484771-371a605b060b?w=1920&q=80" alt="Fractional CCO Services" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 via-teal-800/90 to-cyan-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Customer Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional CCO Services</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced CCO leadership</strong> without the full-time commitment. Customer success strategy, retention optimisation, CX transformation with a senior customer leader working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-cco-jobs-uk" className="px-6 py-3 bg-white text-teal-900 font-bold rounded-lg hover:bg-teal-50 transition-colors">Find a Fractional CCO</Link>
                <Link href="/hire-fractional-cco" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">How to Hire</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-teal-200">£800-£1,200</div><div className="text-teal-300/70 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-teal-200">1-3 days</div><div className="text-teal-300/70 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-teal-200">40-60%</div><div className="text-teal-300/70 text-sm">Cost Savings vs FT</div></div><div><div className="text-3xl font-black text-teal-200">NRR</div><div className="text-teal-300/70 text-sm">Improvement Focused</div></div></div></div></section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CCO Service Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.title} className="p-6 border rounded-xl hover:border-teal-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Engagement Models</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Flexible options to match your customer maturity and growth stage</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model) => (
              <div key={model.name} className="bg-white p-8 rounded-xl border hover:border-teal-400 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <div className="text-3xl font-black text-teal-700 mb-1">{model.days}</div>
                <div className="text-teal-600 font-semibold mb-4">{model.price}</div>
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

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional CCO Services</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional CCO</strong> provides senior customer leadership without the cost and commitment of a full-time hire. This model is particularly valuable for SaaS companies that need strategic customer success direction but aren't yet at the scale to justify a full-time CCO.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional CCO Services</h3><ul className="space-y-2 text-gray-600"><li><strong>Building first CS team</strong> - Moving from reactive support to proactive success</li><li><strong>Churn reduction</strong> - Systematic approach to improving retention</li><li><strong>Pre-fundraise</strong> - Demonstrating strong NRR metrics to investors</li><li><strong>Customer health scoring</strong> - Implementing predictive frameworks</li><li><strong>CX transformation</strong> - End-to-end customer journey improvement</li><li><strong>Interim cover</strong> - Bridging gap while recruiting permanent CCO</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fractional CCO vs VP Customer Success vs CS Director</h3><div className="not-prose overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">Aspect</th><th className="text-left py-3 px-4">Fractional CCO</th><th className="text-left py-3 px-4">VP Customer Success</th><th className="text-left py-3 px-4">CS Director</th></tr></thead><tbody><tr className="border-b"><td className="py-3 px-4 font-semibold">Focus</td><td className="py-3 px-4">Full customer strategy</td><td className="py-3 px-4">CS execution</td><td className="py-3 px-4">Team management</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Accountability</td><td className="py-3 px-4">NRR, retention</td><td className="py-3 px-4">CS metrics</td><td className="py-3 px-4">Team quota</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">CX Ownership</td><td className="py-3 px-4">Yes - end to end</td><td className="py-3 px-4">Post-sales</td><td className="py-3 px-4">Account level</td></tr><tr><td className="py-3 px-4 font-semibold">Board presence</td><td className="py-3 px-4">Yes</td><td className="py-3 px-4">Sometimes</td><td className="py-3 px-4">Rarely</td></tr></tbody></table></div><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cco-jobs-uk" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">Find Fractional CCOs</h4><p className="text-sm text-gray-600">Browse available fractional CCOs</p></Link><Link href="/hire-fractional-cco" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire</h4><p className="text-sm text-gray-600">Guide to hiring a fractional CCO</p></Link><Link href="/fractional-cco-salary" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">CCO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-cco" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CCO?</h4><p className="text-sm text-gray-600">Understanding the role</p></Link></div></article></div></section>

      <section className="py-20 bg-teal-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CCO Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
