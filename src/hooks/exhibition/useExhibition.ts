import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/apis';
import type {
  FetchExhibitionListResponse,
  Filters,
  CreateExhibitionData,
  FetchBannerListResponse,
  ExibitionDetailResponse,
  ExhibitionCode,
  ExibitionAdminDetailResponse,
} from '@/types';
import { toast } from 'sonner';
import { ExhibiionSuccess, ExhibitionError } from '@/constants';
import { buildQueryParams } from '@/utils';

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
    const queryString = buildQueryParams(filters, pageParam);

    // Call API
    const response = await handleAPI(
      `${endpoints.exhibitions}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );

    return response.data;
  } catch (error) {
    console.error(ExhibitionError.FAILED_LIST, error);
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
    const queryString = buildQueryParams(filters, pageParam);

    // Call API
    const response = await handleAPI(
      `${endpoints.banner}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );

    return response.data;
  } catch (error) {
    console.error(ExhibitionError.FAILED_BANNER_LIST, error);
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
      throw new Error(ExhibitionError.SLUG_NULL);
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
      throw new Error(ExhibitionError.ENDPOINT);
    }

    const url = `${endpoints.exhibition.replace(':slug', slug)}${
      queryString ? `?${queryString}` : ''
    }`;

    const response = await handleAPI(url, 'POST', exhibitionCode);

    return response.data;
  } catch (error) {
    console.error(ExhibitionError.DETAILED, error);
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
      console.error(ExhibitionError.DETAILED, error);
    },
  });
};

const fetchExhibitionAdminDetail = async (
  id: string
): Promise<ExibitionAdminDetailResponse> => {
  try {
    // Check if slug is valid
    if (!id) {
      throw new Error(ExhibitionError.ID_NULL);
    }
    // Check if endpoint is valid
    if (!endpoints.exhibitionAdmin) {
      throw null;
    }
    // Call API
    const response = await handleAPI(
      `${endpoints.exhibitionAdmin.replace(':id', id)}`,
      'GET',
      null
    );
    return response.data;
  } catch (error) {
    console.error(ExhibitionError.ADMIN_DETAILED, error);
    throw error;
  }
};

// Custom hook to get detail of category
const useExhibitionAdminDetail = (id: string, refreshKey: number) => {
  return useQuery<ExibitionAdminDetailResponse, Error>({
    queryKey: ['exhibitionAdminDetail', id, refreshKey],
    queryFn: () => fetchExhibitionAdminDetail(id),
    enabled: !!id,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

// Custom hook to delete exhibition

const DeleteExhibition = async (postId: string) => {
  try {
    if (!endpoints.exhibitionEdit) {
      throw new Error(ExhibitionError.ENDPOINT);
    }

    const response = await handleAPI(
      `${endpoints.exhibitionEdit.replace(':id', postId)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || ExhibitionError.DELETED);
  }
};

const useDeleteExhibition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteExhibition,
    onSuccess: () => {
      toast.success('pl==ok');
      queryClient.invalidateQueries({ queryKey: ['exhibitionList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || ExhibitionError.DELETED);
    },
  });
};

export {
  useExhibitionList,
  useCreateExhibition,
  useBannerList,
  useExhibitionDetail,
  useExhibitionAdminDetail,
  useDeleteExhibition,
};
