import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%, #f093fb 200%);
  padding: 1rem 2rem;
  color: white;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(45deg, #ffd700, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: glow 2s ease-in-out infinite alternate;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @keyframes glow {
    from {
      text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
    }
    to {
      text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  color: ${props => props.$isActive ? '#ffd700' : 'white'};
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffd700;
  }

  @media (max-width: 768px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
  }
`;

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <NavContainer>
      <NavContent>
        <Logo>🍽️ Calorie Tracker</Logo>
        <NavLinks>
          <NavLink to="/dashboard" $isActive={isActive('/dashboard')}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/food" $isActive={isActive('/food')}>
            🍛 Food Log
          </NavLink>
          <NavLink to="/activity" $isActive={isActive('/activity')}>
            🏃 Activity
          </NavLink>
          <NavLink to="/progress" $isActive={isActive('/progress')}>
            📈 Progress
          </NavLink>
          <NavLink to="/profile" $isActive={isActive('/profile')}>
            👤 Profile
          </NavLink>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;