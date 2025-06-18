'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function GradientBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      id: 1,
      file: '/img/hero1.png',
    },
    {
      id: 2,
      file: '/img/hero2.png',
    },
    {
      id: 3,
      file: '/img/hero2.png',
    },
    {
      id: 4,
      file: '/img/hero2.png',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full mx-auto">
      <div
        className="relative w-full h-80 md:h-100 rounded-nsone overflow-hidden group cursor-pointer"
        style={{
          backgroundImage: `url(${currentSlideData.file})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Main Content Container with slide transition */}
        <div className="relative h-full flex flex-col md:flex-row transition-all duration-500 ease-in-out">
          {/* Left Section */}
        </div>

        {/* Navigation Arrows */}
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
          }`}
        >
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>

        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Pagination Dots - Outside Banner */}
      <div className="flex justify-center mt-6 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-gray-800 shadow-lg scale-110'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
