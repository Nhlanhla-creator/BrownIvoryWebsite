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
  }, [])

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

  // Load saved data and submission status from localStorage
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser
      if (!user) return

      // Load from localStorage first
      const savedData = localStorage.getItem("investorProfileData")
      const savedCompletedSections = localStorage.getItem("investorProfileCompletedSections")
      const savedSubmissionStatus = localStorage.getItem("profileSubmitted")

      if (savedData) setFormData(JSON.parse(savedData))
      if (savedCompletedSections) setCompletedSections(JSON.parse(savedCompletedSections))
      if (savedSubmissionStatus === "true") {
        setProfileSubmitted(true)
        setShowSummary(true)
      }

      // Then try to fetch from Firebase
      try {
        const docRef = doc(db, "MyuniversalProfiles", user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          setFormData((prev) => ({
            ...prev,
            ...data.formData,
          }))
          setCompletedSections((prev) => ({
            ...prev,
            ...data.completedSections,
          }))

          // If profile is marked as submitted in Firebase, show summary
          if (data.profileSubmitted) {
            setProfileSubmitted(true)
            setShowSummary(true)
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error)
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
    localStorage.setItem("profileSubmitted", profileSubmitted.toString())
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

  const saveDataToFirebase = async (section = null) => {
    try {
      const userId = auth.currentUser?.uid
      if (!userId) throw new Error("User not logged in.")

      const docRef = doc(db, "MyuniversalProfiles", userId)
      const sectionData = section ? formData[section] : formData

      const uploaded = section
        ? { [section]: await uploadFilesAndReplaceWithURLs(sectionData, section) }
        : await uploadFilesAndReplaceWithURLs(formData, "full")

      await setDoc(
        docRef,
        {
          formData: uploaded,
          completedSections,
          profileSubmitted,
        },
        { merge: true },
      )
    } catch (err) {
      console.error("Error saving to Firebase:", err)
      alert("Failed to save to Firebase.")
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
    try {
      // Mark the current section as completed
      markSectionAsCompleted("declarationConsent")

      // Set profile as submitted and show summary immediately
      setProfileSubmitted(true)
      setShowSummary(true)

      // Scroll to top for better user experience
      window.scrollTo(0, 0)

      // Then try to save to Firebase (but don't block showing the summary)
      try {
        await saveDataToFirebase() // Save entire form to Firebase
        alert("Profile submitted successfully!")
      } catch (firebaseErr) {
        console.error("Failed to save to Firebase:", firebaseErr)
        alert("Profile submitted, but there was an issue saving to the database. Your data is saved locally.")
      }
    } catch (err) {
      console.error("Failed to submit profile:", err)
      alert("Failed to submit profile.")
    }
  }

  // If profile is submitted and we're showing the summary
  if (showSummary) {
    return <InvestorProfileSummary data={profileData.formData || formData} onEdit={handleEditProfile} />
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
