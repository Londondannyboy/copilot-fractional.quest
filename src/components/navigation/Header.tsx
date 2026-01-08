'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Navigation data structure
const navigation = {
  roles: {
    label: 'Find Jobs',
    description: 'Browse by role',
    items: [
      { name: 'CFO Jobs', href: '/fractional-cfo-jobs-uk', description: 'Finance leadership roles' },
      { name: 'CTO Jobs', href: '/fractional-cto-jobs-uk', description: 'Technology leadership roles' },
      { name: 'CMO Jobs', href: '/fractional-cmo-jobs-uk', description: 'Marketing leadership roles' },
      { name: 'COO Jobs', href: '/fractional-coo-jobs-uk', description: 'Operations leadership roles' },
      { name: 'CEO Jobs', href: '/fractional-ceo-jobs-uk', description: 'Executive leadership roles' },
      { name: 'CHRO Jobs', href: '/fractional-chro-jobs-uk', description: 'HR leadership roles' },
      { name: 'CPO Jobs', href: '/fractional-cpo-jobs-uk', description: 'Product leadership roles' },
      { name: 'CISO Jobs', href: '/fractional-ciso-jobs-uk', description: 'Security leadership roles' },
    ],
    featured: [
      { name: 'All UK Jobs', href: '/fractional-jobs-uk', tag: 'Popular' },
      { name: 'Remote Jobs', href: '/remote-fractional-jobs', tag: 'Flexible' },
      { name: 'Tech Sector', href: '/fractional-jobs-tech', tag: 'Hot' },
    ]
  },
  locations: {
    label: 'Locations',
    description: 'Browse by location',
    items: [
      { name: 'London', href: '/fractional-jobs-london', count: '50+ jobs' },
      { name: 'Manchester', href: '/manchester', count: '20+ jobs' },
      { name: 'Birmingham', href: '/birmingham', count: '15+ jobs' },
      { name: 'Edinburgh', href: '/edinburgh', count: '12+ jobs' },
      { name: 'Bristol', href: '/bristol', count: '10+ jobs' },
      { name: 'All UK', href: '/fractional-jobs-uk', count: '100+ jobs' },
    ]
  },
  resources: {
    label: 'Resources',
    description: 'Guides and insights',
    items: [
      { name: 'What is a Fractional CFO?', href: '/fractional-cfo' },
      { name: 'What is a Fractional CTO?', href: '/fractional-cto' },
      { name: 'What is a Fractional CMO?', href: '/fractional-cmo' },
      { name: 'CFO Salary Guide', href: '/fractional-cfo-salary' },
      { name: 'CTO Salary Guide', href: '/fractional-cto-salary' },
      { name: 'CMO Salary Guide', href: '/fractional-cmo-salary' },
    ],
    guides: [
      { name: 'Portfolio Career Guide', href: '/articles/portfolio-career' },
      { name: 'Salary Guide 2025', href: '/articles/fractional-executive-salary-guide-2025' },
      { name: 'Benefits of Fractional', href: '/articles/benefits-of-fractional-executives' },
    ]
  },
  employers: {
    label: 'For Employers',
    description: 'Hire fractional talent',
    items: [
      { name: 'Hire a Fractional CFO', href: '/hire-fractional-cfo' },
      { name: 'Hire a Fractional CTO', href: '/hire-fractional-cto' },
      { name: 'Hire a Fractional CMO', href: '/hire-fractional-cmo' },
      { name: 'Hire a Fractional COO', href: '/hire-fractional-coo' },
      { name: 'Hire a Fractional CEO', href: '/hire-fractional-ceo' },
      { name: 'Hire a Fractional CHRO', href: '/hire-fractional-chro' },
    ],
    services: [
      { name: 'CFO Services', href: '/fractional-cfo-services' },
      { name: 'CTO Services', href: '/fractional-cto-services' },
      { name: 'CMO Services', href: '/fractional-cmo-services' },
    ]
  }
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-semibold text-gray-900 text-lg hidden sm:block">
              Fractional<span className="text-emerald-600">Quest</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Find Jobs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('roles')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1">
                {navigation.roles.label}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'roles' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'roles' && (
                <div className="absolute top-full left-0 w-[600px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">By Role</h3>
                    <div className="space-y-1">
                      {navigation.roles.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-sm text-gray-500 block">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Featured</h3>
                    <div className="space-y-2">
                      {navigation.roles.featured.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between px-3 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{item.tag}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link
                        href="/fractional-jobs-uk"
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
                      >
                        View all jobs <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('locations')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1">
                {navigation.locations.label}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'locations' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'locations' && (
                <div className="absolute top-full left-0 w-[320px] bg-white rounded-xl shadow-xl border border-gray-100 p-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">UK Locations</h3>
                  <div className="space-y-1">
                    {navigation.locations.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{item.name}</span>
                        <span className="text-sm text-gray-500">{item.count}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1">
                {navigation.resources.label}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 w-[500px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Role Guides</h3>
                    <div className="space-y-1">
                      {navigation.resources.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Guides</h3>
                    <div className="space-y-1">
                      {navigation.resources.guides.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* For Employers Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('employers')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1">
                {navigation.employers.label}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'employers' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'employers' && (
                <div className="absolute top-full right-0 w-[400px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Hire Talent</h3>
                    <div className="space-y-1">
                      {navigation.employers.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Services</h3>
                    <div className="space-y-1">
                      {navigation.employers.services.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side - CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/sign-in"
              className="hidden sm:block text-gray-700 hover:text-gray-900 font-medium px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/fractional-jobs-uk"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Browse Jobs
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="space-y-4">
              {/* Find Jobs */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-4 py-2 font-medium text-gray-900"
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-roles' ? null : 'mobile-roles')}
                >
                  Find Jobs
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${activeDropdown === 'mobile-roles' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-roles' && (
                  <div className="pl-4 space-y-1 mt-2">
                    {navigation.roles.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Locations */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-4 py-2 font-medium text-gray-900"
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-locations' ? null : 'mobile-locations')}
                >
                  Locations
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${activeDropdown === 'mobile-locations' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-locations' && (
                  <div className="pl-4 space-y-1 mt-2">
                    {navigation.locations.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-4 py-2 font-medium text-gray-900"
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-resources' ? null : 'mobile-resources')}
                >
                  Resources
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${activeDropdown === 'mobile-resources' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-resources' && (
                  <div className="pl-4 space-y-1 mt-2">
                    {navigation.resources.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* For Employers */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-4 py-2 font-medium text-gray-900"
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-employers' ? null : 'mobile-employers')}
                >
                  For Employers
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${activeDropdown === 'mobile-employers' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-employers' && (
                  <div className="pl-4 space-y-1 mt-2">
                    {navigation.employers.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Sign In (mobile) */}
              <div className="px-4 pt-4 border-t border-gray-100">
                <Link
                  href="/auth/sign-in"
                  className="block text-center py-2 text-gray-700 font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

// Icons
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
