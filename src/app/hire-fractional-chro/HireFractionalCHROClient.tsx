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
  { id: 'where-to-find', title: 'Where to Find Fractional CHROs' },
  { id: 'what-to-look-for', title: 'What to Look For' },
  { id: 'interview-questions', title: 'Interview Questions' },
  { id: 'hiring-process', title: 'Hiring Process' },
  { id: 'contract-terms', title: 'Contract Terms' },
  { id: 'cost-comparison', title: 'Cost Comparison' },
  { id: 'browse-candidates', title: 'Browse Candidates' },
  { id: 'faq', title: 'FAQ' },
]

// External authority links for E-E-A-T (CHRO-specific)
const authorityLinks = [
  { name: 'CIPD', url: 'https://www.cipd.org', description: 'Chartered Institute of Personnel & Development' },
  { name: 'ACAS', url: 'https://www.acas.org.uk', description: 'Advisory, Conciliation and Arbitration Service' },
  { name: 'GOV.UK Employment', url: 'https://www.gov.uk/browse/employing-people', description: 'UK employment law guidance' },
  { name: 'HR Magazine', url: 'https://www.hrmagazine.co.uk', description: 'UK HR industry publication' },
  { name: 'People Management', url: 'https://www.peoplemanagement.co.uk', description: 'CIPD publication' },
  { name: 'SHRM', url: 'https://www.shrm.org', description: 'Society for Human Resource Management' },
]

const faqItems: FAQItem[] = [
  { question: 'How long does it take to hire a fractional CHRO?', answer: 'Typically 2-4 weeks from first conversations to start date. This includes defining requirements (1-3 days), sourcing candidates (3-7 days), interviews (1-2 weeks), and onboarding (1 week). Much faster than hiring a full-time CHRO.' },
  { question: 'Where can I find fractional CHROs to hire?', answer: 'Five main sources: (1) Fractional executive job boards like Fractional.Quest, (2) LinkedIn using #FractionalCHRO or #FractionalHR, (3) HR networks like CIPD and People+Culture, (4) Referrals from VCs or founders, (5) HR consultancies and interim networks.' },
  { question: 'What should I look for when hiring a fractional CHRO?', answer: 'Key criteria: (1) Experience scaling teams at your stage (50-500 employees), (2) Track record with culture development and retention, (3) Employment law expertise (UK specific), (4) Experience with M&A/TUPE if relevant, (5) Ability to work fractionally with clear communication.' },
  { question: 'How much does it cost to hire a fractional CHRO?', answer: 'Day rates range from £600-£1,100 depending on experience. Most engagements are 1-2 days per week (£2,400-£4,400/month) or 2-3 days per week (£50,000-£100,000 annually). This is 40-60% cheaper than full-time CHROs.' },
  { question: 'What contract terms should I use?', answer: 'Start with a 3-month trial with 30 days notice. Key terms: day rate or monthly retainer, expected days per week, notice period, IP ownership, confidentiality, and clear scope of HR responsibilities.' },
];

const sourcingChannels = [
  { channel: 'Fractional Job Boards', description: 'Platforms like Fractional.Quest with pre-vetted HR executives.', pros: 'Pre-screened candidates, fast matching', bestFor: 'Companies wanting quality HR leaders quickly', icon: '🎯' },
  { channel: 'LinkedIn Search', description: 'Search for CHROs using hashtags #FractionalCHRO, #FractionalHR, or "People Director".', pros: 'Large pool, direct outreach', bestFor: 'Companies with time to source', icon: '💼' },
  { channel: 'CIPD Networks', description: 'CIPD communities and certified HR professionals seeking fractional work.', pros: 'Qualified HR professionals, UK-focused', bestFor: 'Companies wanting CIPD-certified leaders', icon: '📋' },
  { channel: 'HR Consultancies', description: 'Interim HR networks and boutique HR consultancies.', pros: 'Curated matches, HR specialisation', bestFor: 'Companies wanting managed search', icon: '🤝' },
  { channel: 'VC & Founder Referrals', description: 'Ask your investors or founder network who they\'ve used for HR leadership.', pros: 'Trusted recommendations, proven track records', bestFor: 'Startups with strong networks', icon: '🌟' },
  { channel: 'People & Culture Communities', description: 'Slack groups like People Geeks, HR Open Source, or industry HR forums.', pros: 'Active practitioners, can observe expertise', bestFor: 'Finding culturally aligned HR leaders', icon: '👥' },
];

