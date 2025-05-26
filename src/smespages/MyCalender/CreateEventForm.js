import React, { useState } from 'react';
import './CreateEventForm.css';

const CreateEventForm = ({ onSubmit, onCancel }) => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '30',
    location: '',
    description: '',
    invitees: []
  });

  const [newInvitee, setNewInvitee] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleAddInvitee = () => {
    if (newInvitee.trim()) {
      setEventData({
        ...eventData,
        invitees: [...eventData.invitees, newInvitee.trim()]
      });
      setNewInvitee('');
    }
  };

  const handleRemoveInvitee = (index) => {
    const updatedInvitees = [...eventData.invitees];
    updatedInvitees.splice(index, 1);
    setEventData({ ...eventData, invitees: updatedInvitees });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullEvent = {
      ...eventData,
      id: Date.now().toString(),
      status: 'pending',
      date: `${eventData.date}T${eventData.time}`,
      host: 'You'
    };
    onSubmit(fullEvent);
  };

  return (
    <div className="create-event-form">
      <h3>Create New Event</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Duration (min)</label>
            <select
              name="duration"
              value={eventData.duration}
              onChange={handleChange}
            >
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="90">90</option>
              <option value="120">120</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Invitees</label>
          <div className="invitees-input">
            <input
              type="email"
              value={newInvitee}
              onChange={(e) => setNewInvitee(e.target.value)}
              placeholder="Enter email"
            />
            <button type="button" onClick={handleAddInvitee}>
              Add
            </button>
          </div>
          {eventData.invitees.length > 0 && (
            <div className="invitees-list">
              {eventData.invitees.map((invitee, index) => (
                <div key={index} className="invitee-item">
                  {invitee}
                  <button
                    type="button"
                    onClick={() => handleRemoveInvitee(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;