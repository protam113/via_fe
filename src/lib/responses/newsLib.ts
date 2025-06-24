import { useNewsList } from '@/hooks';
import { Filters } from '@/types';

// NewsList.ts
export const NewsList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useNewsList(
    currentPage,
    filters,
    refreshKey
  );

  // Đảm bảo pagination luôn có giá trị mặc định
  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  // Tính toán nextPage

  const news = data?.result ?? [];

  return {
    news,
    isLoading,
    isError,
    pagination,
  };
};
