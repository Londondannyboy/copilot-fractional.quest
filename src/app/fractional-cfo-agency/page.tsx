"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import { useCoAgent, useCopilotChat } from "@copilotkit/react-core";
import { CopilotSidebar, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { CopilotProvider } from "@/components/CopilotProvider";
import { authClient } from "@/lib/auth/client";
import { VoiceInput } from "@/components/voice-input";
import { FAQ, FAQItem } from "@/components/seo";
import { WebPageSchema, FAQPageSchema } from "@/components/seo";
import { EmbeddedJobBoard } from "@/components/EmbeddedJobBoard";
import Image from "next/image";
import { getHeroImageUrl, getImage } from '@/lib/images';

const CALENDLY_URL = 'https://calendly.com/firstquest/quest';

const faqItems: FAQItem[] = [
  { question: 'What is a fractional CFO agency?', answer: 'A fractional CFO agency specialises in placing part-time, interim, and fractional Chief Financial Officers with businesses. Unlike traditional finance recruiters who focus on full-time permanent hires, these agencies understand the fractional model, day rates, and how to match finance leaders with companies needing strategic financial leadership 1-3 days per week.' },
  { question: 'How much do fractional CFO agencies charge?', answer: 'Agency fees typically range from 15-25% of the first year\'s expected billings (based on agreed days x day rate x 52 weeks). Some agencies charge flat fees of £5,000-£15,000 per placement. For senior fractional CFO roles commanding £1,000+ day rates, retained search may cost £15,000-£30,000.' },
  { question: 'What\'s the difference between a fractional CFO agency and an accountancy firm?', answer: 'A fractional CFO agency places finance leaders who become your CFO. An accountancy firm provides outsourced accounting services. The fractional CFO joins your leadership team, drives strategy, manages fundraising, and is accountable to your board - they\'re not just producing accounts.' },
  { question: 'How long does it take to find a fractional CFO through an agency?', answer: 'Typically 2-4 weeks for common CFO roles (generalist, scale-up, PE-backed) and 4-8 weeks for specialist positions (e.g., pre-IPO, M&A, specific industry like FinTech). Agencies with established CFO networks can often present shortlisted candidates within days.' },
  { question: 'Should I use an agency or hire a fractional CFO directly?', answer: 'Use an agency if you need speed, don\'t have finance networks, want pre-vetted candidates, or need a specialist (fundraising, M&A, international). Hire directly if you have strong investor/PE connections, want to save fees, or are hiring for a common role where you can assess CFO quality yourself.' },
  { question: 'What qualifications should a fractional CFO agency look for?', answer: 'Key criteria: (1) ACA, ACCA, or CIMA qualification, (2) Previous CFO/FD experience at relevant scale, (3) Fundraising track record if needed, (4) Industry experience matching your sector, (5) Board-level communication skills, (6) Systems implementation experience, (7) Strong references from investors/boards.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'The UK\'s leading fractional executive job board. Browse CFO candidates directly or post roles to attract qualified fractional finance leaders.', speciality: 'All C-suite including CFO', model: 'Job board', icon: '🎯' },
  { name: 'The Fractional CFO Network', description: 'Specialist network focused on finance leadership. Strong in PE/VC-backed companies and scale-ups requiring investor-grade finance.', speciality: 'CFO, FD, Finance Director', model: 'Network matching', icon: '💰' },
  { name: 'FD Intelligence', description: 'Finance director specialist with fractional and interim options. Good for £5m-£50m revenue businesses.', speciality: 'FD, CFO, Finance transformation', model: 'Retained search', icon: '📊' },
  { name: 'The Finance Directors Network', description: 'Membership network of senior finance professionals. Strong in SME and mid-market placements.', speciality: 'FD, CFO, Financial Controller', model: 'Network matching', icon: '🏢' },
  { name: 'PE CFO Partners', description: 'Specialised in private equity-backed businesses. Strong in value creation, 100-day plans, and exit preparation.', speciality: 'PE CFO, Value Creation', model: 'Retained search', icon: '📈' },
  { name: 'Start-up CFO Network', description: 'Focused on venture-backed and high-growth startups. Experienced in Series A-C fundraising support.', speciality: 'Start-up CFO, VC-backed', model: 'Network matching', icon: '🚀' },
];

const comparisonData = [
  { factor: 'Cost', directHire: 'Free (your time only)', agency: '15-25% of year 1 billings' },
  { factor: 'Time to hire', directHire: '4-8 weeks', agency: '2-4 weeks' },
  { factor: 'Candidate quality', directHire: 'Depends on your network', agency: 'Pre-vetted, referenced' },
  { factor: 'Market knowledge', directHire: 'Limited visibility', agency: 'Full market access' },
  { factor: 'Rate negotiation', directHire: 'Self-managed', agency: 'Agent-assisted' },
  { factor: 'IR35 guidance', directHire: 'Self-research', agency: 'Expert guidance included' },
];

const benefits = [
  { title: 'Speed to Hire', description: 'Agencies have existing networks of pre-vetted fractional CFOs. What might take you weeks of LinkedIn searching, they can deliver in days.', icon: '⚡' },
  { title: 'Quality Assurance', description: 'Good agencies reference-check, interview, and assess candidates for finance leadership competency before presenting them.', icon: '✓' },
  { title: 'Market Intelligence', description: 'Agencies know current CFO day rates, availability, and who has relevant industry experience. They advise on budget and trade-offs.', icon: '📊' },
  { title: 'Compliance Support', description: 'IR35, contract terms, right to work checks - agencies handle the compliance complexity of contractor relationships.', icon: '📋' },
  { title: 'Negotiation Support', description: 'Having an intermediary helps with rate negotiations and setting expectations on scope, days, and deliverables.', icon: '🤝' },
  { title: 'Replacement Guarantee', description: 'Most agencies offer replacement guarantees (typically 3-6 months) if the placement doesn\'t work out.', icon: '🛡️' },
];

// Outer component that provides CopilotKit context
export default function FractionalCFOAgencyPage() {
  return (
    <CopilotProvider>
      <FractionalCFOAgencyPageInner />
    </CopilotProvider>
  );
}

// Inner component with CopilotKit hooks
function FractionalCFOAgencyPageInner() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || null;
  const heroImage = getHeroImageUrl('finance', 1920, 800);
  const imageCredit = getImage('finance');

  const { state, setState } = useCoAgent<{ user?: { id: string; name: string; email: string } }>({ name: "my_agent", initialState: {} });

  useEffect(() => {
    if (user && !state?.user) {
      setState((prev) => ({ ...prev, user: { id: user.id, name: user.name || "", email: user.email || "" } }));
    }
  }, [user?.id, state?.user, setState]);

  const { appendMessage } = useCopilotChat();

  const handleVoiceMessage = useCallback((text: string, role: "user" | "assistant" = "user") => {
    if (user?.id && text.length > 5) {
      fetch('/api/zep-store', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, role, content: text, metadata: { page: 'fractional-cfo-agency' } }) }).catch(() => {});
    }
    appendMessage(new TextMessage({ content: text, role: role === "user" ? Role.User : Role.Assistant }));
  }, [appendMessage, user?.id]);

  const suggestions = [
    { title: "Best CFO agencies", message: "What are the best fractional CFO agencies in the UK?" },
    { title: "Agency fees", message: "How much do fractional CFO agencies charge?" },
    { title: "Direct vs agency", message: "Should I hire a fractional CFO directly or use an agency?" },
  ];

  return (
    <main style={{ "--copilot-kit-primary-color": "#059669" } as CopilotKitCSSProperties}>
      <WebPageSchema title="Fractional CFO Agency UK 2026 - Best Agencies for Fractional Finance Leaders" description="Find the best fractional CFO agencies in the UK. Compare agencies specialising in fractional Chief Financial Officer placements. Understand fees, timelines, and how to choose." url="https://fractional.quest/fractional-cfo-agency" dateModified={new Date('2026-01-20T00:00:00Z')} />
      <FAQPageSchema faqs={faqItems} />

      <CopilotSidebar
        instructions={`## PAGE CONTEXT
Page Type: guide | Topic: Fractional CFO Agency | URL: /fractional-cfo-agency

You're helping someone understand fractional CFO agencies and how to find/hire fractional finance leaders.
Key facts: Agency fees 15-25% of year 1 | 2-4 weeks to hire via agency | Fractional.Quest is a job board not agency`}
        labels={{ title: "CFO Agency Guide", initial: firstName ? `Hi ${firstName}! 👋 I can help you find the right fractional CFO agency.` : `Welcome! This guide covers fractional CFO agencies in the UK.` }}
        suggestions={suggestions}
        clickOutsideToClose={false}
      >
        <div className="min-h-screen bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-emerald-600 to-teal-500 py-24">
            <Image src={heroImage} alt="Fractional CFO Agency - Finance Leadership Placement" fill priority sizes="100vw" className="object-cover" />
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
              <Link href="/fractional-jobs-uk" className="text-emerald-100 hover:text-white mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Back to Fractional Jobs UK</Link>
              <div className="max-w-4xl">
                <span className="inline-block bg-white text-emerald-700 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Guide</span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">Fractional<br /><span className="text-emerald-200">CFO Agency</span></h1>
                <p className="text-2xl md:text-3xl text-emerald-50 leading-relaxed font-light mb-10">Find the best agencies for hiring <strong>fractional CFO</strong> talent. Compare specialists in finance leadership placements across the UK.</p>
                <div className="flex flex-wrap gap-10 mb-12">
                  <div><div className="text-5xl font-black text-white">15-25%</div><div className="text-emerald-100 text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
                  <div><div className="text-5xl font-black text-white">2-4 Weeks</div><div className="text-emerald-100 text-sm uppercase tracking-wider mt-1">To Place</div></div>
                  <div><div className="text-5xl font-black text-white">£850-£1,200</div><div className="text-emerald-100 text-sm uppercase tracking-wider mt-1">CFO Day Rate</div></div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-emerald-700 font-bold uppercase tracking-wider hover:bg-emerald-50 transition-colors inline-flex items-center gap-2"
                  >
                    <span>📅</span> Book a Free Call
                  </a>
                  <VoiceInput onMessage={handleVoiceMessage} firstName={firstName} userId={user?.id} pageContext={{ pageType: 'guide', roleType: 'CFO', pageH1: 'Fractional CFO Agency', pageUrl: '/fractional-cfo-agency' }} />
                  <Link href="#agencies" className="px-8 py-4 bg-emerald-700 text-white font-bold uppercase tracking-wider hover:bg-emerald-800 transition-colors border border-emerald-500">View Top Agencies</Link>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 z-10">
              <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a>
            </div>
          </section>

          {/* COMPANIES CTA PANEL */}
          <section className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-16">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block bg-white/20 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">For Companies</span>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Need to Hire a Fractional CFO?</h2>
                  <p className="text-xl text-white/90 mb-6">Skip the agency fees. Talk directly with Dan Keegan, founder of Fractional Quest, for free hiring advice and access to our vetted network of <strong>fractional CFO</strong> talent.</p>
                  <ul className="space-y-3 text-white/90 mb-8">
                    <li className="flex items-center gap-3"><span className="text-2xl">✓</span> Free 30-minute consultation</li>
                    <li className="flex items-center gap-3"><span className="text-2xl">✓</span> No agency fees - browse CFO candidates directly</li>
                    <li className="flex items-center gap-3"><span className="text-2xl">✓</span> Honest advice on what you actually need</li>
                    <li className="flex items-center gap-3"><span className="text-2xl">✓</span> IR35 and contract guidance included</li>
                  </ul>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-emerald-700 text-lg font-bold py-4 px-8 hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    <span className="text-2xl">📅</span>
                    <span>Book Your Free Call</span>
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">💰</div>
                    <h3 className="text-2xl font-bold text-white mb-2">What Companies Get</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="font-bold text-white mb-1">Free Hiring Strategy Call</div>
                      <div className="text-white/80 text-sm">30 minutes to discuss your finance leadership needs</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="font-bold text-white mb-1">Access to CFO Network</div>
                      <div className="text-white/80 text-sm">Post roles or browse 150+ fractional CFOs</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="font-bold text-white mb-1">Market Rate Intelligence</div>
                      <div className="text-white/80 text-sm">Know CFO day rates before you negotiate</div>
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
                <div><div className="text-4xl font-black text-emerald-700 mb-2">£5k-30k</div><div className="text-gray-600 text-sm">Typical Agency Fees</div></div>
                <div><div className="text-4xl font-black text-emerald-700 mb-2">3-6 Months</div><div className="text-gray-600 text-sm">Guarantee Period</div></div>
                <div><div className="text-4xl font-black text-emerald-700 mb-2">5-10</div><div className="text-gray-600 text-sm">Candidates Presented</div></div>
                <div><div className="text-4xl font-black text-emerald-700 mb-2">85%+</div><div className="text-gray-600 text-sm">Placement Success</div></div>
              </div>
            </div>
          </section>

          {/* What is a Fractional CFO Agency */}
          <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a Fractional CFO Agency?</h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  A <strong>fractional CFO agency</strong> specialises in placing part-time, interim, and fractional Chief Financial Officers with businesses. Unlike traditional finance recruiters who focus primarily on full-time permanent placements, these specialist agencies understand the unique dynamics of the fractional model.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  They know how to assess candidates who work with multiple clients, understand day rate structures and IR35 compliance, and can match finance leaders to companies based on time commitment requirements (1-3 days per week rather than full-time). A good <strong>fractional CFO agency</strong> also understands the difference between PE-backed, VC-backed, and owner-managed business requirements.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The UK fractional CFO market has grown significantly since 2020, driven by the need for investor-grade financial leadership without full-time cost. This has driven the emergence of specialist <strong>fractional CFO agencies</strong> alongside traditional interim and permanent search firms.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you need fundraising support, financial transformation, or board-level finance leadership, working with a <strong>fractional CFO agency</strong> can accelerate your search for the right finance leader.
                </p>
              </div>
              <div className="mt-12 bg-emerald-50 border border-emerald-200 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Not sure what finance leadership you need?</h3>
                  <p className="text-gray-600">Get free advice on whether you need an agency or can hire a fractional CFO directly.</p>
                </div>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-6 py-3 bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
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
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a Fractional CFO Agency?</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white p-8 border-l-4 border-emerald-500 hover:shadow-md transition-shadow">
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
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Hire Your Fractional CFO?</h2>
              <p className="text-xl text-gray-300 mb-8">Most companies don&apos;t need an agency. Let&apos;s discuss your specific finance leadership needs.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white font-bold uppercase tracking-wider hover:bg-emerald-600 transition-colors"
                >
                  <span>📅</span> Book a Free Call
                </a>
                <Link href="/fractional-cfo-jobs-uk" className="px-8 py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors">
                  Browse CFO Candidates
                </Link>
              </div>
            </div>
          </section>

          {/* Top Agencies */}
          <section id="agencies" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Directory</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Top Fractional CFO Agencies UK</h2>
                <p className="text-lg text-gray-600">Specialist agencies and platforms for finding fractional CFO talent in the UK.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topAgencies.map((agency, index) => (
                  <div key={index} className="bg-gray-50 p-8 border-l-4 border-emerald-500 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{agency.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{agency.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                    <div className="mb-3"><div className="text-xs font-bold text-gray-500 uppercase mb-1">Speciality:</div><div className="text-sm text-gray-700">{agency.speciality}</div></div>
                    <div><div className="text-xs font-bold text-gray-500 uppercase mb-1">Model:</div><div className="text-sm text-emerald-700">{agency.model}</div></div>
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
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Direct Hire vs Fractional CFO Agency</h2>
                <p className="text-lg text-gray-600">Compare the trade-offs between hiring directly and using a fractional CFO agency.</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-emerald-600 text-white">
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
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-12 border border-emerald-200 text-center">
                <div className="text-6xl mb-6">📅</div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Schedule Your Free Consultation</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  30 minutes with Dan Keegan, founder of Fractional Quest. Get honest advice on hiring fractional CFO talent - no sales pitch, no commitment.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xl font-bold py-5 px-10 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl mb-8"
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
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Or Skip the Agency - Browse CFO Candidates Directly</h2>
                <p className="text-lg text-gray-600">Fractional.Quest is a job board, not an agency. Browse fractional CFO roles directly, with no placement fees.</p>
              </div>
              <EmbeddedJobBoard
                defaultDepartment="Finance"
                title="Fractional CFO Jobs UK"
                accentColor="emerald"
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
                <Link href="/fractional-cfo-jobs-uk" className="bg-gray-50 p-8 border-l-4 border-emerald-500 hover:shadow-md transition-shadow group">
                  <div className="text-3xl mb-4">💰</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700">Fractional CFO Jobs</h3>
                  <p className="text-gray-600 text-sm">Browse CFO, FD, and finance leadership roles.</p>
                </Link>
                <Link href="/fractional-cfo-services" className="bg-gray-50 p-8 border-l-4 border-teal-500 hover:shadow-md transition-shadow group">
                  <div className="text-3xl mb-4">📊</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600">Fractional CFO Services</h3>
                  <p className="text-gray-600 text-sm">Learn about CFO services and engagement models.</p>
                </Link>
                <Link href="/fractional-cfo-salary" className="bg-gray-50 p-8 border-l-4 border-cyan-500 hover:shadow-md transition-shadow group">
                  <div className="text-3xl mb-4">💵</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600">Fractional CFO Salary</h3>
                  <p className="text-gray-600 text-sm">Day rates and compensation benchmarks.</p>
                </Link>
                <Link href="/hire-fractional-cfo" className="bg-gray-50 p-8 border-l-4 border-green-500 hover:shadow-md transition-shadow group">
                  <div className="text-3xl mb-4">👔</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600">How to Hire a CFO</h3>
                  <p className="text-gray-600 text-sm">Complete guide to hiring fractional CFOs.</p>
                </Link>
              </div>
            </div>
          </section>

          {/* External Resources */}
          <section className="py-16 bg-gray-50 border-t">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">External Resources</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <a href="https://www.icaew.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-700">ICAEW - Institute of Chartered Accountants →</a>
                <a href="https://www.accaglobal.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-700">ACCA - Chartered Certified Accountants →</a>
                <a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-700">HMRC - IR35 Guidance →</a>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Questions</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Frequently Asked Questions About Fractional CFO Agencies</h2>
              </div>
              <FAQ items={faqItems} />
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Hire Your Fractional CFO?</h2>
              <p className="text-xl text-emerald-100 mb-10">Book a free call to discuss your finance leadership needs, or browse our job board directly.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 font-bold uppercase tracking-wider hover:bg-emerald-50 transition-colors"
                >
                  <span>📅</span> Book Your Free Call
                </a>
                <Link href="/fractional-cfo-jobs-uk" className="px-8 py-4 bg-emerald-700 text-white font-bold uppercase tracking-wider hover:bg-emerald-800 transition-colors border border-emerald-500">Browse CFO Jobs</Link>
              </div>
              <p className="text-emerald-200 text-sm mt-8">No fees - No commitment - 30 minute consultation</p>
            </div>
          </section>
        </div>
      </CopilotSidebar>
    </main>
  );
}
