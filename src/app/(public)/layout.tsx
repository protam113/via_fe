'use client';

import ScrollToTopButton from '@/components/button/scrolltotop.button';
import DefaultLayout from '@/components/layouts/DefaultLayout/layout';
import LoadingScreen from '@/components/loading/loading-screen';
import React, { useState } from 'react';

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
          <div>{children}</div>
          <ScrollToTopButton />
        </DefaultLayout>
      )}
    </>
  );
}
