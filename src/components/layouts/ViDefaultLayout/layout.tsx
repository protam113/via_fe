'use client';

import React from 'react';
import ViNavigationMenu from './nav.open';

export default function ViDefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <ViNavigationMenu />
      <main>{children}</main>
    </div>
  );
}
