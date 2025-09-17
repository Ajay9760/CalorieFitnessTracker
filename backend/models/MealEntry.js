const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MealEntry = sequelize.define('MealEntry', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    foodId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'FoodItems',
        key: 'id',
      },
    },
    foodName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Cached food name for quick access',
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0.01,
      },
      comment: 'Quantity in grams',
    },
    servingSize: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'grams',
    },
    mealType: {
      type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
      allowNull: false,
    },
    // Cached nutritional values (calculated based on quantity)
    calories: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
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
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    indexes: [
      {
        fields: ['userId', 'date'],
      },
      {
        fields: ['userId', 'mealType', 'date'],
      },
      {
        fields: ['date'],
      },
      {
        fields: ['timestamp'],
      },
    ],
  });

  return MealEntry;
};