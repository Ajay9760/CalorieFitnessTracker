import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectCurrentUser, updateUser } from '../store/slices/userSlice';
import { 
  calculateUserCaloriesAndMacros, 
  GOAL_PRESETS, 
  calculateBMI, 
  getBMICategory, 
  getTimeToGoal,
  calculateWaterIntake,
  getRecommendedProteinIntake 
} from '../utils/calorieCalculator';
import { User, CalorieCalculation, FitnessGoal } from '../types';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GoalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const GoalCard = styled.div<{ $active: boolean }>`
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid ${props => props.$active ? '#667eea' : '#e0e0e0'};
  background: ${props => props.$active ? 'rgba(102, 126, 234, 0.05)' : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  }
`;

const GoalIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const GoalName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const GoalDescription = styled.div`
  font-size: 0.875rem;
  color: #666;
  line-height: 1.4;
`;

const ResultsSection = styled.div`
  margin-top: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;

const MacrosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
`;

const MacroCard = styled.div<{ $color: string }>`
  background: ${props => props.$color};
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
`;

const MacroValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const MacroLabel = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const MacroPercentage = styled.div`
  font-size: 0.75rem;
  opacity: 0.9;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const InfoSection = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1.5rem;
`;

const InfoTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  color: #666;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
  
  &:before {
    content: "•";
    color: #667eea;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const DisclaimerSection = styled.div`
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border: 1px solid #ffeaa7;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: center;
`;

const DisclaimerIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const DisclaimerTitle = styled.h3`
  color: #856404;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const DisclaimerText = styled.p`
  color: #856404;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
`;

const CalorieCalculator: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  
  // Form state
  const [weight, setWeight] = useState(currentUser?.weight || 70);
  const [height, setHeight] = useState(currentUser?.height || 170);
  const [age, setAge] = useState(currentUser?.age || 25);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(currentUser?.gender || 'male');
  const [activityLevel, setActivityLevel] = useState(currentUser?.activityLevel || 'moderately_active');
  const [selectedGoal, setSelectedGoal] = useState<FitnessGoal>(currentUser?.fitnessGoal || 'maintain_weight');
  const [targetWeight, setTargetWeight] = useState(currentUser?.targetWeight || weight);
  
  const [calculation, setCalculation] = useState<CalorieCalculation | null>(null);

  // Calculate results whenever inputs change
  useEffect(() => {
    const mockUser: User = {
      id: currentUser?.id || 'temp',
      email: currentUser?.email || 'temp@example.com',
      name: currentUser?.name || 'User',
      age,
      gender,
      height,
      weight,
      activityLevel,
      dietType: currentUser?.dietType || 'vegetarian',
      region: currentUser?.region || 'north_indian',
      fitnessGoal: selectedGoal,
      targetWeight,
      weeklyWeightChangeGoal: GOAL_PRESETS.find(p => p.goal === selectedGoal)?.recommendedWeightChange || 0,
      dailyCalorieGoal: 2000,
      dailyStepGoal: 10000,
      dailyWaterGoal: 2000,
      dailyProteinGoal: 120,
      dailyCarbsGoal: 200,
      dailyFatsGoal: 80,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = calculateUserCaloriesAndMacros(mockUser);
    setCalculation(result);
  }, [weight, height, age, gender, activityLevel, selectedGoal, targetWeight, currentUser]);

  const handleSaveToProfile = () => {
    if (!currentUser || !calculation) return;

    const updatedUser: Partial<User> = {
      age,
      gender,
      height,
      weight,
      activityLevel,
      fitnessGoal: selectedGoal,
      targetWeight,
      weeklyWeightChangeGoal: GOAL_PRESETS.find(p => p.goal === selectedGoal)?.recommendedWeightChange || 0,
      dailyCalorieGoal: calculation.targetCalories,
      dailyProteinGoal: calculation.macros.protein.grams,
      dailyCarbsGoal: calculation.macros.carbs.grams,
      dailyFatsGoal: calculation.macros.fats.grams,
      dailyWaterGoal: calculateWaterIntake(weight, activityLevel),
      updatedAt: new Date()
    };

    dispatch(updateUser(updatedUser));
    alert('Goals updated successfully!');
  };

  const bmi = calculateBMI(weight, height);
  const bmiCategory = getBMICategory(bmi);
  const timeToGoal = getTimeToGoal(
    weight, 
    targetWeight, 
    GOAL_PRESETS.find(p => p.goal === selectedGoal)?.recommendedWeightChange || 0
  );
  const proteinRange = getRecommendedProteinIntake(selectedGoal);

  return (
    <Container>
      <Header>
        <Title>🧮 Calorie & Macro Calculator</Title>
        <Subtitle>
          Get personalized calorie and macro recommendations based on your fitness goals
        </Subtitle>
      </Header>

      <ContentGrid>
        {/* Input Section */}
        <Card>
          <CardTitle>📊 Your Information</CardTitle>
          
          <InputGroup>
            <Label>Age (years)</Label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min="13"
              max="100"
            />
          </InputGroup>

          <InputGroup>
            <Label>Gender</Label>
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </InputGroup>

          <InputGroup>
            <Label>Height (cm)</Label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min="100"
              max="250"
            />
          </InputGroup>

          <InputGroup>
            <Label>Current Weight (kg)</Label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              min="30"
              max="300"
            />
          </InputGroup>

          <InputGroup>
            <Label>Target Weight (kg)</Label>
            <Input
              type="number"
              value={targetWeight}
              onChange={(e) => setTargetWeight(Number(e.target.value))}
              min="30"
              max="300"
            />
          </InputGroup>

          <InputGroup>
            <Label>Activity Level</Label>
            <select 
              value={activityLevel} 
              onChange={(e) => setActivityLevel(e.target.value as any)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            >
              <option value="sedentary">Sedentary (Little/no exercise)</option>
              <option value="lightly_active">Lightly Active (1-3 days/week)</option>
              <option value="moderately_active">Moderately Active (3-5 days/week)</option>
              <option value="very_active">Very Active (6-7 days/week)</option>
              <option value="extra_active">Extra Active (2x/day, intense)</option>
            </select>
          </InputGroup>

          {currentUser && (
            <Button onClick={handleSaveToProfile}>
              💾 Save to Profile
            </Button>
          )}
        </Card>

        {/* Results Section */}
        <Card>
          <CardTitle>🎯 Your Goals & Results</CardTitle>
          
          <GoalsGrid>
            {GOAL_PRESETS.map((goal) => (
              <GoalCard 
                key={goal.goal}
                $active={selectedGoal === goal.goal}
                onClick={() => setSelectedGoal(goal.goal)}
              >
                <GoalIcon>{goal.icon}</GoalIcon>
                <GoalName>{goal.name}</GoalName>
                <GoalDescription>{goal.description}</GoalDescription>
              </GoalCard>
            ))}
          </GoalsGrid>

          {calculation && (
            <ResultsSection>
              <StatsGrid>
                <StatCard>
                  <StatValue>{calculation.bmr}</StatValue>
                  <StatLabel>BMR (cal/day)</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{calculation.tdee}</StatValue>
                  <StatLabel>TDEE (cal/day)</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{calculation.targetCalories}</StatValue>
                  <StatLabel>Target Calories</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue style={{ color: bmiCategory.color }}>{bmi}</StatValue>
                  <StatLabel>BMI ({bmiCategory.category})</StatLabel>
                </StatCard>
              </StatsGrid>

              <CardTitle>🥗 Daily Macro Targets</CardTitle>
              <MacrosGrid>
                <MacroCard $color="#e74c3c">
                  <MacroValue>{calculation.macros.protein.grams}g</MacroValue>
                  <MacroLabel>Protein</MacroLabel>
                  <MacroPercentage>{calculation.macros.protein.percentage}%</MacroPercentage>
                </MacroCard>
                <MacroCard $color="#f39c12">
                  <MacroValue>{calculation.macros.carbs.grams}g</MacroValue>
                  <MacroLabel>Carbs</MacroLabel>
                  <MacroPercentage>{calculation.macros.carbs.percentage}%</MacroPercentage>
                </MacroCard>
                <MacroCard $color="#9b59b6">
                  <MacroValue>{calculation.macros.fats.grams}g</MacroValue>
                  <MacroLabel>Fats</MacroLabel>
                  <MacroPercentage>{calculation.macros.fats.percentage}%</MacroPercentage>
                </MacroCard>
              </MacrosGrid>

              <InfoSection>
                <InfoTitle>📋 Key Insights</InfoTitle>
                <InfoList>
                  <InfoItem>
                    <strong>Daily calorie {calculation.calorieAdjustment > 0 ? 'surplus' : calculation.calorieAdjustment < 0 ? 'deficit' : 'maintenance'}:</strong> {Math.abs(calculation.calorieAdjustment)} calories
                  </InfoItem>
                  <InfoItem>
                    <strong>Water intake:</strong> {Math.round(calculateWaterIntake(weight, activityLevel) / 1000 * 10) / 10}L per day
                  </InfoItem>
                  <InfoItem>
                    <strong>Protein range:</strong> {proteinRange.min * weight}g - {proteinRange.max * weight}g per day
                  </InfoItem>
                  {timeToGoal.weeks > 0 && (
                    <InfoItem>
                      <strong>Time to goal:</strong> ~{timeToGoal.weeks} weeks ({timeToGoal.months} months)
                    </InfoItem>
                  )}
                  <InfoItem>
                    <strong>BMI Status:</strong> {bmiCategory.description}
                  </InfoItem>
                </InfoList>
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  background: 'rgba(255, 193, 7, 0.1)', 
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  color: '#856404',
                  textAlign: 'center'
                }}>
                  ⚠️ <strong>Note:</strong> These are estimates and may vary ±100-300 calories based on individual factors.
                </div>
              </InfoSection>
            </ResultsSection>
          )}
        </Card>
      </ContentGrid>

      <DisclaimerSection>
        <DisclaimerIcon>⚠️</DisclaimerIcon>
        <DisclaimerTitle>Important Disclaimer</DisclaimerTitle>
        <DisclaimerText>
          The values shown are estimates based on standard guidelines. Individual results may differ 
          (typically ±100–300 calories), depending on personal factors such as genetics, hormones, 
          medical conditions, and metabolic variations. These calculations are for informational purposes 
          only and should not replace professional medical or nutritional advice. Always consult with 
          a healthcare provider or registered dietitian before making significant changes to your diet 
          or exercise routine.
        </DisclaimerText>
      </DisclaimerSection>
    </Container>
  );
};

export default CalorieCalculator;