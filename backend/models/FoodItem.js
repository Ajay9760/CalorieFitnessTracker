const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const FoodItem = sequelize.define('FoodItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    nameHindi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM(
        'grains', 'vegetables', 'fruits', 'dairy', 'meat_fish',
        'legumes', 'pulses', 'nuts_seeds', 'beverages', 'sweets', 
        'snacks', 'spices', 'oils_fats', 'prepared_dishes', 'herbs'
      ),
      allowNull: false,
    },
    region: {
      type: DataTypes.JSON, // Array of regions
      allowNull: true,
      defaultValue: ['all_india'],
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
      comment: 'Calories per 100g',
    },
    // Macronutrients per 100g
    protein: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    carbs: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    fats: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    fiber: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    sugar: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    sodium: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
      comment: 'Sodium in mg',
    },
    servingSizes: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [
        { unit: 'grams', grams: 100, description: '100g' }
      ],
    },
    isCommonDish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    barcode: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Data source (manual, api, user_submitted, etc.)',
    },
  }, {
    indexes: [
      {
        fields: ['name'],
      },
      {
        fields: ['category'],
      },
      {
        fields: ['isCommonDish'],
      },
      {
        unique: true,
        fields: ['barcode'],
        where: {
          barcode: {
            [sequelize.Sequelize.Op.ne]: null,
          },
        },
      },
    ],
  });

  return FoodItem;
};