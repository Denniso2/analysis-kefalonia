import Reveal from '@/components/Reveal';
import { PhoneIcon } from '@/components/Icons';
import { type Dictionary, callPhone } from '@/lib/i18n';

export default function CtaParallax({ dict }: { dict: Dictionary }) {
  return (
    <section
      className="relative bg-navy bg-cover bg-center bg-scroll px-6 py-24 text-center text-white md:py-32 lg:bg-fixed"
      style={{ backgroundImage: "url('/images/cta-laboratory.webp')" }}
    >
      {/* #153243 overlay — deepened toward the edges for legibility. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-overlay/70 via-overlay/55 to-overlay/80"
      />
      <div className="relative z-10 mx-auto max-w-cta">
        <Reveal>
          <h2 className="text-[28px] font-bold leading-tight text-white md:text-[36px]">
            {dict.home.ctaTitle}
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85">
            {dict.home.ctaText}
          </p>
        </Reveal>
        <Reveal delay={2}>
          <a href={`tel:${callPhone.tel}`} className="btn btn-solid-light mt-9">
            <PhoneIcon className="h-4 w-4" />
            {dict.home.ctaButton}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
