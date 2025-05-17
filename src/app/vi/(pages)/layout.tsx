'use client';

import Container from '@/components/container/container';
// import { Nav } from '@/components/layouts/DefaultLayout/nav';
import { Sidebar } from '@/components/layouts/DefaultLayout/sidebar';
import { SidebarProvider } from '@/hooks/use-sidebar';
import React from 'react';

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      {/* <Nav /> */}
      <Sidebar />
      <Container>{children}</Container>
    </SidebarProvider>
  );
}
