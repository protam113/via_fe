import type { Filters } from '@/types';
import { useRegisterList } from '@/hooks/contact/useRegister';

// RegisterList.ts
export const RegisterList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useRegisterList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  const registers = data?.result ?? [];
  return {
    registers,
    isLoading,
    isError,
    pagination,
  };
};
