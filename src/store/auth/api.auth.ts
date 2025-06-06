// ==============================================
// 📁 store/auth/api.auth.ts - OPTIMIZED VERSION
// ==============================================

import { baseURL, endpoints } from '@/apis';
import { AuthResponse } from '@/types';
import { logDebug, logError } from '@/utils/logger';

// 🔧 FIX: Convert class to object with methods for better compatibility
export const AuthAPI = {
  /**
   * Get common headers for API requests
   */
  getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  },

  /**
   * Authenticates a user with their username and password.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<AuthResponse>} Response object and parsed data from API.
   */
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${baseURL}${endpoints.login}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();
      return { response, data };
    } catch (error) {
      console.error('Login API error:', error);
      throw new Error('Network error during login');
    }
  },

  /**
   * Logs the user out by clearing their session.
   * @returns {Promise<AuthResponse>} Response object and API response data.
   */
  async logout(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${baseURL}${endpoints.logout}`, {
        method: 'POST',
        headers: this.getHeaders(),
        credentials: 'include',
      });

      const data = await response.json();
      return { response, data };
    } catch (error) {
      console.error('Logout API error:', error);
      throw new Error('Network error during logout');
    }
  },

  /**
   * Fetches the currently authenticated user's details.
   * @returns {Promise<AuthResponse>} Response object and user data.
   */
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${baseURL}${endpoints.currentUser}`, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include',
      });
      logDebug('getCurrentUser HTTP status:', response.status);
      const data = await response.json();

      logDebug('getCurrentUser response data:', data);
      return { response, data };
    } catch (error) {
      console.error('GetCurrentUser API error:', error);
      logError('GetCurrentUser API error:', error);
      throw new Error('Network error while fetching user data');
    }
  },
};
