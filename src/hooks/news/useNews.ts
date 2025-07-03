'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  Filters,
  FetchNewsListResponse,
  CreateNewsData,
  UpdateNewsData,
} from '@/types';
import { handleAPI, endpoints } from '@/apis';
import { toast } from 'sonner';
import { NewsError, NewsSuccess, NewsWarning } from '@/constants';
import { buildQueryParams } from '@/utils';

/**
 * ==========================s
 * 📌 @HOOK useNewsList
 * ==========================
 *
 * @desc Custom hook to get list of news
 * @returns {News[]} List of news
 */

const fetchNewsList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchNewsListResponse> => {
  try {
    const queryString = buildQueryParams(filters, pageParam);

    // Call API
    const response = await handleAPI(
      `${endpoints.newsList}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );

    return response.data;
  } catch (error) {
    console.error(NewsError.ERROR_FETCHING_LIST, error);
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
 * ========== END OF @HOOK useNewsList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreateNews
 * ==========================
 **/

const CreateNews = async (newNews: CreateNewsData) => {
  try {
    const response = await handleAPI(`${endpoints.newsList}`, 'POST', newNews);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || NewsError.FAILED_CREATE_NEWS
    );
  }
};

const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNews: CreateNewsData) => {
      return CreateNews(newNews);
    },
    onSuccess: () => {
      toast.success(NewsSuccess.CREATED_NEWS);
      queryClient.invalidateQueries({ queryKey: ['newsList'] });
    },
    onError: (error: any) => {
      console.error(error.message || NewsError.FAILED_CREATE_NEWS);
    },
  });
};

/**
 * ========== END OF @HOOK useCreateNews ==========
 */

/**
 * ==========================
 * 📌 @HOOK useUpdateNews
 * ==========================
 **/

const EditNews = async (updateNews: UpdateNewsData, postId: string) => {
  try {
    if (!endpoints.news) {
      throw null;
    }

    const url = endpoints.news.replace(':id', postId);

    const response = await handleAPI(url, 'PATCH', updateNews);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || NewsError.FAILED_UPDATE_NEWS
    );
  }
};

const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updateNews,
      postId,
    }: {
      updateNews: UpdateNewsData;
      postId: string;
    }) => {
      return EditNews(updateNews, postId);
    },
    onSuccess: () => {
      toast.success(NewsSuccess.UPDATED_NEWS);
      queryClient.invalidateQueries({ queryKey: ['newsList'] });
    },
  });
};

/**
 * ========== END OF @HOOK useUpdateNews ==========
 */

/**
 * ==========================
 * 📌 @HOOK useDeleteNews
 * ==========================
 **/

const DeleteNews = async (newsId: string) => {
  try {
    if (!endpoints.news) {
      throw new Error(NewsWarning.NEWS_ENDPOINT_NOT_DEFINED);
    }

    const response = await handleAPI(
      `${endpoints.news.replace(':id', newsId)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || NewsError.FAILED_DELETE_NEWS
    );
  }
};

const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteNews,
    onSuccess: () => {
      toast.success(NewsSuccess.DELETED_NEWS);
      queryClient.invalidateQueries({ queryKey: ['newsList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || NewsError.FAILED_DELETE_NEWS);
    },
  });
};

/**
 * ========== END OF @HOOK useDeleteNews ==========
 */

export { useNewsList, useCreateNews, useDeleteNews, useUpdateNews };
