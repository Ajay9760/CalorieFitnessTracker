import { User, DailyProgress } from '../types';

export const SAMPLE_USER: User = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  age: 28,
  gender: 'male',
  height: 175, // cm
  weight: 70, // kg
  activityLevel: 'moderately_active',
  dietType: 'vegetarian',
  region: 'north_indian',
  dailyCalorieGoal: 2200,
  dailyStepGoal: 10000,
  dailyWaterGoal: 2500, // ml
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
};

export const SAMPLE_DAILY_PROGRESS: DailyProgress = {
  userId: '1',
  date: new Date(),
  caloriesConsumed: 1650,
  caloriesBurned: 320,
  steps: 7842,
  waterIntake: 1800,
  macrosConsumed: {
    protein: 85,
    carbs: 180,
    fats: 60,
    fiber: 28,
    sugar: 45,
    sodium: 1800,
  },
  mealsLogged: 3,
  streak: 5,
};