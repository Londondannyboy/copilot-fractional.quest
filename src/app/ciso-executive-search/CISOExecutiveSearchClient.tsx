"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { authClient } from "@/lib/auth/client";
import { FAQItem } from "@/components/seo";
import { getLocalImage, getImage } from '@/lib/images';
import { LazyCopilotSidebar } from "@/components/LazyCopilotSidebar";

const EmbeddedJobBoard = dynamic(() => import("@/components/EmbeddedJobBoard").then(mod => ({ default: mod.EmbeddedJobBoard })), { ssr: false, loading: () => <div className="animate-pulse bg-gray-100 rounded-xl h-96" /> });
const FAQ = dynamic(() => import("@/components/seo").then(mod => ({ default: mod.FAQ })), { ssr: false });

const CALENDLY_URL = 'https://calendly.com/firstquest/quest';

const faqItems: FAQItem[] = [
  { question: 'What is CISO executive search?', answer: 'CISO executive search is a retained recruitment service specifically for Chief Information Security Officer placements. Unlike contingent recruitment, executive search firms are paid upfront to conduct thorough, confidential searches for senior security leaders.' },
  { question: 'How much does CISO executive search cost?', answer: 'CISO executive search typically costs £30,000-£80,000 for a retained search, usually calculated as 30-35% of first year compensation. Payment is typically structured as thirds: 1/3 upfront, 1/3 at shortlist, 1/3 at placement.' },
  { question: 'How is CISO executive search different from recruitment?', answer: 'Executive search is a proactive, retained process where the firm approaches passive candidates. Recruitment is typically contingent and reactive. For CISO roles, executive search provides access to candidates not actively looking.' },
  { question: 'How long does CISO executive search take?', answer: 'A full CISO executive search typically takes 12-20 weeks including market mapping, approach, assessment, and offer negotiation. Confidential searches may take longer.' },
  { question: 'When should I use CISO executive search vs recruitment?', answer: 'Use executive search for: (1) Senior CISO roles at large enterprises, (2) Confidential replacements, (3) Highly specialised requirements, (4) When you need access to passive candidates. Use recruitment for interim or less senior roles.' },
  { question: 'What do CISO executive search firms assess?', answer: 'CISO executive search firms conduct in-depth assessments of: technical security expertise, compliance framework knowledge, board-level communication, crisis management experience, and cultural fit with stakeholder interviews.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'Browse fractional CISO roles directly. No agency fees - connect with security leadership candidates.', speciality: 'Fractional CISO', model: 'Job board', icon: '🎯' },
  { name: 'Heidrick & Struggles', description: 'Global executive search with dedicated CISO and cyber risk practice across all industries.', speciality: 'CISO, CIO, CISO', model: 'Retained search', icon: '🌐' },
  { name: 'Russell Reynolds', description: 'Top-tier technology executive search with strong enterprise CISO practice.', speciality: 'CISO, CSO', model: 'Retained search', icon: '👔' },
  { name: 'Egon Zehnder', description: 'Global leadership advisory with dedicated cybersecurity executive practice.', speciality: 'CISO', model: 'Retained search', icon: '📊' },
  { name: 'Spencer Stuart', description: 'Global executive search with strong board and CISO placement capabilities.', speciality: 'CISO, Board', model: 'Retained search', icon: '🏛️' },
  { name: 'Korn Ferry', description: 'Integrated talent firm with dedicated security leadership practice.', speciality: 'Security leadership', model: 'Retained search', icon: '🔒' },
];

const benefits = [
  { title: 'Passive Candidate Access', description: 'CISO executive search firms approach candidates who are not actively looking - critical for senior appointments where the best talent is typically employed.', icon: '🔍' },
  { title: 'Confidential Search', description: 'Executive search provides complete confidentiality for sensitive replacements or board-mandated searches that cannot be advertised publicly.', icon: '🔒' },
  { title: 'Deep Assessment', description: 'CISO executive search includes comprehensive assessment: technical due diligence, psychometrics, stakeholder interviews, and off-list reference checks.', icon: '📋' },
  { title: 'Market Intelligence', description: 'Executive search firms provide detailed market mapping, compensation benchmarking, and competitor analysis specific to CISO talent.', icon: '📊' },
  { title: 'Guaranteed Focus', description: 'Retained search means the firm is exclusively dedicated to your search, unlike contingent recruitment where your role competes with others.', icon: '🎯' },
  { title: 'Long-Term Success', description: 'CISO executive search firms typically offer 12-month guarantees and focus on long-term fit, not just filling the role quickly.', icon: '🛡️' },
];

export function CISOExecutiveSearchClient() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0] || null;
  const localImage = getLocalImage('ciso');
  const imageCredit = getImage('ciso');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-zinc-900 to-zinc-800 py-16 sm:py-24">
        <picture>
          <source media="(max-width: 768px)" srcSet={localImage?.mobile || '/images/hero/ciso-mobile.webp'} type="image/webp" />
          <Image src={localImage?.desktop || '/images/hero/ciso-desktop.webp'} alt="CISO Executive Search - Chief Information Security Officer Headhunters" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/executive-search-firms" className="text-zinc-400 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Executive Search Firms</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-zinc-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">Executive Search</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">CISO<br /><span className="text-zinc-400">Executive Search</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-zinc-300 leading-relaxed font-light mb-6 sm:mb-10">Find <strong>CISO executive search firms</strong> for senior security leadership placements. Specialist <strong>CISO headhunters</strong> with deep networks in cybersecurity, compliance, and technology sectors.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">£30k-80k</div><div className="text-zinc-400 text-xs sm:text-sm uppercase tracking-wider mt-1">Search Fee</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">12-20 Weeks</div><div className="text-zinc-400 text-xs sm:text-sm uppercase tracking-wider mt-1">Search Duration</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">30-35%</div><div className="text-zinc-400 text-xs sm:text-sm uppercase tracking-wider mt-1">Of Compensation</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"><span>📅</span> Book a Free Call</a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-zinc-700 text-white font-bold uppercase tracking-wider hover:bg-zinc-600 transition-colors border border-zinc-600">View CISO Search Firms</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10"><a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a></div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-zinc-800 mb-1 sm:mb-2">£30k-80k</div><div className="text-gray-600 text-xs sm:text-sm">Exec Search Fees</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-zinc-800 mb-1 sm:mb-2">12 Months</div><div className="text-gray-600 text-xs sm:text-sm">Guarantee Period</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-zinc-800 mb-1 sm:mb-2">3-5</div><div className="text-gray-600 text-xs sm:text-sm">Candidate Shortlist</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-zinc-800 mb-1 sm:mb-2">95%+</div><div className="text-gray-600 text-xs sm:text-sm">Completion Rate</div></div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-700 mb-3 block">Featured CISO Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse CISO Opportunities</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the <strong>CISO executive search</strong> fees and connect with security leadership opportunities directly.</p>
          </div>
          <EmbeddedJobBoard title="CISO Roles" accentColor="zinc" jobsPerPage={6} />
        </div>
      </section>

      {/* What is CISO Executive Search */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=800&fit=crop&q=80" alt="Executive boardroom" fill className="object-cover opacity-[0.03]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is CISO Executive Search?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed"><strong>CISO executive search</strong> is a retained recruitment service specifically for Chief Information Security Officer placements. Unlike contingent recruitment, <strong>CISO executive search firms</strong> are paid upfront to conduct thorough, confidential searches approaching passive candidates.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">The best <strong>CISO executive search firms</strong> combine deep cybersecurity expertise with proven executive assessment methodologies. They understand board dynamics, regulatory requirements, and the technical depth needed for enterprise security leadership.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">A specialist <strong>CISO headhunter</strong> will conduct comprehensive assessments including technical due diligence, psychometric evaluation, stakeholder interviews, and thorough reference checks - going far beyond what contingent recruiters provide.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use CISO Executive Search?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 border-l-4 border-zinc-800 hover:shadow-md transition-shadow">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{benefit.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Agencies */}
      <section id="agencies" className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Top Firms</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Best CISO Executive Search Firms</h2>
            <p className="text-base sm:text-xl text-gray-600">Compare specialist <strong>CISO executive search firms</strong> and retained security headhunters.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAgencies.map((agency, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-zinc-800 transition-colors p-6 sm:p-8 hover:shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{agency.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-zinc-100 text-zinc-800 px-3 py-1 text-xs font-medium">{agency.speciality}</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs">{agency.model}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">FAQ</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">CISO Executive Search Questions</h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/ciso-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-zinc-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🛡️</div><div className="font-medium text-gray-900 text-sm sm:text-base">CISO Recruitment</div></Link>
            <Link href="/executive-search-firms" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-zinc-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔍</div><div className="font-medium text-gray-900 text-sm sm:text-base">Executive Search Firms</div></Link>
            <Link href="/cybersecurity-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-zinc-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔐</div><div className="font-medium text-gray-900 text-sm sm:text-base">Cybersecurity Recruitment</div></Link>
            <Link href="/fractional-ciso-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-zinc-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">CISO Jobs UK</div></Link>
            <Link href="/fractional-ciso" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-zinc-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📖</div><div className="font-medium text-gray-900 text-sm sm:text-base">What is a Fractional CISO?</div></Link>
            <Link href="/hire-fractional-ciso" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-zinc-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🤝</div><div className="font-medium text-gray-900 text-sm sm:text-base">Hire a CISO</div></Link>
            <Link href="/interim-executive-search" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-zinc-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">⏱️</div><div className="font-medium text-gray-900 text-sm sm:text-base">Interim Executive Search</div></Link>
            <Link href="/fractional-executive-search" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-zinc-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Executive Search</div></Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-zinc-900 to-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🔍</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the Executive Search Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-zinc-400 mb-8 sm:mb-10 font-light">Get free CISO hiring advice and access our network of vetted security leaders directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"><span className="text-xl sm:text-2xl">📅</span><span>Book Your Free Call</span></a>
            <Link href="/fractional-ciso-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-zinc-700 text-white text-base sm:text-lg font-bold hover:bg-zinc-600 transition-colors border border-zinc-600">Browse CISO Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <main>
      <LazyCopilotSidebar instructions={`## PAGE CONTEXT\nPage Type: guide | Topic: CISO Executive Search | URL: /ciso-executive-search\n\nYou're helping someone understand CISO executive search and retained security leadership headhunting.\nKey facts: CISO executive search fees £30k-80k | 12-20 weeks duration | Retained search, paid upfront | Access to passive candidates`} labels={{ title: "CISO Search Guide", initial: firstName ? `Hi ${firstName}! I can help you understand CISO executive search and find the right approach.` : `Welcome! This guide covers CISO executive search and retained security headhunting.` }}>
        {pageContent}
      </LazyCopilotSidebar>
    </main>
  );
}
