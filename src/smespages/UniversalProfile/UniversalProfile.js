"use client"

import { useState, useEffect } from "react"
import "./UniversalProfile.css"
import { CheckCircle, Info, Upload, X, FileText, Plus, Trash2, ChevronRight, ChevronLeft, Save } from "lucide-react"

// Form data options
const entityTypes = [
  { value: "ptyLtd", label: "Pty Ltd" },
  { value: "cc", label: "CC" },
  { value: "ngo", label: "NGO" },
  { value: "coop", label: "Co-op" },
  { value: "sole", label: "Sole Proprietor" },
  { value: "other", label: "Other" },
]

const entitySizes = [
  { value: "micro", label: "Micro (< R1M annual turnover)" },
  { value: "small", label: "Small (R1M - R10M annual turnover)" },
  { value: "medium", label: "Medium (R10M - R50M annual turnover)" },
  { value: "large", label: "Large (> R50M annual turnover)" },
]

const operationStages = [
  { value: "ideation", label: "Ideation" },
  { value: "startup", label: "Startup" },
  { value: "growth", label: "Growth" },
  { value: "mature", label: "Mature" },
  { value: "turnaround", label: "Turnaround" },
]

const economicSectors = [
  { value: "agriculture", label: "Agriculture" },
  { value: "mining", label: "Mining" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "energy", label: "Energy" },
  { value: "construction", label: "Construction" },
  { value: "retail", label: "Retail & Wholesale" },
  { value: "transport", label: "Transport & Logistics" },
  { value: "finance", label: "Finance & Insurance" },
  { value: "realestate", label: "Real Estate" },
  { value: "ict", label: "ICT" },
  { value: "tourism", label: "Tourism & Hospitality" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health & Social Services" },
  { value: "arts", label: "Arts & Entertainment" },
  { value: "other", label: "Other Services" },
]

const raceOptions = [
  { value: "black", label: "Black African" },
  { value: "coloured", label: "Coloured" },
  { value: "indian", label: "Indian/Asian" },
  { value: "white", label: "White" },
  { value: "other", label: "Other" },
]

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not", label: "Prefer not to say" },
]

const countryOptions = [
  { value: "za", label: "South Africa" },
  { value: "na", label: "Namibia" },
  { value: "bw", label: "Botswana" },
  { value: "zw", label: "Zimbabwe" },
  { value: "mz", label: "Mozambique" },
  { value: "other", label: "Other" },
]

const bbbeeOptions = [
  { value: "1", label: "Level 1" },
  { value: "2", label: "Level 2" },
  { value: "3", label: "Level 3" },
  { value: "4", label: "Level 4" },
  { value: "5", label: "Level 5" },
  { value: "6", label: "Level 6" },
  { value: "7", label: "Level 7" },
  { value: "8", label: "Level 8" },
  { value: "exempt", label: "Exempt" },
  { value: "none", label: "None" },
]

