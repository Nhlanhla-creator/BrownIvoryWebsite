"use client"
import { useEffect, useState } from "react"
import FormField from "./form-field"
import FileUpload from "./file-upload"
import "./UniversalProfile.css"
import { db, auth, storage } from "../../firebaseConfig"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import ProfileView from "./LindelaniTestView" // Adjust the import based on your file structure
import { ChevronDown, ChevronUp } from "lucide-react"
import RegistrationSummary from "./registration-summary"
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
  { value: "ideation", label: "Idea" },
  { value: "prototype", label: "Prototype" },
  { value: "startup", label: "Startup" },
  { value: "early-growth", label: "Early-Growth" },
  { value: "growth", label: "Growth" },
  { value: "scale-up", label: "Scale-up" },
  { value: "mature", label: "Mature" },
  
]

const economicSectors = [
  { value: "accounting_finance", label: "Accounting / Finance" },
  { value: "advertising_marketing_pr", label: "Advertising / Marketing / PR" },
  { value: "agriculture_forestry_fishing", label: "Agriculture / Forestry / Fishing" },
  { value: "automotive_motor_industry", label: "Automotive / Motor Industry" },
  { value: "banking_insurance_investments", label: "Banking / Insurance / Investments" },
  { value: "call_centre_customer_service", label: "Call Centre / Customer Service" },
  { value: "construction_building_civils", label: "Construction / Building / Civils" },
  { value: "consulting_business_services", label: "Consulting / Business Services" },
  { value: "education_training_teaching", label: "Education / Training / Teaching" },
  { value: "engineering", label: "Engineering (Civil, Mechanical, Electrical,)" },
  { value: "government_public_sector", label: "Government / Public Sector" },
  { value: "healthcare_nursing_medical", label: "Healthcare / Nursing / Medical" },
  { value: "hospitality_hotel_catering", label: "Hospitality / Hotel / Catering" },
  { value: "human_resources_recruitment", label: "Human Resources / Recruitment" },
  { value: "ict_information_technology", label: "ICT / Information Technology" },
  { value: "legal_law", label: "Legal / Law" },
  { value: "logistics_transport_supply_chain", label: "Logistics / Transport / Supply Chain" },
  { value: "manufacturing_production", label: "Manufacturing / Production" },
  { value: "media_journalism_publishing", label: "Media / Journalism / Publishing" },
  { value: "mining_energy_oil_gas", label: "Mining / Energy / Oil & Gas" },
  { value: "ngo_nonprofit_community", label: "NGO / Non-Profit / Community Services" },
  { value: "real_estate_property", label: "Real Estate / Property" },
  { value: "retail_wholesale_sales", label: "Retail / Wholesale / Sales" },
  { value: "science_research_development", label: "Science / Research / Development" },
  { value: "security_emergency_services", label: "Security / Emergency Services" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "tourism_travel_leisure", label: "Tourism / Travel / Leisure" },
  { value: "trades_artisans_technical", label: "Trades / Artisans / Technical" },
  { value: "utilities_water_electricity", label: "Utilities / Water / Electricity" },

]

