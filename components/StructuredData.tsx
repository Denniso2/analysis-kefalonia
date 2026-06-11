import { type Locale, getDictionary, contactData, serviceDetailPath } from '@/lib/i18n';

const BASE = 'https://analysiskefalonia.com';

/** LocalBusiness JSON-LD for richer search results. */
export default function StructuredData({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'PestControl',
    // Stable identity shared by both locale pages, so search engines treat them
    // as one business entity rather than two.
    '@id': `${BASE}/#business`,
    name: 'ANALYSIS',
    description: dict.meta.home.description,
    image: `${BASE}/images/logo-black.png`,
    url: `${BASE}/${locale}/`,
    inLanguage: locale,
    telephone: contactData.mobile1.tel,
    email: contactData.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kerkiras 3',
      addressLocality: 'Argostoli',
      addressRegion: 'Kefalonia',
      postalCode: '28100',
      addressCountry: 'GR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contactData.geo.lat,
      longitude: contactData.geo.lng,
    },
    // Tie the entity to its Google Business Profile listing.
    hasMap: contactData.mapLink,
    sameAs: [contactData.mapLink],
    areaServed: ['Kefalonia', 'Ithaca'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '13:00',
      },
    ],
    founder: { '@type': 'Person', name: 'Iakovos Polyzos', jobTitle: 'Chemist-Oenologist' },
    // The full service range — the PestControl type alone undersells the
    // laboratory/oenology half of the business.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: dict.home.servicesTitle,
      itemListElement: dict.services.items.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.navLabel,
          description: s.intro,
          url: `${BASE}${serviceDetailPath(locale, s.slug)}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is static data; safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
