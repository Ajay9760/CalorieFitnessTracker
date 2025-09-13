import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import mealReducer from './slices/mealSlice';
import activityReducer from './slices/activitySlice';
import progressReducer from './slices/progressSlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('calorieFitnessState');
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
    // Convert date strings back to Date objects
    if (parsedState.user?.currentUser) {
      const user = parsedState.user.currentUser;
      if (user.createdAt) user.createdAt = new Date(user.createdAt);
      if (user.updatedAt) user.updatedAt = new Date(user.updatedAt);
    }
    if (parsedState.user?.lastLoginAt) {
      parsedState.user.lastLoginAt = new Date(parsedState.user.lastLoginAt);
    }
    return parsedState;
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('calorieFitnessState', serializedState);
  } catch {
    // Ignore write errors
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    user: userReducer,
    meals: mealReducer,
    activities: activityReducer,
    progress: progressReducer,
  },
  ...(persistedState && { preloadedState: persistedState }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredActionsPaths: ['payload.timestamp', 'payload.createdAt', 'payload.updatedAt', 'payload.lastLoginAt'],
      },
    }),
});

// Save state to localStorage whenever it changes
store.subscribe(() => {
  saveState({
    user: store.getState().user, // Only persist user state for now
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;