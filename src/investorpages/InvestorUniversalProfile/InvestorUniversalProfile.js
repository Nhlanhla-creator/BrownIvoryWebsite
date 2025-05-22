"use client"

import { useState, useEffect } from "react"
import { CheckCircle, ChevronRight, ChevronLeft, Save, X, ArrowRight } from 'lucide-react'
import styles from "./InvestorUniversalProfile.module.css"

import Instructions from "./Instructions"
import EntityOverview from "./EntityOverview"
import OwnershipManagement from "./OwnershipManagement"
import ContactDetails from "./ContactDetails"
import LegalCompliance from "./LegalCompliance"
import ProductsServices from "./ProductsService"
import HowDidYouHear from "./HowDidYouHear"
import DeclarationConsent from "./DeclarationConsent"
import InvestorProfileSummary from "./investor-profile-summary"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { auth, db, storage } from "../../firebaseConfig"
import { useNavigate } from "react-router-dom"
// Make sure this CSS file exists

const sections = [
  { id: "instructions", label: "Instructions" },
  { id: "entityOverview", label: "Entity\nOverview" },
  { id: "ownershipManagement", label: "Ownership &\nManagement" },
  { id: "contactDetails", label: "Contact\nDetails" },
  { id: "legalCompliance", label: "Legal &\nCompliance" },
  { id: "productsServices", label: "Products &\nServices" },
  { id: "howDidYouHear", label: "How Did\nYou Hear" },
  { id: "declarationConsent", label: "Declaration &\nConsent" },
]

// Onboarding steps for the welcome popup
const onboardingSteps = [
  {
    title: "Welcome to Investor Universal Profile",
    content: "This profile will help us understand your investment preferences and match you with suitable opportunities.",
    icon: "👋",
  },
  {
    title: "Step 1: Read Instructions",
    content: "Start by reading the instructions carefully to understand what information you'll need to provide.",
    icon: "📝",
  },
  {
    title: "Step 2: Fill in Your Details",
    content: "Complete each section with accurate information about your entity, investment criteria, and preferences.",
    icon: "📋",
  },
  {
    title: "Step 3: Review & Submit",
    content: "Review your information in the summary page and submit when you're ready. You can always edit later.",
    icon: "✅",
  },
]

