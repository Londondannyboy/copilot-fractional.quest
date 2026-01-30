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
  { question: 'What is a cybersecurity recruitment agency?', answer: 'A cybersecurity recruitment agency specialises in placing security professionals from analysts to CISOs. The best cybersecurity recruiters understand threat landscapes, compliance frameworks, and can assess technical security skills across cloud, network, and application security.' },
  { question: 'How much does a cybersecurity recruiter charge?', answer: 'Cybersecurity recruitment agency fees typically range from 20-30% of first year salary. CISO and Head of Security executive search costs 25-35%. Contractor margins are 25-40% due to high demand and specialist skills.' },
  { question: 'What should I look for in a cybersecurity recruitment agency?', answer: 'Key criteria: (1) Security clearance handling experience, (2) Technical assessment capabilities for SOC, penetration testing, GRC, (3) Network across regulated industries, (4) Understanding of compliance frameworks (ISO 27001, SOC 2, GDPR).' },
  { question: 'How long does cybersecurity recruitment take?', answer: 'Security analyst and engineer placements typically take 3-5 weeks. CISO and Head of Security roles take 8-14 weeks. Roles requiring security clearance can take significantly longer.' },
  { question: 'Why use a specialist cybersecurity recruiter?', answer: 'Cybersecurity combines technical skills with compliance knowledge - generalist recruiters cannot assess penetration testing abilities, incident response experience, or GRC expertise. Specialist cybersecurity recruitment agencies have pre-vetted networks.' },
  { question: 'What roles do cybersecurity recruitment agencies cover?', answer: 'Cybersecurity recruitment agencies cover: SOC analysts, penetration testers, security engineers, GRC specialists, incident responders, CISOs, Heads of Security, security architects, and compliance officers.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'Browse fractional CISO and security leadership roles directly. No agency fees - connect with security exec candidates.', speciality: 'Fractional CISO', model: 'Job board', icon: '🎯' },
  { name: 'Stott & May', description: 'Leading cybersecurity and technology risk recruitment specialists with global reach.', speciality: 'Cybersecurity', model: 'Contingent', icon: '🔐' },
  { name: 'Intaso', description: 'Specialist security recruitment across UK and Europe with strong CISO network.', speciality: 'Security leadership', model: 'Contingent', icon: '🛡️' },
  { name: 'Hays Technology', description: 'Large technology recruiter with dedicated cybersecurity practice.', speciality: 'Security', model: 'Contingent', icon: '🏢' },
  { name: 'Heidrick & Struggles', description: 'Global executive search with dedicated CISO and cyber risk practice.', speciality: 'CISO', model: 'Retained', icon: '🌐' },
  { name: 'ThreatRecruiters', description: 'Boutique cybersecurity-only recruitment firm with deep technical expertise.', speciality: 'Technical security', model: 'Contingent', icon: '🔒' },
];

const benefits = [
  { title: 'Technical Assessment', description: 'Cybersecurity recruitment agencies can properly assess penetration testing, incident response, and security architecture skills that generalist recruiters cannot evaluate.', icon: '🔧' },
  { title: 'Compliance Knowledge', description: 'Specialist cybersecurity recruiters understand ISO 27001, SOC 2, PCI-DSS, and GDPR requirements and can assess candidates for regulated environments.', icon: '📋' },
  { title: 'Security Clearance', description: 'The best cybersecurity recruitment agencies understand SC, DV, and CTC clearance processes and can source cleared candidates efficiently.', icon: '🔒' },
  { title: 'Threat Landscape', description: 'Cybersecurity recruiters stay current on threat trends, attack vectors, and defensive technologies to assess candidate relevance.', icon: '🎯' },
  { title: 'Pre-Vetted Networks', description: 'Established cybersecurity recruitment agencies maintain active networks of pre-vetted security professionals ready to engage.', icon: '👥' },
  { title: 'Speed to Hire', description: 'With persistent talent shortages, cybersecurity recruitment agencies provide critical speed advantages through their established networks.', icon: '⚡' },
];

