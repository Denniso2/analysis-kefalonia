import type { Metadata } from 'next';

/**
 * Root entry (/). Static export can't redirect on the server and Next middleware
 * doesn't run for `output: 'export'`, so we detect the visitor's preferred
 * language in the browser: Greek-speaking browsers go to /el/, everyone else to
 * /en/ (English is the international fallback for the island's foreign visitors).
 *
 * The detection runs as an inline script at HTML-parse time — before React
 * hydrates — so the redirect is instant with no English-then-Greek flash and no
 * race with a <meta refresh>. <noscript> covers the rare JS-off visitor.
 */
const DETECT_AND_REDIRECT = `(function () {
  try {
    var prefs = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || ''];
    var loc = 'en';
    for (var i = 0; i < prefs.length; i++) {
      var tag = String(prefs[i] || '').toLowerCase();
      if (tag.indexOf('el') === 0) { loc = 'el'; break; } // Greek (locals)
      if (tag.indexOf('en') === 0) { loc = 'en'; break; } // English (foreigners)
    }
    window.location.replace('/' + loc + '/');
  } catch (e) {
    window.location.replace('/el/');
  }
})();`;

// The apex redirect shell is indexable (so analysiskefalonia.com/ isn't flagged
// "noindex" in Search Console), but it canonicalises to /en/ and declares hreflang
// alternates so search engines consolidate it to the locale pages instead of indexing
// this thin "Redirecting…" shell. Googlebot follows the client redirect to a locale.
export const metadata: Metadata = {
  alternates: {
    canonical: '/en/',
    languages: {
      en: '/en/',
      el: '/el/',
      'x-default': '/en/',
    },
  },
};

export default function RootRedirect() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#191970',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Runs at parse time, before hydration — instant, flash-free redirect. */}
      <script dangerouslySetInnerHTML={{ __html: DETECT_AND_REDIRECT }} />

      {/* No-JS fallback: send to Greek (the island default) and offer both links. */}
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/el/" />
      </noscript>

      <p>
        Μετάβαση… / Redirecting…{' '}
        <a href="/el/" style={{ color: '#6EC1E4', textDecoration: 'underline' }}>
          Ελληνικά
        </a>{' '}
        ·{' '}
        <a href="/en/" style={{ color: '#6EC1E4', textDecoration: 'underline' }}>
          English
        </a>
      </p>
    </main>
  );
}
