export interface Thumbnail {
  id: string;
  type: string;
  url: string;
}

/**
 * ==========================
 *  @MEDIA
 * ==========================
 */

export interface PresignItem {
  name: string;
  type: string;
}

export interface SubmitItem {
  name: string;
  type: string;
}

/**
 * ==========================
 *  @UPLOAD_STATE
 * ==========================
 */

export interface UploadState {
  id: string | null;
  uploadUrl: string | null;
  previewUrl: string | null;
  file: File | null;
  uploading: boolean;
  error: string | null;
}

export const initialUploadState: UploadState = {
  id: null,
  uploadUrl: null,
  previewUrl: null,
  file: null,
  uploading: false,
  error: null,
};
