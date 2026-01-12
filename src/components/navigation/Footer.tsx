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
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'What is a Fractional CFO?', href: '/fractional-cfo' },
      { name: 'What is a Fractional CTO?', href: '/fractional-cto' },
      { name: 'What is a Fractional CMO?', href: '/fractional-cmo' },
      { name: 'What is a Fractional COO?', href: '/fractional-coo' },
      { name: 'CFO Salary Guide', href: '/fractional-cfo-salary' },
      { name: 'CTO Salary Guide', href: '/fractional-cto-salary' },
      { name: 'CMO Salary Guide', href: '/fractional-cmo-salary' },
      { name: 'Portfolio Career Guide', href: '/articles/portfolio-career' },
      { name: 'IR35 Guide', href: '/articles/ir35-guide' },
      { name: 'Rate Calculator', href: '/rate-calculator' },
    ],
  },
  forEmployers: {
    title: 'For Employers',
    links: [
      { name: 'Hire a Fractional CFO', href: '/hire-fractional-cfo' },
      { name: 'Hire a Fractional CTO', href: '/hire-fractional-cto' },
      { name: 'Hire a Fractional CMO', href: '/hire-fractional-cmo' },
      { name: 'Hire a Fractional COO', href: '/hire-fractional-coo' },
      { name: 'Hire a Fractional CHRO', href: '/hire-fractional-chro' },
      { name: 'CFO Services', href: '/fractional-cfo-services' },
      { name: 'CTO Services', href: '/fractional-cto-services' },
      { name: 'CMO Services', href: '/fractional-cmo-services' },
      { name: 'Book a Call', href: '/book-call' },
    ],
  },
  jobTypes: {
    title: 'Job Types',
    links: [
      { name: 'Interim CFO Jobs', href: '/interim-cfo-jobs-uk' },
      { name: 'Interim CTO Jobs', href: '/interim-cto-jobs-uk' },
      { name: 'Interim CMO Jobs', href: '/interim-cmo-jobs-uk' },
      { name: 'Part-time CFO Jobs', href: '/part-time-cfo-jobs-uk' },
      { name: 'Part-time CTO Jobs', href: '/part-time-cto-jobs-uk' },
      { name: 'Part-time CMO Jobs', href: '/part-time-cmo-jobs-uk' },
      { name: 'Part-time COO Jobs', href: '/part-time-coo-jobs-uk' },
    ],
  },
  industries: {
    title: 'Industries',
    links: [
      { name: 'Tech & SaaS', href: '/fractional-jobs-tech' },
      { name: 'Startups', href: '/fractional-jobs-startups' },
      { name: 'E-commerce', href: '/fractional-jobs-ecommerce' },
      { name: 'Healthcare', href: '/fractional-jobs-healthcare' },
      { name: 'Finance', href: '/fractional-jobs-finance' },
      { name: 'Manufacturing', href: '/fractional-jobs-manufacturing' },
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
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
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Fractional Quest. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-gray-300 transition-colors">
                Cookie Policy
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
