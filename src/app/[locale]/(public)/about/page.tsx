import { Container } from '@/components';
import EnhancedHeroBanner from '@/components/wrappers/enhanced-hero-banner';
import ArtGalleryLayout from '@/components/pages/about/show.section';
import SEO from '@/components/core/SEO';

const Page = () => {
  return (
    <>
      <SEO
        title="About"
        description="Hust4L brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />

      <main>
        <Container>
          <ArtGalleryLayout />
        </Container>
      </main>
    </>
  );
};

export default Page;
