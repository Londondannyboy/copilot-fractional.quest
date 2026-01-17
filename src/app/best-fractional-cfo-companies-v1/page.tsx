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
  title: 'Best Fractional CFO Companies UK 2026 | Top CFO Service Providers',
  description: 'Compare the best fractional CFO companies in the UK. Find top CFO service providers and boutique firms. Pricing from £850/day.',
  keywords: 'best fractional cfo companies, fractional cfo firms uk, top fractional cfo providers, cfo services companies uk, outsourced cfo firms',
  alternates: { canonical: 'https://fractional.quest/best-fractional-cfo-companies' },
  openGraph: {
    title: 'Best Fractional CFO Companies UK 2026',
    description: 'Compare top fractional CFO providers in the UK. Find the right CFO services for your business.',
    url: 'https://fractional.quest/best-fractional-cfo-companies',
  },
}

const COMPANIES_FAQS = [
  { question: "Should I hire a fractional CFO firm or independent?", answer: "Both have merits. Firms offer backup coverage, broader expertise, and often fixed pricing. Independents typically cost less, offer more personal relationships, and have greater flexibility. Choose a firm for reliability and breadth; choose an independent for cost and direct access to a senior professional." },
  { question: "How do I evaluate fractional CFO companies?", answer: "Look for: (1) Relevant sector experience (SaaS, ecommerce, manufacturing), (2) Track record with similar-stage companies, (3) Specific expertise you need (fundraising, M&A, compliance), (4) Client references, (5) Flexibility and engagement models, (6) Chemistry with the individual CFO you'll work with." },
  { question: "What's the typical cost of fractional CFO companies?", answer: "Fractional CFO firms in the UK typically charge £850-£1,500 per day or £4,000-£15,000 per month on retainer. Independent fractional CFOs often charge £800-£1,200 per day. Big 4 accounting firms' fractional services can run £1,500-£2,500 per day." },
  { question: "Do Big 4 firms offer fractional CFO services?", answer: "Yes, most Big 4 firms (Deloitte, PwC, EY, KPMG) have CFO advisory or 'CFO Services' practices. These tend to be more expensive (£1,500-£2,500/day) and often better suited for larger organisations. For SMEs and scale-ups, boutique fractional CFO firms are usually more appropriate." },
  { question: "How long are fractional CFO company contracts?", answer: "Most fractional CFO engagements start with a 3-month trial period, then move to rolling monthly or quarterly agreements. Firms may push for 6-12 month minimums. Independent fractional CFOs are often more flexible with shorter notice periods." },
]

const PROVIDER_TYPES = [
  {
    type: 'Independent Fractional CFOs',
    description: 'Individual CFOs working independently or through their own limited company',
    pros: ['Direct senior access', 'Lower cost', 'Flexible terms', 'Personal relationship'],
    cons: ['No backup coverage', 'Limited bandwidth', 'May lack specific expertise'],
    priceRange: '£800-£1,200/day',
    bestFor: 'SMEs, startups, straightforward requirements'
  },
  {
    type: 'Boutique Fractional CFO Firms',
    description: 'Specialised firms of 5-20 fractional CFOs with shared services',
    pros: ['Backup and coverage', 'Quality assurance', 'Broader expertise', 'Structured processes'],
    cons: ['Higher cost', 'May get junior team member', 'Less flexibility'],
    priceRange: '£900-£1,400/day',
    bestFor: 'Scale-ups, PE-backed companies, complex needs'
  },
  {
    type: 'Big 4 & Large Firms',
    description: 'CFO advisory practices from major accounting/consulting firms',
    pros: ['Brand credibility', 'Deep resources', 'Global coverage', 'Full service'],
    cons: ['Highest cost', 'Less personal', 'May be overkill', 'Complex billing'],
    priceRange: '£1,500-£2,500/day',
    bestFor: 'Pre-IPO, complex transactions, large enterprises'
  },
  {
    type: 'Fractional CFO Marketplaces',
    description: 'Platforms connecting businesses with vetted fractional CFOs',
    pros: ['Easy comparison', 'Vetted candidates', 'Reviews/ratings', 'Quick matching'],
    cons: ['Platform fees', 'Variable quality', 'Less relationship'],
    priceRange: '£850-£1,300/day',
    bestFor: 'First-time buyers, quick needs'
  },
]

