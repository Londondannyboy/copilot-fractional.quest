"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FAQItem } from "@/components/seo";
import { getLocalImage, getImage } from '@/lib/images';
import { LazyYouTube } from "@/components/LazyYouTube";
import { HeyCompanies } from "@/components/HeyCompanies";

// Authority links for external credibility (news + professional bodies)
// BBC and Wikipedia first for maximum authority signals
const authorityLinks = [
  { name: 'BBC News', url: 'https://www.bbc.co.uk/news/articles/c1klry2rjm0o', description: 'UK graduate employment crisis' },
  { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Fractional_work', description: 'Fractional work definition' },
  { name: 'REC', url: 'https://www.rec.uk.com/', description: 'Recruitment & Employment Confederation' },
  { name: 'CIPD', url: 'https://www.cipd.org/', description: 'Chartered Institute of Personnel and Development' },
  { name: 'ICAEW', url: 'https://www.icaew.com/', description: 'Institute of Chartered Accountants' },
  { name: 'BVCA', url: 'https://www.bvca.co.uk/', description: 'British Private Equity & Venture Capital' },
];

// Extended authority sources for in-content citations
const extendedAuthoritySources = [
  { name: 'BBC News', url: 'https://www.bbc.co.uk/news/articles/c1klry2rjm0o', context: 'UK graduate employment crisis - driving demand for experienced fractional talent' },
  { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Fractional_work', context: 'Fractional work definition and background' },
  { name: 'Centre for Social Justice', url: 'https://www.centreforsocialjustice.org.uk/', context: '700,000+ graduates claiming benefits' },
  { name: 'World Economic Forum', url: 'https://www.weforum.org/', context: 'Gen Z labour market pressures globally' },
  { name: 'Universities UK', url: 'https://www.universitiesuk.ac.uk/', context: 'Graduate employment outcomes research' },
  { name: 'ICAEW', url: 'https://www.icaew.com/', context: 'Chartered accountancy standards' },
  { name: 'ACCA', url: 'https://www.accaglobal.com/', context: 'Global accountancy body' },
  { name: 'CIPD', url: 'https://www.cipd.org/', context: 'HR and people development standards' },
  { name: 'REC', url: 'https://www.rec.uk.com/', context: 'UK recruitment industry standards' },
  { name: 'APM', url: 'https://www.apm.org.uk/', context: 'Project management profession' },
  { name: 'BCS', url: 'https://www.bcs.org/', context: 'Chartered Institute for IT' },
  { name: 'CIM', url: 'https://www.cim.co.uk/', context: 'Chartered Institute of Marketing' },
  { name: 'BVCA', url: 'https://www.bvca.co.uk/', context: 'Private equity industry body' },
  { name: 'FCA', url: 'https://www.fca.org.uk/', context: 'Financial services regulation' },
];

// Table of contents sections - expanded
const tocSections = [
  { id: 'overview', label: 'What is a Fractional Recruitment Agency?' },
  { id: 'market-context', label: 'UK Market Context' },
  { id: 'benefits', label: 'Benefits of Using a Recruiter' },
  { id: 'fq-vs-traditional', label: 'Fractional Quest vs Traditional' },
  { id: 'agencies', label: 'Top Fractional Recruiters' },
  { id: 'comparison', label: 'Direct Hire vs Agency' },
  { id: 'faq', label: 'FAQs' },
];

// Fractional Quest vs Traditional Agencies comparison
const fqVsTraditionalComparison = [
  { feature: 'Placement Fee', fractionalQuest: '10-15%', traditional: '25-30%', winner: 'fq' },
  { feature: 'Time to First Candidates', fractionalQuest: '48 hours', traditional: '2-3 weeks', winner: 'fq' },
  { feature: 'Average Time to Hire', fractionalQuest: '2-4 weeks', traditional: '8-12 weeks', winner: 'fq' },
  { feature: 'Replacement Guarantee', fractionalQuest: '90 days', traditional: '30-60 days', winner: 'fq' },
  { feature: 'Fractional Specialism', fractionalQuest: '100% fractional focus', traditional: 'Sideline service', winner: 'fq' },
  { feature: 'Candidate Network', fractionalQuest: '500+ vetted executives', traditional: 'Varies widely', winner: 'fq' },
  { feature: 'IR35 Expertise', fractionalQuest: 'Built-in compliance', traditional: 'Often outsourced', winner: 'fq' },
  { feature: 'Retainer Required', fractionalQuest: 'No retainer', traditional: 'Usually required', winner: 'fq' },
];

// Lazy-load below-fold components to reduce initial JS execution
const EmbeddedJobBoard = dynamic(
  () => import("@/components/EmbeddedJobBoard").then(mod => ({ default: mod.EmbeddedJobBoard })),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-gray-100 rounded-xl h-96 flex items-center justify-center">
        <span className="text-gray-400">Loading jobs...</span>
      </div>
    )
  }
);

