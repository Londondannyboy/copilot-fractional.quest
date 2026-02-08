"use client";

import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth/client";
import { FAQ, FAQItem } from "@/components/seo";
import { WebPageSchema, FAQPageSchema } from "@/components/seo";
import { HireProcessStepper } from "@/components/HireProcessStepper";
import { getHeroImageUrl, getImage } from '@/lib/images';
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'

const faqItems: FAQItem[] = [
  { question: 'How long does it take to hire a fractional CRO?', answer: 'Typically 2-4 weeks from first conversations to start date. This includes: defining requirements (1-3 days), sourcing candidates (3-7 days), interviews (1-2 weeks), and onboarding (1 week). Much faster than the 3-6 months required for full-time CRO recruitment.' },
  { question: 'Where can I find fractional CROs to hire?', answer: 'Five main sources: (1) Fractional executive job boards like Fractional.Quest with pre-vetted candidates, (2) LinkedIn using hashtags like #FractionalCRO or #PortfolioCRO, (3) Revenue Collective and sales leadership networks, (4) Referrals from VCs, founders, or investors, (5) Sales conferences and SaaS communities.' },
  { question: 'What should I look for when hiring a fractional CRO?', answer: 'Five key criteria: (1) Relevant experience scaling revenue at your stage (seed, Series A, PE-backed), (2) Industry expertise matching your sector (SaaS, B2B, enterprise), (3) Proven track record growing ARR or building sales teams, (4) Strong sales operations and forecasting skills, (5) Cultural fit and ability to work fractionally with your team.' },
  { question: 'How much does it cost to hire a fractional CRO?', answer: 'Day rates range from £1,000-£1,500 depending on experience. Most engagements are 2 days per week (£8,000-£12,000/month retainer) or 3 days per week (£100,000-£180,000 annually). This is 40-60% cheaper than full-time CROs who cost £200,000-£350,000+ with benefits and equity.' },
  { question: 'What contract terms should I use?', answer: 'Start with a 3-month trial period with 30 days notice either side. After the trial, extend to 12-month rolling contracts. Key terms: day rate or monthly retainer, expected days per week, notice period (30 days standard), IP ownership (company owns all work), confidentiality, and scope of responsibilities.' },
  { question: 'Can I convert a fractional CRO to full-time later?', answer: 'Yes, many companies do this as they scale. Common transition points: closing Series B, hitting £10M+ ARR, or building larger sales teams. Discuss this upfront—most fractional CROs are open to conversion if the timing and equity package make sense.' },
];

const sourcingChannels = [
  { channel: 'Fractional Job Boards', description: 'Platforms like Fractional.Quest with pre-vetted fractional executives actively looking for engagements.', pros: 'Pre-screened candidates, fast matching, transparent rates', bestFor: 'Companies wanting quality candidates quickly', icon: '🎯' },
  { channel: 'Revenue Collective', description: 'The leading revenue leader community with thousands of CROs and VP Sales.', pros: 'High-quality network, proven leaders, community vetted', bestFor: 'SaaS and B2B companies', icon: '💼' },
  { channel: 'LinkedIn Search', description: 'Search for CROs using hashtags #FractionalCRO, #PortfolioCRO, or "Fractional CRO" in titles.', pros: 'Large pool, direct outreach, can research background', bestFor: 'Companies with time to source and screen', icon: '🔍' },
  { channel: 'VC & PE Referrals', description: "Ask your investors, advisors, or board members who they've worked with.", pros: 'Trusted recommendations, investor-approved, proven with similar companies', bestFor: 'VC/PE-backed startups with investor networks', icon: '🌟' },
  { channel: 'SaaS Communities', description: 'SaaStr, SaaS Growth Hub, Pavilion, and industry Slack communities. For GTM strategy support, consider a specialist <a href="https://gtm.quest" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">GTM agency</a>.', pros: 'Industry-specific, engaged professionals, peer recommendations', bestFor: 'SaaS and tech companies', icon: '📊' },
  { channel: 'Sales Conferences', description: 'Attend SaaStr, Sales Assembly, or industry-specific events.', pros: 'Meet in person, assess cultural fit, network effect', bestFor: 'Companies attending conferences anyway', icon: '🎤' },
];

const evaluationCriteria = [
  { criteria: 'Revenue Scaling Experience', description: "Have they scaled revenue at companies like yours? Look for experience growing from £1M to £10M+ ARR or building sales teams from 2 to 20+ reps.", lookFor: 'Experience at similar stage companies, relevant ARR growth, understanding of your growth phase', redFlag: 'Only worked at large corporations or never managed a scaling sales org' },
  { criteria: 'Industry & Sales Model Expertise', description: 'Do they understand your sales motion? Enterprise sales differ from SMB or PLG. Ensure they speak your language—ACV, sales cycles, pipeline velocity, win rates.', lookFor: 'Experience with your sales model, knowledge of relevant KPIs, understanding of your buyer', redFlag: 'No experience with similar sales motions or deal sizes' },
  { criteria: 'Team Building Track Record', description: 'Have they hired and developed sales teams before? Great fractional CROs can recruit, train, and retain top sales talent—not just manage existing teams.', lookFor: 'Track record of building teams, sales hiring experience, retention metrics', redFlag: 'Never built a team from scratch or high turnover in previous roles' },
  { criteria: 'Sales Operations & Systems', description: 'Can they implement the infrastructure for scale? Beyond selling, they should build playbooks, implement CRM processes, and create forecasting models.', lookFor: 'Salesforce/HubSpot expertise, playbook creation, forecasting accuracy', redFlag: "Can't demonstrate ops improvement or relies on others for systems" },
  { criteria: 'Strategic Revenue Leadership', description: 'Are they a strategic partner or just a sales manager? Great CROs influence strategy, not just hit quota. They should align sales with marketing and customer success.', lookFor: 'Examples of strategic input, cross-functional alignment, beyond-quota thinking', redFlag: 'Purely execution focused, only cares about closing deals' },
  { criteria: 'Fractional Working Model Fit', description: 'Do they know how to work fractionally? This requires discipline, clear communication, and asynchronous collaboration. Ask how they manage multiple clients and make impact in 2 days/week.', lookFor: 'Works with 2-4 companies currently, systems for time management, clear communication cadence', redFlag: 'First fractional engagement or working with 6+ companies (spread too thin)' },
];

