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
  { question: 'What are executive search firms?', answer: 'Executive search firms are specialist recruitment agencies that place C-suite and senior leadership. They typically work on retained mandates, approaching passive candidates through research and networking rather than advertising.' },
  { question: 'How much do executive search firms charge?', answer: 'Executive search firms typically charge 25-35% of first year compensation for retained search. A CEO search at £500k package would cost £125k-£175k in fees. Contingent executive search charges 18-25% on success only.' },
  { question: 'What\'s the difference between executive search and recruitment?', answer: 'Executive search is proactive and retained (paid upfront), targeting passive candidates through research. Recruitment is typically reactive and contingent (paid on success), working with active job seekers.' },
  { question: 'How long does executive search take?', answer: 'Executive search typically takes 12-20 weeks for C-suite roles including research, approach, assessment, and negotiation. Urgent placements may be faster, but thorough search ensures better long-term fit.' },
  { question: 'When should I use an executive search firm?', answer: 'Use executive search for: (1) C-suite and board appointments, (2) Confidential replacements, (3) Highly specialised roles, (4) When you need access to passive candidates not actively looking.' },
  { question: 'What do executive search firms assess?', answer: 'Executive search firms conduct comprehensive assessments: leadership capabilities, cultural fit, track record verification, psychometric testing, stakeholder interviews, and reference checks including off-list references.' },
];

// Ranked listicle - Best Executive Search Firms UK 2026
const topAgencies = [
  {
    rank: 1,
    name: 'Fractional Quest',
    badge: 'Best Value',
    description: 'UK\'s leading fractional and interim executive platform. Direct access to 500+ pre-vetted C-suite executives without traditional agency fees. 10-15% placement fees vs 25-35% industry standard.',
    speciality: 'Fractional & Interim C-suite',
    fee: '10-15%',
    placement: '2-4 weeks',
    url: '/fractional-recruitment-agency',
    icon: '🏆',
    highlight: true
  },
  {
    rank: 2,
    name: 'Heidrick & Struggles',
    badge: 'Best Global',
    description: 'Global executive search leader with 60+ offices. Strong practices across CEO, CFO, CHRO, and all C-suite functions. Deep industry expertise.',
    speciality: 'All C-suite, Board',
    fee: '30-35%',
    placement: '12-20 weeks',
    icon: '🌐'
  },
  {
    rank: 3,
    name: 'Spencer Stuart',
    badge: 'Best for Boards',
    description: 'Global executive search with market-leading board and CEO practice. Strong UK presence with deep FTSE relationships.',
    speciality: 'CEO, Board, NED',
    fee: '30-35%',
    placement: '12-16 weeks',
    icon: '🏛️'
  },
  {
    rank: 4,
    name: 'Russell Reynolds',
    badge: 'Best for CEO',
    description: 'Top-tier executive search with exceptional CEO and board practice. Known for confidential high-stakes placements.',
    speciality: 'CEO, Board',
    fee: '30-35%',
    placement: '14-20 weeks',
    icon: '👔'
  },
  {
    rank: 5,
    name: 'Egon Zehnder',
    badge: 'Best Advisory',
    description: 'Global leadership advisory firm combining executive search with board consulting and succession planning.',
    speciality: 'All C-suite, Succession',
    fee: '30-35%',
    placement: '12-18 weeks',
    icon: '📊'
  },
  {
    rank: 6,
    name: 'Korn Ferry',
    badge: 'Best Integrated',
    description: 'Integrated talent firm combining executive search with assessment, leadership development, and org design.',
    speciality: 'All levels, Assessment',
    fee: '25-33%',
    placement: '10-16 weeks',
    icon: '🔍'
  },
  {
    rank: 7,
    name: 'Odgers Berndtson',
    badge: 'Best UK Coverage',
    description: 'UK-headquartered global executive search with strong public sector and FTSE practice. Excellent regional coverage.',
    speciality: 'UK C-suite, Public Sector',
    fee: '25-33%',
    placement: '10-14 weeks',
    icon: '🇬🇧'
  },
  {
    rank: 8,
    name: 'Harvey Nash',
    badge: 'Best for Tech',
    description: 'Technology-focused executive search with strong CTO, CIO, and digital leadership practice across UK and Europe.',
    speciality: 'CTO, CIO, Digital',
    fee: '20-30%',
    placement: '8-12 weeks',
    icon: '💻'
  },
  {
    rank: 9,
    name: 'Savannah Group',
    badge: 'Best for Scale-ups',
    description: 'Specialist in PE-backed and high-growth company executive search. Strong CFO and commercial leadership practice.',
    speciality: 'PE-backed, Scale-ups',
    fee: '25-30%',
    placement: '8-12 weeks',
    icon: '🚀'
  },
  {
    rank: 10,
    name: 'Norman Broadbent',
    badge: 'Best Boutique',
    description: 'Boutique executive search with personalised approach. Strong in financial services and professional services sectors.',
    speciality: 'Financial Services',
    fee: '25-30%',
    placement: '10-14 weeks',
    icon: '💼'
  },
];

