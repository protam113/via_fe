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
  },
});
