import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { authApi, userApi, setAuthToken, handleApiError } from '../../services/api';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  loginAttempts: number;
  lastLoginAt: Date | null;
}

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      const { user, accessToken, refreshToken } = response.data.data;
      
      // Store tokens
      setAuthToken(accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      return user;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      const { user, accessToken, refreshToken } = response.data.data;
      
      // Store tokens
      setAuthToken(accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      return user;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      
      // Clear tokens
      setAuthToken(null);
      localStorage.removeItem('refreshToken');
      
      return null;
    } catch (error) {
      // Even if logout fails, clear local tokens
      setAuthToken(null);
      localStorage.removeItem('refreshToken');
      return null;
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getProfile();
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await userApi.updateProfile(profileData);
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Check if user is authenticated on app start
export const checkAuthStatus = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return rejectWithValue('No token found');
    }
    
    try {
      setAuthToken(token);
      const response = await userApi.getProfile();
      return response.data.data.user;
    } catch (error) {
      // Token is invalid, clear it
      setAuthToken(null);
      localStorage.removeItem('refreshToken');
      return rejectWithValue(handleApiError(error));
    }
  }
);

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  loginAttempts: 0,
  lastLoginAt: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.lastLoginAt = new Date();
      state.loginAttempts = 0;
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      if (action.payload) {
        state.lastLoginAt = new Date();
        state.loginAttempts = 0;
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loginAttempts = 0;
      state.lastLoginAt = null;
      // Clear localStorage
      localStorage.removeItem('calorieFitnessState');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    incrementLoginAttempts: (state) => {
      state.loginAttempts += 1;
    },
    resetLoginAttempts: (state) => {
      state.loginAttempts = 0;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.lastLoginAt = new Date();
        state.loginAttempts = 0;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.loginAttempts += 1;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.lastLoginAt = new Date();
        state.loginAttempts = 0;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuthenticated = false;
        state.error = null;
        state.loginAttempts = 0;
        state.lastLoginAt = null;
        state.loading = false;
      })
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setUser, 
  setCurrentUser,
  setIsAuthenticated,
  updateUser, 
  logoutUser, 
  setLoading, 
  setError,
  incrementLoginAttempts,
  resetLoginAttempts
} = userSlice.actions;

// Selectors
export const selectCurrentUser = (state: { user: UserState }) => state.user.currentUser;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectIsLoading = (state: { user: UserState }) => state.user.loading;
export const selectError = (state: { user: UserState }) => state.user.error;
export const selectLoginAttempts = (state: { user: UserState }) => state.user.loginAttempts;
export const selectLastLoginAt = (state: { user: UserState }) => state.user.lastLoginAt;

export default userSlice.reducer;
