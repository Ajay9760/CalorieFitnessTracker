const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ActivityEntry = sequelize.define('ActivityEntry', {
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    steps: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
      comment: 'Distance in kilometers',
    },
    caloriesBurned: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    activeMinutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    source: {
      type: DataTypes.ENUM('manual', 'google_fit', 'apple_health', 'device_sensor', 'estimated'),
      allowNull: true,
      defaultValue: 'manual',
    },
    exercises: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: 'Array of exercise objects with name, duration, calories',
    },
    heartRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 30,
        max: 250,
      },
      comment: 'Average heart rate for the day',
    },
    waterIntake: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
      },
      comment: 'Water intake in ml',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    indexes: [
      {
        fields: ['userId', 'date'],
        unique: true,
      },
      {
        fields: ['date'],
      },
      {
        fields: ['userId'],
      },
    ],
  });

  return ActivityEntry;
};