export default function UniversalProfile() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("instructions")
  const [profileSubmitted, setProfileSubmitted] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [profileData, setProfileData] = useState(null)

  // Initialize popup states to false - we'll set them based on user status
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [showCongratulationsPopup, setShowCongratulationsPopup] = useState(false)
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0)

  // Initial data structure for formData
  const [formData, setFormData] = useState({
    instructions: {},
    entityOverview: {},
    ownershipManagement: {
      shareholders: [
        {
          name: "",
          idRegNo: "",
          country: "",
          shareholding: "",
          race: "",
          gender: "",
          isYouth: false,
          isDisabled: false,
        },
      ],
      directors: [{ name: "", id: "", position: "", nationality: "", isExec: false }],
    },
    contactDetails: {
      sameAsPhysical: false,
    },
    legalCompliance: {},
    productsServices: {
      entityType: "smse",
      productCategories: [],
      serviceCategories: [],
      keyClients: [],
    },
    howDidYouHear: {},
    declarationConsent: {
      accuracy: false,
      dataProcessing: false,
      termsConditions: false,
    },
  })

  const [completedSections, setCompletedSections] = useState({
    instructions: true,
    entityOverview: false,
    ownershipManagement: false,
    contactDetails: false,
    legalCompliance: false,
    productsServices: false,
    howDidYouHear: false,
    declarationConsent: false,
  })

  // Helper function to get user-specific localStorage key
  const getUserSpecificKey = (baseKey) => {
    const userId = auth.currentUser?.uid
    return userId ? `${baseKey}_${userId}` : baseKey
  }

  // Function to check if declaration consent is complete
  const checkDeclarationConsent = (data) => {
    const declarationConsent = data?.formData?.declarationConsent || data?.declarationConsent
    if (!declarationConsent) return false
    
    return (
      declarationConsent.accuracy === true &&
      declarationConsent.dataProcessing === true &&
      declarationConsent.termsConditions === true
    )
  }

  // Load profile data from Firebase first, then fall back to localStorage
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser
      if (!user) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        
        // First try to fetch from Firebase
        const docRef = doc(db, "MyuniversalProfiles", user.uid)
        const docSnap = await getDoc(docRef)
        
        let firebaseData = null
        let firebaseCompletedSections = null
        let firebaseSubmissionStatus = false
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          firebaseData = data.formData
          firebaseCompletedSections = data.completedSections
          
          // Check if declaration consent is complete in Firebase
          const declarationConsentComplete = checkDeclarationConsent(data)
          
          // Profile is considered submitted if declaration consent is complete OR profileSubmitted is true
          firebaseSubmissionStatus = declarationConsentComplete || data.profileSubmitted === true
          
          // Set data from Firebase
          if (firebaseData) setFormData(prev => ({ ...prev, ...firebaseData }))
          if (firebaseCompletedSections) setCompletedSections(prev => ({ ...prev, ...firebaseCompletedSections }))
          
          // If profile is marked as submitted in Firebase, show summary
          if (firebaseSubmissionStatus) {
            setProfileSubmitted(true)
            setShowSummary(true)
          }
        }
        
        // If no Firebase data or incomplete, try loading from localStorage as backup
        if (!firebaseData || !firebaseSubmissionStatus) {
          const savedData = localStorage.getItem("investorProfileData")
          const savedCompletedSections = localStorage.getItem("investorProfileCompletedSections")
          const savedSubmissionStatus = localStorage.getItem("investorProfileSubmitted")
          
          // Only use localStorage data if we don't have Firebase data
          if (savedData && !firebaseData) setFormData(JSON.parse(savedData))
          if (savedCompletedSections && !firebaseCompletedSections) setCompletedSections(JSON.parse(savedCompletedSections))
          
          // Only use localStorage submission status if Firebase didn't have it marked as submitted
          if (savedSubmissionStatus === "true" && !firebaseSubmissionStatus) {
            setProfileSubmitted(true)
            setShowSummary(true)
            
            // If we found submission status in localStorage but not Firebase, sync to Firebase
            if (!firebaseSubmissionStatus) {
              try {
                await setDoc(docRef, {
                  profileSubmitted: true
                }, { merge: true })
              } catch (syncError) {
                console.error("Error syncing submission status to Firebase:", syncError)
              }
            }
          }
        }

        // Check if this is the first time visiting - only show welcome popup for new users
        const hasSeenWelcomePopup = localStorage.getItem(getUserSpecificKey("hasSeenInvestorWelcomePopup")) === "true"
        if (!hasSeenWelcomePopup) {
          setShowWelcomePopup(true)
          localStorage.setItem(getUserSpecificKey("hasSeenInvestorWelcomePopup"), "true")
        }
        
      } catch (error) {
        console.error("Error fetching profile data:", error)
        setError("Failed to load profile data. Please try again later.")
        
        // Fall back to localStorage if Firebase fails
        const savedData = localStorage.getItem("investorProfileData")
        const savedCompletedSections = localStorage.getItem("investorProfileCompletedSections")
        const savedSubmissionStatus = localStorage.getItem("investorProfileSubmitted")
        
        if (savedData) setFormData(JSON.parse(savedData))
        if (savedCompletedSections) setCompletedSections(JSON.parse(savedCompletedSections))
        if (savedSubmissionStatus === "true") {
          setProfileSubmitted(true)
          setShowSummary(true)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("investorProfileData", JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    localStorage.setItem("investorProfileCompletedSections", JSON.stringify(completedSections))
  }, [completedSections])

  useEffect(() => {
    localStorage.setItem("investorProfileSubmitted", profileSubmitted.toString())
  }, [profileSubmitted])

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
    const currentIndex = sections.findIndex((s) => s.id === activeSection)
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id)
      window.scrollTo(0, 0)
    }
  }

  const navigateToPreviousSection = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection)
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id)
      window.scrollTo(0, 0)
    }
  }

  const handleEditProfile = () => {
    setShowSummary(false)
    setProfileSubmitted(false) // Allow editing by setting to false
    setActiveSection("entityOverview")
    window.scrollTo(0, 0)
  }

  const renderActiveSection = () => {
    const sectionData = formData[activeSection] || {}
    const updateData = (data) => updateFormData(activeSection, data)

    const commonProps = { data: sectionData, updateData }

    switch (activeSection) {
      case "instructions":
        return <Instructions />
      case "entityOverview":
        return <EntityOverview {...commonProps} />
      case "ownershipManagement":
        return <OwnershipManagement {...commonProps} />
      case "contactDetails":
        return <ContactDetails {...commonProps} />
      case "legalCompliance":
        return <LegalCompliance {...commonProps} />
      case "productsServices":
        return <ProductsServices {...commonProps} />
      case "howDidYouHear":
        return <HowDidYouHear {...commonProps} />
      case "declarationConsent":
        return <DeclarationConsent {...commonProps} />
      default:
        return <Instructions />
    }
  }

  const uploadFilesAndReplaceWithURLs = async (data, section) => {
    const uploadRecursive = async (item, pathPrefix) => {
      if (item instanceof File) {
        const fileRef = ref(storage, `MyuniversalProfile/${auth.currentUser?.uid}/${pathPrefix}`)
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

      const docRef = doc(db, "MyuniversalProfiles", userId)
      const sectionData = section ? formData[section] : formData

      const uploaded = section
        ? { [section]: await uploadFilesAndReplaceWithURLs(sectionData, section) }
        : await uploadFilesAndReplaceWithURLs(formData, "full")

      const dataToSave = {
        formData: section ? { ...uploaded } : uploaded,
        completedSections,
      }
      
      // Only include submission status if specifically requested
      if (includingSubmissionStatus) {
        dataToSave.profileSubmitted = profileSubmitted
      }

      await setDoc(
        docRef,
        dataToSave,
        { merge: true },
      )
      
      return true
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

  const handleSubmitProfile = async () => {
    try {
      // Mark the current section as completed
      markSectionAsCompleted("declarationConsent")

      // Set profile as submitted
      setProfileSubmitted(true)
      
      // First save everything to Firebase including the submission status
      await saveDataToFirebase(null, true)
      
      // Check if user has seen the congratulations popup before
      const hasSeenCongratulationsPopup = 
        localStorage.getItem(getUserSpecificKey("hasSeenInvestorCongratulationsPopup")) === "true"
      
      if (!hasSeenCongratulationsPopup) {
        // Show congratulations popup only for first-time completion
        setShowCongratulationsPopup(true)
        localStorage.setItem(getUserSpecificKey("hasSeenInvestorCongratulationsPopup"), "true")
      } else {
        // If they've seen it before, just show the summary
        setShowSummary(true)
      }
      
      // Scroll to top for better user experience
      window.scrollTo(0, 0)
    } catch (err) {
      console.error("Failed to submit profile:", err)
      alert("Failed to submit profile. Please try again.")
      
      // Revert the submission status if Firebase save failed
      setProfileSubmitted(false)
    }
  }

  // Popup handlers
  const handleNextOnboardingStep = () => {
    if (currentOnboardingStep < onboardingSteps.length - 1) {
      setCurrentOnboardingStep(currentOnboardingStep + 1)
    } else {
      setShowWelcomePopup(false)
    }
  }

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false)
  }

  const handleCloseCongratulationsPopup = () => {
    setShowCongratulationsPopup(false)
    setShowSummary(true) // Show the summary after closing the congratulations popup
  }

  const handleNavigateToDashboard = () => {
    navigate("/investor-dashboard")
  }

  const handleNavigateToSMSEApplications = () => {
    navigate("/investor-matches")
  }

  // If still loading, show a loading message
  if (loading) {
    return <div className="loading">Loading profile data...</div>
  }

  // If there's an error, show an error message
  if (error) {
    return <div className="error">{error}</div>
  }

  // If profile is submitted and we're showing the summary
  if (showSummary && !showCongratulationsPopup) {
    return <InvestorProfileSummary data={formData} onEdit={handleEditProfile} />
  }

  return (
    <div className="universal-profile-container">
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
              <p>You've successfully completed your Investor Universal Profile!</p>
              <p>
                You can now view your profile summary, go to your dashboard to see potential matches, or proceed to the SMSE Applications section.
              </p>
              <div className="popup-buttons-group">
                <button className="btn btn-secondary" onClick={handleCloseCongratulationsPopup}>
                  View Summary
                </button>
                <button className="btn btn-primary" onClick={handleNavigateToDashboard}>
                  Go to Dashboard
                </button>
                <button className="btn btn-secondary" onClick={handleNavigateToSMSEApplications}>
                  Go to SMSE Applications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1>My Universal Profile</h1>

      <div className={`${styles.profileTracker} profile-tracker`}>
        <div className={`${styles.profileTrackerInner} profile-tracker-inner`}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`${styles.profileTrackerButton} profile-tracker-button ${
                activeSection === section.id ? "active" : completedSections[section.id] ? "completed" : "pending"
              }`}
            >
              {section.label.split("\n").map((line, i) => (
                <span key={i} className={`${styles.trackerLabelLine} tracker-label-line`}>
                  {line}
                </span>
              ))}
              {completedSections[section.id] && <CheckCircle className="check-icon" />}
            </button>
          ))}
        </div>
      </div>

      <div className={`${styles.contentCard} content-card`}>
        {renderActiveSection()}

        <div className={`${styles.actionButtons} action-buttons`}>
          {activeSection !== "instructions" && (
            <button
              type="button"
              onClick={navigateToPreviousSection}
              className={`${styles.btn} ${styles.btnSecondary} btn btn-secondary`}
            >
              <ChevronLeft size={16} /> Previous
            </button>
          )}

          <button
            type="button"
            onClick={handleSaveSection}
            className={`${styles.btn} ${styles.btnSecondary} btn btn-secondary`}
          >
            <Save size={16} /> Save
          </button>

          {activeSection !== "declarationConsent" ? (
            <button
              type="button"
              onClick={handleSaveAndContinue}
              className={`${styles.btn} ${styles.btnPrimary} btn btn-primary`}
            >
              Save & Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary} btn btn-primary`}
              onClick={handleSubmitProfile}
              disabled={
                !formData.declarationConsent?.accuracy ||
                !formData.declarationConsent?.dataProcessing ||
                !formData.declarationConsent?.termsConditions
              }
            >
              Submit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}