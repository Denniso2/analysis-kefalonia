import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { ArrowRightIcon } from '@/components/Icons';
import { type Locale, type Dictionary, pagePath } from '@/lib/i18n';

export default function About({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-surface px-5 py-20 md:px-8 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <Reveal>
          <span className="eyebrow">{dict.home.aboutEyebrow}</span>
          <h2 className="section-title">{dict.home.aboutTitle}</h2>
          <p className="mt-5 text-xl font-semibold leading-snug text-heading">
            {dict.home.aboutLead}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink">{dict.home.aboutText}</p>
          <Link href={pagePath(locale, 'contact')} className="btn btn-primary mt-8">
            {dict.home.aboutCta}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>

        {/* Stats panel */}
        <Reveal delay={1}>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-line shadow-card sm:grid-cols-3 lg:grid-cols-1">
            {dict.home.stats.map((stat) => (
              <div key={stat.label} className="bg-white p-7 text-center lg:text-left">
                <div className="text-4xl font-extrabold tracking-tight text-teal md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium leading-snug text-inksoft">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
