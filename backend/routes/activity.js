const express = require('express');
const router = express.Router();
const { ActivityEntry } = require('../models');
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

const normalizeDate = (value) => {
  const parsed = value ? new Date(value) : new Date();
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString().slice(0, 10);
  return parsed.toISOString().slice(0, 10);
};

// GET /api/activities - list activities by date range
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, limit = 30, offset = 0 } = req.query;

    const whereClause = { userId: req.user.id };
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date[Op.gte] = normalizeDate(startDate);
      if (endDate) whereClause.date[Op.lte] = normalizeDate(endDate);
    }

    const activities = await ActivityEntry.findAll({
      where: whereClause,
      order: [['date', 'DESC']],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    const total = await ActivityEntry.count({ where: whereClause });

    res.json({
      success: true,
      message: 'Activities retrieved',
      data: {
        activities,
        pagination: {
          total,
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          hasMore: parseInt(offset, 10) + parseInt(limit, 10) < total,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'activity operation failed',
      message: error.message,
    });
  }
});

// GET /api/activities/daily-summary?date=YYYY-MM-DD
router.get('/daily-summary', async (req, res) => {
  try {
    const date = normalizeDate(req.query.date);
    const activity = await ActivityEntry.findOne({
      where: {
        userId: req.user.id,
        date,
      },
    });

    res.json({
      success: true,
      message: 'Daily activity summary',
      data: { activity },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'activity operation failed',
      message: error.message,
    });
  }
});

// POST /api/activities - create or update daily activity entry
router.post('/', async (req, res) => {
  try {
    const {
      date,
      steps = 0,
      distance = 0,
      caloriesBurned = 0,
      activeMinutes = 0,
      source = 'manual',
      exercises = [],
      heartRate,
      waterIntake = 0,
      notes,
    } = req.body;

    const entryDate = normalizeDate(date);

    const [activity, created] = await ActivityEntry.upsert(
      {
        userId: req.user.id,
        date: entryDate,
        steps,
        distance,
        caloriesBurned,
        activeMinutes,
        source,
        exercises,
        heartRate,
        waterIntake,
        notes,
      },
      { returning: true }
    );

    res.status(created ? 201 : 200).json({
      success: true,
      message: created ? 'Activity logged' : 'Activity updated',
      data: { activity: activity[0] || activity },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'activity operation failed',
      message: error.message,
    });
  }
});

// DELETE /api/activities/:id - delete activity entry
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ActivityEntry.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Activity entry not found',
      });
    }

    res.json({
      success: true,
      message: 'Activity entry deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'activity operation failed',
      message: error.message,
    });
  }
});

module.exports = router;