export function CybersecurityRecruitmentAgencyClient() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0] || null;
  const localImage = getLocalImage('ciso');
  const imageCredit = getImage('ciso');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-slate-800 to-slate-700 py-16 sm:py-24">
        <picture>
          <source media="(max-width: 768px)" srcSet={localImage?.mobile || '/images/hero/ciso-mobile.webp'} type="image/webp" />
          <Image src={localImage?.desktop || '/images/hero/ciso-desktop.webp'} alt="Cybersecurity Recruitment Agency - Security Recruiters" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/technology-recruitment-agency" className="text-slate-300 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Technology Recruitment</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-slate-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">Security Search</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">Cybersecurity<br /><span className="text-slate-300">Recruitment Agency</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-slate-200 leading-relaxed font-light mb-6 sm:mb-10">Find specialist <strong>cybersecurity recruitment agencies</strong> and <strong>security recruiters</strong> for SOC analysts, penetration testers, CISOs, and security architects.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">20-30%</div><div className="text-slate-300 text-xs sm:text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">3-5 Weeks</div><div className="text-slate-300 text-xs sm:text-sm uppercase tracking-wider mt-1">To Place</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">£600-1,500</div><div className="text-slate-300 text-xs sm:text-sm uppercase tracking-wider mt-1">Day Rate Range</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"><span>📅</span> Book a Free Call</a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-slate-600 text-white font-bold uppercase tracking-wider hover:bg-slate-500 transition-colors border border-slate-500">View Security Recruiters</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10"><a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a></div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-slate-700 mb-1 sm:mb-2">20-30%</div><div className="text-gray-600 text-xs sm:text-sm">Security Recruiter Fees</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-slate-700 mb-1 sm:mb-2">3.5M</div><div className="text-gray-600 text-xs sm:text-sm">Global Talent Shortage</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-slate-700 mb-1 sm:mb-2">3-5</div><div className="text-gray-600 text-xs sm:text-sm">Candidate Shortlist</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-slate-700 mb-1 sm:mb-2">15%+</div><div className="text-gray-600 text-xs sm:text-sm">Salary Growth YoY</div></div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700 mb-3 block">Featured Security Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse Cybersecurity Leadership Opportunities</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the <strong>cybersecurity recruiter</strong> fees and connect with security leadership opportunities directly.</p>
          </div>
          <EmbeddedJobBoard title="Security Leadership Roles" accentColor="slate" jobsPerPage={6} />
        </div>
      </section>

      {/* What is a Cybersecurity Recruitment Agency */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=800&fit=crop&q=80" alt="Security operations center" fill className="object-cover opacity-[0.03]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a Cybersecurity Recruitment Agency?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed">A <strong>cybersecurity recruitment agency</strong> specialises in placing security professionals from SOC analysts to CISOs. Unlike generalist tech recruiters, a <strong>cybersecurity recruiter</strong> understands threat landscapes, compliance frameworks, and can assess technical security skills across multiple domains.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">The best <strong>cybersecurity recruitment agencies</strong> have deep expertise across security disciplines: penetration testing, incident response, GRC (Governance, Risk, Compliance), cloud security, and security architecture. They understand certifications like CISSP, CISM, CEH, and OSCP.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">A specialist <strong>cybersecurity recruiter</strong> can also navigate security clearance requirements (SC, DV, CTC) and understand the talent market in regulated industries like finance, government, and critical infrastructure.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a Cybersecurity Recruitment Agency?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 border-l-4 border-slate-600 hover:shadow-md transition-shadow">
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Best Cybersecurity Recruitment Agencies</h2>
            <p className="text-base sm:text-xl text-gray-600">Compare specialist <strong>cybersecurity recruiters</strong> from boutique agencies to global executive search.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAgencies.map((agency, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-slate-600 transition-colors p-6 sm:p-8 hover:shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{agency.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-100 text-slate-800 px-3 py-1 text-xs font-medium">{agency.speciality}</span>
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Cybersecurity Recruitment Questions</h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/ciso-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-slate-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🛡️</div><div className="font-medium text-gray-900 text-sm sm:text-base">CISO Recruitment</div></Link>
            <Link href="/ciso-executive-search" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-slate-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔍</div><div className="font-medium text-gray-900 text-sm sm:text-base">CISO Executive Search</div></Link>
            <Link href="/technology-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-slate-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💻</div><div className="font-medium text-gray-900 text-sm sm:text-base">Technology Recruitment</div></Link>
            <Link href="/cto-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-slate-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔧</div><div className="font-medium text-gray-900 text-sm sm:text-base">CTO Recruitment</div></Link>
            <Link href="/fractional-ciso-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-slate-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">CISO Jobs UK</div></Link>
            <Link href="/fractional-ciso" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-slate-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📖</div><div className="font-medium text-gray-900 text-sm sm:text-base">What is a Fractional CISO?</div></Link>
            <Link href="/hire-fractional-ciso" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-slate-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🤝</div><div className="font-medium text-gray-900 text-sm sm:text-base">Hire a CISO</div></Link>
            <Link href="/fractional-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-slate-600 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Recruitment</div></Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🔐</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the Cybersecurity Recruiter Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-10 font-light">Get free security hiring advice and access our network of vetted cybersecurity leaders directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"><span className="text-xl sm:text-2xl">📅</span><span>Book Your Free Call</span></a>
            <Link href="/fractional-ciso-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-slate-600 text-white text-base sm:text-lg font-bold hover:bg-slate-500 transition-colors border border-slate-500">Browse CISO Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <main>
      <LazyCopilotSidebar instructions={`## PAGE CONTEXT\nPage Type: guide | Topic: Cybersecurity Recruitment Agencies | URL: /cybersecurity-recruitment-agency\n\nYou're helping someone understand cybersecurity recruitment agencies and how to hire security talent.\nKey facts: Cybersecurity recruiter fees 20-30% | 3-5 weeks average | 3.5M global talent shortage | Security clearance experience important`} labels={{ title: "Security Hiring Guide", initial: firstName ? `Hi ${firstName}! I can help you find the right cybersecurity recruitment agency or candidate.` : `Welcome! This guide covers cybersecurity recruitment agencies and security hiring.` }}>
        {pageContent}
      </LazyCopilotSidebar>
    </main>
  );
}
