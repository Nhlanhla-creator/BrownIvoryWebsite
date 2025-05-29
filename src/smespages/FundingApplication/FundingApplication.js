"use client"

import { useState, useEffect } from "react"
import "./FundingApplication.css"
import { CheckCircle, ChevronRight, ChevronLeft, Save, X, ArrowRight } from "lucide-react"
import { sections } from "./sections"
import { renderApplicationOverview } from "./ApplicationOverview"
import { renderUseOfFunds } from "./UseOfFunds"
import { renderEnterpriseReadiness } from "./EnterpriseReadiness"
import { renderFinancialOverview } from "./FinancialOverview"
import { renderGrowthPotential } from "./GrowthPotential"
import { renderSocialImpact } from "./SocialImpact"
import { renderDeclarationCommitment } from "./DeclarationCommitment"
import ApplicationSummary from "./application-summary"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { auth, db, storage } from "../../firebaseConfig"
import { useNavigate } from "react-router-dom"

// Onboarding steps for the welcome popup
const onboardingSteps = [
  {
    title: "Welcome to Funding Application",
    content: "This application will help us understand your funding needs and how we can support your business growth.",
    icon: "💰",
  },
  {
    title: "Step 1: Application Overview",
    content: "Start by providing basic information about your funding request and business needs.",
    icon: "📋",
  },
  {
    title: "Step 2: Financial Details",
    content: "Complete each section with accurate information about your financial situation and funding requirements.",
    icon: "📊",
  },
  {
    title: "Step 3: Submit & Review",
    content: "Review your information in the summary page and submit when you're ready. You can always edit later.",
    icon: "✅",
  },
]

