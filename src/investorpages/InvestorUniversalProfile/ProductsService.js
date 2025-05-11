"use client"
import { useState } from "react"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import FormField from "./FormField"
import FileUpload from "./FileUpload"
import styles from "./InvestorUniversalProfile.module.css"

// Fund Type options
const fundTypeOptions = [
  { value: "equity", label: "Equity" },
  { value: "debt", label: "Debt" },
  { value: "grant", label: "Grant" },
  { value: "convertible", label: "Convertible Note" },
  { value: "blended", label: "Blended Finance" },
  { value: "quasi", label: "Quasi-Equity" },
]

// Investment Instruments options
const investmentInstrumentOptions = [
  { value: "workingCapital", label: "Working Capital Loans" },
  { value: "ventureCapital", label: "Venture Capital" },
  { value: "invoiceDiscounting", label: "Invoice Discounting" },
  { value: "mezzanine", label: "Mezzanine Finance" },
]

// Enterprise Stage options
const enterpriseStageOptions = [
  { value: "startup", label: "Startup" },
  { value: "growth", label: "Growth" },
  { value: "maturity", label: "Maturity" },
  { value: "turnaround", label: "Turnaround" },
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

// Support Beyond Capital options
const supportOptions = [
  { value: "technicalAssistance", label: "Technical Assistance" },
  { value: "mentorship", label: "Mentorship" },
  { value: "esgReporting", label: "ESG Reporting Help" },
  { value: "networkAccess", label: "Network Access" },
  { value: "marketAccess", label: "Market Access" },
  { value: "governance", label: "Governance Support" },
]

// Add countries array after the other option arrays
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

  const removeItem = (value, e) => {
    e.stopPropagation()
    onChange(selected.filter((item) => item !== value))
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

// Update the fund card layout to be more compact with two columns
export default function ProductsServices({ data = {}, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleFileChange = (name, files) => {
    updateData({ [name]: files })
  }

  const addFund = () => {
    const funds = data.funds || []
    updateData({
      funds: [
        ...funds,
        {
          name: "",
          size: "",
          type: [],
          instruments: [],
          stages: [],
          sectors: [],
          ticketMin: "",
          ticketMax: "",
          fundingRangeMin: "",
          fundingRangeMax: "",
          geographicFocus: [],
          roi: "",
          exitYear: "",
          support: [],
        },
      ],
    })
  }

  const updateFund = (index, field, value) => {
    const funds = [...(data.funds || [])]
    funds[index] = { ...funds[index], [field]: value }
    updateData({ funds })
  }

  const removeFund = (index) => {
    const funds = [...(data.funds || [])]
    funds.splice(index, 1)
    updateData({ funds })
  }

  return (
    <div className={`${styles.productApplicationContainer} ${styles.productServiceTop}`}>
      <h2 className={styles.productApplicationHeading}>Investment Offerings</h2>

      <div className={styles.entityTypeSelection}>
        <FormField label="Entity Type" required>
          <div className={styles.entityTypeOptions}>
            <label className={styles.entityTypeOption}>
              <input
                type="radio"
                name="entityType"
                value="investor"
                checked={true}
                onChange={handleChange}
                className={styles.formRadio}
              />
              <span className={styles.radioLabel}>Investor</span>
            </label>
          </div>
        </FormField>
      </div>

      {/* Investor Section - Always visible */}
      <div className={styles.investorSection}>
        <div className={styles.sectionHeader}>
          <h4 className={styles.sectionHeading}>Fund Details</h4>
          <button type="button" onClick={addFund} className={styles.addButton}>
            <Plus className={styles.icon} /> Add Fund
          </button>
        </div>

        {(data.funds || []).map((fund, fundIndex) => (
          <div key={fundIndex} className={styles.fundCard}>
            <div className={styles.fundHeader}>
              <h5 className={styles.fundTitle}>Fund {fundIndex + 1}</h5>
              <button type="button" onClick={() => removeFund(fundIndex)} className={styles.deleteButton}>
                <Trash2 className={styles.icon} />
              </button>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Fund Name" required>
                <input
                  type="text"
                  value={fund.name || ""}
                  onChange={(e) => updateFund(fundIndex, "name", e.target.value)}
                  className={styles.formInput}
                  placeholder="Enter fund name"
                  required
                />
              </FormField>

              <FormField label="Fund Size" required>
                <input
                  type="text"
                  value={fund.size || ""}
                  onChange={(e) => updateFund(fundIndex, "size", e.target.value)}
                  className={styles.formInput}
                  placeholder="e.g., $10M, R50M"
                  required
                />
              </FormField>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Fund Type" required>
                <MultiSelect
                  options={fundTypeOptions}
                  selected={fund.type || []}
                  onChange={(value) => updateFund(fundIndex, "type", value)}
                  label="Fund Types"
                />
              </FormField>

              <FormField label="Investment Instruments" required>
                <MultiSelect
                  options={investmentInstrumentOptions}
                  selected={fund.instruments || []}
                  onChange={(value) => updateFund(fundIndex, "instruments", value)}
                  label="Investment Instruments"
                />
              </FormField>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Target Enterprise Stage" required>
                <MultiSelect
                  options={enterpriseStageOptions}
                  selected={fund.stages || []}
                  onChange={(value) => updateFund(fundIndex, "stages", value)}
                  label="Enterprise Stages"
                />
              </FormField>

              <FormField label="Sector/Industry Focus" required>
                <MultiSelect
                  options={sectorFocusOptions}
                  selected={fund.sectors || []}
                  onChange={(value) => updateFund(fundIndex, "sectors", value)}
                  label="Sectors"
                />
              </FormField>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Ticket Size Minimum" required>
                <input
                  type="text"
                  value={fund.ticketMin || ""}
                  onChange={(e) => updateFund(fundIndex, "ticketMin", e.target.value)}
                  className={styles.formInput}
                  placeholder="e.g., $50K, R500K"
                  required
                />
              </FormField>

              <FormField label="Ticket Size Maximum" required>
                <input
                  type="text"
                  value={fund.ticketMax || ""}
                  onChange={(e) => updateFund(fundIndex, "ticketMax", e.target.value)}
                  className={styles.formInput}
                  placeholder="e.g., $500K, R5M"
                  required
                />
              </FormField>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Funding Range Minimum" required>
                <input
                  type="text"
                  value={fund.fundingRangeMin || ""}
                  onChange={(e) => updateFund(fundIndex, "fundingRangeMin", e.target.value)}
                  className={styles.formInput}
                  placeholder="e.g., $100K, R1M"
                  required
                />
              </FormField>

              <FormField label="Funding Range Maximum" required>
                <input
                  type="text"
                  value={fund.fundingRangeMax || ""}
                  onChange={(e) => updateFund(fundIndex, "fundingRangeMax", e.target.value)}
                  className={styles.formInput}
                  placeholder="e.g., $1M, R10M"
                  required
                />
              </FormField>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Geographic Focus" required>
                <MultiSelect
                  options={countries}
                  selected={fund.geographicFocus || []}
                  onChange={(value) => updateFund(fundIndex, "geographicFocus", value)}
                  label="Countries"
                />
              </FormField>

              <FormField label="Support Offered Beyond Capital">
                <MultiSelect
                  options={supportOptions}
                  selected={fund.support || []}
                  onChange={(value) => updateFund(fundIndex, "support", value)}
                  label="Support Options"
                />
              </FormField>
            </div>

            <div className={styles.sectionDivider}>
              <h5 className={styles.subSectionHeading}>Return Expectations</h5>

              <div className={styles.gridContainer}>
                <FormField label="ROI">
                  <input
                    type="text"
                    value={fund.roi || ""}
                    onChange={(e) => updateFund(fundIndex, "roi", e.target.value)}
                    className={styles.formInput}
                    placeholder="e.g., 15%, 2x"
                  />
                </FormField>

                <FormField label="Exit Year">
                  <input
                    type="text"
                    value={fund.exitYear || ""}
                    onChange={(e) => updateFund(fundIndex, "exitYear", e.target.value)}
                    className={styles.formInput}
                    placeholder="e.g., 2028, 5 years"
                  />
                </FormField>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.documentSection}>
          <h4 className={styles.sectionHeading}>Documents</h4>
          <div className={styles.documentGrid}>
            <FileUpload
              label="Fund Mandate"
              accept=".pdf,.doc,.docx"
              required
              onChange={(files) => handleFileChange("fundMandate", files)}
              value={data.fundMandate || []}
            />
            <FileUpload
              label="Prospectus (optional)"
              accept=".pdf,.doc,.docx"
              onChange={(files) => handleFileChange("fundProspectus", files)}
              value={data.fundProspectus || []}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
