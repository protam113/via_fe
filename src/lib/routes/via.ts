// constants/via.ts

import { ENV } from '../env';

export const VIA_SECTIONS = {
  ART_FAIR: {
    SLUG: 'via-art-fair',
    ROOT: '/via-art-fair',
    ADMIN_ROOT: '/admin/via-art-fair',
    ID: ENV.VIA_ART_FAIR_ID,
  },
  ATELIER: {
    SLUG: 'via-atelier',
    ROOT: '/via-atelier',
    ADMIN_ROOT: '/admin/via-atelier',
    ID: ENV.VIA_ATELIER_ID,
  },
  PRIVE: {
    SLUG: 'via-prive',
    ROOT: '/via-prive',
    ADMIN_ROOT: '/admin/via-prive',
    ID: ENV.VIA_PRIVE_ID,
  },
} as const;
