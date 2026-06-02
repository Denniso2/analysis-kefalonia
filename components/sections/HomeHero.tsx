import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { ArrowRightIcon, ChevronDownIcon } from '@/components/Icons';
import { type Locale, type Dictionary, pagePath } from '@/lib/i18n';

export default function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy px-5 pb-24 pt-32 text-center text-white md:pt-28">
      {/* Depth: vertical navy gradient + soft radial glow behind the logo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navydeep via-navy to-navydeep"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[38%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navysoft/30 blur-[120px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center">
        <Reveal>
          <Image
            src="/images/analysis-big-logo.png"
            alt="ANALYSIS"
            width={750}
            height={560}
            priority
            className="mx-auto h-auto w-[240px] md:w-[440px] lg:w-[700px]"
          />
        </Reveal>

        <Reveal delay={1}>
          <h1 className="mt-8 text-[22px] font-bold leading-tight tracking-tight text-white md:text-[28px]">
            {dict.home.heroTitle}
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <p className="mx-auto mt-4 max-w-xl text-base font-normal leading-relaxed text-white/85">
            {dict.home.heroSubtitle}
          </p>
        </Reveal>

        <Reveal delay={2}>
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
