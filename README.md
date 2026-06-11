# ANALYSIS — Kefalonia (static site)

A statically-exported **Next.js (App Router, TypeScript)** rebuild of
[analysiskefalonia.com](https://analysiskefalonia.com) — ANALYSIS, pest control &
chemical analysis in Kefalonia. Bilingual (Greek `/el` — the primary locale — and
English `/en`), no server required: `npm run build` produces a fully static `out/`
you can host anywhere.

The original is WordPress + Astra + Elementor; this is a clean, accessible,
performance-focused reimplementation that matches it visually and behaviorally.

---

## Stack

- **Next.js 15** (App Router) with `output: 'export'` → static HTML/CSS/JS
- **TypeScript**, **React 19**
- **Tailwind CSS 3** for design tokens & responsive layout
- **next/font** self-hosting **Inter** (body + headings, Latin **and** Greek) plus
  **Montserrat** for the brand wordmark
- **sharp** to pre-generate optimized **WebP** images at build time

## Project layout

```
app/
  layout.tsx              root layout (fonts, base metadata, favicon)
  page.tsx                "/" → language-detect redirect (/el/ if Greek, else /en/)
  robots.ts, sitemap.ts   generated robots.txt & sitemap.xml
  [lang]/
    layout.tsx                    per-locale chrome (header, footer, <html lang>, JSON-LD)
    page.tsx                      Home
    services/page.tsx             Services hub
    services/[service]/page.tsx   Service detail (4 slugs incl. wine-analysis,
                                  + Service/Breadcrumb/FAQ JSON-LD)
    faq/page.tsx                  FAQ (+ FAQPage JSON-LD)
    contact/page.tsx              Contact
components/
  Header.tsx, Footer.tsx, Reveal.tsx, SetHtmlLang.tsx, StructuredData.tsx
  Icons.tsx, Breadcrumb.tsx, JsonLd.tsx
  sections/               HomeHero, TrustStrip, ServiceCards, About, CtaParallax,
                          PageHero, ServiceHub, ServiceDetail,
                          FaqAccordion, FaqList, ContactInfo
lib/
  i18n.ts                 locales, dictionaries (all EN+EL copy), contact data
  seo.ts                  per-page metadata (title/desc, canonical, hreflang, OG)
public/images/            logos + photos (WebP generated at build)
scripts/
  optimize-images.mjs     JPG → resized WebP (runs before build)
  finalize.mjs            sets <html lang="en"> on the static English pages
```

## Requirements

- **Node 18.18+** (built & tested on Node 22) and npm.

## Develop

```bash
npm install
npm run dev            # http://localhost:3000  → language-detect redirect
```

## Build (static export)

```bash
npm run build          # optimize images → next build → finalize lang attrs
```

Output is written to **`out/`**. The build pipeline:

1. `scripts/optimize-images.mjs` — generates resized WebP versions of the photos.
2. `next build` — compiles and statically exports all routes.
3. `scripts/finalize.mjs` — rewrites `<html lang>` to `en` on the English pages so
   crawlers see the correct language (the root layout defaults to `el`; the client
   also corrects it at runtime).

### Preview the static output locally

```bash
npm run serve          # serves ./out on http://localhost:3000 (npx serve)
# or any static server:
npx serve out
python3 -m http.server -d out 8080
```

## Routes

| Path | Page |
|------|------|
| `/` | language-detect redirect: `/el/` if Greek is in the browser's languages, else `/en/` |
| `/en/`, `/el/` | Home |
| `/en/services/`, `/el/services/` | Services hub |
| `/en/services/{pest-control,chemical-analysis,disinfection,wine-analysis}/` | Service detail (per locale) |
| `/en/faq/`, `/el/faq/` | FAQ |
| `/en/contact/`, `/el/contact/` | Contact |
| `/sitemap.xml`, `/robots.txt` | generated |

`trailingSlash: true` means each route exports to its own `index.html`
(`out/en/services/index.html`, …), which works on any static host.

## Deploy

It's plain static files — deploy `out/` anywhere:

- **Netlify**: build command `npm run build`, publish directory `out`.
- **Vercel**: import the repo; it detects Next.js. (Static export is produced by
  `output: 'export'`; no serverless functions are used.)
- **GitHub Pages / S3 / Cloudflare Pages / nginx / Apache**: upload the contents
  of `out/`. No special config needed thanks to `trailingSlash`.

> Update the production domain in `app/layout.tsx` (`metadataBase`), `app/sitemap.ts`,
> `app/robots.ts`, and `lib/seo.ts` if you deploy somewhere other than
> `https://analysiskefalonia.com`.

## What was improved over the original

The original is a heavyweight WordPress/Elementor page (jQuery, Swiper, multiple
plugin stylesheets, render-blocking Google Fonts, div-soup markup). This rebuild
modernizes the design (refreshed palette, type scale, components and motion) while
applying current best practices:

- **Performance** — no jQuery/plugins; ~100 kB first-load JS; self-hosted fonts
  (no external Google Fonts request, no layout shift); WebP images (cards ~50 kB,
  hero/CTA backgrounds resized); lazy-loaded below-the-fold media.
- **Accessibility** — semantic landmarks (`<header>/<nav>/<main>/<footer>`), a single
  `<h1>` per page, skip-to-content link, visible focus styles, `aria-current`,
  labelled icon/menu/language controls, keyboard-operable mobile menu, descriptive
  image `alt` text.
- **SEO** — per-page/locale `<title>` & description, canonical URLs, `hreflang`
  alternates + `x-default`, OpenGraph, `LocalBusiness` JSON-LD (address, geo, phones,
  hours), `sitemap.xml` and `robots.txt`.
- **Responsive** — mirrors the original 1024/767 breakpoints; verified hero, cards,
  alternating service rows and contact grid reflow at mobile/tablet/desktop.
- **Motion** — scroll-reveal, the home CTA parallax, hero gradient/scroll cue,
  card hover lift, animated nav underline and a shrink-on-scroll header, all disabled
  under `prefers-reduced-motion`.
- **Contact** — action-first contact page: tap-to-call and email CTAs, info cards
  (address, opening hours, phones) and an embedded map, plus a dismissible sticky
  call bar on mobile.

## Intentional deviations

- **Markup is rebuilt, not copied.** Elementor's nested `<div>` structure is replaced
  with semantic components — the HTML is much smaller.
- **Typography is unified across locales.** The original loads Montserrat, which has
  **no Greek glyphs**, so Greek fell back to a system font. This rebuild uses **Inter**
  (Latin + Greek) for body and headings so `/en` and `/el` render identically, keeping
  Montserrat only for the brand wordmark.
- **Header is transparent over the (navy) hero and shrinks on scroll** to a solid,
  shadowed navy bar — replacing the original's static transparent header.
- **`/` redirect** is a client redirect + `<meta refresh>` (static export can't do
  server redirects). Greek is the primary locale: it wins if it appears anywhere in
  the browser's language list (locals often run English-UI phones), the apex
  canonicalises to `/el/`, and the no-JS fallback goes to `/el/`. English remains
  the fallback for foreign visitors (`x-default`).
- **Analytics removed.** Google Tag Manager / gtag from the original is not included.
- **Map** uses the same Google Maps embed (Argostoli, zoom 17). It loads from Google
  at runtime; everything else is fully self-contained.

## Notes

- Original `.jpg` sources are kept in `public/images/` alongside the generated
  `.webp` as fallbacks/originals; only the `.webp` are referenced by the app.
