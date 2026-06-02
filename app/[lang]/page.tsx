import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomeHero from '@/components/sections/HomeHero';
import TrustStrip from '@/components/sections/TrustStrip';
import ServiceCards from '@/components/sections/ServiceCards';
import About from '@/components/sections/About';
import CtaParallax from '@/components/sections/CtaParallax';
import { isLocale, getDictionary, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang as Locale, 'home');
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <HomeHero locale={locale} dict={dict} />
      <TrustStrip dict={dict} />
      <ServiceCards locale={locale} dict={dict} />
      <About locale={locale} dict={dict} />
      <CtaParallax dict={dict} />
    </>
  );
}
