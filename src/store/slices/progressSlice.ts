import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DailyProgress } from '../../types';

interface ProgressState {
  todayProgress: DailyProgress | null;
  weeklyProgress: DailyProgress[];
  monthlyProgress: DailyProgress[];
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  todayProgress: null,
  weeklyProgress: [],
  monthlyProgress: [],
  loading: false,
  error: null,
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setTodayProgress: (state, action: PayloadAction<DailyProgress>) => {
      state.todayProgress = action.payload;
    },
    setWeeklyProgress: (state, action: PayloadAction<DailyProgress[]>) => {
      state.weeklyProgress = action.payload;
    },
    setMonthlyProgress: (state, action: PayloadAction<DailyProgress[]>) => {
      state.monthlyProgress = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setTodayProgress, setWeeklyProgress, setMonthlyProgress, setLoading, setError } = progressSlice.actions;
export default progressSlice.reducer;
