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
  { question: 'How long does it take to hire a fractional CISO?', answer: 'Typically 2-4 weeks. Security clearance checks may add time for regulated industries. Includes defining requirements (1-3 days), sourcing (3-7 days), interviews and vetting (1-2 weeks), and onboarding.' },
  { question: 'Where can I find fractional CISOs to hire?', answer: 'Main sources: (1) Security-focused fractional networks, (2) ISACA/ISC2 member networks, (3) LinkedIn with #FractionalCISO or #vCISO, (4) Security consultancies offering vCISO services, (5) VC portfolio security advisors.' },
  { question: 'What should I look for when hiring a fractional CISO?', answer: 'Key criteria: (1) Compliance certifications (CISSP, CISM), (2) Experience with your compliance needs (SOC 2, ISO 27001), (3) Industry experience (FinTech, healthcare), (4) Incident response track record, (5) Cloud security expertise.' },
  { question: 'How much does it cost to hire a fractional CISO?', answer: 'Day rates range from £900-£1,500 depending on certifications and industry. FCA-regulated experience commands premiums. Most engagements are 1-2 days per week (£3,600-£6,000/month).' },
  { question: 'What\'s the difference between fractional CISO and vCISO?', answer: 'Often used interchangeably. vCISO (virtual CISO) typically implies remote-first, while fractional CISO may include on-site presence. Both provide part-time security leadership without full-time cost.' },
];

const sourcingChannels = [
  { channel: 'Security Networks', description: 'ISACA chapters, ISC2 communities, CISO networks like Evanta or Venture in Security.', pros: 'Certified professionals, security-focused', bestFor: 'Finding certified security leaders', icon: '🔒' },
  { channel: 'vCISO Firms', description: 'Consultancies offering vCISO services (Coalfire, Secureworks, boutique security firms).', pros: 'Managed service, backup coverage', bestFor: 'Companies wanting managed security leadership', icon: '🏢' },
  { channel: 'LinkedIn Search', description: 'Search #FractionalCISO, #vCISO, or "Security Advisor" + certifications.', pros: 'Direct outreach, can verify certifications', bestFor: 'Companies with time to vet', icon: '💼' },
  { channel: 'Fractional Platforms', description: 'Fractional.Quest, CISO Global, or security-specific fractional networks.', pros: 'Pre-vetted security expertise', bestFor: 'Quick, quality placement', icon: '🎯' },
  { channel: 'VC Security Advisors', description: 'Ask your investors for security advisors from their portfolio.', pros: 'Startup experience, trusted recommendations', bestFor: 'Funded startups', icon: '🌟' },
  { channel: 'Security Conferences', description: 'RSA, Black Hat, BSides, or InfoSec Europe attendees and speakers.', pros: 'Current on threats, thought leaders', bestFor: 'Finding cutting-edge expertise', icon: '🎤' },
];

const evaluationCriteria = [
  { criteria: 'Relevant Certifications', description: 'Do they have the right certifications? CISSP, CISM, CISA are baseline. Industry-specific certs (HITRUST for healthcare, PCI DSS for payments) may be required.', lookFor: 'CISSP/CISM certified, relevant industry certifications, maintained credentials', redFlag: 'No certifications, expired credentials, only vendor-specific certs' },
  { criteria: 'Compliance Experience', description: 'Have they achieved the compliance frameworks you need? SOC 2, ISO 27001, GDPR, PCI DSS require specific experience.', lookFor: 'Led successful certifications, audit experience, compliance program design', redFlag: 'Only maintained compliance, never achieved certification from scratch' },
  { criteria: 'Industry Match', description: 'Do they understand your industry\'s specific security requirements? FinTech, healthcare, and B2B SaaS have different needs.', lookFor: 'Direct industry experience, understands regulatory landscape, relevant case studies', redFlag: 'No experience in your industry, dismissive of industry-specific requirements' },
  { criteria: 'Incident Response', description: 'Have they handled real security incidents? Breach response experience is invaluable and rare.', lookFor: 'Real incident experience, IR plan development, crisis management skills', redFlag: 'Only theoretical knowledge, no actual incident experience' },
  { criteria: 'Cloud Security', description: 'Do they understand modern cloud architectures? AWS, Azure, GCP security is essential for most companies now.', lookFor: 'Cloud certification (AWS Security Specialty), container security, DevSecOps', redFlag: 'Only traditional on-premise experience, can\'t discuss cloud security' },
  { criteria: 'Fractional Effectiveness', description: 'Can they be impactful part-time? Security requires consistent presence and quick response times.', lookFor: '2-4 clients, clear escalation procedures, responsive communication', redFlag: 'First fractional role, slow response times, overcommitted' },
];

