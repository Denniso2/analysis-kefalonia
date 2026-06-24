import Link from 'next/link';
import Image from 'next/image';
import { PhoneIcon, ArrowRightIcon } from '@/components/Icons';
import { callPhone } from '@/lib/i18n';

/**
 * 404 page. In `output: 'export'` this is emitted as `out/404.html`, which GitHub
 * Pages serves (with a real 404 status) for any path that isn't a built page.
 *
 * It renders under the ROOT layout only — NOT app/[lang]/layout.tsx — so there is no
 * Header/Footer/CallBar and, crucially, no known locale: a 404 can fire at /el/typo,
 * /en/typo or /random alike. So the page is bilingual, Greek-first (the primary local
 * audience), and never auto-redirects — silently bouncing a lost visitor to the home
 * page is more disorienting than offering them a clear choice.
 *
 * Every asset and link is an absolute path (the site has no basePath), so the logo and
 * the /el/ /en/ links resolve correctly even when the bad URL is several levels deep.
 */
export default function NotFound() {
  return (
    // `lang-el` tightens the .btn letter-spacing for the Greek all-caps labels below
    // (the 1.5px tracking tuned for Latin reads as gappy on Greek caps — see globals.css).
    <main className="lang-el relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-5 py-24 text-center text-white">
      {/* Brand-consistent backdrop: navy gradient + a soft navysoft glow, like PageHero. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navydeep via-navy to-navydeep"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[55vmin] w-[85vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navysoft/25 blur-[120px]"
      />

      <div className="container-x relative z-10 flex max-w-content animate-fade-up flex-col items-center">
        {/* Brand — links to the Greek home (the canonical default destination). */}
        <Link href="/el/" aria-label="ANALYSIS" className="mb-12 inline-flex items-center gap-3">
          <Image
            src="/images/drop-white-200.png"
            alt=""
            width={200}
            height={171}
            priority
            className="h-12 w-auto md:h-14"
          />
          <span className="font-display text-[26px] font-semibold tracking-wide md:text-[31px]">
            ANALYSIS
          </span>
        </Link>

        {/* Oversized 404, with a subtle white→cyan gradient fill. */}
        <p
          aria-hidden="true"
          className="bg-gradient-to-b from-white to-primary/60 bg-clip-text text-[96px] font-extrabold leading-none tracking-tight text-transparent md:text-[140px]"
        >
          404
        </p>

        {/* Greek — primary audience. `text-white` is required: the global base rule
            colours every h1 with the near-black `heading` token, which would be all
            but invisible on navy (the hero titles override it the same way). */}
        <h1 className="mt-4 text-2xl font-bold text-white md:text-3xl">Η σελίδα δεν βρέθηκε</h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
          Λυπούμαστε, η σελίδα που ζητήσατε δεν υπάρχει ή έχει μετακινηθεί.
        </p>

        <div className="mt-8 flex w-full max-w-btnrow flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <Link href="/el/" className="btn btn-primary">
            Αρχική σελίδα
          </Link>
          <Link href="/el/contact/" className="btn btn-outline-light">
            Επικοινωνία
          </Link>
        </div>

        {/* English — concise fallback for the island's foreign visitors. */}
        <p className="mt-12 text-sm leading-relaxed text-white/55">
          Page not found.{' '}
          <Link
            href="/en/"
            hrefLang="en"
            className="group inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline"
          >
            Go to the English homepage
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>

        {/* Locale-neutral phone fallback — the site is call-centric, and a real human
            is the surest recovery for someone who hit a dead link. */}
        <a
          href={`tel:${callPhone.tel}`}
          className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <PhoneIcon className="h-4 w-4" />
          Καλέστε μας / Call us: {callPhone.display}
        </a>
      </div>
    </main>
  );
}
