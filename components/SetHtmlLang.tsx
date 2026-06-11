'use client';

import { useEffect } from 'react';

/** Corrects <html lang/dir> at runtime per locale (root layout defaults to el). */
export default function SetHtmlLang({ lang, dir = 'ltr' }: { lang: string; dir?: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);
  return null;
}
