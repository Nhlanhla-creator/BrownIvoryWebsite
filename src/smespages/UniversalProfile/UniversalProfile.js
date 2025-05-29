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
import { onAuthStateChanged } from "firebase/auth";


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

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const savedData = localStorage.getItem(getUserSpecificKey("universalProfileData"));
      const savedCompletedSections = localStorage.getItem(getUserSpecificKey("universalProfileCompletedSections"));
      const savedSubmissionStatus = localStorage.getItem(getUserSpecificKey("profileSubmitted"));
      const hasSeenWelcomePopup = localStorage.getItem(getUserSpecificKey("hasSeenWelcomePopup")) === "true";
      const hasSeenCongratulationsPopup =
        localStorage.getItem(getUserSpecificKey("hasSeenCongratulationsPopup")) === "true";

      if (savedData) setFormData(JSON.parse(savedData));
      if (savedCompletedSections) setCompletedSections(JSON.parse(savedCompletedSections));
      if (savedSubmissionStatus === "true") {
        setProfileSubmitted(true);
        setShowSummary(true);
      }

      if (!hasSeenWelcomePopup) {
        setShowWelcomePopup(true);
        localStorage.setItem(getUserSpecificKey("hasSeenWelcomePopup"), "true");
      }
    } else {
      // Redirect to login or home page if not authenticated
      navigate("/login");
    }
    setLoading(false); // Done loading regardless
  });

  return () => unsubscribe(); // Cleanup listener on unmount
}, []);
  // Helper function to get user-specific localStorage key
  const getUserSpecificKey = (baseKey) => {
    const userId = auth.currentUser?.uid
    return userId ? `${baseKey}_${userId}` : baseKey
  }

  // Load saved data from localStorage
  useEffect(() => {
    const userId = auth.currentUser?.uid
    if (!userId) {
      setLoading(false)
      return
    }

    const savedData = localStorage.getItem(getUserSpecificKey("universalProfileData"))
    const savedCompletedSections = localStorage.getItem(getUserSpecificKey("universalProfileCompletedSections"))
    const savedSubmissionStatus = localStorage.getItem(getUserSpecificKey("profileSubmitted"))
    const hasSeenWelcomePopup = localStorage.getItem(getUserSpecificKey("hasSeenWelcomePopup")) === "true"
    const hasSeenCongratulationsPopup =
      localStorage.getItem(getUserSpecificKey("hasSeenCongratulationsPopup")) === "true"

    if (savedData) setFormData(JSON.parse(savedData))
    if (savedCompletedSections) setCompletedSections(JSON.parse(savedCompletedSections))
    if (savedSubmissionStatus === "true") {
      setProfileSubmitted(true)
      setShowSummary(true)
    }

    // Show welcome popup only for first-time users
    if (!hasSeenWelcomePopup) {
      setShowWelcomePopup(true)
      localStorage.setItem(getUserSpecificKey("hasSeenWelcomePopup"), "true")
    }

    setLoading(false)
  }, [])

  // Save to localStorage
  useEffect(() => {
    const userId = auth.currentUser?.uid
    if (!userId) return

    localStorage.setItem(getUserSpecificKey("universalProfileData"), JSON.stringify(formData))
    localStorage.setItem(getUserSpecificKey("universalProfileCompletedSections"), JSON.stringify(completedSections))
    localStorage.setItem(getUserSpecificKey("profileSubmitted"), profileSubmitted.toString())
  }, [formData, completedSections, profileSubmitted])

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

  const saveDataToFirebase = async (section = null) => {
    try {
      setLoading(true)
      const userId = auth.currentUser?.uid
      if (!userId) throw new Error("User not logged in.")

      const docRef = doc(db, "universalProfiles", userId)
      const sectionData = section ? formData[section] : formData

      const uploaded = section
        ? { [section]: await uploadFilesAndReplaceWithURLs(sectionData, section) }
        : await uploadFilesAndReplaceWithURLs(formData, "full")

      await setDoc(docRef, uploaded, { merge: true })
    } catch (err) {
      console.error("Error saving to Firebase:", err)
      alert("Failed to save to Firebase.")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSection = async () => {
    await saveDataToFirebase(activeSection)
    alert("Section saved to Firebase!")
  }

  const handleSaveAndContinue = async () => {
    markSectionAsCompleted(activeSection)
    await saveDataToFirebase(activeSection)
    navigateToNextSection()
  }

  const handleSubmitProfile = async () => {
    await saveDataToFirebase()
    markSectionAsCompleted("declarationConsent") // save full form
    setProfileSubmitted(true)

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
  }

  // Function to handle completion of the registration process
  const handleRegistrationComplete = async () => {
    // Any final submission logic here

    // Show a success message
    alert("Your profile has been successfully submitted!")

    // Redirect to dashboard
    navigate("/dashboard")
  }

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

  const handleNavigateToFunding = () => {
    navigate("/applications/funding")
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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true)
        const userId = auth.currentUser?.uid

        if (!userId) {
          throw new Error("User not logged in")
        }

        const docRef = doc(db, "universalProfiles", userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setProfileData(docSnap.data())

          // Check if profile is complete and show summary only on first load (not editing)
          const isProfileComplete =
            docSnap.data()?.declarationCommitment?.commitReporting &&
            docSnap.data()?.declarationCommitment?.confirmIntent &&
            docSnap.data()?.declarationCommitment?.consentShare

          if (isProfileComplete && !isEditing) {
            setProfileSubmitted(true)
            setShowSummary(true)
          }
        } else {
          setError("No profile found. Please complete your Universal Profile first.")
        }
      } catch (err) {
        console.error("Error fetching profile data:", err)
        setError("Failed to load profile data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [isEditing])

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
