// App Constants
export const APP_NAME = 'FitTracker';
export const VERSION = '1.0.0';

// Colors - Elegant and modern palette
export const COLORS = {
  // Primary colors - Soft and professional
  primary: '#6366F1',        // Indigo
  primaryLight: '#818CF8',   // Light indigo
  primaryDark: '#4F46E5',    // Dark indigo
  
  // Secondary colors
  secondary: '#10B981',      // Emerald
  secondaryLight: '#34D399', // Light emerald
  accent: '#F59E0B',         // Amber
  
  // Status colors - Subtle and clear
  success: '#10B981',        // Emerald
  warning: '#F59E0B',        // Amber
  error: '#EF4444',          // Red
  info: '#3B82F6',           // Blue
  
  // Neutral colors - Refined grays
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Background colors
  background: '#F9FAFB',     // Very light gray
  surface: '#FFFFFF',        // Pure white
  surfaceElevated: '#FFFFFF', // White with shadow
  
  // Text colors - Better hierarchy
  textPrimary: '#111827',    // Almost black
  textSecondary: '#6B7280',  // Medium gray
  textTertiary: '#9CA3AF',   // Light gray
  textInverse: '#FFFFFF',    // White text
  
  // Chart colors - Harmonious palette
  chartPrimary: '#6366F1',
  chartSecondary: '#10B981',
  chartTertiary: '#F59E0B',
  chartQuaternary: '#EF4444',
  chartFifth: '#8B5CF6',     // Purple
  chartSixth: '#06B6D4',     // Cyan
  
  // Border colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',
};

// Dimensions - Modern spacing and sizing
export const DIMENSIONS = {
  // Border radius - Rounded but not overly soft
  borderRadius: 12,
  borderRadiusSmall: 8,
  borderRadiusLarge: 16,
  borderRadiusXLarge: 24,
  
  // Spacing system (4px grid)
  space1: 4,    // 0.25rem
  space2: 8,    // 0.5rem
  space3: 12,   // 0.75rem
  space4: 16,   // 1rem
  space5: 20,   // 1.25rem
  space6: 24,   // 1.5rem
  space8: 32,   // 2rem
  space10: 40,  // 2.5rem
  space12: 48,  // 3rem
  space16: 64,  // 4rem
  space20: 80,  // 5rem
  
  // Padding shortcuts
  padding: 16,
  paddingSmall: 12,
  paddingLarge: 24,
  paddingXLarge: 32,
  
  // Margin shortcuts
  margin: 16,
  marginSmall: 12,
  marginLarge: 24,
  marginXLarge: 32,
  
  // Icon sizes
  iconXSmall: 12,
  iconSmall: 16,
  iconMedium: 20,
  iconLarge: 24,
  iconXLarge: 32,
  iconXXLarge: 48,
  
  // Button heights
  buttonHeight: 48,
  buttonHeightSmall: 40,
  buttonHeightLarge: 56,
  
  // Input heights
  inputHeight: 48,
  inputHeightSmall: 40,
  
  // Card elevation
  elevation: {
    none: 0,
    small: 2,
    medium: 4,
    large: 8,
    xLarge: 16,
  },
};

// Typography - Modern type scale
export const TYPOGRAPHY = {
  // Font sizes (responsive type scale)
  fontSize10: 10,   // Caption
  fontSize11: 11,   // Small caption
  fontSize12: 12,   // Small text
  fontSize14: 14,   // Body text
  fontSize16: 16,   // Body large
  fontSize18: 18,   // Subtitle
  fontSize20: 20,   // Title 3
  fontSize24: 24,   // Title 2
  fontSize28: 28,   // Title 1
  fontSize32: 32,   // Heading
  fontSize40: 40,   // Large heading
  
  // Semantic font sizes
  caption: 12,
  body: 14,
  bodyLarge: 16,
  subtitle: 18,
  title3: 20,
  title2: 24,
  title1: 28,
  heading: 32,
  largeHeading: 40,
  
  // Font weights
  fontWeightLight: '300' as const,
  fontWeightRegular: '400' as const,
  fontWeightMedium: '500' as const,
  fontWeightSemiBold: '600' as const,
  fontWeightBold: '700' as const,
  fontWeightExtraBold: '800' as const,
  
  // Line heights
  lineHeightTight: 1.2,
  lineHeightNormal: 1.4,
  lineHeightRelaxed: 1.6,
  lineHeightLoose: 1.8,
  
  // Letter spacing
  letterSpacingTight: -0.5,
  letterSpacingNormal: 0,
  letterSpacingWide: 0.5,
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
