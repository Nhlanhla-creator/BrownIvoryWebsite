import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from './Modal.js';
import CreateEventForm from './CreateEventForm';
import MeetingDetails from './MeetingDetails';
import './Meetings.css';

const CalendarPopup = ({ events, onClose, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => {
      const eventDate = new Date(event.date);
      const eventDateStr = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
      return eventDateStr === dateStr;
    });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    onDateSelect && onDateSelect(clickedDate);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="calendar-popup">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}><ChevronLeft size={20} /></button>
        <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
        <button onClick={goToNextMonth}><ChevronRight size={20} /></button>
      </div>
      
      <div className="calendar-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>
      
      <div className="calendar-grid">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const hasEvents = dayEvents.length > 0;
          const isSelected = selectedDate && 
            selectedDate.getDate() === day && 
            selectedDate.getMonth() === currentDate.getMonth() && 
            selectedDate.getFullYear() === currentDate.getFullYear();
          
          return (
            <div
              key={index}
              className={`calendar-day ${hasEvents ? 'has-events' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              {day && (
                <>
                  <span className="day-number">{day}</span>
                  {hasEvents && (
                    <div className="event-indicators">
                      {dayEvents.slice(0, 3).map((event, i) => (
                        <div key={i} className={`event-dot ${event.status}`} title={event.title}></div>
                      ))}
                      {dayEvents.length > 3 && <span className="more-events">+{dayEvents.length - 3}</span>}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      
      {selectedDate && (
        <div className="selected-date-events">
          <h4>Events on {selectedDate.toDateString()}:</h4>
          {getEventsForDate(selectedDate.getDate()).map(event => (
            <div key={event.id} className="calendar-event-item">
              <span className={`event-status ${event.status}`}></span>
              <span>{event.title} - {event.location}</span>
            </div>
          ))}
        </div>
      )}
      
      <button className="close-calendar" onClick={onClose}>Close</button>
    </div>
  );
};

const Meetings = ({ events, setEvents, stats, setStats }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
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
        <div className="header-buttons">
          <button 
            className="calendar-btn"
            onClick={() => setShowCalendar(true)}
          >
            <CalendarIcon size={16} />
            Calendar
          </button>
          <button 
            className="create-event-btn"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} />
            Create Event
          </button>
        </div>
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

     <div className="table-container">
  <table className="meetings-table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Date & Time</th>
        <th>Location</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredEvents.map(event => (
        <tr key={event.id}>
          <td className="event-title" data-label="Title">{event.title}</td>
          <td className="event-date" data-label="Date">{new Date(event.date).toLocaleString()}</td>
          <td className="event-location" data-label="Location">{event.location}</td>
          <td data-label="Status">
            <span className={`status-badge ${event.status}`}>{event.status}</span>
          </td>
          <td data-label="Action">
            <button 
              className="view-meeting-btn"
              onClick={() => setSelectedMeeting(event)}
            >
              View
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)}>
          <CreateEventForm 
            onSubmit={handleCreateEvent} 
            onCancel={() => setShowCreateModal(false)}
          />
        </Modal>
      )}

      {showCalendar && (
        <Modal onClose={() => setShowCalendar(false)}>
          <CalendarPopup 
            events={events}
            onClose={() => setShowCalendar(false)}
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