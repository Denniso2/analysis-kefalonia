'use client';

import { useEffect } from 'react';

/**
 * Root entry. Static export can't do server redirects, so we send users to the
 * default locale via a client redirect, with a <meta refresh> + link fallback.
 */
export default function RootRedirect() {
  useEffect(() => {
    window.location.replace('/en/');
  }, []);

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
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <meta httpEquiv="refresh" content="0; url=/en/" />
      <p>
        Redirecting to{' '}
        <a href="/en/" style={{ color: '#6EC1E4', textDecoration: 'underline' }}>
          ANALYSIS
        </a>
        …
      </p>
    </main>
  );
}
