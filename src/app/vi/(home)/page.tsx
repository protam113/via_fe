'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import HomeNav from '@/components/layouts/HomeLayout/nav';
import ViHomeNav from '@/components/vi/layout/HomeLayout/nav';

// Slideshow data with images and headlines
const slideshowData = [
  {
    id: 1,
    image: '/img/banner1.png?height=1080&width=1920',
    headline: 'CONTEMPORARY ART',
  },
  {
    id: 2,
    image: '/img/banner2.png?height=1080&width=1920',
    headline: 'EMERGING ARTISTS',
  },
  {
    id: 3,
    image: '/img/banner3.jpg?height=1080&width=1920',
    headline: 'CULTURAL EXCHANGE',
  },
  {
    id: 4,
    image: '/img/banner4.jpg?height=1080&width=1920',
    headline: 'ARTISTIC INNOVATION',
  },
];

export default function ArtFairLanding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  // Function to go to the next slide
  const nextSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) =>
      prev === slideshowData.length - 1 ? 0 : prev + 1
    );

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this with the CSS transition duration
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) =>
      prev === 0 ? slideshowData.length - 1 : prev - 1
    );

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this with the CSS transition duration
  };

  // Set up automatic slideshow
  useEffect(() => {
    // Start the slideshow interval
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    // Clean up interval on component unmount
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [currentSlide, isTransitioning]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white">
      {/* Mobile Menu Button */}

      <ViHomeNav />
      {/* Right Side - Main Content with Slideshow */}
      <div className="relative w-full md:w-[70%] lg:w-[75%] h-screen overflow-hidden bg-black">
        {/* Slideshow */}
        <div className="relative w-full h-full">
          {slideshowData.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                'absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out',
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              )}
            >
              <Image
                src={slide.image || '/placeholder.svg'}
                alt={`Art Fair Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Headline Text - Changes with each slide */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full px-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center">
            VIA ART FAIR
          </h1>
          <div className="overflow-hidden h-16 mt-4">
            <p
              className={cn(
                'text-xl md:text-2xl text-white text-center transform transition-transform duration-500',
                isTransitioning
                  ? 'translate-y-full opacity-0'
                  : 'translate-y-0 opacity-100'
              )}
            >
              {slideshowData[currentSlide].headline}
            </p>
          </div>
        </div>

        {/* Logo and Subtitle - Fixed at bottom */}
        <div className="absolute bottom-8 left-8 z-20 flex items-center gap-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg max-w-[60%] md:max-w-[40%]">
          <div className="relative min-w-[40px] w-10 h-10 md:w-16 md:h-16  rounded-md flex items-center justify-center">
            <Image src={'/logo.svg'} alt={`Logo`} fill />
          </div>
          <h2 className="text-xs md:text-base font-medium truncate">
            VIETNAM INTERNATIONAL ARTFAIR
          </h2>
        </div>

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-2">
          {slideshowData.map((slide, index) => {
            // Calculate the next slides (current + 1 and current + 2)
            const isNextSlide =
              index === (currentSlide + 1) % slideshowData.length;
            const isNextNextSlide =
              index === (currentSlide + 2) % slideshowData.length;

            // Only show the next two slides as thumbnails
            if (!isNextSlide && !isNextNextSlide) return null;

            // On mobile, only show the next slide
            if (isMobile && !isNextSlide) return null;

            return (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  if (slideInterval.current) {
                    clearInterval(slideInterval.current);
                    slideInterval.current = setInterval(() => {
                      nextSlide();
                    }, 5000);
                  }
                }}
                className="relative w-14 h-14 md:w-20 md:h-20 overflow-hidden rounded-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={`Go to slide ${index + 1}`}
              >
                <Image
                  src={slide.image || '/placeholder.svg'}
                  alt={`Preview of ${slide.headline}`}
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
