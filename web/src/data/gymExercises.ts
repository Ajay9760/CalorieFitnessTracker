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

  // GLUTES EXERCISES
  {
    id: 'glutes_1',
    name: 'Bulgarian Split Squat',
    category: 'glutes',
    primaryMuscles: ['Gluteus Maximus'],
    secondaryMuscles: ['Quadriceps', 'Hamstrings'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Stand 2-3 feet in front of a bench or chair',
      'Place top of one foot on the bench behind you',
      'Lower your body until your front thigh is parallel to floor',
      'Push through your front heel to return to start',
      'Complete all reps on one leg before switching'
    ],
    tips: [
      'Keep most of your weight on your front leg',
      'Don\'t lean forward too much',
      'Control the descent'
    ],
    commonMistakes: [
      'Putting too much weight on back foot',
      'Leaning forward excessively',
      'Not going deep enough'
    ],
    variations: ['Weighted Bulgarian Split Squat', 'Elevated Bulgarian Split Squat']
  },
  {
    id: 'glutes_2',
    name: 'Hip Thrust',
    category: 'glutes',
    primaryMuscles: ['Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Core'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Sit with back against bench, barbell over hips',
      'Plant feet firmly on ground, knees bent',
      'Drive through heels to lift hips up',
      'Squeeze glutes at the top',
      'Lower with control'
    ],
    tips: [
      'Keep chin tucked',
      'Drive through heels, not toes',
      'Pause at the top for maximum contraction'
    ],
    commonMistakes: [
      'Overextending the back',
      'Not fully engaging glutes',
      'Placing feet too far forward'
    ],
    variations: ['Single-Leg Hip Thrust', 'Dumbbell Hip Thrust', 'Bodyweight Hip Thrust']
  },
  {
    id: 'glutes_3',
    name: 'Glute Bridge',
    category: 'glutes',
    primaryMuscles: ['Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Core'],
    equipment: 'bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Lie on back with knees bent, feet flat on floor',
      'Squeeze glutes and lift hips up',
      'Form straight line from knees to shoulders',
      'Hold briefly at top',
      'Lower with control'
    ],
    tips: [
      'Squeeze glutes at the top',
      'Don\'t push through your neck',
      'Keep core engaged'
    ],
    commonMistakes: [
      'Not squeezing glutes',
      'Lifting too high and arching back',
      'Pushing through neck instead of heels'
    ],
    variations: ['Single-Leg Glute Bridge', 'Weighted Glute Bridge', 'Glute Bridge March']
  },
  {
    id: 'glutes_4',
    name: 'Curtsy Lunge',
    category: 'glutes',
    primaryMuscles: ['Gluteus Maximus', 'Gluteus Medius'],
    secondaryMuscles: ['Quadriceps', 'Calves'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Stand with feet hip-width apart',
      'Step one leg behind and across the other',
      'Lower into lunge position',
      'Push through front heel to return to start',
      'Alternate legs or complete one side first'
    ],
    tips: [
      'Keep chest up and core engaged',
      'Don\'t let knee cave inward',
      'Control the movement'
    ],
    commonMistakes: [
      'Leaning forward too much',
      'Not going deep enough',
      'Letting front knee cave in'
    ],
    variations: ['Weighted Curtsy Lunge', 'Reverse Curtsy Lunge']
  },
  {
    id: 'glutes_5',
    name: 'Cable Machine Kickback',
    category: 'glutes',
    primaryMuscles: ['Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings'],
    equipment: 'cable',
    difficulty: 'Beginner',
    instructions: [
      'Attach ankle strap to low cable',
      'Face the machine and hold on for support',
      'Keep working leg straight',
      'Kick leg back squeezing glutes',
      'Return with control'
    ],
    tips: [
      'Don\'t swing or use momentum',
      'Focus on squeezing glutes',
      'Keep hips square'
    ],
    commonMistakes: [
      'Using too much weight',
      'Swinging the leg',
      'Rotating hips'
    ],
    variations: ['Standing Glute Kickback', 'Kneeling Cable Kickback']
  },

  // CALVES EXERCISES
  {
    id: 'calves_1',
    name: 'Standing Calf Raise',
    category: 'calves',
    primaryMuscles: ['Gastrocnemius'],
    secondaryMuscles: ['Soleus'],
    equipment: 'bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Stand with balls of feet on platform or floor',
      'Keep legs straight',
      'Rise up onto toes as high as possible',
      'Squeeze calves at the top',
      'Lower with control'
    ],
    tips: [
      'Get full range of motion',
      'Don\'t bounce at the bottom',
      'Focus on slow, controlled movement'
    ],
    commonMistakes: [
      'Not going through full range of motion',
      'Bouncing at the bottom',
      'Using momentum'
    ],
    variations: ['Single-Leg Calf Raise', 'Weighted Calf Raise', 'Smith Machine Calf Raise']
  },
  {
    id: 'calves_2',
    name: 'Seated Calf Raise',
    category: 'calves',
    primaryMuscles: ['Soleus'],
    secondaryMuscles: ['Gastrocnemius'],
    equipment: 'machine',
    difficulty: 'Beginner',
    instructions: [
      'Sit on calf raise machine',
      'Place balls of feet on platform',
      'Position weight pad on thighs',
      'Rise up onto toes',
      'Lower with control'
    ],
    tips: [
      'Keep knees at 90 degrees',
      'Focus on the stretch at bottom',
      'Squeeze at the top'
    ],
    commonMistakes: [
      'Not getting full stretch',
      'Using too much weight',
      'Rushing the movement'
    ],
    variations: ['Dumbbell Seated Calf Raise', 'Single-Leg Seated Calf Raise']
  },

  // FOREARMS EXERCISES
  {
    id: 'forearms_1',
    name: 'Wrist Curls',
    category: 'forearms',
    primaryMuscles: ['Forearm Flexors'],
    secondaryMuscles: ['Wrist Flexors'],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Sit with forearms resting on thighs',
      'Hold dumbbell with palms facing up',
      'Let wrist extend down',
      'Curl wrist up squeezing forearms',
      'Lower with control'
    ],
    tips: [
      'Keep forearms pressed against thighs',
      'Only move at the wrist',
      'Use light weight and focus on form'
    ],
    commonMistakes: [
      'Using too much weight',
      'Moving forearms off thighs',
      'Not getting full range of motion'
    ],
    variations: ['Reverse Wrist Curls', 'Barbell Wrist Curls']
  },
  {
    id: 'forearms_2',
    name: "Farmer's Walk",
    category: 'forearms',
    primaryMuscles: ['Forearms', 'Grip Strength'],
    secondaryMuscles: ['Traps', 'Core'],
    equipment: 'dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Pick up heavy dumbbells or farmer\'s walk handles',
      'Stand tall with shoulders back',
      'Walk forward with controlled steps',
      'Keep weights at sides',
      'Walk for distance or time'
    ],
    tips: [
      'Keep shoulders pulled back',
      'Don\'t let weights swing',
      'Breathe normally while walking'
    ],
    commonMistakes: [
      'Letting shoulders roll forward',
      'Taking too large steps',
      'Dropping weights instead of setting them down'
    ],
    variations: ['Single-Arm Farmer\'s Walk', 'Suitcase Carry']
  },
  {
    id: 'forearms_3',
    name: 'Dead Hangs',
    category: 'forearms',
    primaryMuscles: ['Forearms', 'Grip Strength'],
    secondaryMuscles: ['Lats', 'Shoulders'],
    equipment: 'pull-up-bar',
    difficulty: 'Intermediate',
    instructions: [
      'Hang from pull-up bar with overhand grip',
      'Keep arms straight',
      'Engage shoulders slightly',
      'Hold for time',
      'Don\'t swing or kip'
    ],
    tips: [
      'Start with shorter holds',
      'Keep shoulders engaged, don\'t just hang',
      'Breathe normally'
    ],
    commonMistakes: [
      'Completely relaxing shoulders',
      'Swinging or kipping',
      'Jumping off instead of lowering down'
    ],
    variations: ['Single-Arm Dead Hang', 'Weighted Dead Hang']
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
  },
  {
    id: 'core_2',
    name: 'Crunches',
    category: 'core',
    primaryMuscles: ['Rectus Abdominis'],
    secondaryMuscles: ['Obliques'],
    equipment: 'bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Lie on back with knees bent',
      'Place hands behind head lightly',
      'Lift shoulders off ground',
      'Squeeze abs at the top',
      'Lower with control'
    ],
    tips: [
      'Don\'t pull on your neck',
      'Focus on lifting chest up',
      'Exhale as you crunch up'
    ],
    commonMistakes: [
      'Pulling on neck',
      'Not engaging core properly',
      'Going too fast'
    ],
    variations: ['Bicycle Crunches', 'Reverse Crunches', 'Cross Crunches']
  },
  {
    id: 'core_3',
    name: 'Russian Twist',
    category: 'core',
    primaryMuscles: ['Obliques'],
    secondaryMuscles: ['Rectus Abdominis'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Sit with knees bent, lean back slightly',
      'Lift feet off ground',
      'Rotate torso side to side',
      'Keep chest up throughout',
      'Control the movement'
    ],
    tips: [
      'Keep core engaged throughout',
      'Don\'t just move your arms',
      'Focus on rotating from the core'
    ],
    commonMistakes: [
      'Moving too fast',
      'Only moving arms instead of torso',
      'Letting feet touch ground'
    ],
    variations: ['Weighted Russian Twist', 'Medicine Ball Russian Twist']
  },
  {
    id: 'core_4',
    name: 'Mountain Climbers',
    category: 'core',
    primaryMuscles: ['Core', 'Hip Flexors'],
    secondaryMuscles: ['Shoulders', 'Legs'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Start in plank position',
      'Bring one knee toward chest',
      'Quickly switch legs',
      'Keep hips level',
      'Maintain plank position throughout'
    ],
    tips: [
      'Keep core engaged',
      'Don\'t let hips pike up',
      'Land softly on balls of feet'
    ],
    commonMistakes: [
      'Letting hips rise',
      'Not bringing knees far enough forward',
      'Going too fast and losing form'
    ],
    variations: ['Cross-Body Mountain Climbers', 'Slow Mountain Climbers']
  },

  // CARDIO EXERCISES
  {
    id: 'cardio_1',
    name: 'Treadmill Running',
    category: 'cardio',
    primaryMuscles: ['Legs', 'Cardiovascular System'],
    secondaryMuscles: ['Core', 'Arms'],
    equipment: 'machine',
    difficulty: 'Beginner',
    instructions: [
      'Step onto treadmill and start at walking pace',
      'Gradually increase speed as desired',
      'Maintain proper running form',
      'Use incline for added intensity',
      'Cool down gradually'
    ],
    tips: [
      'Start slow and build up',
      'Use incline for variety',
      'Stay hydrated'
    ],
    commonMistakes: [
      'Starting too fast',
      'Holding onto handrails while running',
      'Not cooling down properly'
    ],
    variations: ['Treadmill Intervals', 'Incline Walking', 'Sprint Intervals']
  },
  {
    id: 'cardio_2',
    name: 'Jump Rope',
    category: 'cardio',
    primaryMuscles: ['Calves', 'Cardiovascular System'],
    secondaryMuscles: ['Shoulders', 'Core'],
    equipment: 'resistance-band',
    difficulty: 'Intermediate',
    instructions: [
      'Hold rope handles with light grip',
      'Keep elbows close to sides',
      'Jump with both feet together',
      'Land softly on balls of feet',
      'Keep shoulders relaxed'
    ],
    tips: [
      'Start with basic bounce',
      'Keep jumps low',
      'Use wrists to turn rope'
    ],
    commonMistakes: [
      'Jumping too high',
      'Using arms instead of wrists',
      'Landing flat-footed'
    ],
    variations: ['Single-Leg Jump Rope', 'Double-Unders', 'Criss-Cross']
  },
  {
    id: 'cardio_3',
    name: 'Burpees',
    category: 'cardio',
    primaryMuscles: ['Full Body'],
    secondaryMuscles: ['Cardiovascular System'],
    equipment: 'bodyweight',
    difficulty: 'Advanced',
    instructions: [
      'Start in standing position',
      'Squat down and place hands on floor',
      'Jump feet back to plank position',
      'Perform push-up (optional)',
      'Jump feet forward and jump up with arms overhead'
    ],
    tips: [
      'Modify as needed',
      'Focus on form over speed',
      'Land softly'
    ],
    commonMistakes: [
      'Rushing through movements',
      'Not maintaining plank position',
      'Landing hard on jumps'
    ],
    variations: ['Half Burpees', 'Burpee Box Jumps', 'Single-Arm Burpees']
  },

  // FULL BODY EXERCISES
  {
    id: 'fullbody_1',
    name: "Devil's Press",
    category: 'full-body',
    primaryMuscles: ['Full Body'],
    secondaryMuscles: ['Cardiovascular System'],
    equipment: 'dumbbell',
    difficulty: 'Advanced',
    instructions: [
      'Start in plank with hands on dumbbells',
      'Perform push-up',
      'Jump feet toward hands',
      'Deadlift dumbbells to standing',
      'Press dumbbells overhead'
    ],
    tips: [
      'Use appropriate weight',
      'Control each phase',
      'Breathe throughout movement'
    ],
    commonMistakes: [
      'Using too much weight',
      'Rushing the movement',
      'Poor form in any phase'
    ],
    variations: ['Single-Arm Devils Press', 'Light Weight High Reps']
  },
  {
    id: 'fullbody_2',
    name: 'Thrusters',
    category: 'full-body',
    primaryMuscles: ['Legs', 'Shoulders'],
    secondaryMuscles: ['Core', 'Arms'],
    equipment: 'dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Hold dumbbells at shoulder level',
      'Perform squat',
      'As you stand up, press weights overhead',
      'Lower weights back to shoulders',
      'Repeat in fluid motion'
    ],
    tips: [
      'Use momentum from squat to help press',
      'Keep core engaged',
      'Full range of motion on squat'
    ],
    commonMistakes: [
      'Pausing between squat and press',
      'Not squatting deep enough',
      'Pressing before fully standing'
    ],
    variations: ['Barbell Thrusters', 'Single-Arm Thrusters', 'Goblet Thrusters']
  },

  // TRAPS EXERCISES (50+ variations)
  {
    id: 'traps_1',
    name: 'Barbell Shrugs',
    category: 'traps',
    primaryMuscles: ['Upper Trapezius'],
    secondaryMuscles: ['Levator Scapulae'],
    equipment: 'barbell',
    difficulty: 'Beginner',
    instructions: [
      'Stand upright holding barbell with overhand grip',
      'Let arms hang naturally at sides',
      'Keep back straight and core engaged',
      'Lift shoulders straight up toward ears',
      'Hold briefly at top, then lower with control'
    ],
    tips: [
      'Don\'t roll shoulders - lift straight up',
      'Squeeze shoulder blades at the top',
      'Keep head in neutral position'
    ],
    commonMistakes: [
      'Rolling shoulders forward and backward',
      'Using too much weight',
      'Not holding the contraction'
    ],
    variations: ['Behind-the-Back Barbell Shrugs', 'Smith Machine Shrugs', 'Wide-Grip Shrugs']
  },
  {
    id: 'traps_2',
    name: 'Dumbbell Shrugs',
    category: 'traps',
    primaryMuscles: ['Upper Trapezius'],
    secondaryMuscles: ['Levator Scapulae', 'Rhomboids'],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Hold dumbbells at sides with neutral grip',
      'Stand with feet shoulder-width apart',
      'Keep arms straight throughout movement',
      'Shrug shoulders up as high as possible',
      'Lower slowly to starting position'
    ],
    tips: [
      'Focus on lifting with traps, not arms',
      'Keep chest up and shoulders back',
      'Use full range of motion'
    ],
    commonMistakes: [
      'Bending elbows during movement',
      'Not going full range of motion',
      'Using momentum instead of muscle control'
    ],
    variations: ['Single-Arm Dumbbell Shrugs', 'Incline Dumbbell Shrugs', 'Seated Dumbbell Shrugs']
  },
  {
    id: 'traps_3',
    name: 'Cable Shrugs',
    category: 'traps',
    primaryMuscles: ['Upper Trapezius'],
    secondaryMuscles: ['Middle Trapezius', 'Rhomboids'],
    equipment: 'cable',
    difficulty: 'Intermediate',
    instructions: [
      'Set cable to lowest position with straight bar',
      'Grip bar with overhand grip, shoulder-width apart',
      'Stand upright with slight forward lean',
      'Shrug shoulders up and slightly back',
      'Lower with control maintaining tension'
    ],
    tips: [
      'Maintain constant tension from cable',
      'Focus on squeezing shoulder blades together',
      'Don\'t let weight slam down'
    ],
    commonMistakes: [
      'Standing too far from cable machine',
      'Not maintaining constant tension',
      'Rushing the negative portion'
    ],
    variations: ['Single-Arm Cable Shrugs', 'Behind-the-Back Cable Shrugs', 'High Cable Shrugs']
  },
  {
    id: 'traps_4',
    name: 'Upright Rows',
    category: 'traps',
    primaryMuscles: ['Upper Trapezius', 'Middle Trapezius'],
    secondaryMuscles: ['Rear Deltoids', 'Rhomboids'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Hold barbell with narrow overhand grip',
      'Let bar hang at arm\'s length',
      'Pull bar straight up along body',
      'Lift elbows as high as possible',
      'Lower bar slowly to starting position'
    ],
    tips: [
      'Lead with elbows, not hands',
      'Keep bar close to body throughout',
      'Don\'t go higher than shoulder level if it causes pain'
    ],
    commonMistakes: [
      'Using too wide a grip',
      'Pulling bar away from body',
      'Going too high and causing shoulder impingement'
    ],
    variations: ['Dumbbell Upright Rows', 'Cable Upright Rows', 'Wide-Grip Upright Rows']
  },
  {
    id: 'traps_5',
    name: 'Face Pulls',
    category: 'traps',
    primaryMuscles: ['Middle Trapezius', 'Rear Deltoids'],
    secondaryMuscles: ['Rhomboids', 'External Rotators'],
    equipment: 'cable',
    difficulty: 'Beginner',
    instructions: [
      'Set cable to face height with rope attachment',
      'Grab rope with overhand grip',
      'Step back to create tension',
      'Pull rope toward face, separating hands',
      'Focus on squeezing shoulder blades together'
    ],
    tips: [
      'Pull rope apart as you pull back',
      'Keep elbows high throughout movement',
      'Focus on rear delt and trap contraction'
    ],
    commonMistakes: [
      'Pulling too low toward chest',
      'Not separating rope at the end',
      'Using too much weight'
    ],
    variations: ['Single-Arm Face Pulls', 'High Face Pulls', 'Resistance Band Face Pulls']
  },
  {
    id: 'traps_6',
    name: 'Power Shrugs',
    category: 'traps',
    primaryMuscles: ['Upper Trapezius'],
    secondaryMuscles: ['Levator Scapulae', 'Rhomboids'],
    equipment: 'barbell',
    difficulty: 'Advanced',
    instructions: [
      'Set up like deadlift with heavy weight',
      'Lift bar to hip level',
      'Explosively shrug shoulders up',
      'Rise up on toes for extra height',
      'Lower weight under control'
    ],
    tips: [
      'Use straps for heavy weights',
      'Generate power from legs and hips',
      'Focus on explosive upward movement'
    ],
    commonMistakes: [
      'Not using full body power',
      'Going too heavy too soon',
      'Not controlling the descent'
    ],
    variations: ['Dumbbell Power Shrugs', 'Trap Bar Power Shrugs', 'Hang Clean Shrugs']
  },
  {
    id: 'traps_7',
    name: 'Y-Raises',
    category: 'traps',
    primaryMuscles: ['Lower Trapezius'],
    secondaryMuscles: ['Rear Deltoids', 'Rhomboids'],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Lie face down on incline bench',
      'Hold light dumbbells with thumbs up',
      'Raise arms to form Y shape overhead',
      'Focus on squeezing lower traps',
      'Lower with control'
    ],
    tips: [
      'Use very light weight - focus on form',
      'Think about pulling shoulder blades down and back',
      'Keep thumbs pointing up'
    ],
    commonMistakes: [
      'Using too much weight',
      'Not engaging lower traps',
      'Moving too fast'
    ],
    variations: ['Prone Y-Raises', 'Standing Y-Raises', 'Cable Y-Raises']
  },
  {
    id: 'traps_8',
    name: 'Farmer\'s Walk',
    category: 'traps',
    primaryMuscles: ['Upper Trapezius', 'Middle Trapezius'],
    secondaryMuscles: ['Forearms', 'Core', 'Glutes'],
    equipment: 'dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Pick up heavy dumbbells or farmer\'s walk handles',
      'Stand tall with shoulders back',
      'Walk forward with controlled steps',
      'Keep core engaged throughout',
      'Maintain upright posture'
    ],
    tips: [
      'Keep shoulders pulled back and down',
      'Take controlled steps, don\'t rush',
      'Breathe normally throughout walk'
    ],
    commonMistakes: [
      'Letting shoulders roll forward',
      'Taking too long steps',
      'Not engaging core'
    ],
    variations: ['Single-Arm Farmer\'s Walk', 'Overhead Carry', 'Trap Bar Farmer\'s Walk']
  },
  {
    id: 'traps_9',
    name: 'High Pulls',
    category: 'traps',
    primaryMuscles: ['Upper Trapezius', 'Middle Trapezius'],
    secondaryMuscles: ['Rear Deltoids', 'Biceps'],
    equipment: 'barbell',
    difficulty: 'Advanced',
    instructions: [
      'Start in deadlift position',
      'Explosively extend hips and knees',
      'As bar reaches hip level, shrug and pull high',
      'Keep bar close to body throughout',
      'Lower with control'
    ],
    tips: [
      'Focus on explosive hip extension first',
      'Pull elbows high and outside',
      'Think "jump and shrug"'
    ],
    commonMistakes: [
      'Pulling with arms too early',
      'Not extending hips explosively',
      'Letting bar drift away from body'
    ],
    variations: ['Dumbbell High Pulls', 'Hang High Pulls', 'Snatch Grip High Pulls']
  },
  {
    id: 'traps_10',
    name: 'Prone T-Raises',
    category: 'traps',
    primaryMuscles: ['Middle Trapezius'],
    secondaryMuscles: ['Rear Deltoids', 'Rhomboids'],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Lie face down on incline bench',
      'Hold light dumbbells with arms extended',
      'Raise arms out to sides forming T shape',
      'Squeeze shoulder blades together',
      'Lower slowly to starting position'
    ],
    tips: [
      'Use light weights - this is about activation',
      'Focus on squeezing middle traps',
      'Keep arms straight throughout'
    ],
    commonMistakes: [
      'Using too heavy weights',
      'Not squeezing shoulder blades',
      'Rushing the movement'
    ],
    variations: ['Standing T-Raises', 'Cable T-Raises', 'Resistance Band T-Raises']
  },

  // ADDITIONAL QUADRICEPS EXERCISES (5 more)
  {
    id: 'quadriceps_2',
    name: 'Barbell Back Squats',
    category: 'quadriceps',
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: ['Glutes', 'Core'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Position barbell on upper back',
      'Stand with feet shoulder-width apart',
      'Lower body by bending knees and hips',
      'Keep chest up and back straight',
      'Push through heels to return to standing'
    ],
    tips: [
      'Keep knees aligned with toes',
      'Descend until thighs are parallel to ground',
      'Maintain neutral spine throughout'
    ],
    commonMistakes: [
      'Knees caving inward',
      'Leaning too far forward',
      'Not going deep enough'
    ],
    variations: ['Front Squats', 'Goblet Squats', 'Bulgarian Split Squats']
  },
  {
    id: 'quadriceps_3',
    name: 'Walking Lunges',
    category: 'quadriceps',
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: ['Glutes', 'Hamstrings'],
    equipment: 'dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Hold dumbbells at sides',
      'Step forward into lunge position',
      'Lower back knee toward ground',
      'Push off front foot to step forward',
      'Alternate legs with each step'
    ],
    tips: [
      'Keep torso upright throughout',
      'Take large enough steps',
      'Control the descent'
    ],
    commonMistakes: [
      'Taking steps that are too small',
      'Letting front knee go past toes',
      'Bouncing in the bottom position'
    ],
    variations: ['Reverse Lunges', 'Lateral Lunges', 'Curtsy Lunges']
  },
  {
    id: 'quadriceps_4',
    name: 'Leg Press',
    category: 'quadriceps',
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: ['Glutes'],
    equipment: 'machine',
    difficulty: 'Beginner',
    instructions: [
      'Sit in leg press machine',
      'Place feet on platform shoulder-width apart',
      'Lower weight by bending knees to 90 degrees',
      'Press weight back up through heels',
      'Don\'t lock knees completely at top'
    ],
    tips: [
      'Keep back pressed against pad',
      'Control the negative portion',
      'Breathe out on the press'
    ],
    commonMistakes: [
      'Going too deep and rounding back',
      'Placing feet too high or low',
      'Locking knees aggressively'
    ],
    variations: ['Single-Leg Press', 'Narrow Stance Press', 'Wide Stance Press']
  },
  {
    id: 'quadriceps_5',
    name: 'Leg Extensions',
    category: 'quadriceps',
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: [],
    equipment: 'machine',
    difficulty: 'Beginner',
    instructions: [
      'Sit in leg extension machine',
      'Position ankles behind lower pad',
      'Extend legs until fully straight',
      'Pause briefly at top',
      'Lower with control'
    ],
    tips: [
      'Squeeze quads at the top',
      'Don\'t swing or use momentum',
      'Adjust seat for proper alignment'
    ],
    commonMistakes: [
      'Using too much weight',
      'Not going through full range of motion',
      'Jerky movements'
    ],
    variations: ['Single-Leg Extensions', 'Toes-Out Extensions', 'Toes-In Extensions']
  },
  {
    id: 'quadriceps_6',
    name: 'Jump Squats',
    category: 'quadriceps',
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: ['Glutes', 'Core'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Start in squat position',
      'Lower into squat',
      'Explosively jump up as high as possible',
      'Land softly back in squat position',
      'Immediately go into next rep'
    ],
    tips: [
      'Land with soft knees',
      'Use arms to generate momentum',
      'Focus on explosive power'
    ],
    commonMistakes: [
      'Landing with stiff legs',
      'Not squatting deep enough',
      'Poor landing mechanics'
    ],
    variations: ['Weighted Jump Squats', 'Single-Leg Jump Squats', 'Box Jump Squats']
  },

  // ADDITIONAL HAMSTRING EXERCISES (5 more)
  {
    id: 'hamstrings_2',
    name: 'Romanian Deadlifts',
    category: 'hamstrings',
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: ['Glutes', 'Lower Back'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Hold barbell with overhand grip',
      'Stand with feet hip-width apart',
      'Push hips back and lower bar',
      'Keep bar close to legs',
      'Feel stretch in hamstrings, then return'
    ],
    tips: [
      'Keep knees slightly bent',
      'Lead with hips, not knees',
      'Maintain neutral spine'
    ],
    commonMistakes: [
      'Rounding the back',
      'Bending knees too much',
      'Not feeling stretch in hamstrings'
    ],
    variations: ['Dumbbell RDLs', 'Single-Leg RDLs', 'Stiff-Leg Deadlifts']
  },
  {
    id: 'hamstrings_3',
    name: 'Lying Leg Curls',
    category: 'hamstrings',
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: [],
    equipment: 'machine',
    difficulty: 'Beginner',
    instructions: [
      'Lie face down on leg curl machine',
      'Position ankles under pad',
      'Curl heels toward glutes',
      'Squeeze hamstrings at top',
      'Lower with control'
    ],
    tips: [
      'Don\'t lift hips off pad',
      'Full range of motion',
      'Control the negative'
    ],
    commonMistakes: [
      'Using momentum',
      'Not going through full ROM',
      'Lifting hips during curl'
    ],
    variations: ['Seated Leg Curls', 'Standing Single-Leg Curls', 'Nordic Curls']
  },
  {
    id: 'hamstrings_4',
    name: 'Good Mornings',
    category: 'hamstrings',
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: ['Glutes', 'Lower Back'],
    equipment: 'barbell',
    difficulty: 'Advanced',
    instructions: [
      'Position barbell on upper back',
      'Stand with feet shoulder-width apart',
      'Hinge at hips and lean forward',
      'Keep back straight throughout',
      'Return to upright position'
    ],
    tips: [
      'Start with light weight',
      'Focus on hip hinge movement',
      'Keep core tight'
    ],
    commonMistakes: [
      'Rounding the back',
      'Going too low too fast',
      'Using too much weight initially'
    ],
    variations: ['Seated Good Mornings', 'Dumbbell Good Mornings', 'Safety Bar Good Mornings']
  },
  {
    id: 'hamstrings_5',
    name: 'Swiss Ball Leg Curls',
    category: 'hamstrings',
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: ['Glutes', 'Core'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Lie on back with heels on swiss ball',
      'Lift hips into bridge position',
      'Roll ball toward glutes with heels',
      'Extend legs back out',
      'Maintain bridge throughout'
    ],
    tips: [
      'Keep hips elevated',
      'Focus on hamstring contraction',
      'Control both directions'
    ],
    commonMistakes: [
      'Dropping hips during movement',
      'Using momentum',
      'Not engaging core'
    ],
    variations: ['Single-Leg Swiss Ball Curls', 'Swiss Ball Bridge Hold', 'Reverse Swiss Ball Curls']
  },
  {
    id: 'hamstrings_6',
    name: 'Kettlebell Swings',
    category: 'hamstrings',
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: ['Glutes', 'Core'],
    equipment: 'kettlebell',
    difficulty: 'Intermediate',
    instructions: [
      'Stand with feet wider than shoulders',
      'Hold kettlebell with both hands',
      'Hinge at hips and swing bell back',
      'Drive hips forward explosively',
      'Let bell swing up to shoulder height'
    ],
    tips: [
      'Power comes from hips, not arms',
      'Keep core engaged',
      'Don\'t squat - hinge at hips'
    ],
    commonMistakes: [
      'Squatting instead of hinging',
      'Using arms to lift weight',
      'Not engaging glutes and hamstrings'
    ],
    variations: ['Single-Arm Swings', 'American Swings', 'Alternating Swings']
  },

  // ADDITIONAL BICEP EXERCISES (4 more)
  {
    id: 'biceps_3',
    name: 'Hammer Curls',
    category: 'biceps',
    primaryMuscles: ['Biceps', 'Brachialis'],
    secondaryMuscles: ['Forearms'],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Hold dumbbells with neutral grip (palms facing each other)',
      'Stand with arms at sides',
      'Curl weights up keeping neutral grip',
      'Squeeze biceps at top',
      'Lower with control'
    ],
    tips: [
      'Keep elbows stationary',
      'Don\'t rotate wrists',
      'Focus on bicep and brachialis contraction'
    ],
    commonMistakes: [
      'Swinging the weights',
      'Using momentum',
      'Not keeping neutral grip'
    ],
    variations: ['Alternating Hammer Curls', 'Cross-Body Hammer Curls', 'Cable Hammer Curls']
  },
  {
    id: 'biceps_4',
    name: 'Preacher Curls',
    category: 'biceps',
    primaryMuscles: ['Biceps'],
    secondaryMuscles: [],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Sit at preacher bench with chest against pad',
      'Hold barbell with underhand grip',
      'Start with arms slightly bent',
      'Curl weight up squeezing biceps',
      'Lower slowly with control'
    ],
    tips: [
      'Don\'t fully extend arms at bottom',
      'Keep wrists straight',
      'Focus on slow negative'
    ],
    commonMistakes: [
      'Extending arms too far',
      'Using too much weight',
      'Not controlling the negative'
    ],
    variations: ['Dumbbell Preacher Curls', 'Single-Arm Preacher Curls', 'Cable Preacher Curls']
  },
  {
    id: 'biceps_5',
    name: 'Cable Curls',
    category: 'biceps',
    primaryMuscles: ['Biceps'],
    secondaryMuscles: ['Forearms'],
    equipment: 'cable',
    difficulty: 'Beginner',
    instructions: [
      'Stand facing cable machine with low pulley',
      'Grab bar with underhand grip',
      'Keep elbows at sides',
      'Curl bar up to chest level',
      'Lower with control maintaining tension'
    ],
    tips: [
      'Maintain constant tension',
      'Don\'t let weight stack touch',
      'Keep core engaged'
    ],
    commonMistakes: [
      'Moving elbows forward',
      'Using body momentum',
      'Not maintaining tension at bottom'
    ],
    variations: ['Single-Arm Cable Curls', 'High Cable Curls', 'Rope Cable Curls']
  },
  {
    id: 'biceps_6',
    name: 'Concentration Curls',
    category: 'biceps',
    primaryMuscles: ['Biceps'],
    secondaryMuscles: [],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Sit on bench with dumbbell in one hand',
      'Brace elbow against inner thigh',
      'Let arm hang with slight bend',
      'Curl weight up focusing on bicep',
      'Lower slowly and repeat'
    ],
    tips: [
      'Really focus on mind-muscle connection',
      'Don\'t swing or cheat',
      'Full range of motion'
    ],
    commonMistakes: [
      'Using too much weight',
      'Not bracing elbow properly',
      'Rushing the movement'
    ],
    variations: ['Standing Concentration Curls', 'Cable Concentration Curls', 'Incline Concentration Curls']
  },

  // ADDITIONAL TRICEP EXERCISES (4 more)
  {
    id: 'triceps_3',
    name: 'Close-Grip Bench Press',
    category: 'triceps',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Chest', 'Shoulders'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Lie on bench with narrow grip on barbell',
      'Keep elbows close to body',
      'Lower bar to chest with control',
      'Press up focusing on tricep extension',
      'Keep elbows tucked throughout'
    ],
    tips: [
      'Don\'t go too narrow with grip',
      'Keep elbows tucked',
      'Focus on tricep engagement'
    ],
    commonMistakes: [
      'Grip too narrow causing wrist pain',
      'Flaring elbows out',
      'Using too much weight'
    ],
    variations: ['Dumbbell Close-Grip Press', 'Incline Close-Grip Press', 'Smith Machine Close-Grip']
  },
  {
    id: 'triceps_4',
    name: 'Overhead Tricep Extension',
    category: 'triceps',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Shoulders'],
    equipment: 'dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Hold dumbbell with both hands overhead',
      'Keep elbows pointing forward',
      'Lower weight behind head',
      'Extend arms back to starting position',
      'Keep elbows stationary'
    ],
    tips: [
      'Keep elbows close together',
      'Don\'t go too heavy initially',
      'Control the stretch'
    ],
    commonMistakes: [
      'Flaring elbows out',
      'Going too low and straining shoulders',
      'Using momentum'
    ],
    variations: ['Single-Arm Overhead Extension', 'Cable Overhead Extension', 'Seated Overhead Extension']
  },
  {
    id: 'triceps_5',
    name: 'Tricep Kickbacks',
    category: 'triceps',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: [],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Bend over with dumbbell in one hand',
      'Bring elbow to side and keep it there',
      'Extend arm back squeezing tricep',
      'Return to starting position',
      'Keep elbow stationary throughout'
    ],
    tips: [
      'Really squeeze tricep at extension',
      'Keep elbow locked in position',
      'Use light weight and focus on form'
    ],
    commonMistakes: [
      'Moving the elbow',
      'Using too much weight',
      'Not fully extending arm'
    ],
    variations: ['Cable Kickbacks', 'Both Arms Kickbacks', 'Incline Kickbacks']
  },
  {
    id: 'triceps_6',
    name: 'Diamond Push-ups',
    category: 'triceps',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Chest', 'Shoulders'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Get in push-up position',
      'Make diamond shape with hands',
      'Lower body keeping elbows close',
      'Push up focusing on tricep extension',
      'Keep core tight throughout'
    ],
    tips: [
      'Keep elbows close to body',
      'Maintain straight body line',
      'Focus on tricep engagement'
    ],
    commonMistakes: [
      'Flaring elbows out',
      'Not going deep enough',
      'Poor core stability'
    ],
    variations: ['Incline Diamond Push-ups', 'Decline Diamond Push-ups', 'Single-Arm Diamond Push-ups']
  },

  // ADDITIONAL SHOULDER EXERCISES (4 more)
  {
    id: 'shoulders_3',
    name: 'Lateral Raises',
    category: 'shoulders',
    primaryMuscles: ['Lateral Deltoids'],
    secondaryMuscles: [],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Stand with dumbbells at sides',
      'Raise arms out to sides',
      'Lift until arms are parallel to ground',
      'Lower with control',
      'Keep slight bend in elbows'
    ],
    tips: [
      'Lead with pinkies slightly',
      'Don\'t go above shoulder height',
      'Control the negative'
    ],
    commonMistakes: [
      'Using too much weight',
      'Swinging the weights',
      'Going too high'
    ],
    variations: ['Cable Lateral Raises', 'Single-Arm Lateral Raises', 'Leaning Lateral Raises']
  },
  {
    id: 'shoulders_4',
    name: 'Front Raises',
    category: 'shoulders',
    primaryMuscles: ['Anterior Deltoids'],
    secondaryMuscles: [],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Stand with dumbbells in front of thighs',
      'Raise one arm forward to shoulder height',
      'Lower with control',
      'Alternate arms or do both together',
      'Keep core engaged'
    ],
    tips: [
      'Don\'t go above shoulder height',
      'Keep slight bend in elbow',
      'Control the movement'
    ],
    commonMistakes: [
      'Using momentum',
      'Going too high',
      'Using too much weight'
    ],
    variations: ['Plate Front Raises', 'Cable Front Raises', 'Barbell Front Raises']
  },
  {
    id: 'shoulders_5',
    name: 'Rear Delt Flyes',
    category: 'shoulders',
    primaryMuscles: ['Rear Deltoids'],
    secondaryMuscles: ['Rhomboids'],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Bend over with dumbbells hanging down',
      'Raise arms out to sides',
      'Squeeze shoulder blades together',
      'Lower with control',
      'Keep slight bend in elbows'
    ],
    tips: [
      'Focus on squeezing rear delts',
      'Don\'t use momentum',
      'Keep chest up'
    ],
    commonMistakes: [
      'Using too much weight',
      'Not squeezing shoulder blades',
      'Swinging the weights'
    ],
    variations: ['Cable Rear Delt Flyes', 'Machine Rear Delt Flyes', 'Incline Rear Delt Flyes']
  },
  {
    id: 'shoulders_6',
    name: 'Arnold Press',
    category: 'shoulders',
    primaryMuscles: ['Shoulders'],
    secondaryMuscles: ['Triceps'],
    equipment: 'dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Start with dumbbells at shoulder height, palms facing you',
      'Press up while rotating palms forward',
      'End with arms overhead, palms forward',
      'Reverse the motion on the way down',
      'Keep core engaged throughout'
    ],
    tips: [
      'Smooth rotation throughout',
      'Don\'t rush the movement',
      'Keep elbows under wrists'
    ],
    commonMistakes: [
      'Moving too fast',
      'Using too much weight',
      'Not rotating properly'
    ],
    variations: ['Seated Arnold Press', 'Single-Arm Arnold Press', 'Cable Arnold Press']
  },

  // ADDITIONAL CALVES EXERCISES (4 more)
  {
    id: 'calves_3',
    name: 'Donkey Calf Raises',
    category: 'calves',
    primaryMuscles: ['Calves'],
    secondaryMuscles: [],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Position yourself bent over on calf raise machine',
      'Place balls of feet on platform',
      'Let heels drop below platform level',
      'Rise up on toes as high as possible',
      'Lower with control to feel stretch'
    ],
    tips: [
      'Get full range of motion',
      'Hold peak contraction',
      'Control the negative'
    ],
    commonMistakes: [
      'Not going through full ROM',
      'Bouncing at bottom',
      'Using momentum'
    ],
    variations: ['Partner Donkey Calf Raises', 'Machine Donkey Calf Raises', 'Weighted Donkey Raises']
  },
  {
    id: 'calves_4',
    name: 'Single-Leg Calf Raises',
    category: 'calves',
    primaryMuscles: ['Calves'],
    secondaryMuscles: [],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Stand on one foot on edge of step',
      'Hold wall or rail for balance',
      'Let heel drop below step level',
      'Rise up on toe as high as possible',
      'Complete reps then switch legs'
    ],
    tips: [
      'Focus on balance and control',
      'Full range of motion',
      'Add weight when ready'
    ],
    commonMistakes: [
      'Using too much assistance',
      'Not going through full ROM',
      'Rushing the movement'
    ],
    variations: ['Dumbbell Single-Leg Raises', 'Machine Single-Leg Raises', 'Jump Single-Leg Raises']
  },
  {
    id: 'calves_5',
    name: 'Calf Press on Leg Press',
    category: 'calves',
    primaryMuscles: ['Calves'],
    secondaryMuscles: [],
    equipment: 'machine',
    difficulty: 'Beginner',
    instructions: [
      'Sit in leg press machine',
      'Place balls of feet on bottom of platform',
      'Release safety and extend legs',
      'Press with toes extending ankles',
      'Lower heels for stretch then repeat'
    ],
    tips: [
      'Keep legs straight throughout',
      'Focus on ankle extension',
      'Don\'t let knees bend'
    ],
    commonMistakes: [
      'Bending knees during movement',
      'Not getting full extension',
      'Going too fast'
    ],
    variations: ['Single-Leg Press Calves', 'Toes-Out Calf Press', 'Toes-In Calf Press']
  },
  {
    id: 'calves_6',
    name: 'Jump Rope (Calf Focus)',
    category: 'calves',
    primaryMuscles: ['Calves'],
    secondaryMuscles: ['Core'],
    equipment: 'bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Hold jump rope handles',
      'Jump on balls of feet',
      'Keep jumps small and quick',
      'Land softly on toes',
      'Maintain steady rhythm'
    ],
    tips: [
      'Stay on balls of feet',
      'Keep jumps low',
      'Maintain steady pace'
    ],
    commonMistakes: [
      'Jumping too high',
      'Landing flat-footed',
      'Going too fast initially'
    ],
    variations: ['Double-Under Jump Rope', 'Single-Leg Jump Rope', 'Cross-Over Jump Rope']
  },

  // ADDITIONAL BACK EXERCISES (2 more)
  {
    id: 'back_5',
    name: 'Lat Pulldowns',
    category: 'back',
    primaryMuscles: ['Latissimus Dorsi'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids'],
    equipment: 'cable',
    difficulty: 'Beginner',
    instructions: [
      'Sit at lat pulldown machine',
      'Grab bar with wide overhand grip',
      'Pull bar down to upper chest',
      'Squeeze shoulder blades together',
      'Control the weight back up'
    ],
    tips: [
      'Lead with elbows',
      'Don\'t lean too far back',
      'Focus on lat engagement'
    ],
    commonMistakes: [
      'Pulling bar behind head',
      'Using too much momentum',
      'Not engaging lats properly'
    ],
    variations: ['Close-Grip Pulldowns', 'Wide-Grip Pulldowns', 'Reverse-Grip Pulldowns']
  },
  {
    id: 'back_6',
    name: 'T-Bar Rows',
    category: 'back',
    primaryMuscles: ['Middle Traps', 'Rhomboids'],
    secondaryMuscles: ['Rear Deltoids', 'Biceps'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Straddle T-bar with bent-over position',
      'Grab handles with neutral grip',
      'Pull weight to lower chest',
      'Squeeze shoulder blades together',
      'Lower with control'
    ],
    tips: [
      'Keep chest up and back straight',
      'Pull elbows back and up',
      'Focus on squeezing at top'
    ],
    commonMistakes: [
      'Rounding the back',
      'Using too much leg drive',
      'Not getting full range of motion'
    ],
    variations: ['Single-Arm T-Bar Rows', 'Wide-Grip T-Bar Rows', 'Chest-Supported T-Bar Rows']
  },

  // ADDITIONAL CORE EXERCISES (2 more)
  {
    id: 'core_5',
    name: 'Russian Twists',
    category: 'core',
    primaryMuscles: ['Obliques'],
    secondaryMuscles: ['Rectus Abdominis'],
    equipment: 'bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Sit with knees bent and feet off ground',
      'Lean back slightly',
      'Rotate torso from side to side',
      'Keep core engaged throughout',
      'Touch ground on each side'
    ],
    tips: [
      'Keep feet off ground',
      'Rotate from core, not arms',
      'Maintain steady breathing'
    ],
    commonMistakes: [
      'Moving too fast',
      'Not rotating from core',
      'Letting feet touch ground'
    ],
    variations: ['Weighted Russian Twists', 'Medicine Ball Russian Twists', 'Feet-Elevated Russian Twists']
  },
  {
    id: 'core_6',
    name: 'Dead Bug',
    category: 'core',
    primaryMuscles: ['Deep Core'],
    secondaryMuscles: ['Hip Flexors'],
    equipment: 'bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Lie on back with arms up and knees at 90 degrees',
      'Lower opposite arm and leg slowly',
      'Return to starting position',
      'Alternate sides',
      'Keep core engaged throughout'
    ],
    tips: [
      'Move slowly and controlled',
      'Don\'t let back arch',
      'Focus on stability'
    ],
    commonMistakes: [
      'Moving too fast',
      'Letting back arch',
      'Not coordinating arm and leg'
    ],
    variations: ['Dead Bug with Band', 'Dead Bug Hold', 'Single-Limb Dead Bug']
  },

  // ADDITIONAL FOREARM EXERCISES (3 more)
  {
    id: 'forearms_4',
    name: 'Wrist Curls',
    category: 'forearms',
    primaryMuscles: ['Forearm Flexors'],
    secondaryMuscles: [],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Sit with forearms resting on thighs',
      'Hold dumbbells with underhand grip',
      'Let wrists extend down',
      'Curl wrists up squeezing forearms',
      'Lower with control'
    ],
    tips: [
      'Keep forearms stationary',
      'Full range of motion',
      'Use light weight initially'
    ],
    commonMistakes: [
      'Using too much weight',
      'Moving forearms',
      'Not getting full ROM'
    ],
    variations: ['Reverse Wrist Curls', 'Behind-Back Wrist Curls', 'Cable Wrist Curls']
  },
  {
    id: 'forearms_5',
    name: 'Plate Pinch',
    category: 'forearms',
    primaryMuscles: ['Grip Strength'],
    secondaryMuscles: ['Forearms'],
    equipment: 'plate',
    difficulty: 'Intermediate',
    instructions: [
      'Hold two plates together smooth sides out',
      'Pinch plates between thumb and fingers',
      'Hold for specified time',
      'Focus on grip strength',
      'Don\'t let plates slip'
    ],
    tips: [
      'Start with lighter plates',
      'Focus on thumb strength',
      'Build up holding time gradually'
    ],
    commonMistakes: [
      'Using too heavy plates initially',
      'Not engaging thumb properly',
      'Letting plates touch body'
    ],
    variations: ['Single Plate Pinch', 'Multiple Plate Pinch', 'Timed Plate Pinch']
  },
  {
    id: 'forearms_6',
    name: 'Grip Crushers',
    category: 'forearms',
    primaryMuscles: ['Grip Strength'],
    secondaryMuscles: ['Forearms'],
    equipment: 'bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Hold grip crusher or tennis ball',
      'Squeeze as hard as possible',
      'Hold for 3-5 seconds',
      'Release and repeat',
      'Work both hands equally'
    ],
    tips: [
      'Squeeze with full force',
      'Hold at peak contraction',
      'Don\'t hold breath'
    ],
    commonMistakes: [
      'Not squeezing hard enough',
      'Not holding contraction',
      'Favoring one hand'
    ],
    variations: ['Hand Grippers', 'Tennis Ball Squeezes', 'Stress Ball Squeezes']
  },

  // ADDITIONAL CARDIO EXERCISES (3 more)
  {
    id: 'cardio_4',
    name: 'Mountain Climbers',
    category: 'cardio',
    primaryMuscles: ['Core'],
    secondaryMuscles: ['Shoulders', 'Legs'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Start in plank position',
      'Alternate bringing knees to chest',
      'Keep hips level',
      'Maintain steady rhythm',
      'Keep core engaged'
    ],
    tips: [
      'Don\'t let hips pike up',
      'Keep shoulders over wrists',
      'Breathe steadily'
    ],
    commonMistakes: [
      'Letting hips rise',
      'Going too fast',
      'Poor plank position'
    ],
    variations: ['Cross-Body Mountain Climbers', 'Slow Mountain Climbers', 'Elevated Mountain Climbers']
  },
  {
    id: 'cardio_5',
    name: 'High Knees',
    category: 'cardio',
    primaryMuscles: ['Hip Flexors'],
    secondaryMuscles: ['Core', 'Calves'],
    equipment: 'bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Stand in place',
      'Lift knees up to waist level',
      'Alternate legs quickly',
      'Stay on balls of feet',
      'Keep core engaged'
    ],
    tips: [
      'Drive knees up high',
      'Stay light on feet',
      'Pump arms naturally'
    ],
    commonMistakes: [
      'Not lifting knees high enough',
      'Landing flat-footed',
      'Leaning too far forward'
    ],
    variations: ['High Knees in Place', 'Traveling High Knees', 'High Knees with Arms']
  },
  {
    id: 'cardio_6',
    name: 'Box Steps',
    category: 'cardio',
    primaryMuscles: ['Legs'],
    secondaryMuscles: ['Glutes', 'Core'],
    equipment: 'bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Step up onto box with one foot',
      'Bring other foot up',
      'Step down with same foot that went up first',
      'Alternate leading foot',
      'Maintain steady rhythm'
    ],
    tips: [
      'Step fully onto box',
      'Control the descent',
      'Keep chest up'
    ],
    commonMistakes: [
      'Not stepping fully onto box',
      'Using momentum',
      'Favoring one leg'
    ],
    variations: ['Weighted Box Steps', 'Lateral Box Steps', 'Single-Leg Box Steps']
  },

  // ADDITIONAL FULL-BODY EXERCISES (4 more)
  {
    id: 'fullbody_3',
    name: 'Turkish Get-ups',
    category: 'full-body',
    primaryMuscles: ['Full Body'],
    secondaryMuscles: ['Core', 'Shoulders', 'Legs'],
    equipment: 'kettlebell',
    difficulty: 'Advanced',
    instructions: [
      'Lie on back holding kettlebell overhead',
      'Roll to side then up to sitting',
      'Come to kneeling position',
      'Stand up while keeping bell overhead',
      'Reverse the movement to return'
    ],
    tips: [
      'Keep eyes on kettlebell',
      'Move slowly and controlled',
      'Practice without weight first'
    ],
    commonMistakes: [
      'Moving too fast',
      'Not keeping bell overhead',
      'Poor transitional form'
    ],
    variations: ['Half Turkish Get-ups', 'Bodyweight Get-ups', 'Dumbbell Get-ups']
  },
  {
    id: 'fullbody_4',
    name: 'Bear Crawl',
    category: 'full-body',
    primaryMuscles: ['Core'],
    secondaryMuscles: ['Shoulders', 'Legs'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Start on hands and knees',
      'Lift knees 1-2 inches off ground',
      'Crawl forward moving opposite hand and foot',
      'Keep hips level',
      'Maintain steady pace'
    ],
    tips: [
      'Keep knees low but off ground',
      'Don\'t let hips sway',
      'Engage core throughout'
    ],
    commonMistakes: [
      'Lifting hips too high',
      'Moving too fast',
      'Not engaging core'
    ],
    variations: ['Backwards Bear Crawl', 'Lateral Bear Crawl', 'Bear Crawl Hold']
  },
  {
    id: 'fullbody_5',
    name: 'Man Makers',
    category: 'full-body',
    primaryMuscles: ['Full Body'],
    secondaryMuscles: ['Arms', 'Legs', 'Core'],
    equipment: 'dumbbell',
    difficulty: 'Advanced',
    instructions: [
      'Hold dumbbells in push-up position',
      'Do push-up then row each arm',
      'Jump feet to squat position',
      'Clean dumbbells to shoulders',
      'Press overhead then return to start'
    ],
    tips: [
      'Maintain good form throughout',
      'Use lighter weights initially',
      'Focus on smooth transitions'
    ],
    commonMistakes: [
      'Using too much weight',
      'Rushing through movements',
      'Poor form on individual components'
    ],
    variations: ['Bodyweight Man Makers', 'Single Dumbbell Man Makers', 'Burpee Man Makers']
  },
  {
    id: 'fullbody_6',
    name: 'Wall Balls',
    category: 'full-body',
    primaryMuscles: ['Legs'],
    secondaryMuscles: ['Shoulders', 'Core'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Hold medicine ball at chest level',
      'Squat down keeping chest up',
      'Explosively stand and throw ball to wall target',
      'Catch ball and immediately go into next squat',
      'Maintain steady rhythm'
    ],
    tips: [
      'Use legs to power the throw',
      'Catch ball with soft hands',
      'Keep core engaged'
    ],
    commonMistakes: [
      'Using all arms to throw',
      'Not squatting deep enough',
      'Poor catching technique'
    ],
    variations: ['Lighter Wall Balls', 'Higher Target Wall Balls', 'Single-Arm Wall Balls']
  },

  // ADDITIONAL GLUTE EXERCISE (1 more)
  {
    id: 'glutes_6',
    name: 'Bulgarian Split Squats',
    category: 'glutes',
    primaryMuscles: ['Glutes'],
    secondaryMuscles: ['Quadriceps', 'Hamstrings'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Stand 2-3 feet in front of bench',
      'Place back foot on bench behind you',
      'Lower into lunge position',
      'Push through front heel to return',
      'Complete reps then switch legs'
    ],
    tips: [
      'Keep most weight on front leg',
      'Don\'t lean too far forward',
      'Focus on glute activation'
    ],
    commonMistakes: [
      'Putting too much weight on back foot',
      'Leaning forward excessively',
      'Not going deep enough'
    ],
    variations: ['Weighted Bulgarian Split Squats', 'Deficit Bulgarian Split Squats', 'Jump Bulgarian Split Squats']
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