"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { FAQ, FAQItem } from "@/components/seo";
import { WebPageSchema, FAQPageSchema } from "@/components/seo";
import { HireProcessStepper } from "@/components/HireProcessStepper";
import Image from "next/image";
import { getHeroImageUrl, getImage } from '@/lib/images';
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { TableOfContents } from '@/components/TableOfContents'

// Table of Contents items for SEO
const tocItems = [
  { id: 'where-to-find', title: 'Where to Find Fractional CISOs' },
  { id: 'what-to-look-for', title: 'What to Look For' },
  { id: 'interview-questions', title: 'Interview Questions' },
  { id: 'hiring-process', title: 'Hiring Process' },
  { id: 'contract-terms', title: 'Contract Terms' },
  { id: 'cost-comparison', title: 'Cost Comparison' },
  { id: 'browse-candidates', title: 'Browse Candidates' },
  { id: 'faq', title: 'FAQ' },
]

// External authority links for E-E-A-T (CISO-specific)
const authorityLinks = [
  { name: 'NCSC', url: 'https://www.ncsc.gov.uk', description: 'National Cyber Security Centre' },
  { name: 'ICO', url: 'https://ico.org.uk', description: 'Information Commissioner\'s Office' },
  { name: 'ISACA', url: 'https://www.isaca.org', description: 'IT governance association' },
  { name: 'ISC2', url: 'https://www.isc2.org', description: 'Cybersecurity certification body' },
  { name: 'CREST', url: 'https://www.crest-approved.org', description: 'Cybersecurity accreditation' },
  { name: 'Cyber Essentials', url: 'https://www.cyberessentials.ncsc.gov.uk', description: 'UK government security standard' },
]

const faqItems: FAQItem[] = [
  { question: 'How long does it take to hire a fractional CISO?', answer: 'Typically 2-4 weeks. Security clearance checks may add time for regulated industries. Includes defining requirements (1-3 days), sourcing (3-7 days), interviews and vetting (1-2 weeks), and onboarding.' },
  { question: 'Where can I find fractional CISOs to hire?', answer: 'Main sources: (1) Security-focused fractional networks, (2) ISACA/ISC2 member networks, (3) LinkedIn with #FractionalCISO or #vCISO, (4) Security consultancies offering vCISO services, (5) VC portfolio security advisors.' },
  { question: 'What should I look for when hiring a fractional CISO?', answer: 'Key criteria: (1) Compliance certifications (CISSP, CISM), (2) Experience with your compliance needs (SOC 2, ISO 27001), (3) Industry experience (FinTech, healthcare), (4) Incident response track record, (5) Cloud security expertise.' },
  { question: 'How much does it cost to hire a fractional CISO?', answer: 'Day rates range from £900-£1,500 depending on certifications and industry. FCA-regulated experience commands premiums. Most engagements are 1-2 days per week (£3,600-£6,000/month).' },
  { question: 'What\'s the difference between fractional CISO and vCISO?', answer: 'Often used interchangeably. vCISO (virtual CISO) typically implies remote-first, while fractional CISO may include on-site presence. Both provide part-time security leadership without full-time cost.' },
];

const sourcingChannels = [
  { channel: 'Security Networks', description: 'ISACA chapters, ISC2 communities, CISO networks like Evanta or Venture in Security.', pros: 'Certified professionals, security-focused', bestFor: 'Finding certified security leaders', icon: '🔒' },
  { channel: 'vCISO Firms', description: 'Consultancies offering vCISO services (Coalfire, Secureworks, boutique security firms).', pros: 'Managed service, backup coverage', bestFor: 'Companies wanting managed security leadership', icon: '🏢' },
  { channel: 'LinkedIn Search', description: 'Search #FractionalCISO, #vCISO, or "Security Advisor" + certifications.', pros: 'Direct outreach, can verify certifications', bestFor: 'Companies with time to vet', icon: '💼' },
  { channel: 'Fractional Platforms', description: 'Fractional.Quest, CISO Global, or security-specific fractional networks.', pros: 'Pre-vetted security expertise', bestFor: 'Quick, quality placement', icon: '🎯' },
  { channel: 'VC Security Advisors', description: 'Ask your investors for security advisors from their portfolio.', pros: 'Startup experience, trusted recommendations', bestFor: 'Funded startups', icon: '🌟' },
  { channel: 'Security Conferences', description: 'RSA, Black Hat, BSides, or InfoSec Europe attendees and speakers.', pros: 'Current on threats, thought leaders', bestFor: 'Finding cutting-edge expertise', icon: '🎤' },
];

