const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_9mG4aJRxgtpz@ep-wandering-darkness-abiq57ia-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);

// ============================================
// ROLE-SPECIFIC FAQs AND LINKS
// ============================================

const roleFaqs = {
  CFO: [
    { question: 'What qualifications should an interim/part-time CFO have?', answer: 'Most CFOs hold professional qualifications like ACA (ICAEW), ACCA, or CIMA. For interim and part-time roles, look for 15+ years experience, including previous CFO/FD positions. Industry-specific experience (e.g., PE-backed, regulated sectors) adds significant value.' },
    { question: 'How quickly can an interim CFO start?', answer: 'Most interim CFOs can start within 2-4 weeks, with some available immediately. This is much faster than permanent recruitment which typically takes 3-6 months. For urgent situations, interim providers maintain networks of immediately available executives.' },
    { question: 'What\'s the typical day rate for interim/part-time CFO roles?', answer: 'UK interim CFO day rates range from £800-1,500 depending on seniority, sector complexity, and engagement type. Part-time arrangements often convert to annual equivalents of £50-120k for 1-3 days per week.' },
    { question: 'Can an interim CFO help with fundraising?', answer: 'Yes, many interim CFOs specialise in fundraising support including financial modelling, investor deck preparation, data room management, and due diligence. Some work on success-fee arrangements for fundraising projects.' },
    { question: 'What\'s the difference between interim and fractional CFO?', answer: 'Interim CFOs work full-time (4-5 days/week) for a single client on a temporary basis, typically 3-12 months. Fractional CFOs work part-time (1-3 days/week) across multiple clients on an ongoing basis. Choose interim for full-time cover; fractional for strategic support.' }
  ],
  CTO: [
    { question: 'What technical background should an interim/part-time CTO have?', answer: 'Look for CTOs with hands-on engineering experience, architecture expertise, and team leadership track record. For your specific needs, match their technical stack experience (e.g., cloud platforms, languages, frameworks) to your environment.' },
    { question: 'Can an interim CTO help build our engineering team?', answer: 'Yes, interim CTOs frequently help with technical hiring: defining role requirements, sourcing candidates, conducting technical interviews, and onboarding new hires. They bring experience from building multiple teams.' },
    { question: 'What\'s the typical day rate for interim/part-time CTO roles?', answer: 'UK interim CTO day rates range from £900-1,600 depending on seniority, technical specialism, and company stage. Startup CTOs may accept lower rates plus equity; enterprise transformation CTOs command premium rates.' },
    { question: 'How do interim CTOs handle security and IP concerns?', answer: 'Professional interim CTOs sign NDAs and are bound by confidentiality obligations. Reputable practitioners maintain clear information barriers between clients and have professional indemnity insurance. Discuss specific security requirements upfront.' },
    { question: 'What\'s the difference between interim CTO and technical consultant?', answer: 'Interim CTOs take ongoing leadership ownership—they manage teams, make decisions, and are accountable for outcomes. Consultants typically advise on specific projects without direct management responsibility. Choose based on whether you need leadership or advice.' }
  ],
  CMO: [
    { question: 'What experience should an interim/part-time CMO have?', answer: 'Look for CMOs with 10-15+ years marketing experience, previous CMO/Marketing Director roles, and demonstrable business impact (growth metrics, campaign ROI). Industry experience matters—B2B and B2C marketing require different skills.' },
    { question: 'Can an interim CMO manage our marketing agencies?', answer: 'Yes, agency management is a core skill for interim CMOs. They can evaluate existing agency relationships, improve performance, negotiate contracts, and help decide when to bring capabilities in-house.' },
    { question: 'What\'s the typical day rate for interim/part-time CMO roles?', answer: 'UK interim CMO day rates range from £900-1,500 depending on seniority, sector, and scope. Rates are typically higher for B2B technology, financial services, and other complex sectors.' },
    { question: 'How quickly can an interim CMO make an impact?', answer: 'Most interim CMOs deliver visible improvements within 30-60 days: marketing audit, quick wins, team alignment. Strategic impact—like improved pipeline or brand repositioning—typically materialises over 3-6 months.' },
    { question: 'What\'s the difference between interim CMO and marketing consultant?', answer: 'Interim CMOs take ongoing leadership ownership—they manage teams, own strategy, and are accountable for marketing outcomes. Consultants deliver specific projects or advice. Choose interim for embedded leadership; consultant for bounded projects.' }
  ],
  COO: [
    { question: 'What background should an interim/part-time COO have?', answer: 'Look for COOs with broad operational experience: process improvement, team management, scaling operations. Background varies—former consultants, operations specialists, or general managers all make strong COOs. Match their experience to your specific operational challenges.' },
    { question: 'Can an interim COO help with digital transformation?', answer: 'Yes, many interim COOs specialise in transformation: implementing new systems, redesigning processes, and managing change. They bring experience from multiple transformation projects and can accelerate your programme.' },
    { question: 'What\'s the typical day rate for interim/part-time COO roles?', answer: 'UK interim COO day rates range from £800-1,400 depending on seniority, sector, and complexity. Manufacturing and logistics operations may command premium rates due to specialist expertise required.' },
    { question: 'How does an interim COO work with existing teams?', answer: 'Interim COOs typically work collaboratively with existing teams—they\'re not there to replace people but to provide leadership, direction, and capability building. Good interims focus on knowledge transfer and sustainable improvements.' },
    { question: 'What\'s the difference between interim COO and operations consultant?', answer: 'Interim COOs take ongoing operational leadership—they manage teams, make decisions, and own outcomes. Consultants advise on specific operational improvements. Choose interim for hands-on leadership; consultant for analysis and recommendations.' }
  ],
  CHRO: [
    { question: 'What background should an interim/part-time CHRO have?', answer: 'Look for CHROs with senior HR leadership experience, ideally including: organisational design, talent strategy, employment law, and culture transformation. CIPD qualification is common. Match their industry experience to your sector.' },
    { question: 'Can an interim CHRO help with restructuring?', answer: 'Yes, many interim CHROs specialise in organisational change: restructuring, redundancy programmes, TUPE transfers, and culture transformation. They bring experience navigating complex employment law and stakeholder management.' },
    { question: 'What\'s the typical day rate for interim/part-time CHRO roles?', answer: 'UK interim CHRO day rates range from £750-1,300 depending on seniority and specialism. Transformation and M&A specialists command premium rates; generalist HR leadership may be lower.' },
    { question: 'How does an interim CHRO handle sensitive employee matters?', answer: 'Professional interim CHROs maintain strict confidentiality and follow CIPD ethical standards. They bring objectivity to sensitive situations (grievances, disciplinaries, restructuring) while ensuring legal compliance and fair treatment.' },
    { question: 'What\'s the difference between interim CHRO and HR consultant?', answer: 'Interim CHROs take ongoing HR leadership ownership—they manage the HR function, make policy decisions, and are accountable for people outcomes. Consultants typically advise on specific HR projects or policies without leadership accountability.' }
  ],
  CEO: [
    { question: 'When do businesses need an interim CEO?', answer: 'Common scenarios include: founder transition, CEO departure, turnaround situations, M&A integration, or preparing for investment/exit. Interim CEOs provide immediate leadership continuity while permanent solutions are found.' },
    { question: 'What background should an interim CEO have?', answer: 'Look for previous CEO or MD experience, ideally at similar company stage and sector. Track record matters most: demonstrated ability to lead through similar challenges (growth, turnaround, transition) to yours.' },
    { question: 'What\'s the typical day rate for interim CEO roles?', answer: 'UK interim CEO day rates range from £1,200-2,500+ depending on company size, complexity, and situation. Turnaround and PE-backed situations often command premium rates. Some include equity or success fees.' },
    { question: 'How do interim CEOs work with boards?', answer: 'Interim CEOs typically report to the board like a permanent CEO. Clear governance, regular reporting, and defined authority levels should be established upfront. Good interim CEOs bring board experience and can improve governance practices.' },
    { question: 'Can an interim CEO become permanent?', answer: 'Yes, interim-to-permanent transitions happen, though less commonly than other C-suite roles. Discuss this possibility upfront—it affects the search for permanent candidates and the interim\'s positioning with stakeholders.' }
  ],
  CISO: [
    { question: 'What qualifications should an interim/part-time CISO have?', answer: 'Look for CISOs with recognised certifications: CISSP, CISM, or CISA. Experience with relevant frameworks (ISO 27001, NIST, SOC2) matters. For regulated industries, specific compliance experience (FCA, GDPR, PCI-DSS) is essential.' },
    { question: 'Can an interim CISO help achieve ISO 27001 certification?', answer: 'Yes, many interim CISOs specialise in certification projects. They can assess readiness, implement required controls, prepare documentation, and guide you through audit. Typical timeline is 6-12 months for first certification.' },
    { question: 'What\'s the typical day rate for interim/part-time CISO roles?', answer: 'UK interim CISO day rates range from £900-1,500 depending on seniority and specialism. Regulated sectors (financial services, healthcare) and incident response specialists command premium rates.' },
    { question: 'How does an interim CISO handle incident response?', answer: 'Interim CISOs can lead incident response: containment, investigation, remediation, and stakeholder communication. They bring experience from multiple incidents and can improve your overall incident response capability.' },
    { question: 'What\'s the difference between interim CISO and security consultant?', answer: 'Interim CISOs take ongoing security leadership—they own the security programme, manage teams, and are accountable for the security posture. Consultants typically deliver specific assessments or projects without ongoing ownership.' }
  ],
  CPO: [
    { question: 'What background should an interim/part-time CPO have?', answer: 'Look for CPOs with product leadership experience: product strategy, roadmap management, user research, and cross-functional collaboration. Technical background is valuable but not essential—product sense and leadership matter more.' },
    { question: 'Can an interim CPO help define our product strategy?', answer: 'Yes, this is a core skill for interim CPOs. They can assess your current product, understand market opportunities, define strategy, and create actionable roadmaps. Most deliver strategic clarity within 60-90 days.' },
    { question: 'What\'s the typical day rate for interim/part-time CPO roles?', answer: 'UK interim CPO day rates range from £900-1,400 depending on seniority and company stage. B2B SaaS and platform businesses often pay premium rates for relevant product experience.' },
    { question: 'How does an interim CPO work with engineering teams?', answer: 'Interim CPOs typically work closely with engineering: defining requirements, prioritising backlogs, and ensuring product-engineering alignment. Good CPOs build strong working relationships without micromanaging technical decisions.' },
    { question: 'What\'s the difference between interim CPO and product consultant?', answer: 'Interim CPOs take ongoing product leadership—they own the roadmap, manage product teams, and are accountable for product outcomes. Consultants advise on specific product challenges without leadership accountability.' }
  ]
};

