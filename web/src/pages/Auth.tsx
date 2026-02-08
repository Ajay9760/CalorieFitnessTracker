import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch } from '../store';
import { 
  selectIsAuthenticated, 
  selectIsLoading, 
  selectError,
  loginUser,
  registerUser,
  setError 
} from '../store/slices/userSlice';

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

const HelperText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
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
  username: string;
  name: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  username?: string;
  name?: string;
  confirmPassword?: string;
}

const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const userError = useSelector(selectError);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    username: '',
    name: '',
    confirmPassword: ''
  });

  // Clear any previous errors when component mounts or tab changes
  useEffect(() => {
    if (userError) {
      dispatch(setError(null));
    }
  }, [activeTab, dispatch, userError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Handle API errors
  useEffect(() => {
    if (userError) {
      setErrors({ email: userError });
    }
  }, [userError]);

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
      // Username validation
      if (!formData.username) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      } else if (formData.username.length > 20) {
        newErrors.username = 'Username must be less than 20 characters';
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        newErrors.username = 'Username can only contain letters, numbers, and underscores';
      }
      
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Clear previous errors
    setErrors({});
    dispatch(setError(null));
    
    try {
      if (activeTab === 'login') {
        // Login with email and password
        const resultAction = await dispatch(loginUser({
          email: formData.email,
          password: formData.password
        }));
        
        if (loginUser.fulfilled.match(resultAction)) {
          // Login successful - Redux will handle authentication state
          // Navigation will happen via the useEffect hook watching isAuthenticated
        }
        
      } else {
        // Register new user
        const registrationData = {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          name: formData.name
        };
        
        const resultAction = await dispatch(registerUser(registrationData));
        
        if (registerUser.fulfilled.match(resultAction)) {
          // Registration successful - Redux will handle authentication state
          // Navigation will happen via the useEffect hook watching isAuthenticated
        }
      }
      
    } catch (error) {
      console.error('Authentication error:', error);
      // Error handling is done by Redux and useEffect hook
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
            <>
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
              
              <FormGroup>
                <label>Username</label>
                <Input
                  type="text"
                  placeholder="Choose a unique username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  $error={!!errors.username}
                  maxLength={20}
                />
                {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
                {!errors.username && formData.username && (
                  <div style={{ fontSize: '0.75rem', color: '#27ae60', marginTop: '0.25rem' }}>
                    ✅ Username available
                  </div>
                )}
              </FormGroup>
            </>
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
              <HelperText>
                You can finish setting up your profile after creating your account.
              </HelperText>
            </>
          )}

          <SubmitButton type="submit" $loading={isLoading}>
            {isLoading ? '⏳ Processing...' : activeTab === 'login' ? '🚀 Sign In' : '🎯 Create Account'}
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
