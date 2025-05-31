/**
 * ==========================
 *  @AUTH
 * ==========================
 */

export interface RoleInfo {
  id: string;
  title: string;
  slug: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: RoleInfo;
}

export interface UserData {
  data: User;
}

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userInfo: User | null;

  clearError: () => void;
  login: (username: string, password: string) => Promise<boolean>;
  fetchUserInfo: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: (shouldRedirect?: boolean) => Promise<void>; // 🔥 Thêm parameter
}