export default function HireFractionalCROClient() {
  const heroImage = getHeroImageUrl('cro', 1920, 800);
  const imageCredit = getImage('cro');

  return (
    <main>
      <WebPageSchema title="Hire a Fractional CRO | UK Guide 2026" description="How to hire a fractional CRO in the UK. Where to find them, interview questions, costs, and contract terms." url="https://fractional.quest/hire-fractional-cro" dateModified={new Date('2026-01-17T00:00:00Z')} />
      <FAQPageSchema faqs={faqItems} />

      <div className="min-h-screen bg-white">
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-center overflow-hidden">
            <Image src={heroImage} alt="Hire a Fractional CRO" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-600/80" />
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-24">
              <Link href="/fractional-cro" className="text-blue-100 hover:text-white mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Back to Fractional CRO Guide</Link>
              <div className="max-w-4xl">
                <span className="inline-block bg-white text-blue-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Hiring Guide</span>
                <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">Hire a<br /><span className="text-blue-200">Fractional CRO</span></h1>
                <p className="text-2xl md:text-3xl text-blue-50 leading-relaxed font-light mb-10">Complete guide to finding, vetting, and hiring the perfect fractional Chief Revenue Officer for your business.</p>
                <div className="flex flex-wrap gap-10 mb-12">
                  <div><div className="text-5xl font-black text-white">2-4 Weeks</div><div className="text-blue-100 text-sm uppercase tracking-wider mt-1">To Hire</div></div>
                  <div><div className="text-5xl font-black text-white">90 Days</div><div className="text-blue-100 text-sm uppercase tracking-wider mt-1">To Impact</div></div>
                  <div><div className="text-5xl font-black text-white">£1,250</div><div className="text-blue-100 text-sm uppercase tracking-wider mt-1">Avg Day Rate</div></div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/fractional-cro-jobs-uk" className="px-8 py-4 bg-white text-blue-600 font-bold uppercase tracking-wider hover:bg-blue-50 transition-colors">Browse CRO Candidates</Link>
                  <Link href="#process" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-blue-600 transition-colors">See Hiring Process</Link>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 z-10">
              <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a>
            </div>
          </section>

          {/* Hiring Process */}
          <section id="process" className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Process</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">How to Hire a Fractional CRO</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">From defining your needs to signed contract in 2-4 weeks</p>
              </div>
              <HireProcessStepper accentColor="blue" />
            </div>
          </section>

          {/* Sourcing Channels */}
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Sourcing</span>
                <h2 className="text-4xl font-black text-gray-900 mb-4">Where to Find Fractional CROs</h2>
                <p className="text-xl text-gray-600">Six channels for finding qualified candidates</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sourcingChannels.map((channel, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                    <span className="text-3xl mb-4 block">{channel.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{channel.channel}</h3>
                    <p className="text-gray-600 text-sm mb-4">{channel.description}</p>
                    <div className="text-xs space-y-1">
                      <div><span className="font-semibold text-gray-700">Pros:</span> <span className="text-gray-600">{channel.pros}</span></div>
                      <div><span className="font-semibold text-gray-700">Best for:</span> <span className="text-gray-600">{channel.bestFor}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Evaluation Criteria */}
          <section className="py-20 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-2 block">Evaluation</span>
                <h2 className="text-4xl font-black mb-4">How to Evaluate Fractional CROs</h2>
                <p className="text-xl text-gray-400">Six criteria for assessing candidates</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {evaluationCriteria.map((criteria, i) => (
                  <div key={i} className="bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">{criteria.criteria}</h3>
                    <p className="text-gray-400 text-sm mb-4">{criteria.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-300">{criteria.lookFor}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        <span className="text-gray-400">{criteria.redFlag}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
                <h2 className="text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
              </div>
              <FAQ items={faqItems} title="" skipSchema={true} />
            </div>
          </section>

          {/* Job Board */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span>
                <h2 className="text-4xl font-black text-gray-900 mb-4">Fractional CRO Candidates</h2>
                <p className="text-xl text-gray-500">Find your next fractional CRO</p>
              </div>
              <EmbeddedJobBoard
                defaultDepartment="Sales"
                title="Revenue & Sales Leadership"
                accentColor="blue"
                jobsPerPage={6}
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-blue-600 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-black mb-6">Ready to Hire a Fractional CRO?</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Browse pre-vetted fractional CRO candidates or get in touch to discuss your requirements.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/fractional-cro-jobs-uk" className="px-8 py-4 bg-white text-blue-600 font-bold uppercase tracking-wider hover:bg-blue-50 transition-colors">Browse CRO Candidates</Link>
                <Link href="/book-call" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-blue-600 transition-colors">Book a Call</Link>
              </div>
            </div>
          </section>
        </div>
    </main>
  );
}
