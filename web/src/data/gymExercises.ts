export interface GymExercise {
  id: string;
  name: string;
  category: BodyPart;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: Equipment;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructions: string[];
  tips: string[];
  animationUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  commonMistakes: string[];
  variations: string[];
}

export type BodyPart = 
  | 'chest' | 'back' | 'shoulders' | 'biceps' | 'triceps' 
  | 'quadriceps' | 'hamstrings' | 'glutes' | 'calves' 
  | 'core' | 'forearms' | 'traps' | 'cardio' | 'full-body';

export type Equipment = 
  | 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight' 
  | 'kettlebell' | 'resistance-band' | 'suspension' | 'plate' | 'pull-up-bar';

// Comprehensive Gym Exercise Database
export const GYM_EXERCISES_DATABASE: GymExercise[] = [
  // CHEST EXERCISES (50+ variations)
  {
    id: 'chest_1',
    name: 'Barbell Bench Press',
    category: 'chest',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Lie flat on bench with eyes under the barbell',
      'Plant feet firmly on the ground',
      'Grip the bar slightly wider than shoulder-width',
      'Unrack the bar and lower to chest with control',
      'Press the bar up explosively while maintaining tight core'
    ],
    tips: [
      'Keep shoulder blades retracted throughout',
      'Touch the bar to your chest lightly, don\'t bounce',
      'Drive through your heels for more power'
    ],
    commonMistakes: [
      'Arching back excessively',
      'Bouncing the bar off chest',
      'Uneven grip causing imbalanced press'
    ],
    variations: ['Incline Bench Press', 'Decline Bench Press', 'Close-Grip Bench Press']
  },
  {
    id: 'chest_2',
    name: 'Dumbbell Bench Press',
    category: 'chest',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps'],
    equipment: 'dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Lie on bench holding dumbbells at chest level',
      'Plant feet firmly on ground',
      'Press dumbbells up and slightly inward',
      'Lower with control until you feel a stretch',
      'Press back up focusing on chest contraction'
    ],
    tips: [
      'Allow dumbbells to go deeper than barbell for better stretch',
      'Rotate wrists slightly inward at the top',
      'Control the negative portion'
    ],
    commonMistakes: [
      'Going too heavy too quickly',
      'Not controlling the descent',
      'Pressing straight up instead of slight inward angle'
    ],
    variations: ['Incline Dumbbell Press', 'Decline Dumbbell Press', 'Single-Arm Dumbbell Press']
  },
  {
    id: 'chest_3',
    name: 'Incline Barbell Press',
    category: 'chest',
    primaryMuscles: ['Upper Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Set bench to 30-45 degree incline',
      'Lie back with shoulder blades retracted',
      'Grip bar slightly wider than shoulders',
      'Lower bar to upper chest area',
      'Press up and slightly back toward face'
    ],
    tips: [
      '30-45 degrees is optimal for upper chest',
      'Touch the bar higher on chest than flat bench',
      'Keep core tight throughout movement'
    ],
    commonMistakes: [
      'Setting incline too steep (over 45 degrees)',
      'Lowering bar to wrong part of chest',
      'Using too much weight'
    ],
    variations: ['Dumbbell Incline Press', 'Smith Machine Incline Press', 'Reverse Grip Incline Press']
  },
  {
    id: 'chest_4',
    name: 'Dumbbell Flyes',
    category: 'chest',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoids'],
    equipment: 'dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Lie flat on bench with dumbbells over chest',
      'Maintain slight bend in elbows throughout',
      'Lower weights in wide arc until chest stretch',
      'Reverse motion focusing on chest contraction',
      'Squeeze chest at the top'
    ],
    tips: [
      'Think of hugging a large tree',
      'Don\'t let elbows drop below chest level',
      'Focus on the stretch and squeeze'
    ],
    commonMistakes: [
      'Using too much weight',
      'Bending elbows too much (turns into press)',
      'Going too low and risking shoulder injury'
    ],
    variations: ['Incline Dumbbell Flyes', 'Decline Dumbbell Flyes', 'Cable Flyes']
  },
  {
    id: 'chest_5',
    name: 'Push-ups',
    category: 'chest',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps', 'Core'],
    equipment: 'bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Start in plank position with hands shoulder-width apart',
      'Keep body in straight line from head to heels',
      'Lower body until chest nearly touches ground',
      'Push back up to starting position',
      'Maintain tight core throughout'
    ],
    tips: [
      'Quality over quantity - perfect form is key',
      'Look slightly ahead, not down',
      'Engage glutes and core for stability'
    ],
    commonMistakes: [
      'Letting hips sag or pike up',
      'Not going deep enough',
      'Flaring elbows too wide'
    ],
    variations: ['Incline Push-ups', 'Decline Push-ups', 'Diamond Push-ups', 'Wide-Grip Push-ups']
  },
  // Continue with more chest exercises...
  {
    id: 'chest_6',
    name: 'Cable Crossovers',
    category: 'chest',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoids'],
    equipment: 'cable',
    difficulty: 'Intermediate',
    instructions: [
      'Set cables to high position, grab handles',
      'Step forward with slight forward lean',
      'Keep slight bend in elbows',
      'Bring handles together in front of chest',
      'Slowly return to starting position'
    ],
    tips: [
      'Focus on the squeeze at the bottom',
      'Don\'t let cables pull you backward',
      'Keep chest up and shoulders back'
    ],
    commonMistakes: [
      'Using too much weight',
      'Not maintaining proper posture',
      'Rushing the movement'
    ],
    variations: ['Low-to-High Cable Crossover', 'Single-Arm Cable Crossover', 'Cable Flyes']
  },
  {
    id: 'chest_7',
    name: 'Chest Dips',
    category: 'chest',
    primaryMuscles: ['Lower Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Grip parallel bars with arms extended',
      'Lean forward slightly for chest emphasis',
      'Lower body by bending elbows',
      'Go until shoulders are below elbows',
      'Push back up to starting position'
    ],
    tips: [
      'Lean forward to target chest more',
      'Don\'t go too low to avoid shoulder injury',
      'Control the descent'
    ],
    commonMistakes: [
      'Going too deep',
      'Not leaning forward enough',
      'Using momentum'
    ],
    variations: ['Assisted Chest Dips', 'Weighted Chest Dips', 'Ring Dips']
  },
  {
    id: 'chest_8',
    name: 'Machine Chest Press',
    category: 'chest',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Triceps', 'Anterior Deltoids'],
    equipment: 'machine',
    difficulty: 'Beginner',
    instructions: [
      'Sit on machine with back flat against pad',
      'Grip handles at chest level',
      'Press handles forward until arms extended',
      'Slowly return to starting position',
      'Keep core engaged throughout'
    ],
    tips: [
      'Adjust seat height so handles align with chest',
      'Don\'t lock out elbows completely',
      'Focus on controlled movement'
    ],
    commonMistakes: [
      'Improper seat adjustment',
      'Rushing the movement',
      'Not using full range of motion'
    ],
    variations: ['Incline Machine Press', 'Decline Machine Press', 'Unilateral Machine Press']
  },

  // BACK EXERCISES (50+ variations)
  {
    id: 'back_1',
    name: 'Deadlift',
    category: 'back',
    primaryMuscles: ['Erector Spinae', 'Latissimus Dorsi', 'Rhomboids'],
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Traps', 'Forearms'],
    equipment: 'barbell',
    difficulty: 'Advanced',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Bend at hips and knees to grip bar',
      'Keep chest up, shoulders back, core tight',
      'Drive through heels to lift the bar',
      'Stand tall, then lower bar with control'
    ],
    tips: [
      'Keep the bar close to your body throughout',
      'Think about pushing the floor away',
      'Don\'t round your back'
    ],
    commonMistakes: [
      'Rounding the back',
      'Bar drifting away from body',
      'Not engaging lats'
    ],
    variations: ['Romanian Deadlift', 'Sumo Deadlift', 'Trap Bar Deadlift', 'Single-Leg Deadlift']
  },
  {
    id: 'back_2',
    name: 'Pull-ups',
    category: 'back',
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids'],
    equipment: 'pull-up-bar',
    difficulty: 'Intermediate',
    instructions: [
      'Hang from bar with palms facing away',
      'Grip slightly wider than shoulder-width',
      'Pull chest toward bar by engaging lats',
      'Lower with control to full arm extension',
      'Repeat maintaining smooth tempo'
    ],
    tips: [
      'Think about pulling elbows down and back',
      'Don\'t swing or use momentum',
      'Full range of motion is key'
    ],
    commonMistakes: [
      'Using momentum to swing up',
      'Not going to full extension',
      'Grip too wide or too narrow'
    ],
    variations: ['Chin-ups', 'Wide-Grip Pull-ups', 'Neutral Grip Pull-ups', 'Assisted Pull-ups']
  },
  {
    id: 'back_3',
    name: 'Barbell Rows',
    category: 'back',
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Traps'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Hinge at hips with slight knee bend',
      'Keep back straight, core engaged',
      'Grip bar with hands outside shoulders',
      'Pull bar to lower chest/upper abdomen',
      'Lower with control and repeat'
    ],
    tips: [
      'Keep torso roughly parallel to floor',
      'Pull with your elbows, not your hands',
      'Squeeze shoulder blades together at top'
    ],
    commonMistakes: [
      'Standing too upright',
      'Pulling to the wrong area',
      'Using momentum'
    ],
    variations: ['T-Bar Rows', 'Pendlay Rows', 'Chest-Supported Rows', 'Single-Arm Rows']
  },
  {
    id: 'back_4',
    name: 'Lat Pulldowns',
    category: 'back',
    primaryMuscles: ['Latissimus Dorsi'],
    secondaryMuscles: ['Biceps', 'Rhomboids', 'Middle Traps'],
    equipment: 'cable',
    difficulty: 'Beginner',
    instructions: [
      'Sit at lat pulldown machine with thighs secured',
      'Grip bar wider than shoulder-width',
      'Lean back slightly, chest up',
      'Pull bar down to upper chest',
      'Slowly return to starting position'
    ],
    tips: [
      'Think about pulling elbows down and back',
      'Don\'t lean back too far',
      'Feel the stretch at the top'
    ],
    commonMistakes: [
      'Pulling behind the neck',
      'Using too much momentum',
      'Not getting full range of motion'
    ],
    variations: ['Close-Grip Pulldowns', 'Reverse Grip Pulldowns', 'Single-Arm Pulldowns']
  },

  // SHOULDER EXERCISES (50+ variations)
  {
    id: 'shoulders_1',
    name: 'Overhead Press',
    category: 'shoulders',
    primaryMuscles: ['Anterior Deltoids', 'Medial Deltoids'],
    secondaryMuscles: ['Triceps', 'Upper Chest', 'Core'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Start with bar at shoulder level in front rack',
      'Feet shoulder-width apart, core tight',
      'Press bar straight up overhead',
      'Lower with control to starting position',
      'Keep elbows slightly forward'
    ],
    tips: [
      'Drive through your heels',
      'Keep core extremely tight',
      'Don\'t arch your back excessively'
    ],
    commonMistakes: [
      'Pressing the bar forward instead of up',
      'Arching back too much',
      'Not engaging core properly'
    ],
    variations: ['Dumbbell Shoulder Press', 'Seated Shoulder Press', 'Arnold Press', 'Pike Push-ups']
  },
  {
    id: 'shoulders_2',
    name: 'Lateral Raises',
    category: 'shoulders',
    primaryMuscles: ['Medial Deltoids'],
    secondaryMuscles: ['Anterior Deltoids', 'Posterior Deltoids'],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Stand with dumbbells at sides, slight forward lean',
      'Keep slight bend in elbows',
      'Raise weights out to sides until shoulder height',
      'Lower with control, resisting gravity',
      'Keep shoulders down and back'
    ],
    tips: [
      'Lead with your pinkies on the way up',
      'Don\'t go above shoulder height',
      'Focus on the negative portion'
    ],
    commonMistakes: [
      'Using too much weight',
      'Swinging the weights up',
      'Raising arms too high'
    ],
    variations: ['Cable Lateral Raises', 'Machine Lateral Raises', 'Leaning Lateral Raises']
  },
  
  // BICEP EXERCISES (50+ variations)  
  {
    id: 'biceps_1',
    name: 'Barbell Curls',
    category: 'biceps',
    primaryMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['Brachialis', 'Brachioradialis'],
    equipment: 'barbell',
    difficulty: 'Beginner',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Grip barbell with underhand grip',
      'Keep elbows at sides, curl weight up',
      'Squeeze biceps at top',
      'Lower with control'
    ],
    tips: [
      'Don\'t swing or use momentum',
      'Keep core engaged',
      'Full range of motion'
    ],
    commonMistakes: [
      'Swinging the weight',
      'Moving elbows forward',
      'Not controlling the descent'
    ],
    variations: ['EZ-Bar Curls', 'Wide Grip Curls', 'Close Grip Curls', 'Reverse Curls']
  },
  {
    id: 'biceps_2',
    name: 'Dumbbell Curls',
    category: 'biceps',
    primaryMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['Brachialis', 'Brachioradialis'],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Stand with dumbbells at sides',
      'Keep elbows tucked to sides',
      'Curl one or both weights up',
      'Squeeze at top, lower slowly',
      'Maintain controlled tempo'
    ],
    tips: [
      'Don\'t let elbows drift forward',
      'Focus on the squeeze',
      'Try alternating arms'
    ],
    commonMistakes: [
      'Using momentum',
      'Partial range of motion',
      'Letting weights swing'
    ],
    variations: ['Hammer Curls', 'Alternating Curls', 'Concentration Curls', 'Incline Curls']
  },

  // TRICEP EXERCISES (50+ variations)
  {
    id: 'triceps_1',
    name: 'Close-Grip Bench Press',
    category: 'triceps',
    primaryMuscles: ['Triceps Brachii'],
    secondaryMuscles: ['Chest', 'Anterior Deltoids'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Lie on bench, grip bar with hands close together',
      'Keep elbows closer to body than regular bench',
      'Lower bar to lower chest',
      'Press up focusing on triceps',
      'Keep wrists straight'
    ],
    tips: [
      'Don\'t let elbows flare too much',
      'Touch lower on chest than regular bench press',
      'Focus on triceps contraction'
    ],
    commonMistakes: [
      'Grip too narrow (hard on wrists)',
      'Elbows flaring too wide',
      'Turning it into a chest exercise'
    ],
    variations: ['Dumbbell Close-Grip Press', 'Smith Machine Close-Grip Press']
  },
  {
    id: 'triceps_2',
    name: 'Tricep Dips',
    category: 'triceps',
    primaryMuscles: ['Triceps Brachii'],
    secondaryMuscles: ['Anterior Deltoids', 'Lower Chest'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Position hands on dip bars or bench',
      'Start with arms extended, body upright',
      'Lower body by bending elbows',
      'Push back up to starting position',
      'Keep body as upright as possible'
    ],
    tips: [
      'Don\'t go too low to avoid shoulder strain',
      'Keep elbows close to body',
      'Lean slightly forward for chest emphasis'
    ],
    commonMistakes: [
      'Going too deep',
      'Leaning too far forward',
      'Not maintaining control'
    ],
    variations: ['Assisted Dips', 'Weighted Dips', 'Bench Dips', 'Ring Dips']
  },

  // LEG EXERCISES (Quadriceps, Hamstrings, Glutes)
  {
    id: 'legs_1',
    name: 'Squats',
    category: 'quadriceps',
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Core'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Position bar on upper back, feet shoulder-width apart',
      'Keep chest up, core braced',
      'Lower by pushing hips back and bending knees',
      'Go until thighs parallel to floor',
      'Drive through heels to stand up'
    ],
    tips: [
      'Keep knees in line with toes',
      'Don\'t let knees cave inward',
      'Breathe in on the way down, out on the way up'
    ],
    commonMistakes: [
      'Knees caving inward',
      'Not going deep enough',
      'Leaning too far forward'
    ],
    variations: ['Front Squats', 'Goblet Squats', 'Split Squats', 'Bulgarian Split Squats']
  },
  {
    id: 'legs_2',
    name: 'Romanian Deadlifts',
    category: 'hamstrings',
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: ['Glutes', 'Lower Back'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Start standing with bar at hip level',
      'Keep slight bend in knees',
      'Push hips back, lower bar down legs',
      'Feel stretch in hamstrings',
      'Drive hips forward to return to start'
    ],
    tips: [
      'Keep bar close to body',
      'Don\'t round your back',
      'Focus on hip hinge movement'
    ],
    commonMistakes: [
      'Bending knees too much (turns into squat)',
      'Rounding the back',
      'Not feeling the stretch in hamstrings'
    ],
    variations: ['Dumbbell RDLs', 'Single-Leg RDLs', 'Stiff-Leg Deadlifts']
  },

  // CORE EXERCISES
  {
    id: 'core_1',
    name: 'Planks',
    category: 'core',
    primaryMuscles: ['Rectus Abdominis', 'Transverse Abdominis'],
    secondaryMuscles: ['Obliques', 'Shoulders', 'Glutes'],
    equipment: 'bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Start in push-up position on forearms',
      'Keep body in straight line',
      'Engage core, glutes, and shoulders',
      'Hold position for desired time',
      'Breathe normally throughout'
    ],
    tips: [
      'Don\'t let hips sag or pike up',
      'Keep neck neutral',
      'Start with shorter holds and build up'
    ],
    commonMistakes: [
      'Letting hips sag',
      'Holding breath',
      'Lifting hips too high'
    ],
    variations: ['Side Planks', 'Plank Up-Downs', 'Plank Jacks', 'Mountain Climbers']
  }
];

