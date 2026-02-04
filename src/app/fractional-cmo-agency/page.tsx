"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { FAQ, FAQItem } from "@/components/seo";
import { WebPageSchema, FAQPageSchema } from "@/components/seo";
import { EmbeddedJobBoard } from "@/components/EmbeddedJobBoard";
import Image from "next/image";
import { getHeroImageUrl, getImage } from '@/lib/images';

const CALENDLY_URL = 'https://calendly.com/firstquest/quest';

const faqItems: FAQItem[] = [
  { question: 'What is a fractional CMO agency?', answer: 'A fractional CMO agency specialises in placing part-time, interim, and fractional Chief Marketing Officers with businesses. Unlike traditional marketing recruiters who focus on full-time permanent hires, these agencies understand the fractional model, day rates, and how to match marketing leaders with companies needing strategic marketing leadership 1-3 days per week.' },
  { question: 'How much do fractional CMO agencies charge?', answer: 'Agency fees typically range from 15-25% of the first year\'s expected billings (based on agreed days x day rate x 52 weeks). Some agencies charge flat fees of £8,000-£20,000 per placement. For senior fractional CMO roles commanding £1,000+ day rates, retained search may cost £15,000-£35,000.' },
  { question: 'What\'s the difference between a fractional CMO agency and a marketing agency?', answer: 'A fractional CMO agency places marketing leaders who work for your company. A marketing agency provides outsourced marketing services. The fractional CMO becomes your marketing leader, directing strategy and managing agencies - they\'re accountable to you, not billing you for campaigns.' },
  { question: 'How long does it take to find a fractional CMO through an agency?', answer: 'Typically 2-4 weeks for B2B SaaS or general marketing leadership roles, and 4-8 weeks for specialist positions (e.g., FinTech, HealthTech, or specific industry experience). Agencies with established CMO networks can often present shortlisted candidates within days.' },
  { question: 'Should I use an agency or hire a fractional CMO directly?', answer: 'Use an agency if you need speed, don\'t have marketing networks, want pre-vetted candidates, or need a specialist. Hire directly if you have strong industry connections, want to save fees, or are hiring for a common role where you can easily assess marketing leadership quality yourself.' },
  { question: 'What qualifications should a fractional CMO agency look for?', answer: 'Key criteria: (1) Proven track record as VP Marketing or CMO, (2) Experience in your industry or growth stage, (3) Demand generation and brand building expertise, (4) Agency and team management experience, (5) Strategic planning capability, (6) Martech stack knowledge, (7) Board-level presentation skills.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'The UK\'s leading fractional executive job board. Browse CMO candidates directly or post roles to attract qualified fractional marketing leaders.', speciality: 'All C-suite including CMO', model: 'Job board', icon: '🎯' },
  { name: 'The Marketing Directors Network', description: 'Specialist network focused on marketing leadership. Strong in B2B SaaS, consumer brands, and scale-ups.', speciality: 'CMO, VP Marketing, CGO', model: 'Network matching', icon: '📣' },
  { name: 'Chief Outsiders', description: 'US-based but with UK presence. Focus on growth-focused fractional CMOs for mid-market companies.', speciality: 'Fractional CMO, Growth CMO', model: 'Retained search', icon: '🚀' },
  { name: 'GrowthPath Partners', description: 'Focused on tech sector marketing leadership. Strong in demand generation and product marketing.', speciality: 'CMO, VP Demand Gen, Product Marketing', model: 'Network matching', icon: '💡' },
  { name: 'Interim Marketing Alliance', description: 'Traditional interim network with fractional options. Good for larger enterprise engagements.', speciality: 'CMO, Marketing Director', model: 'Retained search', icon: '👔' },
  { name: 'B2B Marketing Leaders', description: 'B2B-focused marketing leadership placement. Strong in ABM, content, and digital transformation.', speciality: 'B2B CMO, Demand Gen', model: 'Network matching', icon: '🎯' },
];

const comparisonData = [
  { factor: 'Cost', directHire: 'Free (your time only)', agency: '15-25% of year 1 billings' },
  { factor: 'Time to hire', directHire: '4-8 weeks', agency: '2-4 weeks' },
  { factor: 'Candidate quality', directHire: 'Depends on your network', agency: 'Pre-vetted, referenced' },
  { factor: 'Market knowledge', directHire: 'Limited visibility', agency: 'Full market access' },
  { factor: 'Rate negotiation', directHire: 'Self-managed', agency: 'Agent-assisted' },
  { factor: 'Industry expertise', directHire: 'Your knowledge only', agency: 'Sector specialists available' },
];

