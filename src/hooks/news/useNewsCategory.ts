'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  Filters,
  FetchNewsCategoryListResponse,
  CreateNewsCategoryData,
  DeleteNewsCategoryData,
} from '@/types';
import { handleAPI, endpoints } from '@/apis';
import { toast } from 'sonner';
import { NewsCategoryError, NewsCategorySuccess } from '@/constants';

/**
 * ==========================s
 * 📌 @HOOK useCategoryList
 * ==========================
 *
 * @desc Custom hook to get list of categories
 * @returns {Category[]} List of categories
 */

const fetchNewsCategoriesList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchNewsCategoryListResponse> => {
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
      `${endpoints.newsCategories}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );

    return response.data;
  } catch (error) {
    console.error(NewsCategoryError.ERROR_FETCHING_CATEGORY_LIST, error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useNewsCategoryList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchNewsCategoryListResponse, Error>({
    queryKey: ['newsCategoryList', page, filters, refreshKey],
    queryFn: () => fetchNewsCategoriesList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreateCategory
 * ==========================
 **/

const CreateCategory = async (newNewsCategory: CreateNewsCategoryData) => {
  const formData = new FormData();

  for (const key in newNewsCategory) {
    if (Object.prototype.hasOwnProperty.call(newNewsCategory, key)) {
      const value = newNewsCategory[key as keyof CreateNewsCategoryData];

      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else if (typeof value === 'string') {
        formData.append(key, value);
      }
    }
  }

  try {
    const response = await handleAPI(
      `${endpoints.newsCategories}`,
      'POST',
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error(NewsCategoryError.ERROR_CREATING_CATEGORY, error);
    throw new Error(
      error.response?.data?.message || NewsCategoryError.ERROR_CREATING_CATEGORY
    );
  }
};

const useCreateNewsCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNewsCategory: CreateNewsCategoryData) => {
      return CreateCategory(newNewsCategory);
    },
    onSuccess: () => {
      toast.success(NewsCategorySuccess.CREATED_NEWS_CATEGORY);
      queryClient.invalidateQueries({ queryKey: ['newsCategoryList'] });
    },
    onError: (error: any) => {
      console.error(error.message || NewsCategoryError.ERROR_CREATING_CATEGORY);
    },
  });
};

const EditNewsCategory = async (
  updateNewsCategory: CreateNewsCategoryData,
  postId: string
) => {
  try {
    if (!endpoints.newsCategory) {
      throw null;
    }

    const url = endpoints.newsCategory.replace(':id', postId);

    const response = await handleAPI(url, 'PATCH', updateNewsCategory);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || NewsCategoryError.ERROR_UPDATING_CATEGORY
    );
  }
};

const useUpdateNewsCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updateNewsCategory,
      postId,
    }: {
      updateNewsCategory: CreateNewsCategoryData;
      postId: string;
    }) => {
      return EditNewsCategory(updateNewsCategory, postId);
    },
    onSuccess: () => {
      toast.success(NewsCategorySuccess.UPDATED_NEWS_CATEGORY);
      queryClient.invalidateQueries({ queryKey: ['newsCategoryList'] });
    },
  });
};

/**
 * ========== END OF @HOOK useCreateCategory ==========
 */

const DeleteNewsCategory = async (categoryIds: DeleteNewsCategoryData) => {
  try {
    const response = await handleAPI(
      `${endpoints.news_category_bulk}`,
      'DELETE',
      categoryIds
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        NewsCategoryError.FAILED_DELETE_NEWS_CATEGORY
    );
  }
};

const useDeleteNewsCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteNewsCategory, // Directly pass the function
    onSuccess: () => {
      toast.success(NewsCategorySuccess.DELETED_NEWS_CATEGORY);
      queryClient.invalidateQueries({ queryKey: ['newsCategoryList'] });
    },
    onError: (error: any) => {
      toast.error(
        error.message || NewsCategoryError.FAILED_DELETE_NEWS_CATEGORY
      );
    },
  });
};

export {
  useNewsCategoryList,
  useCreateNewsCategory,
  useDeleteNewsCategory,
  useUpdateNewsCategory,
};
