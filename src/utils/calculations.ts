import { User, FoodItem, MealEntry, Macronutrients } from '../types';
import { CALORIE_CALCULATION, MACRO_TARGETS, DEFAULT_GOALS } from '../constants';

/**
 * Calculate Basal Metabolic Rate (BMR) using Harris-Benedict Equation
 */
export const calculateBMR = (user: User): number => {
  const { age, gender, weight, height } = user;
  
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
};

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 */
export const calculateTDEE = (user: User): number => {
  const bmr = calculateBMR(user);
  const activityMultiplier = CALORIE_CALCULATION.ACTIVITY_MULTIPLIERS[user.activityLevel];
  return Math.round(bmr * activityMultiplier);
};

/**
 * Calculate daily calorie goal based on user's goal (maintain, lose, gain weight)
 */
export const calculateDailyCalorieGoal = (user: User, goal: 'maintain' | 'lose' | 'gain' = 'maintain'): number => {
  const tdee = calculateTDEE(user);
  
  switch (goal) {
    case 'lose':
      return Math.round(tdee - 500); // 500 calorie deficit for ~1lb/week loss
    case 'gain':
      return Math.round(tdee + 300); // 300 calorie surplus for gradual weight gain
    case 'maintain':
    default:
      return tdee;
  }
};

/**
 * Calculate macro targets based on diet type
 */
export const calculateMacroTargets = (totalCalories: number, dietType: User['dietType']): Macronutrients => {
  const macroKey = ['keto', 'high_protein'].includes(dietType) ? dietType as keyof typeof MACRO_TARGETS : 'balanced';
  const targets = MACRO_TARGETS[macroKey];
  
  const proteinCalories = totalCalories * targets.protein;
  const carbCalories = totalCalories * targets.carbs;
  const fatCalories = totalCalories * targets.fats;
  
  return {
    protein: Math.round(proteinCalories / 4), // 4 calories per gram of protein
    carbs: Math.round(carbCalories / 4), // 4 calories per gram of carbs
    fats: Math.round(fatCalories / 9), // 9 calories per gram of fat
    fiber: Math.round(totalCalories * 0.014), // 14g per 1000 calories
    sugar: Math.round(totalCalories * 0.05), // Max 5% of total calories
    sodium: Math.round(totalCalories * 1.2), // ~2300mg for 2000 calorie diet
  };
};

/**
 * Calculate calories and macros for a meal entry
 */
export const calculateMealNutrition = (food: FoodItem, quantity: number): { calories: number; macros: Macronutrients } => {
  const factor = quantity / 100; // food data is per 100g
  
  return {
    calories: Math.round(food.calories * factor),
    macros: {
      protein: Math.round(food.macros.protein * factor * 10) / 10,
      carbs: Math.round(food.macros.carbs * factor * 10) / 10,
      fats: Math.round(food.macros.fats * factor * 10) / 10,
      fiber: Math.round(food.macros.fiber * factor * 10) / 10,
      sugar: Math.round(food.macros.sugar * factor * 10) / 10,
      sodium: Math.round(food.macros.sodium * factor * 10) / 10,
    },
  };
};

/**
 * Calculate total nutrition from meal entries
 */
export const calculateTotalNutrition = (meals: MealEntry[]): { totalCalories: number; totalMacros: Macronutrients } => {
  const totals = meals.reduce(
    (acc, meal) => ({
      totalCalories: acc.totalCalories + meal.calories,
      totalMacros: {
        protein: acc.totalMacros.protein + meal.macros.protein,
        carbs: acc.totalMacros.carbs + meal.macros.carbs,
        fats: acc.totalMacros.fats + meal.macros.fats,
        fiber: acc.totalMacros.fiber + meal.macros.fiber,
        sugar: acc.totalMacros.sugar + meal.macros.sugar,
        sodium: acc.totalMacros.sodium + meal.macros.sodium,
      },
    }),
    {
      totalCalories: 0,
      totalMacros: {
        protein: 0,
        carbs: 0,
        fats: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
      },
    }
  );

  // Round the totals
  return {
    totalCalories: Math.round(totals.totalCalories),
    totalMacros: {
      protein: Math.round(totals.totalMacros.protein * 10) / 10,
      carbs: Math.round(totals.totalMacros.carbs * 10) / 10,
      fats: Math.round(totals.totalMacros.fats * 10) / 10,
      fiber: Math.round(totals.totalMacros.fiber * 10) / 10,
      sugar: Math.round(totals.totalMacros.sugar * 10) / 10,
      sodium: Math.round(totals.totalMacros.sodium * 10) / 10,
    },
  };
};

/**
 * Calculate calories burned from steps
 */
