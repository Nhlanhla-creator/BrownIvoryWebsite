"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, ChevronRight, ChevronLeft, Save, X, ArrowRight } from "lucide-react"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { auth, db, storage } from "../../firebaseConfig" // adjust based on your setup
import "./UniversalProfile.css"
import Instructions from "./instructions"
import EntityOverview from "./entity-overview"
import OwnershipManagement from "./ownership-management"
import ContactDetails from "./contact-details"
import LegalCompliance from "./legal-compliance"
import ProductsServices from "./products-services"
import HowDidYouHear from "./how-did-you-hear"
import DeclarationConsent from "./declaration-consent"
import ProfileSummary from "./ProfileSummary"

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
    title: "Welcome to Universal Profile",
    content: "This profile will help us understand your business better and provide you with tailored services.",
    icon: "👋",
  },
  {
    title: "Step 1: Read Instructions",
    content: "Start by reading the instructions carefully to understand what information you'll need to provide.",
    icon: "📝",
  },
  {
    title: "Step 2: Fill in Your Details",
    content: "Complete each section with accurate information about your business entity, ownership, and operations.",
    icon: "📋",
  },
  {
    title: "Step 3: Review & Submit",
    content: "Review your information in the summary page and submit when you're ready. You can always edit later.",
    icon: "✅",
  },
]

