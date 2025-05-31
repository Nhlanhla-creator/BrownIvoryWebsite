import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from './Modal';
import CreateEventForm from './CreateEventForm';
import MeetingDetails from './MeetingDetails';
import './Meetings.css';
import { db } from '../../firebaseConfig';
import { collection, query, where, onSnapshot, getDoc, getDocs, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const CalendarPopup = ({ events, onClose, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduledMeetings, setScheduledMeetings] = useState([]);

  const formatDateKey = (date) => {
    if (!date || isNaN(new Date(date))) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  const formatTimeSlot = (timeSlot) => {
    if (!timeSlot || !timeSlot.start || !timeSlot.end) return 'No time specified';
    return `${timeSlot.start} - ${timeSlot.end}`;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Extract all scheduled meetings from events
  useEffect(() => {
    const scheduled = [];
    events.forEach(event => {
      event.slots.forEach(slot => {
        if (slot.status === 'scheduled') {
          scheduled.push({
            ...slot,
            title: event.title,
            investorName: event.investorName,
            location: event.location
          });
        }
      });
    });
    setScheduledMeetings(scheduled);
  }, [events]);


  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);

    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = formatDateKey(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));

    // Combine both available and scheduled events
    const availableEvents = events.filter(event =>
      event.date && formatDateKey(event.date) === dateStr
    );

    const scheduledEvents = scheduledMeetings.filter(event =>
      formatDateKey(event.date) === dateStr
    );

    return [...availableEvents, ...scheduledEvents];
  };

  const handleRSVP = async (event) => {
    try {
      const user = getAuth().currentUser;
      if (!user) throw new Error("Not authenticated");

      const updates = {
        availableDates: [event],
        status: "scheduled"
      };

      const calendarEventQuery = query(
        collection(db, "smeCalendarEvents"),
        where("smeAppId", "==", event.smeAppId),
        where("investorAppId", "==", event.investorAppId)
      );

      const calendarSnapshot = await getDocs(calendarEventQuery);

      if (!calendarSnapshot.empty) {
        // Update existing entry
        const calendarDoc = calendarSnapshot.docs[0];
        await updateDoc(doc(db, "smeCalendarEvents", calendarDoc.id), {
          availableDates: [event],
          status: "scheduled"
        });
      } else {
        // Create new entry
        await addDoc(collection(db, "smeCalendarEvents"), {
          funderId: event.funderId,
          smeId: event.smeId,
          smeAppId: event.smeAppId,
          investorAppId: event.investorAppId,
          location: event.location,
          smeName: event.smeName,
          title: event.title,
          availableDates: [event],
          status: "scheduled"
        });
      }

      await updateDoc(doc(db, "smeApplications", event.smeAppId), updates);
      await updateDoc(doc(db, "investorApplications", event.investorAppId), updates);

      const message = {
        from: user.uid,
        fromName: event.smeName || "SME",
        to: event.funderId,
        toName: "Investor",
        subject: `RSVP Confirmation: Meeting Scheduled`,
        content: `Hi, I’ve confirmed our meeting for:\n\n📅 ${event.date.toLocaleString('en-ZA')} (${event.timeZone})\n📍 ${event.location}`,
        timestamp: serverTimestamp(),
        status: 'sent',
        type: 'calendar'
      };

      await addDoc(collection(db, "messages"), message);
      alert("Meeting confirmed! Message sent to investor.");
      onClose();
    } catch (err) {
      console.error("RSVP Error:", err);
      alert("RSVP failed. Please try again.");
    }
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
                        <div
                          key={i}
                          className={`event-dot ${event.status || 'scheduled'}`}
                          title={event.title}
                        ></div>
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
          {getEventsForDate(selectedDate.getDate()).map((event, index) => (
            <div key={index} className="calendar-event-item">
              <span className={`event-status ${event.status || 'scheduled'}`}></span>
              <div className="event-details">
                <strong>{event.title}</strong>
                <div>With: {event.investorName}</div>
                <div>Location: {event.location}</div>
                {event.timeSlots && (
                  <div>Time: {formatTimeSlot(event.timeSlots[0])} ({event.timeZone})</div>
                )}
                <div className="event-status-text">
                  Status: {event.status ? event.status : 'scheduled'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="close-calendar" onClick={onClose}>Close</button>
    </div>
  );
};

const Meetings = ({ stats, setStats }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 7))
  });
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = getAuth().onAuthStateChanged((user) => {
      if (!user) return;

      const q = query(collection(db, "smeCalendarEvents"), where("smeId", "==", user.uid));

      const unsubFirestore = onSnapshot(q, async (snapshot) => {
        const groupedMeetings = {};

        for (const docSnap of snapshot.docs) {
          const data = docSnap.data();
          const groupKey = `${data.funderId}-${data.title}`;

          if (!groupedMeetings[groupKey]) {
            let investorName = '';

            if (data.funderId) {
              try {
                const investorDoc = await getDoc(doc(db, "MyuniversalProfiles", data.funderId));
                if (investorDoc.exists()) {
                  const formData = investorDoc.data()?.formData;
                  investorName = formData?.entityOverview?.registeredName || "Investor";
                }
              } catch (err) {
                console.warn("Error fetching investor name:", err);
              }
            }

            groupedMeetings[groupKey] = {
              id: groupKey,
              title: data.title || 'Investor Meeting',
              investorName,
              funderId: data.funderId || '',
              smeAppId: data.smeAppId,
              investorAppId: data.investorAppId,
              location: data.location || 'Virtual',
              smeName: data.smeName || '',
              slots: [],
              isExpanded: false
            };
          }

          (data.availableDates || []).forEach(slot => {
            const parsedDate = new Date(slot.date);
            groupedMeetings[groupKey].slots.push({
              id: `${docSnap.id}-${slot.date}`,
              ...slot,
              date: parsedDate,
              location: data.location,
              status: slot.status || 'available'
            });
          });
        }

        console.log("Final meetings parsed:", groupedMeetings);
        setMeetings(Object.values(groupedMeetings));
        setLoading(false);
      });

      return () => unsubFirestore();
    });

    return () => unsubscribeAuth();
  }, []);

  const handleCreateEvent = (newEvent) => {
    // This would need to be updated to save to Firebase
    setMeetings([...meetings, newEvent]);
    setStats(prev => ({ ...prev, created: prev.created + 1 }));
    setShowCreateModal(false);
  };

  // In the Meetings component, update the handleMeetingAction function:
  const handleMeetingAction = async (id, action) => {
    try {
      if (action === 'scheduled') {
        // Find the meeting that was scheduled
        const scheduledMeeting = meetings.find(m => m.id === id);

        // Update the meeting status in local state
        const updatedMeetings = meetings.map(meeting => {
          if (meeting.id === id) {
            return { ...meeting, status: 'scheduled' };
          }
          // Remove other meetings for the same application
          if (
            meeting.smeAppId === scheduledMeeting.smeAppId &&
            meeting.investorAppId === scheduledMeeting.investorAppId &&
            meeting.id !== scheduledMeeting.id
          ) {
            return null;
          }
          return meeting;
        }).filter(Boolean);

        setMeetings(updatedMeetings);
        setStats(prev => ({ ...prev, scheduled: prev.scheduled + 1 }));
      } else if (action === 'completed') {
        // ... existing completion logic
      } else if (action === 'cancelled') {
        // ... existing cancellation logic
      }
    } catch (error) {
      console.error("Error handling meeting action:", error);
    } finally {
      setSelectedMeeting(null);
    }
  };

  const filteredMeetings = meetings.filter(meeting => {
    const now = new Date();
    const validSlots = meeting.slots.filter(slot => slot.date instanceof Date);

    if (validSlots.length === 0) return false;

    if (activeTab === 'upcoming') {
      return validSlots.some(slot => slot.date > now && slot.status !== 'cancelled');
    } else if (activeTab === 'past') {
      return validSlots.every(slot => slot.date < now);
    } else if (activeTab === 'pending') {
      return validSlots.some(slot => slot.status === 'pending');
    } else if (activeTab === 'range') {
      return validSlots.some(slot => slot.date >= dateRange.start && slot.date <= dateRange.end);
    }
    return true;
  });

  const formatMeetingTime = (meeting) => {
    return meeting.date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ` (${meeting.timeZone})`;
  };

  if (loading) {
    return <div className="loading-container">Loading meetings...</div>;
  }

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
            onChange={(e) => setDateRange({ ...dateRange, start: new Date(e.target.value) })}
          />
          <span>to</span>
          <input
            type="date"
            value={dateRange.end.toISOString().split('T')[0]}
            onChange={(e) => setDateRange({ ...dateRange, end: new Date(e.target.value) })}
          />
        </div>
      )}

      <div className="table-container">
        <table className="meetings-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Investor</th>
              <th>Dates</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeetings.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-meetings">
                  No {activeTab} meetings found
                </td>
              </tr>
            ) : (
              filteredMeetings.map(group => (
                <React.Fragment key={group.id}>
                  <tr className="group-header">
                    <td className="event-title" data-label="Title">{group.title}</td>
                    <td className="event-investor" data-label="Investor">{group.investorName}</td>
                    <td className="event-date" data-label="Date">
                      {group.slots.length} available slots
                    </td>
                    <td className="event-location" data-label="Location">{group.location}</td>
                    <td data-label="Status">
                      <span className={`status-badge ${group.slots.some(s => s.status === 'scheduled') ? 'scheduled' : 'available'}`}>
                        {group.slots.some(s => s.status === 'scheduled') ? 'scheduled' : 'available'}
                      </span>
                    </td>
                    <td data-label="Action">
                      <button
                        className="view-meeting-btn"
                        onClick={() => setSelectedMeeting(group)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                  {group.isExpanded && group.slots.map(slot => (
                    <tr key={slot.id} className="group-slot">
                      <td className="event-title"></td>
                      <td className="event-investor"></td>
                      <td className="event-date" data-label="Date">
                        {formatMeetingTime(slot)}
                      </td>
                      <td className="event-location">{slot.location}</td>
                      <td>
                        <span className={`status-badge ${slot.status}`}>
                          {slot.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="view-meeting-btn"
                          onClick={() => handleMeetingAction(slot.id, 'scheduled')}
                          disabled={slot.status !== 'available'}
                        >
                          {slot.status === 'available' ? 'Confirm' : 'Confirmed'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
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
            events={meetings}
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