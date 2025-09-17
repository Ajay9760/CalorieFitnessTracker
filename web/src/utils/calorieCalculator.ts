import { User, CalorieCalculation, MacroTargets, FitnessGoal, GoalPreset } from '../types';

// Activity level multipliers for TDEE calculation
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,           // Little or no exercise
  lightly_active: 1.375,    // Light exercise 1-3 days/week
  moderately_active: 1.55,  // Moderate exercise 3-5 days/week
  very_active: 1.725,       // Hard exercise 6-7 days/week
  extra_active: 1.9         // Very hard exercise, physical job
};

// Goal presets with scientifically-backed macro distributions
export const GOAL_PRESETS: GoalPreset[] = [
  {
    goal: 'lose_weight',
    name: 'Weight Loss',
    description: 'Sustainable fat loss while preserving muscle mass',
    calorieAdjustment: -0.20, // 20% deficit
    macroSplit: {
      protein: 30, // High protein to preserve muscle
      carbs: 40,   // Moderate carbs for energy
      fats: 30     // Moderate fats for hormones
    },
    recommendedWeightChange: -0.5, // 0.5kg per week
    icon: '📉'
  },
  {
    goal: 'maintain_weight',
    name: 'Weight Maintenance',
    description: 'Maintain current weight while improving body composition',
    calorieAdjustment: 0, // No calorie adjustment
    macroSplit: {
      protein: 25,
      carbs: 45,
      fats: 30
    },
    recommendedWeightChange: 0,
    icon: '⚖️'
  },
  {
    goal: 'gain_weight',
    name: 'Weight Gain',
    description: 'Healthy weight gain with minimal fat accumulation',
    calorieAdjustment: 0.15, // 15% surplus
    macroSplit: {
      protein: 25,
      carbs: 50, // Higher carbs for muscle building
      fats: 25
    },
    recommendedWeightChange: 0.5, // 0.5kg per week
    icon: '📈'
  },
  {
    goal: 'build_muscle',
    name: 'Muscle Building',
    description: 'Optimize muscle growth with adequate calories and protein',
    calorieAdjustment: 0.20, // 20% surplus
    macroSplit: {
      protein: 30, // High protein for muscle synthesis
      carbs: 45,   // High carbs for performance
      fats: 25
    },
    recommendedWeightChange: 0.75, // 0.75kg per week
    icon: '💪'
  },
  {
    goal: 'cut',
    name: 'Cutting (Bodybuilding)',
    description: 'Aggressive fat loss while maintaining muscle mass',
    calorieAdjustment: -0.25, // 25% deficit
    macroSplit: {
      protein: 35, // Very high protein
      carbs: 35,   // Moderate carbs
      fats: 30
    },
    recommendedWeightChange: -0.75, // 0.75kg per week
    icon: '🔥'
  },
  {
    goal: 'lean_bulk',
    name: 'Lean Bulk',
    description: 'Slow, controlled muscle gain with minimal fat',
    calorieAdjustment: 0.10, // 10% surplus
    macroSplit: {
      protein: 30,
      carbs: 45,
      fats: 25
    },
    recommendedWeightChange: 0.25, // 0.25kg per week
    icon: '🎯'
  }
];

/**
 * Calculate Basal Metabolic Rate using Mifflin-St Jeor Equation
 * Most accurate formula for healthy individuals
 */
export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female' | 'other'): number {
  const baseMultiplier = 10;
  const heightMultiplier = 6.25;
  const ageMultiplier = 5;
  
  let bmr = (baseMultiplier * weight) + (heightMultiplier * height) - (ageMultiplier * age);
  
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  
  return Math.round(bmr);
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * BMR * Activity Level Multiplier
 */
export function calculateTDEE(bmr: number, activityLevel: User['activityLevel']): number {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel];
  return Math.round(bmr * multiplier);
}

/**
 * Calculate target calories based on fitness goal
 */
export function calculateTargetCalories(tdee: number, goal: FitnessGoal): number {
  const preset = GOAL_PRESETS.find(p => p.goal === goal);
  if (!preset) return tdee;
  
  const adjustment = tdee * preset.calorieAdjustment;
  return Math.round(tdee + adjustment);
}

/**
 * Calculate macro targets in grams based on total calories and goal
 */
