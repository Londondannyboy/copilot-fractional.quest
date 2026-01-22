const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_9mG4aJRxgtpz@ep-wandering-darkness-abiq57ia-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);

const pages = [
  {
    slug: 'fractional-cio',
    page_type: 'role_definition',
    title: 'Fractional CIO | Part-Time Chief Information Officer UK',
    meta_description: 'What is a Fractional CIO? Discover how part-time Chief Information Officers deliver enterprise IT strategy to growing businesses. Learn about day rates, responsibilities, and when to hire.',
    keywords: ['fractional cio', 'part-time cio', 'chief information officer', 'fractional it leadership', 'cio services uk'],
    canonical_url: 'https://fractional.quest/fractional-cio',
    hero_title: 'Fractional CIO',
    hero_subtitle: 'Strategic IT leadership for growing businesses - without the full-time commitment',
    hero_badge: 'IT Leadership',
    image_category: 'technology',
    accent_color: 'blue',
    job_board_enabled: true,
    job_board_department: 'Technology',
    job_board_title: 'CIO & IT Leadership Roles',
    sections: [
      {
        type: 'definition_box',
        heading: 'What is a Fractional CIO?',
        content: 'A Fractional CIO (Chief Information Officer) is an experienced IT executive who provides strategic technology leadership to multiple organisations on a part-time or project basis. They deliver the same strategic IT oversight as a full-time CIO—developing IT roadmaps, managing digital transformation, ensuring cybersecurity compliance, and aligning technology investments with business objectives—but at a fraction of the cost and commitment.'
      },
      {
        type: 'intro',
        heading: 'Why Businesses Choose Fractional CIOs',
        content: 'UK businesses increasingly recognise that effective IT leadership doesn\'t require a £200k+ full-time salary. Fractional CIOs bring decades of experience across multiple industries, having navigated countless technology transformations, system migrations, and digital strategies. This breadth of experience often exceeds what a single full-time hire could offer.'
      },
      {
        type: 'role_types',
        heading: 'Types of Fractional CIO Engagements',
        items: [
          { title: 'Strategic Advisory', description: 'IT strategy development and board-level technology guidance', rate: '£1,200-1,800/day' },
          { title: 'Transformation Lead', description: 'Digital transformation and system modernisation projects', rate: '£1,400-2,000/day' },
          { title: 'Interim CIO', description: 'Full IT leadership during transitions or executive search', rate: '£1,500-2,200/day' },
          { title: 'Virtual CIO', description: 'Ongoing part-time IT executive support (1-3 days/week)', rate: '£800-1,400/day' }
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'Average Day Rate', value: '£1,400' },
          { label: 'Market Growth', value: '34%' },
          { label: 'Typical Engagement', value: '6-18 months' },
          { label: 'Cost Savings vs FTE', value: '60-70%' }
        ]
      },
      {
        type: 'responsibilities',
        heading: 'What Does a Fractional CIO Do?',
        items: [
          'Develop and execute IT strategy aligned with business goals',
          'Oversee technology infrastructure and system architecture',
          'Lead digital transformation initiatives',
          'Manage IT budgets and vendor relationships',
          'Ensure cybersecurity and regulatory compliance (GDPR, ISO 27001)',
          'Build and mentor IT teams',
          'Present technology roadmaps to boards and investors',
          'Evaluate and implement enterprise software (ERP, CRM, cloud platforms)'
        ]
      },
      {
        type: 'when_to_hire',
        heading: 'When to Hire a Fractional CIO',
        signals: [
          { signal: 'Growing pains', description: 'IT infrastructure can\'t keep pace with business growth' },
          { signal: 'Digital transformation', description: 'Need to modernise legacy systems or adopt cloud' },
          { signal: 'Security concerns', description: 'Require strategic cybersecurity leadership' },
          { signal: 'Tech-enabled growth', description: 'Technology is central to your business model' },
          { signal: 'M&A activity', description: 'Due diligence and system integration required' },
          { signal: 'Compliance pressure', description: 'Facing ISO, SOC2, or regulatory requirements' }
        ]
      },
      {
        type: 'comparison_table',
        heading: 'Fractional CIO vs Full-Time CIO',
        rows: [
          { aspect: 'Annual Cost', fractional: '£50k-120k', fullTime: '£180k-350k+' },
          { aspect: 'Commitment', fractional: 'Flexible (1-3 days/week)', fullTime: 'Full-time' },
          { aspect: 'Experience', fractional: 'Multi-industry expertise', fullTime: 'Single company focus' },
          { aspect: 'Objectivity', fractional: 'External perspective', fullTime: 'Internal politics' },
          { aspect: 'Network', fractional: 'Broad vendor relationships', fullTime: 'Company-specific' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Find Your Fractional CIO',
        content: 'Connect with experienced IT leaders ready to transform your technology strategy.'
      }
    ],
    faqs: [
      { question: 'What\'s the difference between a CIO and CTO?', answer: 'A CIO focuses on internal IT operations, infrastructure, and business systems, while a CTO typically drives external technology innovation and product development. Smaller companies often combine these roles, but larger enterprises separate them. A Fractional CIO can help define which role your business actually needs.' },
      { question: 'How many days per week does a Fractional CIO typically work?', answer: 'Most Fractional CIO engagements range from 1-3 days per week, depending on the scope of work. Strategy-focused roles might require just 4-8 days per month, while transformation projects often need 2-3 days weekly. The flexibility allows you to scale up or down as needs change.' },
      { question: 'Can a Fractional CIO manage our IT team?', answer: 'Yes, Fractional CIOs regularly manage IT teams, though the approach differs from a full-time executive. They typically focus on strategic direction, performance management, and mentoring IT managers, while day-to-day operations are handled by internal staff. This model works well for teams of 3-20+ people.' },
      { question: 'What industries use Fractional CIOs most?', answer: 'The highest demand comes from PE/VC-backed businesses, mid-market companies (£5-100M revenue), regulated industries (finance, healthcare), and tech-enabled businesses undergoing digital transformation. The model suits any organisation needing IT strategy without the cost of a full-time executive.' },
      { question: 'What should I look for when hiring a Fractional CIO?', answer: 'Key factors include: relevant industry experience, track record of successful transformations, strong vendor network, communication skills for non-technical stakeholders, and cultural fit. Ask for references from similar-sized companies and specific examples of projects they\'ve delivered.' }
    ],
    internal_links: [
      { url: '/fractional-cto', label: 'Fractional CTO', description: 'Technology leadership for product companies' },
      { url: '/fractional-ciso', label: 'Fractional CISO', description: 'Security-focused IT leadership' },
      { url: '/fractional-cto-jobs-uk', label: 'CTO Jobs UK', description: 'Browse technology leadership roles' },
      { url: '/fractional-jobs-uk', label: 'All Fractional Jobs', description: 'Explore all executive opportunities' }
    ],
    external_links: [
      { url: 'https://www.bcs.org', label: 'BCS - Chartered Institute for IT', domain: 'bcs.org' },
      { url: 'https://www.cio.co.uk', label: 'CIO UK', domain: 'cio.co.uk' },
      { url: 'https://www.gartner.com/en/information-technology', label: 'Gartner IT Research', domain: 'gartner.com' }
    ],
    related_pages: ['fractional-cto', 'fractional-ciso', 'fractional-cto-jobs-uk', 'hire-fractional-cto'],
    stats: {
      avgDayRate: 1400,
      marketGrowth: '34%',
      typicalEngagement: '6-18 months',
      costSavings: '60-70%'
    }
  },
  {
    slug: 'fractional-compliance-services',
    page_type: 'services',
    title: 'Fractional Compliance Services UK | Part-Time Compliance Officers',
    meta_description: 'Expert fractional compliance services for UK businesses. Access experienced compliance officers for FCA regulation, GDPR, AML, and regulatory frameworks without full-time costs.',
    keywords: ['fractional compliance', 'compliance services uk', 'part-time compliance officer', 'fractional cco', 'regulatory compliance'],
    canonical_url: 'https://fractional.quest/fractional-compliance-services',
    hero_title: 'Fractional Compliance Services',
    hero_subtitle: 'Expert regulatory compliance leadership for businesses navigating complex frameworks',
    hero_badge: 'Compliance & Risk',
    image_category: 'compliance',
    accent_color: 'indigo',
    job_board_enabled: true,
    job_board_department: 'Compliance',
    job_board_title: 'Compliance & Regulatory Roles',
    sections: [
      {
        type: 'definition_box',
        heading: 'What Are Fractional Compliance Services?',
        content: 'Fractional compliance services provide access to experienced compliance professionals—Chief Compliance Officers, Compliance Directors, and regulatory specialists—on a flexible, part-time basis. These experts help businesses navigate complex regulatory environments, implement compliance frameworks, and maintain regulatory standing without the overhead of a full-time compliance team.'
      },
      {
        type: 'intro',
        heading: 'Why UK Businesses Need Fractional Compliance',
        content: 'The UK regulatory landscape has never been more complex. From FCA requirements to GDPR, AML regulations to ESG reporting, businesses face mounting compliance obligations. Yet many organisations—particularly SMEs and growth companies—lack the resources for dedicated compliance leadership. Fractional compliance services bridge this gap, providing senior expertise exactly when needed.'
      },
      {
        type: 'role_types',
        heading: 'Compliance Services We Connect You With',
        items: [
          { title: 'FCA Compliance', description: 'Regulatory compliance for financial services firms', rate: '£900-1,500/day' },
          { title: 'GDPR & Data Protection', description: 'Data privacy frameworks and DPO services', rate: '£700-1,200/day' },
          { title: 'AML Compliance', description: 'Anti-money laundering programmes and MLRO services', rate: '£800-1,400/day' },
          { title: 'ESG & Sustainability', description: 'Environmental and governance reporting', rate: '£850-1,300/day' },
          { title: 'Healthcare Compliance', description: 'CQC, MHRA, and healthcare regulations', rate: '£750-1,200/day' },
          { title: 'ISO Implementation', description: 'ISO 27001, 9001, and certification support', rate: '£600-1,100/day' }
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'Avg Compliance Day Rate', value: '£950' },
          { label: 'FCA Fines 2024', value: '£176M' },
          { label: 'GDPR Penalties UK', value: '£42M' },
          { label: 'Cost vs Full-Time', value: '50-65%' }
        ]
      },
      {
        type: 'services_list',
        heading: 'What Fractional Compliance Officers Deliver',
        items: [
          'Regulatory gap analysis and compliance audits',
          'Policy development and procedure documentation',
          'Regulatory reporting and submissions',
          'Staff training and compliance culture programmes',
          'Incident management and regulatory liaison',
          'Board reporting and committee support',
          'Third-party risk management',
          'Compliance monitoring and testing'
        ]
      },
      {
        type: 'industry_sectors',
        heading: 'Industries We Serve',
        sectors: [
          { name: 'Financial Services', description: 'FCA-regulated firms, fintechs, payment providers' },
          { name: 'Healthcare', description: 'Care providers, pharma, medical devices' },
          { name: 'Technology', description: 'Data-driven businesses, SaaS, AI companies' },
          { name: 'Professional Services', description: 'Law firms, accountancies, consultancies' },
          { name: 'E-commerce', description: 'Online retailers, marketplaces, payments' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Get Expert Compliance Support',
        content: 'Connect with experienced compliance professionals who understand your regulatory challenges.'
      }
    ],
    faqs: [
      { question: 'What\'s the difference between a Fractional CCO and a compliance consultant?', answer: 'A Fractional CCO takes ongoing ownership of your compliance function, attending boards, managing regulators, and building compliance culture. A consultant typically delivers specific projects or assessments. Fractional CCOs are embedded in your business; consultants remain external advisors.' },
      { question: 'Can a Fractional Compliance Officer be the named individual with the FCA?', answer: 'Yes, in many cases. The FCA requires firms to have approved individuals for certain controlled functions. A Fractional CCO can hold these positions, though this depends on their availability, the firm\'s specific permissions, and FCA approval. We can discuss your specific requirements.' },
      { question: 'How quickly can you provide compliance support?', answer: 'For urgent regulatory matters, we can often connect you with experienced compliance professionals within 48-72 hours. Standard engagements typically begin within 1-2 weeks. For FCA applications or complex regulatory projects, we recommend engaging at least 3-6 months before deadlines.' },
      { question: 'What size business suits fractional compliance services?', answer: 'Fractional compliance works best for businesses with £1M-£100M revenue, or those in heavily regulated sectors regardless of size. Startups seeking FCA authorisation, PE-backed portfolio companies, and mid-market firms all benefit. Very large enterprises typically need full-time compliance teams.' },
      { question: 'How do you ensure confidentiality with fractional compliance officers?', answer: 'All our compliance professionals sign comprehensive NDAs and are bound by professional conduct standards. Many hold certifications (ICA, CISI) with their own ethical requirements. We also establish clear information barriers where professionals work with potentially competing firms.' }
    ],
    internal_links: [
      { url: '/fractional-ciso', label: 'Fractional CISO', description: 'Cybersecurity compliance leadership' },
      { url: '/fractional-cfo', label: 'Fractional CFO', description: 'Financial compliance and controls' },
      { url: '/fractional-ciso-jobs-uk', label: 'CISO Jobs UK', description: 'Security leadership opportunities' }
    ],
    external_links: [
      { url: 'https://www.fca.org.uk', label: 'FCA', domain: 'fca.org.uk' },
      { url: 'https://ico.org.uk', label: 'Information Commissioner\'s Office', domain: 'ico.org.uk' },
      { url: 'https://www.int-comp.org', label: 'International Compliance Association', domain: 'int-comp.org' }
    ],
    related_pages: ['fractional-ciso', 'fractional-cfo', 'fractional-ciso-jobs-uk'],
    stats: {
      avgDayRate: 950,
      fcaFines: '£176M',
      gdprPenalties: '£42M',
      costSavings: '50-65%'
    }
  },
  {
    slug: 'fractional-fd',
    page_type: 'role_definition',
    title: 'Fractional FD | Part-Time Finance Director UK',
    meta_description: 'What is a Fractional FD? Discover how part-time Finance Directors provide strategic financial leadership to growing UK businesses. Day rates, responsibilities, and hiring guide.',
    keywords: ['fractional fd', 'fractional finance director', 'part-time fd', 'part-time finance director', 'fd services uk'],
    canonical_url: 'https://fractional.quest/fractional-fd',
    hero_title: 'Fractional FD',
    hero_subtitle: 'Strategic financial leadership for ambitious businesses - flexible and affordable',
    hero_badge: 'Finance Leadership',
    image_category: 'finance',
    accent_color: 'emerald',
    job_board_enabled: true,
    job_board_department: 'Finance',
    job_board_title: 'FD & Finance Director Roles',
    sections: [
      {
        type: 'definition_box',
        heading: 'What is a Fractional FD?',
        content: 'A Fractional FD (Finance Director) is a senior finance professional who provides strategic financial leadership to multiple businesses on a part-time basis. Unlike a bookkeeper or accountant focused on compliance, a Fractional FD drives business performance through financial strategy, cash flow optimisation, funding support, and board-level financial governance—all without the commitment of a full-time hire.'
      },
      {
        type: 'intro',
        heading: 'Why Growing Businesses Choose Fractional FDs',
        content: 'The transition from startup to scaleup often outpaces a founder\'s ability to manage finances strategically. A Fractional FD bridges the gap between basic bookkeeping and full-time CFO capabilities. They bring experience from multiple businesses, industry best practices, and objective financial insight that can transform decision-making and accelerate growth.'
      },
      {
        type: 'role_types',
        heading: 'Types of Fractional FD Engagements',
        items: [
          { title: 'Growth FD', description: 'Financial strategy for scaling businesses', rate: '£600-1,000/day' },
          { title: 'Turnaround FD', description: 'Cash flow rescue and business restructuring', rate: '£700-1,200/day' },
          { title: 'Fundraising FD', description: 'Investment preparation and deal support', rate: '£800-1,400/day' },
          { title: 'Interim FD', description: 'Full-time cover during transitions', rate: '£650-1,100/day' },
          { title: 'Virtual FD', description: 'Ongoing strategic support (1-2 days/week)', rate: '£500-900/day' }
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'Average Day Rate', value: '£750' },
          { label: 'Annual Equivalent', value: '£40-90k' },
          { label: 'Full-Time FD Salary', value: '£120-180k' },
          { label: 'Typical Hours', value: '1-3 days/week' }
        ]
      },
      {
        type: 'responsibilities',
        heading: 'What Does a Fractional FD Do?',
        items: [
          'Develop and monitor financial strategy and KPIs',
          'Prepare management accounts and board packs',
          'Manage cash flow forecasting and working capital',
          'Lead funding rounds and bank negotiations',
          'Implement financial systems and controls',
          'Oversee budgeting and variance analysis',
          'Support M&A due diligence and integration',
          'Mentor finance teams and upskill founders'
        ]
      },
      {
        type: 'when_to_hire',
        heading: 'Signs You Need a Fractional FD',
        signals: [
          { signal: 'Revenue £500k-£10M', description: 'Too complex for DIY, too small for full-time FD' },
          { signal: 'Seeking investment', description: 'Need investor-ready financials and data rooms' },
          { signal: 'Cash flow concerns', description: 'Struggling to forecast or manage working capital' },
          { signal: 'Growth decisions', description: 'Need financial modelling for strategic choices' },
          { signal: 'Board requirements', description: 'Investors or non-execs want professional finance' },
          { signal: 'Systems chaos', description: 'Outgrown spreadsheets, need proper systems' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Find Your Fractional FD',
        content: 'Connect with experienced Finance Directors who can transform your financial performance.'
      }
    ],
    faqs: [
      { question: 'What\'s the difference between an FD and a CFO?', answer: 'In the UK, FD (Finance Director) and CFO (Chief Financial Officer) are often used interchangeably, especially in mid-market companies. Traditionally, CFO implies a larger organisation with broader strategic scope, while FD suggests hands-on financial management. A Fractional FD typically covers both strategic and operational finance for smaller businesses.' },
      { question: 'How is a Fractional FD different from an accountant?', answer: 'An accountant focuses on compliance—producing accurate accounts, filing taxes, managing payroll. A Fractional FD uses financial data strategically—driving business decisions, optimising cash flow, supporting fundraising, and providing board-level insight. Many businesses need both: an accountant for compliance, an FD for strategy.' },
      { question: 'What size business needs a Fractional FD?', answer: 'Typically businesses with £500k-£20M revenue benefit most. Below £500k, founders can often manage with an accountant and good software. Above £20M, a full-time FD or CFO usually makes sense. The sweet spot is fast-growing businesses that have outgrown basic bookkeeping but can\'t justify £150k+ salary.' },
      { question: 'Can a Fractional FD help with fundraising?', answer: 'Absolutely. Many Fractional FDs specialise in fundraising support, including: financial modelling and projections, data room preparation, investor deck financial sections, due diligence management, and term sheet negotiation. Their experience across multiple funding rounds is invaluable for founders raising for the first time.' },
      { question: 'How often will a Fractional FD be in the office?', answer: 'Most Fractional FD engagements involve 1-3 days per week, often a mix of on-site and remote work. Critical periods (month-end, board meetings, fundraising) may require more time. The flexibility is a key benefit—you scale support to match business needs without fixed overhead.' }
    ],
    internal_links: [
      { url: '/fractional-cfo', label: 'Fractional CFO', description: 'Senior financial leadership' },
      { url: '/fractional-finance-director', label: 'Fractional Finance Director', description: 'In-depth guide' },
      { url: '/fractional-cfo-jobs-uk', label: 'CFO Jobs UK', description: 'Finance leadership roles' },
      { url: '/hire-fractional-cfo', label: 'Hire a Fractional CFO', description: 'Hiring guide' }
    ],
    external_links: [
      { url: 'https://www.icaew.com', label: 'ICAEW', domain: 'icaew.com' },
      { url: 'https://www.accaglobal.com', label: 'ACCA', domain: 'accaglobal.com' },
      { url: 'https://www.cimaglobal.com', label: 'CIMA', domain: 'cimaglobal.com' }
    ],
    related_pages: ['fractional-cfo', 'fractional-finance-director', 'fractional-cfo-jobs-uk', 'hire-fractional-cfo'],
    stats: {
      avgDayRate: 750,
      annualEquivalent: '£40-90k',
      fullTimeSalary: '£120-180k',
      typicalDays: '1-3/week'
    }
  },
  {
    slug: 'fractional-finance-director',
    page_type: 'role_definition',
    title: 'Fractional Finance Director | Part-Time FD Services UK',
    meta_description: 'Complete guide to Fractional Finance Directors in the UK. Learn about responsibilities, day rates, qualifications, and how to hire the right part-time FD for your business.',
    keywords: ['fractional finance director', 'part-time finance director', 'fractional fd uk', 'finance director services', 'outsourced fd'],
    canonical_url: 'https://fractional.quest/fractional-finance-director',
    hero_title: 'Fractional Finance Director',
    hero_subtitle: 'Everything you need to know about hiring part-time finance leadership',
    hero_badge: 'Complete Guide',
    image_category: 'finance',
    accent_color: 'emerald',
    job_board_enabled: true,
    job_board_department: 'Finance',
    job_board_title: 'Finance Director Opportunities',
    sections: [
      {
        type: 'definition_box',
        heading: 'What is a Fractional Finance Director?',
        content: 'A Fractional Finance Director (also known as a Part-Time FD, Virtual FD, or Portfolio FD) is a qualified finance professional who provides senior financial leadership to multiple organisations simultaneously. They offer the strategic oversight, financial acumen, and board-level credibility of a full-time Finance Director, but work on a flexible basis—typically 1-3 days per week per client.'
      },
      {
        type: 'market_context',
        heading: 'The Rise of Fractional Finance Leadership',
        content: 'The fractional finance model has grown significantly in the UK, driven by several factors: the high cost of full-time FD salaries (often £120-200k+), the flexibility demands of modern business, and the recognition that growing companies need strategic finance leadership long before they can justify a full-time hire. Today, thousands of UK businesses successfully operate with Fractional Finance Directors.'
      },
      {
        type: 'qualifications',
        heading: 'Typical Qualifications',
        items: [
          { title: 'ACA/FCA', description: 'Chartered Accountant (ICAEW)', importance: 'Most common' },
          { title: 'ACCA', description: 'Chartered Certified Accountant', importance: 'Widely recognised' },
          { title: 'CIMA', description: 'Chartered Management Accountant', importance: 'Industry-focused' },
          { title: 'MBA', description: 'Business qualification', importance: 'Strategic focus' }
        ]
      },
      {
        type: 'rate_breakdown',
        heading: 'Day Rate Breakdown',
        tiers: [
          { level: 'Junior FD', experience: '5-10 years', rate: '£450-650/day', annual: '£27-39k (1 day/week)' },
          { level: 'Experienced FD', experience: '10-15 years', rate: '£650-900/day', annual: '£39-54k (1 day/week)' },
          { level: 'Senior FD', experience: '15-20 years', rate: '£900-1,200/day', annual: '£54-72k (1 day/week)' },
          { level: 'FD/CFO Level', experience: '20+ years', rate: '£1,200-1,800/day', annual: '£72-108k (1 day/week)' }
        ]
      },
      {
        type: 'responsibilities',
        heading: 'Core Responsibilities',
        items: [
          'Financial strategy development and execution',
          'Cash flow forecasting and working capital management',
          'Management accounts and KPI reporting',
          'Board reporting and investor relations',
          'Budgeting, forecasting, and variance analysis',
          'Financial systems implementation',
          'Team leadership and development',
          'Risk management and internal controls',
          'Funding and M&A support',
          'Tax planning and compliance oversight'
        ]
      },
      {
        type: 'comparison_table',
        heading: 'Fractional FD vs Alternatives',
        rows: [
          { aspect: 'Strategic Input', fractionalFD: 'High', accountant: 'Low', fullTimeFD: 'High' },
          { aspect: 'Cost (Annual)', fractionalFD: '£40-90k', accountant: '£10-25k', fullTimeFD: '£120-200k' },
          { aspect: 'Flexibility', fractionalFD: 'High', accountant: 'High', fullTimeFD: 'Low' },
          { aspect: 'Board Presence', fractionalFD: 'Yes', accountant: 'Rarely', fullTimeFD: 'Yes' },
          { aspect: 'Systems Implementation', fractionalFD: 'Yes', accountant: 'Limited', fullTimeFD: 'Yes' },
          { aspect: 'Fundraising Support', fractionalFD: 'Yes', accountant: 'Limited', fullTimeFD: 'Yes' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Ready to Hire a Fractional Finance Director?',
        content: 'Browse qualified FDs or post your requirement to find the perfect match.'
      }
    ],
    faqs: [
      { question: 'How do I know if I need a Fractional Finance Director vs a bookkeeper?', answer: 'If your questions are about recording transactions accurately and filing compliance returns, you need a bookkeeper or accountant. If you\'re asking about cash runway, growth funding, pricing strategy, or investor readiness, you need strategic finance input—a Fractional FD. Most growing businesses need both.' },
      { question: 'What should I expect in the first 90 days with a Fractional FD?', answer: 'Month 1 typically involves understanding your business, reviewing systems, and identifying quick wins. Month 2 focuses on implementing improvements and establishing reporting rhythms. By Month 3, you should have clear KPIs, reliable forecasts, and a strategic finance roadmap. Good Fractional FDs create visible value within 90 days.' },
      { question: 'Can a Fractional Finance Director be a company director?', answer: 'Yes, though it\'s not always necessary or appropriate. Many Fractional FDs serve in advisory roles without formal directorship. If board representation is needed (e.g., for banking covenants or investor requirements), they can be appointed as a director with appropriate insurance and compensation adjustments.' },
      { question: 'How do Fractional Finance Directors handle confidentiality across clients?', answer: 'Professional Fractional FDs maintain strict information barriers between clients. They sign NDAs, avoid conflicts of interest (e.g., competitors), and maintain separate systems for each client. Reputable practitioners are typically members of professional bodies with ethical obligations around confidentiality.' },
      { question: 'What technology should a Fractional FD be familiar with?', answer: 'Essential: Xero, QuickBooks, or Sage for smaller businesses; NetSuite, SAP, or Microsoft Dynamics for larger ones. Valuable extras include: Excel/Google Sheets at advanced level, BI tools (Power BI, Tableau), forecasting tools (Fathom, Futrli), and cap table management (Carta, Seedlegals).' }
    ],
    internal_links: [
      { url: '/fractional-fd', label: 'Fractional FD', description: 'Quick overview' },
      { url: '/fractional-cfo', label: 'Fractional CFO', description: 'CFO vs FD comparison' },
      { url: '/fractional-cfo-jobs-uk', label: 'Finance Jobs UK', description: 'Browse opportunities' },
      { url: '/hire-fractional-cfo', label: 'Hiring Guide', description: 'How to hire effectively' }
    ],
    external_links: [
      { url: 'https://www.icaew.com', label: 'ICAEW', domain: 'icaew.com' },
      { url: 'https://www.accaglobal.com', label: 'ACCA', domain: 'accaglobal.com' },
      { url: 'https://www.frc.org.uk', label: 'Financial Reporting Council', domain: 'frc.org.uk' }
    ],
    related_pages: ['fractional-fd', 'fractional-cfo', 'fractional-cfo-jobs-uk', 'hire-fractional-cfo'],
    stats: {
      avgDayRate: 800,
      marketSize: '£500M+',
      growthRate: '25%',
      avgEngagement: '12-24 months'
    }
  },
  {
    slug: 'fractional-cmo-services',
    page_type: 'services',
    title: 'Fractional CMO Services UK | Part-Time Marketing Leadership',
    meta_description: 'Expert fractional CMO services for UK businesses. Access senior marketing leadership, brand strategy, and growth marketing expertise without full-time costs. 574+ impressions.',
    keywords: ['fractional cmo services', 'part-time cmo', 'marketing leadership', 'fractional marketing director', 'cmo services uk'],
    canonical_url: 'https://fractional.quest/fractional-cmo-services',
    hero_title: 'Fractional CMO Services',
    hero_subtitle: 'Strategic marketing leadership that drives growth - without the full-time overhead',
    hero_badge: 'Marketing Excellence',
    image_category: 'marketing',
    accent_color: 'amber',
    job_board_enabled: true,
    job_board_department: 'Marketing',
    job_board_title: 'CMO & Marketing Director Roles',
    sections: [
      {
        type: 'definition_box',
        heading: 'What Are Fractional CMO Services?',
        content: 'Fractional CMO services provide access to experienced Chief Marketing Officers who work with multiple businesses on a part-time basis. These marketing executives deliver strategic marketing leadership—brand positioning, go-to-market strategy, demand generation, and marketing team development—without the £200k+ cost of a full-time CMO.'
      },
      {
        type: 'intro',
        heading: 'Why Businesses Choose Fractional Marketing Leadership',
        content: 'Marketing has never been more complex. Digital channels multiply, customer expectations evolve, and competition intensifies. Yet many growing businesses lack the senior marketing expertise to navigate these challenges. Fractional CMO services provide the strategic guidance needed to build brand equity, generate demand, and scale marketing operations efficiently.'
      },
      {
        type: 'services_grid',
        heading: 'Services Our Fractional CMOs Deliver',
        items: [
          { title: 'Brand Strategy', description: 'Positioning, messaging, and brand architecture', icon: 'target' },
          { title: 'Go-to-Market', description: 'Launch strategy and market entry planning', icon: 'rocket' },
          { title: 'Demand Generation', description: 'Lead generation and pipeline development', icon: 'chart' },
          { title: 'Marketing Operations', description: 'Team structure, processes, and MarTech stack', icon: 'gear' },
          { title: 'Content Strategy', description: 'Thought leadership and content marketing', icon: 'lightbulb' },
          { title: 'Digital Marketing', description: 'Paid media, SEO, and performance marketing', icon: 'globe' },
          { title: 'Customer Marketing', description: 'Retention, advocacy, and expansion', icon: 'people' },
          { title: 'Marketing Analytics', description: 'Attribution, reporting, and ROI optimisation', icon: 'chart' }
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'Average Day Rate', value: '£1,200' },
          { label: 'Full-Time CMO Cost', value: '£200k+' },
          { label: 'Typical Engagement', value: '6-18 months' },
          { label: 'Cost Savings', value: '55-70%' }
        ]
      },
      {
        type: 'engagement_models',
        heading: 'Engagement Models',
        models: [
          { name: 'Strategic Advisory', days: '2-4 days/month', focus: 'Strategy, board reporting, team coaching', rate: '£1,400-1,800/day' },
          { name: 'Hands-On Leadership', days: '1-2 days/week', focus: 'Active marketing leadership and execution', rate: '£1,000-1,400/day' },
          { name: 'Interim CMO', days: '3-5 days/week', focus: 'Full-time cover during transitions', rate: '£900-1,200/day' },
          { name: 'Project-Based', days: 'Fixed scope', focus: 'Specific initiatives (rebrand, launch, etc.)', rate: 'Project pricing' }
        ]
      },
      {
        type: 'ideal_clients',
        heading: 'Who Benefits Most from Fractional CMO Services',
        clients: [
          { type: 'Scale-ups (£2-50M)', description: 'Outgrown founder-led marketing, need strategic direction' },
          { type: 'PE/VC Portfolio', description: 'Investor-backed businesses requiring marketing transformation' },
          { type: 'B2B Technology', description: 'SaaS, tech services needing demand generation expertise' },
          { type: 'Professional Services', description: 'Firms seeking thought leadership and brand building' },
          { type: 'E-commerce', description: 'Brands scaling DTC and marketplace presence' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Find Your Fractional CMO',
        content: 'Connect with experienced marketing leaders who can transform your growth trajectory.'
      }
    ],
    faqs: [
      { question: 'How is a Fractional CMO different from a marketing agency?', answer: 'A Fractional CMO provides strategic leadership and becomes part of your team—they develop strategy, manage agencies, build capabilities, and take ownership of marketing outcomes. Agencies execute specific tactics. Most businesses need both: a Fractional CMO for strategy and oversight, agencies for execution in specialist areas.' },
      { question: 'What results can I expect from a Fractional CMO?', answer: 'In the first 90 days, expect: marketing audit and strategy document, clear KPIs and measurement framework, quick wins in lead generation or brand visibility, and a 12-month roadmap. Over 6-12 months, look for measurable improvement in marketing ROI, pipeline contribution, brand awareness, and team capability.' },
      { question: 'Can a Fractional CMO work with my existing marketing team?', answer: 'Absolutely. A key value of Fractional CMOs is elevating existing teams. They provide strategic direction, coaching, and career development that transforms good marketers into great ones. Most engagements involve significant team interaction and capability building.' },
      { question: 'How do you measure Fractional CMO success?', answer: 'Common metrics include: marketing-influenced pipeline/revenue, customer acquisition cost (CAC), brand awareness scores, marketing qualified leads (MQLs), conversion rates, and marketing ROI. Good Fractional CMOs establish clear KPIs upfront and report against them regularly.' },
      { question: 'What industries do your Fractional CMOs specialise in?', answer: 'Our network includes CMOs with expertise across: B2B technology and SaaS, financial services, healthcare and life sciences, professional services, e-commerce and retail, manufacturing and industrial. We match industry expertise to your specific needs.' }
    ],
    internal_links: [
      { url: '/fractional-cmo', label: 'Fractional CMO', description: 'Role definition' },
      { url: '/fractional-cmo-jobs-uk', label: 'CMO Jobs UK', description: 'Marketing leadership roles' },
      { url: '/hire-fractional-cmo', label: 'Hire a Fractional CMO', description: 'Hiring guide' }
    ],
    external_links: [
      { url: 'https://www.cim.co.uk', label: 'Chartered Institute of Marketing', domain: 'cim.co.uk' },
      { url: 'https://dma.org.uk', label: 'Data & Marketing Association', domain: 'dma.org.uk' },
      { url: 'https://www.marketingweek.com', label: 'Marketing Week', domain: 'marketingweek.com' }
    ],
    related_pages: ['fractional-cmo', 'fractional-cmo-jobs-uk', 'hire-fractional-cmo'],
    stats: {
      avgDayRate: 1200,
      fullTimeCost: '£200k+',
      costSavings: '55-70%',
      impressions: 574
    }
  },
  {
    slug: 'fractional-cfo-services',
    page_type: 'services',
    title: 'Fractional CFO Services UK | Part-Time Finance Leadership',
    meta_description: 'Expert fractional CFO services for UK businesses. Access senior financial leadership, strategic planning, and fundraising expertise without full-time costs. Proven track record.',
    keywords: ['fractional cfo services', 'part-time cfo', 'cfo services uk', 'fractional finance', 'outsourced cfo'],
    canonical_url: 'https://fractional.quest/fractional-cfo-services',
    hero_title: 'Fractional CFO Services',
    hero_subtitle: 'Strategic financial leadership that scales with your ambitions',
    hero_badge: 'Finance Excellence',
    image_category: 'finance',
    accent_color: 'emerald',
    job_board_enabled: true,
    job_board_department: 'Finance',
    job_board_title: 'CFO & Finance Director Roles',
    sections: [
      {
        type: 'definition_box',
        heading: 'What Are Fractional CFO Services?',
        content: 'Fractional CFO services provide businesses with senior financial leadership on a flexible, part-time basis. Our experienced Chief Financial Officers deliver strategic financial management—from fundraising and M&A to financial systems and board reporting—without the £250k+ annual cost of a full-time CFO.'
      },
      {
        type: 'intro',
        heading: 'Why UK Businesses Choose Fractional CFO Services',
        content: 'The modern finance function is far more than bookkeeping. Strategic CFOs drive business value through data-driven decision making, capital allocation, and financial optimisation. Yet most growing businesses can\'t justify a full-time CFO salary. Fractional CFO services bridge this gap, providing executive-level financial leadership at a fraction of the cost.'
      },
      {
        type: 'services_grid',
        heading: 'Core Services',
        items: [
          { title: 'Financial Strategy', description: 'Business planning, forecasting, and financial modelling', icon: 'chart' },
          { title: 'Fundraising', description: 'Equity rounds, debt financing, and investor relations', icon: 'currency' },
          { title: 'M&A Support', description: 'Due diligence, valuation, and deal structuring', icon: 'handshake' },
          { title: 'Cash Flow', description: 'Working capital optimisation and treasury management', icon: 'currency' },
          { title: 'Financial Systems', description: 'ERP implementation and process automation', icon: 'gear' },
          { title: 'Board Reporting', description: 'KPIs, dashboards, and investor reporting', icon: 'chart' },
          { title: 'Risk Management', description: 'Financial controls and governance frameworks', icon: 'shield' },
          { title: 'Exit Planning', description: 'Business readiness and value maximisation', icon: 'target' }
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'Average Day Rate', value: '£1,100' },
          { label: 'Full-Time CFO Cost', value: '£250k+' },
          { label: 'Client Portfolio', value: '50+' },
          { label: 'Cost Savings', value: '60-75%' }
        ]
      },
      {
        type: 'engagement_models',
        heading: 'How We Work',
        models: [
          { name: 'Strategic CFO', days: '2-4 days/month', focus: 'Board-level strategy and investor relations', rate: '£1,400-2,000/day' },
          { name: 'Operational CFO', days: '1-2 days/week', focus: 'Hands-on financial leadership', rate: '£1,000-1,400/day' },
          { name: 'Interim CFO', days: '3-5 days/week', focus: 'Full coverage during transitions', rate: '£900-1,200/day' },
          { name: 'Project CFO', days: 'Fixed scope', focus: 'Fundraising, M&A, exit prep', rate: 'Success fee options' }
        ]
      },
      {
        type: 'case_studies_preview',
        heading: 'Client Success Stories',
        cases: [
          { industry: 'SaaS', challenge: 'Series A fundraising', outcome: '£8M raised in 90 days' },
          { industry: 'E-commerce', challenge: 'Cash flow crisis', outcome: 'Runway extended 18 months' },
          { industry: 'Professional Services', challenge: 'Exit preparation', outcome: '4.2x EBITDA sale achieved' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Get Expert CFO Support',
        content: 'Connect with experienced financial leaders who can accelerate your business growth.'
      }
    ],
    faqs: [
      { question: 'What\'s included in a typical Fractional CFO engagement?', answer: 'A standard engagement includes: initial financial assessment, strategic planning session, monthly management accounts and KPIs, quarterly board reporting, ad-hoc strategic advice, and access to our network of investors, advisors, and service providers. Scope is tailored to your specific needs and budget.' },
      { question: 'How quickly can a Fractional CFO make an impact?', answer: 'Most clients see tangible improvements within 30-60 days. Quick wins often include: improved cash flow visibility, better financial reporting, identified cost savings, and clearer metrics. Strategic impact—like successful fundraising or improved unit economics—typically materialises over 3-6 months.' },
      { question: 'Can your Fractional CFOs support fundraising?', answer: 'Absolutely. Many of our CFOs have raised hundreds of millions in equity and debt financing. They support with: financial modelling and projections, investor deck preparation, data room management, due diligence process, term sheet negotiation, and closing support. Some work on success-fee arrangements for fundraising projects.' },
      { question: 'Do you work with early-stage startups?', answer: 'Yes, though the engagement model differs. Pre-seed and seed-stage companies typically need 1-2 days per month for financial foundation, fundraising prep, and investor reporting. As companies scale, CFO time increases. We have packages starting from £2,000/month for early-stage businesses.' },
      { question: 'What financial systems do your CFOs work with?', answer: 'Our CFOs are experienced with common UK platforms: Xero, QuickBooks, Sage, NetSuite, and SAP. They also work with complementary tools: Fathom, Futrli, Float for forecasting; Soldo, Pleo for expense management; Stripe, GoCardless for payments. They can recommend and implement the right stack for your needs.' }
    ],
    internal_links: [
      { url: '/fractional-cfo', label: 'Fractional CFO', description: 'Role definition' },
      { url: '/fractional-fd', label: 'Fractional FD', description: 'Finance Director services' },
      { url: '/fractional-cfo-jobs-uk', label: 'CFO Jobs UK', description: 'Finance leadership roles' },
      { url: '/hire-fractional-cfo', label: 'Hire a Fractional CFO', description: 'Hiring guide' }
    ],
    external_links: [
      { url: 'https://www.icaew.com', label: 'ICAEW', domain: 'icaew.com' },
      { url: 'https://www.accaglobal.com', label: 'ACCA', domain: 'accaglobal.com' },
      { url: 'https://www.bvca.co.uk', label: 'BVCA', domain: 'bvca.co.uk' }
    ],
    related_pages: ['fractional-cfo', 'fractional-fd', 'fractional-cfo-jobs-uk', 'hire-fractional-cfo'],
    stats: {
      avgDayRate: 1100,
      fullTimeCost: '£250k+',
      clientPortfolio: '50+',
      costSavings: '60-75%'
    }
  },
  {
    slug: 'find-fractional-cto',
    page_type: 'hire_guide',
    title: 'Find a Fractional CTO | Hire Part-Time Tech Leadership UK',
    meta_description: 'Find the perfect Fractional CTO for your business. Expert guide to hiring part-time technology leadership, with access to vetted CTOs across the UK. Start your search today.',
    keywords: ['find fractional cto', 'hire fractional cto', 'part-time cto', 'fractional cto uk', 'tech leadership hiring'],
    canonical_url: 'https://fractional.quest/find-fractional-cto',
    hero_title: 'Find a Fractional CTO',
    hero_subtitle: 'Connect with experienced technology leaders ready to transform your business',
    hero_badge: 'Hire Now',
    image_category: 'technology',
    accent_color: 'blue',
    job_board_enabled: true,
    job_board_department: 'Technology',
    job_board_title: 'Available CTOs',
    sections: [
      {
        type: 'intro',
        heading: 'Find Your Perfect Fractional CTO',
        content: 'Whether you\'re building your first product, scaling your tech team, or navigating a digital transformation, the right Fractional CTO can accelerate your journey. Our network includes experienced technology leaders from top tech companies, successful startups, and enterprise environments—all available on a flexible, part-time basis.'
      },
      {
        type: 'search_filters',
        heading: 'What Kind of CTO Do You Need?',
        filters: [
          { category: 'Expertise', options: ['Product Development', 'Infrastructure', 'Data & AI', 'Security', 'DevOps'] },
          { category: 'Industry', options: ['FinTech', 'HealthTech', 'E-commerce', 'SaaS', 'Enterprise'] },
          { category: 'Stage', options: ['Pre-Seed', 'Seed', 'Series A+', 'Scale-up', 'Enterprise'] },
          { category: 'Engagement', options: ['Advisory', 'Hands-on', 'Interim', 'Project'] }
        ]
      },
      {
        type: 'process_steps',
        heading: 'How It Works',
        steps: [
          { step: 1, title: 'Define Your Needs', description: 'Tell us about your technology challenges and business goals' },
          { step: 2, title: 'Review Matches', description: 'Receive curated profiles of CTOs matching your requirements' },
          { step: 3, title: 'Meet Candidates', description: 'Interview shortlisted CTOs to assess fit and chemistry' },
          { step: 4, title: 'Start Engagement', description: 'Begin working with your chosen CTO on flexible terms' }
        ]
      },
      {
        type: 'cto_types',
        heading: 'Types of Fractional CTOs',
        types: [
          { title: 'Startup CTO', description: 'MVP development, technical architecture, first engineering hires', rate: '£800-1,200/day' },
          { title: 'Growth CTO', description: 'Scaling teams, infrastructure, and development processes', rate: '£1,000-1,500/day' },
          { title: 'Enterprise CTO', description: 'Digital transformation, legacy modernisation, large teams', rate: '£1,200-1,800/day' },
          { title: 'Technical Advisor', description: 'Strategic guidance, board representation, due diligence', rate: '£1,400-2,200/day' }
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'CTOs in Network', value: '150+' },
          { label: 'Avg Time to Match', value: '5 days' },
          { label: 'Client Satisfaction', value: '94%' },
          { label: 'Successful Placements', value: '200+' }
        ]
      },
      {
        type: 'what_to_look_for',
        heading: 'What to Look for in a Fractional CTO',
        mustHaves: [
          { item: 'Relevant technical expertise for your stack and domain' },
          { item: 'Leadership experience managing teams of similar size' },
          { item: 'Strong communication skills for non-technical stakeholders' },
          { item: 'Track record of delivering at your company stage' },
          { item: 'Cultural alignment with your team and values' }
        ],
        niceToHaves: [
          { item: 'Prior experience in your specific industry' },
          { item: 'Network of developers, vendors, and service providers' },
          { item: 'Experience with your funding stage and investors' },
          { item: 'Complementary skills to your existing team' }
        ]
      },
      {
        type: 'common_mistakes',
        heading: 'Hiring Mistakes to Avoid',
        mistakes: [
          { mistake: 'Hiring on technical skills alone', fix: 'Leadership and communication matter equally' },
          { mistake: 'Not defining clear objectives', fix: 'Establish KPIs and success criteria upfront' },
          { mistake: 'Underestimating time commitment', fix: 'Be realistic about hours needed for impact' },
          { mistake: 'Ignoring cultural fit', fix: 'Ensure alignment with your team dynamics' },
          { mistake: 'Expecting full-time results', fix: 'Scope appropriately for part-time engagement' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Start Your Search Today',
        content: 'Post your requirements and connect with vetted Fractional CTOs within 48 hours.'
      }
    ],
    faqs: [
      { question: 'How long does it take to find a Fractional CTO?', answer: 'Most clients receive matched profiles within 48-72 hours of posting requirements. The full hiring process—from initial brief to starting work—typically takes 1-3 weeks, depending on interview availability and contract negotiation.' },
      { question: 'What does it cost to find a Fractional CTO through your platform?', answer: 'We operate on a success-fee model: you only pay when you hire a CTO through our network. There\'s no cost to post requirements, receive matches, or interview candidates. Our fee is a percentage of the first year\'s engagement value, typically 15-20%.' },
      { question: 'Can I try before committing to a longer engagement?', answer: 'Absolutely. Many engagements start with a paid discovery phase—typically 2-4 days—where the CTO assesses your technology, team, and challenges. This gives both parties confidence before committing to ongoing work. Most discovery phases convert to longer engagements.' },
      { question: 'What if the match doesn\'t work out?', answer: 'We offer a replacement guarantee: if the engagement doesn\'t work within the first 60 days, we\'ll find an alternative CTO at no additional fee. Our careful matching process means this rarely happens, but we stand behind our recommendations.' },
      { question: 'Do you vet your Fractional CTOs?', answer: 'Yes, all CTOs in our network undergo thorough vetting: reference checks, technical assessment, portfolio review, and interview. We verify credentials, assess communication skills, and only accept candidates with proven track records. Approximately 1 in 5 applicants make it into our network.' }
    ],
    internal_links: [
      { url: '/fractional-cto', label: 'Fractional CTO', description: 'Role definition' },
      { url: '/fractional-cto-jobs-uk', label: 'CTO Jobs UK', description: 'Browse opportunities' },
      { url: '/hire-fractional-cto', label: 'Hiring Guide', description: 'Complete hiring guide' },
      { url: '/fractional-cto-salary', label: 'CTO Salary Guide', description: 'Day rate benchmarks' }
    ],
    external_links: [
      { url: 'https://www.bcs.org', label: 'BCS', domain: 'bcs.org' },
      { url: 'https://technation.io', label: 'Tech Nation', domain: 'technation.io' },
      { url: 'https://www.theiet.org', label: 'IET', domain: 'theiet.org' }
    ],
    related_pages: ['fractional-cto', 'fractional-cto-jobs-uk', 'hire-fractional-cto', 'fractional-cto-salary'],
    stats: {
      ctosInNetwork: '150+',
      avgMatchTime: '5 days',
      clientSatisfaction: '94%',
      successfulPlacements: '200+'
    }
  }
];

async function createPages() {
  for (const page of pages) {
    try {
      const result = await sql`
        INSERT INTO pages (
          slug, page_type, title, meta_description, keywords, canonical_url,
          hero_title, hero_subtitle, hero_badge, image_category, accent_color,
          job_board_enabled, job_board_department, job_board_title,
          sections, faqs, internal_links, external_links, related_pages, stats, is_published
        ) VALUES (
          ${page.slug}, ${page.page_type}, ${page.title}, ${page.meta_description},
          ${page.keywords}, ${page.canonical_url},
          ${page.hero_title}, ${page.hero_subtitle}, ${page.hero_badge},
          ${page.image_category}, ${page.accent_color},
          ${page.job_board_enabled}, ${page.job_board_department}, ${page.job_board_title || null},
          ${JSON.stringify(page.sections)}::jsonb, ${JSON.stringify(page.faqs)}::jsonb,
          ${JSON.stringify(page.internal_links)}::jsonb, ${JSON.stringify(page.external_links)}::jsonb,
          ${page.related_pages}, ${JSON.stringify(page.stats)}::jsonb, true
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          meta_description = EXCLUDED.meta_description,
          sections = EXCLUDED.sections,
          faqs = EXCLUDED.faqs,
          internal_links = EXCLUDED.internal_links,
          external_links = EXCLUDED.external_links,
          stats = EXCLUDED.stats,
          updated_at = NOW()
        RETURNING id, slug
      `;
      console.log('✅ Created/updated:', page.slug, '(id:', result[0].id, ')');
    } catch (err) {
      console.error('❌ Error creating', page.slug, ':', err.message);
    }
  }
  console.log('\n🎉 Done! Created', pages.length, 'pages');
}

createPages();
