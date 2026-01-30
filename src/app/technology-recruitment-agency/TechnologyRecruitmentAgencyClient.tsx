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
  { question: 'What is a technology recruitment agency?', answer: 'A technology recruitment agency specialises in placing tech professionals from developers to CTOs. The best tech recruitment agencies understand modern stacks, can assess technical skills, and have networks across AI, cloud, security, and engineering.' },
  { question: 'How much does a tech recruiter charge?', answer: 'Technology recruitment agency fees typically range from 15-25% of first year salary for permanent roles. For contract tech roles, expect margins of 15-30% on day rates. Executive tech search (CTO, VP Engineering) costs 25-35%.' },
  { question: 'What should I look for in a tech recruitment agency?', answer: 'Key criteria: (1) Technical assessment capabilities, (2) Specialism in your stack or domain, (3) Speed to present quality candidates, (4) Understanding of startup vs enterprise tech cultures.' },
  { question: 'How long does technology recruitment take?', answer: 'Developer and engineering placements typically take 2-4 weeks. CTO and VP Engineering roles take 6-12 weeks. Contract tech placements can be as fast as 1-2 weeks with established agencies.' },
  { question: 'Should I use a specialist tech recruiter?', answer: 'Yes - use a specialist technology recruitment agency for technical roles. Generalist recruiters cannot properly assess coding skills, system architecture, or technical leadership capabilities.' },
  { question: 'What roles do tech recruitment agencies cover?', answer: 'Technology recruitment agencies cover: developers (frontend, backend, full-stack), DevOps/SRE, data engineers, AI/ML specialists, CTOs, VP Engineering, engineering managers, architects, and technical product managers.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'Browse fractional tech leadership roles directly. No agency fees - connect with CTO, VP Engineering, and tech exec candidates.', speciality: 'Fractional Tech Execs', model: 'Job board', icon: '🎯' },
  { name: 'Hired', description: 'Tech-focused hiring platform matching developers and engineering leaders with companies.', speciality: 'Tech talent', model: 'Platform', icon: '💻' },
  { name: 'Talentful', description: 'Embedded tech recruitment model providing dedicated recruiters for scaling teams.', speciality: 'Scale-up tech', model: 'Embedded RPO', icon: '🚀' },
  { name: 'Searchlight', description: 'Technical recruitment specialists for startups and scale-ups across Europe.', speciality: 'Engineering', model: 'Contingent', icon: '🔍' },
  { name: 'Burns Sheehan', description: 'Developer recruitment specialists with strong networks in London tech scene.', speciality: 'Developers', model: 'Contingent', icon: '🏙️' },
  { name: 'Heidrick & Struggles', description: 'Global executive search with dedicated technology officer practice for CTO and CIO search.', speciality: 'Tech C-suite', model: 'Retained', icon: '🌐' },
];

const benefits = [
  { title: 'Technical Assessment', description: 'Technology recruitment agencies can properly assess coding skills, system design, and technical leadership that generalist recruiters cannot evaluate.', icon: '🔧' },
  { title: 'Stack-Specific Networks', description: 'Specialist tech recruiters have networks in specific domains - AI/ML, cloud (AWS/GCP), fintech, healthtech - to find the right technical fit.', icon: '🔗' },
  { title: 'Market Intelligence', description: 'Tech recruitment agencies provide salary benchmarking, competitor analysis, and market trends to help you position roles competitively.', icon: '📊' },
  { title: 'Speed to Hire', description: 'Established technology recruitment agencies can present qualified candidates within days, not weeks, thanks to their active networks.', icon: '⚡' },
  { title: 'Culture Assessment', description: 'The best tech recruiters understand startup vs enterprise cultures and assess candidates for cultural fit alongside technical skills.', icon: '🎯' },
  { title: 'Contract Flexibility', description: 'Technology recruitment agencies offer contract, permanent, and fractional placements to match your hiring needs and budget.', icon: '📋' },
];

