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
  title: 'Fractional CHRO Services UK | Part-Time HR Leadership',
  description: 'Fractional CHRO services for UK businesses. Get experienced HR leadership 1-3 days per week. People strategy, talent acquisition, culture transformation, employment law. Day rates from £800.',
  keywords: 'fractional chro services, fractional chro uk, part time chro, fractional hr director, outsourced hr services, chro as a service',
  alternates: { canonical: 'https://fractional.quest/fractional-chro-services' },
  openGraph: {
    title: 'Fractional CHRO Services UK | Part-Time HR Leadership',
    description: 'Get experienced CHRO leadership without full-time commitment. People strategy, talent acquisition, culture transformation.',
    url: 'https://fractional.quest/fractional-chro-services',
  },
}

const SERVICE_FAQS = [
  { question: "What's included in fractional CHRO services?", answer: "Fractional CHRO services typically include: people strategy development, talent acquisition and retention, organisational design, compensation and benefits strategy, employment law compliance, HR technology implementation, and culture and engagement initiatives." },
  { question: "How do fractional CHRO engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. Your fractional CHRO joins leadership meetings, develops people strategy, oversees HR operations, and ensures the organisation has the talent and culture to achieve its goals. Engagements often start with an HR audit." },
  { question: "What's the difference between fractional CHRO and HR consultant?", answer: "HR consultants advise on specific projects or policies. Fractional CHROs provide strategic leadership - they own the people function, sit on the exec team, develop long-term people strategy, and are accountable for workforce outcomes. They're your HR leader, not an external advisor." },
  { question: "How much do fractional CHRO services cost?", answer: "Fractional CHRO day rates in the UK range from £800-£1,200. A typical 2-day per week engagement costs £6,400-£9,600 per month (£76,800-£115,200 annually). This is 40-60% less than a full-time CHRO with benefits and equity." },
  { question: "When should a company use fractional CHRO services?", answer: "Ideal situations: scaling from 20 to 100+ employees, preparing for fundraising (investors scrutinise people strategy), implementing performance management, building employer brand, managing rapid hiring, or professionalising HR before hiring full-time." },
]

const SERVICES = [
  { title: 'People Strategy', description: 'Develop workforce planning, succession planning, and talent strategy aligned with business goals', icon: '🎯' },
  { title: 'Talent Acquisition', description: 'Build recruiting capabilities, employer brand, candidate experience, and hiring processes', icon: '👥' },
  { title: 'Organisational Design', description: 'Structure teams, define roles, implement reporting lines, manage org changes', icon: '🏗️' },
  { title: 'Culture & Engagement', description: 'Shape company culture, implement engagement programmes, drive retention', icon: '❤️' },
  { title: 'Compensation & Benefits', description: 'Design pay structures, equity schemes, benefits packages, benchmarking', icon: '💰' },
  { title: 'HR Operations & Compliance', description: 'Employment law, policies, HRIS implementation, performance management', icon: '⚖️' },
]

