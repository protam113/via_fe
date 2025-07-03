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
import { buildQueryParams } from '@/utils';

/**
 * ==========================s
 * 📌 @HOOK useNewsCategoryList
 * ==========================
 *
 * @desc Custom hook to get list of news categories
 * @returns {NewsCategory[]} List of news categories
 */

const fetchNewsCategoriesList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchNewsCategoryListResponse> => {
  try {
    // Check if endpoint is valid
    const queryString = buildQueryParams(filters, pageParam);

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
 * ========== END OF @HOOK useNewsCategoryList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreateNewsCategory
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

/**
 * ========== END OF @HOOK useCreateNewsCategory ==========
 */

/**
 * ==========================
 * 📌 @HOOK useUpdateNewsCategory
 * ==========================
 **/

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
 * ========== END OF @HOOK useUpdateNewsCategory ==========
 */

/**
 * ==========================
 * 📌 @HOOK useDeleteNewsCategory
 * ==========================
 **/

const DeleteNewsCategory = async (categoryIds: DeleteNewsCategoryData) => {
  try {
    const response = await handleAPI(
      `${endpoints.newsCategoryBulk}`,
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
    mutationFn: DeleteNewsCategory,
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

/**
 * ========== END OF @HOOK useDeleteNewsCategory ==========
 */

export {
  useNewsCategoryList,
  useCreateNewsCategory,
  useDeleteNewsCategory,
  useUpdateNewsCategory,
};
