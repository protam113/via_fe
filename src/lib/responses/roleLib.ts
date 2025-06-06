import { useRoleList } from '@/hooks';
import { Filters } from '@/types';

export const RoleList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useRoleList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? {
    page: 1,
    total_page: 1,
    total: 0,
  };

  const roles = data?.result ?? [];

  return {
    roles,
    isLoading,
    isError,
    pagination,
  };
};
