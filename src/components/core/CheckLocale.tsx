// components/CheckLocale.tsx
'use client';

import { notFound } from 'next/navigation';
import { useEffect } from 'react';
import { hasLocale } from 'next-intl';
import { routing } from '@/lib';

export default function CheckLocale({ locale }: { locale: string }) {
  useEffect(() => {
    if (!hasLocale(routing.locales, locale)) {
      notFound();
    }
  }, [locale]);

  return null;
}
