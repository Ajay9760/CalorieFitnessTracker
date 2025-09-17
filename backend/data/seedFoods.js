const indianFoods = [
  // Grains and Cereals
  {
    name: "Basmati Rice (cooked)",
    nameHindi: "बासमती चावल",
    category: "grains",
    region: ["north_indian", "all_india"],
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fats: 0.3,
    fiber: 0.4,
    sugar: 0.1,
    sodium: 1,
    servingSizes: [
      { unit: "cup", grams: 158, description: "1 cup cooked" },
      { unit: "katori", grams: 100, description: "1 katori" },
      { unit: "grams", grams: 100, description: "100g" }
    ],
    isCommonDish: true,
    tags: ["vegetarian", "vegan", "gluten-free"],
    source: "manual"
  },
  {
    name: "Roti (Whole Wheat)",
    nameHindi: "रोटी",
    category: "grains",
    region: ["north_indian", "all_india"],
    calories: 297,
    protein: 11,
    carbs: 55,
    fats: 4,
    fiber: 11,
    sugar: 1,
    sodium: 5,
    servingSizes: [
      { unit: "piece", grams: 40, description: "1 medium roti" },
      { unit: "grams", grams: 100, description: "100g" }
    ],
    isCommonDish: true,
    tags: ["vegetarian", "vegan"],
    source: "manual"
  },
  {
    name: "Naan",
    nameHindi: "नान",
    category: "grains",
    region: ["north_indian"],
    calories: 262,
    protein: 9,
    carbs: 45,
    fats: 5,
    fiber: 2,
    sugar: 3,
    sodium: 419,
    servingSizes: [
      { unit: "piece", grams: 90, description: "1 medium naan" },
      { unit: "grams", grams: 100, description: "100g" }
    ],
    isCommonDish: true,
    tags: ["vegetarian"],
    source: "manual"
  },

  // Vegetables
  {
    name: "Dal (Moong)",
    nameHindi: "मूंग दाल",
    category: "legumes",
    region: ["all_india"],
    calories: 347,
    protein: 24,
    carbs: 59,
    fats: 1.2,
    fiber: 16,
    sugar: 2,
    sodium: 15,
    servingSizes: [
      { unit: "katori", grams: 150, description: "1 katori cooked" },
      { unit: "cup", grams: 202, description: "1 cup cooked" },
      { unit: "grams", grams: 100, description: "100g" }
    ],
    isCommonDish: true,
    tags: ["vegetarian", "vegan", "high-protein"],
    source: "manual"
  },
  {
    name: "Palak Paneer",
    nameHindi: "पालक पनीर",
    category: "prepared_dishes",
    region: ["north_indian"],
    calories: 180,
    protein: 12,
    carbs: 8,
    fats: 12,
    fiber: 3,
    sugar: 4,
    sodium: 400,
    servingSizes: [
      { unit: "katori", grams: 200, description: "1 katori" },
      { unit: "grams", grams: 100, description: "100g" }
    ],
    isCommonDish: true,
    tags: ["vegetarian", "high-protein"],
    source: "manual"
  },
  {
    name: "Aloo Gobi",
    nameHindi: "आलू गोभी",
    category: "prepared_dishes",
    region: ["north_indian"],
    calories: 140,
    protein: 3,
    carbs: 20,
    fats: 6,
    fiber: 4,
    sugar: 3,
    sodium: 300,
    servingSizes: [
      { unit: "katori", grams: 150, description: "1 katori" },
      { unit: "grams", grams: 100, description: "100g" }
    ],
    isCommonDish: true,
    tags: ["vegetarian", "vegan"],
    source: "manual"
  },

  // Fruits
  {
    name: "Banana",
    nameHindi: "केला",
    category: "fruits",
    region: ["all_india"],
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fats: 0.3,
    fiber: 2.6,
    sugar: 12,
    sodium: 1,
    servingSizes: [
      { unit: "piece", grams: 118, description: "1 medium banana" },
      { unit: "grams", grams: 100, description: "100g" }
    ],
    isCommonDish: false,
    tags: ["vegetarian", "vegan", "gluten-free"],
    source: "manual"
  },
  {
    name: "Apple",
    nameHindi: "सेब",
    category: "fruits",
    region: ["all_india"],
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fats: 0.2,
    fiber: 2.4,
    sugar: 10,
    sodium: 1,
    servingSizes: [
      { unit: "piece", grams: 182, description: "1 medium apple" },
      { unit: "grams", grams: 100, description: "100g" }
    ],
    isCommonDish: false,
    tags: ["vegetarian", "vegan", "gluten-free"],
    source: "manual"
  },

  // Dairy
  {
    name: "Paneer",
    nameHindi: "पनीर",
    category: "dairy",
    region: ["north_indian", "all_india"],
    calories: 265,
    protein: 18,
    carbs: 1.2,
    fats: 20,
    fiber: 0,
    sugar: 1.2,
    sodium: 18,
    servingSizes: [
      { unit: "piece", grams: 30, description: "1 cube" },
      { unit: "grams", grams: 100, description: "100g" }
    ],
    isCommonDish: false,
    tags: ["vegetarian", "high-protein", "low-carb"],
    source: "manual"
  },
  {
    name: "Curd (Plain Yogurt)",
    nameHindi: "दही",
    category: "dairy",
    region: ["all_india"],
    calories: 98,
    protein: 11,
    carbs: 7,
    fats: 4,
    fiber: 0,
    sugar: 7,
    sodium: 364,
    servingSizes: [
      { unit: "katori", grams: 200, description: "1 katori" },
      { unit: "cup", grams: 245, description: "1 cup" },
      { unit: "grams", grams: 100, description: "100g" }
    ],
    isCommonDish: true,
    tags: ["vegetarian", "probiotic"],
    source: "manual"
  },

  // Beverages
  {
    name: "Chai (with Milk & Sugar)",
    nameHindi: "चाय",
    category: "beverages",
    region: ["all_india"],
    calories: 30,
    protein: 1.5,
    carbs: 4,
    fats: 1,
    fiber: 0,
    sugar: 4,
    sodium: 10,
    servingSizes: [
      { unit: "cup", grams: 200, description: "1 cup" },
      { unit: "grams", grams: 100, description: "100ml" }
    ],
    isCommonDish: true,
    tags: ["vegetarian"],
    source: "manual"
  },

  // Common Snacks
  {
    name: "Samosa",
    nameHindi: "समोसा",
    category: "snacks",
    region: ["north_indian", "all_india"],
    calories: 308,
    protein: 6,
    carbs: 32,
    fats: 18,
    fiber: 3,
    sugar: 1,
    sodium: 422,
    servingSizes: [
      { unit: "piece", grams: 85, description: "1 medium samosa" },
      { unit: "grams", grams: 100, description: "100g" }
    ],
    isCommonDish: true,
    tags: ["vegetarian", "fried"],
    source: "manual"
  }
];

module.exports = indianFoods;