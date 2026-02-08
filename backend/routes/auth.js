const express = require('express');
const crypto = require('crypto');
const { User, RefreshToken } = require('../models');
const { generateAccessToken, authenticateToken } = require('../middleware/auth');
const { createCsrfToken, getCookieOptions } = require('../middleware/csrf');
const router = express.Router();

const ACCESS_TOKEN_MAX_AGE_MS = 15 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
};

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const issueCsrfCookie = (res) => {
  const token = createCsrfToken();
  res.cookie('csrfToken', token, getCookieOptions());
  return token;
};

const issueAuthCookies = (res, { accessToken, refreshToken, refreshTokenExpiresAt }) => {
  res.cookie('accessToken', accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE_MS,
  });

  if (refreshToken) {
    res.cookie('refreshToken', refreshToken, {
      ...COOKIE_OPTIONS,
      expires: refreshTokenExpiresAt,
    });
  }
};

const clearAuthCookies = (res) => {
  res.clearCookie('accessToken', COOKIE_OPTIONS);
  res.clearCookie('refreshToken', COOKIE_OPTIONS);
  res.clearCookie('csrfToken', getCookieOptions());
};

const createRefreshTokenRecord = async (userId, req) => {
  const token = crypto.randomBytes(64).toString('hex');
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS);

  const record = await RefreshToken.create({
    userId,
    tokenHash,
    issuedAt: new Date(),
    expiresAt,
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip,
  });

  return { token, expiresAt, record };
};

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
    const { token: refreshToken, expiresAt: refreshTokenExpiresAt } = await createRefreshTokenRecord(user.id, req);

    issueAuthCookies(res, { accessToken, refreshToken, refreshTokenExpiresAt });
    issueCsrfCookie(res);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toJSON()
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
    const { token: refreshToken, expiresAt: refreshTokenExpiresAt } = await createRefreshTokenRecord(user.id, req);

    // Update last login
    await user.update({ 
      lastLoginAt: new Date()
    });

    issueAuthCookies(res, { accessToken, refreshToken, refreshTokenExpiresAt });
    issueCsrfCookie(res);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON()
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
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const tokenHash = hashToken(refreshToken);
      await RefreshToken.update(
        { revokedAt: new Date() },
        { where: { tokenHash, revokedAt: null } }
      );
    }

    clearAuthCookies(res);

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
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: 'Access Denied',
        message: 'Refresh token required'
      });
    }

    const tokenHash = hashToken(refreshToken);
    const storedToken = await RefreshToken.findOne({
      where: { tokenHash },
    });

    if (!storedToken || storedToken.revokedAt) {
      return res.status(401).json({
        success: false,
        error: 'Access Denied',
        message: 'Invalid refresh token'
      });
    }

    if (storedToken.expiresAt <= new Date()) {
      await storedToken.update({ revokedAt: new Date() });
      return res.status(401).json({
        success: false,
        error: 'Access Denied',
        message: 'Invalid refresh token'
      });
    }

    const user = await User.findByPk(storedToken.userId);
    if (!user) {
      await storedToken.update({ revokedAt: new Date() });
      return res.status(401).json({
        success: false,
        error: 'Access Denied',
        message: 'Invalid refresh token'
      });
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user.id);
    const { token: newRefreshToken, expiresAt: refreshTokenExpiresAt, record } = await createRefreshTokenRecord(user.id, req);

    await storedToken.update({
      revokedAt: new Date(),
      replacedByTokenId: record.id,
    });

    issueAuthCookies(res, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      refreshTokenExpiresAt,
    });
    issueCsrfCookie(res);

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {}
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

// GET /api/auth/csrf
router.get('/csrf', (req, res) => {
  issueCsrfCookie(res);
  res.json({
    success: true,
    message: 'CSRF token issued'
  });
});

module.exports = router;
