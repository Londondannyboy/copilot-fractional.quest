"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FAQItem } from "@/components/seo";
import { getLocalImage, getImage } from '@/lib/images';
import { HeyCompanies } from '@/components/HeyCompanies';

const EmbeddedJobBoard = dynamic(() => import("@/components/EmbeddedJobBoard").then(mod => ({ default: mod.EmbeddedJobBoard })), { ssr: false, loading: () => <div className="animate-pulse bg-gray-100 rounded-xl h-96" /> });
const FAQ = dynamic(() => import("@/components/seo").then(mod => ({ default: mod.FAQ })), { ssr: false });

const CALENDLY_URL = 'https://calendly.com/firstquest/quest';

const faqItems: FAQItem[] = [
  { question: 'What is interim executive search?', answer: 'Interim executive search is a recruitment service for temporary C-suite and senior leadership positions. Interim executives work full-time for a defined period (typically 3-12 months) to cover gaps, lead transformations, or manage crises.' },
  { question: 'How much does interim executive search cost?', answer: 'Interim executive search fees typically range from 15-25% of the total contract value. For a 6-month interim CFO at £1,500/day, expect placement fees of £15,000-£25,000.' },
  { question: 'How is interim different from fractional executive search?', answer: 'Interim executives work full-time (5 days/week) for a fixed period. Fractional executives work part-time (1-3 days/week) ongoing. Use interim for urgent, full-focus needs; fractional for ongoing part-time leadership.' },
  { question: 'How long does interim executive search take?', answer: 'Interim executive placements are typically faster than permanent search: 2-4 weeks for common roles (CFO, CTO). Agencies with established networks can often present candidates within days.' },
  { question: 'When should I hire an interim executive?', answer: 'Hire interim executives for: (1) Sudden departures requiring immediate coverage, (2) Transformations requiring dedicated focus, (3) M&A integration periods, (4) Crisis management, (5) Bridge roles while recruiting permanently.' },
  { question: 'What day rates do interim executives charge?', answer: 'Interim executive day rates vary by role: CFO £1,200-£1,800/day, CTO £1,000-£1,600/day, CMO £900-£1,400/day, CEO £1,500-£2,500/day. Rates depend on sector, company size, and complexity.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'Browse interim and fractional executive roles directly. No agency fees - connect with C-suite candidates.', speciality: 'Fractional & Interim', model: 'Job board', icon: '🎯' },
  { name: 'Odgers Interim', description: 'Part of Odgers Berndtson, leading interim management provider with global reach.', speciality: 'All C-suite', model: 'Contingent', icon: '🌐' },
  { name: 'Russam', description: 'Established interim executive provider specialising in change and transformation roles.', speciality: 'Transformation', model: 'Contingent', icon: '🔄' },
  { name: 'Heidrick & Struggles', description: 'Global executive search with dedicated interim leadership practice.', speciality: 'All C-suite', model: 'Retained', icon: '👔' },
  { name: 'Norman Broadbent', description: 'Executive interim specialists with strong CFO and finance leadership network.', speciality: 'CFO, Finance', model: 'Contingent', icon: '💰' },
  { name: 'AltoPartners', description: 'Global alliance of executive search and interim management firms.', speciality: 'International', model: 'Retained', icon: '🌍' },
];

const benefits = [
  { title: 'Speed to Start', description: 'Interim executive search is significantly faster than permanent recruitment. Experienced interim executives can start within 1-2 weeks of engagement.', icon: '⚡' },
  { title: 'Transformation Expertise', description: 'Interim executives are specialists in change. They bring experience from multiple transformations, turnarounds, and crisis situations.', icon: '🔄' },
  { title: 'No Long-Term Commitment', description: 'Interim arrangements provide flexibility - extend if needed, or transition to permanent. No redundancy risk or long notice periods.', icon: '📋' },
  { title: 'Fresh Perspective', description: 'Interim executives bring objectivity and fresh eyes. They can make difficult decisions without political baggage.', icon: '👁️' },
  { title: 'Knowledge Transfer', description: 'Good interim executives build capability in the permanent team and leave the organisation stronger than they found it.', icon: '📚' },
  { title: 'Pre-Vetted Network', description: 'Interim executive search firms maintain networks of proven executives ready to deploy quickly for urgent needs.', icon: '✅' },
];

export function InterimExecutiveSearchClient() {
  const localImage = getLocalImage('services');
  const imageCredit = getImage('services');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-orange-600 to-orange-500 py-16 sm:py-24">
        <picture>
          <source media="(max-width: 768px)" srcSet={localImage?.mobile || '/images/hero/services-mobile.webp'} type="image/webp" />
          <Image src={localImage?.desktop || '/images/hero/services-desktop.webp'} alt="Interim Executive Search - Temporary C-Suite Recruitment" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/executive-search-firms" className="text-orange-100 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Executive Search Firms</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-orange-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">Interim Search</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">Interim<br /><span className="text-orange-200">Executive Search</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-orange-50 leading-relaxed font-light mb-6 sm:mb-10">Find <strong>interim executive search firms</strong> for temporary C-suite placements. Specialist <strong>interim recruiters</strong> for CFO, CTO, CMO, and CEO roles. Fast placement in 2-4 weeks.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">£1,000-2,500</div><div className="text-orange-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Day Rate Range</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">2-4 Weeks</div><div className="text-orange-100 text-xs sm:text-sm uppercase tracking-wider mt-1">To Place</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">15-25%</div><div className="text-orange-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"><span>📅</span> Book a Free Call</a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-orange-700 text-white font-bold uppercase tracking-wider hover:bg-orange-800 transition-colors border border-orange-500">View Interim Recruiters</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10"><a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a></div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-orange-600 mb-1 sm:mb-2">15-25%</div><div className="text-gray-600 text-xs sm:text-sm">Interim Recruiter Fees</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-orange-600 mb-1 sm:mb-2">3-12 Months</div><div className="text-gray-600 text-xs sm:text-sm">Typical Engagement</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-orange-600 mb-1 sm:mb-2">1-2 Weeks</div><div className="text-gray-600 text-xs sm:text-sm">Time to Start</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-orange-600 mb-1 sm:mb-2">Full-Time</div><div className="text-gray-600 text-xs sm:text-sm">Commitment Level</div></div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3 block">Featured Interim Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse Interim Executive Opportunities</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the <strong>interim executive search</strong> fees and connect with temporary leadership opportunities directly.</p>
          </div>
          <EmbeddedJobBoard title="Interim Executive Roles" accentColor="orange" jobsPerPage={6} />
        </div>
      </section>

      {/* What is Interim Executive Search */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=800&fit=crop&q=80" alt="Executive boardroom" fill className="object-cover opacity-[0.03]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is Interim Executive Search?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed"><strong>Interim executive search</strong> is a recruitment service for temporary C-suite and senior leadership positions. Unlike permanent executive search, <strong>interim executive search firms</strong> focus on experienced leaders who can start quickly and deliver results in defined timeframes.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">The best <strong>interim executive search firms</strong> maintain networks of proven executives ready to deploy for urgent needs. These interim professionals have typically held multiple C-suite roles and specialise in transformation, turnaround, or crisis management.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">An <strong>interim recruiter</strong> will assess candidates for their ability to deliver impact quickly - typically interim executives have 2-4 weeks to understand the business and begin driving change. They must combine strategic capability with hands-on execution.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use Interim Executive Search?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 border-l-4 border-orange-500 hover:shadow-md transition-shadow">
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
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Top Agencies</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Best Interim Executive Search Firms</h2>
            <p className="text-base sm:text-xl text-gray-600">Compare specialist <strong>interim executive recruiters</strong> for temporary C-suite placements.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAgencies.map((agency, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-orange-500 transition-colors p-6 sm:p-8 hover:shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{agency.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 text-xs font-medium">{agency.speciality}</span>
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Interim Executive Search Questions</h2>
          </div>
          <FAQ skipSchema items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/fractional-executive-search" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-orange-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Executive Search</div></Link>
            <Link href="/executive-search-firms" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-orange-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔍</div><div className="font-medium text-gray-900 text-sm sm:text-base">Executive Search Firms</div></Link>
            <Link href="/interim-cfo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-orange-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💰</div><div className="font-medium text-gray-900 text-sm sm:text-base">Interim CFO Jobs</div></Link>
            <Link href="/interim-cto-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-orange-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💻</div><div className="font-medium text-gray-900 text-sm sm:text-base">Interim CTO Jobs</div></Link>
            <Link href="/interim-cmo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-orange-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📢</div><div className="font-medium text-gray-900 text-sm sm:text-base">Interim CMO Jobs</div></Link>
            <Link href="/interim-ceo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-orange-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">👔</div><div className="font-medium text-gray-900 text-sm sm:text-base">Interim CEO Jobs</div></Link>
            <Link href="/cfo-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-orange-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📊</div><div className="font-medium text-gray-900 text-sm sm:text-base">CFO Recruitment</div></Link>
            <Link href="/fractional-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-orange-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Recruitment</div></Link>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <HeyCompanies />

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">⚡</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the Interim Recruiter Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-orange-100 mb-8 sm:mb-10 font-light">Get free interim hiring advice and access our network of vetted C-suite professionals directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"><span className="text-xl sm:text-2xl">📅</span><span>Book Your Free Call</span></a>
            <Link href="/interim-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-orange-700 text-white text-base sm:text-lg font-bold hover:bg-orange-800 transition-colors border border-orange-400">Browse Interim Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <main>
      {pageContent}
    </main>
  );
}
