// SEO Content for Fractional CHRO Jobs UK Page

export const chroJobsUkSEO = {
  meta: {
    title: "Fractional CHRO Jobs UK | Part-Time HR Leadership Roles",
    description:
      "Find fractional CHRO and part-time HR Director jobs across the UK. Day rates £800-£1,200. Scale-ups and enterprises seeking interim people leadership.",
    keywords: [
      "fractional chro jobs uk",
      "fractional chro",
      "part time hr director uk",
      "interim chro jobs",
      "fractional people director",
      "portfolio chro",
      "part time chief people officer",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs" },
    { name: "CHRO Jobs", url: "/fractional-chro-jobs-uk" },
  ],

  hero: {
    headline: "Fractional CHRO Jobs UK",
    subtitle:
      "Part-time HR Leadership and Chief People Officer roles across the United Kingdom",
    stats: {
      avgDayRate: "£800-£1,200",
      hubStatus: "People Leadership",
      hybridOptions: "70% Hybrid",
    },
  },

  content: {
    whyLocation: {
      title: "Why Fractional CHRO Demand is Growing",
      paragraphs: [
        "As companies navigate hybrid work, talent retention, and culture building, experienced HR leadership has become critical. The fractional CHRO model delivers senior people strategy without full-time overhead.",
        "Whether you're a former CHRO seeking portfolio work, an HR Director ready for C-suite challenges, or a people leader looking to share expertise across multiple organisations, the UK fractional CHRO market offers growing opportunities.",
      ],
    },

    dayRates: {
      title: "Fractional CHRO Day Rates by Company Stage",
      description:
        "Day rates vary by company size and HR complexity:",
      rates: [
        { role: "PE-Backed", range: "£1,000 - £1,400/day", typical: "£1,150" },
        { role: "Scale-up (100+)", range: "£850 - £1,200/day", typical: "£1,000" },
        { role: "Growth (50-100)", range: "£750 - £1,100/day", typical: "£900" },
        { role: "SME", range: "£650 - £950/day", typical: "£800" },
        { role: "Non-Profit", range: "£550 - £850/day", typical: "£700" },
      ],
    },

    locations: {
      title: "Key CHRO Sectors",
      areas: [
        {
          name: "Tech & Scale-ups",
          description:
            "High demand for CHROs experienced in rapid hiring, culture scaling, and equity compensation. Remote-first expertise valued.",
        },
        {
          name: "PE-Backed Companies",
          description:
            "People due diligence, leadership assessment, and post-acquisition integration. Executive compensation expertise required.",
        },
        {
          name: "Professional Services",
          description:
            "Partner-track development, retention strategies, and professional development programs. Industry experience often essential.",
        },
      ],
    },

    emergingRoles: {
      title: "Specialist CHRO Roles",
      roles: [
        {
          title: "Culture & Transformation CHRO",
          description:
            "Specialists in culture change, M&A integration, and organisational transformation. Project-based engagements.",
        },
        {
          title: "Talent Acquisition Lead",
          description:
            "Hiring strategy, employer branding, and recruitment process optimization. Critical for high-growth companies.",
        },
        {
          title: "People Analytics Leader",
          description:
            "HR data strategy, workforce planning, and people metrics. Growing demand as HR becomes more data-driven.",
        },
        {
          title: "Employee Experience Director",
          description:
            "Engagement, wellbeing, and hybrid work strategy. Post-pandemic priority for many organisations.",
        },
      ],
    },
  },

  faqs: [
    {
      question: "What qualifications do fractional CHROs need?",
      answer:
        "Most fractional CHRO roles require CIPD Level 7 or equivalent, plus 10-15+ years HR experience with prior CHRO, HRD, or CPO experience. Employment law knowledge, change management credentials, and sector-specific expertise add significant value.",
    },
    {
      question: "How much do fractional CHROs earn in the UK?",
      answer:
        "UK fractional CHROs typically earn £800-£1,200 per day, with PE-backed and large scale-up roles at the premium end. Working 2-3 days per week, annual earnings are competitive with full-time CHRO salaries while offering portfolio variety.",
    },
    {
      question: "What's the typical fractional CHRO engagement?",
      answer:
        "Initial engagements typically run 6-12 months with 2-3 days per week commitment. Transformation projects may need more intensive engagement. Many relationships evolve into ongoing advisory arrangements.",
    },
    {
      question: "Do fractional CHROs work remotely?",
      answer:
        "About 70% of fractional CHRO roles offer hybrid arrangements. People leadership typically requires some on-site presence for team engagement, culture work, and sensitive conversations, though strategic work can often be remote.",
    },
  ],

  schema: {
    organization: {
      "@type": "Organization",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  },
};

export type CHROJobsUkSEOContent = typeof chroJobsUkSEO;
