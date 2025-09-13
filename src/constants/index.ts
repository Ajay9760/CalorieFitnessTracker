// App Constants
export const APP_NAME = 'FitTracker';
export const VERSION = '1.0.0';

// Colors
export const COLORS = {
  primary: '#4CAF50',
  primaryDark: '#388E3C',
  secondary: '#FF9800',
  accent: '#2196F3',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#F5F5F5',
  darkGray: '#424242',
  
  // Background colors
  background: '#F8F9FA',
  surface: '#FFFFFF',
  
  // Text colors
  textPrimary: '#212121',
  textSecondary: '#757575',
  textTertiary: '#9E9E9E',
  
  // Chart colors
  chartRed: '#FF6384',
  chartBlue: '#36A2EB',
  chartYellow: '#FFCE56',
  chartGreen: '#4BC0C0',
  chartPurple: '#9966FF',
  chartOrange: '#FF9F40',
};

// Dimensions
export const DIMENSIONS = {
  borderRadius: 8,
  borderRadiusLarge: 16,
  padding: 16,
  paddingSmall: 8,
  paddingLarge: 24,
  margin: 16,
  marginSmall: 8,
  marginLarge: 24,
  
  // Icon sizes
  iconSmall: 16,
  iconMedium: 24,
  iconLarge: 32,
  iconXLarge: 48,
  
  // Button heights
  buttonHeight: 48,
  buttonHeightSmall: 36,
  buttonHeightLarge: 56,
  
  // Input heights
  inputHeight: 48,
};

// Typography
export const TYPOGRAPHY = {
  fontSizeSmall: 12,
  fontSizeRegular: 14,
  fontSizeMedium: 16,
  fontSizeLarge: 18,
  fontSizeXLarge: 20,
  fontSizeXXLarge: 24,
  fontSizeTitle: 28,
  
  fontWeightLight: '300' as const,
  fontWeightRegular: '400' as const,
  fontWeightMedium: '500' as const,
  fontWeightBold: '700' as const,
};

// Calorie Calculation Constants
export const CALORIE_CALCULATION = {
  // BMR (Basal Metabolic Rate) multipliers for different activity levels
  ACTIVITY_MULTIPLIERS: {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9,
  },
  
  // Calories burned per step (approximate)
  CALORIES_PER_STEP: 0.04,
  
  // Steps to distance conversion (approximate)
  STEPS_TO_KM: 1300, // steps per km
};

// Macro Distribution (percentage of total calories)
export const MACRO_TARGETS = {
  balanced: {
    protein: 0.2,
    carbs: 0.5,
    fats: 0.3,
  },
  keto: {
    protein: 0.25,
    carbs: 0.05,
    fats: 0.7,
  },
  high_protein: {
    protein: 0.35,
    carbs: 0.4,
    fats: 0.25,
  },
};

// Default Goals
export const DEFAULT_GOALS = {
  steps: 10000,
  water: 2000, // ml
  protein: 1.6, // grams per kg of body weight
};

// Badge Conditions
export const BADGE_CONDITIONS = {
  FIRST_MEAL: 'first_meal_logged',
  WEEK_STREAK: '7_day_streak',
  MONTH_STREAK: '30_day_streak',
  STEPS_10K: '10k_steps_day',
  STEPS_15K: '15k_steps_day',
  PERFECT_WEEK: 'perfect_week', // All goals met for 7 days
  WATER_WARRIOR: 'water_goal_7_days',
  MACRO_MASTER: 'macro_balance_3_days',
};

// Indian Food Categories
export const INDIAN_FOOD_CATEGORIES = {
  GRAINS: 'grains',
  VEGETABLES: 'vegetables',
  FRUITS: 'fruits',
  DAIRY: 'dairy',
  MEAT_FISH: 'meat_fish',
  LEGUMES: 'legumes',
  NUTS_SEEDS: 'nuts_seeds',
  BEVERAGES: 'beverages',
  SWEETS: 'sweets',
  SNACKS: 'snacks',
  SPICES: 'spices',
  OILS_FATS: 'oils_fats',
} as const;

