import { ComponentsIcons } from '@/assets/icons/icons';
import { ROUTES } from '@/lib/routes/routes';
import { ENV } from '../env';

export const Name = {
  // Public Name
  VIA_ART_FAIR: 'Via Art Fair',
  ABOUT_US: 'About Us',
  VIA_ATELIER: 'Via Atelier',
  VIA_PRIVE: "Via Prive'",
  CONTACT: 'Contact US',

  // Private Name
  ADMIN_CONTACT: 'Contacts',
  ADMIN_WEBSITE: 'Website',
  ADMIN_SEO: 'SEO',
  ADMIN_CATEGORY: 'Categories',
  ADMIN: 'Dashboard',
  ADMIN_USER: 'Users',
  ADMIN_VIA_ART_FAIR: 'Via Art Fair',
  ADMIN_VIA_ATELIER: 'Via Atelier',
  ADMIN_VIA_PRIVE: "Via Prive'",
  ADMIN_NEWS: 'News',
};

export const navItems = [
  { name: Name.ABOUT_US, path: '/about', routeKey: 'about' },
] as const;

export const navItemsMobile = [
  { name: Name.ABOUT_US, path: '/about' },
  { name: Name.VIA_ART_FAIR, path: '/via-art-fair' },
  { name: Name.VIA_ATELIER, path: '/via-atelier' },
  { name: Name.VIA_PRIVE, path: '/via-prive' },
] as const;

export const navItemsSec = [
  { name: Name.CONTACT, path: '/contact-us', routeKey: 'contact' },
] as const;

export const navItemsFeatured = [
  { id: ENV.VIA_ART_FAIR_ID, path: '/via-art-fair' },
  { id: ENV.VIA_ATELIER_ID, path: '/via-atelier' },
  { id: ENV.VIA_PRIVE_ID, path: '/via-prive' },
] as const;

export const AdminSidebar = {
  navMain: [
    {
      title: Name.ADMIN,
      url: ROUTES.DASHBOARD,
      icon: ComponentsIcons.LayoutDashboard,
    },
  ],
  navAdmin: [
    {
      title: Name.ADMIN_USER,
      url: ROUTES.ADMIN_USERS.ROOT,
      icon: ComponentsIcons.LayoutDashboard,
    },
    {
      title: Name.ADMIN_SEO,
      url: ROUTES.ADMIN_SEO,
      icon: ComponentsIcons.Search,
    },
    {
      title: Name.ADMIN_WEBSITE,
      url: ROUTES.ADMIN_WEBSITE,
      icon: ComponentsIcons.Search,
    },
  ],
  navNews: [
    {
      title: Name.ADMIN_NEWS,
      url: ROUTES.ADMIN_NEWS,
      icon: ComponentsIcons.Search,
    },
  ],
  navService: [
    {
      title: Name.ADMIN_CATEGORY,
      url: ROUTES.ADMIN_CATEGORY,
      icon: ComponentsIcons.ChartBarStacked,
    },
    {
      title: Name.ADMIN_VIA_ART_FAIR,
      url: ROUTES.ADMIN_VIA_ART_FAIR.ROOT,
      icon: ComponentsIcons.List,
    },
    {
      title: Name.VIA_ATELIER,
      url: ROUTES.ADMIN_VIA_ATELIER.ROOT,
      icon: ComponentsIcons.Package,
    },
    {
      title: Name.ADMIN_VIA_PRIVE,
      url: ROUTES.ADMIN_VIA_PRIVE.ROOT,
      icon: ComponentsIcons.Package,
    },
    // {
    //   title: 'Dự Án',
    //   url: '/admin/project',
    //   icon: ComponentsIcons.SquareChartGantt,
    // },
  ],
  navSupport: [
    {
      title: Name.ADMIN_CONTACT,
      url: ROUTES.ADMIN_CONTACT,
      icon: ComponentsIcons.Contact,
    },
  ],
};

export const categories = [
  {
    id: 1,
    name: Name.VIA_ART_FAIR,
    path: ROUTES.VIA_ART_FAIR.ROOT,
  },
  {
    id: 2,
    name: Name.VIA_ATELIER,
    path: ROUTES.VIA_ATELIER.ROOT,
  },
  {
    id: 3,
    name: Name.VIA_PRIVE,
    path: ROUTES.VIA_PRIVE.ROOT,
  },
];
