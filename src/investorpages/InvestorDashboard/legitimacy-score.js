"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from 'lucide-react'
import styles from "./InvestorDashboard.module.css"

export function LegitimacyScoreCard({ profileData }) {
  const [showDetails, setShowDetails] = useState(false)
  const [legitimacyScore, setLegitimacyScore] = useState(85)

  useEffect(() => {
    if (profileData) {
      const complianceScore = calculateComplianceScore(profileData)
      setLegitimacyScore(complianceScore * 2)
    }
  }, [profileData])

  const calculateComplianceScore = (profileData) => {
    const requiredDocuments = [
      "entityOverview.registrationCertificate",
      "entityOverview.proofOfAddress",
      "ownershipManagement.certifiedIds",
      "ownershipManagement.shareRegister",
      "legalCompliance.taxClearanceCert",
      "legalCompliance.bbbeeCert",
      "declarationConsent.signedDocument",
    ]

    const presentCount = requiredDocuments.filter((path) => {
      const parts = path.split(".")
      let value = profileData
      for (const part of parts) {
        value = value?.[part]
        if (value === undefined || value === null || value === "") {
          return false
        }
        if (typeof value === "object" && value.url) {
          return true
        }
      }
      return true
    }).length

    return Math.round((presentCount / requiredDocuments.length) * 100)
  }

  return (
    <div className={styles.readinessCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>BIG Legitimacy Score</h3>
      </div>

      <div className={styles.scoreContainer}>
        <div className={styles.scoreCircle}>
          {legitimacyScore}%
        </div>
      </div>

      <button
        className={styles.viewSummaryBtn}
        onClick={() => setShowDetails(!showDetails)}
      >
        View More
        <ChevronDown className={`${styles.summaryIcon} ${showDetails ? styles.rotateIcon : ""}`} size={16} />
      </button>

      {showDetails && (
        <div className={styles.scoreSummaryContent}>
          <p className={styles.summaryTitle}>Legitimacy Verification:</p>
          <ul className={styles.summaryList}>
            <li className={styles.summaryItem}>
              <div className={styles.summaryItemContent}>
                <div className={styles.summaryBullet}></div>
                <span>Business registration verified</span>
              </div>
              <span className={styles.statusIndicator}>✓</span>
            </li>
            <li className={styles.summaryItem}>
              <div className={styles.summaryItemContent}>
                <div className={styles.summaryBullet}></div>
                <span>Tax compliance confirmed</span>
              </div>
              <span className={styles.statusIndicator}>✓</span>
            </li>
            <li className={styles.summaryItem}>
              <div className={styles.summaryItemContent}>
                <div className={styles.summaryBullet}></div>
                <span>Industry certifications valid</span>
              </div>
              <span className={styles.statusIndicator}>✓</span>
            </li>
            <li className={styles.summaryItem}>
              <div className={styles.summaryItemContent}>
                <div className={styles.summaryBullet}></div>
                <span>Company address verified</span>
              </div>
              <span className={styles.statusIndicator}>✓</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}