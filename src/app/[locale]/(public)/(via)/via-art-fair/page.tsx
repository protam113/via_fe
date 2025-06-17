'use client';

import { Container } from '@/components';
import SEO from '@/components/core/SEO';
import ViaA from '@/components/pages/via-atelier/via-atelier.detail';
import Image from 'next/image';

const Page = () => {
  return (
    <>
      <SEO
        title="VIA Atelier"
        description="VIA brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <Container>
        {/* Right Main Banner */}
        <div className="flex-1">
          <div className="group relative h-80 rounded-lg overflow-hidden cursor-pointer">
            {/* Main Image */}
            <Image
              src="/img/hero1.png?height=320&width=600"
              alt="Atelier 2026 Main Banner"
              width={600}
              height={320}
              className="w-full h-full object-cover"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center">
                <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors duration-200">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Page;
