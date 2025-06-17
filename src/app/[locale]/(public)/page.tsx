'use client';

import { Container } from '@/components';
import HeroComponent from '@/components/pages/home/Hero';
import FeaturedSection from '@/components/pages/home/our-category';

export default function Page() {
  return (
    <Container className="flex flex-col  overflow-hidden bg-white">
      {/* Left Panel - Static */}
      <HeroComponent />

      <FeaturedSection />
    </Container>
  );
}
