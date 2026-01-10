// SEO Content for Fractional CTO Jobs UK Page

export const ctoJobsUkSEO = {
  meta: {
    title: "Fractional CTO Jobs UK | Part-Time Tech Leadership Roles",
    description:
      "Find fractional CTO and part-time technology leadership jobs across the UK. Day rates £900-£1,400. Startups, scale-ups, and enterprises seeking interim tech leadership.",
    keywords: [
      "fractional cto jobs uk",
      "fractional cto",
      "part time cto uk",
      "interim cto jobs",
      "fractional tech lead",
      "portfolio cto",
      "part time technology director",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs" },
    { name: "CTO Jobs", url: "/fractional-cto-jobs-uk" },
  ],

  hero: {
    headline: "Fractional CTO Jobs UK",
    subtitle:
      "Part-time Technology Leadership and CTO roles across the United Kingdom",
    stats: {
      avgDayRate: "£900-£1,400",
      hubStatus: "Tech Leadership",
      hybridOptions: "75% Hybrid",
    },
  },

  content: {
    whyLocation: {
      title: "Why Fractional CTO Demand is Growing",
      paragraphs: [
        "UK startups and scale-ups increasingly need experienced technology leadership without full-time overhead. The fractional CTO model delivers senior tech strategy, team building, and architecture expertise on a flexible basis.",
        "Whether you're a former CTO seeking portfolio work, a VP Engineering ready for broader challenges, or a technical founder looking to share your expertise, the UK fractional CTO market offers exceptional opportunities.",
      ],
    },

    dayRates: {
      title: "Fractional CTO Day Rates by Company Stage",
      description:
        "Day rates vary by company stage and technical complexity:",
      rates: [
        { role: "Series B+", range: "£1,100 - £1,600/day", typical: "£1,300" },
        { role: "Series A", range: "£900 - £1,300/day", typical: "£1,100" },
        { role: "Seed Stage", range: "£800 - £1,200/day", typical: "£950" },
        { role: "Enterprise", range: "£1,000 - £1,400/day", typical: "£1,200" },
        { role: "Agency/Consultancy", range: "£700 - £1,100/day", typical: "£900" },
      ],
    },

    locations: {
      title: "Key CTO Sectors",
      areas: [
        {
          name: "Fintech & Crypto",
          description:
            "High demand for CTOs with financial services experience, regulatory understanding, and secure architecture expertise. Premium rates.",
        },
        {
          name: "AI/ML Companies",
          description:
            "Growing need for CTOs who understand machine learning infrastructure, MLOps, and AI product development.",
        },
        {
          name: "SaaS Scale-ups",
          description:
            "Product-led growth companies seeking CTOs for platform scaling, team growth, and technical roadmap development.",
        },
      ],
    },

    emergingRoles: {
      title: "Specialist CTO Roles",
      roles: [
        {
          title: "Platform CTO",
          description:
            "Infrastructure, DevOps, and platform engineering leadership. Cloud migration and scaling expertise.",
        },
        {
          title: "AI/ML CTO",
          description:
            "Specialists in AI product development, ML infrastructure, and data platform architecture.",
        },
        {
          title: "Security-Focused CTO",
          description:
            "Combined CTO/CISO expertise for companies needing technical leadership with security depth.",
        },
        {
          title: "Product CTO",
          description:
            "Bridge between product and engineering. Feature prioritization, technical product management.",
        },
      ],
    },
  },

  faqs: [
    {
      question: "What qualifications do fractional CTOs need?",
      answer:
        "Most fractional CTO roles require 10-15+ years of engineering experience with prior CTO, VP Engineering, or Technical Director experience. Strong track record of building and scaling engineering teams is essential. Specific tech stack expertise (cloud platforms, languages, frameworks) varies by role.",
    },
    {
      question: "How much do fractional CTOs earn in the UK?",
      answer:
        "UK fractional CTOs typically earn £900-£1,400 per day, with fintech and AI roles at the premium end. Working 2-3 days per week across multiple clients, annual earnings often exceed full-time CTO salaries while offering greater variety and flexibility.",
    },
    {
      question: "What's the typical fractional CTO engagement?",
      answer:
        "Initial engagements typically run 6-12 months with 2-3 days per week commitment. Early-stage startups may need more intensive initial engagement (3-4 days) for team building and architecture decisions. Many relationships extend as companies scale.",
    },
    {
      question: "Do fractional CTOs work remotely?",
      answer:
        "About 75% of fractional CTO roles offer hybrid or fully remote arrangements. Tech companies are generally more flexible, though some on-site presence is often expected for team leadership, hiring, and stakeholder meetings.",
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

export type CTOJobsUkSEOContent = typeof ctoJobsUkSEO;