const evaluationCriteria = [
  { criteria: 'Relevant Certifications', description: 'Do they have the right certifications? CISSP, CISM, CISA are baseline. Industry-specific certs (HITRUST for healthcare, PCI DSS for payments) may be required.', lookFor: 'CISSP/CISM certified, relevant industry certifications, maintained credentials', redFlag: 'No certifications, expired credentials, only vendor-specific certs' },
  { criteria: 'Compliance Experience', description: 'Have they achieved the compliance frameworks you need? SOC 2, ISO 27001, GDPR, PCI DSS require specific experience.', lookFor: 'Led successful certifications, audit experience, compliance program design', redFlag: 'Only maintained compliance, never achieved certification from scratch' },
  { criteria: 'Industry Match', description: 'Do they understand your industry\'s specific security requirements? FinTech, healthcare, and B2B SaaS have different needs.', lookFor: 'Direct industry experience, understands regulatory landscape, relevant case studies', redFlag: 'No experience in your industry, dismissive of industry-specific requirements' },
  { criteria: 'Incident Response', description: 'Have they handled real security incidents? Breach response experience is invaluable and rare.', lookFor: 'Real incident experience, IR plan development, crisis management skills', redFlag: 'Only theoretical knowledge, no actual incident experience' },
  { criteria: 'Cloud Security', description: 'Do they understand modern cloud architectures? AWS, Azure, GCP security is essential for most companies now.', lookFor: 'Cloud certification (AWS Security Specialty), container security, DevSecOps', redFlag: 'Only traditional on-premise experience, can\'t discuss cloud security' },
  { criteria: 'Fractional Effectiveness', description: 'Can they be impactful part-time? Security requires consistent presence and quick response times.', lookFor: '2-4 clients, clear escalation procedures, responsive communication', redFlag: 'First fractional role, slow response times, overcommitted' },
];