const roleExternalLinks = {
  CFO: [
    { url: 'https://www.icaew.com', label: 'ICAEW', domain: 'icaew.com' },
    { url: 'https://www.accaglobal.com', label: 'ACCA', domain: 'accaglobal.com' },
    { url: 'https://www.cimaglobal.com', label: 'CIMA', domain: 'cimaglobal.com' }
  ],
  CTO: [
    { url: 'https://www.bcs.org', label: 'BCS', domain: 'bcs.org' },
    { url: 'https://technation.io', label: 'Tech Nation', domain: 'technation.io' },
    { url: 'https://www.theiet.org', label: 'IET', domain: 'theiet.org' }
  ],
  CMO: [
    { url: 'https://www.cim.co.uk', label: 'Chartered Institute of Marketing', domain: 'cim.co.uk' },
    { url: 'https://dma.org.uk', label: 'Data & Marketing Association', domain: 'dma.org.uk' },
    { url: 'https://www.marketingweek.com', label: 'Marketing Week', domain: 'marketingweek.com' }
  ],
  COO: [
    { url: 'https://www.managers.org.uk', label: 'Chartered Management Institute', domain: 'managers.org.uk' },
    { url: 'https://www.iod.com', label: 'Institute of Directors', domain: 'iod.com' },
    { url: 'https://www.cips.org', label: 'CIPS', domain: 'cips.org' }
  ],
  CHRO: [
    { url: 'https://www.cipd.org', label: 'CIPD', domain: 'cipd.org' },
    { url: 'https://www.acas.org.uk', label: 'ACAS', domain: 'acas.org.uk' },
    { url: 'https://www.gov.uk/browse/employing-people', label: 'Gov.uk Employment', domain: 'gov.uk' }
  ],
  CEO: [
    { url: 'https://www.iod.com', label: 'Institute of Directors', domain: 'iod.com' },
    { url: 'https://www.managers.org.uk', label: 'Chartered Management Institute', domain: 'managers.org.uk' },
    { url: 'https://www.british-business-bank.co.uk', label: 'British Business Bank', domain: 'british-business-bank.co.uk' }
  ],
  CISO: [
    { url: 'https://www.ncsc.gov.uk', label: 'National Cyber Security Centre', domain: 'ncsc.gov.uk' },
    { url: 'https://www.isc2.org', label: 'ISC2', domain: 'isc2.org' },
    { url: 'https://www.isaca.org', label: 'ISACA', domain: 'isaca.org' }
  ],
  CPO: [
    { url: 'https://www.productschool.com', label: 'Product School', domain: 'productschool.com' },
    { url: 'https://www.mindtheproduct.com', label: 'Mind the Product', domain: 'mindtheproduct.com' },
    { url: 'https://www.svpg.com', label: 'SVPG', domain: 'svpg.com' }
  ]
};

