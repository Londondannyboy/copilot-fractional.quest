/**
 * BreadcrumbSchema Component
 *
 * Adds JSON-LD BreadcrumbList schema for rich snippet breadcrumbs in search results.
 * Accepts the same breadcrumb format used by BreadcrumbsLight visual component.
 */

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://fractional.quest${item.href}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
