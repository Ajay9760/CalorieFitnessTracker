import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealEntry } from '../../types';

interface MealState {
  meals: MealEntry[];
  todaysMeals: MealEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: MealState = {
  meals: [],
  todaysMeals: [],
  loading: false,
  error: null,
};

const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<MealEntry>) => {
      state.meals.push(action.payload);
      // Check if it's today's meal
      const today = new Date().toDateString();
      const mealDate = new Date(action.payload.timestamp).toDateString();
      if (today === mealDate) {
        state.todaysMeals.push(action.payload);
      }
    },
    setMeals: (state, action: PayloadAction<MealEntry[]>) => {
      state.meals = action.payload;
    },
    setTodaysMeals: (state, action: PayloadAction<MealEntry[]>) => {
      state.todaysMeals = action.payload;
    },
    deleteMeal: (state, action: PayloadAction<string>) => {
      state.meals = state.meals.filter(meal => meal.id !== action.payload);
      state.todaysMeals = state.todaysMeals.filter(meal => meal.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { addMeal, setMeals, setTodaysMeals, deleteMeal, setLoading, setError } = mealSlice.actions;
export default mealSlice.reducer;