import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/sections/PageHero';
import ContactInfo from '@/components/sections/ContactInfo';
import { isLocale, getDictionary, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang as Locale, 'contact');
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        title={dict.contact.heroTitle}
        eyebrow={dict.contact.infoEyebrow}
        subtitle={dict.contact.subtitle}
      />
      <ContactInfo dict={dict} />
    </>
  );
}
