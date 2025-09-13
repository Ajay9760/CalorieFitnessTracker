import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityEntry } from '../../types';

interface ActivityState {
  todayActivity: ActivityEntry | null;
  weeklyActivities: ActivityEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  todayActivity: null,
  weeklyActivities: [],
  loading: false,
  error: null,
};

export const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setTodayActivity: (state, action: PayloadAction<ActivityEntry>) => {
      state.todayActivity = action.payload;
    },
    setWeeklyActivities: (state, action: PayloadAction<ActivityEntry[]>) => {
      state.weeklyActivities = action.payload;
    },
    updateSteps: (state, action: PayloadAction<number>) => {
      if (state.todayActivity) {
        state.todayActivity.steps = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setTodayActivity, setWeeklyActivities, updateSteps, setLoading, setError } = activitySlice.actions;
export default activitySlice.reducer;
