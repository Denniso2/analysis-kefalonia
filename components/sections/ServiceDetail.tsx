import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import Breadcrumb from '@/components/Breadcrumb';
import FaqAccordion from '@/components/sections/FaqAccordion';
import { CheckIcon, ArrowRightIcon, BadgeIcon, PhoneIcon } from '@/components/Icons';
import { type Locale, type Dictionary, type ServiceDetail as SD, pagePath, serviceDetailPath, callPhone } from '@/lib/i18n';

export default function ServiceDetail({
  locale,
  dict,
  service,
}: {
  locale: Locale;
  dict: Dictionary;
  service: SD;
}) {
  const ui = dict.serviceUi;

  const r = dict.services.items.find((s) => s.slug === service.relatedSlug)!;
  const related = { href: serviceDetailPath(locale, r.slug), title: r.title };

  return (
    <>
      {/* Hero + breadcrumb */}
      <section className="relative overflow-hidden bg-navy px-5 pb-16 pt-32 md:pb-20 md:pt-40">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navydeep via-navy to-navy" />
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-[45vmin] w-[80vmin] -translate-x-1/2 rounded-full bg-navysoft/25 blur-[110px]" />
        <div className="container-x relative z-10">
          <Breadcrumb
            items={[
              { label: dict.nav.home, href: pagePath(locale, 'home') },
              { label: dict.nav.services, href: pagePath(locale, 'services') },
              { label: service.navLabel },
            ]}
          />
          <span className="mb-3 mt-6 inline-block text-xs font-bold uppercase tracking-[0.22em] text-primary">
            {service.eyebrow}
          </span>
          <h1 className="page-title">{service.title}</h1>
          <p className="mt-5 max-w-content text-base leading-relaxed text-white/80 md:text-lg">
            {service.intro}
          </p>
        </div>
      </section>

      {/* Overview + figure */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow">{ui.overviewHeading}</span>
            <p className="lead">{service.overview}</p>
          </Reveal>
          <Reveal delay={1}>
            <div className="relative">
              <span aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl bg-teal/10" />
              <Image
                src={service.image}
                alt={service.imageAlt}
                width={1024}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="relative h-auto w-full rounded-2xl object-cover shadow-card"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we cover + how it works */}
      <section className="bg-surface px-5 py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow">{ui.coverHeading}</span>
            <ul className="mt-2 space-y-3">
              {service.cover.map((c) => (
                <li key={c} className="flex gap-3 text-ink">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={1}>
            <span className="eyebrow">{ui.stepsHeading}</span>
            <ol className="mt-2 space-y-5">
              {service.steps.map((st, i) => (
                <li key={st.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-heading">{st.title}</h3>
                    <p className="mt-1 leading-relaxed text-ink">{st.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Safety callout */}
      <section className="bg-white px-5 py-12 md:py-16">
        <div className="container-x">
          <Reveal>
            <div className="flex gap-4 rounded-2xl border border-line bg-surface p-6 md:p-8">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green/10 text-green">
                <BadgeIcon className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-heading">{ui.safetyHeading}</h2>
                <p className="mt-1.5 leading-relaxed text-ink">{service.safety}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-5 pb-16 md:pb-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="section-title text-center">{ui.faqHeading}</h2>
              <div className="mt-8">
                <FaqAccordion items={service.faq} locale={locale} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related service */}
      <section className="bg-surface px-5 py-12 md:py-16">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">{ui.relatedHeading}</span>
            <Link
              href={related.href}
              className="group mt-2 flex items-center justify-between gap-4 rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cardhover"
            >
              <span className="text-lg font-bold text-heading">{related.title}</span>
              <ArrowRightIcon className="h-5 w-5 shrink-0 text-teal transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy px-5 py-16 text-center text-white md:py-20">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy to-navydeep" />
        <div className="container-x relative z-10 mx-auto max-w-cta">
          <Reveal>
            <h2 className="text-[26px] font-bold text-white md:text-[32px]">{ui.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/85">{ui.ctaText}</p>
            <div className="mt-7 flex w-full max-w-btnrow flex-col items-center justify-center gap-4 md:max-w-none md:flex-row">
              {/* Primary: tap-to-call — the fastest path to an offer. */}
              <a href={`tel:${callPhone.tel}`} className="btn btn-solid-light">
                <PhoneIcon className="h-4 w-4" />
                {ui.ctaCall} · {callPhone.display}
              </a>
              {/* Secondary: contact page (info + message form). */}
              <Link href={pagePath(locale, 'contact')} className="btn btn-outline-light">
                {ui.ctaButton}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
