/**
 * ==========================
 *  @FILTERS
 * ==========================
 */

export interface Filters {
  [key: string]: string | number | string[] | undefined;
}

/**
 * ==========================
 *  @PAGINATION
 * ==========================
 */

interface Pagination {
  page: number;
  page_size: number;
  total: number;
  total_page: number;
}

/**
 * ==========================
 *  @SEO
 * ==========================
 */

export interface SeoData {
  site_title: string;
  site_description: string;
  keywords: string[];
  domain: string;
}

/**
 * ==========================
 *  @UPDATE_SEO
 * ==========================
 */

export interface UpdateSeo {
  site_title?: string;
  site_description?: string;
  domain?: string;
  keywords?: string[];
  google_analytics_id?: string;
  gtm_id?: string;
  facebook_pixel_id?: string;
  search_console_verification?: string;
}

/**
 * ==========================
 *  @USERS
 * ==========================
 */
interface UsersData {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
}

export interface FetchManagerListResponse {
  pagination: Pagination;
  result: UsersData[];
}

export interface CreateManagerData {
  username: string;
  name: string;
  email: string;
  password: string;
}

/**
 * ==========================
 *  @ROLES
 * ==========================
 */

interface RolesData {
  id: string;
  title: string;
  slug: string;
}

export interface FetchRoleListResponse {
  pagination: Pagination;
  result: RolesData[];
}

/**
 * ==========================
 *  @ROLE_DETAIL
 * ==========================
 */

export interface RoleDetail {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

/**
 * ==========================
 *  @CONTACT
 * ==========================
 */

interface ContactList {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  message: string;
  location: string;
  status: string;
}

export interface FetchContactListResponse {
  pagination: Pagination;
  result: ContactList[];
}

export interface CreateContactItem {
  name: string;
  email: string;
  phone_number: string;
  message: string;
  location: string;
  exhibition_id?: string;
}

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
  thumbnail: string;
  description: string;
}

export interface FetchCategoryListResponse {
  pagination: Pagination;
  result: Category[];
}

export interface CreateCategoryItem {
  name: string;
  type: string;
  status?: string;
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
