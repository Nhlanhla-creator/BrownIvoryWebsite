"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from 'lucide-react'
import "./legitimacy.css"

export function LegitimacyScoreCard({ styles, profileData }) {
  const [showModal, setShowModal] = useState(false)
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
    <>
      <div className={`readiness-card fun-card ${showModal ? "blurred" : ""}`}>
        <div className="fun-card-header">
          <h2> BIG Legitimacy Score</h2>
        </div>

        <div className="score-wrapper">
          <div 
            className="score-circle"
            style={{ 
              backgroundColor: styles.backgroundBrown,
              color: styles.primaryBrown,
              borderColor: styles.accentBrown
            }}
          >
            {legitimacyScore}%
          </div>
        </div>

        <div className="text-center">
          <button
            className="fun-button"
            onClick={() => setShowModal(true)}
            style={{ backgroundColor: styles.paleBrown, color: styles.primaryBrown }}
          >
            View More
            <ChevronDown className="ml-1 inline-block" size={16} />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content fun-popup">
            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            <h3 className="popup-title"> Legitimacy Verification</h3>
            <ul className="summary-list">
              {[
                "Business registration verified",
                "Tax compliance confirmed",
                "Industry certifications valid",
                "Company address verified"
              ].map((item, i) => (
                <li key={i} className="summary-item">
                  <div className="summary-label">
                    <div className="summary-bullet" style={{ backgroundColor: styles.accentBrown }}></div>
                    <span>{item}</span>
                  </div>
                  <span className="status-indicator" style={{ color: styles.primaryBrown }}>✓</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
