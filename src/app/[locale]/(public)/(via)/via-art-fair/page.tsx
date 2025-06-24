'use client';

import { Container } from '@/components';
import ViaCard from '@/components/common/cards/via-card';
import SEO from '@/components/core/SEO';

const viaCardData = [
  {
    id: 1,
    image: '/img/hero1.png?height=320&width=600',
    alt: 'Atelier 2026 Main Banner',
  },
  {
    id: 2,
    image: '/img/hero2.png?height=320&width=600',
    alt: 'Summer Project 2025',
  },
  {
    id: 3,
    image: '/img/hero3.png?height=320&width=600',
    alt: 'Winter Vibes',
  },
  {
    id: 4,
    image: '/img/hero4.png?height=320&width=600',
    alt: 'Next Level Studio',
  },
];

const Page = () => {
  return (
    <>
      <SEO
        title="VIA Atelier"
        description="VIA brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <main>
        <div
          className="space-y-4 min-h-screen overflow-y-auto"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {viaCardData.map((item) => (
            <ViaCard key={item.id} image={item.image} alt={item.alt} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Page;
