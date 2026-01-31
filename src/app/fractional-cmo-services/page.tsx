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
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'

export const metadata: Metadata = {
  title: 'Fractional CMO Services UK | Virtual CMO & Part-Time Marketing Leadership',
  description: 'Fractional CMO & Virtual CMO services for UK businesses. Marketing leadership 1-3 days/week. Brand strategy, demand generation from £850/day. London, Manchester, Birmingham.',
  keywords: 'fractional cmo services, virtual cmo, virtual cmo services, fractional cmo uk, part time cmo services, fractional marketing director, outsourced cmo services, cmo as a service, fractional chief marketing officer, virtual cmo uk',
  alternates: { canonical: 'https://fractional.quest/fractional-cmo-services' },
  openGraph: {
    title: 'Fractional CMO Services UK | Virtual CMO & Part-Time Marketing Leadership',
    description: 'Get experienced CMO leadership without full-time commitment. Fractional CMO and Virtual CMO services: brand strategy, demand generation, marketing transformation.',
    url: 'https://fractional.quest/fractional-cmo-services',
  },
}

// Table of Contents items
const tocItems = [
  { id: 'service-areas', title: 'Service Areas' },
  { id: 'engagement-models', title: 'Engagement Models & Pricing' },
  { id: 'hourly-rates', title: 'Hourly Rates' },
  { id: 'comparison', title: 'Fractional vs Interim vs Full-Time' },
  { id: 'current-jobs', title: 'Current CMO Jobs' },
  { id: 'when-to-use', title: 'When to Use CMO Services' },
  { id: 'success-stories', title: 'Success Stories' },
  { id: 'resources', title: 'Professional Resources' },
  { id: 'faq', title: 'FAQ' },
]

// Authority links for E-E-A-T
const authorityLinks = [
  { name: 'Chartered Institute of Marketing (CIM)', url: 'https://www.cim.co.uk', description: 'UK\'s leading professional body for marketing', icon: '📚' },
  { name: 'Data & Marketing Association (DMA)', url: 'https://dma.org.uk', description: 'UK direct and data-driven marketing body', icon: '📊' },
  { name: 'Marketing Week', url: 'https://www.marketingweek.com', description: 'Leading UK marketing publication', icon: '📰' },
  { name: 'IPA (Institute of Practitioners in Advertising)', url: 'https://ipa.co.uk', description: 'UK advertising industry body', icon: '🏆' },
  { name: 'WARC', url: 'https://www.warc.com', description: 'Marketing effectiveness research', icon: '📈' },
  { name: 'B2B Marketing', url: 'https://b2bmarketing.net', description: 'B2B marketing community and awards', icon: '🎯' },
]

