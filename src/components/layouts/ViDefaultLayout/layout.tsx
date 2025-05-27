'use client';

import React from 'react';
import ViNavbar from './nav';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <ViNavbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
