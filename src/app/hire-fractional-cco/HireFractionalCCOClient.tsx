"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCoAgent, useCopilotChat } from "@copilotkit/react-core";
import { CopilotSidebar, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { CopilotProvider } from "@/components/CopilotProvider";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { authClient } from "@/lib/auth/client";
import { VoiceInput } from "@/components/voice-input";
import { FAQ, FAQItem } from "@/components/seo";
import { WebPageSchema, FAQPageSchema } from "@/components/seo";
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { HireProcessStepper } from "@/components/HireProcessStepper";
import { getHeroImageUrl, getImage } from '@/lib/images';

const faqItems: FAQItem[] = [
  { question: 'How long does it take to hire a fractional CCO?', answer: 'Typically 2-4 weeks from first conversations to start date. This includes: defining requirements (1-3 days), sourcing candidates (3-7 days), interviews (1-2 weeks), and onboarding (1 week). Much faster than the 3-6 months required for full-time CCO recruitment.' },
  { question: 'Where can I find fractional CCOs to hire?', answer: 'Five main sources: (1) Fractional executive job boards like Fractional.Quest with pre-vetted candidates, (2) LinkedIn using hashtags like #FractionalCCO or #CustomerSuccess, (3) Customer success communities (Gain Grow Retain, CS communities), (4) Referrals from SaaS founders or CS leaders, (5) Fractional executive networks and agencies.' },
  { question: 'What should I look for when hiring a fractional CCO?', answer: 'Five key criteria: (1) Proven track record of improving NRR and reducing churn, (2) Experience building and scaling customer success teams, (3) Strong understanding of customer health scoring and CS platforms (Gainsight, ChurnZero, etc.), (4) Experience at similar company stages (seed, Series A, etc.), (5) Cultural fit and ability to work fractionally.' },
  { question: 'How much does it cost to hire a fractional CCO?', answer: 'Day rates range from £800-£1,200 depending on experience. Most engagements are 1-2 days per week (£3,200-£4,800/month retainer) or 2-3 days per week (£76,000-£115,000 annually). This is 40-60% cheaper than full-time CCOs who cost £150,000-£250,000+ with benefits and equity.' },
  { question: 'What contract terms should I use?', answer: 'Start with a 3-month trial period with 30 days notice either side. After the trial, extend to 12-month rolling contracts. Key terms: day rate or monthly retainer, expected days per week, notice period (30 days standard), IP ownership (company owns all work), confidentiality, and scope of responsibilities.' },
  { question: 'Can I convert a fractional CCO to full-time later?', answer: 'Yes, many companies do this as they scale. Common transition points: hitting £3M-£5M ARR, when CS team grows beyond 10 people, or when NRR becomes critical for fundraising. Discuss this upfront—most fractional CCOs are open to conversion if the timing makes sense.' },
];

const sourcingChannels = [
  { channel: 'Fractional Job Boards', description: 'Platforms like Fractional.Quest with pre-vetted fractional executives actively looking for engagements.', pros: 'Pre-screened candidates, fast matching, transparent rates', bestFor: 'Companies wanting quality candidates quickly', icon: '🎯' },
  { channel: 'LinkedIn Search', description: 'Search for CCOs using hashtags #FractionalCCO, #CustomerSuccess, or "Chief Customer Officer" in titles.', pros: 'Large pool, direct outreach, can research background', bestFor: 'Companies with time to source and screen', icon: '💼' },
  { channel: 'CS Communities', description: 'Customer success communities like Gain Grow Retain, CS Leadership Slack, or industry events.', pros: 'Active practitioners, proven CS expertise', bestFor: 'Finding specialists in customer success', icon: '👥' },
  { channel: 'SaaS Founder Networks', description: "Ask other SaaS founders, investors, or advisors who they've used for customer leadership.", pros: 'Trusted recommendations, proven track records', bestFor: 'SaaS companies with strong founder networks', icon: '🌟' },
  { channel: 'Fractional Executive Networks', description: 'Agencies and networks that match companies with fractional customer leaders.', pros: 'Curated matches, support through process, quality guarantee', bestFor: 'Companies wanting managed recruitment', icon: '🤝' },
  { channel: 'SaaS Conferences', description: 'Attend SaaStr, Pulse, or customer success conferences and events.', pros: 'Meet in person, assess cultural fit, network effect', bestFor: 'Companies attending conferences anyway', icon: '🎤' },
];

const evaluationCriteria = [
  { criteria: 'NRR & Retention Track Record', description: "Have they demonstrably improved net revenue retention? Look for specific numbers - e.g., 'Improved NRR from 95% to 115%' or 'Reduced churn by 40%'. Generic claims without metrics are a red flag.", lookFor: 'Specific NRR improvements, churn reduction percentages, expansion revenue growth', redFlag: "Vague claims like 'improved retention' without numbers" },
  { criteria: 'Company Stage Experience', description: "Have they scaled CS at your stage? A CCO from an enterprise company won't know how to build CS from scratch at a startup. Look for experience at companies 1-2 stages ahead of you.", lookFor: 'Built CS teams from scratch, scaled from 5 to 30+ CSMs, experience at Series A/B companies', redFlag: 'Only worked at large enterprises or never scaled a CS function' },
  { criteria: 'Customer Health Scoring', description: 'Can they implement predictive customer health scoring? Great fractional CCOs understand how to identify at-risk customers early using product usage, engagement, and satisfaction data.', lookFor: 'Experience with health scoring frameworks, Gainsight/ChurnZero expertise, data-driven approach', redFlag: "Relies only on gut feel or hasn't used modern CS platforms" },
  { criteria: 'Team Building & Coaching', description: 'Have they built and led customer success teams? A fractional CCO needs to hire, mentor, and develop CSMs. They should have hired at least 10-20 CS professionals and managed teams of 5-15 people.', lookFor: 'Built CS teams from scratch, hiring process expertise, coaching methodology, career pathing experience', redFlag: 'Never managed people or prefers individual contributor work' },
  { criteria: 'Cross-Functional Alignment', description: 'Can they work across product, sales, and support? Great CCOs understand the customer journey end-to-end and can align teams around customer outcomes. They should speak both product and commercial language.', lookFor: 'Experience working with product teams, voice of customer programs, sales handoff optimization', redFlag: 'Siloed thinking, only focuses on post-sales' },
  { criteria: 'Fractional Working Model Fit', description: 'Do they know how to work fractionally? This requires discipline, clear communication, and asynchronous collaboration. Ask how they manage multiple clients, stay organized, and make impact in 2 days/week.', lookFor: 'Works with 2-4 companies currently, systems for time management, clear communication cadence', redFlag: 'First fractional engagement or working with 6+ companies (spread too thin)' },
];

// Outer component that provides CopilotKit context
export default function HireFractionalCCOClient() {
  return (
    <CopilotProvider>
      <HireFractionalCCOClientInner />
    </CopilotProvider>
  );
}

// Inner component with CopilotKit hooks
function HireFractionalCCOClientInner() {
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
      fetch('/api/zep-store', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, role, content: text, metadata: { page: 'hire-fractional-cco', hiringGuide: true } }) }).catch(() => {});
    }
    appendMessage(new TextMessage({ content: text, role: role === "user" ? Role.User : Role.Assistant }));
  }, [appendMessage, user?.id]);

  const heroImage = getHeroImageUrl('services', 1920, 800)
  const imageCredit = getImage('services')

  const suggestions = [
    { title: "Where to find CCOs", message: "Where can I find fractional CCOs to hire?" },
    { title: "Interview questions", message: "What questions should I ask when interviewing a fractional CCO?" },
    { title: "Pricing & costs", message: "How much does a fractional CCO cost?" },
  ];

  return (
    <main style={{ "--copilot-kit-primary-color": "#0d9488" } as CopilotKitCSSProperties}>
      <WebPageSchema title="Hire a Fractional CCO | UK Guide 2026" description="How to hire a fractional CCO in the UK. Where to find them, interview questions, day rates, and contract terms." url="https://fractional.quest/hire-fractional-cco" dateModified={new Date('2026-01-26T00:00:00Z')} />
      <FAQPageSchema faqs={faqItems} />

      <CopilotSidebar
        instructions={`## PAGE CONTEXT
Page Type: hiring_guide
Page URL: /hire-fractional-cco
Role Type: CCO

You're helping someone learn how to hire a fractional CCO (Chief Customer Officer).
Key facts: Day rates £800-£1,200, 2-4 weeks to hire, 3 month trial, 30 days notice.
CCOs focus on customer success, retention, NRR, and customer experience.
When asked what page you're on, say "Fractional CCO Hiring Guide"`}
        labels={{
          title: "CCO Hiring Guide",
          initial: firstName ? `Hi ${firstName}! I can help you hire a fractional CCO. Ask about sourcing, interview questions, or costs.` : `Welcome! This guide covers everything about hiring a fractional CCO.`,
        }}
        suggestions={suggestions}
        clickOutsideToClose={false}
      >
        <div className="min-h-screen bg-white">
          {/* Hero */}
          <section className="relative py-24 overflow-hidden">
            <Image src={heroImage} alt="Fractional CCO services" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/90 to-cyan-600/90" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
              <Link href="/fractional-cco" className="text-teal-100 hover:text-white mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Back to Fractional CCO Guide</Link>
              <div className="max-w-4xl">
                <span className="inline-block bg-white text-teal-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Hiring Guide</span>
                <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">Hire a<br /><span className="text-teal-200">Fractional CCO</span></h1>
                <p className="text-2xl md:text-3xl text-teal-50 leading-relaxed font-light mb-10">Complete guide to finding, vetting, and hiring the perfect fractional Chief Customer Officer for your business.</p>
                <div className="flex flex-wrap gap-10 mb-12">
                  <div><div className="text-5xl font-black text-white">2-4 Weeks</div><div className="text-teal-100 text-sm uppercase tracking-wider mt-1">To Hire</div></div>
                  <div><div className="text-5xl font-black text-white">90 Days</div><div className="text-teal-100 text-sm uppercase tracking-wider mt-1">To Impact</div></div>
                  <div><div className="text-5xl font-black text-white">50+</div><div className="text-teal-100 text-sm uppercase tracking-wider mt-1">Candidates</div></div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <VoiceInput onMessage={handleVoiceMessage} firstName={firstName} userId={user?.id} pageContext={{ pageType: 'hiring_guide', roleType: 'CCO', pageH1: 'Hire a Fractional CCO', pageUrl: '/hire-fractional-cco', pageDescription: 'Complete guide to hiring a fractional CCO' }} />
                  <Link href="/fractional-cco-jobs-uk" className="px-8 py-4 bg-white text-teal-600 font-bold uppercase tracking-wider hover:bg-teal-50 transition-colors">Browse CCO Candidates</Link>
                  <Link href="#process" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-teal-600 transition-colors">See Hiring Process</Link>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 z-10">
                <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70 transition-colors">
                  Photo: {imageCredit.credit}
                </a>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="bg-gray-50 border-b">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div><div className="text-4xl font-black text-teal-600 mb-2">5-10</div><div className="text-gray-600 text-sm">Candidates to Interview</div></div>
                <div><div className="text-4xl font-black text-teal-600 mb-2">3-6 Months</div><div className="text-gray-600 text-sm">Minimum Engagement</div></div>
                <div><div className="text-4xl font-black text-teal-600 mb-2">£800-1.2k</div><div className="text-gray-600 text-sm">Day Rate Range</div></div>
                <div><div className="text-4xl font-black text-teal-600 mb-2">30 Days</div><div className="text-gray-600 text-sm">Standard Notice</div></div>
              </div>
            </div>
          </section>

          {/* Where to Find */}
          <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Sourcing</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Where to Find Fractional CCOs</h2>
                <p className="text-xl text-gray-600">Six proven channels for finding pre-vetted, experienced fractional customer leaders.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sourcingChannels.map((source, i) => (
                  <div key={i} className="bg-gray-50 p-8 border-l-4 border-teal-500 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{source.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{source.channel}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{source.description}</p>
                    <div className="mb-3"><div className="text-xs font-bold text-gray-500 uppercase mb-1">Pros:</div><div className="text-sm text-gray-700">{source.pros}</div></div>
                    <div><div className="text-xs font-bold text-gray-500 uppercase mb-1">Best For:</div><div className="text-sm text-teal-600">{source.bestFor}</div></div>
                  </div>
                ))}
              </div>
              <div className="mt-12 bg-teal-50 border-2 border-teal-200 p-8 rounded-lg">
                <p className="text-lg text-gray-900"><strong>Pro Tip:</strong> The best fractional CCOs often come from SaaS companies with strong NRR track records. Ask about specific retention metrics and churn reduction results during interviews.</p>
              </div>
            </div>
          </section>

          {/* What to Look For */}
          <section className="py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Evaluation Criteria</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What to Look For in a Fractional CCO</h2>
                <p className="text-xl text-gray-600 max-w-3xl">Not all experienced customer success leaders make good fractional CCOs. Here's what separates the best from the rest.</p>
              </div>
              <div className="space-y-8">
                {evaluationCriteria.map((item, i) => (
                  <div key={i} className="bg-white p-10 border-l-4 border-teal-500 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{i + 1}. {item.criteria}</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg"><div className="text-sm font-bold text-teal-800 mb-2 flex items-center gap-2"><span className="text-lg">✅</span> Look For</div><p className="text-sm text-gray-700">{item.lookFor}</p></div>
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg"><div className="text-sm font-bold text-red-800 mb-2 flex items-center gap-2"><span className="text-lg">🚩</span> Red Flag</div><p className="text-sm text-gray-700">{item.redFlag}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Hiring Process */}
          <section id="process" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-12 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Process</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">The Fractional CCO Hiring Process</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">From first conversation to start date in 2-4 weeks.</p>
              </div>
              <HireProcessStepper accentColor="teal" />
            </div>
          </section>

          {/* Browse CCO Candidates */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Find Talent</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse CCO Candidates</h2>
                <p className="text-xl text-gray-500">Connect with experienced fractional CCOs seeking new opportunities</p>
              </div>
              <EmbeddedJobBoard defaultDepartment="Customer Success" title="Available CCO Talent" accentColor="teal" jobsPerPage={6} />
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-black text-gray-900 mb-8">Frequently Asked Questions</h2>
              <FAQ items={faqItems} title="" skipSchema={true} />
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-teal-600 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Hire?</h2>
              <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">Browse pre-vetted fractional CCO candidates. Post your role and start interviews this week.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/fractional-cco-jobs-uk" className="px-10 py-5 bg-white text-teal-600 font-bold uppercase tracking-wider hover:bg-teal-50 transition-colors">Browse CCO Candidates</Link>
                <Link href="/contact" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-teal-600 transition-colors">Post Your Role</Link>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="py-12 bg-white border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Related Resources</span>
                <div className="flex flex-wrap gap-4">
                  <Link href="/fractional-cco" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Fractional CCO Guide</Link>
                  <Link href="/fractional-cco-salary" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">CCO Salary Data</Link>
                  <Link href="/fractional-cco-services" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">CCO Services</Link>
                  <Link href="/fractional-cco-jobs-uk" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">CCO Jobs UK</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </CopilotSidebar>
    </main>
  );
}