const SERVICE_FAQS = [
  { question: "What's included in fractional CMO services?", answer: "Fractional CMO services typically include: marketing strategy development, brand positioning and messaging, demand generation and pipeline growth, marketing team leadership, agency and vendor management, marketing technology stack optimisation, and board-level marketing reporting." },
  { question: "How do fractional CMO engagements work?", answer: "Most engagements are 1-3 days per week on a retained basis. Your fractional CMO joins leadership meetings, directs marketing strategy, manages teams and agencies, and drives measurable marketing outcomes. Engagements typically start with a strategic assessment and 90-day plan." },
  { question: "What's the difference between fractional CMO and marketing agency?", answer: "Agencies execute campaigns and produce content. Fractional CMOs provide strategic leadership - they set direction, manage agencies, hire teams, and are accountable for overall marketing performance. Think of them as your marketing leader who directs agency work." },
  { question: "How much do fractional CMO services cost?", answer: "Fractional CMO day rates in the UK range from £850-£1,300. A typical 2-day per week engagement costs £6,800-£10,400 per month (£81,600-£124,800 annually). This is 40-60% less than a full-time CMO with benefits and equity." },
  { question: "When should a company use fractional CMO services?", answer: "Ideal situations: scaling marketing beyond founder-led efforts, repositioning brand for growth, building demand generation engine, preparing for fundraising, professionalising marketing operations, or bridging gap while hiring full-time CMO." },
  { question: "Where are your fractional CMOs based?", answer: "Our fractional CMOs are based across the UK, with strong presence in London (our largest market), Manchester, Birmingham, Edinburgh, Bristol, and Leeds. Most work hybrid arrangements combining remote work with on-site client days." },
  { question: "How long do fractional CMO engagements typically last?", answer: "Most engagements start with a 3-month trial period, then extend to 6-18 month retained relationships. Some companies work with fractional CMOs for 2-3 years as they scale, eventually converting to full-time when the role justifies it. The flexibility to scale up or down is a key advantage." },
  { question: "Can a fractional CMO help with hiring my marketing team?", answer: "Absolutely. One of the most valuable fractional CMO services is building your marketing function. They define roles, write job specs, source candidates, conduct interviews, and onboard new hires. Many fractional CMOs have built teams of 5-20+ marketers across multiple companies." },
  { question: "What qualifications should a fractional CMO have?", answer: "Look for: 10-15+ years marketing experience including leadership roles, track record of measurable results (revenue, pipeline, brand metrics), experience at similar stage companies, relevant industry knowledge, and ideally CIM or equivalent professional qualifications. References from previous fractional engagements are valuable." },
  { question: "How quickly can a fractional CMO make an impact?", answer: "Expect quick wins in 30-60 days (audit findings, low-hanging fruit optimisations), meaningful impact in 90 days (strategy deployed, campaigns running), and significant ROI by 6 months (team built, systems optimised, measurable pipeline growth)." },
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

// Success stories / case study placeholders
const SUCCESS_STORIES = [
  {
    company: 'B2B SaaS Scale-up',
    challenge: 'Founder-led marketing hitting ceiling at £2M ARR, no marketing leadership or team',
    solution: 'Fractional CMO 2 days/week for 12 months',
    results: ['Built 4-person marketing team', 'Reduced CAC by 35%', 'Grew pipeline by 180%', 'Reached £5M ARR'],
    industry: 'Software',
  },
  {
    company: 'Professional Services Firm',
    challenge: 'Strong referral business but needed to build brand and digital presence',
    solution: 'Fractional CMO 1 day/week for 18 months',
    results: ['Complete rebrand and positioning', 'Launched thought leadership programme', '40% increase in inbound leads', 'Won 3 industry awards'],
    industry: 'Professional Services',
  },
  {
    company: 'D2C E-commerce Brand',
    challenge: 'Reliant on paid media with declining ROAS, needed diversification',
    solution: 'Fractional CMO 2 days/week for 9 months',
    results: ['Built organic acquisition channel', 'Improved email revenue by 120%', 'Reduced paid media dependency by 40%', 'Launched successful loyalty programme'],
    industry: 'E-commerce',
  },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/fractional-jobs-uk' }, { label: 'Fractional CMO Services', href: '/fractional-cmo-services' }]

export default function FractionalCMOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CMO Services UK | Part-Time Marketing Leadership" description="Get experienced CMO leadership without full-time commitment." url="https://fractional.quest/fractional-cmo-services" dateModified={new Date('2026-01-31')} />
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
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Get <strong>experienced CMO leadership</strong> without the full-time commitment. Our <strong>fractional CMO services</strong> (also known as <strong>virtual CMO services</strong>) help you build your brand, drive demand generation, and scale marketing with a senior marketing leader working 1-3 days per week.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-cmo-jobs-uk" className="px-6 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-colors">Find a Fractional CMO</Link>
                <Link href="/fractional-jobs-london" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">London CMO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-amber-200">£850-£1,300</div><div className="text-amber-300/70 text-sm">Day Rate Range</div></div><div><div className="text-3xl font-black text-amber-200">1-3 days</div><div className="text-amber-300/70 text-sm">Per Week</div></div><div><div className="text-3xl font-black text-amber-200">40-60%</div><div className="text-amber-300/70 text-sm">Cost Savings vs FT</div></div><div><div className="text-3xl font-black text-amber-200">90 days</div><div className="text-amber-300/70 text-sm">Typical First Review</div></div></div></div></section>

      {/* Mobile Table of Contents */}
      <div className="lg:hidden max-w-4xl mx-auto px-6 py-8">
        <TableOfContentsMobile items={tocItems} />
      </div>

      {/* Table of Contents */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TableOfContents items={tocItems} title="On This Page" accentColor="amber" />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
              <ul className="space-y-3">
                {authorityLinks.slice(0, 4).map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-amber-700 hover:text-amber-900 flex items-center gap-2">
                      <span className="text-amber-500">→</span> {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="service-areas" className="py-16 bg-white">
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

      <section id="engagement-models" className="py-16 bg-amber-50">
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

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-8">
            <p className="text-sm text-gray-700">
              <strong>Cost Comparison:</strong> A fractional CMO at 2 days/week costs £81,600-£124,800/year vs £175,000-£275,000+ for a full-time CMO (including salary, NI, pension, benefits, equity, and recruitment fees). That&apos;s <strong>50-60% savings</strong> while accessing senior marketing leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Hourly Rates Section */}
      <section id="hourly-rates" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Hourly</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CMO Hourly Rates UK</h2>
            <p className="text-xl text-gray-600">For ad-hoc consultations and project-based work.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-amber-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Level / Specialisation</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Hourly Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Standard Fractional CMO</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£125-£175/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Marketing audits, strategy reviews</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior CMO (15+ years)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£175-£225/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Board presentations, investor decks</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">B2B SaaS Specialist</td>
                  <td className="px-6 py-4 text-sm text-amber-700 font-semibold">£150-£225/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">PLG, demand gen, ABM strategy</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Brand / Rebrand Expert</td>
                  <td className="px-6 py-4 text-sm text-amber-700 font-semibold">£175-£250/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Brand strategy, repositioning</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3-Way Comparison Section */}
      <section id="comparison" className="py-16 bg-amber-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Comparison</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional vs Interim vs Full-Time CMO</h2>
            <p className="text-xl text-gray-600">Understanding the differences between marketing leadership models.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-amber-700">Fractional CMO</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-blue-700">Interim CMO</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Full-Time CMO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Commitment</td>
                  <td className="px-4 py-4 text-sm text-gray-600">1-3 days/week</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Full-time (temp)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Full-time (perm)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Duration</td>
                  <td className="px-4 py-4 text-sm text-gray-600">6-18 months ongoing</td>
                  <td className="px-4 py-4 text-sm text-gray-600">3-9 months typical</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Permanent</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Monthly Cost</td>
                  <td className="px-4 py-4 text-sm text-amber-700 font-semibold">£3,400-£15,600</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£16,000-£24,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£14,000-£23,000+</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                  <td className="px-4 py-4 text-sm text-amber-700 font-semibold">£41,000-£187,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£48,000-£72,000 (3mo)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£175,000-£275,000+</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Primary Focus</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Strategy, brand, demand gen</td>
                  <td className="px-4 py-4 text-sm text-gray-600">CMO gap, rebrand, transformation</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Full marketing ownership</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Flexibility</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Scale up/down easily</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Fixed contract term</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Limited flexibility</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Best For</td>
                  <td className="px-4 py-4 text-sm text-amber-800 font-medium">SMEs, scale-ups, £1-30M revenue</td>
                  <td className="px-4 py-4 text-sm text-blue-800 font-medium">CMO vacancy, launch, crisis</td>
                  <td className="px-4 py-4 text-sm text-gray-700 font-medium">Large enterprises, IPO-ready</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Job Board Section */}
      <section id="current-jobs" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Opportunities</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Current Fractional CMO Jobs</h2>
          </div>
          <EmbeddedJobBoard defaultDepartment="Marketing" title="" accentColor="amber" jobsPerPage={6} />
        </div>
      </section>

      <section id="when-to-use" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">When to Use Fractional CMO Services</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional CMO</strong> provides senior marketing leadership without the cost and commitment of a full-time hire. This model is particularly effective for companies that need strategic marketing expertise but are not yet ready for a full-time C-suite marketing leader.</p>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Virtual CMO vs Fractional CMO - What&apos;s the Difference?</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              <strong>Virtual CMO</strong> and <strong>fractional CMO</strong> mean the same thing - both refer to a part-time Chief Marketing Officer who works with your company on a retained basis. The term &quot;virtual CMO&quot; gained popularity with remote work, emphasising that marketing leaders can drive strategy effectively without being on-site every day. Whether you search for <strong>virtual CMO services</strong> or fractional CMO services, you&apos;re looking for the same solution: experienced marketing leadership without full-time cost.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ideal Situations for Fractional CMO Services</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Founder-led marketing</strong> - When founders need to hand off marketing leadership</li>
              <li><strong>Agency dependency</strong> - When you need someone to direct agency work strategically</li>
              <li><strong>Brand evolution</strong> - Repositioning, rebrand, or entering new markets</li>
              <li><strong>Demand generation</strong> - Building pipeline and marketing-sourced revenue</li>
              <li><strong>Membership growth</strong> - For membership-based organisations, work alongside a <a href="https://membership.quest" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline">membership marketing specialists</a> to drive acquisition and retention</li>
              <li><strong>Pre-fundraise</strong> - Professionalising marketing before Series A/B</li>
              <li><strong>Marketing leadership gap</strong> - Covering departure while hiring permanent CMO</li>
            </ul>

            <h3 id="uk-locations" className="text-2xl font-bold text-gray-900 mt-12 mb-4">UK Locations We Serve</h3>
            <p>Our fractional CMOs operate across the UK, with particular strength in:</p>
            <div className="grid md:grid-cols-3 gap-4 not-prose my-6">
              <Link href="/fractional-jobs-london" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">London</h4>
                <p className="text-sm text-gray-600">Our largest market - tech, VC-backed, B2B SaaS</p>
              </Link>
              <Link href="/manchester" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">Manchester</h4>
                <p className="text-sm text-gray-600">Growing digital marketing hub</p>
              </Link>
              <Link href="/birmingham" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">Birmingham</h4>
                <p className="text-sm text-gray-600">Professional services, manufacturing</p>
              </Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fractional CMO vs Marketing Agency</h3>
            <div className="not-prose overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Aspect</th>
                    <th className="text-left py-3 px-4">Fractional CMO</th>
                    <th className="text-left py-3 px-4">Marketing Agency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="py-3 px-4 font-semibold">Accountability</td><td className="py-3 px-4">Owns marketing outcomes</td><td className="py-3 px-4">Delivers campaign outputs</td></tr>
                  <tr className="border-b"><td className="py-3 px-4 font-semibold">Strategy</td><td className="py-3 px-4">Sets overall direction</td><td className="py-3 px-4">Executes brief</td></tr>
                  <tr><td className="py-3 px-4 font-semibold">Team Leadership</td><td className="py-3 px-4">Manages internal team & agencies</td><td className="py-3 px-4">External resource</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Services</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cmo-jobs-uk" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">Find Fractional CMOs</h4>
                <p className="text-sm text-gray-600">Browse available fractional CMOs</p>
              </Link>
              <Link href="/hire-fractional-cmo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">How to Hire</h4>
                <p className="text-sm text-gray-600">Guide to hiring a fractional CMO</p>
              </Link>
              <Link href="/fractional-cmo-salary" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">CMO Salary Guide</h4>
                <p className="text-sm text-gray-600">Day rates and benchmarks</p>
              </Link>
              <Link href="/fractional-cmo" className="p-4 border rounded-lg hover:border-amber-300 transition-colors bg-white">
                <h4 className="font-bold text-gray-900">What is a Fractional CMO?</h4>
                <p className="text-sm text-gray-600">Understanding the role</p>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Results</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Success Stories</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Real examples of how fractional CMO services have transformed businesses</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SUCCESS_STORIES.map((story, index) => (
              <div key={index} className="bg-amber-50 border border-amber-200 rounded-xl p-8">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">{story.industry}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{story.company}</h3>
                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-700 mb-1">Challenge:</div>
                  <p className="text-sm text-gray-600">{story.challenge}</p>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-700 mb-1">Solution:</div>
                  <p className="text-sm text-gray-600">{story.solution}</p>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Results:</div>
                  <ul className="space-y-1">
                    {story.results.map((result, idx) => (
                      <li key={idx} className="text-sm text-amber-800 flex items-start gap-2">
                        <span className="text-amber-600 mt-0.5">✓</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Authority Links */}
      <section id="resources" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Professional Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://www.cim.co.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-lg">📚</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 text-sm">CIM</h4>
                <p className="text-gray-500 text-xs">Chartered Institute of Marketing</p>
              </div>
            </a>
            <a href="https://dma.org.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-lg">📊</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 text-sm">DMA</h4>
                <p className="text-gray-500 text-xs">Data & Marketing Association</p>
              </div>
            </a>
            <a href="https://www.marketingweek.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-lg">📰</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 text-sm">Marketing Week</h4>
                <p className="text-gray-500 text-xs">UK marketing news and insights</p>
              </div>
            </a>
            <a href="https://ipa.co.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-lg">🏆</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 text-sm">IPA</h4>
                <p className="text-gray-500 text-xs">Institute of Practitioners in Advertising</p>
              </div>
            </a>
            <a href="https://www.warc.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-lg">📈</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 text-sm">WARC</h4>
                <p className="text-gray-500 text-xs">Marketing effectiveness research</p>
              </div>
            </a>
            <a href="https://b2bmarketing.net/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-lg">🎯</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 text-sm">B2B Marketing</h4>
                <p className="text-gray-500 text-xs">B2B marketing community and awards</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-amber-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CMO Services</h2></div><FAQ items={SERVICE_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Get Started with Fractional CMO Services?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Connect with experienced fractional CMOs who can transform your marketing. London, Manchester, Birmingham and across the UK.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-cmo-jobs-uk" className="px-8 py-4 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-400 transition-colors">Find Fractional CMOs</Link>
            <Link href="/fractional-jobs-london" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">London CMO Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
