import BannerContainer from '@/components/container/banner.container';
import CtoBanner from '@/components/container/cto.banner';
import AboutViaSpaceSection from '@/components/pages/about/AboutViaSpaceSection';
import ExhibitonsShowcase from '@/components/pages/home/exhibtion-section';
import Hero from '@/components/pages/home/Hero';
import HeroSlider from '@/components/pages/home/hero-slider';

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <div className="bg-gray-100">
        <Hero />
      </div>
      <AboutViaSpaceSection />
      <BannerContainer image="/img/hero1.png" />
      <ExhibitonsShowcase />
    </main>
  );
}
