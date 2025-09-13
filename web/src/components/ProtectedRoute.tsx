import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/userSlice';
import Auth from '../pages/Auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;