import { Pagination } from '../base/base.type';
import { Thumbnail } from '../media/media.type';

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
