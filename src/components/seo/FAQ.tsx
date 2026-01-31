'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items?: FAQItem[]
  faqs?: FAQItem[]  // Alias for backwards compatibility
  title?: string
  className?: string
  skipSchema?: boolean  // Set to true if page has its own FAQPage schema
}

export function FAQ({ items, faqs, title = 'Frequently Asked Questions', className = '', skipSchema = false }: FAQProps) {
  // Support both 'items' and 'faqs' prop names
  const faqItems = items || faqs || []

  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className={`${className}`}>
      {/* JSON-LD structured data for SEO - skip if page has its own FAQPage schema */}
      {!skipSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {title && (
        <h2 className="text-3xl font-bold text-gray-900 mb-8 font-editorial">{title}</h2>
      )}

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white card-hover"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
              <span className="flex-shrink-0 ml-4">
                <svg
                  className={`w-5 h-5 text-accent transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div
                className="p-6 pt-0 text-gray-600 leading-relaxed [&_a]:text-accent [&_a]:underline [&_a]:hover:text-accent-dark"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Pre-defined FAQ sets for common pages
export const CMO_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CMO?',
    answer: 'A Fractional CMO (Chief Marketing Officer) is an experienced marketing executive who works with companies on a part-time or contract basis, typically 1-3 days per week. They provide strategic marketing leadership without the commitment and cost of a full-time hire, making senior marketing expertise accessible to startups, scale-ups, and SMEs.',
  },
  {
    question: 'How much do Fractional CMO jobs pay in the UK?',
    answer: 'Fractional CMO day rates in the UK typically range from £700 to £1,400 per day, depending on experience, industry, and location. London-based roles often command premium rates of £900-£1,400/day, while regional positions average £700-£1,000/day. Annual earnings for fractional CMOs working with multiple clients can range from £100,000 to £250,000+.',
  },
  {
    question: 'What qualifications do I need for Fractional CMO jobs?',
    answer: 'Successful Fractional CMO candidates typically have 12-15+ years of marketing experience with at least 5 years in senior leadership roles. Key requirements include a proven track record of driving revenue growth, expertise in specific marketing channels (performance, brand, PLG, ABM), experience building and managing teams, and strong stakeholder management skills.',
  },
  {
    question: 'How many days per week do Fractional CMOs work?',
    answer: 'Most Fractional CMO engagements involve 1-3 days per week per client. Many fractional CMOs work with 2-4 clients simultaneously, totaling 4-5 working days per week. Engagement intensity often varies based on company needs - increasing during product launches or fundraising and reducing during steady-state periods.',
  },
  {
    question: 'What industries hire Fractional CMOs in the UK?',
    answer: 'The highest demand for Fractional CMOs in the UK comes from B2B SaaS companies, FinTech, DTC/E-commerce, HealthTech, and Professional Services. Startups post-Series A frequently hire fractional CMOs to establish marketing foundations, while established SMEs use them for specific initiatives like rebranding or market expansion.',
  },
  {
    question: 'What is the difference between a Fractional CMO and a Marketing Consultant?',
    answer: 'A Fractional CMO is an embedded executive who takes ownership of marketing strategy and typically manages teams, attends leadership meetings, and is accountable for results. A Marketing Consultant typically provides advice and recommendations on specific projects without the ongoing leadership responsibilities. Fractional CMOs are often seen as part of the executive team.',
  },
]

export const CFO_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CFO?',
    answer: 'A Fractional CFO (Chief Financial Officer) is an experienced finance executive who works with companies on a part-time basis, typically 1-3 days per week. They provide strategic financial leadership, fundraising support, and financial operations expertise without the cost of a full-time CFO hire.',
  },
  {
    question: 'How much do Fractional CFO jobs pay in the UK?',
    answer: 'Fractional CFO day rates in the UK typically range from £800 to £1,500 per day, with London roles often at the higher end. Annual earnings for experienced fractional CFOs with multiple clients can exceed £200,000.',
  },
  {
    question: 'What qualifications do I need for Fractional CFO jobs?',
    answer: 'Fractional CFOs typically need ACA, ACCA, or CIMA qualifications, 15+ years of finance experience including senior leadership roles, and expertise in areas like fundraising, M&A, or financial transformation. Industry-specific knowledge (e.g., SaaS metrics, e-commerce) is highly valued.',
  },
  {
    question: 'What do Fractional CFOs do?',
    answer: 'Fractional CFOs handle strategic financial planning, fundraising and investor relations, financial reporting and compliance, cash flow management, building finance teams, M&A support, and board reporting. They act as a strategic partner to the CEO and leadership team.',
  },
  {
    question: 'How quickly can I hire a Fractional CFO?',
    answer: 'Fractional CFOs can typically start within 1-2 weeks of engagement. Unlike full-time CFO recruitment which takes 3-6 months, fractional CFOs are experienced professionals ready to hit the ground running. Most begin with a financial health check and 90-day improvement plan.',
  },
  {
    question: 'What is the difference between a Fractional CFO and an Interim CFO?',
    answer: 'A Fractional CFO works part-time (1-3 days/week) on an ongoing basis, often with multiple clients simultaneously. An Interim CFO works full-time but temporarily, usually to cover a gap or lead a specific project. Fractional CFOs are ideal for companies that need senior finance leadership but not full-time capacity.',
  },
  {
    question: 'How do Fractional CFO engagements typically work?',
    answer: 'Most Fractional CFO engagements start with a discovery phase to assess financial health and priorities. Typical arrangements include 1-3 fixed days per week, monthly retainer models, or project-based work. The CFO attends leadership meetings, produces board packs, manages investor relations, and drives financial strategy alongside your team.',
  },
  {
    question: 'When should my company hire a Fractional CFO instead of a full-time CFO?',
    answer: 'Hire a Fractional CFO when you need senior finance leadership but: your company is pre-Series B and cannot justify full-time CFO cost (£150k-£250k+ package), you need specific expertise for a defined period (fundraising, exit), or your finance function is not yet complex enough for 5 days/week of CFO attention. Full-time CFOs suit Series C+ companies with complex multi-entity structures.',
  },
]

export const CTO_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CTO?',
    answer: 'A Fractional CTO (Chief Technology Officer) is an experienced technology executive who works with companies on a part-time basis, typically 1-3 days per week. They provide strategic technology leadership, architecture decisions, and engineering team oversight without the commitment of a full-time CTO hire. Day rates range from £800-£1,250 in the UK. (Source: CodPal, Fractional CTO Experts Jan 2026)',
  },
  {
    question: 'How much does a Fractional CTO cost in the UK?',
    answer: 'Fractional CTO costs in the UK range from £800-£1,600 per day or £2,400-£8,000 per month depending on experience and sector. Entry-level fractional CTOs charge £800-£1,000/day, senior CTOs charge £1,000-£1,250/day, and AI/ML specialists command £1,200-£1,600/day. Monthly retainers are common for ongoing engagements. This represents 40-60% savings compared to a full-time CTO at £155,000-£250,000 annually.',
  },
  {
    question: 'When should a company hire a Fractional CTO?',
    answer: 'Hire a Fractional CTO when you: (1) Are building an MVP and need technical architecture decisions, (2) Have non-technical founders needing tech strategy, (3) Are preparing for fundraising requiring due diligence, (4) Need to scale your engineering team from 3-20 people, (5) Have technical debt requiring modernisation strategy, (6) Need technology credibility for investors or the board.',
  },
  {
    question: 'What does a Fractional CTO do?',
    answer: 'Fractional CTOs provide: technology strategy and 12-24 month roadmaps, system architecture and tech stack decisions, engineering team leadership and mentoring, code quality standards and best practices, security and compliance frameworks, DevOps and infrastructure strategy, and board-level technology reporting. They work 10-20 hours per week per client.',
  },
  {
    question: 'What is the difference between a Fractional CTO and Interim CTO?',
    answer: 'A Fractional CTO works part-time (1-3 days/week) with multiple clients simultaneously on an ongoing basis. An Interim CTO works full-time (5 days/week) for a single company for a fixed period (3-9 months), typically filling a gap or leading a specific project. Fractional CTOs cost £2,400-£8,000/month while Interim CTOs cost £8,000-£12,000/week.',
  },
  {
    question: 'What qualifications should a Fractional CTO have?',
    answer: 'Look for: 10-15+ years technology experience with prior CTO, VP Engineering, or Tech Lead experience. Key qualifications include hands-on coding background, experience scaling engineering teams from 3-20+ people, fundraising or due diligence experience for VC-backed roles, relevant sector expertise (SaaS, FinTech, HealthTech), and modern tech stack knowledge (cloud, DevOps, AI/ML).',
  },
  {
    question: 'How many hours per week does a Fractional CTO work?',
    answer: 'Fractional CTOs typically work 10-20 hours per week per client (1-3 days). Most engage with 2-4 clients simultaneously. Common structures include: 1 day/week for strategy and oversight, 2 days/week for active technical leadership, 3 days/week for hands-on architecture and team building. Engagements usually run 6-12 months minimum.',
  },
  {
    question: 'Do Fractional CTOs get equity compensation?',
    answer: 'Some Fractional CTOs receive equity (typically 0.1-0.5%) alongside reduced day rates, especially for longer startup engagements. This is less than full-time CTOs (0.5-2% equity) but can be valuable for early-stage companies. Most fractional engagements are fee-based only, with equity reserved for strategic advisory relationships.',
  },
]

export const COO_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional COO?',
    answer: 'A Fractional COO (Chief Operating Officer) is an experienced operations executive who works with companies on a part-time basis, typically 1-3 days per week. They optimise operations, build scalable processes, and translate vision into execution. Day rates range from £600-£1,500 in the UK. (Source: ScaleUpExec, Like Sunday Jan 2026)',
  },
  {
    question: 'How much does a Fractional COO cost in the UK?',
    answer: 'Fractional COO costs in the UK range from £600-£1,500 per day or £3,000-£10,000 per month depending on experience and sector. SME COOs charge £700-£1,000/day, scale-up COOs charge £950-£1,300/day, and PE-backed/turnaround specialists command £1,200-£1,500/day. This represents 49-71% savings compared to a full-time COO at £130,000-£230,000 annually.',
  },
  {
    question: 'What does a Fractional COO do?',
    answer: 'Fractional COOs focus on: operational strategy development, process optimisation and efficiency improvements, team structure and scaling (20 to 100+ employees), vendor management and contract negotiation, KPI development and performance dashboards, change management and transformation, and implementing operational systems like EOS.',
  },
  {
    question: 'When should a company hire a Fractional COO?',
    answer: 'Hire a Fractional COO when: (1) Operations cannot keep up with rapid growth, (2) The CEO/founder needs to delegate operational leadership, (3) Processes are ad-hoc and inefficient, (4) Scaling from 20 to 100+ employees, (5) Expanding to new markets or products, (6) Post-acquisition integration is needed, (7) Preparing for exit or fundraising.',
  },
  {
    question: 'What is the difference between a Fractional COO and Interim COO?',
    answer: 'A Fractional COO works part-time (2-3 days/week) with multiple clients on an ongoing basis (6+ months). An Interim COO works full-time (4-5 days/week) for a single company for a fixed period (3-9 months), typically during transitions or turnarounds. Fractional COOs cost £3,000-£10,000/month while Interim COOs cost £8,000-£15,000/week.',
  },
  {
    question: 'What qualifications should a Fractional COO have?',
    answer: 'Look for: 15+ years business operations experience with prior COO, Operations Director, or GM experience. Key qualifications include CMI or IoD membership, experience scaling businesses through growth phases, EOS or similar operating system implementation, sector expertise, and track record of operational transformation and efficiency gains.',
  },
  {
    question: 'How is a Fractional COO different from a Fractional CFO?',
    answer: 'A Fractional CFO focuses on financial strategy, reporting, fundraising, and investor relations. A Fractional COO focuses on operational execution, process efficiency, team scaling, and day-to-day business operations. Many companies hire both: the CFO for financial oversight and the COO for operational delivery. Some overlap exists in areas like budgeting and resource planning.',
  },
  {
    question: 'What types of Fractional COO roles exist?',
    answer: 'Common Fractional COO specialisations include: Scale-up COO (rapid growth and team building), E-commerce COO (supply chain and fulfilment), Process COO (lean operations and efficiency), Integration COO (M&A and company integration), EOS Integrator (Entrepreneurial Operating System implementation), and Turnaround COO (restructuring and crisis management).',
  },
]

export const CHRO_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CHRO?',
    answer: 'A Fractional CHRO (Chief Human Resources Officer) is an experienced HR executive who works with companies on a part-time basis. They provide strategic HR leadership, build people operations, develop talent strategies, and create the HR infrastructure needed to scale.',
  },
  {
    question: 'How much do Fractional CHRO jobs pay in the UK?',
    answer: 'Fractional CHRO day rates in the UK typically range from £600 to £1,100 per day. Rates vary based on company size, complexity of HR challenges, and whether the role includes executive coaching or organisational development.',
  },
  {
    question: 'When should a company hire a Fractional CHRO?',
    answer: 'Companies typically hire Fractional CHROs when scaling rapidly and need to professionalise HR, preparing for significant hiring phases, building company culture during growth, implementing performance management systems, or navigating complex people challenges like restructuring.',
  },
]

export const CEO_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CEO?',
    answer: 'A Fractional CEO (Chief Executive Officer) is an experienced executive who provides part-time leadership to companies, typically during transitions, turnarounds, or when founders need experienced guidance. They may serve as interim CEO or work alongside existing leadership.',
  },
  {
    question: 'How much do Fractional CEO jobs pay in the UK?',
    answer: 'Fractional CEO day rates in the UK typically range from £1,000 to £2,000 per day, reflecting the seniority and responsibility of the role. Many arrangements also include performance-based compensation or equity participation.',
  },
  {
    question: 'When should a company hire a Fractional CEO?',
    answer: 'Companies hire Fractional CEOs during leadership transitions, when founders want to step back, during turnaround situations, when preparing for exits or acquisitions, or when the board wants experienced executive guidance alongside a founder CEO.',
  },
]

export const CPO_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CPO?',
    answer: 'A Fractional CPO (Chief Product Officer) is an experienced product executive who works with companies on a part-time basis. They provide product strategy, build product teams, establish product processes, and guide product-market fit and roadmap development.',
  },
  {
    question: 'How much do Fractional CPO jobs pay in the UK?',
    answer: 'Fractional CPO day rates in the UK typically range from £800 to £1,400 per day. Rates are influenced by product complexity, whether the role is B2B or B2C, and expertise in specific methodologies like PLG or enterprise product development.',
  },
  {
    question: 'When should a company hire a Fractional CPO?',
    answer: 'Companies hire Fractional CPOs when building their first product team, transitioning from founder-led to professional product management, launching new product lines, pivoting product strategy, or when needing senior product guidance without full-time commitment.',
  },
]

export const CISO_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CISO?',
    answer: 'A Fractional CISO (Chief Information Security Officer) is an experienced security executive who works with companies on a part-time basis. They develop security strategies, ensure compliance, manage risk, and build security programs without the cost of a full-time CISO.',
  },
  {
    question: 'How much do Fractional CISO jobs pay in the UK?',
    answer: 'Fractional CISO day rates in the UK typically range from £900 to £1,500 per day, reflecting the specialised nature of security expertise. Rates are higher for those with compliance certifications (ISO 27001, SOC 2) or experience in regulated industries.',
  },
  {
    question: 'When should a company hire a Fractional CISO?',
    answer: 'Companies hire Fractional CISOs when preparing for security audits or certifications, responding to security incidents, needing to demonstrate security posture to enterprise customers, building security programs, or when compliance requirements demand security leadership.',
  },
]

export const CIO_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CIO?',
    answer: 'A Fractional CIO (Chief Information Officer) is an experienced IT executive who works with companies on a part-time basis, typically 1-3 days per week. They provide strategic IT leadership, oversee digital transformation, manage technology infrastructure, and align IT strategy with business goals without the cost of a full-time CIO.',
  },
  {
    question: 'How much do Fractional CIO jobs pay in the UK?',
    answer: 'Fractional CIO day rates in the UK typically range from £900 to £1,400 per day. Rates are higher for those with experience in digital transformation, cloud migration, or ERP implementations. Annual earnings for experienced fractional CIOs with multiple clients can range from £180,000 to £280,000.',
  },
  {
    question: 'What is the difference between a CIO and a CTO?',
    answer: 'A CIO focuses on internal IT operations, infrastructure, and business systems (ERP, CRM, internal tools), while a CTO focuses on product technology, engineering teams, and external-facing technology. CIOs optimise business operations through technology; CTOs build technology products. Some organisations combine these roles.',
  },
  {
    question: 'What qualifications do I need for Fractional CIO jobs?',
    answer: 'Fractional CIOs typically need 10-15+ years of IT leadership experience with prior CIO, IT Director, or VP IT background. Certifications like CGEIT, CISM, or ITIL are valued. Experience with ERP systems, cloud platforms, and digital transformation initiatives is essential.',
  },
  {
    question: 'When should a company hire a Fractional CIO?',
    answer: 'Companies hire Fractional CIOs when undergoing digital transformation, implementing new business systems (ERP, CRM), optimising IT costs, improving cybersecurity posture, preparing for scale, or when they need senior IT leadership but cannot justify a full-time hire.',
  },
]

export const CRO_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CRO?',
    answer: 'A Fractional CRO (Chief Revenue Officer) is an experienced revenue executive who works with companies on a part-time basis, typically 1-3 days per week. They provide strategic revenue leadership, build sales teams, develop go-to-market strategies, and drive revenue growth without the cost of a full-time CRO hire.',
  },
  {
    question: 'How much do Fractional CRO jobs pay in the UK?',
    answer: 'Fractional CRO day rates in the UK typically range from £1,000 to £1,500 per day, with PE-backed and high-growth SaaS roles at the premium end (£1,200-£1,800). Annual earnings for experienced fractional CROs with multiple clients can range from £200,000 to £360,000.',
  },
  {
    question: 'What qualifications do I need for Fractional CRO jobs?',
    answer: 'Fractional CROs typically need 10-15+ years of sales leadership experience with a proven track record of scaling revenue. Prior VP Sales, CRO, or CCO experience is essential. Sector-specific expertise (SaaS metrics, enterprise sales cycles) adds significant value. Revenue operations and Salesforce/HubSpot proficiency is expected.',
  },
  {
    question: 'What is the difference between a CRO and VP Sales?',
    answer: 'A CRO has broader responsibility than VP Sales, typically owning all revenue-generating functions: sales, marketing, customer success, and partnerships. Fractional CROs often report to the CEO and may have board-level involvement. The role focuses on revenue strategy and growth, not just sales execution.',
  },
  {
    question: 'When should a company hire a Fractional CRO?',
    answer: 'Companies hire Fractional CROs when building or scaling sales teams, developing go-to-market strategy, expanding into new markets, preparing for fundraising, improving revenue predictability, or when they need senior revenue leadership without full-time commitment.',
  },
]

// Service-focused FAQs (for company/employer audience)
export const CMO_SERVICE_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CMO?',
    answer: 'A Fractional CMO is an experienced Chief Marketing Officer who works with your company part-time, typically 1-3 days per week. You get strategic marketing leadership, team management, and growth expertise without the cost of a full-time executive hire.',
  },
  {
    question: 'When should my company hire a Fractional CMO?',
    answer: 'Consider hiring a fractional CMO when: you need to build or rebuild your marketing strategy; your marketing team needs senior leadership; you\'re scaling and need to professionalise marketing; you\'re launching into new markets or segments; your current marketing isn\'t delivering results; or you need expertise in specific areas (PLG, demand gen, brand).',
  },
  {
    question: 'How much does a Fractional CMO cost?',
    answer: 'Fractional CMOs typically charge £700-£1,400 per day in the UK. At 2 days per week, this translates to roughly £70,000-£140,000 annually—compared to £150,000-£250,000+ for a full-time CMO (including salary, benefits, and overhead). You save 40-60% while getting equivalent expertise.',
  },
  {
    question: 'What does a Fractional CMO do?',
    answer: 'A Fractional CMO develops marketing strategy, manages and mentors your marketing team, oversees campaigns and channels, builds marketing infrastructure, tracks performance metrics, manages agency relationships, aligns marketing with sales, and reports to the board on marketing performance and ROI.',
  },
  {
    question: 'How is a Fractional CMO different from a marketing agency?',
    answer: 'A Fractional CMO is an embedded leader—they join your team, attend leadership meetings, manage your people, and take ownership of results. Agencies execute specific campaigns or channels but don\'t provide strategic leadership or team management. Many companies use both: a fractional CMO to lead strategy with agencies handling execution.',
  },
  {
    question: 'How quickly can a Fractional CMO make an impact?',
    answer: 'Most fractional CMOs can begin adding value within the first 2-4 weeks—conducting audits, identifying quick wins, and developing initial strategy. Significant results typically emerge within 3-6 months as strategies are implemented. The key is that fractional CMOs are experienced and can move fast.',
  },
]

export const CFO_SERVICE_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CFO?',
    answer: 'A Fractional CFO is an experienced Chief Financial Officer who works with your company on a part-time basis, typically 1-3 days per week. You get senior-level financial leadership, strategic guidance, and hands-on expertise at a fraction of the cost of a full-time CFO.',
  },
  {
    question: 'When should my company hire a Fractional CFO?',
    answer: 'Consider hiring a fractional CFO when: you\'re preparing for fundraising or due diligence; your finance function needs professionalising; you need strategic financial guidance but can\'t justify a full-time CFO; you\'re scaling rapidly and need to build financial infrastructure; or you\'re navigating a major transition (M&A, restructuring, IPO prep).',
  },
  {
    question: 'How much does a Fractional CFO cost?',
    answer: 'Fractional CFOs typically charge £800-£1,500 per day in the UK, depending on experience and specialisation. At 2 days per week, this translates to roughly £80,000-£150,000 annually—compared to £180,000-£300,000+ for a full-time CFO (including salary, benefits, and overhead).',
  },
  {
    question: 'Can a Fractional CFO help with fundraising?',
    answer: 'Yes—fundraising support is one of the most common reasons to hire a fractional CFO. They can build financial models, prepare data rooms, create investor presentations, manage due diligence, negotiate terms, and provide credibility with investors. Many fractional CFOs have raised hundreds of millions across multiple deals.',
  },
]

export const CTO_SERVICE_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CTO?',
    answer: 'A Fractional CTO is an experienced Chief Technology Officer who works with your company part-time, typically 1-3 days per week. You get technical leadership, architecture guidance, and engineering strategy without the cost of a full-time CTO.',
  },
  {
    question: 'When should my company hire a Fractional CTO?',
    answer: 'Consider hiring a fractional CTO when: you\'re building your first product and need technical direction; your engineering team needs senior leadership; you\'re preparing for fundraising and need technical credibility; you\'re scaling and need to evolve your architecture; or you need expertise in specific areas (AI, security, cloud migration).',
  },
  {
    question: 'How much does a Fractional CTO cost?',
    answer: 'Fractional CTOs typically charge £850-£1,600 per day in the UK, with specialised expertise (AI, security) at the higher end. At 2 days per week, this translates to roughly £85,000-£160,000 annually—compared to £180,000-£350,000+ for a full-time CTO.',
  },
  {
    question: 'Can a Fractional CTO help with technical due diligence?',
    answer: 'Yes—technical due diligence is a common reason to engage a fractional CTO. They can prepare your technology for investor scrutiny, address technical debt concerns, document architecture, and represent your technical capabilities during fundraising or M&A processes.',
  },
]

export const COO_SERVICE_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional COO?',
    answer: 'A Fractional COO is an experienced Chief Operating Officer who works with your company part-time, typically 1-3 days per week. You get operational leadership, process optimisation, and scaling expertise without the cost of a full-time COO.',
  },
  {
    question: 'When should my company hire a Fractional COO?',
    answer: 'Consider hiring a fractional COO when: you\'re scaling rapidly and operations are struggling to keep up; your processes are inefficient or undocumented; you need to build operational infrastructure; you\'re experiencing growing pains; or the CEO is spending too much time on operations instead of strategy.',
  },
  {
    question: 'How much does a Fractional COO cost?',
    answer: 'Fractional COOs typically charge £750-£1,400 per day in the UK. At 2 days per week, this translates to roughly £75,000-£140,000 annually—compared to £160,000-£250,000+ for a full-time COO.',
  },
  {
    question: 'What does a Fractional COO do?',
    answer: 'A Fractional COO optimises operations and processes, implements systems and tools, manages key initiatives and projects, builds operational teams, creates playbooks and SOPs, oversees vendor relationships, drives cross-functional alignment, and frees the CEO to focus on strategy and growth.',
  },
]

export const CRO_SERVICE_FAQS: FAQItem[] = [
  {
    question: 'What is a Fractional CRO?',
    answer: 'A Fractional CRO is an experienced Chief Revenue Officer who works with your company part-time, typically 1-3 days per week. You get revenue leadership, sales team management, and go-to-market expertise without the cost of a full-time CRO.',
  },
  {
    question: 'When should my company hire a Fractional CRO?',
    answer: 'Consider hiring a fractional CRO when: you need to scale revenue but cannot justify a full-time CRO; your sales team needs senior leadership; you\'re expanding into new markets; you\'re preparing for fundraising and need to demonstrate revenue predictability; or you need to build sales infrastructure and processes.',
  },
  {
    question: 'How much does a Fractional CRO cost?',
    answer: 'Fractional CROs typically charge £1,000-£1,500 per day in the UK, with PE-backed and high-growth SaaS roles at £1,200-£1,800. At 2 days per week, this translates to roughly £100,000-£180,000 annually—compared to £200,000-£350,000+ for a full-time CRO.',
  },
  {
    question: 'What does a Fractional CRO do?',
    answer: 'A Fractional CRO develops revenue strategy, builds and manages sales teams, creates sales playbooks and processes, oversees pipeline management, aligns sales with marketing and customer success, manages key customer relationships, and reports to the board on revenue performance and forecasts.',
  },
  {
    question: 'Can a Fractional CRO help with fundraising?',
    answer: 'Yes—demonstrating revenue predictability and growth is crucial for fundraising. A fractional CRO can build the sales infrastructure, metrics, and forecasting that investors want to see, while also participating in investor meetings to add credibility to your revenue story.',
  },
]

// Export FAQItem type for use in other components
export type { FAQItem }
