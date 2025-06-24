/**
 * ==========================
 * 📌 @props ContactTableProps
 * ==========================
 */

import { NewsCategoryList } from './news_category.type';

export interface NewsCategoryTableProps {
  news: NewsCategoryList[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: string) => void;
}
