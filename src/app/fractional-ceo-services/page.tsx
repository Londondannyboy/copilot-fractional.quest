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
  title: 'Fractional CEO Services UK | Part-Time Executive Leadership',
  description: 'Fractional CEO services for UK businesses. Get experienced executive leadership 1-3 days per week. Strategic direction, board management, fundraising, turnarounds. Day rates from £1,200.',
  keywords: 'fractional ceo services, fractional ceo uk, part time ceo, interim ceo services, outsourced ceo services, ceo as a service',
  alternates: { canonical: 'https://fractional.quest/fractional-ceo-services' },
  openGraph: {
    title: 'Fractional CEO Services UK | Part-Time Executive Leadership',
    description: 'Get experienced CEO leadership without full-time commitment. Strategic direction, board management, fundraising support.',
    url: 'https://fractional.quest/fractional-ceo-services',
  },
}

const SERVICE_FAQS = [
  { question: "What's included in fractional CEO services?", answer: "Fractional CEO services typically include: strategic planning and execution, board and investor relations, leadership team development, fundraising support, M&A guidance, crisis management, and organisational transformation. The scope is tailored to your specific business needs." },
  { question: "How do fractional CEO engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. Your fractional CEO chairs board meetings, leads the executive team, drives strategic initiatives, and represents the company to investors. Engagements often start with a strategic review and 100-day plan." },
  { question: "What's the difference between fractional CEO and chairman?", answer: "A chairman governs the board and provides oversight. A fractional CEO is an operational executive who leads day-to-day strategy, manages the leadership team, and drives execution. Many companies use a fractional CEO when they need active leadership without a full-time commitment." },
  { question: "How much do fractional CEO services cost?", answer: "Fractional CEO day rates in the UK range from £1,200-£2,500. A typical 2-day per week engagement costs £9,600-£20,000 per month (£115,200-£240,000 annually). This is significantly less than a full-time CEO package including salary, benefits, and equity." },
  { question: "When should a company use fractional CEO services?", answer: "Ideal situations: founder transition to board role, turnaround situations, post-acquisition leadership, fundraising intensive periods, bridging gap while recruiting permanent CEO, or portfolio company oversight for PE/VC firms." },
]

const SERVICES = [
  { title: 'Strategic Leadership', description: 'Define and execute company strategy, set priorities, drive organisational alignment', icon: '🎯' },
  { title: 'Board & Investor Relations', description: 'Chair board meetings, manage investor communications, lead fundraising efforts', icon: '📊' },
  { title: 'Leadership Team Development', description: 'Build and develop executive team, establish governance, drive accountability', icon: '👥' },
  { title: 'Fundraising & M&A', description: 'Lead fundraising rounds, manage due diligence, execute acquisition or exit strategies', icon: '💰' },
  { title: 'Turnaround & Transformation', description: 'Lead organisational change, crisis management, restructuring initiatives', icon: '🔄' },
  { title: 'Stakeholder Management', description: 'Represent company externally, manage key relationships, build strategic partnerships', icon: '🤝' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Strategic Oversight', days: '1 day/week', price: '£4,800-£10,000/month', description: 'Board chair, strategic direction, investor liaison', best: 'Founder-led with strong exec team' },
  { name: 'Active CEO', days: '2 days/week', price: '£9,600-£20,000/month', description: 'Lead exec team, drive strategy, fundraising', best: 'Transitions, growth phases' },
  { name: 'Full Engagement', days: '3+ days/week', price: '£14,400-£30,000/month', description: 'Near full-time leadership, turnarounds, M&A', best: 'Turnarounds, critical phases' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional CEO Services', href: '/fractional-ceo-services' }]

export default function FractionalCEOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CEO Services UK | Part-Time Executive Leadership" description="Get experienced CEO leadership without full-time commitment." url="https://fractional.quest/fractional-ceo-services" dateModified={new Date('2025-01-08')} />
      <FAQPageSchema faqs={SERVICE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80" alt="Fractional CEO Services" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-yellow-800/90 to-orange-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Executive Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional CEO Services</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced CEO leadership</strong> without the full-time commitment. Strategic direction, board management, and executive leadership with a senior CEO working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-ceo-jobs-uk" className="px-6 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-colors">Find a Fractional CEO</Link>
                <Link href="/hire-fractional-ceo" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">How to Hire</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-amber-200">£1,200-£2,500</div><div className="text-amber-300/70 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-amber-200">1-3 days</div><div className="text-amber-300/70 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-amber-200">PE/VC</div><div className="text-amber-300/70 text-sm">Portfolio Experience</div></div><div><div className="text-3xl font-black text-amber-200">Board</div><div className="text-amber-300/70 text-sm">Level Leadership</div></div></div></div></section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CEO Service Areas</h2>
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
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Flexible options to match your leadership needs and company stage</p>
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

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional CEO Services</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional CEO</strong> provides senior executive leadership without the cost and commitment of a full-time hire. This model is particularly valuable during transitions, turnarounds, or when businesses need experienced leadership but aren't ready for a permanent CEO.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional CEO Services</h3><ul className="space-y-2 text-gray-600"><li><strong>Founder transition</strong> - When founders move to board roles or exit day-to-day</li><li><strong>Turnaround</strong> - Crisis management and business restructuring</li><li><strong>Post-acquisition</strong> - Integration leadership after M&A</li><li><strong>Fundraising</strong> - Intensive investor relations periods</li><li><strong>Portfolio companies</strong> - PE/VC firms providing leadership to investments</li><li><strong>Executive search</strong> - Bridging gap while recruiting permanent CEO</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fractional CEO vs Interim CEO vs Chairman</h3><div className="not-prose overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">Role</th><th className="text-left py-3 px-4">Focus</th><th className="text-left py-3 px-4">Commitment</th><th className="text-left py-3 px-4">Duration</th></tr></thead><tbody><tr className="border-b"><td className="py-3 px-4 font-semibold">Fractional CEO</td><td className="py-3 px-4">Active leadership, part-time</td><td className="py-3 px-4">1-3 days/week</td><td className="py-3 px-4">6-24 months</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Interim CEO</td><td className="py-3 px-4">Full-time, temporary</td><td className="py-3 px-4">Full-time</td><td className="py-3 px-4">3-12 months</td></tr><tr><td className="py-3 px-4 font-semibold">Chairman</td><td className="py-3 px-4">Board governance</td><td className="py-3 px-4">1-2 days/month</td><td className="py-3 px-4">Ongoing</td></tr></tbody></table></div><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-ceo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Find Fractional CEOs</h4><p className="text-sm text-gray-600">Browse available fractional CEOs</p></Link><Link href="/hire-fractional-ceo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire</h4><p className="text-sm text-gray-600">Guide to hiring a fractional CEO</p></Link><Link href="/fractional-ceo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CEO?</h4><p className="text-sm text-gray-600">Understanding the role</p></Link><Link href="/interim-ceo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CEO Jobs</h4><p className="text-sm text-gray-600">Full-time temporary positions</p></Link></div></article></div></section>

      <section className="py-20 bg-amber-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CEO Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
