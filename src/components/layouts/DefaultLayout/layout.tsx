'use client';

import React from 'react';
import NavigationMenu from './nav.open';
import Navbar from './nav';
import Footer from './footer';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
