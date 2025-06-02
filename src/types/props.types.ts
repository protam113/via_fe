/**
 * ==========================
 * 📌 @props ContactTableProps
 * ==========================
 */

import { Category } from './types';

export interface ContactTableProps {
  contacts: any[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: string) => void;
}

/**
 * ==========================
 * 📌 @props CategoryTableProps
 * ==========================
 */

export interface CategoryTableProps {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
}
