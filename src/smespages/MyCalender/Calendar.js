import React, { useState, useEffect } from 'react';
import EventData from './event-data';
import Meetings from './meetings';
import Availability from './availability';
import Modal from './Modal';
import './Calendar.css';

const Calendar = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [workingHoursSet, setWorkingHoursSet] = useState(false);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    created: 0,
    completed: 0,
    rescheduled: 0,
    cancelled: 0
  });
  const [workingHours, setWorkingHours] = useState(null);

  // Initialize with sample data
  useEffect(() => {
    const sampleEvents = [
      {
        id: '1',
        title: 'Team Meeting',
        date: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
        time: '14:00',
        duration: '60',
        location: 'Conference Room A',
        description: 'Weekly team sync',
        host: 'You',
        invitees: ['john@example.com', 'jane@example.com'],
        status: 'pending'
      },
      {
        id: '2',
        title: 'Client Call',
        date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        time: '10:30',
        duration: '30',
        location: 'Zoom',
        description: 'Discuss project requirements',
        host: 'You',
        invitees: ['client@example.com'],
        status: 'pending'
      },
      {
        id: '3',
        title: 'Completed Project Review',
        date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
        time: '16:00',
        duration: '90',
        location: 'Conference Room B',
        description: 'Review completed project milestones',
        host: 'You',
        invitees: ['team@example.com'],
        status: 'completed'
      }
    ];

    setEvents(sampleEvents);
    setStats({
      created: 3,
      completed: 1,
      rescheduled: 0,
      cancelled: 0
    });
  }, []);

  const handleWorkingHoursSubmit = (hours) => {
    setWorkingHours(hours);
    setWorkingHoursSet(true);
    setShowWelcome(false);
  };

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setStats(prev => ({...prev, created: prev.created + 1}));
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
  };

  return (
    <div className="calendar-system">
      {showWelcome && (
        <Modal onClose={() => setShowWelcome(false)}>
          <div className="welcome-modal">
            <h2>Welcome to Your Calendar!</h2>
            <p>Before you begin, please set up your working hours and availability.</p>
            <Availability onSubmit={handleWorkingHoursSubmit} />
          </div>
        </Modal>
      )}

      {workingHoursSet ? (
        <>
          <div className="dashboard-header">
       
            <EventData stats={stats} />
          </div>
          <div className="dashboard-content">
            <Meetings 
              events={events} 
              setEvents={setEvents} 
              stats={stats} 
              setStats={setStats} 
              onMeetingAction={handleMeetingAction}
              workingHours={workingHours}
            />
            <div className="calendar-view">
              <h2>Calendar View</h2>
              <div className="calendar-grid">
                {/* Calendar implementation would go here */}
                <p>Calendar visualization would appear here</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="setup-required">
          <h2>Please set up your working hours to continue</h2>
          <Availability onSubmit={handleWorkingHoursSubmit} />
        </div>
      )}
    </div>
  );
};

export default Calendar;