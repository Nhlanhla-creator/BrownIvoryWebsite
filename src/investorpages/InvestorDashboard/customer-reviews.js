"use client"

import { useState } from "react"
import { Star, ChevronDown } from "lucide-react"
import styles from "./InvestorDashboard.module.css"

const CustomerReviews = ({ onViewDetails }) => {
  const [showReviews, setShowReviews] = useState(false)
  const [visibleReviewDetails, setVisibleReviewDetails] = useState({})

  // Sample reviews data
  const ratings = [
    {
      name: "Michael Thompson",
      rating: 4,
      date: "Apr 15, 2023",
      comment:
        "Great service and support! The team was very responsive to our needs and provided excellent guidance throughout the entire process.",
      company: "Thompson Enterprises",
      position: "CEO",
    },
    {
      name: "Priya Patel",
      rating: 4,
      date: "Apr 2, 2023",
      comment:
        "Very responsive team. They addressed all our concerns promptly and provided valuable insights for our business growth.",
      company: "Patel Innovations",
      position: "COO",
    },
  ]

  return (
    <div className={styles.ratingsCard}>
      <div className={styles.cardHeader}>
        <h3>Customer Reviews & Ratings</h3>
      </div>
      <div className={styles.ratingsSummary}>
        <div className={styles.ratingsCount}>
          <span className={styles.ratingsCountNumber}>25</span>
          <span className={styles.ratingsCountLabel}>Reviews</span>
        </div>
        <div className={styles.averageRating}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < 4 ? styles.starFilled : styles.starEmpty} />
            ))}
          </div>
          <span className={styles.averageRatingLabel}>4.0 Average</span>
        </div>
      </div>

      <button className={styles.viewSummaryBtn} onClick={() => setShowReviews(!showReviews)}>
        View More
        <ChevronDown className={`${styles.summaryIcon} ${showReviews ? styles.rotate : ""}`} size={16} />
      </button>

      {showReviews && (
        <div className={styles.ratingsList}>
          {ratings.slice(0, 3).map((rating, index) => (
            <div
              key={index}
              className={styles.ratingItemWithDetails}
              onMouseEnter={() => setVisibleReviewDetails({ ...visibleReviewDetails, [index]: true })}
              onMouseLeave={() => setVisibleReviewDetails({ ...visibleReviewDetails, [index]: false })}
            >
              <div className={styles.ratingHeader}>
                <div className={styles.ratingInfo}>
                  <div className={styles.ratingNameActions}>
                    <h4>{rating.name}</h4>
                    <button className={styles.viewDetailsBtn} onClick={() => onViewDetails(rating)}>
                      View Details
                    </button>
                  </div>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < rating.rating ? styles.starFilled : styles.starEmpty} />
                    ))}
                  </div>
                </div>
              </div>
              {visibleReviewDetails[index] && (
                <div className={styles.ratingComment}>
                  <p>{rating.comment.substring(0, 100)}...</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomerReviews
