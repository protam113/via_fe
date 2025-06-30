import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/apis';
import { toast } from 'sonner';
import { logDebug } from '@/utils';
import type { SeoData, UpdateSeo } from '@/types';
import { SeoError, SeoSuccess } from '@/constants';

/**
 * ==========================
 * 📌 @HOOK useSeoData
 * ==========================
 *
 * @desc Custom hook to get SEO data
 * @returns {SeoData} SEO data
 */

const fetchSeoData = async (): Promise<SeoData> => {
  try {
    // Call API
    const response = await handleAPI(`${endpoints.seo}`, 'GET', null);
    logDebug(handleAPI);

    return response.data;
  } catch (error) {
    console.error(SeoError.ERROR_FETCHING_SEO_DATA, error);
    throw error;
  }
};

/**
 * Custom hook to get SEO data using React Query.
 */
const useSeoData = (refreshKey: number) => {
  return useQuery<SeoData, Error>({
    queryKey: ['seoData', refreshKey],
    queryFn: () => fetchSeoData(),
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

/**
 * ========== END OF @HOOK useSeoData ==========
 */

const UpdateSeoData = async (updateSeo: UpdateSeo) => {
  try {
    const response = await handleAPI(`${endpoints.seo}`, 'PATCH', updateSeo);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || SeoError.FAILED_UPDATE_SEO
    );
  }
};

const useUpdateSeo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ updateSeo }: { updateSeo: UpdateSeo }) => {
      return UpdateSeoData(updateSeo);
    },
    onSuccess: () => {
      toast.success(SeoSuccess.UPDATED_SEO);
      queryClient.invalidateQueries({ queryKey: ['seoData'] });
    },
  });
};

export { useSeoData, useUpdateSeo };
