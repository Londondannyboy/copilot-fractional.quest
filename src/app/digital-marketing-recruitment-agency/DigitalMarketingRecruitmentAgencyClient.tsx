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
  { question: 'What is a digital marketing recruitment agency?', answer: 'A digital marketing recruitment agency specialises in placing performance marketers, growth leaders, and digital marketing executives. They understand SEO, PPC, demand generation, marketing automation, and data-driven marketing.' },
  { question: 'How much does a digital marketing recruiter charge?', answer: 'Digital marketing recruitment fees typically range from 15-20% of first year salary. For Head of Digital or VP Growth roles, expect 18-25%. Specialist performance marketing recruiters may charge premium rates.' },
  { question: 'What skills do digital marketing recruiters assess?', answer: 'Key skills: SEO/SEM expertise, paid media management (Google, Meta, LinkedIn), marketing automation platforms, attribution modeling, conversion optimization, and growth experimentation frameworks.' },
  { question: 'How long does digital marketing recruitment take?', answer: 'Digital marketing leadership roles typically take 4-8 weeks to fill. Specialist roles like Head of SEO or VP Growth may take longer due to limited candidate pools.' },
  { question: 'Should I use a digital marketing recruiter or generalist?', answer: 'Use a specialist digital marketing recruiter for senior performance and growth roles. They can properly assess technical skills, platform experience, and growth metrics that generalists cannot evaluate.' },
  { question: 'What\'s the difference between marketing and digital marketing recruitment?', answer: 'Digital marketing recruiters focus on performance marketing, growth, and data-driven roles. General marketing recruiters cover brand, communications, and traditional marketing.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'Browse digital marketing and growth roles directly. No agency fees.', speciality: 'Growth, Performance', model: 'Job board', icon: '🎯' },
  { name: 'Aspire', description: 'Specialist digital marketing recruitment with strong performance marketing focus.', speciality: 'Digital, Performance', model: 'Contingent', icon: '📱' },
  { name: 'Salt', description: 'Global digital recruitment specialist covering marketing technology and growth roles.', speciality: 'MarTech, Growth', model: 'Contingent', icon: '🌐' },
  { name: 'Sphere Digital', description: 'Digital marketing specialists with deep SEO, PPC, and content marketing networks.', speciality: 'SEO, PPC, Content', model: 'Contingent', icon: '🔍' },
  { name: 'Forward Role', description: 'Digital and ecommerce recruitment specialists in the UK.', speciality: 'Ecommerce, Digital', model: 'Contingent', icon: '🛒' },
  { name: 'Harnham', description: 'Data and analytics recruitment including marketing analytics and growth roles.', speciality: 'Analytics, Growth', model: 'Contingent', icon: '📊' },
];

const benefits = [
  { title: 'Platform Expertise', description: 'Digital marketing recruiters assess proficiency across platforms: Google Ads, Meta, LinkedIn, programmatic, and emerging channels.', icon: '📱' },
  { title: 'Growth Metrics Assessment', description: 'Specialist recruiters evaluate candidates on real growth metrics: CAC, LTV, conversion rates, and attribution methodology.', icon: '📈' },
  { title: 'MarTech Stack Knowledge', description: 'Digital recruiters understand marketing technology: CRM, automation, analytics, CDP, and data platforms.', icon: '💻' },
  { title: 'B2B vs B2C Expertise', description: 'Top digital recruiters understand different marketing models: PLG, demand gen, account-based, and consumer acquisition.', icon: '🎯' },
  { title: 'Startup vs Enterprise', description: 'They can match candidates to your stage: scrappy growth hackers for startups, scaled operators for enterprises.', icon: '🚀' },
  { title: 'Speed to Hire', description: 'Specialist digital recruiters typically place faster (4-6 weeks) due to focused networks and efficient screening.', icon: '⚡' },
];

