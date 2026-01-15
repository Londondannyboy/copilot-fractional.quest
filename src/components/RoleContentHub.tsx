import Link from 'next/link';

interface RoleContentHubProps {
  currentRole: 'cfo' | 'cto' | 'cmo' | 'coo' | 'ceo' | 'chro' | 'ciso' | 'cpo' | 'compliance' | 'product' | 'pm';
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
    // TODO: Create pages for these roles
    // { role: 'cio', path: '/fractional-cio-jobs-uk', label: 'CIO Jobs' },
    // { role: 'cdo', path: '/fractional-cdo-jobs-uk', label: 'CDO Jobs' },
    // { role: 'cro', path: '/fractional-cro-jobs-uk', label: 'CRO Jobs' },
    // { role: 'cco', path: '/fractional-cco-jobs-uk', label: 'CCO Jobs' },
    // { role: 'cao', path: '/fractional-cao-jobs-uk', label: 'CAO Jobs' },
    // { role: 'cgo', path: '/fractional-cgo-jobs-uk', label: 'CGO Jobs' },
    // { role: 'cso', path: '/fractional-cso-jobs-uk', label: 'CSO Jobs' },
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
    { role: 'ciso', path: '/fractional-ciso-cost', label: 'CISO Cost Guide' },
    { role: 'cpo', path: '/fractional-cpo-cost', label: 'CPO Cost Guide' },
  ];

  const careerGuides: RoleLink[] = [
    { role: 'cfo', path: '/how-to-become-fractional-cfo', label: 'Become a CFO' },
    { role: 'cto', path: '/how-to-become-a-fractional-cto', label: 'Become a CTO' },
    { role: 'cmo', path: '/how-to-become-a-fractional-cmo', label: 'Become a CMO' },
    { role: 'coo', path: '/how-to-become-fractional-coo', label: 'Become a COO' },
    { role: 'chro', path: '/how-to-become-fractional-chro', label: 'Become a CHRO' },
    { role: 'ciso', path: '/how-to-become-fractional-ciso', label: 'Become a CISO' },
    { role: 'cpo', path: '/how-to-become-fractional-cpo', label: 'Become a CPO' },
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
        </div>
      </div>
    </section>
  );
}
