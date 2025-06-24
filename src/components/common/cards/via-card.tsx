import React from 'react';
import CustomImage from '../design/image.component';

const ViaCard = ({ image, alt }: { image: string; alt: string }) => {
  return (
    <div className="group relative h-80 rounded-none overflow-hidden cursor-pointer">
      <CustomImage
        src={image}
        alt={alt}
        width={600}
        height={320}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-none font-medium hover:bg-white/30 transition-colors duration-200">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default ViaCard;
