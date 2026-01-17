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
  title: 'Fractional CPO Services UK',
  description: 'Fractional CPO services for UK businesses. Product leadership 1-3 days/week. Strategy, roadmap, user research from £850/day.',
  keywords: 'fractional cpo services, fractional cpo uk, part time cpo, fractional product director, outsourced cpo services, cpo as a service',
  alternates: { canonical: 'https://fractional.quest/fractional-cpo-services' },
  openGraph: {
    title: 'Fractional CPO Services UK | Part-Time Product Leadership',
    description: 'Get experienced CPO leadership without full-time commitment. Product strategy, roadmap development, team building.',
    url: 'https://fractional.quest/fractional-cpo-services',
  },
}

const SERVICE_FAQS = [
  { question: "What's included in fractional CPO services?", answer: "Fractional CPO services typically include: product vision and strategy, roadmap development and prioritisation, product team building and coaching, user research and customer insights, product-market fit validation, feature specification, and stakeholder management." },
  { question: "How do fractional CPO engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. Your fractional CPO joins leadership meetings, defines product strategy, manages the product team, and ensures the product roadmap delivers business outcomes. Engagements typically start with a product audit and strategic assessment." },
  { question: "What's the difference between fractional CPO and product consultant?", answer: "Product consultants advise on specific features or research projects. Fractional CPOs provide strategic leadership - they own product direction, build and manage teams, define roadmaps, and are accountable for product success. They're your product leader, not an external advisor." },
  { question: "How much do fractional CPO services cost?", answer: "Fractional CPO day rates in the UK range from £850-£1,300. A typical 2-day per week engagement costs £6,800-£10,400 per month (£81,600-£124,800 annually). This is 40-60% less than a full-time CPO with benefits and equity." },
  { question: "When should a company use fractional CPO services?", answer: "Ideal situations: scaling product from MVP to growth, professionalising product function, building first product team, pivoting or repositioning product, preparing product for fundraising, or bridging gap while hiring full-time CPO." },
]

const SERVICES = [
  { title: 'Product Strategy', description: 'Define product vision, market positioning, competitive differentiation, and strategic direction', icon: '🎯' },
  { title: 'Roadmap Development', description: 'Build and prioritise product roadmap, balance customer needs with business goals', icon: '🗺️' },
  { title: 'Product Team Building', description: 'Hire product managers, designers, define team structure, implement product processes', icon: '👥' },
  { title: 'User Research', description: 'Customer discovery, user interviews, data analysis, product-market fit validation', icon: '🔍' },
  { title: 'Feature Definition', description: 'Write specifications, work with engineering, manage releases, drive quality', icon: '📝' },
  { title: 'Stakeholder Management', description: 'Align product with sales, marketing, customer success, board reporting', icon: '🤝' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Product Advisory', days: '1 day/week', price: '£3,400-£5,200/month', description: 'Strategic direction, roadmap reviews, team coaching', best: 'Existing product team' },
  { name: 'Part-Time CPO', days: '2 days/week', price: '£6,800-£10,400/month', description: 'Lead product function, drive strategy, build team', best: 'Series A/B, scaling product' },
  { name: 'Intensive CPO', days: '3 days/week', price: '£10,200-£15,600/month', description: 'Deep involvement, pivots, major launches', best: 'Product rebuilds, pivots' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional CPO Services', href: '/fractional-cpo-services' }]

export default function FractionalCPOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CPO Services UK | Part-Time Product Leadership" description="Get experienced CPO leadership without full-time commitment." url="https://fractional.quest/fractional-cpo-services" dateModified={new Date('2026-01-08')} />
      <FAQPageSchema faqs={SERVICE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1920&q=80" alt="Fractional CPO Services" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/95 via-indigo-800/90 to-purple-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Product Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional CPO Services</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced CPO leadership</strong> without the full-time commitment. Product strategy, roadmap development, and team building with a senior product leader working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-cpo-jobs-uk" className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-indigo-50 transition-colors">Find a Fractional CPO</Link>
                <Link href="/hire-fractional-cpo" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">How to Hire</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-indigo-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-indigo-200">£850-£1,300</div><div className="text-indigo-300/70 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-indigo-200">1-3 days</div><div className="text-indigo-300/70 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-indigo-200">40-60%</div><div className="text-indigo-300/70 text-sm">Cost Savings vs FT</div></div><div><div className="text-3xl font-black text-indigo-200">Product</div><div className="text-indigo-300/70 text-sm">Led Growth</div></div></div></div></section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CPO Service Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.title} className="p-6 border rounded-xl hover:border-indigo-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-indigo-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Engagement Models</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Flexible options to match your product maturity and growth stage</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model) => (
              <div key={model.name} className="bg-white p-8 rounded-xl border hover:border-indigo-400 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <div className="text-3xl font-black text-indigo-700 mb-1">{model.days}</div>
                <div className="text-indigo-600 font-semibold mb-4">{model.price}</div>
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

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional CPO Services</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional CPO</strong> provides senior product leadership without the cost and commitment of a full-time hire. This model is particularly valuable for companies that need strategic product direction but aren't yet at the scale to justify a full-time CPO.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional CPO Services</h3><ul className="space-y-2 text-gray-600"><li><strong>MVP to scale</strong> - Moving from founder-led product to professional product function</li><li><strong>First product hire</strong> - Building product team, setting up processes</li><li><strong>Product pivot</strong> - Strategic repositioning or new market entry</li><li><strong>Pre-fundraise</strong> - Strengthening product story for investors</li><li><strong>Product-market fit</strong> - Validating and refining product strategy</li><li><strong>Interim cover</strong> - Bridging gap while recruiting Head of Product</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fractional CPO vs Product Manager vs Consultant</h3><div className="not-prose overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">Role</th><th className="text-left py-3 px-4">Focus</th><th className="text-left py-3 px-4">Level</th><th className="text-left py-3 px-4">Accountability</th></tr></thead><tbody><tr className="border-b"><td className="py-3 px-4 font-semibold">Fractional CPO</td><td className="py-3 px-4">Product strategy</td><td className="py-3 px-4">C-suite</td><td className="py-3 px-4">Owns product direction</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Product Manager</td><td className="py-3 px-4">Feature delivery</td><td className="py-3 px-4">Mid-level</td><td className="py-3 px-4">Executes roadmap</td></tr><tr><td className="py-3 px-4 font-semibold">Product Consultant</td><td className="py-3 px-4">Project-based</td><td className="py-3 px-4">External</td><td className="py-3 px-4">Advises</td></tr></tbody></table></div><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cpo-jobs-uk" className="p-4 border rounded-lg hover:border-indigo-300 transition-colors"><h4 className="font-bold text-gray-900">Find Fractional CPOs</h4><p className="text-sm text-gray-600">Browse available fractional CPOs</p></Link><Link href="/hire-fractional-cpo" className="p-4 border rounded-lg hover:border-indigo-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire</h4><p className="text-sm text-gray-600">Guide to hiring a fractional CPO</p></Link><Link href="/fractional-cpo-salary" className="p-4 border rounded-lg hover:border-indigo-300 transition-colors"><h4 className="font-bold text-gray-900">CPO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-cpo" className="p-4 border rounded-lg hover:border-indigo-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CPO?</h4><p className="text-sm text-gray-600">Understanding the role</p></Link></div></article></div></section>

      <section className="py-20 bg-indigo-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CPO Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
