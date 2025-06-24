'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Filters,
  FetchNewsCategoryListResponse,
  CreateNewsCategoryData,
} from '@/types';
import { handleAPI, endpoints } from '@/apis';
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
      `${endpoints.news_categories}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching news categories list:', error);
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
Create role
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
      `${endpoints.news_categories}`,
      'POST',
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating news category:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create news category'
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
      toast.success('News Category created successfully!');
      queryClient.invalidateQueries({ queryKey: ['newsCategoryList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to create  category.');
    },
  });
};

const EditNewsCategory = async (
  updateNewsCategory: CreateNewsCategoryData,
  postId: string
) => {
  const formData = new FormData();

  for (const key in updateNewsCategory) {
    if (Object.prototype.hasOwnProperty.call(updateNewsCategory, key)) {
      const value = updateNewsCategory[key as keyof CreateNewsCategoryData];

      if (Array.isArray(value)) {
        // If the value is an array, append each element
        value.forEach((v) => formData.append(key, v));
      } else if (typeof value === 'string') {
        // If the value is a string, append to FormData
        formData.append(key, value);
      }
    }
  }

  try {
    if (!endpoints.categoryStatus) {
      throw null;
    }

    const url = endpoints.categoryStatus.replace(':id', postId);

    const response = await handleAPI(url, 'PATCH', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update service'
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
      toast.success('Update news category successfully!');
      queryClient.invalidateQueries({ queryKey: ['newsCategoryList'] });
    },
  });
};

/**
 * ========== END OF @HOOK useCreateCategory ==========
 */

const DeleteCategory = async (categoryId: string) => {
  try {
    if (!endpoints.categoryEdit) {
      throw new Error('Contact endpoint is not defined.');
    }

    const response = await handleAPI(
      `${endpoints.categoryEdit.replace(':id', categoryId)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Category:',
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || 'Failed to delete Category'
    );
  }
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteCategory, // Directly pass the function
    onSuccess: () => {
      toast.success('Delete Category Success!');
      queryClient.invalidateQueries({ queryKey: ['newsCategoryList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Category.');
      toast.error(error.message || 'Failed to delete Category.');
    },
  });
};

export {
  useNewsCategoryList,
  useCreateNewsCategory,
  useDeleteCategory,
  useUpdateNewsCategory,
};
