import type { Pagination } from '@/types';

/**
 * ==========================
 *  @NEWS_CATEGORY
 * ==========================
 */

export interface NewsCategoryList {
  id: string;
  title: string;
  slug: string;
}

export interface NewsCategoryRespone {
  id: string;
  title: string;
  slug: string;
}

export interface FetchNewsCategoryListResponse {
  pagination: Pagination;
  result: NewsCategoryList[];
}

export interface CreateNewsCategoryData {
  title: string;
}

export interface DeleteNewsCategoryData {
  ids: string[];
}
