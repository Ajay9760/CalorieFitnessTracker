import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { GYM_EXERCISES_DATABASE, EXERCISE_CATEGORIES, WORKOUT_TEMPLATES, GymExercise, BodyPart } from '../data/gymExercises';
import { addActivity } from '../store/slices/activitySlice';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
  background: #f8f9fa;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Header = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    font-size: 0.95rem;
    color: #6b7280;
    margin: 0;
  }
`;

const TabSection = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TabHeader = styled.div`
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
  
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  background: ${props => props.$active ? 'white' : 'transparent'};
  color: ${props => props.$active ? '#1f2937' : '#6b7280'};
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 3px solid ${props => props.$active ? '#3b82f6' : 'transparent'};
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.$active ? 'white' : '#f1f5f9'};
    color: ${props => props.$active ? '#1f2937' : '#374151'};
  }
`;

const WorkoutSession = styled.div`
  background: white;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SessionHeader = styled.div`
  margin-bottom: 1.5rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const SessionStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  
  .value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    display: block;
  }
  
  .label {
    font-size: 0.8rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }
`;

const BodyPartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const BodyPartCard = styled.div<{ $color: string }>`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #d1d5db;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  h3 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    color: #1f2937;
    
    .emoji {
      font-size: 1.25rem;
    }
  }
  
  .count {
    background: #f3f4f6;
    color: #6b7280;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 500;
  }
`;

const ExercisesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ExerciseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  transition: all 0.15s ease;
  cursor: pointer;
  
  &:hover {
    background: #f3f4f6;
    border-color: #e5e7eb;
  }
