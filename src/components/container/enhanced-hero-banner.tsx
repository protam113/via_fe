'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Facebook,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Container from './container';

interface Hero {
  title: string;
  heading?: string;
  subheading?: string;
}

export default function EnhancedHeroBanner({
  title,
  heading,
  subheading,
}: Hero) {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
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
      className="relative w-full h-[800px] bg-white overflow-hidden"
    >
      {/* Cursor follower dot */}

      <Container className="mx-auto px-6 h-full flex flex-col justify-center">
        <div className="space-y-16 mb-16">
          {/* Services label */}
          <div
            className={cn(
              'transform transition-all duration-700 ease-out',
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            )}
          >
            <h2 className="text-2xl font-bold  uppercase mt-4 mb-4 flex items-center gap-2">
              <ArrowUpRight size={40} strokeWidth={1.5} /> {title}
            </h2>
          </div>

          {/* Main heading */}
          <div
            className={cn(
              'max-w-4xl transform transition-all duration-1000 ease-out delay-100',
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
          >
            <h1 className="text-5xl text-black md:text-6xl lg:text-7xl font-bold leading-tight">
              {heading}
            </h1>
          </div>

          {/* Description */}
          <div
            className={cn(
              'max-w-2xl transform transition-all duration-1000 ease-out delay-200',
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
          >
            <p className="text-lg text-gray-500">{subheading}</p>
          </div>
        </div>

        <div className="flex justify-between items-end">
          {/* Social icons */}
          <span></span>
          {/* Scroll to explore */}
          <button
            onClick={scrollToContent}
            className={cn(
              'flex items-center space-x-2 group transform transition-all duration-1000 ease-out delay-400',
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            )}
          >
            <span className="text-sm text-black font-medium tracking-wider uppercase">
              Scroll to explore
            </span>
            <ArrowRight
              size={16}
              className="transition-transform text-black group-hover:translate-x-1"
            />
          </button>
        </div>
      </Container>
    </div>
  );
}
