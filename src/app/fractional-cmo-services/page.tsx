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
  title: 'Fractional CMO Services UK',
  description: 'Fractional CMO services for UK businesses. Marketing leadership 1-3 days/week. Brand strategy, demand generation from £850/day.',
  keywords: 'fractional cmo services, fractional cmo uk, part time cmo, fractional marketing director, outsourced cmo services',
  alternates: { canonical: 'https://fractional.quest/fractional-cmo-services' },
  openGraph: {
    title: 'Fractional CMO Services UK | Part-Time Marketing Leadership',
    description: 'Get experienced CMO leadership without full-time commitment. Brand strategy, demand generation, marketing transformation.',
    url: 'https://fractional.quest/fractional-cmo-services',
  },
}

const SERVICE_FAQS = [
  { question: "What's included in fractional CMO services?", answer: "Fractional CMO services typically include: marketing strategy development, brand positioning and messaging, demand generation and pipeline growth, marketing team leadership, agency and vendor management, marketing technology stack optimisation, and board-level marketing reporting." },
  { question: "How do fractional CMO engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. Your fractional CMO joins leadership meetings, directs marketing strategy, manages teams and agencies, and drives measurable marketing outcomes. Engagements typically start with a strategic assessment and 90-day plan." },
  { question: "What's the difference between fractional CMO and marketing agency?", answer: "Agencies execute campaigns and produce content. Fractional CMOs provide strategic leadership - they set direction, manage agencies, hire teams, and are accountable for overall marketing performance. Think of them as your marketing leader who directs agency work." },
  { question: "How much do fractional CMO services cost?", answer: "Fractional CMO day rates in the UK range from £850-£1,300. A typical 2-day per week engagement costs £6,800-£10,400 per month (£81,600-£124,800 annually). This is 40-60% less than a full-time CMO with benefits and equity." },
  { question: "When should a company use fractional CMO services?", answer: "Ideal situations: scaling marketing beyond founder-led efforts, repositioning brand for growth, building demand generation engine, preparing for fundraising, professionalising marketing operations, or bridging gap while hiring full-time CMO." },
]

const SERVICES = [
  { title: 'Marketing Strategy', description: 'Develop go-to-market strategy, positioning, and marketing roadmap aligned with business goals', icon: '🎯' },
  { title: 'Brand & Positioning', description: 'Define brand strategy, messaging framework, and competitive differentiation', icon: '✨' },
  { title: 'Demand Generation', description: 'Build pipeline through digital marketing, content, events, and outbound programmes', icon: '📈' },
  { title: 'Team & Agency Management', description: 'Hire marketing talent, manage agencies, and build high-performing marketing function', icon: '👥' },
  { title: 'Marketing Technology', description: 'Select and implement martech stack - CRM, automation, analytics, attribution', icon: '🔧' },
  { title: 'Marketing Operations', description: 'Establish processes, reporting frameworks, and marketing-sales alignment', icon: '⚙️' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Strategic Advisor', days: '1 day/week', price: '£3,400-£5,200/month', description: 'Strategy oversight, monthly planning, agency direction', best: 'Early-stage, strong marketing team' },
  { name: 'Part-Time CMO', days: '2 days/week', price: '£6,800-£10,400/month', description: 'Active leadership, team management, campaign oversight', best: 'Scale-ups, demand gen focus' },
  { name: 'Intensive CMO', days: '3 days/week', price: '£10,200-£15,600/month', description: 'Deep involvement, rebrand, major launches', best: 'Transformations, rapid growth' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional CMO Services', href: '/fractional-cmo-services' }]

export default function FractionalCMOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CMO Services UK | Part-Time Marketing Leadership" description="Get experienced CMO leadership without full-time commitment." url="https://fractional.quest/fractional-cmo-services" dateModified={new Date('2025-01-08')} />
      <FAQPageSchema faqs={SERVICE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80" alt="Fractional CMO Services" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-orange-800/90 to-pink-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Marketing Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional CMO Services</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced CMO leadership</strong> without the full-time commitment. Build your brand, drive demand generation, and scale marketing with a senior marketing leader working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-cmo-jobs-uk" className="px-6 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-colors">Find a Fractional CMO</Link>
                <Link href="/hire-fractional-cmo" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">How to Hire</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-amber-200">£850-£1,300</div><div className="text-amber-300/70 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-amber-200">1-3 days</div><div className="text-amber-300/70 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-amber-200">40-60%</div><div className="text-amber-300/70 text-sm">Cost Savings vs FT</div></div><div><div className="text-3xl font-black text-amber-200">90 days</div><div className="text-amber-300/70 text-sm">Typical First Review</div></div></div></div></section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CMO Service Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.title} className="p-6 border rounded-xl hover:border-amber-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Engagement Models</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Flexible options to match your marketing maturity and growth goals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model) => (
              <div key={model.name} className="bg-white p-8 rounded-xl border hover:border-amber-400 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <div className="text-3xl font-black text-amber-700 mb-1">{model.days}</div>
                <div className="text-amber-600 font-semibold mb-4">{model.price}</div>
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

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional CMO Services</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional CMO</strong> provides senior marketing leadership without the cost and commitment of a full-time hire. This model is particularly effective for companies that need strategic marketing expertise but are not yet ready for a full-time C-suite marketing leader.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional CMO Services</h3><ul className="space-y-2 text-gray-600"><li><strong>Founder-led marketing</strong> - When founders need to hand off marketing leadership</li><li><strong>Agency dependency</strong> - When you need someone to direct agency work strategically</li><li><strong>Brand evolution</strong> - Repositioning, rebrand, or entering new markets</li><li><strong>Demand generation</strong> - Building pipeline and marketing-sourced revenue</li><li><strong>Pre-fundraise</strong> - Professionalising marketing before Series A/B</li><li><strong>Marketing leadership gap</strong> - Covering departure while hiring permanent CMO</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Find Fractional CMOs</h4><p className="text-sm text-gray-600">Browse available fractional CMOs</p></Link><Link href="/hire-fractional-cmo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire</h4><p className="text-sm text-gray-600">Guide to hiring a fractional CMO</p></Link><Link href="/fractional-cmo-salary" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">CMO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-cmo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CMO?</h4><p className="text-sm text-gray-600">Understanding the role</p></Link></div></article></div></section>

      <section className="py-20 bg-amber-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CMO Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
