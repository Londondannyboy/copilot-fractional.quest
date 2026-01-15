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
import Image from "next/image";
import { getHeroImageUrl, getImage } from '@/lib/images';

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
      fetch('/api/zep-store', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, role, content: text, metadata: { page: 'hire-fractional-ceo' } }) }).catch(() => {});
    }
    appendMessage(new TextMessage({ content: text, role: role === "user" ? Role.User : Role.Assistant }));
  }, [appendMessage, user?.id]);

  const suggestions = [
    { title: "Where to find CEOs", message: "Where can I find fractional CEOs to hire?" },
    { title: "Interview questions", message: "What questions should I ask when interviewing a fractional CEO?" },
    { title: "Pricing & costs", message: "How much does a fractional CEO cost?" },
  ];

  return (
    <main style={{ "--copilot-kit-primary-color": "#ca8a04" } as CopilotKitCSSProperties}>
      <WebPageSchema title="Hire a Fractional CEO UK 2025" description="How to hire a fractional CEO." url="https://fractional.quest/hire-fractional-ceo" dateModified={new Date('2025-01-07T00:00:00Z')} />
      <FAQPageSchema faqs={faqItems} />

      <CopilotSidebar
        instructions={`## PAGE CONTEXT
Page Type: hiring_guide | Role Type: CEO | URL: /hire-fractional-ceo

You're helping someone learn how to hire a fractional CEO.
Key facts: Day rates £1,000-£2,000 | 3-6 weeks to hire | Often includes equity`}
        labels={{ title: "CEO Hiring Guide", initial: firstName ? `Hi ${firstName}! 👋 I can help you hire a fractional CEO.` : `Welcome! This guide covers hiring a fractional CEO.` }}
        suggestions={suggestions}
        clickOutsideToClose={false}
      >
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
                  <VoiceInput onMessage={handleVoiceMessage} firstName={firstName} userId={user?.id} pageContext={{ pageType: 'hiring_guide', roleType: 'CEO', pageH1: 'Hire a Fractional CEO', pageUrl: '/hire-fractional-ceo' }} />
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

          {/* Where to Find */}
          <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Sourcing</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Where to Find Fractional CEOs</h2>
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
          <section className="py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Evaluation</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What to Look For</h2>
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

          {/* Process */}
          <section id="process" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">The Hiring Process</h2>
              </div>
              <HireProcessStepper accentColor="yellow" />
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
          <section className="py-20 bg-yellow-600 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Hire?</h2>
              <p className="text-xl text-yellow-100 mb-10">Browse pre-vetted fractional CEO candidates on Fractional.Quest.</p>
              <Link href="/fractional-ceo-jobs-uk" className="px-10 py-5 bg-white text-yellow-600 font-bold uppercase tracking-wider hover:bg-yellow-50 transition-colors inline-block">Browse CEO Candidates</Link>
            </div>
          </section>
        </div>
      </CopilotSidebar>
    </main>
  );
}
