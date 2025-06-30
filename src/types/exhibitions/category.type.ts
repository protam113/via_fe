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

export interface UpdateThumbnail {
  thumbnail_id: string;
}

export interface CategoryData {
  id: string;
  thumbnail: Thumbnail | null;
}

export interface CategoryCount {
  title: string;
  total_count: number;
}

export type CategoryCountData = {
  data: CategoryCount[];
};

// ========================
// End Category
// ========================