// ============================================
// LOCATION-SPECIFIC FAQs AND LINKS
// ============================================

const locationFaqs = [
  { question: 'What types of fractional roles are available in this location?', answer: 'We list fractional CFO, CTO, CMO, COO, CHRO, CISO, and CPO roles across the UK. Most fractional executives work hybrid—combining on-site days with remote work—making location more flexible than traditional full-time roles.' },
  { question: 'Can fractional executives work remotely from other locations?', answer: 'Yes, many fractional engagements are hybrid or fully remote. Most executives are happy to travel for key meetings (board meetings, team sessions) while working remotely for other tasks. Discuss location requirements with each candidate.' },
  { question: 'What day rates should I expect for fractional executives in this area?', answer: 'Day rates in regional UK cities are typically 10-20% lower than London. However, many executives serving regional businesses are London-based and charge London rates. Rates range from £700-1,500/day depending on role and seniority.' },
  { question: 'Are there enough fractional executives available locally?', answer: 'The fractional executive market has grown significantly. While London has the largest concentration, experienced fractional executives serve businesses nationwide—often working with clients across multiple regions.' },
  { question: 'How do I find fractional executives based in my area?', answer: 'Use our search filters to find executives by location. You can also search for executives willing to travel to your location or work remotely. Many businesses successfully work with fractional executives based elsewhere through hybrid arrangements.' }
];

