'use client';

import ScrollToTopButton from '@/components/button/scrolltotop.button';
import DefaultLayout from '@/components/layouts/DefaultLayout/layout';
import LoadingScreen from '@/components/loading/loading-screen';
import React, { useState } from 'react';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false); // Chuyển trạng thái loading thành false khi loading hoàn tất
  };
  return (
    <>
      {loading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {!loading && (
        <DefaultLayout>
          <div className={`${playfair.variable} font-serif`}>{children}</div>
          <ScrollToTopButton />
        </DefaultLayout>
      )}
    </>
  );
}