export function calculateMacroTargets(targetCalories: number, goal: FitnessGoal): MacroTargets {
  const preset = GOAL_PRESETS.find(p => p.goal === goal);
  if (!preset) {
    // Default balanced macro split
    return calculateMacroTargets(targetCalories, 'maintain_weight');
  }
  
  // Calculate calories per macro
  const proteinCalories = Math.round(targetCalories * (preset.macroSplit.protein / 100));
  const carbsCalories = Math.round(targetCalories * (preset.macroSplit.carbs / 100));
  const fatsCalories = Math.round(targetCalories * (preset.macroSplit.fats / 100));
  
  // Convert to grams (protein: 4 cal/g, carbs: 4 cal/g, fats: 9 cal/g)
  const proteinGrams = Math.round(proteinCalories / 4);
  const carbsGrams = Math.round(carbsCalories / 4);
  const fatsGrams = Math.round(fatsCalories / 9);
  
  return {
    protein: {
      grams: proteinGrams,
      calories: proteinCalories,
      percentage: preset.macroSplit.protein
    },
    carbs: {
      grams: carbsGrams,
      calories: carbsCalories,
      percentage: preset.macroSplit.carbs
    },
    fats: {
      grams: fatsGrams,
      calories: fatsCalories,
      percentage: preset.macroSplit.fats
    }
  };
}

/**
 * Complete calorie and macro calculation for a user
 */
export function calculateUserCaloriesAndMacros(user: User): CalorieCalculation {
  const bmr = calculateBMR(user.weight, user.height, user.age, user.gender);
  const tdee = calculateTDEE(bmr, user.activityLevel);
  const targetCalories = calculateTargetCalories(tdee, user.fitnessGoal);
  const macros = calculateMacroTargets(targetCalories, user.fitnessGoal);
  
  return {
    bmr,
    tdee,
    targetCalories,
    calorieAdjustment: targetCalories - tdee,
    macros
  };
}

/**
 * Calculate recommended protein intake based on goal and body weight
 * Returns grams per kg of body weight
 */
export function getRecommendedProteinIntake(goal: FitnessGoal): { min: number; max: number } {
  switch (goal) {
    case 'lose_weight':
    case 'cut':
      return { min: 1.6, max: 2.2 }; // Higher protein for muscle preservation
    case 'build_muscle':
    case 'lean_bulk':
      return { min: 1.8, max: 2.5 }; // Higher protein for muscle synthesis
    case 'gain_weight':
      return { min: 1.4, max: 2.0 };
    case 'maintain_weight':
    default:
      return { min: 1.2, max: 1.8 }; // Standard healthy range
  }
}

/**
 * Calculate water intake recommendation based on body weight and activity
 */
export function calculateWaterIntake(weight: number, activityLevel: User['activityLevel']): number {
  // Base: 35ml per kg body weight
  let waterML = weight * 35;
  
  // Adjust for activity level
  const activityAdjustments = {
    sedentary: 0,
    lightly_active: 250,
    moderately_active: 500,
    very_active: 750,
    extra_active: 1000
  };
  
  waterML += activityAdjustments[activityLevel];
  
  return Math.round(waterML);
}

/**
 * Get estimated time to reach target weight
 */
export function getTimeToGoal(
  currentWeight: number, 
  targetWeight: number, 
  weeklyWeightChange: number
): { weeks: number; months: number } {
  if (weeklyWeightChange === 0) {
    return { weeks: 0, months: 0 };
  }
  
  const weightDifference = Math.abs(targetWeight - currentWeight);
  const weeks = Math.ceil(weightDifference / Math.abs(weeklyWeightChange));
  const months = Math.round(weeks / 4.33); // Average weeks per month
  
  return { weeks, months };
}

/**
 * Calculate Body Mass Index
 */
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
}

/**
 * Get BMI category
 */
export function getBMICategory(bmi: number): { category: string; description: string; color: string } {
  if (bmi < 18.5) {
    return { category: 'Underweight', description: 'Below normal weight', color: '#3498db' };
  } else if (bmi < 25) {
    return { category: 'Normal', description: 'Healthy weight range', color: '#27ae60' };
  } else if (bmi < 30) {
    return { category: 'Overweight', description: 'Above normal weight', color: '#f39c12' };
  } else {
    return { category: 'Obese', description: 'Significantly above normal weight', color: '#e74c3c' };
  }
}