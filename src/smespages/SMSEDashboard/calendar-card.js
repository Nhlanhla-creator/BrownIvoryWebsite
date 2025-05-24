"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { CalendarIcon, Plus, X, ChevronLeft, ChevronRight, Mail } from "lucide-react"
import "./calendar-card.css"
import { getAuth } from "firebase/auth"
import { db } from "../../firebaseConfig"
import { collection, query, where, onSnapshot } from "firebase/firestore"

export function CalendarCard() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showFullCalendar, setShowFullCalendar] = useState(false)
  const [showDeadlineModal, setShowDeadlineModal] = useState(false)
  const [newDeadline, setNewDeadline] = useState({ title: "", date: "", type: "meeting" })
  const [deadlines, setDeadlines] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [isOutlookConnected, setIsOutlookConnected] = useState(false)
  const [isIconBouncing, setIsIconBouncing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [showEventList, setShowEventList] = useState(true)

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setIsIconBouncing(true)
      setTimeout(() => setIsIconBouncing(false), 1000)
    }, 5000)

    return () => clearInterval(bounceInterval)
  }, [])

  useEffect(() => {
    if (showFullCalendar || showDeadlineModal) {
      document.body.classList.add("modal-open")
    } else {
      document.body.classList.remove("modal-open")
    }
    return () => {
      document.body.classList.remove("modal-open")
    }
  }, [showFullCalendar, showDeadlineModal])

  useEffect(() => {
    const auth = getAuth()
    const user = auth.currentUser
    if (!user) return

    const q = query(collection(db, "smeCalendarEvents"), where("smeId", "==", user.uid))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => {
        const data = doc.data()
        const eventDate = new Date(data.date)
        const formattedDate = eventDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        })
        return {
          title: data.title,
          date: formattedDate,
          type: data.type || "meeting"
        }
      })
      setUpcomingEvents(fetched)
    })

    return () => unsubscribe()
  }, [])

  const handleDayClick = (day) => {
    setNewDeadline({
      title: "",
      date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      type: "meeting"
    })
    setShowDeadlineModal(true)
    setShowEventList(false)
    setShowFullCalendar(false)
  }

  const addDeadline = () => {
    if (newDeadline.title.trim() && newDeadline.date) {
      const day = new Date(newDeadline.date).getDate()
      setDeadlines([...deadlines, { date: day, title: newDeadline.title, type: newDeadline.type }])

      const formattedDate = new Date(newDeadline.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })

      setUpcomingEvents([...upcomingEvents, { title: newDeadline.title, date: formattedDate, type: newDeadline.type }])

      setShowDeadlineModal(false)
      setNewDeadline({ title: "", date: "", type: "meeting" })
      setShowEventList(true)
    }
  }

  const handleOutlookConnect = () => {
    setIsOutlookConnected(!isOutlookConnected)
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  return (
    <>
      <div className="calendar-card">
        <div className="calender-card-header">
          <h3>Calendar & Events</h3>
          <button
            className={`outlook-btn ${isOutlookConnected ? "connected" : ""}`}
            onClick={handleOutlookConnect}
            title={isOutlookConnected ? "Connected to Outlook" : "Connect to Outlook"}
          >
            <Mail size={20} />
            {isOutlookConnected && <span className="connected-indicator"></span>}
          </button>
        </div>

        <div className="month-header">
          <button className="month-nav-btn" onClick={goToPreviousMonth}><ChevronLeft size={16} /></button>
          <span className="current-month">
            {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </span>
          <button className="month-nav-btn" onClick={goToNextMonth}><ChevronRight size={16} /></button>
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
              <div key={index} className={`event-item ${event.type}`}>
                <div className="event-indicator"></div>
                <div className="event-details">
                  <span className="event-title">{event.title}</span>
                  <span className="event-date">{event.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="add-event-btn" onClick={() => {
          setShowDeadlineModal(true)
          setShowEventList(true)
        }}>
          <Plus size={14} /> Add Event
        </button>
      </div>

      {isMounted && (
        <>
          {showFullCalendar && createPortal(null, document.body)}
          {showDeadlineModal && createPortal(null, document.body)}
        </>
      )}
    </>
  )
}
