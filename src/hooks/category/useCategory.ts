import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/apis/api';
import {
  Filters,
  FetchCategoryListResponse,
  CreateCategoryItem,
} from '@/types/types';
import { handleAPI } from '@/apis/axiosClient';
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
    logDebug('detail :', response);
    logDebug('dta :', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching categories list:', error);
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

/**
 * ==========================
 * 📌 @HOOK useCreateCategory
 * ==========================
Create role
 **/

const CreateCategory = async (newCategory: CreateCategoryItem) => {
  const formData = new FormData();

  for (const key in newCategory) {
    if (Object.prototype.hasOwnProperty.call(newCategory, key)) {
      const value = newCategory[key as keyof CreateCategoryItem];

      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else if (typeof value === 'string') {
        formData.append(key, value);
      }
    }
  }

  try {
    const response = await handleAPI(
      `${endpoints.categories}`,
      'POST',
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating category:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create category'
    );
  }
};

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategory: CreateCategoryItem) => {
      return CreateCategory(newCategory);
    },
    onSuccess: () => {
      toast.success(' Category created successfully!');
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to create  category.');
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
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Category.');
      toast.error(error.message || 'Failed to delete Category.');
    },
  });
};

export { useCategoryList, useCreateCategory, useDeleteCategory };
