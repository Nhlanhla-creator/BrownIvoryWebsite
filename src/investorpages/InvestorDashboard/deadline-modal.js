"use client"

import { X } from "lucide-react"
import styles from "./InvestorDashboard.module.css"

const DeadlineModal = ({ show, onClose, newDeadline, setNewDeadline, onAddDeadline }) => {
  if (!show) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.iosModal}>
        <div className={styles.modalHeader}>
          <h3>New Event</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              type="text"
              value={newDeadline.title}
              onChange={(e) => setNewDeadline({ ...newDeadline, title: e.target.value })}
              placeholder="Enter event title"
              className={styles.iosInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Date</label>
            <input
              type="date"
              value={newDeadline.date}
              onChange={(e) => setNewDeadline({ ...newDeadline, date: e.target.value })}
              className={styles.iosInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Event Type</label>
            <select className={styles.iosSelect} defaultValue="meeting">
              <option value="meeting">Meeting</option>
              <option value="deadline">Deadline</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={`${styles.iosButton} ${styles.cancel}`} onClick={onClose}>
            Cancel
          </button>
          <button className={`${styles.iosButton} ${styles.add}`} onClick={onAddDeadline}>
            Add Event
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeadlineModal
