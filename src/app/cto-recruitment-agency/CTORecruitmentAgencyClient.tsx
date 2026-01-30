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
  { question: 'What is a CTO recruitment agency?', answer: 'A CTO recruitment agency specialises in placing Chief Technology Officers with companies. They understand technical architecture, engineering leadership, and can assess candidates for AI/ML, cloud, security, and platform expertise.' },
  { question: 'How much does a CTO recruiter charge?', answer: 'CTO recruitment fees typically range from 20-30% of first year compensation. For fractional CTO placements, expect 15-25% of expected annual billings. Retained CTO search typically costs £20,000-£60,000.' },
  { question: 'What should I look for in a CTO recruiter?', answer: 'Key criteria: (1) Track record of CTO-level placements, (2) Technical assessment capabilities, (3) Network in your technology stack, (4) Understanding of startup vs enterprise CTO requirements.' },
  { question: 'How long does CTO recruitment take?', answer: 'Fractional or interim CTO placements typically take 3-6 weeks. Permanent CTO searches take 8-16 weeks for retained search including technical assessments.' },
  { question: 'Should I use a CTO recruiter or a generalist?', answer: 'Use a specialist CTO recruiter for technical leadership roles. Generalist recruiters cannot properly assess technical architecture, AI/ML expertise, or engineering management capabilities.' },
  { question: 'What technical skills do CTO recruiters assess?', answer: 'Top CTO recruiters assess: system architecture, AI/ML strategy, cloud infrastructure (AWS/GCP/Azure), security posture, engineering team scaling, and technical due diligence capabilities.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'Browse fractional CTO roles directly. No agency fees - connect with tech leadership candidates.', speciality: 'Fractional CTO', model: 'Job board', icon: '🎯' },
  { name: 'Heidrick & Struggles', description: 'Global executive search with dedicated CTO and technology practice.', speciality: 'CTO, CIO, CISO', model: 'Retained search', icon: '🌐' },
  { name: 'Russell Reynolds', description: 'Top-tier technology executive search with deep Silicon Valley and enterprise networks.', speciality: 'CTO, CPO', model: 'Retained search', icon: '👔' },
  { name: 'Egon Zehnder', description: 'Global technology leadership practice with strong VC and PE relationships.', speciality: 'CTO, VP Engineering', model: 'Retained search', icon: '📊' },
  { name: 'VentureFuel', description: 'Specialist startup CTO recruitment for seed to Series B companies.', speciality: 'Startup CTO', model: 'Contingent', icon: '🚀' },
  { name: 'Hired', description: 'Tech-focused platform with CTO and VP Engineering hiring capabilities.', speciality: 'Tech Leadership', model: 'Platform', icon: '💻' },
];

const benefits = [
  { title: 'Technical Assessment', description: 'CTO recruiters can properly assess system architecture, AI/ML expertise, cloud infrastructure, and security capabilities that generalists cannot evaluate.', icon: '🔧' },
  { title: 'Tech-Specific Networks', description: 'Specialist CTO recruiters have networks in specific technology stacks - AI/ML, fintech, healthtech, enterprise SaaS - to find the right fit.', icon: '🔗' },
  { title: 'Startup vs Enterprise', description: 'Top CTO recruiters understand the difference between building from zero and scaling existing systems.', icon: '🎯' },
  { title: 'Due Diligence Ready', description: 'For PE/VC-backed companies, CTO recruiters can assess technical due diligence capabilities and investor-ready reporting.', icon: '📋' },
  { title: 'Team Building Assessment', description: 'CTO recruiters evaluate engineering team building, culture creation, and offshore/nearshore management experience.', icon: '👥' },
  { title: 'Replacement Guarantee', description: 'Most CTO recruitment agencies offer 6-12 month replacement guarantees for permanent CTO placements.', icon: '🛡️' },
];

