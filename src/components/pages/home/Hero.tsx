'use client';

import { CategoryCard } from '@/components/cards/exhibition-card';
import Container from '@/components/container/container';
import Image from 'next/image';

export default function Hero() {
  return (
    <Container className="mx-auto px-4 ">
      <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
            Vietnam
          </h1>
          <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
            <Image
              src="/logo.svg"
              alt="VIA Logo"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mt-4">
          International Artfair
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {' '}
        {/* Thay md:grid-cols-3 thành md:grid-cols-2 */}
        <CategoryCard
          title="VIA Art Fair"
          description="A serene architectural masterpiece blending natural elements with modern design principles."
          imageSrc="/img/banner4.jpg"
        />
        <CategoryCard
          title="VIA Atelier"
          description="Contemporary residential complex featuring distinctive arched facades and minimalist aesthetics."
          imageSrc="/img/hero1.png"
        />
        <CategoryCard
          title="VIA Prive'"
          description="Innovative geometric patterns create a stunning visual experience in this architectural landmark."
          imageSrc="/img/banner2.png"
        />
      </div>
    </Container>
  );
}