const locationExternalLinks = {
  default: [
    { url: 'https://www.fsb.org.uk', label: 'Federation of Small Businesses', domain: 'fsb.org.uk' },
    { url: 'https://www.gov.uk/business', label: 'Gov.uk Business', domain: 'gov.uk' },
    { url: 'https://www.britishchambers.org.uk', label: 'British Chambers of Commerce', domain: 'britishchambers.org.uk' }
  ],
  manchester: [
    { url: 'https://www.greatermanchester-ca.gov.uk', label: 'Greater Manchester Combined Authority', domain: 'greatermanchester-ca.gov.uk' },
    { url: 'https://www.manchesterdigital.com', label: 'Manchester Digital', domain: 'manchesterdigital.com' },
    { url: 'https://www.businessgrowthhub.com', label: 'Business Growth Hub', domain: 'businessgrowthhub.com' }
  ],
  birmingham: [
    { url: 'https://www.wmca.org.uk', label: 'West Midlands Combined Authority', domain: 'wmca.org.uk' },
    { url: 'https://www.greaterbirminghamchambers.com', label: 'Greater Birmingham Chambers', domain: 'greaterbirminghamchambers.com' },
    { url: 'https://www.birmingham.gov.uk/business', label: 'Birmingham Business', domain: 'birmingham.gov.uk' }
  ],
  edinburgh: [
    { url: 'https://www.scottish-enterprise.com', label: 'Scottish Enterprise', domain: 'scottish-enterprise.com' },
    { url: 'https://www.investinedinburgh.com', label: 'Invest in Edinburgh', domain: 'investinedinburgh.com' },
    { url: 'https://www.edinburghchamber.co.uk', label: 'Edinburgh Chamber of Commerce', domain: 'edinburghchamber.co.uk' }
  ],
  leeds: [
    { url: 'https://www.westyorks-ca.gov.uk', label: 'West Yorkshire Combined Authority', domain: 'westyorks-ca.gov.uk' },
    { url: 'https://www.leedscityregion.gov.uk', label: 'Leeds City Region', domain: 'leedscityregion.gov.uk' },
    { url: 'https://www.leedschamber.co.uk', label: 'Leeds Chamber', domain: 'leedschamber.co.uk' }
  ],
  bristol: [
    { url: 'https://www.westofengland-ca.gov.uk', label: 'West of England Combined Authority', domain: 'westofengland-ca.gov.uk' },
    { url: 'https://www.bristolchamber.co.uk', label: 'Bristol Chamber', domain: 'bristolchamber.co.uk' },
    { url: 'https://www.techspark.co', label: 'TechSpark Bristol', domain: 'techspark.co' }
  ],
  glasgow: [
    { url: 'https://www.scottish-enterprise.com', label: 'Scottish Enterprise', domain: 'scottish-enterprise.com' },
    { url: 'https://www.glasgowchamberofcommerce.com', label: 'Glasgow Chamber', domain: 'glasgowchamberofcommerce.com' },
    { url: 'https://www.investglasgow.com', label: 'Invest Glasgow', domain: 'investglasgow.com' }
  ],
  liverpool: [
    { url: 'https://www.liverpoolcityregion-ca.gov.uk', label: 'Liverpool City Region', domain: 'liverpoolcityregion-ca.gov.uk' },
    { url: 'https://www.downtownliverpool.com', label: 'Downtown Liverpool', domain: 'downtownliverpool.com' },
    { url: 'https://www.liverpoollep.org', label: 'Liverpool LEP', domain: 'liverpoollep.org' }
  ],
  cardiff: [
    { url: 'https://www.cardiffcapitalregion.wales', label: 'Cardiff Capital Region', domain: 'cardiffcapitalregion.wales' },
    { url: 'https://www.southwaleschamber.co.uk', label: 'South Wales Chamber', domain: 'southwaleschamber.co.uk' },
    { url: 'https://businesswales.gov.wales', label: 'Business Wales', domain: 'businesswales.gov.wales' }
  ],
  belfast: [
    { url: 'https://www.investni.com', label: 'Invest NI', domain: 'investni.com' },
    { url: 'https://www.belfastchamber.com', label: 'Belfast Chamber', domain: 'belfastchamber.com' },
    { url: 'https://www.nibusinessinfo.co.uk', label: 'NI Business Info', domain: 'nibusinessinfo.co.uk' }
  ]
};

