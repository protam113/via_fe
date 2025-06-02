'use client';

import * as React from 'react';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { NavService } from './nav-services';
import { NavSupport } from './nav-support';
import { NavAdmin } from './nav-admin';
import { ComponentsIcons } from '@/assets/icons/icons';
import { useAuthStore } from '@/store/auth/store.auth';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin',
      icon: ComponentsIcons.LayoutDashboard,
    },
  ],
  navAdmin: [
    {
      title: 'User',
      url: '/admin/users',
      icon: ComponentsIcons.LayoutDashboard,
    },
    {
      title: 'SEO',
      url: '/admin/seo',
      icon: ComponentsIcons.Search,
    },
  ],
  navService: [
    {
      title: 'Categories ',
      url: '/admin/category',
      icon: ComponentsIcons.ChartBarStacked,
    },
    {
      title: 'VIA Art Fair',
      url: '/admin/blog',
      icon: ComponentsIcons.List,
    },
    {
      title: 'Via Atelier',
      url: '/admin/product',
      icon: ComponentsIcons.Package,
    },
    {
      title: "Via Prive'",
      url: '/admin/service',
      icon: ComponentsIcons.Package,
    },
    {
      title: 'Dự Án',
      url: '/admin/project',
      icon: ComponentsIcons.SquareChartGantt,
    },
  ],
  navSupport: [
    {
      title: 'Contacts',
      url: '/admin/contacts',
      icon: ComponentsIcons.Contact,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userInfo = useAuthStore((state) => state.userInfo);
  const { logout } = useAuthStore();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />

      <SidebarContent>
        <NavMain items={data.navMain} />
        {userInfo?.role.slug === 'admin' && <SidebarSeparator />}
        {userInfo?.role.slug === 'admin' && <NavAdmin items={data.navAdmin} />}
        <SidebarSeparator />
        <NavService items={data.navService} />
        <SidebarSeparator />
        <NavSupport items={data.navSupport} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser logout={logout} user={userInfo ?? null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
