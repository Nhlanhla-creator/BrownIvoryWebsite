"use client"
import { Plus, Trash2 } from "lucide-react"
import { FormField, FileUpload } from "./form-components"
import { fundingCategoryOptions, fundingInstrumentOptions, subAreaOptions } from "./form-options"
import "./FundingApplication.css"

export default function UseOfFunds({ data, updateFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleFileChange = (name, files) => {
    updateFormData({ [name]: files })
  }

  const addFundingItem = () => {
    const fundingItems = [...(data.fundingItems || [])]
    updateFormData({
      fundingItems: [...fundingItems, { category: "", subArea: "", description: "", amount: "" }],
    })
  }

  const updateFundingItem = (index, field, value) => {
    const fundingItems = [...(data.fundingItems || [])]
    fundingItems[index] = { ...fundingItems[index], [field]: value }
    updateFormData({ fundingItems })
  }

  const removeFundingItem = (index) => {
    const fundingItems = [...(data.fundingItems || [])]
    fundingItems.splice(index, 1)
    updateFormData({ fundingItems })
  }

  const getSubAreaOptions = (category) => {
    return subAreaOptions[category] || []
  }

  // Calculate total funds
  const calculateTotal = () => {
    return (data.fundingItems || []).reduce((total, item) => {
      const amount = Number.parseFloat(item.amount) || 0
      return total + amount
    }, 0)
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
            <select
              name="fundingInstrument"
              value={data.fundingInstrument || ""}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Funding Instrument</option>
              {fundingInstrumentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      <div className="section-divider">
        <div className="flex-between">
          <h3>Purpose of Funds</h3>
          <button type="button" onClick={addFundingItem} className="btn btn-secondary btn-sm btn-icon">
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
                      placeholder="Brief description"
                      rows={3}
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
                    <button type="button" onClick={() => removeFundingItem(index)} className="btn-danger">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} className="text-right" style={{ textAlign: "right", fontWeight: "bold" }}>
                  Total:
                </td>
                <td style={{ fontWeight: "bold" }}>R {calculateTotal().toLocaleString()}</td>
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
