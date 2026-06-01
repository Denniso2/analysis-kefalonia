import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE = 'https://analysiskefalonia.com';

// Path segments after the locale prefix ('' = home). Priority by depth.
const PAGES: { seg: string; priority: number }[] = [
  { seg: '', priority: 1 },
  { seg: 'services', priority: 0.9 },
  { seg: 'services/pest-control', priority: 0.8 },
  { seg: 'services/chemical-analysis', priority: 0.8 },
  { seg: 'services/disinfection', priority: 0.8 },
  { seg: 'services/wine-analysis', priority: 0.8 },
  { seg: 'faq', priority: 0.6 },
  { seg: 'contact', priority: 0.7 },
];

const pathFor = (loc: string, seg: string) => `${BASE}/${loc}/${seg ? `${seg}/` : ''}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const loc of ['en', 'el'] as const) {
    for (const { seg, priority } of PAGES) {
      entries.push({
        url: pathFor(loc, seg),
        changeFrequency: 'yearly',
        priority,
        alternates: {
          languages: {
            en: pathFor('en', seg),
            el: pathFor('el', seg),
          },
        },
      });
    }
  }
  return entries;
}
