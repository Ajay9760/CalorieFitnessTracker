# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Calorie & Fitness Tracker** React Native application focused on Indian food and nutrition tracking. The app consists of a React Native frontend with TypeScript and a Node.js/Express backend with MySQL database using Sequelize ORM.

### Key Features
- Calorie and nutrition tracking with comprehensive Indian food database
- Activity and step tracking with sensor integration
- Progress visualization with charts
- User profiles with Indian dietary preferences (vegetarian, vegan, non-veg, keto, high-protein)
- Regional food categorization (North, South, East, West Indian)
- Gamification with badges and achievements
- Water intake tracking

## Development Commands

### Frontend (React Native)
```bash
# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (requires macOS)
npm run ios

# Run tests
npm test

# Lint code
npm run lint
```

### iOS-specific setup (first time only)
```bash
# Install Ruby dependencies
bundle install

# Install CocoaPods dependencies
bundle exec pod install
```

### Backend API
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server with nodemon
npm run dev

# Start production server
npm start

# Initialize database
npm run init-db
```

### Testing
```bash
# Run Jest tests for React Native components
npm test

# Run specific test file
npm test -- App.test.tsx

# Run tests in watch mode
npm test -- --watch
```

## Architecture Overview

### Frontend Structure
- **Redux Store**: Centralized state management with Redux Toolkit
  - `userSlice`: User profile, preferences, goals
  - `mealSlice`: Food logging, meal entries
  - `activitySlice`: Step tracking, exercise data
  - `progressSlice`: Charts, analytics, streaks

- **Navigation**: React Navigation with bottom tabs
  - Dashboard, FoodLog, Activity, Progress, Profile screens
  - Stack navigation for modal screens (FoodSearch, FoodDetail, Camera)

- **Key Directories**:
  - `src/screens/`: Main app screens
  - `src/store/`: Redux store and slices
  - `src/types/`: TypeScript type definitions
  - `src/data/`: Indian food database with nutritional data
  - `src/services/`: Storage and API services
  - `src/utils/`: Calculation utilities for BMR, calories, etc.

### Backend Structure
- **Express.js API** with the following route structure (based on server.js imports):
  - `/api/auth`: Authentication (JWT)
  - `/api/user`: User profile management
  - `/api/foods`: Food database and search
  - `/api/meals`: Meal logging and tracking
  - `/api/activities`: Activity and step tracking
  - `/api/progress`: Analytics and progress data
  - `/api/water`: Water intake tracking
  - `/api/insights`: Personalized suggestions
  - `/api/badges`, `/api/achievements`, `/api/stats`: Gamification

- **Database**: MySQL with Sequelize ORM
- **Security**: Helmet, CORS, rate limiting, JWT authentication

### Core Data Models
Key TypeScript interfaces define the app's data structure:

- **User**: Comprehensive profile including Indian dietary preferences, regional food preferences, BMR calculations
- **FoodItem**: Extensive Indian food database with Hindi names, regional categorization, serving sizes (katori, roti, cup, etc.)
- **MealEntry**: Food logging with macro tracking
- **ActivityEntry**: Step and calorie burn tracking from multiple sources (sensors, Google Fit, Apple Health)
- **Progress**: Daily tracking with streaks and achievements

### Indian Food Database
The app includes a comprehensive database (`src/data/indianFoodDatabase.ts`) with:
- Regional categorization (North, South, East, West Indian)
- Hindi names for foods
- Traditional serving sizes (katori, roti, piece, cup)
- Macro and micronutrient data
- Common Indian dishes (dal, sabzi, idli, dosa, etc.)

## Key Technologies
- **Frontend**: React Native 0.81.1, TypeScript, Redux Toolkit
- **Navigation**: React Navigation (stack + bottom tabs)
- **Charts**: react-native-chart-kit for progress visualization
- **Sensors**: react-native-sensors for step tracking
- **Storage**: AsyncStorage for offline data
- **Camera**: react-native-image-picker for food photos
- **Icons**: react-native-vector-icons (MaterialCommunityIcons)

- **Backend**: Node.js, Express.js, MySQL, Sequelize ORM
- **Security**: bcryptjs, jsonwebtoken, helmet, rate limiting

## Development Notes

### Regional and Cultural Considerations
- All food items support Hindi translations
- Serving sizes use Indian measurements (katori, roti sizes)
- Regional food categorization is central to the user experience
- Dietary preferences include Indian-specific options (vegetarian vs. vegan distinctions)

### Performance Considerations
- Food database is loaded locally for offline functionality
- Images are handled via react-native-image-picker
- Sensor data integration for automatic step tracking
- Chart rendering uses react-native-svg for performance

### Testing Strategy
- Jest configuration for React Native testing
- Component tests in `__tests__/` directory
- Focus on Redux slice testing and calculation utilities

### Database Development
- Sequelize auto-sync in development mode
- Migration scripts in backend for schema updates
- Health check endpoint at `/health` for API status

### Security Implementation
- JWT token-based authentication
- Rate limiting (100 requests per 15 minutes)
- Helmet for security headers
- Input validation and sanitization
- Environment-based configuration with dotenv
