import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'

export const metadata: Metadata = {
  title: 'Fractional Procurement Services UK | Part-Time Procurement Leadership',
  description: 'Fractional procurement services for UK businesses. Procurement leadership 1-3 days/week. Strategic sourcing, supplier management, cost optimisation from £800/day.',
  keywords: 'fractional procurement services, fractional procurement director uk, part time procurement director, outsourced procurement services, procurement as a service, fractional head of procurement',
  alternates: { canonical: 'https://fractional.quest/fractional-procurement-services' },
  openGraph: {
    title: 'Fractional Procurement Services UK | Part-Time Procurement Leadership',
    description: 'Get experienced procurement leadership without full-time commitment. Strategic sourcing, supplier management, cost optimisation.',
    url: 'https://fractional.quest/fractional-procurement-services',
  },
}

const SERVICE_FAQS = [
  { question: "What's included in fractional procurement services?", answer: "Fractional procurement services typically include: strategic sourcing and category management, supplier relationship management, contract negotiation and management, spend analysis and savings delivery, procurement team development, P2P system implementation, and supplier performance management." },
  { question: "How do fractional procurement engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. Your fractional Procurement Director joins leadership meetings, owns the procurement strategy, manages key supplier relationships, and ensures procurement delivers measurable value. Engagements typically start with a procurement audit and opportunity assessment." },
  { question: "What's the difference between fractional procurement and procurement consulting?", answer: "Procurement consultants advise on specific projects or conduct sourcing events. Fractional Procurement Directors provide strategic leadership - they own procurement direction, manage the team, negotiate contracts directly, and are accountable for savings delivery. They're your procurement leader, not an external advisor." },
  { question: "How much do fractional procurement services cost?", answer: "Fractional Procurement Director day rates in the UK range from £800-£1,200. A typical 2-day per week engagement costs £6,400-£9,600 per month (£77,000-£115,000 annually). This is 40-60% less than a full-time Procurement Director with benefits and bonus." },
  { question: "When should a company use fractional procurement services?", answer: "Ideal situations: transforming procurement from reactive to strategic, need to deliver significant cost savings, building first procurement team, implementing new P2P systems, M&A integration requiring contract review, or bridging gap while hiring full-time Procurement Director." },
]

