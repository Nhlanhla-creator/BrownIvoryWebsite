"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import styles from "./SupportUniversalProfile.module.css";


const sections = [
  { id: "instructions", label: "Instructions" },
  { id: "entityOverview", label: "Entity Overview" },
  { id: "ownershipManagement", label: "Ownership & Management" },
  { id: "contactDetails", label: "Contact Details" },
  { id: "legalCompliance", label: "Legal & Compliance" },
  { id: "productsServices", label: "Products, Services & Offerings" },
  { id: "howDidYouHear", label: "How Did you hear About Us?" },
  { id: "declarationConsent", label: "Declaration & Consent" },
]

export default function ProfileTracker({ activeSection, setActiveSection }) {
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

  return (
    <div className={`${styles.trackerContainer} w-full overflow-x-auto`}>
      <div className={`${styles.trackerInner} flex min-w-max space-x-2`}>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`${styles.trackerButton} relative flex items-center justify-center px-4 py-3 rounded-md transition-all ${
              activeSection === section.id
                ? `${styles.activeSection} bg-brown-700 text-white shadow-lg`
                : completedSections[section.id]
                  ? `${styles.completedSection} bg-brown-100 text-brown-800 border border-brown-300`
                  : `${styles.pendingSection} bg-brown-600 text-white opacity-80 hover:opacity-100`
            }`}
          >
            <span className={`${styles.sectionLabel} text-sm font-medium whitespace-nowrap`}>{section.label}</span>
            {completedSections[section.id] && (
              <CheckCircle className={`${styles.checkIcon} w-4 h-4 ml-2 text-green-500`} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
