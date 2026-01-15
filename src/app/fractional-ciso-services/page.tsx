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
  title: 'Fractional CISO Services UK',
  description: 'Fractional CISO services for UK businesses. Security leadership 1-3 days/week. SOC 2, ISO 27001 compliance from £900/day.',
  keywords: 'fractional ciso services, fractional ciso uk, part time ciso, fractional security director, outsourced ciso services, ciso as a service',
  alternates: { canonical: 'https://fractional.quest/fractional-ciso-services' },
  openGraph: {
    title: 'Fractional CISO Services UK | Part-Time Security Leadership',
    description: 'Get experienced CISO leadership without full-time commitment. Security strategy, compliance, risk management.',
    url: 'https://fractional.quest/fractional-ciso-services',
  },
}

const SERVICE_FAQS = [
  { question: "What's included in fractional CISO services?", answer: "Fractional CISO services typically include: security strategy and programme development, compliance frameworks (SOC 2, ISO 27001, GDPR), risk assessment and management, security architecture review, incident response planning, vendor security assessment, and board-level security reporting." },
  { question: "How do fractional CISO engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. Your fractional CISO joins leadership meetings, develops security strategy, oversees compliance programmes, and ensures the organisation meets security requirements. Engagements often start with a security assessment and gap analysis." },
  { question: "What's the difference between fractional CISO and security consultant?", answer: "Security consultants handle specific projects like penetration tests or audits. Fractional CISOs provide strategic leadership - they own the security programme, report to the board, manage security budgets, and are accountable for organisational security posture. They're your security leader, not a project resource." },
  { question: "How much do fractional CISO services cost?", answer: "Fractional CISO day rates in the UK range from £900-£1,400. A typical 2-day per week engagement costs £7,200-£11,200 per month (£86,400-£134,400 annually). This is 40-60% less than a full-time CISO with benefits and equity." },
  { question: "When should a company use fractional CISO services?", answer: "Ideal situations: preparing for SOC 2 or ISO 27001 certification, enterprise sales requiring security assurance, post-breach recovery, scaling security from ad-hoc to mature, satisfying investor security due diligence, or building security function before hiring full-time." },
]

const SERVICES = [
  { title: 'Security Strategy', description: 'Develop security programme, policies, and roadmap aligned with business risk appetite', icon: '🎯' },
  { title: 'Compliance & Certification', description: 'SOC 2, ISO 27001, GDPR, PCI-DSS - achieve and maintain compliance certifications', icon: '✅' },
  { title: 'Risk Management', description: 'Risk assessment, threat modelling, security metrics, board reporting', icon: '⚠️' },
  { title: 'Security Architecture', description: 'Review infrastructure security, cloud security, application security practices', icon: '🏗️' },
  { title: 'Incident Response', description: 'Develop incident response plans, run tabletop exercises, breach management', icon: '🚨' },
  { title: 'Vendor & Third Party', description: 'Security assessments of vendors, contract review, supply chain risk', icon: '🤝' },
]

