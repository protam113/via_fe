'use client';

import ScrollToTopButton from '@/components/button/scrolltotop.button';
import DefaultLayout from '@/components/layouts/DefaultLayout/layout';

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DefaultLayout>
        <div>{children}</div>
        <ScrollToTopButton />
      </DefaultLayout>
    </>
  );
}
