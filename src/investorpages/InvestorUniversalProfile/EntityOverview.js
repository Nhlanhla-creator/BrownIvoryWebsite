"use client"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import FormField from "./FormField"
import FileUpload from "./FileUpload"
import styles from "./InvestorUniversalProfile.module.css"
import ViewUniversalProfile from "./Investortestview"

const entityTypes = [
  { value: "ptyLtd", label: "Pty Ltd" },
  { value: "cc", label: "CC" },
  { value: "ngo", label: "NGO" },
  { value: "coop", label: "Co-op" },
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

const investmentTypes = [
  { value: "equity", label: "Equity" },
  { value: "debt", label: "Debt" },
  { value: "grant", label: "Grant" },
  { value: "convertible", label: "Convertible Note" },
  { value: "blended", label: "Blended Finance" },
  { value: "quasi", label: "Quasi-Equity" },
]

const countries = [
  { value: "southAfrica", label: "South Africa" },
  { value: "namibia", label: "Namibia" },
  { value: "botswana", label: "Botswana" },
  { value: "zimbabwe", label: "Zimbabwe" },
  { value: "mozambique", label: "Mozambique" },
  { value: "lesotho", label: "Lesotho" },
  { value: "eswatini", label: "Eswatini" },
  { value: "zambia", label: "Zambia" },
  { value: "malawi", label: "Malawi" },
  { value: "angola", label: "Angola" },
  { value: "drc", label: "Democratic Republic of Congo" },
  { value: "tanzania", label: "Tanzania" },
  { value: "kenya", label: "Kenya" },
  { value: "uganda", label: "Uganda" },
  { value: "rwanda", label: "Rwanda" },
  { value: "burundi", label: "Burundi" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "nigeria", label: "Nigeria" },
  { value: "ghana", label: "Ghana" },
  { value: "other", label: "Other" },
]

const saProvinces = [
  { value: "gauteng", label: "Gauteng" },
  { value: "westernCape", label: "Western Cape" },
  { value: "easternCape", label: "Eastern Cape" },
  { value: "kwazuluNatal", label: "KwaZulu-Natal" },
  { value: "freeState", label: "Free State" },
  { value: "northWest", label: "North West" },
  { value: "mpumalanga", label: "Mpumalanga" },
  { value: "limpopo", label: "Limpopo" },
  { value: "northernCape", label: "Northern Cape" },
]

// MultiSelectDropdown component integrated directly into the file
function MultiSelectDropdown({
  options,
  value = [],
  onChange,
  placeholder = "Select options",
  name,
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState(value)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setSelectedOptions(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleOption = (optionValue) => {
    let newSelectedOptions

    if (selectedOptions.includes(optionValue)) {
      newSelectedOptions = selectedOptions.filter((value) => value !== optionValue)
    } else {
      newSelectedOptions = [...selectedOptions, optionValue]
    }

    setSelectedOptions(newSelectedOptions)
    onChange(newSelectedOptions)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const getSelectedLabels = () => {
    return options.filter((option) => selectedOptions.includes(option.value)).map((option) => option.label)
  }

  return (
    <div className={styles.multiSelectContainer} ref={dropdownRef}>
      <div className={styles.multiSelectHeader} onClick={toggleDropdown} aria-haspopup="listbox" aria-expanded={isOpen}>
        {selectedOptions.length > 0 ? (
          <div className={styles.selectedItems}>
            {getSelectedLabels().map((label) => (
              <span key={label} className={styles.selectedItem}>
                {label}
              </span>
            ))}
          </div>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        <ChevronDown size={16} />
      </div>

      {isOpen && (
        <div className={styles.multiSelectDropdown}>
          <div className={styles.multiSelectOptions} role="listbox">
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles.multiSelectOption} ${
                  selectedOptions.includes(option.value) ? styles.selected : ""
                }`}
                onClick={() => toggleOption(option.value)}
                role="option"
                aria-selected={selectedOptions.includes(option.value)}
              >
                <input
                  type="checkbox"
                  className={styles.multiSelectCheckbox}
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => {}}
                  id={`${name}-${option.value}`}
                />
                <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </div>
          <div className={styles.multiSelectActions}>
            <button type="button" className={styles.multiSelectButton} onClick={() => setIsOpen(false)}>
              Done
            </button>
          </div>
        </div>
      )}

      {/* Hidden select for form submission */}
      <select
        name={name}
        multiple
        value={selectedOptions}
        onChange={() => {}}
        required={required}
        style={{ display: "none" }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function EntityOverview({ data = {}, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleFileChange = (name, files) => {
    updateData({ [name]: files })
  }

  return (
    <div className={styles.productApplicationContainer}>
      <h2 className={styles.productApplicationHeading}>Entity Overview</h2>

      <div className={styles.formContent}>
        {/* Make sure all fields are in a consistent two-column layout */}
        <div className={styles.gridContainer}>
          <FormField label="Registered Name" required>
            <input
              type="text"
              name="registeredName"
              value={data.registeredName || ""}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </FormField>

          <FormField label="Trading Name (if different)">
            <input
              type="text"
              name="tradingName"
              value={data.tradingName || ""}
              onChange={handleChange}
              className={styles.formInput}
            />
          </FormField>
        </div>

        <div className={styles.gridContainer}>
          <FormField label="Registration Number" required>
            <input
              type="text"
              name="registrationNumber"
              value={data.registrationNumber || ""}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </FormField>

          <FormField label="Entity Type" required>
            <select
              name="entityType"
              value={data.entityType || ""}
              onChange={handleChange}
              className={styles.formSelect}
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
        </div>

        <div className={styles.gridContainer}>
          <FormField label="Entity Size" required>
            <select
              name="entitySize"
              value={data.entitySize || ""}
              onChange={handleChange}
              className={styles.formSelect}
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
              className={styles.formInput}
              required
              min="0"
            />
          </FormField>
        </div>

        <div className={styles.gridContainer}>
          <FormField label="Years in Operation" required>
            <input
              type="number"
              name="yearsInOperation"
              value={data.yearsInOperation || ""}
              onChange={handleChange}
              className={styles.formInput}
              required
              min="0"
            />
          </FormField>

          <FormField label="Operation Stage" required>
            <select
              name="operationStage"
              value={data.operationStage || ""}
              onChange={handleChange}
              className={styles.formSelect}
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
        </div>

        <div className={styles.gridContainer}>
          <FormField label="Economic Sectors" required>
            <MultiSelectDropdown
              name="economicSectors"
              options={economicSectors}
              value={data.economicSectors || []}
              onChange={(selectedOptions) => updateData({ economicSectors: selectedOptions })}
              placeholder="Select Economic Sectors"
              required
            />
          </FormField>

          <FormField label="Location" required>
            <select
              name="location"
              value={data.location || ""}
              onChange={handleChange}
              className={styles.formSelect}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>

            {data.location === "southAfrica" && (
              <div className={styles.provinceSelect}>
                <FormField label="Province" required>
                  <select
                    name="province"
                    value={data.province || ""}
                    onChange={handleChange}
                    className={styles.formSelect}
                    required
                  >
                    <option value="">Select Province</option>
                    {saProvinces.map((province) => (
                      <option key={province.value} value={province.value}>
                        {province.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            )}
          </FormField>
        </div>

        <div className={styles.gridContainer}>
          <FormField label="Deadline to Apply" required>
            <input
              type="date"
              name="deadline"
              value={data.deadline || ""}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </FormField>

          <FormField label="Average Response Time" required>
            <select
              name="responseTime"
              value={data.responseTime || ""}
              onChange={handleChange}
              className={styles.formSelect}
              required
            >
              <option value="">Select Response Time</option>
              <option value="1-3days">1-3 days</option>
              <option value="1week">1 week</option>
              <option value="2weeks">2 weeks</option>
              <option value="1month">1 month</option>
              <option value="3months">3 months</option>
            </select>
          </FormField>
        </div>

        <div className={styles.gridContainer}>
          <FormField label="Investment Type" required>
            <select
              name="investmentType"
              value={data.investmentType || ""}
              onChange={handleChange}
              className={styles.formSelect}
              required
            >
              <option value="">Select Investment Type</option>
              {investmentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Brief Business Description" required>
            <textarea
              name="businessDescription"
              value={data.businessDescription || ""}
              onChange={handleChange}
              className={`${styles.formTextarea} ${styles.small}`}
              rows={2}
              placeholder="Brief description of your business..."
              required
            />
          </FormField>
        </div>

        <div className={styles.sectionDivider}>
          <h4 className={styles.sectionHeading}>Company Logo</h4>
          <FileUpload
            label="Upload logo (optional)"
            accept=".jpg,.jpeg,.png,.svg"
            onChange={(files) => handleFileChange("companyLogo", files)}
            value={data.companyLogo || []}
          />
        </div>
        <ViewUniversalProfile />
      </div>
    </div>
  )
}
