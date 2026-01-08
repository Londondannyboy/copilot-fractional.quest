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
  title: 'Fractional CTO Services UK | Part-Time Technology Leadership',
  description: 'Fractional CTO services for UK businesses. Get experienced technology leadership 1-3 days per week. Tech strategy, architecture, team building, and digital transformation. Day rates from £900.',
  keywords: 'fractional cto services, fractional cto uk, part time cto, fractional technology director, outsourced cto services, cto as a service',
  alternates: { canonical: 'https://fractional.quest/fractional-cto-services' },
  openGraph: {
    title: 'Fractional CTO Services UK | Part-Time Technology Leadership',
    description: 'Get experienced CTO leadership without full-time commitment. Tech strategy, architecture, team building, digital transformation.',
    url: 'https://fractional.quest/fractional-cto-services',
  },
}

const SERVICE_FAQS = [
  { question: "What's included in fractional CTO services?", answer: "Fractional CTO services typically include: technology strategy and roadmap, architecture design and review, engineering team leadership and hiring, vendor and technology selection, technical due diligence, security and compliance oversight, and board-level technology reporting." },
  { question: "How do fractional CTO engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. Your fractional CTO joins leadership meetings, directs technology strategy, manages engineering teams, and ensures technical decisions align with business goals. Engagements typically start with a technical assessment and roadmap." },
  { question: "What's the difference between fractional CTO and development agency?", answer: "Development agencies build products. Fractional CTOs provide strategic technology leadership - they set technical direction, hire and manage teams, choose vendors, and are accountable for technology outcomes. Think of them as your technology leader who directs development work." },
  { question: "How much do fractional CTO services cost?", answer: "Fractional CTO day rates in the UK range from £900-£1,400. A typical 2-day per week engagement costs £7,200-£11,200 per month (£86,400-£134,400 annually). This is 40-60% less than a full-time CTO with benefits, bonus, and equity." },
  { question: "When should a company use fractional CTO services?", answer: "Ideal situations: building technical team for the first time, scaling from MVP to enterprise, preparing for technical due diligence (fundraising/exit), implementing major platform changes, managing complex integrations, or bridging gap while hiring full-time CTO." },
]

const SERVICES = [
  { title: 'Technology Strategy', description: 'Define technology roadmap, platform decisions, and technical architecture aligned with business goals', icon: '🎯' },
  { title: 'Team Building', description: 'Hire and develop engineering talent, define team structure, implement engineering culture', icon: '👥' },
  { title: 'Architecture & Platform', description: 'Design scalable systems, evaluate build vs buy decisions, manage technical debt', icon: '🏗️' },
  { title: 'Vendor & Partner Management', description: 'Select technology vendors, negotiate contracts, manage agency relationships', icon: '🤝' },
  { title: 'Security & Compliance', description: 'Implement security best practices, GDPR compliance, SOC 2 preparation, risk management', icon: '🔒' },
  { title: 'Technical Due Diligence', description: 'Support for fundraising, M&A, or investor technical assessments', icon: '📊' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Advisory', days: '1 day/week', price: '£3,600-£5,600/month', description: 'Strategic oversight, architecture reviews, board reporting', best: 'Post-MVP with dev team' },
  { name: 'Part-Time CTO', days: '2 days/week', price: '£7,200-£11,200/month', description: 'Active leadership, team management, platform decisions', best: 'Series A/B, scaling tech' },
  { name: 'Intensive CTO', days: '3 days/week', price: '£10,800-£16,800/month', description: 'Deep involvement, major builds, transformations', best: 'Platform rebuilds, due diligence' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional CTO Services', href: '/fractional-cto-services' }]

export default function FractionalCTOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CTO Services UK | Part-Time Technology Leadership" description="Get experienced CTO leadership without full-time commitment." url="https://fractional.quest/fractional-cto-services" dateModified={new Date('2025-01-08')} />
      <FAQPageSchema faqs={SERVICE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80" alt="Fractional CTO Services" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/95 via-cyan-800/90 to-blue-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Technology Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional CTO Services</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced CTO leadership</strong> without the full-time commitment. Technology strategy, architecture, team building, and digital transformation with a senior technology leader working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-cto-jobs-uk" className="px-6 py-3 bg-white text-cyan-900 font-bold rounded-lg hover:bg-cyan-50 transition-colors">Find a Fractional CTO</Link>
                <Link href="/hire-fractional-cto" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">How to Hire</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cyan-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-cyan-200">£900-£1,400</div><div className="text-cyan-300/70 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-cyan-200">1-3 days</div><div className="text-cyan-300/70 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-cyan-200">40-60%</div><div className="text-cyan-300/70 text-sm">Cost Savings vs FT</div></div><div><div className="text-3xl font-black text-cyan-200">Technical</div><div className="text-cyan-300/70 text-sm">Due Diligence Ready</div></div></div></div></section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CTO Service Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.title} className="p-6 border rounded-xl hover:border-cyan-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-cyan-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Engagement Models</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Flexible options to match your technology maturity and growth stage</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model) => (
              <div key={model.name} className="bg-white p-8 rounded-xl border hover:border-cyan-400 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <div className="text-3xl font-black text-cyan-700 mb-1">{model.days}</div>
                <div className="text-cyan-600 font-semibold mb-4">{model.price}</div>
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

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional CTO Services</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional CTO</strong> provides senior technology leadership without the cost and commitment of a full-time hire. This model is particularly valuable for companies that need strategic technical direction but aren't yet at the scale to justify a full-time CTO.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional CTO Services</h3><ul className="space-y-2 text-gray-600"><li><strong>Building first tech team</strong> - Hiring engineers, setting up processes</li><li><strong>Scaling from MVP</strong> - Architecture for growth, technical debt management</li><li><strong>Pre-fundraise</strong> - Technical due diligence preparation</li><li><strong>Platform rebuild</strong> - Major technology transformations</li><li><strong>Digital transformation</strong> - Moving from legacy to modern systems</li><li><strong>Interim cover</strong> - Bridging gap while recruiting permanent CTO</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fractional CTO vs Dev Agency vs Consultant</h3><div className="not-prose overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">Aspect</th><th className="text-left py-3 px-4">Fractional CTO</th><th className="text-left py-3 px-4">Dev Agency</th><th className="text-left py-3 px-4">Consultant</th></tr></thead><tbody><tr className="border-b"><td className="py-3 px-4 font-semibold">Focus</td><td className="py-3 px-4">Strategy + execution</td><td className="py-3 px-4">Building products</td><td className="py-3 px-4">Advice</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Accountability</td><td className="py-3 px-4">Owns tech outcomes</td><td className="py-3 px-4">Delivers to spec</td><td className="py-3 px-4">Recommendations</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Team building</td><td className="py-3 px-4">Yes - hires, leads</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Sometimes advises</td></tr><tr><td className="py-3 px-4 font-semibold">Board presence</td><td className="py-3 px-4">Yes</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Rarely</td></tr></tbody></table></div><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-cto-jobs-uk" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Find Fractional CTOs</h4><p className="text-sm text-gray-600">Browse available fractional CTOs</p></Link><Link href="/hire-fractional-cto" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire</h4><p className="text-sm text-gray-600">Guide to hiring a fractional CTO</p></Link><Link href="/fractional-cto-salary" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">CTO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-cto" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CTO?</h4><p className="text-sm text-gray-600">Understanding the role</p></Link></div></article></div></section>

      <section className="py-20 bg-cyan-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CTO Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