const evaluationCriteria = [
  { criteria: 'Scale Experience', description: 'Have they scaled teams from 50 to 200+ employees? A CHRO who\'s only worked in enterprises won\'t know the challenges of high-growth scaling.', lookFor: 'Experience at companies 50-500 employees, built HR from scratch', redFlag: 'Only worked at large corporates or very early stage' },
  { criteria: 'Culture & Engagement Expertise', description: 'Can they build and maintain culture as you scale? Look for evidence of engagement programs, values work, and retention improvements.', lookFor: 'Measurable engagement scores, retention improvements, values implementation', redFlag: 'No culture transformation experience or only compliance-focused' },
  { criteria: 'Employment Law Knowledge', description: 'Do they understand UK employment law deeply? TUPE, redundancy, tribunal experience are valuable.', lookFor: 'CIPD qualified, tribunal experience, TUPE/M&A experience', redFlag: 'Limited UK employment law knowledge or no CIPD qualification' },
  { criteria: 'Performance Management', description: 'Can they implement performance systems that actually work? Review cycles, feedback culture, career frameworks.', lookFor: 'Built performance systems, OKR/goal frameworks, career ladder design', redFlag: 'Only knows one approach or hasn\'t built systems from scratch' },
  { criteria: 'Hiring & TA Experience', description: 'Have they built recruitment processes and employer brands? Look for volume hiring and quality bar maintenance.', lookFor: 'Built TA functions, employer brand work, hiring process design', redFlag: 'No hands-on recruitment experience or only agency background' },
  { criteria: 'Fractional Working Model', description: 'Do they know how to work fractionally? Clear communication, async updates, prioritisation.', lookFor: 'Works with 2-4 companies, clear systems, communication cadence', redFlag: 'First fractional role or working with 6+ companies' },
];

