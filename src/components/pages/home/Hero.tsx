import { CategoryCard } from '@/components/cards/exhibition-card';
import Image from 'next/image';

export default function Hero() {
  return (
    <main className="min-h-screen">
      {/* <MainNav /> */}
      <section className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
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
          <CategoryCard
            title="AL-NUZHA RETREAT"
            description="A serene architectural masterpiece blending natural elements with modern design principles."
            imageSrc="/img/banner4.jpg"
            delay={0}
          />
          <CategoryCard
            title="AL-NOUR ESTATES"
            description="Contemporary residential complex featuring distinctive arched facades and minimalist aesthetics."
            imageSrc="/img/hero1.png"
            delay={200}
          />
          <CategoryCard
            title="SAMA PLAZA"
            description="Innovative geometric patterns create a stunning visual experience in this architectural landmark."
            imageSrc="/img/banner2.png"
            delay={400}
          />
        </div>
      </section>
    </main>
  );
}
