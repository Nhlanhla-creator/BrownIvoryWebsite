"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "./dashboard-header"
import { ApplicationTracker } from "./application-tracker"
import { StatsRow } from "./stats-row"
import { TopMatchesTable } from "./top-matches-table"
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

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading dashboard...</div>
  }

  return (
    <div className="dashboard-container bg-[#EFEBE9]">
      <div className="content">
        <main className="dashboard-main p-4 md:p-6">
          <DashboardHeader userName={userName} />
          
          {/* Application Tracker */}
          <ApplicationTracker styles={styles} />
          
          {/* Stats Row */}
          <StatsRow styles={styles} profileData={profileData} />
          
          {/* Top Matches */}
          <div className="second-row mt-6">
            <TopMatchesTable 
              styles={styles} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
          </div>
        </main>
      </div>
    </div>
  )
}