const EVALUATION_CRITERIA = [
  { criteria: 'Sector Experience', description: 'Have they worked in your industry (SaaS, ecommerce, manufacturing, professional services)?', weight: 'Critical' },
  { criteria: 'Stage Experience', description: 'Have they worked with companies at your stage (seed, Series A, growth, pre-exit)?', weight: 'Critical' },
  { criteria: 'Specific Skills', description: 'Do they have the expertise you need (fundraising, M&A, systems implementation)?', weight: 'High' },
  { criteria: 'Client References', description: 'Can they provide relevant, contactable references?', weight: 'High' },
  { criteria: 'Chemistry', description: 'Do you and your team like working with them? Is communication style compatible?', weight: 'High' },
  { criteria: 'Backup Coverage', description: 'What happens if they\'re ill or on holiday? Is there continuity?', weight: 'Medium' },
  { criteria: 'Pricing Transparency', description: 'Is pricing clear? Are there hidden costs for expenses, calls, etc?', weight: 'Medium' },
  { criteria: 'Contract Flexibility', description: 'Can you scale up/down? What are notice periods?', weight: 'Medium' },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Guides', href: '/fractional-jobs-uk' }, { label: 'Best Fractional CFO Companies', href: '/best-fractional-cfo-companies' }]

export default function BestFractionalCFOCompaniesPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Best Fractional CFO Companies UK 2026 | Top CFO Service Providers" description="Compare the best fractional CFO companies in the UK." url="https://fractional.quest/best-fractional-cfo-companies" dateModified={new Date('2026-01-08')} />
      <FAQPageSchema faqs={COMPANIES_FAQS} />

      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80" alt="Best Fractional CFO Companies" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-teal-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Comparison Guide</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Best Fractional CFO Companies UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Compare fractional CFO providers: independent CFOs, boutique firms, and Big 4 practices. Find the right <strong>fractional CFO company</strong> for your business.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Provider Types</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Types of Fractional CFO Providers</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {PROVIDER_TYPES.map((provider) => (
              <div key={provider.type} className="p-6 border rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{provider.type}</h3>
                <p className="text-gray-600 mb-4">{provider.description}</p>
                <div className="text-2xl font-black text-emerald-700 mb-4">{provider.priceRange}</div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Pros</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {provider.pros.map((pro, i) => <li key={i} className="flex items-start"><span className="text-emerald-500 mr-2">+</span>{pro}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Cons</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {provider.cons.map((con, i) => <li key={i} className="flex items-start"><span className="text-red-500 mr-2">-</span>{con}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <span className="text-xs font-bold uppercase text-gray-500">Best for:</span>
                  <p className="text-gray-700 font-medium">{provider.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Selection Guide</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How to Evaluate Fractional CFO Companies</h2>
          </div>
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="min-w-full text-sm">
              <thead><tr className="border-b bg-gray-50"><th className="text-left py-4 px-6">Criteria</th><th className="text-left py-4 px-6">What to Assess</th><th className="text-left py-4 px-6">Importance</th></tr></thead>
              <tbody>
                {EVALUATION_CRITERIA.map((item, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-4 px-6 font-semibold text-gray-900">{item.criteria}</td>
                    <td className="py-4 px-6 text-gray-600">{item.description}</td>
                    <td className="py-4 px-6"><span className={`px-2 py-1 rounded text-xs font-bold ${item.weight === 'Critical' ? 'bg-red-100 text-red-700' : item.weight === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>{item.weight}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Choosing the Right Fractional CFO Company</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The "best" fractional CFO company depends entirely on your specific situation. A high-growth SaaS company preparing for Series B has very different needs than a traditional manufacturing business needing compliance support.</p>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Questions to Ask Potential Providers</h3>
            <ol className="space-y-2 text-gray-600">
              <li><strong>Who specifically will I work with?</strong> (Get the actual CFO name, not just the firm)</li>
              <li><strong>What's their relevant experience?</strong> (Sector, stage, specific skills)</li>
              <li><strong>Can I speak to 2-3 references?</strong> (Similar companies to yours)</li>
              <li><strong>What's the backup plan?</strong> (If they're ill, on holiday, or leave)</li>
              <li><strong>How do you charge?</strong> (Day rate vs retainer, expenses, scope changes)</li>
              <li><strong>What's the minimum commitment?</strong> (Trial period, notice periods)</li>
              <li><strong>What's included and excluded?</strong> (Ad-hoc calls, board attendance, expenses)</li>
              <li><strong>How do you communicate?</strong> (Weekly calls, Slack, email response times)</li>
            </ol>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Red Flags to Watch For</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Can't meet the actual CFO</strong> - You're sold by a partner but work with someone junior</li>
              <li><strong>No references</strong> - Unable or unwilling to provide contactable clients</li>
              <li><strong>Long lock-in periods</strong> - Requiring 12-month minimum with no out clause</li>
              <li><strong>Vague pricing</strong> - Unable to give clear cost estimate upfront</li>
              <li><strong>One-size-fits-all</strong> - Same approach regardless of your specific needs</li>
              <li><strong>Overselling</strong> - Pushing services you don't need</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cfo-services" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CFO Services</h4><p className="text-sm text-gray-600">What's included in CFO services</p></Link>
              <Link href="/hire-fractional-cfo" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire a CFO</h4><p className="text-sm text-gray-600">Complete hiring guide</p></Link>
              <Link href="/fractional-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CFO Jobs UK</h4><p className="text-sm text-gray-600">Browse available CFOs</p></Link>
              <Link href="/fractional-cfo-salary" className="p-4 border rounded-lg hover:border-emerald-300 transition-colors"><h4 className="font-bold text-gray-900">CFO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and benchmarks</p></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="py-20 bg-emerald-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Questions About Fractional CFO Companies</h2></div><FAQ items={COMPANIES_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
