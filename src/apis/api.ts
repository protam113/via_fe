//api/api.ts

/**
 * ==========================
 * 📌 @API Services URL
 * ==========================
 *
 * @fileoverview Defines and exports the base URL used for all API service requests.
 * This setup allows flexible configuration depending on the environment
 * (e.g., development, staging, production) by using environment variables.
 *
 * @const {string} url - The root domain or server address for the backend API.
 *   - Defined in `.env` as NEXT_PUBLIC_BASE_URL_DEV
 *   - Example: "https://api.example.com/"
 *
 * @const {string} version - The current version of the API being used.
 *   - Defined in `.env` as NEXT_PUBLIC_VERSION
 *   - Example: "v1"
 *
 * @const {string} baseURL - The complete base URL combining `url` and `version`.
 *   - Example result: "https://api.example.com/v1"
 *   - Used in Axios or Fetch setups to prefix all API calls consistently.
 *
 * ✅ This keeps your API layer maintainable and adaptable across environments.
 */

const url = process.env.NEXT_PUBLIC_BASE_URL_DEV;
const version = process.env.NEXT_PUBLIC_VERSION;
const baseURL = `${url}${version}`;

/**
 * ==========================
 * 🔗 @API Endpoints
 * ==========================
 *
 * @fileoverview This file contains all endpoint paths used in API requests.
 * Defining all routes here helps keep your app consistent, maintainable, and scalable.
 *
 * 👉 Each key represents a specific backend feature or resource (e.g., Auth, User, Product).
 * 👉 Values are string paths that attach to your baseURL to form the full API route.
 *
 * 🔁 Easy to update: change routes in one place, affects all usage.
 * 🔒 Secure and dynamic via environment variables.
 */

const endpoints: Record<string, string | undefined> = {
  // === Auth ===
  logout: process.env.NEXT_PUBLIC_LOGOUT,
  login: process.env.NEXT_PUBLIC_LOGIN,

  // === Role Management ===
  roles: process.env.NEXT_PUBLIC_ROLES,
  role: process.env.NEXT_PUBLIC_ROLE,

  // === User ===
  currentUser: process.env.NEXT_PUBLIC_CURRENT_USER,
  users: process.env.NEXT_PUBLIC_USERS,
  userDetail: process.env.NEXT_PUBLIC_USER,
  createManager: process.env.NEXT_PUBLIC_MANAGER,

  // === Category ===
  categories: process.env.NEXT_PUBLIC_CATEGORIES,
  category: process.env.NEXT_PUBLIC_CATEGORY,
  adminCategory: process.env.NEXT_PUBLIC_ADMIN_CATEGORY,
  adminCategoryTranslation: process.env.NEXT_PUBLIC_ADMIN_CATEGORY_TRANSLATION,
  categoryEdit: process.env.NEXT_PUBLIC_UPDATE_CATEGORY,

  // === Contact ===
  contacts: process.env.NEXT_PUBLIC_CONTACTS,
  contact: process.env.NEXT_PUBLIC_CONTACT,

  // === SEO ===
  seo: process.env.NEXT_PUBLIC_SEO,

  // === Media ===
  presign: process.env.NEXT_PUBLIC_PRESIGN,
  submit: process.env.NEXT_PUBLIC_SUBMIT,

  // === Exhibition ===
  exhibitions: process.env.NEXT_PUBLIC_EXHIBITIONS,
  exhibition: process.env.NEXT_PUBLIC_EXHIBITION,
  exhibitionTranslation: process.env.NEXT_PUBLIC_EXHIBITIONS_TRANSLATION,
  exhibitionEdit: process.env.NEXT_PUBLIC_EXHIBITIONS_UPDATE,
  exhibitionEditTranslation:
    process.env.NEXT_PUBLIC_EXHIBITIONS_UPDATE_TRANSLATION,
  banner: process.env.NEXT_PUBLIC_EXHIBITIONS_BANNERS,
  exhibitionAdmin: process.env.NEXT_PUBLIC_EXHIBITION_ADMIN,

  // === Static ===
  rankStatic: process.env.NEXT_PUBLIC_STATICALS_RANKING,
};

export { baseURL, endpoints };
