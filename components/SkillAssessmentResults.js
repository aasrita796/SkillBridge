import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/SkillAssessmentResults.css'; // Specific CSS for Results

function SkillAssessmentResults() {
  const { resultId } = useParams();
  // In a real app, you'd fetch data based on resultId from an API
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchResults = () => {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        if (resultId === 'ERVEEE' || resultId === 'RES123ABC456') { // Example IDs from images
          setResults({
            overallScore: 78,
            skillBreakdown: [
              { name: 'JavaScript', score: 85 },
              { name: 'Problem Solving', score: 75 },
              { name: 'React', score: 80 },
              { name: 'Communication', score: 70 },
              { name: 'Time Management', score: 82 },
            ],
            individualSkillScores: [
              { name: 'JavaScript', score: 85, type: 'Technical' },
              { name: 'Problem Solving', score: 75, type: 'Soft Skills' },
              { name: 'React', score: 80, type: 'Technical' },
              { name: 'Communication', score: 70, type: 'Soft Skills' },
              { name: 'Time Management', score: 82, type: 'Soft Skills' },
            ],
            recommendedLearningPaths: [
              'Advanced JavaScript Concepts',
              'React Performance Optimization',
              'Effective Communication in Tech',
              'Project Management Fundamentals',
            ],
            suitableJobRoles: [
              'Frontend Developer',
              'Full Stack Developer',
              'Technical Lead',
              'Product Manager',
            ],
          });
        } else {
          setError('Result ID not found or invalid.');
        }
        setLoading(false);
      }, 1500); // Simulate network delay
    };

    fetchResults();
  }, [resultId]);

  if (loading) {
    return <div className="loading-message">Loading results...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <Link to="/check-results" className="btn-primary">Try another Result ID</Link>
        <Link to="/select-skills" className="btn-primary" style={{ marginLeft: '10px' }}>Take a New Test</Link>
      </div>
    );
  }

  if (!results) {
    return <div className="no-results-message">No results to display.</div>;
  }

  return (
    <div className="skill-assessment-results-page">
      <Link to="/check-results" className="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg> Search Another Result
      </Link>

      <h2 className="page-title">Your Skill Assessment Results</h2>
      <p className="result-id-display">Result ID: {resultId}</p>

      <div className="results-grid">
        <div className="card overall-score-card">
          <h3>Overall Score</h3>
          <div className="overall-score-circle">
            <CircularProgressbar
              value={results.overallScore}
              text={`${results.overallScore}%`}
              styles={buildStyles({
                pathColor: `#007bff`,
                textColor: '#007bff',
                trailColor: '#f0f2f5',
                textSize: '18px',
              })}
            />
          </div>
          <p className="overall-performance-text">Overall Performance</p>
        </div>

        <div className="card skill-breakdown-card">
          <h3>Skill Breakdown</h3>
          <div className="skill-breakdown-chart">
            {/* Using a simple bar chart representation for now */}
            {/* In a real app, you might use a charting library like Chart.js or Recharts */}
            {results.skillBreakdown.map((skill, index) => (
              <div key={index} className="skill-bar-container">
                <span className="skill-name">{skill.name}</span>
                <div className="skill-bar-wrapper">
                  <div className="skill-bar" style={{ width: `${skill.score}%` }}></div>
                </div>
                <span className="skill-score">{skill.score}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card individual-skill-scores-card">
          <h3>Individual Skill Scores</h3>
          <div className="individual-scores-grid">
            {results.individualSkillScores.map((skill, index) => (
              <div key={index} className="individual-skill-item">
                <CircularProgressbar
                  value={skill.score}
                  text={`${skill.score}%`}
                  styles={buildStyles({
                    pathColor: getSkillColor(skill.type), // Function to get color based on type
                    textColor: getSkillColor(skill.type),
                    trailColor: '#f0f2f5',
                    textSize: '22px',
                  })}
                />
                <p className="skill-name-label">{skill.name}</p>
                <p className="skill-type-label">{skill.type}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card recommended-learning-paths-card">
          <h3>Recommended Learning Paths</h3>
          <ol className="learning-paths-list">
            {results.recommendedLearningPaths.map((path, index) => (
              <li key={index}>{path}</li>
            ))}
          </ol>
        </div>

        <div className="card suitable-job-roles-card">
          <h3>Suitable Job Roles</h3>
          <ol className="job-roles-list">
            {results.suitableJobRoles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

// Helper function for skill colors based on type
const getSkillColor = (type) => {
  switch (type) {
    case 'Technical':
      return '#007bff'; // Blue
    case 'Soft Skills':
      return '#28a745'; // Green
    case 'Design':
      return '#ffc107'; // Yellow
    default:
      return '#6c757d'; // Grey
  }
};

export default SkillAssessmentResults;