export type CountryType = {
  id: number;
  name: string;
  iso2: string;
};

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
