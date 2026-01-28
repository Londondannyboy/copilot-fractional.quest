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
    subtitle: "Part-time Finance Director roles across the UK. Day rates £700-£1,100.",
    stats: {
      avgDayRate: "£700-£1,100",
      hubStatus: "High Demand",
      hybridOptions: "55% Hybrid",
    },
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
  },

  faqs: [
    {
      question: "What's the difference between a Finance Director and CFO?",
      answer: "A Finance Director (FD) typically focuses on operational finance: management accounts, financial controls, compliance. A CFO has a more strategic focus: fundraising, investor relations, M&A. In the UK, FD is more common for SMEs.",
    },
    {
      question: "How much do fractional Finance Directors earn?",
      answer: "UK fractional FDs typically earn £700-£1,100 per day. Working 2-3 days per week, annual earnings of £140,000-£220,000 are achievable.",
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
