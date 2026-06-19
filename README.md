# ANALYSIS — Kefalonia

Static website for [analysiskefalonia.com](https://analysiskefalonia.com) — **ANALYSIS**,
pest control & chemical analysis in Kefalonia. Bilingual: Greek (`/el`, primary) and
English (`/en`).

Built with **Next.js 15** (App Router, TypeScript, React 19) and statically exported —
`npm run build` produces a fully static `out/`, no server required.

## Stack

- Next.js 15 (App Router) with `output: 'export'`
- TypeScript + React 19
- Tailwind CSS 3
- `sharp` for build-time WebP image optimization

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

Requires Node 18.18+ (CI builds on Node 22).

## Build

```bash
npm run build      # → static site in out/
```

The build optimizes images, generates the OG card, runs `next build`, then finalizes the
per-locale `<html lang>` attributes. Preview the result locally with `npm run serve`.

## Deploy

Live on **GitHub Pages** at [analysiskefalonia.com](https://analysiskefalonia.com).

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and force-publishes `out/` to the `gh-pages` branch. No manual step.

## Project layout

```
app/         routes (App Router); [lang]/ holds the per-locale pages
components/  shared UI + page sections
lib/         i18n.ts (copy + contact data), seo.ts (per-page metadata)
public/      images and static assets
scripts/     build-time image optimization, OG card, lang finalize
```

## Routes

`/` redirects to `/el/` or `/en/` based on browser language. Each locale has Home,
Services (hub + 4 service detail pages), FAQ, and Contact. `sitemap.xml` and `robots.txt`
are generated at build time.
