import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { PestIcon, FlaskIcon, SprayIcon, WineIcon, ArrowRightIcon } from '@/components/Icons';
import { type Locale, type Dictionary, pagePath } from '@/lib/i18n';

// Home card id → service detail slug.
const SLUGS: Record<string, string> = {
  pest: 'pest-control',
  chem: 'chemical-analysis',
  disinfection: 'disinfection',
  wine: 'wine-analysis',
};

const ICONS: Record<string, typeof PestIcon> = {
  pest: PestIcon,
  chem: FlaskIcon,
  disinfection: SprayIcon,
  wine: WineIcon,
};

export default function ServiceCards({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const servicesBase = pagePath(locale, 'services');
  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-content text-center">
          <span className="eyebrow eyebrow-center">{dict.home.servicesEyebrow}</span>
          <h2 className="section-title">{dict.home.servicesTitle}</h2>
          <p className="lead mx-auto mt-4 max-w-content">{dict.home.servicesIntro}</p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.home.cards.map((card, i) => {
            const Icon = ICONS[card.id] ?? PestIcon;
            return (
              <Reveal key={card.id} delay={(i % 4) as 0 | 1 | 2 | 3} className="h-full">
                <Link
                  href={`${servicesBase}${SLUGS[card.id] ?? ''}/`}
                  className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover md:min-h-[400px]"
                >
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Bottom-up gradient so the title stays readable; deepens on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navydeep/90 via-navy/45 to-navy/5 transition-opacity duration-500 group-hover:from-navydeep group-hover:via-navy/60"
                  />
                  <div className="relative z-10 p-6">
                    <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-[24px] font-bold leading-tight text-white drop-shadow-sm">
                      {card.title}
                    </h3>
                    <span className="mt-3 inline-flex translate-y-1 items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {dict.home.cardCta}
                      <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
