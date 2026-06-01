import Link from 'next/link';

export interface Crumb {
  label: string;
  href?: string; // last crumb has no href (current page)
}

/** Visual breadcrumb trail (BreadcrumbList JSON-LD is emitted separately by the page). */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-white/70">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {c.href ? (
              <Link href={c.href} className="transition-colors hover:text-white">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-white">
                {c.label}
              </span>
            )}
            {i < items.length - 1 && (
              <span aria-hidden="true" className="text-white/40">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
