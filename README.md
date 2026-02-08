# 🍎 Calorie Fitness Tracker


A comprehensive fitness and nutrition tracking application with both **React Native mobile app** and **React web interface**. Track your daily calorie intake, monitor fitness activities, and achieve your health goals with our extensive Indian food database.
Website URL:https://ajay9760.github.io/CalorieFitnessTracker/

## 🌟 Features

### 📱 Mobile App (React Native)
- **Dashboard** - Overview of daily nutrition and fitness stats
- **Food Logging** - Search and log meals from extensive Indian food database
- **Activity Tracking** - Record workouts and physical activities
- **Progress Monitoring** - Visual charts and progress tracking
- **User Profile** - Personal settings and goals management

### 💻 Web App (React)
- **Responsive Design** - Works on all screen sizes
- **Real-time Sync** - Data synchronization across platforms
- **Advanced Analytics** - Detailed nutrition and fitness insights
- **Multi-device Support** - Access from any browser

### 🥗 Indian Food Database
- **1000+ Food Items** - Comprehensive database of Indian foods
- **Regional Cuisines** - North, South, East, and West Indian dishes
- **Detailed Nutrition** - Calories, macros, vitamins, and minerals
- **Multiple Serving Sizes** - Flexible portion tracking
- **Hindi Names** - Local language support

## 🏗️ Technology Stack

### Frontend
- **React Native** - Mobile app development
- **React** - Web application
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **React Navigation** - Mobile navigation
- **Recharts** - Data visualization

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **RESTful APIs** - Clean API architecture

### Tools & Libraries
- **AsyncStorage** - Local data persistence
- **React Hook Form** - Form management
- **Date-fns** - Date utilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- React Native development environment (for mobile)
- Android Studio / Xcode (for mobile testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ajay9760/CalorieFitnessTracker.git
   cd CalorieFitnessTracker
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Set up the web app**
   ```bash
   cd web
   npm install
   npm start
   ```

4. **Set up the mobile app**
   ```bash
   # From root directory
   npm install
   npx react-native run-android  # For Android
   npx react-native run-ios      # For iOS
   ```

5. **Set up the backend** (optional)
   ```bash
   cd backend
   npm install
   npm start
   ```

## 📁 Project Structure

```
CalorieFitnessTracker/
├── 📱 Mobile App (React Native)
│   ├── src/
│   │   ├── screens/          # App screens
│   │   ├── navigation/       # Navigation setup
│   │   ├── store/           # Redux store
│   │   ├── data/            # Food database
│   │   └── types/           # TypeScript definitions
│   └── App.tsx
│
├── 💻 Web App (React)
│   ├── public/
│   ├── src/
│   │   ├── pages/           # Web pages
│   │   ├── components/      # Reusable components
│   │   ├── store/          # Redux store
│   │   └── data/           # Food database
│   └── package.json
│
├── 🔧 Backend (Node.js)
│   ├── routes/             # API routes
│   ├── models/            # Data models
│   └── server.js
│
└── 📚 Documentation
    └── README.md
```

## 🎯 Key Functionalities

### Nutrition Tracking
- Search from 1000+ Indian foods
- Log meals with accurate portions
- Track macronutrients (protein, carbs, fats)
- Monitor micronutrients and vitamins
- Set and track daily calorie goals

### Activity Monitoring
- Log various physical activities
- Track calories burned
- Monitor workout duration and intensity
- View activity history and trends

### Progress Analytics
- Visual charts and graphs
- Weight tracking over time
- Nutrition goal achievement
- Activity performance metrics
- Weekly and monthly summaries

### User Experience
- Intuitive and clean interface
- Fast search and autocomplete
- Offline data storage
- Cross-platform synchronization
- Customizable user preferences

## 🛠️ Development

### Adding New Foods
Foods are stored in `src/data/indianFoodDatabase.ts`. To add new items:

```typescript
{
  id: 'unique-food-id',
  name: 'Food Name',
  nameHindi: 'हिंदी नाम',
  category: 'food_category',
  region: ['north_indian', 'south_indian'],
  calories: 250,
  macros: {
    protein: 10.5,
    carbs: 45.2,
    fats: 8.1,
    fiber: 3.2,
    sugar: 5.0,
    sodium: 150
  },
  servingSizes: [
    { unit: 'cup', grams: 200, description: '1 cup' }
  ],
  isCommonDish: true,
  tags: ['vegetarian', 'healthy']
}
```

### Running Tests
```bash
# Web app tests
cd web
npm test

# Mobile app tests (from root)
npm test
```

## 🚀 Deployment Guide

### 1) Backend (Node/Express API)
**Required env vars (example):**
```bash
JWT_SECRET=your_long_random_secret
CORS_ORIGIN=https://your-web-domain.com
PORT=3001
OPENAI_API_KEY=your_openai_key # optional, enables AI food photo scanning
OPENAI_VISION_MODEL=gpt-4o-mini # optional override
```

**Steps:**
```bash
cd backend
npm install
npm start
```

**Notes:**
- The API uses cookie-based auth + CSRF, so the frontend and backend must share a top-level domain (or configure proper CORS/credentials). The server already enables cookies + CORS credentials. 
- In production you must serve the backend over HTTPS so secure cookies are accepted by browsers.
- AI photo scanning is optional and only enabled when `OPENAI_API_KEY` is set.

### 2) Web App (React)
**Local dev:**
```bash
cd web
npm install
npm start
```

**Production build:**
```bash
cd web
npm run build
```

**API URL:**
Set `REACT_APP_API_URL` to point the web app at your backend:
```bash
export REACT_APP_API_URL=https://api.your-domain.com
```

### 3) GitHub Pages (optional)
This repo includes `gh-pages` tooling in `web/package.json`. To publish:
```bash
cd web
npm run build
npm run deploy
```

Make sure the backend is hosted separately (e.g., Render, Railway, Fly.io) and `REACT_APP_API_URL` points to it.

## 📊 Features in Development

- [ ] Meal planning and recipes
- [ ] Social sharing and community features
- [ ] Integration with fitness wearables
- [ ] AI-powered nutrition recommendations
- [ ] Barcode scanning for packaged foods
- [ ] Restaurant menu integration

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ajay** - [@Ajay9760](https://github.com/Ajay9760)

## 📧 Support

If you have any questions or need support, please open an issue on GitHub or contact the maintainer.

## 🙏 Acknowledgments

- Indian food nutritional data compiled from various authentic sources
- UI/UX inspiration from leading fitness applications
- Open source community for excellent libraries and tools

---

⭐ **Star this repository if you find it helpful!** ⭐
