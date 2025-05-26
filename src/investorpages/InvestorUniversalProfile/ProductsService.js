"use client"
import { useState, useEffect } from "react"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import FormField from "./FormField"
import FileUpload from "./FileUpload"
import styles from "./InvestorUniversalProfile.module.css"

// Fund Type options
const fundTypeOptions = [
  { value: "equity", label: "Venture Capital" },
  { value: "debt", label: "Angel Investment" },
  { value: "grant", label: "Private Equity" },
  { value: "convertible", label: "Government Fund" },
  { value: "blended", label: "Grant / Non-Profit" },
  { value: "quasi", label: "Development Finance" },
  { value: "alternative", label: "Corporate Investment" },
  { value: "other", label: "Other (specify)" },
 
]

const funderTypeOptions = [
  // Equity-based
  { value: "angelInvestors", label: "	Individual Investor" },
  { value: "vcFirms", label: "Investment Company" },
  { value: "peFirms", label: "Bank or Financial Institution" },
  { value: "cvc", label: "Government or Public Agency" },
  { value: "familyOffices", label: "NGO / Foundation" },
  { value: "crowdfunding", label: "Development Organization" },

  // Debt-based
  { value: "commercialBanks", label: "Other (please specify)" },
 
]

// Program Type options
const programTypeOptions = [
  { value: "funding", label: "Funding" },
  { value: "incubation", label: "Incubation" },
  { value: "acceleration", label: "Acceleration" },
  { value: "esd", label: "ESD" },
  { value: "marketAccess", label: "Market Access" },
  { value: "businessMentorship", label: "Business Mentorship" },
  { value: "technicalSupport", label: "Technical Support" },
  { value: "development", label: "Development" },
]

// Target Enterprise Type options
const targetEnterpriseOptions = [
  { value: "ideation", label: "Idea / Concept stage" },
  { value: "prototype", label: "	Early-stage Startup" },
  { value: "startup", label: "Growing Business (2–5 years old)" },
  { value: "early-growth", label: "Established Business (5+ years)" },

]

// Support Offered options
const supportOfferedOptions = [
  { value: "blended", label: "Strategic Partnerships" },
  { value: "mentorship", label: "Mentorship" },
  { value: "technical", label: "Technical Assistance" },

  { value: "market", label: "Market Access / Networking" },
  { value: "development", label: "Business Development Support" },

  { value: "training", label: "No, I only provide capital" },
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
]

// Required Documents options
const requiredDocumentsOptions = [
  { value: "pitch_deck", label: "Pitch Deck" },
  { value: "cap_table", label: "Company Registration Certificate " },
  { value: "env_impact", label: "Certified IDs of Directors & Shareholders" },
  { value: "financials", label: "Share Register" },
  { value: "business_plan", label: "Business Plan" },
  { value: "market_analysis", label: "Proof of Address (Utility Bill, Lease Agreement)" },
  { value: "team_bios", label: "Tax Clearance Certificate" },
  { value: "compliance_cert", label: "B-BBEE Certificate" },
  { value: "company-profile", label: "Company Profile / Brochure" },
  { value: "certificates", label: "VAT/UIF/PAYE/COIDA Certificates" },
  { value: "industry", label: "Industry Accreditations" },
  { value: "statements", label: "5 Year Budget (Income Statement, Cashflows, Balance Sheet)" },
  { value: "reports", label: "Previous Program Reports" },
  { value: "bank-details", label: "Bank Details Confirmation Letter" },
  { value: "loan", label: "Loan Agreements " },
  { value: "financial_statements", label: "Financial Statements" },
  { value: "scope", label: "Scope of Work" },
  { value: "letters", label: "Support Letters / Endorsements" },
  { value: "other", label: "Other" },
]

// Investment Instruments options
const investmentInstrumentOptions = [
  { value: "workingCapital", label: "Equity (Buying shares in the business)" },
  { value: "ventureCapital", label: "Debt (Loan-based funding)" },
  { value: "invoiceDiscounting", label: "Grants (Non-repayable funding)" },
  { value: "mezzanine", label: "Convertible Notes (Loan that can turn into shares)" },
  { value: "common_shares", label: "Revenue-based Financing" },
  { value: "preferred_shares", label: "Other (please specify)" },
 
]

// Enterprise Stage options
const enterpriseStageOptions = [
  { value: "ideation", label: "Idea" },
  { value: "prototype", label: "Prototype" },
  { value: "startup", label: "Startup" },
  { value: "early-growth", label: "Early-Growth" },
  { value: "growth", label: "Growth" },
  { value: "scale-up", label: "Scale-up" },
  { value: "mature", label: "Mature" },
]

// Sector Focus options
const sectorFocusOptions = [
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
];


// Support Beyond Capital options
const supportOptions = [
  { value: "technicalAssistance", label: "Technical Assistance" },
  { value: "mentorship", label: "Mentorship" },
  { value: "esgReporting", label: "ESG Reporting Help" },
  { value: "governance", label: "Governance Support" },
  { value: "networkAccess", label: "Network Access" },
  { value: "marketAccess", label: "Market Access" },
  { value: "development", label: "Market Development" },
  { value: "supply", label: "Supply Access" },
]

