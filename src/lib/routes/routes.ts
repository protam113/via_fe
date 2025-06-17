import { ENV } from '../env';
import { VIA_SECTIONS } from './via';

function deepFreeze<T>(obj: T): T {
  Object.getOwnPropertyNames(obj).forEach((key) => {
    const prop = (obj as any)[key];
    if (typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
}

// Định nghĩa kiểu RouteMap tùy chỉnh cho ROUTES
type RouteMap = {
  readonly HOME: string;
  readonly ABOUT: string;
  readonly NEWS: string;
  readonly VIA_ART_FAIR: {
    readonly ROOT: string;
    readonly DETAIL: (slug: string) => string;
    readonly ID: string;
  };
  readonly VIA_ATELIER: {
    readonly ROOT: string;
    readonly DETAIL: (slug: string) => string;
    readonly ID: string;
  };
  readonly VIA_PRIVE: {
    readonly ROOT: string;
    readonly DETAIL: (slug: string) => string;
    readonly ID: string;
  };
  readonly CONTACT: string;

  // Private route
  readonly LOGIN: string;
  readonly DASHBOARD: string;
  readonly ADMIN_CATEGORY: string;
  readonly ADMIN_CONTACT: string;
  readonly ADMIN_SEO: string;
  readonly ADMIN_USERS: {
    readonly ROOT: string;
    readonly CREATE_USER: string;

    readonly DETAIL: (id: string) => string;
    readonly EDIT: (id: string) => string;
  };
  readonly ADMIN_VIA_ART_FAIR: {
    readonly ROOT: string;
    readonly DETAIL: (slug: string) => string;
    readonly ID: string;
  };
  readonly ADMIN_VIA_ATELIER: {
    readonly ROOT: string;
    readonly DETAIL: (slug: string) => string;
    readonly ID: string;
  };
  readonly ADMIN_VIA_PRIVE: {
    readonly ROOT: string;
    readonly DETAIL: (slug: string) => string;
    readonly ID: string;
  };
};

export const ROUTES: Readonly<RouteMap> = deepFreeze({
  HOME: '/',
  ABOUT: '/about',
  NEWS: '/news',
  VIA_ART_FAIR: {
    ROOT: VIA_SECTIONS.ART_FAIR.ROOT,
    DETAIL: (slug: string) => `/via-art-fair/${slug}`,
    ID: ENV.VIA_ART_FAIR_ID,
  },
  VIA_ATELIER: {
    ROOT: VIA_SECTIONS.ATELIER.ROOT,
    DETAIL: (slug: string) => `/via-atelier/${slug}`,
    ID: ENV.VIA_ATELIER_ID,
  },

  VIA_PRIVE: {
    ROOT: VIA_SECTIONS.PRIVE.ROOT,
    DETAIL: (slug: string) => `/via-prive/${slug}`,
    ID: ENV.VIA_PRIVE_ID,
  },
  CONTACT: '/contact-us',

  // Private Route
  LOGIN: '/login',
  DASHBOARD: '/admin',
  ADMIN_CATEGORY: '/admin/category',
  ADMIN_CONTACT: '/admin/contacts',
  ADMIN_SEO: '/admin/seo',
  ADMIN_USERS: {
    ROOT: '/admin/users',
    CREATE_USER: '/admin/users/create_manager',
    DETAIL: (id: string) => `/admin/users/${id}`,
    EDIT: (id: string) => `/admin/users/${id}/edit`,
  },
  ADMIN_VIA_ART_FAIR: {
    ROOT: VIA_SECTIONS.ART_FAIR.ADMIN_ROOT,
    DETAIL: (slug: string) => `${VIA_SECTIONS.ART_FAIR.ADMIN_ROOT}/${slug}`,
    ID: ENV.VIA_ART_FAIR_ID,
  },
  ADMIN_VIA_ATELIER: {
    ROOT: VIA_SECTIONS.ATELIER.ADMIN_ROOT,
    DETAIL: (slug: string) => `${VIA_SECTIONS.ATELIER.ADMIN_ROOT}/${slug}`,
    ID: ENV.VIA_ATELIER_ID,
  },
  ADMIN_VIA_PRIVE: {
    ROOT: VIA_SECTIONS.PRIVE.ADMIN_ROOT,
    DETAIL: (slug: string) => `${VIA_SECTIONS.PRIVE.ADMIN_ROOT}/${slug}`,
    ID: ENV.VIA_PRIVE_ID,
  },
} as const);
