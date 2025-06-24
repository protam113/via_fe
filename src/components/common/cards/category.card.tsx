import React from 'react';
import CustomImage from '../design/image.component';
import { Icons } from '@/assets/icons/icons';
import { navItemsFeatured, CategoryList } from '@/lib';
import Spinner from '@/components/loading/spinner';
import Link from 'next/link';

const CategoryCard = () => {
  const { categories, isLoading, isError } = CategoryList(
    1,
    { page_size: 3 },
    0
  );
  return (
    <div className="relative md:fixed md:bottom-6 flex flex-row md:flex-col gap-4 w-full md:w-20 justify-center md:justify-start items-center md:items-start">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p className="text-sm text-red-500">
          Failed to load featured categories.
        </p>
      ) : (
        <>
          {navItemsFeatured.map((navItem) => {
            const category = categories.find((c) => c.id === navItem.id);
            if (!category) return null;

            return (
              <Link
                key={navItem.id}
                href={navItem.path}
                className="group relative h-14 w-14 md:w-16 md:h-16 lg:h-22 lg:w-22 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0" />
                <CustomImage
                  src={category.thumbnail?.url || '/icons/Logo_noTitle.svg'}
                  alt={category.title}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Icons.EyeIcon className="text-white" />
                </div>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
};

export default CategoryCard;
