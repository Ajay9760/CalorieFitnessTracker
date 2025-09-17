import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { SAMPLE_USER } from '../../data/sampleUser';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// For development - include sample user data
const initialState: UserState = {
  currentUser: SAMPLE_USER, // Remove this in production
  isAuthenticated: true, // Remove this in production
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
});

export const { setUser, clearUser, setLoading, setError, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
