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
  padding: 4rem;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
    font-weight: 800;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  }

  p {
    position: relative;
    z-index: 1;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    opacity: 0.95;
  }
`;

const FitnessQuote = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const QuoteText = styled.blockquote`
  font-size: 1.4rem;
  font-style: italic;
  margin: 0 0 1rem 0;
  line-height: 1.6;
  font-weight: 300;
  
  &::before {
    content: '"';
    font-size: 2rem;
    opacity: 0.7;
  }
  
  &::after {
    content: '"';
    font-size: 2rem;
    opacity: 0.7;
  }
`;

const QuoteAuthor = styled.cite`
  font-size: 1rem;
  opacity: 0.8;
  font-weight: 500;
  
  &::before {
    content: '— ';
  }
`;

const FitnessEmojis = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  z-index: 1;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const HeroStats = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const HeroStatCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const HeroStatValue = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const HeroStatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MotivationalSection = styled.div`
  margin-top: 2rem;
`;

const MotivationalCard = styled.div`
  background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 50%, #e17055 100%);
  color: #2d3436;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(253, 203, 110, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shine 3s infinite;
  }
  
  @keyframes shine {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  h3 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6;
    opacity: 0.9;
  }
`;

const MotivationalStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 2rem 0;
  
  div {
    text-align: center;
    
    strong {
      display: block;
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      color: #2d3436;
    }
    
    span {
      font-size: 1rem;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const CallToAction = styled.div`
  background: rgba(45, 52, 54, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 1.5rem;
  border: 2px dashed rgba(45, 52, 54, 0.3);
`;

const MealSummaryCard = styled.div`
  background: linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%);
  color: #2d3436;
  padding: 2.5rem;
  border-radius: 20px;
  margin-top: 2rem;
  box-shadow: 0 10px 25px rgba(168, 230, 207, 0.3);
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #00b894;
  }
`;

const MealsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const MealItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  padding: 1rem;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

const MealIcon = styled.div`
  font-size: 2rem;
  margin-right: 1rem;
`;

const MealInfo = styled.div`
  flex: 1;
`;

const MealName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: #2d3436;
`;

const MealDetails = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  color: #636e72;
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

  // Fitness quotes array
  const fitnessQuotes = [
    {
      text: "Health is not about the weight you lose, but about the life you gain.",
      author: "Dr. Josh Axe"
    },
    {
      text: "Take care of your body. It's the only place you have to live.",
      author: "Jim Rohn"
    },
    {
      text: "A healthy outside starts from the inside.",
      author: "Robert Urich"
    },
    {
      text: "Fitness is not about being better than someone else. It's about being better than you used to be.",
      author: "Khloe Kardashian"
    },
    {
      text: "The groundwork for all happiness is good health.",
      author: "Leigh Hunt"
    },
    {
      text: "Your body can do it. It's time to convince your mind.",
      author: "Anonymous"
    }
  ];

  // Get a random quote (changes daily)
  const today = new Date().getDate();
  const todaysQuote = fitnessQuotes[today % fitnessQuotes.length];

  return (
    <Container>
      <WelcomeMessage>
        <FitnessEmojis>💪🏃‍♂️🥗</FitnessEmojis>
        <h1>नमस्ते! Welcome to Your Wellness Journey</h1>
        <p>Transform your health with India's most comprehensive nutrition tracker</p>
        
        <FitnessQuote>
          <QuoteText>{todaysQuote.text}</QuoteText>
          <QuoteAuthor>{todaysQuote.author}</QuoteAuthor>
        </FitnessQuote>

        <HeroStats>
          <HeroStatCard>
            <HeroStatValue>{todaysCalories}</HeroStatValue>
            <HeroStatLabel>Calories Today</HeroStatLabel>
          </HeroStatCard>
          <HeroStatCard>
            <HeroStatValue>{todaysSteps.toLocaleString()}</HeroStatValue>
            <HeroStatLabel>Steps Taken</HeroStatLabel>
          </HeroStatCard>
          <HeroStatCard>
            <HeroStatValue>{todaysProtein.toFixed(0)}g</HeroStatValue>
            <HeroStatLabel>Protein Intake</HeroStatLabel>
          </HeroStatCard>
        </HeroStats>
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

      {todaysMeals.length === 0 ? (
        <MotivationalSection>
          <MotivationalCard>
            <h3>🎆 Start Your Wellness Journey Today!</h3>
            <p>"Every journey of a thousand miles begins with a single step" - and your healthy journey starts with logging your first meal!</p>
            
            <MotivationalStats>
              <div>
                <strong>1000+</strong>
                <span>Indian Foods</span>
              </div>
              <div>
                <strong>Complete</strong>
                <span>Nutrition Info</span>
              </div>
              <div>
                <strong>Regional</strong>
                <span>Cuisines</span>
              </div>
            </MotivationalStats>
            
            <CallToAction>
              🍛 <strong>Ready to begin?</strong> Click "Food Log" to discover dal, roti, rice, sabzi and thousands of Indian foods with complete nutrition information!
            </CallToAction>
          </MotivationalCard>
        </MotivationalSection>
      ) : (
        <MealSummaryCard>
          <h3>🍽️ Today's Meal Summary</h3>
          <MealsList>
            {todaysMeals.map((meal, index) => (
              <MealItem key={meal.id}>
                <MealIcon>
                  {meal.mealType === 'breakfast' && '🍳'}
                  {meal.mealType === 'lunch' && '🍛'}
                  {meal.mealType === 'dinner' && '🍝'}
                  {meal.mealType === 'snack' && '🍪'}
                </MealIcon>
                <MealInfo>
                  <MealName>{meal.foodName}</MealName>
                  <MealDetails>{meal.calories} cal • {meal.macros.protein.toFixed(1)}g protein</MealDetails>
                </MealInfo>
              </MealItem>
            ))}
          </MealsList>
        </MealSummaryCard>
      )}
    </Container>
  );
};

export default Dashboard;