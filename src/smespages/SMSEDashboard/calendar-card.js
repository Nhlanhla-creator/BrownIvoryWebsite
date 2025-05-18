"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, Plus, X } from "lucide-react"
import "./calendar-card.css"

export function CalendarCard() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showFullCalendar, setShowFullCalendar] = useState(false)
  const [showDeadlineModal, setShowDeadlineModal] = useState(false)
  const [newDeadline, setNewDeadline] = useState({ title: "", date: "", type: "meeting" })
  const [deadlines, setDeadlines] = useState([
    { date: 15, title: "Tax Submission", type: "deadline" },
    { date: 30, title: "Compliance Review", type: "deadline" },
  ])
  const [upcomingEvents, setUpcomingEvents] = useState([
    { title: "Investor Meetup", date: "May 15, 2023", type: "meeting" },
    { title: "Pitch Workshop", date: "May 20, 2023", type: "workshop" },
  ])
  const [isOutlookConnected, setIsOutlookConnected] = useState(false)
  const [isIconBouncing, setIsIconBouncing] = useState(false)

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  // Bounce the calendar icon periodically
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setIsIconBouncing(true)
      setTimeout(() => setIsIconBouncing(false), 1000)
    }, 5000)

    return () => clearInterval(bounceInterval)
  }, [])

  const handleDayClick = (day) => {
    setNewDeadline({
      title: "",
      date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(
        2,
        "0",
      )}`,
      type: "meeting",
    })
    setShowDeadlineModal(true)
  }

  const addDeadline = () => {
    if (newDeadline.title.trim() && newDeadline.date) {
      const day = new Date(newDeadline.date).getDate()
      setDeadlines([...deadlines, { date: day, title: newDeadline.title, type: newDeadline.type }])

      const formattedDate = new Date(newDeadline.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })

      setUpcomingEvents([
        ...upcomingEvents,
        {
          title: newDeadline.title,
          date: formattedDate,
          type: newDeadline.type,
        },
      ])

      setShowDeadlineModal(false)
      setNewDeadline({ title: "", date: "", type: "meeting" })
    }
  }

  const handleOutlookConnect = () => {
    setIsOutlookConnected(true)
  }

  return (
    <div className="calendar-card">
      <div className="card-header">
        <h3>Calendar & Events</h3>
        <button className="connect-outlook-btn" onClick={handleOutlookConnect}>
          Connect Outlook
        </button>
      </div>

      <div className="month-header">
        <span className="current-month">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button
          className={`view-calendar-btn ${isIconBouncing ? "bounce" : ""}`}
          onClick={() => setShowFullCalendar(true)}
          onMouseEnter={() => setIsIconBouncing(true)}
          onMouseLeave={() => setIsIconBouncing(false)}
        >
          <CalendarIcon size={20} />
        </button>
      </div>

      <div className="upcoming-section">
        <h4>Upcoming</h4>
        <div className="events-list">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="event-item">
              <div className="event-indicator"></div>
              <div className="event-details">
                <span className="event-title">{event.title}</span>
                <span className="event-date">{event.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="add-event-btn" onClick={() => setShowDeadlineModal(true)}>
        <Plus size={14} /> Add Event
      </button>

      {/* Full Calendar Modal */}
      {showFullCalendar && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Calendar</h3>
              <button className="close-btn" onClick={() => setShowFullCalendar(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="full-calendar">
                <div className="month-navigation">
                  <span className="current-month-full">
                    {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
                  </span>
                </div>

                <div className="full-calendar-grid">
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                    <div key={day} className="day-header-full">
                      {day.substring(0, 3)}
                    </div>
                  ))}
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="empty-day-full"></div>
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const isDeadline = deadlines.some((d) => d.date === day)
                    const isToday =
                      day === new Date().getDate() &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear()

                    return (
                      <div
                        key={`day-${day}`}
                        className={`calendar-day-full ${isDeadline ? "has-event" : ""} ${isToday ? "today" : ""}`}
                        onClick={() => handleDayClick(day)}
                      >
                        <span className="day-number">{day}</span>
                        {isDeadline && (
                          <div className="day-events">
                            {deadlines
                              .filter((d) => d.date === day)
                              .map((deadline, idx) => (
                                <div key={idx} className="day-event-indicator">
                                  {deadline.title}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="add-event-btn-full" onClick={() => setShowDeadlineModal(true)}>
                <Plus size={16} /> Add Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showDeadlineModal && (
        <div className="modal-overlay">
          <div className="modal-container event-modal">
            <div className="modal-header">
              <h3>New Event</h3>
              <button className="close-btn" onClick={() => setShowDeadlineModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newDeadline.title}
                  onChange={(e) => setNewDeadline({ ...newDeadline, title: e.target.value })}
                  placeholder="Enter event title"
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={newDeadline.date}
                  onChange={(e) => setNewDeadline({ ...newDeadline, date: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Event Type</label>
                <select
                  value={newDeadline.type}
                  onChange={(e) => setNewDeadline({ ...newDeadline, type: e.target.value })}
                >
                  <option value="meeting">Meeting</option>
                  <option value="deadline">Deadline</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowDeadlineModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={addDeadline}>
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
