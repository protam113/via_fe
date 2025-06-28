import { useCategoryCountData, useCategoryList } from '@/hooks';
import { CategoryCountData, Filters } from '@/types';

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

  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  const categories = data?.result ?? [];

  return {
    categories,
    isLoading,
    isError,
    pagination,
  };
};

export const CategoryCountList = (refreshKey: number) => {
  const { data, isLoading, isError } = useCategoryCountData(refreshKey);

  const categoryCount = data?.data ?? []; // 💥 Lấy data từ response.data.data!

  return {
    categoryCount,
    isLoading,
    isError,
  };
};
