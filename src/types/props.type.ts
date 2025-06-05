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

export interface ImagePlaceholderOptions {
  HTMLAttributes: Record<string, any>;
  onUpload?: (url: string) => void;
  onError?: (error: string) => void;
}

export interface NoResultsFoundProps {
  title?: string;
  message?: string;
}

/**
 * ==========================
 * @PushButtonProps
 * ==========================
 */ export interface PushButtonProps {
  href: string;
  label: string;
}

export interface AdminUserProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;

  selectedRole?: string;
  onRoleChange: (value?: string) => void;

  roles?: { id: string; title: string }[];
  isRoleLoading: boolean;
  isRoleError: boolean;

  onRefresh: () => void;
}

export interface AdminLoadingProps {
  size?: number;
  message?: string;
  className?: string;
}

export interface ImageUploadPreviewProps {
  onImageUploaded?: (imageUrl: string, imageId: string) => void;
  type?: string;
}
