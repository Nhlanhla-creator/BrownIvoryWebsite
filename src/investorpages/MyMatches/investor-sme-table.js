import { useState } from "react"
import { Eye, Check, X, CalendarCheck2, FileText, Send, AlertTriangle } from 'lucide-react'
import styles from "./investor-funding.module.css"

const demoSMEs = [
  {
    id: "1",
    name: "TechNova Ltd",
    investmentType: "Equity",
    matchPercentage: 85,
    location: "Cape Town",
    stage: "Seed",
    sector: "ICT",
    fundingNeeded: "R1,500,000",
    applicationDate: "2025-05-10",
    status: "Application Received",
    teamSize: "10-15",
    revenue: "R850,000",
    focusArea: "AI-driven education tools",
    documents: ["TechNova_PitchDeck.pdf", "TechNova_Financials.xlsx"]
  },
  {
    id: "2",
    name: "GreenHarvest",
    investmentType: "Debt",
    matchPercentage: 78,
    location: "Johannesburg",
    stage: "Growth",
    sector: "Agriculture",
    fundingNeeded: "R950,000",
    applicationDate: "2025-05-12",
    status: "Application Received",
    teamSize: "20-25",
    revenue: "R1,200,000",
    focusArea: "Vertical farming innovation",
    documents: ["GreenHarvest_BusinessPlan.pdf"]
  },
  {
    id: "3",
    name: "MediSure Health",
    investmentType: "Equity",
    matchPercentage: 92,
    location: "Durban",
    stage: "Early Growth",
    sector: "Healthcare",
    fundingNeeded: "R2,200,000",
    applicationDate: "2025-05-08",
    status: "Application Received",
    teamSize: "15-20",
    revenue: "R1,500,000",
    focusArea: "Telemedicine solutions",
    documents: ["MediSure_BusinessPlan.pdf", "MediSure_MarketAnalysis.pdf"]
  }
]