export function CTORecruitmentAgencyClient() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0] || null;
  const localImage = getLocalImage('cto');
  const imageCredit = getImage('cto');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-blue-600 to-blue-500 py-16 sm:py-24">
        <picture>
          <source media="(max-width: 768px)" srcSet={localImage?.mobile || '/images/hero/cto-mobile.webp'} type="image/webp" />
          <Image src={localImage?.desktop || '/images/hero/cto-desktop.webp'} alt="CTO Recruitment Agency - Chief Technology Officer Executive Search" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/technology-recruitment-agency" className="text-blue-100 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Technology Recruitment</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-blue-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">CTO Search</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">CTO<br /><span className="text-blue-200">Recruitment Agency</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-blue-50 leading-relaxed font-light mb-6 sm:mb-10">Find specialist <strong>CTO recruitment agencies</strong> for fractional, interim, and permanent Chief Technology Officer placements. Expert <strong>CTO recruiters</strong> with AI, cloud, security, and scale-up experience.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">£1,000-1,600</div><div className="text-blue-100 text-xs sm:text-sm uppercase tracking-wider mt-1">CTO Day Rate</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">3-6 Weeks</div><div className="text-blue-100 text-xs sm:text-sm uppercase tracking-wider mt-1">To Place</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">20-30%</div><div className="text-blue-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"><span>📅</span> Book a Free Call</a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-700 text-white font-bold uppercase tracking-wider hover:bg-blue-800 transition-colors border border-blue-500">View CTO Recruiters</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10"><a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a></div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-blue-700 mb-1 sm:mb-2">£20k-60k</div><div className="text-gray-600 text-xs sm:text-sm">CTO Recruiter Fees</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-blue-700 mb-1 sm:mb-2">6-12 Months</div><div className="text-gray-600 text-xs sm:text-sm">Guarantee Period</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-blue-700 mb-1 sm:mb-2">3-5</div><div className="text-gray-600 text-xs sm:text-sm">CTO Shortlist</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-blue-700 mb-1 sm:mb-2">90%+</div><div className="text-gray-600 text-xs sm:text-sm">Placement Success</div></div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 mb-3 block">Featured CTO Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse CTO Opportunities</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the <strong>CTO recruiter</strong> fees and connect with technology leadership opportunities directly.</p>
          </div>
          <EmbeddedJobBoard title="CTO Roles" accentColor="blue" jobsPerPage={6} />
        </div>
      </section>

      {/* What is a CTO Recruitment Agency */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=800&fit=crop&q=80" alt="Tech team meeting" fill className="object-cover opacity-[0.03]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a CTO Recruitment Agency?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed">A <strong>CTO recruitment agency</strong> specialises in placing Chief Technology Officers with companies. Unlike general tech recruiters, a <strong>CTO recruiter</strong> focuses on C-suite technology leadership, understanding system architecture, AI/ML strategy, and engineering team building.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">The best <strong>CTO recruitment agencies</strong> can properly assess technical capabilities across different domains: AI/ML, cloud infrastructure (AWS/GCP/Azure), security, and platform engineering. They understand the difference between a startup CTO who builds from scratch and an enterprise CTO who scales existing systems.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">A specialist <strong>CTO recruiter</strong> will also assess soft skills critical for tech leadership: engineering culture creation, cross-functional collaboration, and board-level communication. For PE/VC-backed companies, they evaluate technical due diligence capabilities.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a CTO Recruiter?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Best CTO Recruitment Agencies</h2>
            <p className="text-base sm:text-xl text-gray-600">Compare specialist <strong>CTO recruiters</strong> from boutique tech search to global executive search.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAgencies.map((agency, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-blue-500 transition-colors p-6 sm:p-8 hover:shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{agency.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 text-xs font-medium">{agency.speciality}</span>
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">CTO Recruitment Questions</h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/fractional-cto-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💻</div><div className="font-medium text-gray-900 text-sm sm:text-base">CTO Jobs UK</div></Link>
            <Link href="/fractional-cto" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📖</div><div className="font-medium text-gray-900 text-sm sm:text-base">What is a Fractional CTO?</div></Link>
            <Link href="/hire-fractional-cto" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Hire a CTO</div></Link>
            <Link href="/fractional-cto-salary" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💰</div><div className="font-medium text-gray-900 text-sm sm:text-base">CTO Salary Guide</div></Link>
            <Link href="/technology-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🏢</div><div className="font-medium text-gray-900 text-sm sm:text-base">Technology Recruitment</div></Link>
            <Link href="/cybersecurity-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔒</div><div className="font-medium text-gray-900 text-sm sm:text-base">Cybersecurity Recruitment</div></Link>
            <Link href="/fractional-cpo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📱</div><div className="font-medium text-gray-900 text-sm sm:text-base">CPO Jobs UK</div></Link>
            <Link href="/fractional-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Recruitment</div></Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">💻</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the CTO Recruiter Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-10 font-light">Get free CTO hiring advice and access our network of vetted technology leaders directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"><span className="text-xl sm:text-2xl">📅</span><span>Book Your Free Call</span></a>
            <Link href="/fractional-cto-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-blue-700 text-white text-base sm:text-lg font-bold hover:bg-blue-800 transition-colors border border-blue-400">Browse CTO Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <main>
      <LazyCopilotSidebar instructions={`## PAGE CONTEXT\nPage Type: guide | Topic: CTO Recruitment Agencies | URL: /cto-recruitment-agency\n\nYou're helping someone understand CTO recruitment agencies and how to hire Chief Technology Officers.\nKey facts: CTO recruiter fees 20-30% | 3-6 weeks for fractional, 8-16 weeks for permanent | Technical assessment critical`} labels={{ title: "CTO Hiring Guide", initial: firstName ? `Hi ${firstName}! I can help you find the right CTO recruitment agency or candidate.` : `Welcome! This guide covers CTO recruitment agencies and executive search.` }}>
        {pageContent}
      </LazyCopilotSidebar>
    </main>
  );
}
