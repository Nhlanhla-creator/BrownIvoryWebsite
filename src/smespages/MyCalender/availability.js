import React, { useState } from 'react';
import './Availability.css';

const Availability = ({ onSubmit }) => {
  const [workingHours, setWorkingHours] = useState({
    start: '09:00',
    end: '17:00',
    days: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    }
  });

  const handleDayToggle = (day) => {
    setWorkingHours({
      ...workingHours,
      days: {
        ...workingHours.days,
        [day]: !workingHours.days[day]
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(workingHours);
  };

  return (
    <div className="availability-container">
      <h3>Set Your Working Hours</h3>
      <form onSubmit={handleSubmit}>
        <div className="time-range">
          <label>
            Start Time:
            <input 
              type="time" 
              value={workingHours.start}
              onChange={(e) => setWorkingHours({...workingHours, start: e.target.value})}
              required
            />
          </label>
          <label>
            End Time:
            <input 
              type="time" 
              value={workingHours.end}
              onChange={(e) => setWorkingHours({...workingHours, end: e.target.value})}
              required
            />
          </label>
        </div>
        
        <div className="days-selection">
          <p>Available Days:</p>
          <div className="days-grid">
            {Object.keys(workingHours.days).map(day => (
              <div key={day} className="day-item">
                <input
                  type="checkbox"
                  id={day}
                  checked={workingHours.days[day]}
                  onChange={() => handleDayToggle(day)}
                />
                <label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit" className="save-btn">Save Availability</button>
      </form>
    </div>
  );
};

export default Availability;