'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import CustomImage from '@/components/common/design/image.component';

export default function ArtGalleryLayout() {
  const t = useTranslations('AboutPage');
  const bullets1 = [
    t('introduction.section1.bullets.0'),
    t('introduction.section1.bullets.1'),
    t('introduction.section1.bullets.2'),
    t('introduction.section1.bullets.3'),
    t('introduction.section1.bullets.4'),
  ];

  const bullets2 = [
    t('introduction.section2.bullets.0'),
    t('introduction.section2.bullets.1'),
    t('introduction.section2.bullets.2'),
    t('introduction.section2.bullets.3'),
  ];

  const bullets3 = [
    t('introduction.section3.bullets.0'),
    t('introduction.section3.bullets.1'),
    t('introduction.section3.bullets.2'),
    t('introduction.section3.bullets.3'),
    t('introduction.section3.bullets.4'),
  ];

  const bullets4 = [
    t('introduction.section4.bullets.0'),
    t('introduction.section4.bullets.1'),
    t('introduction.section4.bullets.2'),
    t('introduction.section4.bullets.3'),
  ];

  const closing = [
    t('introduction.closing.0'),
    t('introduction.closing.1'),
    t('introduction.closing.2'),
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sticky Text Panel */}
      <div className="w-full lg:w-2/5 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-start p-8 lg:p-16 ">
        <CustomImage
          src={'/img/via_banner.png'}
          alt="VIA HOME"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>

      {/* Scrollable Image Gallery */}
      <div className="w-full lg:w-3/5 p-4 lg:p-8 ">
        <div className="lg:mx-0 mb-8">
          <h1 className="text-2xl md:text-24 tracking-tight uppercase mb-6">
            {t('title')}
          </h1>
          <div className="space-y-10">
            {/* Section 1 */}
            <div>
              <h3 className="font-bold text-xl">
                {t('introduction.section1.title')}
              </h3>
              <ul className="mt-2 text-sm list-none space-y-1">
                {bullets1.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="font-bold text-xl">
                {t('introduction.section2.title')}
              </h3>
              <ul className="mt-2 text-sm list-none space-y-1">
                {bullets2.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="font-bold text-xl">
                {t('introduction.section3.title')}
              </h3>
              <ul className="mt-2 text-sm list-none space-y-1">
                {bullets3.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="font-bold text-xl">
                {t('introduction.section4.title')}
              </h3>
              <ul className="mt-2 text-sm list-none space-y-1">
                {bullets4.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Closing */}
            <div>
              <ul className="mt-2 text-sm list-none space-y-1">
                {closing.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-12 md:space-y-16">
          <GalleryImage
            src="/img/banner1.png?height=500&width=700"
            alt="Colorful abstract painting in exhibition space"
            caption="'Harmony in Color' by Nguyen Van Minh, Oil on Canvas, 2023"
          />
          <GalleryImage
            src="/img/banner2.png?height=500&width=700"
            alt="Collaborative workspace with people working at a table"
            caption="Creative minds collaborating in our shared workspace"
          />
          <GalleryImage
            src="/img/banner4.jpg?height=500&width=700"
            alt="Gallery wall with framed artwork"
            caption="Contemporary Vietnamese art on display in our main gallery"
          />
          <GalleryImage
            src="/img/banner3.jpg?height=500&width=700"
            alt="Gallery hallway with multiple artworks displayed"
            caption="The North Wing exhibition space featuring works from emerging artists"
          />
          <GalleryImage
            src="/img/hero1.png?height=500&width=700"
            alt="Colorful portraits displayed on white wall with pedestals"
            caption="'Neon Portraits' installation by Thu Tran, Mixed Media, 2024"
          />
        </div>
      </div>
    </div>
  );
}

function GalleryImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        transform: isInView ? 'none' : 'translateY(50px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
      }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <CustomImage
          src={src || '/placeholder.svg'}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
      {caption && (
        <p className="mt-2 text-sm text-gray-500 italic">{caption}</p>
      )}
    </div>
  );
}
