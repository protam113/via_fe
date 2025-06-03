import { useQuery } from '@tanstack/react-query';
import { endpoints } from '@/apis/api';
import { FetchRoleListResponse, Filters, RoleDetail } from '@/types/types';
import { handleAPI } from '@/apis/axiosClient';

/**
 * ==========================
 * 📌 @HOOK useEmployeeList
 * ==========================
 *
 * @desc Custom hook to get list of employee
 * @returns {Employee} List of employee
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

    // Tạo query string từ filters
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
    console.error('Error fetching user list:', error);
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
    // Check if slug is valid
    if (!slug) {
      throw new Error('Slug is required');
    }
    // Check if endpoint is valid
    if (!endpoints.role) {
      throw null;
    }
    // Call API
    const response = await handleAPI(
      `${endpoints.role.replace(':slug', slug)}`,
      'GET',
      null
    );
    return response;
  } catch (error) {
    console.error('Error fetching role detail:', error);
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
