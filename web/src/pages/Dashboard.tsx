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
  background: 
    linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 50%, rgba(240, 147, 251, 0.9) 100%),
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><defs><pattern id="healthy-pattern" patternUnits="userSpaceOnUse" width="100" height="100"><circle cx="50" cy="20" r="2" fill="%23ffffff" opacity="0.1"/><circle cx="20" cy="50" r="1.5" fill="%23ffffff" opacity="0.1"/><circle cx="80" cy="80" r="1" fill="%23ffffff" opacity="0.1"/><path d="M10,10 Q30,5 50,10 T90,10" stroke="%23ffffff" stroke-width="0.5" fill="none" opacity="0.05"/></pattern></defs><rect width="100%" height="100%" fill="url(%23healthy-pattern)"/></svg>');
  background-size: cover, 100px 100px;
  color: white;
  padding: 5rem 3rem;
  border-radius: 25px;
  text-align: center;
  margin-bottom: 3rem;
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 50%);
    animation: rotate 20s linear infinite;
  }

  &::after {
    content: '🌟';
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 3rem;
    animation: twinkle 2s ease-in-out infinite alternate;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes twinkle {
    from { opacity: 0.5; transform: scale(1); }
    to { opacity: 1; transform: scale(1.1); }
  }

  h1 {
    position: relative;
    z-index: 1;
    font-size: 3.5rem;
    margin-bottom: 2rem;
    font-weight: 900;
    text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    position: relative;
    z-index: 1;
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    opacity: 0.95;
    line-height: 1.6;
    max-width: 600px;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
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
  background: 
    linear-gradient(135deg, rgba(255, 234, 167, 0.95) 0%, rgba(253, 203, 110, 0.95) 50%, rgba(225, 112, 85, 0.95) 100%),
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><pattern id="food-pattern" patternUnits="userSpaceOnUse" width="40" height="40"><text x="5" y="15" font-size="12" fill="%23ffffff" opacity="0.1">🍛</text><text x="25" y="35" font-size="10" fill="%23ffffff" opacity="0.1">🥗</text></pattern></defs><rect width="100%" height="100%" fill="url(%23food-pattern)"/></svg>');
  background-size: cover, 40px 40px;
  color: #2d3436;
  padding: 4rem 3rem;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(253, 203, 110, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '🥘';
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 2.5rem;
    animation: float 3s ease-in-out infinite;
  }
  
  &::after {
    content: '🏃‍♂️';
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 2.5rem;
    animation: bounce 2s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateX(0px); }
    50% { transform: translateX(10px); }
  }
  
  h3 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    font-weight: 800;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
  
  p {
    font-size: 1.3rem;
    margin-bottom: 2.5rem;
    line-height: 1.7;
    opacity: 0.9;
    font-weight: 500;
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
  padding: 2rem;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 2rem 0 1.5rem 0;
  border: 2px dashed rgba(45, 52, 54, 0.3);
  backdrop-filter: blur(5px);
`;

const FoodShowcase = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const FoodIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.5rem;
  animation: wiggle 3s ease-in-out infinite;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
  
  span {
    font-size: 0.8rem;
    margin-top: 0.5rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #2d3436;
  }
  
  &:nth-child(1) { animation-delay: 0s; }
  &:nth-child(2) { animation-delay: 0.3s; }
  &:nth-child(3) { animation-delay: 0.6s; }
  &:nth-child(4) { animation-delay: 0.9s; }
  &:nth-child(5) { animation-delay: 1.2s; }
  
  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(3deg); }
    75% { transform: rotate(-3deg); }
  }
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
  const { activities } = useSelector((state: RootState) => state.activities);

  // Calculate today's totals
  const todaysCalories = todaysMeals.reduce((total, meal) => total + meal.calories, 0);
  const todaysProtein = todaysMeals.reduce((total, meal) => total + meal.macros.protein, 0);
  
  // Calculate today's workout totals from activities
  const todaysWorkouts = activities.filter(
    activity => new Date(activity.timestamp).toDateString() === new Date().toDateString()
  );
  const totalCaloriesBurned = todaysWorkouts.reduce((total, workout) => total + workout.caloriesBurned, 0);
  const totalWorkoutDuration = todaysWorkouts.reduce((total, workout) => total + workout.duration, 0);

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
        <h1>🙏 नमस्ते! Start Your Wellness Journey</h1>
        <p>🇮🇳 India's most comprehensive nutrition and fitness tracker with 1000+ Indian foods</p>
        
        <FitnessQuote>
          <QuoteText>{todaysQuote.text}</QuoteText>
          <QuoteAuthor>{todaysQuote.author}</QuoteAuthor>
        </FitnessQuote>

        <HeroStats>
          <HeroStatCard>
            <HeroStatValue>{todaysCalories || '--'}</HeroStatValue>
            <HeroStatLabel>Calories Logged</HeroStatLabel>
          </HeroStatCard>
          <HeroStatCard>
            <HeroStatValue>{totalCaloriesBurned || '--'}</HeroStatValue>
            <HeroStatLabel>Calories Burned</HeroStatLabel>
          </HeroStatCard>
          <HeroStatCard>
            <HeroStatValue>{todaysProtein > 0 ? todaysProtein.toFixed(0) + 'g' : '--'}</HeroStatValue>
            <HeroStatLabel>Protein Intake</HeroStatLabel>
          </HeroStatCard>
        </HeroStats>
      </WelcomeMessage>

      {todaysMeals.length === 0 ? (
        <MotivationalSection>
          <MotivationalCard>
            <h3>🎆 Your Wellness Journey Starts Here!</h3>
            <p>🌱 "A healthy outside starts from the inside" - Begin tracking your nutrition today and transform your life, one meal at a time!</p>
            
            <MotivationalStats>
              <div>
                <strong>🍛 1000+</strong>
                <span>Indian Foods</span>
              </div>
              <div>
                <strong>📊 Complete</strong>
                <span>Nutrition Data</span>
              </div>
              <div>
                <strong>🇮🇳 4 Regional</strong>
                <span>Cuisines</span>
              </div>
            </MotivationalStats>
            
            <CallToAction>
              🌟 <strong>Take the first step!</strong> 🍛 Log your breakfast, lunch, or dinner to discover detailed nutrition for Dal, Roti, Rice, Sabzi, and thousands more authentic Indian dishes!
            </CallToAction>
            
            <FoodShowcase>
              <FoodIcon>🍛<span>Dal</span></FoodIcon>
              <FoodIcon>🥘<span>Roti</span></FoodIcon>
              <FoodIcon>🍚<span>Rice</span></FoodIcon>
              <FoodIcon>🥗<span>Sabzi</span></FoodIcon>
              <FoodIcon>🥙<span>Paneer</span></FoodIcon>
            </FoodShowcase>
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