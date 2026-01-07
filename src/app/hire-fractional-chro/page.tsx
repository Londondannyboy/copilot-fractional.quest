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

export default function HireFractionalCHROPage() {
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
      fetch('/api/zep-store', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, role, content: text, metadata: { page: 'hire-fractional-chro' } }) }).catch(() => {});
    }
    appendMessage(new TextMessage({ content: text, role: role === "user" ? Role.User : Role.Assistant }));
  }, [appendMessage, user?.id]);

  const suggestions = [
    { title: "Where to find CHROs", message: "Where can I find fractional CHROs to hire?" },
    { title: "Interview questions", message: "What questions should I ask when interviewing a fractional CHRO?" },
    { title: "Pricing & costs", message: "How much does a fractional CHRO cost?" },
  ];

  return (
    <main style={{ "--copilot-kit-primary-color": "#9333ea" } as CopilotKitCSSProperties}>
      <WebPageSchema title="Hire a Fractional CHRO UK 2025" description="How to hire a fractional CHRO." url="https://fractional.quest/hire-fractional-chro" dateModified={new Date('2025-01-07T00:00:00Z')} />
      <FAQPageSchema faqs={faqItems} />

      <CopilotSidebar
        instructions={`## PAGE CONTEXT
Page Type: hiring_guide | Role Type: CHRO | URL: /hire-fractional-chro

You're helping someone learn how to hire a fractional CHRO.
Key facts: Day rates £600-£1,100 | 2-4 weeks to hire | 3-month trial standard`}
        labels={{ title: "CHRO Hiring Guide", initial: firstName ? `Hi ${firstName}! 👋 I can help you hire a fractional CHRO.` : `Welcome! This guide covers hiring a fractional CHRO.` }}
        suggestions={suggestions}
        clickOutsideToClose={false}
      >
        <div className="min-h-screen bg-white">
          {/* Hero */}
          <section className="bg-gradient-to-br from-purple-600 to-purple-500 py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
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
                  <VoiceInput onMessage={handleVoiceMessage} firstName={firstName} userId={user?.id} pageContext={{ pageType: 'hiring_guide', roleType: 'CHRO', pageH1: 'Hire a Fractional CHRO', pageUrl: '/hire-fractional-chro' }} />
                  <Link href="/fractional-chro-jobs-uk" className="px-8 py-4 bg-white text-purple-600 font-bold uppercase tracking-wider hover:bg-purple-50 transition-colors">Browse CHRO Candidates</Link>
                </div>
              </div>
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

          {/* Where to Find */}
          <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Sourcing</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Where to Find Fractional CHROs</h2>
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
          <section className="py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Evaluation</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What to Look For</h2>
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

          {/* Process */}
          <section id="process" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">The Hiring Process</h2>
              </div>
              <HireProcessStepper accentColor="purple" />
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
          <section className="py-20 bg-purple-600 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Hire?</h2>
              <p className="text-xl text-purple-100 mb-10">Browse pre-vetted fractional CHRO candidates on Fractional.Quest.</p>
              <Link href="/fractional-chro-jobs-uk" className="px-10 py-5 bg-white text-purple-600 font-bold uppercase tracking-wider hover:bg-purple-50 transition-colors inline-block">Browse CHRO Candidates</Link>
            </div>
          </section>
        </div>
      </CopilotSidebar>
    </main>
  );
}
