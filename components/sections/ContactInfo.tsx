import Reveal from '@/components/Reveal';
import { PhoneIcon, MailIcon, PinIcon, ClockIcon } from '@/components/Icons';
import { type Dictionary, contactData, callPhone } from '@/lib/i18n';

export default function ContactInfo({ dict }: { dict: Dictionary }) {
  const c = dict.contact;

  return (
    <section className="bg-surface px-5 py-20 md:py-28">
      <div className="container-x">
        {/* Header */}
        <Reveal className="mx-auto max-w-content text-center">
          <span className="eyebrow eyebrow-center">{c.infoEyebrow}</span>
          <h2 className="section-title">{c.getInTouch}</h2>
          <p className="lead mx-auto mt-4 max-w-content">{c.subtitle}</p>
        </Reveal>

        {/* Primary actions — one tap to call or email */}
        <Reveal
          delay={1}
          className="mt-9 flex flex-col items-center justify-center gap-3 md:flex-row"
        >
          <a className="btn btn-primary w-full md:w-auto" href={`tel:${callPhone.tel}`}>
            <PhoneIcon className="h-4 w-4" />
            {c.callCta} · {callPhone.display}
          </a>
          <a
            className="btn w-full border-teal bg-white text-teal transition-colors hover:bg-teal hover:text-white md:w-auto"
            href={`mailto:${contactData.email}`}
          >
            <MailIcon className="h-4 w-4" />
            {c.emailCta}
          </a>
        </Reveal>

        {/* Info cards */}
        <Reveal className="mt-14 grid gap-5 md:grid-cols-2">
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
        </Reveal>
      </div>

      {/* Map */}
      <div className="container-x mt-12">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line shadow-card">
            <iframe
              title={c.mapTitle}
              src={contactData.mapEmbed}
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
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
