"use client";

import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth/client";
import { FAQ, FAQItem } from "@/components/seo";
import { EmbeddedJobBoard } from "@/components/EmbeddedJobBoard";
import { getHeroImageUrl, getImage } from '@/lib/images';
import { LazyCopilotSidebar } from "@/components/LazyCopilotSidebar";

const CALENDLY_URL = 'https://calendly.com/firstquest/quest';

const faqItems: FAQItem[] = [
  { question: 'What is a fractional recruitment agency?', answer: 'A fractional recruitment agency specialises in placing part-time, interim, and fractional executives with companies. Unlike traditional recruiters who focus on full-time permanent hires, these agencies understand the fractional model, day rates, and how to match executives with multiple clients.' },
  { question: 'How much do fractional recruitment agencies charge?', answer: 'Fees typically range from 15-25% of the first year\'s expected billings (based on agreed days × day rate × 52 weeks). Some agencies charge flat fees of £5,000-£15,000 per placement. Retained search for senior roles may cost £15,000-£30,000.' },
  { question: 'What\'s the difference between a fractional agency and a traditional recruiter?', answer: 'Fractional agencies understand part-time executive work, IR35 implications, day rate negotiations, and multi-client relationships. Traditional recruiters often push for full-time placements and may not understand fractional contract structures or portfolio career dynamics.' },
  { question: 'How long does it take to find a fractional executive through an agency?', answer: 'Typically 2-4 weeks for common roles (CFO, CMO, CTO) and 4-8 weeks for specialist positions. Agencies with established networks can often present shortlisted candidates within days.' },
  { question: 'Should I use an agency or hire directly?', answer: 'Use an agency if you need speed, don\'t have time to source, want pre-vetted candidates, or need a specialist role. Hire directly if you have strong networks, want to save fees, or are hiring for a common role where you can easily assess quality yourself.' },
  { question: 'What should I look for in a fractional recruitment agency?', answer: 'Key criteria: (1) Specialism in fractional/interim work, not just traditional recruitment, (2) Track record with your industry or role type, (3) Understanding of IR35 and contractor compliance, (4) Quality of their candidate network, (5) Transparent fee structure.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'The UK\'s leading fractional executive job board. Browse candidates directly or post roles to attract qualified fractional leaders.', speciality: 'All C-suite roles', model: 'Job board', icon: '🎯' },
  { name: 'The Fractional CFO Network', description: 'Specialist network focused on finance leadership. Strong in PE/VC-backed companies and scale-ups.', speciality: 'CFO, FD, Finance Director', model: 'Network matching', icon: '💰' },
  { name: 'Interim Executive Boards', description: 'Traditional interim network with fractional options. Good for board-level appointments.', speciality: 'CEO, Chairman, NED', model: 'Retained search', icon: '👔' },
  { name: 'Marketing Leaders Network', description: 'Focused on marketing leadership. Strong in B2B SaaS and consumer brands.', speciality: 'CMO, VP Marketing, CGO', model: 'Network matching', icon: '📣' },
  { name: 'Tech Executive Search', description: 'Technology-focused with deep CTO and CPO networks. Good for complex tech stacks.', speciality: 'CTO, CPO, VP Engineering', model: 'Retained search', icon: '💻' },
  { name: 'HR Interim Network', description: 'HR and People specialist network. Strong in scale-up culture and employment law.', speciality: 'CHRO, People Director', model: 'Network matching', icon: '👥' },
];

const comparisonData = [
  { factor: 'Cost', directHire: 'Free (your time only)', agency: '15-25% of year 1 billings' },
  { factor: 'Time to hire', directHire: '4-8 weeks', agency: '2-4 weeks' },
  { factor: 'Candidate quality', directHire: 'Depends on your network', agency: 'Pre-vetted, referenced' },
  { factor: 'Market knowledge', directHire: 'Limited visibility', agency: 'Full market access' },
  { factor: 'Negotiation support', directHire: 'Self-managed', agency: 'Agent-assisted' },
  { factor: 'IR35 guidance', directHire: 'Self-research', agency: 'Expert guidance included' },
];

