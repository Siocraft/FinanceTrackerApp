import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { env } from '../config/env';
import { auth } from '../config/firebase';

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Create axios instance with default configuration
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: env.API_BASE_URL,
    timeout: env.API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor for authentication and logging
  client.interceptors.request.use(
    async config => {
      // Add Firebase auth token if user is authenticated
      if (auth.currentUser) {
        try {
          const token = await auth.currentUser.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          console.error('Failed to get auth token:', error);
        }
      }

      if (env.DEBUG) {
        console.log(
          `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
          {
            params: config.params,
            data: config.data,
            hasAuth: !!config.headers.Authorization,
          }
        );
      }
      return config;
    },
    error => {
      if (env.DEBUG) {
        console.error('🚨 API Request Error:', error);
      }
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      if (env.DEBUG) {
        console.log(
          `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
          {
            status: response.status,
            data: response.data,
          }
        );
      }
      return response;
    },
    (error: AxiosError) => {
      if (env.DEBUG) {
        console.error('🚨 API Response Error:', {
          url: error.config?.url,
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });
      }

      // Transform axios error to our custom error
      if (error.response) {
        // Server responded with error status
        const errorData = error.response.data as any;
        const message =
          errorData?.error ||
          errorData?.message ||
          `HTTP ${error.response.status}`;
        throw new ApiError(error.response.status, message, error.response.data);
      } else if (error.request) {
        // Network error
        throw new ApiError(0, 'Network error - please check your connection');
      } else {
        // Something else happened
        throw new ApiError(0, error.message || 'Unknown error occurred');
      }
    }
  );

  return client;
};

// Export the configured axios instance
export const apiClient = createApiClient();

// Helper function to handle common API patterns
export const apiRequest = {
  get: <T>(url: string, params?: any): Promise<T> =>
    apiClient.get(url, { params }).then(response => response.data),

  post: <T>(url: string, data?: any): Promise<T> =>
    apiClient.post(url, data).then(response => response.data),

  put: <T>(url: string, data?: any): Promise<T> =>
    apiClient.put(url, data).then(response => response.data),

  delete: <T>(url: string): Promise<T> =>
    apiClient.delete(url).then(response => response.data),

  patch: <T>(url: string, data?: any): Promise<T> =>
    apiClient.patch(url, data).then(response => response.data),
};
