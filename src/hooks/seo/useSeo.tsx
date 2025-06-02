'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/apis/api';
import { SeoData, UpdateSeo } from '@/types/types';
import { handleAPI } from '@/apis/axiosClient';
import { toast } from 'sonner';
import { logDebug } from '@/utils/logger';

/**
 * ==========================s
 * 📌 @HOOK useCategoryList
 * ==========================
 *
 * @desc Custom hook to get list of categories
 * @returns {Category[]} List of categories
 */

const fetchSeoData = async (): Promise<SeoData> => {
  try {
    // Call API
    const response = await handleAPI(`${endpoints.seo}`, 'GET', null);
    logDebug(handleAPI);

    return response.data;
  } catch (error) {
    console.error('Error fetching seo data:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useSeoData = (refreshKey: number) => {
  return useQuery<SeoData, Error>({
    queryKey: ['seoData', refreshKey],
    queryFn: () => fetchSeoData(),
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

const UpdateSeoData = async (updateSeo: UpdateSeo) => {
  try {
    const response = await handleAPI(`${endpoints.seo}`, 'PATCH', updateSeo);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update contact'
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
      toast.success('Update seo successfully!');
      queryClient.invalidateQueries({ queryKey: ['seoData'] });
    },
  });
};

export { useSeoData, useUpdateSeo };
