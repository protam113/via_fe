import { ContactCountData, Filters } from '@/types';
import { useContactCountData, useContactList } from '@/hooks';

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
  return {
    contacts,
    isLoading,
    isError,
    pagination,
  };
};

// ContactCountList.ts

export const ContactCountList = (refreshKey: number) => {
  const { data, isLoading, isError } = useContactCountData(refreshKey);

  const contactCount = data ?? ({} as Partial<ContactCountData>);

  return {
    contactCount,
    isLoading,
    isError,
  };
};
