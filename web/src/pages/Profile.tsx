import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectCurrentUser, updateUser } from '../store/slices/userSlice';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProfileTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const CardTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 1.125rem;
  color: #333;
  font-weight: 600;
`;

const EditButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #5a6fd8;
  }
`;

const StatsCard = styled(ProfileCard)`
  grid-column: 1 / -1;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
`;

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [isEditing, setIsEditing] = useState(false);

  if (!currentUser) {
    return (
      <Container>
        <ProfileCard>
          <h2>⚠️ No User Data</h2>
          <p>Please log in to view your profile information.</p>
        </ProfileCard>
      </Container>
    );
  }

  const formatActivityLevel = (level: string) => {
    const levels: { [key: string]: string } = {
      'sedentary': 'Sedentary',
      'lightly_active': 'Lightly Active',
      'moderately_active': 'Moderately Active',
      'very_active': 'Very Active',
      'extra_active': 'Extra Active'
    };
    return levels[level] || level;
  };

  const formatDietType = (diet: string) => {
    const diets: { [key: string]: string } = {
      'vegetarian': 'Vegetarian',
      'vegan': 'Vegan',
      'non_veg': 'Non-Vegetarian',
      'keto': 'Ketogenic',
      'high_protein': 'High Protein'
    };
    return diets[diet] || diet;
  };

  const formatRegion = (region: string) => {
    const regions: { [key: string]: string } = {
      'north_indian': 'North Indian',
      'south_indian': 'South Indian',
      'east_indian': 'East Indian',
      'west_indian': 'West Indian',
      'all': 'All Regions'
    };
    return regions[region] || region;
  };

  const formatFitnessGoal = (goal: string) => {
    const goals: { [key: string]: string } = {
      'lose_weight': 'Weight Loss',
      'maintain_weight': 'Weight Maintenance',
      'gain_weight': 'Weight Gain',
      'build_muscle': 'Muscle Building',
      'cut': 'Cutting (Bodybuilding)',
      'lean_bulk': 'Lean Bulk'
    };
    return goals[goal] || goal;
  };

  return (
    <Container>
      <ProfileHeader>
        <ProfileTitle>👤 {currentUser.name}</ProfileTitle>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '0.5rem' }}>@{currentUser.username}</p>
        <p>Member since {new Date(currentUser.createdAt).toLocaleDateString()}</p>
      </ProfileHeader>

      <ProfileGrid>
        <ProfileCard>
          <CardTitle>📋 Basic Information</CardTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Username</InfoLabel>
              <InfoValue>@{currentUser.username}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{currentUser.email}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Age</InfoLabel>
              <InfoValue>{currentUser.age} years</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Gender</InfoLabel>
              <InfoValue>{currentUser.gender.charAt(0).toUpperCase() + currentUser.gender.slice(1)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Region</InfoLabel>
              <InfoValue>{formatRegion(currentUser.region)}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </ProfileCard>

        <ProfileCard>
          <CardTitle>🏃‍♂️ Physical Stats</CardTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Height</InfoLabel>
              <InfoValue>{currentUser.height} cm</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Weight</InfoLabel>
              <InfoValue>{currentUser.weight} kg</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Activity Level</InfoLabel>
              <InfoValue>{formatActivityLevel(currentUser.activityLevel)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Diet Type</InfoLabel>
              <InfoValue>{formatDietType(currentUser.dietType)}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </ProfileCard>
      </ProfileGrid>

        <StatsCard>
          <CardTitle>🎯 Fitness Goals</CardTitle>
          <div style={{ marginBottom: '1.5rem' }}>
            <EditButton onClick={() => navigate('/calculator')}>
              🧮 Update Goals & Macros
            </EditButton>
          </div>
          <InfoGrid style={{ marginBottom: '2rem' }}>
            <InfoItem>
              <InfoLabel>Current Goal</InfoLabel>
              <InfoValue>{formatFitnessGoal(currentUser.fitnessGoal || 'maintain_weight')}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Target Weight</InfoLabel>
              <InfoValue>{currentUser.targetWeight || currentUser.weight} kg</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Weekly Change Goal</InfoLabel>
              <InfoValue>{currentUser.weeklyWeightChangeGoal ? `${currentUser.weeklyWeightChangeGoal > 0 ? '+' : ''}${currentUser.weeklyWeightChangeGoal} kg/week` : 'Maintain'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>BMI</InfoLabel>
              <InfoValue>{Math.round((currentUser.weight / ((currentUser.height / 100) ** 2)) * 10) / 10}</InfoValue>
            </InfoItem>
          </InfoGrid>
          
          <StatsGrid>
            <StatItem>
              <StatNumber>{currentUser.dailyCalorieGoal}</StatNumber>
              <StatLabel>Daily Calories</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{currentUser.dailyStepGoal.toLocaleString()}</StatNumber>
              <StatLabel>Daily Steps</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{currentUser.dailyWaterGoal / 1000}L</StatNumber>
              <StatLabel>Daily Water</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsCard>
        
        <StatsCard>
          <CardTitle>🥗 Daily Macro Targets</CardTitle>
          <StatsGrid style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <StatItem style={{ background: '#e74c3c', color: 'white' }}>
              <StatNumber>{currentUser.dailyProteinGoal || 120}g</StatNumber>
              <StatLabel>Protein</StatLabel>
            </StatItem>
            <StatItem style={{ background: '#f39c12', color: 'white' }}>
              <StatNumber>{currentUser.dailyCarbsGoal || 200}g</StatNumber>
              <StatLabel>Carbohydrates</StatLabel>
            </StatItem>
            <StatItem style={{ background: '#9b59b6', color: 'white' }}>
              <StatNumber>{currentUser.dailyFatsGoal || 80}g</StatNumber>
              <StatLabel>Fats</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsCard>
    </Container>
  );
};

export default Profile;
