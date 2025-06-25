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
