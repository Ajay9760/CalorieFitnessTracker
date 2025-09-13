// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
  dietType: 'vegetarian' | 'vegan' | 'non_veg' | 'keto' | 'high_protein';
  region: 'north_indian' | 'south_indian' | 'east_indian' | 'west_indian' | 'all';
  dailyCalorieGoal: number;
  dailyStepGoal: number;
  dailyWaterGoal: number; // in ml
  createdAt: Date;
  updatedAt: Date;
}

// Food Types
export interface FoodItem {
  id: string;
  name: string;
  nameHindi?: string;
  category: FoodCategory;
  region: Region[];
  calories: number; // per 100g
  macros: Macronutrients;
  servingSizes: ServingSize[];
  isCommonDish: boolean;
  tags: string[];
  imageUrl?: string;
  barcode?: string;
}

export interface Macronutrients {
  protein: number; // in grams per 100g
  carbs: number;
  fats: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface ServingSize {
  unit: string; // 'cup', 'tablespoon', 'katori', 'roti', 'piece', etc.
  grams: number;
  description?: string;
}

export type FoodCategory = 
  | 'grains' | 'vegetables' | 'fruits' | 'dairy' | 'meat_fish' 
  | 'legumes' | 'nuts_seeds' | 'beverages' | 'sweets' | 'snacks' 
  | 'spices' | 'oils_fats';

export type Region = 'north_indian' | 'south_indian' | 'east_indian' | 'west_indian';

// Meal Types
export interface MealEntry {
  id: string;
  userId?: string;
  foodId: string;
  foodName: string;
  quantity: number; // in grams
  servingSize: string;
  mealType: MealType;
  calories: number;
  macros: Macronutrients;
  timestamp: Date;
  imageUrl?: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

// Activity Types
export interface ActivityEntry {
  id: string;
  userId?: string;
  date: Date;
  steps: number;
  distance: number; // in km
  caloriesBurned: number;
  activeMinutes: number;
  source?: 'manual' | 'google_fit' | 'apple_health' | 'device_sensor';
  exercises?: Exercise[];
}

export interface Exercise {
  name: string;
  duration: number; // in minutes
  caloriesBurned: number;
}

// Goal Types
export interface DailyGoals {
  userId: string;
  date: Date;
  calorieGoal: number;
  stepGoal: number;
  waterGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatsGoal: number;
}

// Progress Types
export interface DailyProgress {
  userId: string;
  date: Date;
  caloriesConsumed: number;
  caloriesBurned: number;
  steps: number;
  waterIntake: number;
  macrosConsumed: Macronutrients;
  mealsLogged: number;
  streak: number;
}

// Water Types
export interface WaterEntry {
  id: string;
  userId: string;
  amount: number; // in ml
  timestamp: Date;
}

// Gamification Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  unlockedAt?: Date;
}

export interface Achievement {
  id: string;
  userId: string;
  badgeId: string;
  unlockedAt: Date;
  streak?: number;
}

export interface UserStats {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  totalMealsLogged: number;
  totalSteps: number;
  achievements: Achievement[];
  level: number;
  xp: number;
}

// Insight Types
export interface Insight {
  id: string;
  userId: string;
  type: 'suggestion' | 'achievement' | 'warning' | 'tip';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
  actionable?: boolean;
  actionText?: string;
}

// Chart Data Types
export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
    strokeWidth?: number;
  }[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  FoodLog: undefined;
  FoodSearch: { mealType: MealType };
  FoodDetail: { foodId: string; mealType: MealType };
  Profile: undefined;
  Progress: undefined;
  Goals: undefined;
  Auth: undefined;
  Camera: { mealType: MealType };
};

export type BottomTabParamList = {
  Dashboard: undefined;
  FoodLog: undefined;
  Activity: undefined;
  Progress: undefined;
  Profile: undefined;
};

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  name: string;
  confirmPassword: string;
}

export interface ProfileForm {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  activityLevel: User['activityLevel'];
  dietType: User['dietType'];
  region: User['region'];
}

// Search Types
export interface SearchFilters {
  category?: FoodCategory;
  region?: Region;
  dietType?: User['dietType'];
  maxCalories?: number;
  query?: string;
}
