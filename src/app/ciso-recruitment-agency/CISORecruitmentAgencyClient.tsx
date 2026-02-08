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
  { question: 'What is a CISO recruitment agency?', answer: 'A CISO recruitment agency specialises in placing Chief Information Security Officers with companies. The best CISO recruiters understand enterprise security, compliance frameworks, board reporting, and can assess both technical depth and executive leadership capabilities.' },
  { question: 'How much does a CISO recruiter charge?', answer: 'CISO recruitment agency fees typically range from 25-35% of first year compensation for retained search. For fractional CISO placements, expect 15-25% of expected annual billings. Executive CISO search typically costs £25,000-£70,000.' },
  { question: 'What should I look for in a CISO recruitment agency?', answer: 'Key criteria: (1) Track record of C-suite security placements, (2) Understanding of compliance frameworks (ISO 27001, SOC 2, GDPR), (3) Network across regulated industries, (4) Ability to assess board-level communication skills.' },
  { question: 'How long does CISO recruitment take?', answer: 'Fractional CISO placements typically take 3-6 weeks. Permanent CISO searches take 10-16 weeks for retained search including security assessments and stakeholder interviews.' },
  { question: 'Should I use a CISO recruiter or generalist?', answer: 'Use a specialist CISO recruitment agency for C-suite security roles. Generalist recruiters cannot properly assess security strategy, compliance expertise, or board-level communication capabilities.' },
  { question: 'What do CISO recruiters assess?', answer: 'Top CISO recruiters assess: security strategy development, compliance framework expertise, incident response leadership, board and stakeholder communication, team building, and vendor management capabilities.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'Browse fractional CISO roles directly. No agency fees - connect with security leadership candidates.', speciality: 'Fractional CISO', model: 'Job board', icon: '🎯' },
  { name: 'Heidrick & Struggles', description: 'Global executive search with dedicated CISO and cyber risk practice.', speciality: 'CISO, CIO', model: 'Retained search', icon: '🌐' },
  { name: 'Russell Reynolds', description: 'Top-tier cybersecurity executive search with deep enterprise networks.', speciality: 'CISO, CSO', model: 'Retained search', icon: '👔' },
  { name: 'Stott & May', description: 'Specialist cybersecurity and technology risk recruitment with strong CISO network.', speciality: 'CISO', model: 'Contingent', icon: '🔐' },
  { name: 'Egon Zehnder', description: 'Global technology leadership practice with enterprise CISO expertise.', speciality: 'CISO', model: 'Retained search', icon: '📊' },
  { name: 'Intaso', description: 'Boutique security leadership recruitment across UK and Europe.', speciality: 'Security leadership', model: 'Contingent', icon: '🛡️' },
];

const benefits = [
  { title: 'Executive Assessment', description: 'CISO recruitment agencies can properly assess board-level communication, executive presence, and stakeholder management that generalists cannot evaluate.', icon: '👔' },
  { title: 'Technical Depth', description: 'Specialist CISO recruiters understand security architecture, threat landscapes, and can assess genuine technical credibility alongside leadership skills.', icon: '🔧' },
  { title: 'Compliance Expertise', description: 'Top CISO recruitment agencies understand ISO 27001, SOC 2, PCI-DSS, GDPR, and can assess candidates for regulated environments.', icon: '📋' },
  { title: 'Network Access', description: 'Established CISO recruitment agencies have networks of security leaders not actively looking - critical for senior appointments.', icon: '🔗' },
  { title: 'Confidential Search', description: 'For replacement searches or sensitive appointments, CISO recruiters provide necessary confidentiality and discretion.', icon: '🔒' },
  { title: 'Replacement Guarantee', description: 'Most CISO recruitment agencies offer 6-12 month replacement guarantees for permanent CISO placements.', icon: '🛡️' },
];

export function CISORecruitmentAgencyClient() {
  const localImage = getLocalImage('ciso');
  const imageCredit = getImage('ciso');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-gray-900 to-gray-800 py-16 sm:py-24">
        <picture>
          <source media="(max-width: 768px)" srcSet={localImage?.mobile || '/images/hero/ciso-mobile.webp'} type="image/webp" />
          <Image src={localImage?.desktop || '/images/hero/ciso-desktop.webp'} alt="CISO Recruitment Agency - Chief Information Security Officer Recruiters" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cybersecurity-recruitment-agency" className="text-gray-400 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Cybersecurity Recruitment</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-gray-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">CISO Search</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">CISO<br /><span className="text-gray-400">Recruitment Agency</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 leading-relaxed font-light mb-6 sm:mb-10">Find specialist <strong>CISO recruitment agencies</strong> for fractional, interim, and permanent Chief Information Security Officer placements. Expert <strong>CISO recruiters</strong> with enterprise security and compliance expertise.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">£1,000-1,600</div><div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mt-1">CISO Day Rate</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">3-6 Weeks</div><div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mt-1">To Place</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">25-35%</div><div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"><span>📅</span> Book a Free Call</a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-700 text-white font-bold uppercase tracking-wider hover:bg-gray-600 transition-colors border border-gray-600">View CISO Recruiters</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10"><a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a></div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-gray-800 mb-1 sm:mb-2">£25k-70k</div><div className="text-gray-600 text-xs sm:text-sm">CISO Recruiter Fees</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-gray-800 mb-1 sm:mb-2">6-12 Months</div><div className="text-gray-600 text-xs sm:text-sm">Guarantee Period</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-gray-800 mb-1 sm:mb-2">3-5</div><div className="text-gray-600 text-xs sm:text-sm">CISO Shortlist</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-gray-800 mb-1 sm:mb-2">90%+</div><div className="text-gray-600 text-xs sm:text-sm">Placement Success</div></div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700 mb-3 block">Featured CISO Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse CISO Opportunities</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the <strong>CISO recruiter</strong> fees and connect with security leadership opportunities directly.</p>
          </div>
          <EmbeddedJobBoard title="CISO Roles" accentColor="gray" jobsPerPage={6} />
        </div>
      </section>

      {/* What is a CISO Recruitment Agency */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=800&fit=crop&q=80" alt="Security operations" fill className="object-cover opacity-[0.03]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a CISO Recruitment Agency?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed">A <strong>CISO recruitment agency</strong> specialises in placing Chief Information Security Officers with companies. Unlike general security recruiters, a <strong>CISO recruiter</strong> focuses on C-suite security leadership, understanding enterprise security strategy, board reporting, and regulatory compliance.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">The best <strong>CISO recruitment agencies</strong> can properly assess both technical depth and executive capabilities. They understand the difference between a startup CISO building security from scratch and an enterprise CISO managing complex, regulated environments.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">A specialist <strong>CISO recruiter</strong> will also assess soft skills critical for the role: board-level communication, cross-functional influence, crisis management, and the ability to translate technical risk into business terms.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a CISO Recruiter?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 border-l-4 border-gray-800 hover:shadow-md transition-shadow">
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Best CISO Recruitment Agencies</h2>
            <p className="text-base sm:text-xl text-gray-600">Compare specialist <strong>CISO recruiters</strong> from boutique security search to global executive search.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAgencies.map((agency, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-gray-800 transition-colors p-6 sm:p-8 hover:shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{agency.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 text-xs font-medium">{agency.speciality}</span>
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">CISO Recruitment Questions</h2>
          </div>
          <FAQ skipSchema items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/ciso-executive-search" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-gray-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔍</div><div className="font-medium text-gray-900 text-sm sm:text-base">CISO Executive Search</div></Link>
            <Link href="/cybersecurity-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-gray-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔐</div><div className="font-medium text-gray-900 text-sm sm:text-base">Cybersecurity Recruitment</div></Link>
            <Link href="/fractional-ciso-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-gray-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">CISO Jobs UK</div></Link>
            <Link href="/fractional-ciso" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-gray-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📖</div><div className="font-medium text-gray-900 text-sm sm:text-base">What is a Fractional CISO?</div></Link>
            <Link href="/hire-fractional-ciso" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-gray-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🤝</div><div className="font-medium text-gray-900 text-sm sm:text-base">Hire a CISO</div></Link>
            <Link href="/fractional-ciso-salary" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-gray-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💰</div><div className="font-medium text-gray-900 text-sm sm:text-base">CISO Salary Guide</div></Link>
            <Link href="/technology-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-gray-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💻</div><div className="font-medium text-gray-900 text-sm sm:text-base">Technology Recruitment</div></Link>
            <Link href="/" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-gray-800 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Recruitment</div></Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🛡️</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the CISO Recruiter Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-10 font-light">Get free CISO hiring advice and access our network of vetted security leaders directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"><span className="text-xl sm:text-2xl">📅</span><span>Book Your Free Call</span></a>
            <Link href="/fractional-ciso-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-gray-700 text-white text-base sm:text-lg font-bold hover:bg-gray-600 transition-colors border border-gray-600">Browse CISO Jobs</Link>
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
