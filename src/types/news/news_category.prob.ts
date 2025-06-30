/**
 * ==========================
 * 📌 @props ContactTableProps
 * ==========================
 */

import type { NewsCategoryList } from './news_category.type';

export interface NewsCategoryTableProps {
  news: NewsCategoryList[];
  isLoading: boolean;
  isError: boolean;
}

export interface CreateNewsCategoryDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSuccess?: () => void;
}

export interface UpdateNewsCategoryDialogProps {
  news_category: NewsCategoryList;
  open: boolean;
  setOpen: (val: boolean) => void;
  onSuccess?: () => void;
}
