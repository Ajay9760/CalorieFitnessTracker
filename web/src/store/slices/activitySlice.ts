import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityEntry } from '../../types';

interface ActivityState {
  activities: ActivityEntry[];
  todaysActivity: ActivityEntry | null;
  loading: boolean;
  error: string | null;
}

// Sample data for demonstration
const sampleTodaysActivity: ActivityEntry = {
  id: '1',
  date: new Date(),
  steps: 8547,
  caloriesBurned: 342,
  distance: 6.2,
  activeMinutes: 45,
  source: 'manual',
  exercises: [
    {
      name: 'Morning Walk',
      duration: 30,
      caloriesBurned: 150
    },
    {
      name: 'Yoga',
      duration: 15,
      caloriesBurned: 45
    }
  ]
};

const initialState: ActivityState = {
  activities: [sampleTodaysActivity],
  todaysActivity: sampleTodaysActivity,
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
