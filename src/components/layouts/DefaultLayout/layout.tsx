'use client';

import React from 'react';
import NavigationMenu from './nav.open';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <NavigationMenu />
      <main>{children}</main>
    </div>
  );
}
