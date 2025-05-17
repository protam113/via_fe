// app/(public)/services/page.tsx

import Container from '@/components/container/container';
import EnhancedHeroBanner from '@/components/container/enhanced-hero-banner';
import AboutViaSpaceSection from '@/components/pages/about/AboutViaSpaceSection';
import ArtGalleryLayout from '@/components/pages/about/show.section';
import AboutUsSection from '@/components/pages/home/about-us-section';
import SEO from '@/components/SEO';
import React from 'react';

const Page = () => {
  return (
    <>
      <SEO
        title="About"
        description="Hust4L brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />

      <main>
        <EnhancedHeroBanner
          heading="Curating Experiences. Connecting Culture."
          subheading="We design and produce immersive exhibitions, exclusive events, and creative platforms that spark meaningful encounters."
          title="Explore VIA"
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
