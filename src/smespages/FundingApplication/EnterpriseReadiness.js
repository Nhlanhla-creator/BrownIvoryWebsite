"use client"
import FormField from "./FormField"
import FileUpload from "./FileUpload"
import { barrierOptions } from "./applicationOptions"
import "./FundingApplication.css"

// Component for Enterprise Readiness
const EnterpriseReadiness = ({ data = {}, updateData }) => {
  const updateFormData = (section, newData) => {
    updateData({ ...data, [section]: { ...(data[section] || {}), ...newData } })
  }

  return renderEnterpriseReadiness(data.enterpriseReadiness || {}, (section, newData) =>
    updateFormData(section, newData),
  )
}

// Rendering function for Enterprise Readiness
export const renderEnterpriseReadiness = (data, updateFormData) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    updateFormData("enterpriseReadiness", { [name]: type === "checkbox" ? checked : value })
  }

  const handleMultiSelect = (e) => {
    const { value, checked } = e.target
    let barriers = [...(data.barriers || [])]

    if (checked) {
      barriers.push(value)
    } else {
      barriers = barriers.filter((item) => item !== value)
    }

    updateFormData("enterpriseReadiness", { barriers })
  }

  const handleFileChange = (name, files) => {
    updateFormData("enterpriseReadiness", { [name]: files })
  }

  // Check if "other" is selected in barriers
  const isOtherBarrierSelected = (data.barriers || []).includes("other")

  return (
    <>
      <h2>Enterprise Readiness</h2>

      <div className="grid-container">
        <div>
          <FormField label="Has Business Plan?" required>
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasBusinessPlan"
                  value="yes"
                  checked={data.hasBusinessPlan === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasBusinessPlan"
                  value="no"
                  checked={data.hasBusinessPlan === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
            {data.hasBusinessPlan === "yes" && (
              <div className="specification-field">
                <FileUpload
                  label="Upload Business Plan"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={(files) => handleFileChange("businessPlanFile", files)}
                  value={data.businessPlanFile || []}
                />
              </div>
            )}
          </FormField>

          <FormField label="Has Pitch Deck?" required>
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasPitchDeck"
                  value="yes"
                  checked={data.hasPitchDeck === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasPitchDeck"
                  value="no"
                  checked={data.hasPitchDeck === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
            {data.hasPitchDeck === "yes" && (
              <div className="specification-field">
                <FileUpload
                  label="Upload Pitch Deck"
                  accept=".pdf,.ppt,.pptx"
                  required
                  onChange={(files) => handleFileChange("pitchDeckFile", files)}
                  value={data.pitchDeckFile || []}
                />
              </div>
            )}
          </FormField>

          <FormField label="Has an MVP/prototype?" required>
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasMvp"
                  value="yes"
                  checked={data.hasMvp === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasMvp"
                  value="no"
                  checked={data.hasMvp === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
            {data.hasMvp === "yes" && (
              <div className="specification-field">
                <input
                  type="text"
                  name="mvpDetails"
                  value={data.mvpDetails || ""}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Please describe your MVP/prototype"
                />
              </div>
            )}
          </FormField>

          <FormField label="Has traction to date: Revenue to date, pilots/partnerships secured?" required>
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasTraction"
                  value="yes"
                  checked={data.hasTraction === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasTraction"
                  value="no"
                  checked={data.hasTraction === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
            {data.hasTraction === "yes" && (
              <div className="specification-field">
                <textarea
                  name="tractionDetails"
                  value={data.tractionDetails || ""}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Please provide details about your traction (revenue, partnerships, etc.)"
                  rows={3}
                ></textarea>
              </div>
            )}
          </FormField>
        </div>

        <div>
          <FormField label="Has Audited Financials?" required>
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasAuditedFinancials"
                  value="yes"
                  checked={data.hasAuditedFinancials === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasAuditedFinancials"
                  value="no"
                  checked={data.hasAuditedFinancials === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
            {data.hasAuditedFinancials === "yes" && (
              <div className="specification-field">
                <input
                  type="text"
                  name="auditedFinancialsDetails"
                  value={data.auditedFinancialsDetails || ""}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Please specify the period of your audited financials"
                />
              </div>
            )}
          </FormField>

          <FormField label="Has Mentor?" required>
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasMentor"
                  value="yes"
                  checked={data.hasMentor === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasMentor"
                  value="no"
                  checked={data.hasMentor === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
            {data.hasMentor === "yes" && (
              <div className="specification-field">
                <input
                  type="text"
                  name="mentorDetails"
                  value={data.mentorDetails || ""}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Please provide mentor's name and area of expertise"
                />
              </div>
            )}
          </FormField>

          <FormField label="Has advisors/board?" required>
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasAdvisors"
                  value="yes"
                  checked={data.hasAdvisors === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="hasAdvisors"
                  value="no"
                  checked={data.hasAdvisors === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
            {data.hasAdvisors === "yes" && (
              <>
                <div className="specification-field">
                  <textarea
                    name="advisorsDetails"
                    value={data.advisorsDetails || ""}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Please list your advisors/board members and their expertise"
                    rows={3}
                  ></textarea>
                </div>
                <FormField label="Do they meet regularly?" required>
                  <div className="radio-group">
                    <label className="form-radio-label">
                      <input
                        type="radio"
                        name="advisorsMeetRegularly"
                        value="yes"
                        checked={data.advisorsMeetRegularly === "yes"}
                        onChange={handleChange}
                        className="form-radio"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="form-radio-label">
                      <input
                        type="radio"
                        name="advisorsMeetRegularly"
                        value="no"
                        checked={data.advisorsMeetRegularly === "no"}
                        onChange={handleChange}
                        className="form-radio"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {data.advisorsMeetRegularly === "yes" && (
                    <div className="specification-field">
                      <input
                        type="text"
                        name="advisorsMeetingFrequency"
                        value={data.advisorsMeetingFrequency || ""}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="How often do they meet? (e.g., monthly, quarterly)"
                      />
                    </div>
                  )}
                </FormField>
              </>
            )}
          </FormField>
        </div>
      </div>

      <div className="form-field">
        <label className="form-field-label">Main Barriers to Growth (select all that apply)</label>
        <div className="checkbox-grid">
          {barrierOptions.map((option) => (
            <label key={option.value} className="form-checkbox-label">
              <input
                type="checkbox"
                name="barriers"
                value={option.value}
                checked={(data.barriers || []).includes(option.value)}
                onChange={handleMultiSelect}
                className="form-checkbox"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        {/* Add text field for "other" barrier specification */}
        {isOtherBarrierSelected && (
          <div className="mt-2">
            <input
              type="text"
              name="otherBarrierDetails"
              value={data.otherBarrierDetails || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="Please specify other barrier"
            />
          </div>
        )}
      </div>

      <div className="form-field">
        <FormField label="Support Previously Received" required>
          <div className="radio-group">
            <label className="form-radio-label">
              <input
                type="radio"
                name="previousSupport"
                value="yes"
                checked={data.previousSupport === "yes"}
                onChange={handleChange}
                className="form-radio"
              />
              <span>Yes</span>
            </label>
            <label className="form-radio-label">
              <input
                type="radio"
                name="previousSupport"
                value="no"
                checked={data.previousSupport === "no"}
                onChange={handleChange}
                className="form-radio"
              />
              <span>No</span>
            </label>
          </div>
        </FormField>

        {data.previousSupport === "yes" && (
          <div className="grid-container">
            <FormField label="What support?">
              <textarea
                name="previousSupportDetails"
                value={data.previousSupportDetails || ""}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Describe the support received"
              ></textarea>
            </FormField>

            <FormField label="From who? How much?">
              <textarea
                name="previousSupportSource"
                value={data.previousSupportSource || ""}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Source and amount of previous support"
              ></textarea>
            </FormField>
          </div>
        )}
      </div>

      <div className="form-field">
        <FormField label="Current paying customers?" required>
          <div className="radio-group">
            <label className="form-radio-label">
              <input
                type="radio"
                name="hasPayingCustomers"
                value="yes"
                checked={data.hasPayingCustomers === "yes"}
                onChange={handleChange}
                className="form-radio"
              />
              <span>Yes</span>
            </label>
            <label className="form-radio-label">
              <input
                type="radio"
                name="hasPayingCustomers"
                value="no"
                checked={data.hasPayingCustomers === "no"}
                onChange={handleChange}
                className="form-radio"
              />
              <span>No</span>
            </label>
          </div>
          {data.hasPayingCustomers === "yes" && (
            <div className="specification-field">
              <textarea
                name="payingCustomersDetails"
                value={data.payingCustomersDetails || ""}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Please provide details about your customers and revenue"
                rows={3}
              ></textarea>
            </div>
          )}
        </FormField>
      </div>

      <div className="section-divider">
        <h3>Required Documents</h3>

        <div className="grid-container">
          {/* <FileUpload
            label="Business Plan"
            accept=".pdf,.doc,.docx"
            onChange={(files) => handleFileChange("businessPlan", files)}
            value={data.businessPlan || []}
          /> */}
{/* 
          <FileUpload
            label="Pitch Deck"
            accept=".pdf,.ppt,.pptx"
            onChange={(files) => handleFileChange("pitchDeck", files)}
            value={data.pitchDeck || []}
          /> */}

          {/* Removed "Management Accounts or Latest Financials" document */}

          <FileUpload
            label="Previous Program Reports (if applicable)"
            accept=".pdf,.doc,.docx"
            onChange={(files) => handleFileChange("programReports", files)}
            value={data.programReports || []}
          />
        </div>
      </div>
    </>
  )
}

export default EnterpriseReadiness
