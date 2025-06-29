import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/apis';
import {
  FetchExhibitionListResponse,
  Filters,
  CreateExhibitionData,
  FetchBannerListResponse,
  ExibitionDetailResponse,
  ExhibitionCode,
} from '@/types';
import { toast } from 'sonner';
import { logDebug } from '@/utils';
import { ExhibiionSuccess, ExhibitionError } from '@/constants';

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

const CreateExhibition = async (newExhibition: CreateExhibitionData) => {
  try {
    const response = await handleAPI(
      `${endpoints.exhibitions}`,
      'POST',
      newExhibition
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || ExhibitionError.FAILED_CREATED
    );
  }
};

const useCreateExhibition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newContact: CreateExhibitionData) => {
      return CreateExhibition(newContact);
    },
    onSuccess: () => {
      toast.success(ExhibiionSuccess.CREATED);
      queryClient.invalidateQueries({ queryKey: ['exhibitionList'] });
    },
    onError: (error: any) => {
      console.error(error.message || ExhibitionError.FAILED_CREATED);
    },
  });
};

const fetchfetchBannerList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchBannerListResponse> => {
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
      `${endpoints.banner}${queryString ? `?${queryString}` : ''}`,
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
const useBannerList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchBannerListResponse, Error>({
    queryKey: ['exhibitionBannerList', page, filters, refreshKey],
    queryFn: () => fetchfetchBannerList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

const fetchExhibitionDetail = async (
  exhibitionCode: ExhibitionCode,
  slug: string,
  filters: Filters
): Promise<ExibitionDetailResponse> => {
  try {
    if (!slug) {
      throw new Error('Slug is required');
    }

    const validFilters = Object.fromEntries(
      Object.entries(filters)
        .filter(([, value]) => value !== undefined && value !== '')
        .map(([key, value]) => [key, String(value)])
    );

    // Create query string from filters
    const queryString = new URLSearchParams({
      ...validFilters,
    }).toString();
    if (!endpoints.exhibition) {
      throw new Error('Exhibition endpoint is not defined');
    }

    const url = `${endpoints.exhibition.replace(':slug', slug)}${
      queryString ? `?${queryString}` : ''
    }`;

    const response = await handleAPI(url, 'POST', exhibitionCode);

    return response.data;
  } catch (error) {
    console.error('Error fetching exhibition detail:', error);
    throw error;
  }
};

// Custom hook to get detail of category
const useExhibitionDetail = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      exhibitionCode,
      filters,
    }: {
      exhibitionCode: ExhibitionCode;
      filters: Filters;
    }) => {
      return fetchExhibitionDetail(exhibitionCode, slug, filters);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exhibitionDetail'] });
    },
    onError: (error) => {
      console.error('Failed to fetch exhibition detail:', error);
    },
  });
};

export {
  useExhibitionList,
  useCreateExhibition,
  useBannerList,
  useExhibitionDetail,
};
