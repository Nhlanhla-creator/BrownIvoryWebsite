"use client"

import { useState, useEffect } from "react"
import { CheckCircle, ChevronRight, ChevronLeft, Save } from "lucide-react"
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

export default function UniversalProfile() {
  const [activeSection, setActiveSection] = useState("instructions")
  const [profileSubmitted, setProfileSubmitted] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [profileData, setProfileData] = useState(null)

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
      if (!user) return

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
      
      // Then show the summary
      setShowSummary(true)
      
      // Scroll to top for better user experience
      window.scrollTo(0, 0)
      
      alert("Profile submitted successfully!")
    } catch (err) {
      console.error("Failed to submit profile:", err)
      alert("Failed to submit profile. Please try again.")
      
      // Revert the submission status if Firebase save failed
      setProfileSubmitted(false)
    }
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
  if (showSummary) {
    return <InvestorProfileSummary data={formData} onEdit={handleEditProfile} />
  }

  return (
    <div className="universal-profile-container">
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