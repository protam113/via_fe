'use client';

import React from 'react';
import Navbar from './nav';
import Footer from './footer';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-[120px]">{children}</main>

      <Footer />
    </div>
  );
}
