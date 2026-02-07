import React, { Suspense, lazy } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store';
import Navbar from './components/Navbar';
import { selectIsAuthenticated } from './store/slices/userSlice';
import './App.css';

const Homepage = lazy(() => import('./pages/Homepage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const FoodLog = lazy(() => import('./pages/FoodLog'));
const Activity = lazy(() => import('./pages/Activity'));
const Gym = lazy(() => import('./pages/Gym'));
const Progress = lazy(() => import('./pages/Progress'));
const Profile = lazy(() => import('./pages/Profile'));
const Auth = lazy(() => import('./pages/Auth'));
const CalorieCalculator = lazy(() => import('./pages/CalorieCalculator'));

const AppLoader = () => (
  <div className="app-loader" role="status" aria-live="polite">
    <div className="app-loader__spinner" />
    <p>Loading your dashboard…</p>
  </div>
);

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar />
    <main id="main-content" className="main-content">
      {children}
    </main>
  </>
);

function AppContent() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Router basename="/CalorieFitnessTracker">
      <div className="App">
        <Suspense fallback={<AppLoader />}>
          <Routes>
            {/* Public routes - no authentication required */}
            <Route path="/" element={<Homepage />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes - require authentication */}
            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                } />
                <Route path="/food" element={
                  <AppLayout>
                    <FoodLog />
                  </AppLayout>
                } />
                <Route path="/activity" element={
                  <AppLayout>
                    <Activity />
                  </AppLayout>
                } />
                <Route path="/gym" element={
                  <AppLayout>
                    <Gym />
                  </AppLayout>
                } />
                <Route path="/progress" element={
                  <AppLayout>
                    <Progress />
                  </AppLayout>
                } />
                <Route path="/profile" element={
                  <AppLayout>
                    <Profile />
                  </AppLayout>
                } />
                <Route path="/calculator" element={
                  <AppLayout>
                    <CalorieCalculator />
                  </AppLayout>
                } />
              </>
            ) : (
              /* Redirect protected routes to auth if not authenticated */
              <Route path="/dashboard" element={<Navigate to="/auth" replace />} />
            )}
            
            {/* Demo route - publicly accessible */}
            <Route path="/demo" element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } />
            
            {/* Catch all other routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
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
