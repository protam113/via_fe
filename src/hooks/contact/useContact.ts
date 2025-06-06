import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/apis';
import { FetchContactListResponse, CreateContactItem, Filters } from '@/types';
import { toast } from 'sonner';
import { logDebug } from '@/utils';

/**
 * ==========================
 * 📌 @HOOK useContactList
 * ==========================
 *
 * @desc Custom hook to get list of contacts.
 * @returns {Contacts[]} List of contacts.
/
 */

const fetchContactList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchContactListResponse> => {
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
      `${endpoints.contacts}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );
    logDebug(handleAPI);

    return response.data;
  } catch (error) {
    console.error('Error fetching categories list:', error);
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
Create role
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
    console.error('Error creating contact:', error.response?.data);
    logDebug('🐞 Data:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create contact'
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
      toast.success(' Contact sent successfully!');
      queryClient.invalidateQueries({ queryKey: ['contactList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to create  contact.');
      logDebug('🐞 Data:', error.message);
    },
  });
};

/**
 * ========== END OF @HOOK useCreateContact ==========
 */

const DeleteContact = async (contactId: string) => {
  try {
    if (!endpoints.contact) {
      throw new Error('Contact endpoint is not defined.');
    }

    const response = await handleAPI(
      `${endpoints.contact.replace(':id', contactId)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Contact:',
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || 'Failed to delete Contact'
    );
  }
};

const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteContact, // Directly pass the function
    onSuccess: () => {
      toast.success('Delete Contact Success!');
      queryClient.invalidateQueries({ queryKey: ['contactList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Contact.');
      toast.error(error.message || 'Failed to delete Contact.');
    },
  });
};

export { useContactList, useCreateContact, useDeleteContact };
