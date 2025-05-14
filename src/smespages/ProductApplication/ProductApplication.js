"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CheckCircle, ChevronRight, ChevronLeft, Save } from "lucide-react"
import { sections } from "./applicationOptions"
import RequestOverview from "./RequestOverview"
import ProductsServices from "./ProductsServices"
import MatchingPreferences from "./MatchingPreferences"
import ContactSubmission from "./ContactSubmission"
import "./ProductApplication.css"
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { auth, db, storage } from "../../firebaseConfig";

const ProductApplication = () => {
  const { section: urlSection } = useParams()
  const navigate = useNavigate()

  // Initialize active section from URL
  const [activeSection, setActiveSection] = useState(() => {
    return sections.find((s) => s.path === urlSection)?.id || sections[0].id
  })

  // Track completed sections
  const [completedSections, setCompletedSections] = useState(() => {
    const saved = localStorage.getItem("productApplicationCompletedSections")
    return saved ? JSON.parse(saved) : Object.fromEntries(sections.map((s) => [s.id, false]))
  })

  // Form data state
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("productApplicationData")
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

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("productApplicationData", JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    localStorage.setItem("productApplicationCompletedSections", JSON.stringify(completedSections))
  }, [completedSections])

  // Update URL when active section changes
  useEffect(() => {
    const section = sections.find((s) => s.id === activeSection)
    if (section) {
      navigate(`/applications/product/${section.path}`, { replace: true })
    }
  }, [activeSection, navigate])

  // Navigation handler
  const goToSection = (sectionId) => {
    const section = sections.find((s) => s.id === sectionId)
    if (section) {
      setActiveSection(section.id)
      window.scrollTo(0, 0)
    }
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
    localStorage.setItem("productApplicationData", JSON.stringify(formData))
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

  // Submit the application
const submitApplication = async () => {
  try {
    await saveDataToFirebase(); // Save entire form to Firebase
    setCompletedSections((prev) => ({ ...prev, [activeSection]: true }));
    alert("Application submitted successfully!");
  } catch (err) {
    console.error("Failed to submit application:", err);
    alert("Failed to submit application.");
  }
};


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


  
    
    const uploadFilesAndReplaceWithURLs = async (data, section) => {
      const uploadRecursive = async (item, pathPrefix) => {
        if (item instanceof File) {
          const fileRef = ref(storage, `universalProfile/${auth.currentUser?.uid}/${pathPrefix}`);
          await uploadBytes(fileRef, item);
          return await getDownloadURL(fileRef);
        } else if (Array.isArray(item)) {
          return await Promise.all(
            item.map((entry, idx) => uploadRecursive(entry, `${pathPrefix}/${idx}`))
          );
        } else if (typeof item === "object" && item !== null) {
          const updated = {};
          for (const key in item) {
            updated[key] = await uploadRecursive(item[key], `${pathPrefix}/${key}`);
          }
          return updated;
        } else {
          return item;
        }
      };
  
      return await uploadRecursive(data, section);
    };
  
    const saveDataToFirebase = async (section = null) => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) throw new Error("User not logged in.");
  
        const docRef = doc(db, "universalProfiles", userId);
        let sectionData = section ? formData[section] : formData;
  
        const uploaded = section
          ? { [section]: await uploadFilesAndReplaceWithURLs(sectionData, section) }
          : await uploadFilesAndReplaceWithURLs(formData, "full");
  
        await setDoc(docRef, uploaded, { merge: true });
      } catch (err) {
        console.error("Error saving to Firebase:", err);
        alert("Failed to save to Firebase.");
      }
    };
  
    const handleSaveSection = async () => {

      await saveDataToFirebase(activeSection);
       setCompletedSections((prev) => ({ ...prev, [activeSection]: true }))
    alert("Section saved successfully!")
    };
  
    const handleSaveAndContinue = async () => {
    
      await saveDataToFirebase(activeSection);
     goToNextSection();
    };
  

  return (
    <div className="product-application-container">
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
            <button type="button" onClick={goToNextSection} className="btn btn-primary">
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
