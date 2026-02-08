"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FAQItem } from "@/components/seo";
import { getLocalImage, getImage } from '@/lib/images';

const EmbeddedJobBoard = dynamic(() => import("@/components/EmbeddedJobBoard").then(mod => ({ default: mod.EmbeddedJobBoard })), { ssr: false, loading: () => <div className="animate-pulse bg-gray-100 rounded-xl h-96" /> });
const FAQ = dynamic(() => import("@/components/seo").then(mod => ({ default: mod.FAQ })), { ssr: false });

const CALENDLY_URL = 'https://calendly.com/firstquest/quest';

const faqItems: FAQItem[] = [
  { question: 'What is fractional executive search?', answer: 'Fractional executive search is a recruitment service for part-time C-suite and senior leadership positions. Fractional executives work 1-3 days per week ongoing, providing experienced leadership at a fraction of full-time cost.' },
  { question: 'How much does fractional executive search cost?', answer: 'Fractional executive search fees typically range from 15-25% of expected first year billings. For a fractional CFO at £1,200/day working 2 days/week (104 days), expect fees of £15,000-£30,000.' },
  { question: 'How is fractional different from interim executive search?', answer: 'Fractional executives work part-time (1-3 days/week) ongoing. Interim executives work full-time for a fixed period. Use fractional for ongoing strategic leadership; interim for temporary full-focus needs.' },
  { question: 'How long does fractional executive search take?', answer: 'Fractional executive placements typically take 2-4 weeks for common roles (CFO, CTO, CMO). Specialist fractional recruiters with established networks can present candidates quickly.' },
  { question: 'What roles work well as fractional?', answer: 'Best fractional roles: CFO (1-2 days), CMO (2-3 days), CTO (2-3 days), CHRO (1-2 days). Less suited: CEO (usually needs more presence), COO (operational roles need more time).' },
  { question: 'What day rates do fractional executives charge?', answer: 'Fractional executive day rates: CFO £1,000-£1,500/day, CTO £850-£1,400/day, CMO £700-£1,200/day, COO £800-£1,300/day. Rates depend on experience, sector, and company stage.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'Browse fractional executive roles directly. No agency fees - connect with part-time C-suite candidates.', speciality: 'Fractional C-suite', model: 'Job board', icon: '🎯' },
  { name: 'The Fractional CFO', description: 'Specialist fractional finance recruitment with strong CFO and FD network.', speciality: 'Fractional CFO', model: 'Contingent', icon: '💰' },
  { name: 'The Portfolio Collective', description: 'Community and recruitment for portfolio careers including fractional executives.', speciality: 'Portfolio/Fractional', model: 'Community', icon: '👥' },
  { name: 'Heidrick & Struggles', description: 'Global executive search with growing fractional and portfolio practice.', speciality: 'All C-suite', model: 'Retained', icon: '🌐' },
  { name: 'Russam', description: 'Established interim and fractional provider with strong C-suite network.', speciality: 'Fractional/Interim', model: 'Contingent', icon: '🔄' },
  { name: 'Odgers Berndtson', description: 'Global executive search with emerging fractional leadership practice.', speciality: 'All C-suite', model: 'Retained', icon: '👔' },
];

const benefits = [
  { title: 'Cost Efficiency', description: 'Fractional executive search provides access to senior leadership at 20-40% of full-time cost. Get experienced C-suite talent without full-time overhead.', icon: '💰' },
  { title: 'Flexible Engagement', description: 'Fractional arrangements scale up or down as needed. Start with one day per week and increase if the business requires more leadership time.', icon: '📊' },
  { title: 'Specialist Expertise', description: 'Fractional executive search firms maintain networks of executives who have chosen portfolio careers - specialists in their functions with multi-company experience.', icon: '🎯' },
  { title: 'Speed to Value', description: 'Fractional executive placements are typically faster than permanent search - 2-4 weeks vs 12-20 weeks for retained executive search.', icon: '⚡' },
  { title: 'Low Commitment', description: 'Fractional arrangements can be ended with short notice. No redundancy costs, no long notice periods - maximum flexibility.', icon: '📋' },
  { title: 'Proven Experience', description: 'Fractional executives bring experience from multiple companies. They have seen what works and what does not across different contexts.', icon: '✅' },
];

export function FractionalExecutiveSearchClient() {
  const localImage = getLocalImage('services');
  const imageCredit = getImage('services');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-teal-600 to-teal-500 py-16 sm:py-24">
        <picture>
          <source media="(max-width: 768px)" srcSet={localImage?.mobile || '/images/hero/services-mobile.webp'} type="image/webp" />
          <Image src={localImage?.desktop || '/images/hero/services-desktop.webp'} alt="Fractional Executive Search - Part-Time C-Suite Recruitment" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/executive-search-firms" className="text-teal-100 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Executive Search Firms</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-teal-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">Fractional Search</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">Fractional<br /><span className="text-teal-200">Executive Search</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-teal-50 leading-relaxed font-light mb-6 sm:mb-10">Find <strong>fractional executive search firms</strong> for part-time C-suite placements. Specialist <strong>fractional recruiters</strong> for CFO, CTO, CMO, and COO roles working 1-3 days per week.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">£700-1,500</div><div className="text-teal-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Day Rate Range</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">2-4 Weeks</div><div className="text-teal-100 text-xs sm:text-sm uppercase tracking-wider mt-1">To Place</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">15-25%</div><div className="text-teal-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"><span>📅</span> Book a Free Call</a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-teal-700 text-white font-bold uppercase tracking-wider hover:bg-teal-800 transition-colors border border-teal-500">View Fractional Recruiters</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10"><a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a></div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-teal-600 mb-1 sm:mb-2">15-25%</div><div className="text-gray-600 text-xs sm:text-sm">Fractional Recruiter Fees</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-teal-600 mb-1 sm:mb-2">1-3 Days</div><div className="text-gray-600 text-xs sm:text-sm">Per Week Commitment</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-teal-600 mb-1 sm:mb-2">20-40%</div><div className="text-gray-600 text-xs sm:text-sm">Cost vs Full-Time</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-teal-600 mb-1 sm:mb-2">Ongoing</div><div className="text-gray-600 text-xs sm:text-sm">Engagement Model</div></div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 mb-3 block">Featured Fractional Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse Fractional Executive Opportunities</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the <strong>fractional executive search</strong> fees and connect with part-time leadership opportunities directly.</p>
          </div>
          <EmbeddedJobBoard title="Fractional Executive Roles" accentColor="teal" jobsPerPage={6} />
        </div>
      </section>

      {/* What is Fractional Executive Search */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=800&fit=crop&q=80" alt="Executive meeting" fill className="object-cover opacity-[0.03]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is Fractional Executive Search?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed"><strong>Fractional executive search</strong> is a recruitment service for part-time C-suite and senior leadership positions. Unlike full-time executive search, <strong>fractional executive search firms</strong> focus on experienced leaders who work 1-3 days per week across multiple companies.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">The best <strong>fractional executive search firms</strong> maintain networks of executives who have deliberately chosen portfolio careers. These are typically highly experienced professionals who prefer variety and flexibility over single-company employment.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">A specialist <strong>fractional recruiter</strong> will assess candidates for their ability to deliver impact in limited time. Fractional executives must be highly efficient, quickly understand business context, and drive results without the luxury of full-time presence.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use Fractional Executive Search?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 border-l-4 border-teal-500 hover:shadow-md transition-shadow">
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Best Fractional Executive Search Firms</h2>
            <p className="text-base sm:text-xl text-gray-600">Compare specialist <strong>fractional recruiters</strong> for part-time C-suite placements.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAgencies.map((agency, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-teal-500 transition-colors p-6 sm:p-8 hover:shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{agency.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-teal-100 text-teal-800 px-3 py-1 text-xs font-medium">{agency.speciality}</span>
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Fractional Executive Search Questions</h2>
          </div>
          <FAQ skipSchema items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/interim-executive-search" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-teal-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">⏱️</div><div className="font-medium text-gray-900 text-sm sm:text-base">Interim Executive Search</div></Link>
            <Link href="/executive-search-firms" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-teal-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔍</div><div className="font-medium text-gray-900 text-sm sm:text-base">Executive Search Firms</div></Link>
            <Link href="/fractional-cfo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-teal-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💰</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional CFO Jobs</div></Link>
            <Link href="/fractional-cto-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-teal-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💻</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional CTO Jobs</div></Link>
            <Link href="/fractional-cmo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-teal-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📢</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional CMO Jobs</div></Link>
            <Link href="/cfo-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-teal-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📊</div><div className="font-medium text-gray-900 text-sm sm:text-base">CFO Recruitment</div></Link>
            <Link href="/cto-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-teal-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔧</div><div className="font-medium text-gray-900 text-sm sm:text-base">CTO Recruitment</div></Link>
            <Link href="/" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-teal-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Recruitment</div></Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-teal-600 to-teal-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🎯</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the Fractional Recruiter Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-teal-100 mb-8 sm:mb-10 font-light">Get free fractional hiring advice and access our network of vetted part-time executives directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"><span className="text-xl sm:text-2xl">📅</span><span>Book Your Free Call</span></a>
            <Link href="/fractional-cfo-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-teal-700 text-white text-base sm:text-lg font-bold hover:bg-teal-800 transition-colors border border-teal-400">Browse Fractional Jobs</Link>
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
