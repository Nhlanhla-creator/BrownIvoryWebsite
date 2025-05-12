"use client"
import { useState } from "react"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import FormField from "./FormField"
import FileUpload from "./FileUpload"
import styles from "./SupportUniversalProfile.module.css"

// Program Type options
const programTypeOptions = [
  { value: "incubator", label: "Incubator" },
  { value: "accelerator", label: "Accelerator" },
  { value: "esd", label: "ESD (Enterprise Supplier Development)" },
  { value: "other", label: "Other" },
]

// Target Enterprise Type options
const targetEnterpriseOptions = [
  { value: "startup", label: "Startup" },
  { value: "growth", label: "Growth" },
  { value: "maturity", label: "Maturity" },
  { value: "turnaround", label: "Turnaround" },
  { value: "micro", label: "Micro Enterprises" },
  { value: "small", label: "Small Enterprises" },
  { value: "medium", label: "Medium Enterprises" },
]

// Sector Focus options
const sectorFocusOptions = [
  { value: "agriculture", label: "Agriculture" },
  { value: "ict", label: "ICT" },
  { value: "greenEnergy", label: "Green Energy" },
  { value: "mining", label: "Mining" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "energy", label: "Energy" },
  { value: "construction", label: "Construction" },
  { value: "retail", label: "Retail & Wholesale" },
  { value: "transport", label: "Transport & Logistics" },
  { value: "finance", label: "Finance & Insurance" },
  { value: "realestate", label: "Real Estate" },
  { value: "tourism", label: "Tourism & Hospitality" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health & Social Services" },
  { value: "arts", label: "Arts & Entertainment" },
  { value: "other", label: "Other Services" },
]

// Support Offering options
const supportOfferingOptions = [
  { value: "mentorship", label: "Mentorship" },
  { value: "funding", label: "Funding" },
  { value: "marketAccess", label: "Market Access" },
  { value: "technicalAssistance", label: "Technical Assistance" },
  { value: "businessDevelopment", label: "Business Development" },
  { value: "networkAccess", label: "Network Access" },
  { value: "officeSpace", label: "Office Space" },
  { value: "legalSupport", label: "Legal Support" },
  { value: "financialManagement", label: "Financial Management" },
  { value: "marketingSupport", label: "Marketing Support" },
  { value: "productDevelopment", label: "Product Development" },
  { value: "governance", label: "Governance Support" },
]

// Geographic Focus options
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
  { value: "sadc", label: "SADC Region" },
  { value: "eastAfrica", label: "East Africa" },
  { value: "westAfrica", label: "West Africa" },
  { value: "northAfrica", label: "North Africa" },
  { value: "subSaharan", label: "Sub-Saharan Africa" },
  { value: "africa", label: "Africa (All)" },
  { value: "global", label: "Global" },
  { value: "other", label: "Other" },
]

