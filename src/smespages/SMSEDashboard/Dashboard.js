"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "./dashboard-header"
import { ApplicationTracker } from "./application-tracker"
import { TopMatchesTable } from "./top-matches-table"
import { LegitimacyScoreCard } from "./legitimacy-score-card"
import { FundabilityScoreCard } from "./fundability-score-card"
import { CalendarCard } from "./calendar-card"
import { CustomerReviewsCard } from "./customer-reviews-card"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../firebaseConfig"
import { X, ChevronRight } from "lucide-react"
import "./Dashboard.css"

export function Dashboard() {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Customers")
  const [showDashboardPopup, setShowDashboardPopup] = useState(false)
  const [currentDashboardStep, setCurrentDashboardStep] = useState(0)
  const user = auth.currentUser
  const userName = user ? user.email : "User"

  // Dashboard explanation steps
  const dashboardSteps = [
    {
      title: "Welcome to Your Dashboard",
      content:
        "This is your central hub for tracking applications, viewing matches, and monitoring your business metrics.",
      icon: "🏠",
    },
    {
      title: "Application Tracker",
      content:
        "Track the status of all your applications in one place. See which stage each application is in and what's next.",
      icon: "📊",
    },
    {
      title: "Business Metrics",
      content:
        "Monitor your Legitimacy Score and Fundability Score to understand how your business is perceived by partners and funders.",
      icon: "📈",
    },
    {
      title: "Top Matches",
      content: "View potential customers, suppliers, and partners that match your business profile and needs.",
      icon: "🤝",
    },
    {
      title: "Calendar & Reviews",
      content: "Keep track of upcoming events and meetings, and see what customers are saying about your business.",
      icon: "📅",
    },
  ]

  // Styles
  const styles = {
    primaryBrown: "#5D4037",
    lightBrown: "#8D6E63",
    darkBrown: "#3E2723",
    accentBrown: "#A67C52",
    paleBrown: "#D7CCC8",
    backgroundBrown: "#EFEBE9",
  }

  // Helper function to get user-specific localStorage key
  const getUserSpecificKey = (baseKey) => {
    const userId = auth.currentUser?.uid
    return userId ? `${baseKey}_${userId}` : baseKey
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = auth.currentUser?.uid
        if (!userId) {
          console.error("User not logged in")
          setLoading(false)
          return
        }

        const docRef = doc(db, "universalProfiles", userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setProfileData(docSnap.data())
        } else {
          console.error("No profile found")
        }
        setLoading(false)
      } catch (err) {
        console.error("Error fetching profile data:", err)
        setLoading(false)
      }
    }

    fetchProfileData()

    // Check if this is the first time visiting the dashboard for this user
    const userId = auth.currentUser?.uid
    if (userId) {
      const hasSeenDashboardPopup = localStorage.getItem(getUserSpecificKey("hasSeenDashboardPopup")) === "true"
      if (!hasSeenDashboardPopup) {
        setShowDashboardPopup(true)
      }
    }
  }, [])

  // Enable resizable cards
  useEffect(() => {
    const resizableContainers = document.querySelectorAll(".resizable-card-container")

    // Save card sizes to localStorage
    const saveCardSizes = () => {
      resizableContainers.forEach((container, index) => {
        const width = container.style.width
        const height = container.style.height
        if (width && height) {
          localStorage.setItem(`card-${index}-size`, JSON.stringify({ width, height }))
        }
      })
    }

    // Load card sizes from localStorage
    resizableContainers.forEach((container, index) => {
      const savedSize = localStorage.getItem(`card-${index}-size`)
      if (savedSize) {
        const { width, height } = JSON.parse(savedSize)
        container.style.width = width
        container.style.height = height
      }
    })

    // Add event listener to save sizes when resizing stops
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(saveCardSizes, 500)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [loading])

  const handleNextDashboardStep = () => {
    if (currentDashboardStep < dashboardSteps.length - 1) {
      setCurrentDashboardStep(currentDashboardStep + 1)
    } else {
      handleCloseDashboardPopup()
    }
  }

  const handleCloseDashboardPopup = () => {
    setShowDashboardPopup(false)
    localStorage.setItem(getUserSpecificKey("hasSeenDashboardPopup"), "true")
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading dashboard...</div>
  }

  return (
    <div className="dashboard-container bg-[#EFEBE9]">
      {/* Dashboard Welcome Popup */}
      {showDashboardPopup && (
        <div className="popup-overlay">
          <div className="welcome-popup dashboard-popup">
            <button className="close-popup" onClick={handleCloseDashboardPopup}>
              <X size={24} />
            </button>
            <div className="popup-content">
              <div className="popup-icon">{dashboardSteps[currentDashboardStep].icon}</div>
              <h2>{dashboardSteps[currentDashboardStep].title}</h2>
              <p>{dashboardSteps[currentDashboardStep].content}</p>

              <div className="popup-progress">
                {dashboardSteps.map((_, index) => (
                  <div key={index} className={`progress-dot ${index === currentDashboardStep ? "active" : ""}`} />
                ))}
              </div>

              <div className="popup-buttons">
                <button className="btn btn-secondary" onClick={handleCloseDashboardPopup}>
                  Close
                </button>
                {currentDashboardStep < dashboardSteps.length - 1 ? (
                  <button className="btn btn-primary" onClick={handleNextDashboardStep}>
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handleCloseDashboardPopup}>
                    Get Started
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="content">
        <main className="dashboard-main">
          <DashboardHeader userName={userName} />

          {/* Application Tracker */}
          <section className="tracker-section">
            <ApplicationTracker styles={styles} />
          </section>

          {/* Stats Cards Row */}
          <section className="stats-cards-row">
            {/* Legitimacy Score Card */}
            <div className="resizable-card-container">
              <LegitimacyScoreCard styles={styles} profileData={profileData} />
            </div>

            {/* Customer Reviews Card */}
            <div className="resizable-card-container">
              <CustomerReviewsCard styles={styles} />
            </div>

            {/* Fundability Score Card */}
            <div className="resizable-card-container">
              <FundabilityScoreCard profileData={profileData} />
            </div>

            {/* Calendar Card */}
            <div className="resizable-card-container">
              <CalendarCard />
            </div>
          </section>

          {/* Top Matches - Full Width */}
          <section className="top-matches-section">
            <TopMatchesTable
              styles={styles}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </section>
        </main>
      </div>
    </div>
  )
}
