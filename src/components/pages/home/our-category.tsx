'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import MainButton from '@/components/button/main.button';
import Link from 'next/link';
import Header from '@/components/design/header';

export default function OurCategory() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const categories = [
    { id: 1, name: 'VIA ART FAIR', href: '/via-art-fair' },
    { id: 2, name: 'VIA ATELIER', href: '/via-art-fair' },
    { id: 3, name: "VIA PRIVE'", href: '/via-art-fair' },
  ];

  return (
    <main className="bg-white mb-16 ">
      <div className="container mx-auto px-4 mt-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left - Text + Button */}
          <div className="space-y-6">
            <p className="text-sm text-gray-800 leading-relaxed max-w-xs">
              We create immersive environments that connect ideas, people, and
              culture — redefining the way experiences are felt.
            </p>
            <MainButton href="#gallery" title="OUR CATEGORY" />
          </div>

          {/* Right - Title + Categories */}
          <div id="categories" className="space-y-8">
            <div>
              <Header title=" Reimagining Experiences" />
              <p className="text-gray-700 max-w-lg">
                From exhibitions to large-scale events, we craft experiences
                that transform ordinary spaces into storytelling platforms.
              </p>
            </div>

            <div className="space-y-0">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className="border-t border-b border-gray-200"
                >
                  <Link href={category.href}>
                    <div
                      className="py-6 flex items-center cursor-pointer group"
                      onMouseEnter={() => setHoveredCategory(index)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <span className="text-xs text-gray-400 mr-4">
                        {category.id}.
                      </span>
                      <span
                        className={cn(
                          'text-xl transition-transform duration-300',
                          hoveredCategory === index ? 'translate-x-2' : ''
                        )}
                      >
                        {category.name}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
