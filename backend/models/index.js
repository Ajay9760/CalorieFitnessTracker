const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Import models
const User = require('./User')(sequelize);
const FoodItem = require('./FoodItem')(sequelize);
const MealEntry = require('./MealEntry')(sequelize);
const ActivityEntry = require('./ActivityEntry')(sequelize);

// Define associations
// User associations
User.hasMany(MealEntry, { foreignKey: 'userId', as: 'meals' });
User.hasMany(ActivityEntry, { foreignKey: 'userId', as: 'activities' });

// MealEntry associations
MealEntry.belongsTo(User, { foreignKey: 'userId', as: 'user' });
MealEntry.belongsTo(FoodItem, { foreignKey: 'foodId', as: 'food' });

// ActivityEntry associations
ActivityEntry.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// FoodItem associations
FoodItem.hasMany(MealEntry, { foreignKey: 'foodId', as: 'mealEntries' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  FoodItem,
  MealEntry,
  ActivityEntry,
};
