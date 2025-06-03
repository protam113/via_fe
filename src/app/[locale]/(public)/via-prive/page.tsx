'use client';

import SEO from '@/components/core/SEO';
import React from 'react';
import ViaAAuth from '@/components/pages/via-atelier/via-atelier-auth.detail';

const Page = () => {
  return (
    <>
      <SEO
        title="VIA Atelier"
        description="VIA brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <main className="bg-black scroll-smooth">
        <ViaAAuth />
      </main>
    </>
  );
};

export default Page;
