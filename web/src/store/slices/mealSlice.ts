import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealEntry } from '../../types';

interface MealState {
  meals: MealEntry[];
  todaysMeals: MealEntry[];
  loading: boolean;
  error: string | null;
}

// Sample data for demonstration
const sampleMeals: MealEntry[] = [
  {
    id: '1',
    foodId: 'rice_basmati',
    foodName: 'Basmati Rice',
    servingSize: '1 cup cooked',
    quantity: 1,
    calories: 210,
    macros: {
      protein: 4.3,
      carbs: 45.0,
      fats: 0.4,
      fiber: 0.6,
      sugar: 0.1,
      sodium: 2
    },
    mealType: 'lunch',
    timestamp: new Date(),
  },
  {
    id: '2',
    foodId: 'dal_moong',
    foodName: 'Moong Dal',
    servingSize: '1 cup cooked',
    quantity: 1,
    calories: 230,
    macros: {
      protein: 14.2,
      carbs: 38.7,
      fats: 0.8,
      fiber: 15.4,
      sugar: 2.0,
      sodium: 15
    },
    mealType: 'lunch',
    timestamp: new Date(),
  },
  {
    id: '3',
    foodId: 'roti_wheat',
    foodName: 'Wheat Roti',
    servingSize: '1 medium roti',
    quantity: 2,
    calories: 142,
    macros: {
      protein: 5.4,
      carbs: 28.8,
      fats: 1.8,
      fiber: 4.2,
      sugar: 0.4,
      sodium: 4
    },
    mealType: 'dinner',
    timestamp: new Date(),
  }
];

const initialState: MealState = {
  meals: sampleMeals,
  todaysMeals: sampleMeals,
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