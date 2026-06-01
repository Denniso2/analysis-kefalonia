import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SetHtmlLang from '@/components/SetHtmlLang';
import StructuredData from '@/components/StructuredData';
import { locales, isLocale, getDictionary, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <SetHtmlLang lang={dict.htmlLang} dir={dict.dir} />
      <StructuredData locale={locale} />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header locale={locale} dict={dict} />
      <main id="main">{children}</main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
