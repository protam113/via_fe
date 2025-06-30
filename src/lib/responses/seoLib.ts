import { useSeoData } from '@/hooks';
import type { SeoData } from '@/types';

export const SeoList = (refreshKey: number) => {
  const { data, isLoading, isError } = useSeoData(refreshKey);

  const seo = data ?? ({} as Partial<SeoData>);

  return {
    seo,
    isLoading,
    isError,
  };
};
