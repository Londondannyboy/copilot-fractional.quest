import Link from 'next/link';

interface RoleContentHubProps {
  currentRole: 'cfo' | 'cto' | 'cmo' | 'coo' | 'ceo' | 'chro' | 'ciso' | 'cpo' | 'cro' | 'controller' | 'growth' | 'compliance' | 'product' | 'pm';
}

interface RoleLink {
  role: string;
  path: string;
  label: string;
}

export function RoleContentHub({ currentRole }: RoleContentHubProps) {
  const executiveRoles: RoleLink[] = [
    { role: 'cfo', path: '/fractional-cfo-jobs-uk', label: 'CFO Jobs' },
    { role: 'cto', path: '/fractional-cto-jobs-uk', label: 'CTO Jobs' },
    { role: 'cmo', path: '/fractional-cmo-jobs-uk', label: 'CMO Jobs' },
    { role: 'coo', path: '/fractional-coo-jobs-uk', label: 'COO Jobs' },
    { role: 'ceo', path: '/fractional-ceo-jobs-uk', label: 'CEO Jobs' },
    { role: 'chro', path: '/fractional-chro-jobs-uk', label: 'CHRO Jobs' },
    { role: 'ciso', path: '/fractional-ciso-jobs-uk', label: 'CISO Jobs' },
    { role: 'cpo', path: '/fractional-cpo-jobs-uk', label: 'CPO Jobs' },
    { role: 'cro', path: '/fractional-cro-jobs-uk', label: 'CRO Jobs' },
  ];

  // TODO: Create pages for leadership roles
  const leadershipRoles: RoleLink[] = [
    // { role: 'md', path: '/fractional-managing-director-jobs-uk', label: 'Managing Director' },
    // { role: 'ai', path: '/fractional-head-of-ai-jobs-uk', label: 'Head of AI' },
    // { role: 'growth', path: '/fractional-head-of-growth-jobs-uk', label: 'Head of Growth' },
    // { role: 'fd', path: '/fractional-finance-director-jobs-uk', label: 'Finance Director' },
    // { role: 'gc', path: '/fractional-general-counsel-jobs-uk', label: 'General Counsel' },
    // { role: 'sales', path: '/fractional-sales-director-jobs-uk', label: 'Sales Director' },
    // { role: 'csd', path: '/fractional-client-services-director-jobs-uk', label: 'Client Services Dir' },
  ];

  // TODO: Create pages for specialist roles
  const specialistRoles: RoleLink[] = [
    // { role: 'fc', path: '/fractional-financial-controller-jobs-uk', label: 'Financial Controller' },
    // { role: 'compliance', path: '/fractional-compliance-jobs-uk', label: 'Compliance Officer' },
    // { role: 'legal', path: '/fractional-legal-jobs-uk', label: 'Legal Counsel' },
    // { role: 'dpo', path: '/fractional-dpo-jobs-uk', label: 'DPO' },
    // { role: 'product', path: '/fractional-product-manager-jobs-uk', label: 'Product Manager' },
    // { role: 'project', path: '/fractional-project-manager-jobs-uk', label: 'Project Manager' },
    // { role: 'bd', path: '/fractional-business-development-jobs-uk', label: 'Business Dev' },
    // { role: 'recruiter', path: '/fractional-recruiter-jobs-uk', label: 'Internal Recruiter' },
  ];

  const roleGuides: RoleLink[] = [
    { role: 'cfo', path: '/fractional-cfo', label: 'What is a Fractional CFO' },
    { role: 'cto', path: '/fractional-cto', label: 'What is a Fractional CTO' },
    { role: 'cmo', path: '/fractional-cmo', label: 'What is a Fractional CMO' },
    { role: 'coo', path: '/fractional-coo', label: 'What is a Fractional COO' },
    { role: 'ceo', path: '/fractional-ceo', label: 'What is a Fractional CEO' },
    { role: 'chro', path: '/fractional-chro', label: 'What is a Fractional CHRO' },
    { role: 'ciso', path: '/fractional-ciso', label: 'What is a Fractional CISO' },
    { role: 'cpo', path: '/fractional-cpo', label: 'What is a Fractional CPO' },
    { role: 'cro', path: '/fractional-cro', label: 'What is a Fractional CRO' },
    { role: 'controller', path: '/fractional-controller', label: 'What is a Fractional Controller' },
    { role: 'growth', path: '/fractional-growth', label: 'What is a Fractional Growth Lead' },
  ];

  const salaryGuides: RoleLink[] = [
    { role: 'cfo', path: '/fractional-cfo-salary', label: 'CFO Salary' },
    { role: 'cto', path: '/fractional-cto-salary', label: 'CTO Salary' },
    { role: 'cmo', path: '/fractional-cmo-salary', label: 'CMO Salary' },
    { role: 'coo', path: '/fractional-coo-salary', label: 'COO Salary' },
    { role: 'chro', path: '/fractional-chro-salary', label: 'CHRO Salary' },
    { role: 'ciso', path: '/fractional-ciso-salary', label: 'CISO Salary' },
    { role: 'cpo', path: '/fractional-cpo-salary', label: 'CPO Salary' },
    { role: 'ceo', path: '/fractional-ceo-salary', label: 'CEO Salary' },
  ];

  const costGuides: RoleLink[] = [
    { role: 'cfo', path: '/fractional-cfo-cost', label: 'CFO Cost Guide' },
    { role: 'cto', path: '/fractional-cto-cost', label: 'CTO Cost Guide' },
    { role: 'cmo', path: '/fractional-cmo-cost', label: 'CMO Cost Guide' },
    { role: 'coo', path: '/fractional-coo-cost', label: 'COO Cost Guide' },
    { role: 'chro', path: '/fractional-chro-cost', label: 'CHRO Cost Guide' },
    { role: 'ciso', path: '/fractional-ciso-pricing-cost-guide', label: 'CISO Cost Guide' },
    { role: 'cpo', path: '/fractional-cpo-cost', label: 'CPO Cost Guide' },
    { role: 'cro', path: '/fractional-cro-cost', label: 'CRO Cost Guide' },
  ];

  const careerGuides: RoleLink[] = [
    { role: 'cfo', path: '/how-to-become-fractional-cfo', label: 'Become a CFO' },
    { role: 'cto', path: '/how-to-become-a-fractional-cto', label: 'Become a CTO' },
    { role: 'cmo', path: '/how-to-become-a-fractional-cmo', label: 'Become a CMO' },
    { role: 'coo', path: '/how-to-become-fractional-coo', label: 'Become a COO' },
    { role: 'chro', path: '/how-to-become-fractional-chro', label: 'Become a CHRO' },
    { role: 'ciso', path: '/how-to-become-fractional-ciso', label: 'Become a CISO' },
    { role: 'cpo', path: '/how-to-become-fractional-cpo', label: 'Become a CPO' },
    { role: 'cro', path: '/how-to-become-fractional-cro', label: 'Become a CRO' },
  ];

  const services: RoleLink[] = [
    { role: 'cfo', path: '/hire-fractional-cfo', label: 'Hire a CFO' },
    { role: 'cto', path: '/hire-fractional-cto', label: 'Hire a CTO' },
    { role: 'cmo', path: '/hire-fractional-cmo', label: 'Hire a CMO' },
    { role: 'coo', path: '/hire-fractional-coo', label: 'Hire a COO' },
    { role: 'chro', path: '/hire-fractional-chro', label: 'Hire a CHRO' },
    { role: 'ciso', path: '/hire-fractional-ciso', label: 'Hire a CISO' },
    { role: 'cpo', path: '/hire-fractional-cpo', label: 'Hire a CPO' },
    { role: 'ceo', path: '/hire-fractional-ceo', label: 'Hire a CEO' },
    { role: 'cro', path: '/hire-fractional-cro', label: 'Hire a CRO' },
  ];

  // Industry Verticals
  const industryVerticals: RoleLink[] = [
    { role: 'charity', path: '/fractional-jobs-charity', label: 'Charity Jobs' },
    { role: 'education', path: '/fractional-jobs-education', label: 'Education Jobs' },
    { role: 'media', path: '/fractional-jobs-media', label: 'Media Jobs' },
    { role: 'professional', path: '/fractional-jobs-professional-services', label: 'Professional Services' },
  ];

  // UK Location Pages
  const ukLocations: RoleLink[] = [
    { role: 'london', path: '/fractional-jobs-london', label: 'London Jobs' },
    { role: 'manchester', path: '/manchester', label: 'Manchester Jobs' },
    { role: 'birmingham', path: '/birmingham', label: 'Birmingham Jobs' },
    { role: 'edinburgh', path: '/edinburgh', label: 'Edinburgh Jobs' },
    { role: 'glasgow', path: '/fractional-jobs-glasgow', label: 'Glasgow Jobs' },
    { role: 'bristol', path: '/bristol', label: 'Bristol Jobs' },
    { role: 'belfast', path: '/fractional-jobs-belfast', label: 'Belfast Jobs' },
    { role: 'dundee', path: '/fractional-jobs-dundee', label: 'Dundee Jobs' },
    { role: 'norwich', path: '/fractional-jobs-norwich', label: 'Norwich Jobs' },
    { role: 'reading', path: '/fractional-jobs-reading', label: 'Reading Jobs' },
    { role: 'miltonkeynes', path: '/fractional-jobs-milton-keynes', label: 'Milton Keynes Jobs' },
  ];

  // Comparison Guides
  const comparisonGuides: RoleLink[] = [
    { role: 'consultant', path: '/fractional-executive-vs-consultant', label: 'Fractional vs Consultant' },
    { role: 'fulltimecoo', path: '/fractional-coo-vs-full-time', label: 'COO: Fractional vs Full-Time' },
    { role: 'outsourced', path: '/fractional-cfo-vs-outsourced-accounting', label: 'CFO vs Outsourced' },
  ];

  const renderRoleLink = (roleLink: RoleLink) => {
    const isCurrentRole = roleLink.role === currentRole;

    if (isCurrentRole) {
      return (
        <span
          key={roleLink.path}
          className="block px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-md border-2 border-amber-200"
        >
          {roleLink.label}
        </span>
      );
    }

    return (
      <Link
        key={roleLink.path}
        href={roleLink.path}
        className="block px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors duration-150 border border-gray-200 hover:border-amber-300"
      >
        {roleLink.label}
      </Link>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Explore More Fractional Roles
        </h2>

        <div className="space-y-8">
          {/* Executive Roles */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Executive Roles
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {executiveRoles.map(renderRoleLink)}
            </div>
          </div>

          {/* Leadership Roles - Hidden until pages are created */}
          {leadershipRoles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Leadership Roles
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {leadershipRoles.map(renderRoleLink)}
              </div>
            </div>
          )}

          {/* Specialist Roles - Hidden until pages are created */}
          {specialistRoles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Specialist Roles
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {specialistRoles.map(renderRoleLink)}
              </div>
            </div>
          )}

          {/* Role Guides */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Role Guides
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {roleGuides.map(renderRoleLink)}
            </div>
          </div>

          {/* Salary Guides */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Salary Guides
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {salaryGuides.map(renderRoleLink)}
            </div>
          </div>

          {/* Cost Guides */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Cost Guides
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {costGuides.map(renderRoleLink)}
            </div>
          </div>

          {/* Career Guides */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Career Guides
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {careerGuides.map(renderRoleLink)}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Hire Fractional Executives
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {services.map(renderRoleLink)}
            </div>
          </div>

          {/* UK Locations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Jobs by Location
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {ukLocations.map(renderRoleLink)}
            </div>
          </div>

          {/* Industry Verticals */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Jobs by Industry
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {industryVerticals.map(renderRoleLink)}
            </div>
          </div>

          {/* Comparison Guides */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Comparison Guides
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {comparisonGuides.map(renderRoleLink)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
