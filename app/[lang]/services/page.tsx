import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/sections/PageHero';
import ServiceHub from '@/components/sections/ServiceHub';
import { isLocale, getDictionary, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang as Locale, 'services');
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        title={dict.services.heroTitle}
        eyebrow={dict.services.eyebrow}
        subtitle={dict.services.subtitle}
      />
      <ServiceHub locale={locale} dict={dict} />
    </>
  );
}
