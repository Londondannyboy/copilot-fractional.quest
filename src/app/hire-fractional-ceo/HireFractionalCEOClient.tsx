"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { FAQ, FAQItem } from "@/components/seo";
import { WebPageSchema, FAQPageSchema } from "@/components/seo";
import { HireProcessStepper } from "@/components/HireProcessStepper";
import Image from "next/image";
import { getHeroImageUrl, getImage } from '@/lib/images';
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { TableOfContents } from '@/components/TableOfContents'

// Table of Contents items for SEO
const tocItems = [
  { id: 'where-to-find', title: 'Where to Find Fractional CEOs' },
  { id: 'what-to-look-for', title: 'What to Look For' },
  { id: 'interview-questions', title: 'Interview Questions' },
  { id: 'hiring-process', title: 'Hiring Process' },
  { id: 'contract-terms', title: 'Contract Terms' },
  { id: 'cost-comparison', title: 'Cost Comparison' },
  { id: 'browse-candidates', title: 'Browse Candidates' },
  { id: 'faq', title: 'FAQ' },
]

// External authority links for E-E-A-T (CEO-specific)
const authorityLinks = [
  { name: 'Institute of Directors (IOD)', url: 'https://www.iod.com', description: 'Business leadership organisation' },
  { name: 'British Business Bank', url: 'https://www.british-business-bank.co.uk', description: 'Government business finance' },
  { name: 'BVCA', url: 'https://www.bvca.co.uk', description: 'British Venture Capital Association' },
  { name: 'ScaleUp Institute', url: 'https://www.scaleupinstitute.org.uk', description: 'UK scale-up research' },
  { name: 'CBI', url: 'https://www.cbi.org.uk', description: 'Confederation of British Industry' },
  { name: 'Forbes', url: 'https://www.forbes.com', description: 'Business leadership insights' },
]

const faqItems: FAQItem[] = [
  { question: 'How long does it take to hire a fractional CEO?', answer: 'Typically 3-6 weeks due to the senior nature of the role. Board involvement and reference checks take longer. Includes defining requirements, sourcing (1-2 weeks), interviews (2-3 weeks), and onboarding.' },
  { question: 'Where can I find fractional CEOs to hire?', answer: 'Main sources: (1) PE/VC operating partner networks, (2) Executive search firms with fractional practices, (3) Fractional.Quest and similar platforms, (4) Board advisor networks, (5) YPO/Vistage alumni communities.' },
  { question: 'What should I look for when hiring a fractional CEO?', answer: 'Key criteria: (1) Successful exit experience, (2) Experience at your company stage, (3) Board and investor management skills, (4) Turnaround or scaling expertise, (5) Ability to work alongside founders.' },
  { question: 'How much does it cost to hire a fractional CEO?', answer: 'Day rates range from £1,000-£2,000 depending on experience. Most engagements are 1-2 days per week (£4,000-£8,000/month). PE/VC operating partners may charge more. Equity may be included.' },
  { question: 'When should we hire a fractional CEO vs interim CEO?', answer: 'Fractional CEO: ongoing strategic support alongside founder, 1-3 days/week. Interim CEO: full-time replacement during transition, 6-12 month fixed term. Fractional is 50-70% less expensive.' },
];

const sourcingChannels = [
  { channel: 'PE/VC Networks', description: 'Portfolio company operating partners and executive talent pools.', pros: 'High calibre, proven track records', bestFor: 'PE-backed companies', icon: '🏦' },
  { channel: 'Executive Search', description: 'Search firms with fractional/interim practices (Odgers, Korn Ferry, Spencer Stuart).', pros: 'Curated, confidential process', bestFor: 'Confidential searches', icon: '🔍' },
  { channel: 'Fractional Platforms', description: 'Platforms like Fractional.Quest, Bolster, Chief, or Interim Hub.', pros: 'Fast matching, transparent rates', bestFor: 'Quick placement', icon: '🎯' },
  { channel: 'Board Networks', description: 'Ask existing board members, investors, or NEDs for referrals.', pros: 'Trusted recommendations', bestFor: 'Companies with strong boards', icon: '🌟' },
  { channel: 'YPO/Vistage Alumni', description: 'CEO peer groups with members seeking fractional opportunities.', pros: 'Peer-vetted executives', bestFor: 'Finding culturally aligned CEOs', icon: '👥' },
  { channel: 'Industry Events', description: 'SaaStr, Web Summit, or sector-specific CEO gatherings.', pros: 'Meet in person, assess fit', bestFor: 'Specific industry expertise', icon: '🎤' },
];

