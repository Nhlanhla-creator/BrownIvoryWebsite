import { useState } from "react"
import { CheckCircle, ChevronRight } from "lucide-react"
import "./Dashboard.css"

export function ApplicationTracker({ styles }) {
  const [trackerSteps, setTrackerSteps] = useState([
    { label: "Universal Business\nProfile", description: "", completed: true, showDetails: false },
    { label: "Compliance &\nLegitimacy Check", description: "", completed: true, showDetails: false },
    { label: "Market Visibility\nand Matching", description: "", completed: true, showDetails: false },
    { label: "Funding &\nFundability Check", description: "", active: true, showDetails: false },
    { label: "Life-Cycle Adjusted\nScoring", description: "", completed: false, showDetails: false },
    { label: "Growth\nRecommendations", description: "", completed: false, showDetails: false },
  ])

  const expectedActions = {
    "Universal Business\nProfile": "Complete your business profile with all required information.",
    "Compliance &\nLegitimacy Check": "Ensure all compliance documents are up to date and submitted.",
    "Market Visibility\nand Matching": "Improve your market visibility and find potential matches.",
    "Funding &\nFundability Check": "Prepare your funding documents and improve fundability score.",
    "Life-Cycle Adjusted\nScoring": "Review your business lifecycle and adjust strategies accordingly.",
    "Growth\nRecommendations": "Implement growth strategies based on recommendations.",
  }

  const toggleStepDetails = (index) => {
    const newSteps = [...trackerSteps]
    newSteps.forEach((step, i) => {
      if (i !== index) step.showDetails = false
    })
    newSteps[index].showDetails = !newSteps[index].showDetails
    setTrackerSteps(newSteps)
  }

  return (
    <div className="tracker-card mb-6 rounded-lg border border-[#8D6E63] bg-white p-4 shadow-sm">
      <div className="tracker-header mb-4">
        <h3 className="card-title text-lg font-medium text-[#5D4037]">Application Tracker</h3>
      </div>
      <div className="tracker-content">
        <div className="tracker-steps flex flex-wrap items-center justify-between gap-2 md:flex-nowrap">
          {trackerSteps.map((step, index) => (
            <div
              key={index}
              className={`tracker-step flex items-center ${step.completed ? "completed" : step.active ? "active" : ""}`}
              data-tooltip={`${expectedActions[step.label]}`}
              onClick={() => toggleStepDetails(index)}
            >
              <div className="step-marker mr-2">
                {step.completed ? (
                  <CheckCircle size={16} color={styles.primaryBrown} />
                ) : step.active ? (
                  <div className="active-dot h-4 w-4 rounded-full" style={{ backgroundColor: styles.accentBrown }}></div>
                ) : (
                  <div className="inactive-dot h-4 w-4 rounded-full" style={{ backgroundColor: styles.paleBrown }}></div>
                )}
              </div>
              <div className="step-info">
                <span className="step-label text-xs font-medium text-[#5D4037]">
                  {step.label.split("\n").map((line, i) => (
                    <span key={i} className="step-label-line">
                      {line}
                      {i === 0 && <br />}
                    </span>
                  ))}
                </span>
                {step.description && <span className="step-description text-xs">{step.description}</span>}
              </div>
              {index < trackerSteps.length - 1 && (
                <ChevronRight size={16} className="step-arrow mx-1" color={styles.lightBrown} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
