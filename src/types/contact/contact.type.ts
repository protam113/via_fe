import type { Pagination } from '@/types';

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
