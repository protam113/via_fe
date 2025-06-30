import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { baseURL } from './api';

/**
 * ==========================
 * 📌 @API Auth API
 * ==========================
 *
 * @desc Auth API Request
 */
const serviceApi = () => {
  return axios.create({
    baseURL: baseURL,
    headers: {},
    withCredentials: true,
    timeout: 15000, // 15 seconds timeout
  });
};

/**
 * ==========================
 * 📌 @API Auth API
 * ==========================
 *
 * @desc Auth API Request
 */
export const handleAPI = async <T = any>(
  url: string,
  method: 'POST' | 'PATCH' | 'GET' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  try {
    const apiInstance = serviceApi();
    const config: AxiosRequestConfig = {
      url,
      method,
    };

    // Handle data appropriately based on request method
    if (method !== 'GET' && data) {
      config.data = data;
    } else if (method === 'GET' && data) {
      config.params = data;
    }

    const response: AxiosResponse = await apiInstance(config);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // Log detailed error information
    if (axiosError.response) {
      // The request was made and the server responded with an error status code
      console.error('❌ API ERROR:', {
        url: `${baseURL}${url}`,
        method,
        status: axiosError.response.status,
        statusText: axiosError.response.statusText,
        data: axiosError.response.data,
        timestamp: new Date().toISOString(),
      });
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error('❌ API ERROR (NO RESPONSE):', {
        url: `${baseURL}${url}`,
        method,
        message: axiosError.message,
        timestamp: new Date().toISOString(),
      });
    } else {
      // Something happened in setting up the request
      console.error('❌ API ERROR (SETUP):', {
        url: `${baseURL}${url}`,
        method,
        message: axiosError.message,
        timestamp: new Date().toISOString(),
      });
    }

    // Re-throw the error for handling by the caller
    throw error;
  }
};
