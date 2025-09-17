import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import FoodLog from './pages/FoodLog';
import Activity from './pages/Activity';
import Gym from './pages/Gym';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import { selectIsAuthenticated } from './store/slices/userSlice';
import './App.css';

function AppContent() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Router basename="/CalorieFitnessTracker">
      <div className="App">
        <Routes>
          {/* Public routes - no authentication required */}
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected routes - require authentication */}
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={
                <>
                  <Navbar />
                  <main className="main-content">
                    <Dashboard />
                  </main>
                </>
              } />
              <Route path="/food" element={
                <>
                  <Navbar />
                  <main className="main-content">
                    <FoodLog />
                  </main>
                </>
              } />
              <Route path="/activity" element={
                <>
                  <Navbar />
                  <main className="main-content">
                    <Activity />
                  </main>
                </>
              } />
              <Route path="/gym" element={
                <>
                  <Navbar />
                  <main className="main-content">
                    <Gym />
                  </main>
                </>
              } />
              <Route path="/progress" element={
                <>
                  <Navbar />
                  <main className="main-content">
                    <Progress />
                  </main>
                </>
              } />
              <Route path="/profile" element={
                <>
                  <Navbar />
                  <main className="main-content">
                    <Profile />
                  </main>
                </>
              } />
            </>
          ) : (
            /* Redirect protected routes to auth if not authenticated */
            <Route path="/dashboard" element={<Navigate to="/auth" replace />} />
          )}
          
          {/* Demo route - publicly accessible */}
          <Route path="/demo" element={
            <>
              <Navbar />
              <main className="main-content">
                <Dashboard />
              </main>
            </>
          } />
          
          {/* Catch all other routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
