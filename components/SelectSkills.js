import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SelectSkills.css'; // Specific CSS for SelectSkills

function SelectSkills() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();

  const skillCategories = [
    {
      name: 'Technical Skills',
      skills: ['JavaScript/TypeScript', 'Java', 'Node.js', 'Cloud Computing', 'Machine Learning', 'Python', 'React/Next.js', 'Database Management', 'DevOps', 'Cybersecurity']
    },
    {
      name: 'Soft Skills',
      skills: ['Communication', 'Problem Solving', 'Time Management', 'Teamwork', 'Leadership']
    },
    {
      name: 'Design Skills',
      skills: ['UI/UX Design', 'Graphic Design', 'Figma', 'Sketch']
    }
  ];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSkills([]); // Clear skills when category changes
  };

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    setSelectedSkills(prevSkills =>
      prevSkills.includes(skill)
        ? prevSkills.filter(s => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleSubmit = () => {
    if (selectedSkills.length > 0) {
      navigate('/select-slot', { state: { selectedSkills } });
    } else {
      alert('Please select at least one skill.');
    }
  };

  const currentCategory = skillCategories.find(cat => cat.name === selectedCategory);

  return (
    <div className="select-skills-page">
      <Link to="/" className="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg> Back to Home
      </Link>

      <h2 className="page-title">Select Your Skills</h2>
      <p className="page-description">Choose the skills you want to be assessed on. You can select multiple skills from different categories.</p>

      <div className="card skill-selection-card">
        <h3>Skill Categories</h3>
        <div className="form-group">
          <label htmlFor="skill-category">Select a Category</label>
          <select
            id="skill-category"
            className="select-dropdown"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Choose a skill category</option>
            {skillCategories.map(category => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && currentCategory && (
          <div className="select-skills-checkboxes">
            <h4>Select Skills from {currentCategory.name}</h4>
            <div className="skills-grid">
              {currentCategory.skills.map(skill => (
                <label key={skill} className="skill-checkbox-label">
                  <input
                    type="checkbox"
                    value={skill}
                    checked={selectedSkills.includes(skill)}
                    onChange={handleSkillChange}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>
        )}

        <button
          className="btn-primary continue-btn"
          onClick={handleSubmit}
          disabled={selectedSkills.length === 0}
        >
          Continue to Slot Selection
        </button>
      </div>
    </div>
  );
}

export default SelectSkills;