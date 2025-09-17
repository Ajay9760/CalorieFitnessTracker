const express = require('express');
const { FoodItem } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { Op } = require('sequelize');
const router = express.Router();

// GET /api/foods/search - Search for food items
router.get('/search', async (req, res) => {
  try {
    const { q, category, region, limit = 20, offset = 0 } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Search query must be at least 2 characters long'
      });
    }

    const whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${q}%` } },
        { nameHindi: { [Op.like]: `%${q}%` } },
        { tags: { [Op.like]: `%${q}%` } }
      ]
    };

    // Add category filter if provided
    if (category) {
      whereClause.category = category;
    }

    // Add region filter if provided
    if (region && region !== 'all') {
      whereClause.region = { [Op.like]: `%${region}%` };
    }

    const foods = await FoodItem.findAll({
      where: whereClause,
      order: [
        ['isCommonDish', 'DESC'], // Common dishes first
        ['name', 'ASC']
      ],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    // Get total count for pagination
    const totalCount = await FoodItem.count({ where: whereClause });

    res.json({
      success: true,
      message: `Found ${foods.length} food items`,
      data: {
        foods,
        pagination: {
          total: totalCount,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: parseInt(offset) + parseInt(limit) < totalCount
        }
      }
    });
  } catch (error) {
    console.error('Food search error:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed',
      message: 'An error occurred while searching for foods'
    });
  }
});

// GET /api/foods/popular - Get popular/common foods
router.get('/popular', async (req, res) => {
  try {
    const { region, limit = 10 } = req.query;

    const whereClause = {
      isCommonDish: true,
      isVerified: true
    };

    if (region && region !== 'all') {
      whereClause.region = { [Op.like]: `%${region}%` };
    }

    const foods = await FoodItem.findAll({
      where: whereClause,
      order: [['name', 'ASC']],
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      message: `Found ${foods.length} popular foods`,
      data: {
        foods
      }
    });
  } catch (error) {
    console.error('Popular foods error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get popular foods',
      message: 'An error occurred while retrieving popular foods'
    });
  }
});

// GET /api/foods/categories - Get all food categories
router.get('/categories', async (req, res) => {
  try {
    const categories = [
      { key: 'grains', name: 'Grains & Cereals', nameHindi: 'अनाज' },
      { key: 'vegetables', name: 'Vegetables', nameHindi: 'सब्जियां' },
      { key: 'fruits', name: 'Fruits', nameHindi: 'फल' },
      { key: 'dairy', name: 'Dairy', nameHindi: 'डेयरी' },
      { key: 'meat_fish', name: 'Meat & Fish', nameHindi: 'मांस और मछली' },
      { key: 'legumes', name: 'Legumes', nameHindi: 'दालें' },
      { key: 'pulses', name: 'Pulses', nameHindi: 'दलहन' },
      { key: 'nuts_seeds', name: 'Nuts & Seeds', nameHindi: 'मेवे और बीज' },
      { key: 'beverages', name: 'Beverages', nameHindi: 'पेय पदार्थ' },
      { key: 'sweets', name: 'Sweets', nameHindi: 'मिठाई' },
      { key: 'snacks', name: 'Snacks', nameHindi: 'नाश्ता' },
      { key: 'spices', name: 'Spices', nameHindi: 'मसाले' },
      { key: 'oils_fats', name: 'Oils & Fats', nameHindi: 'तेल और घी' },
      { key: 'prepared_dishes', name: 'Prepared Dishes', nameHindi: 'तैयार व्यंजन' },
      { key: 'herbs', name: 'Herbs', nameHindi: 'जड़ी-बूटियां' }
    ];

    res.json({
      success: true,
      message: 'Food categories retrieved successfully',
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get categories',
      message: 'An error occurred while retrieving food categories'
    });
  }
});

// GET /api/foods/:id - Get specific food item by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const food = await FoodItem.findByPk(id);
    if (!food) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Food item not found'
      });
    }

    res.json({
      success: true,
      message: 'Food item retrieved successfully',
      data: {
        food
      }
    });
  } catch (error) {
    console.error('Get food error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get food item',
      message: 'An error occurred while retrieving the food item'
    });
  }
});

// POST /api/foods - Add new food item (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      name, nameHindi, category, region, calories, protein, carbs, fats,
      fiber, sugar, sodium, servingSizes, tags, imageUrl, barcode
    } = req.body;

    // Basic validation
    if (!name || !category || !calories) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Name, category, and calories are required'
      });
    }

    // Check if food with same name already exists
    const existingFood = await FoodItem.findOne({ where: { name } });
    if (existingFood) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate Entry',
        message: 'A food item with this name already exists'
      });
    }

    const food = await FoodItem.create({
      name, nameHindi, category, region, calories, protein, carbs, fats,
      fiber, sugar, sodium, servingSizes, tags, imageUrl, barcode,
      isVerified: false, // User-submitted items need verification
      source: 'user_submitted'
    });

    res.status(201).json({
      success: true,
      message: 'Food item added successfully',
      data: {
        food
      }
    });
  } catch (error) {
    console.error('Add food error:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: error.errors.map(e => e.message).join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to add food item',
      message: 'An error occurred while adding the food item'
    });
  }
});

module.exports = router;
