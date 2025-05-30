"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from 'lucide-react'
import "./legitimacy.css"

export function LegitimacyScoreCard({ styles, profileData }) {
  const [showModal, setShowModal] = useState(false)
  const [legitimacyScore, setLegitimacyScore] = useState(0)
  const [scoreBreakdown, setScoreBreakdown] = useState([])

  useEffect(() => {
    if (profileData) {
      const result = calculateLegitimacyScore(profileData)
      setLegitimacyScore(result.totalScore)
      setScoreBreakdown(result.breakdown)
    }
  }, [profileData])

  const mapStageToCategory = (stage) => {
    const lower = stage.toLowerCase()
    if (["idea", "prototype", "startup"].includes(lower)) return "seed"
    if (["early-growth", "growth", "scale-up"].includes(lower)) return "growth"
    return "maturity"
  }

  const calculateLegitimacyScore = (data) => {
    const stage = mapStageToCategory(data?.entityOverview?.operationStage || "seed")

    const weightings = {
      foundational: stage === "maturity" ? 10 : stage === "growth" ? 20 : 30,
      digital: stage === "maturity" ? 10 : stage === "growth" ? 20 : 15,
      track: stage === "maturity" ? 10 : stage === "growth" ? 20 : 10,
      thirdParty: stage === "maturity" ? 20 : stage === "growth" ? 15 : 10,
      reputation: stage === "maturity" ? 15 : stage === "growth" ? 15 : 20,
      team: stage === "maturity" ? 15 : stage === "growth" ? 10 : 15
    }

    const evaluators = {
      foundational: evaluateFoundational,
      digital: evaluateDigital,
      track: evaluateTrack,
      thirdParty: evaluateThirdParty,
      reputation: evaluateReputation,
      team: evaluateTeam
    }

    const breakdown = Object.entries(evaluators).map(([key, fn]) => {
      const { score, outOf } = fn(data)
      const weighted = outOf ? (score / outOf) * weightings[key] : 0
      return { key, score, outOf, weighted, weight: weightings[key] }
    })

    const totalScore = Math.round(breakdown.reduce((sum, b) => sum + b.weighted, 0))

    return { totalScore, breakdown }
  }

  const evaluateFoundational = (data) => {
    const items = [
      !!data?.contactDetails?.website,
      !!data?.contactDetails?.email,
      !!data?.entityOverview?.companyLogo,
      !!data?.contactDetails?.physicalAddress && !!data?.entityOverview?.proofOfAddress,
      !!data?.productsServices?.companyProfile || !!data?.productsServices?.brochure
    ]
    return { score: items.filter(Boolean).length, outOf: items.length }
  }

  const evaluateDigital = (data) => {
    const items = [
      !!data?.contactDetails?.otherSocial,
      /linkedin/.test(data?.contactDetails?.otherSocial || "")
    ]
    return { score: items.filter(Boolean).length, outOf: items.length }
  }

  const evaluateTrack = (data) => {
    const items = [
      !!data?.entityOverview?.yearsInOperation,
      data?.productsServices?.keyClients?.length > 0,
      !!data?.productsServices?.annualTurnover,
      !!data?.productsServices?.companyProfile || !!data?.productsServices?.brochure
    ]
    return { score: items.filter(Boolean).length, outOf: items.length }
  }

  const evaluateThirdParty = (data) => {
    const items = [
      !!data?.legalCompliance?.bbbeeCert,
      !!data?.legalCompliance?.otherCerts,
      !!data?.legalCompliance?.industryAccreditationDocs
    ]
    return { score: items.filter(Boolean).length, outOf: items.length }
  }

  const evaluateReputation = (_) => {
    return { score: 0, outOf: 3 } // Placeholder until reviews/testimonials are added
  }

  const evaluateTeam = (data) => {
    const items = [
      data?.ownershipManagement?.directors?.length > 0,
      /linkedin/.test(data?.contactDetails?.otherSocial || "")
    ]
    return { score: items.filter(Boolean).length, outOf: items.length }
  }

  return (
    <>
      <div className={`readiness-card fun-card ${showModal ? "blurred" : ""}`}>
        <div style={{
          padding: '30px',
          borderBottom: '1px solid var(--medium-brown)',
          backgroundColor: 'white',
          fontSize: '12px',
          color: 'var(--dark-brown)'
        }}>
          <h2>BIG Legitimacy Score</h2>
        </div>

        <div className="score-wrapper">
          <div className="score-circle" style={{
            backgroundColor: styles.backgroundBrown,
            color: "black",
            fontWeight: "bold",
            borderColor: styles.accentBrown
          }}>
            {legitimacyScore}%
          </div>
        </div>

        <div className="text-center">
          <button
            className="fun-button"
            onClick={() => setShowModal(true)}
            style={{ backgroundColor: '#8d6e63', color: 'white', padding: '12px 48px', }}
          >
       Score Breakdown


            <ChevronDown className="ml-1 inline-block" size={16} />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content fun-popup">
            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            <h3 className="popup-title">Score Breakdown</h3>
            <ul className="summary-list">
              {scoreBreakdown.map((item) => (
                <li key={item.key} className="summary-item">
                  <div className="summary-label">
                    <div className="summary-bullet" style={{ backgroundColor: styles.accentBrown }}></div>
                    <span>
                      {item.key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      <small> ({item.weight}% weight)</small>
                      <br />
                      <em>
                        {item.key === 'foundational' && "Business website, email, logo, registered address, branded materials"}
                        {item.key === 'digital' && "Social media presence, LinkedIn"}
                        {item.key === 'track' && "Years in operation, key clients, turnover, brochure"}
                        {item.key === 'thirdParty' && "Certifications, accreditations, B-BBEE"}
                        {item.key === 'reputation' && "Online reviews, testimonials, press mentions"}
                        {item.key === 'team' && "Visible leadership, LinkedIn bios"}
                      </em>
                    </span>
                  </div>
                  <span className="status-indicator">
                    {item.score}/{item.outOf} → {Math.round(item.weighted)}%
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
