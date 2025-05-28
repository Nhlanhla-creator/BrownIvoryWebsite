"use client";

import { useState, useEffect } from "react";
import { Eye, Check, X, CalendarCheck2, FileText, Send, AlertTriangle, Info, ChevronDown } from 'lucide-react';
import styles from "./investor-funding.module.css";
import { db } from "../../firebaseConfig";
import { collection, query, where, onSnapshot, updateDoc, doc, getDoc, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function InvestorSMETable() {
  const [smes, setSmes] = useState([]);
  const [selectedSME, setSelectedSME] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [message, setMessage] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [meetingPurpose, setMeetingPurpose] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextStage, setNextStage] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [showNextStageModal, setShowNextStageModal] = useState(false);
  const [selectedSMEForStage, setSelectedSMEForStage] = useState(null);
  const [updatedStages, setUpdatedStages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, "investorApplications"),
      where("funderId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const applications = [];
      querySnapshot.forEach((doc) => {
        applications.push({
          id: doc.id,
          ...doc.data()
        });
      });

      applications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setSmes(applications);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching applications:", error);
      setNotification({
        type: "error",
        message: "Failed to load applications"
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    if (status === "Declined") {
      const confirmDecline = window.confirm("Are you sure you want to decline this application? This action cannot be undone.");
      if (!confirmDecline) {
        return;
      }
    }

    if (modalType !== "view") {
      const errors = {};

      if (!message.trim()) {
        errors.message = "Please provide a message to the SME";
      }

      if (modalType === "approve" && !meetingTime) {
        errors.meetingTime = "Please select a meeting time";
      }

      if (modalType === "approve" && !meetingLocation.trim()) {
        errors.meetingLocation = "Please provide a meeting location";
      }

      if (modalType === "approve" && !meetingPurpose.trim()) {
        errors.meetingPurpose = "Please provide a purpose for the meeting";
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        status: status === "Approved" ? "Accepted" : status,
        responseMessage: message,
        updatedAt: new Date().toISOString(),
      };

      if (status === "Approved") {
        updateData.meetingTime = meetingTime;
        updateData.meetingLocation = meetingLocation;
        updateData.meetingPurpose = meetingPurpose;
      }

      await updateDoc(doc(db, "investorApplications", id), updateData);

      const investorAppSnap = await getDoc(doc(db, "investorApplications", id));
      const { smeId, funderId } = investorAppSnap.data();

      const smeQuery = query(
        collection(db, "smeApplications"),
        where("smeId", "==", smeId),
        where("funderId", "==", funderId)
      );

      const smeSnapshot = await getDocs(smeQuery);
      if (!smeSnapshot.empty) {
        const smeDocRef = smeSnapshot.docs[0].ref;
        await updateDoc(smeDocRef, { 
          status: status === "Approved" ? "Accepted" : status,
          updatedAt: new Date().toISOString() 
        });
      }

      if (status === "Approved" || status === "Declined") {
        let subject = status === "Approved" ? meetingPurpose : "Declined Application";
        let content = status === "Approved"
          ? `${message}\n\nMeeting Details:\nTime: ${meetingTime}\nLocation: ${meetingLocation}`
          : message;

        await addDoc(collection(db, "messages"), {
          to: smeId,
          from: funderId,
          subject,
          content,
          date: new Date().toISOString(),
          read: false,
          type: "inbox"
        });

        await addDoc(collection(db, "messages"), {
          to: smeId,
          from: funderId,
          subject,
          content,
          date: new Date().toISOString(),
          read: true,
          type: "sent"
        });
      }

      if (status === "Approved") {
        await addDoc(collection(db, "smeCalendarEvents"), {
          smeId,
          funderId,
          title: meetingPurpose,
          date: meetingTime,
          location: meetingLocation,
          type: "meeting",
          createdAt: new Date().toISOString()
        });
      }

      setNotification({
        type: "success",
        message: `Application ${status === "Approved" ? "accepted" : "declined"} successfully`,
      });

      setTimeout(() => setNotification(null), 3000);
      resetModal();
    } catch (error) {
      console.error("Error updating application:", error);
      setNotification({
        type: "error",
        message: "Failed to update application",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setSelectedSME(null);
    setModalType(null);
    setMessage("");
    setMeetingTime("");
    setMeetingLocation("");
    setMeetingPurpose("");
    setFormErrors({});
    setDocumentFile(null);
  };

  const getStatusBadgeClass = (status) => {
    let baseClass = styles.statusBadge;

    switch (status) {
      case "Accepted":
        return `${baseClass} ${styles.statusAccepted}`;
      case "Declined":
        return `${baseClass} ${styles.statusDeclined}`;
      case "Application Received":
        return `${baseClass} ${styles.statusPending}`;
      default:
        return baseClass;
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setFormErrors({ ...formErrors, message: "Please provide a message to the SME" });
      return;
    }

    setIsSubmitting(true);

    try {
      setNotification({
        type: "success",
        message: "Message sent successfully"
      });

      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to send message"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleMeeting = async () => {
    const errors = {};

    if (!meetingTime) {
      errors.meetingTime = "Please select a meeting time";
    }

    if (!meetingLocation.trim()) {
      errors.meetingLocation = "Please provide a meeting location";
    }

    if (!meetingPurpose.trim()) {
      errors.meetingPurpose = "Please provide a purpose for the meeting";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      setNotification({
        type: "success",
        message: "Meeting scheduled successfully"
      });

      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to schedule meeting"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStageChange = (sme) => {
    setSelectedSMEForStage(sme);
    setShowNextStageModal(true);
    setNextStage("");
    setMessage("");
    setMeetingTime("");
    setMeetingLocation("");
    setMeetingPurpose("");
    setFormErrors({});
    setDocumentFile(null);
  };

  const handleUpdateNextStage = async () => {
    const errors = {};

    if (!nextStage) {
      errors.nextStage = "Please select a next stage";
    }

    if (!message.trim()) {
      errors.message = "Please provide a message to the SME";
    }

    if ((nextStage === "Under Review" || nextStage === "Investor Feedback") && !meetingTime) {
      errors.meetingTime = "Please select a meeting time";
    }

    if ((nextStage === "Under Review" || nextStage === "Investor Feedback") && !meetingLocation.trim()) {
      errors.meetingLocation = "Please provide a meeting location";
    }

    if ((nextStage === "Under Review" || nextStage === "Investor Feedback") && !meetingPurpose.trim()) {
      errors.meetingPurpose = "Please provide a purpose for the meeting";
    }

    if (nextStage === "Termsheet" && !documentFile) {
      errors.documentFile = "Please attach a termsheet document";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await updateDoc(doc(db, "investorApplications", selectedSMEForStage.id), {
        stage: nextStage,
        updatedAt: new Date().toISOString(),
      });

      setUpdatedStages(prev => ({
        ...prev,
        [selectedSMEForStage.id]: nextStage
      }));

      const auth = getAuth();
      const user = auth.currentUser;
      const investorAppSnap = await getDoc(doc(db, "investorApplications", selectedSMEForStage.id));
      const { smeId } = investorAppSnap.data();

      let subject = "";
      let content = message;

      if (nextStage === "Under Review" || nextStage === "Investor Feedback") {
        subject = meetingPurpose;
        content += `\n\nMeeting Details:\nTime: ${meetingTime}\nLocation: ${meetingLocation}`;
      } else if (nextStage === "Termsheet") {
        subject = "Termsheet Shared";
        content += `\n\nPlease find attached termsheet document for your review.`;
      } else {
        subject = `Application ${nextStage}`;
      }

      await addDoc(collection(db, "messages"), {
        to: smeId,
        from: user.uid,
        subject,
        content,
        date: new Date().toISOString(),
        read: false,
        type: "inbox"
      });

      await addDoc(collection(db, "messages"), {
        to: smeId,
        from: user.uid,
        subject,
        content,
        date: new Date().toISOString(),
        read: true,
        type: "sent"
      });

      if (nextStage === "Under Review" || nextStage === "Investor Feedback") {
        await addDoc(collection(db, "smeCalendarEvents"), {
          smeId,
          funderId: user.uid,
          title: meetingPurpose,
          date: meetingTime,
          location: meetingLocation,
          type: "meeting",
          createdAt: new Date().toISOString()
        });
      }

      if (nextStage === "Termsheet" && documentFile) {
        console.log("Document to upload:", documentFile.name);
      }

      setNotification({
        type: "success",
        message: `Application moved to ${nextStage} successfully`,
      });

      setTimeout(() => setNotification(null), 3000);
      setShowNextStageModal(false);
    } catch (error) {
      console.error("Error updating next stage:", error);
      setNotification({
        type: "error",
        message: "Failed to update next stage",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Loading applications...</div>;
  }

  return (
    <div className={styles.tableSection}>
      <h2 className={styles.sectionTitle}>SMSE Applications</h2>

      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.fundingTable}>
          <thead>
            <tr>
              <th>SMSE Name</th>
              <th>Investment Type</th>
              <th>% Match</th>
              <th>Location</th>
              <th>Stage/Focus</th>
              <th>Sector</th>
              <th>Funding Needed</th>
              <th>Application Date</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Next Stage</th>
            </tr>
          </thead>
          <tbody>
            {smes.length === 0 ? (
              <tr>
                <td colSpan="11" className={styles.noApplications}>
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
                      {sme.status === "Approved" ? "Accepted" : sme.status}
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
                      title="Accept application"
                      onClick={() => { setSelectedSME(sme); setModalType("approve") }}
                      enabled={sme.status !== "Application Received"}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className={styles.actionBtn}
                      title="Decline application"
                      onClick={() => { setSelectedSME(sme); setModalType("decline") }}
                      enabled={sme.status !== "Application Received"}
                    >
                      <X size={16} />
                    </button>
                  </td>
                  <td>
                    {updatedStages[sme.id] ? (
                      <div className={styles.currentStageBadge}>
                        {updatedStages[sme.id]}
                      </div>
                    ) : (
                      <div className={styles.nextStageDropdown}>
                        <button 
                          className={styles.nextStageBtn}
                          onClick={() => handleNextStageChange(sme)}
                        >
                          Set Stage <ChevronDown size={14} />
                        </button>
                      </div>
                    )}
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
                ? "Accept Application"
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
                  <label>
                    Message to SME:
                    <div className={styles.tooltip}>
                      <Info size={14} className={styles.infoIcon} />
                      <span className={styles.tooltipText}>
                        {modalType === "approve" 
                          ? "Explain why you're accepting their application and provide next steps" 
                          : "Explain why you're declining their application and provide constructive feedback"}
                      </span>
                    </div>
                  </label>
                  <div className={styles.messageContainer}>
                    <textarea
                      className={`${styles.messageInput} ${formErrors.message ? styles.inputError : ''}`}
                      rows="4"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (e.target.value.trim()) {
                          setFormErrors({ ...formErrors, message: null });
                        }
                      }}
                      placeholder={
                        modalType === "approve"
                          ? "We're pleased to inform you that your application has been accepted. Please find the meeting details below..."
                          : "After careful consideration, we regret to inform you that your application hasn't been successful this time because..."
                      }
                    />
                    {message && (
                      <div className={styles.messagePreview}>
                        <strong>Preview:</strong> {message.substring(0, 100)}{message.length > 100 ? "..." : ""}
                      </div>
                    )}
                  </div>
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
                          setMeetingTime(e.target.value);
                          if (e.target.value) {
                            setFormErrors({ ...formErrors, meetingTime: null });
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
                          setMeetingLocation(e.target.value);
                          if (e.target.value.trim()) {
                            setFormErrors({ ...formErrors, meetingLocation: null });
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
                          setMeetingPurpose(e.target.value);
                          if (e.target.value.trim()) {
                            setFormErrors({ ...formErrors, meetingPurpose: null });
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
                    className={modalType === "approve" ? styles.acceptBtn : styles.declineBtn}
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
                        <CalendarCheck2 size={16} /> {modalType === "approve" ? "Schedule Meeting" : "Decline"}
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

      {showNextStageModal && selectedSMEForStage && (
        <div className={styles.modalOverlay} onClick={() => setShowNextStageModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Set Next Stage for {selectedSMEForStage.smeName}</h3>
            
            <div className={styles.stageSelection}>
              <div className={styles.stageOptions}>
                <button
                  className={`${styles.stageOption} ${nextStage === "Under Review" ? styles.active : ''}`}
                  onClick={() => setNextStage("Under Review")}
                >
                  Under Review
                </button>
                <button
                  className={`${styles.stageOption} ${nextStage === "Investor Feedback" ? styles.active : ''}`}
                  onClick={() => setNextStage("Investor Feedback")}
                >
                  Investor Feedback
                </button>
                <button
                  className={`${styles.stageOption} ${nextStage === "Termsheet" ? styles.active : ''}`}
                  onClick={() => setNextStage("Termsheet")}
                >
                  Termsheet
                </button>
                <button
                  className={`${styles.stageOption} ${nextStage === "Deal Successful" ? styles.active : ''}`}
                  onClick={() => setNextStage("Deal Successful")}
                >
                  Deal Successful
                </button>
                <button
                  className={`${styles.stageOption} ${nextStage === "Deal Declined" ? styles.active : ''}`}
                  onClick={() => setNextStage("Deal Declined")}
                >
                  Deal Declined
                </button>
                <button
                  className={`${styles.stageOption} ${nextStage === "Deal Closed" ? styles.active : ''}`}
                  onClick={() => setNextStage("Deal Closed")}
                >
                  Deal Closed
                </button>
              </div>
              {formErrors.nextStage && (
                <p className={styles.errorText}>
                  <AlertTriangle size={14} /> {formErrors.nextStage}
                </p>
              )}
            </div>

            <div className={styles.messageBox}>
              <label>Message to SME:</label>
              <textarea
                className={`${styles.messageInput} ${formErrors.message ? styles.inputError : ''}`}
                rows="4"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (e.target.value.trim()) {
                    setFormErrors({ ...formErrors, message: null });
                  }
                }}
                placeholder="Enter your message to the SME regarding this stage change..."
              />
              {formErrors.message && (
                <p className={styles.errorText}>
                  <AlertTriangle size={14} /> {formErrors.message}
                </p>
              )}
            </div>

            {(nextStage === "Under Review" || nextStage === "Investor Feedback") && (
              <div className={styles.meetingFields}>
                <div>
                  <label>Meeting Time:</label>
                  <input
                    type="datetime-local"
                    className={`${styles.meetingInput} ${formErrors.meetingTime ? styles.inputError : ''}`}
                    value={meetingTime}
                    onChange={(e) => {
                      setMeetingTime(e.target.value);
                      if (e.target.value) {
                        setFormErrors({ ...formErrors, meetingTime: null });
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
                      setMeetingLocation(e.target.value);
                      if (e.target.value.trim()) {
                        setFormErrors({ ...formErrors, meetingLocation: null });
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
                      setMeetingPurpose(e.target.value);
                      if (e.target.value.trim()) {
                        setFormErrors({ ...formErrors, meetingPurpose: null });
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

            {nextStage === "Termsheet" && (
              <div className={styles.documentUpload}>
                <label>
                  Attach Termsheet Document:
                  <input
                    type="file"
                    className={`${styles.fileInput} ${formErrors.documentFile ? styles.inputError : ''}`}
                    onChange={(e) => {
                      setDocumentFile(e.target.files[0]);
                      if (e.target.files[0]) {
                        setFormErrors({ ...formErrors, documentFile: null });
                      }
                    }}
                    accept=".pdf,.doc,.docx"
                  />
                </label>
                {formErrors.documentFile && (
                  <p className={styles.errorText}>
                    <AlertTriangle size={14} /> {formErrors.documentFile}
                  </p>
                )}
                {documentFile && (
                  <p className={styles.fileInfo}>Selected file: {documentFile.name}</p>
                )}
              </div>
            )}

            <div className={styles.modalActions}>
              <button
                className={styles.acceptBtn}
                onClick={handleUpdateNextStage}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className={styles.loadingSpinner}></span>
                ) : (
                  <>
                    <Check size={16} /> Update Stage
                  </>
                )}
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowNextStageModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}