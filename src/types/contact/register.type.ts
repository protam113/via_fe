import type { Pagination } from '@/types';

/**
 * ==========================
 *  @REGISTER
 * ==========================
 */

export interface RegisterList {
  id: string;
  name: string;
  email: string;
  phone_number: string;
}

export interface FetchRegisterListResponse {
  pagination: Pagination;
  result: RegisterList[];
}

export interface CreateRegisterItem {
  name: string;
  email: string;
  phone_number: string;
}

export interface DeleterRegisterData {
  ids: string[];
}
