import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Specific CSS for HomePage

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Bridge Your Skills to Success</h1>
        <p>Discover your strengths, identify growth areas, and unlock your potential with our comprehensive skill assessment platform.</p>
        <div className="get-started-dropdown">
          <button className="get-started-btn">Get Started <span className="dropdown-arrow">▼</span></button>
          <div className="dropdown-content">
            <Link to="/select-skills">Schedule Your Test</Link>
            <Link to="/check-results">Check Your Results</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <div className="icon-wrapper">
            <span className="icon">🎯</span> {/*  */}
          </div>
          <h3>Comprehensive Assessment</h3>
          <p>Evaluate both technical and non-technical skills with our advanced testing system.</p>
        </div>
        <div className="feature-card">
          <div className="icon-wrapper">
            <span className="icon">📈</span> {/*  */}
          </div>
          <h3>Personalized Results</h3>
          <p>Get detailed insights and personalized recommendations for your career growth.</p>
        </div>
        <div className="feature-card">
          <div className="icon-wrapper">
            <span className="icon">🏅</span> {/*  */}
          </div>
          <h3>Career Guidance</h3>
          <p>Discover suitable job roles and learning paths based on your skill profile.</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;