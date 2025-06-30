import { useWebsiteData } from '@/hooks';
import type { WebsiteData } from '@/types';

export const WebsiteList = (refreshKey: number) => {
  const { data, isLoading, isError } = useWebsiteData(refreshKey);

  const website = data ?? ({} as Partial<WebsiteData>);

  return {
    website,
    isLoading,
    isError,
  };
};
