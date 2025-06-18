// components/FeaturedSection.tsx
import CustomImage from '@/components/common/design/image.component';
import { Separator } from '@/components';
import Image from 'next/image';
import Link from 'next/link';

type FeaturedItem = {
  title: string;
  image: string;
  href: string;
};

const featuredItems: FeaturedItem[] = [
  {
    title: 'VIA ARTFAIR',
    image: '/img/hero1.png',
    href: '/via-artfair',
  },
  {
    title: 'VIA ATELIER',
    image: '/img/hero1.png',
    href: '/via-atelier',
  },
  {
    title: "VIA PRIVE'",
    image: '/img/hero1.png',
    href: '/via-prive',
  },
];

export default function FeaturedSection() {
  return (
    <section className="w-full py-8 px-4">
      <div className="mb-4">
        <h2 className="text-sm  text-gray-500 uppercase mb-6 pb-2">Featured</h2>
        <Separator className=" bg-gray-600" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredItems.map((item, index) => (
          <Link key={index} href={item.href} className="block w-full">
            <div className="group w-full flex items-center justify-between rounded-lg p-4 transition-all duration-200 hover:shadow-md">
              {/* Image wrapper */}
              <div className="relative aspect-square w-full max-w-[100px] rounded-md overflow-hidden">
                {/* Image */}
                <CustomImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Text */}
              <p className="text-[16px]  text-gray-800 transition-all duration-300 group-hover:text-red-600 group-hover:text-[18px]">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
