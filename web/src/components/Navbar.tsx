import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logoutUser, selectCurrentUser } from '../store/slices/userSlice';

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
    display: none;
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

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

const UserEmail = styled.span`
  font-size: 0.75rem;
  opacity: 0.8;
`;

const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
  }
`;

const MoreMenu = styled.div`
  position: relative;
`;

const MoreButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const MoreDropdown = styled.div<{ $open: boolean }>`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: white;
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: ${props => props.$open ? 'flex' : 'none'};
  flex-direction: column;
  min-width: 160px;
  z-index: 1200;
`;

const MoreItem = styled(Link)`
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  font-weight: 500;

  &:hover {
    background: #f4f5ff;
  }
`;

const MobileNav = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid rgba(102, 126, 234, 0.2);
  padding: 0.75rem 1rem;
  z-index: 1100;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    gap: 0.5rem;
  }
`;

const MobileNavLink = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  color: ${props => props.$isActive ? '#667eea' : '#666'};
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const Navbar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <NavContainer>
      <NavContent>
        <Logo as={Link} to="/dashboard" aria-label="Go to dashboard">
          🍽️ Calorie Tracker
        </Logo>
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
          
          <UserSection>
            <MoreMenu>
              <MoreButton
                type="button"
                aria-haspopup="true"
                aria-expanded={isMoreOpen}
                onClick={() => setIsMoreOpen(prev => !prev)}
              >
                ⋯ More
              </MoreButton>
              <MoreDropdown $open={isMoreOpen} role="menu">
                <MoreItem to="/gym" onClick={() => setIsMoreOpen(false)}>
                  🏋️‍♂️ Gym
                </MoreItem>
                <MoreItem to="/calculator" onClick={() => setIsMoreOpen(false)}>
                  🧮 Calculator
                </MoreItem>
              </MoreDropdown>
            </MoreMenu>
            {currentUser ? (
              <>
              <UserInfo>
                <UserName>👋 @{currentUser.username}</UserName>
                <UserEmail>{currentUser.name}</UserEmail>
              </UserInfo>
              <LogoutButton onClick={handleLogout}>
                🚪 Logout
              </LogoutButton>
              </>
            ) : null}
          </UserSection>
        </NavLinks>
      </NavContent>
      <MobileNav aria-label="Primary">
        <MobileNavLink to="/dashboard" $isActive={isActive('/dashboard')} aria-label="Dashboard">
          📊
          <span>Dashboard</span>
        </MobileNavLink>
        <MobileNavLink to="/food" $isActive={isActive('/food')} aria-label="Food Log">
          🍛
          <span>Food</span>
        </MobileNavLink>
        <MobileNavLink to="/activity" $isActive={isActive('/activity')} aria-label="Activity">
          🏃
          <span>Activity</span>
        </MobileNavLink>
        <MobileNavLink to="/progress" $isActive={isActive('/progress')} aria-label="Progress">
          📈
          <span>Progress</span>
        </MobileNavLink>
        <MobileNavLink to="/profile" $isActive={isActive('/profile')} aria-label="Profile">
          👤
          <span>Profile</span>
        </MobileNavLink>
      </MobileNav>
    </NavContainer>
  );
};

export default Navbar;
