"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight } from 'lucide-react'

import InvestorDealFlowPipeline from "./investor-deal-flow"
import { InvestorInsights } from "./investor-insights"
import { FilterFunding } from "./filter-funding"
import { InvestorSMETable } from "./investor-sme-table"

import styles from "./investor-funding.module.css"


// Onboarding steps for the welcome popup
const onboardingSteps = [
  {
    title: "Welcome to Your SMSE Dashboard",
    content: "This dashboard provides you with tools to discover, analyze, and manage potential investment opportunities.",
    icon: "💼",
  },
  {
    title: "Deal Flow Pipeline",
    content: "Track your investment opportunities at each stage of the pipeline, from initial contact to closing the deal.",
    icon: "📊",
  },
  {
    title: "Investment Insights",
    content: "Get valuable analytics and insights about market trends, performance metrics, and investment opportunities.",
    icon: "📈",
  },
  {
    title: "Filter SMEs",
    content: "Use powerful filters to find the perfect investment match based on location, industry, stage, and more.",
    icon: "🔍",
  },
  {
    title: "SME Opportunities",
    content: "Browse through potential investment opportunities and take action on the ones that match your criteria.",
    icon: "🤝",
  },
]

export default function InvestorDashboardPage() {
  const [filters, setFilters] = useState({ 
    location: "",
    matchScore: 50,
    minValue: "",
    maxValue: "",
    instruments: [],
    stages: [],
    sectors: [],
    supportTypes: [],
    smeType: "",
    sortBy: "",
  })

  // Popup states
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

  // Check if this is the first time visiting the investor dashboard
  useEffect(() => {
    const hasSeenInvestorDashboardPopup =
      localStorage.getItem(getUserSpecificKey("hasSeenInvestorDashboardPopup")) === "true"

    if (!hasSeenInvestorDashboardPopup) {
      setShowWelcomePopup(true)
      localStorage.setItem(getUserSpecificKey("hasSeenInvestorDashboardPopup"), "true")
    }
  }, [])

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

  return (
    <div className={styles.mainContent}>
      {/* Welcome Popup for first-time users */}
      {showWelcomePopup && (
        <div className="popup-overlay">
          <div className="welcome-popup investor-popup">
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
        <h1 className={styles.pageTitle}>My Matches and Insights</h1>

        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Deal Flow Pipeline</h2>
          <InvestorDealFlowPipeline />
        </div>

        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Investment Insights</h2>
          <InvestorInsights />
        </div>

        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Filter SMSEs</h2>
          <FilterFunding onFilterChange={handleFilterChange} filters={filters} />
        </div>

        <div className={styles.sectionCard}>
      
          <InvestorSMETable filters={filters} />
        </div>
      </div>
    </div>
  )
}