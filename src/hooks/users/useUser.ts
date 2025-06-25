import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/apis';
import { FetchManagerListResponse, CreateManagerData, Filters } from '@/types';
import { toast } from 'sonner';
import { logDebug } from '@/utils';
import { EmployeeError, EmployeeSuccess } from '@/constants';

/**
 * ==========================
 * 📌 @HOOK useEmployeeList
 * ==========================
 *
 * @desc Custom hook to get list of employee
 * @returns {Employee} List of employee
 */

const fetchUserList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchManagerListResponse> => {
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

    const response = await handleAPI(
      `${endpoints.users}${queryString ? `?${queryString}` : ''}`,
      'GET'
    );
    return response.data;
  } catch (error) {
    console.error(EmployeeError.ERROR_FETCHING_EMPLOYEE_LIST, error);
    throw error;
  }
};

const useUserList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchManagerListResponse, Error>({
    queryKey: ['userList', page, filters, refreshKey],
    queryFn: () => fetchUserList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useEmployeeList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreate Employee
 * ==========================
 *
 * @desc Custom hook to create employee
 * @returns {Employee} Detail of employee
 */

const createManager = async (managerData: CreateManagerData) => {
  try {
    const response = await handleAPI(
      `${endpoints.createManager}`,
      'POST',
      managerData
    );

    return response.data;
  } catch (error: any) {
    // Extract error messages from response
    const errorMessages = error.response?.data?.message;
    let errorMessage = 'Failed to create manager';

    if (Array.isArray(errorMessages) && errorMessages.length > 0) {
      // Take the first error message
      errorMessage = errorMessages[0];
    } else if (typeof errorMessages === 'string') {
      errorMessage = errorMessages;
    }

    throw new Error(errorMessage);
  }
};

const useCreateManager = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newManage: CreateManagerData) => {
      return createManager(newManage);
    },
    onSuccess: () => {
      toast.success(EmployeeSuccess.CREATED_EMPLOYEE);
      queryClient.invalidateQueries({ queryKey: ['userList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || EmployeeError.FAILED_CREATE_EMPLOYEE);
      console.error(error.message || EmployeeError.FAILED_CREATE_EMPLOYEE);
    },
  });
};

// /**
//  * ========== END OF @HOOK useCreateEmployee ==========
//  */

const DeleteUser = async (userID: string) => {
  try {
    if (!endpoints.userDetail) {
      throw new Error(EmployeeError.USER_ENDPOINT_NOT_DEFINED);
    }

    const response = await handleAPI(
      `${endpoints.userDetail.replace(':id', userID)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || EmployeeError.FAILED_DELETE_USER
    );
  }
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteUser,
    onSuccess: () => {
      toast.success(EmployeeSuccess.DELETED_EMPLOYEE);
      queryClient.invalidateQueries({ queryKey: ['userList'] });
    },
    onError: (error: any) => {
      console.error(error.message || EmployeeError.FAILED_DELETE_USER);
      toast.error(error.message || EmployeeError.FAILED_DELETE_USER);
    },
  });
};

export { useUserList, useCreateManager, useDeleteUser };
