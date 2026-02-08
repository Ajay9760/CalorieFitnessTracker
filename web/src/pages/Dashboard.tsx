import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RootState } from '../store';

const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Hero = styled.section`
  background: radial-gradient(circle at top left, rgba(99, 102, 241, 0.35), transparent 55%),
    linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.98));
  border-radius: 28px;
  padding: 3rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.35);
  animation: heroFloat 10s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="260" viewBox="0 0 260 260"><g fill="none" stroke="%23ffffff" stroke-opacity="0.08"><circle cx="130" cy="130" r="120"/><circle cx="200" cy="60" r="40"/><circle cx="60" cy="200" r="30"/></g></svg>');
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @keyframes heroFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  align-items: center;
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin: 0;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const HeroButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.4rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  color: #0f172a;
  background: #f8fafc;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.3);
  }

  &.outline {
    background: transparent;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.4);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 18px;
  padding: 1.5rem;
  box-shadow: 0 12px 25px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.12);
  }

  h3 {
    margin: 0;
    font-size: 1.6rem;
    color: #111827;
  }

  span {
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 1px;
    color: #64748b;
    font-weight: 600;
  }
`;

const InsightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const InsightCard = styled.div`
  background: white;
  border-radius: 22px;
  padding: 1.5rem;
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RingWrapper = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto;
`;

const RingValue = styled.div`
  position: absolute;
  text-align: center;
  font-weight: 700;
  color: #111827;
`;

const MacroBar = styled.div<{ $color: string; $width: number }>`
  height: 8px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.2);
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: ${props => props.$width}%;
    background: ${props => props.$color};
    border-radius: inherit;
    transition: width 0.4s ease;
  }
`;

const QuoteCard = styled(InsightCard)`
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(248, 250, 252, 0.9));

  p {
    font-size: 1.05rem;
    color: #0f172a;
    line-height: 1.6;
  }

  span {
    font-weight: 600;
    color: #64748b;
  }
`;

const MealSummaryCard = styled(InsightCard)`
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(255, 255, 255, 0.95));
`;

const MealsList = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const MealItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.2);
`;

const MealIcon = styled.div`
  font-size: 1.5rem;