`;

const ExerciseInfo = styled.div`
  flex: 1;
  
  .name {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
  }
  
  .details {
    font-size: 0.75rem;
    color: #6b7280;
    display: flex;
    gap: 0.75rem;
  }
  
  .difficulty {
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 500;
    
    &.Beginner { background: #dcfce7; color: #16a34a; }
    &.Intermediate { background: #fef3c7; color: #d97706; }
    &.Advanced { background: #fee2e2; color: #dc2626; }
  }
`;

const ActionButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.15s ease;
  
  &:hover {
    background: #2563eb;
  }
`;

const Modal = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$show ? 'flex' : 'none'};
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  padding: 2rem 1rem;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  margin: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  
  h2 {
    flex: 1;
    margin: 0;
    color: #1f2937;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #9ca3af;
  padding: 0.25rem;
  border-radius: 4px;
  
  &:hover {
    color: #6b7280;
    background: #f3f4f6;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(90vh - 100px);
`;

const ExerciseAnimation = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
  background: #f3f4f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  
  .animation-placeholder {
    font-size: 3rem;
    animation: exerciseMove 2s ease-in-out infinite;
  }
  
  @keyframes exerciseMove {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 1.5rem 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InstructionsList = styled.ol`
  margin: 0 0 1.5rem 0;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
    color: #4b5563;
    font-size: 0.9rem;
  }
`;

const TipsList = styled.ul`
  background: #f0f9ff;
  border: 1px solid #e0f2fe;
  padding: 1rem;
  border-radius: 8px;
  margin: 0 0 1.5rem 0;
  
  li {
    margin-bottom: 0.5rem;
    color: #0c4a6e;
    line-height: 1.5;
    font-size: 0.9rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const SetLogger = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 1.5rem;
`;

const SetLoggerHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f3f4f6;
  
  h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
  }
`;

const SetLoggerContent = styled.div`
  padding: 1rem;
`;

const SetRow = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr 1fr 60px;
  gap: 0.75rem;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SetInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
  
  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const AddSetButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.75rem;
  width: 100%;
  font-size: 0.9rem;
  
  &:hover {
    background: #059669;
  }
`;

const FinishButton = styled.button`
  width: 100%;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.15s ease;
  
  &:hover {
    background: #2563eb;
  }
`;

const RestTimer = styled.div<{ $active: boolean }>`
  background: ${props => props.$active ? '#dc2626' : '#f9fafb'};
  color: ${props => props.$active ? 'white' : '#1f2937'};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin: 1rem 0;
  border: 1px solid ${props => props.$active ? '#dc2626' : '#e5e7eb'};
  
  .timer {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .controls {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 1rem;
    
    button {
      background: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : '#e5e7eb'};
      color: ${props => props.$active ? 'white' : '#1f2937'};
      border: none;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      
      &:hover {
        background: ${props => props.$active ? 'rgba(255, 255, 255, 0.3)' : '#d1d5db'};
      }
    }
  }
`;

const SearchSection = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const BackButton = styled.button`
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.15s ease;
  
  &:hover {
    background: #e5e7eb;
    border-color: #9ca3af;
  }
`;

interface WorkoutSet {
  reps: number;
  weight: number;
  completed: boolean;
}

const Gym: React.FC = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<'browse' | 'session'>('browse');
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<GymExercise | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [sets, setSets] = useState<WorkoutSet[]>([{ reps: 0, weight: 0, completed: false }]);
  const [restTime, setRestTime] = useState(90);
  const [isResting, setIsResting] = useState(false);
  const [currentRestTime, setCurrentRestTime] = useState(90);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Rest timer effect
  useEffect(() => {
    let interval: any;
    if (isResting && currentRestTime > 0) {
      interval = setInterval(() => {
        setCurrentRestTime(time => {
          if (time <= 1) {
            setIsResting(false);
            return restTime;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, currentRestTime, restTime]);

  const handleExerciseClick = (exercise: GymExercise) => {
    setSelectedExercise(exercise);
    setSets([{ reps: 0, weight: 0, completed: false }]);
    setShowModal(true);
  };

  const addSet = () => {
    setSets([...sets, { reps: 0, weight: 0, completed: false }]);
  };

  const updateSet = (index: number, field: keyof WorkoutSet, value: number | boolean) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: value };
    setSets(newSets);
  };

  const startRest = () => {
    setIsResting(true);
    setCurrentRestTime(restTime);
  };

  const finishExercise = () => {
    if (!selectedExercise) return;

    if (!workoutStarted) {
      setWorkoutStarted(true);
      setStartTime(new Date());
    }

    const completedSets = sets.filter(set => set.completed);
    if (completedSets.length === 0) return;

    // Calculate calories burned (rough estimate)
    const totalVolume = completedSets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
    const estimatedCalories = Math.round(totalVolume * 0.05 + 10); // Rough estimation

    const workoutEntry = {
      id: Date.now().toString(),
      exerciseId: selectedExercise.id,
      exerciseName: selectedExercise.name,
      category: 'gym_strength' as const,
      type: 'strength' as const,
      duration: 0, // We'll calculate this differently for strength training
      caloriesBurned: estimatedCalories,
      sets: completedSets.length,
      reps: completedSets.map(set => set.reps),
      weight: completedSets.map(set => set.weight),
      intensity: 'moderate' as const,
      timestamp: new Date()
    };

    dispatch(addActivity(workoutEntry));
    setShowModal(false);
    setSelectedExercise(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnimationEmoji = (category: BodyPart) => {
    const animations: Record<string, string> = {
      chest: '💪',
      back: '🦾',
      shoulders: '🤸‍♂️',
      biceps: '💪',
      triceps: '🦾',
      quadriceps: '🦵',
      hamstrings: '🦵',
      glutes: '🍑',
      core: '⚡',
      calves: '🦵'
    };
    return animations[category] || '💪';
  };

  // Filter exercises based on search term
  const filteredExercises = selectedBodyPart 
    ? EXERCISE_CATEGORIES[selectedBodyPart].exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.primaryMuscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <Container>
      <Header>
        <h1>🏋️‍♂️ Workout</h1>
        <p>Track your strength training progress</p>
      </Header>

      <TabSection>
        <TabHeader>
          <Tab $active={activeTab === 'browse'} onClick={() => setActiveTab('browse')}>
            Exercises
          </Tab>
          <Tab $active={activeTab === 'session'} onClick={() => setActiveTab('session')}>
            Workout
          </Tab>
        </TabHeader>

        {activeTab === 'browse' && (
          <>
            {!selectedBodyPart ? (
              <BodyPartGrid>
                {Object.entries(EXERCISE_CATEGORIES).map(([key, category]) => (
                  <BodyPartCard
                    key={key}
                    $color={category.color}
                    onClick={() => setSelectedBodyPart(key as BodyPart)}
                  >
                    <CardHeader>
                      <h3>
                        <span className="emoji">{category.emoji}</span>
                        {category.name}
                      </h3>
                      <span className="count">{category.exercises.length}</span>
                    </CardHeader>
                    <ExercisesList>
                      {category.exercises.slice(0, 3).map((exercise) => (
                        <ExerciseItem key={exercise.id}>
                          <ExerciseInfo>
                            <div className="name">{exercise.name}</div>
                            <div className="details">
                              <span className={`difficulty ${exercise.difficulty}`}>
                                {exercise.difficulty}
                              </span>
                              <span>{exercise.equipment}</span>
                            </div>
                          </ExerciseInfo>
                        </ExerciseItem>
                      ))}
                      {category.exercises.length > 3 && (
                        <div style={{textAlign: 'center', padding: '0.5rem', color: '#6b7280', fontSize: '0.8rem'}}>
                          +{category.exercises.length - 3} more
                        </div>
                      )}
                    </ExercisesList>
                  </BodyPartCard>
                ))}
              </BodyPartGrid>
            ) : (
              <>
                <div style={{padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  <BackButton onClick={() => {
                    setSelectedBodyPart(null);
                    setSearchTerm('');
                  }}>
                    ← Back
                  </BackButton>
                  <h2 style={{margin: 0, color: '#1f2937', fontSize: '1.25rem', fontWeight: '600'}}>
                    {EXERCISE_CATEGORIES[selectedBodyPart].emoji} {EXERCISE_CATEGORIES[selectedBodyPart].name}
                  </h2>
                </div>
                
                <SearchSection>
                  <SearchInput
                    type="text"
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </SearchSection>
                
                <div style={{padding: '1rem'}}>
                  <ExercisesList>
                    {filteredExercises.map((exercise) => (
                      <ExerciseItem key={exercise.id}>
                        <ExerciseInfo>
                          <div className="name">{exercise.name}</div>
                          <div className="details">
                            <span className={`difficulty ${exercise.difficulty}`}>
                              {exercise.difficulty}
                            </span>
                            <span>{exercise.equipment}</span>
                            <span>{exercise.primaryMuscles.join(', ')}</span>
                          </div>
                        </ExerciseInfo>
                        <ActionButton onClick={() => handleExerciseClick(exercise)}>
                          Start
                        </ActionButton>
                      </ExerciseItem>
                    ))}
                    {filteredExercises.length === 0 && searchTerm && (
                      <div style={{textAlign: 'center', padding: '2rem', color: '#6b7280'}}>
                        No exercises found matching "{searchTerm}"
                      </div>
                    )}
                  </ExercisesList>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'session' && (
          <WorkoutSession>
            <SessionHeader>
              <h3>🏋️‍♂️ Current Workout</h3>
            </SessionHeader>
            
            <SessionStats>
              <StatItem>
                <span className="value">{workoutStarted ? 'Active' : 'Ready'}</span>
                <span className="label">Status</span>
              </StatItem>
              <StatItem>
                <span className="value">0</span>
                <span className="label">Exercises</span>
              </StatItem>
              <StatItem>
                <span className="value">0</span>
                <span className="label">Sets</span>
              </StatItem>
              <StatItem>
                <span className="value">0</span>
                <span className="label">Volume</span>
              </StatItem>
            </SessionStats>
            
            <div style={{textAlign: 'center', padding: '3rem 1rem'}}>
              <h4 style={{margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '500', color: '#1f2937'}}>Ready to start your workout?</h4>
              <p style={{color: '#6b7280', marginBottom: '2rem', fontSize: '0.95rem'}}>
                Browse exercises and start logging your sets
              </p>
              <ActionButton
                onClick={() => setActiveTab('browse')}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem'
                }}
              >
                Browse Exercises
              </ActionButton>
            </div>
          </WorkoutSession>
        )}
      </TabSection>

      <Modal $show={showModal}>
        <ModalContent>
          <ModalHeader>
            <h2>{selectedExercise?.name}</h2>
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
          </ModalHeader>
          
          {selectedExercise && (
            <ModalBody>
              <ExerciseAnimation>
                <div className="animation-placeholder">
                  {getAnimationEmoji(selectedExercise.category)}
                </div>
              </ExerciseAnimation>
              
              <SectionTitle>
                📋 Instructions
              </SectionTitle>
              <InstructionsList>
                {selectedExercise.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </InstructionsList>
              
              <SectionTitle>
                💡 Tips
              </SectionTitle>
              <TipsList>
                {selectedExercise.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </TipsList>

              <RestTimer $active={isResting}>
                <div className="timer">{formatTime(currentRestTime)}</div>
                <div>Rest Timer</div>
                {isResting ? (
                  <div className="controls">
                    <button onClick={() => setIsResting(false)}>Skip Rest</button>
                    <button onClick={() => setCurrentRestTime(currentRestTime + 30)}>+30s</button>
                  </div>
                ) : (
                  <div className="controls">
                    <button onClick={startRest}>Start Rest</button>
                  </div>
                )}
              </RestTimer>
              
              <SetLogger>
                <SetLoggerHeader>
                  <h4>📃 Log Sets</h4>
                </SetLoggerHeader>
                
                <SetLoggerContent>
                  <SetRow style={{background: '#f3f4f6', fontWeight: '600', fontSize: '0.8rem', color: '#374151'}}>
                    <div>Set</div>
                    <div>Reps</div>
                    <div>Weight (kg)</div>
                    <div>Rest (s)</div>
                    <div>✓</div>
                  </SetRow>
                  {sets.map((set, index) => (
                    <SetRow key={index}>
                      <div style={{fontWeight: '500', color: '#6b7280'}}>{index + 1}</div>
                      <SetInput
                        type="number"
                        placeholder="0"
                        value={set.reps || ''}
                        onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value) || 0)}
                      />
                      <SetInput
                        type="number"
                        placeholder="0"
                        step="0.5"
                        value={set.weight || ''}
                        onChange={(e) => updateSet(index, 'weight', parseFloat(e.target.value) || 0)}
                      />
                      <SetInput
                        type="number"
                        placeholder="90"
                        value={restTime}
                        onChange={(e) => setRestTime(parseInt(e.target.value) || 90)}
                      />
                      <input
                        type="checkbox"
                        checked={set.completed}
                        onChange={(e) => updateSet(index, 'completed', e.target.checked)}
                        style={{transform: 'scale(1.1)', accentColor: '#3b82f6'}}
                      />
                    </SetRow>
                  ))}
                  
                  <AddSetButton onClick={addSet}>+ Add Set</AddSetButton>
                  <FinishButton onClick={finishExercise}>
                    Complete Exercise ({sets.filter(s => s.completed).length} sets)
                  </FinishButton>
                </SetLoggerContent>
              </SetLogger>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Gym;