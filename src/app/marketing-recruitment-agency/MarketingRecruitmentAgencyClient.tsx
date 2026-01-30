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
  { question: 'What is a marketing recruitment agency?', answer: 'A marketing recruitment agency specialises in placing CMOs, VPs of Marketing, and marketing leaders. They understand brand strategy, demand generation, PLG, and can assess candidates for B2B, B2C, and DTC marketing roles.' },
  { question: 'How much does a marketing recruiter charge?', answer: 'Marketing recruitment fees typically range from 15-25% of first year compensation. For fractional CMO placements, expect 15-25% of expected annual billings. Retained CMO search typically costs £15,000-£40,000.' },
  { question: 'What should I look for in a CMO recruiter?', answer: 'Key criteria: (1) Track record of CMO-level placements, (2) Understanding of your marketing model (B2B, B2C, PLG), (3) Network in your sector, (4) Ability to assess both brand and performance marketing.' },
  { question: 'How long does CMO recruitment take?', answer: 'Fractional or interim CMO placements typically take 3-6 weeks. Permanent CMO searches take 8-14 weeks for retained search including portfolio reviews and stakeholder interviews.' },
  { question: 'Should I use a marketing recruiter or a generalist?', answer: 'Use a specialist marketing recruiter for CMO and VP-level roles. Generalist recruiters cannot properly assess marketing strategy, channel expertise, or team building capabilities.' },
  { question: 'What skills do marketing recruiters assess?', answer: 'Top marketing recruiters assess: brand strategy, demand generation, marketing technology stack, team leadership, agency management, and board-level reporting capabilities.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'Browse fractional CMO roles directly. No agency fees - connect with marketing leadership candidates.', speciality: 'Fractional CMO', model: 'Job board', icon: '🎯' },
  { name: 'Marketing Leaders Network', description: 'Specialist CMO recruitment network with strong B2B SaaS and consumer brand focus.', speciality: 'CMO, VP Marketing', model: 'Network matching', icon: '📣' },
  { name: 'Odgers Berndtson', description: 'Global executive search with dedicated CMO and marketing leadership practice.', speciality: 'CMO, CGO', model: 'Retained search', icon: '🌐' },
  { name: 'Grace Blue Partnership', description: 'Marketing and creative leadership specialists with global network across brands and agencies.', speciality: 'CMO, Marketing Director', model: 'Executive search', icon: '💙' },
  { name: 'The Marketing Society', description: 'Professional network with CMO recruitment and career services for marketing leaders.', speciality: 'CMO, Marketing Director', model: 'Network', icon: '📊' },
  { name: 'Michael Page Marketing', description: 'Global recruitment firm with dedicated marketing executive practice.', speciality: 'All marketing roles', model: 'Contingent', icon: '📈' },
];

const benefits = [
  { title: 'Marketing Model Expertise', description: 'Marketing recruiters understand B2B, B2C, PLG, and enterprise marketing models. They can match CMO candidates to your specific go-to-market strategy.', icon: '🎯' },
  { title: 'Portfolio Assessment', description: 'Top marketing recruiters evaluate brand campaigns, growth metrics, and marketing ROI. They can assess both creative and performance marketing capabilities.', icon: '📊' },
  { title: 'Sector-Specific Networks', description: 'Specialist CMO recruiters have networks in specific sectors: SaaS, consumer, fintech, healthtech - to find candidates with relevant experience.', icon: '🔗' },
  { title: 'MarTech Assessment', description: 'Marketing recruiters assess marketing technology stack experience: CRM, marketing automation, analytics, and data platforms.', icon: '💻' },
  { title: 'Team Building Evaluation', description: 'CMO recruiters evaluate team building, agency management, and cross-functional collaboration experience.', icon: '👥' },
  { title: 'Replacement Guarantee', description: 'Most marketing recruitment agencies offer 3-6 month replacement guarantees for CMO placements.', icon: '🛡️' },
];

