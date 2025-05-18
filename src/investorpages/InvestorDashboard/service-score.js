"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import styles from "./InvestorDashboard.module.css"

const ServiceScore = ({ score, scoreData }) => {
  const [showSummary, setShowSummary] = useState(false)

  return (
    <div className={styles.readinessCard}>
      <div className={styles.cardHeader}>
        <h3>Service Score</h3>
      </div>

      <div className={styles.scoreCircleContainer}>
        <div className={styles.scoreCircle}>{score}%</div>
      </div>

      <button className={styles.viewSummaryBtn} onClick={() => setShowSummary(!showSummary)}>
        View More
        <ChevronDown className={`${styles.summaryIcon} ${showSummary ? styles.rotate : ""}`} size={16} />
      </button>

      {showSummary && (
        <div className={styles.scoreSummaryContent}>
          <p className={styles.summaryTitle}>Service Score Breakdown:</p>
          <ul className={styles.summaryList}>
            {scoreData.map((item, index) => (
              <li key={index} className={styles.summaryItem}>
                <div className={styles.summaryBullet} style={{ backgroundColor: item.color }}></div>
                <span>{item.name}</span>
                <span className={styles.scoreValue}>{item.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ServiceScore
