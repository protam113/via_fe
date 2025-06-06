'use client';
import { useCategoryList } from '@/hooks';
import { Filters } from '@/types';

// CategoryList.ts
export const CategoryList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useCategoryList(
    currentPage,
    filters,
    refreshKey
  );

  // Đảm bảo pagination luôn có giá trị mặc định
  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  // Tính toán nextPage

  const categories = data?.result ?? [];

  return {
    categories,
    isLoading,
    isError,
    pagination,
  };
};
