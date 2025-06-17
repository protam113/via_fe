import React from 'react';
import CustomImage from '../design/image.component';

const CategoryCard = () => {
  return (
    <div className="flex flex-col gap-4 w-20">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="group relative h-16 w-16 rounded-lg overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600"></div>
          <CustomImage
            src="/placeholder.svg?height=64&width=64"
            alt={`Block ${index}`}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-xs font-medium">Learn more</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