export default function HireFractionalCISOClient() {
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
      fetch('/api/zep-store', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, role, content: text, metadata: { page: 'hire-fractional-ciso' } }) }).catch(() => {});
    }
    appendMessage(new TextMessage({ content: text, role: role === "user" ? Role.User : Role.Assistant }));
  }, [appendMessage, user?.id]);

  const suggestions = [
    { title: "Where to find CISOs", message: "Where can I find fractional CISOs to hire?" },
    { title: "SOC 2 expertise", message: "How do I find a CISO who can help with SOC 2 certification?" },
    { title: "Pricing & costs", message: "How much does a fractional CISO cost?" },
  ];

  return (
    <main style={{ "--copilot-kit-primary-color": "#dc2626" } as CopilotKitCSSProperties}>
      <WebPageSchema title="Hire a Fractional CISO UK 2025" description="How to hire a fractional CISO." url="https://fractional.quest/hire-fractional-ciso" dateModified={new Date('2025-01-07T00:00:00Z')} />
      <FAQPageSchema faqs={faqItems} />

      <CopilotSidebar
        instructions={`## PAGE CONTEXT
Page Type: hiring_guide | Role Type: CISO | URL: /hire-fractional-ciso

You're helping someone learn how to hire a fractional CISO.
Key facts: Day rates £900-£1,500 | 2-4 weeks to hire | Certifications essential (CISSP, CISM)`}
        labels={{ title: "CISO Hiring Guide", initial: firstName ? `Hi ${firstName}! 👋 I can help you hire a fractional CISO.` : `Welcome! This guide covers hiring a fractional CISO.` }}
        suggestions={suggestions}
        clickOutsideToClose={false}
      >
        <div className="min-h-screen bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-red-600 to-rose-500 py-24">
            <Image src={heroImage} alt="Hire a Fractional CISO" fill priority sizes="100vw" className="object-cover" />
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
              <Link href="/fractional-ciso" className="text-red-100 hover:text-white mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Back to Fractional CISO Guide</Link>
              <div className="max-w-4xl">
                <span className="inline-block bg-white text-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Hiring Guide</span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">Hire a<br /><span className="text-red-200">Fractional CISO</span></h1>
                <p className="text-2xl md:text-3xl text-red-50 leading-relaxed font-light mb-10">Complete guide to finding, vetting, and hiring the perfect fractional Chief Information Security Officer.</p>
                <div className="flex flex-wrap gap-10 mb-12">
                  <div><div className="text-5xl font-black text-white">2-4 Weeks</div><div className="text-red-100 text-sm uppercase tracking-wider mt-1">To Hire</div></div>
                  <div><div className="text-5xl font-black text-white">90 Days</div><div className="text-red-100 text-sm uppercase tracking-wider mt-1">To SOC 2</div></div>
                  <div><div className="text-5xl font-black text-white">40+</div><div className="text-red-100 text-sm uppercase tracking-wider mt-1">Candidates</div></div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <VoiceInput onMessage={handleVoiceMessage} firstName={firstName} userId={user?.id} pageContext={{ pageType: 'hiring_guide', roleType: 'CISO', pageH1: 'Hire a Fractional CISO', pageUrl: '/hire-fractional-ciso' }} />
                  <Link href="/fractional-ciso-jobs-uk" className="px-8 py-4 bg-white text-red-600 font-bold uppercase tracking-wider hover:bg-red-50 transition-colors">Browse CISO Candidates</Link>
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
                <div><div className="text-4xl font-black text-red-600 mb-2">3-5</div><div className="text-gray-600 text-sm">Candidates to Interview</div></div>
                <div><div className="text-4xl font-black text-red-600 mb-2">6-12 Months</div><div className="text-gray-600 text-sm">Typical Engagement</div></div>
                <div><div className="text-4xl font-black text-red-600 mb-2">£900-1.5k</div><div className="text-gray-600 text-sm">Day Rate Range</div></div>
                <div><div className="text-4xl font-black text-red-600 mb-2">30 Days</div><div className="text-gray-600 text-sm">Standard Notice</div></div>
              </div>
            </div>
          </section>

          {/* Where to Find */}
          <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Sourcing</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Where to Find Fractional CISOs</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sourcingChannels.map((source, index) => (
                  <div key={index} className="bg-gray-50 p-8 border-l-4 border-red-500 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{source.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{source.channel}</h3>
                    <p className="text-gray-600 text-sm mb-4">{source.description}</p>
                    <div className="mb-3"><div className="text-xs font-bold text-gray-500 uppercase mb-1">Pros:</div><div className="text-sm text-gray-700">{source.pros}</div></div>
                    <div><div className="text-xs font-bold text-gray-500 uppercase mb-1">Best For:</div><div className="text-sm text-red-600">{source.bestFor}</div></div>
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
                  <div key={index} className="bg-white p-10 border-l-4 border-red-500 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{index + 1}. {item.criteria}</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg"><div className="text-sm font-bold text-red-800 mb-2">✅ Look For</div><p className="text-sm text-gray-700">{item.lookFor}</p></div>
                      <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg"><div className="text-sm font-bold text-gray-800 mb-2">🚩 Red Flag</div><p className="text-sm text-gray-700">{item.redFlag}</p></div>
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
              <HireProcessStepper accentColor="red" />
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
          <section className="py-20 bg-red-600 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Hire?</h2>
              <p className="text-xl text-red-100 mb-10">Browse pre-vetted fractional CISO candidates on Fractional.Quest.</p>
              <Link href="/fractional-ciso-jobs-uk" className="px-10 py-5 bg-white text-red-600 font-bold uppercase tracking-wider hover:bg-red-50 transition-colors inline-block">Browse CISO Candidates</Link>
            </div>
          </section>
        </div>
      </CopilotSidebar>
    </main>
  );
}
