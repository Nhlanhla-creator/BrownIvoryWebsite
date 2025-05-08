"use client"

import { FormField, FileUpload } from "./form-components"
import "./FundingApplication.css"

export default function GrowthPotential({ data, updateFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleFileChange = (name, files) => {
    updateFormData({ [name]: files })
  }

  return (
    <>
      <h2>Growth Potential</h2>

      <div className="grid-container">
        <div>
          <FormField label="Market Share - Will market shares be secured or increased for the entity?" required>
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="marketShare"
                  value="yes"
                  checked={data.marketShare === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="marketShare"
                  value="no"
                  checked={data.marketShare === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
          </FormField>

          <FormField
            label="Quality Improvement - Will prices be lowered and/or will the quality of the products increase for this project?"
            required
          >
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="qualityImprovement"
                  value="yes"
                  checked={data.qualityImprovement === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="qualityImprovement"
                  value="no"
                  checked={data.qualityImprovement === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
          </FormField>

          <FormField
            label="Green Technology and Resource Efficiency Improvements - Will the project improve environmental sustainability or resource efficiency?"
            required
          >
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="greenTech"
                  value="yes"
                  checked={data.greenTech === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="greenTech"
                  value="no"
                  checked={data.greenTech === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
          </FormField>

          <FormField
            label="Localisation - Would there be an increase in the localisation of production activities?"
            required
          >
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="localisation"
                  value="yes"
                  checked={data.localisation === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="localisation"
                  value="no"
                  checked={data.localisation === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
          </FormField>
        </div>

        <div>
          <FormField
            label="Regional Spread - Will this project be located in rural areas or areas with unemployment higher than 25%?"
            required
          >
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="regionalSpread"
                  value="yes"
                  checked={data.regionalSpread === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="regionalSpread"
                  value="no"
                  checked={data.regionalSpread === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
          </FormField>

          <FormField label="Personal Risk - Any financial and/or non-financial contribution to the business?" required>
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="personalRisk"
                  value="yes"
                  checked={data.personalRisk === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="personalRisk"
                  value="no"
                  checked={data.personalRisk === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
          </FormField>

          <FormField label="Empowerment - Achieve at least a level Three (3) B-BBEE contributor?" required>
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="empowerment"
                  value="yes"
                  checked={data.empowerment === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="empowerment"
                  value="no"
                  checked={data.empowerment === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
          </FormField>

          <FormField label="Employment – will this project increase direct and indirect labour?" required>
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="employment"
                  value="yes"
                  checked={data.employment === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="employment"
                  value="no"
                  checked={data.employment === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
          </FormField>

          {data.employment === "yes" && (
            <FormField label="By how much?">
              <input
                type="number"
                name="employmentIncrease"
                value={data.employmentIncrease || ""}
                onChange={handleChange}
                className="form-input"
                placeholder="Number of jobs"
              />
            </FormField>
          )}
        </div>
      </div>

      <div className="section-divider">
        <h3>Required Documents</h3>

        <FileUpload
          label="Support Letters / Endorsements (if any)"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          multiple
          onChange={(files) => handleFileChange("supportLetters", files)}
          value={data.supportLetters || []}
        />
      </div>
    </>
  )
}
