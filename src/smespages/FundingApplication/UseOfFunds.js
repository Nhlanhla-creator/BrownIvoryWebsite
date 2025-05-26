"use client"

import { useState } from "react"
import FormField from "./FormField"
import FileUpload from "./FileUpload"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import "./FundingApplication.css" // Regular CSS import

// Funding Instrument options
const fundingInstrumentOptions = [
   { value: "workingCapital", label: "Equity (Buying shares in the business)" },
  { value: "ventureCapital", label: "Debt (Loan-based funding)" },
  { value: "invoiceDiscounting", label: "Grants (Non-repayable funding)" },
  { value: "mezzanine", label: "Convertible Notes (Loan that can turn into shares)" },
  { value: "common_shares", label: "Revenue-based Financing" },
  { value: "preferred_shares", label: "Other (please specify)" },
]

// Type of Funder options
const funderTypeOptions = [
  { value: "equity", label: "Venture Capital" },
  { value: "debt", label: "Angel Investment" },
  { value: "grant", label: "Private Equity" },
  { value: "convertible", label: "Government Fund" },
  { value: "blended", label: "Grant / Non-Profit" },
  { value: "quasi", label: "Development Finance" },
  { value: "alternative", label: "Corporate Investment" },
 

  // Other
  { value: "other", label: "Other (specify)" },
]

// Funding Category options
const fundingCategoryOptions = [
  { value: "setup", label: "Set-Up" },
  { value: "capex", label: "Capex" },
  { value: "workingCapital", label: "Working Capital" },
  { value: "acquisition", label: "Acquisition" },
  { value: "businessDevelopment", label: "Business Development" },
  { value: "opex", label: "Opex" },
]