export default function FundingApplication() {
  const [activeSection, setActiveSection] = useState("applicationOverview")
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // New state for popups
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [showCongratulationsPopup, setShowCongratulationsPopup] = useState(false)
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0)

  const [completedSections, setCompletedSections] = useState({
    applicationOverview: false,
    useOfFunds: false,
    enterpriseReadiness: false,
    financialOverview: false,
    growthPotential: false,
    socialImpact: false,
    declarationCommitment: false,
  })

  const [formData, setFormData] = useState({
    applicationOverview: {
      submissionChannel: "Online Portal",
      applicationDate: new Date().toISOString().split("T")[0],
    },
    useOfFunds: {
      fundingItems: [
        {
          category: "",
          subArea: "",
          description: "",
          amount: "",
        },
      ],
    },
    enterpriseReadiness: {
      barriers: [],
    },
    financialOverview: {},
    growthPotential: {},
    socialImpact: {},
    declarationCommitment: {
      confirmIntent: false,
      commitReporting: false,
      consentShare: false,
    },
  })

  // Helper function to get user-specific localStorage key
  const getUserSpecificKey = (baseKey) => {
    const userId = auth.currentUser?.uid
    return userId ? `${baseKey}_${userId}` : baseKey
  }

  // Function to check if declaration commitment is complete
  const checkDeclarationCommitment = (data) => {
    const declarationCommitment = data?.declarationCommitment
    if (!declarationCommitment) return false

    return (
      declarationCommitment.confirmIntent === true &&
      declarationCommitment.commitReporting === true &&
      declarationCommitment.consentShare === true
    )
  }

  // Function to save onboarding status to Firebase
  const saveOnboardingStatusToFirebase = async (status) => {
    try {
      const userId = auth.currentUser?.uid
      if (!userId) return

      const docRef = doc(db, "universalProfiles", userId)
      await setDoc(docRef, { 
        fundingApplicationOnboardingSeen: status 
      }, { merge: true })
    } catch (error) {
      console.error("Error saving onboarding status to Firebase:", error)
    }
  }

  // Function to load data from Firebase
  const loadDataFromFirebase = async () => {
    try {
      const userId = auth.currentUser?.uid
      if (!userId) {
        console.log("User not logged in, skipping Firebase data retrieval")
        setIsLoading(false)
        return
      }

      const docRef = doc(db, "universalProfiles", userId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const firebaseData = docSnap.data()
        console.log("Retrieved data from Firebase:", firebaseData)

        // Check onboarding status from Firebase
        const hasSeenOnboarding = firebaseData.fundingApplicationOnboardingSeen === true
        
        // Show welcome popup only if user hasn't seen it (based on Firebase data)
        if (!hasSeenOnboarding) {
          setShowWelcomePopup(true)
        }

        // Check if declaration commitment is complete in Firebase
        const declarationCommitmentComplete = checkDeclarationCommitment(firebaseData)

        // Application is considered submitted if declaration commitment is complete OR applicationSubmitted is true
        const firebaseSubmissionStatus = declarationCommitmentComplete || firebaseData.applicationSubmitted === true

        // Merge Firebase data with current formData, preserving structure
        setFormData((prevData) => {
          const mergedData = { ...prevData }

          // Handle each section
          Object.keys(prevData).forEach((sectionKey) => {
            if (firebaseData[sectionKey]) {
              mergedData[sectionKey] = {
                ...prevData[sectionKey],
                ...firebaseData[sectionKey],
              }
            }
          })

          // Special handling for applicationOverview to ensure required fields
          if (firebaseData.applicationOverview) {
            mergedData.applicationOverview = {
              submissionChannel: "Online Portal", // Always default this
              applicationDate: new Date().toISOString().split("T")[0], // Always use current date for new applications
              ...firebaseData.applicationOverview,
              // Override with current date and submission channel for new application
              applicationDate: new Date().toISOString().split("T")[0],
              submissionChannel: "Online Portal",
            }
          }

          return mergedData
        })

        // Update completed sections based on what data exists
        setCompletedSections((prevCompleted) => {
          const updatedCompleted = { ...prevCompleted }

          Object.keys(prevCompleted).forEach((sectionKey) => {
            if (firebaseData[sectionKey]) {
              // Check if section has meaningful data
              const sectionData = firebaseData[sectionKey]
              const hasData = Object.keys(sectionData).some((key) => {
                const value = sectionData[key]
                return (
                  value !== "" &&
                  value !== null &&
                  value !== undefined &&
                  (Array.isArray(value) ? value.length > 0 : true)
                )
              })

              if (hasData) {
                updatedCompleted[sectionKey] = true
              }
            }
          })

          return updatedCompleted
        })

        // If application is marked as submitted in Firebase, show summary
        if (firebaseSubmissionStatus) {
          setApplicationSubmitted(true)
          setShowSummary(true)
        }
      } else {
        console.log("No previous data found in Firebase")
        // If no Firebase data exists, show onboarding for new users
        setShowWelcomePopup(true)
      }
    } catch (error) {
      console.error("Error loading data from Firebase:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const userId = auth.currentUser?.uid
    if (!userId) {
      setIsLoading(false)
      return
    }

    // First load from localStorage for immediate UI update (keeping existing localStorage functionality)
    const savedData = localStorage.getItem(getUserSpecificKey("fundingApplicationData"))
    const savedCompletedSections = localStorage.getItem(getUserSpecificKey("fundingApplicationCompletedSections"))
    const savedSubmissionStatus = localStorage.getItem(getUserSpecificKey("applicationSubmitted"))

    if (savedData) {
      setFormData(JSON.parse(savedData))
    }

    if (savedCompletedSections) {
      setCompletedSections(JSON.parse(savedCompletedSections))
    }

    if (savedSubmissionStatus === "true") {
      setApplicationSubmitted(true)
      setShowSummary(true)
    }

    // Load from Firebase (this will override localStorage data and handle onboarding)
    loadDataFromFirebase()
  }, [])

  useEffect(() => {
    const userId = auth.currentUser?.uid
    if (!userId) return

    // Only save to localStorage after initial loading is complete
    if (!isLoading) {
      localStorage.setItem(getUserSpecificKey("fundingApplicationData"), JSON.stringify(formData))
      localStorage.setItem(getUserSpecificKey("fundingApplicationCompletedSections"), JSON.stringify(completedSections))
      localStorage.setItem(getUserSpecificKey("applicationSubmitted"), applicationSubmitted.toString())
    }
  }, [formData, completedSections, applicationSubmitted, isLoading])

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }

  const markSectionAsCompleted = (section) => {
    setCompletedSections((prev) => ({
      ...prev,
      [section]: true,
    }))
  }

  const navigateToNextSection = () => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection)
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id)
      window.scrollTo(0, 0)
    }
  }

  const navigateToPreviousSection = () => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection)
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id)
      window.scrollTo(0, 0)
    }
  }

  const handleEditApplication = () => {
    setShowSummary(false)
    setApplicationSubmitted(false) // Allow editing by setting to false
    setActiveSection("applicationOverview")
    window.scrollTo(0, 0)
  }

  const handleNextOnboardingStep = () => {
    if (currentOnboardingStep < onboardingSteps.length - 1) {
      setCurrentOnboardingStep(currentOnboardingStep + 1)
    } else {
      setShowWelcomePopup(false)
      // Save to Firebase that user has seen onboarding
      saveOnboardingStatusToFirebase(true)
    }
  }

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false)
    // Save to Firebase that user has seen onboarding
    saveOnboardingStatusToFirebase(true)
  }

  const handleCloseCongratulationsPopup = () => {
    setShowCongratulationsPopup(false)
    setShowSummary(true) // Show the summary after closing the congratulations popup
  }

  const handleNavigateToProductApplication = () => {
    navigate("/applications/product-application")
  }
    const handleNavigateToDashboard = () => {
    navigate("/dashboard")
  }

  const handleViewMatches = () => {
    navigate("/funding-matches")
  }

  const handleSubmitApplication = async () => {
    try {
      markSectionAsCompleted("declarationCommitment")
      setApplicationSubmitted(true)

      // Save all data to Firebase including submission status
      await saveDataToFirebase(null, true)

      // Show congratulations popup only if user hasn't seen it before
      const hasSeenFundingCongratulationsPopup =
        localStorage.getItem(getUserSpecificKey("hasSeenFundingCongratulationsPopup")) === "true"
      if (!hasSeenFundingCongratulationsPopup) {
        setShowCongratulationsPopup(true)
        localStorage.setItem(getUserSpecificKey("hasSeenFundingCongratulationsPopup"), "true")
      } else {
        setShowSummary(true) // Show the summary immediately if they've seen the popup before
      }

      window.scrollTo(0, 0)
    } catch (err) {
      console.error("Failed to submit application:", err)
      alert("Failed to submit application. Please try again.")

      // Revert the submission status if Firebase save failed
      setApplicationSubmitted(false)
    }
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "applicationOverview":
        return renderApplicationOverview(formData.applicationOverview, updateFormData)
      case "useOfFunds":
        return renderUseOfFunds(formData.useOfFunds, updateFormData)
      case "enterpriseReadiness":
        return renderEnterpriseReadiness(formData.enterpriseReadiness, updateFormData)
      case "financialOverview":
        return renderFinancialOverview(formData.financialOverview, updateFormData)
      case "growthPotential":
        return renderGrowthPotential(formData.growthPotential, updateFormData)
      case "socialImpact":
        return renderSocialImpact(formData.socialImpact, updateFormData)
      case "declarationCommitment":
        return renderDeclarationCommitment(formData.declarationCommitment, updateFormData)
      default:
        return renderApplicationOverview(formData.applicationOverview, updateFormData)
    }
  }

  const uploadFilesAndReplaceWithURLs = async (data, section) => {
    const uploadRecursive = async (item, pathPrefix) => {
      if (item instanceof File) {
        const fileRef = ref(storage, `universalProfile/${auth.currentUser?.uid}/${pathPrefix}`)
        await uploadBytes(fileRef, item)
        return await getDownloadURL(fileRef)
      } else if (Array.isArray(item)) {
        return await Promise.all(item.map((entry, idx) => uploadRecursive(entry, `${pathPrefix}/${idx}`)))
      } else if (typeof item === "object" && item !== null) {
        const updated = {}
        for (const key in item) {
          updated[key] = await uploadRecursive(item[key], `${pathPrefix}/${key}`)
        }
        return updated
      } else {
        return item
      }
    }

    return await uploadRecursive(data, section)
  }

  const saveDataToFirebase = async (section = null, includingSubmissionStatus = false) => {
    try {
      const userId = auth.currentUser?.uid
      if (!userId) throw new Error("User not logged in.")

      const docRef = doc(db, "universalProfiles", userId)
      const sectionData = section ? formData[section] : formData

      const uploaded = section
        ? { [section]: await uploadFilesAndReplaceWithURLs(sectionData, section) }
        : await uploadFilesAndReplaceWithURLs(formData, "full")

      const dataToSave = { ...uploaded }

      // Only include submission status if specifically requested
      if (includingSubmissionStatus) {
        dataToSave.applicationSubmitted = applicationSubmitted
      }

      await setDoc(docRef, dataToSave, { merge: true })
    } catch (err) {
      console.error("Error saving to Firebase:", err)
      throw err
    }
  }

  const handleSaveSection = async () => {
    try {
      await saveDataToFirebase(activeSection)
      alert("Section saved to Firebase!")
    } catch (err) {
      alert("Failed to save to Firebase.")
    }
  }

  const handleSaveAndContinue = async () => {
    try {
      markSectionAsCompleted(activeSection)
      await saveDataToFirebase(activeSection)
      navigateToNextSection()
    } catch (err) {
      alert("Failed to save. Please try again.")
    }
  }

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="funding-application-container">
        <div
          className="loading-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
            fontSize: "16px",
            color: "#666",
          }}
        >
          Loading your previous application data...
        </div>
      </div>
    )
  }

  // If application is submitted and we're showing the summary
  if (showSummary) {
    return <ApplicationSummary formData={formData} onEdit={handleEditApplication} />
  }

  // If application is submitted but user is coming back to edit
  if (applicationSubmitted && !showSummary) {
    // Continue with the form
  }

  return (
    <div className="funding-application-container">
      {/* Welcome Popup for first-time users */}
      {showWelcomePopup && (
        <div className="popup-overlay">
          <div className="welcome-popup">
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

      {/* Congratulations Popup */}
      {showCongratulationsPopup && (
        <div className="popup-overlay">
          <div className="congratulations-popup">
            <button className="close-popup" onClick={handleCloseCongratulationsPopup}>
              <X size={24} />
            </button>
            <div className="popup-content">
              <div className="confetti-animation">🎉</div>
              <h2>Congratulations!</h2>
              <p>You've successfully completed your Funding Application!</p>
              <p>
                You can now view your application summary or proceed to the Dashboard or view Your matches 
              </p>
              <div className="popup-buttons-group">
                <button className="btn btn-secondary" onClick={handleCloseCongratulationsPopup}>
                  View Summary
                </button>
                {/* <button className="btn btn-primary" onClick={handleNavigateToProductApplication}>
                  Go to Product Application
                </button> */}
                 <button className="btn btn-primary" onClick={handleViewMatches}>
                  View Matches
                </button>
                <button className="btn btn-secondary" onClick={handleNavigateToDashboard}>
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1>Funding and Support Application</h1>

      <div className="profile-tracker">
        <div className="profile-tracker-inner">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`profile-tracker-button ${
                activeSection === section.id ? "active" : completedSections[section.id] ? "completed" : "pending"
              }`}
            >
              {section.label.split("\n").map((line, i) => (
                <span key={i} className="tracker-label-line">
                  {line}
                </span>
              ))}
              {completedSections[section.id] && <CheckCircle className="check-icon" />}
            </button>
          ))}
        </div>
      </div>

      <div className="content-card">
        {renderActiveSection()}

        <div className="action-buttons">
          {activeSection !== "applicationOverview" && (
            <button type="button" onClick={navigateToPreviousSection} className="btn btn-secondary">
              <ChevronLeft size={16} /> Previous
            </button>
          )}

          <button type="button" onClick={handleSaveSection} className="btn btn-secondary">
            <Save size={16} /> Save
          </button>

          {activeSection !== "declarationCommitment" ? (
            <button type="button" onClick={handleSaveAndContinue} className="btn btn-primary">
              Save & Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmitApplication}
              disabled={
                !formData.declarationCommitment.confirmIntent ||
                !formData.declarationCommitment.commitReporting ||
                !formData.declarationCommitment.consentShare
              }
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  )
}