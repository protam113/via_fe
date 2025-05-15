'use client';

import PremiumLoader from '@/components/loading/premium-loader';
import React, { useState } from 'react';

export default function HomeLayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading && <PremiumLoader onLoadingComplete={() => setLoading(false)} />}
      {!loading && children}
    </div>
  );
}
