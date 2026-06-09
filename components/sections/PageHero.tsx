import Reveal from '@/components/Reveal';

/** Navy hero used by Services & Contact (large centered title, clears the fixed header). */
export default function PageHero({
  title,
  eyebrow,
  subtitle,
}: {
  title: string;
  eyebrow?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy px-5 pb-20 pt-36 text-center md:pb-28 md:pt-44 lg:pt-48">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navydeep via-navy to-navy"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[50vmin] w-[80vmin] -translate-x-1/2 rounded-full bg-navysoft/25 blur-[110px]"
      />
      <div className="container-x relative z-10">
        <Reveal eager>
          {eyebrow ? (
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.22em] text-primary">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="page-title">{title}</h1>
          {subtitle ? (
            <p className="mx-auto mt-5 max-w-content text-base leading-relaxed text-white/80 md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
