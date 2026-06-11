import type { Metadata } from 'next';

/**
 * Root entry (/). Static export can't redirect on the server and Next middleware
 * doesn't run for `output: 'export'`, so we detect the visitor's preferred
 * language in the browser.
 *
 * Greek wins if it appears ANYWHERE in the preference list, not just first:
 * many Greek locals run their phone/browser in English (prefs like [en-US, el]),
 * and they're the primary audience — a true foreign visitor has no `el` entry
 * at all. Everyone without Greek goes to /en/, the international fallback.
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
    var loc = 'en'; // international fallback (no Greek anywhere in the list)
    for (var i = 0; i < prefs.length; i++) {
      if (String(prefs[i] || '').toLowerCase().indexOf('el') === 0) { loc = 'el'; break; }
    }
    window.location.replace('/' + loc + '/');
  } catch (e) {
    window.location.replace('/el/');
  }
})();`;

// The apex redirect shell is indexable (so analysiskefalonia.com/ isn't flagged
// "noindex" in Search Console), but it canonicalises to /el/ — Greek locals are the
// primary market, so links to the bare domain should consolidate to the Greek home —
// and declares hreflang alternates so search engines serve each searcher their
// language. x-default stays /en/: for searchers matching neither locale (foreign
// tourists), English is the right fallback. Googlebot follows the client redirect.
export const metadata: Metadata = {
  alternates: {
    canonical: '/el/',
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
