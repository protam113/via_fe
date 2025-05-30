//api/api.ts

/**
 * ==========================
 * 📌 @API Services URL
 * ==========================
 *
 * @desc Base Services URL
 */

const url = process.env.NEXT_PUBLIC_BASE_URL_DEV;

const version = process.env.NEXT_PUBLIC_VERSION;
// Base URL api =v1
const baseURL = `${url}${version}`;

/**
 * ========== @Endpoints ==========
 */
const endpoints = {
  //auth
  logout: process.env.NEXT_PUBLIC_LOGOUT,
  login: process.env.NEXT_PUBLIC_LOGIN,

  //   Role
  roles: process.env.NEXT_PUBLIC_ROLES,
  role: process.env.NEXT_PUBLIC_ROLE,

  // Auth User
  currentUser: process.env.NEXT_PUBLIC_CURRENT_USER,
  users: process.env.NEXT_PUBLIC_USERS,
  userDetail: process.env.NEXT_PUBLIC_USER,
  createManager: process.env.NEXT_PUBLIC_MANAGER,

  //category
  categories: process.env.NEXT_PUBLIC_CATEGORIES,
  category: process.env.NEXT_PUBLIC_CATEGORY,
  adminCategory: process.env.NEXT_PUBLIC_ADMIN_CATEGORY,
  adminCategoryTranslation: process.env.NEXT_PUBLIC_ADMIN_CATEGORY_TRANSLATION,
  categoryEdit: process.env.NEXT_PUBLIC_UPDATE_CATEGORY,

  // contact
  contacts: process.env.NEXT_PUBLIC_CONTACTS,
  contact: process.env.NEXT_PUBLIC_CONTACT,

  //   Seo
  seo: process.env.NEXT_PUBLIC_SEO,

  // Media
  media: process.env.NEXT_PUBLIC_MEDIA,

  //   Exhibition
  exhibitions: process.env.NEXT_PUBLIC_EXHIBITIONS,
  exhibition: process.env.NEXT_PUBLIC_EXHIBITION,
  exhibitionTranslation: process.env.NEXT_PUBLIC_EXHIBITIONS_TRANSLATION,
  exhibitionEdit: process.env.NEXT_PUBLIC_EXHIBITIONS_UPDATE,
  exhibitionEditTranslation:
    process.env.NEXT_PUBLIC_EXHIBITIONS_UPDATE_TRANSLATION,
  banner: process.env.NEXT_PUBLIC_EXHIBITIONS_BANNERS,
  exhibitionAdmin: process.env.NEXT_PUBLIC_EXHIBITION_ADMIN,

  //   static
  rankStatic: process.env.NEXT_PUBLIC_STATICALS_RANKING,
};

export { baseURL, endpoints };
