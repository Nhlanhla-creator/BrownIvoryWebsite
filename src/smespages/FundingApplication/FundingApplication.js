"use client";

import { useState, useEffect } from "react";
import "./FundingApplication.css";
import { CheckCircle, ChevronRight, ChevronLeft, Save } from "lucide-react";
import { sections } from "./sections";
import { renderApplicationOverview } from "./ApplicationOverview";
import { renderUseOfFunds } from "./UseOfFunds";
import { renderEnterpriseReadiness } from "./EnterpriseReadiness";
import { renderFinancialOverview } from "./FinancialOverview";
import { renderGrowthPotential } from "./GrowthPotential";
import { renderSocialImpact } from "./SocialImpact";
import { renderDeclarationCommitment } from "./DeclarationCommitment";
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

export default function FundingApplication() {
  const [activeSection, setActiveSection] = useState("applicationOverview");
  
  const [completedSections, setCompletedSections] = useState({
    applicationOverview: false,
    useOfFunds: false,
    enterpriseReadiness: false,
    financialOverview: false,
    growthPotential: false,
    socialImpact: false,
    declarationCommitment: false,
  });

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
  });

  useEffect(() => {
    const savedData = localStorage.getItem("fundingApplicationData");
    const savedCompletedSections = localStorage.getItem("fundingApplicationCompletedSections");

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    if (savedCompletedSections) {
      setCompletedSections(JSON.parse(savedCompletedSections));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fundingApplicationData", JSON.stringify(formData));
    localStorage.setItem("fundingApplicationCompletedSections", JSON.stringify(completedSections));
  }, [formData, completedSections]);

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const markSectionAsCompleted = (section) => {
    setCompletedSections((prev) => ({
      ...prev,
      [section]: true,
    }));
  };

  const navigateToNextSection = () => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const navigateToPreviousSection = () => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
      window.scrollTo(0, 0);
    }
  };



  const handleSubmitApplication = () => {
    markSectionAsCompleted("declarationCommitment");
    alert("Application submitted successfully!");
    console.log("Submitted application data:", formData);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "applicationOverview":
        return renderApplicationOverview(formData.applicationOverview, updateFormData);
      case "useOfFunds":
        return renderUseOfFunds(formData.useOfFunds, updateFormData);
      case "enterpriseReadiness":
        return renderEnterpriseReadiness(formData.enterpriseReadiness, updateFormData);
      case "financialOverview":
        return renderFinancialOverview(formData.financialOverview, updateFormData);
      case "growthPotential":
        return renderGrowthPotential(formData.growthPotential, updateFormData);
      case "socialImpact":
        return renderSocialImpact(formData.socialImpact, updateFormData);
      case "declarationCommitment":
        return renderDeclarationCommitment(formData.declarationCommitment, updateFormData);
      default:
        return renderApplicationOverview(formData.applicationOverview, updateFormData);
    }
  };

  
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
    alert("Section saved to Firebase!");
  };

  const handleSaveAndContinue = async () => {
    markSectionAsCompleted(activeSection);
    await saveDataToFirebase(activeSection);
    navigateToNextSection();
  };

  const handleSubmitProfile = async () => {

    await saveDataToFirebase(); // save full form
    alert("Profile submitted successfully!");
    console.log("Submitted:", formData);
  };


  return (
    <div className="funding-application-container">
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
  );
}