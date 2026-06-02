import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceDetailSection from '@/components/sections/ServiceDetail';
import JsonLd from '@/components/JsonLd';
import {
  isLocale,
  isServiceSlug,
  getDictionary,
  serviceSlugs,
  pagePath,
  serviceDetailPath,
  type Locale,
} from '@/lib/i18n';
import { serviceMetadata } from '@/lib/seo';

const BASE = 'https://analysiskefalonia.com';

export function generateStaticParams() {
  return serviceSlugs.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}): Promise<Metadata> {
  const { lang, service } = await params;
  if (!isLocale(lang) || !isServiceSlug(service)) return {};
  return serviceMetadata(lang as Locale, service);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}) {
  const { lang, service } = await params;
  if (!isLocale(lang) || !isServiceSlug(service)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const svc = dict.services.items.find((s) => s.slug === service)!;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.nav.home, item: `${BASE}${pagePath(locale, 'home')}` },
      { '@type': 'ListItem', position: 2, name: dict.nav.services, item: `${BASE}${pagePath(locale, 'services')}` },
      { '@type': 'ListItem', position: 3, name: svc.navLabel, item: `${BASE}${serviceDetailPath(locale, svc.slug)}` },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: svc.title,
    serviceType: svc.navLabel,
    description: svc.metaDescription,
    url: `${BASE}${serviceDetailPath(locale, svc.slug)}`,
    areaServed: ['Kefalonia', 'Ithaca'],
    provider: { '@type': 'LocalBusiness', name: 'ANALYSIS', url: `${BASE}/${locale}/` },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: svc.faq.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd} />
      <ServiceDetailSection locale={locale} dict={dict} service={svc} />
    </>
  );
}
