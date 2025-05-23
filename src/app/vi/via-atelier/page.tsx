'use client';

import SEO from '@/components/SEO';
import React from 'react';
import ViaA from '@/components/pages/via-atelier/via-atelier.detail';

const Page = () => {
  return (
    <>
      <SEO
        title="VIA Atelier"
        description="VIA brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <main className="bg-black">
        <ViaA />
      </main>
    </>
  );
};

export default Page;