export const calculateCaloriesFromSteps = (steps: number, weight: number): number => {
  // More accurate calculation based on weight
  const caloriesPerStep = (weight * 0.04) / 70; // Normalized for 70kg person
  return Math.round(steps * caloriesPerStep);
};

/**
 * Calculate distance from steps
 */
export const calculateDistanceFromSteps = (steps: number): number => {
  return Math.round((steps / CALORIE_CALCULATION.STEPS_TO_KM) * 100) / 100; // km with 2 decimal places
};

/**
 * Calculate macro percentages
 */
export const calculateMacroPercentages = (macros: Macronutrients, totalCalories: number): { protein: number; carbs: number; fats: number } => {
  if (totalCalories === 0) {
    return { protein: 0, carbs: 0, fats: 0 };
  }

  const proteinCalories = macros.protein * 4;
  const carbCalories = macros.carbs * 4;
  const fatCalories = macros.fats * 9;

  return {
    protein: Math.round((proteinCalories / totalCalories) * 100),
    carbs: Math.round((carbCalories / totalCalories) * 100),
    fats: Math.round((fatCalories / totalCalories) * 100),
  };
};

/**
 * Calculate progress percentage for goals
 */
export const calculateProgress = (current: number, goal: number): number => {
  if (goal === 0) return 0;
  return Math.min(Math.round((current / goal) * 100), 100);
};

/**
 * Calculate weekly average from daily values
 */
export const calculateWeeklyAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return Math.round((sum / values.length) * 10) / 10;
};

/**
 * Calculate streak from boolean array (true = goal met)
 */
export const calculateStreak = (achievements: boolean[]): number => {
  let streak = 0;
  for (let i = achievements.length - 1; i >= 0; i--) {
    if (achievements[i]) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};

/**
 * Calculate recommended protein intake based on weight and activity level
 */
export const calculateProteinGoal = (weight: number, activityLevel: User['activityLevel']): number => {
  let multiplier = DEFAULT_GOALS.protein; // base 1.6g/kg
  
  switch (activityLevel) {
    case 'very_active':
    case 'extra_active':
      multiplier = 2.0; // Higher for very active individuals
      break;
    case 'moderately_active':
      multiplier = 1.8;
      break;
    case 'lightly_active':
      multiplier = 1.6;
      break;
    case 'sedentary':
      multiplier = 1.2;
      break;
  }
  
  return Math.round(weight * multiplier);
};

/**
 * Calculate water goal based on weight and activity level
 */
export const calculateWaterGoal = (weight: number, activityLevel: User['activityLevel']): number => {
  let baseWater = weight * 35; // 35ml per kg base requirement
  
  switch (activityLevel) {
    case 'very_active':
    case 'extra_active':
      baseWater += 500; // Extra 500ml for very active
      break;
    case 'moderately_active':
      baseWater += 250; // Extra 250ml for moderately active
      break;
  }
  
  return Math.round(baseWater);
};

/**
 * Check if macro distribution is balanced
 */
export const isMacroBalanced = (percentages: { protein: number; carbs: number; fats: number }): boolean => {
  // Acceptable ranges for balanced diet
  const ranges = {
    protein: { min: 15, max: 30 },
    carbs: { min: 45, max: 65 },
    fats: { min: 20, max: 35 },
  };
  
  return (
    percentages.protein >= ranges.protein.min && percentages.protein <= ranges.protein.max &&
    percentages.carbs >= ranges.carbs.min && percentages.carbs <= ranges.carbs.max &&
    percentages.fats >= ranges.fats.min && percentages.fats <= ranges.fats.max
  );
};

/**
 * Generate nutrition insight based on intake vs goals
 */
export const generateNutritionInsight = (
  consumed: Macronutrients,
  goals: Macronutrients,
  caloriesConsumed: number,
  calorieGoal: number
): string[] => {
  const insights: string[] = [];
  
  // Calorie insights
  const calorieDeficit = calorieGoal - caloriesConsumed;
  if (calorieDeficit > 300) {
    insights.push(`You have ${calorieDeficit} calories remaining. Consider a healthy snack!`);
  } else if (calorieDeficit < -200) {
    insights.push(`You're ${Math.abs(calorieDeficit)} calories over your goal. Maybe go for a walk?`);
  }
  
  // Protein insights
  const proteinDeficit = goals.protein - consumed.protein;
  if (proteinDeficit > 20) {
    insights.push(`You need ${Math.round(proteinDeficit)}g more protein. Try adding dal, paneer, or eggs.`);
  }
  
  // Fiber insights
  if (consumed.fiber < 25) {
    insights.push('Add more vegetables and fruits to increase your fiber intake.');
  }
  
  // Sodium insights
  if (consumed.sodium > 2300) {
    insights.push('Your sodium intake is high. Try reducing salt in your cooking.');
  }
  
  return insights;
};
