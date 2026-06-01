import type { Metadata } from 'next';
import {
  type Locale,
  type PageKey,
  type ServiceSlug,
  pagePath,
  getDictionary,
  serviceDetailPath,
} from './i18n';

/** Per-page, per-locale metadata: title/description, canonical, hreflang alternates, OG. */
export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const dict = getDictionary(locale);
  const meta = dict.meta[page];
  const path = pagePath(locale, page);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: {
        en: pagePath('en', page),
        el: pagePath('el', page),
        'x-default': pagePath('en', page),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      siteName: 'ANALYSIS',
      locale: locale === 'el' ? 'el_GR' : 'en_US',
      alternateLocale: locale === 'el' ? 'en_US' : 'el_GR',
      type: 'website',
      images: [{ url: '/images/analysis-big-logo.png', width: 750, height: 560, alt: 'ANALYSIS' }],
    },
  };
}

/** Metadata for a /services/[slug] detail page. */
export function serviceMetadata(locale: Locale, slug: ServiceSlug): Metadata {
  const dict = getDictionary(locale);
  const service = dict.services.items.find((s) => s.slug === slug)!;
  const path = serviceDetailPath(locale, slug);

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        en: serviceDetailPath('en', slug),
        el: serviceDetailPath('el', slug),
        'x-default': serviceDetailPath('en', slug),
      },
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: path,
      siteName: 'ANALYSIS',
      locale: locale === 'el' ? 'el_GR' : 'en_US',
      alternateLocale: locale === 'el' ? 'en_US' : 'el_GR',
      type: 'website',
      images: [{ url: service.image, alt: service.navLabel }],
    },
  };
}
