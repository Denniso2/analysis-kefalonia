import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { ArrowRightIcon, ChevronDownIcon } from '@/components/Icons';
import { type Locale, type Dictionary, pagePath } from '@/lib/i18n';

export default function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  // The hero title is the brand name; the source heroTitle is really a list of services,
  // so split it on the " - " / " & " separators and show it as a middot-joined line under
  // the brand. Splitting first also avoids the Greek title wrapping mid-term / dangling
  // a stray hyphen at a line end.
  const services = dict.home.heroTitle.split(/\s+[-–—&]\s+/);

  return (
    <section className="relative flex min-h-[56svh] items-center justify-center overflow-hidden bg-navy px-5 pb-20 pt-32 text-center text-white md:pt-28">
      {/* Depth: vertical navy gradient + soft radial glow behind the headline. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navydeep via-navy to-navydeep"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[38%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navysoft/30 blur-[120px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center">
        <Reveal eager>
          <h1 className="font-display text-[46px] font-bold uppercase leading-none tracking-wide text-white md:text-[68px] lg:text-[84px]">
            {dict.brand}
          </h1>
        </Reveal>

        <Reveal eager delay={1}>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary md:text-base">
            {services.join(' · ')}
          </p>
        </Reveal>

        <Reveal eager delay={2}>
          <p className="mx-auto mt-5 max-w-xl text-base font-normal leading-relaxed text-white/85 md:text-lg">
            {dict.home.heroSubtitle}
          </p>
        </Reveal>

        <Reveal eager delay={2}>
          <div className="mt-9 flex w-full max-w-btnrow flex-col items-center justify-center gap-4 md:max-w-none md:flex-row">
            <Link href={pagePath(locale, 'services')} className="btn btn-outline-light">
              {dict.home.btnServices}
            </Link>
            <Link href={pagePath(locale, 'contact')} className="btn btn-solid-light">
              {dict.home.btnContact}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        aria-label={dict.home.scrollCue}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <ChevronDownIcon className="h-7 w-7 animate-scroll-cue" />
      </a>
    </section>
  );
}
