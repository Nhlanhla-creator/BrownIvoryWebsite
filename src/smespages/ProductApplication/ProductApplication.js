"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CheckCircle, ChevronRight, ChevronLeft, Save, X, ArrowRight } from "lucide-react"
import { sections } from "./applicationOptions"
import RequestOverview from "./RequestOverview"
import ProductsServices from "./ProductsServices"
import MatchingPreferences from "./MatchingPreferences"
import ContactSubmission from "./ContactSubmission"
import ApplicationSummary from "./application-summary"
import "./ProductApplication.css"
import { doc, setDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { auth, db, storage } from "../../firebaseConfig"

// Onboarding steps for the welcome popup
const onboardingSteps = [
  {
    title: "Welcome to Products/Services Application",
    content:
      "This application will help us understand your product and service needs so we can match you with the right providers.",
    icon: "🛍️",
  },
  {
    title: "Step 1: Request Overview",
    content: "Start by providing basic information about what you're looking for and your budget requirements.",
    icon: "📝",
  },
  {
    title: "Step 2: Products & Services",
    content: "Specify the categories and details of the products or services you need.",
    icon: "📦",
  },
  {
    title: "Step 3: Submit & Match",
    content: "Complete your preferences and contact information to help us find the best match for your needs.",
    icon: "✅",
  },
]

const ProductApplication = () => {
  const { section: urlSection } = useParams()
  const navigate = useNavigate()

  // State to track if application is submitted
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  // New state for popups
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [showCongratulationsPopup, setShowCongratulationsPopup] = useState(false)
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0)
  const [forceShowPopup, setForceShowPopup] = useState(false)

  // Initialize active section from URL
  const [activeSection, setActiveSection] = useState(() => {
    return sections.find((s) => s.path === urlSection)?.id || sections[0].id
  })

  // Helper function to get user-specific localStorage key
  const getUserSpecificKey = (baseKey) => {
    const userId = auth.currentUser?.uid
    return userId ? `${baseKey}_${userId}` : baseKey
  }

  // Track completed sections
  const [completedSections, setCompletedSections] = useState(() => {
    const userId = auth.currentUser?.uid
    const key = userId ? `productApplicationCompletedSections_${userId}` : "productApplicationCompletedSections"
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : Object.fromEntries(sections.map((s) => [s.id, false]))
  })

  // Form data state
  const [formData, setFormData] = useState(() => {
    const userId = auth.currentUser?.uid
    const key = userId ? `productApplicationData_${userId}` : "productApplicationData"
    const saved = localStorage.getItem(key)
    const parsedData = saved ? JSON.parse(saved) : {}

    // Ensure all sections have default values
    return {
      requestOverview: {
        purpose: "",
        engagementType: "",
        deliveryModes: [],
        startDate: "",
        endDate: "",
        location: "",
        minBudget: "",
        maxBudget: "",
        esdProgram: null,
        ...(parsedData.requestOverview || {}),
      },
      productsServices: {
        categories: [],
        keywords: "",
        scopeOfWorkFiles: [],
        ...(parsedData.productsServices || {}),
      },
      matchingPreferences: {
        bbeeLevel: "",
        ownershipPrefs: [],
        sectorExperience: "",
        ...(parsedData.matchingPreferences || {}),
      },
      contactSubmission: {
        contactName: "",
        contactRole: "",
        businessName: "",
        email: "",
        phone: "",
        responseMethod: "",
        declaration: false,
        ...(parsedData.contactSubmission || {}),
      },
    }
  })

  // Load submission status and check for first-time visit
  useEffect(() => {
    const userId = auth.currentUser?.uid
    if (!userId) return

    const savedSubmissionStatus = localStorage.getItem(getUserSpecificKey("applicationSubmitted"))
    const hasSeenProductWelcomePopup = localStorage.getItem(getUserSpecificKey("hasSeenProductWelcomePopup")) === "true"

    // For new users, always show the welcome popup first
    if (!hasSeenProductWelcomePopup) {
      setShowWelcomePopup(true)
      // Don't set the localStorage flag yet - we'll set it when they close the popup

      // Important: Don't show summary for new users until they've seen the popup
      setShowSummary(false)
    } else if (savedSubmissionStatus === "true" && !forceShowPopup) {
      // Only show summary for returning users who have already seen the popup
      setApplicationSubmitted(true)
      setShowSummary(true)
    }
  }, [forceShowPopup])

  // Save to localStorage whenever data changes
  useEffect(() => {
    const userId = auth.currentUser?.uid
    if (!userId) return

    localStorage.setItem(getUserSpecificKey("productApplicationData"), JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    const userId = auth.currentUser?.uid
    if (!userId) return

    localStorage.setItem(getUserSpecificKey("productApplicationCompletedSections"), JSON.stringify(completedSections))
  }, [completedSections])

  useEffect(() => {
    const userId = auth.currentUser?.uid
    if (!userId) return

    localStorage.setItem(getUserSpecificKey("applicationSubmitted"), applicationSubmitted.toString())
  }, [applicationSubmitted])

  // Update URL when active section changes
  useEffect(() => {
    const section = sections.find((s) => s.id === activeSection)
    if (section && !showSummary) {
      navigate(`/applications/product/${section.path}`, { replace: true })
    }
  }, [activeSection, navigate, showSummary])

  // Navigation handler
  const goToSection = (sectionId) => {
    const section = sections.find((s) => s.id === sectionId)
    if (section) {
      setActiveSection(section.id)
      window.scrollTo(0, 0)
    }
  }

  // Handle editing the application after submission
  const handleEditApplication = () => {
    // When editing from summary, force the welcome popup to show if it's a new user
    const hasSeenProductWelcomePopup = localStorage.getItem(getUserSpecificKey("hasSeenProductWelcomePopup")) === "true"
    if (!hasSeenProductWelcomePopup) {
      setForceShowPopup(true)
    }

    setShowSummary(false)
    setActiveSection(sections[0].id)
    window.scrollTo(0, 0)
  }

  // Popup handlers
  const handleNextOnboardingStep = () => {
    if (currentOnboardingStep < onboardingSteps.length - 1) {
      setCurrentOnboardingStep(currentOnboardingStep + 1)
    } else {
      handleCloseWelcomePopup()
    }
  }

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false)
    setForceShowPopup(false)

    // Now that they've seen the popup, set the flag
    localStorage.setItem(getUserSpecificKey("hasSeenProductWelcomePopup"), "true")

    // If the application was already submitted, show the summary after closing the popup
    if (applicationSubmitted) {
      setShowSummary(true)
    }
  }

  const handleCloseCongratulationsPopup = () => {
    setShowCongratulationsPopup(false)
    setShowSummary(true) // Show the summary after closing the congratulations popup
  }

  const handleNavigateToDashboard = () => {
    navigate("/dashboard")
  }

  const handleViewMatches = () => {
    navigate("/funding-matches")
  }

  // Data handling functions
  const updateFormData = (section, newData) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...newData,
      },
    }))
  }

  // Save current section
  const saveCurrentSection = () => {
    const userId = auth.currentUser?.uid
    if (!userId) return

    localStorage.setItem(getUserSpecificKey("productApplicationData"), JSON.stringify(formData))
    setCompletedSections((prev) => ({ ...prev, [activeSection]: true }))
    alert("Section saved successfully!")
  }

  // Navigate to next section
  const goToNextSection = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection)
    if (currentIndex < sections.length - 1) {
      setCompletedSections((prev) => ({ ...prev, [activeSection]: true }))
      goToSection(sections[currentIndex + 1].id)
    }
  }

  // Navigate to previous section
  const goToPreviousSection = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection)
    if (currentIndex > 0) {
      goToSection(sections[currentIndex - 1].id)
    }
  }

  const uploadFilesAndReplaceWithURLs = async (data, section) => {
    const uploadRecursive = async (item, pathPrefix) => {
      if (item instanceof File) {
        const fileRef = ref(storage, `productApplication/${auth.currentUser?.uid}/${pathPrefix}`)
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
      const userId = auth.currentUser?.uid
      if (!userId) throw new Error("User not logged in.")

      const docRef = doc(db, "productApplications", userId)
      const sectionData = section ? formData[section] : formData

      const uploaded = section
        ? { [section]: await uploadFilesAndReplaceWithURLs(sectionData, section) }
        : await uploadFilesAndReplaceWithURLs(formData, "full")

      await setDoc(docRef, uploaded, { merge: true })
    } catch (err) {
      console.error("Error saving to Firebase:", err)
      alert("Failed to save to Firebase.")
    }
  }

  const handleSaveSection = async () => {
    await saveDataToFirebase(activeSection)
    setCompletedSections((prev) => ({ ...prev, [activeSection]: true }))
    alert("Section saved successfully!")
  }

  const handleSaveAndContinue = async () => {
    await saveDataToFirebase(activeSection)
    goToNextSection()
  }

  // Submit the application
  const submitApplication = async () => {
    try {
      // Mark the current section as completed
      setCompletedSections((prev) => ({ ...prev, [activeSection]: true }))

      // Set application as submitted
      setApplicationSubmitted(true)

      // Show congratulations popup only if user hasn't seen it before
      const hasSeenProductCongratulationsPopup =
        localStorage.getItem(getUserSpecificKey("hasSeenProductCongratulationsPopup")) === "true"
      if (!hasSeenProductCongratulationsPopup) {
        setShowCongratulationsPopup(true)
        localStorage.setItem(getUserSpecificKey("hasSeenProductCongratulationsPopup"), "true")
      } else {
        setShowSummary(true) // Show the summary immediately if they've seen the popup before
      }

      // Scroll to top for better user experience
      window.scrollTo(0, 0)

      // Then try to save to Firebase (but don't block showing the summary)
      try {
        await saveDataToFirebase() // Save entire form to Firebase
      } catch (firebaseErr) {
        console.error("Failed to save to Firebase:", firebaseErr)
        alert("Application submitted, but there was an issue saving to the database. Your data is saved locally.")
      }
    } catch (err) {
      console.error("Failed to submit application:", err)
      alert("Failed to submit application.")
    }
  }

  // Render current section
  const renderActiveSection = () => {
    // Ensure the section data exists with defaults
    const sectionData = formData[activeSection] || {}

    const sectionProps = {
      data: sectionData,
      updateData: (newData) => updateFormData(activeSection, newData),
    }

    switch (activeSection) {
      case "requestOverview":
        return <RequestOverview {...sectionProps} />
      case "productsServices":
        return <ProductsServices {...sectionProps} />
      case "matchingPreferences":
        return <MatchingPreferences {...sectionProps} />
      case "contactSubmission":
        return <ContactSubmission {...sectionProps} />
      default:
        return <RequestOverview {...sectionProps} />
    }
  }

  const isLastSection = activeSection === sections[sections.length - 1].id
  const isFirstSection = activeSection === sections[0].id

  // Add this before the conditional rendering
  console.log("Render state:", { showSummary, applicationSubmitted, showWelcomePopup, forceShowPopup })

  // If application is submitted and we're showing the summary
  // But make sure we're not showing the welcome popup first for new users
  if (showSummary && !showWelcomePopup) {
    return <ApplicationSummary data={formData} onEdit={handleEditApplication} />
  }

  return (
    <div className="product-application-container">
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
              <p>You've successfully completed your Products/Services Application!</p>
              <p>
                Your application has been submitted and our team will start matching you with suitable providers. You
                can view your application summary, go to your dashboard, or view your matches right away!
              </p>
              <div className="popup-buttons-group">
                <button className="btn btn-secondary" onClick={handleCloseCongratulationsPopup}>
                  View Summary
                </button>
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

      <h1>Products/Services Application</h1>

      {/* Progress Tracker */}
      <div className="profile-tracker">
        <div className="profile-tracker-inner">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => goToSection(section.id)}
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

      {/* Form Content */}
      <div className="content-card">
        {renderActiveSection()}

        {/* Navigation Buttons */}
        <div className="action-buttons">
          {!isFirstSection && (
            <button type="button" onClick={goToPreviousSection} className="btn btn-secondary">
              <ChevronLeft size={16} /> Previous
            </button>
          )}

          <button type="button" onClick={handleSaveSection} className="btn btn-secondary">
            <Save size={16} /> Save
          </button>

          {!isLastSection ? (
            <button type="button" onClick={handleSaveAndContinue} className="btn btn-primary">
              Save & Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submitApplication}
              className="btn btn-primary"
              disabled={!formData.contactSubmission?.declaration}
            >
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductApplication
