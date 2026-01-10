// SEO Content for Fractional COO Jobs UK Page

export const cooJobsUkSEO = {
  meta: {
    title: "Fractional COO Jobs UK | Part-Time Operations Leadership Roles",
    description:
      "Find fractional COO and part-time operations director jobs across the UK. Day rates £900-£1,300. Scale-ups and SMEs seeking interim operations leadership.",
    keywords: [
      "fractional coo jobs uk",
      "fractional coo",
      "part time coo uk",
      "interim coo jobs",
      "fractional operations director",
      "portfolio coo",
      "part time operations director",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs" },
    { name: "COO Jobs", url: "/fractional-coo-jobs-uk" },
  ],

  hero: {
    headline: "Fractional COO Jobs UK",
    subtitle:
      "Part-time Operations Leadership and COO roles across the United Kingdom",
    stats: {
      avgDayRate: "£900-£1,300",
      hubStatus: "Operations Roles",
      hybridOptions: "65% Hybrid",
    },
  },

  content: {
    whyLocation: {
      title: "Why Fractional COO Demand is Rising",
      paragraphs: [
        "As companies scale, operational complexity grows faster than many founders can manage. The fractional COO model delivers experienced operational leadership - process optimization, team scaling, and systems implementation - without full-time overhead.",
        "Whether you're a former COO seeking portfolio work, an Operations Director ready for broader challenges, or a general manager looking to share your scaling expertise, the UK fractional COO market offers exceptional opportunities.",
      ],
    },

    dayRates: {
      title: "Fractional COO Day Rates by Company Type",
      description:
        "Day rates vary by company size and operational complexity:",
      rates: [
        { role: "PE-Backed", range: "£1,100 - £1,500/day", typical: "£1,300" },
        { role: "Scale-up (50-200)", range: "£900 - £1,300/day", typical: "£1,100" },
        { role: "Growth (20-50)", range: "£850 - £1,200/day", typical: "£1,000" },
        { role: "SME", range: "£750 - £1,100/day", typical: "£900" },
        { role: "Non-Profit", range: "£600 - £950/day", typical: "£800" },
      ],
    },

    locations: {
      title: "Key COO Sectors",
      areas: [
        {
          name: "Tech Scale-ups",
          description:
            "High demand for COOs who can scale operations alongside rapid growth. Process implementation, team structure, and operational efficiency focus.",
        },
        {
          name: "PE-Backed Companies",
          description:
            "Operations leadership for value creation plans. Margin improvement, integration management, and operational due diligence.",
        },
        {
          name: "Professional Services",
          description:
            "Delivery excellence, resource planning, and service operations. Often combined with client success responsibilities.",
        },
      ],
    },

    emergingRoles: {
      title: "Specialist COO Roles",
      roles: [
        {
          title: "Integrator/EOS COO",
          description:
            "EOS-trained operators who implement the Entrepreneurial Operating System. Popular with founder-led businesses.",
        },
        {
          title: "Scale-up COO",
          description:
            "Specialists in the 20-200 employee journey. Process creation, team structure, and operational playbooks.",
        },
        {
          title: "Turnaround COO",
          description:
            "Operational restructuring, cost optimization, and efficiency drives. Intensive project-based engagements.",
        },
        {
          title: "Chief of Staff",
          description:
            "CEO support, cross-functional coordination, and strategic project execution. Often evolves from COO needs.",
        },
      ],
    },
  },

  faqs: [
    {
      question: "What qualifications do fractional COOs need?",
      answer:
        "Most fractional COO roles require 10-15+ years of operations experience with prior COO, VP Operations, or Operations Director experience. Proven track record of scaling operations, building teams, and implementing systems is essential. EOS/Integrator certification is increasingly valued.",
    },
    {
      question: "How much do fractional COOs earn in the UK?",
      answer:
        "UK fractional COOs typically earn £900-£1,300 per day, with PE-backed and scale-up roles at the premium end. Working 2-3 days per week across multiple clients, annual earnings are competitive with full-time COO salaries while offering greater variety.",
    },
    {
      question: "What's the typical fractional COO engagement?",
      answer:
        "Initial engagements typically run 6-12 months with 2-3 days per week commitment. Scale-ups often need more intensive engagement during growth phases or system implementations. Many relationships become long-term operational partnerships.",
    },
    {
      question: "Do fractional COOs work remotely?",
      answer:
        "About 65% of fractional COO roles offer hybrid arrangements. Operations leadership typically requires more on-site presence than other C-suite roles for team management, process observation, and hands-on implementation.",
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

export type COOJobsUkSEOContent = typeof cooJobsUkSEO;
