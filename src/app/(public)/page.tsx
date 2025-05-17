import Container from '@/components/container/container';
import CtoBanner from '@/components/container/cto.banner';
import AboutUsSection from '@/components/pages/home/about-us-section';
import { ExperienceSection } from '@/components/pages/home/experience.section';
import Hero from '@/components/pages/home/Hero';
import OurCategory from '@/components/pages/home/our-category';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div>
      <Hero />
      <Separator className="my-4" />
      <OurCategory />
      <AboutUsSection />
      <ExperienceSection />
      <CtoBanner />
    </div>
  );
}