export function DigitalMarketingRecruitmentAgencyClient() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0] || null;
  const localImage = getLocalImage('marketing');
  const imageCredit = getImage('marketing');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-pink-600 to-rose-500 py-16 sm:py-24">
        <picture>
          <source media="(max-width: 768px)" srcSet={localImage?.mobile || '/images/hero/marketing-mobile.webp'} type="image/webp" />
          <Image src={localImage?.desktop || '/images/hero/marketing-desktop.webp'} alt="Digital Marketing Recruitment Agency" fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/marketing-recruitment-agency" className="text-pink-100 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Marketing Recruitment</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-pink-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">Digital Marketing</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">Digital Marketing<br /><span className="text-pink-200">Recruitment Agency</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-pink-50 leading-relaxed font-light mb-6 sm:mb-10">Find specialist <strong>digital marketing recruitment agencies</strong> for performance marketing, demand generation, and growth leadership. Expert <strong>digital marketing recruiters</strong> for SEO, PPC, and PLG roles.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">£600-1,000</div><div className="text-pink-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Day Rate</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">4-6 Weeks</div><div className="text-pink-100 text-xs sm:text-sm uppercase tracking-wider mt-1">To Place</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">15-20%</div><div className="text-pink-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Typical Fee</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"><span>📅</span> Book a Free Call</a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-pink-700 text-white font-bold uppercase tracking-wider hover:bg-pink-800 transition-colors border border-pink-500">View Agencies</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10"><a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a></div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-pink-700 mb-1 sm:mb-2">£10k-25k</div><div className="text-gray-600 text-xs sm:text-sm">Recruiter Fees</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-pink-700 mb-1 sm:mb-2">3 Months</div><div className="text-gray-600 text-xs sm:text-sm">Guarantee</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-pink-700 mb-1 sm:mb-2">5-8</div><div className="text-gray-600 text-xs sm:text-sm">Candidates</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-pink-700 mb-1 sm:mb-2">85%+</div><div className="text-gray-600 text-xs sm:text-sm">Success Rate</div></div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-700 mb-3 block">Featured Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse Digital Marketing Jobs</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the <strong>digital marketing recruiter</strong> fees and connect directly.</p>
          </div>
          <EmbeddedJobBoard title="Digital Marketing Roles" accentColor="pink" jobsPerPage={6} />
        </div>
      </section>

      {/* What is section */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a Digital Marketing Recruitment Agency?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed">A <strong>digital marketing recruitment agency</strong> specialises in placing performance marketers, growth leaders, and digital marketing executives. A <strong>digital marketing recruiter</strong> understands SEO, PPC, demand generation, marketing automation, and data-driven marketing strategies.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">The best <strong>digital marketing recruitment agencies</strong> can assess candidates across different specialisms: search marketing, paid social, programmatic, email marketing, and conversion optimization. They evaluate both technical platform skills and strategic growth thinking.</p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">Unlike general marketing recruiters, a specialist <strong>digital marketing recruiter</strong> will assess MarTech stack experience, attribution methodology understanding, and the ability to drive measurable growth through data-driven experimentation.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a Digital Marketing Recruiter?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 border-l-4 border-pink-500 hover:shadow-md transition-shadow">
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Best Digital Marketing Recruiters</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAgencies.map((agency, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-pink-500 transition-colors p-6 sm:p-8 hover:shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{agency.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-pink-100 text-pink-800 px-3 py-1 text-xs font-medium">{agency.speciality}</span>
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
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Digital Marketing Recruitment Questions</h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/fractional-cmo-jobs-uk" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-pink-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📣</div><div className="font-medium text-gray-900 text-sm sm:text-base">CMO Jobs UK</div></Link>
            <Link href="/marketing-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-pink-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📢</div><div className="font-medium text-gray-900 text-sm sm:text-base">Marketing Recruitment</div></Link>
            <Link href="/fractional-cmo" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-pink-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">📖</div><div className="font-medium text-gray-900 text-sm sm:text-base">What is a Fractional CMO?</div></Link>
            <Link href="/fractional-recruitment-agency" className="bg-gray-50 p-4 sm:p-6 rounded-lg border hover:border-pink-500 hover:shadow-md transition-all text-center"><div className="text-2xl sm:text-3xl mb-2">🎯</div><div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Recruitment</div></Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-pink-600 to-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">📈</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the Digital Marketing Recruiter Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-pink-100 mb-8 sm:mb-10 font-light">Get free hiring advice and access our network of growth marketers directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"><span className="text-xl sm:text-2xl">📅</span><span>Book Your Free Call</span></a>
            <Link href="/fractional-cmo-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-pink-700 text-white text-base sm:text-lg font-bold hover:bg-pink-800 transition-colors border border-pink-400">Browse Marketing Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <main>
      <LazyCopilotSidebar instructions={`## PAGE CONTEXT\nPage Type: guide | Topic: Digital Marketing Recruitment | URL: /digital-marketing-recruitment-agency\n\nYou're helping someone understand digital marketing recruitment agencies.\nKey facts: Fees 15-20% | 4-6 weeks to place | SEO, PPC, demand gen, growth marketing focus`} labels={{ title: "Digital Marketing Hiring", initial: firstName ? `Hi ${firstName}! I can help you find digital marketing talent.` : `Welcome! This guide covers digital marketing recruitment.` }}>
        {pageContent}
      </LazyCopilotSidebar>
    </main>
  );
}
