import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { GYM_EXERCISES_DATABASE, EXERCISE_CATEGORIES, WORKOUT_TEMPLATES, GymExercise, BodyPart } from '../data/gymExercises';
import { addActivity } from '../store/slices/activitySlice';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  color: white;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #fff, #f39c12, #e74c3c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s ease-in-out infinite;
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
  
  @keyframes shimmer {
    0%, 100% { filter: hue-rotate(0deg); }
    50% { filter: hue-rotate(45deg); }
  }
`;

const TabSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
`;

const TabHeader = styled.div`
  display: flex;
  background: #f8f9fa;
  border-radius: 15px;
  padding: 0.5rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  min-width: 120px;
  padding: 1rem 1.5rem;
  border: none;
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#666'};
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  
  &:hover {
    color: ${props => props.$active ? 'white' : '#333'};
    background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(102, 126, 234, 0.1)'};
  }
`;

const WorkoutSession = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="20">🏋️‍♂️</text></svg>') repeat;
    opacity: 0.1;
    animation: float 10s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateX(0px); }
    50% { transform: translateX(-10px); }
  }
`;

const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  
  h3 {
    font-size: 1.8rem;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const SessionStats = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  .value {
    font-size: 1.5rem;
    font-weight: bold;
    display: block;
  }
  
  .label {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const BodyPartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const BodyPartCard = styled.div<{ $color: string }>`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border-left: 4px solid ${props => props.$color};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    border-left-width: 6px;
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
    gap: 0.5rem;
    font-size: 1.3rem;
    margin: 0;
    color: #333;
    
    .emoji {
      font-size: 1.5rem;
    }
  }
  
  .count {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const ExercisesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ExerciseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: #e9ecef;
    transform: translateX(5px);
  }
`;

const ExerciseInfo = styled.div`
  flex: 1;
  
  .name {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
  }
  
  .details {
    font-size: 0.8rem;
    color: #666;
    display: flex;
    gap: 1rem;
  }
  
  .difficulty {
    padding: 0.125rem 0.5rem;
    border-radius: 8px;
    font-size: 0.7rem;
    font-weight: 600;
    
    &.Beginner { background: #d4edda; color: #155724; }
    &.Intermediate { background: #fff3cd; color: #856404; }
    &.Advanced { background: #f8d7da; color: #721c24; }
  }
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  }
`;

const Modal = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${props => props.$show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
  
  h2 {
    flex: 1;
    margin: 0;
    color: #333;
    font-size: 1.5rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  
  &:hover {
    color: #333;
  }
`;

const ExerciseAnimation = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  .animation-placeholder {
    font-size: 4rem;
    animation: exerciseMove 2s ease-in-out infinite;
  }
  
  @keyframes exerciseMove {
    0%, 100% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(1.1) rotate(-5deg); }
    50% { transform: scale(1.2) rotate(0deg); }
    75% { transform: scale(1.1) rotate(5deg); }
  }
`;

const InstructionsList = styled.ol`
  margin: 1.5rem 0;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
    color: #444;
  }
`;

const TipsList = styled.ul`
  background: #e8f5e8;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  margin: 1.5rem 0;
  
  li {
    margin-bottom: 0.5rem;
    color: #2d5a2d;
    line-height: 1.5;
  }
`;

const SetLogger = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 15px;
  margin-top: 2rem;
`;

const SetRow = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr 1fr 60px;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border-radius: 10px;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SetInput = styled.input`
  padding: 0.5rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  
  &:focus {
    border-color: #667eea;
    outline: none;
  }
`;

const AddSetButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background: #218838;
  }
`;

const FinishButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(40, 167, 69, 0.3);
  }
`;