const SERVICES = [
  { title: 'Strategic Sourcing', description: 'Category strategy development, supplier market analysis, and sourcing execution for high-value categories', icon: '🎯' },
  { title: 'Supplier Management', description: 'Key supplier relationships, performance scorecards, supplier development, and relationship governance', icon: '🤝' },
  { title: 'Contract Negotiation', description: 'Commercial negotiations, contract drafting, terms optimisation, and risk management', icon: '📋' },
  { title: 'Cost Optimisation', description: 'Spend analysis, savings identification, demand management, and value tracking', icon: '💰' },
  { title: 'Team Development', description: 'Procurement team building, training, capability assessment, and operating model design', icon: '👥' },
  { title: 'Digital Procurement', description: 'P2P system selection and implementation, e-sourcing, and procurement analytics', icon: '💻' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Procurement Advisory', days: '1 day/week', price: '£3,200-£4,800/month', description: 'Strategic guidance, contract reviews, supplier negotiations', best: 'Existing procurement team' },
  { name: 'Part-Time Procurement Director', days: '2 days/week', price: '£6,400-£9,600/month', description: 'Lead procurement function, drive savings, build team', best: 'Mid-market, transformation' },
  { name: 'Intensive Procurement Lead', days: '3 days/week', price: '£9,600-£14,400/month', description: 'Major sourcing events, system implementations', best: 'Procurement transformation' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional Procurement Services', href: '/fractional-procurement-services' }]

export default function FractionalProcurementServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional Procurement Services UK | Part-Time Procurement Leadership" description="Get experienced procurement leadership without full-time commitment." url="https://fractional.quest/fractional-procurement-services" dateModified={new Date('2026-01-17')} />
      <FAQPageSchema faqs={SERVICE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80" alt="Fractional Procurement Services" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 via-teal-800/90 to-cyan-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Procurement Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional Procurement Services</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced procurement leadership</strong> without the full-time commitment. Strategic sourcing, supplier management, and cost optimisation with a senior Procurement Director working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-procurement-jobs-uk" className="px-6 py-3 bg-white text-teal-900 font-bold rounded-lg hover:bg-teal-50 transition-colors">Find a Fractional Procurement Director</Link>
                <Link href="/hire-fractional-procurement" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">How to Hire</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-teal-200">£800-£1,200</div><div className="text-teal-300/70 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-teal-200">1-3 days</div><div className="text-teal-300/70 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-teal-200">15-25%</div><div className="text-teal-300/70 text-sm">Typical Savings</div></div><div><div className="text-3xl font-black text-teal-200">MCIPS</div><div className="text-teal-300/70 text-sm">Qualified</div></div></div></div></section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional Procurement Service Areas</h2>
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
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Flexible options to match your procurement maturity and transformation needs</p>
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

      {/* Job Board Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Opportunities</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Current Fractional Procurement Jobs</h2>
          </div>
          <EmbeddedJobBoard defaultDepartment="Operations" title="" accentColor="teal" jobsPerPage={6} />
        </div>
      </section>

      <section className="py-20 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional Procurement Services</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional Procurement Director</strong> provides senior procurement leadership without the cost and commitment of a full-time hire. This model is particularly valuable for companies that need strategic sourcing direction but aren't yet at the scale to justify a full-time Head of Procurement.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional Procurement Services</h3><ul className="space-y-2 text-gray-600"><li><strong>Procurement transformation</strong> - Moving from reactive purchasing to strategic sourcing</li><li><strong>Cost reduction pressure</strong> - Need to deliver significant savings quickly</li><li><strong>Supply chain risk</strong> - Building resilience after disruption</li><li><strong>M&A integration</strong> - Due diligence and contract consolidation</li><li><strong>System implementation</strong> - P2P or e-procurement platform deployment</li><li><strong>Interim cover</strong> - Bridging gap while recruiting Head of Procurement</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fractional Procurement vs Procurement Consultant</h3><div className="not-prose overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">Aspect</th><th className="text-left py-3 px-4">Fractional Procurement</th><th className="text-left py-3 px-4">Procurement Consultant</th></tr></thead><tbody><tr className="border-b"><td className="py-3 px-4 font-semibold">Accountability</td><td className="py-3 px-4">Owns procurement outcomes</td><td className="py-3 px-4">Advises on projects</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Team Leadership</td><td className="py-3 px-4">Manages team directly</td><td className="py-3 px-4">External to organisation</td></tr><tr><td className="py-3 px-4 font-semibold">Supplier Relationships</td><td className="py-3 px-4">Owns key relationships</td><td className="py-3 px-4">Project-based involvement</td></tr></tbody></table></div><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-procurement-jobs-uk" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">Find Fractional Procurement Directors</h4><p className="text-sm text-gray-600">Browse available procurement leaders</p></Link><Link href="/hire-fractional-procurement" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire</h4><p className="text-sm text-gray-600">Guide to hiring fractional procurement</p></Link><Link href="/fractional-procurement" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">What is Fractional Procurement?</h4><p className="text-sm text-gray-600">Understanding the role</p></Link><Link href="/fractional-jobs-london" className="p-4 border rounded-lg hover:border-teal-300 transition-colors"><h4 className="font-bold text-gray-900">London Fractional Jobs</h4><p className="text-sm text-gray-600">Top UK market for fractional roles</p></Link></div></article></div></section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional Procurement Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Transform Your Procurement?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Connect with experienced fractional Procurement Directors who can deliver immediate value and measurable savings.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-procurement-jobs-uk" className="px-8 py-4 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-400 transition-colors">Find Procurement Directors</Link>
            <Link href="/fractional-jobs-london" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">London Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
