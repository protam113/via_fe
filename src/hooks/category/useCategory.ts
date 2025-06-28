import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/apis';
import {
  FetchCategoryListResponse,
  Filters,
  UpdateThumbnail,
  CategoryCountData,
} from '@/types';
import { CategoryError, CategorySuccess } from '@/constants';
import { toast } from 'sonner';

/**
 * ==========================
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

    return response.data;
  } catch (error) {
    console.error(CategoryError.ERROR_FETCHING_CATEGORY_LIST, error);
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

const EditCategory = async (updateCategory: UpdateThumbnail, id: string) => {
  try {
    if (!endpoints.categoryEdit) {
      throw null;
    }

    const url = endpoints.categoryEdit.replace(':id', id);

    const response = await handleAPI(url, 'PATCH', updateCategory);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || CategoryError.ERROR_UPDATING_CATEGORY
    );
  }
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updateCategory,
      id,
    }: {
      updateCategory: UpdateThumbnail;
      id: string;
    }) => {
      return EditCategory(updateCategory, id);
    },
    onSuccess: () => {
      toast.success(CategorySuccess.UPDATED_NEWS_CATEGORY);
      queryClient.invalidateQueries({ queryKey: ['newsCategoryList'] });
    },
  });
};

const fetchCategoryCount = async (): Promise<CategoryCountData> => {
  try {
    // Call API
    const response = await handleAPI(
      `${endpoints.adminCategoryCount}`,
      'GET',
      null
    );

    return response;
  } catch (error) {
    console.error(CategoryError.ERROR_FETCHING_CATEGORY_COUNT, error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useCategoryCountData = (refreshKey: number) => {
  return useQuery<CategoryCountData, Error>({
    queryKey: ['categoryCountData', refreshKey],
    queryFn: () => fetchCategoryCount(),
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

export { useCategoryList, useUpdateCategory, useCategoryCountData };
