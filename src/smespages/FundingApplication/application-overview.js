"use client"

import { FormField } from "./form-components"
import { applicationType, businessFundingStage, urgencyOptions, supportFormatOptions } from "./form-options"
import "./FundingApplication.css"

export default function ApplicationOverview({ data, updateFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  return (
    <>
      <h2>Application Overview</h2>

      <div className="grid-container">
        <div>
          <FormField label="Application Type" required>
            <select
              name="applicationType"
              value={data.applicationType || ""}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Application Type</option>
              {applicationType.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Application Date" required>
            <input
              type="date"
              name="applicationDate"
              value={data.applicationDate || ""}
              onChange={handleChange}
              className="form-input"
              required
            />
          </FormField>

          <FormField label="Submission Channel" tooltip="Auto-filled based on how you're submitting this application">
            <input
              type="text"
              name="submissionChannel"
              value={data.submissionChannel || "Online Portal"}
              onChange={handleChange}
              className="form-input"
              disabled
            />
          </FormField>

          <FormField label="Business Funding Stage" required>
            <select
              name="fundingStage"
              value={data.fundingStage || ""}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Funding Stage</option>
              {businessFundingStage.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div>
          <FormField label="Urgency" required>
            <select name="urgency" value={data.urgency || ""} onChange={handleChange} className="form-select" required>
              <option value="">Select Urgency</option>
              {urgencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Preferred Start Date" required>
            <input
              type="date"
              name="preferredStartDate"
              value={data.preferredStartDate || ""}
              onChange={handleChange}
              className="form-input"
              required
            />
          </FormField>

          <FormField label="Preferred Support Format" required>
            <select
              name="supportFormat"
              value={data.supportFormat || ""}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Support Format</option>
              {supportFormatOptions.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </div>
    </>
  )
}
