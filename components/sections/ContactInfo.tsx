import Reveal from '@/components/Reveal';
import { PhoneIcon, MailIcon, PinIcon, ClockIcon } from '@/components/Icons';
import { type Dictionary, contactData, callPhone } from '@/lib/i18n';

export default function ContactInfo({ dict }: { dict: Dictionary }) {
  const c = dict.contact;

  return (
    <section className="bg-surface px-5 py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left: heading, primary actions, info cards (the hero already introduces the page) */}
          <Reveal>
            <h2 className="section-title">{c.getInTouch}</h2>

            {/* Primary actions — one tap to call or email */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a className="btn btn-primary w-full sm:w-auto" href={`tel:${callPhone.tel}`}>
                <PhoneIcon className="h-4 w-4" />
                {c.callCta} · {callPhone.display}
              </a>
              <a
                className="btn w-full border-teal bg-white text-teal transition-colors hover:bg-teal hover:text-white sm:w-auto"
                href={`mailto:${contactData.email}`}
              >
                <MailIcon className="h-4 w-4" />
                {c.emailCta}
              </a>
            </div>

            {/* Info cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <InfoCard icon={<PhoneIcon className="h-5 w-5" />} label={c.numbersLabel}>
                <p>
                  {c.shopLabel}:{' '}
                  <a className="hover:text-teal" href={`tel:${contactData.shopPhone.tel}`}>
                    {contactData.shopPhone.display}
                  </a>
                </p>
                <p>
                  {c.mobileLabel}:{' '}
                  <a className="hover:text-teal" href={`tel:${contactData.mobile1.tel}`}>
                    {contactData.mobile1.display}
                  </a>
                  {', '}
                  <a className="hover:text-teal" href={`tel:${contactData.mobile2.tel}`}>
                    {contactData.mobile2.display}
                  </a>
                </p>
              </InfoCard>

              <InfoCard icon={<MailIcon className="h-5 w-5" />} label={c.emailLabel}>
                <a className="break-words hover:text-teal" href={`mailto:${contactData.email}`}>
                  {contactData.email}
                </a>
              </InfoCard>

              <InfoCard icon={<PinIcon className="h-5 w-5" />} label={c.addressLabel}>
                <address className="not-italic">{c.address}</address>
              </InfoCard>

              <InfoCard icon={<ClockIcon className="h-5 w-5" />} label={c.hoursLabel}>
                <p>{c.hoursWeek}</p>
                <p>{c.hoursSunday}</p>
              </InfoCard>
            </div>
          </Reveal>

          {/* Right: map fills the column */}
          <Reveal delay={1}>
            <div className="h-[420px] overflow-hidden rounded-2xl border border-line shadow-card sm:h-[480px] lg:h-[560px]">
              <iframe
                title={c.mapTitle}
                src={contactData.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
                style={{ border: 0, display: 'block' }}
              />
            </div>
            <a
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:underline"
              href={contactData.mapLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PinIcon className="h-4 w-4" />
              {c.mapCta}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
        {icon}
      </span>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-inksoft">{label}</h3>
        <div className="mt-1 space-y-0.5 text-base leading-relaxed text-ink">{children}</div>
      </div>
    </div>
  );
}
