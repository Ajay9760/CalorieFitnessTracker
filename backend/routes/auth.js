const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { generateAccessToken, generateRefreshToken, authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Validation helper
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9_]{3,30}$/;
  return re.test(username);
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { 
      email, 
      password, 
      username, 
      name,
      age,
      gender,
      height,
      weight,
      activityLevel,
      dietType,
      region,
      fitnessGoal,
      targetWeight,
      weeklyWeightChangeGoal,
      dailyCalorieGoal,
      dailyStepGoal,
      dailyWaterGoal,
      dailyProteinGoal,
      dailyCarbsGoal,
      dailyFatsGoal
    } = req.body;

    // Validation
    if (!email || !password || !username || !name) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Email, password, username, and name are required'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Invalid email format'
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Password must be at least 6 characters long'
      });
    }

    if (!validateUsername(username)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Username must be 3-30 characters long and contain only letters, numbers, and underscores'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [User.sequelize.Sequelize.Op.or]: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'username';
      return res.status(400).json({
        success: false,
        error: 'User Already Exists',
        message: `A user with this ${field} already exists`
      });
    }

    // Create user with complete profile
    const userData = {
      email,
      password,
      username,
      name
    };
    
    // Add optional profile fields if provided
    if (age !== undefined) userData.age = age;
    if (gender) userData.gender = gender;
    if (height !== undefined) userData.height = height;
    if (weight !== undefined) userData.weight = weight;
    if (activityLevel) userData.activityLevel = activityLevel;
    if (dietType) userData.dietType = dietType;
    if (region) userData.region = region;
    if (fitnessGoal) userData.fitnessGoal = fitnessGoal;
    if (targetWeight !== undefined) userData.targetWeight = targetWeight;
    if (weeklyWeightChangeGoal !== undefined) userData.weeklyWeightChangeGoal = weeklyWeightChangeGoal;
    if (dailyCalorieGoal !== undefined) userData.dailyCalorieGoal = dailyCalorieGoal;
    if (dailyStepGoal !== undefined) userData.dailyStepGoal = dailyStepGoal;
    if (dailyWaterGoal !== undefined) userData.dailyWaterGoal = dailyWaterGoal;
    if (dailyProteinGoal !== undefined) userData.dailyProteinGoal = dailyProteinGoal;
    if (dailyCarbsGoal !== undefined) userData.dailyCarbsGoal = dailyCarbsGoal;
    if (dailyFatsGoal !== undefined) userData.dailyFatsGoal = dailyFatsGoal;
    
    const user = await User.create(userData);

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Save refresh token
    await user.update({ refreshToken });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toJSON(),
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: error.errors.map(e => e.message).join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Registration failed',
      message: 'An error occurred during registration'
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid Credentials',
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid Credentials',
        message: 'Invalid email or password'
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Update last login and save refresh token
    await user.update({ 
      lastLoginAt: new Date(),
      refreshToken 
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
      message: 'An error occurred during login'
    });
  }
});

// POST /api/auth/logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // Clear refresh token
    await req.user.update({ refreshToken: null });

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Logout failed',
      message: 'An error occurred during logout'
    });
  }
});

// POST /api/auth/refresh
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: 'Access Denied',
        message: 'Refresh token required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    
    // Find user with this refresh token
    const user = await User.findOne({
      where: {
        id: decoded.userId,
        refreshToken
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Access Denied',
        message: 'Invalid refresh token'
      });
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    // Update refresh token
    await user.update({ refreshToken: newRefreshToken });

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      success: false,
      error: 'Access Denied',
      message: 'Invalid or expired refresh token'
    });
  }
});

module.exports = router;
