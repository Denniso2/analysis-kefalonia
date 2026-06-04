'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PhoneIcon } from '@/components/Icons';
import { type Locale, type Dictionary, pagePath, callPhone } from '@/lib/i18n';

const DISMISS_KEY = 'analysis:callbar-dismissed';

/**
 * Mobile-only sticky tap-to-call bar — deliberately unobtrusive:
 *  - desktop already shows a persistent call button in the header, so this is `lg:hidden`;
 *  - it stays off-screen on first paint and only slides up once you scroll past the hero,
 *    so it never blocks the first impression;
 *  - it auto-hides as the footer (which carries its own phone number) scrolls into view;
 *  - it's dismissible, and a dismissal is remembered for the rest of the visit;
 *  - it's hidden on the contact page, where the full contact details already live.
 */
export default function CallBar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() || `/${locale}/`;
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // The contact page already presents every number + the form, so the bar adds nothing there.
  const onContact = pathname.startsWith(pagePath(locale, 'contact').replace(/\/$/, ''));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(DISMISS_KEY) === '1') {
      setDismissed(true);
      return;
    }

    // Computed straight from the scroll event — the work is one rect read + arithmetic,
    // and React bails on an unchanged boolean, so this never causes a needless re-render.
    const update = () => {
      // Past the hero: roughly half a viewport (min 320px) of scrolling.
      const past = window.scrollY > Math.max(320, window.innerHeight * 0.55);
      // Retreat once the footer (which carries its own number) starts entering the viewport.
      const footer = document.querySelector('footer');
      const footerInView = footer
        ? footer.getBoundingClientRect().top < window.innerHeight - 40
        : false;
      setVisible(past && !footerInView);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (onContact || dismissed) return null;

  const shown = visible;

  return (
    <div
      role="region"
      aria-label={`${dict.header.callLabel} ${callPhone.display}`}
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out lg:hidden ${
        shown ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
    >
      <div
        className="flex items-stretch bg-teal text-white shadow-[0_-6px_20px_-8px_rgba(11,13,53,0.55)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <a
          href={`tel:${callPhone.tel}`}
          tabIndex={shown ? undefined : -1}
          className="flex flex-1 items-center justify-center gap-2.5 py-3.5 text-[15px] font-semibold tracking-wide"
        >
          <PhoneIcon className="h-5 w-5" />
          <span>
            {dict.header.callLabel} · {callPhone.display}
          </span>
        </a>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(DISMISS_KEY, '1');
            setDismissed(true);
          }}
          tabIndex={shown ? undefined : -1}
          aria-label={dict.header.dismiss}
          className="flex items-center border-l border-white/20 px-4 text-white/70 transition-colors hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
