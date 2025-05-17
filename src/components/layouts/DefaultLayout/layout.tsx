'use client';

import React from 'react';
import NavigationMenu from './nav.open';
import Image from 'next/image';
import Link from 'next/link';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative ">
      {/* <MainNav /> */}
      <header className="container max-w-8xl px-4 sticky top-0 z-50 py-4 flexitems-center justify-between">
        <div className="ml-4">
          <Link href="/">
            <Image src="/logo.svg" alt="VIA Logo" width={50} height={50} />
          </Link>
        </div>
        <NavigationMenu />
      </header>

      <main>{children}</main>
    </div>
  );
}
