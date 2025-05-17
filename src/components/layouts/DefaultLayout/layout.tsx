'use client';

import React from 'react';
import { MainNav } from './nav';
import NavigationMenu from './nav.open';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative ">
      {/* <MainNav /> */}
      <NavigationMenu />
      <main>{children}</main>
    </div>
  );
}
