"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Edit, Printer, ExternalLink, FileText, Mail, MapPin, Calendar, Briefcase, User, Heart, Share2, MessageSquare, X } from "lucide-react"
import "./investor-profile-summary.css"
import { useNavigate } from "react-router-dom"

const InvestorProfileSummary = ({ data, onEdit }) => {
  const navigate = useNavigate()
  const [expandedSections, setExpandedSections] = useState({
    entityOverview: false,
    productsServices: true, // Show investment offerings by default
    ownershipManagement: false,
    contactDetails: false,
    legalCompliance: false,
    howDidYouHear: false,
    declarationConsent: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const renderDocumentLink = (url, label = "View Document") => {
    if (!url) return <span className="text-gray-400">No document</span>
    
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm"
      >
        <FileText size={14} />
        <span>{label}</span>
        <ExternalLink size={12} />
      </a>
    )
  }

  const formatArray = (arr) => {
    if (!arr || !arr.length) return "Not specified"
    return arr.join(", ")
  }

  const handlePrint = () => {
    window.print()
  }

  // Calculate match percentage (simulated for demo)
  const matchPercentage = Math.floor(Math.random() * 41) + 60 // 60-100%

  return (
    <div className="profile-container">
      {/* Profile Header Card (Tinder-like) */}
      <div className="profile-header-card">
        <div className="profile-banner">
          {/* Placeholder for banner image */}
          <div className="banner-placeholder"></div>
          
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              <User size={40} className="text-white" />
            </div>
            <div className="match-badge">
              {matchPercentage}% Match
            </div>
          </div>
        </div>

        <div className="profile-info">
          <h1>{data.entityOverview?.tradingName || data.entityOverview?.registeredName || "Investor Profile"}</h1>
          
          <div className="profile-meta">
            <span className="flex items-center gap-1">
              <Briefcase size={14} />
              {data.entityOverview?.entityType || "Investment Firm"}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {data.entityOverview?.location || "Location not specified"}
            </span>
          </div>

          <p className="profile-bio">
            {data.entityOverview?.businessDescription || "No description provided"}
          </p>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">
                {data.productsServices?.funds?.length || 0}
              </span>
              <span className="stat-label">Funds</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {data.entityOverview?.yearsInOperation || "N/A"}
              </span>
              <span className="stat-label">Years Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {data.entityOverview?.employeeCount || "N/A"}
              </span>
              <span className="stat-label">Team</span>
            </div>
          </div>
        </div>

      </div>

      {/* Investment Offerings (Main Content) */}
      <div className="profile-content">
        <div className="section-card">
          <div 
            className="section-header"
            onClick={() => toggleSection("productsServices")}
          >
            <h2>
              <Briefcase size={18} className="mr-2" />
              Investment Offerings
            </h2>
            {expandedSections.productsServices ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {expandedSections.productsServices && (
            <div className="section-content">
              {data.productsServices?.funds?.length > 0 ? (
                <div className="funds-grid">
                  {data.productsServices.funds.map((fund, index) => (
                    <div key={index} className="fund-card">
                      <div className="fund-header">
                        <h3>{fund.name || `Fund ${index + 1}`}</h3>
                        <span className="fund-size">{fund.size || "Size not specified"}</span>
                      </div>

                      <div className="fund-details">
                        <div className="detail-item">
                          <span className="detail-label">Type:</span>
                          <span>{formatArray(fund.type)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Stages:</span>
                          <span>{formatArray(fund.stages)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Ticket Size:</span>
                          <span>
                            {fund.ticketMin || "N/A"} - {fund.ticketMax || "N/A"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Sectors:</span>
                          <div className="sectors-tags">
                            {fund.sectors?.map((sector, i) => (
                              <span key={i} className="sector-tag">{sector}</span>
                            )) || "Not specified"}
                          </div>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Support Offered:</span>
                          <div className="support-tags">
                            {fund.support?.map((item, i) => (
                              <span key={i} className="support-tag">{item}</span>
                            )) || "Not specified"}
                          </div>
                        </div>
                      </div>

                      <div className="fund-actions">
                        <button className="fund-action-btn">
                          Learn More
                        </button>
                        <button className="fund-action-btn primary">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No investment offerings listed</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Entity Overview Section */}
        <div className="section-card">
          <div 
            className="section-header"
            onClick={() => toggleSection("entityOverview")}
          >
            <h2>
              <User size={18} className="mr-2" />
              Company Details
            </h2>
            {expandedSections.entityOverview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {expandedSections.entityOverview && (
            <div className="section-content grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="detail-item">
                <span className="detail-label">Registered Name:</span>
                <span>{data.entityOverview?.registeredName || "Not provided"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Registration Number:</span>
                <span>{data.entityOverview?.registrationNumber || "Not provided"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Entity Type:</span>
                <span>{data.entityOverview?.entityType || "Not provided"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Entity Size:</span>
                <span>{data.entityOverview?.entitySize || "Not provided"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Employees:</span>
                <span>{data.entityOverview?.employeeCount || "Not provided"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Years Active:</span>
                <span>{data.entityOverview?.yearsInOperation || "Not provided"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span>{data.entityOverview?.location || "Not provided"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Investment Type:</span>
                <span>{data.entityOverview?.investmentType || "Not provided"}</span>
              </div>
              <div className="detail-item col-span-full">
                <span className="detail-label">Economic Sectors:</span>
                <div className="sectors-tags">
                  {data.entityOverview?.economicSectors?.map((sector, i) => (
                    <span key={i} className="sector-tag">{sector}</span>
                  )) || "Not provided"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Documents Section */}
        <div className="section-card">
          <div className="section-header">
            <h2>
              <FileText size={18} className="mr-2" />
              Key Documents
            </h2>
          </div>
          <div className="section-content">
            <div className="documents-grid">
              <div className="document-item">
                <FileText size={24} className="text-blue-500" />
                <div>
                  <h4>Fund Mandate</h4>
                  {renderDocumentLink(data.productsServices?.fundMandate)}
                </div>
              </div>
              <div className="document-item">
                <FileText size={24} className="text-blue-500" />
                <div>
                  <h4>Prospectus</h4>
                  {renderDocumentLink(data.productsServices?.fundProspectus)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="profile-footer-actions">
        <button 
          className="footer-btn secondary"
          onClick={() => navigate('/investor-dashboard')}
        >
          Back to Dashboard
        </button>
        <button 
          className="footer-btn primary"
          onClick={onEdit}
        >
          <Edit size={16} className="mr-2" />
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default InvestorProfileSummary