// Sub-area options based on category
const subAreaOptions = {
  setup: [{ value: "feasibility", label: "Feasibility" }],
  capex: [
    { value: "upgrade", label: "Upgrade" },
    { value: "expansion", label: "Expansion" },
    { value: "newEquipment", label: "New Equipment" },
    { value: "facilities", label: "Facilities" },
  ],
  workingCapital: [{ value: "bridgingFinance", label: "Bridging Finance" }],
  acquisition: [
    { value: "franchise", label: "Franchise" },
    { value: "assetAcquisition", label: "Asset Acquisition" },
  ],
  businessDevelopment: [
    { value: "productDesign", label: "Product Design & Development" },
    { value: "packagingDesign", label: "Packaging Design & Development" },
    { value: "conformityAssessment", label: "Conformity Assessment Certification" },
    { value: "itSystems", label: "IT Systems" },
    { value: "processOptimisation", label: "Process Optimisation" },
    { value: "patents", label: "Patents" },
    { value: "logistics", label: "Logistics" },
    { value: "salesMarketing", label: "Sales and Marketing" },
    { value: "postInvestment", label: "Post-investment Support" },
  ],
  opex: [
    { value: "salaries", label: "Salaries & Wages" },
    { value: "rent", label: "Rent & Utilities" },
    { value: "supplies", label: "Office Supplies" },
    { value: "marketing", label: "Marketing & Advertising" },
    { value: "insurance", label: "Insurance" },
    { value: "maintenance", label: "Maintenance & Repairs" },
    { value: "other", label: "Other Operating Expenses" },
  ],
}

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

  return (
    <div className="multi-select-container">
      <div className="multi-select-header" onClick={toggleDropdown}>
        {selected.length > 0 ? (
          <div className="selected-items">
            {getSelectedLabels().map((label) => (
              <span key={label} className="selected-item">
                {label}
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

// This is the function that was missing - adding it back as a named export
export const renderUseOfFunds = (data, updateFormData) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateFormData("useOfFunds", { [name]: value })
  }

  const handleFileChange = (name, files) => {
    updateFormData("useOfFunds", { [name]: files })
  }

  const addFundingItem = () => {
    const fundingItems = [...(data.fundingItems || [])]
    updateFormData("useOfFunds", {
      fundingItems: [...fundingItems, { category: "", subArea: "", description: "", amount: "" }],
    })
  }

  const updateFundingItem = (index, field, value) => {
    if (field === "amount" && isNaN(value)) return

    const fundingItems = [...(data.fundingItems || [])]
    fundingItems[index] = { ...fundingItems[index], [field]: value }
    updateFormData("useOfFunds", { fundingItems })
  }

  const removeFundingItem = (index) => {
    const fundingItems = [...(data.fundingItems || [])]
    fundingItems.splice(index, 1)
    updateFormData("useOfFunds", { fundingItems })
  }

  const getSubAreaOptions = (category) => {
    return subAreaOptions[category] || []
  }

  const calculateTotal = () => {
    return data.fundingItems?.reduce((sum, item) => sum + Number(item.amount || 0), 0) || 0
  }

  const handleMultiSelectChange = (field, value) => {
    updateFormData("useOfFunds", { [field]: value })
  }

  return (
    <>
      <h2>Use of Funds (If Funding)</h2>

      <div className="grid-container">
        <div>
          <FormField label="Amount Requested" required>
            <input
              type="number"
              name="amountRequested"
              value={data.amountRequested || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="R"
              required
            />
          </FormField>

          <FormField label="How much personal equity have you contributed?" required>
            <input
              type="number"
              name="personalEquity"
              value={data.personalEquity || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="R"
              required
            />
          </FormField>
        </div>

        <div>
          <FormField label="Funding Instrument Preferred" required>
            <MultiSelect
              options={fundingInstrumentOptions}
              selected={data.fundingInstruments || []}
              onChange={(value) => handleMultiSelectChange("fundingInstruments", value)}
              label="Funding Instruments"
            />
          </FormField>

          <FormField label="Type of Funder Preffered" required>
            <MultiSelect
              options={funderTypeOptions}
              selected={data.funderTypes || []}
              onChange={(value) => handleMultiSelectChange("funderTypes", value)}
              label="Funder Types"
            />
          </FormField>
        </div>
      </div>

      <div className="section-divider">
        <div className="flex-between">
          <h3>Purpose of Funds</h3>
          <button type="button" onClick={addFundingItem} className="add-button">
            <Plus size={16} /> Add Item
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Funding Category</th>
                <th>Sub-area</th>
                <th>Description</th>
                <th>Amount Required</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(data.fundingItems || []).map((item, index) => (
                <tr key={index}>
                  <td>
                    <select
                      value={item.category}
                      onChange={(e) => updateFundingItem(index, "category", e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select Category</option>
                      {fundingCategoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={item.subArea}
                      onChange={(e) => updateFundingItem(index, "subArea", e.target.value)}
                      className="form-select"
                      disabled={!item.category || !getSubAreaOptions(item.category).length}
                    >
                      <option value="">Select Sub-area</option>
                      {getSubAreaOptions(item.category).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateFundingItem(index, "description", e.target.value)}
                      className="form-textarea"
                      placeholder="Detailed description of how funds will be used"
                      rows={4}
                      style={{ minHeight: "100px" }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => updateFundingItem(index, "amount", e.target.value)}
                      className="form-input"
                      placeholder="R"
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => removeFundingItem(index)} className="delete-button">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan="3" className="text-right">
                  <strong>Total:</strong>
                </td>
                <td>
                  <strong>R {calculateTotal().toLocaleString()}</strong>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="section-divider">
        <h3>Required Documents</h3>

        <FileUpload
          label="5 Year Budget (Income Statement, Cashflows, Balance Sheet)"
          accept=".pdf,.xlsx,.xls,.doc,.docx"
          required
          onChange={(files) => handleFileChange("budgetDocuments", files)}
          value={data.budgetDocuments || []}
        />
      </div>
    </>
  )
}

// Default export component
const UseOfFunds = ({ data, updateData }) => {
  return renderUseOfFunds(data, updateData)
}

export default UseOfFunds
