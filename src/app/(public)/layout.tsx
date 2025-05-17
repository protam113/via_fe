'use client';

import DefaultLayout from '@/components/layouts/DefaultLayout/layout';
import PremiumLoader from '@/components/loading/premium-loader';
import React, { useState } from 'react';

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <PremiumLoader onLoadingComplete={() => setLoading(false)} />}
      {!loading && (
        <DefaultLayout>
          <div>{children}</div>
        </DefaultLayout>
      )}
    </>
  );
}
