//i18n/routing.ts

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'vi'],

  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      vi: '/gioi-thieu',
    },
    '/contact-us': {
      en: '/contact-us',
      vi: '/lien-he',
    },
    '/news': {
      en: '/news',
      vi: '/tin-tuc',
    },
    '/news/[slug]': {
      en: '/news/[slug]',
      vi: '/tin-tuc/[slug]',
    },
    '/via-art-fair/[slug]': {
      en: '/via-art-fair/[slug]',
      vi: '/via-art-fair/[slug]',
    },
    '/via-atelier/[slug]': {
      en: '/via-atelier/[slug]',
      vi: '/via-atelier/[slug]',
    },
  },
});
