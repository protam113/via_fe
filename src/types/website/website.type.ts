/**
 * ==========================
 *  @WEBSITE
 * ==========================
 */

export interface WebsiteData {
  phone_number: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  messenger: string;
}

/**
 * ==========================
 *  @UPDATE_WEBSITE
 * ==========================
 */

export interface UpdateWebsite {
  phone_number?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  messenger?: string;
}
