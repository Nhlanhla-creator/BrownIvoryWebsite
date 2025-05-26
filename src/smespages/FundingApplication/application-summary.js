"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Edit,ExternalLink ,FileText} from "lucide-react"
import "./application-summary.css";  
import { useNavigate } from "react-router-dom"

const ApplicationSummary = ({ formData, onEdit }) => {
    const navigate = useNavigate()

  
     const renderDocumentLink = (url, label = "View Document") => {
      if (!url) return "No document uploaded";
      
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="document-link">
          <FileText size={16} />
          <span>{label}</span>
          <ExternalLink size={14} />
        </a>
      );
    };
  
  const [expandedSections, setExpandedSections] = useState({
    applicationOverview: true,
    useOfFunds: false,
    enterpriseReadiness: false,
    financialOverview: false,
    growthPotential: false,
    socialImpact: false,
    declarationCommitment: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Helper function to format file names from arrays
  const formatFiles = (files) => {
    if (!files || !files.length) return "None"
    return files.map((file) => (typeof file === "string" ? file : file.name)).join(", ")
  }

  // Helper function to format arrays
  const formatArray = (arr) => {
    if (!arr || !arr.length) return "None"
    return arr.join(", ")
  }

  // Helper function to format boolean values
  const formatBoolean = (value) => (value ? "Yes" : "No")

  return (
    <div className="application-summary">
      <div className="summary-header">
        <h1>Application Summary</h1>
        <button className="btn btn-primary" onClick={onEdit}>
          <Edit size={16} /> Edit Application
        </button>
      </div>

    {/* Application Overview Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("applicationOverview")}>
          <h2>Application Overview</h2>
          {expandedSections.applicationOverview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.applicationOverview && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Application Date:</span>
                <span className="summary-value">{formData.applicationOverview?.applicationDate || "Not provided"}</span>

              </div>
         
              <div className="summary-item">
                <span className="summary-label">Application Type:</span>
                <span className="summary-value">{formData.applicationOverview?.applicationType || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Funding Stage:</span>
                <span className="summary-value">{formData.applicationOverview?.fundingStage || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">preferredStartDate:</span>
                <span className="summary-value">
                  {formData.applicationOverview?.preferredStartDate || "Not provided"}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Submission Channel:</span>
                <span className="summary-value">{formData.applicationOverview?.submissionChannel || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Support Format:</span>
                <span className="summary-value">{formData.applicationOverview?.supportFormat || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Urgency:</span>
                <span className="summary-value">{formData.applicationOverview?.urgency || "Not provided"}</span>
              </div>
              
             
            </div>
          </div>
        )}
      </div>
      {/* Use of Funds Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("useOfFunds")}>
          <h2>Use of Funds</h2>
          {expandedSections.useOfFunds ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.useOfFunds && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Amount Requested:</span>
                <span className="summary-value">R {formData.useOfFunds?.amountRequested || "0"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Personal Equity Contributed:</span>
                <span className="summary-value">R {formData.useOfFunds?.personalEquity || "0"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Funding Instruments Preferred:</span>
                <span className="summary-value">{formatArray(formData.useOfFunds?.fundingInstruments)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Type of Funder Preferred:</span>
                <span className="summary-value">{formatArray(formData.useOfFunds?.funderTypes)}</span>
              </div>
            </div>

            <h3 className="summary-subheading">Purpose of Funds</h3>
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Sub-area</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {formData.useOfFunds?.fundingItems?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.category}</td>
                    <td>{item.subArea}</td>
                    <td>{item.description}</td>
                    <td>R {item.amount}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan={3}>
                    <strong>Total:</strong>
                  </td>
                  <td>
                    <strong>
                      R{" "}
                      {formData.useOfFunds?.fundingItems
                        ?.reduce((sum, item) => sum + Number(item.amount || 0), 0)
                        .toLocaleString() || "0"}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="summary-item">
              <span className="summary-label">Documents:</span>
              <span className="summary-value">
                <div>Budget Documents: {renderDocumentLink(formData.useOfFunds?.budgetDocuments, "Document")} </div>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Enterprise Readiness Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("enterpriseReadiness")}>
          <h2>Enterprise Readiness</h2>
          {expandedSections.enterpriseReadiness ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.enterpriseReadiness && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Has Business Plan:</span>
                <span className="summary-value">{formData.enterpriseReadiness?.hasBusinessPlan || "No"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Has Pitch Deck:</span>
                <span className="summary-value">{formData.enterpriseReadiness?.hasPitchDeck || "No"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Has MVP/Prototype:</span>
                <span className="summary-value">{formData.enterpriseReadiness?.hasMvp || "No"}</span>
                {formData.enterpriseReadiness?.hasMvp === "yes" && (
                  <div className="summary-detail">{formData.enterpriseReadiness?.mvpDetails}</div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Has Traction:</span>
                <span className="summary-value">{formData.enterpriseReadiness?.hasTraction || "No"}</span>
                {formData.enterpriseReadiness?.hasTraction === "yes" && (
                  <div className="summary-detail">{formData.enterpriseReadiness?.tractionDetails}</div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Has Audited Financials:</span>
                <span className="summary-value">{formData.enterpriseReadiness?.hasAuditedFinancials || "No"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Has Mentor:</span>
                <span className="summary-value">{formData.enterpriseReadiness?.hasMentor || "No"}</span>
                {formData.enterpriseReadiness?.hasMentor === "yes" && (
                  <div className="summary-detail">{formData.enterpriseReadiness?.mentorDetails}</div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Has Advisors/Board:</span>
                <span className="summary-value">{formData.enterpriseReadiness?.hasAdvisors || "No"}</span>
                {formData.enterpriseReadiness?.hasAdvisors === "yes" && (
                  <div className="summary-detail">{formData.enterpriseReadiness?.advisorsDetails}</div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Main Barriers to Growth:</span>
                <span className="summary-value">{formatArray(formData.enterpriseReadiness?.barriers)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Support Previously Received:</span>
                <span className="summary-value">{formData.enterpriseReadiness?.previousSupport || "No"}</span>
                {formData.enterpriseReadiness?.previousSupport === "yes" && (
                  <div className="summary-detail">
                    <div>What: {formData.enterpriseReadiness?.previousSupportDetails}</div>
                    <div>From: {formData.enterpriseReadiness?.previousSupportSource}</div>
                  </div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Current Paying Customers:</span>
                <span className="summary-value">{formData.enterpriseReadiness?.hasPayingCustomers || "No"}</span>
                {formData.enterpriseReadiness?.hasPayingCustomers === "yes" && (
                  <div className="summary-detail">{formData.enterpriseReadiness?.payingCustomersDetails}</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Financial Overview Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("financialOverview")}>
          <h2>Financial Overview</h2>
          {expandedSections.financialOverview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.financialOverview && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Generates Revenue:</span>
                <span className="summary-value">{formData.financialOverview?.generatesRevenue || "No"}</span>
              </div>
              {formData.financialOverview?.generatesRevenue === "yes" && (
                <div className="summary-item">
                  <span className="summary-label">Annual Revenue:</span>
                  <span className="summary-value">R {formData.financialOverview?.annualRevenue || "0"}</span>
                </div>
              )}
              <div className="summary-item">
                <span className="summary-label">Current Valuation:</span>
                <span className="summary-value">
                  R {formData.financialOverview?.currentValuation || "Not provided"}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Profitability Status:</span>
                <span className="summary-value">
                  {formData.financialOverview?.profitabilityStatus || "Not provided"}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Existing Debt or Loans:</span>
                <span className="summary-value">R {formData.financialOverview?.existingDebt || "0"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Fundraising History:</span>
                <span className="summary-value">{formData.financialOverview?.fundraisingHistory || "None"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Documents:</span>
                <span className="summary-value">
                  <div>Bank Statements:  {renderDocumentLink(formData.financialOverview?.bankStatements, "Document")} </div>
                  <div>Bank Confirmation: {renderDocumentLink(formData.financialOverview?.bankConfirmation, "Document")} </div>
                  <div>Loan Agreements:  {renderDocumentLink(formData.financialOverview?.loanAgreements, "Document")} </div>
                  <div>Financial Statements:  {renderDocumentLink(formData.financialOverview?.financialStatements, "Document")} </div>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Growth Potential Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("growthPotential")}>
          <h2>Growth Potential</h2>
          {expandedSections.growthPotential ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.growthPotential && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Market Share:</span>
                <span className="summary-value">{formData.growthPotential?.marketShare || "No"}</span>
                {formData.growthPotential?.marketShare === "yes" && (
                  <div className="summary-detail">{formData.growthPotential?.marketShareDetails}</div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Quality Improvement:</span>
                <span className="summary-value">{formData.growthPotential?.qualityImprovement || "No"}</span>
                {formData.growthPotential?.qualityImprovement === "yes" && (
                  <div className="summary-detail">{formData.growthPotential?.qualityImprovementDetails}</div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Green Technology:</span>
                <span className="summary-value">{formData.growthPotential?.greenTech || "No"}</span>
                {formData.growthPotential?.greenTech === "yes" && (
                  <div className="summary-detail">{formData.growthPotential?.greenTechDetails}</div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Localisation:</span>
                <span className="summary-value">{formData.growthPotential?.localisation || "No"}</span>
                {formData.growthPotential?.localisation === "yes" && (
                  <div className="summary-detail">{formData.growthPotential?.localisationDetails}</div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Regional Spread:</span>
                <span className="summary-value">{formData.growthPotential?.regionalSpread || "No"}</span>
                {formData.growthPotential?.regionalSpread === "yes" && (
                  <div className="summary-detail">{formData.growthPotential?.regionalSpreadDetails}</div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Personal Risk:</span>
                <span className="summary-value">{formData.growthPotential?.personalRisk || "No"}</span>
                {formData.growthPotential?.personalRisk === "yes" && (
                  <div className="summary-detail">{formData.growthPotential?.personalRiskDetails}</div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Empowerment:</span>
                <span className="summary-value">{formData.growthPotential?.empowerment || "No"}</span>
                {formData.growthPotential?.empowerment === "yes" && (
                  <div className="summary-detail">{formData.growthPotential?.empowermentDetails}</div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Employment Increase:</span>
                <span className="summary-value">{formData.growthPotential?.employment || "No"}</span>
                {formData.growthPotential?.employment === "yes" && (
                  <div className="summary-detail">
                    <div>Direct Jobs: {formData.growthPotential?.employmentIncreaseDirect || "0"}</div>
                    <div>Indirect Jobs: {formData.growthPotential?.employmentIncreaseIndirect || "0"}</div>
                  </div>
                )}
              </div>
              <div className="summary-item">
                <span className="summary-label">Support Letters:</span>
                <span className="summary-value">{renderDocumentLink(formData.growthPotential?.supportLetters, "Document")}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Social Impact Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("socialImpact")}>
          <h2>Social Impact & Alignment</h2>
          {expandedSections.socialImpact ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.socialImpact && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Jobs to be Created (Next 12 months):</span>
                <span className="summary-value">{formData.socialImpact?.jobsToCreate || "0"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Youth Ownership %:</span>
                <span className="summary-value">{formData.socialImpact?.youthOwnership || "0"}%</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Women Ownership %:</span>
                <span className="summary-value">{formData.socialImpact?.womenOwnership || "0"}%</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Black Ownership %:</span>
                <span className="summary-value">{formData.socialImpact?.blackOwnership || "0"}%</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Environmental or Community Impact:</span>
                <span className="summary-value">{formData.socialImpact?.environmentalImpact || "None specified"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Alignment with SDGs or ESD priorities:</span>
                <span className="summary-value">{formData.socialImpact?.sdgAlignment || "None specified"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Impact Statement:</span>
                <span className="summary-value">{renderDocumentLink(formData.socialImpact?.impactStatement, "Document")}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Declaration & Commitment Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("declarationCommitment")}>
          <h2>Declaration & Commitment</h2>
          {expandedSections.declarationCommitment ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.declarationCommitment && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Confirmed Intent to Participate:</span>
                <span className="summary-value">{formatBoolean(formData.declarationCommitment?.confirmIntent)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Committed to Reporting Requirements:</span>
                <span className="summary-value">{formatBoolean(formData.declarationCommitment?.commitReporting)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Consented to Share Profile:</span>
                <span className="summary-value">{formatBoolean(formData.declarationCommitment?.consentShare)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
                 <div className="mt-6 text-center">
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}

export default ApplicationSummary