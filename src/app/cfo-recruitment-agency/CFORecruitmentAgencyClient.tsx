"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FAQItem } from "@/components/seo";
import { getLocalImage, getImage } from '@/lib/images';
const EmbeddedJobBoard = dynamic(
  () => import("@/components/EmbeddedJobBoard").then(mod => ({ default: mod.EmbeddedJobBoard })),
  { ssr: false, loading: () => <div className="animate-pulse bg-gray-100 rounded-xl h-96" /> }
);

const FAQ = dynamic(
  () => import("@/components/seo").then(mod => ({ default: mod.FAQ })),
  { ssr: false, loading: () => <div className="animate-pulse space-y-4">{[1,2,3,4,5,6].map(i => <div key={i} className="bg-gray-100 rounded-lg h-16" />)}</div> }
);

const CALENDLY_URL = 'https://calendly.com/firstquest/quest';

const faqItems: FAQItem[] = [
  { question: 'What is a CFO recruitment agency?', answer: 'A CFO recruitment agency specialises exclusively in placing Chief Financial Officers with companies. They understand the specific requirements for CFO roles including M&A experience, fundraising track records, board reporting, and sector-specific expertise.' },
  { question: 'How much does a CFO recruiter charge?', answer: 'CFO recruitment fees typically range from 20-30% of first year compensation for permanent roles. For fractional CFO placements, expect 15-25% of expected annual billings. Retained CFO executive search typically costs £20,000-£50,000.' },
  { question: 'What should I look for in a CFO recruiter?', answer: 'Key criteria: (1) Track record of CFO-level placements, (2) Understanding of your sector (PE-backed, VC-backed, public company), (3) Network of passive CFO candidates, (4) Ability to assess technical skills like M&A, fundraising, and systems implementation.' },
  { question: 'How long does CFO recruitment take?', answer: 'Fractional or interim CFO placements typically take 3-6 weeks through an agency. Permanent CFO searches take longer, usually 8-16 weeks for a full retained search.' },
  { question: 'Should I use a CFO recruiter or a generalist?', answer: 'Always use a specialist CFO recruiter for C-suite finance appointments. Generalist recruiters lack the network and assessment capabilities for CFO-level roles.' },
  { question: 'What qualifications do CFO recruiters look for?', answer: 'Top CFO recruiters look for ACA, ACCA, or CIMA qualifications from a Big 4 or top-tier audit firm, plus M&A, fundraising, and board-level experience.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'Browse fractional CFO roles directly. No agency fees - connect with CFO candidates directly.', speciality: 'Fractional CFO', model: 'Job board', icon: '🎯' },
  { name: 'Odgers Berndtson', description: 'Global executive search firm with dedicated CFO practice. Strong in FTSE 250 and private equity.', speciality: 'CFO, Group FD', model: 'Retained search', icon: '🌐' },
  { name: 'Spencer Stuart', description: 'Top-tier CFO executive search with deep board-level networks and PE relationships.', speciality: 'CFO, Board Finance', model: 'Retained search', icon: '👔' },
  { name: 'Korn Ferry', description: 'Global leader in CFO executive search with assessment and leadership development capabilities.', speciality: 'CFO, C-Suite', model: 'Retained search', icon: '📊' },
  { name: 'The CFO Partnership', description: 'Specialist CFO recruitment boutique focusing exclusively on Chief Financial Officer placements.', speciality: 'CFO Only', model: 'Retained & contingent', icon: '💼' },
  { name: 'Robert Walters Executive', description: 'Executive finance recruitment with strong CFO practice in mid-market and PE-backed companies.', speciality: 'CFO, FD', model: 'Contingent search', icon: '📈' },
];

const benefits = [
  { title: 'CFO-Level Networks', description: 'CFO recruiters have exclusive access to passive CFO candidates not actively looking. Their networks span industry, PE, and board-level finance leaders.', icon: '🔗' },
  { title: 'Technical Assessment', description: 'Specialist CFO recruiters can properly assess M&A experience, fundraising track records, and board reporting capabilities that generalists miss.', icon: '✓' },
  { title: 'Sector Expertise', description: 'Top CFO recruiters understand the difference between PE-backed, VC-backed, and public company CFO requirements.', icon: '🎯' },
  { title: 'Salary Intelligence', description: 'CFO recruiters know current CFO compensation packages across sectors, helping you benchmark and negotiate effectively.', icon: '📊' },
  { title: 'Confidential Search', description: 'When replacing an existing CFO, specialist recruiters can run confidential searches without alerting the market.', icon: '🔒' },
  { title: 'Replacement Guarantee', description: 'Most CFO recruitment agencies offer 6-12 month replacement guarantees for permanent CFO placements.', icon: '🛡️' },
];

export function CFORecruitmentAgencyClient() {
  const localImage = getLocalImage('cfo');
  const imageCredit = getImage('cfo');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-indigo-600 to-indigo-500 py-16 sm:py-24">
        <picture>
          <source media="(max-width: 768px)" srcSet={localImage?.mobile || '/images/hero/cfo-mobile.webp'} type="image/webp" />
          <Image src={localImage?.desktop || '/images/hero/cfo-desktop.webp'} alt="CFO Recruitment Agency - Chief Financial Officer Executive Search" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/finance-recruitment-agency" className="text-indigo-100 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Finance Recruitment</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-indigo-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">CFO Search</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">CFO<br /><span className="text-indigo-200">Recruitment Agency</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-indigo-50 leading-relaxed font-light mb-6 sm:mb-10">Find specialist <strong>CFO recruitment agencies</strong> for fractional, interim, and permanent Chief Financial Officer placements. Expert <strong>CFO recruiters</strong> with M&A, fundraising, and PE-backed experience.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">£1,200-1,800</div><div className="text-indigo-100 text-xs sm:text-sm uppercase tracking-wider mt-1">CFO Day Rate</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">3-6 Weeks</div><div className="text-indigo-100 text-xs sm:text-sm uppercase tracking-wider mt-1">To Place</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">20-30%</div><div className="text-indigo-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                <span>📅</span> Book a Free Call
              </a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-700 text-white font-bold uppercase tracking-wider hover:bg-indigo-800 transition-colors border border-indigo-500">View CFO Recruiters</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10">
          <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-indigo-700 mb-1 sm:mb-2">£20k-50k</div><div className="text-gray-600 text-xs sm:text-sm">CFO Recruiter Fees</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-indigo-700 mb-1 sm:mb-2">6-12 Months</div><div className="text-gray-600 text-xs sm:text-sm">Guarantee Period</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-indigo-700 mb-1 sm:mb-2">3-5</div><div className="text-gray-600 text-xs sm:text-sm">CFO Shortlist</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-indigo-700 mb-1 sm:mb-2">95%+</div><div className="text-gray-600 text-xs sm:text-sm">Placement Success</div></div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-700 mb-3 block">Featured CFO Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse CFO Opportunities</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the <strong>CFO recruiter</strong> fees and connect with opportunities directly.</p>
          </div>
          <EmbeddedJobBoard title="CFO Roles" accentColor="indigo" jobsPerPage={6} />
        </div>
      </section>

      {/* What is a CFO Recruitment Agency */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&h=800&fit=crop&q=80" alt="CFO meeting" fill className="object-cover opacity-[0.03]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a CFO Recruitment Agency?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed">
              A <strong>CFO recruitment agency</strong> specialises exclusively in placing Chief Financial Officers with companies. Unlike general finance recruiters or FD specialists, a <strong>CFO recruiter</strong> focuses only on C-suite finance appointments, with deep networks at board level.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              The best <strong>CFO recruitment agencies</strong> understand the specific requirements for different CFO profiles: PE-backed CFOs need M&A and exit experience, VC-backed CFOs need fundraising track records, and public company CFOs need regulatory and investor relations expertise.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              A specialist <strong>CFO recruiter</strong> can properly assess these technical capabilities, whereas generalist recruiters often miss critical competencies. The fee premium for CFO-specialist search is typically justified by higher placement success rates and better candidate quality.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a CFO Recruiter?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 border-l-4 border-indigo-500 hover:shadow-md transition-shadow">
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Best CFO Recruitment Agencies</h2>
            <p className="text-base sm:text-xl text-gray-600">Compare specialist <strong>CFO recruiters</strong> from boutique search firms to global executive search.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAgencies.map((agency, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-indigo-500 transition-colors p-6 sm:p-8 hover:shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{agency.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 text-xs font-medium">{agency.speciality}</span>
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">CFO Recruitment Questions</h2>
          </div>
          <FAQ skipSchema items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/fractional-cfo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">💼</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">CFO Jobs UK</div>
            </Link>
            <Link href="/fractional-cfo" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">📖</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">What is a Fractional CFO?</div>
            </Link>
            <Link href="/hire-fractional-cfo" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">🎯</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">Hire a CFO</div>
            </Link>
            <Link href="/fractional-cfo-salary" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">💰</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">CFO Salary Guide</div>
            </Link>
            <Link href="/finance-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">🏢</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">Finance Recruitment</div>
            </Link>
            <Link href="/fractional-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">🎯</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Recruitment</div>
            </Link>
            <Link href="/interim-cfo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">⏱️</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">Interim CFO Jobs</div>
            </Link>
            <Link href="/fractional-cfo-services" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">⚙️</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">CFO Services</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-indigo-600 to-indigo-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">💼</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the CFO Recruiter Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-indigo-100 mb-8 sm:mb-10 font-light">Get free CFO hiring advice and access our network of vetted Chief Financial Officers directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
              <span className="text-xl sm:text-2xl">📅</span>
              <span>Book Your Free Call</span>
            </a>
            <Link href="/fractional-cfo-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-indigo-700 text-white text-base sm:text-lg font-bold hover:bg-indigo-800 transition-colors border border-indigo-400">
              Browse CFO Jobs
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
