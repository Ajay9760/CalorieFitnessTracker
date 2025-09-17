const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30],
        isAlphanumeric: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 13,
        max: 100,
      },
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 100,
        max: 250,
      },
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 30,
        max: 300,
      },
    },
    activityLevel: {
      type: DataTypes.ENUM('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active'),
      allowNull: true,
      defaultValue: 'moderately_active',
    },
    dietType: {
      type: DataTypes.ENUM('vegetarian', 'vegan', 'non_veg', 'keto', 'high_protein'),
      allowNull: true,
      defaultValue: 'vegetarian',
    },
    region: {
      type: DataTypes.ENUM('north_indian', 'south_indian', 'east_indian', 'west_indian', 'all'),
      allowNull: true,
      defaultValue: 'north_indian',
    },
    fitnessGoal: {
      type: DataTypes.ENUM('lose_weight', 'maintain_weight', 'gain_weight', 'build_muscle', 'cut', 'lean_bulk'),
      allowNull: true,
      defaultValue: 'maintain_weight',
    },
    targetWeight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 30,
        max: 300,
      },
    },
    weeklyWeightChangeGoal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    dailyCalorieGoal: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2000,
    },
    dailyStepGoal: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 10000,
    },
    dailyWaterGoal: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2000,
    },
    dailyProteinGoal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 120,
    },
    dailyCarbsGoal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 200,
    },
    dailyFatsGoal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 80,
    },
    bodyFatPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    targetBodyFatPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(12);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(12);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
      {
        unique: true,
        fields: ['username'],
      },
    ],
  });

  // Instance methods
  User.prototype.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.toJSON = function() {
    const values = { ...this.get() };
    delete values.password;
    delete values.refreshToken;
    return values;
  };

  return User;
};