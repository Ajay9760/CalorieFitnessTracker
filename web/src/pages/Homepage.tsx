import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';
import './Homepage.css';

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🍽️',
      title: 'Indian Food Database',
      description: 'Comprehensive database with 1000+ Indian foods, regional cuisines, and traditional serving sizes.'
    },
    {
      icon: '🏃‍♂️',
      title: 'Activity Tracking',
      description: 'Track your steps, workouts, and daily activities with smart insights and progress visualization.'
    },
    {
      icon: '📊',
      title: 'Progress Analytics',
      description: 'Beautiful charts and graphs showing your fitness journey with weekly and monthly trends.'
    },
    {
      icon: '🎯',
      title: 'Personalized Goals',
      description: 'Set custom calorie, step, and nutrition goals based on your profile and activity level.'
    },
    {
      icon: '🏋️‍♀️',
      title: 'Gym Workouts',
      description: 'Complete exercise database with muscle group targeting and workout templates.'
    },
    {
      icon: '💡',
      title: 'Smart Insights',
      description: 'AI-powered recommendations and tips to help you reach your fitness goals faster.'
    }
  ];


  const motivationalQuotes = [
    "Your body can do it. It's your mind you need to convince.",
    "Progress, not perfection.",
    "Every small step counts towards your big goal.",
    "Health is not about the weight you lose, but about the life you gain."
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Transform Your Health Journey with 
              <span className="text-primary"> Smart Tracking</span>
            </h1>
            <p className="hero-subtitle">
              The most comprehensive fitness and calorie tracker designed for Indian lifestyle. 
              Track calories, workouts, and progress with our intelligent insights.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary btn-large"
                onClick={() => navigate('/auth')}
              >
                🚀 Start Your Journey
              </button>
              <button 
                className="btn btn-outline btn-large"
                onClick={() => navigate('/demo')}
              >
                👀 View Demo
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="app-preview">
                  <div className="preview-header">
                    <div className="preview-title">Today's Progress</div>
                  </div>
                  <div className="preview-stats">
                    <div className="stat-card">
                      <div className="stat-value">--</div>
                      <div className="stat-label">Calories</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">--</div>
                      <div className="stat-label">Steps</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">--</div>
                      <div className="stat-label">Water</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features for Your Wellness</h2>
            <p className="section-subtitle">Everything you need to track, analyze, and improve your health</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="motivation">
        <div className="container">
          <div className="motivation-content">
            <h2 className="motivation-title">Stay Motivated Every Day</h2>
            <div className="quotes-carousel">
              {motivationalQuotes.map((quote, index) => (
                <div key={index} className="quote-card">
                  <div className="quote-text">"{quote}"</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">🍽️</div>
              <div className="stat-text">Indian Food Database</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">🏋️</div>
              <div className="stat-text">Exercise Library</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">📊</div>
              <div className="stat-text">Progress Tracking</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">🎯</div>
              <div className="stat-text">Goal Setting</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Fitness Journey?</h2>
            <p className="cta-subtitle">Take the first step towards a healthier lifestyle with our comprehensive tracking tools</p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => navigate('/auth')}
            >
              Get Started Free 🎉
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Homepage;