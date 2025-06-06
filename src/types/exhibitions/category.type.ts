import type { Pagination, Thumbnail } from '@/types';

/**
 * ==========================
 *  @CATEGORY
 * ==========================
 */

/*
  Category Attribute Declaration
*/
export interface Category {
  id: string;
  title: string;
  slug: string;
  thumbnail: Thumbnail | null;
  description: string;
}

export interface FetchCategoryListResponse {
  pagination: Pagination;
  result: Category[];
}

/*
    Category Detail Attribute Declaration
  */
interface CategoryDetail {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface FetchCategoryDetailResponse {
  status: string;
  data: CategoryDetail;
}

// ========================
// End Category
// ========================
