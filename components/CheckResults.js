import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/CheckResults.css'; // Specific CSS for CheckResults

function CheckResults() {
  const [resultId, setResultId] = useState('');
  const navigate = useNavigate();

  const handleViewResults = () => {
    if (resultId) {
      // In a real application, you'd validate this ID against a backend
      // For this demo, we'll just navigate to a mock results page
      navigate(`/results/${resultId}`);
    } else {
      alert('Please enter a Result ID.');
    }
  };

  return (
    <div className="check-results-page">
      <Link to="/" className="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg> Back to Home
      </Link>

      <div className="check-results-content">
        <div className="magnifying-glass-icon">
          🔍 {/*  */}
        </div>
        <h2 className="page-title">Check Your Results</h2>
        <p className="page-description">Enter your unique result ID to view your skill assessment results.</p>

        <div className="card result-input-card">
          <h3>Enter Result ID</h3>
          <input
            type="text"
            placeholder="e.g. RES123ABC456"
            value={resultId}
            onChange={(e) => setResultId(e.target.value)}
            className="result-id-input"
          />
          <button className="btn-primary view-results-btn" onClick={handleViewResults}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg> View Results
          </button>
        </div>

        <div className="no-result-id">
          <p>Don't have your Result ID?</p>
          <Link to="/select-skills" className="take-new-test-link">Take a New Test</Link>
        </div>
      </div>
    </div>
  );
}

export default CheckResults;