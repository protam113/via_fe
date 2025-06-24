import { useQuery } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/apis';
import { FetchExhibitionListResponse, Filters } from '@/types';
import { toast } from 'sonner';
import { logDebug } from '@/utils';

/**
 * ==============
 * 📌 @HOOK useExhibitionList
 * ==========================
 *
 * @desc Custom hook to get list of exhibitions
 * @returns {Exhibition[]} List of exhibitions
 */

const fetchExhibitionList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchExhibitionListResponse> => {
  try {
    // Check if endpoint is valid
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== ''
      )
    );

    // Create query string from filters
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters,
    }).toString();

    // Call API
    const response = await handleAPI(
      `${endpoints.exhibitions}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching exhibitions list:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of exhibitions using React Query.
 */
const useExhibitionList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchExhibitionListResponse, Error>({
    queryKey: ['exhibitionList', page, filters, refreshKey],
    queryFn: () => fetchExhibitionList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useExhibitionList ==========
 */

export { useExhibitionList };
