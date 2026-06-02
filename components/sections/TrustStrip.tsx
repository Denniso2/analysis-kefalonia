import Reveal from '@/components/Reveal';
import { BadgeIcon, LeafIcon, ClockIcon, PinIcon } from '@/components/Icons';
import { type Dictionary } from '@/lib/i18n';

const ICONS = [BadgeIcon, LeafIcon, ClockIcon, PinIcon] as const;

export default function TrustStrip({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-line bg-white py-12 md:py-16">
      <div className="container-x grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {dict.home.trust.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <Reveal key={item.title} delay={(i % 3) as 0 | 1 | 2}>
              <div className="flex flex-col items-start gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-[17px] font-bold text-heading">{item.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{item.text}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