const africanCountries = [
  { value: "algeria", label: "Algeria" },
  { value: "angola", label: "Angola" },
  { value: "benin", label: "Benin" },
  { value: "botswana", label: "Botswana" },
  { value: "burkina_faso", label: "Burkina Faso" },
  { value: "burundi", label: "Burundi" },
  { value: "cabo_verde", label: "Cabo Verde" },
  { value: "cameroon", label: "Cameroon" },
  { value: "central_african_republic", label: "Central African Republic" },
  { value: "chad", label: "Chad" },
  { value: "comoros", label: "Comoros" },
  { value: "congo", label: "Congo" },
  { value: "cote_d_ivoire", label: "Côte d'Ivoire" },
  { value: "djibouti", label: "Djibouti" },
  { value: "drc", label: "DR Congo" },
  { value: "egypt", label: "Egypt" },
  { value: "equatorial_guinea", label: "Equatorial Guinea" },
  { value: "eritrea", label: "Eritrea" },
  { value: "eswatini", label: "Eswatini" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "gabon", label: "Gabon" },
  { value: "gambia", label: "Gambia" },
  { value: "ghana", label: "Ghana" },
  { value: "guinea", label: "Guinea" },
  { value: "guinea_bissau", label: "Guinea-Bissau" },
  { value: "kenya", label: "Kenya" },
  { value: "lesotho", label: "Lesotho" },
  { value: "liberia", label: "Liberia" },
  { value: "libya", label: "Libya" },
  { value: "madagascar", label: "Madagascar" },
  { value: "malawi", label: "Malawi" },
  { value: "mali", label: "Mali" },
  { value: "mauritania", label: "Mauritania" },
  { value: "mauritius", label: "Mauritius" },
  { value: "morocco", label: "Morocco" },
  { value: "mozambique", label: "Mozambique" },
  { value: "namibia", label: "Namibia" },
  { value: "niger", label: "Niger" },
  { value: "nigeria", label: "Nigeria" },
  { value: "rwanda", label: "Rwanda" },
  { value: "sao_tome_and_principe", label: "São Tomé and Príncipe" },
  { value: "senegal", label: "Senegal" },
  { value: "seychelles", label: "Seychelles" },
  { value: "sierra_leone", label: "Sierra Leone" },
  { value: "somalia", label: "Somalia" },
  { value: "south_africa", label: "South Africa" },
  { value: "south_sudan", label: "South Sudan" },
  { value: "sudan", label: "Sudan" },
  { value: "tanzania", label: "Tanzania" },
  { value: "togo", label: "Togo" },
  { value: "tunisia", label: "Tunisia" },
  { value: "uganda", label: "Uganda" },
  { value: "zambia", label: "Zambia" },
  { value: "zimbabwe", label: "Zimbabwe" },
]

