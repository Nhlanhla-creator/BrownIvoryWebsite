import React, { useState, useEffect } from 'react';
import EventData from './event-data';
import Meetings from './meetings';
import Availability from './availability';
import Modal from './Modal';
import './Calendar.css';

const Calendar = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [workingHoursSet, setWorkingHoursSet] = useState(false);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    created: 0,
    completed: 0,
    rescheduled: 0,
    cancelled: 0
  });
  const [workingHours, setWorkingHours] = useState(null);

  useEffect(() => {
    const savedHours = localStorage.getItem('availabilities');
    if (savedHours) {
      setWorkingHours(JSON.parse(savedHours));
      setWorkingHoursSet(true);
      setShowWelcome(false);
    }

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
      }
    ];

    setEvents(sampleEvents);
    setStats({
      created: 2,
      completed: 0,
      rescheduled: 0,
      cancelled: 0
    });
  }, []);

  const handleWorkingHoursSubmit = (hours) => {
    setWorkingHours(hours);
    setWorkingHoursSet(true);
    setShowWelcome(false);
    setShowAvailabilityModal(false);
  };

  const handleEditAvailability = () => {
    setShowAvailabilityModal(true);
  };

  return (
    <div className="calendar-system">
      {/* Availability Edit Modal */}
      {showAvailabilityModal && (
        <Modal onClose={() => setShowAvailabilityModal(false)}>
          <div className="availability-modal">
            <Availability 
              onSubmit={handleWorkingHoursSubmit} 
              workingHours={workingHours}
              showSaveButton={true}
            />
          </div>
        </Modal>
      )}

      {/* Main Dashboard */}
      {workingHoursSet ? (
        <div className="dashboard-content">
          <EventData stats={stats} />
          
          <div className="dashboard-panels">
            <div className="meetings-panel">
              <Meetings 
                events={events} 
                setEvents={setEvents} 
                stats={stats} 
                setStats={setStats} 
              />
            </div>
            
            <div className="availability-panel">
              <Availability 
                showAsCard={true}
                workingHours={workingHours}
                onEditClick={handleEditAvailability}
                showSaveButton={false}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Setup Required Screen */
        <div className="setup-required">
          <div className="setup-container">
           
            <Availability 
              onSubmit={handleWorkingHoursSubmit} 
              showSaveButton={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;