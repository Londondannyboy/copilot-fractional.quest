"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { authClient } from "@/lib/auth/client";
import { FAQItem } from "@/components/seo";
import { getLocalImage, getImage } from '@/lib/images';
import { LazyCopilotSidebar } from "@/components/LazyCopilotSidebar";

// Lazy-load below-fold components
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
  { question: 'What is a finance recruitment agency?', answer: 'A finance recruitment agency specialises in placing CFOs, Finance Directors, and other senior finance professionals with companies. They understand financial qualifications (ACA, ACCA, CIMA), sector-specific experience requirements, and can assess candidates for fractional, interim, or permanent roles.' },
  { question: 'How much do finance recruitment agencies charge?', answer: 'Fees typically range from 15-25% of first year salary for permanent roles, or 15-25% of expected annual billings for fractional CFO placements. Retained search for senior finance roles may cost £15,000-£40,000. Some agencies offer flat-fee models for interim placements.' },
  { question: 'What qualifications should a CFO recruiter look for?', answer: 'Top CFO recruiters look for ACA, ACCA, or CIMA qualifications, plus Big 4 or top-tier audit experience. For fractional CFO roles, they also assess portfolio career experience, day rate expectations, and the ability to work with multiple clients simultaneously.' },
  { question: 'How long does it take to hire a CFO through an agency?', answer: 'Typically 3-6 weeks for fractional or interim CFO roles, and 6-12 weeks for permanent CFO positions. Finance recruitment agencies with strong networks can often present shortlisted candidates within 1-2 weeks.' },
  { question: 'What\'s the difference between a CFO recruiter and a generalist?', answer: 'A specialist CFO recruiter understands finance qualifications, sector experience (PE-backed, VC-backed, public company), technical skills (M&A, fundraising, IPO prep), and can properly assess candidates. Generalist recruiters may not understand the nuances of senior finance roles.' },
  { question: 'Should I use a finance recruitment agency or hire directly?', answer: 'Use a finance recruitment agency if you need speed, access to passive candidates, or are hiring for a specialist role (M&A CFO, PE CFO). Hire directly if you have strong finance networks, want to save fees, or are hiring a junior finance role.' },
];

const topAgencies = [
  { name: 'Fractional.Quest', description: 'Browse fractional CFO and Finance Director roles directly. No agency fees - connect with candidates directly.', speciality: 'CFO, FD, Finance Director', model: 'Job board', icon: '🎯' },
  { name: 'The Fractional CFO Network', description: 'Specialist network focused on fractional and interim CFO placements. Strong in PE/VC-backed companies.', speciality: 'CFO, FD', model: 'Network matching', icon: '💰' },
  { name: 'FD Capital Recruitment', description: 'Established finance recruitment agency with deep CFO and FD networks across the UK.', speciality: 'CFO, FD, Financial Controller', model: 'Traditional search', icon: '📊' },
  { name: 'Marks Sattin Executive', description: 'Leading finance executive search firm with strong presence in London and Big 4 networks.', speciality: 'CFO, Group FD, Divisional FD', model: 'Executive search', icon: '👔' },
  { name: 'Michael Page Finance', description: 'Global recruitment firm with dedicated finance executive practice covering all levels.', speciality: 'All finance roles', model: 'Contingent & retained', icon: '🌐' },
  { name: 'Robert Half Executive Search', description: 'Specialist finance recruiter with strong focus on qualified accountants and finance leaders.', speciality: 'CFO, FD, Financial Controller', model: 'Contingent search', icon: '📈' },
];

const comparisonData = [
  { factor: 'Cost', directHire: 'Free (your time only)', agency: '15-25% of year 1 compensation' },
  { factor: 'Time to hire', directHire: '6-12 weeks', agency: '3-6 weeks' },
  { factor: 'Candidate quality', directHire: 'Depends on your network', agency: 'Pre-vetted, qualified (ACA/ACCA/CIMA)' },
  { factor: 'Market knowledge', directHire: 'Limited visibility', agency: 'Full market access + salary benchmarks' },
  { factor: 'Negotiation support', directHire: 'Self-managed', agency: 'Agent-assisted rate negotiation' },
  { factor: 'Technical assessment', directHire: 'Self-assessment', agency: 'Finance-specific technical screening' },
];

