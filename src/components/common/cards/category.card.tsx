import React from 'react';
import CustomImage from '../design/image.component';
import { Icons } from '@/assets/icons/icons';

const CategoryCard = () => {
  return (
    <div className="flex flex-row md:flex-col gap-4 w-full md:w-20 justify-center md:justify-start items-center md:items-start">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="group relative h-14 w-14 md:w-16  md:h-16  lg:h-22 lg:w-22  overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600"></div>
          <CustomImage
            src="/placeholder.svg?height=64&width=64"
            alt={`Block ${index}`}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Icons.EyeIcon className="text-white" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
