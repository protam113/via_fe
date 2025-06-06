import { RoleInfo } from '@/types';

/**
 * ==========================
 *  @AUTH
 * ==========================
 */

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

export interface AuthResponse<T = any> {
  response: Response;
  data: T;
}

export interface CookieOptions {
  expires?: number;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}
