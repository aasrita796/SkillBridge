import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import SelectSkills from './components/SelectSkills';
import SelectSlot from './components/SelectSlot';
import BookingConfirmed from './components/BookingConfirmed';
import CheckResults from './components/CheckResults';
import SkillAssessmentResults from './components/SkillAssessmentResults';
import './App.css'; // Global CSS

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="logo">
            <Link to="/">
              <img src="/skillbridge-logo.png" alt="SkillBridge Logo" /> SkillBridge
            </Link>
          </div>
          <nav className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select-skills" element={<SelectSkills />} />
          <Route path="/select-slot" element={<SelectSlot />} />
          <Route path="/booking-confirmed" element={<BookingConfirmed />} />
          <Route path="/check-results" element={<CheckResults />} />
          <Route path="/results/:resultId" element={<SkillAssessmentResults />} />
          {/* You might add specific routes for login/signup if they are full pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;