const cipcStatusOptions = [
  { value: "current", label: "Current" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
  { value: "na", label: "Not Applicable" },
]

const sourceOptions = [
  { value: "referral", label: "Referral" },
  { value: "online_ad", label: "Online Advertisement" },
  { value: "partner_org", label: "Partner Organization" },
  { value: "event", label: "Event" },
  { value: "social_media", label: "Social Media" },
  { value: "search_engine", label: "Search Engine" },
  { value: "other", label: "Other" },
]

// Form Field Component
const FormField = ({ label, children, required = false, tooltip = null, className = "" }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className={`form-field ${className}`}>
      <div className="form-field-label">
        <label>
          {label} {required && <span className="required">*</span>}
        </label>
        {tooltip && (
          <div className="form-field-tooltip">
            <Info
              className="tooltip-icon"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && <div className="tooltip-content">{tooltip}</div>}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

// File Upload Component
const FileUpload = ({
  label,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  multiple = false,
  required = false,
  onChange,
  value = [],
}) => {
  const [files, setFiles] = useState(value)
  const [isDragging, setIsDragging] = useState(false)
  const inputId = `file-upload-${label.replace(/\s+/g, "-").toLowerCase()}`

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || [])
    const newFiles = [...files, ...selectedFiles]
    setFiles(newFiles)
    if (onChange) onChange(newFiles)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    const newFiles = [...files, ...droppedFiles]
    setFiles(newFiles)
    if (onChange) onChange(newFiles)
  }

  const removeFile = (index) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    if (onChange) onChange(newFiles)
  }

  return (
    <div className="file-upload">
      <label className="file-upload-label">
        {label} {required && <span className="required">*</span>}
      </label>

      <div
        className={`file-upload-area ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(inputId).click()}
      >
        <input
          id={inputId}
          type="file"
          style={{ display: "none" }}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
        <Upload className="file-upload-icon" />
        <p className="file-upload-text">Drag and drop files here, or click to select files</p>
        <p className="file-upload-formats">Accepted formats: {accept.replace(/\./g, "").replace(/,/g, ", ")}</p>
      </div>

      {files.length > 0 && (
        <div className="file-upload-list">
          <p className="file-upload-list-title">Uploaded files:</p>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="file-upload-item">
                <div className="file-upload-item-name">
                  <FileText className="file-upload-item-icon" />
                  <span className="file-upload-item-text">{file.name || `File ${index + 1}`}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="file-upload-item-remove"
                >
                  <X className="file-upload-item-remove-icon" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Main Universal Profile Component
export default function UniversalProfile() {
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
      entityType: "smse", // Default to SMSE
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

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("universalProfileData")
    const savedCompletedSections = localStorage.getItem("universalProfileCompletedSections")

    if (savedData) {
      setFormData(JSON.parse(savedData))
    }

    if (savedCompletedSections) {
      setCompletedSections(JSON.parse(savedCompletedSections))
    }
  }, [])

  // Save data to localStorage whenever it changes
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
    const currentIndex = sections.findIndex((section) => section.id === activeSection)
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id)
      window.scrollTo(0, 0)
    }
  }

  const navigateToPreviousSection = () => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection)
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id)
      window.scrollTo(0, 0)
    }
  }

  const handleSaveSection = () => {
    localStorage.setItem("universalProfileData", JSON.stringify(formData))
    alert("Section saved successfully!")
  }

  const handleSaveAndContinue = () => {
    markSectionAsCompleted(activeSection)
    localStorage.setItem("universalProfileData", JSON.stringify(formData))
    navigateToNextSection()
  }

  const handleSubmitProfile = () => {
    markSectionAsCompleted("declarationConsent")
    alert("Profile submitted successfully!")
    // Here you would typically send the data to your backend
    console.log("Submitted profile data:", formData)
  }

  // Entity Overview Section
  const renderEntityOverview = () => {
    const data = formData.entityOverview

    const handleChange = (e) => {
      const { name, value } = e.target
      updateFormData("entityOverview", { [name]: value })
    }

    const handleFileChange = (name, files) => {
      updateFormData("entityOverview", { [name]: files })
    }

    return (
      <>
        <h2>Entity Overview</h2>

        <div className="grid-container">
          <div>
            <FormField label="Registered Name" required>
              <input
                type="text"
                name="registeredName"
                value={data.registeredName || ""}
                onChange={handleChange}
                className="form-input"
                required
              />
            </FormField>

            <FormField label="Trading Name (if different)">
              <input
                type="text"
                name="tradingName"
                value={data.tradingName || ""}
                onChange={handleChange}
                className="form-input"
              />
            </FormField>

            <FormField label="Registration Number" required>
              <input
                type="text"
                name="registrationNumber"
                value={data.registrationNumber || ""}
                onChange={handleChange}
                className="form-input"
                required
              />
            </FormField>

            <FormField label="Entity Type" required>
              <select
                name="entityType"
                value={data.entityType || ""}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Entity Type</option>
                {entityTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Entity Size" required>
              <select
                name="entitySize"
                value={data.entitySize || ""}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Entity Size</option>
                {entitySizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="No. of Employees" required>
              <input
                type="number"
                name="employeeCount"
                value={data.employeeCount || ""}
                onChange={handleChange}
                min="0"
                className="form-input"
                required
              />
            </FormField>

            <FormField label="Years in Operation" required>
              <input
                type="number"
                name="yearsInOperation"
                value={data.yearsInOperation || ""}
                onChange={handleChange}
                min="0"
                step="0.5"
                className="form-input"
                required
              />
            </FormField>
          </div>

          <div>
            <FormField label="Operation Stage" required>
              <select
                name="operationStage"
                value={data.operationStage || ""}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Operation Stage</option>
                {operationStages.map((stage) => (
                  <option key={stage.value} value={stage.value}>
                    {stage.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Economic Sector" required>
              <select
                name="economicSector"
                value={data.economicSector || ""}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Economic Sector</option>
                {economicSectors.map((sector) => (
                  <option key={sector.value} value={sector.value}>
                    {sector.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Location" required>
              <input
                type="text"
                name="location"
                value={data.location || ""}
                onChange={handleChange}
                placeholder="City, Province, Country"
                className="form-input"
                required
              />
            </FormField>

            <FormField label="Brief Business Description" required>
              <textarea
                name="businessDescription"
                value={data.businessDescription || ""}
                onChange={handleChange}
                rows={4}
                className="form-textarea"
                required
              ></textarea>
            </FormField>

            <FormField label="Company Logo" tooltip="Recommended size: 300x300px, Max size: 2MB">
              <FileUpload
                label=""
                accept=".jpg,.jpeg,.png,.svg"
                onChange={(files) => handleFileChange("companyLogo", files)}
                value={data.companyLogo || []}
              />
            </FormField>
          </div>
        </div>

        <div className="section-divider">
          <h3>Required Documents</h3>

          <div className="grid-container">
            <FileUpload
              label="Company Registration Certificate"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              onChange={(files) => handleFileChange("registrationCertificate", files)}
              value={data.registrationCertificate || []}
            />

            <FileUpload
              label="Proof of Operating Address"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              onChange={(files) => handleFileChange("proofOfAddress", files)}
              value={data.proofOfAddress || []}
            />
          </div>
        </div>
      </>
    )
  }

  // Ownership & Management Section
  const renderOwnershipManagement = () => {
    const data = formData.ownershipManagement

    const handleChange = (e) => {
      const { name, value } = e.target
      updateFormData("ownershipManagement", { [name]: value })
    }

    const handleFileChange = (name, files) => {
      updateFormData("ownershipManagement", { [name]: files })
    }

    const addShareholder = () => {
      const newShareholders = [
        ...data.shareholders,
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
      ]
      updateFormData("ownershipManagement", { shareholders: newShareholders })
    }

    const updateShareholder = (index, field, value) => {
      const newShareholders = [...data.shareholders]
      newShareholders[index] = { ...newShareholders[index], [field]: value }
      updateFormData("ownershipManagement", { shareholders: newShareholders })
    }

    const removeShareholder = (index) => {
      const newShareholders = [...data.shareholders]
      newShareholders.splice(index, 1)
      updateFormData("ownershipManagement", { shareholders: newShareholders })
    }

    const addDirector = () => {
      const newDirectors = [...data.directors, { name: "", id: "", position: "", nationality: "", isExec: false }]
      updateFormData("ownershipManagement", { directors: newDirectors })
    }

    const updateDirector = (index, field, value) => {
      const newDirectors = [...data.directors]
      newDirectors[index] = { ...newDirectors[index], [field]: value }
      updateFormData("ownershipManagement", { directors: newDirectors })
    }

    const removeDirector = (index) => {
      const newDirectors = [...data.directors]
      newDirectors.splice(index, 1)
      updateFormData("ownershipManagement", { directors: newDirectors })
    }

    return (
      <>
        <h2>Ownership & Management</h2>

        <div className="form-field">
          <FormField label="Total Shares" required>
            <input
              type="number"
              name="totalShares"
              value={data.totalShares || ""}
              onChange={handleChange}
              className="form-input"
              required
            />
          </FormField>
        </div>

        <div className="form-field">
          <div className="flex-between">
            <h3>Shareholder Table</h3>
            <button type="button" onClick={addShareholder} className="btn btn-secondary btn-sm btn-icon">
              <Plus size={16} /> Add Shareholder
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID/Reg No.</th>
                  <th>Country</th>
                  <th>% Shareholding</th>
                  <th>Race</th>
                  <th>Gender</th>
                  <th>Is Youth?</th>
                  <th>Is Disabled?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.shareholders.map((shareholder, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={shareholder.name}
                        onChange={(e) => updateShareholder(index, "name", e.target.value)}
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={shareholder.idRegNo}
                        onChange={(e) => updateShareholder(index, "idRegNo", e.target.value)}
                        className="form-input"
                      />
                    </td>
                    <td>
                      <select
                        value={shareholder.country}
                        onChange={(e) => updateShareholder(index, "country", e.target.value)}
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {countryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={shareholder.shareholding}
                        onChange={(e) => updateShareholder(index, "shareholding", e.target.value)}
                        className="form-input"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </td>
                    <td>
                      <select
                        value={shareholder.race}
                        onChange={(e) => updateShareholder(index, "race", e.target.value)}
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {raceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={shareholder.gender}
                        onChange={(e) => updateShareholder(index, "gender", e.target.value)}
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {genderOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={shareholder.isYouth}
                        onChange={(e) => updateShareholder(index, "isYouth", e.target.checked)}
                        className="form-checkbox"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={shareholder.isDisabled}
                        onChange={(e) => updateShareholder(index, "isDisabled", e.target.checked)}
                        className="form-checkbox"
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => removeShareholder(index)} className="btn-danger">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="form-field">
          <div className="flex-between">
            <h3>Directors Table</h3>
            <button type="button" onClick={addDirector} className="btn btn-secondary btn-sm btn-icon">
              <Plus size={16} /> Add Director
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Position</th>
                  <th>Nationality</th>
                  <th>Is Exec/Non-exec?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.directors.map((director, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={director.name}
                        onChange={(e) => updateDirector(index, "name", e.target.value)}
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={director.id}
                        onChange={(e) => updateDirector(index, "id", e.target.value)}
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={director.position}
                        onChange={(e) => updateDirector(index, "position", e.target.value)}
                        className="form-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={director.nationality}
                        onChange={(e) => updateDirector(index, "nationality", e.target.value)}
                        className="form-input"
                      />
                    </td>
                    <td className="text-center">
                      <select
                        value={director.isExec ? "exec" : "nonexec"}
                        onChange={(e) => updateDirector(index, "isExec", e.target.value === "exec")}
                        className="form-select"
                      >
                        <option value="exec">Executive</option>
                        <option value="nonexec">Non-Executive</option>
                      </select>
                    </td>
                    <td>
                      <button type="button" onClick={() => removeDirector(index)} className="btn-danger">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section-divider">
          <h3>Required Documents</h3>

          <div className="grid-container">
            <FileUpload
              label="Certified IDs of Directors & Shareholders"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              multiple
              onChange={(files) => handleFileChange("certifiedIds", files)}
              value={data.certifiedIds || []}
            />

            <FileUpload
              label="Share Register"
              accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls"
              required
              onChange={(files) => handleFileChange("shareRegister", files)}
              value={data.shareRegister || []}
            />
          </div>
        </div>
      </>
    )
  }

  // Contact Details Section
  const renderContactDetails = () => {
    const data = formData.contactDetails

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target
      updateFormData("contactDetails", { [name]: type === "checkbox" ? checked : value })
    }

    const handleFileChange = (name, files) => {
      updateFormData("contactDetails", { [name]: files })
    }

    return (
      <>
        <h2>Contact Details</h2>

        <div className="grid-container">
          <div>
            <h3>Primary Contact Person</h3>

            <div className="grid-container" style={{ gridTemplateColumns: "1fr 2fr" }}>
              <FormField label="Title" required>
                <select
                  name="contactTitle"
                  value={data.contactTitle || ""}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select</option>
                  <option value="mr">Mr</option>
                  <option value="mrs">Mrs</option>
                  <option value="ms">Ms</option>
                  <option value="dr">Dr</option>
                  <option value="prof">Prof</option>
                </select>
              </FormField>

              <FormField label="Name" required>
                <input
                  type="text"
                  name="contactName"
                  value={data.contactName || ""}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </FormField>
            </div>

            <FormField label="ID Number" required>
              <input
                type="text"
                name="contactId"
                value={data.contactId || ""}
                onChange={handleChange}
                className="form-input"
                required
              />
            </FormField>

            <FormField label="Business Phone" required>
              <input
                type="tel"
                name="businessPhone"
                value={data.businessPhone || ""}
                onChange={handleChange}
                className="form-input"
                required
              />
            </FormField>

            <FormField label="Mobile" required>
              <input
                type="tel"
                name="mobile"
                value={data.mobile || ""}
                onChange={handleChange}
                className="form-input"
                required
              />
            </FormField>

            <FormField label="Email" required>
              <input
                type="email"
                name="email"
                value={data.email || ""}
                onChange={handleChange}
                className="form-input"
                required
              />
            </FormField>

            <FormField label="Website">
              <input
                type="url"
                name="website"
                value={data.website || ""}
                onChange={handleChange}
                placeholder="https://"
                className="form-input"
              />
            </FormField>
          </div>

          <div>
            <h3>Address Information</h3>

            <FormField label="Physical Address" required>
              <textarea
                name="physicalAddress"
                value={data.physicalAddress || ""}
                onChange={handleChange}
                rows={3}
                className="form-textarea"
                required
              ></textarea>
            </FormField>

            <div className="form-field">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="sameAsPhysical"
                  checked={data.sameAsPhysical || false}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>Postal address same as physical</span>
              </label>
            </div>

            {!data.sameAsPhysical && (
              <FormField label="Postal Address" required>
                <textarea
                  name="postalAddress"
                  value={data.postalAddress || ""}
                  onChange={handleChange}
                  rows={3}
                  className="form-textarea"
                  required={!data.sameAsPhysical}
                ></textarea>
              </FormField>
            )}

            <h3>Social Media Links</h3>

            <FormField label="LinkedIn">
              <input
                type="url"
                name="linkedin"
                value={data.linkedin || ""}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/..."
                className="form-input"
              />
            </FormField>

            <FormField label="Other Social Media">
              <input
                type="url"
                name="otherSocial"
                value={data.otherSocial || ""}
                onChange={handleChange}
                placeholder="https://..."
                className="form-input"
              />
            </FormField>
          </div>
        </div>

        <div className="section-divider">
          <h3>Required Documents</h3>

          <FileUpload
            label="Proof of Address (Utility Bill, Lease Agreement)"
            accept=".pdf,.jpg,.jpeg,.png"
            required
            onChange={(files) => handleFileChange("proofOfAddress", files)}
            value={data.proofOfAddress || []}
          />
        </div>
      </>
    )
  }

  // Legal & Compliance Section
  const renderLegalCompliance = () => {
    const data = formData.legalCompliance

    const handleChange = (e) => {
      const { name, value } = e.target
      updateFormData("legalCompliance", { [name]: value })
    }

    const handleFileChange = (name, files) => {
      updateFormData("legalCompliance", { [name]: files })
    }

    return (
      <>
        <h2>Legal & Compliance</h2>

        <div className="grid-container">
          <div>
            <FormField label="Tax Number" required>
              <input
                type="text"
                name="taxNumber"
                value={data.taxNumber || ""}
                onChange={handleChange}
                className="form-input"
                required
              />
            </FormField>

            <div className="grid-container">
              <FormField label="Tax Clearance Number" required>
                <input
                  type="text"
                  name="taxClearanceNumber"
                  value={data.taxClearanceNumber || ""}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </FormField>

              <FormField label="Expiry Date" required>
                <input
                  type="date"
                  name="taxClearanceDate"
                  value={data.taxClearanceDate || ""}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </FormField>
            </div>

            <FormField label="VAT Number">
              <input
                type="text"
                name="vatNumber"
                value={data.vatNumber || ""}
                onChange={handleChange}
                className="form-input"
              />
            </FormField>

            <FormField label="RSC Number (if any)">
              <input
                type="text"
                name="rscNumber"
                value={data.rscNumber || ""}
                onChange={handleChange}
                className="form-input"
              />
            </FormField>
          </div>

          <div>
            <div className="grid-container">
              <FormField label="UIF Number">
                <input
                  type="text"
                  name="uifNumber"
                  value={data.uifNumber || ""}
                  onChange={handleChange}
                  className="form-input"
                />
              </FormField>

              <FormField label="PAYE Number">
                <input
                  type="text"
                  name="payeNumber"
                  value={data.payeNumber || ""}
                  onChange={handleChange}
                  className="form-input"
                />
              </FormField>
            </div>

            <div className="grid-container">
              <FormField label="B-BBEE Level" required>
                <select
                  name="bbbeeLevel"
                  value={data.bbbeeLevel || ""}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Level</option>
                  {bbbeeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="Certificate Renewal Date"
                required={data.bbbeeLevel && data.bbbeeLevel !== "none" && data.bbbeeLevel !== "exempt"}
              >
                <input
                  type="date"
                  name="bbbeeCertRenewalDate"
                  value={data.bbbeeCertRenewalDate || ""}
                  onChange={handleChange}
                  className="form-input"
                  required={data.bbbeeLevel && data.bbbeeLevel !== "none" && data.bbbeeLevel !== "exempt"}
                />
              </FormField>
            </div>

            <FormField label="CIPC Returns Status" required>
              <select
                name="cipcStatus"
                value={data.cipcStatus || ""}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Status</option>
                {cipcStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="COIDA No. (if applicable)">
              <input
                type="text"
                name="coidaNumber"
                value={data.coidaNumber || ""}
                onChange={handleChange}
                className="form-input"
              />
            </FormField>

            <FormField label="Industry Accreditations (optional)">
              <textarea
                name="industryAccreditations"
                value={data.industryAccreditations || ""}
                onChange={handleChange}
                rows={2}
                placeholder="List any industry-specific accreditations"
                className="form-textarea"
              ></textarea>
            </FormField>
          </div>
        </div>

        <div className="section-divider">
          <h3>Required Documents</h3>

          <div className="grid-container">
            <FileUpload
              label="Tax Clearance Certificate"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              onChange={(files) => handleFileChange("taxClearanceCert", files)}
              value={data.taxClearanceCert || []}
            />

            <FileUpload
              label="B-BBEE Certificate"
              accept=".pdf,.jpg,.jpeg,.png"
              required={data.bbbeeLevel && data.bbbeeLevel !== "none" && data.bbbeeLevel !== "exempt"}
              onChange={(files) => handleFileChange("bbbeeCert", files)}
              value={data.bbbeeCert || []}
            />

            <FileUpload
              label="VAT/UIF/PAYE/COIDA Certificates (if applicable)"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={(files) => handleFileChange("otherCerts", files)}
              value={data.otherCerts || []}
            />

            <FileUpload
              label="Industry Accreditations (if available)"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={(files) => handleFileChange("industryAccreditationDocs", files)}
              value={data.industryAccreditationDocs || []}
            />
          </div>
        </div>
      </>
    )
  }

  // Products, Services & Offerings Section
  const renderProductsServices = () => {
    const data = formData.productsServices

    const handleChange = (e) => {
      const { name, value } = e.target
      updateFormData("productsServices", { [name]: value })
    }

    const handleFileChange = (name, files) => {
      updateFormData("productsServices", { [name]: files })
    }

    const addProductCategory = () => {
      const productCategories = data.productCategories || []
      updateFormData("productsServices", { productCategories: [...productCategories, { name: "", products: [] }] })
    }

    const updateProductCategory = (index, field, value) => {
      const productCategories = [...(data.productCategories || [])]
      productCategories[index] = { ...productCategories[index], [field]: value }
      updateFormData("productsServices", { productCategories })
    }

    const removeProductCategory = (index) => {
      const productCategories = [...(data.productCategories || [])]
      productCategories.splice(index, 1)
      updateFormData("productsServices", { productCategories })
    }

    const addProduct = (categoryIndex) => {
      const productCategories = [...(data.productCategories || [])]
      const products = productCategories[categoryIndex].products || []
      productCategories[categoryIndex].products = [...products, { name: "", description: "" }]
      updateFormData("productsServices", { productCategories })
    }

    const updateProduct = (categoryIndex, productIndex, field, value) => {
      const productCategories = [...(data.productCategories || [])]
      productCategories[categoryIndex].products[productIndex] = {
        ...productCategories[categoryIndex].products[productIndex],
        [field]: value,
      }
      updateFormData("productsServices", { productCategories })
    }

    const removeProduct = (categoryIndex, productIndex) => {
      const productCategories = [...(data.productCategories || [])]
      productCategories[categoryIndex].products.splice(productIndex, 1)
      updateFormData("productsServices", { productCategories })
    }

    const addServiceCategory = () => {
      const serviceCategories = data.serviceCategories || []
      updateFormData("productsServices", { serviceCategories: [...serviceCategories, { name: "", services: [] }] })
    }

    const updateServiceCategory = (index, field, value) => {
      const serviceCategories = [...(data.serviceCategories || [])]
      serviceCategories[index] = { ...serviceCategories[index], [field]: value }
      updateFormData("productsServices", { serviceCategories })
    }

    const removeServiceCategory = (index) => {
      const serviceCategories = [...(data.serviceCategories || [])]
      serviceCategories.splice(index, 1)
      updateFormData("productsServices", { serviceCategories })
    }

    const addService = (categoryIndex) => {
      const serviceCategories = [...(data.serviceCategories || [])]
      const services = serviceCategories[categoryIndex].services || []
      serviceCategories[categoryIndex].services = [...services, { name: "", description: "" }]
      updateFormData("productsServices", { serviceCategories })
    }

    const updateService = (categoryIndex, serviceIndex, field, value) => {
      const serviceCategories = [...(data.serviceCategories || [])]
      serviceCategories[categoryIndex].services[serviceIndex] = {
        ...serviceCategories[categoryIndex].services[serviceIndex],
        [field]: value,
      }
      updateFormData("productsServices", { serviceCategories })
    }

    const removeService = (categoryIndex, serviceIndex) => {
      const serviceCategories = [...(data.serviceCategories || [])]
      serviceCategories[categoryIndex].services.splice(serviceIndex, 1)
      updateFormData("productsServices", { serviceCategories })
    }

    const addClient = () => {
      const keyClients = data.keyClients || []
      updateFormData("productsServices", { keyClients: [...keyClients, { name: "", industry: "" }] })
    }

    const updateClient = (index, field, value) => {
      const keyClients = [...(data.keyClients || [])]
      keyClients[index] = { ...keyClients[index], [field]: value }
      updateFormData("productsServices", { keyClients })
    }

    const removeClient = (index) => {
      const keyClients = [...(data.keyClients || [])]
      keyClients.splice(index, 1)
      updateFormData("productsServices", { keyClients })
    }

    return (
      <>
        <h2>Products, Services & Offerings</h2>

        {/* SMSE Section - Only showing SMSE as requested */}
        <div className="info-box">
         

          <div className="form-field">
            <div className="flex-between">
              <h4>Product Categories & Products</h4>
              <button type="button" onClick={addProductCategory} className="btn btn-secondary btn-sm btn-icon">
                <Plus size={16} /> Add Category
              </button>
            </div>

            {(data.productCategories || []).map((category, categoryIndex) => (
              <div key={categoryIndex} className="card-item">
                <div className="flex-between">
                  <FormField label="Category Name" required className="flex-grow">
                    <input
                      type="text"
                      value={category.name || ""}
                      onChange={(e) => updateProductCategory(categoryIndex, "name", e.target.value)}
                      className="form-input"
                      required
                    />
                  </FormField>
                  <button type="button" onClick={() => removeProductCategory(categoryIndex)} className="btn-danger">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="card-item-content">
                  <div className="flex-between">
                    <h5>Products</h5>
                    <button
                      type="button"
                      onClick={() => addProduct(categoryIndex)}
                      className="btn btn-secondary btn-sm btn-icon"
                    >
                      <Plus size={16} /> Add Product
                    </button>
                  </div>

                  {(category.products || []).map((product, productIndex) => (
                    <div key={productIndex} className="flex-row">
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={product.name || ""}
                          onChange={(e) => updateProduct(categoryIndex, productIndex, "name", e.target.value)}
                          placeholder="Product Name"
                          className="form-input"
                        />
                      </div>
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={product.description || ""}
                          onChange={(e) => updateProduct(categoryIndex, productIndex, "description", e.target.value)}
                          placeholder="Brief Description"
                          className="form-input"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProduct(categoryIndex, productIndex)}
                        className="btn-danger"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="form-field">
            <div className="flex-between">
              <h4>Service Categories & Services</h4>
              <button type="button" onClick={addServiceCategory} className="btn btn-secondary btn-sm btn-icon">
                <Plus size={16} /> Add Category
              </button>
            </div>

            {(data.serviceCategories || []).map((category, categoryIndex) => (
              <div key={categoryIndex} className="card-item">
                <div className="flex-between">
                  <FormField label="Category Name" required className="flex-grow">
                    <input
                      type="text"
                      value={category.name || ""}
                      onChange={(e) => updateServiceCategory(categoryIndex, "name", e.target.value)}
                      className="form-input"
                      required
                    />
                  </FormField>
                  <button type="button" onClick={() => removeServiceCategory(categoryIndex)} className="btn-danger">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="card-item-content">
                  <div className="flex-between">
                    <h5>Services</h5>
                    <button
                      type="button"
                      onClick={() => addService(categoryIndex)}
                      className="btn btn-secondary btn-sm btn-icon"
                    >
                      <Plus size={16} /> Add Service
                    </button>
                  </div>

                  {(category.services || []).map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex-row">
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={service.name || ""}
                          onChange={(e) => updateService(categoryIndex, serviceIndex, "name", e.target.value)}
                          placeholder="Service Name"
                          className="form-input"
                        />
                      </div>
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={service.description || ""}
                          onChange={(e) => updateService(categoryIndex, serviceIndex, "description", e.target.value)}
                          placeholder="Brief Description"
                          className="form-input"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeService(categoryIndex, serviceIndex)}
                        className="btn-danger"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="form-field">
            <div className="flex-between">
              <h4>Key Clients/Customers (optional)</h4>
              <button type="button" onClick={addClient} className="btn btn-secondary btn-sm btn-icon">
                <Plus size={16} /> Add Client
              </button>
            </div>

            {(data.keyClients || []).map((client, index) => (
              <div key={index} className="flex-row">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={client.name || ""}
                    onChange={(e) => updateClient(index, "name", e.target.value)}
                    placeholder="Client Name"
                    className="form-input"
                  />
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    value={client.industry || ""}
                    onChange={(e) => updateClient(index, "industry", e.target.value)}
                    placeholder="Industry"
                    className="form-input"
                  />
                </div>
                <button type="button" onClick={() => removeClient(index)} className="btn-danger">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="section-divider">
            <h4>Required Documents</h4>

            <div className="grid-container">
              <FileUpload
                label="Company Profile / Brochure (optional)"
                accept=".pdf,.doc,.docx"
                onChange={(files) => handleFileChange("companyProfile", files)}
                value={data.companyProfile || []}
              />

              <FileUpload
                label="Client References (optional)"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                multiple
                onChange={(files) => handleFileChange("clientReferences", files)}
                value={data.clientReferences || []}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  // How Did You Hear Section
  const renderHowDidYouHear = () => {
    const data = formData.howDidYouHear

    const handleChange = (e) => {
      const { name, value } = e.target
      updateFormData("howDidYouHear", { [name]: value })
    }

    return (
      <>
        <h2>How Did You Hear About Us?</h2>

        <div className="form-container">
          <FormField label="Source" required>
            <select name="source" value={data.source || ""} onChange={handleChange} className="form-select" required>
              <option value="">Select Source</option>
              {sourceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          {data.source === "referral" && (
            <FormField label="Who referred you?">
              <input
                type="text"
                name="referralName"
                value={data.referralName || ""}
                onChange={handleChange}
                className="form-input"
              />
            </FormField>
          )}

          {data.source === "partner_org" && (
            <FormField label="Partner Organization Name">
              <input
                type="text"
                name="partnerName"
                value={data.partnerName || ""}
                onChange={handleChange}
                className="form-input"
              />
            </FormField>
          )}

          {data.source === "event" && (
            <FormField label="Event Name">
              <input
                type="text"
                name="eventName"
                value={data.eventName || ""}
                onChange={handleChange}
                className="form-input"
              />
            </FormField>
          )}

          {data.source === "other" && (
            <FormField label="Please specify">
              <input
                type="text"
                name="otherSource"
                value={data.otherSource || ""}
                onChange={handleChange}
                className="form-input"
              />
            </FormField>
          )}

          <FormField label="Additional Comments">
            <textarea
              name="additionalComments"
              value={data.additionalComments || ""}
              onChange={handleChange}
              rows={4}
              className="form-textarea"
            ></textarea>
          </FormField>
        </div>
      </>
    )
  }

  // Declaration & Consent Section
  const renderDeclarationConsent = () => {
    const data = formData.declarationConsent

    const handleChange = (e) => {
      const { name, checked } = e.target
      updateFormData("declarationConsent", { [name]: checked })
    }

    const handleFileChange = (name, files) => {
      updateFormData("declarationConsent", { [name]: files })
    }

    return (
      <>
        <h2>Declaration & Consent</h2>

        <div className="info-box">
          <h3>Declaration of Accuracy</h3>
          <p>
            I hereby declare that all information provided in this Universal Profile is true, accurate, and complete to
            the best of my knowledge. I understand that any false or misleading information may result in the rejection
            of my profile or termination of any agreements that may arise from this profile.
          </p>
          <div className="form-field">
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="accuracy"
                checked={data.accuracy || false}
                onChange={handleChange}
                className="form-checkbox"
                required
              />
              <span>I confirm that all information provided is accurate and complete</span>
            </label>
          </div>
        </div>

        <div className="info-box">
          <h3>Consent for Data Processing</h3>
          <p>
            I consent to the collection, processing, and storage of the personal and business information provided in
            this Universal Profile. I understand that this information will be used for the purposes of business
            verification, matching with relevant opportunities, and providing personalized recommendations and support.
          </p>
          <p>
            I understand that my information may be shared with third parties for the purposes of verification and
            matching, but only with my explicit consent for each specific instance of sharing.
          </p>
          <div className="form-field">
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="dataProcessing"
                checked={data.dataProcessing || false}
                onChange={handleChange}
                className="form-checkbox"
                required
              />
              <span>I consent to the collection and processing of my data as described</span>
            </label>
          </div>
        </div>

        <div className="info-box">
          <h3>Agreement to Platform Terms & Conditions</h3>
          <p>
            I confirm that I have read, understood, and agree to the platform's <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>. I understand that my use of the platform is subject to these terms and
            conditions.
          </p>
          <div className="form-field">
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="termsConditions"
                checked={data.termsConditions || false}
                onChange={handleChange}
                className="form-checkbox"
                required
              />
              <span>I agree to the platform's Terms & Conditions</span>
            </label>
          </div>
        </div>

        <div className="section-divider">
          <h3>Required Documents</h3>

          <FileUpload
            label="Signed Declaration / Consent Form"
            accept=".pdf,.jpg,.jpeg,.png"
            required
            onChange={(files) => handleFileChange("signedDeclaration", files)}
            value={data.signedDeclaration || []}
          />
        </div>
      </>
    )
  }

  // Instructions Section
  const renderInstructions = () => {
    return (
      <>
        <h2>Instructions</h2>

        <div className="info-box">
          <h3>How to complete the form</h3>
          <ul className="info-list">
            <li>Complete all required fields marked with an asterisk (*)</li>
            <li>Navigate through sections using the tracker at the top</li>
            <li>You can save your progress and return later</li>
            <li>Upload all required documents in the specified formats</li>
            <li>Review your information before final submission</li>
            <li>Click on each section in the tracker to view specific instructions</li>
          </ul>
        </div>

        <div className="info-box">
          <h3>Purpose of data collection</h3>
          <p>The information collected in this Universal Profile will be used to:</p>
          <ul className="info-list">
            <li>Create your comprehensive business profile</li>
            <li>Match you with relevant opportunities, investors, and partners</li>
            <li>Verify your business legitimacy and compliance status</li>
            <li>Provide personalized recommendations and support</li>
            <li>Generate insights to help improve your business performance</li>
          </ul>
        </div>

        <div className="info-box">
          <h3>Terms & conditions</h3>
          <p>By completing this profile, you agree to our platform's terms and conditions, including:</p>
          <ul className="info-list">
            <li>Providing accurate and truthful information</li>
            <li>Keeping your profile information up to date</li>
            <li>Allowing us to verify the information provided</li>
            <li>Accepting that incomplete or false information may result in profile rejection</li>
            <li>Understanding that profile approval is subject to verification</li>
          </ul>
          <p>
            For the complete terms and conditions, please refer to our <a href="#">Terms of Service</a>.
          </p>
        </div>

        <div className="info-box">
          <h3>Privacy disclaimer</h3>
          <p>We take your privacy seriously. Here's how we handle your information:</p>
          <ul className="info-list">
            <li>Your data is stored securely and protected with industry-standard measures</li>
            <li>We only share your information with third parties with your explicit consent</li>
            <li>You can request access to, correction of, or deletion of your data at any time</li>
            <li>We retain your information only as long as necessary for the purposes described</li>
            <li>We comply with all applicable data protection regulations</li>
          </ul>
          <p>
            For more details, please review our <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </>
    )
  }

  // Render the active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "instructions":
        return renderInstructions()
      case "entityOverview":
        return renderEntityOverview()
      case "ownershipManagement":
        return renderOwnershipManagement()
      case "contactDetails":
        return renderContactDetails()
      case "legalCompliance":
        return renderLegalCompliance()
      case "productsServices":
        return renderProductsServices()
      case "howDidYouHear":
        return renderHowDidYouHear()
      case "declarationConsent":
        return renderDeclarationConsent()
      default:
        return renderInstructions()
    }
  }

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
                !formData.declarationConsent.accuracy ||
                !formData.declarationConsent.dataProcessing ||
                !formData.declarationConsent.termsConditions
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