const benefits = [
  { title: 'Speed', description: 'Agencies have existing networks of pre-vetted fractional executives. What might take you weeks of LinkedIn searching, they can deliver in days.', icon: '⚡' },
  { title: 'Quality Assurance', description: 'Good agencies reference-check, interview, and assess candidates before presenting them. You get a shortlist, not a longlist.', icon: '✓' },
  { title: 'Market Intelligence', description: 'Agencies know current day rates, availability, and who\'s good. They can tell you if your budget is realistic and what trade-offs to consider.', icon: '📊' },
  { title: 'Compliance Support', description: 'IR35, contract terms, right to work checks - agencies handle the compliance complexity of contractor relationships.', icon: '📋' },
  { title: 'Negotiation Buffer', description: 'Having an intermediary can help with rate negotiations and setting expectations on both sides.', icon: '🤝' },
  { title: 'Replacement Guarantee', description: 'Most agencies offer replacement guarantees (typically 3-6 months) if the placement doesn\'t work out.', icon: '🛡️' },
];

/**
 * RecruitmentAgencyClient - Lazy-loads CopilotKit for better performance
 *
 * CopilotKit (~1MB) only loads when user clicks the chat button.
 * Page content renders immediately without waiting for AI bundle.
 */
export function RecruitmentAgencyClient() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || null;
  const heroImage = getHeroImageUrl('services', 1920, 800);
  const imageCredit = getImage('services');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-emerald-600 to-emerald-500 py-24">
        <Image
          src={heroImage}
          alt="Fractional Recruitment Agency UK - Find the best agencies for hiring fractional executives"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <Link href="/fractional-jobs-uk" className="text-emerald-100 hover:text-white mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Back to Fractional Jobs UK</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-emerald-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Guide</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">Fractional<br /><span className="text-emerald-200">Recruitment Agency</span></h1>
            <p className="text-2xl md:text-3xl text-emerald-50 leading-relaxed font-light mb-10">Find the best <strong>fractional recruitment agencies</strong> for hiring fractional executives. Compare specialists in CFO, CTO, CMO, and C-suite placements across the UK.</p>
            <div className="flex flex-wrap gap-10 mb-12">
              <div><div className="text-5xl font-black text-white">15-25%</div><div className="text-emerald-100 text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
              <div><div className="text-5xl font-black text-white">2-4 Weeks</div><div className="text-emerald-100 text-sm uppercase tracking-wider mt-1">To Place</div></div>
              <div><div className="text-5xl font-black text-white">50+</div><div className="text-emerald-100 text-sm uppercase tracking-wider mt-1">UK Agencies</div></div>
            </div>
            {/* PRIMARY CTA IN HERO */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <span>📅</span> Book a Free Call
              </a>
              <Link href="#agencies" className="px-8 py-4 bg-emerald-700 text-white font-bold uppercase tracking-wider hover:bg-emerald-800 transition-colors border border-emerald-500">View Top Agencies</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10">
          <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a>
        </div>
      </section>

      {/* COMPANIES CTA PANEL - HIGH UP */}
      <section className="bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white/20 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">For Companies</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Need to Hire a Fractional Executive?</h2>
              <p className="text-xl text-white/90 mb-6">Skip the fractional recruitment agency fees. Talk directly with Dan Keegan, founder of Fractional Quest, for free hiring advice and access to our vetted network.</p>
              <ul className="space-y-3 text-white/90 mb-8">
                <li className="flex items-center gap-3"><span className="text-2xl">✓</span> Free 30-minute consultation</li>
                <li className="flex items-center gap-3"><span className="text-2xl">✓</span> No agency fees - browse candidates directly</li>
                <li className="flex items-center gap-3"><span className="text-2xl">✓</span> Honest advice on what you actually need</li>
                <li className="flex items-center gap-3"><span className="text-2xl">✓</span> IR35 and contract guidance included</li>
              </ul>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-gray-900 text-lg font-bold py-4 px-8 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                <span className="text-2xl">📅</span>
                <span>Book Your Free Call</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">💼</div>
                <h3 className="text-2xl font-bold text-white mb-2">What Companies Get</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-bold text-white mb-1">Free Hiring Strategy Call</div>
                  <div className="text-white/80 text-sm">30 minutes to discuss your needs and budget</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-bold text-white mb-1">Access to Job Board</div>
                  <div className="text-white/80 text-sm">Post roles or browse 200+ fractional executives</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-bold text-white mb-1">Market Rate Intelligence</div>
                  <div className="text-white/80 text-sm">Know what to pay before you negotiate</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-bold text-white mb-1">Zero Placement Fees</div>
                  <div className="text-white/80 text-sm">Save 15-25% vs traditional fractional recruitment agencies</div>
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
            <div><div className="text-4xl font-black text-emerald-600 mb-2">£5k-30k</div><div className="text-gray-600 text-sm">Typical Fractional Recruitment Agency Fees</div></div>
            <div><div className="text-4xl font-black text-emerald-600 mb-2">3-6 Months</div><div className="text-gray-600 text-sm">Guarantee Period</div></div>
            <div><div className="text-4xl font-black text-emerald-600 mb-2">5-10</div><div className="text-gray-600 text-sm">Candidates Presented</div></div>
            <div><div className="text-4xl font-black text-emerald-600 mb-2">85%+</div><div className="text-gray-600 text-sm">Placement Success</div></div>
          </div>
        </div>
      </section>

      {/* What is a Fractional Recruitment Agency */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a Fractional Recruitment Agency?</h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              A <strong>fractional recruitment agency</strong> specialises in placing part-time, interim, and fractional executives with businesses. Unlike traditional executive recruiters who focus primarily on full-time permanent placements, these specialist agencies understand the unique dynamics of the fractional model.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              They know how to assess candidates who work with multiple clients, understand day rate structures and IR35 compliance, and can match executives to companies based on time commitment requirements (1-3 days per week rather than full-time).
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              The UK <strong>fractional recruitment agency</strong> market has grown significantly since 2020, with more agencies now offering specialist fractional recruitment services alongside traditional interim and permanent search.
            </p>
          </div>
          {/* INLINE CTA */}
          <div className="mt-12 bg-emerald-50 border border-emerald-200 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Not sure what you need?</h3>
              <p className="text-gray-600">Get free advice on whether you need a fractional recruitment agency or can hire directly.</p>
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-6 py-3 bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
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
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a Fractional Recruitment Agency?</h2>
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

      {/* SECOND CTA - MID PAGE */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Start Hiring?</h2>
          <p className="text-xl text-gray-300 mb-8">Most companies don&apos;t need a fractional recruitment agency. Let&apos;s discuss your specific needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 text-white font-bold uppercase tracking-wider hover:bg-emerald-800 transition-colors"
            >
              <span>📅</span> Book a Free Call
            </a>
            <Link href="/fractional-jobs-uk" className="px-8 py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors">
              Browse Candidates
            </Link>
          </div>
        </div>
      </section>

      {/* Top UK Fractional Recruitment Agencies */}
      <section id="agencies" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Top Agencies</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Best Fractional Recruitment Agencies UK</h2>
            <p className="text-xl text-gray-600">Compare specialists in fractional executive recruitment, from generalist to role-specific agencies.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topAgencies.map((agency, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-emerald-500 transition-colors p-8 hover:shadow-lg">
                <div className="text-4xl mb-4">{agency.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-medium">{agency.speciality}</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs">{agency.model}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Comparison</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Direct Hire vs Fractional Recruitment Agency</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Factor</th>
                  <th className="px-6 py-4 text-left font-bold">Direct Hire</th>
                  <th className="px-6 py-4 text-left font-bold">Fractional Recruitment Agency</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.factor}</td>
                    <td className="px-6 py-4 text-gray-600">{row.directHire}</td>
                    <td className="px-6 py-4 text-gray-600">{row.agency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Embedded Job Board */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Skip the Agency</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Browse Fractional Executives Directly</h2>
            <p className="text-xl text-gray-600">No fractional recruitment agency needed. Find and connect with fractional executives directly on Fractional Quest.</p>
          </div>
          <EmbeddedJobBoard title="Fractional Executive Roles" accentColor="emerald" jobsPerPage={6} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Fractional Recruitment Agency Questions</h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-emerald-500">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🎯</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Skip the Fractional Recruitment Agency Fees</h2>
          <p className="text-2xl text-emerald-100 mb-10 font-light">Get free hiring advice and access our network of vetted fractional executives directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              <span className="text-2xl">📅</span>
              <span>Book Your Free Call</span>
            </a>
            <Link href="/fractional-jobs-uk" className="px-10 py-5 bg-emerald-700 text-white text-lg font-bold hover:bg-emerald-800 transition-colors border border-emerald-400">
              Browse All Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <main>
      <LazyCopilotSidebar
        instructions={`## PAGE CONTEXT
Page Type: guide | Topic: Fractional Recruitment Agencies | URL: /fractional-recruitment-agency

You're helping someone understand fractional recruitment agencies and how to find/hire fractional executives.
Key facts: Agency fees 15-25% of year 1 | 2-4 weeks to hire via agency | Fractional.Quest is a job board not agency`}
        labels={{
          title: "Recruitment Guide",
          initial: firstName ? `Hi ${firstName}! I can help you find the right fractional recruitment agency.` : `Welcome! This guide covers fractional recruitment agencies in the UK.`
        }}
      >
        {pageContent}
      </LazyCopilotSidebar>
    </main>
  );
}
