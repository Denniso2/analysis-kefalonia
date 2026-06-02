import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { PestIcon, FlaskIcon, SprayIcon, WineIcon, ArrowRightIcon } from '@/components/Icons';
import { type Locale, type Dictionary, type ServiceSlug, serviceDetailPath } from '@/lib/i18n';

const ICONS: Record<ServiceSlug, typeof PestIcon> = {
  'pest-control': PestIcon,
  'chemical-analysis': FlaskIcon,
  disinfection: SprayIcon,
  'wine-analysis': WineIcon,
};

export default function ServiceHub({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dict.services.items.map((s, i) => {
          const Icon = ICONS[s.slug] ?? PestIcon;
          return (
            <Reveal key={s.slug} delay={(i % 3) as 0 | 1 | 2} className="h-full">
              <Link
                href={serviceDetailPath(locale, s.slug)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.cardImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-teal backdrop-blur">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-bold text-heading">{s.navLabel}</h2>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink">{s.intro}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-teal">
                    {dict.services.hubCta}
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
