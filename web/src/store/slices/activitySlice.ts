import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityEntry } from '../../types';

interface ActivityState {
  activities: ActivityEntry[];
  todaysActivity: ActivityEntry | null;
  loading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  activities: [],
  todaysActivity: null,
  loading: false,
  error: null,
};

const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<ActivityEntry>) => {
      state.activities.push(action.payload);
    },
    setTodaysActivity: (state, action: PayloadAction<ActivityEntry>) => {
      state.todaysActivity = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { addActivity, setTodaysActivity, setLoading, setError } = activitySlice.actions;
export default activitySlice.reducer;
