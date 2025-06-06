'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils';
import { Hero } from '@/types';

import Container from './container';
import Breadcrumb from '../common/design/breadcrumb';
import { ArrowIcons } from '@/assets/icons/icons';

export default function EnhancedHeroBanner({ heading, backgroundImage }: Hero) {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade-in animation on page load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: 800, // Scroll xuống đúng 800px
      behavior: 'smooth', // Mượt mà
    });
  };

  return (
    <div
      ref={heroRef}
      className="relative w-full h-[800px] bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      <Container className="mx-auto px-6 h-full flex flex-col justify-center">
        <div className="space-y-16 mt-40">
          {/* Main heading */}
          <div
            className={cn(
              'max-w-4xl transform transition-all duration-1000 ease-out delay-100',
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
          >
            <h1 className="text-5xl text-white md:text-6xl lg:text-7xl font-bold leading-tight">
              {heading}
            </h1>
          </div>
        </div>

        <div className="flex justify-between items-end">
          {/* Social icons */}
          <div>
            <Breadcrumb />
          </div>
          {/* Scroll to explore */}
          <button
            onClick={scrollToContent}
            className={cn(
              'flex items-center space-x-2 group transform transition-all duration-1000 ease-out delay-400',
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            )}
          >
            <span className="text-sm text-white font-medium tracking-wider uppercase">
              Scroll to explore
            </span>
            <ArrowIcons.ArrowRight
              size={16}
              className="transition-transform text-white group-hover:translate-x-1"
            />
          </button>
        </div>
      </Container>
    </div>
  );
}
