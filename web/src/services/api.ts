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
});

// Token management
let authToken: string | null = localStorage.getItem('accessToken');

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      authToken = null;
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Helper function to set auth token
export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('accessToken', token);
  } else {
    localStorage.removeItem('accessToken');
  }
};

// Types for API responses
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// Authentication API
export const authApi = {
  register: (userData: {
    email: string;
    password: string;
    username: string;
    name: string;
  }) =>
    api.post<ApiResponse<{ user: any; accessToken: string; refreshToken: string }>>('/api/auth/register', userData),

  login: (credentials: { email: string; password: string }) =>
    api.post<ApiResponse<{ user: any; accessToken: string; refreshToken: string }>>('/api/auth/login', credentials),

  logout: () =>
    api.post<ApiResponse<null>>('/api/auth/logout'),

  refreshToken: (refreshToken: string) =>
    api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>('/api/auth/refresh', { refreshToken }),
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