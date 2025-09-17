const express = require('express');
const { User } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/user/profile
router.get('/profile', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        user: req.user.toJSON()
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user profile',
      message: 'An error occurred while retrieving your profile'
    });
  }
});

// PUT /api/user/profile
router.put('/profile', async (req, res) => {
  try {
    const allowedUpdates = [
      'name', 'age', 'gender', 'height', 'weight', 'activityLevel', 
      'dietType', 'region', 'fitnessGoal', 'targetWeight', 'weeklyWeightChangeGoal',
      'dailyCalorieGoal', 'dailyStepGoal', 'dailyWaterGoal', 
      'dailyProteinGoal', 'dailyCarbsGoal', 'dailyFatsGoal',
      'bodyFatPercentage', 'targetBodyFatPercentage'
    ];

    const updates = {};
    
    // Filter allowed updates
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'No valid fields provided for update'
      });
    }

    // Update user
    await req.user.update(updates);
    
    // Reload user to get updated data
    await req.user.reload();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: req.user.toJSON()
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: error.errors.map(e => e.message).join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to update user profile',
      message: 'An error occurred while updating your profile'
    });
  }
});

// GET /api/user/stats
router.get('/stats', async (req, res) => {
  try {
    // TODO: Implement user statistics (streak, achievements, etc.)
    res.json({
      success: true,
      message: 'User stats retrieved successfully',
      data: {
        totalDays: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalMealsLogged: 0,
        totalActivitiesLogged: 0,
        averageDailyCalories: 0,
        goalsAchieved: 0
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user stats',
      message: 'An error occurred while retrieving your statistics'
    });
  }
});

module.exports = router;
