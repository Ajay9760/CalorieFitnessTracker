import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { updateUserProfile } from '../store/slices/userSlice';

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

const CompletionCard = styled.section`
  background: white;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.1);
  border: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CompletionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #0f172a;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
  }
`;

const CompletionForm = styled.form`
  display: grid;
  gap: 1rem;
`;

const CompletionRow = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const CompletionField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.9rem;
  color: #1f2937;
`;

const CompletionInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  background: #f8fafc;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

const CompletionSelect = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  background: #f8fafc;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

const CompletionError = styled.span`
  font-size: 0.8rem;
  color: #ef4444;
`;

const CompletionActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CompletionButton = styled.button`
  padding: 0.8rem 1.6rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

type ProfileFieldKey = 'age' | 'gender' | 'height' | 'weight' | 'activityLevel' | 'dietType' | 'region';

const PROFILE_FIELDS: Array<{
  key: ProfileFieldKey;
  label: string;
  type: 'number' | 'select';
  placeholder?: string;
  min?: number;
  max?: number;
  options?: Array<{ value: string; label: string }>;
}> = [
  { key: 'age', label: 'Age', type: 'number', min: 13, max: 120, placeholder: 'Age' },
  {
    key: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ],
  },
  { key: 'height', label: 'Height (cm)', type: 'number', min: 100, max: 250, placeholder: 'Height in cm' },
  { key: 'weight', label: 'Weight (kg)', type: 'number', min: 30, max: 300, placeholder: 'Weight in kg' },
  {
    key: 'activityLevel',
    label: 'Activity Level',
    type: 'select',
    options: [
      { value: 'sedentary', label: 'Sedentary (Little or no exercise)' },
      { value: 'lightly_active', label: 'Lightly Active (1-3 days/week)' },
      { value: 'moderately_active', label: 'Moderately Active (3-5 days/week)' },
      { value: 'very_active', label: 'Very Active (6-7 days/week)' },
      { value: 'extra_active', label: 'Extra Active (Physical job or intense training)' },
    ],
  },
  {
    key: 'dietType',
    label: 'Diet Preference',
    type: 'select',
    options: [
      { value: 'vegetarian', label: 'Vegetarian' },
      { value: 'vegan', label: 'Vegan' },
      { value: 'non_veg', label: 'Non-Vegetarian' },
      { value: 'keto', label: 'Keto' },
      { value: 'high_protein', label: 'High Protein' },
    ],
  },
  {
    key: 'region',
    label: 'Region',
    type: 'select',
    options: [
      { value: 'north_indian', label: 'North Indian' },
      { value: 'south_indian', label: 'South Indian' },
      { value: 'east_indian', label: 'East Indian' },
      { value: 'west_indian', label: 'West Indian' },
      { value: 'all', label: 'All Regions' },
    ],
  },
];

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, loading: userLoading } = useSelector((state: RootState) => state.user);
  const { todaysMeals } = useSelector((state: RootState) => state.meals);
  const { activities } = useSelector((state: RootState) => state.activities);
  const [profileForm, setProfileForm] = useState<Record<ProfileFieldKey, string>>({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    dietType: '',
    region: '',
  });
  const [profileErrors, setProfileErrors] = useState<Partial<Record<ProfileFieldKey, string>>>({});

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setProfileForm({
      age: currentUser.age ? String(currentUser.age) : '',
      gender: currentUser.gender || '',
      height: currentUser.height ? String(currentUser.height) : '',
      weight: currentUser.weight ? String(currentUser.weight) : '',
      activityLevel: currentUser.activityLevel || '',
      dietType: currentUser.dietType || '',
      region: currentUser.region || '',
    });
  }, [currentUser]);

  const missingFields = useMemo(() => {
    if (!currentUser) {
      return [];
    }
    return PROFILE_FIELDS.filter((field) => {
      const value = currentUser[field.key as keyof typeof currentUser];
      return value === null || value === undefined || value === '';
    });
  }, [currentUser]);

  const handleProfileChange = (key: ProfileFieldKey, value: string) => {
    setProfileForm((prev) => ({ ...prev, [key]: value }));
    if (profileErrors[key]) {
      setProfileErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleProfileSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (missingFields.length === 0) {
      return;
    }

    const nextErrors: Partial<Record<ProfileFieldKey, string>> = {};
    missingFields.forEach((field) => {
      if (!profileForm[field.key]) {
        nextErrors[field.key] = `${field.label} is required`;
      }
    });

    if (Object.keys(nextErrors).length > 0) {
      setProfileErrors(nextErrors);
      return;
    }

    const updatePayload: Record<string, string | number> = {};
    missingFields.forEach((field) => {
      const value = profileForm[field.key];
      if (!value) {
        return;
      }
      updatePayload[field.key] = field.type === 'number' ? Number(value) : value;
    });

    if (Object.keys(updatePayload).length > 0) {
      await dispatch(updateUserProfile(updatePayload));
    }
  };

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

      {missingFields.length > 0 && (
        <CompletionCard>
          <CompletionHeader>
            <h2>Finish setting up your profile</h2>
            <p>Tell us a bit more so we can personalize your daily goals.</p>
          </CompletionHeader>
          <CompletionForm onSubmit={handleProfileSubmit}>
            <CompletionRow>
              {missingFields.map((field) => (
                <CompletionField key={field.key}>
                  {field.label}
                  {field.type === 'select' ? (
                    <CompletionSelect
                      value={profileForm[field.key]}
                      onChange={(event) => handleProfileChange(field.key, event.target.value)}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </CompletionSelect>
                  ) : (
                    <CompletionInput
                      type="number"
                      min={field.min}
                      max={field.max}
                      placeholder={field.placeholder}
                      value={profileForm[field.key]}
                      onChange={(event) => handleProfileChange(field.key, event.target.value)}
                    />
                  )}
                  {profileErrors[field.key] && (
                    <CompletionError>{profileErrors[field.key]}</CompletionError>
                  )}
                </CompletionField>
              ))}
            </CompletionRow>
            <CompletionActions>
              <CompletionButton type="submit" disabled={userLoading}>
                {userLoading ? 'Saving...' : 'Save profile'}
              </CompletionButton>
            </CompletionActions>
          </CompletionForm>
        </CompletionCard>
      )}

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
