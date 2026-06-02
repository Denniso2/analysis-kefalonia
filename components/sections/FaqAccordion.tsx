import { ChevronDownIcon } from '@/components/Icons';
import { type QA } from '@/lib/i18n';

/** Accessible, no-JS FAQ list using native <details>. Content stays in the DOM (crawlable). */
export default function FaqAccordion({ items }: { items: QA[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      {items.map((qa) => (
        <details key={qa.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-heading marker:content-none [&::-webkit-details-marker]:hidden">
            {qa.q}
            <ChevronDownIcon className="h-5 w-5 shrink-0 text-teal transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-5 leading-relaxed text-ink">{qa.a}</div>
        </details>
      ))}
    </div>
  );
}
