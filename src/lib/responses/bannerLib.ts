import { useBannerList } from '@/hooks/exhibition/useExhibition';
import { Filters } from '@/types';

// BannerList.ts
export const BannerList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useBannerList(
    currentPage,
    filters,
    refreshKey
  );

  const banners = data ?? [];

  return {
    banners,
    isLoading,
    isError,
  };
};
