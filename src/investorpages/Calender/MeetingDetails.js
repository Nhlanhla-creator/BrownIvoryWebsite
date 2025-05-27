
import React, { useState, useEffect } from 'react';
import './MeetingDetails.css';

const MeetingDetails = ({ meeting, onAction, onClose }) => {
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  // Sample meeting data for demo
  const defaultMeeting = {
    id: 1,
    title: 'Team Meeting',
    date: new Date('2025-05-27T14:00:00'),
    duration: 60,
    location: 'Conference Room A',
    host: 'You',
    description: 'Weekly team sync to discuss project progress and upcoming milestones',
    invitees: ['john@example.com', 'jane@example.com', 'mike@example.com'],
    status: 'pending'
  };

  const currentMeeting = meeting || defaultMeeting;
  const formattedDate = new Date(currentMeeting.date).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Set default reschedule date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setRescheduleDate(dateStr);
    setRescheduleTime('15:00');
  }, []);

  const handleReschedule = () => {
    if (rescheduleDate && rescheduleTime) {
      const newDateTime = new Date(`${rescheduleDate}T${rescheduleTime}`);
      const formattedNewDate = newDateTime.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      
      showResponseMessage(`Meeting rescheduled to ${formattedNewDate} at ${rescheduleTime}`);
      
      if (onAction) {
        onAction(currentMeeting.id, 'rescheduled', { newDate: newDateTime });
      }
      
      setShowReschedule(false);
    } else {
      alert('Please select both date and time');
    }
  };

  const handleAccept = () => {
    showResponseMessage('Meeting accepted! Calendar invitation has been added.');
    if (onAction) {
      onAction(currentMeeting.id, 'completed');
    }
  };

  const handleReject = () => {
    showResponseMessage('Meeting declined. The organizer has been notified.');
    if (onAction) {
      onAction(currentMeeting.id, 'cancelled');
    }
  };

  const showResponseMessage = (message) => {
    setResponseMessage(message);
    setShowResponse(true);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #e8ddd4 0%, #d4c4a8 100%)',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="meeting-details">
        <div className="meeting-header">
          <h2>{currentMeeting.title}</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <div className="meeting-table">
          <table>
            <tbody>
              <tr>
                <td className="label-cell">Date & Time</td>
                <td className="value-cell">{formattedDate}</td>
              </tr>
              <tr>
                <td className="label-cell">Duration</td>
                <td className="value-cell">{currentMeeting.duration} minutes</td>
              </tr>
              <tr>
                <td className="label-cell">Location</td>
                <td className="value-cell">{currentMeeting.location}</td>
              </tr>
              <tr>
                <td className="label-cell">Host</td>
                <td className="value-cell">{currentMeeting.host}</td>
              </tr>
              <tr>
                <td className="label-cell">Description</td>
                <td className="value-cell">{currentMeeting.description || 'No description provided'}</td>
              </tr>
              {currentMeeting.invitees && currentMeeting.invitees.length > 0 && (
                <tr>
                  <td className="label-cell">Invitees</td>
                  <td className="value-cell">
                    <div className="invitees-list">
                      {currentMeeting.invitees.map((invitee, index) => (
                        <span key={index} className="invitee-tag">{invitee}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showReschedule && (
          <div className={`reschedule-form ${showReschedule ? 'show' : ''}`}>
            <h3>Reschedule Meeting</h3>
            <div className="form-row">
              <input
                type="date"
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
                className="date-input"
              />
              <input
                type="time"
                value={rescheduleTime}
                onChange={(e) => setRescheduleTime(e.target.value)}
                className="time-input"
              />
            </div>
            <div className="form-actions">
              <button onClick={() => setShowReschedule(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleReschedule} className="confirm-btn">
                Confirm
              </button>
            </div>
          </div>
        )}

        {!showResponse && (
          <div className="meeting-actions">
            {currentMeeting.status === 'pending' && (
              <>
                <button className="accept-btn" onClick={handleAccept}>
                  Accept
                </button>
                <button className="reschedule-btn" onClick={() => setShowReschedule(true)}>
                  Reschedule
                </button>
                <button className="reject-btn" onClick={handleReject}>
                  Reject
                </button>
              </>
            )}
          </div>
        )}

        {showResponse && (
          <div className={`response-message ${showResponse ? 'show' : ''}`}>
            {responseMessage}
          </div>
        )}
        </div>
    </div>
  );
};

export default MeetingDetails;