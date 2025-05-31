// ==============================================
// 📁 store/auth/utils.auth.ts - OPTIMIZED VERSION
// ==============================================

import { useAuthStore } from './store.auth';

export const handleAuthError = (error: unknown): string => {
  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('Network')) {
      return 'Network connection error. Please check your internet connection.';
    }
    if (
      error.message.includes('401') ||
      error.message.includes('Unauthorized')
    ) {
      return 'Your session has expired. Please login again.';
    }
    if (error.message.includes('403') || error.message.includes('Forbidden')) {
      return 'You do not have permission to access this resource.';
    }
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred. Please try again.';
};

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response | null> => {
  const headers = new Headers(options.headers);
  headers.append('Content-Type', 'application/json');

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    // Handle unauthorized access
    if (response.status === 401) {
      console.warn('Unauthorized access detected, logging out...');
      const authStore = useAuthStore.getState();
      await authStore.logout();
      return null;
    }

    return response;
  } catch (error) {
    console.error('Fetch with auth error:', error);
    throw new Error('Network error occurred');
  }
};

// Helper function to validate user role
export const validateUserRole = (userRole: string): boolean => {
  const allowedRoles = ['admin', 'manager'];
  return allowedRoles.includes(userRole.toLowerCase());
};

// Helper function to handle API responses
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP ${response.status}: ${response.statusText}`
    );
  }
  return response.json();
};
