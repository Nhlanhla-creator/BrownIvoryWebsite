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
  { value: "alternative", label: "Alternative Financing" },
  { value: "grants", label: "Grants & Subsidies" },
  { value: "specialized", label: "Specialized Funders" },
]

// Funder Type options
const funderTypeOptions = [
  { value: "angel", label: "Angel Investors (Early-stage, high-risk)" },
  { value: "vc", label: "Venture Capital (VC) Firms (Startups/growth-stage)" },
  { value: "pe", label: "Private Equity (PE) Firms (Mature businesses, buyouts)" },
  { value: "cvc", label: "Corporate Venture Capital (CVC) (Strategic investments)" },
  { value: "family", label: "Family Offices (Wealthy families investing directly)" },
  { value: "crowdfunding", label: "Crowdfunding Platforms (Equity-based)" },
  { value: "banks", label: "Commercial Banks (Term loans, overdrafts)" },
  { value: "nbfc", label: "Non-Banking Financial Companies (NBFCs) (Flexible debt)" },
  { value: "mfi", label: "Microfinance Institutions (MFIs) (Small-ticket loans)" },
  { value: "p2p", label: "Peer-to-Peer (P2P) Lenders (Marketplace lending)" },
  { value: "development", label: "Development Banks (SME-focused, low-interest)" },
  { value: "revenue", label: "Revenue-Based Financing (Repay via % revenue)" },
  { value: "convertible", label: "Convertible Note Investors (Debt → equity)" },
  { value: "mezzanine", label: "Mezzanine Financing (Hybrid debt/equity)" },
  { value: "factoring", label: "Factoring Companies (Invoice-based advances)" },
  { value: "supply", label: "Supply Chain Financiers (Supplier/vendor credit)" },
  { value: "gov_grants", label: "Government Grants (Non-repayable, sector-specific)" },
  { value: "corp_grants", label: "Corporate Grants (CSR/foundation funding)" },
  { value: "intl_aid", label: "International Aid Agencies (UNDP, World Bank)" },
  { value: "impact", label: "Impact Investors (ESG/social impact focus)" },
  { value: "real_estate", label: "Real Estate Financiers (Property-backed loans)" },
  { value: "equipment", label: "Equipment Lessors (Hardware/tech leasing)" },
  { value: "franchise", label: "Franchise Financiers (Franchise-specific capital)" },
  { value: "other", label: "Other (specify)" },
]

// Program Type options
const programTypeOptions = [
  { value: "accelerator", label: "Accelerator" },
  { value: "incubator", label: "Incubator" },
  { value: "mentorship", label: "Mentorship Program" },
  { value: "fellowship", label: "Fellowship" },
  { value: "bootcamp", label: "Bootcamp" },
  { value: "other", label: "Other" },
]

// Target Enterprise Type options
const targetEnterpriseOptions = [
  { value: "startup", label: "Startup" },
  { value: "early_growth", label: "Early Growth" },
  { value: "scale_up", label: "Scale-up" },
  { value: "mature", label: "Mature Business" },
  { value: "turnaround", label: "Turnaround" },
  { value: "other", label: "Other" },
]

// Support Offered options
const supportOfferedOptions = [
  { value: "blended", label: "Blended" },
  { value: "mentorship", label: "Mentorship" },
  { value: "technical", label: "Technical Assistance" },
  { value: "network", label: "Network Access" },
  { value: "market", label: "Market Access" },
  { value: "other", label: "Other" },
]

// Follow-On Funding options
const followOnOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
]

// Due Diligence Timeline options
const dueDiligenceTimelineOptions = [
  { value: "1-2", label: "1-2 weeks" },
  { value: "3-5", label: "3-5 weeks" },
  { value: "6-8", label: "6-8 weeks" },
  { value: "9+", label: "9+ weeks" },
]

// Decision-Making Process options
const decisionMakingOptions = [
  { value: "investment_committee", label: "Investment Committee (monthly reviews)" },
  { value: "board", label: "Board Approval" },
  { value: "founder", label: "Founder Decision" },
  { value: "multi_stage", label: "Multi-stage Process" },
  { value: "other", label: "Other" },
]

