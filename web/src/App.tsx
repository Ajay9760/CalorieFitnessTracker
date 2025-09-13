import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store';
import Dashboard from './pages/Dashboard';
import FoodLog from './pages/FoodLog';
import Activity from './pages/Activity';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import { selectIsAuthenticated } from './store/slices/userSlice';
import './App.css';

function AppContent() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // If not authenticated, show only the auth page
  if (!isAuthenticated) {
    return (
      <Router>
        <div className="App">
          <main className="full-content">
            <Auth />
          </main>
        </div>
      </Router>
    );
  }

  // If authenticated, show the main app with navbar
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/food" element={<FoodLog />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            {/* Redirect any unknown routes to dashboard when authenticated */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
