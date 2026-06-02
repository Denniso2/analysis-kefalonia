import Reveal from '@/components/Reveal';
import ContactForm from '@/components/sections/ContactForm';
import { PhoneIcon, MailIcon, PinIcon, ClockIcon } from '@/components/Icons';
import { type Dictionary, contactData } from '@/lib/i18n';

export default function ContactInfo({ dict }: { dict: Dictionary }) {
  const c = dict.contact;

  return (
    <section className="bg-surface px-5 py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-content text-center">
          <span className="eyebrow eyebrow-center">{c.infoEyebrow}</span>
          <h2 className="section-title">{c.getInTouch}</h2>
          <p className="lead mx-auto mt-4 max-w-content">{c.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Info cards */}
          <Reveal className="space-y-4">
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

          {/* Form */}
          <Reveal delay={1}>
            <span className="eyebrow">{c.form.eyebrow}</span>
            <h3 className="mb-2 text-2xl font-bold text-heading">{c.form.title}</h3>
            <p className="mb-6 text-base leading-relaxed text-ink">{c.form.intro}</p>
            <ContactForm dict={dict} />
          </Reveal>
        </div>
      </div>

      {/* Map */}
      <div className="container-x mt-16">
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
    <div className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
        {icon}
      </span>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-inksoft">{label}</h3>
        <div className="mt-1 space-y-0.5 text-base leading-relaxed text-ink">{children}</div>
      </div>
    </div>
  );
}