// ============================================
// ENHANCEMENT FUNCTIONS
// ============================================

async function enhanceInterimPages() {
  console.log('\n📋 Enhancing Interim Jobs Pages...');

  const interimPages = [
    { slug: 'interim-cto-jobs-uk', role: 'CTO' },
    { slug: 'interim-cmo-jobs-uk', role: 'CMO' },
    { slug: 'interim-coo-jobs-uk', role: 'COO' },
    { slug: 'interim-chro-jobs-uk', role: 'CHRO' },
    { slug: 'interim-ceo-jobs-uk', role: 'CEO' },
    { slug: 'interim-cpo-jobs-uk', role: 'CPO' },
    { slug: 'interim-ciso-jobs-uk', role: 'CISO' }
  ];

  for (const page of interimPages) {
    const faqs = roleFaqs[page.role] || roleFaqs.CFO;
    const links = roleExternalLinks[page.role] || roleExternalLinks.CFO;

    try {
      await sql`
        UPDATE pages
        SET
          faqs = ${JSON.stringify(faqs)}::jsonb,
          external_links = ${JSON.stringify(links)}::jsonb,
          updated_at = NOW()
        WHERE slug = ${page.slug}
      `;
      console.log(`  ✅ ${page.slug}`);
    } catch (err) {
      console.log(`  ❌ ${page.slug}: ${err.message}`);
    }
  }
}

