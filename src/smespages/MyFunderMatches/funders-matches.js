"use client"

import { useState, useEffect } from "react"
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
  const [filters, setFilters] = useState({
    location: "",
    matchScore: 50,
    minValue: "",
    maxValue: "",
    instruments: [],
    stages: [],
    sectors: [],
    supportTypes: [],
    funderType: "",
    sortBy: "",
  })

  // New state for popups
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0)

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  // Helper function to get user-specific localStorage key
  const getUserSpecificKey = (baseKey) => {
    // In a real app, you would use the actual user ID
    const userId = "current-user-id" // Replace with auth.currentUser?.uid or similar
    return userId ? `${baseKey}_${userId}` : baseKey
  }

  // Check if this is the first time visiting the funding matches page
  useEffect(() => {
    const hasSeenFundingMatchesPopup =
      localStorage.getItem(getUserSpecificKey("hasSeenFundingMatchesPopup")) === "true"

    if (!hasSeenFundingMatchesPopup) {
      setShowWelcomePopup(true)
      localStorage.setItem(getUserSpecificKey("hasSeenFundingMatchesPopup"), "true")
    }
  }, [])

  // Popup handlers
  const handleNextOnboardingStep = () => {
    if (currentOnboardingStep < onboardingSteps.length - 1) {
      setCurrentOnboardingStep(currentOnboardingStep + 1)
    } else {
      handleCloseWelcomePopup()
    }
  }

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false)
  }

  // For testing - add a button to manually trigger the popup
  const handleTestWelcomePopup = () => {
    setShowWelcomePopup(true)
  }

  return (
    <div className={styles.mainContent}>
      {/* Welcome Popup for first-time users */}
      {showWelcomePopup && (
        <div className="popup-overlay">
          <div className="welcome-popup funding-popup">
            <button className="close-popup" onClick={handleCloseWelcomePopup}>
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
                <button className="btn btn-secondary" onClick={handleCloseWelcomePopup}>
                  Skip
                </button>
                <button className="btn btn-primary" onClick={handleNextOnboardingStep}>
                  {currentOnboardingStep < onboardingSteps.length - 1 ? "Next" : "Get Started"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

   

      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>My Funding Matches and Insights</h1>

        <div className={styles.sectionCard}>
          <FundingFlowPipeline />
        </div>

        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Funding Insights</h2>
          <FundingInsights />
        </div>

        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Filter Matches</h2>
          <FilterFunding onFilterChange={handleFilterChange} filters={filters} />
        </div>

        <div className={styles.sectionCard}>
          <FundingTable filters={filters} />
        </div>
      </div>
    </div>
  )
}