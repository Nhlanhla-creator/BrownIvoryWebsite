import React, { useState, useEffect } from 'react';
import './MeetingDetails.css';

const MeetingDetails = ({ meeting, onAction, onClose }) => {
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [showAvailableSlots, setShowAvailableSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Sample meeting data for demo
  const defaultMeeting = {
    id: 1,
    title: 'Team Meeting',
    date: null, // Initialize with null date
    duration: 60,
    location: 'Conference Room A',
    host: 'You',
    description: 'Weekly team sync to discuss project progress and upcoming milestones',
    invitees: ['john@example.com', 'jane@example.com', 'mike@example.com'],
    status: 'pending'
  };

  // Sample available time slots
  const availableSlots = [
    {
      id: 1,
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      duration: 60
    },
    {
      id: 2,
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      duration: 60
    },
    {
      id: 3,
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      duration: 60
    }
  ];

  const currentMeeting = meeting || defaultMeeting;
  const formattedDate = currentMeeting.date 
    ? new Date(currentMeeting.date).toLocaleString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'No date selected (choose a slot)';

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
        weekday: 'long',
        day: 'numeric',
        month: 'long'
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
    if (!currentMeeting.date) {
      showResponseMessage('Please select a time slot before accepting');
      return;
    }
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

  const formatSlotTime = (date) => {
    return date.toLocaleString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    // Update the meeting's date/time immediately when a slot is selected
    const updatedMeeting = {
      ...currentMeeting,
      date: slot.date,
      time: slot.date.toTimeString().substring(0, 5)
    };
    
    // Call onAction with 'rescheduled' status and the new date
    if (onAction) {
      onAction(currentMeeting.id, 'rescheduled', { newDate: slot.date });
    }
    
    showResponseMessage(`Meeting scheduled for ${formatSlotTime(slot.date)}`);
  };

  return (
    <div className="meeting-details-container">
      <div className="meeting-details-card">
        <div className="meeting-header">
          <h2>{currentMeeting.title}</h2>
          <button className="close-btn" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#5A3921" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="meeting-content">
          <div className="meeting-info">
            <div className="info-row">
              <div className="info-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#8C6842" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Date & Time</span>
              </div>
              <div className="info-value">{formattedDate}</div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#8C6842" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Duration</span>
              </div>
              <div className="info-value">{currentMeeting.duration} minutes</div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.657 16.657L13.414 20.9C13.039 21.2746 13.0306 21.4852 12.0005 21.4852C11.4704 21.4852 10.962 21.2746 10.587 20.9L6.343 16.657C5.22422 15.5382 4.46234 14.1127 4.15369 12.5609C3.84504 11.009 4.00349 9.4005 4.60901 7.93871C5.21452 6.47693 6.2399 5.22749 7.55548 4.34846C8.87107 3.46943 10.4178 3.00024 12 3.00024C13.5822 3.00024 15.1289 3.46943 16.4445 4.34846C17.7601 5.22749 18.7855 6.47693 19.391 7.93871C19.9965 9.4005 20.155 11.009 19.8463 12.5609C19.5377 14.1127 18.7758 15.5382 17.657 16.657Z" stroke="#8C6842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Location</span>
              </div>
              <div className="info-value">{currentMeeting.location}</div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7Z" stroke="#8C6842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Host</span>
              </div>
              <div className="info-value">{currentMeeting.host}</div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#8C6842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Description</span>
              </div>
              <div className="info-value">{currentMeeting.description || 'No description provided'}</div>
            </div>

            {currentMeeting.invitees && currentMeeting.invitees.length > 0 && (
              <div className="info-row">
                <div className="info-label">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="#8C6842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Invitees</span>
                </div>
                <div className="info-value">
                  <div className="invitees-list">
                    {currentMeeting.invitees.map((invitee, index) => (
                      <span key={index} className="invitee-tag">{invitee}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Available Slots Section */}
          <div className="available-slots-section">
            <button 
              className="show-slots-btn"
              onClick={() => setShowAvailableSlots(!showAvailableSlots)}
            >
              {showAvailableSlots ? 'Hide Available Slots' : 'Show Available Slots'}
            </button>

            {showAvailableSlots && (
              <div className="available-slots">
                <h3>Choose an Available Slot</h3>
                <div className="slots-grid">
                  {availableSlots.map(slot => (
                    <div 
                      key={slot.id}
                      className={`slot-card ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      <div className="slot-date">{formatSlotTime(slot.date)}</div>
                      <div className="slot-duration">{slot.duration} minutes</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showReschedule && (
            <div className="reschedule-form">
              <h3>Reschedule Meeting</h3>
              <div className="form-fields">
                <div className="input-group">
                  <label>New Date</label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="date-input"
                  />
                </div>
                <div className="input-group">
                  <label>New Time</label>
                  <input
                    type="time"
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    className="time-input"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button onClick={() => setShowReschedule(false)} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={handleReschedule} className="confirm-btn">
                  Confirm Reschedule
                </button>
              </div>
            </div>
          )}

          {showResponse ? (
            <div className="response-message">
              <p>{responseMessage}</p>
              <button onClick={handleClose} className="close-message-btn">
                Close
              </button>
            </div>
          ) : (
            <div className="meeting-actions">
              {currentMeeting.status === 'pending' && (
                <>
                  <button className="accept-btn" onClick={handleAccept}>
                    Accept Meeting
                  </button>
                  <button className="reschedule-btn" onClick={() => setShowReschedule(true)}>
                    Reschedule
                  </button>
                  <button className="reject-btn" onClick={handleReject}>
                    Decline
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;