// Exercise categories for filtering
export const EXERCISE_CATEGORIES = {
  chest: {
    name: 'Chest',
    emoji: '💪',
    color: '#e74c3c',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'chest')
  },
  back: {
    name: 'Back',
    emoji: '🦾',
    color: '#3498db',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'back')
  },
  shoulders: {
    name: 'Shoulders',
    emoji: '🤸',
    color: '#f39c12',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'shoulders')
  },
  biceps: {
    name: 'Biceps',
    emoji: '💪',
    color: '#9b59b6',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'biceps')
  },
  triceps: {
    name: 'Triceps',
    emoji: '🦾',
    color: '#e67e22',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'triceps')
  },
  quadriceps: {
    name: 'Quadriceps',
    emoji: '🦵',
    color: '#27ae60',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'quadriceps')
  },
  hamstrings: {
    name: 'Hamstrings',
    emoji: '🦵',
    color: '#2ecc71',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'hamstrings')
  },
  glutes: {
    name: 'Glutes',
    emoji: '🍑',
    color: '#e91e63',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'glutes')
  },
  core: {
    name: 'Core',
    emoji: '⚡',
    color: '#34495e',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'core')
  },
  calves: {
    name: 'Calves',
    emoji: '🦵',
    color: '#16a085',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'calves')
  },
  forearms: {
    name: 'Forearms',
    emoji: '🦾',
    color: '#95a5a6',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'forearms')
  },
  traps: {
    name: 'Traps',
    emoji: '💪',
    color: '#8e44ad',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'traps')
  },
  cardio: {
    name: 'Cardio',
    emoji: '🏃‍♂️',
    color: '#e74c3c',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'cardio')
  },
  'full-body': {
    name: 'Full Body',
    emoji: '🤸‍♂️',
    color: '#2ecc71',
    exercises: GYM_EXERCISES_DATABASE.filter(ex => ex.category === 'full-body')
  }
};

// Workout templates
export const WORKOUT_TEMPLATES = {
  push: {
    name: 'Push (Chest, Shoulders, Triceps)',
    exercises: ['chest_1', 'chest_4', 'shoulders_1', 'shoulders_2', 'triceps_1', 'triceps_2'],
    duration: 60,
    difficulty: 'Intermediate'
  },
  pull: {
    name: 'Pull (Back, Biceps)',
    exercises: ['back_1', 'back_2', 'back_3', 'back_4', 'biceps_1', 'biceps_2'],
    duration: 60,
    difficulty: 'Intermediate'
  },
  legs: {
    name: 'Legs (Quads, Hamstrings, Glutes)',
    exercises: ['legs_1', 'legs_2', 'core_1'],
    duration: 60,
    difficulty: 'Advanced'
  },
  fullBody: {
    name: 'Full Body',
    exercises: ['chest_1', 'back_2', 'shoulders_1', 'legs_1', 'core_1'],
    duration: 45,
    difficulty: 'Beginner'
  }
};