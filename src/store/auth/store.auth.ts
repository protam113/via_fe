import type { AuthState } from '@/types/auth/auth.type';
import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { AuthAPI } from './api.auth';
import { CookieManager } from './cookie.auth';
import { logDebug, logError, logWarn } from '@/utils/logger';
import { handleAuthError } from './utils.auth';
import { toast } from 'sonner';

const isProd = process.env.NODE_ENV === 'production';
const isClient = typeof window !== 'undefined';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      loading: false,
      error: null,
      userInfo: null,

      clearError: () => set({ error: null }),

      /**
       * ==========================
       * 📌 @HOOK useLoginAuthStore
       * ==========================
       */
      login: async (username: string, password: string): Promise<boolean> => {
        try {
          set({ loading: true, error: null });

          const { response, data } = await AuthAPI.login(username, password);

          if (response.status === 200) {
            CookieManager.set('isAuthenticated', 'true', {
              expires: 7,
              sameSite: 'Lax',
            });

            // 🔥 THAY ĐỔI: Gọi fetchUserInfo thay vì checkAuth để tránh vòng lặp
            try {
              const userResponse = await AuthAPI.getCurrentUser();

              if (
                userResponse.response.status === 200 &&
                userResponse.data?.data
              ) {
                const userRole = userResponse.data.data.role.slug;
                const allowedRoles = ['admin', 'manager'];

                if (!allowedRoles.includes(userRole)) {
                  throw new Error('You do not have access');
                }

                set({
                  isAuthenticated: true,
                  userInfo: userResponse.data.data,
                  loading: false,
                });

                logDebug('Login and user info fetch successful');
                toast.success('Login successful! Redirecting to home page..');
                return true;
              } else {
                throw new Error('Failed to fetch user info after login');
              }
            } catch (userError) {
              // Nếu fetch user info thất bại, clear auth state
              throw userError;
            }
          }

          if (response.status === 401 || response.status === 400) {
            throw new Error(
              'Incorrect login information, please check your account and password'
            );
          }

          throw new Error(data?.message || 'Login failed');
        } catch (error) {
          const errorMessage = handleAuthError(error);

          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: errorMessage,
          });

          // 🔥 THAY ĐỔI: Chỉ remove localStorage, không redirect
          localStorage.removeItem('auth-storage');
          toast.error(errorMessage);
          return false;
        }
      },

      /**
       * ==========================
       * 📌 @HOOK useFetchUserInfo
       * ==========================
       */
      fetchUserInfo: async () => {
        if (!get().isAuthenticated) return;

        try {
          set({ loading: true });

          const { response, data } = await AuthAPI.getCurrentUser();

          if (response.status === 200 && data) {
            set({ userInfo: data.data || null, loading: false });
          } else {
            throw new Error('Failed to fetch user info');
          }
        } catch (error) {
          const errorMessage = handleAuthError(error);
          set({ loading: false, error: errorMessage });
          toast.error(errorMessage);
        }
      },

      /**
       * ==========================
       * 📌 @HOOK logout
       * ==========================
       */
      logout: async () => {
        try {
          set({ loading: true });

          // Try server logout but don't depend on it for local logout
          try {
            const { response } = await AuthAPI.logout();
            if (!response.ok) {
              console.warn(
                'Server logout failed, continuing with local logout'
              );
            }
          } catch (error) {
            logWarn('Server logout error:', error);
          }

          // Always perform local logout
          localStorage.removeItem('auth-storage');

          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: null,
          });

          toast.success('Log out successfully!');
          window.location.href = '/login';
        } catch (error) {
          logError('Catastrophic error during logout:', error);

          // Force logout anyway
          localStorage.removeItem('auth-storage');

          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: handleAuthError(error),
          });

          window.location.href = '/login';
        }
      },

      /**
       * ==========================
       * 📌 @HOOK useCheckAuthStore
       * ==========================
       */
      checkAuth: async (shouldRedirect: boolean = true) => {
        if (!CookieManager.check('isAuthenticated')) {
          set({ isAuthenticated: false, userInfo: null, loading: false });
          localStorage.removeItem('auth-storage');

          // Chỉ redirect nếu không phải được gọi từ login
          if (shouldRedirect) {
            window.location.href = '/login';
          }
          return;
        }

        try {
          set((state) => ({ ...state, loading: true }));

          const { response, data } = await AuthAPI.getCurrentUser();

          if (response.status === 200 && data?.data) {
            const userRole = data.data.role.slug;
            const allowedRoles = ['admin', 'manager'];
            logDebug(`User role: ${userRole}`);

            if (!allowedRoles.includes(userRole)) {
              logWarn(`Unauthorized role: ${userRole}. Logging out...`);
              toast.error('You do not have access. Logging out...');

              localStorage.removeItem('auth-storage');

              set({
                isAuthenticated: false,
                userInfo: null,
                loading: false,
                error: null,
              });

              if (shouldRedirect) {
                window.location.href = '/login';
              }
              return;
            }

            CookieManager.set('isAuthenticated', 'true', {
              expires: 7,
              secure: isProd, // 🔥 FIX: Sử dụng isProd thay vì hardcode true
              sameSite: 'Lax',
            });

            set({
              isAuthenticated: true,
              userInfo: data.data,
              loading: false,
            });
          } else {
            throw new Error('Invalid user data received');
          }
        } catch (error) {
          logError('checkAuth error:', error);

          localStorage.removeItem('auth-storage');

          set({
            isAuthenticated: false,
            userInfo: null,
            loading: false,
            error: null,
          });

          // 🔥 THAY ĐỔI: Chỉ redirect khi cần thiết
          if (shouldRedirect) {
            window.location.href = '/login';
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: isClient ? createJSONStorage(() => localStorage) : undefined,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userInfo: state.userInfo,
      }),
    }
  )
);