const ENGAGEMENT_MODELS = [
  { name: 'HR Advisory', days: '1 day/week', price: '£3,200-£4,800/month', description: 'Strategic oversight, policy guidance, leadership support', best: 'Strong HR manager in place' },
  { name: 'Part-Time CHRO', days: '2 days/week', price: '£6,400-£9,600/month', description: 'Lead HR function, drive initiatives, manage team', best: 'Scaling companies, 50-200 people' },
  { name: 'Intensive CHRO', days: '3 days/week', price: '£9,600-£14,400/month', description: 'Deep involvement, transformations, rapid hiring', best: 'High-growth, M&A integration' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional CHRO Services', href: '/fractional-chro-services' }]

export default function FractionalCHROServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CHRO Services UK | Part-Time HR Leadership" description="Get experienced CHRO leadership without full-time commitment." url="https://fractional.quest/fractional-chro-services" dateModified={new Date('2025-01-08')} />
      <FAQPageSchema faqs={SERVICE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80" alt="Fractional CHRO Services" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-purple-800/90 to-violet-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">People Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional CHRO Services</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced CHRO leadership</strong> without the full-time commitment. People strategy, talent acquisition, and culture transformation with a senior HR leader working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-chro-jobs-uk" className="px-6 py-3 bg-white text-purple-900 font-bold rounded-lg hover:bg-purple-50 transition-colors">Find a Fractional CHRO</Link>
                <Link href="/hire-fractional-chro" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">How to Hire</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-purple-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-purple-200">£800-£1,200</div><div className="text-purple-300/70 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-purple-200">1-3 days</div><div className="text-purple-300/70 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-purple-200">40-60%</div><div className="text-purple-300/70 text-sm">Cost Savings vs FT</div></div><div><div className="text-3xl font-black text-purple-200">CIPD</div><div className="text-purple-300/70 text-sm">Typically Qualified</div></div></div></div></section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CHRO Service Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.title} className="p-6 border rounded-xl hover:border-purple-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-purple-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Engagement Models</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Flexible options to match your people needs and company stage</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model) => (
              <div key={model.name} className="bg-white p-8 rounded-xl border hover:border-purple-400 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <div className="text-3xl font-black text-purple-700 mb-1">{model.days}</div>
                <div className="text-purple-600 font-semibold mb-4">{model.price}</div>
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

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional CHRO Services</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional CHRO</strong> provides senior HR leadership without the cost and commitment of a full-time hire. This model is particularly valuable for scaling companies that need strategic people leadership but aren't yet at the size to justify a full-time CHRO.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional CHRO Services</h3><ul className="space-y-2 text-gray-600"><li><strong>Scaling teams</strong> - Growing from 30 to 150+ employees</li><li><strong>Pre-fundraise</strong> - Professionalising HR before Series A/B</li><li><strong>Culture transformation</strong> - Major change initiatives</li><li><strong>Rapid hiring</strong> - Building recruiting at scale</li><li><strong>Employment issues</strong> - Complex people challenges</li><li><strong>Interim cover</strong> - Bridging gap while recruiting HR Director</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fractional CHRO vs HR Manager vs Consultant</h3><div className="not-prose overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">Role</th><th className="text-left py-3 px-4">Focus</th><th className="text-left py-3 px-4">Level</th><th className="text-left py-3 px-4">Accountability</th></tr></thead><tbody><tr className="border-b"><td className="py-3 px-4 font-semibold">Fractional CHRO</td><td className="py-3 px-4">People strategy</td><td className="py-3 px-4">C-suite</td><td className="py-3 px-4">Owns outcomes</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">HR Manager</td><td className="py-3 px-4">HR operations</td><td className="py-3 px-4">Mid-level</td><td className="py-3 px-4">Executes policy</td></tr><tr><td className="py-3 px-4 font-semibold">HR Consultant</td><td className="py-3 px-4">Project-based</td><td className="py-3 px-4">External</td><td className="py-3 px-4">Advises</td></tr></tbody></table></div><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-chro-jobs-uk" className="p-4 border rounded-lg hover:border-purple-300 transition-colors"><h4 className="font-bold text-gray-900">Find Fractional CHROs</h4><p className="text-sm text-gray-600">Browse available fractional CHROs</p></Link><Link href="/hire-fractional-chro" className="p-4 border rounded-lg hover:border-purple-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire</h4><p className="text-sm text-gray-600">Guide to hiring a fractional CHRO</p></Link><Link href="/fractional-chro-salary" className="p-4 border rounded-lg hover:border-purple-300 transition-colors"><h4 className="font-bold text-gray-900">CHRO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-chro" className="p-4 border rounded-lg hover:border-purple-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CHRO?</h4><p className="text-sm text-gray-600">Understanding the role</p></Link></div></article></div></section>

      <section className="py-20 bg-purple-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CHRO Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
