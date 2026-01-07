"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import { useCoAgent, useCopilotChat } from "@copilotkit/react-core";
import { CopilotSidebar, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { authClient } from "@/lib/auth/client";
import { VoiceInput } from "@/components/voice-input";
import { FAQ, FAQItem } from "@/components/seo";
import { WebPageSchema, FAQPageSchema } from "@/components/seo";
import { HireProcessStepper } from "@/components/HireProcessStepper";

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

export default function HireFractionalCPOPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || null;

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
      <WebPageSchema title="Hire a Fractional CPO UK 2025" description="How to hire a fractional CPO." url="https://fractional.quest/hire-fractional-cpo" dateModified={new Date('2025-01-07T00:00:00Z')} />
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
          <section className="bg-gradient-to-br from-indigo-600 to-violet-500 py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
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

          {/* Where to Find */}
          <section className="py-24 bg-white">
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
          <section className="py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Evaluation</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What to Look For</h2>
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

          {/* Process */}
          <section id="process" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">The Hiring Process</h2>
              </div>
              <HireProcessStepper accentColor="indigo" />
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-black text-gray-900 mb-8">Frequently Asked Questions</h2>
              <FAQ items={faqItems} title="" skipSchema={true} />
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-indigo-600 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Hire?</h2>
              <p className="text-xl text-indigo-100 mb-10">Browse pre-vetted fractional CPO candidates on Fractional.Quest.</p>
              <Link href="/fractional-cpo-jobs-uk" className="px-10 py-5 bg-white text-indigo-600 font-bold uppercase tracking-wider hover:bg-indigo-50 transition-colors inline-block">Browse CPO Candidates</Link>
            </div>
          </section>
        </div>
      </CopilotSidebar>
    </main>
  );
}
