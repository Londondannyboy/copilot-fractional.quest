// SEO Content for Leeds Jobs Page

export const leedsSEO = {
  meta: {
    title: "Fractional Jobs Leeds 🏙️ Yorkshire's Hub",
    description:
      "Fractional jobs Leeds, Yorkshire's leading business hub. CFO, CTO, CMO roles with day rates £650-£1,100.",
    keywords: [
      "fractional jobs leeds",
      "fractional cto leeds",
      "fractional cfo leeds",
      "fractional executive leeds",
      "part time cto leeds",
      "interim cfo leeds",
      "fractional cmo yorkshire",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs-uk" },
    { name: "Leeds", url: "/leeds" },
  ],

  hero: {
    headline: "Fractional Jobs Leeds",
    subtitle:
      "CTO, CFO, CMO & executive roles in Yorkshire's business capital",
    stats: {
      avgDayRate: "£650-£1,100",
      hubStatus: "#1 Yorkshire Hub",
      hybridOptions: "70% Hybrid",
    },
  },

  content: {
    whyLocation: {
      title: "Why Leeds is Yorkshire's Fractional Capital",
      paragraphs: [
        "Leeds has emerged as the North's fastest-growing centre for fractional executive talent. The city's diverse economy spanning financial services, legal, digital, and healthcare creates strong demand for flexible C-suite leadership.",
        "From the legal powerhouses on Park Row to the tech startups in the Leeds Digital Festival ecosystem, the city offers opportunities across multiple sectors. Leeds' excellent transport links and lower cost base than London make it attractive for portfolio executives.",
        "The Leeds City Region's ambitious growth plans and strong university talent pipeline (Leeds, Leeds Beckett, Leeds Trinity) continue to fuel demand for experienced fractional leaders who can help scale innovative businesses.",
      ],
    },

    dayRates: {
      title: "Leeds Fractional Day Rates",
      description:
        "Typical day rates for fractional executives in Leeds, generally 20-30% below London rates:",
      rates: [
        { role: "CFO", range: "£750 - £1,100/day", typical: "£900" },
        { role: "CTO", range: "£700 - £1,050/day", typical: "£850" },
        { role: "CMO", range: "£650 - £950/day", typical: "£800" },
        { role: "COO", range: "£700 - £1,000/day", typical: "£850" },
        { role: "CHRO", range: "£600 - £900/day", typical: "£750" },
      ],
    },

    locations: {
      title: "Key Leeds Business Areas",
      areas: [
        {
          name: "Leeds City Centre",
          description:
            "Financial and legal services hub. Major law firms, banks, and professional services. High demand for fractional CFOs and compliance leaders.",
        },
        {
          name: "Leeds Dock",
          description:
            "Digital and creative hub. Sky, Channel 4, and numerous digital agencies. Strong demand for fractional CTOs and CMOs.",
        },
        {
          name: "South Bank Leeds",
          description:
            "Major regeneration area with growing tech presence. Demand for fractional executives in scale-ups and property tech.",
        },
        {
          name: "Thorpe Park Business Park",
          description:
            "Out-of-town corporate campus with NHS Digital, HMRC, and tech companies. Demand for fractional CTOs and transformation leaders.",
        },
      ],
    },

    emergingRoles: {
      title: "In-Demand Fractional Roles in Leeds",
      roles: [
        {
          title: "Fractional CFO",
          description:
            "Strong demand from legal sector and PE-backed companies needing financial leadership.",
        },
        {
          title: "Fractional CTO",
          description:
            "Growing need for digital transformation in traditional industries and fintech startups.",
        },
        {
          title: "Fractional CMO",
          description:
            "Brand and growth leadership for Yorkshire's expanding digital and retail sectors.",
        },
        {
          title: "Fractional COO",
          description:
            "Operations excellence for logistics, manufacturing, and professional services.",
        },
      ],
    },

    sectors: {
      title: "Key Sectors Hiring Fractional Executives",
      list: [
        "Legal Services",
        "Financial Services & Fintech",
        "Digital & Creative",
        "Healthcare & NHS",
        "Manufacturing & Engineering",
        "Retail & E-commerce",
      ],
    },
  },

  faqs: [
    {
      question: "What are typical fractional executive day rates in Leeds?",
      answer:
        "Leeds fractional executives typically command £650-£1,100 per day, around 20-30% below London rates. The legal and financial sectors command the highest rates. Leeds offers excellent value with experienced executives at competitive day rates.",
    },
    {
      question: "How does Leeds compare to other Northern cities for fractional work?",
      answer:
        "Leeds competes directly with Manchester for Northern fractional talent. While Manchester has a larger tech sector, Leeds has stronger legal and financial services presence. Many fractional executives work across both cities.",
    },
    {
      question: "What sectors are hiring fractional executives in Leeds?",
      answer:
        "Legal services leads (Leeds is the UK's largest legal centre outside London), followed by financial services, digital/creative (Channel 4, Sky), and healthcare (NHS Digital HQ). The professional services sector is particularly strong.",
    },
    {
      question: "Is Leeds good for building a fractional portfolio?",
      answer:
        "Excellent. Leeds' diverse economy and central UK location make it ideal for portfolio careers. You can easily combine Leeds clients with Manchester, Sheffield, or remote work. The cost of living is significantly lower than London.",
    },
    {
      question: "Are Leeds fractional roles hybrid or on-site?",
      answer:
        "Around 70% of Leeds fractional roles offer hybrid arrangements. The legal sector tends toward more on-site presence, while tech and digital companies are generally more flexible. Most roles expect 1-2 days per week in-person.",
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

export type LeedsSEOContent = typeof leedsSEO;
