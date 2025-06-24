import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/apis';
import { toast } from 'sonner';
import { logDebug } from '@/utils';
import { WebsiteData, UpdateWebsite } from '@/types';

/**
 * ==========================
 * 📌 @HOOK useWebsiteData
 * ==========================
 *
 * @desc Custom hook to get website data
 * @returns {WebsiteData} Website data
 */

const fetchWebsiteData = async (): Promise<WebsiteData> => {
  try {
    // Call API
    const response = await handleAPI(`${endpoints.website}`, 'GET', null);
    logDebug(handleAPI);

    return response.data;
  } catch (error) {
    console.error('Error fetching website data:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useWebsiteData = (refreshKey: number) => {
  return useQuery<WebsiteData, Error>({
    queryKey: ['websiteData', refreshKey],
    queryFn: () => fetchWebsiteData(),
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

const UpdateWebsiteData = async (updateWebsite: UpdateWebsite) => {
  try {
    const response = await handleAPI(
      `${endpoints.website}`,
      'PATCH',
      updateWebsite
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update website'
    );
  }
};

const useUpdateWebsite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ updateWebsite }: { updateWebsite: UpdateWebsite }) => {
      return UpdateWebsiteData(updateWebsite);
    },
    onSuccess: () => {
      toast.success('Update website successfully!');
      queryClient.invalidateQueries({ queryKey: ['websiteData'] });
    },
  });
};

export { useWebsiteData, useUpdateWebsite };
