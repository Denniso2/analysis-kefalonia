import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

// Inter is the UI/body + heading typeface. It ships a `greek` subset, so the
// Greek (/el) and English (/en) pages render in the SAME font — fixing the
// original's Montserrat-has-no-Greek fallback to a system font.
const inter = Inter({
  subsets: ['latin', 'latin-ext', 'greek'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: false,
  variable: '--font-inter',
});

// Montserrat is kept only for the brand wordmark (always the Latin "ANALYSIS").
const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

// Defaults are Greek — the primary market — and apply to whatever doesn't hit a
// locale page (the bare domain's redirect shell, the 404 page). Locale pages
// override all of this in lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL('https://analysiskefalonia.com'),
  title: {
    default: 'ANALYSIS Κεφαλονιά – Απολυμάνσεις, Απεντομώσεις & Χημικές Αναλύσεις',
    template: '%s',
  },
  description:
    '30 χρόνια στον χώρο των απολυμάνσεων και των χημικών αναλύσεων σε Κεφαλονιά και Ιθάκη, με έδρα το Αργοστόλι — από τον Χημικό-Οινολόγο Ιάκωβο Πολύζο.',
  icons: {
    icon: [
      { url: '/images/drop-white-150x150.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/drop-white.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/images/drop-white.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'ANALYSIS',
    title: 'ANALYSIS Κεφαλονιά – Απολυμάνσεις, Απεντομώσεις & Χημικές Αναλύσεις',
    description:
      '30 χρόνια στον χώρο των απολυμάνσεων και των χημικών αναλύσεων σε Κεφαλονιά και Ιθάκη, με έδρα το Αργοστόλι — από τον Χημικό-Οινολόγο Ιάκωβο Πολύζο.',
    images: [{ url: '/images/og-el.jpg', width: 1200, height: 630, alt: 'ANALYSIS — Κεφαλονιά' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-el.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Greek is the static default; scripts/finalize.mjs rewrites lang="en" onto the
    // exported English pages, and SetHtmlLang corrects it at runtime per locale.
    <html lang="el" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        {/* Without JS, never keep scroll-reveal content hidden. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
