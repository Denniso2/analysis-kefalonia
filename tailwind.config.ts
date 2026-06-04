import type { Config } from 'tailwindcss';

/**
 * Uses Tailwind's default breakpoint scale (sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536).
 * Mobile-first: base styles target mobile, `md` = tablet-up, `lg` = desktop-up.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#191970', // brand midnight blue — hero/section/overlay
        navydeep: '#0b0d35', // darker stop for hero gradients
        navysoft: '#2a2aa0', // lighter stop for hero gradients
        primary: '#6EC1E4',
        cyan: '#6EC1E4', // alias — accent on dark surfaces
        secondary: '#54595F',
        accent: '#61CE70',
        teal: '#147a8a', // primary interactive accent on light surfaces (AA on white)
        tealdark: '#0e5d6a', // hover/darker teal
        brandblue: '#4054B2',
        brandgreen: '#23A455',
        green: '#23A455', // eco / success accent
        ink: '#384152', // body text — darkened from #7A7A7A (was ~4.3:1, now AA-compliant)
        inksoft: '#6b7280', // secondary / supporting text
        heading: '#0f172a', // headings
        surface: '#f5f7fb', // alternating section tint
        line: '#e6e9f2', // hairline borders
        overlay: '#153243', // CTA parallax overlay
      },
      fontFamily: {
        // Inter covers Latin + Greek cleanly (both locales render identically).
        sans: [
          'var(--font-inter)',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        // Montserrat keeps the brand wordmark (always the Latin "ANALYSIS").
        display: [
          'var(--font-montserrat)',
          'var(--font-inter)',
          'system-ui',
          'sans-serif',
        ],
      },
      maxWidth: {
        container: '1140px',
        content: '700px',
        cta: '600px',
        btnrow: '400px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -12px rgba(15, 23, 42, 0.18)',
        cardhover: '0 12px 32px -8px rgba(15, 23, 42, 0.28)',
        header: '0 6px 24px -12px rgba(11, 13, 53, 0.6)',
      },
      transitionDuration: {
        '400': '400ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scroll-cue': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.65' },
          '50%': { transform: 'translateY(7px)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'scroll-cue': 'scroll-cue 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
