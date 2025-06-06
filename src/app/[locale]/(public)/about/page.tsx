import { Container } from '@/components';
import EnhancedHeroBanner from '@/components/wrappers/enhanced-hero-banner';
import AboutViaSpaceSection from '@/components/pages/about/AboutViaSpaceSection';
import ArtGalleryLayout from '@/components/pages/about/show.section';
import AboutUsSection from '@/components/pages/home/about-us-section';
import SEO from '@/components/core/SEO';

const Page = () => {
  return (
    <>
      <SEO
        title="About"
        description="Hust4L brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />

      <main>
        <EnhancedHeroBanner
          heading="About Us"
          backgroundImage="/img/hero1.png"
        />
        <AboutViaSpaceSection />
        <AboutUsSection />
        <Container>
          <ArtGalleryLayout />
        </Container>
      </main>
    </>
  );
};

export default Page;
