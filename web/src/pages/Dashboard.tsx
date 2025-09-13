import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  text-align: center;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
    background-size: 200% 100%;
    animation: slideGradient 3s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.25);
  }

  @keyframes slideGradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const StatValue = styled.div`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const StatLabel = styled.div`
  color: #555;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
`;

const WelcomeMessage = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%, #f093fb 200%);
  color: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: rotate 10s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  h1 {
    position: relative;
    z-index: 1;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    position: relative;
    z-index: 1;
    font-size: 1.2rem;
  }
`;

const Dashboard: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { todaysMeals } = useSelector((state: RootState) => state.meals);
  const { todaysActivity } = useSelector((state: RootState) => state.activities);

  // Calculate today's totals
  const todaysCalories = todaysMeals.reduce((total, meal) => total + meal.calories, 0);
  const todaysProtein = todaysMeals.reduce((total, meal) => total + meal.macros.protein, 0);
  const todaysSteps = todaysActivity?.steps || 0;
  const caloriesBurned = todaysActivity?.caloriesBurned || 0;

  return (
    <Container>
      <WelcomeMessage>
        <h1>नमस्ते! Welcome to your Health Dashboard</h1>
        <p>Track your Indian food journey and stay healthy! 🇮🇳</p>
      </WelcomeMessage>

      <Header>Today's Overview</Header>
      
      <StatsGrid>
        <StatCard>
          <StatValue>{todaysCalories}</StatValue>
          <StatLabel>Calories Consumed</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{caloriesBurned}</StatValue>
          <StatLabel>Calories Burned</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{todaysProtein.toFixed(1)}g</StatValue>
          <StatLabel>Protein Intake</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{todaysSteps.toLocaleString()}</StatValue>
          <StatLabel>Steps Taken</StatLabel>
        </StatCard>
      </StatsGrid>

      {todaysMeals.length === 0 && (
        <StatCard>
          <h3>🍛 Ready to log your first meal?</h3>
          <p>Start tracking your Indian food journey! Click on "Food Log" to add your breakfast, lunch, or dinner.</p>
          <p><strong>Featured today:</strong> Dal, Roti, Rice, Sabzi and more Indian favorites!</p>
        </StatCard>
      )}
    </Container>
  );
};

export default Dashboard;