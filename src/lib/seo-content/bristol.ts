// SEO Content for Bristol Jobs Page

export const bristolSEO = {
  meta: {
    title: "Fractional Jobs Bristol | CTO, CFO, CMO Executive Roles",
    description:
      "Premium fractional executive jobs in Bristol. Find CTO, CFO, CMO, COO and CHRO roles with day rates from £700-£1,150. The South West's leading hub for fractional C-suite talent.",
    keywords: [
      "fractional jobs bristol",
      "fractional cto bristol",
      "fractional cfo bristol",
      "fractional executive bristol",
      "part time cto bristol",
      "interim cfo bristol",
      "fractional cmo south west",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs-uk" },
    { name: "Bristol", url: "/bristol" },
  ],

  hero: {
    headline: "Fractional Jobs Bristol",
    subtitle:
      "CTO, CFO, CMO & executive roles in the South West's tech capital",
    stats: {
      avgDayRate: "£700-£1,150",
      hubStatus: "#1 South West Hub",
      hybridOptions: "70% Hybrid",
    },
  },

  content: {
    whyLocation: {
      title: "Why Bristol is the South West's Fractional Capital",
      paragraphs: [
        "Bristol has emerged as one of the UK's most dynamic centres for fractional executive talent. The city's unique combination of aerospace heritage, fintech innovation, and creative industries creates a diverse market for flexible C-suite leadership.",
        "From the Engine Shed's tech startups to the aerospace giants in Filton, Bristol offers opportunities across multiple high-growth sectors. The city's excellent quality of life, proximity to London (1h 40m by train), and vibrant culture attract senior executives seeking alternatives to the capital.",
        "Bristol's status as a 'Silicon Gorge' tech hub, combined with major employers like Dyson, Airbus, and numerous unicorn-track startups, creates sustained demand for fractional executives who can navigate fast-growth environments.",
      ],
    },

    dayRates: {
      title: "Bristol Fractional Day Rates",
      description:
        "Typical day rates for fractional executives in Bristol, generally 15-25% below London rates:",
      rates: [
        { role: "CFO", range: "£800 - £1,150/day", typical: "£950" },
        { role: "CTO", range: "£750 - £1,100/day", typical: "£900" },
        { role: "CMO", range: "£700 - £1,000/day", typical: "£850" },
        { role: "COO", range: "£750 - £1,050/day", typical: "£900" },
        { role: "CHRO", range: "£650 - £950/day", typical: "£800" },
      ],
    },

    locations: {
      title: "Key Bristol Business Areas",
      areas: [
        {
          name: "Temple Quarter & Engine Shed",
          description:
            "Bristol's innovation district. SETsquared, numerous startups, and scale-ups. High demand for fractional CTOs and growth-focused CMOs.",
        },
        {
          name: "Harbourside",
          description:
            "Creative and professional services hub. Aardman Animations, media companies, and agencies. Strong demand for fractional CMOs and creative leaders.",
        },
        {
          name: "Filton & North Bristol",
          description:
            "Aerospace and advanced engineering cluster. Airbus, GKN, and Rolls-Royce. Demand for fractional CTOs and COOs with engineering backgrounds.",
        },
        {
          name: "Bristol & Bath Science Park",
          description:
            "Deep tech and life sciences hub. Demand for specialist fractional CTOs and scientifically-literate finance leaders.",
        },
      ],
    },

    emergingRoles: {
      title: "In-Demand Fractional Roles in Bristol",
      roles: [
        {
          title: "Fractional CTO",
          description:
            "Strong demand from tech startups, fintech, and aerospace digital transformation.",
        },
        {
          title: "Fractional CFO",
          description:
            "Growing need for fundraising support and scale-up finance leadership.",
        },
        {
          title: "Fractional CMO",
          description:
            "Creative industries and B2B tech companies seeking growth expertise.",
        },
        {
          title: "Fractional CPO",
          description:
            "Product leadership for SaaS scale-ups and digital platforms.",
        },
      ],
    },

    sectors: {
      title: "Key Sectors Hiring Fractional Executives",
      list: [
        "Aerospace & Defence",
        "Fintech & Financial Services",
        "Creative & Media",
        "Deep Tech & Robotics",
        "Clean Tech & Sustainability",
        "Life Sciences",
      ],
    },
  },

  faqs: [
    {
      question: "What are typical fractional executive day rates in Bristol?",
      answer:
        "Bristol fractional executives typically command £700-£1,150 per day, around 15-25% below London rates. Tech-focused roles (CTOs, CPOs) are in particularly high demand due to the 'Silicon Gorge' ecosystem, often commanding rates closer to London levels.",
    },
    {
      question: "How does Bristol's tech scene affect fractional demand?",
      answer:
        "Bristol's thriving tech ecosystem (Graphcore, Ultraleap, Ovo Energy, etc.) creates strong demand for fractional CTOs and CPOs. Many London tech executives relocate for quality of life while maintaining fractional portfolios across both cities.",
    },
    {
      question: "What sectors drive fractional hiring in Bristol?",
      answer:
        "Aerospace leads (Airbus, Rolls-Royce supply chain), followed by fintech, creative industries, and deep tech. The Bristol & Bath corridor has particular strength in robotics, AI, and clean technology.",
    },
    {
      question: "Can I combine Bristol with London clients?",
      answer:
        "Absolutely. Bristol's 1h 40m train to London Paddington makes it practical to maintain London clients while living in Bristol. Many fractional executives split their portfolio between Bristol-based companies and remote London engagements.",
    },
    {
      question: "Are Bristol roles mostly hybrid?",
      answer:
        "Around 70% of Bristol fractional roles offer hybrid arrangements - higher than London. The city's compact size and excellent public transport make commuting easy, but companies are generally flexible about remote work.",
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

export type BristolSEOContent = typeof bristolSEO;