// Required Documents options
const requiredDocumentsOptions = [
  { value: "pitch_deck", label: "Pitch Deck" },
  { value: "cap_table", label: "Cap Table" },
  { value: "env_impact", label: "Environmental Impact Plan" },
  { value: "financials", label: "3-year Financials" },
  { value: "business_plan", label: "Business Plan" },
  { value: "market_analysis", label: "Market Analysis" },
  { value: "team_bios", label: "Team Bios" },
  { value: "other", label: "Other" },
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
          funderType: [],
          instruments: [],
          stages: [],
          sectors: [],
          ticketMin: "",
          ticketMax: "",
          geographicFocus: [],
          roi: "",
          exitYear: "",
          support: [],
          // Program details
          programType: "",
          sectorFocus: [],
          targetEnterpriseType: [],
          supportOffered: [],
          // Investment preferences
          preferredFounderProfile: "",
          investmentPhilosophy: "",
          followOnFunding: "",
          dealBreakers: "",
          // Track record
          portfolioCompanies: "",
          successStory: "",
          investmentsToDate: "",
          // Due diligence
          requiredDocuments: [],
          dueDiligenceTimeline: "",
          decisionMakingProcess: "",
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

              <FormField label="Type of Funder" required>
                <MultiSelect
                  options={funderTypeOptions}
                  selected={fund.funderType || []}
                  onChange={(value) => updateFund(fundIndex, "funderType", value)}
                  label="Funder Types"
                />
              </FormField>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Investment Instruments" required>
                <MultiSelect
                  options={investmentInstrumentOptions}
                  selected={fund.instruments || []}
                  onChange={(value) => updateFund(fundIndex, "instruments", value)}
                  label="Investment Instruments"
                />
              </FormField>

              <FormField label="Target Enterprise Stage" required>
                <MultiSelect
                  options={enterpriseStageOptions}
                  selected={fund.stages || []}
                  onChange={(value) => updateFund(fundIndex, "stages", value)}
                  label="Enterprise Stages"
                />
              </FormField>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Sector/Industry Focus" required>
                <MultiSelect
                  options={sectorFocusOptions}
                  selected={fund.sectors || []}
                  onChange={(value) => updateFund(fundIndex, "sectors", value)}
                  label="Sectors"
                />
              </FormField>

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
            </div>

            <div className={styles.gridContainer}>
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

              <FormField label="Geographic Focus" required>
                <MultiSelect
                  options={countries}
                  selected={fund.geographicFocus || []}
                  onChange={(value) => updateFund(fundIndex, "geographicFocus", value)}
                  label="Countries"
                />
              </FormField>
            </div>

            <div className={styles.sectionDivider}>
              <h5 className={styles.subSectionHeading}>Program Details</h5>

              <div className={styles.gridContainer}>
                <FormField label="Program Type">
                  <select
                    value={fund.programType || ""}
                    onChange={(e) => updateFund(fundIndex, "programType", e.target.value)}
                    className={styles.formInput}
                  >
                    <option value="">Select</option>
                    {programTypeOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Sector Focus">
                  <MultiSelect
                    options={sectorFocusOptions}
                    selected={fund.sectorFocus || []}
                    onChange={(value) => updateFund(fundIndex, "sectorFocus", value)}
                    label="Sectors"
                  />
                </FormField>
              </div>

              <div className={styles.gridContainer}>
                <FormField label="Target Enterprise Type">
                  <MultiSelect
                    options={targetEnterpriseOptions}
                    selected={fund.targetEnterpriseType || []}
                    onChange={(value) => updateFund(fundIndex, "targetEnterpriseType", value)}
                    label="Enterprise Types"
                  />
                </FormField>

                <FormField label="Support Offered">
                  <MultiSelect
                    options={supportOfferedOptions}
                    selected={fund.supportOffered || []}
                    onChange={(value) => updateFund(fundIndex, "supportOffered", value)}
                    label="Support Types"
                  />
                </FormField>
              </div>
            </div>

            <div className={styles.sectionDivider}>
              <h5 className={styles.subSectionHeading}>Investment Preferences</h5>

              <div className={styles.gridContainer}>
                <FormField label="Preferred Founder Profile">
                  <input
                    type="text"
                    value={fund.preferredFounderProfile || ""}
                    onChange={(e) => updateFund(fundIndex, "preferredFounderProfile", e.target.value)}
                    className={styles.formInput}
                    placeholder="e.g., Agri-focused entrepreneurs with a sustainability mission"
                  />
                </FormField>

                <FormField label="Investment Philosophy">
                  <input
                    type="text"
                    value={fund.investmentPhilosophy || ""}
                    onChange={(e) => updateFund(fundIndex, "investmentPhilosophy", e.target.value)}
                    className={styles.formInput}
                    placeholder="e.g., Patient capital, long-term value creation"
                  />
                </FormField>
              </div>

              <div className={styles.gridContainer}>
                <FormField label="Follow-On Funding">
                  <select
                    value={fund.followOnFunding || ""}
                    onChange={(e) => updateFund(fundIndex, "followOnFunding", e.target.value)}
                    className={styles.formInput}
                  >
                    <option value="">Select</option>
                    {followOnOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Deal-breakers">
                  <input
                    type="text"
                    value={fund.dealBreakers || ""}
                    onChange={(e) => updateFund(fundIndex, "dealBreakers", e.target.value)}
                    className={styles.formInput}
                    placeholder="e.g., Unsustainable practices, lack of regulatory compliance"
                  />
                </FormField>
              </div>
            </div>

            <div className={styles.sectionDivider}>
              <h5 className={styles.subSectionHeading}>Track Record</h5>

              <div className={styles.gridContainer}>
                <FormField label="Portfolio Companies">
                  <textarea
                    value={fund.portfolioCompanies || ""}
                    onChange={(e) => updateFund(fundIndex, "portfolioCompanies", e.target.value)}
                    className={styles.formTextarea}
                    rows={2}
                  />
                </FormField>

                <FormField label="Success Story">
                  <textarea
                    value={fund.successStory || ""}
                    onChange={(e) => updateFund(fundIndex, "successStory", e.target.value)}
                    className={styles.formTextarea}
                    rows={2}
                  />
                </FormField>
              </div>

              <div className={styles.gridContainer}>
                <FormField label="Investments to Date">
                  <input
                    type="date"
                    value={fund.investmentsToDate || ""}
                    onChange={(e) => updateFund(fundIndex, "investmentsToDate", e.target.value)}
                    className={styles.formInput}
                  />
                </FormField>
              </div>
            </div>

            <div className={styles.sectionDivider}>
              <h5 className={styles.subSectionHeading}>Due Diligence Requirements</h5>

              <div className={styles.gridContainer}>
                <FormField label="Required Documents">
                  <MultiSelect
                    options={requiredDocumentsOptions}
                    selected={fund.requiredDocuments || []}
                    onChange={(value) => updateFund(fundIndex, "requiredDocuments", value)}
                    label="Documents"
                  />
                </FormField>

                <FormField label="Due Diligence Timeline">
                  <select
                    value={fund.dueDiligenceTimeline || ""}
                    onChange={(e) => updateFund(fundIndex, "dueDiligenceTimeline", e.target.value)}
                    className={styles.formInput}
                  >
                    <option value="">Select</option>
                    {dueDiligenceTimelineOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <div className={styles.gridContainer}>
                <FormField label="Decision-Making Process">
                  <select
                    value={fund.decisionMakingProcess || ""}
                    onChange={(e) => updateFund(fundIndex, "decisionMakingProcess", e.target.value)}
                    className={styles.formInput}
                  >
                    <option value="">Select</option>
                    {decisionMakingOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {fund.decisionMakingProcess === "other" && (
                    <input
                      type="text"
                      value={fund.decisionMakingProcessOther || ""}
                      onChange={(e) => updateFund(fundIndex, "decisionMakingProcessOther", e.target.value)}
                      className={`${styles.formInput} mt-2`}
                      placeholder="Please specify"
                    />
                  )}
                </FormField>
              </div>
            </div>

            <div className={styles.gridContainer}>
              <FormField label="Support Offered Beyond Capital">
                <MultiSelect
                  options={supportOptions}
                  selected={fund.support || []}
                  onChange={(value) => updateFund(fundIndex, "support", value)}
                  label="Support Options"
                />
              </FormField>

              <FormField label="ROI">
                <input
                  type="text"
                  value={fund.roi || ""}
                  onChange={(e) => updateFund(fundIndex, "roi", e.target.value)}
                  className={styles.formInput}
                  placeholder="e.g., 15%, 2x"
                />
              </FormField>
            </div>

            <div className={styles.gridContainer}>
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
