import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutEntry } from '../../types';

interface ActivityState {
  activities: WorkoutEntry[];
  todaysActivity: WorkoutEntry | null;
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
    addActivity: (state, action: PayloadAction<WorkoutEntry>) => {
      state.activities.push(action.payload);
      // Update today's activity if it's from today
      const today = new Date().toDateString();
      const activityDate = new Date(action.payload.timestamp).toDateString();
      if (today === activityDate) {
        // For now, just use the latest activity as today's activity
        // In a real app, you might want to aggregate multiple activities
        state.todaysActivity = action.payload;
      }
    },
    setActivities: (state, action: PayloadAction<WorkoutEntry[]>) => {
      state.activities = action.payload;
    },
    setTodaysActivity: (state, action: PayloadAction<WorkoutEntry>) => {
      state.todaysActivity = action.payload;
    },
    deleteActivity: (state, action: PayloadAction<string>) => {
      state.activities = state.activities.filter(activity => activity.id !== action.payload);
      if (state.todaysActivity?.id === action.payload) {
        state.todaysActivity = null;
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

export const { 
  addActivity, 
  setActivities, 
  setTodaysActivity, 
  deleteActivity, 
  setLoading, 
  setError 
} = activitySlice.actions;
export default activitySlice.reducer;
