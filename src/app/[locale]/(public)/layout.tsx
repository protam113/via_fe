'use client';

import { DefaultLayout, ScrollToTopButton } from '@/components';

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
