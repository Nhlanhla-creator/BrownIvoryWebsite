"use client"

import { useState, useEffect } from "react"

import { ApplicationTracker } from "./application-tracker"
import { SMEApplicationsTable } from "./top-matches-table";

import { LegitimacyScoreCard } from "./legitimacy-score-card"
import { CalendarCard } from "./calender-card"
import { CustomerReviewsCard } from "./customer-reviews-card"

import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../firebaseConfig"

import styles from "./InvestorDashboard.module.css"

export function Dashboard() {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Customers")
  const user = auth.currentUser
  const userName = user ? user.email : "User"

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
    const resizableContainers = document.querySelectorAll(`.${styles.resizableCardContainer}`)

    const saveCardSizes = () => {
      resizableContainers.forEach((container, index) => {
        const width = container.style.width
        const height = container.style.height
        if (width && height) {
          localStorage.setItem(`card-${index}-size`, JSON.stringify({ width, height }))
        }
      })
    }

    resizableContainers.forEach((container, index) => {
      const savedSize = localStorage.getItem(`card-${index}-size`)
      if (savedSize) {
        const { width, height } = JSON.parse(savedSize)
        container.style.width = width
        container.style.height = height
      }
    })

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
    return (
      <div className={`${styles.dashboardContainer} flex items-center justify-center`}>
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.content}>
        <main className={styles.dashboardMain}>
          {/* Application Tracker */}
          <section className={styles.trackerSection}>
            <ApplicationTracker />
          </section>

          {/* Stats Cards Row */}
          <section className={styles.statsCardsRow}>
            {/* Legitimacy Score Card */}
            <div className={styles.resizableCardContainer}>
              <LegitimacyScoreCard profileData={profileData} />
            </div>

            {/* Customer Reviews Card */}
            <div className={styles.resizableCardContainer}>
              <CustomerReviewsCard />
            </div>

            {/* Calendar Card */}
            <div className={styles.resizableCardContainer}>
              <CalendarCard />
            </div>
          </section>

          {/* Top Matches - Full Width */}
          <section className={styles.topMatchesSection}>
            <SMEApplicationsTable
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </section>
        </main>
      </div>
    </div>
  )
}
