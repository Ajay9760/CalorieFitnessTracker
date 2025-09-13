const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Use in-memory SQLite for development
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

// TODO: Define your models here
// Example:
// const User = require('./User')(sequelize, Sequelize.DataTypes);
// const FoodItem = require('./FoodItem')(sequelize, Sequelize.DataTypes);

// Define associations here
// User.hasMany(MealEntry);
// MealEntry.belongsTo(User);

module.exports = {
  sequelize,
  Sequelize,
  // Add model exports here
  // User,
  // FoodItem,
};
