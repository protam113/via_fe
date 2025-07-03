import {
  CategoryWarning,
  ContactWarning,
  EmployeeWarning,
  ExhibitionWarning,
  NewsCategoryWarning,
  NewsWarning,
  SEOWarning,
  WebsiteWarning,
} from '@/constants';
import { z } from 'zod';
import { zodIsNotEmptyString } from './empty.validator';

// =======================  NEWS SCHEMA =======================

//  Schema: Create or Update News Item
export const newsFormSchema = z.object({
  title: zodIsNotEmptyString(NewsWarning.WARNING_TITLE),
  url: zodIsNotEmptyString(NewsWarning.WARNING_URL),
  url_type: zodIsNotEmptyString(NewsWarning.WARNING_URL_TYPE),
  type: zodIsNotEmptyString(NewsWarning.WARNING_TYPE),
  category_id: zodIsNotEmptyString(NewsWarning.WARNING_CATEGORY),
});

//  Schema: Update News Item (all fields optional)
export const updateNewsFormSchema = z.object({
  title: z.string().min(1, NewsWarning.WARNING_TITLE).optional(),
  url: z.string().min(1, NewsWarning.WARNING_URL).optional(),
  url_type: z.string().min(1, NewsWarning.WARNING_URL_TYPE).optional(),
  type: z.string().min(1, NewsWarning.WARNING_TYPE).optional(),
  category_id: z.string().min(1, NewsWarning.WARNING_CATEGORY).optional(),
});

// ======================= ✅ END NEWS SCHEMA =======================

// ====================  NEWS CATEGORY SCHEMA ====================

// ✅ Schema: Create or Update News Category
export const newsCategoryFormSchema = z.object({
  title: zodIsNotEmptyString(NewsCategoryWarning.WARNING_TITLE),
});

// This schema is used for deleting news categories

export const newsCategoryDeleteFormSchema = z.object({
  ids: z.array(z.string()).min(1, NewsCategoryWarning.IDS_REQUIRED),
});

// ==================== ✅ END NEWS CATEGORY SCHEMA ====================

// ====================  CONTACT SCHEMA ====================

// ✅ Schema: Update Contact Status
export const contactFormSchema = z.object({
  status: zodIsNotEmptyString(ContactWarning.STATUS_REQUIRED),
  ids: z.array(z.string()).min(1, ContactWarning.IDS_REQUIRED),
});

// This schema is used for sending contact form
export const contactSentFormSchema = z.object({
  name: zodIsNotEmptyString(ContactWarning.NAME_REQUIRED),

  email: z
    .string()
    .min(1, ContactWarning.EMAIL_REQUIRED)
    .email('Invalid email format'),

  phone_number: zodIsNotEmptyString(ContactWarning.PHONE_NUMBER_REQUIRED),

  message: zodIsNotEmptyString(ContactWarning.MESSAGE_REQUIRED),

  location: zodIsNotEmptyString(ContactWarning.LOCATION_REQUIRED),
});

export const deleteRegisterFormSchema = z.object({
  ids: z.array(z.string()).min(1, ContactWarning.IDS_REQUIRED),
});

export const registerFormSchema = z.object({
  name: zodIsNotEmptyString(ContactWarning.NAME_REQUIRED),

  email: z
    .string()
    .min(1, ContactWarning.EMAIL_REQUIRED)
    .email('Invalid email format'),

  phone_number: zodIsNotEmptyString(ContactWarning.PHONE_NUMBER_REQUIRED),
});

// ==================== ✅ END CONTACT SCHEMA ====================

// This schema is used for updateting website information
export const updateWebsiteFormSchema = z.object({
  facebook: z
    .string()
    .min(1, WebsiteWarning.WARNING_WEBSITE_FACEBOOK)
    .optional(),
  phone_number: z
    .string()
    .min(1, WebsiteWarning.WARNING_WEBSITE_PHONE_NUMBER)
    .optional(),
  instagram: z
    .string()
    .min(1, WebsiteWarning.WARNING_WEBSITE_INSTAGRAM)
    .optional(),
  tiktok: z.string().min(1, WebsiteWarning.WARNING_WEBSITE_TIKTOK).optional(),
  messenger: z
    .string()
    .min(1, WebsiteWarning.WARNING_WEBSITE_MESSENGER)
    .optional(),
});

// This schema is used for SEO form validation
export const SEOFormSchema = z.object({
  site_title: zodIsNotEmptyString(SEOWarning.WARNING_SEO_SITE_TITLE),
  site_description: zodIsNotEmptyString(
    SEOWarning.WARNING_SEO_SITE_DESCRIPTION
  ),
  domain: zodIsNotEmptyString(SEOWarning.WARNING_SEO_DOMAIN),
  keywords: z
    .array(zodIsNotEmptyString(SEOWarning.WARNING_SEO_KEYWORDS))
    .min(1, SEOWarning.WARNING_SEO_KEYWORDS),
  google_analytics_id: zodIsNotEmptyString(SEOWarning.WARNING_SEO_GOOGLE_ID),
  gtm_id: zodIsNotEmptyString(SEOWarning.WARNING_SEO_GTM_ID),
  facebook_pixel_id: zodIsNotEmptyString(SEOWarning.WARNING_SEO_FACEBOOK_ID),
  search_console_verification: zodIsNotEmptyString(
    SEOWarning.WARNING_SEO_SEARCH_ID
  ),
});

// ======================= EMPLOYEE SCHEMA =======================

