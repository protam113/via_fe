'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Filters, FetchNewsListResponse, CreateNewsData } from '@/types';
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

const fetchNewsList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchNewsListResponse> => {
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
      `${endpoints.news_list}${queryString ? `?${queryString}` : ''}`,
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
const useNewsList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchNewsListResponse, Error>({
    queryKey: ['newsList', page, filters, refreshKey],
    queryFn: () => fetchNewsList(page, filters),
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

const CreateNews = async (newNews: CreateNewsData) => {
  try {
    const response = await handleAPI(`${endpoints.news_list}`, 'POST', newNews);
    return response.data;
  } catch (error: any) {
    console.error('Error creating news category:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create news category'
    );
  }
};

const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNewsCategory: CreateNewsData) => {
      return CreateNews(newNewsCategory);
    },
    onSuccess: () => {
      toast.success('News created successfully!');
      queryClient.invalidateQueries({ queryKey: ['newsList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to create  category.');
    },
  });
};

const EditNewsCategory = async (updateNews: CreateNewsData, postId: string) => {
  const formData = new FormData();

  for (const key in updateNews) {
    if (Object.prototype.hasOwnProperty.call(updateNews, key)) {
      const value = updateNews[key as keyof CreateNewsData];

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
    if (!endpoints.news) {
      throw null;
    }

    const url = endpoints.news.replace(':id', postId);

    const response = await handleAPI(url, 'PATCH', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update news');
  }
};

const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updateNews,
      postId,
    }: {
      updateNews: CreateNewsData;
      postId: string;
    }) => {
      return EditNewsCategory(updateNews, postId);
    },
    onSuccess: () => {
      toast.success('Update news successfully!');
      queryClient.invalidateQueries({ queryKey: ['newsList'] });
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
    throw new Error(error?.response?.data?.message || 'Failed to delete News');
  }
};

const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteCategory, // Directly pass the function
    onSuccess: () => {
      toast.success('Delete News Success!');
      queryClient.invalidateQueries({ queryKey: ['newsList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete News.');
      toast.error(error.message || 'Failed to delete News.');
    },
  });
};

export { useNewsList, useCreateNews, useDeleteNews, useUpdateNews };
