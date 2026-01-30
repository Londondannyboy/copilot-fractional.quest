"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import { useCoAgent, useCopilotChat } from "@copilotkit/react-core";
import { CopilotSidebar, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { CopilotProvider } from "@/components/CopilotProvider";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { authClient } from "@/lib/auth/client";
import { VoiceInput } from "@/components/voice-input";
import { FAQ, FAQItem } from "@/components/seo";
import { WebPageSchema, FAQPageSchema } from "@/components/seo";
import { HireProcessStepper } from "@/components/HireProcessStepper";
import Image from "next/image";
import { getHeroImageUrl, getImage } from '@/lib/images';
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { TableOfContents } from '@/components/TableOfContents'

// Table of Contents items for SEO
const tocItems = [
  { id: 'where-to-find', title: 'Where to Find Fractional CPOs' },
  { id: 'what-to-look-for', title: 'What to Look For' },
  { id: 'interview-questions', title: 'Interview Questions' },
  { id: 'hiring-process', title: 'Hiring Process' },
  { id: 'contract-terms', title: 'Contract Terms' },
  { id: 'cost-comparison', title: 'Cost Comparison' },
  { id: 'browse-candidates', title: 'Browse Candidates' },
  { id: 'faq', title: 'FAQ' },
]

// External authority links for E-E-A-T (CPO-specific)
const authorityLinks = [
  { name: 'Mind the Product', url: 'https://www.mindtheproduct.com', description: 'Product management community' },
  { name: 'Product School', url: 'https://productschool.com', description: 'Product management education' },
  { name: 'Lenny\'s Newsletter', url: 'https://www.lennysnewsletter.com', description: 'Product growth insights' },
  { name: 'Reforge', url: 'https://www.reforge.com', description: 'Growth and product programs' },
  { name: 'SVPG', url: 'https://www.svpg.com', description: 'Silicon Valley Product Group' },
  { name: 'ProductPlan', url: 'https://www.productplan.com', description: 'Product management resources' },
]

const faqItems: FAQItem[] = [
  { question: 'How long does it take to hire a fractional CPO?', answer: 'Typically 2-4 weeks. Product leaders are in high demand, so move quickly on good candidates. Includes defining requirements (1-3 days), sourcing (3-7 days), interviews (1-2 weeks), and onboarding.' },
  { question: 'Where can I find fractional CPOs to hire?', answer: 'Main sources: (1) Product communities (Mind the Product, Product School alumni), (2) LinkedIn with #FractionalCPO or #ProductLeadership, (3) Fractional.Quest and Toptal, (4) VC portfolio networks, (5) Product conference speakers.' },
  { question: 'What should I look for when hiring a fractional CPO?', answer: 'Key criteria: (1) Experience at your company stage (0-1 or scale), (2) PLG or enterprise expertise matching your model, (3) Team building and hiring experience, (4) Technical depth appropriate for your product, (5) Discovery and research methodology.' },
  { question: 'How much does it cost to hire a fractional CPO?', answer: 'Day rates range from £800-£1,400 depending on experience. PLG specialists and AI product leaders command premiums. Most engagements are 2 days per week (£6,400-£11,200/month).' },
  { question: 'Should I hire a fractional CPO or VP of Product?', answer: 'Fractional CPO: strategic leadership, team building, process design. VP Product: full-time execution, day-to-day management. At early stage (< 5 PMs), fractional often makes more sense.' },
];

const sourcingChannels = [
  { channel: 'Product Communities', description: 'Mind the Product, Product School, Lenny\'s Newsletter community, ProductTank.', pros: 'Active practitioners, passion for product', bestFor: 'Finding product-obsessed leaders', icon: '🎯' },
  { channel: 'LinkedIn Search', description: 'Search #FractionalCPO, #ProductLeadership, or "Head of Product" + "Advisor".', pros: 'Large pool, can review portfolios', bestFor: 'Companies with time to source', icon: '💼' },
  { channel: 'Fractional Platforms', description: 'Fractional.Quest, Toptal, or product-specific networks.', pros: 'Pre-vetted, fast matching', bestFor: 'Quick placement', icon: '🚀' },
  { channel: 'VC Networks', description: 'Ask investors for product leaders from their portfolio companies.', pros: 'Trusted recommendations, stage-appropriate', bestFor: 'Funded startups', icon: '🌟' },
  { channel: 'Conference Speakers', description: 'Mind the Product, ProductCon, or industry event speakers.', pros: 'Thought leaders, proven expertise', bestFor: 'High-profile product challenges', icon: '🎤' },
  { channel: 'Product Coach Networks', description: 'Coaches like Marty Cagan\'s network or Reforge instructors.', pros: 'Teaching experience, methodology expertise', bestFor: 'Building product culture', icon: '👥' },
];

const evaluationCriteria = [
  { criteria: '0-1 vs Scale Experience', description: 'Have they built products from scratch or scaled existing ones? A CPO who only knows scale won\'t help you find product-market fit.', lookFor: 'Clear examples of stage-appropriate work, measurable outcomes', redFlag: 'Only worked at one stage, can\'t articulate methodology' },
  { criteria: 'GTM Model Match', description: 'Do they understand your go-to-market? PLG is very different from enterprise sales-led. Ensure their experience matches.', lookFor: 'Deep experience in your model (PLG, sales-led, hybrid), specific metrics', redFlag: 'Only knows one model, dismissive of your approach' },
  { criteria: 'Technical Depth', description: 'Can they earn engineering respect? They don\'t need to code, but must understand technical trade-offs.', lookFor: 'Engineering background, technical discussions, architecture understanding', redFlag: 'Can\'t have technical conversations, engineers don\'t respect them' },
  { criteria: 'Discovery & Research', description: 'Do they have a methodology for understanding users? Continuous discovery, customer interviews, data analysis.', lookFor: 'Clear discovery process, user research examples, data-driven decisions', redFlag: 'Opinion-based product decisions, no user research practice' },
  { criteria: 'Team Building', description: 'Have they hired and developed product managers? Built product orgs from scratch?', lookFor: 'Hired 5-15 PMs, built career frameworks, mentorship examples', redFlag: 'Never managed PMs, only individual contributor' },
  { criteria: 'Fractional Effectiveness', description: 'Can they be impactful in 2 days/week? Clear priorities, async communication, delegation.', lookFor: '2-4 current clients, systems for effectiveness, clear communication', redFlag: 'First fractional role, needs full-time presence' },
];

// Outer component that provides CopilotKit context
export default function HireFractionalCPOClient() {
  return (
    <CopilotProvider>
      <HireFractionalCPOClientInner />
    </CopilotProvider>
  );
}

// Inner component with CopilotKit hooks
function HireFractionalCPOClientInner() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || null;
  const heroImage = getHeroImageUrl('services', 1920, 800);
  const imageCredit = getImage('services');

  const { state, setState } = useCoAgent<{ user?: { id: string; name: string; email: string } }>({ name: "my_agent", initialState: {} });

  useEffect(() => {
    if (user && !state?.user) {
      setState((prev) => ({ ...prev, user: { id: user.id, name: user.name || "", email: user.email || "" } }));
    }
  }, [user?.id, state?.user, setState]);

  const { appendMessage } = useCopilotChat();

  const handleVoiceMessage = useCallback((text: string, role: "user" | "assistant" = "user") => {
    if (user?.id && text.length > 5) {
      fetch('/api/zep-store', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, role, content: text, metadata: { page: 'hire-fractional-cpo' } }) }).catch(() => {});
    }
    appendMessage(new TextMessage({ content: text, role: role === "user" ? Role.User : Role.Assistant }));
  }, [appendMessage, user?.id]);

  const suggestions = [
    { title: "Where to find CPOs", message: "Where can I find fractional CPOs to hire?" },
    { title: "Interview questions", message: "What questions should I ask when interviewing a fractional CPO?" },
    { title: "PLG vs Enterprise", message: "How do I find a CPO with PLG experience?" },
  ];

  return (
    <main style={{ "--copilot-kit-primary-color": "#6366f1" } as CopilotKitCSSProperties}>
      <WebPageSchema title="Hire a Fractional CPO UK 2026" description="How to hire a fractional CPO." url="https://fractional.quest/hire-fractional-cpo" dateModified={new Date('2026-01-07T00:00:00Z')} />
      <FAQPageSchema faqs={faqItems} />

      <CopilotSidebar
        instructions={`## PAGE CONTEXT
Page Type: hiring_guide | Role Type: CPO | URL: /hire-fractional-cpo

You're helping someone learn how to hire a fractional CPO.
Key facts: Day rates £800-£1,400 | 2-4 weeks to hire | PLG specialists premium`}
        labels={{ title: "CPO Hiring Guide", initial: firstName ? `Hi ${firstName}! 👋 I can help you hire a fractional CPO.` : `Welcome! This guide covers hiring a fractional CPO.` }}
        suggestions={suggestions}
        clickOutsideToClose={false}
      >
        <div className="min-h-screen bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center">
            <Image src={heroImage} alt="Hire a Fractional CPO" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-violet-800/80" />
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-24">
              <Link href="/fractional-cpo" className="text-indigo-100 hover:text-white mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Back to Fractional CPO Guide</Link>
              <div className="max-w-4xl">
                <span className="inline-block bg-white text-indigo-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Hiring Guide</span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">Hire a<br /><span className="text-indigo-200">Fractional CPO</span></h1>
                <p className="text-2xl md:text-3xl text-indigo-50 leading-relaxed font-light mb-10">Complete guide to finding, vetting, and hiring the perfect fractional Chief Product Officer.</p>
                <div className="flex flex-wrap gap-10 mb-12">
                  <div><div className="text-5xl font-black text-white">2-4 Weeks</div><div className="text-indigo-100 text-sm uppercase tracking-wider mt-1">To Hire</div></div>
                  <div><div className="text-5xl font-black text-white">90 Days</div><div className="text-indigo-100 text-sm uppercase tracking-wider mt-1">To Impact</div></div>
                  <div><div className="text-5xl font-black text-white">75+</div><div className="text-indigo-100 text-sm uppercase tracking-wider mt-1">Candidates</div></div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <VoiceInput onMessage={handleVoiceMessage} firstName={firstName} userId={user?.id} pageContext={{ pageType: 'hiring_guide', roleType: 'CPO', pageH1: 'Hire a Fractional CPO', pageUrl: '/hire-fractional-cpo' }} />
                  <Link href="/fractional-cpo-jobs-uk" className="px-8 py-4 bg-white text-indigo-600 font-bold uppercase tracking-wider hover:bg-indigo-50 transition-colors">Browse CPO Candidates</Link>
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
                <div><div className="text-4xl font-black text-indigo-600 mb-2">5-8</div><div className="text-gray-600 text-sm">Candidates to Interview</div></div>
                <div><div className="text-4xl font-black text-indigo-600 mb-2">3-6 Months</div><div className="text-gray-600 text-sm">Minimum Engagement</div></div>
                <div><div className="text-4xl font-black text-indigo-600 mb-2">£800-1.4k</div><div className="text-gray-600 text-sm">Day Rate Range</div></div>
                <div><div className="text-4xl font-black text-indigo-600 mb-2">30 Days</div><div className="text-gray-600 text-sm">Standard Notice</div></div>
              </div>
            </div>
          </section>

          {/* Table of Contents */}
          <section className="py-8 bg-white border-b">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <TableOfContents items={tocItems} title="In This Guide" accentColor="indigo" />
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
                  <ul className="space-y-3">
                    {authorityLinks.slice(0, 4).map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-2">
                          <span className="text-indigo-400">→</span> {link.name}
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
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Where to Find Fractional CPOs</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sourcingChannels.map((source, index) => (
                  <div key={index} className="bg-gray-50 p-8 border-l-4 border-indigo-500 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{source.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{source.channel}</h3>
                    <p className="text-gray-600 text-sm mb-4">{source.description}</p>
                    <div className="mb-3"><div className="text-xs font-bold text-gray-500 uppercase mb-1">Pros:</div><div className="text-sm text-gray-700">{source.pros}</div></div>
                    <div><div className="text-xs font-bold text-gray-500 uppercase mb-1">Best For:</div><div className="text-sm text-indigo-600">{source.bestFor}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Evaluation Criteria */}
          <section id="what-to-look-for" className="py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Evaluation</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What to Look For in a Fractional CPO</h2>
                <p className="text-xl text-gray-600 max-w-3xl">Not all experienced product leaders make good fractional CPOs. Here's what separates the best from the rest.</p>
              </div>
              <div className="space-y-8">
                {evaluationCriteria.map((item, index) => (
                  <div key={index} className="bg-white p-10 border-l-4 border-indigo-500 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{index + 1}. {item.criteria}</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg"><div className="text-sm font-bold text-indigo-800 mb-2">✅ Look For</div><p className="text-sm text-gray-700">{item.lookFor}</p></div>
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
                <p className="text-xl text-gray-600 max-w-3xl">These questions separate strategic product leaders from feature factory managers.</p>
              </div>
              <div className="space-y-8">
                <div className="bg-indigo-50 border-2 border-indigo-200 p-10 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Product Strategy Questions</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-700"><strong className="text-gray-900">"Walk me through how you discovered and validated a new product opportunity. What was your process?"</strong><br/><span className="text-sm text-gray-600">Listen for: Discovery methodology, user research, data analysis, hypothesis testing</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you prioritize a roadmap when you have 50 potential features and capacity for 5?"</strong><br/><span className="text-sm text-gray-600">Listen for: Prioritization frameworks (RICE, ICE), stakeholder management, saying no</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"Tell me about a time you killed a feature or product that wasn't working. How did you decide?"</strong><br/><span className="text-sm text-gray-600">Listen for: Data-driven decisions, sunk cost awareness, organizational navigation</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you balance customer requests vs your product vision?"</strong><br/><span className="text-sm text-gray-600">Listen for: Vision vs feedback balance, customer segmentation, strategic thinking</span></li>
                  </ul>
                </div>
                <div className="bg-indigo-50 border-2 border-indigo-200 p-10 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Metrics & Delivery Questions</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-700"><strong className="text-gray-900">"What product metrics do you obsess over? How do you define product success?"</strong><br/><span className="text-sm text-gray-600">Listen for: Leading vs lagging indicators, north star metrics, outcome focus</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you work with engineering to ensure on-time, quality delivery?"</strong><br/><span className="text-sm text-gray-600">Listen for: Agile practices, scope management, technical collaboration</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"Tell me about a product launch that didn't go as planned. What happened and what did you learn?"</strong><br/><span className="text-sm text-gray-600">Listen for: Accountability, learning mindset, course correction</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you run product experiments? Give me a specific example."</strong><br/><span className="text-sm text-gray-600">Listen for: A/B testing, hypothesis formation, statistical rigor</span></li>
                  </ul>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 p-10 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">👥 Team & Leadership Questions</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-700"><strong className="text-gray-900">"How would you structure a product team at our stage? What roles would you hire first?"</strong><br/><span className="text-sm text-gray-600">Listen for: Stage-appropriate team design, PM vs designer vs researcher balance</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you coach a PM who's struggling with stakeholder management?"</strong><br/><span className="text-sm text-gray-600">Listen for: Mentorship approach, feedback frameworks, patience</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you create alignment between product, engineering, and design?"</strong><br/><span className="text-sm text-gray-600">Listen for: Cross-functional collaboration, triad model, shared goals</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you stay effective working 2 days/week vs embedded full-time?"</strong><br/><span className="text-sm text-gray-600">Listen for: Async communication, clear frameworks, delegation and trust</span></li>
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
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">The Fractional CPO Hiring Process</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">From first conversation to start date in 2-4 weeks.</p>
              </div>
              <HireProcessStepper accentColor="indigo" />
              <div className="mt-16 bg-indigo-50 border-2 border-indigo-200 p-10 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Timeline Breakdown</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h4 className="font-bold text-gray-900 mb-2">Week 1: Define & Source</h4><ul className="text-sm text-gray-700 space-y-1"><li>• Define product requirements (Day 1-2)</li><li>• Post on job boards, ask for referrals (Day 2-3)</li><li>• Review candidates, shortlist 5-8 (Day 4-7)</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Week 2-3: Interview & Select</h4><ul className="text-sm text-gray-700 space-y-1"><li>• First-round interviews (45-min calls)</li><li>• Second round: product case study</li><li>• Reference checks (2-3 calls)</li><li>• Make offer and negotiate terms</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Week 4: Onboard & Start</h4><ul className="text-sm text-gray-700 space-y-1"><li>• Contract signing and admin setup</li><li>• Share product context, analytics, roadmap</li><li>• First week: stakeholder interviews</li><li>• Begin product audit and discovery</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">First 90 Days: Deliver</h4><ul className="text-sm text-gray-700 space-y-1"><li>• Month 1: Product audit, quick wins</li><li>• Month 2: Strategy, roadmap, process design</li><li>• Month 3: Scale, hire PMs, measure results</li><li>• Decide to extend or part ways</li></ul></div>
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
                <p className="text-xl text-gray-600 max-w-3xl">Standard terms for fractional CPO engagements.</p>
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 p-10 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mt-0 mb-6">Standard Contract Template</h3>
                <div className="space-y-6">
                  <div><h4 className="font-bold text-gray-900 mb-2">Engagement Model</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Day rate:</strong> £800-£1,400 per day (based on experience)</li><li><strong>Commitment:</strong> 1-3 days per week (specify exact days)</li><li><strong>Monthly retainer option:</strong> £3,500-£6,000 for predictable billing</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Term & Notice</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Initial term:</strong> 3-month trial period</li><li><strong>Renewal:</strong> Auto-renew to 12-month rolling contract after trial</li><li><strong>Notice period:</strong> 30 days either side (standard)</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Scope of Work</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Responsibilities:</strong> Product strategy, roadmap ownership, team leadership, discovery process</li><li><strong>Deliverables:</strong> Product strategy doc, quarterly roadmap, OKRs, weekly updates</li><li><strong>Exclusions:</strong> Hands-on PM work (unless scoped), attending all standups</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">IP & Confidentiality</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>IP ownership:</strong> Company owns all product documentation and strategies</li><li><strong>Confidentiality:</strong> Standard NDA terms, survives termination</li><li><strong>Non-compete:</strong> Usually not applicable (fractional works with multiple companies)</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Optional: Equity</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Advisory shares:</strong> 0.15-0.35% for long-term engagements (12+ months)</li><li><strong>Vesting:</strong> Quarterly or annual vesting</li><li><strong>Cash reduction:</strong> If equity included, day rate may reduce 10-15%</li></ul></div>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Comparison */}
          <section id="cost-comparison" className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Investment</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Cost Comparison: Fractional vs Full-Time vs Consultancy</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Understand the total cost of each CPO hiring option for your business.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
                  <thead>
                    <tr className="bg-indigo-600 text-white">
                      <th className="px-6 py-4 text-left font-bold">Cost Factor</th>
                      <th className="px-6 py-4 text-center font-bold">Fractional CPO</th>
                      <th className="px-6 py-4 text-center font-bold">Full-Time CPO</th>
                      <th className="px-6 py-4 text-center font-bold">Product Consultancy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Annual Cost</td>
                      <td className="px-6 py-4 text-center text-indigo-700 font-bold">£80k - £145k</td>
                      <td className="px-6 py-4 text-center text-gray-600">£180k - £320k</td>
                      <td className="px-6 py-4 text-center text-gray-600">£150k - £450k</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Days per Week</td>
                      <td className="px-6 py-4 text-center text-indigo-700">2-3 days</td>
                      <td className="px-6 py-4 text-center text-gray-600">5 days</td>
                      <td className="px-6 py-4 text-center text-gray-600">Project-based</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Notice Period</td>
                      <td className="px-6 py-4 text-center text-indigo-700">30 days</td>
                      <td className="px-6 py-4 text-center text-gray-600">3-6 months</td>
                      <td className="px-6 py-4 text-center text-gray-600">Contract end</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Employer NI/Benefits</td>
                      <td className="px-6 py-4 text-center text-green-600">None</td>
                      <td className="px-6 py-4 text-center text-red-600">£35k - £55k</td>
                      <td className="px-6 py-4 text-center text-green-600">None</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Equity Required</td>
                      <td className="px-6 py-4 text-center text-green-600">Optional (0.15-0.35%)</td>
                      <td className="px-6 py-4 text-center text-red-600">0.5-2%</td>
                      <td className="px-6 py-4 text-center text-green-600">None</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Time to Hire</td>
                      <td className="px-6 py-4 text-center text-indigo-700">2-4 weeks</td>
                      <td className="px-6 py-4 text-center text-gray-600">3-6 months</td>
                      <td className="px-6 py-4 text-center text-gray-600">2-4 weeks</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Cross-Industry Experience</td>
                      <td className="px-6 py-4 text-center text-green-600">High (multiple clients)</td>
                      <td className="px-6 py-4 text-center text-gray-600">Limited</td>
                      <td className="px-6 py-4 text-center text-green-600">High</td>
                    </tr>
                    <tr className="bg-indigo-100">
                      <td className="px-6 py-4 font-bold text-gray-900">Best For</td>
                      <td className="px-6 py-4 text-center text-indigo-700 font-medium">Scale-ups building product orgs</td>
                      <td className="px-6 py-4 text-center text-gray-600 font-medium">Large orgs with complex products</td>
                      <td className="px-6 py-4 text-center text-gray-600 font-medium">One-off strategy projects</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-600">Sources: <a href="https://www.glassdoor.co.uk" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">Glassdoor UK</a>, <a href="https://www.mindtheproduct.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">Mind the Product</a>, Market research</p>
              </div>
            </div>
          </section>

          {/* Browse CPO Candidates */}
          <section id="browse-candidates" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Find Talent</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse CPO Candidates</h2>
                <p className="text-xl text-gray-500">Connect with experienced fractional CPOs seeking new opportunities</p>
              </div>
              <EmbeddedJobBoard
                defaultDepartment="Product"
                title="Available CPO Talent"
                accentColor="indigo"
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
          <section className="py-20 bg-indigo-600 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Hire?</h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">Browse 75+ pre-vetted fractional CPO candidates on Fractional.Quest. Post your role and start interviews this week.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/fractional-cpo-jobs-uk" className="px-10 py-5 bg-white text-indigo-600 font-bold uppercase tracking-wider hover:bg-indigo-50 transition-colors">Browse CPO Candidates</Link>
                <Link href="/contact" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-indigo-600 transition-colors">Post Your Role</Link>
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
                {/* CPO Resources */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">CPO Resources</h3>
                  <ul className="space-y-2">
                    <li><Link href="/fractional-cpo" className="text-gray-600 hover:text-indigo-600 transition-colors">What is a Fractional CPO?</Link></li>
                    <li><Link href="/fractional-cpo-salary" className="text-gray-600 hover:text-indigo-600 transition-colors">CPO Salary & Day Rates</Link></li>
                    <li><Link href="/fractional-cpo-services" className="text-gray-600 hover:text-indigo-600 transition-colors">CPO Services</Link></li>
                    <li><Link href="/fractional-cpo-jobs-uk" className="text-gray-600 hover:text-indigo-600 transition-colors">CPO Jobs UK</Link></li>
                    <li><Link href="/interim-cpo-jobs-uk" className="text-gray-600 hover:text-indigo-600 transition-colors">Interim CPO Jobs</Link></li>
                  </ul>
                </div>
                {/* Other C-Suite Hiring */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Hire Other C-Suite</h3>
                  <ul className="space-y-2">
                    <li><Link href="/hire-fractional-cfo" className="text-gray-600 hover:text-indigo-600 transition-colors">Hire a Fractional CFO</Link></li>
                    <li><Link href="/hire-fractional-cto" className="text-gray-600 hover:text-indigo-600 transition-colors">Hire a Fractional CTO</Link></li>
                    <li><Link href="/hire-fractional-cmo" className="text-gray-600 hover:text-indigo-600 transition-colors">Hire a Fractional CMO</Link></li>
                    <li><Link href="/hire-fractional-coo" className="text-gray-600 hover:text-indigo-600 transition-colors">Hire a Fractional COO</Link></li>
                    <li><Link href="/hire-fractional-chro" className="text-gray-600 hover:text-indigo-600 transition-colors">Hire a Fractional CHRO</Link></li>
                  </ul>
                </div>
                {/* External Resources */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
                  <ul className="space-y-2">
                    {authorityLinks.map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-1">
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
      </CopilotSidebar>
    </main>
  );
}
