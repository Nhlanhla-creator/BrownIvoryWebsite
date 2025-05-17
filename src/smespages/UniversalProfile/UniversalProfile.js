"use client"
import {  getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, ChevronRight, ChevronLeft, Save } from "lucide-react"
import { doc, setDoc } from "firebase/firestore"
import { uploadBytes } from "firebase/storage"
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
import RegistrationSummary from "./registration-summary"

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
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("instructions")
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
  const [showSummary, setShowSummary] = useState(false)
const [profileData, setProfileData] = useState(null);
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

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("universalProfileData")
    const savedCompletedSections = localStorage.getItem("universalProfileCompletedSections")

    if (savedData) setFormData(JSON.parse(savedData))
    if (savedCompletedSections) setCompletedSections(JSON.parse(savedCompletedSections))
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("universalProfileData", JSON.stringify(formData))
    localStorage.setItem("universalProfileCompletedSections", JSON.stringify(completedSections))
  }, [formData, completedSections])

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
   
    // await saveDataToFirebase() // save full form
     markSectionAsCompleted("declarationConsent")
    setShowSummary(true) // Show the summary after submission
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
        setLoading(true);
        const userId = auth.currentUser?.uid;
        
        if (!userId) {
          throw new Error("User not logged in");
        }

        const docRef = doc(db, "universalProfiles", userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          setError("No profile found. Please complete your Universal Profile first.");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="universal-profile-container">
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

      {/* Registration Summary Modal */}
      <RegistrationSummary
        data={profileData || formData}
        open={showSummary}
        onClose={() => setShowSummary(false)}
        onComplete={handleRegistrationComplete}
      />
    </div>
  )
}
