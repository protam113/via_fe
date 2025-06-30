import { useQuery } from '@tanstack/react-query';
import type { FetchRoleListResponse, RoleDetail, Filters } from '@/types';
import { endpoints, handleAPI } from '@/apis';
import { RoleError } from '@/constants';

/**
 * ==========================
 * 📌 @HOOK useRoleList
 * ==========================
 *
 * @desc Custom hook to get list of roles
 * @returns {Role[]} List of roles
 */

const fetchRoleList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchRoleListResponse> => {
  try {
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== ''
      )
    );

    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters,
    }).toString();

    // Gọi API
    const response = await handleAPI(
      `${endpoints.roles}${queryString ? `?${queryString}` : ''}`,
      'GET'
    );
    return response.data;
  } catch (error) {
    console.error(RoleError.ERROR_FETCHING_ROLE_LIST, error);
    throw error;
  }
};

const useRoleList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchRoleListResponse, Error>({
    queryKey: ['roleList', page, filters, refreshKey],
    queryFn: () => fetchRoleList(page, filters),
    enabled: page > 0, // Bật query nếu page hợp lệ
    staleTime: 60000,
  });
};

const fetchRoleDetail = async (slug: string): Promise<RoleDetail> => {
  try {
    if (!slug) {
      throw new Error(RoleError.SLUG_REQUIRED);
    }
    if (!endpoints.role) {
      throw null;
    }
    const response = await handleAPI(
      `${endpoints.role.replace(':slug', slug)}`,
      'GET',
      null
    );
    return response;
  } catch (error) {
    console.error(RoleError.ERROR_FETCHING_ROLE_DETAIL, error);
    throw error;
  }
};

// Custom hook to get detail of category
const useRoleDetail = (slug: string, refreshKey: number) => {
  return useQuery<RoleDetail, Error>({
    queryKey: ['roleDetail', slug, refreshKey],
    queryFn: () => fetchRoleDetail(slug),
    enabled: !!slug,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

export { useRoleList, useRoleDetail };
