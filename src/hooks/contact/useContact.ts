import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/apis';
import type {
  FetchContactListResponse,
  CreateContactItem,
  Filters,
  ApprovedContact,
  ContactCountData,
} from '@/types';
import { toast } from 'sonner';
import { ContactError, ContactSuccess } from '@/constants';
import { buildQueryParams } from '@/utils';

/**
 * ==========================
 * 📌 @HOOK useContactList
 * ==========================
 *
 * @desc Custom hook to get list of contacts.
 * @returns {Contacts[]} List of contacts.
 */

const fetchContactList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchContactListResponse> => {
  try {
    const queryString = buildQueryParams(filters, pageParam);

    const response = await handleAPI(
      `${endpoints.contacts}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );

    return response.data;
  } catch (error) {
    console.error(ContactError.ERROR_FETCHING_LIST, error);
    throw error;
  }
};

/**
 * Custom hook to get list of contacts using React Query.
 */
const useContactList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchContactListResponse, Error>({
    queryKey: ['contactList', page, filters, refreshKey],
    queryFn: () => fetchContactList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useContactsList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreateContact
 * ==========================
 **/

const CreateContact = async (newContact: CreateContactItem) => {
  try {
    const response = await handleAPI(
      `${endpoints.contacts}`,
      'POST',
      newContact
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || ContactError.FAILED_CREATE_CONTACT
    );
  }
};

const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newContact: CreateContactItem) => {
      return CreateContact(newContact);
    },
    onSuccess: () => {
      toast.success(ContactSuccess.SENDED_CONTACT);
      queryClient.invalidateQueries({ queryKey: ['contactList'] });
    },
    onError: (error: any) => {
      console.error(error.message || ContactError.FAILED_CREATE_CONTACT);
    },
  });
};

/**
 * ========== END OF @HOOK useCreateContact ==========
 */

/** * ==========================
 * 📌 @HOOK useUpdateContact
 * ==========================
 */

const ApprovedContactList = async (contactIds: ApprovedContact) => {
  try {
    const response = await handleAPI(
      `${endpoints.contact}`,
      'POST',
      contactIds
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || ContactError.FAILED_UPDATE
    );
  }
};

const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ApprovedContactList,
    onSuccess: () => {
      toast.success(ContactSuccess.UPDATED_CONTACT);
      queryClient.invalidateQueries({ queryKey: ['contactList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || ContactError.FAILED_UPDATE);
    },
  });
};

/**
 * ========== END OF @HOOK useUpdateContact ==========
 */

const fetchContactCount = async (): Promise<ContactCountData> => {
  try {
    const response = await handleAPI(`${endpoints.contactCount}`, 'GET', null);

    return response;
  } catch (error) {
    console.error(ContactError.COUNTED, error);
    throw error;
  }
};

const useContactCountData = (refreshKey: number) => {
  return useQuery<ContactCountData, Error>({
    queryKey: ['contactCountData', refreshKey],
    queryFn: () => fetchContactCount(),
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

export {
  useContactList,
  useCreateContact,
  useUpdateContact,
  useContactCountData,
};
