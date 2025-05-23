import BannerContainer from '@/components/container/banner.container';
import CtoBanner from '@/components/container/cto.banner';
import AboutUsSection from '@/components/pages/home/about-us-section';
import ExhibitonsShowcase from '@/components/pages/home/exhibtion-section';
import { ExperienceSection } from '@/components/pages/home/experience.section';
import Hero from '@/components/pages/home/Hero';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <main>
      <Hero />
      <Separator className="my-4" />
      {/* <OurCategory /> */}
      <AboutUsSection />
      <BannerContainer image="/img/hero1.png" />
      <ExperienceSection />
      <BannerContainer image="/img/hero2.png" />
      <ExhibitonsShowcase />
      <CtoBanner />
    </main>
  );
}