export function InvestorSMETable() {
  const [smes, setSmes] = useState(demoSMEs)
  const [selectedSME, setSelectedSME] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [message, setMessage] = useState("")
  const [meetingTime, setMeetingTime] = useState("")
  const [meetingLocation, setMeetingLocation] = useState("")
  const [meetingPurpose, setMeetingPurpose] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState(null)

  const handleUpdateStatus = (id, status) => {
    // Validate form if approving or declining
    if (modalType !== "view") {
      const errors = {}
      
      if (!message.trim()) {
        errors.message = "Please provide a message to the SME"
      }
      
      if (modalType === "approve" && !meetingTime) {
        errors.meetingTime = "Please select a meeting time"
      }
      
      if (modalType === "approve" && !meetingLocation.trim()) {
        errors.meetingLocation = "Please provide a meeting location"
      }
      
      if (modalType === "approve" && !meetingPurpose.trim()) {
        errors.meetingPurpose = "Please provide a purpose for the meeting"
      }
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors)
        return
      }
    }
    
    setIsSubmitting(true)
    
    // Simulate API call with timeout
    setTimeout(() => {
      const updated = smes.map((sme) =>
        sme.id === id ? { ...sme, status } : sme
      )
      setSmes(updated)
      
      // Show notification
      setNotification({
        type: status === "Approved" ? "success" : "info",
        message: `Application ${status.toLowerCase()} successfully`
      })
      
      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000)
      
      resetModal()
      setIsSubmitting(false)
    }, 800)
  }

  const resetModal = () => {
    setSelectedSME(null)
    setModalType(null)
    setMessage("")
    setMeetingTime("")
    setMeetingLocation("")
    setMeetingPurpose("")
    setFormErrors({})
  }

  const getStatusBadgeClass = (status) => {
    let baseClass = styles.statusBadge
    
    switch(status) {
      case "Approved":
        return `${baseClass} ${styles.statusApproved}`
      case "Declined":
        return `${baseClass} ${styles.statusDeclined}`
      default:
        return baseClass
    }
  }

  const handleSendMessage = () => {
    if (!message.trim()) {
      setFormErrors({...formErrors, message: "Please provide a message to the SME"})
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate sending message
    setTimeout(() => {
      setNotification({
        type: "success",
        message: "Message sent successfully"
      })
      
      setTimeout(() => setNotification(null), 3000)
      setIsSubmitting(false)
    }, 800)
  }

  const handleScheduleMeeting = () => {
    const errors = {}
    
    if (!meetingTime) {
      errors.meetingTime = "Please select a meeting time"
    }
    
    if (!meetingLocation.trim()) {
      errors.meetingLocation = "Please provide a meeting location"
    }
    
    if (!meetingPurpose.trim()) {
      errors.meetingPurpose = "Please provide a purpose for the meeting"
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate scheduling meeting
    setTimeout(() => {
      setNotification({
        type: "success",
        message: "Meeting scheduled successfully"
      })
      
      setTimeout(() => setNotification(null), 3000)
      setIsSubmitting(false)
    }, 800)
  }

  return (
    <div className={styles.tableSection}>
      <h2 className={styles.sectionTitle}>SMEs Applications</h2>

      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.fundingTable}>
          <thead>
            <tr>
              <th>SME Name</th>
              <th>Investment Type</th>
              <th>% Match</th>
              <th>Location</th>
              <th>Stage/Focus</th>
              <th>Sector</th>
              <th>Funding Needed</th>
              <th>Application Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {smes.map((sme) => (
              <tr key={sme.id}>
                <td>{sme.name}</td>
                <td>{sme.investmentType}</td>
                <td>
                  <div className={styles.matchPercentage}>
                    <div 
                      className={styles.matchBar} 
                      style={{ width: `${sme.matchPercentage}%` }}
                    ></div>
                    <span>{sme.matchPercentage}%</span>
                  </div>
                </td>
                <td>{sme.location}</td>
                <td>{sme.stage} / {sme.focusArea}</td>
                <td>{sme.sector}</td>
                <td>{sme.fundingNeeded}</td>
                <td>{sme.applicationDate}</td>
                <td><span className={getStatusBadgeClass(sme.status)}>{sme.status}</span></td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <button 
                    className={styles.actionBtn} 
                    title="View details"
                    onClick={() => { setSelectedSME(sme); setModalType("view") }}
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className={styles.actionBtn} 
                    title="Approve application"
                    onClick={() => { setSelectedSME(sme); setModalType("approve") }}
                    disabled={sme.status !== "Application Received"}
                  >
                    <Check size={16} />
                  </button>
                  <button 
                    className={styles.actionBtn} 
                    title="Decline application"
                    onClick={() => { setSelectedSME(sme); setModalType("decline") }}
                    disabled={sme.status !== "Application Received"}
                  >
                    <X size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSME && modalType && (
        <div className={styles.modalOverlay} onClick={resetModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>
              {modalType === "approve" 
                ? "Approve Application" 
                : modalType === "decline" 
                  ? "Decline Application" 
                  : "View SME Application"}
            </h3>
            <p className={styles.modalSMEName}><strong>{selectedSME.name}</strong></p>

            <div className={styles.profileDetails}>
              <div className={styles.profileGrid}>
                <div>
                  <p><strong>Sector:</strong> {selectedSME.sector}</p>
                  <p><strong>Stage:</strong> {selectedSME.stage}</p>
                  <p><strong>Focus Area:</strong> {selectedSME.focusArea}</p>
                </div>
                <div>
                  <p><strong>Location:</strong> {selectedSME.location}</p>
                  <p><strong>Revenue:</strong> {selectedSME.revenue}</p>
                  <p><strong>Team Size:</strong> {selectedSME.teamSize}</p>
                </div>
              </div>
              <p><strong>Funding Needed:</strong> {selectedSME.fundingNeeded}</p>
              <p><strong>Documents:</strong></p>
              <ul className={styles.documentList}>
                {selectedSME.documents.map((doc, idx) => (
                  <li key={idx}>
                    <FileText size={14} className={styles.docIcon} />
                    <a href={`/${doc}`} download>{doc}</a>
                  </li>
                ))}
              </ul>
            </div>

            {modalType !== "view" && (
              <>
                <div className={styles.messageBox}>
                  <label>Message to SME:</label>
                  <textarea
                    className={`${styles.messageInput} ${formErrors.message ? styles.inputError : ''}`}
                    rows="3"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                      if (e.target.value.trim()) {
                        setFormErrors({...formErrors, message: null})
                      }
                    }}
                    placeholder="Type your message here..."
                  />
                  {formErrors.message && (
                    <p className={styles.errorText}>
                      <AlertTriangle size={14} /> {formErrors.message}
                    </p>
                  )}
                </div>

                {modalType === "approve" && (
                  <div className={styles.meetingFields}>
                    <div>
                      <label>Meeting Time:</label>
                      <input
                        type="datetime-local"
                        className={`${styles.meetingInput} ${formErrors.meetingTime ? styles.inputError : ''}`}
                        value={meetingTime}
                        onChange={(e) => {
                          setMeetingTime(e.target.value)
                          if (e.target.value) {
                            setFormErrors({...formErrors, meetingTime: null})
                          }
                        }}
                      />
                      {formErrors.meetingTime && (
                        <p className={styles.errorText}>
                          <AlertTriangle size={14} /> {formErrors.meetingTime}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label>Meeting Location:</label>
                      <input
                        type="text"
                        className={`${styles.meetingInput} ${formErrors.meetingLocation ? styles.inputError : ''}`}
                        value={meetingLocation}
                        onChange={(e) => {
                          setMeetingLocation(e.target.value)
                          if (e.target.value.trim()) {
                            setFormErrors({...formErrors, meetingLocation: null})
                          }
                        }}
                        placeholder="e.g., Office, Virtual Meeting, etc."
                      />
                      {formErrors.meetingLocation && (
                        <p className={styles.errorText}>
                          <AlertTriangle size={14} /> {formErrors.meetingLocation}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label>Purpose of Meeting:</label>
                      <input
                        type="text"
                        className={`${styles.meetingInput} ${formErrors.meetingPurpose ? styles.inputError : ''}`}
                        value={meetingPurpose}
                        onChange={(e) => {
                          setMeetingPurpose(e.target.value)
                          if (e.target.value.trim()) {
                            setFormErrors({...formErrors, meetingPurpose: null})
                          }
                        }}
                        placeholder="e.g., Initial Discussion, Due Diligence, etc."
                      />
                      {formErrors.meetingPurpose && (
                        <p className={styles.errorText}>
                          <AlertTriangle size={14} /> {formErrors.meetingPurpose}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className={styles.modalActions}>
              {modalType !== "view" && (
                <>
                  <button 
                    className={styles.confirmBtn} 
                    onClick={handleSendMessage}
                    disabled={isSubmitting}
                  >
                    <Send size={16} /> Send Message
                  </button>
                  
                  {modalType === "approve" && (
                    <button 
                      className={styles.confirmBtn} 
                      onClick={handleScheduleMeeting}
                      disabled={isSubmitting}
                    >
                      <CalendarCheck2 size={16} /> Schedule Meeting
                    </button>
                  )}
                  
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleUpdateStatus(
                      selectedSME.id, 
                      modalType === "approve" ? "Approved" : "Declined"
                    )}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className={styles.loadingSpinner}></span>
                    ) : (
                      <>
                        <Check size={16} /> {modalType === "approve" ? "Approve" : "Decline"}
                      </>
                    )}
                  </button>
                </>
              )}
              <button 
                className={styles.cancelBtn} 
                onClick={resetModal}
                disabled={isSubmitting}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}