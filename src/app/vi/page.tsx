'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const projects = [
  {
    id: 'Via Art Fair',
    name: 'Villa FG',
    location: 'Italia',
    image: '/img/hero1.png',
  },
  {
    id: 'Via Atelier',
    name: 'Casa Moderna',
    location: 'Spagna',
    image: '/img/hero2.png',
  },
  {
    id: "Via Prive'",
    name: 'Residenza Urbana',
    location: 'Francia',
    image: '/img/hero4.png',
  },
];

export default function ArchitecturePortfolio() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentProject(
        (prev) => (prev - 1 + projects.length) % projects.length
      );
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-white">
      {/* Left Panel - Static */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 lg:p-12 relative order-2 lg:order-1">
        {/* Header */}
        <div className="space-y-4 lg:space-y-8">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-black">
              VietName International Artfair
            </h1>
          </div>

          {/* Projects Section */}
          <div className="space-y-4 lg:space-y-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 ">
                A place where creativity knows no bounds. Get transported into a
                world where every stroke of a brush, every chiseled sculpture,
                and every captured moment in a photo-graph speaks a unique
                language. Our gallery curates a diverse and thought-provoking
                collection, showcasing established masters and emerging talents
                alike.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Words */}
        <div className="space-y-2 flex flex-col items-start mt-6 lg:mt-0">
          <Link
            href="via-art-fair"
            className="relative px-3 py-1 text-2xl md:text-4xl lg:text-6xl font-bold leading-none transition-all duration-300 ease-in-out text-black
   after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-black after:w-0 after:transition-all after:duration-300
   hover:after:w-full"
          >
            Via Art Fair
          </Link>
          <Link
            href="via-atelier"
            className="relative px-3 py-1 text-2xl md:text-4xl lg:text-6xl font-bold leading-none transition-all duration-300 ease-in-out text-black
   after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-black after:w-0 after:transition-all after:duration-300
   hover:after:w-full"
          >
            Via Atelier
          </Link>
          <Link
            href="via-prive"
            className="relative px-3 py-1 text-2xl md:text-4xl lg:text-6xl font-bold leading-none transition-all duration-300 ease-in-out text-black
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-black after:w-0 after:transition-all after:duration-300
            hover:after:w-full"
          >
            Via Prive'
          </Link>
        </div>
      </div>

      {/* Right Panel - Dynamic */}
      <div className="w-full lg:w-1/2 h-[80vh] lg:h-screen relative overflow-hidden order-1 lg:order-2">
        {/* Background Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out ${
            isTransitioning ? 'scale-110 opacity-50' : 'scale-100 opacity-100'
          }`}
          style={{
            backgroundImage: `url(${projects[currentProject].image})`,
          }}
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Navigation Arrows */}
        <button
          onClick={prevProject}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={nextProject}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
          disabled={isTransitioning}
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Project Info Card */}
        <div className="absolute bottom-4 lg:bottom-8 right-4 lg:right-8 bg-white p-4 lg:p-8 min-w-[250px] lg:min-w-[300px] shadow-2xl">
          <div className="space-y-3 lg:space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs lg:text-sm text-gray-500 mb-1 lg:mb-2">
                  {projects[currentProject].id}
                </div>
                <h3 className="text-xl lg:text-3xl font-bold text-black mb-1">
                  {projects[currentProject].name}
                </h3>
                <p className="text-sm lg:text-lg text-gray-600">
                  {projects[currentProject].location}
                </p>
              </div>
              <div className="flex space-x-1 lg:space-x-2">
                <button
                  onClick={prevProject}
                  className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                  disabled={isTransitioning}
                >
                  <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
                <button
                  onClick={nextProject}
                  className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                  disabled={isTransitioning}
                >
                  <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
              </div>
            </div>

            <Button
              className="w-full bg-black text-white hover:bg-gray-800 py-2 lg:py-3 font-medium tracking-wide group text-sm lg:text-base"
              onClick={() => {
                /* Navigate to project detail */
              }}
            >
              View Detail
              <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 flex space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentProject(index);
                    setIsTransitioning(false);
                  }, 300);
                }
              }}
              className={`w-8 lg:w-12 h-1 transition-all duration-300 ${
                index === currentProject
                  ? 'bg-white'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
