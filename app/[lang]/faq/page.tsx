import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/sections/PageHero';
import FaqList from '@/components/sections/FaqList';
import JsonLd from '@/components/JsonLd';
import { isLocale, getDictionary, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang as Locale, 'faq');
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.faqPage.groups.flatMap((g) =>
      g.items.map((qa) => ({
        '@type': 'Question',
        name: qa.q,
        acceptedAnswer: { '@type': 'Answer', text: qa.a },
      })),
    ),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <PageHero
        title={dict.faqPage.title}
        eyebrow={dict.faqPage.eyebrow}
        subtitle={dict.faqPage.subtitle}
      />
      <FaqList dict={dict} locale={locale} />
    </>
  );
}
