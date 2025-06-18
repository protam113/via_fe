import { ComponentsIcons } from '@/assets/icons/icons';
import { ROUTES } from '@/lib/routes/routes';

export const Name = {
  // Public Name
  VIA_ART_FAIR: 'Via Art Fair',
  ABOUT_US: 'About Us',
  VIA_ATELIER: 'Via Atelier',
  VIA_PRIVE: "Via Prive'",
  CONTACT: 'Contact US',

  // Privar Name
  ADMIN_CONTACT: 'Contacts',
  ADMIN_SEO: 'SEO',
  ADMIN_CATEGORY: 'Categories',
  ADMIN: 'Dashboard',
  ADMIN_USER: 'Users',
  ADMIN_VIA_ART_FAIR: 'Via Art Fair',
  ADMIN_VIA_ATELIER: 'Via Atelier',
  ADMIN_VIA_PRIVE: "Via Prive'",
};

export const navItems = [
  { name: Name.ABOUT_US, path: ROUTES.ABOUT, routeKey: 'about' },
];

export const navItemsMobile = [
  { name: Name.ABOUT_US, path: ROUTES.ABOUT },
  { name: Name.VIA_ART_FAIR, path: ROUTES.VIA_ART_FAIR.ROOT },
  { name: Name.VIA_ATELIER, path: ROUTES.VIA_ATELIER.ROOT },
  { name: Name.VIA_PRIVE, path: ROUTES.VIA_PRIVE.ROOT },
];

export const navItemsSec = [
  { name: Name.CONTACT, path: ROUTES.CONTACT, routeKey: 'contact' },
];

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
