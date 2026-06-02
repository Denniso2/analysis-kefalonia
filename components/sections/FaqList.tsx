import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/sections/FaqAccordion';
import { type Dictionary } from '@/lib/i18n';

export default function FaqList({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-surface px-5 py-16 md:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl space-y-12">
          {dict.faqPage.groups.map((group) => (
            <Reveal key={group.category}>
              <h2 className="mb-5 text-xl font-bold text-heading">{group.category}</h2>
              <FaqAccordion items={group.items} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
