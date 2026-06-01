import { type Locale, getDictionary, contactData } from '@/lib/i18n';

/** LocalBusiness JSON-LD for richer search results. */
export default function StructuredData({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'PestControl',
    name: 'ANALYSIS',
    description: dict.meta.home.description,
    image: 'https://analysiskefalonia.com/images/logo-black.png',
    url: `https://analysiskefalonia.com/${locale}/`,
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
    areaServed: ['Kefalonia', 'Ithaca'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '14:00',
      },
    ],
    founder: { '@type': 'Person', name: 'Iakovos Polyzos', jobTitle: 'Chemist-Oenologist' },
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is static data; safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
