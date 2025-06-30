import type { Pagination } from '@/types';
import type { NewsCategoryList } from './news_category.type';

/**
 * ==========================
 *  @NEWS
 * ==========================
 */

export interface NewsList {
  id: string;
  title: string;
  slug: string;
  url: string;
  url_type: string;
  type: string;
  category: NewsCategoryList;
}

export interface FetchNewsListResponse {
  pagination: Pagination;
  result: NewsList[];
}

export interface CreateNewsData {
  title: string;
  url: string;
  url_type: string;
  type: string;
  category_id: string;
}

export interface UpdateNewsData {
  title?: string;
  url?: string;
  url_type?: string;
  type?: string;
  category_id?: string;
}
