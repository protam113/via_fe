import { useExhibitionList } from '@/hooks/exhibition/useExhibition';
import { Filters } from '@/types';

// ExhibitionsList.ts
export const ExhibitionsList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useExhibitionList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  const exhibitions = data?.result ?? [];

  return {
    exhibitions,
    isLoading,
    isError,
    pagination,
  };
};
