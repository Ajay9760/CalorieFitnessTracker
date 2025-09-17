const express = require('express');
const { MealEntry, FoodItem, User } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { Op } = require('sequelize');
const moment = require('moment');
const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Helper function to calculate nutrition values
const calculateNutrition = (food, quantity) => {
  const multiplier = quantity / 100; // nutrition is per 100g
  return {
    calories: Math.round(food.calories * multiplier * 100) / 100,
    protein: Math.round(food.protein * multiplier * 100) / 100,
    carbs: Math.round(food.carbs * multiplier * 100) / 100,
    fats: Math.round(food.fats * multiplier * 100) / 100,
    fiber: Math.round((food.fiber || 0) * multiplier * 100) / 100,
    sugar: Math.round((food.sugar || 0) * multiplier * 100) / 100,
    sodium: Math.round((food.sodium || 0) * multiplier * 100) / 100
  };
};

// POST /api/meals - Log a meal
router.post('/', async (req, res) => {
  try {
    const {
      foodId,
      quantity,
      servingSize,
      mealType,
      date,
      imageUrl,
      notes
    } = req.body;

    // Validation
    if (!foodId || !quantity || !mealType) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Food ID, quantity, and meal type are required'
      });
    }

    if (!['breakfast', 'lunch', 'dinner', 'snack'].includes(mealType)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Invalid meal type. Must be breakfast, lunch, dinner, or snack'
      });
    }

    // Get food item
    const food = await FoodItem.findByPk(foodId);
    if (!food) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Food item not found'
      });
    }

    // Calculate nutrition values
    const nutrition = calculateNutrition(food, quantity);

    // Create meal entry
    const mealEntry = await MealEntry.create({
      userId: req.user.id,
      foodId,
      foodName: food.name,
      quantity,
      servingSize: servingSize || 'grams',
      mealType,
      date: date ? new Date(date) : new Date(),
      timestamp: new Date(),
      imageUrl,
      notes,
      ...nutrition
    });

    // Include food details in response
    const mealWithFood = await MealEntry.findByPk(mealEntry.id, {
      include: [
        {
          model: FoodItem,
          as: 'food'
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Meal logged successfully',
      data: {
        meal: mealWithFood
      }
    });
  } catch (error) {
    console.error('Log meal error:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: error.errors.map(e => e.message).join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to log meal',
      message: 'An error occurred while logging your meal'
    });
  }
});

// GET /api/meals - Get user's meals
router.get('/', async (req, res) => {
  try {
    const { date, mealType, limit = 50, offset = 0 } = req.query;

    const whereClause = {
      userId: req.user.id
    };

    // Add date filter if provided
    if (date) {
      whereClause.date = new Date(date);
    }

    // Add meal type filter if provided
    if (mealType) {
      whereClause.mealType = mealType;
    }

    const meals = await MealEntry.findAll({
      where: whereClause,
      include: [
        {
          model: FoodItem,
          as: 'food'
        }
      ],
      order: [['timestamp', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const totalCount = await MealEntry.count({ where: whereClause });

    res.json({
      success: true,
      message: `Found ${meals.length} meal entries`,
      data: {
        meals,
        pagination: {
          total: totalCount,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: parseInt(offset) + parseInt(limit) < totalCount
        }
      }
    });
  } catch (error) {
    console.error('Get meals error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get meals',
      message: 'An error occurred while retrieving your meals'
    });
  }
});

// GET /api/meals/daily-summary - Get daily nutrition summary
router.get('/daily-summary', async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date ? new Date(date) : new Date();

    const meals = await MealEntry.findAll({
      where: {
        userId: req.user.id,
        date: targetDate
      },
      include: [
        {
          model: FoodItem,
          as: 'food'
        }
      ],
      order: [['timestamp', 'ASC']]
    });

    // Calculate totals
    const totals = meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
        fiber: acc.fiber + meal.fiber,
        sugar: acc.sugar + meal.sugar,
        sodium: acc.sodium + meal.sodium
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0, sodium: 0 }
    );

    // Round the totals
    Object.keys(totals).forEach(key => {
      totals[key] = Math.round(totals[key] * 100) / 100;
    });

    // Group meals by type
    const mealsByType = {
      breakfast: meals.filter(m => m.mealType === 'breakfast'),
      lunch: meals.filter(m => m.mealType === 'lunch'),
      dinner: meals.filter(m => m.mealType === 'dinner'),
      snack: meals.filter(m => m.mealType === 'snack')
    };

    // Get user's goals for comparison
    const user = req.user;
    const goals = {
      calories: user.dailyCalorieGoal,
      protein: user.dailyProteinGoal,
      carbs: user.dailyCarbsGoal,
      fats: user.dailyFatsGoal,
      water: user.dailyWaterGoal
    };

    res.json({
      success: true,
      message: 'Daily summary retrieved successfully',
      data: {
        date: targetDate,
        totals,
        goals,
        progress: {
          calories: goals.calories ? Math.round((totals.calories / goals.calories) * 100) : 0,
          protein: goals.protein ? Math.round((totals.protein / goals.protein) * 100) : 0,
          carbs: goals.carbs ? Math.round((totals.carbs / goals.carbs) * 100) : 0,
          fats: goals.fats ? Math.round((totals.fats / goals.fats) * 100) : 0
        },
        mealsByType,
        totalMeals: meals.length
      }
    });
  } catch (error) {
    console.error('Daily summary error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get daily summary',
      message: 'An error occurred while retrieving your daily summary'
    });
  }
});

// DELETE /api/meals/:id - Delete meal entry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const meal = await MealEntry.findOne({
      where: {
        id,
        userId: req.user.id // Ensure user owns this meal
      }
    });

    if (!meal) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Meal entry not found'
      });
    }

    await meal.destroy();

    res.json({
      success: true,
      message: 'Meal deleted successfully'
    });
  } catch (error) {
    console.error('Delete meal error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete meal',
      message: 'An error occurred while deleting your meal'
    });
  }
});

module.exports = router;
