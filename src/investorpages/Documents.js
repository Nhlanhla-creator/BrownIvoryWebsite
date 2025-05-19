"use client"

import { useState,useEffect } from "react"
import { ChevronDown, ChevronUp, Edit, Printer,FileText,ExternalLink } from "lucide-react"
import "./investor-profile-summary.css"   
import { doc, getDoc, setDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { auth, db, storage } from ".././firebaseConfig"

const Documents = () => {

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

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
      const fetchData = async () => {
        const user = auth.currentUser
        if (!user) return
  
    
          setLoading(true)
          
          // First try to fetch from Firebase
          const docRef = doc(db, "MyuniversalProfiles", user.uid)
          const docSnap = await getDoc(docRef)
          
          let firebaseData = null
          let firebaseCompletedSections = null
          let firebaseSubmissionStatus = false
          
          if (docSnap.exists()) {
            const data = docSnap.data()
       
          
         setData(data.formData)
            
         
          }
          
          // If no Firebase data or incomplete, try loading from localStorage as backup
          if (!firebaseData || !firebaseSubmissionStatus) {
            const savedData = localStorage.getItem("investorProfileData")
            const savedCompletedSections = localStorage.getItem("investorProfileCompletedSections")
            const savedSubmissionStatus = localStorage.getItem("investorProfileSubmitted")
            
            // Only use localStorage data if we don't have Firebase data

            
            // Only use localStorage submission status if Firebase didn't have it marked as submitted
        
          }
        
      }
  
      fetchData()
    }, [])
  
  
  const [data,setData] = useState({})

  const [onEdit, setOnEdit] = useState(false)
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

  const handlePrint = () => {
    window.print()
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
         
              <div className="summary-item">
                <span className="summary-label">Company Logo:</span>
                <span className="summary-value">{renderDocumentLink(data.entityOverview?.companyLogo, "ID Document")}</span>
              </div>
            
        
        )}
      </div>

      {/* Ownership & Management Section */}
      <div className="summary-section">
       
      
        </div>
        {expandedSections.ownershipManagement && (
          <div className="summary-content">
 
              <span className="summary-label">Documents:</span>
              <span className="summary-value">
                <div>Certified IDs:{renderDocumentLink(data.ownershipManagement?.certifiedIDs, "ID Document")} </div>
                <div>Share Register: {renderDocumentLink(data.ownershipManagement?.shareRegister, "ID Document")}</div>
                <div>Registration Documents:  {renderDocumentLink(data.ownershipManagement?.registrationDocs, "ID Document")}</div>
              </span>
           
          </div>
        )}


      {/* Contact Details Section */}
      <div className="summary-section">
        <div className="summary-section-header" onClick={() => toggleSection("contactDetails")}>
          <h2>Contact Details</h2>
       
      
            <div className="summary-item mt-6">
              <span className="summary-label">Documents:</span>
              <span className="summary-value">
                <div>Proof of Address: {renderDocumentLink(data.contactDetails?.proofOfAddress, "ID Document")} </div>
              </span>
            </div>
          </div>
        
      </div>

      {/* Legal & Compliance Section */}
    
            <div className="summary-item mt-6">
              <span className="summary-label">Documents:</span>
              <span className="summary-value">
                <div>Tax Clearance Certificate: {renderDocumentLink(data.legalCompliance?.taxClearanceCert, "ID Document")} </div>
                <div>B-BBEE Certificate:  {renderDocumentLink(data.legalCompliance?.bbbeeCert, "ID Document")}</div>
                <div>Other Certificates:  {renderDocumentLink(data.legalCompliance?.otherCerts, "ID Document")}</div>
                <div>Industry Accreditations:  {renderDocumentLink(data.legalCompliance?.industryAccreditationDocs, "ID Document")}</div>
              </span>
            </div>
      

      {/* Products & Services Section */}
      <div className="summary-section">
     
        {expandedSections.productsServices && (
          <div className="summary-content">
          
            <div className="summary-item mt-6">
              <span className="summary-label">Documents:</span>
              <span className="summary-value">
                <div>Fund Mandate: {renderDocumentLink(data.productsServices?.fundMandate, "ID Document")}</div>
                <div>Prospectus:  {renderDocumentLink(data.productsServices?.fundProspectus, "ID Document")}</div>
              </span>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default Documents
