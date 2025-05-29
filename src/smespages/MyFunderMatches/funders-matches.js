"use client"

import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebaseConfig" // adjust path if different
import FundingFlowPipeline from "./funding-flow-pipeline"
import { FundingInsights } from "./funding-insights"
import { FilterFunding } from "./filter-funding"
import { FundingTable } from "./funding-table"
import styles from "./funding.module.css"
import { X, ArrowRight } from 'lucide-react'

// Onboarding steps for the welcome popup
const onboardingSteps = [
  {
    title: "Welcome to Funding Matches",
    content: "This page helps you discover and track funding opportunities that match your business profile.",
    icon: "💰",
  },
  {
    title: "Funding Pipeline",
    content: "Track your funding applications at each stage of the process, from initial contact to disbursement.",
    icon: "📊",
  },
  {
    title: "Funding Insights",
    content: "Get valuable analytics about funding trends, success rates, and opportunities relevant to your business.",
    icon: "📈",
  },
  {
    title: "Filter Matches",
    content: "Use powerful filters to find the perfect funding match based on location, amount, and funding type.",
    icon: "🔍",
  },
]
export default function FundingMatchesPage() {
  const [user, setUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [filters, setFilters] = useState({ /* ... */ })
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0)

  // Wait for Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setAuthChecked(true)
    })
    return () => unsubscribe()
  }, [])

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const getUserSpecificKey = (baseKey) => {
    const userId = user?.uid || "guest"
    return `${baseKey}_${userId}`
  }

  useEffect(() => {
    if (!authChecked || !user) return
    const seenPopup = localStorage.getItem(getUserSpecificKey("hasSeenFundingMatchesPopup")) === "true"
    if (!seenPopup) {
      setShowWelcomePopup(true)
      localStorage.setItem(getUserSpecificKey("hasSeenFundingMatchesPopup"), "true")
    }
  }, [authChecked, user])

  if (!authChecked) return <div>Loading...</div> // or custom spinner

  return (
    <div className={styles.mainContent}>
      {showWelcomePopup && (
        <div className="popup-overlay">
          <div className="welcome-popup funding-popup">
            <button className="close-popup" onClick={() => setShowWelcomePopup(false)}>
              <X size={24} />
            </button>
            <div className="popup-content">
              <div className="popup-icon">{onboardingSteps[currentOnboardingStep].icon}</div>
              <h2>{onboardingSteps[currentOnboardingStep].title}</h2>
              <p>{onboardingSteps[currentOnboardingStep].content}</p>
              <div className="popup-progress">
                {onboardingSteps.map((_, index) => (
                  <div key={index} className={`progress-dot ${index === currentOnboardingStep ? "active" : ""}`} />
                ))}
              </div>
              <div className="popup-buttons">
                <button className="btn btn-secondary" onClick={() => setShowWelcomePopup(false)}>Skip</button>
                <button className="btn btn-primary" onClick={() => {
                  if (currentOnboardingStep < onboardingSteps.length - 1) {
                    setCurrentOnboardingStep(currentOnboardingStep + 1)
                  } else {
                    setShowWelcomePopup(false)
                  }
                }}>
                  {currentOnboardingStep < onboardingSteps.length - 1 ? "Next" : "Get Started"} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.pageContainer}>
        <div className={styles.sectionCard}><FundingFlowPipeline /></div>
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Funding Insights</h2>
          <FundingInsights />
        </div>
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Filter Matches</h2>
          <FilterFunding onFilterChange={handleFilterChange} filters={filters} />
        </div>
        <div className={styles.sectionCard}><FundingTable filters={filters} /></div>
      </div>
    </div>
  )
}