export function TechnologyRecruitmentAgencyClient() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0] || null;
  const localImage = getLocalImage('cto');
  const imageCredit = getImage('cto');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-indigo-600 to-indigo-500 py-16 sm:py-24">
        <picture>
          <source media="(max-width: 768px)" srcSet={localImage?.mobile || '/images/hero/cto-mobile.webp'} type="image/webp" />
          <Image src={localImage?.desktop || '/images/hero/cto-desktop.webp'} alt="Technology Recruitment Agency - Tech Recruiter and Engineering Search" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/fractional-recruitment-agency" className="text-indigo-100 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Fractional Recruitment</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-indigo-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">Tech Recruitment</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">Technology<br /><span className="text-indigo-200">Recruitment Agency</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-indigo-50 leading-relaxed font-light mb-6 sm:mb-10">Find specialist <strong>technology recruitment agencies</strong> and <strong>tech recruiters</strong> for developers, engineering leaders, CTOs, and technical product managers.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">15-25%</div><div className="text-indigo-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">2-4 Weeks</div><div className="text-indigo-100 text-xs sm:text-sm uppercase tracking-wider mt-1">To Place</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">£400-1,500</div><div className="text-indigo-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Day Rate Range</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"><span>📅</span> Book a Free Call</a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-700 text-white font-bold uppercase tracking-wider hover:bg-indigo-800 transition-colors border border-indigo-500">View Tech Recruiters</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10"><a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a></div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-indigo-700 mb-1 sm:mb-2">15-25%</div><div className="text-gray-600 text-xs sm:text-sm">Tech Recruiter Fees</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-indigo-700 mb-1 sm:mb-2">3-6 Months</div><div className="text-gray-600 text-xs sm:text-sm">Rebate Period</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-indigo-700 mb-1 sm:mb-2">3-5</div><div className="text-gray-600 text-xs sm:text-sm">Candidate Shortlist</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-indigo-700 mb-1 sm:mb-2">85%+</div><div className="text-gray-600 text-xs sm:text-sm">Fill Rate</div></div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-700 mb-3 block">Featured Tech Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse Tech Leadership Opportunities</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the <strong>tech recruiter</strong> fees and connect with technology leadership opportunities directly.</p>
          </div>
          <EmbeddedJobBoard title="Tech Leadership Roles" accentColor="indigo" jobsPerPage={6} />
        </div>
      </section>

      {/* What is a Technology Recruitment Agency */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=800&fit=crop&q=80" alt="Tech team collaboration" fill className="object-cover opacity-[0.03]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a Technology Recruitment Agency?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed">A <strong>technology recruitment agency</strong> specialises in placing tech professionals from developers to C-suite technology leaders. Unlike generalist recruiters, a <strong>tech recruiter</strong> understands modern technology stacks, can assess technical skills, and maintains active networks across AI, cloud, security, and engineering domains.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">The best <strong>technology recruitment agencies</strong> combine technical assessment capabilities with deep market knowledge. They understand salary benchmarks, competitor landscapes, and what makes candidates move. For technical roles, this specialism is critical - generalist recruiters cannot properly evaluate coding abilities or system design skills.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">A specialist <strong>tech recruiter</strong> will also understand culture fit - the difference between startup and enterprise environments, remote vs hybrid preferences, and team dynamics. For leadership roles like CTO or VP Engineering, they assess both technical depth and management capabilities.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a Tech Recruitment Agency?</h2>
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Best Technology Recruitment Agencies</h2>
            <p className="text-base sm:text-xl text-gray-600">Compare specialist <strong>tech recruiters</strong> from developer-focused agencies to global technology executive search.</p>
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Technology Recruitment Questions</h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/cto-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💻</div><div className="font-medium text-gray-900 text-sm sm:text-base">CTO Recruitment</div></Link>
            <Link href="/cybersecurity-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🔒</div><div className="font-medium text-gray-900 text-sm sm:text-base">Cybersecurity Recruitment</div></Link>
            <Link href="/fractional-cto-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">CTO Jobs UK</div></Link>
            <Link href="/fintech-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🏦</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fintech Recruitment</div></Link>
            <Link href="/fractional-cto" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📖</div><div className="font-medium text-gray-900 text-sm sm:text-base">What is a Fractional CTO?</div></Link>
            <Link href="/hire-fractional-cto" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🤝</div><div className="font-medium text-gray-900 text-sm sm:text-base">Hire a CTO</div></Link>
            <Link href="/fractional-cpo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📱</div><div className="font-medium text-gray-900 text-sm sm:text-base">CPO Jobs UK</div></Link>
            <Link href="/fractional-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-indigo-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Recruitment</div></Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-indigo-600 to-indigo-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">💻</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the Tech Recruiter Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-indigo-100 mb-8 sm:mb-10 font-light">Get free tech hiring advice and access our network of vetted technology leaders directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"><span className="text-xl sm:text-2xl">📅</span><span>Book Your Free Call</span></a>
            <Link href="/fractional-cto-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-indigo-700 text-white text-base sm:text-lg font-bold hover:bg-indigo-800 transition-colors border border-indigo-400">Browse Tech Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <main>
      <LazyCopilotSidebar instructions={`## PAGE CONTEXT\nPage Type: guide | Topic: Technology Recruitment Agencies | URL: /technology-recruitment-agency\n\nYou're helping someone understand technology recruitment agencies and how to hire tech talent.\nKey facts: Tech recruiter fees 15-25% | 2-4 weeks for developers, 6-12 weeks for leadership | Technical assessment critical`} labels={{ title: "Tech Hiring Guide", initial: firstName ? `Hi ${firstName}! I can help you find the right technology recruitment agency or candidate.` : `Welcome! This guide covers technology recruitment agencies and tech hiring.` }}>
        {pageContent}
      </LazyCopilotSidebar>
    </main>
  );
}
