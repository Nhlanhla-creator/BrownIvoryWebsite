"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Edit, Printer, ExternalLink, FileText } from "lucide-react"
import "./investor-profile-summary.css"
import { useNavigate } from "react-router-dom"

const InvestorProfileSummary = ({ data, onEdit }) => {
  const navigate = useNavigate()

  const renderDocumentLink = (url, label = "View Document") => {
    if (!url) return "No document uploaded"
    
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="document-link">
        <FileText size={16} />
        <span>{label}</span>
        <ExternalLink size={14} />
      </a>
    )
  }

  const [expandedSections, setExpandedSections] = useState({
    entityOverview: true,
    ownershipManagement: false,
    contactDetails: false,
    legalCompliance: false,
    productsServices: false,
    howDidYouHear: false,
    declarationConsent: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const formatFiles = (files) => {
    if (!files || !files.length) return "None"
    return files.map((file) => (typeof file === "string" ? file : file.name)).join(", ")
  }

  const formatArray = (arr) => {
    if (!arr || !arr.length) return "None"
    return arr.join(", ")
  }

  const formatBoolean = (value) => (value ? "Yes" : "No")

  const getLabelFromValue = (value, options) => {
    if (!value) return "Not specified"
    const option = options.find((opt) => opt.value === value)
    return option ? option.label : value
  }

  const handlePrint = () => {
    // Force all sections open before printing
    setExpandedSections({
      entityOverview: true,
      ownershipManagement: true,
      contactDetails: true,
      legalCompliance: true,
      productsServices: true,
      howDidYouHear: true,
      declarationConsent: true,
    })
    
    // Wait a moment for state to update before printing
    setTimeout(() => {
      const printContent = document.querySelector('.investor-profile-summary').innerHTML
      const originalContent = document.body.innerHTML
      
      document.body.innerHTML = `
        <div class="print-container">
          ${printContent}
        </div>
      `
      window.print()
      document.body.innerHTML = originalContent
      window.location.reload()
    }, 100)
  }

  return (
    <div className="investor-profile-summary">
      <div className="summary-header">
        <h1>Investor Universal Profile Summary</h1>
        <div className="summary-actions">
          <button className="btn btn-secondary" onClick={handlePrint}>
            <Printer size={16} /> Print
          </button>
          <button className="btn btn-primary" onClick={onEdit}>
            <Edit size={16} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Entity Overview Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("entityOverview")}>
          <h2>Entity Overview</h2>
          {expandedSections.entityOverview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.entityOverview && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Registered Name:</span>
                <span className="summary-value">{data.entityOverview?.registeredName || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Trading Name:</span>
                <span className="summary-value">{data.entityOverview?.tradingName || "Same as registered name"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Registration Number:</span>
                <span className="summary-value">{data.entityOverview?.registrationNumber || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Entity Type:</span>
                <span className="summary-value">{data.entityOverview?.entityType || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Entity Size:</span>
                <span className="summary-value">{data.entityOverview?.entitySize || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Number of Employees:</span>
                <span className="summary-value">{data.entityOverview?.employeeCount || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Years in Operation:</span>
                <span className="summary-value">{data.entityOverview?.yearsInOperation || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Operation Stage:</span>
                <span className="summary-value">{data.entityOverview?.operationStage || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Economic Sectors:</span>
                <span className="summary-value">
                  {formatArray(data.entityOverview?.economicSectors) || "Not provided"}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Location:</span>
                <span className="summary-value">{data.entityOverview?.location || "Not provided"}</span>
              </div>
              {data.entityOverview?.location === "southAfrica" && (
                <div className="summary-item">
                  <span className="summary-label">Province:</span>
                  <span className="summary-value">{data.entityOverview?.province || "Not provided"}</span>
                </div>
              )}
              <div className="summary-item">
                <span className="summary-label">Deadline to Apply:</span>
                <span className="summary-value">{data.entityOverview?.deadline || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Average Response Time:</span>
                <span className="summary-value">{data.entityOverview?.responseTime || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Investment Type:</span>
                <span className="summary-value">{data.entityOverview?.investmentType || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Business Description:</span>
                <span className="summary-value">{data.entityOverview?.businessDescription || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Company Logo:</span>
                <span className="summary-value">{data.entityOverview?.companyLogo ? "Uploaded" : "Not provided"}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ownership & Management Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("ownershipManagement")}>
          <h2>Ownership & Management</h2>
          {expandedSections.ownershipManagement ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.ownershipManagement && (
          <div className="summary-content">
            <div className="summary-item">
              <span className="summary-label">Total Shares:</span>
              <span className="summary-value">{data.ownershipManagement?.totalShares || "Not provided"}</span>
            </div>

            <h3 className="summary-subheading">Shareholders</h3>
            {data.ownershipManagement?.shareholders && data.ownershipManagement.shareholders.length > 0 ? (
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID/Reg No.</th>
                    <th>Country</th>
                    <th>% Shareholding</th>
                    <th>Race</th>
                    <th>Gender</th>
                    <th>Youth</th>
                    <th>Disabled</th>
                  </tr>
                </thead>
                <tbody>
                  {data.ownershipManagement.shareholders.map((shareholder, index) => (
                    <tr key={index}>
                      <td>{shareholder.name || "Not provided"}</td>
                      <td>{shareholder.idRegNo || "Not provided"}</td>
                      <td>{shareholder.country || "Not provided"}</td>
                      <td>{shareholder.shareholding || "0"}%</td>
                      <td>{shareholder.race || "Not provided"}</td>
                      <td>{shareholder.gender || "Not provided"}</td>
                      <td>{formatBoolean(shareholder.isYouth)}</td>
                      <td>{formatBoolean(shareholder.isDisabled)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="summary-empty">No shareholders provided</p>
            )}

            <h3 className="summary-subheading mt-6">Directors</h3>
            {data.ownershipManagement?.directors && data.ownershipManagement.directors.length > 0 ? (
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Position</th>
                    <th>Nationality</th>
                    <th>Exec/Non-Exec</th>
                    <th>Race</th>
                    <th>Gender</th>
                    <th>Youth</th>
                    <th>Disabled</th>
                  </tr>
                </thead>
                <tbody>
                  {data.ownershipManagement.directors.map((director, index) => (
                    <tr key={index}>
                      <td>{director.name || "Not provided"}</td>
                      <td>{director.id || "Not provided"}</td>
                      <td>{director.position || "Not provided"}</td>
                      <td>{director.nationality || "Not provided"}</td>
                      <td>{director.execType || "Not provided"}</td>
                      <td>{director.race || "Not provided"}</td>
                      <td>{director.gender || "Not provided"}</td>
                      <td>{formatBoolean(director.isYouth)}</td>
                      <td>{formatBoolean(director.isDisabled)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="summary-empty">No directors provided</p>
            )}

            <div className="summary-item mt-6">
              <span className="summary-label">Documents:</span>
              <span className="summary-value">
                <div>Certified IDs:  {renderDocumentLink(data.ownershipManagement?.certifiedIDs, "Document")}</div>
                <div>Share Register: {renderDocumentLink(data.ownershipManagement?.shareRegister, "Document")} </div>
                <div>Registration Documents:{renderDocumentLink(data.ownershipManagement?.registrationDocs, "Document")}</div>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Contact Details Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("contactDetails")}>
          <h2>Contact Details</h2>
          {expandedSections.contactDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.contactDetails && (
          <div className="summary-content">
            <h3 className="summary-subheading">Primary Contact Person</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Title:</span>
                <span className="summary-value">{data.contactDetails?.contactTitle || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Name:</span>
                <span className="summary-value">{data.contactDetails?.contactName || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">ID Number:</span>
                <span className="summary-value">{data.contactDetails?.contactId || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Business Phone:</span>
                <span className="summary-value">{data.contactDetails?.businessPhone || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Mobile:</span>
                <span className="summary-value">{data.contactDetails?.mobile || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Email:</span>
                <span className="summary-value">{data.contactDetails?.email || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Website:</span>
                <span className="summary-value">{data.contactDetails?.website || "Not provided"}</span>
              </div>
            </div>

            <h3 className="summary-subheading mt-6">Address Information</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Physical Address:</span>
                <span className="summary-value">{data.contactDetails?.physicalAddress || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Postal Address:</span>
                <span className="summary-value">
                  {data.contactDetails?.sameAsPhysical
                    ? "Same as physical address"
                    : data.contactDetails?.postalAddress || "Not provided"}
                </span>
              </div>
            </div>

            <h3 className="summary-subheading mt-6">Social Media Links</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">LinkedIn:</span>
                <span className="summary-value"> {renderDocumentLink(data.contactDetails?.linkedin, "Link")}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Other Social Media:</span>
                <span className="summary-value">{renderDocumentLink(data.contactDetails?.otherSocial, "Link")}</span>
              </div>
            </div>

            <div className="summary-item mt-6">
              <span className="summary-label">Documents:</span>
              <span className="summary-value">
                <div>Proof of Address: {renderDocumentLink(data.contactDetails?.proofOfAddress, "Link")} </div>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Legal & Compliance Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("legalCompliance")}>
          <h2>Legal & Compliance</h2>
          {expandedSections.legalCompliance ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.legalCompliance && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Tax Number:</span>
                <span className="summary-value">{data.legalCompliance?.taxNumber || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Tax Clearance Number:</span>
                <span className="summary-value">{data.legalCompliance?.taxClearanceNumber || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Tax Clearance Expiry Date:</span>
                <span className="summary-value">{data.legalCompliance?.taxClearanceDate || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">VAT Number:</span>
                <span className="summary-value">{data.legalCompliance?.vatNumber || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">RSC Number:</span>
                <span className="summary-value">{data.legalCompliance?.rscNumber || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">UIF Number:</span>
                <span className="summary-value">{data.legalCompliance?.uifNumber || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">PAYE Number:</span>
                <span className="summary-value">{data.legalCompliance?.payeNumber || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">B-BBEE Level:</span>
                <span className="summary-value">{data.legalCompliance?.bbbeeLevel || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">B-BBEE Certificate Renewal Date:</span>
                <span className="summary-value">{data.legalCompliance?.bbbeeCertRenewalDate || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">CIPC Returns Status:</span>
                <span className="summary-value">{data.legalCompliance?.cipcStatus || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">POPIA Compliance:</span>
                <span className="summary-value">{data.legalCompliance?.popiaCompliance || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">AML/KYC Policy in Place:</span>
                <span className="summary-value">{data.legalCompliance?.amlKycPolicy || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">COIDA Number:</span>
                <span className="summary-value">{data.legalCompliance?.coidaNumber || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Industry Accreditations:</span>
                <span className="summary-value">{data.legalCompliance?.industryAccreditations || "None"}</span>
              </div>
            </div>

            <div className="summary-item mt-6">
              <span className="summary-label">Documents:</span>
              <span className="summary-value">
                <div>Tax Clearance Certificate: {renderDocumentLink(data.legalCompliance?.taxClearanceCert, "Document")}</div>
                <div>B-BBEE Certificate: {renderDocumentLink(data.legalCompliance?.bbbeeCert, "Document")}</div>
                <div>Other Certificates:  {renderDocumentLink(data.legalCompliance?.otherCerts, "Document")}</div>
                <div>Industry Accreditations: {renderDocumentLink(data.legalCompliance?.industryAccreditationDocs, "Document")}</div>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Products & Services Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("productsServices")}>
          <h2>Investment Offerings</h2>
          {expandedSections.productsServices ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.productsServices && (
          <div className="summary-content">
            <div className="summary-item">
              <span className="summary-label">Entity Type:</span>
              <span className="summary-value">{data.productsServices?.entityType || "Not provided"}</span>
            </div>

            {data.productsServices?.funds && data.productsServices.funds.length > 0 ? (
              data.productsServices.funds.map((fund, index) => (
                <div key={index} className="fund-summary">
                  <h3 className="summary-subheading">
                    Fund {index + 1}: {fund.name || "Unnamed Fund"}
                  </h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Fund Size:</span>
                      <span className="summary-value">{fund.size || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Fund Type:</span>
                      <span className="summary-value">{formatArray(fund.type)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Type of Funder:</span>
                      <span className="summary-value">{formatArray(fund.funderType)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Investment Instruments:</span>
                      <span className="summary-value">{formatArray(fund.instruments)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Target Enterprise Stage:</span>
                      <span className="summary-value">{formatArray(fund.stages)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Sector/Industry Focus:</span>
                      <span className="summary-value">{formatArray(fund.sectors)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Ticket Size Range:</span>
                      <span className="summary-value">
                        {fund.ticketMin || "Not specified"} to {fund.ticketMax || "Not specified"}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Geographic Focus:</span>
                      <span className="summary-value">{formatArray(fund.geographicFocus)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Support Offered Beyond Capital:</span>
                      <span className="summary-value">{formatArray(fund.support)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">ROI:</span>
                      <span className="summary-value">{fund.roi || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Exit Year:</span>
                      <span className="summary-value">{fund.exitYear || "Not provided"}</span>
                    </div>
                  </div>

                  <h4 className="summary-subheading">Program Details</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Program Type:</span>
                      <span className="summary-value">{fund.programType || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Sector Focus:</span>
                      <span className="summary-value">{formatArray(fund.sectorFocus)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Target Enterprise Type:</span>
                      <span className="summary-value">{formatArray(fund.targetEnterpriseType)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Support Offered:</span>
                      <span className="summary-value">{formatArray(fund.supportOffered)}</span>
                    </div>
                  </div>

                  <h4 className="summary-subheading">Investment Preferences</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Preferred Founder Profile:</span>
                      <span className="summary-value">{fund.preferredFounderProfile || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Investment Philosophy:</span>
                      <span className="summary-value">{fund.investmentPhilosophy || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Follow-On Funding:</span>
                      <span className="summary-value">{fund.followOnFunding || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Deal-breakers:</span>
                      <span className="summary-value">{fund.dealBreakers || "Not provided"}</span>
                    </div>
                  </div>

                  <h4 className="summary-subheading">Track Record</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Portfolio Companies:</span>
                      <span className="summary-value">{fund.portfolioCompanies || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Success Story:</span>
                      <span className="summary-value">{fund.successStory || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Investments to Date:</span>
                      <span className="summary-value">{fund.investmentsToDate || "Not provided"}</span>
                    </div>
                  </div>

                  <h4 className="summary-subheading">Due Diligence Requirements</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Required Documents:</span>
                      <span className="summary-value">{formatArray(fund.requiredDocuments)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Due Diligence Timeline:</span>
                      <span className="summary-value">{fund.dueDiligenceTimeline || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Decision-Making Process:</span>
                      <span className="summary-value">{fund.decisionMakingProcess || "Not provided"}</span>
                    </div>
                  </div>

                  <h4 className="summary-subheading">Team and Management</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Investment Committee Members:</span>
                      <span className="summary-value">{fund.investmentCommittee || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Sector Experts:</span>
                      <span className="summary-value">{formatArray(fund.sectorExperts)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">D&I Statement:</span>
                      <span className="summary-value">{fund.diStatement || "Not provided"}</span>
                    </div>
                  </div>

                  <h4 className="summary-subheading">Matching Criteria</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Preferred Matching Criteria:</span>
                      <span className="summary-value">{fund.preferredMatchingCriteria || "Not provided"}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Preferred Engagement Method:</span>
                      <span className="summary-value">{fund.preferredEngagementMethod || "Not provided"}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="summary-empty">No funds provided</p>
            )}

            <div className="summary-item mt-6">
              <span className="summary-label">Documents:</span>
              <span className="summary-value">
                <div>Fund Mandate: {renderDocumentLink(data.productsServices?.fundMandate, "Document")}</div>
                <div>Prospectus:  {renderDocumentLink(data.productsServices?.fundProspectus, "Document")}</div>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* How Did You Hear Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("howDidYouHear")}>
          <h2>How Did You Hear About Us</h2>
          {expandedSections.howDidYouHear ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.howDidYouHear && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Source:</span>
                <span className="summary-value">{data.howDidYouHear?.source || "Not provided"}</span>
              </div>

              {data.howDidYouHear?.source === "referral" && (
                <div className="summary-item">
                  <span className="summary-label">Referral Name:</span>
                  <span className="summary-value">{data.howDidYouHear?.referralName || "Not provided"}</span>
                </div>
              )}

              {data.howDidYouHear?.source === "partner_org" && (
                <div className="summary-item">
                  <span className="summary-label">Partner Organization:</span>
                  <span className="summary-value">{data.howDidYouHear?.partnerName || "Not provided"}</span>
                </div>
              )}

              {data.howDidYouHear?.source === "event" && (
                <div className="summary-item">
                  <span className="summary-label">Event Name:</span>
                  <span className="summary-value">{data.howDidYouHear?.eventName || "Not provided"}</span>
                </div>
              )}

              {data.howDidYouHear?.source === "other" && (
                <div className="summary-item">
                  <span className="summary-label">Other Source:</span>
                  <span className="summary-value">{data.howDidYouHear?.otherSource || "Not provided"}</span>
                </div>
              )}

              <div className="summary-item">
                <span className="summary-label">Additional Comments:</span>
                <span className="summary-value">{data.howDidYouHear?.additionalComments || "None"}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Declaration & Consent Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("declarationConsent")}>
          <h2>Declaration & Consent</h2>
          {expandedSections.declarationConsent ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.declarationConsent && (
          <div className="summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Declaration of Accuracy:</span>
                <span className="summary-value">{formatBoolean(data.declarationConsent?.accuracy)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Consent for Data Processing:</span>
                <span className="summary-value">{formatBoolean(data.declarationConsent?.dataProcessing)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Agreement to Terms & Conditions:</span>
                <span className="summary-value">{formatBoolean(data.declarationConsent?.termsConditions)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/investor-dashboard')}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}

export default InvestorProfileSummary