export default function HireFractionalCHROClient() {
  const heroImage = getHeroImageUrl('services', 1920, 800);
  const imageCredit = getImage('services');

  return (
    <main>
      <WebPageSchema title="Hire a Fractional CHRO UK 2026" description="How to hire a fractional CHRO." url="https://fractional.quest/hire-fractional-chro" dateModified={new Date('2026-01-07T00:00:00Z')} />
      <FAQPageSchema faqs={faqItems} />

      <div className="min-h-screen bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-purple-600 to-purple-500 py-24">
            <Image src={heroImage} alt="Hire a Fractional CHRO" fill priority sizes="100vw" className="object-cover" />
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
              <Link href="/fractional-chro" className="text-purple-100 hover:text-white mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Back to Fractional CHRO Guide</Link>
              <div className="max-w-4xl">
                <span className="inline-block bg-white text-purple-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Hiring Guide</span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">Hire a<br /><span className="text-purple-200">Fractional CHRO</span></h1>
                <p className="text-2xl md:text-3xl text-purple-50 leading-relaxed font-light mb-10">Complete guide to finding, vetting, and hiring the perfect fractional Chief HR Officer for your business.</p>
                <div className="flex flex-wrap gap-10 mb-12">
                  <div><div className="text-5xl font-black text-white">2-4 Weeks</div><div className="text-purple-100 text-sm uppercase tracking-wider mt-1">To Hire</div></div>
                  <div><div className="text-5xl font-black text-white">90 Days</div><div className="text-purple-100 text-sm uppercase tracking-wider mt-1">To Impact</div></div>
                  <div><div className="text-5xl font-black text-white">50+</div><div className="text-purple-100 text-sm uppercase tracking-wider mt-1">Candidates</div></div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/fractional-chro-jobs-uk" className="px-8 py-4 bg-white text-purple-600 font-bold uppercase tracking-wider hover:bg-purple-50 transition-colors">Browse CHRO Candidates</Link>
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
                <div><div className="text-4xl font-black text-purple-600 mb-2">5-10</div><div className="text-gray-600 text-sm">Candidates to Interview</div></div>
                <div><div className="text-4xl font-black text-purple-600 mb-2">3-6 Months</div><div className="text-gray-600 text-sm">Minimum Engagement</div></div>
                <div><div className="text-4xl font-black text-purple-600 mb-2">£600-1.1k</div><div className="text-gray-600 text-sm">Day Rate Range</div></div>
                <div><div className="text-4xl font-black text-purple-600 mb-2">30 Days</div><div className="text-gray-600 text-sm">Standard Notice</div></div>
              </div>
            </div>
          </section>

          {/* Table of Contents */}
          <section className="py-8 bg-white border-b">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <TableOfContents items={tocItems} title="In This Guide" accentColor="purple" />
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
                  <ul className="space-y-3">
                    {authorityLinks.slice(0, 4).map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-2">
                          <span className="text-purple-400">→</span> {link.name}
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
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Where to Find Fractional CHROs</h2>
                <p className="text-xl text-gray-600">Six proven channels for finding pre-vetted, experienced fractional HR leaders.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sourcingChannels.map((source, index) => (
                  <div key={index} className="bg-gray-50 p-8 border-l-4 border-purple-500 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{source.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{source.channel}</h3>
                    <p className="text-gray-600 text-sm mb-4">{source.description}</p>
                    <div className="mb-3"><div className="text-xs font-bold text-gray-500 uppercase mb-1">Pros:</div><div className="text-sm text-gray-700">{source.pros}</div></div>
                    <div><div className="text-xs font-bold text-gray-500 uppercase mb-1">Best For:</div><div className="text-sm text-purple-600">{source.bestFor}</div></div>
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
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What to Look For in a Fractional CHRO</h2>
                <p className="text-xl text-gray-600 max-w-3xl">Not all experienced HR leaders make good fractional CHROs. Here's what separates the best from the rest.</p>
              </div>
              <div className="space-y-8">
                {evaluationCriteria.map((item, index) => (
                  <div key={index} className="bg-white p-10 border-l-4 border-purple-500 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{index + 1}. {item.criteria}</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg"><div className="text-sm font-bold text-purple-800 mb-2">✅ Look For</div><p className="text-sm text-gray-700">{item.lookFor}</p></div>
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
                <p className="text-xl text-gray-600 max-w-3xl">These questions separate strategic HR leaders from administrators. Use them to assess expertise, results, and fit.</p>
              </div>
              <div className="space-y-8">
                <div className="bg-purple-50 border-2 border-purple-200 p-10 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">👥 People & Culture Questions</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-700"><strong className="text-gray-900">"Walk me through how you've built culture at a scaling company. What worked and what didn't?"</strong><br/><span className="text-sm text-gray-600">Listen for: Specific initiatives, measurable engagement results, lessons learned</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you approach employee retention during rapid growth?"</strong><br/><span className="text-sm text-gray-600">Listen for: Data-driven approach, proactive vs reactive, career development focus</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"Tell me about a difficult employee relations situation you handled."</strong><br/><span className="text-sm text-gray-600">Listen for: Employment law knowledge, fairness, clear process, outcome</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you balance business needs with employee advocacy?"</strong><br/><span className="text-sm text-gray-600">Listen for: Understanding of both perspectives, examples of navigating tension</span></li>
                  </ul>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 p-10 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">📋 HR Operations Questions</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-700"><strong className="text-gray-900">"What HR systems and processes would you prioritize for a company at our stage?"</strong><br/><span className="text-sm text-gray-600">Listen for: Stage-appropriate thinking, not over-engineering, pragmatic priorities</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you approach performance management? Walk me through a system you've built."</strong><br/><span className="text-sm text-gray-600">Listen for: Modern approaches, clear frameworks, continuous vs annual review</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"Tell me about your experience with compensation and benefits strategy."</strong><br/><span className="text-sm text-gray-600">Listen for: Benchmarking methodology, equity vs cash trade-offs, market awareness</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you ensure HR compliance without slowing down the business?"</strong><br/><span className="text-sm text-gray-600">Listen for: Balance of risk vs speed, practical compliance, prioritization</span></li>
                  </ul>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 p-10 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 Talent & Growth Questions</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-700"><strong className="text-gray-900">"How would you structure our talent acquisition function?"</strong><br/><span className="text-sm text-gray-600">Listen for: In-house vs agency, employer branding, process design</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"Tell me about a time you had to rapidly scale a team. What was your approach?"</strong><br/><span className="text-sm text-gray-600">Listen for: Hiring process, quality vs speed balance, onboarding</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you approach leadership development and succession planning?"</strong><br/><span className="text-sm text-gray-600">Listen for: Long-term thinking, practical programs, manager training</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you stay effective working 2 days/week vs embedded full-time?"</strong><br/><span className="text-sm text-gray-600">Listen for: Async communication, clear frameworks, delegation</span></li>
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
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">The Fractional CHRO Hiring Process</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">From first conversation to start date in 2-4 weeks.</p>
              </div>
              <HireProcessStepper accentColor="purple" />
              <div className="mt-16 bg-purple-50 border-2 border-purple-200 p-10 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Timeline Breakdown</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h4 className="font-bold text-gray-900 mb-2">Week 1: Define & Source</h4><ul className="text-sm text-gray-700 space-y-1"><li>• Define HR requirements (Day 1-2)</li><li>• Post on job boards, ask for referrals (Day 2-3)</li><li>• Review candidates, shortlist 5-10 (Day 4-7)</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Week 2-3: Interview & Select</h4><ul className="text-sm text-gray-700 space-y-1"><li>• First-round interviews (45-min calls)</li><li>• Second round: case study or scenario</li><li>• Reference checks (2-3 calls)</li><li>• Make offer and negotiate terms</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Week 4: Onboard & Start</h4><ul className="text-sm text-gray-700 space-y-1"><li>• Contract signing and admin setup</li><li>• Share HR systems access and docs</li><li>• First week: stakeholder interviews</li><li>• Begin HR audit and strategy work</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">First 90 Days: Deliver</h4><ul className="text-sm text-gray-700 space-y-1"><li>• Month 1: HR audit, quick wins</li><li>• Month 2: Process improvements, systems</li><li>• Month 3: Scale, hire, measure results</li><li>• Decide to extend or part ways</li></ul></div>
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
                <p className="text-xl text-gray-600 max-w-3xl">Standard terms for fractional CHRO engagements.</p>
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 p-10 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mt-0 mb-6">Standard Contract Template</h3>
                <div className="space-y-6">
                  <div><h4 className="font-bold text-gray-900 mb-2">Engagement Model</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Day rate:</strong> £600-£1,100 per day (based on experience)</li><li><strong>Commitment:</strong> 1-3 days per week (specify exact days)</li><li><strong>Monthly retainer option:</strong> £2,400-£4,400 for predictable billing</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Term & Notice</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Initial term:</strong> 3-month trial period</li><li><strong>Renewal:</strong> Auto-renew to 12-month rolling contract after trial</li><li><strong>Notice period:</strong> 30 days either side (standard)</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Scope of Work</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Responsibilities:</strong> HR strategy, people operations, culture development, employment law compliance</li><li><strong>Deliverables:</strong> HR audit, people strategy, process documentation, team development</li><li><strong>Exclusions:</strong> Day-to-day HR admin (unless scoped), individual contributor work</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">IP & Confidentiality</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>IP ownership:</strong> Company owns all HR documentation and systems</li><li><strong>Confidentiality:</strong> Standard NDA terms, survives termination (employee data critical)</li><li><strong>Non-compete:</strong> Usually not applicable (fractional works with multiple companies)</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Optional: Equity</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Advisory shares:</strong> 0.1-0.25% for long-term engagements (12+ months)</li><li><strong>Vesting:</strong> Quarterly or annual vesting</li><li><strong>Cash reduction:</strong> If equity included, day rate may reduce 10-15%</li></ul></div>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Comparison */}
          <section id="cost-comparison" className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Investment</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Cost Comparison: Fractional vs Full-Time vs HR Consultancy</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Understand the total cost of each CHRO hiring option for your business.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
                  <thead>
                    <tr className="bg-purple-600 text-white">
                      <th className="px-6 py-4 text-left font-bold">Cost Factor</th>
                      <th className="px-6 py-4 text-center font-bold">Fractional CHRO</th>
                      <th className="px-6 py-4 text-center font-bold">Full-Time CHRO</th>
                      <th className="px-6 py-4 text-center font-bold">HR Consultancy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Annual Cost</td>
                      <td className="px-6 py-4 text-center text-purple-700 font-bold">£50k - £100k</td>
                      <td className="px-6 py-4 text-center text-gray-600">£120k - £200k</td>
                      <td className="px-6 py-4 text-center text-gray-600">£80k - £250k</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Days per Week</td>
                      <td className="px-6 py-4 text-center text-purple-700">1-3 days</td>
                      <td className="px-6 py-4 text-center text-gray-600">5 days</td>
                      <td className="px-6 py-4 text-center text-gray-600">Project-based</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Notice Period</td>
                      <td className="px-6 py-4 text-center text-purple-700">30 days</td>
                      <td className="px-6 py-4 text-center text-gray-600">3-6 months</td>
                      <td className="px-6 py-4 text-center text-gray-600">Contract end</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Employer NI/Benefits</td>
                      <td className="px-6 py-4 text-center text-green-600">None</td>
                      <td className="px-6 py-4 text-center text-red-600">£25k - £40k</td>
                      <td className="px-6 py-4 text-center text-green-600">None</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Equity Required</td>
                      <td className="px-6 py-4 text-center text-green-600">Optional (0.1-0.25%)</td>
                      <td className="px-6 py-4 text-center text-red-600">0.3-1%</td>
                      <td className="px-6 py-4 text-center text-green-600">None</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Time to Hire</td>
                      <td className="px-6 py-4 text-center text-purple-700">2-4 weeks</td>
                      <td className="px-6 py-4 text-center text-gray-600">3-6 months</td>
                      <td className="px-6 py-4 text-center text-gray-600">2-4 weeks</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Cross-Industry Experience</td>
                      <td className="px-6 py-4 text-center text-green-600">High (multiple clients)</td>
                      <td className="px-6 py-4 text-center text-gray-600">Limited</td>
                      <td className="px-6 py-4 text-center text-green-600">High</td>
                    </tr>
                    <tr className="bg-purple-100">
                      <td className="px-6 py-4 font-bold text-gray-900">Best For</td>
                      <td className="px-6 py-4 text-center text-purple-700 font-medium">Scale-ups needing strategic HR leadership</td>
                      <td className="px-6 py-4 text-center text-gray-600 font-medium">Large orgs with 200+ employees</td>
                      <td className="px-6 py-4 text-center text-gray-600 font-medium">One-off HR projects</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-600">Sources: <a href="https://www.glassdoor.co.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline">Glassdoor UK</a>, <a href="https://www.cipd.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline">CIPD Salary Survey</a>, Market research</p>
              </div>
            </div>
          </section>

          {/* Browse CHRO Candidates */}
          <section id="browse-candidates" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Find Talent</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse CHRO Candidates</h2>
                <p className="text-xl text-gray-500">Connect with experienced fractional CHROs seeking new opportunities</p>
              </div>
              <EmbeddedJobBoard
                defaultDepartment="HR"
                title="Available CHRO Talent"
                accentColor="purple"
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
          <section className="py-20 bg-purple-600 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Hire?</h2>
              <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">Browse pre-vetted fractional CHRO candidates on Fractional.Quest. Post your role and start interviews this week.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/fractional-chro-jobs-uk" className="px-10 py-5 bg-white text-purple-600 font-bold uppercase tracking-wider hover:bg-purple-50 transition-colors">Browse CHRO Candidates</Link>
                <Link href="/contact" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-purple-600 transition-colors">Post Your Role</Link>
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
                {/* CHRO Resources */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">CHRO Resources</h3>
                  <ul className="space-y-2">
                    <li><Link href="/fractional-chro" className="text-gray-600 hover:text-purple-600 transition-colors">What is a Fractional CHRO?</Link></li>
                    <li><Link href="/fractional-chro-salary" className="text-gray-600 hover:text-purple-600 transition-colors">CHRO Salary & Day Rates</Link></li>
                    <li><Link href="/fractional-chro-services" className="text-gray-600 hover:text-purple-600 transition-colors">CHRO Services</Link></li>
                    <li><Link href="/fractional-chro-jobs-uk" className="text-gray-600 hover:text-purple-600 transition-colors">CHRO Jobs UK</Link></li>
                    <li><Link href="/interim-chro-jobs-uk" className="text-gray-600 hover:text-purple-600 transition-colors">Interim CHRO Jobs</Link></li>
                  </ul>
                </div>
                {/* Other C-Suite Hiring */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Hire Other C-Suite</h3>
                  <ul className="space-y-2">
                    <li><Link href="/hire-fractional-cfo" className="text-gray-600 hover:text-purple-600 transition-colors">Hire a Fractional CFO</Link></li>
                    <li><Link href="/hire-fractional-cto" className="text-gray-600 hover:text-purple-600 transition-colors">Hire a Fractional CTO</Link></li>
                    <li><Link href="/hire-fractional-cmo" className="text-gray-600 hover:text-purple-600 transition-colors">Hire a Fractional CMO</Link></li>
                    <li><Link href="/hire-fractional-coo" className="text-gray-600 hover:text-purple-600 transition-colors">Hire a Fractional COO</Link></li>
                    <li><Link href="/hire-fractional-ceo" className="text-gray-600 hover:text-purple-600 transition-colors">Hire a Fractional CEO</Link></li>
                  </ul>
                </div>
                {/* External Resources */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
                  <ul className="space-y-2">
                    {authorityLinks.map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1">
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
