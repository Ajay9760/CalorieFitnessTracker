import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const getCookieValue = (name: string): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }
  const matches = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`));
  return matches ? decodeURIComponent(matches.split('=')[1]) : null;
};

const shouldAttachCsrf = (method?: string) => {
  if (!method) {
    return false;
  }
  return !['get', 'head', 'options'].includes(method.toLowerCase());
};

// Request interceptor to add CSRF token
api.interceptors.request.use(
  (config) => {
    if (shouldAttachCsrf(config.method)) {
      const csrfToken = getCookieValue('csrfToken');
      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshPromise: Promise<AxiosResponse> | null = null;

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as (typeof error.config & { _retry?: boolean });
    const requestUrl = originalRequest?.url || '';
    const isAuthRoute = requestUrl.includes('/api/auth/');

    if (error.response?.status === 401 && !isAuthRoute && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        if (!refreshPromise) {
          refreshPromise = authApi.refreshToken();
        }
        await refreshPromise;
        refreshPromise = null;
        return api(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401 && isAuthRoute) {
      window.location.href = '/auth';
    }

    return Promise.reject(error);
  }
);

// Types for API responses
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Authentication API
export const authApi = {
  register: (userData: {
    email: string;
    password: string;
    username: string;
    name: string;
  }) =>
    api.post<ApiResponse<{ user: any }>>('/api/auth/register', userData),

  login: (credentials: { email: string; password: string }) =>
    api.post<ApiResponse<{ user: any }>>('/api/auth/login', credentials),

  logout: () =>
    api.post<ApiResponse<null>>('/api/auth/logout'),

  refreshToken: () =>
    api.post<ApiResponse<Record<string, never>>>('/api/auth/refresh'),

  csrf: () =>
    api.get<ApiResponse<null>>('/api/auth/csrf'),
};

// User API
export const userApi = {
  getProfile: () =>
    api.get<ApiResponse<{ user: any }>>('/api/user/profile'),

  updateProfile: (profileData: any) =>
    api.put<ApiResponse<{ user: any }>>('/api/user/profile', profileData),

  getStats: () =>
    api.get<ApiResponse<any>>('/api/user/stats'),
};

// Food API
export const foodApi = {
  search: (query: string, options?: { category?: string; region?: string; limit?: number; offset?: number }) =>
    api.get<ApiResponse<{ foods: any[]; pagination: any }>>('/api/foods/search', {
      params: {
        q: query,
        ...options,
      },
    }),

  getPopular: (options?: { region?: string; limit?: number }) =>
    api.get<ApiResponse<{ foods: any[] }>>('/api/foods/popular', {
      params: options,
    }),

  getCategories: () =>
    api.get<ApiResponse<{ categories: any[] }>>('/api/foods/categories'),

  getById: (id: string) =>
    api.get<ApiResponse<{ food: any }>>(`/api/foods/${id}`),

  create: (foodData: any) =>
    api.post<ApiResponse<{ food: any }>>('/api/foods', foodData),

  getByBarcode: (barcode: string) =>
    api.get<ApiResponse<{ food: any }>>(`/api/foods/barcode/${barcode}`),

  scan: (imageData: string) =>
    api.post<ApiResponse<{ suggestions: Array<{ name: string; confidence: number | null }> }>>('/api/foods/scan', {
      imageData,
    }),
};

// Meal API
export const mealApi = {
  log: (mealData: {
    foodId: string;
    quantity: number;
    servingSize: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    date?: string;
    notes?: string;
    imageUrl?: string;
  }) =>
    api.post<ApiResponse<{ meal: any }>>('/api/meals', mealData),

  getMeals: (options?: {
    date?: string;
    mealType?: string;
    limit?: number;
    offset?: number;
  }) =>
    api.get<ApiResponse<{ meals: any[]; pagination: any }>>('/api/meals', {
      params: options,
    }),

  getDailySummary: (date?: string) =>
    api.get<ApiResponse<any>>('/api/meals/daily-summary', {
      params: { date },
    }),

  deleteMeal: (id: string) =>
    api.delete<ApiResponse<null>>(`/api/meals/${id}`),

  updateMeal: (id: string, mealData: any) =>
    api.put<ApiResponse<{ meal: any }>>(`/api/meals/${id}`, mealData),
};

// Activity API (placeholder for future implementation)
export const activityApi = {
  log: (activityData: any) =>
    api.post<ApiResponse<{ activity: any }>>('/api/activities', activityData),

  getActivities: (options?: any) =>
    api.get<ApiResponse<{ activities: any[] }>>('/api/activities', {
      params: options,
    }),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/api/activities/${id}`),
};

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Health check
export const healthCheck = () =>
  api.get<{ status: string; timestamp: string; version: string }>('/health');

export default api;
