// SEO Content for Birmingham Jobs Page

export const birminghamSEO = {
  meta: {
    title: "Fractional Jobs Birmingham | CTO, CFO, CMO Executive Roles",
    description:
      "Premium fractional executive jobs in Birmingham. Find CTO, CFO, CMO, COO and CHRO roles with day rates from £650-£1,100. The Midlands' leading hub for fractional C-suite talent.",
    keywords: [
      "fractional jobs birmingham",
      "fractional cto birmingham",
      "fractional cfo birmingham",
      "fractional executive birmingham",
      "part time cto birmingham",
      "interim cfo birmingham",
      "fractional cmo midlands",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs-uk" },
    { name: "Birmingham", url: "/birmingham" },
  ],

  hero: {
    headline: "Fractional Jobs Birmingham",
    subtitle:
      "CTO, CFO, CMO & executive roles in the Midlands' business capital",
    stats: {
      avgDayRate: "£650-£1,100",
      hubStatus: "#1 Midlands Hub",
      hybridOptions: "65% Hybrid",
    },
  },

  content: {
    whyLocation: {
      title: "Why Birmingham is the Midlands' Fractional Hub",
      paragraphs: [
        "Birmingham has transformed into a major centre for fractional executive talent. The city's central location, excellent transport links, and lower cost base make it attractive for both executives and companies seeking flexible C-suite leadership.",
        "From the financial services cluster around Colmore Row to the tech innovation at Innovation Birmingham, the city offers diverse opportunities. Major relocations from London (HSBC, Goldman Sachs) have elevated Birmingham's profile as a serious business destination.",
        "The West Midlands Combined Authority's investment in digital infrastructure and the upcoming HS2 connection are accelerating growth, creating demand for fractional executives who can help companies scale.",
      ],
    },

    dayRates: {
      title: "Birmingham Fractional Day Rates",
      description:
        "Typical day rates for fractional executives in Birmingham, generally 20-30% below London rates:",
      rates: [
        { role: "CFO", range: "£750 - £1,100/day", typical: "£900" },
        { role: "CTO", range: "£700 - £1,050/day", typical: "£850" },
        { role: "CMO", range: "£650 - £950/day", typical: "£800" },
        { role: "COO", range: "£700 - £1,000/day", typical: "£850" },
        { role: "CHRO", range: "£600 - £900/day", typical: "£750" },
      ],
    },

    locations: {
      title: "Key Birmingham Business Areas",
      areas: [
        {
          name: "Colmore Business District",
          description:
            "Birmingham's financial heart. HSBC UK HQ, PwC, and major law firms. High demand for fractional CFOs and compliance leaders.",
        },
        {
          name: "Brindleyplace",
          description:
            "Professional services hub. Deutsche Bank, BT, and numerous consultancies. Strong demand for fractional COOs and transformation leaders.",
        },
        {
          name: "Digbeth & Eastside",
          description:
            "Creative and tech startup district. Growing demand for fractional CTOs and CMOs from digital agencies and tech startups.",
        },
        {
          name: "Birmingham Business Park",
          description:
            "Corporate campus with major employers including IMI, Rolls-Royce, and National Grid. Demand for experienced fractional CFOs and CTOs.",
        },
      ],
    },

    emergingRoles: {
      title: "In-Demand Fractional Roles in Birmingham",
      roles: [
        {
          title: "Fractional CFO",
          description:
            "High demand from manufacturing scale-ups and financial services firms.",
        },
        {
          title: "Fractional CTO",
          description:
            "Growing need for digital transformation leadership in traditional industries.",
        },
        {
          title: "Fractional COO",
          description:
            "Operations excellence for manufacturing and logistics companies.",
        },
        {
          title: "Fractional CMO",
          description:
            "Brand building for professional services and B2B companies.",
        },
      ],
    },

    sectors: {
      title: "Key Sectors Hiring Fractional Executives",
      list: [
        "Financial Services & Banking",
        "Manufacturing & Engineering",
        "Professional Services",
        "Automotive & Mobility",
        "Healthcare & Life Sciences",
        "Logistics & Supply Chain",
      ],
    },
  },

  faqs: [
    {
      question: "What are typical fractional executive day rates in Birmingham?",
      answer:
        "Birmingham fractional executives typically command £650-£1,100 per day, around 20-30% below London rates. CFOs are at the higher end (£750-£1,100) with CHROs slightly lower (£600-£900). The gap with London is narrowing as more senior talent relocates to the Midlands.",
    },
    {
      question: "How is Birmingham's fractional market growing?",
      answer:
        "Birmingham's fractional market has grown significantly since major financial institutions relocated operations from London. HSBC's UK headquarters move brought attention to the city's business credentials, and HS2 is expected to accelerate this trend.",
    },
    {
      question: "What sectors hire fractional executives in Birmingham?",
      answer:
        "Financial services leads (HSBC, Deutsche Bank), followed by manufacturing, professional services, and increasingly tech. The automotive sector (JLR, Aston Martin nearby) also creates demand for fractional CTOs and COOs.",
    },
    {
      question: "Is Birmingham good for portfolio executive careers?",
      answer:
        "Yes. Birmingham's central UK location makes it ideal for portfolio careers - you can serve clients across the Midlands, North, and even London with reasonable travel. Lower living costs mean you can be selective about engagements.",
    },
    {
      question: "Are Birmingham roles hybrid or on-site?",
      answer:
        "Around 65% of Birmingham fractional roles offer hybrid arrangements. The city's excellent rail connections (1h 10m to London Euston) make it practical to combine on-site presence with remote work.",
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

export type BirminghamSEOContent = typeof birminghamSEO;
