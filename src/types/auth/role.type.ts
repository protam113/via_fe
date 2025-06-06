import type { Pagination } from '@/types';

/**
 * ==========================
 *  @ROLES
 * ==========================
 */

export interface RoleInfo {
  id: string;
  title: string;
  slug: string;
}

export interface FetchRoleListResponse {
  pagination: Pagination;
  result: RoleInfo[];
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
