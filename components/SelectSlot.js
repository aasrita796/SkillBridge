import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default react-calendar styles
import '../styles/SelectSlot.css'; // Specific CSS for SelectSlot

function SelectSlot() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSkills } = location.state || { selectedSkills: [] };

  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 12)); // Default to July 12, 2025 based on image
  const [selectedTime, setSelectedTime] = useState('03:00 PM'); // Default to 03:00 PM based on image

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const estimatedDuration = selectedSkills.length > 0 ? (selectedSkills.length * 15) : 30; // Example: 15 mins per skill, min 30

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const formatDateForDisplay = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleConfirmSlot = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and a time.');
      return;
    }
    navigate('/booking-confirmed', {
      state: {
        selectedSkills,
        selectedDate: selectedDate.toISOString(), // Pass as ISO string for easier re-parsing
        selectedTime,
        estimatedDuration
      }
    });
  };

  // Function to disable past dates and ensure only current month+ is selectable
  const tileDisabled = ({ date, view }) => {
    // Disable dates in the past (before today)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to start of day
    if (view === 'month' && date < today) {
      return true;
    }
    return false;
  };

  return (
    <div className="select-slot-page">
      <Link to="/select-skills" className="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg> Back to Skills
      </Link>

      <h2 className="page-title">Select Your Test Slot</h2>
      <p className="page-description">Choose your preferred date and time for the skill assessment.</p>

      <div className="slot-selection-container">
        <div className="card selected-skills-card">
          <h3>Selected Skills</h3>
          <div className="selected-skills-list">
            {selectedSkills.length > 0 ? (
              selectedSkills.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))
            ) : (
              <p>No skills selected.</p>
            )}
          </div>
          <p className="estimated-duration">Estimated Duration: ~{estimatedDuration} minutes</p>
        </div>

        <div className="card select-date-card">
          <h3>Select Date</h3>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date()} // Disable past dates
            tileDisabled={tileDisabled}
            next2Label={null} // Remove double arrow for next year
            prev2Label={null} // Remove double arrow for previous year
          />
        </div>

        <div className="card select-time-card">
          <h3>Select Time</h3>
          <div className="time-grid">
            {timeSlots.map(slot => (
              <button
                key={slot}
                className={`time-slot-btn ${selectedTime === slot ? 'selected' : ''}`}
                onClick={() => handleTimeChange(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="card booking-summary-card">
          <h3>Booking Summary</h3>
          <p><strong>Date:</strong> {selectedDate ? formatDateForDisplay(selectedDate) : 'Not selected'}</p>
          <p><strong>Time:</strong> {selectedTime || 'Not selected'}</p>
          <p><strong>Skills:</strong> {selectedSkills.length} selected</p>
          <p><strong>Duration:</strong> ~{estimatedDuration} minutes</p>
          <button
            className="btn-primary confirm-slot-btn"
            onClick={handleConfirmSlot}
            disabled={!selectedDate || !selectedTime || selectedSkills.length === 0}
          >
            Confirm Slot
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectSlot;