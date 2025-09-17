import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setCurrentUser, setIsAuthenticated, selectIsAuthenticated } from '../store/slices/userSlice';

const AuthContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="fitness-pattern" patternUnits="userSpaceOnUse" width="50" height="50"><circle cx="25" cy="25" r="2" fill="%23ffffff" opacity="0.1"/><text x="10" y="15" font-size="8" fill="%23ffffff" opacity="0.05">💪</text><text x="30" y="35" font-size="6" fill="%23ffffff" opacity="0.05">🏃</text></pattern></defs><rect width="100%" height="100%" fill="url(%23fitness-pattern)"/></svg>');
    animation: float 20s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

const AuthCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 3rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 450px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const TabContainer = styled.div`
  display: flex;
  background: #f8f9fa;
  border-radius: 15px;
  padding: 0.5rem;
  margin-bottom: 2rem;
  position: relative;
`;

const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 1rem;
  border: none;
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#666'};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &:hover {
    color: ${props => props.$active ? 'white' : '#333'};
    transform: ${props => props.$active ? 'none' : 'translateY(-1px)'};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
  
  label {
    display: block;
    margin-bottom: 0.75rem;
    font-weight: 600;
    color: #333;
    font-size: 0.95rem;
  }
`;

const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid ${props => props.$error ? '#e74c3c' : '#e9ecef'};
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${props => props.$error ? '#e74c3c' : '#667eea'};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.$error ? 'rgba(231, 76, 60, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
  }
  
  &::placeholder {
    color: #adb5bd;
  }
`;

const Select = styled.select<{ $error?: boolean }>`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid ${props => props.$error ? '#e74c3c' : '#e9ecef'};
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${props => props.$error ? '#e74c3c' : '#667eea'};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.$error ? 'rgba(231, 76, 60, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  font-weight: 500;
`;

const SubmitButton = styled.button<{ $loading?: boolean }>`
  padding: 1.25rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: ${props => props.$loading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.$loading ? 0.7 : 1};
  
  &:hover {
    transform: ${props => props.$loading ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.$loading ? 'none' : '0 10px 25px rgba(102, 126, 234, 0.3)'};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const WelcomeText = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 100%);
  border-radius: 15px;
  
  h3 {
    color: #27ae60;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  p {
    color: #666;
    font-size: 0.95rem;
  }
`;

interface FormData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  age: string;
  gender: 'male' | 'female' | 'other' | '';
  height: string;
  weight: string;
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active' | '';
  dietType: 'vegetarian' | 'vegan' | 'non_veg' | 'keto' | 'high_protein' | '';
  region: 'north_indian' | 'south_indian' | 'east_indian' | 'west_indian' | 'all' | '';
}

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
  age?: string;
  gender?: string;
  height?: string;
  weight?: string;
  activityLevel?: string;
  dietType?: string;
  region?: string;
}

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    dietType: '',
    region: ''
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Additional validations for signup
    if (activeTab === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData.age) {
        newErrors.age = 'Age is required';
      } else if (parseInt(formData.age) < 13 || parseInt(formData.age) > 120) {
        newErrors.age = 'Please enter a valid age';
      }
      
      if (!formData.gender) {
        newErrors.gender = 'Please select your gender';
      }
      
      if (!formData.height) {
        newErrors.height = 'Height is required';
      } else if (parseInt(formData.height) < 100 || parseInt(formData.height) > 250) {
        newErrors.height = 'Please enter height in cm (100-250)';
      }
      
      if (!formData.weight) {
        newErrors.weight = 'Weight is required';
      } else if (parseInt(formData.weight) < 30 || parseInt(formData.weight) > 300) {
        newErrors.weight = 'Please enter weight in kg (30-300)';
      }
      
      if (!formData.activityLevel) {
        newErrors.activityLevel = 'Please select your activity level';
      }
      
      if (!formData.dietType) {
        newErrors.dietType = 'Please select your diet preference';
      }
      
      if (!formData.region) {
        newErrors.region = 'Please select your region';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const calculateDailyCalorieGoal = (): number => {
    // Basic BMR calculation using Mifflin-St Jeor Equation
    const weight = parseInt(formData.weight);
    const height = parseInt(formData.height);
    const age = parseInt(formData.age);
    
    let bmr;
    if (formData.gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extra_active: 1.9
    };
    
    return Math.round(bmr * activityMultipliers[formData.activityLevel as keyof typeof activityMultipliers]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (activeTab === 'login') {
        // Login logic
        const user = {
          id: 'demo-user-' + Date.now(),
          email: formData.email,
          name: formData.email.split('@')[0],
          age: 25,
          gender: 'male' as const,
          height: 170,
          weight: 70,
          activityLevel: 'moderately_active' as const,
          dietType: 'vegetarian' as const,
          region: 'north_indian' as const,
          
          // Fitness Goals (default values for login)
          fitnessGoal: 'maintain_weight' as const,
          targetWeight: 70,
          weeklyWeightChangeGoal: 0,
          
          // Daily Goals
          dailyCalorieGoal: 2000,
          dailyStepGoal: 10000,
          dailyWaterGoal: 2000,
          
          // Macro Targets
          dailyProteinGoal: 120,
          dailyCarbsGoal: 200,
          dailyFatsGoal: 80,
          
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        dispatch(setCurrentUser(user));
        dispatch(setIsAuthenticated(true));
        
        // Redirect to dashboard after successful login
        navigate('/dashboard');
        
      } else {
        // Signup logic
        const weight = parseInt(formData.weight);
        const height = parseInt(formData.height);
        const age = parseInt(formData.age);
        const baseCalories = calculateDailyCalorieGoal();
        
        const user = {
          id: 'demo-user-' + Date.now(),
          email: formData.email,
          name: formData.name,
          age,
          gender: formData.gender as 'male' | 'female' | 'other',
          height,
          weight,
          activityLevel: formData.activityLevel as any,
          dietType: formData.dietType as any,
          region: formData.region as any,
          
          // Default fitness goal for new users
          fitnessGoal: 'maintain_weight' as const,
          targetWeight: weight,
          weeklyWeightChangeGoal: 0,
          
          // Daily Goals
          dailyCalorieGoal: baseCalories,
          dailyStepGoal: 10000,
          dailyWaterGoal: Math.round(weight * 35), // 35ml per kg
          
          // Basic macro split for maintenance (25% protein, 45% carbs, 30% fats)
          dailyProteinGoal: Math.round((baseCalories * 0.25) / 4),
          dailyCarbsGoal: Math.round((baseCalories * 0.45) / 4),
          dailyFatsGoal: Math.round((baseCalories * 0.30) / 9),
          
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        dispatch(setCurrentUser(user));
        dispatch(setIsAuthenticated(true));
        
        // Redirect to dashboard after successful signup
        navigate('/dashboard');
      }
      
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ email: 'Authentication failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>
          <h1>🏃‍♂️ CalorieFitness</h1>
          <p>Your journey to wellness starts here</p>
        </AuthHeader>

        <TabContainer>
          <TabButton 
            type="button"
            $active={activeTab === 'login'} 
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </TabButton>
          <TabButton 
            type="button"
            $active={activeTab === 'signup'} 
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </TabButton>
        </TabContainer>

        <Form onSubmit={handleSubmit}>
          {activeTab === 'signup' && (
            <FormGroup>
              <label>Full Name</label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                $error={!!errors.name}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>
          )}

          <FormGroup>
            <label>Email Address</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              $error={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              $error={!!errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>

          {activeTab === 'signup' && (
            <>
              <FormGroup>
                <label>Confirm Password</label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  $error={!!errors.confirmPassword}
                />
                {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <label>Age</label>
                  <Input
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    $error={!!errors.age}
                  />
                  {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <label>Gender</label>
                  <Select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    $error={!!errors.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                  {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label>Height (cm)</label>
                  <Input
                    type="number"
                    placeholder="Height in cm"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    $error={!!errors.height}
                  />
                  {errors.height && <ErrorMessage>{errors.height}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <label>Weight (kg)</label>
                  <Input
                    type="number"
                    placeholder="Weight in kg"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    $error={!!errors.weight}
                  />
                  {errors.weight && <ErrorMessage>{errors.weight}</ErrorMessage>}
                </FormGroup>
              </FormRow>

              <FormGroup>
                <label>Activity Level</label>
                <Select
                  value={formData.activityLevel}
                  onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                  $error={!!errors.activityLevel}
                >
                  <option value="">Select Activity Level</option>
                  <option value="sedentary">Sedentary (Little or no exercise)</option>
                  <option value="lightly_active">Lightly Active (Light exercise 1-3 days/week)</option>
                  <option value="moderately_active">Moderately Active (Moderate exercise 3-5 days/week)</option>
                  <option value="very_active">Very Active (Hard exercise 6-7 days/week)</option>
                  <option value="extra_active">Extra Active (Very hard exercise, physical job)</option>
                </Select>
                {errors.activityLevel && <ErrorMessage>{errors.activityLevel}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <label>Diet Preference</label>
                <Select
                  value={formData.dietType}
                  onChange={(e) => handleInputChange('dietType', e.target.value)}
                  $error={!!errors.dietType}
                >
                  <option value="">Select Diet Preference</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="non_veg">Non-Vegetarian</option>
                  <option value="keto">Keto</option>
                  <option value="high_protein">High Protein</option>
                </Select>
                {errors.dietType && <ErrorMessage>{errors.dietType}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <label>Region</label>
                <Select
                  value={formData.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  $error={!!errors.region}
                >
                  <option value="">Select Your Region</option>
                  <option value="north_indian">North Indian</option>
                  <option value="south_indian">South Indian</option>
                  <option value="east_indian">East Indian</option>
                  <option value="west_indian">West Indian</option>
                  <option value="all">All Regions</option>
                </Select>
                {errors.region && <ErrorMessage>{errors.region}</ErrorMessage>}
              </FormGroup>
            </>
          )}

          <SubmitButton type="submit" $loading={loading}>
            {loading ? '⏳ Processing...' : activeTab === 'login' ? '🚀 Sign In' : '🎯 Create Account'}
          </SubmitButton>
        </Form>

        <WelcomeText>
          <h3>🇮🇳 Welcome to India's Premier Fitness Tracker!</h3>
          <p>Join thousands of users tracking their wellness journey with our comprehensive food database and workout system.</p>
        </WelcomeText>
      </AuthCard>
    </AuthContainer>
  );
};

export default Auth;