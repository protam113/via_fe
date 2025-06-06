import type { Pagination } from '@/types';

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
