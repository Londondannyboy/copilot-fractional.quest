import Link from 'next/link'

const footerLinks = {
  findJobs: {
    title: 'Find Jobs',
    links: [
      { name: 'CFO Jobs UK', href: '/fractional-cfo-jobs-uk' },
      { name: 'CTO Jobs UK', href: '/fractional-cto-jobs-uk' },
      { name: 'CMO Jobs UK', href: '/fractional-cmo-jobs-uk' },
      { name: 'COO Jobs UK', href: '/fractional-coo-jobs-uk' },
      { name: 'CEO Jobs UK', href: '/fractional-ceo-jobs-uk' },
      { name: 'CHRO Jobs UK', href: '/fractional-chro-jobs-uk' },
      { name: 'CPO Jobs UK', href: '/fractional-cpo-jobs-uk' },
      { name: 'CISO Jobs UK', href: '/fractional-ciso-jobs-uk' },
      { name: 'CRO Jobs UK', href: '/fractional-cro-jobs-uk' },
      { name: 'CCO Jobs UK', href: '/fractional-cco-jobs-uk' },
      { name: 'All UK Jobs', href: '/fractional-jobs-uk' },
      { name: 'Remote Jobs', href: '/remote-fractional-jobs' },
    ],
  },
  locations: {
    title: 'Locations',
    links: [
      { name: 'London', href: '/fractional-jobs-london' },
      { name: 'Manchester', href: '/manchester' },
      { name: 'Birmingham', href: '/birmingham' },
      { name: 'Edinburgh', href: '/edinburgh' },
      { name: 'Bristol', href: '/bristol' },
      { name: 'Glasgow', href: '/glasgow' },
      { name: 'Leeds', href: '/leeds' },
      { name: 'Belfast', href: '/belfast' },
      { name: 'Cambridge', href: '/cambridge' },
      { name: 'Newcastle', href: '/fractional-jobs-newcastle' },
      { name: 'Liverpool', href: '/fractional-jobs-liverpool' },
      { name: 'Cardiff', href: '/fractional-jobs-cardiff' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'What is a Fractional CFO?', href: '/fractional-cfo' },
      { name: 'What is a Fractional CTO?', href: '/fractional-cto' },
      { name: 'What is a Fractional CMO?', href: '/fractional-cmo' },
      { name: 'What is a Fractional GTM?', href: '/fractional-gtm' },
      { name: 'What is a Fractional SDR?', href: '/fractional-sdr' },
      { name: 'What is a Fractional GC?', href: '/fractional-general-counsel' },
      { name: 'CFO Salary Guide', href: '/fractional-cfo-salary' },
      { name: 'CTO Salary Guide', href: '/fractional-cto-salary' },
      { name: 'Portfolio Career Guide', href: '/fractional-executive-portfolio' },
      { name: 'Rate Calculator', href: '/rate-calculator' },
      { name: 'Interim CMO Guide', href: '/interim-cmo' },
      { name: 'Interim CTO Guide', href: '/interim-cto' },
      { name: 'Interim CEO Guide', href: '/interim-ceo' },
      { name: 'Interim CHRO Guide', href: '/interim-chro' },
      { name: 'Virtual CFO Services', href: '/virtual-cfo-services' },
    ],
  },
  forEmployers: {
    title: 'For Employers',
    links: [
      { name: 'Hire a Fractional CFO', href: '/hire-fractional-cfo' },
      { name: 'Hire a Fractional CTO', href: '/hire-fractional-cto' },
      { name: 'Hire a Fractional CMO', href: '/hire-fractional-cmo' },
      { name: 'Hire a Fractional COO', href: '/hire-fractional-coo' },
      { name: 'CFO Services', href: '/fractional-cfo-services' },
      { name: 'CMO Services', href: '/fractional-cmo-services' },
      { name: 'CEO Services', href: '/fractional-ceo-services' },
      { name: 'CFO Agency', href: '/fractional-cfo-agency' },
      { name: 'CMO Agency', href: '/fractional-cmo-agency' },
      { name: 'Fractional Recruitment Agency', href: '/fractional-recruitment-agency' },
      { name: 'Executive Search Firms', href: '/executive-search-firms' },
      { name: 'Fractional Executive Search', href: '/fractional-executive-search' },
      { name: 'Book a Call', href: '/book-call' },
    ],
  },
  jobTypes: {
    title: 'Job Types',
    links: [
      { name: 'Interim CFO Jobs', href: '/interim-cfo-jobs-uk' },
      { name: 'Interim CTO Jobs', href: '/interim-cto-jobs-uk' },
      { name: 'Interim CMO Jobs', href: '/interim-cmo-jobs-uk' },
      { name: 'Interim COO Jobs', href: '/interim-coo-jobs-uk' },
      { name: 'Interim CCO Jobs', href: '/interim-cco-jobs-uk' },
      { name: 'Interim CSO Jobs', href: '/interim-cso-jobs-uk' },
      { name: 'Interim Executive Search', href: '/interim-executive-search' },
      { name: 'Part-time CFO Jobs', href: '/part-time-cfo-jobs-uk' },
      { name: 'Part-time CTO Jobs', href: '/part-time-cto-jobs-uk' },
      { name: 'Part-time CMO Jobs', href: '/part-time-cmo-jobs-uk' },
      { name: 'Advisory CFO Jobs', href: '/advisory-cfo-jobs-uk' },
      { name: 'Advisory CTO Jobs', href: '/advisory-cto-jobs-uk' },
    ],
  },
  industries: {
    title: 'Industries',
    links: [
      { name: 'Tech & SaaS', href: '/fractional-jobs-tech' },
      { name: 'Startups', href: '/fractional-jobs-startups' },
      { name: 'E-commerce', href: '/fractional-jobs-ecommerce' },
      { name: 'Fintech Recruitment', href: '/fintech-recruitment-agency' },
      { name: 'Technology Recruitment', href: '/technology-recruitment-agency' },
      { name: 'Cybersecurity Recruitment', href: '/cybersecurity-recruitment-agency' },
    ],
  },
  specialistRoles: {
    title: 'Specialist Roles',
    links: [
      { name: 'CCO Jobs UK', href: '/fractional-cco-jobs-uk' },
      { name: 'CSO Jobs UK', href: '/fractional-cso-jobs-uk' },
      { name: 'CRO Jobs UK', href: '/fractional-cro-jobs-uk' },
      { name: 'CIO Jobs UK', href: '/fractional-cio-jobs-uk' },
      { name: 'GTM Lead', href: '/fractional-gtm-jobs-uk' },
      { name: 'SDR', href: '/fractional-sdr-jobs-uk' },
      { name: 'General Counsel', href: '/fractional-general-counsel' },
      { name: 'Head of Growth', href: '/fractional-head-of-growth-jobs-uk' },
      { name: 'Product Manager', href: '/fractional-product-manager-jobs-uk' },
      { name: 'VP Engineering', href: '/fractional-vp-engineering-jobs-uk' },
      { name: 'Financial Controller', href: '/fractional-financial-controller-jobs-uk' },
      { name: 'CISO Recruitment', href: '/ciso-recruitment-agency' },
    ],
  },
  costGuides: {
    title: 'Cost & Pricing',
    links: [
      { name: 'CFO Cost Guide', href: '/fractional-cfo-cost' },
      { name: 'CMO Cost Guide', href: '/fractional-cmo-cost' },
      { name: 'COO Cost Guide', href: '/fractional-coo-cost' },
      { name: 'CTO Cost Guide', href: '/fractional-cto-cost' },
      { name: 'CMO Salary Guide', href: '/fractional-cmo-salary' },
      { name: 'COO Salary Guide', href: '/fractional-coo-salary' },
    ],
  },
  recruitment: {
    title: 'Recruitment',
    links: [
      { name: 'C-Suite Recruitment', href: '/c-suite-recruitment' },
      { name: 'CFO Headhunter', href: '/cfo-headhunter' },
      { name: 'CMO Recruitment', href: '/cmo-recruitment-agency' },
      { name: 'CTO Recruitment', href: '/cto-recruitment-agency' },
      { name: 'Executive Search', href: '/executive-search-firms' },
      { name: 'Interim Executive Search', href: '/interim-executive-search' },
      { name: 'Private Equity Recruitment', href: '/private-equity-recruitment-agency' },
      { name: 'FinTech Recruitment', href: '/fintech-recruitment-agency' },
      { name: 'AI Recruitment', href: '/ai-recruitment-agency' },
      { name: 'Accounting Recruitment', href: '/accounting-recruitment-agency' },
    ],
  },
}

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/fractional-quest', icon: LinkedInIcon },
  { name: 'Twitter', href: 'https://twitter.com/fractionalquest', icon: TwitterIcon },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="font-semibold text-white text-lg">
                Fractional<span className="text-emerald-400">Quest</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              The UK&apos;s leading platform for fractional executive jobs. Connect with top companies seeking part-time C-suite leadership.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.findJobs.title}</h3>
            <ul className="space-y-2">
              {footerLinks.findJobs.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.locations.title}</h3>
            <ul className="space-y-2">
              {footerLinks.locations.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.resources.title}</h3>
            <ul className="space-y-2">
              {footerLinks.resources.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.forEmployers.title}</h3>
            <ul className="space-y-2">
              {footerLinks.forEmployers.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.jobTypes.title}</h3>
            <ul className="space-y-2">
              {footerLinks.jobTypes.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.industries.title}</h3>
            <ul className="space-y-2">
              {footerLinks.industries.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.specialistRoles.title}</h3>
            <ul className="space-y-2">
              {footerLinks.specialistRoles.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.costGuides.title}</h3>
            <ul className="space-y-2">
              {footerLinks.costGuides.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.recruitment.title}</h3>
            <ul className="space-y-2">
              {footerLinks.recruitment.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Fractional Quest. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-gray-200 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gray-200 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-gray-200 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/compliance" className="text-gray-400 hover:text-gray-200 transition-colors">
                Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Icons
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
