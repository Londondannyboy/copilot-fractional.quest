// SEO Content for Fractional CPO Jobs UK Page

export const cpoJobsUkSEO = {
  meta: {
    title: "Fractional CPO Jobs UK | Part-Time Product Leadership Roles",
    description:
      "Find fractional CPO and part-time product leadership jobs across the UK. Day rates £900-£1,300. Tech companies seeking interim product leadership.",
    keywords: [
      "fractional cpo jobs uk",
      "fractional cpo",
      "part time cpo uk",
      "interim cpo jobs",
      "fractional product officer",
      "portfolio cpo",
      "part time product director",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs" },
    { name: "CPO Jobs", url: "/fractional-cpo-jobs-uk" },
  ],

  hero: {
    headline: "Fractional CPO Jobs UK",
    subtitle:
      "Part-time Product Leadership and CPO roles across the United Kingdom",
    stats: {
      avgDayRate: "£900-£1,300",
      hubStatus: "Product Leadership",
      hybridOptions: "80% Hybrid",
    },
  },

  content: {
    whyLocation: {
      title: "Why Fractional CPO Demand is Growing",
      paragraphs: [
        "Tech companies increasingly need senior product leadership to drive roadmap strategy, user research, and product-market fit. The fractional CPO model delivers experienced product expertise without full-time overhead.",
        "Whether you're a former CPO seeking portfolio work, a VP Product ready for broader challenges, or a product leader looking to mentor multiple teams, the UK fractional CPO market offers compelling opportunities.",
      ],
    },

    dayRates: {
      title: "Fractional CPO Day Rates by Company Stage",
      description:
        "Day rates vary by company stage and product complexity:",
      rates: [
        { role: "Series B+", range: "£1,100 - £1,500/day", typical: "£1,300" },
        { role: "Series A", range: "£900 - £1,300/day", typical: "£1,100" },
        { role: "Seed Stage", range: "£800 - £1,100/day", typical: "£950" },
        { role: "Enterprise", range: "£950 - £1,300/day", typical: "£1,150" },
        { role: "Agency/Consultancy", range: "£750 - £1,100/day", typical: "£900" },
      ],
    },

    locations: {
      title: "Key CPO Sectors",
      areas: [
        {
          name: "B2B SaaS",
          description:
            "High demand for CPOs with enterprise product experience, PLG expertise, and multi-product portfolio management skills.",
        },
        {
          name: "Fintech",
          description:
            "Product leaders who understand regulated environments, complex user journeys, and financial product development.",
        },
        {
          name: "Marketplace & Platform",
          description:
            "Two-sided marketplace expertise, network effects understanding, and platform strategy experience.",
        },
      ],
    },

    emergingRoles: {
      title: "Specialist CPO Roles",
      roles: [
        {
          title: "0-1 Product Lead",
          description:
            "Specialists in early-stage product development, MVP creation, and product-market fit discovery.",
        },
        {
          title: "Growth Product Lead",
          description:
            "Activation, retention, and monetization expertise. Data-driven product optimization focus.",
        },
        {
          title: "Platform Product Lead",
          description:
            "API strategy, developer experience, and platform ecosystem development. Technical product management.",
        },
        {
          title: "AI Product Lead",
          description:
            "ML product development, AI feature integration, and AI-native product strategy. Rapidly growing demand.",
        },
      ],
    },
  },

  faqs: [
    {
      question: "What qualifications do fractional CPOs need?",
      answer:
        "Most fractional CPO roles require 10-15+ years product experience with prior CPO, VP Product, or Head of Product experience. Strong track record of shipping successful products and building product teams is essential. Domain expertise (B2B, fintech, etc.) often required.",
    },
    {
      question: "How much do fractional CPOs earn in the UK?",
      answer:
        "UK fractional CPOs typically earn £900-£1,300 per day, with Series B+ and fintech roles at the premium end. Working 2-3 days per week across multiple clients, annual earnings are competitive with full-time CPO salaries.",
    },
    {
      question: "What's the typical fractional CPO engagement?",
      answer:
        "Initial engagements typically run 6-12 months with 2-3 days per week commitment. Early-stage companies may need more intensive engagement during product pivots or launches. Many relationships become long-term advisory.",
    },
    {
      question: "Do fractional CPOs work remotely?",
      answer:
        "About 80% of fractional CPO roles offer hybrid or fully remote arrangements. Product leadership is increasingly remote-friendly, with in-person time focused on workshops, user research, and team alignment sessions.",
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

export type CPOJobsUkSEOContent = typeof cpoJobsUkSEO;
