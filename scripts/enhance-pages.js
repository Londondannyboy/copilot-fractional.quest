const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_9mG4aJRxgtpz@ep-wandering-darkness-abiq57ia-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);

// ============================================
// PART 1: Convert Redirects to Full Pages
// ============================================

const redirectToPageConversions = [
  {
    slug: 'part-time-cfo',
    page_type: 'role_definition',
    title: 'Part-Time CFO | Flexible Finance Leadership UK',
    meta_description: 'What is a Part-Time CFO? Discover how flexible Chief Financial Officers provide strategic financial leadership to UK businesses on reduced schedules. Day rates, benefits, and hiring guide.',
    keywords: ['part-time cfo', 'part time cfo', 'flexible cfo', 'part-time finance director', 'reduced hours cfo'],
    canonical_url: 'https://fractional.quest/part-time-cfo',
    hero_title: 'Part-Time CFO',
    hero_subtitle: 'Strategic financial leadership on your schedule - typically 2-3 days per week',
    hero_badge: 'Flexible Finance',
    image_category: 'finance',
    accent_color: 'emerald',
    job_board_enabled: true,
    job_board_department: 'Finance',
    job_board_title: 'Part-Time CFO Opportunities',
    sections: [
      {
        type: 'definition_box',
        heading: 'What is a Part-Time CFO?',
        content: 'A Part-Time CFO is a qualified finance executive who works reduced hours—typically 2-3 days per week—for a single organisation. Unlike a Fractional CFO who serves multiple clients, a Part-Time CFO is usually dedicated to one company, providing consistent financial leadership while allowing the business to access senior expertise at a lower cost than a full-time hire.'
      },
      {
        type: 'intro',
        heading: 'Part-Time vs Fractional: What\'s the Difference?',
        content: 'The terms are often used interchangeably, but there\'s a meaningful distinction. A Part-Time CFO typically works exclusively for one company on a reduced schedule (e.g., Monday-Wednesday). A Fractional CFO splits their time between multiple clients, offering each business a "fraction" of their capacity. Part-time arrangements suit businesses wanting dedicated attention; fractional works when strategic input is needed rather than constant presence.'
      },
      {
        type: 'comparison_table',
        heading: 'Part-Time CFO vs Full-Time CFO',
        rows: [
          { aspect: 'Weekly Commitment', partTime: '2-3 days/week', fullTime: '5 days/week' },
          { aspect: 'Annual Cost', partTime: '£60-100k', fullTime: '£150-250k+' },
          { aspect: 'Dedication', partTime: 'Single company', fullTime: 'Single company' },
          { aspect: 'Flexibility', partTime: 'Scalable hours', fullTime: 'Fixed commitment' },
          { aspect: 'Benefits/Pension', partTime: 'Often included pro-rata', fullTime: 'Full package' }
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'Typical Days', value: '2-3/week' },
          { label: 'Annual Cost', value: '£60-100k' },
          { label: 'vs Full-Time', value: '40-60% saving' },
          { label: 'Notice Period', value: '1-3 months' }
        ]
      },
      {
        type: 'when_to_hire',
        heading: 'When a Part-Time CFO Makes Sense',
        signals: [
          { signal: 'Consistent needs', description: 'You need regular finance leadership, not just project support' },
          { signal: 'Growing complexity', description: 'Month-end close, board reporting, and cash management need dedicated attention' },
          { signal: 'Team management', description: 'You have finance staff who need day-to-day leadership' },
          { signal: 'Budget constraints', description: 'Full-time CFO salary isn\'t justified, but you need more than a bookkeeper' },
          { signal: 'Transition period', description: 'Building towards a full-time CFO hire in 12-24 months' }
        ]
      },
      {
        type: 'responsibilities',
        heading: 'What Does a Part-Time CFO Do?',
        items: [
          'Oversee monthly financial close and management accounts',
          'Manage and develop the finance team',
          'Prepare board packs and attend board meetings',
          'Handle banking relationships and cash management',
          'Lead budgeting and forecasting processes',
          'Ensure compliance and statutory reporting',
          'Support fundraising and investor relations',
          'Implement financial systems and controls'
        ]
      },
      {
        type: 'cta_section',
        heading: 'Find Part-Time CFO Opportunities',
        content: 'Browse current part-time CFO roles or post your availability to connect with businesses seeking flexible finance leadership.'
      }
    ],
    faqs: [
      { question: 'What\'s the typical salary for a Part-Time CFO?', answer: 'Part-Time CFO compensation typically ranges from £60,000-£100,000 annually for 2-3 days per week. This equates to day rates of £500-£800. Some arrangements include pro-rata benefits, pension contributions, and holiday entitlement. Senior Part-Time CFOs with PE/VC experience can command £100-150k for 3-day weeks.' },
      { question: 'Is a Part-Time CFO employed or self-employed?', answer: 'It varies. Many Part-Time CFO arrangements are employment contracts with pro-rata benefits. Others operate through limited companies as contractors. The structure depends on the individual\'s preference, IR35 considerations, and the company\'s requirements. Both models are common in the UK market.' },
      { question: 'Can a Part-Time CFO transition to full-time?', answer: 'Yes, this is a common pathway. Many businesses hire Part-Time CFOs with the intention of transitioning to full-time as the company grows. It\'s a lower-risk way to assess fit and capability before committing to a permanent hire. Discuss this possibility upfront if it\'s part of your plan.' },
      { question: 'How do Part-Time CFOs handle urgent issues on non-working days?', answer: 'Most Part-Time CFOs remain available for genuinely urgent matters via phone or email, even on their off days. Clear boundaries and expectations should be established upfront. For businesses with frequent urgent financial needs, a 3-day arrangement provides better coverage than 2 days.' },
      { question: 'What\'s the difference between Part-Time CFO and Finance Director?', answer: 'In the UK, CFO and Finance Director (FD) titles are often interchangeable, especially in SMEs. Traditionally, CFO implies a more strategic, externally-focused role (investors, M&A), while FD suggests operational finance leadership. Part-Time FD and Part-Time CFO are effectively the same for most businesses.' }
    ],
    internal_links: [
      { url: '/fractional-cfo', label: 'Fractional CFO', description: 'Multi-client model' },
      { url: '/fractional-fd', label: 'Fractional FD', description: 'Finance Director services' },
      { url: '/part-time-cfo-jobs-uk', label: 'Part-Time CFO Jobs', description: 'Browse opportunities' },
      { url: '/fractional-cfo-salary', label: 'CFO Salary Guide', description: 'Market rates' }
    ],
    external_links: [
      { url: 'https://www.icaew.com', label: 'ICAEW', domain: 'icaew.com' },
      { url: 'https://www.accaglobal.com', label: 'ACCA', domain: 'accaglobal.com' },
      { url: 'https://www.gov.uk/employment-status', label: 'Employment Status (HMRC)', domain: 'gov.uk' }
    ],
    related_pages: ['fractional-cfo', 'fractional-fd', 'part-time-cfo-jobs-uk', 'fractional-cfo-salary'],
    stats: { typicalDays: '2-3/week', annualCost: '£60-100k', saving: '40-60%' }
  },
  {
    slug: 'interim-cfo',
    page_type: 'role_definition',
    title: 'Interim CFO | Temporary Finance Leadership UK',
    meta_description: 'What is an Interim CFO? Expert guide to temporary Chief Financial Officers who provide full-time cover during transitions, transformations, and critical periods. UK rates and hiring.',
    keywords: ['interim cfo', 'temporary cfo', 'interim finance director', 'interim fd', 'cfo cover'],
    canonical_url: 'https://fractional.quest/interim-cfo',
    hero_title: 'Interim CFO',
    hero_subtitle: 'Full-time finance leadership for critical transitions and transformations',
    hero_badge: 'Interim Leadership',
    image_category: 'finance',
    accent_color: 'emerald',
    job_board_enabled: true,
    job_board_department: 'Finance',
    job_board_title: 'Interim CFO Opportunities',
    sections: [
      {
        type: 'definition_box',
        heading: 'What is an Interim CFO?',
        content: 'An Interim CFO is a senior finance executive who provides full-time leadership on a temporary basis—typically 3-12 months. Unlike fractional or part-time arrangements, an Interim CFO works exclusively for one organisation, often during periods of transition (CFO departure), transformation (turnaround, restructuring), or special projects (M&A, IPO preparation).'
      },
      {
        type: 'intro',
        heading: 'When Businesses Need Interim CFOs',
        content: 'Interim CFOs fill critical gaps when continuity of financial leadership is essential. Whether your CFO has resigned unexpectedly, you\'re navigating a complex transaction, or you need specialist expertise for a transformation, an Interim CFO provides immediate, senior-level capability without the 6-month recruitment timeline of a permanent hire.'
      },
      {
        type: 'scenarios',
        heading: 'Common Interim CFO Scenarios',
        items: [
          { scenario: 'CFO Departure', description: 'Cover while recruiting permanent replacement', duration: '3-6 months' },
          { scenario: 'M&A Transaction', description: 'Due diligence, deal execution, integration', duration: '6-12 months' },
          { scenario: 'Turnaround', description: 'Cash crisis, restructuring, stakeholder management', duration: '6-18 months' },
          { scenario: 'IPO Preparation', description: 'Financial reporting, controls, investor readiness', duration: '12-18 months' },
          { scenario: 'Transformation', description: 'ERP implementation, finance function redesign', duration: '6-12 months' },
          { scenario: 'Maternity Cover', description: 'Maintaining continuity during planned absence', duration: '6-12 months' }
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'Day Rate Range', value: '£800-1,500' },
          { label: 'Typical Duration', value: '4-9 months' },
          { label: 'Notice Period', value: '2-4 weeks' },
          { label: 'Availability', value: '2-4 weeks' }
        ]
      },
      {
        type: 'comparison_table',
        heading: 'Interim vs Permanent vs Fractional CFO',
        rows: [
          { aspect: 'Commitment', interim: 'Full-time, temporary', permanent: 'Full-time, ongoing', fractional: 'Part-time, ongoing' },
          { aspect: 'Duration', interim: '3-12 months', permanent: 'Indefinite', fractional: 'Ongoing' },
          { aspect: 'Day Rate', interim: '£800-1,500', permanent: 'N/A (salary)', fractional: '£800-1,400' },
          { aspect: 'Annual Equivalent', interim: '£200-375k', permanent: '£150-250k', fractional: '£40-120k' },
          { aspect: 'Best For', interim: 'Transitions, crises', permanent: 'Stability', fractional: 'Steady-state needs' }
        ]
      },
      {
        type: 'what_to_expect',
        heading: 'What to Expect from an Interim CFO',
        items: [
          'Immediate impact—experienced interims hit the ground running',
          'Objective perspective—no political baggage or sacred cows',
          'Specialist expertise—often chosen for specific transaction/turnaround experience',
          'Knowledge transfer—building capability in permanent team',
          'Flexibility—can extend or reduce engagement as needs evolve',
          'Exit focus—interims plan their own succession from day one'
        ]
      },
      {
        type: 'cta_section',
        heading: 'Find Interim CFO Talent',
        content: 'Connect with experienced Interim CFOs available for immediate deployment.'
      }
    ],
    faqs: [
      { question: 'How quickly can an Interim CFO start?', answer: 'Most Interim CFOs can start within 2-4 weeks, and some are available immediately. This is significantly faster than permanent recruitment which typically takes 3-6 months. For urgent situations (CFO resignation, financial crisis), interim providers maintain networks of immediately available executives.' },
      { question: 'What does an Interim CFO cost?', answer: 'Interim CFO day rates typically range from £800-1,500, depending on seniority, sector, and complexity. For a 5-day week, this equates to £200-375k annualised. While higher than permanent salaries, you avoid recruitment fees, benefits costs, and can exit with short notice. For short engagements, the total cost is often lower than permanent hire.' },
      { question: 'Should I use an interim agency or hire directly?', answer: 'Both approaches work. Agencies provide speed, vetting, and replacement guarantees but charge 15-25% margins. Direct hiring saves cost but requires more effort in sourcing and due diligence. For urgent needs, agencies are faster. For planned transitions, direct hiring can work well with proper lead time.' },
      { question: 'Can an Interim CFO become permanent?', answer: 'Yes, "interim to perm" transitions are common—perhaps 20-30% of engagements. However, this should be approached carefully. Some excellent interims aren\'t suited to permanent roles (and vice versa). Conversion fees may apply if using an agency. Discuss this possibility openly from the start.' },
      { question: 'What\'s the difference between Interim CFO and Interim FD?', answer: 'In the UK, the titles are largely interchangeable for SMEs and mid-market companies. Larger enterprises may distinguish between CFO (strategic, board-level, investor-facing) and FD (operational finance leadership). For interim purposes, focus on the specific experience and capabilities needed rather than title.' }
    ],
    internal_links: [
      { url: '/fractional-cfo', label: 'Fractional CFO', description: 'Part-time alternative' },
      { url: '/interim-cfo-jobs-uk', label: 'Interim CFO Jobs', description: 'Current opportunities' },
      { url: '/fractional-cfo-salary', label: 'CFO Rates', description: 'Market benchmarks' },
      { url: '/hire-fractional-cfo', label: 'Hiring Guide', description: 'How to hire' }
    ],
    external_links: [
      { url: 'https://www.icaew.com', label: 'ICAEW', domain: 'icaew.com' },
      { url: 'https://www.iim.org.uk', label: 'Institute of Interim Management', domain: 'iim.org.uk' },
      { url: 'https://www.bvca.co.uk', label: 'BVCA', domain: 'bvca.co.uk' }
    ],
    related_pages: ['fractional-cfo', 'interim-cfo-jobs-uk', 'fractional-cfo-salary', 'hire-fractional-cfo'],
    stats: { dayRate: '£800-1,500', duration: '4-9 months', availability: '2-4 weeks' }
  },
  {
    slug: 'cfo',
    page_type: 'role_definition',
    title: 'CFO | Chief Financial Officer Role Guide UK',
    meta_description: 'Complete guide to the CFO role in UK businesses. Learn what Chief Financial Officers do, typical salaries, career paths, and how fractional/interim options compare to full-time.',
    keywords: ['cfo', 'chief financial officer', 'cfo role', 'cfo salary uk', 'cfo responsibilities'],
    canonical_url: 'https://fractional.quest/cfo',
    hero_title: 'CFO: Chief Financial Officer',
    hero_subtitle: 'Everything you need to know about the CFO role in UK businesses',
    hero_badge: 'Role Guide',
    image_category: 'finance',
    accent_color: 'emerald',
    job_board_enabled: true,
    job_board_department: 'Finance',
    job_board_title: 'CFO Opportunities',
    sections: [
      {
        type: 'definition_box',
        heading: 'What is a CFO?',
        content: 'A Chief Financial Officer (CFO) is the senior executive responsible for managing a company\'s financial operations. The CFO oversees financial planning, risk management, record-keeping, and financial reporting. In UK companies, the CFO typically sits on the board and reports directly to the CEO, providing strategic financial guidance to drive business growth and profitability.'
      },
      {
        type: 'responsibilities',
        heading: 'Core CFO Responsibilities',
        items: [
          'Financial strategy and long-term planning',
          'Financial reporting and compliance',
          'Cash flow and treasury management',
          'Budgeting, forecasting, and analysis',
          'Risk management and internal controls',
          'Investor relations and fundraising',
          'M&A strategy and execution',
          'Board and stakeholder communication',
          'Finance team leadership and development',
          'Tax planning and optimisation'
        ]
      },
      {
        type: 'career_path',
        heading: 'Path to CFO',
        stages: [
          { role: 'Financial Analyst/Accountant', years: '0-5 years', description: 'Building technical foundation' },
          { role: 'Finance Manager', years: '5-8 years', description: 'First management responsibility' },
          { role: 'Financial Controller', years: '8-12 years', description: 'Overseeing financial operations' },
          { role: 'Finance Director', years: '12-18 years', description: 'Strategic finance leadership' },
          { role: 'CFO', years: '15-25+ years', description: 'C-suite executive responsibility' }
        ]
      },
      {
        type: 'salary_ranges',
        heading: 'CFO Salary Guide (UK)',
        ranges: [
          { segment: 'SME (£5-50M revenue)', salary: '£100-180k', bonus: '10-30%' },
          { segment: 'Mid-Market (£50-250M)', salary: '£150-280k', bonus: '20-50%' },
          { segment: 'Large Corporate (£250M+)', salary: '£250-500k', bonus: '50-100%' },
          { segment: 'FTSE 250', salary: '£400-800k', bonus: '100-200%' },
          { segment: 'FTSE 100', salary: '£700k-2M+', bonus: '150-300%' }
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'Avg UK CFO Salary', value: '£185k' },
          { label: 'Avg Bonus', value: '35%' },
          { label: 'Years Experience', value: '15-20' },
          { label: 'Qualification', value: 'ACA/ACCA' }
        ]
      },
      {
        type: 'cfo_types',
        heading: 'Types of CFO Engagement',
        types: [
          { type: 'Full-Time CFO', description: 'Permanent employee, full commitment', cost: '£150-300k+ salary' },
          { type: 'Interim CFO', description: 'Full-time temporary, 3-12 months', cost: '£800-1,500/day' },
          { type: 'Fractional CFO', description: 'Part-time ongoing, 1-3 days/week', cost: '£800-1,400/day' },
          { type: 'Part-Time CFO', description: 'Reduced hours, single company', cost: '£60-100k/year' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Explore CFO Opportunities',
        content: 'Whether you\'re hiring a CFO or pursuing CFO roles, we can help.'
      }
    ],
    faqs: [
      { question: 'What qualifications does a CFO need?', answer: 'Most UK CFOs hold professional accounting qualifications: ACA (ICAEW), ACCA, or CIMA. Many also have MBAs, particularly those in strategic or PE-backed roles. While qualifications matter early in careers, senior CFO appointments focus more on track record, sector experience, and leadership capability.' },
      { question: 'What\'s the difference between CFO and Finance Director?', answer: 'In UK SMEs, the titles are often interchangeable. Traditionally, CFO implies a more strategic, externally-focused role (investors, M&A, board leadership), while FD suggests operational finance management. Larger companies may have both: an FD managing operations, a CFO providing strategy.' },
      { question: 'Do all companies need a CFO?', answer: 'Not necessarily. Early-stage startups often manage with a part-time bookkeeper and founder oversight. As companies scale beyond £2-5M revenue, they typically need finance leadership—whether fractional, part-time, or full-time depends on complexity and budget. Most £10M+ businesses benefit from dedicated CFO-level input.' },
      { question: 'What makes a great CFO?', answer: 'Beyond technical competence, great CFOs combine: strategic thinking (seeing beyond the numbers), commercial acumen (understanding business drivers), communication skills (translating finance for non-financial audiences), leadership capability (building high-performing teams), and integrity (maintaining trust with stakeholders).' },
      { question: 'How is the CFO role changing?', answer: 'Modern CFOs are increasingly strategic partners rather than just financial stewards. Key trends include: greater focus on data and analytics, ESG and sustainability reporting, technology transformation, talent strategy, and business partnering. The "bean counter" stereotype is long outdated.' }
    ],
    internal_links: [
      { url: '/fractional-cfo', label: 'Fractional CFO', description: 'Part-time option' },
      { url: '/interim-cfo', label: 'Interim CFO', description: 'Temporary leadership' },
      { url: '/fractional-cfo-jobs-uk', label: 'CFO Jobs UK', description: 'Browse opportunities' },
      { url: '/fractional-cfo-salary', label: 'CFO Salary Guide', description: 'Detailed benchmarks' }
    ],
    external_links: [
      { url: 'https://www.icaew.com', label: 'ICAEW', domain: 'icaew.com' },
      { url: 'https://www.accaglobal.com', label: 'ACCA', domain: 'accaglobal.com' },
      { url: 'https://www.cimaglobal.com', label: 'CIMA', domain: 'cimaglobal.com' }
    ],
    related_pages: ['fractional-cfo', 'interim-cfo', 'fractional-cfo-jobs-uk', 'fractional-cfo-salary'],
    stats: { avgSalary: '£185k', avgBonus: '35%', experience: '15-20 years' }
  },
  {
    slug: 'cmo',
    page_type: 'role_definition',
    title: 'CMO | Chief Marketing Officer Role Guide UK',
    meta_description: 'Complete guide to the CMO role in UK businesses. Learn what Chief Marketing Officers do, typical salaries, career paths, and how fractional/interim options compare.',
    keywords: ['cmo', 'chief marketing officer', 'cmo role', 'cmo salary uk', 'marketing director'],
    canonical_url: 'https://fractional.quest/cmo',
    hero_title: 'CMO: Chief Marketing Officer',
    hero_subtitle: 'Complete guide to marketing leadership in UK businesses',
    hero_badge: 'Role Guide',
    image_category: 'marketing',
    accent_color: 'amber',
    job_board_enabled: true,
    job_board_department: 'Marketing',
    job_board_title: 'CMO Opportunities',
    sections: [
      {
        type: 'definition_box',
        heading: 'What is a CMO?',
        content: 'A Chief Marketing Officer (CMO) is the senior executive responsible for a company\'s marketing strategy and execution. The CMO drives brand positioning, customer acquisition, market expansion, and revenue growth through marketing initiatives. In modern businesses, the CMO often oversees digital marketing, content, brand, communications, and increasingly, customer experience.'
      },
      {
        type: 'responsibilities',
        heading: 'Core CMO Responsibilities',
        items: [
          'Marketing strategy and brand positioning',
          'Demand generation and lead acquisition',
          'Brand management and creative direction',
          'Digital marketing and marketing technology',
          'Content strategy and thought leadership',
          'Marketing analytics and ROI measurement',
          'Customer insights and market research',
          'Marketing team leadership and development',
          'Agency and vendor management',
          'Budget allocation and resource planning'
        ]
      },
      {
        type: 'salary_ranges',
        heading: 'CMO Salary Guide (UK)',
        ranges: [
          { segment: 'SME (£5-50M revenue)', salary: '£80-150k', bonus: '10-25%' },
          { segment: 'Mid-Market (£50-250M)', salary: '£120-220k', bonus: '20-40%' },
          { segment: 'Large Corporate (£250M+)', salary: '£180-350k', bonus: '30-60%' },
          { segment: 'FTSE 250', salary: '£250-500k', bonus: '50-100%' },
          { segment: 'FTSE 100', salary: '£400k-1M+', bonus: '80-150%' }
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'Avg UK CMO Salary', value: '£145k' },
          { label: 'Avg Bonus', value: '28%' },
          { label: 'Years Experience', value: '12-18' },
          { label: 'Avg Tenure', value: '3.5 years' }
        ]
      },
      {
        type: 'cmo_types',
        heading: 'Types of CMO Engagement',
        types: [
          { type: 'Full-Time CMO', description: 'Permanent employee, full commitment', cost: '£120-250k+ salary' },
          { type: 'Interim CMO', description: 'Full-time temporary, 3-12 months', cost: '£900-1,600/day' },
          { type: 'Fractional CMO', description: 'Part-time ongoing, 1-3 days/week', cost: '£900-1,400/day' },
          { type: 'Marketing Director', description: 'Senior marketing leadership', cost: '£80-150k salary' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Explore CMO Opportunities',
        content: 'Whether you\'re hiring a CMO or pursuing marketing leadership roles, we can help.'
      }
    ],
    faqs: [
      { question: 'What\'s the difference between CMO and Marketing Director?', answer: 'CMO is typically a C-suite position with board involvement and strategic focus. Marketing Director often reports to a CMO (in larger companies) or serves as the most senior marketing role in SMEs. In practice, many UK mid-market companies use the titles interchangeably.' },
      { question: 'Does every company need a CMO?', answer: 'Not all companies need a full-time CMO. Early-stage startups often have founders handling marketing or a Marketing Manager. As companies scale beyond £5-10M, they typically benefit from senior marketing leadership—whether that\'s a full-time hire, fractional CMO, or strong Marketing Director depends on growth stage and complexity.' },
      { question: 'What background do CMOs typically have?', answer: 'CMO backgrounds vary widely. Common paths include: agency-side marketers moving client-side, brand managers progressing through FMCG, digital marketing specialists, growth marketers from tech companies, and general managers with strong commercial backgrounds. There\'s no single "right" path.' },
      { question: 'Why is CMO tenure so short?', answer: 'CMO average tenure (3-4 years) is shorter than other C-suite roles for several reasons: marketing results are highly visible, brand changes often follow CEO changes, digital disruption requires evolving skillsets, and CMO scope varies dramatically between companies.' },
      { question: 'What skills do modern CMOs need?', answer: 'Modern CMOs need a blend of: strategic thinking, data literacy and analytics, digital marketing expertise, brand building ability, commercial acumen, leadership skills, and increasingly, technology and AI understanding. The "creative only" CMO is rare; today\'s leaders must balance art and science.' }
    ],
    internal_links: [
      { url: '/fractional-cmo', label: 'Fractional CMO', description: 'Part-time option' },
      { url: '/fractional-cmo-jobs-uk', label: 'CMO Jobs UK', description: 'Browse opportunities' },
      { url: '/fractional-cmo-salary', label: 'CMO Salary Guide', description: 'Detailed benchmarks' },
      { url: '/hire-fractional-cmo', label: 'Hire a CMO', description: 'Hiring guide' }
    ],
    external_links: [
      { url: 'https://www.cim.co.uk', label: 'Chartered Institute of Marketing', domain: 'cim.co.uk' },
      { url: 'https://dma.org.uk', label: 'Data & Marketing Association', domain: 'dma.org.uk' },
      { url: 'https://www.marketingweek.com', label: 'Marketing Week', domain: 'marketingweek.com' }
    ],
    related_pages: ['fractional-cmo', 'fractional-cmo-jobs-uk', 'fractional-cmo-salary', 'hire-fractional-cmo'],
    stats: { avgSalary: '£145k', avgBonus: '28%', avgTenure: '3.5 years' }
  },
  {
    slug: 'cto',
    page_type: 'role_definition',
    title: 'CTO | Chief Technology Officer Role Guide UK',
    meta_description: 'Complete guide to the CTO role in UK businesses. Learn what Chief Technology Officers do, typical salaries, career paths, and fractional/interim alternatives.',
    keywords: ['cto', 'chief technology officer', 'cto role', 'cto salary uk', 'tech leadership'],
    canonical_url: 'https://fractional.quest/cto',
    hero_title: 'CTO: Chief Technology Officer',
    hero_subtitle: 'Complete guide to technology leadership in UK businesses',
    hero_badge: 'Role Guide',
    image_category: 'technology',
    accent_color: 'blue',
    job_board_enabled: true,
    job_board_department: 'Technology',
    job_board_title: 'CTO Opportunities',
    sections: [
      {
        type: 'definition_box',
        heading: 'What is a CTO?',
        content: 'A Chief Technology Officer (CTO) is the senior executive responsible for a company\'s technology strategy and implementation. The CTO role varies significantly: in product companies, they drive product development and innovation; in traditional businesses, they may oversee IT infrastructure and digital transformation. Modern CTOs bridge technology and business strategy.'
      },
      {
        type: 'cto_archetypes',
        heading: 'Types of CTO',
        archetypes: [
          { type: 'Product CTO', focus: 'Building technology products', skills: 'Architecture, engineering leadership, product development' },
          { type: 'Infrastructure CTO', focus: 'IT operations and systems', skills: 'Cloud, security, infrastructure, vendor management' },
          { type: 'Innovation CTO', focus: 'R&D and emerging technology', skills: 'Research, patents, tech strategy, partnerships' },
          { type: 'Transformation CTO', focus: 'Digital transformation', skills: 'Change management, modernisation, stakeholder management' }
        ]
      },
      {
        type: 'responsibilities',
        heading: 'Core CTO Responsibilities',
        items: [
          'Technology strategy and roadmap',
          'Software/product development oversight',
          'Engineering team leadership and scaling',
          'Technical architecture decisions',
          'Technology vendor and partner management',
          'Security and compliance governance',
          'Innovation and emerging technology assessment',
          'Technical due diligence for M&A',
          'Board-level technology communication',
          'Build vs buy decisions'
        ]
      },
      {
        type: 'salary_ranges',
        heading: 'CTO Salary Guide (UK)',
        ranges: [
          { segment: 'Startup (Seed-A)', salary: '£80-130k + equity', bonus: '0-20%' },
          { segment: 'Scale-up (£10-50M)', salary: '£120-200k', bonus: '15-30%' },
          { segment: 'Mid-Market Tech', salary: '£150-280k', bonus: '20-50%' },
          { segment: 'Enterprise', salary: '£200-400k', bonus: '30-60%' },
          { segment: 'FTSE', salary: '£300-700k+', bonus: '50-100%' }
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'Avg UK CTO Salary', value: '£165k' },
          { label: 'Startup CTO Equity', value: '1-5%' },
          { label: 'Years Experience', value: '12-20' },
          { label: 'Engineering Degree', value: '75%' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Explore CTO Opportunities',
        content: 'Whether you\'re hiring a CTO or pursuing tech leadership roles, we can help.'
      }
    ],
    faqs: [
      { question: 'What\'s the difference between CTO and CIO?', answer: 'CTO typically focuses on external technology—products, innovation, and customer-facing systems. CIO focuses on internal IT—infrastructure, business systems, and operations. In tech companies, the CTO is usually more senior; in traditional enterprises, the CIO may be. Many companies only have one role that combines both.' },
      { question: 'Does a CTO need to code?', answer: 'It depends on company stage. Startup CTOs often code actively. As companies scale, CTOs shift to leadership, architecture, and strategy—hands-on coding becomes impractical. However, maintaining technical credibility is important. Most CTOs stay technically current even if not writing production code daily.' },
      { question: 'Can you become CTO without a CS degree?', answer: 'Yes, though it\'s less common. Many successful CTOs are self-taught or come from adjacent fields (physics, maths, engineering). What matters is demonstrable technical competence, track record of building technology, and leadership capability. The degree matters less than the proven ability.' },
      { question: 'What\'s the CTO-to-CEO pipeline?', answer: 'CTOs increasingly become CEOs, particularly in tech companies. The path typically involves broadening business exposure (P&L responsibility, commercial roles), developing non-technical skills (finance, sales, strategy), and often an MBA or board experience. Tech founders who start as CTO often transition to CEO as companies scale.' },
      { question: 'Should startups hire a CTO or lead developer first?', answer: 'It depends on the founders\' technical capability. If founders can\'t make architecture decisions and evaluate talent, they need CTO-level input early—possibly fractional. If they have technical expertise, a strong lead developer may suffice initially, with CTO hire at Series A/B.' }
    ],
    internal_links: [
      { url: '/fractional-cto', label: 'Fractional CTO', description: 'Part-time option' },
      { url: '/fractional-cto-jobs-uk', label: 'CTO Jobs UK', description: 'Browse opportunities' },
      { url: '/fractional-cto-salary', label: 'CTO Salary Guide', description: 'Detailed benchmarks' },
      { url: '/hire-fractional-cto', label: 'Hire a CTO', description: 'Hiring guide' }
    ],
    external_links: [
      { url: 'https://www.bcs.org', label: 'BCS', domain: 'bcs.org' },
      { url: 'https://technation.io', label: 'Tech Nation', domain: 'technation.io' },
      { url: 'https://www.theiet.org', label: 'IET', domain: 'theiet.org' }
    ],
    related_pages: ['fractional-cto', 'fractional-cto-jobs-uk', 'fractional-cto-salary', 'hire-fractional-cto'],
    stats: { avgSalary: '£165k', startupEquity: '1-5%', experience: '12-20 years' }
  },
  {
    slug: 'coo',
    page_type: 'role_definition',
    title: 'COO | Chief Operating Officer Role Guide UK',
    meta_description: 'Complete guide to the COO role in UK businesses. Learn what Chief Operating Officers do, typical salaries, career paths, and fractional/interim alternatives.',
    keywords: ['coo', 'chief operating officer', 'coo role', 'coo salary uk', 'operations director'],
    canonical_url: 'https://fractional.quest/coo',
    hero_title: 'COO: Chief Operating Officer',
    hero_subtitle: 'Complete guide to operations leadership in UK businesses',
    hero_badge: 'Role Guide',
    image_category: 'operations',
    accent_color: 'purple',
    job_board_enabled: true,
    job_board_department: 'Operations',
    job_board_title: 'COO Opportunities',
    sections: [
      {
        type: 'definition_box',
        heading: 'What is a COO?',
        content: 'A Chief Operating Officer (COO) is the senior executive responsible for overseeing a company\'s day-to-day operations. The COO translates strategy into execution, ensuring operational efficiency across the business. In many organisations, the COO is the second-in-command after the CEO, managing internal operations while the CEO focuses on external matters and strategy.'
      },
      {
        type: 'coo_types',
        heading: 'Types of COO',
        types: [
          { type: 'Executor COO', description: 'Implements CEO\'s strategy, runs operations', focus: 'Execution, efficiency, scaling' },
          { type: 'Change Agent COO', description: 'Drives transformation and turnaround', focus: 'Restructuring, culture change' },
          { type: 'Heir Apparent COO', description: 'Being groomed for CEO role', focus: 'Strategic exposure, board relationships' },
          { type: 'Partner COO', description: 'Complements CEO\'s skills', focus: 'Filling CEO gaps, co-leadership' },
          { type: 'Integrator COO', description: 'EOS/Traction model operator', focus: 'Process, systems, team accountability' }
        ]
      },
      {
        type: 'responsibilities',
        heading: 'Core COO Responsibilities',
        items: [
          'Day-to-day operations management',
          'Cross-functional coordination',
          'Process improvement and efficiency',
          'Scaling operations for growth',
          'Supply chain and vendor management',
          'Facilities and infrastructure',
          'HR and people operations oversight',
          'Quality assurance and compliance',
          'Operational KPIs and reporting',
          'Crisis management and business continuity'
        ]
      },
      {
        type: 'salary_ranges',
        heading: 'COO Salary Guide (UK)',
        ranges: [
          { segment: 'SME (£5-50M revenue)', salary: '£90-160k', bonus: '15-30%' },
          { segment: 'Mid-Market (£50-250M)', salary: '£140-250k', bonus: '25-50%' },
          { segment: 'Large Corporate (£250M+)', salary: '£200-400k', bonus: '40-80%' },
          { segment: 'FTSE 250', salary: '£300-600k', bonus: '60-120%' },
          { segment: 'FTSE 100', salary: '£500k-1.2M+', bonus: '100-200%' }
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'Avg UK COO Salary', value: '£155k' },
          { label: 'Avg Bonus', value: '32%' },
          { label: 'Years Experience', value: '15-20' },
          { label: 'COO to CEO', value: '35%' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Explore COO Opportunities',
        content: 'Whether you\'re hiring a COO or pursuing operations leadership roles, we can help.'
      }
    ],
    faqs: [
      { question: 'Does every company need a COO?', answer: 'No—many successful companies operate without a COO. The role makes sense when: operations are complex enough to require dedicated leadership, the CEO needs to focus externally (fundraising, sales, strategy), or the business is scaling rapidly. Smaller companies often combine COO duties with other roles.' },
      { question: 'What\'s the COO-to-CEO path?', answer: 'About 35% of COOs eventually become CEOs, making it one of the strongest pipelines to the top job. Success requires developing external skills (investor relations, sales, vision-setting) that COOs don\'t always practice. The best-positioned COOs actively seek P&L ownership and external exposure.' },
      { question: 'What\'s the difference between COO and Operations Director?', answer: 'COO is a C-suite role with broad strategic scope, often encompassing multiple functions beyond pure operations. Operations Director typically focuses on a specific operational area (manufacturing, logistics, service delivery) and reports to a COO or CEO. In SMEs, the titles may be interchangeable.' },
      { question: 'What background do COOs typically have?', answer: 'COO backgrounds vary widely: operations/supply chain specialists, former consultants (McKinsey, Bain), finance professionals, general managers, and entrepreneurs. There\'s no single path—what matters is demonstrating ability to drive operational excellence at scale.' },
      { question: 'Is the COO role declining?', answer: 'The traditional COO role is evolving rather than declining. While some tech companies skip the COO position, others are creating "Chief Operating Officer" roles with different scopes—Chief Revenue Officer, Chief People Officer, etc. The operational leadership need remains; the structure varies.' }
    ],
    internal_links: [
      { url: '/fractional-coo', label: 'Fractional COO', description: 'Part-time option' },
      { url: '/fractional-coo-jobs-uk', label: 'COO Jobs UK', description: 'Browse opportunities' },
      { url: '/fractional-coo-salary', label: 'COO Salary Guide', description: 'Detailed benchmarks' },
      { url: '/hire-fractional-coo', label: 'Hire a COO', description: 'Hiring guide' }
    ],
    external_links: [
      { url: 'https://www.managers.org.uk', label: 'Chartered Management Institute', domain: 'managers.org.uk' },
      { url: 'https://www.iod.com', label: 'Institute of Directors', domain: 'iod.com' },
      { url: 'https://www.cips.org', label: 'CIPS', domain: 'cips.org' }
    ],
    related_pages: ['fractional-coo', 'fractional-coo-jobs-uk', 'fractional-coo-salary', 'hire-fractional-coo'],
    stats: { avgSalary: '£155k', avgBonus: '32%', cooToCeo: '35%' }
  }
];

// ============================================
// PART 2: How to Become Guide Pages
// ============================================

const howToBecomePages = [
  {
    slug: 'how-to-become-fractional-cfo',
    page_type: 'career_guide',
    title: 'How to Become a Fractional CFO | Career Guide UK',
    meta_description: 'Complete guide to becoming a Fractional CFO in the UK. Learn the qualifications, experience, and steps needed to build a successful portfolio finance career.',
    keywords: ['how to become fractional cfo', 'fractional cfo career', 'portfolio cfo', 'become finance director'],
    canonical_url: 'https://fractional.quest/how-to-become-fractional-cfo',
    hero_title: 'How to Become a Fractional CFO',
    hero_subtitle: 'Your roadmap to a flexible, rewarding finance leadership career',
    hero_badge: 'Career Guide',
    image_category: 'finance',
    accent_color: 'emerald',
    sections: [
      {
        type: 'intro',
        heading: 'Is a Fractional CFO Career Right for You?',
        content: 'The fractional CFO model offers experienced finance professionals the opportunity to work with multiple businesses, enjoy greater flexibility, and often earn more than traditional employment. But it\'s not for everyone. This guide will help you assess whether the fractional path suits your skills, preferences, and career stage—and provide a practical roadmap to get started.'
      },
      {
        type: 'prerequisites',
        heading: 'Prerequisites for Fractional CFO Success',
        mustHaves: [
          { item: 'Professional qualification (ACA, ACCA, CIMA)', importance: 'Essential for credibility' },
          { item: '10-15+ years finance experience', importance: 'Clients expect senior expertise' },
          { item: 'FD/CFO-level experience', importance: 'Must have "done the job" full-time' },
          { item: 'Diverse sector exposure', importance: 'Ability to add value across industries' },
          { item: 'Strong communication skills', importance: 'Translating finance for non-finance audiences' }
        ],
        niceToHaves: [
          { item: 'M&A or fundraising experience', importance: 'Premium skills commanding higher rates' },
          { item: 'PE/VC-backed company experience', importance: 'High-demand segment' },
          { item: 'Turnaround or transformation track record', importance: 'Specialist positioning' },
          { item: 'Existing network of potential clients', importance: 'Accelerates launch' }
        ]
      },
      {
        type: 'steps',
        heading: 'Steps to Becoming a Fractional CFO',
        steps: [
          { step: 1, title: 'Assess Your Readiness', description: 'Evaluate your experience, financial runway, and risk tolerance. Most successful fractional CFOs have 15+ years experience and 6-12 months living expenses saved.' },
          { step: 2, title: 'Define Your Positioning', description: 'Identify your ideal client profile: industry, company stage, specific needs you solve. Generic "CFO for hire" positioning is weak; specific expertise wins.' },
          { step: 3, title: 'Set Up Your Business', description: 'Register a limited company, arrange professional indemnity insurance, set up accounting. Consider IR35 implications and structure accordingly.' },
          { step: 4, title: 'Build Your Online Presence', description: 'Create a professional LinkedIn profile, consider a simple website. Thought leadership content (articles, posts) builds credibility and attracts inbound enquiries.' },
          { step: 5, title: 'Land Your First Client', description: 'Leverage your network first—former colleagues, contacts, advisors. Consider platforms and agencies while building direct pipeline. First client often comes from existing relationships.' },
          { step: 6, title: 'Deliver Excellence', description: 'Over-deliver for early clients. Referrals and testimonials from satisfied clients are your best marketing. Build case studies and results evidence.' },
          { step: 7, title: 'Scale Your Practice', description: 'Gradually add clients (typically 3-5 concurrent). Develop systems for managing multiple engagements. Consider associate network for overflow.' }
        ]
      },
      {
        type: 'earnings',
        heading: 'Fractional CFO Earnings Potential',
        tiers: [
          { level: 'Starting Out', dayRate: '£600-800', clients: '1-2', annual: '£60-100k' },
          { level: 'Established', dayRate: '£800-1,200', clients: '2-4', annual: '£120-200k' },
          { level: 'Premium', dayRate: '£1,200-1,800', clients: '3-5', annual: '£200-350k' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Ready to Start Your Fractional Journey?',
        content: 'Browse fractional CFO opportunities or connect with our community of portfolio finance leaders.'
      }
    ],
    faqs: [
      { question: 'How long does it take to build a full client roster?', answer: 'Most fractional CFOs take 6-18 months to build a sustainable portfolio of 3-5 clients. The first client typically comes within 1-3 months through existing network. Growing beyond that requires active business development and reputation building.' },
      { question: 'Should I leave my job before starting?', answer: 'The safest approach is landing your first fractional client while still employed, then transitioning. However, this isn\'t always possible due to employment contracts. Having 6-12 months runway allows you to focus on building the practice without financial pressure.' },
      { question: 'Do I need professional indemnity insurance?', answer: 'Yes—it\'s essential. Professional indemnity insurance protects you if a client claims your advice caused financial loss. Most clients require it contractually. Typical coverage is £1-2M, costing £500-1,500 annually depending on your turnover and risk profile.' },
      { question: 'How do I handle IR35?', answer: 'IR35 is the UK tax legislation affecting contractors working through limited companies. Many fractional CFO engagements are outside IR35 (multiple clients, own business, control over work), but assessment is case-by-case. Get professional tax advice and use proper IR35 assessment for each engagement.' },
      { question: 'What if I can\'t find enough clients?', answer: 'Client acquisition is the main challenge. Mitigate risk by: maintaining strong network relationships, building online presence, working with fractional platforms and agencies, considering interim roles to bridge gaps, and keeping overhead low initially.' }
    ],
    internal_links: [
      { url: '/fractional-cfo', label: 'Fractional CFO', description: 'Role overview' },
      { url: '/fractional-cfo-jobs-uk', label: 'CFO Jobs UK', description: 'Current opportunities' },
      { url: '/fractional-cfo-salary', label: 'CFO Rates', description: 'Market benchmarks' }
    ],
    external_links: [
      { url: 'https://www.icaew.com', label: 'ICAEW', domain: 'icaew.com' },
      { url: 'https://www.gov.uk/guidance/ir35-find-out-if-it-applies', label: 'IR35 Guidance', domain: 'gov.uk' }
    ],
    related_pages: ['fractional-cfo', 'fractional-cfo-jobs-uk', 'fractional-cfo-salary'],
    stats: { timeToFirstClient: '1-3 months', fullPortfolio: '6-18 months' }
  },
  {
    slug: 'how-to-become-fractional-cmo',
    page_type: 'career_guide',
    title: 'How to Become a Fractional CMO | Career Guide UK',
    meta_description: 'Complete guide to becoming a Fractional CMO in the UK. Learn the experience, skills, and steps to build a successful portfolio marketing leadership career.',
    keywords: ['how to become fractional cmo', 'fractional cmo career', 'portfolio cmo', 'marketing consultant career'],
    canonical_url: 'https://fractional.quest/how-to-become-fractional-cmo',
    hero_title: 'How to Become a Fractional CMO',
    hero_subtitle: 'Build a flexible marketing leadership career on your terms',
    hero_badge: 'Career Guide',
    image_category: 'marketing',
    accent_color: 'amber',
    sections: [
      {
        type: 'intro',
        heading: 'The Rise of the Fractional CMO',
        content: 'Marketing leadership has transformed. While full-time CMO tenure averages just 3.5 years, Fractional CMOs build sustainable careers serving multiple clients over decades. The model offers autonomy, variety, and often higher earnings—but requires entrepreneurial thinking and strong personal brand. Here\'s how to make the transition.'
      },
      {
        type: 'prerequisites',
        heading: 'What You Need to Succeed',
        mustHaves: [
          { item: '10-15+ years marketing experience', importance: 'Clients expect genuine seniority' },
          { item: 'Marketing Director/CMO track record', importance: 'Must have led teams and strategy' },
          { item: 'Demonstrable business impact', importance: 'Case studies showing ROI' },
          { item: 'Strong digital marketing knowledge', importance: 'Modern marketing is digital-first' },
          { item: 'Commercial and data literacy', importance: 'Speaking the language of business' }
        ],
        niceToHaves: [
          { item: 'B2B/B2C breadth', importance: 'Flexibility across client types' },
          { item: 'Agency + client-side experience', importance: 'Understanding both perspectives' },
          { item: 'Thought leadership presence', importance: 'LinkedIn, speaking, content' },
          { item: 'CIM or equivalent qualification', importance: 'Adds credibility' }
        ]
      },
      {
        type: 'steps',
        heading: 'Your Path to Fractional CMO',
        steps: [
          { step: 1, title: 'Clarify Your Niche', description: 'What specific marketing challenges do you solve best? B2B SaaS growth? Brand repositioning? Demand generation? Specific positioning beats generalist claims.' },
          { step: 2, title: 'Build Your Evidence Base', description: 'Document your achievements: growth numbers, campaign results, brand transformations. These become your sales collateral. Anonymise if needed, but have concrete proof.' },
          { step: 3, title: 'Establish Thought Leadership', description: 'Marketing leaders are expected to demonstrate expertise publicly. Write regularly on LinkedIn, speak at events, contribute to industry publications. This is your inbound engine.' },
          { step: 4, title: 'Structure Your Business', description: 'Set up limited company, insurance, contracts. Define your service offerings and pricing. Day rates typically £900-1,500 for experienced fractional CMOs.' },
          { step: 5, title: 'Activate Your Network', description: 'Tell everyone: former colleagues, agencies, VCs, PE firms, accountants, lawyers. Many first clients come through professional connections.' },
          { step: 6, title: 'Deliver and Document', description: 'First clients are critical—they generate testimonials, case studies, and referrals. Over-deliver and systematically collect evidence of impact.' }
        ]
      },
      {
        type: 'earnings',
        heading: 'Earnings Potential',
        tiers: [
          { level: 'Building', dayRate: '£700-1,000', clients: '1-2', annual: '£70-120k' },
          { level: 'Established', dayRate: '£1,000-1,400', clients: '2-4', annual: '£150-250k' },
          { level: 'Premium', dayRate: '£1,400-2,000', clients: '3-4', annual: '£250-400k' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Start Your Fractional CMO Journey',
        content: 'Explore marketing leadership opportunities and connect with the fractional community.'
      }
    ],
    faqs: [
      { question: 'How is fractional CMO different from marketing consulting?', answer: 'Fractional CMOs take ongoing ownership of marketing strategy and often manage teams—they\'re embedded in the business. Consultants typically deliver projects or advice without ongoing accountability. Fractional engagements are usually 6+ months; consulting may be weeks.' },
      { question: 'Do fractional CMOs manage agencies?', answer: 'Yes, frequently. Many clients have agency relationships that need strategic oversight. Fractional CMOs often inherit, evaluate, and manage agencies—or help clients decide when to bring capabilities in-house. Agency management is a core skill.' },
      { question: 'What\'s the biggest challenge for new fractional CMOs?', answer: 'Business development. Most marketers haven\'t had to sell themselves before. Building a personal brand, networking strategically, and consistently generating leads requires different skills than corporate marketing leadership.' },
      { question: 'Should I work with a fractional platform?', answer: 'Platforms and agencies can help fill your pipeline, especially early on. They take 15-30% margins but provide qualified leads. Most successful fractional CMOs use a mix: platform/agency leads plus direct business development.' }
    ],
    internal_links: [
      { url: '/fractional-cmo', label: 'Fractional CMO', description: 'Role overview' },
      { url: '/fractional-cmo-jobs-uk', label: 'CMO Jobs UK', description: 'Opportunities' },
      { url: '/fractional-cmo-salary', label: 'CMO Rates', description: 'Benchmarks' }
    ],
    external_links: [
      { url: 'https://www.cim.co.uk', label: 'CIM', domain: 'cim.co.uk' },
      { url: 'https://www.marketingweek.com', label: 'Marketing Week', domain: 'marketingweek.com' }
    ],
    related_pages: ['fractional-cmo', 'fractional-cmo-jobs-uk', 'fractional-cmo-salary'],
    stats: { timeToFirstClient: '1-3 months', premiumRate: '£1,400-2,000/day' }
  }
];

// ============================================
// PART 3: Industry-Specific Pages
// ============================================

const industryPages = [
  {
    slug: 'fractional-executives-fintech',
    page_type: 'industry',
    title: 'Fractional Executives for Fintech | UK Finance Technology Leaders',
    meta_description: 'Expert fractional executives for fintech companies. Access CFOs, CTOs, and compliance leaders who understand FCA regulation, payment systems, and fintech scaling.',
    keywords: ['fintech fractional executives', 'fintech cfo', 'fintech cto', 'fintech compliance', 'fractional fintech'],
    canonical_url: 'https://fractional.quest/fractional-executives-fintech',
    hero_title: 'Fractional Executives for Fintech',
    hero_subtitle: 'Experienced leaders who understand FCA regulation, scaling, and fintech-specific challenges',
    hero_badge: 'Fintech',
    image_category: 'fintech',
    accent_color: 'blue',
    job_board_enabled: true,
    job_board_department: 'Finance,Technology',
    sections: [
      {
        type: 'intro',
        heading: 'Why Fintech Companies Need Specialist Fractional Leadership',
        content: 'Fintech operates at the intersection of financial services and technology—two heavily regulated, fast-moving sectors. Generic fractional executives may lack the specific expertise fintechs need: FCA authorisation, payment processing, banking partnerships, and the unique challenges of scaling a regulated technology business.'
      },
      {
        type: 'role_types',
        heading: 'Fractional Roles for Fintech',
        items: [
          { title: 'Fractional CFO (Fintech)', description: 'FCA reporting, investor relations, unit economics', rate: '£1,000-1,600/day' },
          { title: 'Fractional CTO (Fintech)', description: 'Secure systems, API architecture, scaling', rate: '£1,000-1,500/day' },
          { title: 'Fractional CCO/MLRO', description: 'FCA compliance, AML, regulatory relationships', rate: '£900-1,400/day' },
          { title: 'Fractional CISO', description: 'PCI-DSS, security frameworks, cyber resilience', rate: '£1,000-1,500/day' },
          { title: 'Fractional COO', description: 'Operations scaling, process automation', rate: '£900-1,400/day' }
        ]
      },
      {
        type: 'challenges',
        heading: 'Fintech-Specific Challenges We Help Solve',
        items: [
          'FCA authorisation applications and variations',
          'Banking partner relationships and requirements',
          'Payment scheme compliance (Visa, Mastercard, BACS)',
          'PSD2/Open Banking implementation',
          'Scaling technology infrastructure securely',
          'Series A/B fundraising from specialist fintech investors',
          'Unit economics and path to profitability',
          'International expansion and licensing'
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'UK Fintechs', value: '2,500+' },
          { label: 'FCA Regulated', value: '60%' },
          { label: 'Avg Funding', value: '£15M' },
          { label: 'Our Network', value: '50+ specialists' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Find Fintech-Experienced Executives',
        content: 'Connect with fractional leaders who\'ve scaled fintechs from seed to Series C and beyond.'
      }
    ],
    faqs: [
      { question: 'Do your fractional executives have FCA experience?', answer: 'Yes—our fintech network includes executives who have led FCA authorisation applications, managed regulatory relationships, and built compliant fintech operations. We match based on specific regulatory experience (e-money, payment services, consumer credit, etc.).' },
      { question: 'Can a fractional CCO be our named MLRO?', answer: 'In many cases, yes. The FCA allows outsourced compliance arrangements with appropriate oversight. A fractional CCO can hold the MLRO role if they have sufficient time commitment and the firm demonstrates adequate governance. We can discuss your specific situation.' },
      { question: 'What fintech stages do you support?', answer: 'From pre-authorisation startups to Series C scale-ups. Different stages need different expertise: early-stage fintechs need regulatory strategy; growth-stage need scaling operations; later-stage need institutional-grade finance and compliance functions.' }
    ],
    internal_links: [
      { url: '/fractional-cfo', label: 'Fractional CFO', description: 'Finance leadership' },
      { url: '/fractional-cto', label: 'Fractional CTO', description: 'Tech leadership' },
      { url: '/fractional-compliance-services', label: 'Compliance Services', description: 'Regulatory support' }
    ],
    external_links: [
      { url: 'https://www.fca.org.uk', label: 'FCA', domain: 'fca.org.uk' },
      { url: 'https://www.innovatefinance.com', label: 'Innovate Finance', domain: 'innovatefinance.com' },
      { url: 'https://technation.io/fintech', label: 'Tech Nation Fintech', domain: 'technation.io' }
    ],
    related_pages: ['fractional-cfo', 'fractional-cto', 'fractional-compliance-services'],
    stats: { fintechs: '2,500+', specialists: '50+' }
  },
  {
    slug: 'fractional-executives-healthtech',
    page_type: 'industry',
    title: 'Fractional Executives for Healthtech | UK Healthcare Technology Leaders',
    meta_description: 'Expert fractional executives for healthtech and digital health companies. Access leaders who understand NHS partnerships, MHRA compliance, and healthcare scaling.',
    keywords: ['healthtech fractional executives', 'healthtech cto', 'digital health leadership', 'nhs partnerships', 'medtech executives'],
    canonical_url: 'https://fractional.quest/fractional-executives-healthtech',
    hero_title: 'Fractional Executives for Healthtech',
    hero_subtitle: 'Leaders who understand NHS, MHRA, and the unique challenges of healthcare innovation',
    hero_badge: 'Healthtech',
    image_category: 'healthcare',
    accent_color: 'red',
    job_board_enabled: true,
    job_board_department: 'Healthcare,Technology',
    sections: [
      {
        type: 'intro',
        heading: 'The Unique Challenge of Healthtech Leadership',
        content: 'Healthtech combines technology innovation with healthcare\'s complex regulatory environment and risk-averse buyers. Success requires leaders who understand both worlds: the pace of tech startups and the rigour of clinical evidence, NHS procurement, and medical device regulation.'
      },
      {
        type: 'role_types',
        heading: 'Fractional Roles for Healthtech',
        items: [
          { title: 'Fractional CTO (Healthtech)', description: 'HIPAA-compliant systems, interoperability, clinical integration', rate: '£1,000-1,500/day' },
          { title: 'Fractional CCO (Healthcare)', description: 'MHRA, CQC, clinical governance, quality systems', rate: '£900-1,400/day' },
          { title: 'Fractional CFO (Healthtech)', description: 'NHS contracts, grant funding, investor relations', rate: '£900-1,400/day' },
          { title: 'Fractional CMO (Healthcare)', description: 'NHS engagement, clinical marketing, evidence building', rate: '£900-1,400/day' },
          { title: 'Fractional COO (Healthtech)', description: 'Clinical operations, scale, quality management', rate: '£850-1,300/day' }
        ]
      },
      {
        type: 'challenges',
        heading: 'Healthtech-Specific Challenges We Help Solve',
        items: [
          'NHS procurement and framework agreements',
          'MHRA medical device classification and compliance',
          'Clinical evidence generation and RCT design',
          'DTAC and NHS Digital requirements',
          'Information governance (IG Toolkit, DCB0129)',
          'NICE submissions and health economics',
          'CE/UKCA marking post-Brexit',
          'Healthcare investor and grant relationships'
        ]
      },
      {
        type: 'stats_bar',
        items: [
          { label: 'UK Healthtechs', value: '3,800+' },
          { label: 'NHS Digital Spend', value: '£2.1B' },
          { label: 'Sector Growth', value: '15% p.a.' },
          { label: 'Our Specialists', value: '35+' }
        ]
      },
      {
        type: 'cta_section',
        heading: 'Find Healthtech-Experienced Executives',
        content: 'Connect with fractional leaders who\'ve navigated NHS procurement, MHRA approval, and healthtech scaling.'
      }
    ],
    faqs: [
      { question: 'Do your executives have NHS experience?', answer: 'Yes—our healthtech network includes executives who\'ve sold to NHS trusts, navigated procurement frameworks, and built partnerships with NHS Digital. Many have NHS backgrounds themselves or have held commercial roles in companies selling into healthcare.' },
      { question: 'Can you help with medical device regulation?', answer: 'Yes. Our compliance specialists include regulatory affairs experts with MHRA and EU MDR experience. They can help with device classification, quality management systems, clinical evaluation, and technical documentation for medical devices and software.' },
      { question: 'What about digital health apps (not medical devices)?', answer: 'We support the full spectrum: from wellness apps through DTx (digital therapeutics) to Class IIa medical devices. Different regulatory requirements apply, and we match executives with relevant experience to your specific product category.' }
    ],
    internal_links: [
      { url: '/fractional-cto', label: 'Fractional CTO', description: 'Tech leadership' },
      { url: '/fractional-cfo', label: 'Fractional CFO', description: 'Finance leadership' },
      { url: '/fractional-compliance-services', label: 'Compliance Services', description: 'Regulatory support' }
    ],
    external_links: [
      { url: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency', label: 'MHRA', domain: 'gov.uk' },
      { url: 'https://www.nhsx.nhs.uk', label: 'NHSX', domain: 'nhsx.nhs.uk' },
      { url: 'https://www.abhi.org.uk', label: 'ABHI', domain: 'abhi.org.uk' }
    ],
    related_pages: ['fractional-cto', 'fractional-cfo', 'fractional-compliance-services'],
    stats: { healthtechs: '3,800+', specialists: '35+' }
  }
];

// ============================================
// PART 4: Comparison Pages
// ============================================

const comparisonPages = [
  {
    slug: 'fractional-vs-consulting',
    page_type: 'comparison',
    title: 'Fractional Executive vs Consultant | Which Do You Need?',
    meta_description: 'Understand the key differences between fractional executives and consultants. Learn which model suits your business needs, budget, and goals.',
    keywords: ['fractional vs consultant', 'fractional executive or consultant', 'consulting vs fractional', 'executive consultant'],
    canonical_url: 'https://fractional.quest/fractional-vs-consulting',
    hero_title: 'Fractional Executive vs Consultant',
    hero_subtitle: 'Understanding the key differences to make the right choice for your business',
    hero_badge: 'Comparison Guide',
    image_category: 'business',
    accent_color: 'indigo',
    sections: [
      {
        type: 'intro',
        heading: 'The Distinction That Matters',
        content: 'Businesses often use "fractional" and "consultant" interchangeably, but they represent fundamentally different engagement models. Understanding the distinction helps you choose the right solution—and set appropriate expectations for whoever you hire.'
      },
      {
        type: 'comparison_table',
        heading: 'Fractional Executive vs Consultant',
        rows: [
          { aspect: 'Primary Role', fractional: 'Ongoing leadership and ownership', consultant: 'Advice, analysis, recommendations' },
          { aspect: 'Duration', fractional: 'Months to years', consultant: 'Weeks to months (project-based)' },
          { aspect: 'Accountability', fractional: 'Accountable for outcomes', consultant: 'Accountable for deliverables' },
          { aspect: 'Team Management', fractional: 'Often manages internal teams', consultant: 'Usually no direct reports' },
          { aspect: 'Integration', fractional: 'Embedded in the organisation', consultant: 'External advisor' },
          { aspect: 'Decision Rights', fractional: 'Makes decisions (within scope)', consultant: 'Recommends decisions' },
          { aspect: 'Typical Cadence', fractional: '1-3 days per week, ongoing', consultant: 'Intensive periods, then exit' },
          { aspect: 'Pricing Model', fractional: 'Day rate or retainer', consultant: 'Project fee or day rate' }
        ]
      },
      {
        type: 'scenarios',
        heading: 'When to Choose Each Model',
        items: [
          { scenario: 'Choose Fractional When...', items: ['You need ongoing leadership presence', 'Someone needs to own outcomes long-term', 'You want to build internal capability', 'You need board/stakeholder representation', 'The role requires relationship continuity'] },
          { scenario: 'Choose Consultant When...', items: ['You have a specific, bounded problem', 'You need specialist expertise for a project', 'Independent analysis or audit is required', 'You want recommendations without internal politics', 'Knowledge transfer is more important than ongoing execution'] }
        ]
      },
      {
        type: 'examples',
        heading: 'Real-World Examples',
        examples: [
          { need: 'CFO departure—need coverage while hiring', choice: 'Fractional (or Interim)', reason: 'Ongoing leadership required, not just advice' },
          { need: 'Due diligence on acquisition target', choice: 'Consultant', reason: 'Bounded project, independent analysis' },
          { need: 'Build marketing function from scratch', choice: 'Fractional', reason: 'Team building, strategy, ongoing ownership' },
          { need: 'Assess technology stack for modernisation', choice: 'Consultant', reason: 'Expert assessment, recommendations, then hand off' },
          { need: 'Monthly financial strategy and board reporting', choice: 'Fractional', reason: 'Ongoing responsibility, relationship continuity' }
        ]
      },
      {
        type: 'hybrid',
        heading: 'The Hybrid Approach',
        content: 'Many businesses use both: a fractional executive for ongoing leadership, supported by consultants for specialist projects. For example, a Fractional CFO might engage a tax consultant for a restructuring, or a Fractional CTO might bring in a security consultant for a penetration test. The models complement rather than compete.'
      },
      {
        type: 'cta_section',
        heading: 'Still Not Sure?',
        content: 'Talk to us about your specific needs—we can help determine the right model.'
      }
    ],
    faqs: [
      { question: 'Can someone be both fractional and consultant?', answer: 'Yes—many professionals do both. They might have fractional clients (ongoing, embedded) and consulting clients (project-based). The distinction is about the engagement model, not the individual. The same person might be your Fractional CFO or your financial consultant, depending on what you need.' },
      { question: 'Which is more expensive?', answer: 'Day rates are often similar, but total cost differs. Fractional engagements cost more in total (ongoing commitment) but less per unit of impact (relationship continuity, no ramp-up). Consulting projects have defined costs but may require repeated engagements as needs evolve.' },
      { question: 'Can a consultant become fractional?', answer: 'Absolutely. Many fractional relationships start as consulting: you hire someone for a project, they deliver well, and you realise you need ongoing input. Converting from project to retainer is a natural evolution when both parties see value in continuity.' }
    ],
    internal_links: [
      { url: '/fractional-cfo', label: 'Fractional CFO', description: 'Finance leadership' },
      { url: '/fractional-cto', label: 'Fractional CTO', description: 'Tech leadership' },
      { url: '/fractional-jobs-uk', label: 'Fractional Jobs', description: 'Browse opportunities' }
    ],
    external_links: [
      { url: 'https://www.mca.org.uk', label: 'Management Consultancies Association', domain: 'mca.org.uk' }
    ],
    related_pages: ['fractional-cfo', 'fractional-cto', 'fractional-jobs-uk'],
    stats: {}
  },
  {
    slug: 'fractional-vs-interim',
    page_type: 'comparison',
    title: 'Fractional Executive vs Interim | Key Differences Explained',
    meta_description: 'Understand when to hire a fractional executive vs an interim. Learn the key differences in commitment, cost, and use cases to make the right choice.',
    keywords: ['fractional vs interim', 'interim vs fractional', 'fractional executive or interim', 'interim management'],
    canonical_url: 'https://fractional.quest/fractional-vs-interim',
    hero_title: 'Fractional Executive vs Interim',
    hero_subtitle: 'Two flexible models with distinct use cases—here\'s how to choose',
    hero_badge: 'Comparison Guide',
    image_category: 'business',
    accent_color: 'indigo',
    sections: [
      {
        type: 'intro',
        heading: 'Similar But Different',
        content: 'Both fractional and interim executives provide senior leadership without permanent employment—but they serve different needs. Fractional executives work part-time across multiple clients; interim executives work full-time for one client on a temporary basis. The choice depends on your specific situation.'
      },
      {
        type: 'comparison_table',
        heading: 'Side-by-Side Comparison',
        rows: [
          { aspect: 'Time Commitment', fractional: '1-3 days per week', interim: '4-5 days per week' },
          { aspect: 'Exclusivity', fractional: 'Multiple clients simultaneously', interim: 'Single client focus' },
          { aspect: 'Duration', fractional: 'Ongoing (6+ months typical)', interim: 'Fixed term (3-12 months)' },
          { aspect: 'Day Rate', fractional: '£800-1,500', interim: '£700-1,400' },
          { aspect: 'Annual Equivalent', fractional: '£40-150k (part-time)', interim: '£175-350k (full-time)' },
          { aspect: 'Use Case', fractional: 'Steady-state leadership needs', interim: 'Transitions, crises, cover' },
          { aspect: 'Notice Period', fractional: '4-12 weeks typical', interim: '2-4 weeks typical' },
          { aspect: 'Exit Expectation', fractional: 'May continue indefinitely', interim: 'Always time-limited' }
        ]
      },
      {
        type: 'scenarios',
        heading: 'When to Choose Each',
        items: [
          { scenario: 'Choose Fractional When...', items: ['You need ongoing strategic leadership (not full-time)', 'Budget doesn\'t support full-time executive', 'You want multi-industry perspective', 'Needs are steady but not all-consuming', 'You\'re supplementing existing team'] },
          { scenario: 'Choose Interim When...', items: ['Full-time presence is essential', 'You\'re covering a sudden departure', 'Major transformation requires dedicated focus', 'You need someone immediately and intensively', 'The engagement has a clear end date'] }
        ]
      },
      {
        type: 'cost_comparison',
        heading: 'Cost Comparison Example',
        examples: [
          { model: 'Fractional CFO (2 days/week)', dailyRate: '£1,100', daysPerYear: 100, totalCost: '£110,000' },
          { model: 'Interim CFO (5 days/week)', dailyRate: '£950', daysPerYear: 250, totalCost: '£237,500' },
          { model: 'Full-Time CFO (employed)', salary: '£180,000', benefits: '£30,000', totalCost: '£210,000+' }
        ]
      },
      {
        type: 'conversion',
        heading: 'Can You Switch Between Models?',
        content: 'Yes—it\'s common to transition between models as needs change. A business might start with a fractional CFO, escalate to interim during a crisis or transaction, then return to fractional. Or begin with interim cover, then convert to fractional as the permanent hire beds in. Flexibility is a key advantage of non-permanent models.'
      },
      {
        type: 'cta_section',
        heading: 'Need Help Deciding?',
        content: 'We can assess your situation and recommend the right model for your needs.'
      }
    ],
    faqs: [
      { question: 'What if I need full-time but can\'t afford interim rates?', answer: 'Consider a full-time hire with fractional support during onboarding, or a part-time arrangement (employed 3 days/week). Some interims negotiate reduced rates for longer commitments. Discuss your budget openly—creative structures are often possible.' },
      { question: 'Can an interim become fractional (or vice versa)?', answer: 'Yes. Many relationships evolve: an interim completes the crisis phase and continues as fractional; a fractional increases to interim-level commitment for a transaction. Good executives and clients adapt the structure to match current needs.' },
      { question: 'Which provides better value?', answer: 'It depends on your needs. If you need full-time presence, fractional at 2 days/week won\'t suffice regardless of cost. If you need strategic input without daily presence, paying interim rates for 5 days/week wastes money. Match the model to your actual requirements.' }
    ],
    internal_links: [
      { url: '/interim-cfo', label: 'Interim CFO', description: 'Temporary finance leadership' },
      { url: '/fractional-cfo', label: 'Fractional CFO', description: 'Part-time finance leadership' },
      { url: '/fractional-jobs-uk', label: 'Fractional Jobs', description: 'Browse opportunities' }
    ],
    external_links: [
      { url: 'https://www.iim.org.uk', label: 'Institute of Interim Management', domain: 'iim.org.uk' }
    ],
    related_pages: ['interim-cfo', 'fractional-cfo', 'fractional-jobs-uk'],
    stats: {}
  }
];

// ============================================
// Combine and Run
// ============================================

const allPages = [
  ...redirectToPageConversions,
  ...howToBecomePages,
  ...industryPages,
  ...comparisonPages
];

async function createPages() {
  console.log(`Creating ${allPages.length} pages...`);

  for (const page of allPages) {
    try {
      const result = await sql`
        INSERT INTO pages (
          slug, page_type, title, meta_description, keywords, canonical_url,
          hero_title, hero_subtitle, hero_badge, image_category, accent_color,
          job_board_enabled, job_board_department, job_board_title,
          sections, faqs, internal_links, external_links, related_pages, stats, is_published
        ) VALUES (
          ${page.slug}, ${page.page_type}, ${page.title}, ${page.meta_description},
          ${page.keywords || []}, ${page.canonical_url},
          ${page.hero_title}, ${page.hero_subtitle}, ${page.hero_badge},
          ${page.image_category}, ${page.accent_color},
          ${page.job_board_enabled || false}, ${page.job_board_department || null}, ${page.job_board_title || null},
          ${JSON.stringify(page.sections)}::jsonb, ${JSON.stringify(page.faqs || [])}::jsonb,
          ${JSON.stringify(page.internal_links || [])}::jsonb, ${JSON.stringify(page.external_links || [])}::jsonb,
          ${page.related_pages || []}, ${JSON.stringify(page.stats || {})}::jsonb, true
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
      console.log(`✅ ${page.slug} (id: ${result[0].id})`);
    } catch (err) {
      console.error(`❌ ${page.slug}: ${err.message}`);
    }
  }

  console.log(`\n🎉 Complete!`);
}

createPages();
