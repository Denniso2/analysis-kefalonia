'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PhoneIcon, MailIcon } from '@/components/Icons';
import {
  type Locale,
  type Dictionary,
  pagePath,
  locales,
  dictionaries,
  contactData,
} from '@/lib/i18n';

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() || `/${locale}/`;
  const norm = (p: string) => (p.endsWith('/') ? p : `${p}/`);
  const twinFor = (loc: Locale) =>
    norm(pathname).replace(/^\/(en|el)(\/|$)/, `/${loc}$2`) || `/${loc}/`;

  const sitemap = [
    { href: pagePath(locale, 'home'), label: dict.nav.home },
    { href: pagePath(locale, 'services'), label: dict.nav.services },
    { href: pagePath(locale, 'faq'), label: dict.nav.faq },
    { href: pagePath(locale, 'contact'), label: dict.nav.contact },
  ];

  return (
    <footer className="bg-navydeep text-white/70">
      <div className="container-x grid gap-10 py-16 md:grid-cols-3">
        {/* Brand + address + quick contact */}
        <div>
          <Link
            href={pagePath(locale, 'home')}
            className="flex items-center gap-3"
            aria-label={dict.brand}
          >
            <Image src="/images/drop-white.png" alt="" width={62} height={53} className="h-10 w-auto" />
            <span className="font-display text-[26px] font-semibold tracking-wide text-white">
              {dict.brand}
            </span>
          </Link>
          <address className="mt-5 not-italic leading-relaxed">{dict.footer.address}</address>
          <div className="mt-4 space-y-2">
            <a
              href={`tel:${contactData.mobile1.tel}`}
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <PhoneIcon className="h-4 w-4" />
              {contactData.mobile1.display}
            </a>
            <a
              href={`mailto:${contactData.email}`}
              className="flex items-center gap-2 break-all transition-colors hover:text-primary"
            >
              <MailIcon className="h-4 w-4" />
              {contactData.email}
            </a>
          </div>
        </div>

        {/* Site map */}
        <nav aria-label={dict.footer.sitemap}>
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
            {dict.footer.sitemap}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {sitemap.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language chooser */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
            {dict.footer.chooseLanguage}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {locales.map((loc) => (
              <li key={loc}>
                <Link
                  href={twinFor(loc)}
                  hrefLang={loc}
                  aria-current={loc === locale ? 'true' : undefined}
                  className={`transition-colors hover:text-primary ${
                    loc === locale ? 'font-semibold text-white' : ''
                  }`}
                >
                  {dictionaries[loc].langName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-center text-sm text-white/55">
          {dict.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
