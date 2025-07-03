/**
 * ==========================
 *  @ERRORS : Auth Management Errors
 *  @DESCRIPTION :  This file contains error constants used in the auth management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum AuthError {
  AUTH = 'Submit endpoint is not defined',
}

/**
 * ==========================
 *  @ERRORS : Register Management Errors
 *  @DESCRIPTION :  This file contains error constants used in the register management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum RegisterError {
  ERROR_FETCHING_LIST = 'Error getting participant list',
  CREATED = 'There was an error registering for the exhibition.',
  DELETED = 'There was an error deleting the exhibitor. Please try again.',
}

/**
 * ==========================
 *  @ERRORS : Endpoints Management Errors
 *  @DESCRIPTION :  This file contains error constants used in the endpoints management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum EndpointsError {
  MEDIA_SUBMIT_DEFINED = 'Submit endpoint is not defined',
}

/**
 * ==========================
 *  @ERRORS : Category Management Errors
 *  @DESCRIPTION :  This file contains error constants used in the category management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum CategoryError {
  FAILED_UPDATE_CATEGORY = 'Failed to update category. Please try again.',
  ERROR_FETCHING_LIST = 'Error fetching category list:',
  FAILED_CREATE_CATEGORY = 'Failed to create category.',
  NOT_FOUND = 'NOT_FOUND',
  INVALID_STATUS = 'INVALID_STATUS',
  NAME_REQUIRED = 'NAME_REQUIRED',
  CATEGORY_ALREADY_EXISTS = 'CATEGORY_ALREADY_EXISTS',
  ERROR_UPDATING_CATEGORY = 'Failed to update category',
  COUNTED = 'Error fetching category count:',
}

/**
 * ==========================
 *  @ERRORS : Media Management Errors
 *  @DESCRIPTION :  This file contains error constants used in the media management system.
 *  @VERSION 1.0.0
 * ==========================
 */

export enum MediaError {
  FAILED_PRESIGN_MEDIA = 'Failed to  presign media',
  FAILED_SUBMIT_MEDIA = 'Failed to submit media',
  FAILED_CREATE_MEDIA = 'Failed to create media.',
  NOT_FOUND = 'NOT_FOUND',
  INVALID_STATUS = 'INVALID_STATUS',
  NAME_REQUIRED = 'NAME_REQUIRED',
  CATEGORY_ALREADY_EXISTS = 'CATEGORY_ALREADY_EXISTS',
}

/**
 * ==========================
 *  @ERRORS : News Management Errors
 *  @DESCRIPTION :  This file contains error constants used in the news management system.
 *  @VERSION 1.0.0
 * ==========================
 */

export enum NewsError {
  FAILED_CREATE_NEWS = 'Failed to create news.',
  FAILED_UPDATE_NEWS = 'Failed to update news.',
  FAILED_DELETE_NEWS = 'Failed to delete news.',
  NOT_FOUND = 'NOT_FOUND',
  FAILED_CREATE_NEWS_FORM = 'Failed to create news form. Please try again.',
  ERROR_FETCHING_LIST = 'Error fetching news categories list:',
}

/**
 * ==========================
 *  @ERRORS : News Category Management Errors
 *  @DESCRIPTION :  This file contains error constants used in the news category management system.
 *  @VERSION 1.0.0
 * ==========================
 */

export enum NewsCategoryError {
  FAILED_CREATE_NEWS_CATEGORY = 'Failed to create news category. Please try again.',
  FAILED_DELETE_NEWS_CATEGORY = 'Failed to delete news category. Please try again.',
  UNEXPECTED_ERROR = 'An unexpected error occurred. Please try again.',
  FAILED_UPDATE_CATEGORY = 'Failed to update category.',
  FAILED_DELETE_CATEGORY = 'Failed to delete category.',
  ERROR_FETCHING_CATEGORY_LIST = 'Error fetching news categories list:',
  ERROR_CREATING_CATEGORY = 'Error creating news category:',
  ERROR_UPDATING_CATEGORY = 'Failed to update news category',
  FAILED_UPDATE_NEWS_CATEGORY = 'Failed to update news category. Please try again.',
}

/**
 * ==========================
 *  @ERRORS : SEO Management Errors
 *  @DESCRIPTION :  This file contains error constants used in the SEO management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum SeoError {
  FAILED_UPDATE_SEO = 'Failed to update SEO. Please try again.',
  ERROR_FETCHING_SEO_DATA = 'Error fetching SEO data:',
  TITLE_REQUIRED = 'TITLE_REQUIRED',
  DESCRIPTION_REQUIRED = 'DESCRIPTION_REQUIRED',
  KEYWORDS_REQUIRED = 'KEYWORDS_REQUIRED',
}

/**
 * ==========================
 *  @ERRORS : Role Management Errors
 *  @DESCRIPTION :  This file contains error constants used in the role management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum RoleError {
  ERROR_FETCHING_ROLE_LIST = 'Error fetching role list:',
  ERROR_FETCHING_ROLE_DETAIL = 'Error fetching role detail:',
  SLUG_REQUIRED = 'Slug is required',
}

//  * ==========================
//  *  @ERRORS : Employee Management Errors
//  *  @DESCRIPTION :  This file contains error constants used in the employee management system
//  *  @VERSION 1.0.0
//  * ==========================

export enum EmployeeError {
  ERROR_FETCHING_EMPLOYEE_LIST = 'Error fetching employee list:',
  ERROR_FETCHING_EMPLOYEE_DETAIL = 'Error fetching employee detail:',
  FAILED_CREATE_EMPLOYEE = 'Failed to create employee. Please try again.',
  SLUG_REQUIRED = 'Slug is required',
  USER_ENDPOINT_NOT_DEFINED = 'User endpoint is not defined.',
  FAILED_DELETE_USER = 'Failed to delete user.',
}

/**
 * ==========================
 *  @ERRORS : Website Management Errors
 *  @DESCRIPTION :  This file contains error constants used in the website management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum WebsiteError {
  ERROR_FETCHING_WEBSITE_DATA = 'Error fetching website data:',
  FAILED_UPDATE_WEBSITE = 'Failed to update website. Please try again.',
  WEBSITE_ENDPOINT_NOT_DEFINED = 'Website endpoint is not defined.',
}

/**
 * ==========================
 *  @ERRORS : Contact Management Errors
 *  @DESCRIPTION :  This file contains error constants used in the contact management system.
 *  @VERSION 1.0.0
 * ==========================
 */
export enum ContactError {
  ERROR_FETCHING_CONTACT_DATA = 'Error fetching contact data:',
  FAILED_SENT_CONTACT = 'Failed to send contact. Please try again.',
  COUNTED = 'Error fetching contact count data:',
  FAILED_UPDATE = 'Failed to update contact. Please try again.',
  ERROR_FETCHING_LIST = 'Error fetching contact list:',
  FAILED_CREATE_CONTACT = 'Failed to create contact.',
}

export enum ExhibitionError {
  FAILED_BANNER_LIST = 'Error fetching banner exhibitions list',
  FAILED_LIST = 'Error fetching exhibitions list',
  FAILED_CREATED = 'Failed to create exhibition. Please try again.',
  ENDPOINT = 'Exhibition endpoint is not defined',
  DETAILED = 'Failed to fetch exhibition detail',
  ADMIN_DETAILED = 'Error fetching admin detail post',
  DELETED = 'There was an error deleting the exhibition. ',
  ID_NULL = 'Id is required',
  SLUG_NULL = 'Slug is required',
}