`;

const MealInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Dashboard: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { todaysMeals } = useSelector((state: RootState) => state.meals);
  const { activities } = useSelector((state: RootState) => state.activities);

  const todaysCalories = todaysMeals.reduce((total: number, meal: any) => total + meal.calories, 0);
  const todaysProtein = todaysMeals.reduce((total: number, meal: any) => total + meal.macros.protein, 0);
  const todaysCarbs = todaysMeals.reduce((total: number, meal: any) => total + meal.macros.carbs, 0);
  const todaysFats = todaysMeals.reduce((total: number, meal: any) => total + meal.macros.fats, 0);
  const todaysWorkouts = activities.filter(
    (activity: any) => new Date(activity.timestamp).toDateString() === new Date().toDateString()
  );
  const totalCaloriesBurned = todaysWorkouts.reduce((total: number, workout: any) => total + workout.caloriesBurned, 0);
  const totalWorkoutDuration = todaysWorkouts.reduce((total: number, workout: any) => total + workout.duration, 0);
  const dailyGoal = currentUser?.dailyCalorieGoal || 2000;
  const netCalories = Math.max(todaysCalories - totalCaloriesBurned, 0);
  const caloriesRemaining = Math.max(dailyGoal - netCalories, 0);
  const progress = Math.min((netCalories / dailyGoal) * 100, 100);

  const macroTotal = todaysProtein + todaysCarbs + todaysFats;
  const macroSplit = {
    protein: macroTotal ? Math.round((todaysProtein / macroTotal) * 100) : 0,
    carbs: macroTotal ? Math.round((todaysCarbs / macroTotal) * 100) : 0,
    fats: macroTotal ? Math.round((todaysFats / macroTotal) * 100) : 0,
  };

  const fitnessQuotes = [
    {
      text: "Health is not about the weight you lose, but about the life you gain.",
      author: "Dr. Josh Axe",
    },
    {
      text: "Take care of your body. It's the only place you have to live.",
      author: "Jim Rohn",
    },
    {
      text: "A healthy outside starts from the inside.",
      author: "Robert Urich",
    },
    {
      text: "Fitness is not about being better than someone else. It's about being better than you used to be.",
      author: "Khloe Kardashian",
    },
  ];

  const todaysQuote = fitnessQuotes[new Date().getDate() % fitnessQuotes.length];
  const circumference = 2 * Math.PI * 54;
  const ringOffset = circumference - (progress / 100) * circumference;

  return (
    <Page>
      <Hero>
        <HeroContent>
          <HeroText>
            <h1>Good to see you{currentUser?.name ? `, ${currentUser.name}` : ''} 👋</h1>
            <p>Track calories, macros, and workouts in one modern dashboard built for your momentum.</p>
            <HeroActions>
              <HeroButton to="/food">🍛 Log a meal</HeroButton>
              <HeroButton to="/activity" className="outline">🏃 Log workout</HeroButton>
            </HeroActions>
          </HeroText>
          <RingWrapper>
            <svg width="140" height="140">
              <circle
                cx="70"
                cy="70"
                r="54"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="70"
                cy="70"
                r="54"
                stroke="#fbbf24"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={ringOffset}
                transform="rotate(-90 70 70)"
              />
            </svg>
            <RingValue>
              <div style={{ fontSize: '1.6rem' }}>{Math.round(progress)}%</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>of goal</div>
            </RingValue>
          </RingWrapper>
        </HeroContent>
      </Hero>

      <StatsGrid>
        <StatCard>
          <span>Daily Goal</span>
          <h3>{dailyGoal}</h3>
          <p>Target calories</p>
        </StatCard>
        <StatCard>
          <span>Net Calories</span>
          <h3>{netCalories}</h3>
          <p>After workouts</p>
        </StatCard>
        <StatCard>
          <span>Remaining</span>
          <h3>{caloriesRemaining}</h3>
          <p>Calories left today</p>
        </StatCard>
        <StatCard>
          <span>Active Minutes</span>
          <h3>{totalWorkoutDuration}</h3>
          <p>Workout time</p>
        </StatCard>
      </StatsGrid>

      <InsightGrid>
        <InsightCard>
          <h3>Macro balance</h3>
          <div>
            <p>Protein {macroSplit.protein}%</p>
            <MacroBar $color="#6366f1" $width={macroSplit.protein} />
          </div>
          <div>
            <p>Carbs {macroSplit.carbs}%</p>
            <MacroBar $color="#22c55e" $width={macroSplit.carbs} />
          </div>
          <div>
            <p>Fats {macroSplit.fats}%</p>
            <MacroBar $color="#f97316" $width={macroSplit.fats} />
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            {todaysProtein.toFixed(1)}g protein • {todaysCarbs.toFixed(1)}g carbs • {todaysFats.toFixed(1)}g fats
          </p>
        </InsightCard>

        <QuoteCard>
          <h3>Daily focus</h3>
          <p>“{todaysQuote.text}”</p>
          <span>— {todaysQuote.author}</span>
        </QuoteCard>

        <MealSummaryCard>
          <h3>Today’s meals</h3>
          {todaysMeals.length === 0 ? (
            <p>Start by logging breakfast or a snack to unlock insights.</p>
          ) : (
            <MealsList>
              {todaysMeals.slice(0, 4).map((meal: any) => (
                <MealItem key={meal.id}>
                  <MealIcon>
                    {meal.mealType === 'breakfast' && '🍳'}
                    {meal.mealType === 'lunch' && '🍛'}
                    {meal.mealType === 'dinner' && '🍝'}
                    {meal.mealType === 'snack' && '🍪'}
                  </MealIcon>
                  <MealInfo>
                    <strong>{meal.foodName}</strong>
                    <span>{meal.calories} cal • {meal.macros.protein.toFixed(1)}g protein</span>
                  </MealInfo>
                </MealItem>
              ))}
            </MealsList>
          )}
        </MealSummaryCard>
      </InsightGrid>
    </Page>
  );
};

export default Dashboard;
