import { ReactNode } from 'react';

export interface NoResultsFoundProps {
  title?: string;
  message?: string;
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

export interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

/**
 * ==========================
 *  @BUTTON PROPS
 *  @DESCRIPTION : This file exports all the button props used in the application.
 *  @VERSION 1.0.0
 * ==========================
 */

export interface IGetStartedButtonProps {
  text: string;
  className?: string;
  url: string;
}

export interface RefreshButtonProps {
  onClick: () => void;
  className?: string;
}

export interface PushButtonProps {
  href: string;
  label: string;
}

/**
 * ==========================
 *  @MEDIA PROPS
 *  @DESCRIPTION : This file exports all the media props used in the application.
 *  @VERSION 1.0.0
 * ==========================
 */

export interface ImagePlaceholderOptions {
  HTMLAttributes: Record<string, any>;
  onUpload?: (url: string) => void;
  onError?: (error: string) => void;
}

export interface ImageUploadPreviewProps {
  onImageUploaded?: (imageUrl: string, imageId: string) => void;
  type?: string;
}

/**
 * ==========================
 *  @CONTAINER_PROPS
 *  @DESCRIPTION : This file exports the container props used in the application.
 *  @VERSION 1.0.0
 * ==========================
 */

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}
