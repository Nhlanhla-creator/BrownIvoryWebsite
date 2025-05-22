"use client"

import { useState, useEffect } from "react"
import { ChevronDown, X, Check } from 'lucide-react'
import "./legitimacy.css"

export function LegitimacyScoreCard({ styles, profileData }) {
  const [showModal, setShowModal] = useState(false)
  const [legitimacyScore, setLegitimacyScore] = useState(0)
  const [complianceDocuments, setComplianceDocuments] = useState([])

  useEffect(() => {
    if (profileData) {
      const { score, documents } = calculateComplianceStatus(profileData)
      // Calculate the multiplier to scale the score to 100
      const multiplier = score > 0 ? 100 / score : 0
      setLegitimacyScore(Math.round(score * multiplier))
      setComplianceDocuments(documents)
    }
  }, [profileData])

  const calculateComplianceStatus = (profileData) => {
    const documentMapping = [
      {
        path: "entityOverview.registrationCertificate",
        displayName: "Business registration verified",
        description: "Company Registration Certificate"
      },
      {
        path: "legalCompliance.taxClearanceCert",
        displayName: "Tax compliance confirmed",
        description: "Tax Clearance Certificate"
      },
      {
        path: "legalCompliance.bbbeeCert",
        displayName: "Industry certifications valid",
        description: "B-BBEE Certificate"
      },
      {
        path: "entityOverview.proofOfAddress",
        displayName: "Company address verified",
        description: "Proof of Operating Address"
      },
      {
        path: "ownershipManagement.certifiedIds",
        displayName: "Owner identities verified",
        description: "Certified IDs"
      },
      {
        path: "ownershipManagement.shareRegister",
        displayName: "Ownership structure verified",
        description: "Share Register"
      },
      {
        path: "declarationConsent.signedDocument",
        displayName: "Legal declarations signed",
        description: "Signed Declaration/Consent Form"
      }
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
      <div className={`readiness-card fun-card ${showModal ? "blurred" : ""}`}>
     <div
     style={{
    padding: '30px',
    borderBottom: '1px solid var(--medium-brown)',
    backgroundColor: 'white',
    fontSize: '12px', // adjust as needed
    color: 'var(--dark-brown)', // replace with desired color or hex code
     }}
     >
  <h2>BIG Legitimacy Score</h2>
</div>

        <div className="score-wrapper">
          <div
            className="score-circle"
            style={{
              backgroundColor: styles.backgroundBrown,
              color: "black",
              fontWeight: "bold",
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
            style={{ backgroundColor: ' #8d6e63', color: 'white' }}
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
            <h3 className="popup-title">Legitimacy Verification</h3>
            <ul className="summary-list">
              {complianceDocuments.map((doc, i) => (
                <li key={i} className="summary-item">
                  <div className="summary-label">
                    <div className="summary-bullet" style={{ backgroundColor: styles.accentBrown }}></div>
                    <span>{doc.displayName}</span>
                  </div>
                  <span
                    className="status-indicator"
                    style={{ color: doc.verified ? styles.primaryBrown : '#ccc' }}
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