const evaluationCriteria = [
  { criteria: 'Exit & Scale Experience', description: 'Have they successfully scaled and/or exited a company? Look for IPO, trade sale, or significant growth milestones at your target stage.', lookFor: 'Exits over £50M, scaled from £5M to £50M+ ARR, clear metrics', redFlag: 'No exits or only failed companies' },
  { criteria: 'Board & Investor Management', description: 'Can they manage board relationships and investor expectations? This is critical for fractional CEOs working with founders.', lookFor: 'Board seat experience, fundraising track record, investor relations', redFlag: 'Never reported to a board or managed investors' },
  { criteria: 'Founder Collaboration', description: 'Can they work alongside a founder without ego conflicts? Fractional CEOs often support founders, not replace them.', lookFor: 'Experience as COO or #2, clear partnership approach, coaching mindset', redFlag: 'Only been CEO, dismissive of founder involvement' },
  { criteria: 'Operational Depth', description: 'Do they understand operations beyond strategy? Can they build teams, manage P&L, and make hard decisions?', lookFor: 'P&L ownership, team building, operational KPIs, hard decisions made', redFlag: 'Only strategic/advisory, no operational delivery' },
  { criteria: 'Turnaround Experience', description: 'Have they led companies through difficult transitions, pivots, or turnarounds?', lookFor: 'Restructuring experience, cost reduction, strategic pivots', redFlag: 'Only worked in high-growth scenarios' },
  { criteria: 'Fractional Model Fit', description: 'Do they understand fractional working? Managing time, being effective in 2 days/week, clear priorities.', lookFor: '2-4 current clients, clear systems, portfolio approach', redFlag: 'First fractional role, wants full-time really' },
];

