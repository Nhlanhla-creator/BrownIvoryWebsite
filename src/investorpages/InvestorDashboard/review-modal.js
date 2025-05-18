"use client"

import { X, Star } from "lucide-react"
import styles from "./InvestorDashboard.module.css"

const ReviewModal = ({ show, onClose, review }) => {
  if (!show) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.iosModal}>
        <div className={styles.modalHeader}>
          <h3>Customer Review</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.reviewDetailContainer}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewerInfo}>
                <h4>{review.name}</h4>
                <p className={styles.reviewerCompany}>
                  {review.company} • {review.position}
                </p>
                <p className={styles.reviewDate}>{review.date}</p>
              </div>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < review.rating ? styles.starFilled : styles.starEmpty}
                  />
                ))}
              </div>
            </div>
            <div className={styles.reviewComment}>
              <p>{review.comment}</p>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={`${styles.iosButton} ${styles.cancel}`} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