// Sector Experts options
const sectorExpertsOptions = [
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

// Preferred Engagement Method options
const preferredEngagementOptions = [
  { value: "intro", label: "Intro call, pitch, and farm/site visit" },
  { value: "pitch", label: "Pitch deck only" },
  { value: "referral", label: "Referral-based introductions" },
]

// Countries array
const countries = [
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

// South African provinces array
const saProvinces = [
  { value: "gauteng", label: "Gauteng" },
  { value: "western_cape", label: "Western Cape" },
  { value: "eastern_cape", label: "Eastern Cape" },
  { value: "kwazulu_natal", label: "KwaZulu-Natal" },
  { value: "free_state", label: "Free State" },
  { value: "north_west", label: "North West" },
  { value: "mpumalanga", label: "Mpumalanga" },
  { value: "limpopo", label: "Limpopo" },
  { value: "northern_cape", label: "Northern Cape" },
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

// Default empty fund template
const emptyFund = {
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
  saProvinces: [],
  roi: "",
  exitYear: "",
  support: [],
  // Team and Management
  investmentCommittee: "",
  sectorExperts: [],
  diStatement: "",
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
  // Matching criteria
  preferredMatchingCriteria: "",
  preferredEngagementMethod: "",
}

export default function ProductsServices({ data = {}, updateData }) {
  // Initialize with at least one fund by default
  useEffect(() => {
    if (!data.funds || data.funds.length === 0) {
      updateData({
        funds: [{ ...emptyFund }],
      })
    }
  }, [data, updateData])

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
      funds: [...funds, { ...emptyFund }],
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

        {/* Always display funds, even if empty array */}
        {(data.funds || []).map((fund, fundIndex) => (
          <div key={fundIndex} className={styles.fundCard}>
            <div className={styles.fundHeader}>
              <h5 className={styles.fundTitle}>Fund {fundIndex + 1}</h5>
              {/* Only show delete button if there's more than one fund */}
              {(data.funds || []).length > 1 && (
                <button type="button" onClick={() => removeFund(fundIndex)} className={styles.deleteButton}>
                  <Trash2 className={styles.icon} />
                </button>
              )}
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
                  type="number"
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
                  type="number"
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
                  type="number"
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

            {/* Show South African provinces only if South Africa is selected */}
            {fund.geographicFocus && fund.geographicFocus.includes("south_africa") && (
              <div className={styles.gridContainer}>
                <FormField label="South African Provinces">
                  <MultiSelect
                    options={saProvinces}
                    selected={fund.saProvinces || []}
                    onChange={(value) => updateFund(fundIndex, "saProvinces", value)}
                    label="Provinces"
                  />
                </FormField>
              </div>
            )}

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
                  type="number"
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
                  type="number"
                  value={fund.exitYear || ""}
                  onChange={(e) => updateFund(fundIndex, "exitYear", e.target.value)}
                  className={styles.formInput}
                  placeholder="e.g., 2028, 5 years"
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
                {fund.requiredDocuments && fund.requiredDocuments.includes("other") && (
                  <input
                    type="text"
                    value={fund.otherDocuments || ""}
                    onChange={(e) => updateFund(fundIndex, "otherDocuments", e.target.value)}
                    className={`${styles.formInput} mt-2`}
                    placeholder="Please specify which documents are needed"
                  />
                )}

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
            <div className={styles.sectionDivider}>
              <h5 className={styles.subSectionHeading}>Team and Management</h5>

              <div className={styles.gridContainer}>
                <FormField label="Investment Committee Members">
                  <input
                    type="text"
                    value={fund.investmentCommittee || ""}
                    onChange={(e) => updateFund(fundIndex, "investmentCommittee", e.target.value)}
                    className={styles.formInput}
                    placeholder="e.g., 4 (1 external agribusiness specialist)"
                  />
                </FormField>

                <FormField label="Sector Experts">
                  <MultiSelect
                    options={sectorExpertsOptions}
                    selected={fund.sectorExperts || []}
                    onChange={(value) => updateFund(fundIndex, "sectorExperts", value)}
                    label="Available for aquaculture, agritech, and horticulture"
                  />
                </FormField>
              </div>

              <div className={styles.gridContainer}>
                <FormField label="D&I Statement">
                  <input
                    type="text"
                    value={fund.diStatement || ""}
                    onChange={(e) => updateFund(fundIndex, "diStatement", e.target.value)}
                    className={styles.formInput}
                    placeholder="e.g., We prioritize inclusive innovation and rural development"
                  />
                </FormField>
              </div>
            </div>

            <div className={styles.sectionDivider}>
              <div className={styles.gridContainer}>
                <FormField label="Preferred Matching Criteria">
                  <input
                    type="text"
                    value={fund.preferredMatchingCriteria || ""}
                    onChange={(e) => updateFund(fundIndex, "preferredMatchingCriteria", e.target.value)}
                    className={styles.formInput}
                    placeholder="e.g., Impact alignment, sector expertise, viable go-to-market plan"
                  />
                </FormField>

                <FormField label="Preferred Engagement Method">
                  <select
                    value={fund.preferredEngagementMethod || ""}
                    onChange={(e) => updateFund(fundIndex, "preferredEngagementMethod", e.target.value)}
                    className={styles.formInput}
                  >
                    <option value="">Select</option>
                    {preferredEngagementOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
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
