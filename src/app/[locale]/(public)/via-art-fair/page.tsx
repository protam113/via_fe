'use client';

import SEO from '@/components/core/SEO';
import EnhancedHeroBanner from '@/components/wrappers/enhanced-hero-banner';
import Exhibition from '@/components/common/cards/exhibition';

const Page = () => {
  const exhibitions = [
    {
      id: 1,
      title: 'Reinventing Office Spaces for Tomorrow',
      date: 'April 8, 2025',
      description:
        'The way we work is changing, and office spaces need to keep up. Flexibility, collaboration, and well-being are now central to workplace design. Discover how architects and designers are creating environments that inspire productivity and creativity.',
      image: '/img/banner3.jpg',
      link: '/via-art-fair/detail',
    },
    {
      id: 2,
      title: 'Urban Living: Vertical Communities',
      date: 'March 15, 2025',
      description:
        'As cities grow denser, architects are reimagining residential spaces as vertical communities. These innovative structures combine private living with shared amenities to foster connection while maintaining privacy.',
      image: '/img/hero1.png',
      link: '/via-art-fair/detail',
    },
    {
      id: 3,
      title: 'Sustainable Architecture in Practice',
      date: 'February 22, 2025',
      description:
        'Sustainability is no longer just a buzzword in architecture. Explore groundbreaking projects that incorporate renewable materials, energy efficiency, and biophilic design to create spaces that are both beautiful and environmentally responsible.',
      image: '/img/hero2.png',
      link: '/via-art-fair/detail',
    },
  ];
  return (
    <>
      <SEO
        title="VIA Art Fair"
        description="VIA brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <main className=" scroll-smooth">
        <EnhancedHeroBanner
          heading="VIA Art Fair."
          backgroundImage="/img/hero4.png"
        />

        {exhibitions.map((exhibition) => (
          <Exhibition key={exhibition.id} exhibition={exhibition} />
        ))}
      </main>
    </>
  );
};

export default Page;
