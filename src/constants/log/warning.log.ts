
/**
 * ==========================
 *  @WARNING : Contact Management Warnings
 *  @DESCRIPTION :  This file contains warning constants used in the contact management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum ContactWarning {
  WARNING_UPDATE_CONTACT = 'Please select a contact with status "Pending" to process.',
  STATUS_REQUIRED = 'Status is required',
  IDS_REQUIRED = 'At least one ID is required',
  EMAIL_REQUIRED = 'Email is required',
  PHONE_NUMBER_REQUIRED = 'Phone number is required',
  MESSAGE_REQUIRED = 'Message is required',
  LOCATION_REQUIRED = 'Location is required',
  NAME_REQUIRED = 'Name is required',
}

/**
 * ==========================
 *  @WARNING : Contact Management Warnings
 *  @DESCRIPTION :  This file contains warning constants used in the contact management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum NewsCategoryWarning {
  WARNING_UPDATE_CATEGORY = 'Please select a category with status "Pending" to process.',
  WARNING_TITLE = 'Title is required.',
  IDS_REQUIRED = 'At least one ID is required.',
}

/**
 * ==========================
 *  @WARNING : News Management Warnings
 *  @DESCRIPTION :  This file contains warning constants used in the news management system.
 *  @VERSION 1.0.0
 * ==========================
 */

export enum NewsWarning {
  WARNING_UPDATE_NEWS = 'Please select a news with status "Pending" to process.',
  WARNING_TITLE = 'Title is required.',
  WARNING_URL = 'URL is required.',
  WARNING_URL_TYPE = 'URL type is required.',
  WARNING_TYPE = 'Type is required.',
  WARNING_CATEGORY = 'Category is required.',
  IDS_REQUIRED = 'At least one ID is required.',
  NEWS_ENDPOINT_NOT_DEFINED = 'News endpoint is not defined',
}

/**
 * ==========================
 *  @WARNING : Website Management Warnings
 *  @DESCRIPTION :  This file contains warning constants used in the website management system.
 *  @VERSION 1.0.0
 * ==========================
 */

export enum WebsiteWarning {
  WARNING_WEBSITE_PHONE_NUMBER = 'Please provide a phone number for the website with status "Pending" to process.',
  WARNING_WEBSITE_FACEBOOK = 'Facebook link is required.',
  WARNING_WEBSITE_MESSENGER = 'Messenger link is required.',
  WARNING_WEBSITE_INSTAGRAM = 'Instagram link is required.',
  WARNING_WEBSITE_TIKTOK = 'TikTok link is required.',
}

/**
 * ==========================
 *  @WARNING : SEO Management Warnings
 *  @DESCRIPTION :  This file contains warning constants used in the SEO management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum SEOWarning {
  WARNING_SEO_SITE_TITLE = 'Site title is required.',
  WARNING_SEO_SITE_DESCRIPTION = 'Site description is required.',
  WARNING_SEO_DOMAIN = 'Site domain is required.',
  WARNING_SEO_KEYWORDS = 'Site keywords At least one is required.',
  WARNING_SEO_GOOGLE_ID = 'Google ID is required.',
  WARNING_SEO_GTM_ID = 'Google Tag Manager ID is required.',
  WARNING_SEO_FACEBOOK_ID = 'Facebook ID is required.',
  WARNING_SEO_SEARCH_ID = 'Search Console Verification ID is required.',
}

/**
 * ==========================
 *  @WARNING : Employee Management Warnings
 *  @DESCRIPTION :  This file contains warning constants used in the employee management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum EmployeeWarning {
  WARNING_EMPLOYEE_NAME = 'Employee name is required.',
  WARNING_EMPLOYEE_EMAIL = 'Employee email is required.',
  WARNING_EMPLOYEE_USERNAME = 'Employee username is required.',
  WARNING_EMPLOYEE_PASSWORD = 'Employee password is required.',
}

/**
 * ==========================
 *  @WARNING : Category Management Warnings
 *  @DESCRIPTION :  This file contains warning constants used in the category management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum CategoryWarning {
  WARNING_ID = 'ID is required',
}

/**
 * ==========================
 *  @WARNING : Exhibition Management Warnings
 *  @DESCRIPTION :  This file contains warning constants used in the exhibition management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum ExhibitionWarning {
  WARNING_EXHIBITION_START_DATE = 'Exhibition start date is required.',
  WARNING_EXHIBITION_END_DATE = 'Exhibition end date is required.',
  WARNING_EXHIBITION_TITLE = 'Exhibition title is required.',
  WARNING_EXHIBITION_LANGUAGE = 'Exhibition language is required.',
  WARNING_EXHIBITION_DESCRIPTION = 'Exhibition description is required.',
  WARNING_EXHIBITION_THUMBNAIL = 'Exhibition thumbnail is required.',
  WARNING_EXHIBITION_BANNER = 'Exhibition banner is required.',
  WARNING_EXHIBITION_PRICE = 'Exhibition price is required.',
  WARNING_EXHIBITION_COMPANIES = 'Exhibition companies is required.',
  WARNING_EXHIBITION_CATEGORY = 'Exhibition category is required.',
  WARNING_EXHIBITION_STATUS = 'Exhibition status is required.',
}
