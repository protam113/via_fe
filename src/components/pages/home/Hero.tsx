'use client';

import { IntroduceCard } from '@/components/common/cards/exhibition-card';
import Container from '@/components/wrappers/container';
import Header from '@/components/common/design/header';

export default function Hero() {
  return (
    <div className="flex flex-col min-h-screen mx-auto">
      <Container className="mt-20 mb-16 md:mb-24">
        <Header title="Welcome to VIA Home " />
      </Container>

      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 ">
        <IntroduceCard
          title="VIA Art Fair"
          description="A serene architectural masterpiece blending natural elements with modern design principles."
          imageSrc="/img/banner4.jpg"
        />
        <IntroduceCard
          title="VIA Atelier"
          description="Contemporary residential complex featuring distinctive arched facades and minimalist aesthetics."
          imageSrc="/img/hero1.png"
        />
        <IntroduceCard
          title="VIA Prive'"
          description="Innovative geometric patterns create a stunning visual experience in this architectural landmark."
          imageSrc="/img/banner2.png"
        />
      </div>
    </div>
  );
}
