import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/apis/api';
import { Filters, FetchCategoryListResponse } from '@/types/types';
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

const fetchCategoriesList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchCategoryListResponse> => {
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
      `${endpoints.categories}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );
    logDebug('detail :', response);
    logDebug('dta :', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching categories list:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useCategoryList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchCategoryListResponse, Error>({
    queryKey: ['categoryList', page, filters, refreshKey],
    queryFn: () => fetchCategoriesList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

export { useCategoryList };
