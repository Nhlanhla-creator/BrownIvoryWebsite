"use client"

import { useState, useEffect } from "react"
import { Eye, Check, X, CalendarCheck2, FileText, Send, AlertTriangle } from 'lucide-react'
import styles from "./investor-funding.module.css"
import { db } from "../../firebaseConfig"
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"

export function InvestorSMETable() {
  const [smes, setSmes] = useState([])
  const [selectedSME, setSelectedSME] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [message, setMessage] = useState("")
  const [meetingTime, setMeetingTime] = useState("")
  const [meetingLocation, setMeetingLocation] = useState("")
  const [meetingPurpose, setMeetingPurpose] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    const user = auth.currentUser
    
    if (!user) {
      setLoading(false)
      return
    }
    
    setLoading(true)
    
    const q = query(
      collection(db, "investorApplications"),
      where("funderId", "==", user.uid)
    )
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const applications = []
      querySnapshot.forEach((doc) => {
        applications.push({
          id: doc.id,
          ...doc.data()
        })
      })
      
      // Sort by application date (newest first)
      applications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setSmes(applications)
      setLoading(false)
    }, (error) => {
      console.error("Error fetching applications:", error)
      setNotification({
        type: "error",
        message: "Failed to load applications"
      })
      setLoading(false)
    })
    
    return () => unsubscribe()
  }, [])

  const handleUpdateStatus = async (id, status) => {
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
    
    try {
      const updateData = {
        status: status,
        responseMessage: message,
        updatedAt: new Date().toISOString()
      }
      
      if (status === "Approved") {
        updateData.meetingTime = meetingTime
        updateData.meetingLocation = meetingLocation
        updateData.meetingPurpose = meetingPurpose
      }
      
      await updateDoc(doc(db, "investorApplications", id), updateData)
      
      setNotification({
        type: "success",
        message: `Application ${status.toLowerCase()} successfully`
      })
      
      setTimeout(() => setNotification(null), 3000)
      resetModal()
    } catch (error) {
      console.error("Error updating application:", error)
      setNotification({
        type: "error",
        message: "Failed to update application"
      })
    } finally {
      setIsSubmitting(false)
    }
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
      case "Application Received":
        return `${baseClass} ${styles.statusPending}`
      default:
        return baseClass
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setFormErrors({...formErrors, message: "Please provide a message to the SME"})
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // In a real app, you might send this via email or store it separately
      setNotification({
        type: "success",
        message: "Message sent successfully"
      })
      
      setTimeout(() => setNotification(null), 3000)
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to send message"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleScheduleMeeting = async () => {
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
    
    try {
      // In a real app, you would integrate with a calendar API
      setNotification({
        type: "success",
        message: "Meeting scheduled successfully"
      })
      
      setTimeout(() => setNotification(null), 3000)
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to schedule meeting"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className={styles.loadingContainer}>Loading applications...</div>
  }

  return (
    <div className={styles.tableSection}>
      <h2 className={styles.sectionTitle}>SME Applications</h2>

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
            {smes.length === 0 ? (
              <tr>
                <td colSpan="10" className={styles.noApplications}>
                  No applications received yet
                </td>
              </tr>
            ) : (
              smes.map((sme) => (
                <tr key={sme.id}>
                  <td>{sme.smeName}</td>
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
                  <td>R{Number(sme.fundingNeeded).toLocaleString()}</td>
                  <td>{sme.applicationDate}</td>
                  <td>
                    <span className={getStatusBadgeClass(sme.status)}>
                      {sme.status}
                    </span>
                  </td>
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
              ))
            )}
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
            <p className={styles.modalSMEName}><strong>{selectedSME.smeName}</strong></p>

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
              <p><strong>Funding Needed:</strong> R{Number(selectedSME.fundingNeeded).toLocaleString()}</p>
              <p><strong>Match Percentage:</strong> {selectedSME.matchPercentage}%</p>
              <p><strong>Documents:</strong></p>
              <ul className={styles.documentList}>
                {selectedSME.documents?.map((doc, idx) => (
                  <li key={idx}>
                    <FileText size={14} className={styles.docIcon} />
                    <span>{doc}</span>
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
                    className={modalType === "approve" ? styles.approveBtn : styles.declineBtn}
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