const RestTimer = styled.div<{ $active: boolean }>`
  background: ${props => props.$active ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)' : '#f8f9fa'};
  color: ${props => props.$active ? 'white' : '#333'};
  padding: 1rem;
  border-radius: 15px;
  text-align: center;
  margin: 1rem 0;
  
  .timer {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    
    button {
      background: rgba(255, 255, 255, 0.2);
      color: ${props => props.$active ? 'white' : '#333'};
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
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

  return (
    <Container>
      <Header>
        <h1>🏋️‍♂️ Gym Workout Tracker</h1>
        <p>Professional strength training with 50+ exercises per body part</p>
      </Header>

      <TabSection>
        <TabHeader>
          <Tab $active={activeTab === 'browse'} onClick={() => setActiveTab('browse')}>
            💪 Browse Exercises
          </Tab>
          <Tab $active={activeTab === 'session'} onClick={() => setActiveTab('session')}>
            🎯 Current Session
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
                      <span className="count">{category.exercises.length} exercises</span>
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
                        <div style={{textAlign: 'center', padding: '0.5rem', color: '#666', fontSize: '0.9rem'}}>
                          +{category.exercises.length - 3} more exercises
                        </div>
                      )}
                    </ExercisesList>
                  </BodyPartCard>
                ))}
              </BodyPartGrid>
            ) : (
              <div>
                <div style={{marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  <button
                    onClick={() => setSelectedBodyPart(null)}
                    style={{
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    ← Back
                  </button>
                  <h2 style={{margin: 0, color: '#333'}}>
                    {EXERCISE_CATEGORIES[selectedBodyPart].emoji} {EXERCISE_CATEGORIES[selectedBodyPart].name} Exercises
                  </h2>
                </div>
                
                <ExercisesList>
                  {EXERCISE_CATEGORIES[selectedBodyPart].exercises.map((exercise) => (
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
                        Start Exercise
                      </ActionButton>
                    </ExerciseItem>
                  ))}
                </ExercisesList>
              </div>
            )}
          </>
        )}

        {activeTab === 'session' && (
          <WorkoutSession>
            <SessionHeader>
              <h3>💪 Current Workout Session</h3>
              <SessionStats>
                <StatItem>
                  <span className="value">{workoutStarted ? '🔥' : '⏸️'}</span>
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
                  <span className="label">Calories</span>
                </StatItem>
              </SessionStats>
            </SessionHeader>
            
            <div style={{position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem'}}>
              <h4 style={{margin: '0 0 1rem 0', fontSize: '1.2rem'}}>Ready to start your workout?</h4>
              <p style={{opacity: 0.9, marginBottom: '2rem'}}>
                Browse exercises and start logging your sets to begin your session
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                🚀 Browse Exercises
              </button>
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
            <>
              <ExerciseAnimation>
                <div className="animation-placeholder">
                  {getAnimationEmoji(selectedExercise.category)}
                </div>
              </ExerciseAnimation>
              
              <div style={{marginBottom: '2rem'}}>
                <h4>Instructions:</h4>
                <InstructionsList>
                  {selectedExercise.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </InstructionsList>
              </div>
              
              <div>
                <h4>💡 Pro Tips:</h4>
                <TipsList>
                  {selectedExercise.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </TipsList>
              </div>

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
                <h4 style={{marginBottom: '1rem'}}>📊 Log Your Sets</h4>
                <div style={{marginBottom: '1rem'}}>
                  <SetRow style={{background: '#667eea', color: 'white', fontWeight: 'bold'}}>
                    <div>Set</div>
                    <div>Reps</div>
                    <div>Weight (kg)</div>
                    <div>Rest (s)</div>
                    <div>✓</div>
                  </SetRow>
                  {sets.map((set, index) => (
                    <SetRow key={index}>
                      <div>{index + 1}</div>
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
                        style={{transform: 'scale(1.2)'}}
                      />
                    </SetRow>
                  ))}
                </div>
                <AddSetButton onClick={addSet}>+ Add Set</AddSetButton>
                <FinishButton onClick={finishExercise}>
                  🎯 Finish Exercise ({sets.filter(s => s.completed).length} sets completed)
                </FinishButton>
              </SetLogger>
            </>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Gym;