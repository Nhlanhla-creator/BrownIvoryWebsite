import React from 'react';
import './MeetingDetails.css';

const MeetingDetails = ({ meeting, onAction, onClose }) => {
  const formattedDate = new Date(meeting.date).toLocaleString();

  return (
    <div className="meeting-details">
      <h3>{meeting.title}</h3>
      <div className="detail-item">
        <span className="detail-label">Date & Time:</span>
        <span>{formattedDate}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Duration:</span>
        <span>{meeting.duration} minutes</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Location:</span>
        <span>{meeting.location}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Host:</span>
        <span>{meeting.host}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Description:</span>
        <p>{meeting.description || 'No description provided'}</p>
      </div>
      
      {meeting.invitees && meeting.invitees.length > 0 && (
        <div className="detail-item">
          <span className="detail-label">Invitees:</span>
          <div className="invitees-list">
            {meeting.invitees.map((invitee, index) => (
              <span key={index} className="invitee">{invitee}</span>
            ))}
          </div>
        </div>
      )}

      <div className="meeting-actions">
        {meeting.status === 'pending' && (
          <>
            <button 
              className="accept-btn"
              onClick={() => onAction(meeting.id, 'completed')}
            >
              Accept
            </button>
            <button 
              className="reschedule-btn"
              onClick={() => onAction(meeting.id, 'rescheduled')}
            >
              Reschedule
            </button>
            <button 
              className="reject-btn"
              onClick={() => onAction(meeting.id, 'cancelled')}
            >
              Reject
            </button>
          </>
        )}
        <button 
          className="close-btn"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MeetingDetails;