// MultiSelect component for Economic Sector
function MultiSelect({ options, selected, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  const handleSelect = (value) => {
    const newSelected = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]
    onChange(newSelected)
  }

  return (
    <div className="multi-select-container">
      <div className="multi-select-header" onClick={toggleDropdown}>
        {selected.length > 0 ? (
          <div className="selected-items">
            {selected.map((sector) => (
              <span key={sector} className="selected-item">
                {options.find((opt) => opt.value === sector)?.label || sector}
              </span>
            ))}
          </div>
        ) : (
          <span className="placeholder">Select {label}</span>
        )}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>

      {isOpen && (
        <div className="multi-select-dropdown">
          <div className="multi-select-options">
            {options.map((option) => (
              <div
                key={option.value}
                className={`multi-select-option ${selected.includes(option.value) ? "selected" : ""}`}
                onClick={() => handleSelect(option.value)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  onChange={() => {}}
                  className="multi-select-checkbox"
                />
                <span>{option.label}</span>
              </div>
            ))}
          </div>
          <div className="multi-select-actions">
            <button type="button" className="multi-select-button" onClick={closeDropdown}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default function EntityOverview({ data = {}, updateData, onSave }) {
  const [formData, setFormData] = useState({})
  const [isSaving, setSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load data from Firebase when component mounts
  useEffect(() => {
    const loadEntityOverview = async () => {
      try {
        setIsLoading(true)
        const userId = auth.currentUser?.uid
        
        if (!userId) {
          setIsLoading(false)
          return
        }

        // Load from the universalProfiles collection (matching your main structure)
        const docRef = doc(db, "universalProfiles", userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const profileData = docSnap.data()
          
          // Check if entityOverview data exists
          if (profileData.entityOverview) {
            const entityData = profileData.entityOverview
            setFormData(entityData)
            updateData(entityData)
          } else {
            // If no data exists, initialize with passed data
            setFormData(data)
          }
        } else {
          // No profile exists yet, use passed data
          setFormData(data)
        }
      } catch (error) {
        console.error("Error loading entity overview:", error)
        // Fallback to passed data on error
        setFormData(data)
      } finally {
        setIsLoading(false)
      }
    }

    loadEntityOverview()
  }, []) // Remove data dependency to prevent infinite loops

  // Update form data when data prop changes (but only if not loading from Firebase)
  useEffect(() => {
    if (!isLoading && Object.keys(formData).length === 0) {
      setFormData(data)
    }
  }, [data, isLoading])

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const handleMultiSelectChange = (field, value) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const handleFileChange = (name, files) => {
    const updatedData = { ...formData, [name]: files }
    setFormData(updatedData)
    updateData(updatedData)
  }

  // Remove the old Firebase save logic since it's handled by the parent component
  // Keep this for backwards compatibility if needed
  const saveEntityOverview = async () => {
    // This can be removed since the parent component handles saving
    return { success: true }
  }

  useEffect(() => {
    if (onSave) {
      onSave.current = saveEntityOverview
    }
  }, [formData, onSave])

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="entity-overview-loading">
        <h2 className="text-2xl font-bold text-brown-800 mb-6">Entity Overview</h2>
        <p>Loading your information...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-brown-800 mb-6">Entity Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormField label="Registered Name" required>
            <input
              type="text"
              name="registeredName"
              value={formData.registeredName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Trading Name (if different)">
            <input
              type="text"
              name="tradingName"
              value={formData.tradingName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>

          <FormField label="Registration Number" required>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Entity Type" required>
            <select
              name="entityType"
              value={formData.entityType || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
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
              value={formData.entitySize || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
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

          <FormField label="Financial Year End" required>
            <input
              type="month"
              name="financialYearEnd"
              value={formData.financialYearEnd || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="No. of Employees" required>
            <input
              type="number"
              name="employeeCount"
              value={formData.employeeCount || ""}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>

          <FormField label="Years in Operation" required>
            <input
              type="number"
              name="yearsInOperation"
              value={formData.yearsInOperation || ""}
              onChange={handleChange}
              min="0"
              step="0.5"
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </FormField>
        </div>

        <div>
          <FormField label="Operation Stage" required>
            <select
              name="operationStage"
              value={formData.operationStage || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
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
            <MultiSelect
              options={economicSectors}
              selected={formData.economicSectors || []}
              onChange={(value) => handleMultiSelectChange("economicSectors", value)}
              label="Economic Sectors"
            />
          </FormField>

          <FormField label="Target Market">
            <input
              type="text"
              name="targetMarket"
              value={formData.targetMarket || ""}
              onChange={handleChange}
              placeholder="Describe your primary customers or market"
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </FormField>

          <FormField label="Location" required>
            <select
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            >
              <option value="">Select Country</option>
              {africanCountries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </FormField>

          {formData.location === "south_africa" && (
            <FormField label="Province" required>
              <select
                name="province"
                value={formData.province || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                required
              >
                <option value="">Select Province</option>
                <option value="eastern_cape">Eastern Cape</option>
                <option value="free_state">Free State</option>
                <option value="gauteng">Gauteng</option>
                <option value="kwazulu_natal">KwaZulu-Natal</option>
                <option value="limpopo">Limpopo</option>
                <option value="mpumalanga">Mpumalanga</option>
                <option value="northern_cape">Northern Cape</option>
                <option value="north_west">North West</option>
                <option value="western_cape">Western Cape</option>
              </select>
            </FormField>
          )}

          <FormField label="Brief Business Description" required>
            <textarea
              name="businessDescription"
              value={formData.businessDescription || ""}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            ></textarea>
          </FormField>

          <FormField label="Company Logo" tooltip="Recommended size: 300x300px, Max size: 2MB">
            <FileUpload
              label=""
              accept=".jpg,.jpeg,.png,.svg"
              onChange={(files) => handleFileChange("companyLogo", files)}
              value={formData.companyLogo || []}
            />
          </FormField>
        </div>
      </div>

      <div className="mt-8 border-t border-brown-200 pt-6">
        <h3 className="text-lg font-semibold text-brown-700 mb-4">Required Documents</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Company Registration Certificate"
            accept=".pdf,.jpg,.jpeg,.png"
            required
            onChange={(files) => handleFileChange("registrationCertificate", files)}
            value={formData.registrationCertificate || []}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end"></div>
    </div>
  )
}