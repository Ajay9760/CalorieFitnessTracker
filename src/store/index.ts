import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import mealReducer from './slices/mealSlice';
import activityReducer from './slices/activitySlice';
import progressReducer from './slices/progressSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    meals: mealReducer,
    activities: activityReducer,
    progress: progressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