async function enhancePartTimePages() {
  console.log('\n📋 Enhancing Part-Time Jobs Pages...');

  const partTimePages = [
    { slug: 'part-time-cfo-jobs-uk', role: 'CFO' },
    { slug: 'part-time-cto-jobs-uk', role: 'CTO' },
    { slug: 'part-time-cmo-jobs-uk', role: 'CMO' },
    { slug: 'part-time-coo-jobs-uk', role: 'COO' },
    { slug: 'part-time-chro-jobs-uk', role: 'CHRO' },
    { slug: 'part-time-ceo-jobs-uk', role: 'CEO' },
    { slug: 'part-time-cpo-jobs-uk', role: 'CPO' },
    { slug: 'part-time-ciso-jobs-uk', role: 'CISO' }
  ];

  for (const page of partTimePages) {
    const faqs = roleFaqs[page.role] || roleFaqs.CFO;
    const links = roleExternalLinks[page.role] || roleExternalLinks.CFO;

    try {
      await sql`
        UPDATE pages
        SET
          faqs = ${JSON.stringify(faqs)}::jsonb,
          external_links = ${JSON.stringify(links)}::jsonb,
          updated_at = NOW()
        WHERE slug = ${page.slug}
      `;
      console.log(`  ✅ ${page.slug}`);
    } catch (err) {
      console.log(`  ❌ ${page.slug}: ${err.message}`);
    }
  }
}

async function enhanceLocationPages() {
  console.log('\n📋 Enhancing Location Pages...');

  const locationPages = [
    'fractional-jobs-manchester', 'fractional-jobs-birmingham', 'fractional-jobs-edinburgh',
    'fractional-jobs-leeds', 'fractional-jobs-bristol', 'fractional-jobs-glasgow',
    'fractional-jobs-liverpool', 'fractional-jobs-cardiff', 'fractional-jobs-belfast',
    'fractional-jobs-newcastle', 'fractional-jobs-sheffield', 'fractional-jobs-nottingham',
    'fractional-jobs-leicester', 'fractional-jobs-coventry', 'fractional-jobs-southampton',
    'fractional-jobs-brighton', 'fractional-jobs-reading', 'fractional-jobs-oxford',
    'fractional-jobs-york', 'fractional-jobs-aberdeen', 'fractional-jobs-dundee',
    'fractional-jobs-swansea', 'fractional-jobs-exeter', 'fractional-jobs-norwich',
    'fractional-jobs-milton-keynes'
  ];

  for (const slug of locationPages) {
    // Extract city name from slug
    const cityKey = slug.replace('fractional-jobs-', '').toLowerCase();
    const links = locationExternalLinks[cityKey] || locationExternalLinks.default;

    try {
      await sql`
        UPDATE pages
        SET
          faqs = ${JSON.stringify(locationFaqs)}::jsonb,
          external_links = ${JSON.stringify(links)}::jsonb,
          updated_at = NOW()
        WHERE slug = ${slug}
      `;
      console.log(`  ✅ ${slug}`);
    } catch (err) {
      console.log(`  ❌ ${slug}: ${err.message}`);
    }
  }
}

