"use client"

import { X, Calendar } from "lucide-react"
import styles from "./InvestorDashboard.module.css"

const EventModal = ({ show, onClose, event }) => {
  if (!show) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.iosModal}>
        <div className={styles.modalHeader}>
          <h3>Event Details</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.eventDetailContent}>
            <span className={`${styles.eventTypeIndicator} ${styles[event.type]}`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>

            <h2 className={styles.eventDetailTitle}>{event.title}</h2>

            <div className={styles.eventDetailDate}>
              <Calendar size={16} />
              <span>{event.date}</span>
            </div>

            <div className={styles.eventDetailDescription}>
              <p>
                {event.description ||
                  "No additional details available for this event. You can add notes or details when editing this event."}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={`${styles.iosButton} ${styles.cancel}`} onClick={onClose}>
            Close
          </button>
          <button className={`${styles.iosButton} ${styles.add}`}>Edit Event</button>
        </div>
      </div>
    </div>
  )
}

export default EventModal
