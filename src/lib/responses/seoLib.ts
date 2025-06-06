import { useSeoData } from '@/hooks';
import { SeoData } from '@/types';

export const SeoList = (refreshKey: number) => {
  const { data, isLoading, isError } = useSeoData(refreshKey);

  const seo = data ?? ({} as Partial<SeoData>);

  return {
    seo,
    isLoading,
    isError,
  };
};