async function enhanceServicesPages() {
  console.log('\n📋 Enhancing Services Pages...');

  const servicesPages = [
    { slug: 'fractional-ceo-services', role: 'CEO' },
    { slug: 'fractional-chro-services', role: 'CHRO' },
    { slug: 'fractional-cpo-services', role: 'CPO' },
    { slug: 'fractional-ciso-services', role: 'CISO' },
    { slug: 'fractional-cto-services', role: 'CTO' },
    { slug: 'fractional-coo-services', role: 'COO' }
  ];

  const servicesFaqs = {
    CEO: [
      { question: 'What does a fractional CEO service include?', answer: 'Fractional CEO services typically include: strategic leadership and vision-setting, board management and governance, investor relations, team leadership and executive development, key stakeholder management, and strategic decision-making on critical issues.' },
      { question: 'When do businesses need fractional CEO services?', answer: 'Common scenarios: founder stepping back, CEO transition, growth phase requiring experienced leadership, turnaround situations, or preparing for investment/exit. Fractional CEOs provide senior leadership without full-time commitment.' },
      { question: 'How is a fractional CEO different from a business consultant?', answer: 'Fractional CEOs take ongoing leadership ownership—they make decisions, lead teams, and are accountable for results. Consultants advise but don\'t have executive authority. Fractional CEOs are embedded in the business; consultants remain external.' }
    ],
    CHRO: [
      { question: 'What does a fractional CHRO service include?', answer: 'Fractional CHRO services typically include: HR strategy development, organisational design, talent acquisition strategy, performance management systems, culture development, employment law compliance, and HR team leadership.' },
      { question: 'When do businesses need fractional CHRO services?', answer: 'Common triggers: rapid growth straining people processes, organisational change or restructuring, need for professional HR leadership without full-time cost, or specific projects like M&A integration or international expansion.' },
      { question: 'How do fractional CHROs handle sensitive employee issues?', answer: 'Professional fractional CHROs maintain strict confidentiality and follow CIPD ethical standards. They bring objectivity to sensitive situations while ensuring legal compliance and fair treatment. Clear boundaries and governance are established upfront.' }
    ],
    CPO: [
      { question: 'What does a fractional CPO service include?', answer: 'Fractional CPO services typically include: product strategy development, roadmap prioritisation, product team leadership, user research oversight, cross-functional alignment (product-engineering-design), and product metrics and analytics.' },
      { question: 'When do businesses need fractional CPO services?', answer: 'Common scenarios: product-market fit challenges, scaling product teams, launching new product lines, improving product processes, or bridging the gap before hiring a full-time CPO.' },
      { question: 'How do fractional CPOs work with engineering teams?', answer: 'Fractional CPOs work closely with engineering on prioritisation, requirements, and delivery. They ensure product-engineering alignment without micromanaging technical decisions. Good CPOs build collaborative relationships that improve velocity and outcomes.' }
    ],
    CISO: [
      { question: 'What does a fractional CISO service include?', answer: 'Fractional CISO services typically include: security strategy, risk assessment, compliance management (ISO 27001, SOC2, GDPR), security policy development, incident response planning, vendor security assessment, and security awareness training.' },
      { question: 'When do businesses need fractional CISO services?', answer: 'Common triggers: compliance requirements (customer demands, regulations), security incidents, preparing for audits or certifications, scaling without full-time security leadership, or improving overall security posture.' },
      { question: 'Can a fractional CISO achieve ISO 27001 certification?', answer: 'Yes, fractional CISOs frequently lead certification projects. They assess readiness, implement controls, prepare documentation, and guide you through audit. Typical timeline is 6-12 months depending on current maturity.' }
    ],
    CTO: [
      { question: 'What does a fractional CTO service include?', answer: 'Fractional CTO services typically include: technology strategy, architecture decisions, engineering team leadership, technical hiring, vendor management, security oversight, and technology roadmap development.' },
      { question: 'When do businesses need fractional CTO services?', answer: 'Common scenarios: building first product, scaling engineering team, technology transformation, CTO departure coverage, or startups needing senior tech leadership without full-time cost.' },
      { question: 'How do fractional CTOs transfer knowledge?', answer: 'Good fractional CTOs focus on building sustainable capability: documenting decisions, mentoring team members, establishing processes, and ensuring the team can continue without them. Knowledge transfer is a core deliverable.' }
    ],
    COO: [
      { question: 'What does a fractional COO service include?', answer: 'Fractional COO services typically include: operational strategy, process optimisation, team management and development, cross-functional coordination, scaling operations, KPI development, and operational risk management.' },
      { question: 'When do businesses need fractional COO services?', answer: 'Common scenarios: rapid growth straining operations, operational inefficiencies, need for professional operations leadership, CEO wants to focus externally, or preparing for scale.' },
      { question: 'How do fractional COOs improve efficiency?', answer: 'Fractional COOs bring experience from multiple businesses—they\'ve seen what works. They assess current operations, identify bottlenecks, implement improvements, and establish metrics. Most deliver visible efficiency gains within 90 days.' }
    ]
  };

  for (const page of servicesPages) {
    const faqs = servicesFaqs[page.role] || [];
    const links = roleExternalLinks[page.role] || roleExternalLinks.CFO;

    try {
      await sql`
        UPDATE pages
        SET
          faqs = ${JSON.stringify(faqs)}::jsonb,
          external_links = ${JSON.stringify(links)}::jsonb,
          updated_at = NOW()
        WHERE slug = ${page.slug}
      `;
      console.log(`  ✅ ${page.slug}`);
    } catch (err) {
      console.log(`  ❌ ${page.slug}: ${err.message}`);
    }
  }
}

