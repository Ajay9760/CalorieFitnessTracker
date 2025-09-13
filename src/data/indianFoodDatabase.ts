import { FoodItem } from '../types';

export const INDIAN_FOOD_DATABASE: FoodItem[] = [
  // GRAINS & CEREALS
  {
    id: 'rice_basmati',
    name: 'Basmati Rice (Cooked)',
    nameHindi: 'बासमती चावल',
    category: 'grains',
    region: ['north_indian', 'south_indian'],
    calories: 121,
    macros: {
      protein: 2.3,
      carbs: 25.0,
      fats: 0.4,
      fiber: 0.4,
      sugar: 0.0,
      sodium: 1,
    },
    servingSizes: [
      { unit: 'cup', grams: 158, description: '1 cup cooked' },
      { unit: 'katori', grams: 100, description: '1 small bowl' },
      { unit: 'tablespoon', grams: 12, description: '1 tablespoon' },
    ],
    isCommonDish: true,
    tags: ['staple', 'gluten-free', 'vegan'],
  },
  {
    id: 'roti_wheat',
    name: 'Wheat Roti/Chapati',
    nameHindi: 'गेहूं की रोटी',
    category: 'grains',
    region: ['north_indian'],
    calories: 104,
    macros: {
      protein: 3.1,
      carbs: 18.0,
      fats: 2.4,
      fiber: 1.9,
      sugar: 0.4,
      sodium: 191,
    },
    servingSizes: [
      { unit: 'roti', grams: 40, description: '1 medium roti' },
      { unit: 'piece', grams: 40, description: '1 piece' },
    ],
    isCommonDish: true,
    tags: ['staple', 'vegetarian'],
  },

  // DALS & LEGUMES
  {
    id: 'dal_toor',
    name: 'Toor Dal (Cooked)',
    nameHindi: 'तूर दाल',
    category: 'legumes',
    region: ['north_indian', 'south_indian', 'west_indian'],
    calories: 343,
    macros: {
      protein: 22.3,
      carbs: 57.2,
      fats: 1.5,
      fiber: 16.3,
      sugar: 2.8,
      sodium: 9,
    },
    servingSizes: [
      { unit: 'cup', grams: 100, description: '1 cup cooked dal' },
      { unit: 'katori', grams: 150, description: '1 bowl dal' },
      { unit: 'tablespoon', grams: 15, description: '1 tablespoon' },
    ],
    isCommonDish: true,
    tags: ['protein-rich', 'vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'dal_chana',
    name: 'Chana Dal',
    nameHindi: 'चना दाल',
    category: 'legumes',
    region: ['north_indian', 'east_indian'],
    calories: 364,
    macros: {
      protein: 19.1,
      carbs: 59.8,
      fats: 6.7,
      fiber: 17.1,
      sugar: 10.7,
      sodium: 56,
    },
    servingSizes: [
      { unit: 'cup', grams: 100, description: '1 cup cooked' },
      { unit: 'katori', grams: 150, description: '1 bowl' },
    ],
    isCommonDish: true,
    tags: ['protein-rich', 'vegetarian', 'vegan'],
  },

  // VEGETABLES
  {
    id: 'aloo_sabzi',
    name: 'Aloo Sabzi (Potato Curry)',
    nameHindi: 'आलू सब्जी',
    category: 'vegetables',
    region: ['north_indian'],
    calories: 87,
    macros: {
      protein: 2.0,
      carbs: 20.1,
      fats: 0.1,
      fiber: 2.2,
      sugar: 0.8,
      sodium: 6,
    },
    servingSizes: [
      { unit: 'cup', grams: 150, description: '1 cup curry' },
      { unit: 'katori', grams: 100, description: '1 small bowl' },
    ],
    isCommonDish: true,
    tags: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'palak_paneer',
    name: 'Palak Paneer',
    nameHindi: 'पालक पनीर',
    category: 'vegetables',
    region: ['north_indian'],
    calories: 180,
    macros: {
      protein: 14.2,
      carbs: 5.1,
      fats: 11.8,
      fiber: 2.2,
      sugar: 2.9,
      sodium: 387,
    },
    servingSizes: [
      { unit: 'cup', grams: 200, description: '1 cup serving' },
      { unit: 'katori', grams: 150, description: '1 bowl' },
    ],
    isCommonDish: true,
    tags: ['vegetarian', 'protein-rich'],
  },

  // SOUTH INDIAN
  {
    id: 'idli',
    name: 'Idli',
    nameHindi: 'इडली',
    category: 'grains',
    region: ['south_indian'],
    calories: 58,
    macros: {
      protein: 2.0,
      carbs: 12.0,
      fats: 0.3,
      fiber: 0.8,
      sugar: 0.1,
      sodium: 6,
    },
    servingSizes: [
      { unit: 'piece', grams: 60, description: '1 medium idli' },
      { unit: 'small', grams: 40, description: '1 small idli' },
    ],
    isCommonDish: true,
    tags: ['steamed', 'fermented', 'vegetarian', 'vegan'],
  },
  {
    id: 'dosa_plain',
    name: 'Plain Dosa',
    nameHindi: 'दोसा',
    category: 'grains',
    region: ['south_indian'],
    calories: 168,
    macros: {
      protein: 4.1,
      carbs: 33.0,
      fats: 1.6,
      fiber: 1.4,
      sugar: 0.8,
      sodium: 12,
    },
    servingSizes: [
      { unit: 'piece', grams: 120, description: '1 medium dosa' },
      { unit: 'large', grams: 150, description: '1 large dosa' },
    ],
    isCommonDish: true,
    tags: ['fermented', 'vegetarian', 'vegan'],
  },

  // SNACKS & SWEETS
  {
    id: 'samosa',
    name: 'Samosa',
    nameHindi: 'समोसा',
    category: 'snacks',
    region: ['north_indian'],
    calories: 262,
    macros: {
      protein: 3.5,
      carbs: 23.0,
      fats: 17.8,
      fiber: 2.4,
      sugar: 1.2,
      sodium: 422,
    },
    servingSizes: [
      { unit: 'piece', grams: 50, description: '1 medium samosa' },
      { unit: 'large', grams: 70, description: '1 large samosa' },
    ],
    isCommonDish: true,
    tags: ['fried', 'vegetarian'],
  },
  {
    id: 'gulab_jamun',
    name: 'Gulab Jamun',
    nameHindi: 'गुलाब जामुन',
    category: 'sweets',
    region: ['north_indian'],
    calories: 387,
    macros: {
      protein: 4.2,
      carbs: 52.7,
      fats: 18.0,
      fiber: 0.6,
      sugar: 45.8,
      sodium: 95,
    },
    servingSizes: [
      { unit: 'piece', grams: 40, description: '1 medium piece' },
      { unit: 'small', grams: 25, description: '1 small piece' },
    ],
    isCommonDish: true,
    tags: ['sweet', 'dessert', 'vegetarian'],
  },

  // DAIRY
  {
    id: 'paneer',
    name: 'Paneer (Indian Cottage Cheese)',
    nameHindi: 'पनीर',
    category: 'dairy',
    region: ['north_indian'],
    calories: 265,
    macros: {
      protein: 18.3,
      carbs: 1.2,
      fats: 20.8,
      fiber: 0.0,
      sugar: 1.2,
      sodium: 18,
    },
    servingSizes: [
      { unit: 'cup', grams: 100, description: '1 cup cubes' },
      { unit: 'piece', grams: 25, description: '1 medium cube' },
    ],
    isCommonDish: true,
    tags: ['protein-rich', 'vegetarian', 'fresh'],
  },
  {
    id: 'lassi',
    name: 'Sweet Lassi',
    nameHindi: 'मीठी लस्सी',
    category: 'beverages',
    region: ['north_indian'],
    calories: 89,
    macros: {
      protein: 2.9,
      carbs: 13.4,
      fats: 2.4,
      fiber: 0.0,
      sugar: 13.4,
      sodium: 46,
    },
    servingSizes: [
      { unit: 'glass', grams: 250, description: '1 glass' },
      { unit: 'cup', grams: 200, description: '1 cup' },
    ],
    isCommonDish: true,
    tags: ['drink', 'sweet', 'vegetarian', 'probiotic'],
  },

  // MEAT & FISH
  {
    id: 'chicken_curry',
    name: 'Chicken Curry',
    nameHindi: 'चिकन करी',
    category: 'meat_fish',
    region: ['north_indian', 'south_indian'],
    calories: 165,
    macros: {
      protein: 25.8,
      carbs: 3.2,
      fats: 5.4,
      fiber: 0.8,
      sugar: 1.8,
      sodium: 398,
    },
    servingSizes: [
      { unit: 'cup', grams: 200, description: '1 cup curry' },
      { unit: 'katori', grams: 150, description: '1 bowl' },
    ],
    isCommonDish: true,
    tags: ['non-vegetarian', 'protein-rich', 'spicy'],
  },

  // BEVERAGES
  {
    id: 'chai',
    name: 'Masala Chai',
    nameHindi: 'मसाला चाय',
    category: 'beverages',
    region: ['north_indian', 'south_indian', 'east_indian', 'west_indian'],
    calories: 44,
    macros: {
      protein: 1.6,
      carbs: 6.2,
      fats: 1.6,
      fiber: 0.0,
      sugar: 6.2,
      sodium: 7,
    },
    servingSizes: [
      { unit: 'cup', grams: 150, description: '1 cup' },
      { unit: 'glass', grams: 200, description: '1 glass' },
      { unit: 'small_glass', grams: 100, description: '1 small glass' },
    ],
    isCommonDish: true,
    tags: ['drink', 'hot', 'spiced', 'vegetarian'],
  },

  // OILS & FATS
  {
    id: 'ghee',
    name: 'Ghee (Clarified Butter)',
    nameHindi: 'घी',
    category: 'oils_fats',
    region: ['north_indian', 'south_indian', 'east_indian', 'west_indian'],
    calories: 900,
    macros: {
      protein: 0.0,
      carbs: 0.0,
      fats: 100.0,
      fiber: 0.0,
      sugar: 0.0,
      sodium: 0,
    },
    servingSizes: [
      { unit: 'teaspoon', grams: 4, description: '1 teaspoon' },
      { unit: 'tablespoon', grams: 12, description: '1 tablespoon' },
    ],
    isCommonDish: true,
    tags: ['fat', 'cooking oil', 'vegetarian'],
  },

  // FRUITS
  {
    id: 'mango',
    name: 'Mango',
    nameHindi: 'आम',
    category: 'fruits',
    region: ['north_indian', 'south_indian', 'east_indian', 'west_indian'],
    calories: 60,
    macros: {
      protein: 0.8,
      carbs: 15.0,
      fats: 0.4,
      fiber: 1.6,
      sugar: 13.7,
      sodium: 1,
    },
    servingSizes: [
      { unit: 'cup', grams: 165, description: '1 cup sliced' },
      { unit: 'piece', grams: 200, description: '1 medium mango' },
    ],
    isCommonDish: true,
    tags: ['fruit', 'sweet', 'vitamin-c', 'vegan'],
  },

  // NUTS & SEEDS
  {
    id: 'almonds',
    name: 'Almonds',
    nameHindi: 'बादाम',
    category: 'nuts_seeds',
    region: ['north_indian', 'south_indian', 'east_indian', 'west_indian'],
    calories: 579,
    macros: {
      protein: 21.2,
      carbs: 21.6,
      fats: 49.9,
      fiber: 12.5,
      sugar: 4.4,
      sodium: 1,
    },
    servingSizes: [
      { unit: 'piece', grams: 1, description: '1 almond' },
      { unit: 'cup', grams: 95, description: '1 cup whole' },
      { unit: 'tablespoon', grams: 8, description: '1 tablespoon chopped' },
    ],
    isCommonDish: true,
    tags: ['nuts', 'protein-rich', 'healthy-fats', 'vegan'],
  },
];

export const getFoodById = (id: string): FoodItem | undefined => {
  return INDIAN_FOOD_DATABASE.find(food => food.id === id);
};

export const searchFoodByName = (query: string): FoodItem[] => {
  const lowerQuery = query.toLowerCase();
  return INDIAN_FOOD_DATABASE.filter(food => 
    food.name.toLowerCase().includes(lowerQuery) ||
    (food.nameHindi && food.nameHindi.includes(query)) ||
    food.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getFoodsByCategory = (category: string): FoodItem[] => {
  return INDIAN_FOOD_DATABASE.filter(food => food.category === category);
};

export const getFoodsByRegion = (region: string): FoodItem[] => {
  return INDIAN_FOOD_DATABASE.filter(food => food.region.includes(region as any));
};
