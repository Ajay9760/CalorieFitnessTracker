import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DailyProgress } from '../../types';

interface ProgressState {
  dailyProgress: DailyProgress | null;
  weeklyProgress: DailyProgress[];
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  dailyProgress: null,
  weeklyProgress: [],
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setDailyProgress: (state, action: PayloadAction<DailyProgress>) => {
      state.dailyProgress = action.payload;
    },
    setWeeklyProgress: (state, action: PayloadAction<DailyProgress[]>) => {
      state.weeklyProgress = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setDailyProgress, setWeeklyProgress, setLoading, setError } = progressSlice.actions;
export default progressSlice.reducer;
