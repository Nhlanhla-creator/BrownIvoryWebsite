"use client"

import { ChevronLeft, ChevronRight, X, Plus } from "lucide-react"
import styles from "./InvestorDashboard.module.css"

const CalendarModal = ({
  show,
  onClose,
  currentDate,
  setCurrentDate,
  deadlines,
  upcomingEvents,
  onDayClick,
  onAddEvent,
}) => {
  if (!show) return null

  // Get days in month and first day of month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  // Calendar navigation
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.iosCalendarModal}>
        <div className={styles.modalHeader}>
          <h3>Calendar</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.iosCalendar}>
            <div className={styles.calendarHeader}>
              <button onClick={() => navigateMonth("prev")} className={styles.monthNavBtn}>
                <ChevronLeft size={16} />
              </button>
              <span className={styles.currentMonth}>
                {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
              </span>
              <button onClick={() => navigateMonth("next")} className={styles.monthNavBtn}>
                <ChevronRight size={16} />
              </button>
            </div>

            <div className={styles.calendarDaysHeader}>
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <div key={day} className={styles.dayHeader}>
                  {day}
                </div>
              ))}
            </div>

            <div className={styles.calendarDaysGrid}>
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className={styles.emptyDay}></div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const isDeadline = deadlines.some((d) => d.date === day)
                const isToday =
                  day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear()

                const hasEvents = upcomingEvents.some((event) => {
                  const eventDate = new Date(event.date)
                  return (
                    eventDate.getDate() === day &&
                    eventDate.getMonth() === currentDate.getMonth() &&
                    eventDate.getFullYear() === currentDate.getFullYear()
                  )
                })

                return (
                  <div
                    key={`day-${day}`}
                    className={`${styles.calendarDay} ${isDeadline ? styles.deadline : ""} ${isToday ? styles.today : ""} ${hasEvents ? styles.hasEvents : ""}`}
                    onClick={() => onDayClick(day)}
                  >
                    <span className={styles.dayNumber}>{day}</span>
                    {hasEvents && <div className={styles.eventDot}></div>}
                    {isDeadline && <div className={styles.deadlineDot}></div>}
                  </div>
                )
              })}
            </div>
          </div>

          <div className={styles.upcomingEvents}>
            <h4 className={styles.eventsTitle}>Upcoming Events</h4>
            <div className={styles.eventsList}>
              {upcomingEvents.map((event, index) => (
                <div key={index} className={styles.iosEventItem}>
                  <div className={`${styles.eventColorIndicator} ${styles[event.type]}`}></div>
                  <div className={styles.eventDetails}>
                    <span className={styles.eventTitle}>{event.title}</span>
                    <span className={styles.eventDate}>{event.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={`${styles.iosButton} ${styles.add}`} onClick={onAddEvent}>
            <Plus size={14} /> Add Event
          </button>
        </div>
      </div>
    </div>
  )
}

export default CalendarModal