const FAQ = dynamic(
  () => import("@/components/seo").then(mod => ({ default: mod.FAQ })),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse space-y-4">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="bg-gray-100 rounded-lg h-16" />
        ))}
      </div>
    )
  }
);

const CALENDLY_URL = 'https://calendly.com/firstquest/quest';

const faqItems: FAQItem[] = [
  { question: 'What is a fractional recruitment agency?', answer: 'A fractional recruitment agency specialises in placing part-time, interim, and fractional executives with companies. Unlike traditional recruiters who focus on full-time permanent hires, a specialist fractional recruiter understands the fractional model, day rates, and how to match executives with multiple clients.' },
  { question: 'How much do fractional recruiters charge?', answer: 'Fees typically range from 15-25% of the first year\'s expected billings (based on agreed days × day rate × 52 weeks). Some fractional recruitment agencies charge flat fees of £5,000-£15,000 per placement. Retained search for senior roles may cost £15,000-£30,000.' },
  { question: 'What\'s the difference between a fractional recruiter and a traditional recruiter?', answer: 'A fractional recruiter understands part-time executive work, IR35 implications, day rate negotiations, and multi-client relationships. Traditional recruiters often push for full-time placements and may not understand fractional contract structures or portfolio career dynamics.' },
  { question: 'How long does it take to find a fractional executive through an agency?', answer: 'Typically 2-4 weeks for common roles (CFO, CMO, CTO) and 4-8 weeks for specialist positions. Fractional recruitment agencies with established networks can often present shortlisted candidates within days.' },
  { question: 'Should I use a fractional recruiter or hire directly?', answer: 'Use a fractional recruiter if you need speed, don\'t have time to source, want pre-vetted candidates, or need a specialist role. Hire directly if you have strong networks, want to save fees, or are hiring for a common role where you can easily assess quality yourself.' },
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

  // Use local images for faster loading (served from Vercel CDN)
  const localImage = getLocalImage('services');
  const imageCredit = getImage('services');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-emerald-600 to-emerald-500 py-24">
        {/* Responsive hero image: mobile (800w) for phones, desktop (1920w) for larger screens - WebP format */}
        {/* Image names include target keywords for SEO */}
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={localImage?.mobile || '/images/hero/fractional-recruitment-agency-mobile.webp'}
            type="image/webp"
          />
          <Image
            src={localImage?.desktop || '/images/hero/fractional-recruitment-agency-desktop.webp'}
            alt="Fractional Recruitment Agency UK - Specialist fractional recruiters for CFO, CTO, CMO executive placements"
            title="Fractional Recruitment Agency - Expert Fractional Recruiter Services UK"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <Link href="/fractional-jobs-uk" className="text-emerald-100 hover:text-white mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Back to Fractional Jobs UK</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-emerald-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Guide</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight">Fractional<br /><span className="text-emerald-200">Recruitment Agency</span></h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-emerald-50 leading-relaxed font-light mb-8 sm:mb-10">Find the best <strong>fractional recruitment agencies</strong> and connect with a specialist <strong>fractional recruiter</strong>. Compare experts in CFO, CTO, CMO, and C-suite placements.</p>
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">Need to Hire a Fractional Executive?</h2>
              <p className="text-lg sm:text-xl text-white/90 mb-6">Skip the <strong>fractional recruiter</strong> fees. Talk directly with Dan Keegan, founder of Fractional Quest, for free hiring advice and access to our vetted network of fractional executives.</p>
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
                  <div className="text-white/80 text-sm">Save 15-25% vs traditional fractional recruiters</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals - Clients */}
      <section className="bg-white border-b py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-6">Clients include</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 mb-8">
            {/* OneUp Productions - Real Client Logo */}
            <div className="flex items-center justify-center">
              <Image
                src="/1UP productions logo.jpg"
                alt="OneUp Productions - Fractional Quest Client"
                width={120}
                height={40}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            {/* Placeholder for more client logos */}
            <div className="text-center px-4 py-2 border border-dashed border-gray-300 rounded-lg">
              <div className="text-xs text-gray-400 font-medium">More clients<br/>coming soon</div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-6">Working with</p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            <div className="text-center">
              <div className="text-2xl mb-1">🚀</div>
              <div className="text-xs text-gray-600 font-medium">VC-Backed<br/>Startups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🏢</div>
              <div className="text-xs text-gray-600 font-medium">PE Portfolio<br/>Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">📈</div>
              <div className="text-xs text-gray-600 font-medium">Scale-ups<br/>£2M-50M</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🏛️</div>
              <div className="text-xs text-gray-600 font-medium">SME<br/>Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">💼</div>
              <div className="text-xs text-gray-600 font-medium">Family<br/>Offices</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🌐</div>
              <div className="text-xs text-gray-600 font-medium">International<br/>Corporates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-emerald-700 mb-1 sm:mb-2">200+</div><div className="text-gray-600 text-xs sm:text-sm">Vetted Executives</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-emerald-700 mb-1 sm:mb-2">10-15%</div><div className="text-gray-600 text-xs sm:text-sm">Our Fee vs 25%+</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-emerald-700 mb-1 sm:mb-2">2 Weeks</div><div className="text-gray-600 text-xs sm:text-sm">Avg. Time to Hire</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-emerald-700 mb-1 sm:mb-2">95%+</div><div className="text-gray-600 text-xs sm:text-sm">Client Satisfaction</div></div>
          </div>
        </div>
      </section>

      {/* Embedded Job Board - MOVED UP for engagement */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-3 block">Featured Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse Executive Jobs</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the fractional recruiter and connect with opportunities directly on Fractional Quest.</p>
          </div>
          <EmbeddedJobBoard title="Fractional Executive Roles" accentColor="emerald" jobsPerPage={6} />
        </div>
      </section>

      {/* Table of Contents - Mobile Only (sticky sidebar on desktop) */}
      <section className="lg:hidden bg-gray-50 border-b py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">On This Page</h3>
          <nav className="flex flex-wrap gap-2">
            {tocSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* What is a Fractional Recruitment Agency */}
      <section id="overview" className="relative py-20 sm:py-24 bg-white overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=800&fit=crop&q=80"
            alt="Professional fractional recruitment agency meeting with executive candidates"
            fill
            className="object-cover opacity-[0.03]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="mb-12 sm:mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a Fractional Recruitment Agency?</h2>
              </div>
              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  A <strong>fractional recruitment agency</strong> specialises in placing part-time, interim, and fractional executives with businesses. A <strong>fractional recruiter</strong> understands the unique dynamics of the fractional model, unlike traditional executive recruiters who focus primarily on full-time permanent placements.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  These specialist fractional recruiters know how to assess candidates who work with multiple clients, understand day rate structures and IR35 compliance, and can match executives to companies based on time commitment requirements (1-3 days per week rather than full-time).
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  The <strong>fractional recruitment agency</strong> market has grown significantly since 2020, with more agencies and independent fractional recruiters now offering specialist services alongside traditional interim and permanent search.
                </p>
              </div>

              {/* Video: What is Fractional Recruitment */}
              <div className="mt-12 not-prose">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Understanding the Recruitment Model</h3>
                <LazyYouTube
                  videoId="V-x6RAOEftk"
                  title="What is Fractional Recruitment? Understanding the Fractional Recruiter Model"
                />
                <p className="text-gray-500 text-sm mt-3">Video: Understanding how <strong>fractional recruitment agencies</strong> and <strong>fractional recruiters</strong> work</p>
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

            {/* Sticky Sidebar - Desktop Only */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Book a Call Widget */}
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-lg">
                  <div className="text-3xl mb-3">📅</div>
                  <h3 className="text-xl font-bold mb-2">Book a Free Call</h3>
                  <p className="text-emerald-100 text-sm mb-4">Get personalised advice on hiring a fractional executive. No agency fees.</p>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-3 bg-white text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Schedule Call →
                  </a>
                </div>

                {/* Table of Contents */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">On This Page</h4>
                  <nav className="space-y-2">
                    {tocSections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        {section.label}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Authority Links */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Professional Bodies</h4>
                  <div className="space-y-2">
                    {authorityLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm text-gray-600 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-white transition-colors group"
                      >
                        <span>{link.name}</span>
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">Trusted industry resources</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* UK Market Context Section - NEW for skyscraper approach */}
      <section id="market-context" className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3 block">Market Context</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">Why Fractional Recruitment is Booming</h2>
            <p className="text-lg text-gray-300">The UK&apos;s employment landscape is shifting. Here&apos;s why more companies are turning to fractional executives and specialist recruitment agencies.</p>
          </div>

          {/* BBC News Citation + Stats */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">BBC</span>
                </div>
                <div>
                  <a href="https://www.bbc.co.uk/news/articles/c1klry2rjm0o" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-white hover:text-emerald-400 transition-colors">UK Graduate Employment Crisis</a>
                  <p className="text-gray-400 text-sm mt-1">BBC News, 2025</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                With <strong className="text-white">700,000+ graduates</strong> out of work and claiming benefits, UK companies are increasingly turning to experienced fractional executives rather than entry-level hires for critical leadership roles.
              </p>
              <p className="text-gray-400 text-sm">
                Source: <a href="https://www.centreforsocialjustice.org.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Centre for Social Justice</a>
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">WEF</span>
                </div>
                <div>
                  <a href="https://www.weforum.org/" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-white hover:text-emerald-400 transition-colors">Gen Z Labour Market Pressures</a>
                  <p className="text-gray-400 text-sm mt-1">World Economic Forum</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                AI automation has reduced entry-level positions by <strong className="text-white">30%</strong> since ChatGPT&apos;s launch. Companies now prefer experienced fractional talent who can deliver immediate results without extensive training.
              </p>
              <p className="text-gray-400 text-sm">
                Source: <a href="https://www.universitiesuk.ac.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Universities UK Research</a>
              </p>
            </div>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="text-4xl font-black text-emerald-400">250%</div>
              <div className="text-sm text-gray-400 mt-2">Growth in fractional demand since 2020</div>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="text-4xl font-black text-white">78%</div>
              <div className="text-sm text-gray-400 mt-2">PE-backed firms using fractional talent</div>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="text-4xl font-black text-white">50-70%</div>
              <div className="text-sm text-gray-400 mt-2">Cost savings vs full-time hires</div>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="text-4xl font-black text-emerald-400">2-4 wks</div>
              <div className="text-sm text-gray-400 mt-2">Average time to hire with specialists</div>
            </div>
          </div>

          {/* Authority Source Citation Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-center text-gray-500 text-xs uppercase tracking-wider mb-4">Data Sources & Authority References</p>
            <div className="flex flex-wrap justify-center gap-4">
              {extendedAuthoritySources.slice(0, 8).map((source) => (
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-emerald-400 transition-colors"
                  title={source.context}
                >
                  {source.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Using an Agency - with background image */}
      <section id="benefits" className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
            alt="Professional recruitment"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/95 via-gray-50/90 to-emerald-50/95" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a Specialist Recruiter?</h2>
            <p className="text-lg text-gray-600">Working with a specialist fractional recruitment agency provides several key advantages over hiring directly.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border-l-4 border-emerald-500 hover:shadow-lg transition-all hover:bg-white">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study - OneUp Productions (Real Client) */}
      <section className="relative py-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1920&q=80"
            alt="Business success"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-emerald-900/95" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3 block">Case Study</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Client Success Story</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {/* Featured Case Study - OneUp Productions */}
            <Link href="/case-studies/oneup-productions" className="block bg-white/10 backdrop-blur rounded-2xl p-8 sm:p-10 border border-emerald-500/30 hover:border-emerald-400/50 transition-all group">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                <Image
                  src="/1UP productions logo.jpg"
                  alt="OneUp Productions"
                  width={120}
                  height={48}
                  className="rounded-lg"
                />
                <div>
                  <div className="text-emerald-400 text-2xl sm:text-3xl font-black mb-1">OneUp Productions</div>
                  <div className="text-white/80">Entertainment & Media Scale-up</div>
                </div>
              </div>
              <div className="text-white font-bold text-xl mb-4">Fractional CFO Placement</div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">Helped this scale-up entertainment company find the right fractional finance leadership for their growth stage. The placement enabled them to professionalise their finance function ahead of their next funding round.</p>
              <span className="inline-flex items-center gap-2 text-emerald-400 font-bold group-hover:text-emerald-300 transition-colors">
                Read Full Case Study <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>
          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm">More case studies coming soon as we grow our client base</p>
          </div>
        </div>
      </section>

      {/* SECOND CTA - MID PAGE */}
      <section className="py-12 sm:py-16 bg-emerald-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">🚀</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">Ready to Start Hiring?</h2>
          <p className="text-lg sm:text-xl text-emerald-100 mb-6 sm:mb-8">Most companies don&apos;t need to pay a fractional recruiter. Let&apos;s discuss your specific needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors"
            >
              <span>📅</span> Book a Free Call
            </a>
            <Link href="/fractional-jobs-uk" className="px-8 py-4 bg-emerald-800 text-white font-bold uppercase tracking-wider hover:bg-emerald-900 transition-colors border border-emerald-500">
              Browse Candidates
            </Link>
          </div>
        </div>
      </section>

      {/* Fractional Quest vs Traditional Agencies - NEW comparison table with 90-day guarantee */}
      <section id="fq-vs-traditional" className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-3 block">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Fractional Quest vs Traditional Agencies</h2>
            <p className="text-lg text-gray-600">See how our specialist fractional recruitment approach compares to traditional executive search firms.</p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto mb-12">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-6 py-4 text-left font-bold">Feature</th>
                  <th className="px-6 py-4 text-left font-bold bg-emerald-700">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🎯</span> Fractional Quest
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left font-bold">Traditional Agencies</th>
                </tr>
              </thead>
              <tbody>
                {fqVsTraditionalComparison.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-gray-900 border-b border-gray-200">{row.feature}</td>
                    <td className="px-6 py-4 border-b border-gray-200 bg-emerald-50">
                      <span className="font-bold text-emerald-700">{row.fractionalQuest}</span>
                      {row.winner === 'fq' && <span className="ml-2 text-emerald-500">✓</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-200">{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 90-Day Guarantee Highlight */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 sm:p-10 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="text-5xl">🛡️</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">90-Day Replacement Guarantee</h3>
                  <p className="text-emerald-100">If your fractional executive doesn&apos;t work out within 90 days, we&apos;ll find you a replacement at no additional cost. Most traditional agencies only offer 30-60 days.</p>
                </div>
              </div>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                Get Started →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Top UK Fractional Recruitment Agencies */}
      <section id="agencies" className="relative py-16 sm:py-24 bg-white overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=800&fit=crop&q=80"
            alt="Business professionals discussing"
            fill
            className="object-cover opacity-[0.02]"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Top Agencies</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Top UK Recruitment Agencies</h2>
            <p className="text-lg sm:text-xl text-gray-600">Compare specialists in fractional executive recruitment, from generalist fractional recruitment agencies to role-specific fractional recruiters.</p>
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
      <section id="comparison" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Comparison</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Direct Hire vs Using an Agency</h2>
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

      {/* Authority Links Section - Mobile (sidebar shows on desktop) */}
      <section className="lg:hidden py-12 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 text-center">Trusted Professional Bodies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {authorityLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                title={link.description}
              >
                {link.name}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">FAQ</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Common Questions</h2>
          </div>
          <FAQ skipSchema items={faqItems} />
        </div>
      </section>

      {/* Hey Companies - Founder Profile & Trust Signals */}
      <HeyCompanies location="UK" />

      {/* FINAL CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-emerald-600 to-emerald-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🎯</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the Agency Fees</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-emerald-100 mb-8 sm:mb-10 font-light">Get free hiring advice and access our network of vetted fractional executives directly.</p>
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
      {pageContent}
    </main>
  );
}
