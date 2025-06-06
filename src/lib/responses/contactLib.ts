import { Filters } from '@/types';
import { useContactList } from '@/hooks';
import { logDebug } from '@/utils/logger';

// ContactList.ts
export const ContactList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useContactList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  const contacts = data?.result ?? [];
  logDebug('🐞 Data:', contacts);
  return {
    contacts,
    isLoading,
    isError,
    pagination,
  };
};
