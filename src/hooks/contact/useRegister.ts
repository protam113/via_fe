import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/apis';
import type {
  FetchRegisterListResponse,
  CreateRegisterItem,
  Filters,
  DeleterRegisterData,
} from '@/types';
import { toast } from 'sonner';
import { RegisterError, RegisterSuccess } from '@/constants';
import { buildQueryParams } from '@/utils';

/**
 * ==========================
 * 📌 @HOOK useRegisterList
 * ==========================
 *
 * @desc Custom hook to get list of register.
 * @returns {Register[]} List of register.
 */

const fetchRegisterList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchRegisterListResponse> => {
  try {
    // Create query string from filters
    const queryString = buildQueryParams(filters, pageParam);

    // Call API
    const response = await handleAPI(
      `${endpoints.registerNotify}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );

    return response.data;
  } catch (error) {
    console.error(RegisterError.ERROR_FETCHING_LIST, error);
    throw error;
  }
};

/**
 * Custom hook to get list of contacts using React Query.
 */
const useRegisterList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchRegisterListResponse, Error>({
    queryKey: ['registerList', page, filters, refreshKey],
    queryFn: () => fetchRegisterList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useRegisterList ==========
 */
/**
 * ==========================
 * 📌 @HOOK useCreateRegister
 * ==========================
 **/

const CreateRegister = async (newContact: CreateRegisterItem) => {
  try {
    const response = await handleAPI(
      `${endpoints.registerNotify}`,
      'POST',
      newContact
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || RegisterError.CREATED);
  }
};

const useCreateRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newContact: CreateRegisterItem) => {
      return CreateRegister(newContact);
    },
    onSuccess: () => {
      toast.success(RegisterSuccess.SENDED);
      queryClient.invalidateQueries({ queryKey: ['registerList'] });
    },
    onError: (error: any) => {
      console.error(error.message || RegisterError.CREATED);
    },
  });
};

/**
 * ========== END OF @HOOK useCreateRegister ==========
 */

/** * ==========================
 * 📌 @HOOK useDeleteRegister
 * ==========================
 */

const DeleteRegisterList = async (registerIds: DeleterRegisterData) => {
  try {
    const response = await handleAPI(
      `${endpoints.registerNotify}`,
      'DELETE',
      registerIds
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || RegisterError.DELETED);
  }
};

const useDeleteRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteRegisterList,
    onSuccess: () => {
      toast.success(RegisterSuccess.DELETED);
      queryClient.invalidateQueries({ queryKey: ['registerList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || RegisterError.DELETED);
    },
  });
};

/**
 * ========== END OF @HOOK useDeleteRegister ==========
 */

export { useRegisterList, useCreateRegister, useDeleteRegister };
