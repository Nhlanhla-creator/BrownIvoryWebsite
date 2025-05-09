
import "./FundingApplication.css" ;

import { useState } from "react";
import FormField from "./FormField";
import FileUpload from "./FileUpload";
import { profitabilityOptions } from "./applicationOptions";

export const renderFinancialOverview = (data, updateFormData) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFormData("financialOverview", { [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (name, files) => {
    updateFormData("financialOverview", { [name]: files });
  };

  return (
    <>
      <h2>Financial Overview</h2>

      <div className="grid-container">
        <div>
          <FormField label="Do you currently generate revenue?" required>
            <div className="radio-group">
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="generatesRevenue"
                  value="yes"
                  checked={data.generatesRevenue === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>Yes</span>
              </label>
              <label className="form-radio-label">
                <input
                  type="radio"
                  name="generatesRevenue"
                  value="no"
                  checked={data.generatesRevenue === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span>No</span>
              </label>
            </div>
          </FormField>

          {data.generatesRevenue === "yes" && (
            <FormField label="Annual revenue" required>
              <input
                type="number"
                name="annualRevenue"
                value={data.annualRevenue || ""}
                onChange={handleChange}
                className="form-input"
                placeholder="R"
                required={data.generatesRevenue === "yes"}
              />
            </FormField>
          )}

          <FormField label="Current valuation (if known)">
            <input
              type="number"
              name="currentValuation"
              value={data.currentValuation || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="R"
            />
          </FormField>
        </div>

        <div>
          <FormField label="Profitability Status" required>
            <select
              name="profitabilityStatus"
              value={data.profitabilityStatus || ""}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Status</option>
              {profitabilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Existing Debt or Loans">
            <input
              type="number"
              name="existingDebt"
              value={data.existingDebt || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="R"
            />
          </FormField>

          <FormField label="Fundraising History">
            <textarea
              name="fundraisingHistory"
              value={data.fundraisingHistory || ""}
              onChange={handleChange}
              className="form-textarea"
              placeholder="List funders and funded amounts"
              rows={3}
            ></textarea>
          </FormField>
        </div>
      </div>

      <div className="section-divider">
        <h3>Required Documents</h3>

        <div className="grid-container">
          <FileUpload
            label="Bank Statements (6 months)"
            accept=".pdf,.csv,.xlsx,.xls"
            required
            onChange={(files) => handleFileChange("bankStatements", files)}
            value={data.bankStatements || []}
          />

          <FileUpload
            label="Bank Details Confirmation Letter"
            accept=".pdf,.jpg,.jpeg,.png"
            required
            onChange={(files) => handleFileChange("bankConfirmation", files)}
            value={data.bankConfirmation || []}
            tooltip="Official letter from your bank confirming account details"
          />

          <FileUpload
            label="Loan Agreements (if applicable)"
            accept=".pdf,.doc,.docx"
            onChange={(files) => handleFileChange("loanAgreements", files)}
            value={data.loanAgreements || []}
          />

          <FileUpload
            label="Financial Statements"
            accept=".pdf,.xlsx,.xls,.csv"
            required
            onChange={(files) => handleFileChange("financialStatements", files)}
            value={data.financialStatements || []}
          />
        </div>
      </div>
    </>
  );
};

const FinancialOverview = ({ data, updateData }) => {
  return renderFinancialOverview(data, updateData);
};

export default FinancialOverview;