import React, { useState } from 'react';
import './MeetingDetails.css';

const MeetingDetails = ({ meeting, onAction, onClose }) => {
  const [showReschedule, setShowReschedule] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const formatTimeSlot = (timeSlot) => {
    return `${timeSlot.start} - ${timeSlot.end}`;
  };

  const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleAccept = () => {
    showResponseMessage('Meeting confirmed!');
    if (onAction) {
      onAction(meeting.id, 'completed');
    }
  };

  const handleReject = () => {
    showResponseMessage('Meeting declined.');
    if (onAction) {
      onAction(meeting.id, 'cancelled');
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
    <div className="meeting-details-container">
      <div className="meeting-details-card">
        <div className="meeting-header">
          <h2>{meeting.title}</h2>
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
                <span>Date</span>
              </div>
              <div className="info-value">{formatDate(meeting.date)}</div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#8C6842" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Time Slot</span>
              </div>
              <div className="info-value">
                {meeting.timeSlots.map((slot, index) => (
                  <div key={index}>{formatTimeSlot(slot)} ({meeting.timeZone})</div>
                ))}
              </div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.657 16.657L13.414 20.9C13.039 21.2746 13.0306 21.4852 12.0005 21.4852C11.4704 21.4852 10.962 21.2746 10.587 20.9L6.343 16.657C5.22422 15.5382 4.46234 14.1127 4.15369 12.5609C3.84504 11.009 4.00349 9.4005 4.60901 7.93871C5.21452 6.47693 6.2399 5.22749 7.55548 4.34846C8.87107 3.46943 10.4178 3.00024 12 3.00024C13.5822 3.00024 15.1289 3.46943 16.4445 4.34846C17.7601 5.22749 18.7855 6.47693 19.391 7.93871C19.9965 9.4005 20.155 11.009 19.8463 12.5609C19.5377 14.1127 18.7758 15.5382 17.657 16.657Z" stroke="#8C6842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Location</span>
              </div>
              <div className="info-value">{meeting.location}</div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7Z" stroke="#8C6842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>SME</span>
              </div>
              <div className="info-value">{meeting.smeName}</div>
            </div>
          </div>

          {showResponse ? (
            <div className="response-message">
              <p>{responseMessage}</p>
              <button onClick={handleClose} className="close-message-btn">
                Close
              </button>
            </div>
          ) : (
            <div className="meeting-actions">
              <button className="accept-btn" onClick={handleAccept}>
                Confirm Meeting
              </button>
              <button className="reject-btn" onClick={handleReject}>
                Cancel Meeting
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;