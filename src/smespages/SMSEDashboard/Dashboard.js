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
import "./Dashboard.css"

export function Dashboard() {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Customers")
  const user = auth.currentUser
  const userName = user ? user.email : "User"

  // Styles
  const styles = {
    primaryBrown: "#5D4037",
    lightBrown: "#8D6E63",
    darkBrown: "#3E2723",
    accentBrown: "#A67C52",
    paleBrown: "#D7CCC8",
    backgroundBrown: "#EFEBE9",
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

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading dashboard...</div>
  }

  return (
    <div className="dashboard-container bg-[#EFEBE9]">
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