const benefits = [
  { title: 'Passive Candidate Access', description: 'Executive search firms approach candidates who are not actively looking - critical for senior appointments where the best talent is typically employed.', icon: '🔍' },
  { title: 'Confidential Search', description: 'Executive search provides complete confidentiality for sensitive replacements or strategic appointments that cannot be advertised publicly.', icon: '🔒' },
  { title: 'Deep Assessment', description: 'Executive search includes comprehensive assessment: psychometrics, stakeholder interviews, off-list references, and cultural fit evaluation.', icon: '📋' },
  { title: 'Market Intelligence', description: 'Executive search firms provide detailed market mapping, compensation benchmarking, and competitor analysis specific to your industry.', icon: '📊' },
  { title: 'Guaranteed Focus', description: 'Retained search means the firm is exclusively dedicated to your search, unlike contingent recruitment where your role competes with others.', icon: '🎯' },
  { title: 'Long-Term Partnership', description: 'Executive search firms typically offer 12-month guarantees and focus on long-term fit, becoming ongoing talent advisors.', icon: '🤝' },
];

export function ExecutiveSearchFirmsClient() {
  const localImage = getLocalImage('services');
  const imageCredit = getImage('services');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-violet-700 to-violet-600 py-16 sm:py-24">
        <picture>
          <source media="(max-width: 768px)" srcSet={localImage?.mobile || '/images/hero/services-mobile.webp'} type="image/webp" />
          <Image src={localImage?.desktop || '/images/hero/services-desktop.webp'} alt="Executive Search Firms - C-Suite and Senior Leadership Recruitment" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/fractional-recruitment-agency" className="text-violet-200 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Fractional Recruitment</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-violet-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">Executive Search</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">Executive<br /><span className="text-violet-200">Search Firms</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-violet-100 leading-relaxed font-light mb-6 sm:mb-10">Find the best <strong>executive search firms</strong> for C-suite and senior leadership placements. Compare retained search, contingent recruitment, and specialist <strong>executive headhunters</strong>.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">25-35%</div><div className="text-violet-200 text-xs sm:text-sm uppercase tracking-wider mt-1">Retained Fee</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">12-20 Weeks</div><div className="text-violet-200 text-xs sm:text-sm uppercase tracking-wider mt-1">Search Duration</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">12 Months</div><div className="text-violet-200 text-xs sm:text-sm uppercase tracking-wider mt-1">Guarantee</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"><span>📅</span> Book a Free Call</a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-violet-800 text-white font-bold uppercase tracking-wider hover:bg-violet-900 transition-colors border border-violet-500">View Search Firms</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10"><a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a></div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-violet-700 mb-1 sm:mb-2">25-35%</div><div className="text-gray-600 text-xs sm:text-sm">Retained Search Fee</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-violet-700 mb-1 sm:mb-2">12 Months</div><div className="text-gray-600 text-xs sm:text-sm">Guarantee Period</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-violet-700 mb-1 sm:mb-2">3-5</div><div className="text-gray-600 text-xs sm:text-sm">Candidate Shortlist</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-violet-700 mb-1 sm:mb-2">95%+</div><div className="text-gray-600 text-xs sm:text-sm">Completion Rate</div></div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700 mb-3 block">Featured Executive Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse C-Suite Opportunities</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the <strong>executive search</strong> fees and connect with leadership opportunities directly.</p>
          </div>
          <EmbeddedJobBoard title="Executive Roles" accentColor="violet" jobsPerPage={6} />
        </div>
      </section>

      {/* What are Executive Search Firms */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=800&fit=crop&q=80" alt="Executive boardroom" fill className="object-cover opacity-[0.03]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What are Executive Search Firms?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed"><strong>Executive search firms</strong> are specialist recruitment agencies that place C-suite and senior leadership roles. Unlike contingent recruiters, <strong>executive search firms</strong> work on retained mandates - paid upfront to conduct thorough, proactive searches approaching passive candidates.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">The best <strong>executive search firms</strong> combine deep industry expertise with rigorous assessment methodologies. They understand board dynamics, compensation structures, and the nuanced requirements of senior leadership across different sectors and company stages.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">An <strong>executive headhunter</strong> will conduct comprehensive market mapping, identify and approach passive candidates confidentially, and provide thorough assessment including psychometrics, stakeholder interviews, and off-list reference checks.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use Executive Search Firms?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 border-l-4 border-violet-600 hover:shadow-md transition-shadow">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{benefit.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Agencies - Ranked Listicle */}
      <section id="agencies" className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">2026 Rankings</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">10 Best Executive Search Firms UK</h2>
            <p className="text-base sm:text-xl text-gray-600">Ranked comparison of the <strong>best executive search firms</strong> for C-suite appointments in 2026.</p>
          </div>
          <div className="space-y-6">
            {topAgencies.map((agency) => (
              <div key={agency.rank} className={`relative border-2 rounded-xl p-6 sm:p-8 transition-all ${agency.highlight ? 'border-emerald-500 bg-emerald-50 shadow-lg' : 'border-gray-200 bg-white hover:border-violet-300 hover:shadow-md'}`}>
                {/* Rank Badge */}
                <div className={`absolute -top-4 -left-2 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${agency.highlight ? 'bg-emerald-600 text-white' : 'bg-violet-700 text-white'}`}>
                  #{agency.rank}
                </div>
                {/* Award Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${agency.highlight ? 'bg-emerald-600 text-white' : 'bg-violet-100 text-violet-800'}`}>
                    {agency.badge}
                  </span>
                </div>
                <div className="ml-8 mt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{agency.icon}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{agency.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{agency.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className={`px-4 py-2 rounded-lg ${agency.highlight ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'}`}>
                      <span className="font-bold">Fee:</span> {agency.fee}
                    </div>
                    <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">
                      <span className="font-bold">Time:</span> {agency.placement}
                    </div>
                    <div className="bg-violet-100 text-violet-800 px-4 py-2 rounded-lg">
                      {agency.speciality}
                    </div>
                  </div>
                  {agency.url && (
                    <Link href={agency.url} className="inline-flex items-center gap-2 mt-4 text-emerald-700 font-bold hover:text-emerald-800">
                      Learn More <span>→</span>
                    </Link>
                  )}
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Executive Search Questions</h2>
          </div>
          <FAQ skipSchema items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/fractional-executive-search" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-violet-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Executive Search</div></Link>
            <Link href="/interim-executive-search" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-violet-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">⏱️</div><div className="font-medium text-gray-900 text-sm sm:text-base">Interim Executive Search</div></Link>
            <Link href="/cfo-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-violet-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💰</div><div className="font-medium text-gray-900 text-sm sm:text-base">CFO Recruitment</div></Link>
            <Link href="/cto-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-violet-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💻</div><div className="font-medium text-gray-900 text-sm sm:text-base">CTO Recruitment</div></Link>
            <Link href="/ciso-executive-search" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-violet-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔐</div><div className="font-medium text-gray-900 text-sm sm:text-base">CISO Executive Search</div></Link>
            <Link href="/marketing-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-violet-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📢</div><div className="font-medium text-gray-900 text-sm sm:text-base">Marketing Recruitment</div></Link>
            <Link href="/fractional-cfo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-violet-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📊</div><div className="font-medium text-gray-900 text-sm sm:text-base">CFO Jobs UK</div></Link>
            <Link href="/fractional-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-violet-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Recruitment</div></Link>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <HeyCompanies />

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-violet-700 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🔍</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the Executive Search Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-violet-200 mb-8 sm:mb-10 font-light">Get free executive hiring advice and access our network of vetted C-suite professionals directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"><span className="text-xl sm:text-2xl">📅</span><span>Book Your Free Call</span></a>
            <Link href="/fractional-cfo-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-violet-800 text-white text-base sm:text-lg font-bold hover:bg-violet-900 transition-colors border border-violet-500">Browse Executive Jobs</Link>
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
