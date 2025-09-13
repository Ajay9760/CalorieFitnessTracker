import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealEntry, FoodItem } from '../../types';

interface MealState {
  todayMeals: MealEntry[];
  foodDatabase: FoodItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MealState = {
  todayMeals: [],
  foodDatabase: [],
  loading: false,
  error: null,
};

export const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<MealEntry>) => {
      state.todayMeals.push(action.payload);
    },
    removeMeal: (state, action: PayloadAction<string>) => {
      state.todayMeals = state.todayMeals.filter(meal => meal.id !== action.payload);
    },
    setTodayMeals: (state, action: PayloadAction<MealEntry[]>) => {
      state.todayMeals = action.payload;
    },
    setFoodDatabase: (state, action: PayloadAction<FoodItem[]>) => {
      state.foodDatabase = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { addMeal, removeMeal, setTodayMeals, setFoodDatabase, setLoading, setError } = mealSlice.actions;
export default mealSlice.reducer;
