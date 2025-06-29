import React from 'react';
import CustomImage from '../design/image.component';
import { Link } from '@/i18n/navigation';

const AtelierCard = ({
  image,
  alt,
  slug,
}: {
  image: string;
  alt: string;
  slug: string;
}) => {
  return (
    <Link
      key={slug}
      href={{
        pathname: '/via-atelier/[slug]',
        params: { slug },
      }}
      className="group relative h-80 w-full rounded-none overflow-hidden cursor-pointer"
    >
      <div className="w-full h-full relative">
        <CustomImage
          src={image}
          alt={alt}
          fill // 👈 this makes the image cover the parent
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-none font-medium hover:bg-white/30 transition-colors duration-200">
          Learn more
        </button>
      </div>
    </Link>
  );
};

export default AtelierCard;
