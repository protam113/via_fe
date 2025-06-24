/**
 * ==========================
 * 📌 @props ContactTableProps
 * ==========================
 */

import { NewsList } from './news.type';

export interface NewsTableProps {
  news: NewsList[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: string) => void;
}

export interface CreateNewsCategoryDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSuccess?: () => void;
}
