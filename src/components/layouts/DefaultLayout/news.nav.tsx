'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NewsDropdown() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const newsCategories = [
    { name: 'VIA 2025', href: '/news/via-2025' },
    { name: 'VIA 2024', href: '/news/via-2024' },
    { name: 'ATELIER 2025', href: '/news/atelier-2025' },
  ];

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
            pathname.replace(/^\/(en|vi)/, '') === '/news'
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
          absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-none
          transition-all duration-300 ease-in-out z-50
          ${
            isHovered
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-2'
          }
        `}
      >
        <div className="py-2">
          {newsCategories.map((category, index) => (
            <Link
              key={category.href}
              href={category.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors duration-200"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
