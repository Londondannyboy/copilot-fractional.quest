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
  { question: 'What is a fintech recruitment agency?', answer: 'A fintech recruitment agency specialises in placing professionals in financial technology companies. The best fintech recruiters understand payments, banking APIs, blockchain, regtech, and wealthtech - combining finance and technology expertise.' },
  { question: 'How much does a fintech recruiter charge?', answer: 'Fintech recruitment agency fees typically range from 18-28% of first year salary. Executive fintech search (CTO, CFO, CPO) costs 25-35%. Contract fintech placements have margins of 20-35% due to regulatory complexity.' },
  { question: 'What should I look for in a fintech recruitment agency?', answer: 'Key criteria: (1) Specialism in your fintech vertical (payments, lending, crypto), (2) Understanding of FCA regulations, (3) Network across both finance and tech talent, (4) Track record with funded startups.' },
  { question: 'How long does fintech recruitment take?', answer: 'Fintech developer placements typically take 3-5 weeks due to specialist requirements. C-suite fintech roles take 8-14 weeks. Roles requiring regulatory knowledge (compliance, risk) may take longer.' },
  { question: 'Why use a specialist fintech recruiter?', answer: 'Fintech combines finance domain knowledge with technical skills - generalist recruiters cannot assess both. Specialist fintech recruitment agencies understand payments rails, banking regulations, and technical architecture.' },
  { question: 'What roles do fintech recruitment agencies cover?', answer: 'Fintech recruitment agencies cover: payment engineers, blockchain developers, fintech CTOs, CFOs with tech experience, compliance officers, product managers, and data scientists with financial services experience.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'Browse fractional fintech leadership roles directly. No agency fees - connect with CTO, CFO, and CPO candidates.', speciality: 'Fractional Fintech', model: 'Job board', icon: '🎯' },
  { name: 'Harrington Starr', description: 'Leading fintech recruitment specialists with deep networks across payments, banking tech, and wealthtech.', speciality: 'Fintech', model: 'Contingent', icon: '🏦' },
  { name: 'Adaptive Talent', description: 'Specialist fintech and payments recruiter with focus on scale-ups and high-growth companies.', speciality: 'Payments', model: 'Contingent', icon: '💳' },
  { name: 'EC1 Partners', description: 'London-based fintech recruitment with strong venture-backed startup network.', speciality: 'Fintech startups', model: 'Contingent', icon: '🚀' },
  { name: 'Heidrick & Struggles', description: 'Global executive search with dedicated financial services technology practice.', speciality: 'Fintech C-suite', model: 'Retained', icon: '🌐' },
  { name: 'Storm2', description: 'Global fintech recruitment specialists across EMEA, US, and APAC markets.', speciality: 'Global fintech', model: 'Contingent', icon: '🌍' },
];

const benefits = [
  { title: 'Domain Expertise', description: 'Fintech recruitment agencies understand payments, lending, crypto, and wealthtech - they can assess candidates who speak both finance and technology.', icon: '🏦' },
  { title: 'Regulatory Knowledge', description: 'Specialist fintech recruiters understand FCA, PSD2, PCI-DSS, and GDPR requirements and can assess candidates for regulated environments.', icon: '📋' },
  { title: 'Startup Networks', description: 'The best fintech recruitment agencies have deep networks across VC-backed startups, scale-ups, and challenger banks.', icon: '🚀' },
  { title: 'Technical Assessment', description: 'Fintech recruiters can properly assess payment APIs, banking integrations, and financial system architecture.', icon: '🔧' },
  { title: 'Cross-Border Reach', description: 'Fintech is global - specialist agencies can source talent across multiple jurisdictions and understand visa/sponsorship requirements.', icon: '🌍' },
  { title: 'Speed to Hire', description: 'Established fintech recruitment agencies can present qualified candidates within days thanks to their active, pre-vetted networks.', icon: '⚡' },
];

