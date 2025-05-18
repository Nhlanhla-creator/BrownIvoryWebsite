"use client"

import { Calendar, Plus } from "lucide-react"
import styles from "./InvestorDashboard.module.css"

const CalendarWidget = ({
  currentDate,
  setCurrentDate,
  deadlines,
  upcomingEvents,
  onDayClick,
  onViewFullCalendar,
  onViewEventDetails,
  onAddEvent,
  onSyncWithOutlook,
}) => {
  // Get days in month and first day of month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  return (
    <div className={styles.calendarCard}>
      <div className={styles.cardHeader}>
        <h3>Calendar & Events</h3>
        <button className={styles.syncOutlookBtn} onClick={onSyncWithOutlook}>
          <Calendar size={14} /> Sync Outlook
        </button>
      </div>

      <div className={styles.compactCalendar}>
        <div className={styles.calendarHeader}>
          <span className={styles.currentMonth}>
            {currentDate.toLocaleString("default", { month: "short", year: "numeric" })}
          </span>
          <button className={styles.viewCalendarBtn} onClick={onViewFullCalendar}>
            <Calendar size={16} />
          </button>
        </div>

        <div className={`${styles.calendarDaysGrid} ${styles.compact}`}>
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div key={day} className={`${styles.dayHeader} ${styles.compact}`}>
              {day}
            </div>
          ))}

          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className={`${styles.emptyDay} ${styles.compact}`}></div>
          ))}

          {Array.from({ length: Math.min(14, daysInMonth) }).map((_, i) => {
            const day = i + 1
            const isDeadline = deadlines.some((d) => d.date === day)
            const isToday =
              day === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear()

            return (
              <div
                key={`day-${day}`}
                className={`${styles.calendarDay} ${styles.compact} ${isDeadline ? styles.deadline : ""} ${isToday ? styles.today : ""}`}
                onClick={() => onDayClick(day)}
              >
                <span className={styles.dayNumber}>{day}</span>
                {isDeadline && <div className={styles.deadlineDot}></div>}
              </div>
            )
          })}
        </div>

        <div className={styles.upcomingEvents}>
          <h4 className={styles.eventsTitle}>Upcoming</h4>
          <div className={styles.eventsList}>
            {upcomingEvents.slice(0, 2).map((event, index) => (
              <div key={index} className={styles.iosEventItem} onClick={() => onViewEventDetails(event)}>
                <div className={`${styles.eventColorIndicator} ${styles[event.type]}`}></div>
                <div className={styles.eventDetails}>
                  <span className={styles.eventTitle}>{event.title}</span>
                  <span className={styles.eventDate}>{event.date}</span>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.addEventBtn} onClick={onAddEvent}>
            <Plus size={14} /> Add Event
          </button>
        </div>
      </div>
    </div>
  )
}

export default CalendarWidget