const ENGAGEMENT_MODELS = [
  { name: 'Security Advisory', days: '1 day/week', price: '£3,600-£5,600/month', description: 'Strategic oversight, compliance guidance, board reporting', best: 'Mature security team in place' },
  { name: 'Part-Time CISO', days: '2 days/week', price: '£7,200-£11,200/month', description: 'Lead security function, drive certifications, manage team', best: 'SOC 2/ISO prep, scaling' },
  { name: 'Intensive CISO', days: '3 days/week', price: '£10,800-£16,800/month', description: 'Deep involvement, major compliance, post-incident', best: 'Certifications, incidents' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional CISO Services', href: '/fractional-ciso-services' }]

export default function FractionalCISOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CISO Services UK | Part-Time Security Leadership" description="Get experienced CISO leadership without full-time commitment." url="https://fractional.quest/fractional-ciso-services" dateModified={new Date('2025-01-08')} />
      <FAQPageSchema faqs={SERVICE_FAQS} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80" alt="Fractional CISO Services" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/95 via-red-800/90 to-rose-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Security Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Fractional CISO Services</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced CISO leadership</strong> without the full-time commitment. Security strategy, compliance programmes, and risk management with a senior security leader working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-ciso-jobs-uk" className="px-6 py-3 bg-white text-red-900 font-bold rounded-lg hover:bg-red-50 transition-colors">Find a Fractional CISO</Link>
                <Link href="/hire-fractional-ciso" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">How to Hire</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-red-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-red-200">£900-£1,400</div><div className="text-red-300/70 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-red-200">1-3 days</div><div className="text-red-300/70 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-red-200">SOC 2</div><div className="text-red-300/70 text-sm">ISO 27001 Ready</div></div><div><div className="text-3xl font-black text-red-200">CISSP</div><div className="text-red-300/70 text-sm">Typically Certified</div></div></div></div></section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CISO Service Areas</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.title} className="p-6 border rounded-xl hover:border-red-300 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Engagement Models</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Flexible options to match your security maturity and compliance needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model) => (
              <div key={model.name} className="bg-white p-8 rounded-xl border hover:border-red-400 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <div className="text-3xl font-black text-red-700 mb-1">{model.days}</div>
                <div className="text-red-600 font-semibold mb-4">{model.price}</div>
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

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional CISO Services</h2><p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional CISO</strong> provides senior security leadership without the cost and commitment of a full-time hire. This model is particularly valuable for companies that need enterprise-grade security leadership but aren't yet at the scale to justify a full-time CISO (typically £180k-£300k+ total package).</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional CISO Services</h3><ul className="space-y-2 text-gray-600"><li><strong>Compliance requirements</strong> - SOC 2, ISO 27001, GDPR, PCI-DSS certification</li><li><strong>Enterprise sales</strong> - Security questionnaires, customer audits</li><li><strong>Fundraising</strong> - Investor security due diligence</li><li><strong>Post-incident</strong> - Recovery and remediation after breach</li><li><strong>Scaling security</strong> - Building from ad-hoc to mature programme</li><li><strong>Board requirements</strong> - Security reporting and governance</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fractional CISO vs Security Consultant vs MSP</h3><div className="not-prose overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">Provider</th><th className="text-left py-3 px-4">Focus</th><th className="text-left py-3 px-4">Accountability</th><th className="text-left py-3 px-4">Duration</th></tr></thead><tbody><tr className="border-b"><td className="py-3 px-4 font-semibold">Fractional CISO</td><td className="py-3 px-4">Strategy, leadership</td><td className="py-3 px-4">Owns security posture</td><td className="py-3 px-4">Ongoing</td></tr><tr className="border-b"><td className="py-3 px-4 font-semibold">Security Consultant</td><td className="py-3 px-4">Project-based</td><td className="py-3 px-4">Deliverables only</td><td className="py-3 px-4">Weeks/months</td></tr><tr><td className="py-3 px-4 font-semibold">MSP/MSSP</td><td className="py-3 px-4">Operations, monitoring</td><td className="py-3 px-4">Service delivery</td><td className="py-3 px-4">Contract term</td></tr></tbody></table></div><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-ciso-jobs-uk" className="p-4 border rounded-lg hover:border-red-300 transition-colors"><h4 className="font-bold text-gray-900">Find Fractional CISOs</h4><p className="text-sm text-gray-600">Browse available fractional CISOs</p></Link><Link href="/hire-fractional-ciso" className="p-4 border rounded-lg hover:border-red-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire</h4><p className="text-sm text-gray-600">Guide to hiring a fractional CISO</p></Link><Link href="/fractional-ciso-salary" className="p-4 border rounded-lg hover:border-red-300 transition-colors"><h4 className="font-bold text-gray-900">CISO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link><Link href="/fractional-ciso" className="p-4 border rounded-lg hover:border-red-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CISO?</h4><p className="text-sm text-gray-600">Understanding the role</p></Link></div></article></div></section>

      <section className="py-20 bg-red-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CISO Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
