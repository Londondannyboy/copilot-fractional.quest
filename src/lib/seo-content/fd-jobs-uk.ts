// SEO Content for Fractional Finance Director Jobs UK Page

export const fdJobsUkSEO = {
  meta: {
    title: "Fractional Finance Director Jobs UK | Part-Time FD Roles",
    description:
      "Fractional Finance Director jobs UK. Part-time FD roles paying £700-£1,100/day for SMEs, scale-ups and PE-backed companies.",
    keywords: [
      "fractional finance director jobs uk",
      "fractional fd",
      "part time finance director uk",
      "interim finance director jobs",
      "portfolio finance director",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs-uk" },
    { name: "Finance Director Jobs", url: "/fractional-finance-director-jobs-uk" },
  ],

  hero: {
    headline: "Fractional Finance Director Jobs UK",
    subtitle: "Part-time Finance Director roles across the UK. Day rates £500-£1,200.",
    stats: {
      avgDayRate: "£500-£1,200",
      hubStatus: "High Demand",
      hybridOptions: "55% Hybrid",
    },
  },

  // Definition box for AI Overview optimization
  definitionBox: {
    term: "Fractional Finance Director Jobs UK",
    definition: "Fractional Finance Director jobs are part-time FD roles where experienced finance professionals work 1-3 days per week for UK companies. Day rates range from £500-£1,200 depending on company size. Fractional FDs provide financial management, reporting, and controls without the £85,000-£140,000+ cost of a full-time hire.",
  },

  authorityLinks: [
    { name: "ICAEW", url: "https://www.icaew.com", context: "Chartered accountants" },
    { name: "ACCA", url: "https://www.accaglobal.com", context: "Global accounting body" },
    { name: "CIMA", url: "https://www.cimaglobal.com", context: "Management accountants" },
  ],

  statistics: {
    marketGrowth: { value: "180%", description: "Growth in fractional FD demand since 2020", source: "ICAEW" },
    averageDayRate: { value: "£900", description: "Average day rate for fractional FDs", source: "Market Analysis" },
  },

  content: {
    whyLocation: {
      title: "Finance Director Leadership: The UK Market",
      paragraphs: [
        "The <strong>fractional Finance Director</strong> is the most in-demand part-time finance role in the UK. Unlike CFOs who focus on strategic and investor-facing activities, FDs typically handle operational finance, management accounts, and financial controls.",
        "According to ICAEW research, over 72% of UK SMEs need Finance Director-level expertise but cannot justify full-time salaries. The <strong>fractional FD</strong> model provides professional finance leadership at a fraction of the cost.",
      ],
    },
    dayRates: {
      title: "Day Rates by Company Size",
      description: "Day rates vary by company complexity:",
      rates: [
        { role: "PE-Backed", range: "£900 - £1,300/day", typical: "£1,100", annual: "£180-260k" },
        { role: "Scale-Up", range: "£800 - £1,200/day", typical: "£1,000", annual: "£160-240k" },
        { role: "SME", range: "£700 - £1,000/day", typical: "£850", annual: "£140-200k" },
      ],
    },
    locations: {
      title: "Key Sectors for Finance Directors",
      areas: [
        { name: "Professional Services", description: "Law firms, accountancy practices needing financial management.", sectors: ["Legal", "Accounting", "Consulting"] },
        { name: "E-commerce & Retail", description: "Online retailers requiring cash flow and inventory finance.", sectors: ["E-commerce", "D2C", "Retail"] },
        { name: "Manufacturing", description: "Manufacturers needing working capital management.", sectors: ["Manufacturing", "Distribution", "Engineering"] },
        { name: "Technology", description: "Tech companies needing SaaS metrics and investor reporting.", sectors: ["SaaS", "Software", "Tech Services"] },
      ],
    },
    emergingRoles: {
      title: "Specialist Finance Director Roles",
      roles: [
        { title: "Group FD", description: "Managing finances across multiple entities.", rate: "£900-£1,200/day" },
        { title: "Turnaround FD", description: "Restructuring and cash crisis management.", rate: "£850-£1,100/day" },
        { title: "M&A FD", description: "Due diligence and post-acquisition integration.", rate: "£950-£1,300/day" },
        { title: "Systems FD", description: "ERP implementation and finance transformation.", rate: "£800-£1,100/day" },
      ],
    },
  },

  faqs: [
    {
      question: "How much does a fractional Finance Director cost in the UK?",
      answer: "A fractional Finance Director in the UK typically costs £2,000-£4,800 per month or £500-£1,200 per day, depending on company size and complexity. SME fractional FDs charge £500-£800/day, scale-up fractional FDs charge £800-£1,000/day, and PE-backed fractional FDs charge £1,000-£1,200/day. This represents 40-60% savings compared to a full-time FD hire (£85,000-£140,000+ annually).",
    },
    {
      question: "What's the difference between a Finance Director and CFO?",
      answer: "A Finance Director (FD) typically focuses on operational finance: management accounts, financial controls, compliance. A CFO has a more strategic focus: fundraising, investor relations, M&A. In the UK, FD is more common for SMEs.",
    },
    {
      question: "How much do fractional Finance Directors earn?",
      answer: "UK fractional FDs typically earn £500-£1,200 per day, with PE-backed roles at the premium end. Working 2-3 days per week, annual earnings of £100,000-£240,000 are achievable.",
    },
  ],

  relatedPages: [
    { name: "UK Fractional Jobs", url: "/fractional-jobs-uk" },
    { name: "Fractional CFO Jobs UK", url: "/fractional-cfo-jobs-uk" },
    { name: "Rate Calculator", url: "/rate-calculator" },
  ],

  schema: {
    organization: { "@type": "Organization", name: "Fractional Quest", url: "https://fractional.quest" },
  },
};

export type FDJobsUkSEOContent = typeof fdJobsUkSEO;
