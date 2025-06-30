import type { Pagination } from '../base/base.type';
import type { Thumbnail } from '../media/media.type';
import type { Category } from './category.type';

export interface Companies {
  name: string;
  url: string;
  image: string;
}

export interface Translations {
  title: string;
  language: string;
  description: string;
  content: string;
  location: string;
  price: number;
}

export interface ExhibitionData {
  start_date: string | Date;
  end_date: string | Date;
  thumbnail_id: string;
  banner_id: string;
  status: string;
  category_id: string;
  companies: Companies[];
  translations: Translations[];
}

export interface ExhibitionListData {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: Thumbnail;
  start_date: string | Date;
  end_date: string | Date;
  status: string;
  companies: Companies[];
  translations: [];
}

export interface FetchExhibitionListResponse {
  pagination: Pagination;
  result: ExhibitionListData[];
}

// Banner

export interface FetchBannerListResponse {
  id: string;
  banner: Thumbnail;
  slug_en: string;
  slug_vn: string;
}

// Create exhibition

export interface CreateCompanies {
  name: string;
  url: string;
  image: string;
}

export interface CreateTranslations {
  language: string;
  description: string;
  content: string;
  location: string;
  price: number;
}

export interface CreateExhibitionData {
  start_date: string | Date;
  end_date: string | Date;
  thumbnail_id: string;
  banner_id: string;
  status: string;
  category_id: string;
  companies: CreateCompanies[];
  translations: CreateTranslations[];
}

export interface ExibitionDetailResponse {
  id: string;
  title: string;
  slug: string;
  thumbnail: Thumbnail;
  banner: Thumbnail;
  description: string;
  start_date: string | Date;
  end_date: string | Date;
  status: string;
  companies: Companies[];
  content: string;
  location: string;
}

export interface ExhibitionCode {
  code: string;
}

export interface ExibitionAdminDetailResponse {
  id: string;
  thumbnail: Thumbnail;
  banner: Thumbnail;
  start_date: string | Date;
  end_date: string | Date;
  status: string;
  code: string;
  category: Category;
  companies: Companies[];
  translations: Translations[];
}
