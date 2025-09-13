import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { addActivity } from '../store/slices/activitySlice';
import { WORKOUT_DATABASE, getWorkoutsByCategory, getWorkoutById, searchWorkouts } from '../data/workoutDatabase';
import { WorkoutExercise, WorkoutEntry, WorkoutCategory } from '../types';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '💪';
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 2.5rem;
    animation: pulse 2s infinite;
  }
  
  &::after {
    content: '🏃‍♂️';
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 2.5rem;
    animation: bounce 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 800;
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
`;

const TabSection = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const TabHeader = styled.div`
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 1.5rem;
  border: none;
  background: ${props => props.$active ? '#667eea' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#666'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active ? '#667eea' : '#e9ecef'};
  }
`;

const TabContent = styled.div`
  padding: 2rem;
`;

const SearchSection = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #dee2e6;
  border-radius: 10px;
  font-size: 1rem;
  margin-bottom: 1rem;
  
  &:focus {
    border-color: #667eea;
    outline: none;
  }
`;

const CategoryFilters = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid #667eea;
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#667eea'};
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

const WorkoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const WorkoutCard = styled.div`
  background: white;
  border: 2px solid #f8f9fa;
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #667eea;
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.15);
  }
`;

const WorkoutName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.3rem;
`;

const WorkoutNameHindi = styled.p`
  color: #666;
  font-style: italic;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
`;

const WorkoutInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const WorkoutType = styled.span`
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const CaloriesInfo = styled.span`
  color: #e74c3c;
  font-weight: 600;
  font-size: 0.9rem;
`;

const DifficultyBadge = styled.span<{ $difficulty: string }>`
  background: ${props => {
    switch(props.$difficulty) {
      case 'beginner': return '#27ae60';
      case 'intermediate': return '#f39c12';
      case 'advanced': return '#e74c3c';
      default: return '#95a5a6';
    }
  }};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
`;

const WorkoutDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

const TargetMuscles = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const MuscleTag = styled.span`
  background: #ecf0f1;
  color: #34495e;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  text-transform: capitalize;
`;

const LogButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

// Modal styles
const Modal = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h2 {
    margin: 0;
    color: #333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    font-size: 1rem;
    
    &:focus {
      border-color: #667eea;
      outline: none;
    }
  }
  
  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

const SetInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  input {
    margin-bottom: 0;
  }
`;

const AddSetButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  &:hover {
    background: #218838;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const TodaysWorkouts = styled.div`
  background: linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const WorkoutsList = styled.div`
  display: grid;
  gap: 1rem;
`;

const WorkoutItem = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface WorkoutFormData {
  duration: number;
  sets: number;
  reps: number[];
  weight: number[];
  distance: number;
  intensity: 'low' | 'moderate' | 'high' | 'extreme';
  notes: string;
}

const Activity: React.FC = () => {
  const dispatch = useDispatch();
  const { activities } = useSelector((state: RootState) => state.activities);
  const [activeTab, setActiveTab] = useState<'browse' | 'today'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory | 'all'>('all');
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutExercise | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<WorkoutFormData>({
    duration: 30,
    sets: 3,
    reps: [10],
    weight: [0],
    distance: 0,
    intensity: 'moderate',
    notes: ''
  });

  const categories: { key: WorkoutCategory | 'all'; label: string; emoji: string }[] = [
    { key: 'all', label: 'All', emoji: '💪' },
    { key: 'gym_strength', label: 'Gym', emoji: '🏋️‍♂️' },
    { key: 'cardio', label: 'Cardio', emoji: '🏃‍♂️' },
    { key: 'hiit', label: 'HIIT', emoji: '⚡' },
    { key: 'yoga', label: 'Yoga', emoji: '🧘‍♀️' },
    { key: 'bodyweight', label: 'Bodyweight', emoji: '🤸‍♂️' },
    { key: 'traditional_indian', label: 'Traditional', emoji: '🇮🇳' },
    { key: 'sports', label: 'Sports', emoji: '⚽' },
    { key: 'dance', label: 'Dance', emoji: '💃' },
  ];

  const filteredWorkouts = useMemo(() => {
    let workouts = WORKOUT_DATABASE;
    
    if (searchQuery) {
      workouts = searchWorkouts(searchQuery);
    }
    
    if (selectedCategory !== 'all') {
      workouts = workouts.filter(w => w.category === selectedCategory);
    }
    
    return workouts;
  }, [searchQuery, selectedCategory]);

  const todaysWorkouts = activities.filter(
    (activity: any) => new Date(activity.timestamp).toDateString() === new Date().toDateString()
  );

  const handleWorkoutClick = (workout: WorkoutExercise) => {
    setSelectedWorkout(workout);
    setFormData({
      duration: 30,
      sets: workout.type === 'strength' ? 3 : 0,
      reps: [10, 10, 10],
      weight: [0, 0, 0],
      distance: workout.type === 'cardio' ? 5 : 0,
      intensity: 'moderate',
      notes: ''
    });
    setShowModal(true);
  };

  const addSet = () => {
    setFormData(prev => ({
      ...prev,
      reps: [...prev.reps, 10],
      weight: [...prev.weight, 0]
    }));
  };

  const updateSet = (index: number, field: 'reps' | 'weight', value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleSubmit = () => {
    if (!selectedWorkout) return;
    
    const caloriesBurned = Math.round(selectedWorkout.caloriesPerMinute * formData.duration);
    
    const workoutEntry: WorkoutEntry = {
      id: Date.now().toString(),
      exerciseId: selectedWorkout.id,
      exerciseName: selectedWorkout.name,
      category: selectedWorkout.category,
      type: selectedWorkout.type,
      duration: formData.duration,
      caloriesBurned,
      sets: selectedWorkout.type === 'strength' ? formData.sets : undefined,
      reps: selectedWorkout.type === 'strength' ? formData.reps : undefined,
      weight: selectedWorkout.type === 'strength' ? formData.weight : undefined,
      distance: selectedWorkout.type === 'cardio' ? formData.distance : undefined,
      intensity: formData.intensity,
      notes: formData.notes,
      timestamp: new Date()
    };
    
    dispatch(addActivity(workoutEntry));
    setShowModal(false);
    setSelectedWorkout(null);
  };

  return (
    <Container>
      <Header>
        <h1>💪 Activity & Workout Tracker</h1>
        <p>Log your gym sessions, cardio, HIIT, yoga, traditional Indian exercises and more!</p>
      </Header>

      <TabSection>
        <TabHeader>
          <Tab $active={activeTab === 'browse'} onClick={() => setActiveTab('browse')}>
            🔍 Browse Workouts
          </Tab>
          <Tab $active={activeTab === 'today'} onClick={() => setActiveTab('today')}>
            📅 Today's Activities
          </Tab>
        </TabHeader>
        
        <TabContent>
          {activeTab === 'browse' && (
            <>
              <SearchSection>
                <SearchInput
                  type="text"
                  placeholder="Search workouts... (try 'yoga', 'strength', 'cardio', 'indian')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <CategoryFilters>
                  {categories.map(cat => (
                    <CategoryButton
                      key={cat.key}
                      $active={selectedCategory === cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                    >
                      {cat.emoji} {cat.label}
                    </CategoryButton>
                  ))}
                </CategoryFilters>
              </SearchSection>

              <WorkoutGrid>
                {filteredWorkouts.map(workout => (
                  <WorkoutCard key={workout.id} onClick={() => handleWorkoutClick(workout)}>
                    <WorkoutName>{workout.name}</WorkoutName>
                    {workout.nameHindi && <WorkoutNameHindi>{workout.nameHindi}</WorkoutNameHindi>}
                    
                    <WorkoutInfo>
                      <WorkoutType>{workout.type}</WorkoutType>
                      <CaloriesInfo>{workout.caloriesPerMinute} cal/min</CaloriesInfo>
                      <DifficultyBadge $difficulty={workout.difficulty}>
                        {workout.difficulty}
                      </DifficultyBadge>
                    </WorkoutInfo>
                    
                    <WorkoutDescription>{workout.description}</WorkoutDescription>
                    
                    <TargetMuscles>
                      {workout.targetMuscles.slice(0, 4).map(muscle => (
                        <MuscleTag key={muscle}>{muscle}</MuscleTag>
                      ))}
                    </TargetMuscles>
                    
                    <LogButton>Log This Workout</LogButton>
                  </WorkoutCard>
                ))}
              </WorkoutGrid>
            </>
          )}
          
          {activeTab === 'today' && (
            <TodaysWorkouts>
              <h2>🎯 Today's Activities ({todaysWorkouts.length})</h2>
              {todaysWorkouts.length === 0 ? (
                <div style={{textAlign: 'center', padding: '2rem'}}>
                  <h3>No workouts logged today</h3>
                  <p>Switch to "Browse Workouts" tab to start logging your activities!</p>
                </div>
              ) : (
                <WorkoutsList>
                  {todaysWorkouts.map((activity: any) => (
                    <WorkoutItem key={activity.id}>
                      <div>
                        <h4>{activity.exerciseName}</h4>
                        <p>{activity.duration} min • {activity.caloriesBurned} calories</p>
                        {activity.sets && <p>{activity.sets} sets</p>}
                        {activity.distance && <p>{activity.distance} km</p>}
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <small>{new Date(activity.timestamp).toLocaleTimeString()}</small>
                      </div>
                    </WorkoutItem>
                  ))}
                </WorkoutsList>
              )}
            </TodaysWorkouts>
          )}
        </TabContent>
      </TabSection>

      <Modal $show={showModal}>
        <ModalContent>
          <ModalHeader>
            <h2>Log Workout: {selectedWorkout?.name}</h2>
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
          </ModalHeader>
          
          {selectedWorkout && (
            <>
              <FormGroup>
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({...prev, duration: parseInt(e.target.value) || 0}))}
                />
              </FormGroup>
              
              {selectedWorkout.type === 'strength' && (
                <FormGroup>
                  <label>Sets & Reps</label>
                  {formData.reps.map((rep, index) => (
                    <SetInputs key={index}>
                      <input
                        type="number"
                        placeholder="Reps"
                        min="1"
                        value={rep}
                        onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value) || 0)}
                      />
                      <input
                        type="number"
                        placeholder="Weight (kg)"
                        min="0"
                        value={formData.weight[index]}
                        onChange={(e) => updateSet(index, 'weight', parseInt(e.target.value) || 0)}
                      />
                    </SetInputs>
                  ))}
                  <AddSetButton onClick={addSet}>+ Add Set</AddSetButton>
                </FormGroup>
              )}
              
              {selectedWorkout.type === 'cardio' && (
                <FormGroup>
                  <label>Distance (km)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.distance}
                    onChange={(e) => setFormData(prev => ({...prev, distance: parseFloat(e.target.value) || 0}))}
                  />
                </FormGroup>
              )}
              
              <FormGroup>
                <label>Intensity</label>
                <select
                  value={formData.intensity}
                  onChange={(e) => setFormData(prev => ({...prev, intensity: e.target.value as any}))}
                >
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="extreme">Extreme</option>
                </select>
              </FormGroup>
              
              <FormGroup>
                <label>Notes (optional)</label>
                <textarea
                  placeholder="How did it feel? Any observations?"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
                />
              </FormGroup>
              
              <div style={{textAlign: 'center', margin: '1rem 0'}}>
                <strong>Estimated Calories: {Math.round(selectedWorkout.caloriesPerMinute * formData.duration)}</strong>
              </div>
              
              <SubmitButton onClick={handleSubmit}>
                🎯 Log This Workout
              </SubmitButton>
            </>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Activity;
