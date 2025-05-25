"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Edit ,FileText,ExternalLink} from 'lucide-react'
import "./UniversalProfile.css"

const ProfileSummary = ({ data, onEdit }) => {

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

  // Helper function to get label from value using options array
  const getLabelFromValue = (value, options) => {
    if (!value) return "Not specified"
    const option = options.find((opt) => opt.value === value)
    return option ? option.label : value
  }

  return (
    <div className="profileDetails">
      <div className="summary-header">
        <h1>Universal Profile Summary</h1>
        <button className="btn btn-primary" onClick={onEdit}>
          <Edit size={16} /> Edit Profile
        </button>
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
                <span className="summary-label">Financial Year End:</span>
                <span className="summary-value">{data.entityOverview?.financialYearEnd || "Not provided"}</span>
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
                <span className="summary-label">Target Market:</span>
                <span className="summary-value">{data.entityOverview?.targetMarket || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Location:</span>
                <span className="summary-value">{data.entityOverview?.location || "Not provided"}</span>
              </div>
              {data.entityOverview?.location === "south_africa" && (
                <div className="summary-item">
                  <span className="summary-label">Province:</span>
                  <span className="summary-value">{data.entityOverview?.province || "Not provided"}</span>
                </div>
              )}
              <div className="summary-item">
                <span className="summary-label">Business Description:</span>
                <span className="summary-value">{data.entityOverview?.businessDescription || "Not provided"}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Company Logo:</span>
                <span className="summary-value">
                  {data.entityOverview?.companyLogo ? "Uploaded" : "Not provided"}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Registration Certificate:</span>
                <span className="summary-value">
                 {renderDocumentLink(data.entityOverview?.registrationCertificate, "Document")}
                </span>
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
                <div>Certified IDs: {renderDocumentLink(data.ownershipManagement?.certifiedIds, "Document")}</div>
                <div>Share Register: {renderDocumentLink(data.ownershipManagement?.shareRegister, "Document")}</div>
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
                <span className="summary-value">{renderDocumentLink(data.contactDetails?.linkedin, "Link")}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Other Social Media:</span>
                <span className="summary-value"> {renderDocumentLink(data.contactDetails?.otherSocial, "Link")}</span>
              </div>
            </div>

            <div className="summary-item mt-6">
              <span className="summary-label">Documents:</span>
              <span className="summary-value">
                <div>Proof of Address:{renderDocumentLink(data.contactDetails?.proofOfAddress, "Document")}</div>
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
                <div>Other Certificates: {renderDocumentLink(data.legalCompliance?.otherCerts, "Document")}</div>
                <div>Industry Accreditations: {renderDocumentLink(data.legalCompliance?.industryAccreditationDocs, "Document")}</div>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Products & Services Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("productsServices")}>
          <h2>Products & Services</h2>
          {expandedSections.productsServices ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.productsServices && (
          <div className="summary-content">
            <div className="summary-item">
              <span className="summary-label">Entity Type:</span>
              <span className="summary-value">{data.productsServices?.entityType || "Not provided"}</span>
            </div>

            <h3 className="summary-subheading mt-6">Product Categories</h3>
            {data.productsServices?.productCategories && data.productsServices.productCategories.length > 0 ? (
              data.productsServices.productCategories.map((category, index) => (
                <div key={index} className="summary-category">
                  <h4 className="summary-category-name">{category.name || "Unnamed Category"}</h4>
                  {category.products && category.products.length > 0 ? (
                    <table className="summary-table">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.products.map((product, idx) => (
                          <tr key={idx}>
                            <td>{product.name || "Not provided"}</td>
                            <td>{product.description || "Not provided"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="summary-empty">No products in this category</p>
                  )}
                </div>
              ))
            ) : (
              <p className="summary-empty">No product categories provided</p>
            )}

            <h3 className="summary-subheading mt-6">Service Categories</h3>
            {data.productsServices?.serviceCategories && data.productsServices.serviceCategories.length > 0 ? (
              data.productsServices.serviceCategories.map((category, index) => (
                <div key={index} className="summary-category">
                  <h4 className="summary-category-name">{category.name || "Unnamed Category"}</h4>
                  {category.services && category.services.length > 0 ? (
                    <table className="summary-table">
                      <thead>
                        <tr>
                          <th>Service Name</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.services.map((service, idx) => (
                          <tr key={idx}>
                            <td>{service.name || "Not provided"}</td>
                            <td>{service.description || "Not provided"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="summary-empty">No services in this category</p>
                  )}
                </div>
              ))
            ) : (
              <p className="summary-empty">No service categories provided</p>
            )}

            <h3 className="summary-subheading mt-6">Key Clients/Customers</h3>
            {data.productsServices?.keyClients && data.productsServices.keyClients.length > 0 ? (
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Industry</th>
                  </tr>
                </thead>
                <tbody>
                  {data.productsServices.keyClients.map((client, index) => (
                    <tr key={index}>
                      <td>{client.name || "Not provided"}</td>
                      <td>{client.industry || "Not provided"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="summary-empty">No key clients provided</p>
            )}

            <div className="summary-item mt-6">
              <span className="summary-label">Documents:</span>
              <span className="summary-value">
                <div>Company Profile/Brochure:  {renderDocumentLink(data.productsServices?.companyProfile, "Document")}</div>
                <div>Client References:  {renderDocumentLink(data.productsServices?.clientReferences, "Document")}</div>
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
    </div>
  )
}

export default ProfileSummary