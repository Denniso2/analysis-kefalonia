'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { PhoneIcon, GlobeIcon } from '@/components/Icons';
import {
  type Locale,
  type Dictionary,
  pagePath,
  callPhone,
  locales,
  dictionaries,
} from '@/lib/i18n';

/** Short label shown inside the language toggle (same on both locales). */
const LOCALE_SHORT: Record<Locale, string> = { en: 'EN', el: 'ΕΛ' };

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() || `/${locale}/`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Scroll-linked 0→1 used to gradually reveal the home wordmark as you scroll the hero.
  const [scrollReveal, setScrollReveal] = useState(0);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Shrink + strengthen the header once scrolled, and track scroll progress so the home
  // wordmark can fade in gradually (rAF-coalesced to one update per frame).
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        // Fade in across roughly the first 45% of a viewport of scrolling.
        const distance = Math.max(240, window.innerHeight * 0.45);
        setScrollReveal(Math.min(1, y / distance));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const norm = (p: string) => (p.endsWith('/') ? p : `${p}/`);
  const here = norm(pathname);
  const isActive = (href: string) => here === norm(href);

  // On the landing page the hero already shows the "ANALYSIS" wordmark, so the header
  // wordmark fades in gradually with scroll (the drop logomark stays) — avoids showing
  // the name twice over the hero. Other pages always show it.
  const isHome = isActive(pagePath(locale, 'home'));
  const wordmarkOpacity = isHome ? scrollReveal : 1;

  // Twin of the current page in another locale (keeps you on the same page).
  const twinFor = (loc: Locale) =>
    norm(pathname).replace(/^\/(en|el)(\/|$)/, `/${loc}$2`) || `/${loc}/`;

  const navLinks: { href: string; label: string }[] = [
    { href: pagePath(locale, 'home'), label: dict.nav.home },
    { href: pagePath(locale, 'services'), label: dict.nav.services },
    { href: pagePath(locale, 'faq'), label: dict.nav.faq },
    { href: pagePath(locale, 'contact'), label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-all duration-300 ${
        scrolled
          ? 'bg-navy/95 shadow-header backdrop-blur supports-[backdrop-filter]:bg-navy/80'
          : 'bg-navy/90 supports-[backdrop-filter]:bg-navy/55'
      }`}
    >
      <div
        className={`container-x flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-[64px]' : 'h-[88px]'
        }`}
      >
        {/* Brand */}
        <Link
          href={pagePath(locale, 'home')}
          className="flex items-center gap-3"
          aria-label={`${dict.brand} — ${dict.nav.home}`}
        >
          <Image
            src="/images/drop-white.png"
            alt=""
            width={62}
            height={53}
            priority
            className={`w-auto transition-all duration-300 ${scrolled ? 'h-9' : 'h-12 md:h-14'}`}
          />
          <span
            aria-hidden={wordmarkOpacity < 0.05}
            style={{ opacity: wordmarkOpacity }}
            className={`font-display font-semibold tracking-wide transition-[font-size] duration-300 ${
              scrolled ? 'text-[22px] md:text-[24px]' : 'text-[26px] md:text-[31px]'
            }`}
          >
            {dict.brand}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={`nav-link text-base hover:text-primary ${
                isActive(l.href) ? 'text-primary' : 'text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}

          <LangToggle locale={locale} twinFor={twinFor} label={dict.footer.chooseLanguage} />

          <a
            href={`tel:${callPhone.tel}`}
            className="ml-1 inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-5 py-2 text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-navy"
          >
            <PhoneIcon className="h-4 w-4" />
            {callPhone.display}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <BurgerIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        aria-label="Primary mobile"
        className={`overflow-hidden border-t border-white/10 bg-navy lg:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        } transition-[max-height] duration-300 ease-in-out`}
      >
        <ul className="container-x flex flex-col py-2">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`block py-3 text-base ${
                  isActive(l.href) ? 'text-primary' : 'text-white'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="py-3">
            <LangToggle locale={locale} twinFor={twinFor} label={dict.footer.chooseLanguage} />
          </li>
          <li>
            <a
              href={`tel:${callPhone.tel}`}
              className="mt-2 inline-flex items-center gap-2 rounded-full border-2 border-white px-5 py-2.5 text-sm font-semibold tracking-wide"
            >
              <PhoneIcon className="h-4 w-4" />
              {dict.header.callLabel}: {callPhone.display}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

/** Minimal language toggle: globe + EN / ΕΛ, current locale solid, the other dimmed. */
function LangToggle({
  locale,
  twinFor,
  label,
}: {
  locale: Locale;
  twinFor: (loc: Locale) => string;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex items-center gap-2 text-sm">
      <GlobeIcon aria-hidden="true" className="h-4 w-4 text-white/55" />
      <span className="inline-flex items-center gap-1.5">
        {locales.map((loc, i) => (
          <Fragment key={loc}>
            {i > 0 && (
              <span aria-hidden="true" className="text-white/25">
                /
              </span>
            )}
            {loc === locale ? (
              <span aria-current="true" className="font-semibold text-white">
                {LOCALE_SHORT[loc]}
              </span>
            ) : (
              <Link
                href={twinFor(loc)}
                hrefLang={loc}
                aria-label={dictionaries[loc].langName}
                className="text-white/55 transition-colors hover:text-white"
              >
                {LOCALE_SHORT[loc]}
              </Link>
            )}
          </Fragment>
        ))}
      </span>
    </div>
  );
}

function BurgerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