const benefits = [
  { title: 'Speed to Hire', description: 'Agencies have existing networks of pre-vetted fractional CMOs. What might take you weeks of LinkedIn searching, they can deliver in days.', icon: '⚡' },
  { title: 'Quality Assurance', description: 'Good agencies reference-check, interview, and assess candidates for marketing leadership competency before presenting them.', icon: '✓' },
  { title: 'Market Intelligence', description: 'Agencies know current CMO day rates, availability, and who has relevant industry experience. They advise on budget and trade-offs.', icon: '📊' },
  { title: 'Specialist Matching', description: 'Need a CMO with FinTech experience? SaaS demand gen expertise? Agencies can find specialists you wouldn\'t reach directly.', icon: '🎯' },
  { title: 'Negotiation Support', description: 'Having an intermediary helps with rate negotiations and setting expectations on scope, days, and deliverables.', icon: '🤝' },
  { title: 'Replacement Guarantee', description: 'Most agencies offer replacement guarantees (typically 3-6 months) if the placement doesn\'t work out.', icon: '🛡️' },
];

export default function FractionalCMOAgencyPage() {
  const heroImage = getHeroImageUrl('marketing', 1920, 800);
  const imageCredit = getImage('marketing');

  return (
    <main>
      <WebPageSchema title="Fractional CMO Agency UK 2026 - Best Agencies for Fractional Marketing Leaders" description="Find the best fractional CMO agencies in the UK. Compare agencies specialising in fractional Chief Marketing Officer placements. Understand fees, timelines, and how to choose." url="https://fractional.quest/fractional-cmo-agency" dateModified={new Date('2026-01-20T00:00:00Z')} />
      <FAQPageSchema faqs={faqItems} />

      <div className="min-h-screen bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-amber-600 to-orange-500 py-24">
            <Image src={heroImage} alt="Fractional CMO Agency - Marketing Leadership Placement" fill priority sizes="100vw" className="object-cover" />
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
              <Link href="/fractional-jobs-uk" className="text-amber-100 hover:text-white mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Back to Fractional Jobs UK</Link>
              <div className="max-w-4xl">
                <span className="inline-block bg-white text-amber-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Guide</span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">Fractional<br /><span className="text-amber-200">CMO Agency</span></h1>
                <p className="text-2xl md:text-3xl text-amber-50 leading-relaxed font-light mb-10">Find the best agencies for hiring <strong>fractional CMO</strong> talent. Compare specialists in marketing leadership placements across the UK.</p>
                <div className="flex flex-wrap gap-10 mb-12">
                  <div><div className="text-5xl font-black text-white">15-25%</div><div className="text-amber-100 text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
                  <div><div className="text-5xl font-black text-white">2-4 Weeks</div><div className="text-amber-100 text-sm uppercase tracking-wider mt-1">To Place</div></div>
                  <div><div className="text-5xl font-black text-white">£850-£1,300</div><div className="text-amber-100 text-sm uppercase tracking-wider mt-1">CMO Day Rate</div></div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-amber-600 font-bold uppercase tracking-wider hover:bg-amber-50 transition-colors inline-flex items-center gap-2"
                  >
                    <span>📅</span> Book a Free Call
                  </a>
                  <Link href="#agencies" className="px-8 py-4 bg-amber-700 text-white font-bold uppercase tracking-wider hover:bg-amber-800 transition-colors border border-amber-500">View Top Agencies</Link>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 z-10">
              <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a>
            </div>
          </section>

          {/* COMPANIES CTA PANEL */}
          <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 py-16">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block bg-white/20 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">For Companies</span>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Need to Hire a Fractional CMO?</h2>
                  <p className="text-xl text-white/90 mb-6">Skip the agency fees. Talk directly with Dan Keegan, founder of Fractional Quest, for free hiring advice and access to our vetted network of <strong>fractional CMO</strong> talent.</p>
                  <ul className="space-y-3 text-white/90 mb-8">
                    <li className="flex items-center gap-3"><span className="text-2xl">✓</span> Free 30-minute consultation</li>
                    <li className="flex items-center gap-3"><span className="text-2xl">✓</span> No agency fees - browse CMO candidates directly</li>
                    <li className="flex items-center gap-3"><span className="text-2xl">✓</span> Honest advice on what you actually need</li>
                    <li className="flex items-center gap-3"><span className="text-2xl">✓</span> Day rate guidance and scope definition</li>
                  </ul>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-amber-600 text-lg font-bold py-4 px-8 hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    <span className="text-2xl">📅</span>
                    <span>Book Your Free Call</span>
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">📣</div>
                    <h3 className="text-2xl font-bold text-white mb-2">What Companies Get</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="font-bold text-white mb-1">Free Hiring Strategy Call</div>
                      <div className="text-white/80 text-sm">30 minutes to discuss your marketing leadership needs</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="font-bold text-white mb-1">Access to CMO Network</div>
                      <div className="text-white/80 text-sm">Post roles or browse 100+ fractional CMOs</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="font-bold text-white mb-1">Market Rate Intelligence</div>
                      <div className="text-white/80 text-sm">Know CMO day rates before you negotiate</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="font-bold text-white mb-1">Zero Placement Fees</div>
                      <div className="text-white/80 text-sm">Save 15-25% vs traditional agencies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="bg-gray-50 border-b">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div><div className="text-4xl font-black text-amber-600 mb-2">£8k-35k</div><div className="text-gray-600 text-sm">Typical Agency Fees</div></div>
                <div><div className="text-4xl font-black text-amber-600 mb-2">3-6 Months</div><div className="text-gray-600 text-sm">Guarantee Period</div></div>
                <div><div className="text-4xl font-black text-amber-600 mb-2">5-10</div><div className="text-gray-600 text-sm">Candidates Presented</div></div>
                <div><div className="text-4xl font-black text-amber-600 mb-2">85%+</div><div className="text-gray-600 text-sm">Placement Success</div></div>
              </div>
            </div>
          </section>

          {/* What is a Fractional CMO Agency */}
          <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a Fractional CMO Agency?</h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  A <strong>fractional CMO agency</strong> specialises in placing part-time, interim, and fractional Chief Marketing Officers with businesses. Unlike traditional marketing recruiters who focus primarily on full-time permanent placements, these specialist agencies understand the unique dynamics of the fractional model.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  They know how to assess candidates who work with multiple clients, understand day rate structures and typical engagement models, and can match marketing leaders to companies based on time commitment requirements (1-3 days per week rather than full-time). A good <strong>fractional CMO agency</strong> also understands the difference between strategic oversight and hands-on execution.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The UK fractional CMO market has grown significantly since 2020, with more companies recognising that they need marketing leadership without the full-time cost. This has driven the emergence of specialist <strong>fractional CMO agencies</strong> alongside traditional interim and permanent search firms.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you need brand strategy, demand generation expertise, or marketing transformation leadership, working with a <strong>fractional CMO agency</strong> can accelerate your search for the right marketing leader.
                </p>
              </div>
              <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Not sure what marketing leadership you need?</h3>
                  <p className="text-gray-600">Get free advice on whether you need an agency or can hire a fractional CMO directly.</p>
                </div>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-6 py-3 bg-amber-600 text-white font-bold hover:bg-amber-700 transition-colors inline-flex items-center gap-2"
                >
                  <span>📅</span> Book Free Call
                </a>
              </div>
            </div>
          </section>

          {/* Benefits of Using an Agency */}
          <section className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a Fractional CMO Agency?</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white p-8 border-l-4 border-amber-500 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECOND CTA */}
          <section className="py-16 bg-gray-900">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="text-5xl mb-6">🚀</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Hire Your Fractional CMO?</h2>
              <p className="text-xl text-gray-300 mb-8">Most companies don&apos;t need an agency. Let&apos;s discuss your specific marketing leadership needs.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors"
                >
                  <span>📅</span> Book a Free Call
                </a>
                <Link href="/fractional-cmo-jobs-uk" className="px-8 py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors">
                  Browse CMO Candidates
                </Link>
              </div>
            </div>
          </section>

          {/* Top Agencies */}
          <section id="agencies" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Directory</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Top Fractional CMO Agencies UK</h2>
                <p className="text-lg text-gray-600">Specialist agencies and platforms for finding fractional CMO talent in the UK.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topAgencies.map((agency, index) => (
                  <div key={index} className="bg-gray-50 p-8 border-l-4 border-amber-500 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{agency.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{agency.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                    <div className="mb-3"><div className="text-xs font-bold text-gray-500 uppercase mb-1">Speciality:</div><div className="text-sm text-gray-700">{agency.speciality}</div></div>
                    <div><div className="text-xs font-bold text-gray-500 uppercase mb-1">Model:</div><div className="text-sm text-amber-600">{agency.model}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Direct vs Agency Comparison */}
          <section className="py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Comparison</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Direct Hire vs Fractional CMO Agency</h2>
                <p className="text-lg text-gray-600">Compare the trade-offs between hiring directly and using a fractional CMO agency.</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-amber-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-sm">Factor</th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-sm">Direct Hire</th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-sm">Via Agency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">{row.factor}</td>
                        <td className="px-6 py-4 text-gray-600">{row.directHire}</td>
                        <td className="px-6 py-4 text-gray-600">{row.agency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* CALENDLY WIDGET SECTION */}
          <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-12 border border-amber-200 text-center">
                <div className="text-6xl mb-6">📅</div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Schedule Your Free Consultation</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  30 minutes with Dan Keegan, founder of Fractional Quest. Get honest advice on hiring fractional CMO talent - no sales pitch, no commitment.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xl font-bold py-5 px-10 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl mb-8"
                >
                  <span>Open Calendar & Book Now</span>
                </a>
                <p className="text-sm text-gray-500 mb-8">Opens Calendly - Free - 30 min - Zoom</p>
              </div>
            </div>
          </section>

          {/* Job Board Section */}
          <section className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Browse Directly</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Or Skip the Agency - Browse CMO Candidates Directly</h2>
                <p className="text-lg text-gray-600">Fractional.Quest is a job board, not an agency. Browse fractional CMO roles directly, with no placement fees.</p>
              </div>
              <EmbeddedJobBoard
                defaultDepartment="Marketing"
                title="Fractional CMO Jobs UK"
                accentColor="amber"
                jobsPerPage={6}
              />
            </div>
          </section>

          {/* Related Resources */}
          <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Explore</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Related Resources</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Link href="/fractional-cmo-jobs-uk" className="bg-gray-50 p-8 border-l-4 border-amber-500 hover:shadow-md transition-shadow group">
                  <div className="text-3xl mb-4">📣</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600">Fractional CMO Jobs</h3>
                  <p className="text-gray-600 text-sm">Browse CMO and marketing leadership roles.</p>
                </Link>
                <Link href="/fractional-cmo-services" className="bg-gray-50 p-8 border-l-4 border-orange-500 hover:shadow-md transition-shadow group">
                  <div className="text-3xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600">Fractional CMO Services</h3>
                  <p className="text-gray-600 text-sm">Learn about CMO services and engagement models.</p>
                </Link>
                <Link href="/fractional-cmo-salary" className="bg-gray-50 p-8 border-l-4 border-pink-500 hover:shadow-md transition-shadow group">
                  <div className="text-3xl mb-4">💰</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600">Fractional CMO Salary</h3>
                  <p className="text-gray-600 text-sm">Day rates and compensation benchmarks.</p>
                </Link>
                <Link href="/hire-fractional-cmo" className="bg-gray-50 p-8 border-l-4 border-purple-500 hover:shadow-md transition-shadow group">
                  <div className="text-3xl mb-4">👔</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600">How to Hire a CMO</h3>
                  <p className="text-gray-600 text-sm">Complete guide to hiring fractional CMOs.</p>
                </Link>
              </div>
            </div>
          </section>

          {/* External Resources */}
          <section className="py-16 bg-gray-50 border-t">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">External Resources</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <a href="https://www.cim.co.uk/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-600">CIM - Chartered Institute of Marketing →</a>
                <a href="https://dma.org.uk/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-600">DMA - Data & Marketing Association →</a>
                <a href="https://www.marketingweek.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-600">Marketing Week - Industry News →</a>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Questions</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Frequently Asked Questions About Fractional CMO Agencies</h2>
              </div>
              <FAQ items={faqItems} />
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="py-24 bg-gradient-to-r from-amber-600 to-orange-600">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Hire Your Fractional CMO?</h2>
              <p className="text-xl text-amber-100 mb-10">Book a free call to discuss your marketing leadership needs, or browse our job board directly.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-600 font-bold uppercase tracking-wider hover:bg-amber-50 transition-colors"
                >
                  <span>📅</span> Book Your Free Call
                </a>
                <Link href="/fractional-cmo-jobs-uk" className="px-8 py-4 bg-amber-700 text-white font-bold uppercase tracking-wider hover:bg-amber-800 transition-colors border border-amber-500">Browse CMO Jobs</Link>
              </div>
              <p className="text-amber-200 text-sm mt-8">No fees - No commitment - 30 minute consultation</p>
            </div>
          </section>
        </div>
    </main>
  );
}
