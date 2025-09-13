export interface WorkoutExercise {
  id: string;
  name: string;
  nameHindi?: string;
  category: WorkoutCategory;
  type: 'strength' | 'cardio' | 'flexibility' | 'sports';
  caloriesPerMinute: number; // average calories burned per minute
  description: string;
  instructions: string[];
  targetMuscles: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export type WorkoutCategory = 
  | 'gym_strength' | 'cardio' | 'hiit' | 'yoga' | 'bodyweight' 
  | 'traditional_indian' | 'sports' | 'dance' | 'flexibility';

export interface WorkoutEntry {
  id: string;
  userId?: string;
  exerciseId: string;
  exerciseName: string;
  category: WorkoutCategory;
  type: 'strength' | 'cardio' | 'flexibility' | 'sports';
  duration: number; // in minutes
  caloriesBurned: number;
  sets?: number; // for strength training
  reps?: number[]; // reps per set for strength training
  weight?: number[]; // weight per set in kg
  distance?: number; // for cardio in km
  intensity?: 'low' | 'moderate' | 'high' | 'extreme';
  heartRate?: number; // average heart rate
  notes?: string;
  timestamp: Date;
}

export const WORKOUT_DATABASE: WorkoutExercise[] = [
  // GYM STRENGTH TRAINING
  {
    id: 'bench_press',
    name: 'Bench Press',
    category: 'gym_strength',
    type: 'strength',
    caloriesPerMinute: 8,
    description: 'Classic chest strengthening exercise using barbell',
    instructions: [
      'Lie flat on bench with feet firmly on ground',
      'Grip barbell with hands slightly wider than shoulders',
      'Lower bar to chest in controlled motion',
      'Press bar back to starting position'
    ],
    targetMuscles: ['chest', 'triceps', 'shoulders'],
    equipment: ['barbell', 'bench', 'plates'],
    difficulty: 'intermediate',
    tags: ['chest', 'strength', 'compound']
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'gym_strength',
    type: 'strength',
    caloriesPerMinute: 10,
    description: 'Full body compound exercise targeting posterior chain',
    instructions: [
      'Stand with feet hip-width apart',
      'Grip barbell with hands shoulder-width apart',
      'Keep back straight and lift by extending hips and knees',
      'Lower bar in controlled motion'
    ],
    targetMuscles: ['hamstrings', 'glutes', 'lower_back', 'traps'],
    equipment: ['barbell', 'plates'],
    difficulty: 'advanced',
    tags: ['full_body', 'strength', 'compound']
  },
  {
    id: 'squat',
    name: 'Squat',
    category: 'gym_strength',
    type: 'strength',
    caloriesPerMinute: 9,
    description: 'Lower body compound exercise targeting legs and glutes',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower body by bending knees and hips',
      'Keep chest up and knees aligned with toes',
      'Return to starting position'
    ],
    targetMuscles: ['quadriceps', 'glutes', 'hamstrings'],
    equipment: ['barbell', 'plates', 'squat_rack'],
    difficulty: 'intermediate',
    tags: ['legs', 'strength', 'compound']
  },

  // CARDIO
  {
    id: 'running',
    name: 'Running',
    nameHindi: 'दौड़ना',
    category: 'cardio',
    type: 'cardio',
    caloriesPerMinute: 12,
    description: 'High-impact cardiovascular exercise',
    instructions: [
      'Maintain proper running posture',
      'Land on midfoot, not heel',
      'Keep arms relaxed and moving naturally',
      'Maintain steady breathing rhythm'
    ],
    targetMuscles: ['legs', 'core', 'cardiovascular'],
    equipment: ['running_shoes'],
    difficulty: 'beginner',
    tags: ['cardio', 'outdoor', 'endurance']
  },
  {
    id: 'cycling',
    name: 'Cycling',
    nameHindi: 'साइकिलिंग',
    category: 'cardio',
    type: 'cardio',
    caloriesPerMinute: 8,
    description: 'Low-impact cardiovascular exercise',
    instructions: [
      'Adjust seat height properly',
      'Maintain steady pedaling rhythm',
      'Keep core engaged',
      'Use proper gear for terrain'
    ],
    targetMuscles: ['legs', 'core', 'cardiovascular'],
    equipment: ['bicycle', 'helmet'],
    difficulty: 'beginner',
    tags: ['cardio', 'outdoor', 'low_impact']
  },

  // HIIT
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'hiit',
    type: 'cardio',
    caloriesPerMinute: 15,
    description: 'Full-body high-intensity exercise',
    instructions: [
      'Start in standing position',
      'Drop into squat position',
      'Jump feet back to plank position',
      'Do push-up, jump feet forward, jump up'
    ],
    targetMuscles: ['full_body', 'cardiovascular'],
    equipment: [],
    difficulty: 'advanced',
    tags: ['hiit', 'bodyweight', 'full_body']
  },
  {
    id: 'mountain_climbers',
    name: 'Mountain Climbers',
    category: 'hiit',
    type: 'cardio',
    caloriesPerMinute: 12,
    description: 'High-intensity core and cardio exercise',
    instructions: [
      'Start in plank position',
      'Bring one knee toward chest',
      'Switch legs rapidly',
      'Maintain plank position throughout'
    ],
    targetMuscles: ['core', 'shoulders', 'legs'],
    equipment: [],
    difficulty: 'intermediate',
    tags: ['hiit', 'core', 'bodyweight']
  },

  // TRADITIONAL INDIAN EXERCISES
  {
    id: 'surya_namaskara',
    name: 'Surya Namaskara',
    nameHindi: 'सूर्य नमस्कार',
    category: 'yoga',
    type: 'flexibility',
    caloriesPerMinute: 5,
    description: 'Traditional sun salutation sequence in yoga',
    instructions: [
      'Start with hands in prayer position',
      'Raise arms overhead',
      'Forward fold to touch ground',
      'Complete 12-pose sequence'
    ],
    targetMuscles: ['full_body', 'flexibility'],
    equipment: ['yoga_mat'],
    difficulty: 'beginner',
    tags: ['yoga', 'traditional', 'flexibility', 'indian']
  },
  {
    id: 'malkhamb',
    name: 'Malkhamb',
    nameHindi: 'मल्लखंब',
    category: 'traditional_indian',
    type: 'strength',
    caloriesPerMinute: 10,
    description: 'Traditional Indian sport using wooden pole',
    instructions: [
      'Grip pole firmly with hands',
      'Use leg wrapping techniques',
      'Perform various poses on pole',
      'Focus on balance and strength'
    ],
    targetMuscles: ['full_body', 'grip', 'core'],
    equipment: ['malkhamb_pole'],
    difficulty: 'advanced',
    tags: ['traditional', 'strength', 'indian', 'balance']
  },
  {
    id: 'kushti',
    name: 'Kushti (Wrestling)',
    nameHindi: 'कुश्ती',
    category: 'traditional_indian',
    type: 'strength',
    caloriesPerMinute: 12,
    description: 'Traditional Indian wrestling and strength training',
    instructions: [
      'Practice in sandy pit (akhara)',
      'Focus on grappling techniques',
      'Include strength exercises',
      'Maintain proper breathing'
    ],
    targetMuscles: ['full_body', 'functional_strength'],
    equipment: ['akhara', 'wrestling_gear'],
    difficulty: 'advanced',
    tags: ['traditional', 'wrestling', 'indian', 'strength']
  },

  // BODYWEIGHT
  {
    id: 'push_ups',
    name: 'Push-ups',
    nameHindi: 'पुश-अप',
    category: 'bodyweight',
    type: 'strength',
    caloriesPerMinute: 7,
    description: 'Classic upper body bodyweight exercise',
    instructions: [
      'Start in plank position',
      'Lower body until chest nearly touches ground',
      'Push back to starting position',
      'Maintain straight body line'
    ],
    targetMuscles: ['chest', 'triceps', 'shoulders', 'core'],
    equipment: [],
    difficulty: 'beginner',
    tags: ['bodyweight', 'chest', 'strength']
  },
  {
    id: 'pull_ups',
    name: 'Pull-ups',
    category: 'bodyweight',
    type: 'strength',
    caloriesPerMinute: 8,
    description: 'Upper body pulling exercise using bodyweight',
    instructions: [
      'Hang from pull-up bar with overhand grip',
      'Pull body up until chin clears bar',
      'Lower in controlled motion',
      'Avoid swinging or kipping'
    ],
    targetMuscles: ['lats', 'biceps', 'rhomboids'],
    equipment: ['pull_up_bar'],
    difficulty: 'intermediate',
    tags: ['bodyweight', 'back', 'strength']
  },

  // YOGA & FLEXIBILITY
  {
    id: 'hatha_yoga',
    name: 'Hatha Yoga',
    nameHindi: 'हठ योग',
    category: 'yoga',
    type: 'flexibility',
    caloriesPerMinute: 3,
    description: 'Gentle yoga focusing on basic postures',
    instructions: [
      'Focus on breath and alignment',
      'Hold poses for several breaths',
      'Move slowly between positions',
      'Listen to your body'
    ],
    targetMuscles: ['flexibility', 'balance', 'mind'],
    equipment: ['yoga_mat'],
    difficulty: 'beginner',
    tags: ['yoga', 'flexibility', 'relaxation', 'indian']
  },
  {
    id: 'vinyasa_yoga',
    name: 'Vinyasa Yoga',
    nameHindi: 'विन्यासा योग',
    category: 'yoga',
    type: 'flexibility',
    caloriesPerMinute: 5,
    description: 'Dynamic yoga with flowing movements',
    instructions: [
      'Connect breath with movement',
      'Flow between poses smoothly',
      'Maintain core engagement',
      'Focus on alignment'
    ],
    targetMuscles: ['full_body', 'flexibility', 'core'],
    equipment: ['yoga_mat'],
    difficulty: 'intermediate',
    tags: ['yoga', 'flexibility', 'flow', 'indian']
  },

  // DANCE & SPORTS
  {
    id: 'bharatanatyam',
    name: 'Bharatanatyam',
    nameHindi: 'भरतनाट्यम्',
    category: 'dance',
    type: 'cardio',
    caloriesPerMinute: 6,
    description: 'Classical Indian dance form',
    instructions: [
      'Focus on precise movements',
      'Maintain proper posture',
      'Express emotions through dance',
      'Practice basic adavus'
    ],
    targetMuscles: ['legs', 'core', 'flexibility'],
    equipment: ['ankle_bells', 'dance_costume'],
    difficulty: 'intermediate',
    tags: ['dance', 'cultural', 'indian', 'artistic']
  },
  {
    id: 'cricket',
    name: 'Cricket',
    nameHindi: 'क्रिकेट',
    category: 'sports',
    type: 'sports',
    caloriesPerMinute: 7,
    description: 'Popular Indian team sport',
    instructions: [
      'Practice batting, bowling, fielding',
      'Focus on hand-eye coordination',
      'Run between wickets actively',
      'Stay alert while fielding'
    ],
    targetMuscles: ['full_body', 'coordination'],
    equipment: ['cricket_bat', 'ball', 'wickets'],
    difficulty: 'intermediate',
    tags: ['sport', 'team', 'outdoor', 'indian']
  },
  {
    id: 'kabaddi',
    name: 'Kabaddi',
    nameHindi: 'कबड्डी',
    category: 'sports',
    type: 'cardio',
    caloriesPerMinute: 10,
    description: 'Traditional Indian contact sport',
    instructions: [
      'Focus on breath control',
      'Practice raiding techniques',
      'Work on defensive holds',
      'Build endurance and agility'
    ],
    targetMuscles: ['full_body', 'endurance', 'agility'],
    equipment: [],
    difficulty: 'intermediate',
    tags: ['sport', 'traditional', 'team', 'indian']
  }
];

// Helper functions
export const getWorkoutsByCategory = (category: WorkoutCategory): WorkoutExercise[] => {
  return WORKOUT_DATABASE.filter(workout => workout.category === category);
};

export const getWorkoutsByType = (type: 'strength' | 'cardio' | 'flexibility' | 'sports'): WorkoutExercise[] => {
  return WORKOUT_DATABASE.filter(workout => workout.type === type);
};

export const getWorkoutById = (id: string): WorkoutExercise | undefined => {
  return WORKOUT_DATABASE.find(workout => workout.id === id);
};

export const searchWorkouts = (query: string): WorkoutExercise[] => {
  const lowerQuery = query.toLowerCase();
  return WORKOUT_DATABASE.filter(workout =>
    workout.name.toLowerCase().includes(lowerQuery) ||
    (workout.nameHindi && workout.nameHindi.includes(query)) ||
    workout.targetMuscles.some(muscle => muscle.toLowerCase().includes(lowerQuery)) ||
    workout.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getWorkoutsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): WorkoutExercise[] => {
  return WORKOUT_DATABASE.filter(workout => workout.difficulty === difficulty);
};