// MultiSelect component for dropdown selections
function MultiSelect({ options, selected, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  const handleSelect = (value) => {
    const newSelected = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]
    onChange(newSelected)
  }

  const getSelectedLabels = () => {
    return options.filter((option) => selected.includes(option.value)).map((option) => option.label)
  }

  // Truncate selected items display if too many
  const displaySelectedItems = () => {
    const labels = getSelectedLabels()
    if (labels.length <= 2) {
      return labels.map((label) => (
        <span key={label} className={styles.selectedItem}>
          {label}
        </span>
      ))
    } else {
      return (
        <>
          <span className={styles.selectedItem}>{labels[0]}</span>
          <span className={styles.selectedItem}>+{labels.length - 1} more</span>
        </>
      )
    }
  }

  return (
    <div className={styles.multiSelectContainer}>
      <div className={styles.multiSelectHeader} onClick={toggleDropdown}>
        {selected.length > 0 ? (
          <div className={styles.selectedItems}>{displaySelectedItems()}</div>
        ) : (
          <span className={styles.placeholder}>Select {label}</span>
        )}
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </div>

      {isOpen && (
        <div className={styles.multiSelectDropdown}>
          <div className={styles.multiSelectOptions}>
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles.multiSelectOption} ${selected.includes(option.value) ? styles.selected : ""}`}
                onClick={() => handleSelect(option.value)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  onChange={() => {}}
                  className={styles.multiSelectCheckbox}
                />
                <span>{option.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.multiSelectActions}>
            <button type="button" className={styles.multiSelectButton} onClick={closeDropdown}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SupportProductsServices({ data = {}, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleFileChange = (name, files) => {
    updateData({ [name]: files })
  }

  const addProgram = () => {
    const programs = data.programs || []
    updateData({
      programs: [
        ...programs,
        {
          name: "",
          type: [],
          targetEnterprises: [],
          sectors: [],
          supportOfferings: [],
          geographicFocus: [],
          duration: "",
          cohortSize: "",
          applicationDeadline: "",
        },
      ],
    })
  }

  const updateProgram = (index, field, value) => {
    const programs = [...(data.programs || [])]
    programs[index] = { ...programs[index], [field]: value }
    updateData({ programs })
  }

  const removeProgram = (index) => {
    const programs = [...(data.programs || [])]
    programs.splice(index, 1)
    updateData({ programs })
  }

  return (
    <div className={`${styles.productApplicationContainer} ${styles.productServiceTop}`}>
      <h2 className={styles.productApplicationHeading}>Support Program Offerings</h2>

      <div className={styles.entityTypeSelection}>
        <FormField label="Entity Type" required>
          <div className={styles.entityTypeOptions}>
            <label className={styles.entityTypeOption}>
              <input
                type="radio"
                name="entityType"
                value="supportProgram"
                checked={true}
                onChange={handleChange}
                className={styles.formRadio}
              />
              <span className={styles.radioLabel}>Support Program</span>
            </label>
          </div>
        </FormField>
      </div>

      {/* Support Program Section */}
      <div className={styles.investorSection}>
        <div className={styles.sectionHeader}>
          <h4 className={styles.sectionHeading}>Program Details</h4>
          <button type="button" onClick={addProgram} className={styles.addButton}>
            <Plus className={styles.icon} /> Add Program
          </button>
        </div>

        {(data.programs || []).map((program, programIndex) => (
          <div key={programIndex} className={styles.fundCard}>
            <div className={styles.fundHeader}>
              <h5 className={styles.fundTitle}>Program {programIndex + 1}</h5>
              <button type="button" onClick={() => removeProgram(programIndex)} className={styles.deleteButton}>
                <Trash2 className={styles.icon} />
              </button>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Program Name" required>
                <input
                  type="text"
                  value={program.name || ""}
                  onChange={(e) => updateProgram(programIndex, "name", e.target.value)}
                  className={styles.formInput}
                  placeholder="Enter program name"
                  required
                />
              </FormField>

              <FormField label="Program Type" required>
                <MultiSelect
                  options={programTypeOptions}
                  selected={program.type || []}
                  onChange={(value) => updateProgram(programIndex, "type", value)}
                  label="Program Types"
                />
              </FormField>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Target Enterprise Type" required>
                <MultiSelect
                  options={targetEnterpriseOptions}
                  selected={program.targetEnterprises || []}
                  onChange={(value) => updateProgram(programIndex, "targetEnterprises", value)}
                  label="Enterprise Types"
                />
              </FormField>

              <FormField label="Sector/Industry Focus" required>
                <MultiSelect
                  options={sectorFocusOptions}
                  selected={program.sectors || []}
                  onChange={(value) => updateProgram(programIndex, "sectors", value)}
                  label="Sectors"
                />
              </FormField>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Support Offerings" required>
                <MultiSelect
                  options={supportOfferingOptions}
                  selected={program.supportOfferings || []}
                  onChange={(value) => updateProgram(programIndex, "supportOfferings", value)}
                  label="Support Offerings"
                />
              </FormField>

              <FormField label="Geographic Focus" required>
                <MultiSelect
                  options={countries}
                  selected={program.geographicFocus || []}
                  onChange={(value) => updateProgram(programIndex, "geographicFocus", value)}
                  label="Countries"
                />
              </FormField>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Program Duration" required>
                <input
                  type="text"
                  value={program.duration || ""}
                  onChange={(e) => updateProgram(programIndex, "duration", e.target.value)}
                  className={styles.formInput}
                  placeholder="e.g., 6 months, 1 year"
                  required
                />
              </FormField>

              <FormField label="Cohort Size">
                <input
                  type="text"
                  value={program.cohortSize || ""}
                  onChange={(e) => updateProgram(programIndex, "cohortSize", e.target.value)}
                  className={styles.formInput}
                  placeholder="e.g., 10-15 businesses"
                />
              </FormField>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Application Deadline">
                <input
                  type="date"
                  value={program.applicationDeadline || ""}
                  onChange={(e) => updateProgram(programIndex, "applicationDeadline", e.target.value)}
                  className={styles.formInput}
                />
              </FormField>

              <FormField label="Program Status" required>
                <select
                  value={program.status || ""}
                  onChange={(e) => updateProgram(programIndex, "status", e.target.value)}
                  className={styles.formSelect}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="closed">Closed</option>
                </select>
              </FormField>
            </div>
          </div>
        ))}

        <div className={styles.documentSection}>
          <h4 className={styles.sectionHeading}>Required Documents</h4>
          <div className={styles.documentGrid}>
            <FileUpload
              label="Registration/Accreditation Proof"
              accept=".pdf,.doc,.docx"
              required
              onChange={(files) => handleFileChange("registrationProof", files)}
              value={data.registrationProof || []}
            />
            <FileUpload
              label="Program Overview/Brochure (optional)"
              accept=".pdf,.doc,.docx"
              onChange={(files) => handleFileChange("programBrochure", files)}
              value={data.programBrochure || []}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
