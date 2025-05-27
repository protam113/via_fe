'use client';

import ScrollToTopButton from '@/components/button/scrolltotop.button';
import DefaultLayout from '@/components/layouts/DefaultLayout/layout';
import ViDefaultLayout from '@/components/layouts/ViDefaultLayout/layout';

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ViDefaultLayout>
        <div>{children}</div>
        <ScrollToTopButton />
      </ViDefaultLayout>
    </>
  );
}