// Regional Cuisines
export const REGIONS = {
  NORTH_INDIAN: 'north_indian',
  SOUTH_INDIAN: 'south_indian',
  EAST_INDIAN: 'east_indian',
  WEST_INDIAN: 'west_indian',
} as const;

// Common Indian Serving Sizes
export const INDIAN_SERVING_SIZES = {
  KATORI: 'katori', // Small bowl
  BOWL: 'bowl',
  CUP: 'cup',
  TABLESPOON: 'tablespoon',
  TEASPOON: 'teaspoon',
  ROTI: 'roti',
  SLICE: 'slice',
  PIECE: 'piece',
  GLASS: 'glass',
  SMALL_GLASS: 'small_glass',
  LARGE_GLASS: 'large_glass',
} as const;

// API Endpoints (will be replaced with actual backend URLs)
export const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:3000/api',
  
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
  
  // User
  PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  
  // Food
  FOODS: '/foods',
  FOOD_SEARCH: '/foods/search',
  BARCODE_SEARCH: '/foods/barcode',
  
  // Meals
  MEALS: '/meals',
  LOG_MEAL: '/meals/log',
  
  // Activity
  ACTIVITIES: '/activities',
  LOG_ACTIVITY: '/activities/log',
  SYNC_HEALTH_DATA: '/activities/sync',
  
  // Progress
  DAILY_PROGRESS: '/progress/daily',
  WEEKLY_PROGRESS: '/progress/weekly',
  MONTHLY_PROGRESS: '/progress/monthly',
  
  // Water
  WATER_ENTRIES: '/water',
  LOG_WATER: '/water/log',
  
  // Insights
  INSIGHTS: '/insights',
  
  // Gamification
  BADGES: '/badges',
  ACHIEVEMENTS: '/achievements',
  STATS: '/stats',
};

// Storage Keys for AsyncStorage
export const STORAGE_KEYS = {
  USER_TOKEN: '@user_token',
  REFRESH_TOKEN: '@refresh_token',
  USER_DATA: '@user_data',
  OFFLINE_MEALS: '@offline_meals',
  OFFLINE_ACTIVITIES: '@offline_activities',
  OFFLINE_WATER: '@offline_water',
  FOOD_DATABASE: '@food_database',
  LAST_SYNC: '@last_sync',
  ONBOARDING_COMPLETE: '@onboarding_complete',
};

// Animation Durations
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
};

// Chart Configuration
export const CHART_CONFIG = {
  backgroundColor: COLORS.surface,
  backgroundGradientFrom: COLORS.surface,
  backgroundGradientTo: COLORS.surface,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(33, 33, 33, ${opacity})`,
  style: {
    borderRadius: DIMENSIONS.borderRadius,
  },
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: COLORS.primary,
  },
};

// Languages for Voice Input
export const SUPPORTED_LANGUAGES = {
  english: 'en-IN',
  hindi: 'hi-IN',
  tamil: 'ta-IN',
  telugu: 'te-IN',
  marathi: 'mr-IN',
  gujarati: 'gu-IN',
  bengali: 'bn-IN',
  kannada: 'kn-IN',
  malayalam: 'ml-IN',
  punjabi: 'pa-IN',
};

// Common Indian Food Names in Different Languages
export const FOOD_TRANSLATIONS = {
  roti: {
    hindi: 'रोटी',
    tamil: 'ரொட்டி',
    telugu: 'రోటీ',
  },
  dal: {
    hindi: 'दाल',
    tamil: 'தால்',
    telugu: 'దాల్',
  },
  rice: {
    hindi: 'चावल',
    tamil: 'சோறு',
    telugu: 'అన్నం',
  },
  // Add more translations as needed
};

export default {
  COLORS,
  DIMENSIONS,
  TYPOGRAPHY,
  CALORIE_CALCULATION,
  MACRO_TARGETS,
  DEFAULT_GOALS,
  BADGE_CONDITIONS,
  INDIAN_FOOD_CATEGORIES,
  REGIONS,
  INDIAN_SERVING_SIZES,
  API_ENDPOINTS,
  STORAGE_KEYS,
  ANIMATION_DURATION,
  CHART_CONFIG,
  SUPPORTED_LANGUAGES,
  FOOD_TRANSLATIONS,
};