// This schema is used for employee form validation
export const employeeFormSchema = z.object({
  username: zodIsNotEmptyString(EmployeeWarning.WARNING_EMPLOYEE_USERNAME),
  email: zodIsNotEmptyString(EmployeeWarning.WARNING_EMPLOYEE_EMAIL),
  name: zodIsNotEmptyString(EmployeeWarning.WARNING_EMPLOYEE_NAME),
  password: zodIsNotEmptyString(EmployeeWarning.WARNING_EMPLOYEE_PASSWORD),
});

// This schema is used for employee form validation with confirm password
export const employeeFormWithConfirmSchema = employeeFormSchema
  .extend({
    confirmPassword: zodIsNotEmptyString('Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ======================= END EMPLOYEE SCHEMA =======================

export const loginFormSchema = z.object({
  username: zodIsNotEmptyString(EmployeeWarning.WARNING_EMPLOYEE_USERNAME),

  password: zodIsNotEmptyString(
    EmployeeWarning.WARNING_EMPLOYEE_PASSWORD
  ).refine((val) => val.length >= 8, {}),
});

// This schema is used for category form validation
export const categoryFormSchema = z.object({
  thumbnail_id: zodIsNotEmptyString(CategoryWarning.WARNING_ID),
});

export const exhibitionDetailFormSchema = z.object({
  code: z.string(),
});

export const exhibitionWithCodeRequiredSchema = z.object({
  code: z.string().trim().min(1, 'Code không được để trống'),
});

export const exhibitionFormSchema = z.object({
  start_date: z
    .string()
    .nonempty(ExhibitionWarning.WARNING_EXHIBITION_START_DATE),
  end_date: z.string().nonempty(ExhibitionWarning.WARNING_EXHIBITION_END_DATE),
  thumbnail_id: z
    .string()
    .nonempty(ExhibitionWarning.WARNING_EXHIBITION_THUMBNAIL),
  banner_id: z.string().nonempty(ExhibitionWarning.WARNING_EXHIBITION_BANNER),
  status: z.string().nonempty(ExhibitionWarning.WARNING_EXHIBITION_STATUS),
  category_id: z
    .string()
    .nonempty(ExhibitionWarning.WARNING_EXHIBITION_CATEGORY),

  companies: z
    .array(
      z.object({
        name: z.string().nonempty('Company name is required'),
        url: z.string().url('Company URL must be valid'),
        image: z.string().nonempty('Company image is required'),
      })
    )
    .optional(),

  translations: z
    .array(
      z
        .object({
          language: z.string().nonempty(),
          title: z.string(),
          description: z.string(),
          content: z.string(),
          location: z.string(),
          price: z.union([z.number(), z.nan()]),
        })
        .refine(
          (data) => {
            const hasAnyField =
              data.title ||
              data.description ||
              data.content ||
              data.location ||
              data.price;
            const allFieldsFilled =
              data.title &&
              data.description &&
              data.content &&
              data.location &&
              typeof data.price === 'number';

            return !hasAnyField || allFieldsFilled;
          },
          {
            message:
              'If you fill one field in a translation, you must fill all of them',
          }
        )
    )
    .refine(
      (arr) => {
        return arr.some(
          (item) =>
            item.title &&
            item.description &&
            item.content &&
            item.location &&
            typeof item.price === 'number'
        );
      },
      {
        message: 'At least one complete translation is required',
      }
    ),
});

export const exhibitionUpdateHeadSchema = z
  .object({
    start_date: z
      .string()
      .nonempty(ExhibitionWarning.WARNING_EXHIBITION_START_DATE),
    end_date: z
      .string()
      .nonempty(ExhibitionWarning.WARNING_EXHIBITION_END_DATE),
    thumbnail_id: z
      .string()
      .nonempty(ExhibitionWarning.WARNING_EXHIBITION_THUMBNAIL),
    banner_id: z.string().nonempty(ExhibitionWarning.WARNING_EXHIBITION_BANNER),
    status: z.string().nonempty(ExhibitionWarning.WARNING_EXHIBITION_STATUS),
    category_id: z
      .string()
      .nonempty(ExhibitionWarning.WARNING_EXHIBITION_CATEGORY),
    companies: z
      .array(
        z.object({
          name: z.string().nonempty('Company name is required'),
          url: z.string().url('Company URL must be valid'),
          image: z.string().nonempty('Company image is required'),
        })
      )
      .optional(),
  })
  .partial();

export const exhibitionUpdateBottomSchema = z.object({
  translations: z
    .array(
      z
        .object({
          language: z.string().nonempty(),
          title: z.string().optional(),
          description: z.string().optional(),
          content: z.string().optional(),
          location: z.string().optional(),
          price: z.union([z.number(), z.nan()]).optional(),
        })
        .refine(
          (data) => {
            const hasAnyField =
              !!data.title ||
              !!data.description ||
              !!data.content ||
              !!data.location ||
              typeof data.price === 'number';

            const allFieldsFilled =
              !!data.title &&
              !!data.description &&
              !!data.content &&
              !!data.location &&
              typeof data.price === 'number';

            return !hasAnyField || allFieldsFilled;
          },
          {
            message:
              'If you fill one field in a translation, you must fill all of them',
          }
        )
    )
    .refine(
      (arr) =>
        arr.some(
          (item) =>
            !!item.title &&
            !!item.description &&
            !!item.content &&
            !!item.location &&
            typeof item.price === 'number'
        ),
      {
        message: 'At least one complete translation is required',
      }
    )
    .optional(),
});

export const exhibitionAddTranslationFormSchema = z.object({
  exhibition_id: zodIsNotEmptyString('EROR'),
  language: zodIsNotEmptyString('EROR'),
  title: zodIsNotEmptyString('EROR'),
  description: zodIsNotEmptyString('EROR'),
  content: zodIsNotEmptyString('EROR'),
  location: zodIsNotEmptyString('EROR'),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Price must be a number',
  }),
});
