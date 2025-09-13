import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { RootState } from '../store';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.5rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
  }
`;

const ChartTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.3rem;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const Progress: React.FC = () => {
  const { todaysMeals } = useSelector((state: RootState) => state.meals);
  const { todaysActivity } = useSelector((state: RootState) => state.activities);

  // Generate sample data for the last 7 days
  const weeklyData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map((day, index) => {
      const isToday = index === 6; // Assume Saturday is today for demo
      return {
        day,
        calories: isToday 
          ? todaysMeals.reduce((sum, meal) => sum + meal.calories, 0)
          : Math.floor(Math.random() * 500) + 1500,
        protein: isToday 
          ? todaysMeals.reduce((sum, meal) => sum + meal.macros.protein, 0)
          : Math.floor(Math.random() * 30) + 50,
        steps: isToday 
          ? (todaysActivity?.steps || 0)
          : Math.floor(Math.random() * 5000) + 5000,
      };
    });
  }, [todaysMeals, todaysActivity]);

  // Calculate today's macros for pie chart
  const macroData = useMemo(() => {
    const totalProtein = todaysMeals.reduce((sum, meal) => sum + meal.macros.protein, 0);
    const totalCarbs = todaysMeals.reduce((sum, meal) => sum + meal.macros.carbs, 0);
    const totalFats = todaysMeals.reduce((sum, meal) => sum + meal.macros.fats, 0);
    
    if (totalProtein === 0 && totalCarbs === 0 && totalFats === 0) {
      // Sample data when no meals logged
      return [
        { name: 'Protein', value: 25, color: '#8884d8' },
        { name: 'Carbs', value: 45, color: '#82ca9d' },
        { name: 'Fats', value: 30, color: '#ffc658' },
      ];
    }

    const total = totalProtein + totalCarbs + totalFats;
    return [
      { name: 'Protein', value: Math.round((totalProtein / total) * 100), color: '#8884d8' },
      { name: 'Carbs', value: Math.round((totalCarbs / total) * 100), color: '#82ca9d' },
      { name: 'Fats', value: Math.round((totalFats / total) * 100), color: '#ffc658' },
    ];
  }, [todaysMeals]);

  const todaysCalories = todaysMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const todaysProtein = todaysMeals.reduce((sum, meal) => sum + meal.macros.protein, 0);
  const todaysSteps = todaysActivity?.steps || 0;
  const avgCalories = Math.round(weeklyData.reduce((sum, day) => sum + day.calories, 0) / 7);

  return (
    <Container>
      <Header>📈 Your Progress Analytics</Header>
      
      <StatsRow>
        <StatCard>
          <StatValue>{todaysCalories}</StatValue>
          <StatLabel>Today's Calories</StatLabel>
        </StatCard>
        <StatCard style={{ animationDelay: '1s' }}>
          <StatValue>{todaysProtein.toFixed(1)}g</StatValue>
          <StatLabel>Today's Protein</StatLabel>
        </StatCard>
        <StatCard style={{ animationDelay: '2s' }}>
          <StatValue>{todaysSteps.toLocaleString()}</StatValue>
          <StatLabel>Today's Steps</StatLabel>
        </StatCard>
        <StatCard style={{ animationDelay: '3s' }}>
          <StatValue>{avgCalories}</StatValue>
          <StatLabel>Weekly Avg Calories</StatLabel>
        </StatCard>
      </StatsRow>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>Weekly Calorie Trend</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #667eea',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="calories" 
                stroke="#667eea" 
                strokeWidth={3}
                dot={{ fill: '#667eea', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, fill: '#764ba2' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Today's Macro Distribution</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={macroData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Weekly Step Count</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #667eea',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Bar 
                dataKey="steps" 
                fill="url(#stepGradient)" 
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="stepGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Weekly Protein Intake</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #667eea',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="protein" 
                stroke="#ffc658" 
                strokeWidth={3}
                dot={{ fill: '#ffc658', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, fill: '#ff7c7c' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsGrid>
    </Container>
  );
};

export default Progress;
