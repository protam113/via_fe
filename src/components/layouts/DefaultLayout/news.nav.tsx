'use client';

import { NewsCategoryList } from '@/lib';
import { routeMap } from '@/lib/routes/routeMap.routes';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NewsDropdown() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const params = {
    limit: pageSize,
  };

  const { newsCategories, isLoading, isError } = NewsCategoryList(1, params, 0);

  const currentRouteKey = routeMap[pathname] || '';

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href="/news"
        className={`
          relative px-3 py-1 text-lg font-medium transition-all duration-300 ease-in-out
          text-black hover:scale-105 hover:after:w-full
          after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-red-500 after:transition-all after:duration-300
          ${
            currentRouteKey === 'news'
              ? 'font-semibold scale-105 text-red-500 after:w-full'
              : 'after:w-0'
          }
        `}
      >
        News
      </Link>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-none shadow-xl
          transition-all duration-300 ease-in-out z-50
          ${
            isHovered
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-2'
          }
        `}
      >
        <div className="py-2">
          {isLoading && (
            <p className="px-4 py-2 text-sm text-gray-500">Loading...</p>
          )}
          {isError && (
            <p className="px-4 py-2 text-sm text-red-500">
              Failed to load categories
            </p>
          )}
          {!isLoading && !isError && newsCategories.length === 0 && (
            <p className="px-4 py-2 text-sm text-gray-500">
              No categories found
            </p>
          )}
          {!isLoading &&
            !isError &&
            newsCategories.map((category) => (
              <Link
                key={category.id || category.slug}
                href={{
                  pathname: '/news/[slug]',
                  params: { slug: category.slug },
                }}
                className="block font-bold px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors duration-200"
              >
                {category.title}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
