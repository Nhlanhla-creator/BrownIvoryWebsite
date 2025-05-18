import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../firebaseConfig"
import { useNavigate } from "react-router-dom"
import styles from "./InvestorDashboard.module.css"

// Import components
import ApplicationTracker from "./application-tracker"
import { LegitimacyScoreCard as LegitimacyScore } from "./legitimacy-score"
import CustomerReviews from "./customer-reviews"
import CalendarWidget from "./calendar-widget"
import TopMatches from "./top-matches"

// Import modals
import CalendarModal from "./calendar-modal"
import EventModal from "./event-modal"
import ReviewModal from "./review-modal"
import DeadlineModal from "./deadline-modal"

const Dashboard = () => {
  const user = auth.currentUser
  const navigate = useNavigate()

  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [complianceScore, setComplianceScore] = useState(0)
  const [categoryScores, setCategoryScores] = useState({
    financialHealth: 0,
    operationalStrength: 0,
    pitchQuality: 0,
    impactProof: 0,
  })

  const [showDeadlineModal, setShowDeadlineModal] = useState(false)
  const [showFullCalendar, setShowFullCalendar] = useState(false)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)

  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedReview, setSelectedReview] = useState(null)

  const [currentDate, setCurrentDate] = useState(new Date())
  const [deadlines, setDeadlines] = useState([
    { date: 15, title: "Tax Submission" },
    { date: 30, title: "Compliance Review" },
  ])
  const [newDeadline, setNewDeadline] = useState({ title: "", date: "" })

  const upcomingEvents = [
    { title: "Investor Meetup", date: "May 15, 2023", type: "meeting" },
    { title: "Pitch Workshop", date: "May 20, 2023", type: "workshop" },
    { title: "Funding Deadline", date: "May 30, 2023", type: "deadline" },
  ]

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = auth.currentUser?.uid
        if (!userId) {
          console.error("User not logged in")
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

  useEffect(() => {
    if (profileData) {
      const operationStage = profileData.entityOverview?.operationStage || "ideation"
      const weights = operationStageWeights[operationStage] || operationStageWeights.ideation

      const complianceScoreValue = calculateComplianceScore(profileData)
      const financialHealth = calculateFinancialHealth(profileData)
      const operationalStrength = calculateOperationalStrength(profileData)
      const pitchQuality = calculatePitchQuality(profileData)
      const impactProof = calculateImpactProof(profileData)

      const weightedScores = {
        compliance: Math.round(complianceScoreValue * weights.compliance),
        financialHealth: Math.round(financialHealth * weights.financialHealth),
        operationalStrength: Math.round(operationalStrength * weights.operationalStrength),
        pitchQuality: Math.round(pitchQuality * weights.pitchQuality),
        impactProof: Math.round(impactProof * weights.impactProof),
      }

      setComplianceScore(weightedScores.compliance)
      setCategoryScores({
        financialHealth: weightedScores.financialHealth,
        operationalStrength: weightedScores.operationalStrength,
        pitchQuality: weightedScores.pitchQuality,
        impactProof: weightedScores.impactProof,
      })
    }
  }, [profileData])

  const operationStageWeights = {
    ideation: {
      compliance: 0.15,
      financialHealth: 0.1,
      operationalStrength: 0.15,
      pitchQuality: 0.3,
      impactProof: 0.3,
    },
    startup: {
      compliance: 0.2,
      financialHealth: 0.15,
      operationalStrength: 0.2,
      pitchQuality: 0.25,
      impactProof: 0.2,
    },
    growth: {
      compliance: 0.25,
      financialHealth: 0.2,
      operationalStrength: 0.25,
      pitchQuality: 0.15,
      impactProof: 0.15,
    },
    mature: {
      compliance: 0.3,
      financialHealth: 0.25,
      operationalStrength: 0.2,
      pitchQuality: 0.1,
      impactProof: 0.15,
    },
    turnaround: {
      compliance: 0.35,
      financialHealth: 0.2,
      operationalStrength: 0.15,
      pitchQuality: 0.15,
      impactProof: 0.15,
    },
  }

  const calculateComplianceScore = (data) => {
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
      let value = data
      for (const part of parts) {
        value = value?.[part]
        if (value === undefined || value === null || value === "") return false
        if (typeof value === "object" && value.url) return true
      }
      return true
    }).length

    return (presentCount / requiredDocuments.length) * 100
  }

  const calculateFinancialHealth = (data) => {
    let score = 0
    return Math.min(100, score)
  }

  const calculateOperationalStrength = (data) => {
    let score = 0
    return Math.min(100, score)
  }

  const calculatePitchQuality = (data) => {
    let score = 0
    return Math.min(100, score)
  }

  const calculateImpactProof = (data) => {
    let score = 0
    return Math.min(100, score)
  }

  const legitimacyScore = complianceScore * 2

  const handleDayClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
    setNewDeadline({
      title: "",
      date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    })
    setShowDeadlineModal(true)
  }

  const addDeadline = () => {
    if (newDeadline.title.trim() && newDeadline.date) {
      const day = new Date(newDeadline.date).getDate()
      setDeadlines([...deadlines, { date: day, title: newDeadline.title }])
      setShowDeadlineModal(false)
      setNewDeadline({ title: "", date: "" })
    }
  }

  const removeDeadline = (index) => {
    const newDeadlines = [...deadlines]
    newDeadlines.splice(index, 1)
    setDeadlines(newDeadlines)
  }

  const handleViewEventDetails = (event) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  const handleSyncWithOutlook = () => {
    alert("Syncing with Outlook Calendar...")
  }

  const handleViewReviewDetails = (review) => {
    setSelectedReview(review)
    setShowReviewModal(true)
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.content}>
        <main className={styles.dashboardMain}>
          <section className={styles.trackerSection}>
            <ApplicationTracker />
          </section>

          <section className={styles.statsSection}>
            <div className={styles.mainStatsRow}>
              <LegitimacyScore score={legitimacyScore} />
              <CustomerReviews onViewDetails={handleViewReviewDetails} />
              <CalendarWidget
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                deadlines={deadlines}
                upcomingEvents={upcomingEvents}
                onDayClick={handleDayClick}
                onViewFullCalendar={() => setShowFullCalendar(true)}
                onViewEventDetails={handleViewEventDetails}
                onAddEvent={() => setShowDeadlineModal(true)}
                onSyncWithOutlook={handleSyncWithOutlook}
              />
            </div>
          </section>

          <section className={styles.matchesSection}>
            <TopMatches />
          </section>

          {showDeadlineModal && (
            <DeadlineModal
              show={showDeadlineModal}
              onClose={() => setShowDeadlineModal(false)}
              newDeadline={newDeadline}
              setNewDeadline={setNewDeadline}
              onAddDeadline={addDeadline}
            />
          )}

          {showFullCalendar && (
            <CalendarModal
              show={showFullCalendar}
              onClose={() => setShowFullCalendar(false)}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              deadlines={deadlines}
              upcomingEvents={upcomingEvents}
              onDayClick={handleDayClick}
              onAddEvent={() => setShowDeadlineModal(true)}
            />
          )}
    
          {showEventDetails && selectedEvent && (
            <EventModal show={showEventDetails} onClose={() => setShowEventDetails(false)} event={selectedEvent} />
          )}
    
          {showReviewModal && selectedReview && (
            <ReviewModal show={showReviewModal} onClose={() => setShowReviewModal(false)} review={selectedReview} />
          )}
        </main>
      </div>
    </div>
)
}

export default Dashboard    