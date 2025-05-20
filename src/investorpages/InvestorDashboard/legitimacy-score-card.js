"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Check } from 'lucide-react'
import styles from "./legitimacy.module.css";

export function LegitimacyScoreCard({ profileData }) {
  const [showModal, setShowModal] = useState(false)
  const [legitimacyScore, setLegitimacyScore] = useState(0)
  const [complianceDocuments, setComplianceDocuments] = useState([])

  useEffect(() => {
    if (profileData) {
      const { score, documents } = calculateComplianceStatus(profileData)
      setLegitimacyScore(score)
      setComplianceDocuments(documents)
    }
  }, [profileData])

  const calculateComplianceStatus = (profileData) => {
    const documentMapping = [
      { path: "entityOverview.registrationCertificate", displayName: "Business registration verified" },
      { path: "legalCompliance.taxClearanceCert", displayName: "Tax compliance confirmed" },
      { path: "legalCompliance.bbbeeCert", displayName: "Industry certifications valid" },
      { path: "entityOverview.proofOfAddress", displayName: "Company address verified" },
      { path: "ownershipManagement.certifiedIds", displayName: "Owner identities verified" },
      { path: "ownershipManagement.shareRegister", displayName: "Ownership structure verified" },
      { path: "declarationConsent.signedDocument", displayName: "Legal declarations signed" }
    ]

    let presentCount = 0
    const documents = documentMapping.map(doc => {
      const isPresent = checkDocumentExists(profileData, doc.path)
      if (isPresent) presentCount++
      return {
        ...doc,
        verified: isPresent
      }
    })

    const score = Math.round((presentCount / documentMapping.length) * 100)
    return { score, documents }
  }

  const checkDocumentExists = (data, path) => {
    const parts = path.split('.')
    let value = data
    for (const part of parts) {
      value = value?.[part]
      if (value === undefined || value === null || value === "") {
        return false
      }
      if (typeof value === 'object' && (value.url || value.fileName)) {
        return true
      }
    }
    return true
  }

  return (
    <>
      <div className={`${styles.readinessCard} ${styles.funCard} ${showModal ? styles.blurred : ""}`}>
        <div className={styles.funCardHeader}>
          <h2>BIG Legitimacy Score</h2>
        </div>

        <div className={styles.scoreWrapper}>
          <div className={styles.scoreCircle}>
            {legitimacyScore}%
          </div>
        </div>

        <div className={styles.textCenter}>
          <button className={styles.funButton} onClick={() => setShowModal(true)}>
            View More
            <ChevronDown className={styles.ml1} size={16} />
          </button>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContent} ${styles.funPopup}`}>
            <button className={styles.closeBtn} onClick={() => setShowModal(false)}>×</button>
            <h3 className={styles.popupTitle}>Legitimacy Verification</h3>
            <ul className={styles.summaryList}>
              {complianceDocuments.map((doc, i) => (
                <li key={i} className={styles.summaryItem}>
                  <div className={styles.summaryLabel}>
                    <div className={styles.summaryBullet}></div>
                    <span>{doc.displayName}</span>
                  </div>
                  <span
                    className={styles.statusIndicator}
                    style={{ color: doc.verified ? 'var(--primary-brown)' : '#ccc' }}
                  >
                    {doc.verified ? <Check size={16} /> : '✕'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
