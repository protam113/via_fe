'use client';

import React, { useState } from 'react';
import { NewsCategoryList } from '@/lib';
import type { CategoryCardProps, NewsCategoryRespone } from '@/types';

const NewsCategoryCard: React.FC<CategoryCardProps> = ({
  onCategorySelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { newsCategories, isLoading, isError } = NewsCategoryList(
    1,
    { limit: 20 },
    0
  );

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <nav className="flex overflow-x-auto pb-4 space-x-8">
      {/* View all */}
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-6 w-24 bg-gray-300 animate-pulse rounded-md"
          />
        ))
      ) : isError ? (
        <p className="text-red-500">Failed to load categories.</p>
      ) : (
        <>
          {/* View all - Không truyền categoryId */}
          <button
            onClick={() => handleCategoryClick(null)}
            className={`pb-4 px-1 font-medium ${
              selectedCategory === null
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            View all
          </button>

          {/* Danh sách categories */}
          {newsCategories.map((category: NewsCategoryRespone) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`pb-4 px-1 ${
                selectedCategory === category.id
                  ? 'text-primary border-b-2 border-primary font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {category.title}
            </button>
          ))}
        </>
      )}
    </nav>
  );
};

export default NewsCategoryCard;