async function enhanceSpecialistPages() {
  console.log('\n📋 Enhancing Specialist Pages...');

  const specialistFaqs = [
    { question: 'What makes a specialist fractional executive different?', answer: 'Specialist fractional executives combine senior leadership capability with deep domain expertise. They\'ve typically spent years in a specific area (e.g., fintech, DevOps, PE-backed companies) and bring pattern recognition that generalists lack.' },
    { question: 'When should I hire a specialist vs generalist?', answer: 'Choose specialists when your challenge is domain-specific: regulated industries, technical niches, or specific transaction types. Choose generalists for broad operational leadership. Many businesses start with generalists and add specialists for specific needs.' },
    { question: 'Are specialist fractional executives more expensive?', answer: 'Typically yes—specialist expertise commands premium rates. However, specialists often deliver faster results in their domain, potentially reducing total engagement time. The ROI can be higher despite higher day rates.' },
    { question: 'How do I verify specialist expertise?', answer: 'Ask for specific case studies in their claimed specialism. Check references from similar companies. Look for relevant certifications or industry recognition. True specialists can discuss nuances of their domain in depth.' },
    { question: 'Can specialists work alongside generalist executives?', answer: 'Yes—this is common. A generalist Fractional CFO might engage a specialist for M&A due diligence or tax structuring. Specialists add depth in specific areas without replacing broad leadership.' }
  ];

  const specialistLinks = [
    { url: 'https://www.iod.com', label: 'Institute of Directors', domain: 'iod.com' },
    { url: 'https://www.managers.org.uk', label: 'CMI', domain: 'managers.org.uk' },
    { url: 'https://www.gov.uk/business', label: 'Gov.uk Business', domain: 'gov.uk' }
  ];

  // Get all specialist pages that need enhancement
  const specialistPages = await sql`
    SELECT slug FROM pages
    WHERE page_type = 'specialist'
    AND is_published = true
    AND (jsonb_array_length(COALESCE(faqs, '[]'::jsonb)) = 0
         OR jsonb_array_length(COALESCE(external_links, '[]'::jsonb)) = 0)
  `;

  for (const page of specialistPages) {
    try {
      await sql`
        UPDATE pages
        SET
          faqs = ${JSON.stringify(specialistFaqs)}::jsonb,
          external_links = ${JSON.stringify(specialistLinks)}::jsonb,
          updated_at = NOW()
        WHERE slug = ${page.slug}
      `;
      console.log(`  ✅ ${page.slug}`);
    } catch (err) {
      console.log(`  ❌ ${page.slug}: ${err.message}`);
    }
  }
}

// ============================================
// MAIN EXECUTION
// ============================================

async function main() {
  console.log('🚀 Starting thin page enhancement...\n');

  await enhanceInterimPages();
  await enhancePartTimePages();
  await enhanceLocationPages();
  await enhanceServicesPages();
  await enhanceSpecialistPages();

  // Get final counts
  const stats = await sql`
    SELECT
      COUNT(*) FILTER (WHERE jsonb_array_length(COALESCE(faqs, '[]'::jsonb)) > 0) as with_faqs,
      COUNT(*) FILTER (WHERE jsonb_array_length(COALESCE(external_links, '[]'::jsonb)) > 0) as with_links,
      COUNT(*) as total
    FROM pages
    WHERE is_published = true
  `;

  console.log('\n📊 Final Statistics:');
  console.log(`  Pages with FAQs: ${stats[0].with_faqs}/${stats[0].total}`);
  console.log(`  Pages with External Links: ${stats[0].with_links}/${stats[0].total}`);
  console.log('\n🎉 Enhancement complete!');
}

main().catch(console.error);
