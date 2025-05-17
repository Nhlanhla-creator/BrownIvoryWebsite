"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Edit } from "lucide-react"
import "./ProductApplication.css"

const ApplicationSummary = ({ data, onEdit }) => {
  const [expandedSections, setExpandedSections] = useState({
    requestOverview: true,
    productsServices: false,
    matchingPreferences: false,
    contactSubmission: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Helper function to format file names from arrays
  const formatFiles = (files) => {
    if (!files || !files.length) return "None"
    return files.map((file) => (typeof file === "string" ? file : file.name)).join(", ")
  }

  // Helper function to format arrays
  const formatArray = (arr) => {
    if (!arr || !arr.length) return "None"
    return arr.join(", ")
  }

  // Helper function to format boolean values
  const formatBoolean = (value) => (value ? "Yes" : "No")

  // Helper function to format currency
  const formatCurrency = (value) => {
    if (!value) return "0"
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="application-summary">
      <div className="summary-header">
        <h1>Application Summary</h1>
        <button className="btn btn-primary" onClick={onEdit}>
          <Edit size={16} /> Edit Application
        </button>
      </div>

      {/* Request Overview Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("requestOverview")}>
          <h2>Request Overview</h2>
          {expandedSections.requestOverview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.requestOverview && (
          <div className="summary-content">
            <div className="summary-item">
              <span className="summary-label">Purpose of Request:</span>
              <span className="summary-value">{data.requestOverview?.purpose || "Not provided"}</span>
            </div>

            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Type of Engagement:</span>
                <span className="summary-value">{data.requestOverview?.engagementType || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Preferred Delivery Mode:</span>
                <span className="summary-value">{formatArray(data.requestOverview?.deliveryModes)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Start Date:</span>
                <span className="summary-value">{data.requestOverview?.startDate || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">End Date:</span>
                <span className="summary-value">{data.requestOverview?.endDate || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Location:</span>
                <span className="summary-value">{data.requestOverview?.location || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Budget Range:</span>
                <span className="summary-value">
                  {formatCurrency(data.requestOverview?.minBudget)} to {formatCurrency(data.requestOverview?.maxBudget)}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Linked to ESD/CSR Program:</span>
                <span className="summary-value">
                  {data.requestOverview?.esdProgram === null
                    ? "Not specified"
                    : formatBoolean(data.requestOverview?.esdProgram)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products & Services Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("productsServices")}>
          <h2>Required Products or Services</h2>
          {expandedSections.productsServices ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.productsServices && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Product/Service Categories:</span>
                <span className="summary-value">{formatArray(data.productsServices?.categories)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Keywords / Specific Needs:</span>
                <span className="summary-value">{data.productsServices?.keywords || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Scope of Work Files:</span>
                <span className="summary-value">{formatFiles(data.productsServices?.scopeOfWorkFiles)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Matching Preferences Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("matchingPreferences")}>
          <h2>Matching Preferences</h2>
          {expandedSections.matchingPreferences ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.matchingPreferences && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Preferred B-BBEE Level:</span>
                <span className="summary-value">{data.matchingPreferences?.bbeeLevel || "Not specified"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Ownership Preferences:</span>
                <span className="summary-value">{formatArray(data.matchingPreferences?.ownershipPrefs)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Sector Experience Required:</span>
                <span className="summary-value">{data.matchingPreferences?.sectorExperience || "Not specified"}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact & Submission Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("contactSubmission")}>
          <h2>Contact & Submission</h2>
          {expandedSections.contactSubmission ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.contactSubmission && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Contact Person Name:</span>
                <span className="summary-value">{data.contactSubmission?.contactName || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Role:</span>
                <span className="summary-value">{data.contactSubmission?.contactRole || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Business Name:</span>
                <span className="summary-value">{data.contactSubmission?.businessName || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Email:</span>
                <span className="summary-value">{data.contactSubmission?.email || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Phone Number:</span>
                <span className="summary-value">{data.contactSubmission?.phone || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Preferred Response Method:</span>
                <span className="summary-value">{data.contactSubmission?.responseMethod || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Declaration:</span>
                <span className="summary-value">{formatBoolean(data.contactSubmission?.declaration)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationSummary
