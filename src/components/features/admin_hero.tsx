'use client';

import CustomImage from '@/components/common/design/image.component';
import { BannerList } from '@/lib';
import { FetchBannerListResponse } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const params = {};

  const { banners: rawBanners, isLoading, isError } = BannerList(1, params, 0);

  const banners = Array.isArray(rawBanners)
    ? (rawBanners as FetchBannerListResponse[])
    : [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isHovered && banners.length >= 2) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, banners]);

  console.log('banners', banners);

  if (isLoading) return <div>Loading banners...</div>;
  if (isError) return <div>Failed to load banners.</div>;
  if (!banners.length) return <div>No banners available.</div>;

  return (
    <div className="w-full mx-auto">
      <div
        className="relative w-full h-80 md:h-100 rounded-nsone overflow-hidden group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {banners.map((item, index) => {
          const url = item.banner?.url || '/logo.svg';
          return (
            <div
              key={item.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 visible z-20'
                  : 'opacity-0 invisible z-0'
              }`}
            >
              <CustomImage
                src={url}
                alt={`Banner ${index}`}
                fill // full width + height
                sizes="100vw"
                className="object-cover"
                priority={index === 0} // preload cái đầu
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          );
        })}
        {/* Left arrow */}
        {banners.length >= 2 && (
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
              isHovered
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2'
            }`}
          >
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          </div>
        )}

        {/* Right arrow */}
        {banners.length >= 2 && (
          <div
            className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
              isHovered
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-2'
            }`}
          >
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Pagination Dots */}
      {banners.length >= 2 && (
        <div className="flex justify-center mt-6 space-x-3">
          {banners.map((_, index) => (
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
      )}
    </div>
  );
}