export function FintechRecruitmentAgencyClient() {
  const localImage = getLocalImage('tech');
  const imageCredit = getImage('tech');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-emerald-600 to-emerald-500 py-16 sm:py-24">
        <picture>
          <source media="(max-width: 768px)" srcSet={localImage?.mobile || '/images/hero/tech-mobile.webp'} type="image/webp" />
          <Image src={localImage?.desktop || '/images/hero/tech-desktop.webp'} alt="Fintech Recruitment Agency - Financial Technology Recruiters" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/technology-recruitment-agency" className="text-emerald-100 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Technology Recruitment</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-emerald-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">Fintech Search</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">Fintech<br /><span className="text-emerald-200">Recruitment Agency</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-emerald-50 leading-relaxed font-light mb-6 sm:mb-10">Find specialist <strong>fintech recruitment agencies</strong> and <strong>fintech recruiters</strong> for payments, banking tech, crypto, wealthtech, and regtech roles.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">18-28%</div><div className="text-emerald-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">3-5 Weeks</div><div className="text-emerald-100 text-xs sm:text-sm uppercase tracking-wider mt-1">To Place</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">£500-1,400</div><div className="text-emerald-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Day Rate Range</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"><span>📅</span> Book a Free Call</a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-emerald-700 text-white font-bold uppercase tracking-wider hover:bg-emerald-800 transition-colors border border-emerald-500">View Fintech Recruiters</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10"><a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a></div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-emerald-700 mb-1 sm:mb-2">18-28%</div><div className="text-gray-600 text-xs sm:text-sm">Fintech Recruiter Fees</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-emerald-700 mb-1 sm:mb-2">3-6 Months</div><div className="text-gray-600 text-xs sm:text-sm">Rebate Period</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-emerald-700 mb-1 sm:mb-2">3-5</div><div className="text-gray-600 text-xs sm:text-sm">Candidate Shortlist</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-emerald-700 mb-1 sm:mb-2">£12B+</div><div className="text-gray-600 text-xs sm:text-sm">UK Fintech VC 2024</div></div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-3 block">Featured Fintech Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse Fintech Leadership Opportunities</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the <strong>fintech recruiter</strong> fees and connect with fintech leadership opportunities directly.</p>
          </div>
          <EmbeddedJobBoard title="Fintech Leadership Roles" accentColor="emerald" jobsPerPage={6} />
        </div>
      </section>

      {/* What is a Fintech Recruitment Agency */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&h=800&fit=crop&q=80" alt="Fintech office" fill className="object-cover opacity-[0.03]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a Fintech Recruitment Agency?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed">A <strong>fintech recruitment agency</strong> specialises in placing professionals in financial technology companies. Unlike generalist tech recruiters, a <strong>fintech recruiter</strong> understands both financial services and technology - from payments and lending to crypto and wealthtech.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">The best <strong>fintech recruitment agencies</strong> have deep expertise across the fintech ecosystem: challenger banks, payment processors, trading platforms, crypto exchanges, and regtech providers. They understand FCA regulations, PSD2, open banking, and the technical architecture that powers modern financial services.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">A specialist <strong>fintech recruiter</strong> can assess candidates who combine technical skills with financial domain knowledge - a rare and valuable combination. They maintain active networks across both the banking sector and technology startups.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a Fintech Recruitment Agency?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 border-l-4 border-emerald-500 hover:shadow-md transition-shadow">
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Best Fintech Recruitment Agencies</h2>
            <p className="text-base sm:text-xl text-gray-600">Compare specialist <strong>fintech recruiters</strong> from boutique agencies to global executive search.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAgencies.map((agency, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-emerald-500 transition-colors p-6 sm:p-8 hover:shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{agency.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-medium">{agency.speciality}</span>
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Fintech Recruitment Questions</h2>
          </div>
          <FAQ skipSchema items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/finance-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-emerald-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💰</div><div className="font-medium text-gray-900 text-sm sm:text-base">Finance Recruitment</div></Link>
            <Link href="/cfo-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-emerald-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📊</div><div className="font-medium text-gray-900 text-sm sm:text-base">CFO Recruitment</div></Link>
            <Link href="/technology-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-emerald-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💻</div><div className="font-medium text-gray-900 text-sm sm:text-base">Technology Recruitment</div></Link>
            <Link href="/cto-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-emerald-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔧</div><div className="font-medium text-gray-900 text-sm sm:text-base">CTO Recruitment</div></Link>
            <Link href="/fractional-cfo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-emerald-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">CFO Jobs UK</div></Link>
            <Link href="/fractional-cto-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-emerald-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🚀</div><div className="font-medium text-gray-900 text-sm sm:text-base">CTO Jobs UK</div></Link>
            <Link href="/fractional-cfo" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-emerald-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📖</div><div className="font-medium text-gray-900 text-sm sm:text-base">What is a Fractional CFO?</div></Link>
            <Link href="/" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-emerald-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Recruitment</div></Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-emerald-600 to-emerald-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🏦</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the Fintech Recruiter Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-emerald-100 mb-8 sm:mb-10 font-light">Get free fintech hiring advice and access our network of vetted fintech leaders directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"><span className="text-xl sm:text-2xl">📅</span><span>Book Your Free Call</span></a>
            <Link href="/fractional-cfo-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-emerald-700 text-white text-base sm:text-lg font-bold hover:bg-emerald-800 transition-colors border border-emerald-400">Browse Fintech Jobs</Link>
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
