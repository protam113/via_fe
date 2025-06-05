'use strict';

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
import { useAuthStore } from '@/store/auth/store.auth';
import { AdminSidebar } from '@/lib/routes/navigation.routes';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userInfo = useAuthStore((state) => state.userInfo);
  const { logout } = useAuthStore();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />

      <SidebarContent>
        <NavMain items={AdminSidebar.navMain} />
        {userInfo?.role.slug === 'admin' && <SidebarSeparator />}
        {userInfo?.role.slug === 'admin' && (
          <NavAdmin items={AdminSidebar.navAdmin} />
        )}
        <SidebarSeparator />
        <NavService items={AdminSidebar.navService} />
        <SidebarSeparator />
        <NavSupport items={AdminSidebar.navSupport} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser logout={logout} user={userInfo ?? null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