const benefits = [
  { title: 'Qualified Candidates', description: 'Finance recruitment agencies pre-screen for ACA, ACCA, and CIMA qualifications. They verify Big 4 and industry experience before presenting candidates.', icon: '✓' },
  { title: 'Sector Expertise', description: 'Specialist CFO recruiters understand the difference between PE-backed, VC-backed, and public company finance roles. They match candidates to your specific needs.', icon: '🎯' },
  { title: 'Salary Benchmarking', description: 'Finance recruitment agencies know current CFO salaries and day rates by sector, company stage, and location. They can advise if your budget is realistic.', icon: '📊' },
  { title: 'Technical Assessment', description: 'Top finance recruiters assess technical skills: M&A experience, fundraising track record, systems implementation, and board reporting capabilities.', icon: '💼' },
  { title: 'Confidential Search', description: 'If you\'re replacing an existing CFO or FD, agencies can run a confidential search without alerting the market or your current team.', icon: '🔒' },
  { title: 'Replacement Guarantee', description: 'Most finance recruitment agencies offer 3-6 month replacement guarantees. If the CFO doesn\'t work out, they\'ll find a replacement at no extra cost.', icon: '🛡️' },
];

export function FinanceRecruitmentAgencyClient() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || null;

  // Use CFO images for finance recruitment
  const localImage = getLocalImage('cfo');
  const imageCredit = getImage('cfo');

  const pageContent = (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-gradient-to-br from-blue-600 to-blue-500 py-16 sm:py-24">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={localImage?.mobile || '/images/hero/cfo-mobile.webp'}
            type="image/webp"
          />
          <Image
            src={localImage?.desktop || '/images/hero/cfo-desktop.webp'}
            alt="Finance Recruitment Agency - CFO and Finance Director Recruitment"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </picture>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/fractional-recruitment-agency" className="text-blue-100 hover:text-white mb-6 sm:mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Back to Recruitment Agencies</Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-blue-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">Finance Recruitment</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-tight">Finance<br /><span className="text-blue-200">Recruitment Agency</span></h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-blue-50 leading-relaxed font-light mb-6 sm:mb-10">Find the best <strong>finance recruitment agencies</strong> for CFO, Finance Director, and FD recruitment. Compare specialist agencies for fractional, interim, and permanent finance leadership.</p>
            <div className="flex flex-wrap gap-4 sm:gap-10 mb-8 sm:mb-12">
              <div><div className="text-3xl sm:text-5xl font-black text-white">£1,000-1,500</div><div className="text-blue-100 text-xs sm:text-sm uppercase tracking-wider mt-1">CFO Day Rate</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">3-6 Weeks</div><div className="text-blue-100 text-xs sm:text-sm uppercase tracking-wider mt-1">To Place</div></div>
              <div><div className="text-3xl sm:text-5xl font-black text-white">ACA/ACCA</div><div className="text-blue-100 text-xs sm:text-sm uppercase tracking-wider mt-1">Qualified</div></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <span>📅</span> Book a Free Call
              </a>
              <Link href="#agencies" className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-700 text-white font-bold uppercase tracking-wider hover:bg-blue-800 transition-colors border border-blue-500">View Top Agencies</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 z-10">
          <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a>
        </div>
      </section>

      {/* COMPANIES CTA PANEL */}
      <section className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <span className="inline-block bg-white/20 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6">For Companies</span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Need to Hire a CFO or Finance Director?</h2>
              <p className="text-base sm:text-xl text-white/90 mb-4 sm:mb-6">Skip the <strong>finance recruitment agency</strong> fees. Talk directly with Dan Keegan for free CFO hiring advice and access to our vetted network of finance leaders.</p>
              <ul className="space-y-2 sm:space-y-3 text-white/90 mb-6 sm:mb-8">
                <li className="flex items-center gap-3"><span className="text-xl sm:text-2xl">✓</span> Free CFO hiring consultation</li>
                <li className="flex items-center gap-3"><span className="text-xl sm:text-2xl">✓</span> No agency fees - browse finance candidates directly</li>
                <li className="flex items-center gap-3"><span className="text-xl sm:text-2xl">✓</span> Honest advice on CFO day rates and packages</li>
                <li className="flex items-center gap-3"><span className="text-xl sm:text-2xl">✓</span> IR35 and finance contractor guidance</li>
              </ul>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-gray-900 text-base sm:text-lg font-bold py-3 sm:py-4 px-6 sm:px-8 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                <span className="text-xl sm:text-2xl">📅</span>
                <span>Book Your Free Call</span>
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">💰</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">What Companies Get</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-bold text-white mb-1">Free CFO Hiring Strategy</div>
                  <div className="text-white/80 text-sm">30 minutes to discuss your finance leadership needs</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-bold text-white mb-1">Access to CFO Job Board</div>
                  <div className="text-white/80 text-sm">Browse 50+ fractional and interim CFO candidates</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-bold text-white mb-1">CFO Salary Benchmarks</div>
                  <div className="text-white/80 text-sm">Know current CFO day rates before you negotiate</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="font-bold text-white mb-1">Zero Placement Fees</div>
                  <div className="text-white/80 text-sm">Save 15-25% vs traditional finance recruiters</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div><div className="text-2xl sm:text-4xl font-black text-blue-700 mb-1 sm:mb-2">£15k-40k</div><div className="text-gray-600 text-xs sm:text-sm">Finance Recruiter Fees</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-blue-700 mb-1 sm:mb-2">3-6 Months</div><div className="text-gray-600 text-xs sm:text-sm">Guarantee Period</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-blue-700 mb-1 sm:mb-2">5-8</div><div className="text-gray-600 text-xs sm:text-sm">CFO Candidates</div></div>
            <div><div className="text-2xl sm:text-4xl font-black text-blue-700 mb-1 sm:mb-2">90%+</div><div className="text-gray-600 text-xs sm:text-sm">Placement Success</div></div>
          </div>
        </div>
      </section>

      {/* Embedded Job Board - HIGH UP */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 mb-3 block">Featured CFO Roles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse CFO & Finance Director Jobs</h2>
            <p className="text-base sm:text-lg text-gray-600">Skip the finance recruitment agency and connect with CFO opportunities directly on Fractional Quest.</p>
          </div>
          <EmbeddedJobBoard title="CFO & Finance Director Roles" accentColor="blue" jobsPerPage={6} />
        </div>
      </section>

      {/* What is a Finance Recruitment Agency */}
      <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&h=800&fit=crop&q=80"
            alt="Finance professionals in meeting"
            fill
            className="object-cover opacity-[0.03]"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Overview</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">What is a Finance Recruitment Agency?</h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed">
              A <strong>finance recruitment agency</strong> specialises in placing CFOs, Finance Directors, Financial Controllers, and other senior finance professionals. Unlike generalist recruiters, they understand financial qualifications (ACA, ACCA, CIMA), sector-specific experience, and can assess candidates for fractional, interim, or permanent roles.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              The best CFO recruiters have deep networks in the finance community, often coming from Big 4 or industry finance backgrounds themselves. They understand the difference between a PE-backed CFO, a VC-backed scale-up FD, and a public company Group Finance Director.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              The <strong>finance recruitment agency</strong> market includes both traditional executive search firms and newer fractional/interim specialist networks. Fees typically range from 15-25% for contingent search, with retained search costing £15,000-£40,000 for senior CFO roles.
            </p>
          </div>
          <div className="mt-10 sm:mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Not sure what CFO level you need?</h3>
              <p className="text-gray-600 text-sm sm:text-base">Get free advice on fractional vs full-time CFO, and what qualifications to prioritise.</p>
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
      </section>

      {/* Benefits of Using a Finance Recruiter */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Benefits</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Why Use a Finance Recruitment Agency?</h2>
            <p className="text-base sm:text-lg text-gray-600">Working with a specialist CFO recruiter provides key advantages over hiring directly.</p>
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

      {/* MID PAGE CTA */}
      <section className="py-12 sm:py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">💼</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">Ready to Hire a CFO?</h2>
          <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8">Most companies don&apos;t need to pay a finance recruitment agency. Let&apos;s discuss your specific needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-700 text-white font-bold uppercase tracking-wider hover:bg-blue-800 transition-colors"
            >
              <span>📅</span> Book a Free Call
            </a>
            <Link href="/fractional-cfo-jobs-uk" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors">
              Browse CFO Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Top Finance Recruitment Agencies */}
      <section id="agencies" className="relative py-16 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=800&fit=crop&q=80"
            alt="Financial district skyline"
            fill
            className="object-cover opacity-[0.02]"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Top Agencies</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Best Finance Recruitment Agencies</h2>
            <p className="text-base sm:text-xl text-gray-600">Compare specialist CFO and Finance Director recruiters, from job boards to retained executive search.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAgencies.map((agency, index) => (
              <div key={index} className="bg-white border border-gray-200 hover:border-blue-500 transition-colors p-6 sm:p-8 hover:shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{agency.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{agency.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agency.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 text-xs font-medium">{agency.speciality}</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs">{agency.model}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Comparison</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Direct Hire vs Finance Recruitment Agency</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-bold text-sm sm:text-base">Factor</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-bold text-sm sm:text-base">Direct Hire</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-bold text-sm sm:text-base">Finance Recruiter</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 text-sm sm:text-base">{row.factor}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 text-sm sm:text-base">{row.directHire}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 text-sm sm:text-base">{row.agency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">FAQ</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">Finance Recruitment Questions</h2>
          </div>
          <FAQ skipSchema items={faqItems} />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/fractional-cfo-jobs-uk" className="bg-white p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">💼</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">CFO Jobs UK</div>
            </Link>
            <Link href="/fractional-cfo" className="bg-white p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">📖</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">What is a Fractional CFO?</div>
            </Link>
            <Link href="/hire-fractional-cfo" className="bg-white p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">🎯</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">Hire a CFO</div>
            </Link>
            <Link href="/fractional-cfo-salary" className="bg-white p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">💰</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">CFO Salary Guide</div>
            </Link>
            <Link href="/cfo-recruitment-agency" className="bg-white p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">🎯</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">CFO Recruitment Agency</div>
            </Link>
            <Link href="/fractional-recruitment-agency" className="bg-white p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">🏢</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">Fractional Recruitment</div>
            </Link>
            <Link href="/interim-cfo-jobs-uk" className="bg-white p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">⏱️</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">Interim CFO Jobs</div>
            </Link>
            <Link href="/fractional-cfo-services" className="bg-white p-4 sm:p-6 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-center">
              <div className="text-2xl sm:text-3xl mb-2">⚙️</div>
              <div className="font-medium text-gray-900 text-sm sm:text-base">CFO Services</div>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-blue-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">💼</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">Skip the Finance Recruitment Agency Fees</h2>
          <p className="text-base sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-10 font-light">Get free CFO hiring advice and access our network of vetted finance leaders directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              <span className="text-xl sm:text-2xl">📅</span>
              <span>Book Your Free Call</span>
            </a>
            <Link href="/fractional-cfo-jobs-uk" className="px-8 sm:px-10 py-4 sm:py-5 bg-blue-700 text-white text-base sm:text-lg font-bold hover:bg-blue-800 transition-colors border border-blue-400">
              Browse CFO Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <main>
      <LazyCopilotSidebar
        instructions={`## PAGE CONTEXT
Page Type: guide | Topic: Finance Recruitment Agencies | URL: /finance-recruitment-agency

You're helping someone understand finance recruitment agencies and how to find/hire CFOs and Finance Directors.
Key facts: Agency fees 15-25% | 3-6 weeks to hire CFO | Fractional.Quest is a job board not agency | ACA/ACCA/CIMA qualifications important`}
        labels={{
          title: "CFO Hiring Guide",
          initial: firstName ? `Hi ${firstName}! I can help you find the right finance recruitment agency or CFO candidate.` : `Welcome! This guide covers finance recruitment agencies and CFO hiring.`
        }}
      >
        {pageContent}
      </LazyCopilotSidebar>
    </main>
  );
}
