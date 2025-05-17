import Container from '@/components/container/container';
import CtoBanner from '@/components/container/cto.banner';
import AboutUsSection from '@/components/pages/home/about-us-section';
import { ExperienceSection } from '@/components/pages/home/experience.section';
import Hero from '@/components/pages/home/Hero';
import OurCategory from '@/components/pages/home/our-category';

export default function Home() {
  return (
    <div>
      <Hero />
      <Container>
        <OurCategory />
      </Container>
      <AboutUsSection />
      <ExperienceSection />
      <CtoBanner />
    </div>
  );
}
