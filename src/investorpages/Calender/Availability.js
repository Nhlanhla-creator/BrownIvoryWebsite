"use client"

import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './Availability.css';

const Availability = ({ onSubmit, workingHours: existingHours }) => {
  const [workingHours, setWorkingHours] = useState(existingHours || {
    monday: [{ start: '09:00', end: '17:00' }],
    tuesday: [{ start: '09:00', end: '17:00' }],
    wednesday: [{ start: '09:00', end: '17:00' }],
    thursday: [{ start: '09:00', end: '17:00' }],
    friday: [{ start: '09:00', end: '17:00' }],
    saturday: [],
    sunday: []
  });
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const handleTimeChange = (day, index, field, value) => {
    const updatedDay = [...workingHours[day]];
    updatedDay[index][field] = value;
    setWorkingHours({ ...workingHours, [day]: updatedDay });
  };

  const addTimeSlot = (day) => {
    setWorkingHours({
      ...workingHours,
      [day]: [...workingHours[day], { start: '09:00', end: '17:00' }]
    });
  };

  const removeTimeSlot = (day, index) => {
    const updatedDay = [...workingHours[day]];
    updatedDay.splice(index, 1);
    setWorkingHours({ ...workingHours, [day]: updatedDay });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...workingHours, timeZone, dateOverrides: selectedDates });
  };

  return (
    <div className="availability-schedule">
      <div className="weekly-hours">
        <h3>Weekly Hours</h3>
        {days.map((day) => (
          <div key={day} className="day-row">
            <div className="day-label">{day.charAt(0).toUpperCase()}</div>
            {workingHours[day].length === 0 ? (
              <button className="add-slot-btn" onClick={() => addTimeSlot(day)}>+ Add</button>
            ) : (
              workingHours[day].map((slot, index) => (
                <div className="time-slot" key={index}>
                  <input type="time" value={slot.start} onChange={(e) => handleTimeChange(day, index, 'start', e.target.value)} />
                  <span>-</span>
                  <input type="time" value={slot.end} onChange={(e) => handleTimeChange(day, index, 'end', e.target.value)} />
                  <button onClick={() => removeTimeSlot(day, index)}>×</button>
                  {index === workingHours[day].length - 1 && <button onClick={() => addTimeSlot(day)}>+</button>}
                </div>
              ))
            )}
          </div>
        ))}
        <div className="timezone-selector">
          <label>Time Zone:</label>
          <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
            {Intl.supportedValuesOf('timeZone').map((zone) => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="date-specific-hours">
        <h3>Date-specific hours</h3>
        <button className="open-calendar" onClick={() => setShowCalendarModal(true)}>+ Hours</button>
      </div>

      {showCalendarModal && (
        <div className="modal-overlay" onClick={() => setShowCalendarModal(false)}>
          <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Select the date(s) you want to assign specific hours</h2>
            <DayPicker
              mode="multiple"
              selected={selectedDates}
              onSelect={setSelectedDates}
              className="brown-calendar"
            />
            <div className="modal-actions">
              <button onClick={() => setShowCalendarModal(false)}>Cancel</button>
              <button className="apply-btn" onClick={() => setShowCalendarModal(false)}>Apply</button>
            </div>
          </div>
        </div>
      )}

      <button type="submit" onClick={handleSubmit} className="save-btn">Save Availability</button>
    </div>
  );
};

export default Availability;
