import React, { useState } from 'react';
import Modal from './Modal';
import CreateEventForm from './CreateEventForm';
import MeetingDetails from './MeetingDetails';
import './Meetings.css';

const Meetings = ({ events, setEvents, stats, setStats }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 7))
  });

  const handleCreateEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setStats(prev => ({...prev, created: prev.created + 1}));
    setShowCreateModal(false);
  };

  const handleMeetingAction = (id, action) => {
    const updatedEvents = events.map(event => {
      if (event.id === id) {
        return {...event, status: action};
      }
      return event;
    });
    
    setEvents(updatedEvents);
    
    if (action === 'completed') {
      setStats(prev => ({...prev, completed: prev.completed + 1}));
    } else if (action === 'cancelled') {
      setStats(prev => ({...prev, cancelled: prev.cancelled + 1}));
    } else if (action === 'rescheduled') {
      setStats(prev => ({...prev, rescheduled: prev.rescheduled + 1}));
    }
    
    setSelectedMeeting(null);
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    
    if (activeTab === 'upcoming') {
      return eventDate > now && event.status !== 'cancelled';
    } else if (activeTab === 'past') {
      return eventDate < now;
    } else if (activeTab === 'pending') {
      return event.status === 'pending';
    } else if (activeTab === 'range') {
      return eventDate >= dateRange.start && eventDate <= dateRange.end;
    }
    return true;
  });

  return (
    <div className="meetings-container">
      <div className="meetings-header">
        <h2>Meetings</h2>
        <button 
          className="create-event-btn"
          onClick={() => setShowCreateModal(true)}
        >
          Create Event
        </button>
      </div>

      <div className="meetings-tabs">
        <button
          className={activeTab === 'upcoming' ? 'active' : ''}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={activeTab === 'pending' ? 'active' : ''}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button
          className={activeTab === 'past' ? 'active' : ''}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
        <button
          className={activeTab === 'range' ? 'active' : ''}
          onClick={() => setActiveTab('range')}
        >
          Date Range
        </button>
      </div>

      {activeTab === 'range' && (
        <div className="date-range-selector">
          <input
            type="date"
            value={dateRange.start.toISOString().split('T')[0]}
            onChange={(e) => setDateRange({...dateRange, start: new Date(e.target.value)})}
          />
          <span>to</span>
          <input
            type="date"
            value={dateRange.end.toISOString().split('T')[0]}
            onChange={(e) => setDateRange({...dateRange, end: new Date(e.target.value)})}
          />
        </div>
      )}

      <div className="meetings-list">
        {filteredEvents.length === 0 ? (
          <p className="no-events">No events found</p>
        ) : (
          filteredEvents.map(event => (
            <div key={event.id} className="meeting-item">
              <div className="meeting-info">
                <h3>{event.title}</h3>
                <p>{new Date(event.date).toLocaleString()}</p>
                <p>{event.location}</p>
                <span className={`status-badge ${event.status}`}>{event.status}</span>
              </div>
              <button 
                className="view-meeting-btn"
                onClick={() => setSelectedMeeting(event)}
              >
                View Meeting
              </button>
            </div>
          ))
        )}
      </div>

      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)}>
          <CreateEventForm 
            onSubmit={handleCreateEvent} 
            onCancel={() => setShowCreateModal(false)}
          />
        </Modal>
      )}

      {selectedMeeting && (
        <Modal onClose={() => setSelectedMeeting(null)}>
          <MeetingDetails 
            meeting={selectedMeeting}
            onAction={handleMeetingAction}
            onClose={() => setSelectedMeeting(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Meetings;