export function MarketingRecruitmentAgencyClient() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0] || null;
  const localImage = getLocalImage('cmo');
  const imageCredit = getImage('cmo');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-purple-600 to-purple-500 py-16 sm:py-24">
        <picture>
          <source media="(max-width: 768px)" srcSet={localImage?.mobile || '/images/hero/cmo-mobile.webp'} type="image/webp" />
          <Image src={localImage?.desktop || '/images/hero/cmo-desktop.webp'} alt="Marketing Recruitment Agency - CMO and VP Marketing Executive Search" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/fractional-recruitment-agency" className="text-purple-100 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Fractional Recruitment</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-purple-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">Marketing Search</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">Marketing<br /><span className="text-purple-200">Recruitment Agency</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-purple-50 leading-relaxed font-light mb-6 sm:mb-10">Find specialist <strong>marketing recruitment agencies</strong> for CMO, VP Marketing, and marketing leadership placements. Expert <strong>marketing recruiters</strong> for B2B, B2C, brand, and demand generation roles.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">£800-1,400</div><div className="text-purple-100 text-xs sm:text-sm uppercase tracking-wider mt-1">CMO Day Rate</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">3-6 Weeks</div><div className="text-purple-100 text-xs sm:text-sm uppercase tracking-wider mt-1">To Place</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">15-25%</div><div className="text-purple-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"><span>📅</span> Book a Free Call</a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-purple-700 text-white font-bold uppercase tracking-wider hover:bg-purple-800 transition-colors border border-purple-500">View Marketing Recruiters</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10"><a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a></div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-purple-700 mb-1 sm:mb-2">£15k-40k</div><div className="text-gray-600 text-xs sm:text-sm">CMO Recruiter Fees</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-purple-700 mb-1 sm:mb-2">3-6 Months</div><div className="text-gray-600 text-xs sm:text-sm">Guarantee Period</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-purple-700 mb-1 sm:mb-2">5-8</div><div className="text-gray-600 text-xs sm:text-sm">CMO Candidates</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-purple-700 mb-1 sm:mb-2">85%+</div><div className="text-gray-600 text-xs sm:text-sm">Placement Success</div></div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700 mb-3 block">Featured CMO Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse CMO & Marketing Leadership Jobs</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the <strong>marketing recruiter</strong> fees and connect with marketing leadership opportunities directly.</p>
          </div>
          <EmbeddedJobBoard title="CMO & Marketing Roles" accentColor="purple" jobsPerPage={6} />
        </div>
      </section>

      {/* What is a Marketing Recruitment Agency */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=800&fit=crop&q=80" alt="Marketing team meeting" fill className="object-cover opacity-[0.03]" /></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a Marketing Recruitment Agency?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed">A <strong>marketing recruitment agency</strong> specialises in placing CMOs, VPs of Marketing, and marketing leadership with companies. A <strong>marketing recruiter</strong> understands the difference between brand marketing, demand generation, product marketing, and growth marketing.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">The best <strong>marketing recruitment agencies</strong> can assess candidates across different marketing models: B2B enterprise, B2B SaaS, PLG, consumer/DTC, and marketplace. They evaluate both creative capabilities and data-driven performance marketing skills.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">A specialist <strong>marketing recruiter</strong> will also assess MarTech stack experience, agency management capabilities, and board-level reporting. For scale-ups, they evaluate growth marketing expertise and the ability to build marketing teams from scratch.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a Marketing Recruiter?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 border-l-4 border-purple-500 hover:shadow-md transition-shadow">
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Best Marketing Recruitment Agencies</h2>
            <p className="text-base sm:text-xl text-gray-600">Compare specialist <strong>marketing recruiters</strong> from boutique CMO search to global executive search.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAgencies.map((agency, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-purple-500 transition-colors p-6 sm:p-8 hover:shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{agency.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 text-xs font-medium">{agency.speciality}</span>
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Marketing Recruitment Questions</h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/fractional-cmo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-purple-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📣</div><div className="font-medium text-gray-900 text-sm sm:text-base">CMO Jobs UK</div></Link>
            <Link href="/fractional-cmo" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-purple-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📖</div><div className="font-medium text-gray-900 text-sm sm:text-base">What is a Fractional CMO?</div></Link>
            <Link href="/hire-fractional-cmo" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-purple-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Hire a CMO</div></Link>
            <Link href="/fractional-cmo-salary" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-purple-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">💰</div><div className="font-medium text-gray-900 text-sm sm:text-base">CMO Salary Guide</div></Link>
            <Link href="/digital-marketing-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-purple-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📱</div><div className="font-medium text-gray-900 text-sm sm:text-base">Digital Marketing Recruitment</div></Link>
            <Link href="/fractional-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-purple-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Recruitment</div></Link>
            <Link href="/interim-cmo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-purple-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">⏱️</div><div className="font-medium text-gray-900 text-sm sm:text-base">Interim CMO Jobs</div></Link>
            <Link href="/fractional-cmo-services" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-purple-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">⚙️</div><div className="font-medium text-gray-900 text-sm sm:text-base">CMO Services</div></Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-purple-600 to-purple-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">📣</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the Marketing Recruiter Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-purple-100 mb-8 sm:mb-10 font-light">Get free CMO hiring advice and access our network of vetted marketing leaders directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"><span className="text-xl sm:text-2xl">📅</span><span>Book Your Free Call</span></a>
            <Link href="/fractional-cmo-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-purple-700 text-white text-base sm:text-lg font-bold hover:bg-purple-800 transition-colors border border-purple-400">Browse CMO Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <main>
      <LazyCopilotSidebar instructions={`## PAGE CONTEXT\nPage Type: guide | Topic: Marketing Recruitment Agencies | URL: /marketing-recruitment-agency\n\nYou're helping someone understand marketing recruitment agencies and how to hire CMOs and marketing leaders.\nKey facts: CMO recruiter fees 15-25% | 3-6 weeks for fractional, 8-14 weeks for permanent | B2B vs B2C expertise matters`} labels={{ title: "CMO Hiring Guide", initial: firstName ? `Hi ${firstName}! I can help you find the right marketing recruitment agency or CMO candidate.` : `Welcome! This guide covers marketing recruitment agencies and CMO hiring.` }}>
        {pageContent}
      </LazyCopilotSidebar>
    </main>
  );
}
