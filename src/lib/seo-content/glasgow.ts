// SEO Content for Glasgow Jobs Page

export const glasgowSEO = {
  meta: {
    title: "Fractional Jobs Glasgow 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland's Largest City",
    description:
      "Fractional jobs Glasgow, Scotland's largest business city. CFO, CTO, CMO roles with day rates £650-£1,100.",
    keywords: [
      "fractional jobs glasgow",
      "fractional cto glasgow",
      "fractional cfo glasgow",
      "fractional executive glasgow",
      "part time cto glasgow",
      "interim cfo glasgow",
      "fractional cmo scotland",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs-uk" },
    { name: "Glasgow", url: "/glasgow" },
  ],

  hero: {
    headline: "Fractional Jobs Glasgow",
    subtitle:
      "CTO, CFO, CMO & executive roles in Scotland's commercial capital",
    stats: {
      avgDayRate: "£650-£1,100",
      hubStatus: "#1 West Scotland",
      hybridOptions: "65% Hybrid",
    },
  },

  content: {
    whyLocation: {
      title: "Why Glasgow is Scotland's Commercial Powerhouse",
      paragraphs: [
        "Glasgow has established itself as Scotland's largest commercial centre and a growing hub for fractional executive talent. The city's diverse economy spans financial services, engineering, life sciences, and creative industries, creating varied opportunities for flexible C-suite leadership.",
        "From the financial services firms in the International Financial Services District to the tech innovation at Glasgow's growing startup ecosystem, the city offers a different profile to Edinburgh. Glasgow's larger size, strong engineering heritage, and creative industries create unique demand.",
        "The Glasgow City Region's focus on net zero, digital transformation, and life sciences is driving demand for fractional executives who can help companies navigate change and scale sustainably.",
      ],
    },

    dayRates: {
      title: "Glasgow Fractional Day Rates",
      description:
        "Typical day rates for fractional executives in Glasgow, generally 15-25% below London rates:",
      rates: [
        { role: "CFO", range: "£750 - £1,100/day", typical: "£900" },
        { role: "CTO", range: "£700 - £1,050/day", typical: "£850" },
        { role: "CMO", range: "£650 - £950/day", typical: "£800" },
        { role: "COO", range: "£700 - £1,000/day", typical: "£850" },
        { role: "CHRO", range: "£600 - £900/day", typical: "£750" },
      ],
    },

    locations: {
      title: "Key Glasgow Business Areas",
      areas: [
        {
          name: "International Financial Services District",
          description:
            "Glasgow's financial hub around Broomielaw. JP Morgan, Barclays, Morgan Stanley operations. High demand for fractional CFOs and finance leaders.",
        },
        {
          name: "City Centre & Merchant City",
          description:
            "Professional services, creative agencies, and tech startups. Strong demand for fractional CMOs and digital transformation CTOs.",
        },
        {
          name: "Glasgow Science Centre & Pacific Quay",
          description:
            "BBC Scotland, STV, and media companies. Growing tech presence. Demand for fractional CTOs and creative leaders.",
        },
        {
          name: "West End & University Area",
          description:
            "University spinouts, life sciences, and research commercialisation. Demand for fractional CTOs with deep tech experience.",
        },
      ],
    },

    emergingRoles: {
      title: "In-Demand Fractional Roles in Glasgow",
      roles: [
        {
          title: "Fractional CFO",
          description:
            "Strong demand from financial services operations and PE-backed Scottish businesses.",
        },
        {
          title: "Fractional CTO",
          description:
            "Growing need for digital transformation, fintech, and engineering tech leadership.",
        },
        {
          title: "Fractional CMO",
          description:
            "Creative industries, tourism, and consumer brands seeking growth expertise.",
        },
        {
          title: "Fractional COO",
          description:
            "Engineering, manufacturing, and shared services operations leadership.",
        },
      ],
    },

    sectors: {
      title: "Key Sectors Hiring Fractional Executives",
      list: [
        "Financial Services & Fintech",
        "Engineering & Manufacturing",
        "Creative & Media",
        "Life Sciences & Healthcare",
        "Energy & Clean Tech",
        "Professional Services",
      ],
    },
  },

  faqs: [
    {
      question: "What are typical fractional executive day rates in Glasgow?",
      answer:
        "Glasgow fractional executives typically command £650-£1,100 per day, around 15-25% below London rates but competitive with Edinburgh. Financial services roles command the highest rates due to the concentration of banking operations.",
    },
    {
      question: "How does Glasgow compare to Edinburgh for fractional work?",
      answer:
        "Glasgow offers a different profile - larger population, more diverse economy, stronger engineering and creative sectors. Edinburgh has more asset management; Glasgow has more banking operations and manufacturing. Many fractional executives work across both cities (45-minute train).",
    },
    {
      question: "What sectors are hiring fractional executives in Glasgow?",
      answer:
        "Financial services leads (JP Morgan, Barclays, Morgan Stanley all have major operations), followed by engineering, creative industries, and life sciences. Glasgow's engineering heritage creates demand for operationally-focused fractional executives.",
    },
    {
      question: "Can I combine Glasgow and Edinburgh clients?",
      answer:
        "Absolutely. The 45-minute train between cities makes it practical to serve clients in both. Many Scottish fractional executives build portfolios spanning both cities, often with different sector focuses in each.",
    },
    {
      question: "Are Glasgow fractional roles mostly hybrid?",
      answer:
        "Around 65% of Glasgow fractional roles offer hybrid arrangements. The financial services sector tends toward more on-site presence (security requirements), while creative and tech companies are more flexible.",
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

export type GlasgowSEOContent = typeof glasgowSEO;