export default function UniversalProfile() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("instructions")
  const [profileSubmitted, setProfileSubmitted] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  // New state for popups
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [showCongratulationsPopup, setShowCongratulationsPopup] = useState(false)
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0)

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

  const [formData, setFormData] = useState({
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
          idDocument: null,
        },
      ],
      directors: [
        {
          name: "",
          id: "",
          position: "",
          nationality: "",
          isExec: false,
          doc: null,
        },
      ],
    },
    contactDetails: {
      sameAsPhysical: false,
    },
    legalCompliance: {
      licenseDoc: null,
    },
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

  // Helper function to get user-specific localStorage key
  const getUserSpecificKey = (baseKey) => {
    const userId = auth.currentUser?.uid
    return userId ? `${baseKey}_${userId}` : baseKey
  }

  // Function to save onboarding status to Firebase
  const saveOnboardingStatusToFirebase = async (status) => {
    try {
      const userId = auth.currentUser?.uid
      if (!userId) return

      const docRef = doc(db, "universalProfiles", userId)
      await setDoc(docRef, { 
        universalProfileOnboardingSeen: status 
      }, { merge: true })
    } catch (error) {
      console.error("Error saving onboarding status to Firebase:", error)
    }
  }

  // Function to check if declaration consent is complete
  const checkDeclarationConsent = (data) => {
    const declarationConsent = data?.declarationConsent
    if (!declarationConsent) return false

    return (
      declarationConsent.accuracy === true &&
      declarationConsent.dataProcessing === true &&
      declarationConsent.termsConditions === true
    )
  }

  // Function to load data from Firebase
  const loadDataFromFirebase = async () => {
    try {
      const userId = auth.currentUser?.uid
      if (!userId) {
        console.log("User not logged in, skipping Firebase data retrieval")
        setLoading(false)
        return
      }

      const docRef = doc(db, "universalProfiles", userId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const firebaseData = docSnap.data()
        console.log("Retrieved data from Firebase:", firebaseData)

        // Check onboarding status from Firebase
        const hasSeenOnboarding = firebaseData.universalProfileOnboardingSeen === true
        
        // Show welcome popup only if user hasn't seen it (based on Firebase data)
        if (!hasSeenOnboarding) {
          setShowWelcomePopup(true)
        }

        // Check if declaration consent is complete in Firebase
        const declarationConsentComplete = checkDeclarationConsent(firebaseData)

        // Profile is considered submitted if declaration consent is complete OR profileSubmitted is true
        const firebaseSubmissionStatus = declarationConsentComplete || firebaseData.profileSubmitted === true

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

        // If profile is marked as submitted in Firebase, show summary
        if (firebaseSubmissionStatus) {
          setProfileSubmitted(true)
          setShowSummary(true)
        }

        // Set profile data for summary
        setProfileData(firebaseData)
      } else {
        console.log("No previous data found in Firebase")
        // If no Firebase data exists, show onboarding for new users
        setShowWelcomePopup(true)
      }
    } catch (error) {
      console.error("Error loading data from Firebase:", error)
    } finally {
      setLoading(false)
    }
  }

  // Load saved data from localStorage and Firebase
  useEffect(() => {
    const userId = auth.currentUser?.uid
    if (!userId) {
      setLoading(false)
      return
    }

    // First load from localStorage for immediate UI update (keeping existing localStorage functionality)
    const savedData = localStorage.getItem(getUserSpecificKey("universalProfileData"))
    const savedCompletedSections = localStorage.getItem(getUserSpecificKey("universalProfileCompletedSections"))
    const savedSubmissionStatus = localStorage.getItem(getUserSpecificKey("profileSubmitted"))

    if (savedData) setFormData(JSON.parse(savedData))
    if (savedCompletedSections) setCompletedSections(JSON.parse(savedCompletedSections))
    if (savedSubmissionStatus === "true") {
      setProfileSubmitted(true)
      setShowSummary(true)
    }

    // Load from Firebase (this will override localStorage data and handle onboarding)
    loadDataFromFirebase()
  }, [])

  // Save to localStorage
  useEffect(() => {
    const userId = auth.currentUser?.uid
    if (!userId) return

    // Only save to localStorage after initial loading is complete
    if (!loading) {
      localStorage.setItem(getUserSpecificKey("universalProfileData"), JSON.stringify(formData))
      localStorage.setItem(getUserSpecificKey("universalProfileCompletedSections"), JSON.stringify(completedSections))
      localStorage.setItem(getUserSpecificKey("profileSubmitted"), profileSubmitted.toString())
    }
  }, [formData, completedSections, profileSubmitted, loading])

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
    const index = sections.findIndex((s) => s.id === activeSection)
    if (index < sections.length - 1) {
      setActiveSection(sections[index + 1].id)
      window.scrollTo(0, 0)
    }
  }

  const navigateToPreviousSection = () => {
    const index = sections.findIndex((s) => s.id === activeSection)
    if (index > 0) {
      setActiveSection(sections[index - 1].id)
      window.scrollTo(0, 0)
    }
  }

  const handleEditProfile = () => {
    setIsEditing(true)
    setShowSummary(false)
    setActiveSection("entityOverview")
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

  const handleNavigateToFunding = () => {
    navigate("/applications/funding")
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
      setLoading(true)
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
        dataToSave.profileSubmitted = profileSubmitted
      }

      await setDoc(docRef, dataToSave, { merge: true })
    } catch (err) {
      console.error("Error saving to Firebase:", err)
      throw err
    } finally {
      setLoading(false)
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
      markSectionAsCompleted("declarationConsent")
      setProfileSubmitted(true)

      // Save all data to Firebase including submission status
      await saveDataToFirebase(null, true)

      // Show congratulations popup only if user hasn't seen it before
      const hasSeenCongratulationsPopup =
        localStorage.getItem(getUserSpecificKey("hasSeenCongratulationsPopup")) === "true"
      if (!hasSeenCongratulationsPopup) {
        setShowCongratulationsPopup(true)
        localStorage.setItem(getUserSpecificKey("hasSeenCongratulationsPopup"), "true")
      } else {
        setShowSummary(true) // Show the summary immediately if they've seen the popup before
      }

      setIsEditing(false) // Reset editing state
      window.scrollTo(0, 0)
      console.log("Submitted:", formData)
    } catch (err) {
      console.error("Failed to submit profile:", err)
      alert("Failed to submit profile. Please try again.")

      // Revert the submission status if Firebase save failed
      setProfileSubmitted(false)
    }
  }

  // Function to handle completion of the registration process
  const handleRegistrationComplete = async () => {
    // Any final submission logic here

    // Show a success message
    alert("Your profile has been successfully submitted!")

    // Redirect to dashboard
    navigate("/dashboard")
  }

  const renderActiveSection = () => {
    const sectionData = formData[activeSection] || {}
    const commonProps = {
      data: sectionData,
      updateData: (data) => updateFormData(activeSection, data),
    }

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
        return <DeclarationConsent {...commonProps} allFormData={formData} onComplete={handleRegistrationComplete} />
      default:
        return <Instructions />
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <div className="loading-message">Fetching your Universal Profile...</div>
      </div>
    )
  }

  // If profile is submitted and we're showing the summary (and not editing)
  if (showSummary && !isEditing) {
    return <ProfileSummary data={profileData || formData} onEdit={handleEditProfile} />
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
              <p>You've successfully completed your Universal Profile!</p>
              <p>
                You can now view your profile summary and make any necessary edits, or proceed to the Funding
                Application to apply for business funding.
              </p>
              <div className="popup-buttons-group">
                <button className="btn btn-secondary" onClick={handleCloseCongratulationsPopup}>
                  View Summary
                </button>
                <button className="btn btn-primary" onClick={handleNavigateToFunding}>
                  Go to Funding Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1>My Universal Profile</h1>

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
          {activeSection !== "instructions" && (
            <button type="button" onClick={navigateToPreviousSection} className="btn btn-secondary">
              <ChevronLeft size={16} /> Previous
            </button>
          )}

          <button type="button" onClick={handleSaveSection} className="btn btn-secondary">
            <Save size={16} /> Save
          </button>

          {activeSection !== "declarationConsent" ? (
            <button type="button" onClick={handleSaveAndContinue} className="btn btn-primary">
              Save & Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
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