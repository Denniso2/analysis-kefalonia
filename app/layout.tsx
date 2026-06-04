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
  variable: '--font-inter',
});

// Montserrat is kept only for the brand wordmark (always the Latin "ANALYSIS").
const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://analysiskefalonia.com'),
  title: {
    default: 'ANALYSIS – Pest control – Disinfection from pathogens',
    template: '%s',
  },
  description:
    '30 years in the area of pest control and chemical analysis in Kefalonia by Chemist-Oenologist Iakovos Polyzos',
  icons: {
    icon: [
      { url: '/images/drop-white-150x150.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/drop-white.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/images/drop-white.png',
  },
  // Default social card for shares that don't hit a locale page (e.g. the bare
  // domain's redirect shell). Locale pages override these in lib/seo.ts.
  openGraph: {
    type: 'website',
    siteName: 'ANALYSIS',
    title: 'ANALYSIS – Pest control – Disinfection from pathogens',
    description:
      '30 years in the area of pest control and chemical analysis in Kefalonia by Chemist-Oenologist Iakovos Polyzos',
    images: [{ url: '/images/og-en.jpg', width: 1200, height: 630, alt: 'ANALYSIS — Kefalonia' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-en.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
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
