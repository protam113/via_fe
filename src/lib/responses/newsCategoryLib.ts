import { useNewsCategoryList } from '@/hooks';
import type { Filters } from '@/types';

// NewsCategoryList.ts
export const NewsCategoryList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useNewsCategoryList(
    currentPage,
    filters,
    refreshKey
  );
  // Đảm bảo pagination luôn có giá trị mặc định
  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  // Tính toán nextPage

  const newsCategories = data?.result ?? [];
  return {
    newsCategories,
    isLoading,
    isError,
    pagination,
  };
};