export default function HireFractionalCEOClient() {
  const heroImage = getHeroImageUrl('services', 1920, 800);
  const imageCredit = getImage('services');

  return (
    <main>
      <WebPageSchema title="Hire a Fractional CEO UK 2026" description="How to hire a fractional CEO." url="https://fractional.quest/hire-fractional-ceo" dateModified={new Date('2026-01-07T00:00:00Z')} />
      <FAQPageSchema faqs={faqItems} />

      <div className="min-h-screen bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-yellow-600 to-amber-500 py-24">
            <Image src={heroImage} alt="Hire a Fractional CEO" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/80 via-yellow-800/70 to-amber-700/60" />
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
              <Link href="/fractional-ceo" className="text-yellow-100 hover:text-white mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Back to Fractional CEO Guide</Link>
              <div className="max-w-4xl">
                <span className="inline-block bg-white text-yellow-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Hiring Guide</span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">Hire a<br /><span className="text-yellow-200">Fractional CEO</span></h1>
                <p className="text-2xl md:text-3xl text-yellow-50 leading-relaxed font-light mb-10">Complete guide to finding, vetting, and hiring the perfect fractional Chief Executive Officer.</p>
                <div className="flex flex-wrap gap-10 mb-12">
                  <div><div className="text-5xl font-black text-white">3-6 Weeks</div><div className="text-yellow-100 text-sm uppercase tracking-wider mt-1">To Hire</div></div>
                  <div><div className="text-5xl font-black text-white">90 Days</div><div className="text-yellow-100 text-sm uppercase tracking-wider mt-1">To Impact</div></div>
                  <div><div className="text-5xl font-black text-white">25+</div><div className="text-yellow-100 text-sm uppercase tracking-wider mt-1">Candidates</div></div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/fractional-ceo-jobs-uk" className="px-8 py-4 bg-white text-yellow-600 font-bold uppercase tracking-wider hover:bg-yellow-50 transition-colors">Browse CEO Candidates</Link>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 z-10">
              <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="bg-gray-50 border-b">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div><div className="text-4xl font-black text-yellow-600 mb-2">3-5</div><div className="text-gray-600 text-sm">Candidates to Interview</div></div>
                <div><div className="text-4xl font-black text-yellow-600 mb-2">6-12 Months</div><div className="text-gray-600 text-sm">Typical Engagement</div></div>
                <div><div className="text-4xl font-black text-yellow-600 mb-2">£1k-2k</div><div className="text-gray-600 text-sm">Day Rate Range</div></div>
                <div><div className="text-4xl font-black text-yellow-600 mb-2">60 Days</div><div className="text-gray-600 text-sm">Notice Period</div></div>
              </div>
            </div>
          </section>

          {/* Table of Contents */}
          <section className="py-8 bg-white border-b">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <TableOfContents items={tocItems} title="In This Guide" accentColor="yellow" />
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
                  <ul className="space-y-3">
                    {authorityLinks.slice(0, 4).map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-yellow-600 hover:text-yellow-800 flex items-center gap-2">
                          <span className="text-yellow-400">→</span> {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Where to Find */}
          <section id="where-to-find" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Sourcing</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Where to Find Fractional CEOs</h2>
                <p className="text-xl text-gray-600">Six proven channels for finding pre-vetted, experienced fractional executive leaders.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sourcingChannels.map((source, index) => (
                  <div key={index} className="bg-gray-50 p-8 border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{source.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{source.channel}</h3>
                    <p className="text-gray-600 text-sm mb-4">{source.description}</p>
                    <div className="mb-3"><div className="text-xs font-bold text-gray-500 uppercase mb-1">Pros:</div><div className="text-sm text-gray-700">{source.pros}</div></div>
                    <div><div className="text-xs font-bold text-gray-500 uppercase mb-1">Best For:</div><div className="text-sm text-yellow-600">{source.bestFor}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Evaluation Criteria */}
          <section id="what-to-look-for" className="py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Evaluation Criteria</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What to Look For in a Fractional CEO</h2>
                <p className="text-xl text-gray-600 max-w-3xl">Not all experienced executives make good fractional CEOs. Here's what separates the best from the rest.</p>
              </div>
              <div className="space-y-8">
                {evaluationCriteria.map((item, index) => (
                  <div key={index} className="bg-white p-10 border-l-4 border-yellow-500 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{index + 1}. {item.criteria}</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg"><div className="text-sm font-bold text-yellow-800 mb-2">✅ Look For</div><p className="text-sm text-gray-700">{item.lookFor}</p></div>
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg"><div className="text-sm font-bold text-red-800 mb-2">🚩 Red Flag</div><p className="text-sm text-gray-700">{item.redFlag}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Interview Questions */}
          <section id="interview-questions" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Interview Guide</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Interview Questions to Ask</h2>
                <p className="text-xl text-gray-600 max-w-3xl">These questions separate strategic CEOs from administrators. Use them to assess leadership, vision, and fit.</p>
              </div>
              <div className="space-y-8">
                <div className="bg-yellow-50 border-2 border-yellow-200 p-10 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Strategy & Vision Questions</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-700"><strong className="text-gray-900">"Walk me through how you scaled [Company X]. What was your strategic approach?"</strong><br/><span className="text-sm text-gray-600">Listen for: Clear vision, measurable outcomes, leadership through ambiguity</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you approach board and investor management?"</strong><br/><span className="text-sm text-gray-600">Listen for: Experience with fundraising, board dynamics, stakeholder alignment</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"Tell me about a major pivot or turnaround you led. What worked and what didn't?"</strong><br/><span className="text-sm text-gray-600">Listen for: Decision-making under pressure, ability to course-correct</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you balance short-term execution with long-term vision?"</strong><br/><span className="text-sm text-gray-600">Listen for: Prioritization frameworks, strategic clarity, operational pragmatism</span></li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border-2 border-yellow-200 p-10 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">📈 Growth & Scaling Questions</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-700"><strong className="text-gray-900">"What organizational changes did you make to scale from X to Y in revenue?"</strong><br/><span className="text-sm text-gray-600">Listen for: Understanding of scale-up challenges, team structuring, process maturity</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you approach building a leadership team?"</strong><br/><span className="text-sm text-gray-600">Listen for: Hiring philosophy, executive development, succession planning</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"Tell me about a successful exit or liquidity event you led."</strong><br/><span className="text-sm text-gray-600">Listen for: M&A experience, valuation optimization, deal execution</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you think about capital allocation and resource prioritization?"</strong><br/><span className="text-sm text-gray-600">Listen for: Financial acumen, ROI thinking, strategic investment decisions</span></li>
                  </ul>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 p-10 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">👥 Leadership & Culture Questions</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you work alongside founders without ego conflicts?"</strong><br/><span className="text-sm text-gray-600">Listen for: Partnership mindset, coaching approach, respect for founder vision</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"Tell me about a difficult leadership decision—letting someone go, cutting a product, etc."</strong><br/><span className="text-sm text-gray-600">Listen for: Decision-making process, empathy, communication approach</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you build and maintain company culture during rapid growth?"</strong><br/><span className="text-sm text-gray-600">Listen for: Values alignment, culture-building tactics, scaling culture</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you stay effective working 1-2 days/week vs embedded full-time?"</strong><br/><span className="text-sm text-gray-600">Listen for: Async communication, clear frameworks, trust-building, delegation</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Hiring Process */}
          <section id="hiring-process" className="py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-12 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Process</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">The Fractional CEO Hiring Process</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">From first conversation to start date in 3-6 weeks. Here's the proven process.</p>
              </div>
              <HireProcessStepper accentColor="yellow" />
              <div className="mt-16 bg-yellow-50 border-2 border-yellow-200 p-10 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Timeline Breakdown</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h4 className="font-bold text-gray-900 mb-2">Week 1-2: Define & Source</h4><ul className="text-sm text-gray-700 space-y-1"><li>• Define requirements and board involvement (Day 1-3)</li><li>• Engage search firms, networks, referrals (Day 3-7)</li><li>• Review candidates, shortlist 3-5 (Day 7-14)</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Week 3-4: Interview & Select</h4><ul className="text-sm text-gray-700 space-y-1"><li>• First-round interviews (60-min calls)</li><li>• Second round with board/investors</li><li>• Deep reference checks (3-5 calls)</li><li>• Make offer and negotiate terms</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Week 5-6: Onboard & Start</h4><ul className="text-sm text-gray-700 space-y-1"><li>• Contract signing and legal review</li><li>• Board introduction and context sharing</li><li>• First week: stakeholder mapping</li><li>• Begin strategic assessment</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">First 90 Days: Deliver</h4><ul className="text-sm text-gray-700 space-y-1"><li>• Month 1: Strategic audit, quick wins</li><li>• Month 2: Build leadership alignment</li><li>• Month 3: Execute strategic priorities</li><li>• Decide to extend or part ways</li></ul></div>
                </div>
              </div>
            </div>
          </section>

          {/* Contract Terms */}
          <section id="contract-terms" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Contracts</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Contract Terms & Structure</h2>
                <p className="text-xl text-gray-600 max-w-3xl">Standard terms for fractional CEO engagements. Adapt based on your needs and board requirements.</p>
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 p-10 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mt-0 mb-6">Standard Contract Template</h3>
                <div className="space-y-6">
                  <div><h4 className="font-bold text-gray-900 mb-2">Engagement Model</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Day rate:</strong> £1,000-£2,000 per day (based on experience and exits)</li><li><strong>Commitment:</strong> 1-2 days per week (specify exact days)</li><li><strong>Monthly retainer option:</strong> £4,000-£8,000 for predictable billing</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Term & Notice</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Initial term:</strong> 6-month trial period (longer due to strategic nature)</li><li><strong>Renewal:</strong> Auto-renew to 12-month rolling contract after trial</li><li><strong>Notice period:</strong> 60 days either side (longer for CEO role)</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Scope of Work</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Responsibilities:</strong> Strategic leadership, board management, investor relations, executive team development</li><li><strong>Deliverables:</strong> Strategic plan, quarterly board presentations, leadership alignment</li><li><strong>Exclusions:</strong> Day-to-day operations (unless scoped separately), full-time availability</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">IP & Confidentiality</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>IP ownership:</strong> Company owns all strategic work product</li><li><strong>Confidentiality:</strong> Enhanced NDA terms, board-level confidentiality</li><li><strong>Non-compete:</strong> May apply to direct competitors during engagement</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Optional: Equity</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Advisory shares:</strong> 0.25-0.75% for long-term engagements (12+ months)</li><li><strong>Vesting:</strong> Quarterly or annual vesting with cliff</li><li><strong>Cash reduction:</strong> If equity included, day rate may reduce 15-25%</li></ul></div>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Comparison */}
          <section id="cost-comparison" className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Investment</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Cost Comparison: Fractional vs Full-Time vs Interim</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Understand the total cost of each CEO hiring option for your business.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
                  <thead>
                    <tr className="bg-yellow-600 text-white">
                      <th className="px-6 py-4 text-left font-bold">Cost Factor</th>
                      <th className="px-6 py-4 text-center font-bold">Fractional CEO</th>
                      <th className="px-6 py-4 text-center font-bold">Full-Time CEO</th>
                      <th className="px-6 py-4 text-center font-bold">Interim Executive</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Annual Cost</td>
                      <td className="px-6 py-4 text-center text-yellow-700 font-bold">£100k - £200k</td>
                      <td className="px-6 py-4 text-center text-gray-600">£250k - £500k+</td>
                      <td className="px-6 py-4 text-center text-gray-600">£200k - £400k</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Days per Week</td>
                      <td className="px-6 py-4 text-center text-yellow-700">1-2 days</td>
                      <td className="px-6 py-4 text-center text-gray-600">5 days</td>
                      <td className="px-6 py-4 text-center text-gray-600">5 days (fixed term)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Notice Period</td>
                      <td className="px-6 py-4 text-center text-yellow-700">60 days</td>
                      <td className="px-6 py-4 text-center text-gray-600">6-12 months</td>
                      <td className="px-6 py-4 text-center text-gray-600">Contract end</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Employer NI/Benefits</td>
                      <td className="px-6 py-4 text-center text-green-600">None</td>
                      <td className="px-6 py-4 text-center text-red-600">£50k - £100k</td>
                      <td className="px-6 py-4 text-center text-green-600">None</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Equity Required</td>
                      <td className="px-6 py-4 text-center text-green-600">Optional (0.25-0.75%)</td>
                      <td className="px-6 py-4 text-center text-red-600">1-5%</td>
                      <td className="px-6 py-4 text-center text-green-600">Rare</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Time to Hire</td>
                      <td className="px-6 py-4 text-center text-yellow-700">3-6 weeks</td>
                      <td className="px-6 py-4 text-center text-gray-600">4-6 months</td>
                      <td className="px-6 py-4 text-center text-gray-600">2-4 weeks</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Cross-Industry Experience</td>
                      <td className="px-6 py-4 text-center text-green-600">High (multiple companies)</td>
                      <td className="px-6 py-4 text-center text-gray-600">Limited</td>
                      <td className="px-6 py-4 text-center text-green-600">High</td>
                    </tr>
                    <tr className="bg-yellow-100">
                      <td className="px-6 py-4 font-bold text-gray-900">Best For</td>
                      <td className="px-6 py-4 text-center text-yellow-700 font-medium">Strategic leadership alongside founder</td>
                      <td className="px-6 py-4 text-center text-gray-600 font-medium">Large orgs needing full-time leadership</td>
                      <td className="px-6 py-4 text-center text-gray-600 font-medium">Leadership transitions, turnarounds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-600">Sources: <a href="https://www.glassdoor.co.uk" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-800 underline">Glassdoor UK</a>, <a href="https://www.iod.com" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-800 underline">IOD Salary Survey</a>, Market research</p>
              </div>
            </div>
          </section>

          {/* Browse CEO Candidates */}
          <section id="browse-candidates" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Find Talent</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse CEO Candidates</h2>
                <p className="text-xl text-gray-500">Connect with experienced fractional CEOs seeking new opportunities</p>
              </div>
              <EmbeddedJobBoard
                defaultDepartment="Executive"
                title="Available CEO Talent"
                accentColor="amber"
                jobsPerPage={6}
              />
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-black text-gray-900 mb-8">Frequently Asked Questions</h2>
              <FAQ items={faqItems} title="" skipSchema={true} />
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-yellow-600 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Hire?</h2>
              <p className="text-xl text-yellow-100 mb-10 max-w-2xl mx-auto">Browse pre-vetted fractional CEO candidates on Fractional.Quest. Post your role and start interviews this week.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/fractional-ceo-jobs-uk" className="px-10 py-5 bg-white text-yellow-600 font-bold uppercase tracking-wider hover:bg-yellow-50 transition-colors">Browse CEO Candidates</Link>
                <Link href="/contact" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-yellow-600 transition-colors">Post Your Role</Link>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="py-16 bg-white border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Related Resources</h2>
                <p className="text-gray-600">Explore more fractional executive hiring guides and resources</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {/* CEO Resources */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">CEO Resources</h3>
                  <ul className="space-y-2">
                    <li><Link href="/fractional-ceo" className="text-gray-600 hover:text-yellow-600 transition-colors">What is a Fractional CEO?</Link></li>
                    <li><Link href="/fractional-ceo-salary" className="text-gray-600 hover:text-yellow-600 transition-colors">CEO Salary & Day Rates</Link></li>
                    <li><Link href="/fractional-ceo-services" className="text-gray-600 hover:text-yellow-600 transition-colors">CEO Services</Link></li>
                    <li><Link href="/fractional-ceo-jobs-uk" className="text-gray-600 hover:text-yellow-600 transition-colors">CEO Jobs UK</Link></li>
                    <li><Link href="/interim-ceo-jobs-uk" className="text-gray-600 hover:text-yellow-600 transition-colors">Interim CEO Jobs</Link></li>
                  </ul>
                </div>
                {/* Other C-Suite Hiring */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Hire Other C-Suite</h3>
                  <ul className="space-y-2">
                    <li><Link href="/hire-fractional-cfo" className="text-gray-600 hover:text-yellow-600 transition-colors">Hire a Fractional CFO</Link></li>
                    <li><Link href="/hire-fractional-cto" className="text-gray-600 hover:text-yellow-600 transition-colors">Hire a Fractional CTO</Link></li>
                    <li><Link href="/hire-fractional-cmo" className="text-gray-600 hover:text-yellow-600 transition-colors">Hire a Fractional CMO</Link></li>
                    <li><Link href="/hire-fractional-coo" className="text-gray-600 hover:text-yellow-600 transition-colors">Hire a Fractional COO</Link></li>
                    <li><Link href="/hire-fractional-chro" className="text-gray-600 hover:text-yellow-600 transition-colors">Hire a Fractional CHRO</Link></li>
                  </ul>
                </div>
                {/* External Resources */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
                  <ul className="space-y-2">
                    {authorityLinks.map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-yellow-600 transition-colors flex items-center gap-1">
                          {link.name} <span className="text-gray-400 text-xs">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
    </main>
  );
}
