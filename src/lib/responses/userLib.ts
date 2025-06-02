'use client';

import { useUserList } from '@/hooks/users/useUser';
import { Filters } from '@/types/types';

export const UserList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useUserList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? {
    page: 1,
    total_page: 1,
    total: 0,
  };

  const users = data?.result ?? [];

  return {
    users,
    isLoading,
    isError,
    pagination,
  };
};
