"use client";

import { useState, useEffect } from "react";
import { CheckCircle, ChevronRight, ChevronLeft, Save } from "lucide-react";
import "./UniversalProfile.css";
import Instructions from "./instructions";
import EntityOverview from "./entity-overview";
import OwnershipManagement from "./ownership-management";
import ContactDetails from "./contact-details";
import LegalCompliance from "./legal-compliance";
import ProductsServices from "./products-services";
import HowDidYouHear from "./how-did-you-hear";
import DeclarationConsent from "./declaration-consent";

const sections = [
  { id: "instructions", label: "Instructions" },
  { id: "entityOverview", label: "Entity\nOverview" },
  { id: "ownershipManagement", label: "Ownership &\nManagement" },
  { id: "contactDetails", label: "Contact\nDetails" },
  { id: "legalCompliance", label: "Legal &\nCompliance" },
  { id: "productsServices", label: "Products &\nServices" },
  { id: "howDidYouHear", label: "How Did\nYou Hear" },
  { id: "declarationConsent", label: "Declaration &\nConsent" },
];

export default function UniversalProfile() {
  const [activeSection, setActiveSection] = useState("instructions");
  const [completedSections, setCompletedSections] = useState({
    instructions: true,
    entityOverview: false,
    ownershipManagement: false,
    contactDetails: false,
    legalCompliance: false,
    productsServices: false,
    howDidYouHear: false,
    declarationConsent: false,
  });

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
  });

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("universalProfileData");
    const savedCompletedSections = localStorage.getItem("universalProfileCompletedSections");

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    if (savedCompletedSections) {
      setCompletedSections(JSON.parse(savedCompletedSections));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("universalProfileData", JSON.stringify(formData));
    localStorage.setItem("universalProfileCompletedSections", JSON.stringify(completedSections));
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

  const handleSaveSection = () => {
    localStorage.setItem("universalProfileData", JSON.stringify(formData));
    alert("Section saved successfully!");
  };

  const handleSaveAndContinue = () => {
    markSectionAsCompleted(activeSection);
    localStorage.setItem("universalProfileData", JSON.stringify(formData));
    navigateToNextSection();
  };

  const handleSubmitProfile = () => {
    markSectionAsCompleted("declarationConsent");
    alert("Profile submitted successfully!");
    console.log("Submitted profile data:", formData);
  };

  const renderActiveSection = () => {
    const sectionData = formData[activeSection] || {};
    const commonProps = {
      data: sectionData,
      updateData: (data) => updateFormData(activeSection, data),
    };

    switch (activeSection) {
      case "instructions":
        return <Instructions />;
      case "entityOverview":
        return <EntityOverview {...commonProps} />;
      case "ownershipManagement":
        return <OwnershipManagement {...commonProps} />;
      case "contactDetails":
        return <ContactDetails {...commonProps} />;
      case "legalCompliance":
        return <LegalCompliance {...commonProps} />;
      case "productsServices":
        return <ProductsServices {...commonProps} />;
      case "howDidYouHear":
        return <HowDidYouHear {...commonProps} />;
      case "declarationConsent":
        return <DeclarationConsent {...commonProps} />;
      default:
        return <Instructions />;
    }
  };

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
    </div>
  );
}