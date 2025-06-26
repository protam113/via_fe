import { Category, CategoryData } from '@/types';

/**
 * ==========================
 * 📌 @props CategoryTableProps
 * ==========================
 */

export interface CategoryTableProps {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
}

export interface UpdateCategoryDialogProps {
  category: CategoryData;
  open: boolean;
  setOpen: (val: boolean) => void;
  onSuccess?: () => void;
}
