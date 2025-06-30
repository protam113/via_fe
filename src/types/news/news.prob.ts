/**
 * ==========================
 * 📌 @props NewsTableProps
 * ==========================
 */

import type { NewsList } from './news.type';

export interface NewsTableProps {
  news: NewsList[];
  isLoading: boolean;
  isError: boolean;
}

export interface CreateNewsDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSuccess?: () => void;
}

export interface UpdateNewsDialogProps {
  news: NewsList;
  open: boolean;
  setOpen: (val: boolean) => void;
  onSuccess?: () => void;
}