export default function HireFractionalCISOClient() {
  const heroImage = getHeroImageUrl('services', 1920, 800);
  const imageCredit = getImage('services');

  return (
    <main>
      <WebPageSchema title="Hire a Fractional CISO UK 2026" description="How to hire a fractional CISO." url="https://fractional.quest/hire-fractional-ciso" dateModified={new Date('2026-01-07T00:00:00Z')} />
      <FAQPageSchema faqs={faqItems} />

      <div className="min-h-screen bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-red-600 to-rose-500 py-24">
            <Image src={heroImage} alt="Hire a Fractional CISO" fill priority sizes="100vw" className="object-cover" />
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
              <Link href="/fractional-ciso" className="text-red-100 hover:text-white mb-8 inline-flex items-center text-sm"><span className="mr-2">←</span> Back to Fractional CISO Guide</Link>
              <div className="max-w-4xl">
                <span className="inline-block bg-white text-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">Hiring Guide</span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">Hire a<br /><span className="text-red-200">Fractional CISO</span></h1>
                <p className="text-2xl md:text-3xl text-red-50 leading-relaxed font-light mb-10">Complete guide to finding, vetting, and hiring the perfect fractional Chief Information Security Officer.</p>
                <div className="flex flex-wrap gap-10 mb-12">
                  <div><div className="text-5xl font-black text-white">2-4 Weeks</div><div className="text-red-100 text-sm uppercase tracking-wider mt-1">To Hire</div></div>
                  <div><div className="text-5xl font-black text-white">90 Days</div><div className="text-red-100 text-sm uppercase tracking-wider mt-1">To SOC 2</div></div>
                  <div><div className="text-5xl font-black text-white">40+</div><div className="text-red-100 text-sm uppercase tracking-wider mt-1">Candidates</div></div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/fractional-ciso-jobs-uk" className="px-8 py-4 bg-white text-red-600 font-bold uppercase tracking-wider hover:bg-red-50 transition-colors">Browse CISO Candidates</Link>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 z-10">
              <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70">Photo: {imageCredit.credit}</a>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="bg-gray-50 border-b">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div><div className="text-4xl font-black text-red-600 mb-2">3-5</div><div className="text-gray-600 text-sm">Candidates to Interview</div></div>
                <div><div className="text-4xl font-black text-red-600 mb-2">6-12 Months</div><div className="text-gray-600 text-sm">Typical Engagement</div></div>
                <div><div className="text-4xl font-black text-red-600 mb-2">£900-1.5k</div><div className="text-gray-600 text-sm">Day Rate Range</div></div>
                <div><div className="text-4xl font-black text-red-600 mb-2">30 Days</div><div className="text-gray-600 text-sm">Standard Notice</div></div>
              </div>
            </div>
          </section>

          {/* Table of Contents */}
          <section className="py-8 bg-white border-b">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <TableOfContents items={tocItems} title="In This Guide" accentColor="red" />
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
                  <ul className="space-y-3">
                    {authorityLinks.slice(0, 4).map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-red-600 hover:text-red-800 flex items-center gap-2">
                          <span className="text-red-400">→</span> {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Where to Find */}
          <section id="where-to-find" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Sourcing</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Where to Find Fractional CISOs</h2>
                <p className="text-xl text-gray-600">Six proven channels for finding pre-vetted, experienced fractional security leaders.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sourcingChannels.map((source, index) => (
                  <div key={index} className="bg-gray-50 p-8 border-l-4 border-red-500 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{source.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{source.channel}</h3>
                    <p className="text-gray-600 text-sm mb-4">{source.description}</p>
                    <div className="mb-3"><div className="text-xs font-bold text-gray-500 uppercase mb-1">Pros:</div><div className="text-sm text-gray-700">{source.pros}</div></div>
                    <div><div className="text-xs font-bold text-gray-500 uppercase mb-1">Best For:</div><div className="text-sm text-red-600">{source.bestFor}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Evaluation Criteria */}
          <section id="what-to-look-for" className="py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Evaluation Criteria</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What to Look For in a Fractional CISO</h2>
                <p className="text-xl text-gray-600 max-w-3xl">Not all security professionals make good fractional CISOs. Here's what separates the best from the rest.</p>
              </div>
              <div className="space-y-8">
                {evaluationCriteria.map((item, index) => (
                  <div key={index} className="bg-white p-10 border-l-4 border-red-500 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{index + 1}. {item.criteria}</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg"><div className="text-sm font-bold text-red-800 mb-2">✅ Look For</div><p className="text-sm text-gray-700">{item.lookFor}</p></div>
                      <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg"><div className="text-sm font-bold text-gray-800 mb-2">🚩 Red Flag</div><p className="text-sm text-gray-700">{item.redFlag}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Interview Questions */}
          <section id="interview-questions" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Interview Guide</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Interview Questions to Ask</h2>
                <p className="text-xl text-gray-600 max-w-3xl">These questions separate strategic CISOs from technical specialists. Use them to assess expertise, incident response capability, and fit.</p>
              </div>
              <div className="space-y-8">
                <div className="bg-red-50 border-2 border-red-200 p-10 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">🔒 Security Strategy Questions</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-700"><strong className="text-gray-900">"Walk me through how you'd approach a security audit of our company. What would your first 30 days look like?"</strong><br/><span className="text-sm text-gray-600">Listen for: Methodical approach, risk assessment framework, stakeholder engagement</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you prioritize security investments when budget is limited?"</strong><br/><span className="text-sm text-gray-600">Listen for: Risk-based thinking, business alignment, quick wins vs long-term strategy</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"Tell me about a compliance certification you led (SOC 2, ISO 27001). What were the key challenges?"</strong><br/><span className="text-sm text-gray-600">Listen for: Hands-on experience, timeline management, stakeholder coordination</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you balance security requirements with business velocity?"</strong><br/><span className="text-sm text-gray-600">Listen for: Pragmatic approach, enablement mindset, understanding of business needs</span></li>
                  </ul>
                </div>
                <div className="bg-red-50 border-2 border-red-200 p-10 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">🚨 Incident Response Questions</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-700"><strong className="text-gray-900">"Describe a security incident you managed. What happened, how did you respond, what was the outcome?"</strong><br/><span className="text-sm text-gray-600">Listen for: Real experience, clear incident command, lessons learned</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How would you structure our incident response plan if we don't have one?"</strong><br/><span className="text-sm text-gray-600">Listen for: Playbook approach, communication plans, tabletop exercises</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"What's your approach to breach disclosure and regulatory notification?"</strong><br/><span className="text-sm text-gray-600">Listen for: ICO/regulatory knowledge, legal coordination, PR management</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you stay current on emerging threats and vulnerabilities?"</strong><br/><span className="text-sm text-gray-600">Listen for: Threat intelligence sources, continuous learning, industry networks</span></li>
                  </ul>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 p-10 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">☁️ Technical & Cloud Questions</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-700"><strong className="text-gray-900">"How would you secure our AWS/Azure/GCP environment? What are the key controls?"</strong><br/><span className="text-sm text-gray-600">Listen for: Cloud-native security knowledge, IAM, network security, data protection</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"What's your approach to securing a DevOps/CI-CD pipeline?"</strong><br/><span className="text-sm text-gray-600">Listen for: Shift-left security, SAST/DAST, secrets management, container security</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you approach vendor security assessments and third-party risk?"</strong><br/><span className="text-sm text-gray-600">Listen for: Vendor questionnaires, risk tiering, ongoing monitoring</span></li>
                    <li className="text-gray-700"><strong className="text-gray-900">"How do you stay effective working 1-2 days/week vs embedded full-time?"</strong><br/><span className="text-sm text-gray-600">Listen for: Async communication, clear escalation paths, monitoring tools</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Hiring Process */}
          <section id="hiring-process" className="py-24 bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-12 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Process</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">The Fractional CISO Hiring Process</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">From first conversation to start date in 2-4 weeks. Here's the proven process.</p>
              </div>
              <HireProcessStepper accentColor="red" />
              <div className="mt-16 bg-red-50 border-2 border-red-200 p-10 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Timeline Breakdown</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h4 className="font-bold text-gray-900 mb-2">Week 1: Define & Source</h4><ul className="text-sm text-gray-700 space-y-1"><li>• Define security requirements and compliance needs (Day 1-2)</li><li>• Post on job boards, ask for referrals (Day 2-3)</li><li>• Review candidates, verify certifications (Day 4-7)</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Week 2-3: Interview & Vet</h4><ul className="text-sm text-gray-700 space-y-1"><li>• First-round interviews (45-min calls)</li><li>• Second round: technical deep dive or case study</li><li>• Reference checks and certification verification</li><li>• Security clearance check if required</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Week 4: Onboard & Start</h4><ul className="text-sm text-gray-700 space-y-1"><li>• Contract signing with NDA and security terms</li><li>• Share access to systems and documentation</li><li>• First week: security posture assessment</li><li>• Begin risk assessment and roadmap work</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">First 90 Days: Deliver</h4><ul className="text-sm text-gray-700 space-y-1"><li>• Month 1: Security audit, quick wins, risk register</li><li>• Month 2: Policy development, compliance roadmap</li><li>• Month 3: Implementation, team training, metrics</li><li>• Decide to extend or part ways</li></ul></div>
                </div>
              </div>
            </div>
          </section>

          {/* Contract Terms */}
          <section id="contract-terms" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Contracts</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Contract Terms & Structure</h2>
                <p className="text-xl text-gray-600 max-w-3xl">Standard terms for fractional CISO engagements. Security roles require additional clauses around data access and confidentiality.</p>
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 p-10 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mt-0 mb-6">Standard Contract Template</h3>
                <div className="space-y-6">
                  <div><h4 className="font-bold text-gray-900 mb-2">Engagement Model</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Day rate:</strong> £900-£1,500 per day (based on certifications and industry)</li><li><strong>Commitment:</strong> 1-2 days per week (specify exact days)</li><li><strong>Monthly retainer option:</strong> £3,600-£6,000 for predictable billing</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Term & Notice</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Initial term:</strong> 3-month trial period</li><li><strong>Renewal:</strong> Auto-renew to 12-month rolling contract after trial</li><li><strong>Notice period:</strong> 30 days either side (standard)</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Scope of Work</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Responsibilities:</strong> Security strategy, compliance, incident response, policy development</li><li><strong>Deliverables:</strong> Risk assessments, security roadmap, compliance documentation, incident playbooks</li><li><strong>Exclusions:</strong> 24/7 SOC monitoring (unless scoped), penetration testing (use specialists)</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Security-Specific Clauses</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Security clearance:</strong> Vetting requirements for regulated industries</li><li><strong>Data access:</strong> Least privilege principle, access audit trails</li><li><strong>Confidentiality:</strong> Enhanced NDA with specific security incident clauses</li><li><strong>Non-compete:</strong> May apply to direct competitors in sensitive industries</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">IP & Confidentiality</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>IP ownership:</strong> Company owns all security documentation and policies</li><li><strong>Confidentiality:</strong> Extended NDA terms, survives termination by 3+ years</li><li><strong>Incident disclosure:</strong> Clear protocols for breach notification</li></ul></div>
                  <div><h4 className="font-bold text-gray-900 mb-2">Optional: Equity</h4><ul className="text-gray-700 space-y-1 text-base"><li><strong>Advisory shares:</strong> 0.1-0.25% for long-term engagements (12+ months)</li><li><strong>Vesting:</strong> Quarterly or annual vesting</li><li><strong>Cash reduction:</strong> If equity included, day rate may reduce 10-15%</li></ul></div>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Comparison */}
          <section id="cost-comparison" className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-16 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Investment</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Cost Comparison: Fractional vs Full-Time vs Consultancy</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Understand the total cost of each CISO hiring option for your business.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
                  <thead>
                    <tr className="bg-red-600 text-white">
                      <th className="px-6 py-4 text-left font-bold">Cost Factor</th>
                      <th className="px-6 py-4 text-center font-bold">Fractional CISO</th>
                      <th className="px-6 py-4 text-center font-bold">Full-Time CISO</th>
                      <th className="px-6 py-4 text-center font-bold">Security Consultancy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Annual Cost</td>
                      <td className="px-6 py-4 text-center text-red-700 font-bold">£45k - £75k</td>
                      <td className="px-6 py-4 text-center text-gray-600">£180k - £300k</td>
                      <td className="px-6 py-4 text-center text-gray-600">£100k - £400k</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Days per Week</td>
                      <td className="px-6 py-4 text-center text-red-700">1-2 days</td>
                      <td className="px-6 py-4 text-center text-gray-600">5 days</td>
                      <td className="px-6 py-4 text-center text-gray-600">Project-based</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Strategic Ownership</td>
                      <td className="px-6 py-4 text-center text-green-600">Full ownership</td>
                      <td className="px-6 py-4 text-center text-green-600">Full ownership</td>
                      <td className="px-6 py-4 text-center text-red-600">Advisory only</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Incident Response</td>
                      <td className="px-6 py-4 text-center text-green-600">On-call available</td>
                      <td className="px-6 py-4 text-center text-green-600">Full-time</td>
                      <td className="px-6 py-4 text-center text-red-600">Limited/extra cost</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Compliance Leadership</td>
                      <td className="px-6 py-4 text-center text-green-600">Yes (SOC 2, ISO)</td>
                      <td className="px-6 py-4 text-center text-green-600">Yes</td>
                      <td className="px-6 py-4 text-center text-green-600">Yes</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Equity Required</td>
                      <td className="px-6 py-4 text-center text-green-600">Optional (0.1-0.25%)</td>
                      <td className="px-6 py-4 text-center text-red-600">0.5-1.5%</td>
                      <td className="px-6 py-4 text-center text-green-600">None</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">Time to Hire</td>
                      <td className="px-6 py-4 text-center text-red-700">2-4 weeks</td>
                      <td className="px-6 py-4 text-center text-gray-600">3-6 months</td>
                      <td className="px-6 py-4 text-center text-gray-600">1-2 weeks</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Cross-Industry Experience</td>
                      <td className="px-6 py-4 text-center text-green-600">High (multiple clients)</td>
                      <td className="px-6 py-4 text-center text-gray-600">Limited</td>
                      <td className="px-6 py-4 text-center text-green-600">High</td>
                    </tr>
                    <tr className="bg-red-100">
                      <td className="px-6 py-4 font-bold text-gray-900">Best For</td>
                      <td className="px-6 py-4 text-center text-red-700 font-medium">Scale-ups needing security leadership</td>
                      <td className="px-6 py-4 text-center text-gray-600 font-medium">Enterprises with complex security needs</td>
                      <td className="px-6 py-4 text-center text-gray-600 font-medium">One-off audits or compliance projects</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-600">Sources: <a href="https://www.glassdoor.co.uk" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 underline">Glassdoor UK</a>, <a href="https://www.isc2.org" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 underline">ISC2 Salary Survey</a>, Market research</p>
              </div>
            </div>
          </section>

          {/* Browse CISO Candidates */}
          <section id="browse-candidates" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Find Talent</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Browse CISO Candidates</h2>
                <p className="text-xl text-gray-500">Connect with experienced fractional CISOs seeking new opportunities</p>
              </div>
              <EmbeddedJobBoard
                defaultDepartment="Security"
                title="Available CISO Talent"
                accentColor="red"
                jobsPerPage={6}
              />
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-black text-gray-900 mb-8">Frequently Asked Questions</h2>
              <FAQ items={faqItems} title="" skipSchema={true} />
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-red-600 text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Hire?</h2>
              <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">Browse 40+ pre-vetted fractional CISO candidates on Fractional.Quest. Post your role and start interviews this week.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/fractional-ciso-jobs-uk" className="px-10 py-5 bg-white text-red-600 font-bold uppercase tracking-wider hover:bg-red-50 transition-colors">Browse CISO Candidates</Link>
                <Link href="/contact" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-red-600 transition-colors">Post Your Role</Link>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="py-16 bg-white border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Related Resources</h2>
                <p className="text-gray-600">Explore more fractional executive hiring guides and resources</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {/* CISO Resources */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">CISO Resources</h3>
                  <ul className="space-y-2">
                    <li><Link href="/fractional-ciso" className="text-gray-600 hover:text-red-600 transition-colors">What is a Fractional CISO?</Link></li>
                    <li><Link href="/fractional-ciso-salary" className="text-gray-600 hover:text-red-600 transition-colors">CISO Salary & Day Rates</Link></li>
                    <li><Link href="/fractional-ciso-services" className="text-gray-600 hover:text-red-600 transition-colors">CISO Services</Link></li>
                    <li><Link href="/fractional-ciso-jobs-uk" className="text-gray-600 hover:text-red-600 transition-colors">CISO Jobs UK</Link></li>
                    <li><Link href="/interim-ciso-jobs-uk" className="text-gray-600 hover:text-red-600 transition-colors">Interim CISO Jobs</Link></li>
                  </ul>
                </div>
                {/* Other C-Suite Hiring */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Hire Other C-Suite</h3>
                  <ul className="space-y-2">
                    <li><Link href="/hire-fractional-cfo" className="text-gray-600 hover:text-red-600 transition-colors">Hire a Fractional CFO</Link></li>
                    <li><Link href="/hire-fractional-cto" className="text-gray-600 hover:text-red-600 transition-colors">Hire a Fractional CTO</Link></li>
                    <li><Link href="/hire-fractional-cmo" className="text-gray-600 hover:text-red-600 transition-colors">Hire a Fractional CMO</Link></li>
                    <li><Link href="/hire-fractional-coo" className="text-gray-600 hover:text-red-600 transition-colors">Hire a Fractional COO</Link></li>
                    <li><Link href="/hire-fractional-chro" className="text-gray-600 hover:text-red-600 transition-colors">Hire a Fractional CHRO</Link></li>
                  </ul>
                </div>
                {/* External Resources */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
                  <ul className="space-y-2">
                    {authorityLinks.map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1">
                          {link.name} <span className="text-gray-400 text-xs">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
    </main>
  );
}
