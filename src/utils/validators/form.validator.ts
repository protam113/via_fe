import {
  ContactWarning,
  NewsCategoryWarning,
  NewsWarning,
  WebsiteWarning,
} from '@/constants';
import { z } from 'zod';

// This schema is used for updating contact status

export const newsCategoryFormSchema = z.object({
  title: z.string().min(1, NewsCategoryWarning.WARNING_TITLE),
});

// This schema is used for creating or updating news categories

export const newsFormSchema = z.object({
  title: z.string().min(1, NewsWarning.WARNING_TITLE),
  url: z.string().min(1, NewsWarning.WARNING_URL),
  url_type: z.string().min(1, NewsWarning.WARNING_URL_TYPE),
  type: z.string().min(1, NewsWarning.WARNING_TYPE),
  category_id: z.string().min(1, NewsWarning.WARNING_CATEGORY),
});

export const updateNewsFormSchema = z.object({
  title: z.string().min(1, NewsWarning.WARNING_TITLE).optional(),
  url: z.string().min(1, NewsWarning.WARNING_URL).optional(),
  url_type: z.string().min(1, NewsWarning.WARNING_URL_TYPE).optional(),
  type: z.string().min(1, NewsWarning.WARNING_TYPE).optional(),
  category_id: z.string().min(1, NewsWarning.WARNING_CATEGORY).optional(),
});

// This schema is used for updating contact status

export const contactFormSchema = z.object({
  status: z.string().min(1, ContactWarning.STATUS_REQUIRED),
  ids: z.array(z.string()).min(1, ContactWarning.IDS_REQUIRED),
});

// This schema is used for deleting news categories

export const newsCategoryDeleteFormSchema = z.object({
  ids: z.array(z.string()).min(1, NewsCategoryWarning.IDS_REQUIRED),
});

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

// This schema is used for sending contact form
export const contactSentFormSchema = z.object({
  name: z.string().min(1, ContactWarning.NAME_REQUIRED),

  email: z
    .string()
    .min(1, ContactWarning.EMAIL_REQUIRED)
    .email('Invalid email format'),

  phone_number: z.string().min(1, ContactWarning.PHONE_NUMBER_REQUIRED),

  message: z.string().min(1, ContactWarning.MESSAGE_REQUIRED),

  location: z.string().min(1, ContactWarning.LOCATION_REQUIRED),
});
