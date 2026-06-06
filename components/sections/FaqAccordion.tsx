import Link from 'next/link';
import { ChevronDownIcon } from '@/components/Icons';
import { type Locale, type QA, serviceDetailPath } from '@/lib/i18n';

/** Accessible, no-JS FAQ list using native <details>. Content stays in the DOM (crawlable). */
export default function FaqAccordion({ items, locale }: { items: QA[]; locale: Locale }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      {items.map((qa) => (
        <details key={qa.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-heading marker:content-none [&::-webkit-details-marker]:hidden">
            {qa.q}
            <ChevronDownIcon className="h-5 w-5 shrink-0 text-teal transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-5 leading-relaxed text-ink">{renderAnswer(qa, locale)}</div>
        </details>
      ))}
    </div>
  );
}

/** Render the answer, turning an optional referral phrase into a link to another service page. */
function renderAnswer(qa: QA, locale: Locale) {
  if (!qa.link) return qa.a;
  const i = qa.a.indexOf(qa.link.phrase);
  if (i === -1) return qa.a;
  return (
    <>
      {qa.a.slice(0, i)}
      <Link
        href={serviceDetailPath(locale, qa.link.to)}
        className="font-medium text-teal underline underline-offset-2 hover:no-underline"
      >
        {qa.link.phrase}
      </Link>
      {qa.a.slice(i + qa.link.phrase.length)}
    </>
  );
}
