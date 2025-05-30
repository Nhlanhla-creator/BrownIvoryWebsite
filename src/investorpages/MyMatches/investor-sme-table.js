"use client";

import { useState, useEffect } from "react";
import { Eye, Check, X, CalendarCheck2, FileText, Send, AlertTriangle, Info, ChevronDown } from 'lucide-react';
import styles from "./investor-funding.module.css";
import { db } from "../../firebaseConfig";
import { collection, query, where, onSnapshot, updateDoc, doc, getDoc, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { auth } from "../../firebaseConfig";

export function InvestorSMETable() {
  const [availabilities, setAvailabilities] = useState([]);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [tempDates, setTempDates] = useState([]);
  const [timeSlot, setTimeSlot] = useState({ start: '09:00', end: '17:00' });
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
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

  const loadApplicationAvailability = (application) => {
    if (application.availableDates) {
      const appAvailabilities = application.availableDates.map(avail => ({
        ...avail,
        date: new Date(avail.date) // Convert ISO string back to Date
      }));
      setAvailabilities(appAvailabilities);
    } else {
      setAvailabilities([]); // Start fresh for new applications
    }
  };

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
        const data = doc.data();

        // Convert availableDates back to Date objects if they exist
        if (data.availableDates) {
          data.availableDates = data.availableDates.map(avail => ({
            ...avail,
            date: new Date(avail.date) // Convert ISO string back to Date
          }));
        }

        applications.push({
          id: doc.id,
          ...data
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

  const handleDateSelect = (dates) => {
    setTempDates(dates || []);
  };

  const handleTimeChange = (field, value) => {
    setTimeSlot(prev => ({ ...prev, [field]: value }));
  };// In the saveSelectedDates function:


  const saveSelectedDates = async () => {
    const newAvailabilities = [
      ...availabilities,
      ...tempDates
        .filter(date => !availabilities.some(a => a.date.getTime() === date.getTime()))
        .map(date => ({
          date,
          timeSlots: [{ ...timeSlot }],
          timeZone,
          status: 'available' // Add status field
        }))
    ];

    setAvailabilities(newAvailabilities);

    // Save to Firebase
    if (selectedSME) {
      try {
        const availabilityData = newAvailabilities.map(avail => ({
          date: avail.date.toISOString(),
          timeSlots: avail.timeSlots,
          timeZone: avail.timeZone,
          status: avail.status // Include status in saved data
        }));

        await updateDoc(doc(db, "investorApplications", selectedSME.id), {
          availableDates: availabilityData,
          updatedAt: new Date().toISOString()
        });

        // Also update the SME side
        const investorAppSnap = await getDoc(doc(db, "investorApplications", selectedSME.id));
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
            availableDates: availabilityData,
            updatedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error("Error updating availabilities:", error);
        setNotification({
          type: "error",
          message: "Failed to update availability dates"
        });
      }
    }

    setTempDates([]);
    setShowCalendarModal(false);
  };

  const removeAvailability = async (dateToRemove) => {
    const updatedAvailabilities = availabilities.filter(item =>
      item.date.getTime() !== dateToRemove.getTime()
    );

    setAvailabilities(updatedAvailabilities);

    // Save to Firebase immediately for the current application
    if (selectedSME) {
      try {
        const availabilityData = updatedAvailabilities.map(avail => ({
          date: avail.date.toISOString(),
          timeSlots: avail.timeSlots,
          timeZone: avail.timeZone
        }));

        await updateDoc(doc(db, "investorApplications", selectedSME.id), {
          availableDates: availabilityData,
          updatedAt: new Date().toISOString()
        });

        // Also update the SME side
        const investorAppSnap = await getDoc(doc(db, "investorApplications", selectedSME.id));
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
            availableDates: availabilityData,
            updatedAt: new Date().toISOString()
          });
        }

      } catch (error) {
        console.error("Error updating availabilities:", error);
        setNotification({
          type: "error",
          message: "Failed to update availability dates"
        });
      }
    }
  };

  const hasAvailability = (sme) => {
    return sme.availableDates && sme.availableDates.length > 0;
  };

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
        // Convert dates to ISO strings for Firestore storage and save with this specific application
        const availabilityData = availabilities.map(avail => ({
          date: avail.date.toISOString(),
          timeSlots: avail.timeSlots,
          timeZone: avail.timeZone
        }));

        updateData.availableDates = availabilityData;
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
        const smeUpdateData = {
          status: status === "Approved" ? "Accepted" : status,
          updatedAt: new Date().toISOString()
        };

        // Add availability data to SME application as well
        if (status === "Approved") {
          smeUpdateData.availableDates = updateData.availableDates;
          smeUpdateData.meetingLocation = meetingLocation;
          smeUpdateData.meetingPurpose = meetingPurpose;
        }

        await updateDoc(smeDocRef, smeUpdateData);
      }


      if (status === "Approved" || status === "Declined") {
        let subject = status === "Approved" ? meetingPurpose : "Declined Application";
        let content;

        if (status === "Approved") {
          const rsvpLink = `${window.location.origin}/calendar`;

          content = `${message}

          Meeting Details:
          Time: click to RSVP (${rsvpLink})
          Location: ${meetingLocation}

          Available Meeting Dates for this application:
          ${availabilities
              .map((avail) => {
                try {
                  const dateStr = avail.date instanceof Date
                    ? avail.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                    : "Invalid Date";

                  const timeStr = avail.timeSlots?.[0]
                    ? `${avail.timeSlots[0].start} - ${avail.timeSlots[0].end} ${avail.timeZone}`
                    : "Time not specified";

                  return `${dateStr} (${timeStr})`;
                } catch (e) {
                  return "Invalid availability entry";
                }
              })
              .join('\n')}

        Please reply with your preferred meeting time from the above options.`;
        } else {
          content = message;
        }

        await addDoc(collection(db, "messages"), {
          to: smeId,
          from: funderId,
          subject,
          content,
          date: new Date().toISOString(),
          read: false,
          type: "inbox",
          applicationId: selectedSME.id, // Link message to specific application
          availableDates: status === "Approved" ? updateData.availableDates : null
        });

        await addDoc(collection(db, "messages"), {
          to: smeId,
          from: funderId,
          subject,
          content,
          date: new Date().toISOString(),
          read: true,
          type: "sent",
          applicationId: selectedSME.id, // Link message to specific application
          availableDates: status === "Approved" ? updateData.availableDates : null
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

  // In the InvestorSMETable component, update the getStatusBadgeClass function:
  const getStatusBadgeClass = (status) => {
    let baseClass = styles.statusBadge;

    switch (status) {
      case "Accepted":
      case "scheduled":
        return `${baseClass} ${styles.statusAccepted}`;
      case "Declined":
        return `${baseClass} ${styles.statusDeclined}`;
      case "Application Received":
        return `${baseClass} ${styles.statusPending}`;
      default:
        return baseClass;
    }
  };

  // And in the table rendering:


  // Add this function after your other handler functions (around line 300-400)

  const openModal = (sme, type) => {
    setSelectedSME(sme);
    setModalType(type);

    // Load availability data for this specific application
    if (type === "approve") {
      loadApplicationAvailability(sme);
    }

    // Reset form fields
    setMessage("");
    setMeetingTime("");
    setMeetingLocation("");
    setMeetingPurpose("");
    setFormErrors({});
    setDocumentFile(null);
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

    loadApplicationAvailability(sme);
  };

  const deriveNextStage = (stage) => {
    switch (stage) {
      case "Termsheet": return "Deal Closed";
      case "Deal Successful":
      case "Deal Declined":
      case "Deal Closed":
        return "N/A";
      default:
        return "Pending";
    }
  };

  const handleUpdateNextStage = async () => {
    const errors = {};

    if (!nextStage) {
      errors.nextStage = "Please select a next stage";
    }

    if (!message.trim()) {
      errors.message = "Please provide a message to the SME";
    }

    if (nextStage === "Under Review") {
      if (!availabilities.length) {
        errors.availabilities = "Please select at least one available date";
      }
      if (!meetingLocation.trim()) {
        errors.meetingLocation = "Please provide a meeting location";
      }
      if (!meetingPurpose.trim()) {
        errors.meetingPurpose = "Please provide a purpose for the meeting";
      }
    }

    if (nextStage === "Investor Feedback" && !meetingTime) {
      errors.meetingTime = "Please select a meeting time";
    }

    if (nextStage === "Investor Feedback" && !meetingLocation.trim()) {
      errors.meetingLocation = "Please provide a meeting location";
    }

    if (nextStage === "Investor Feedback" && !meetingPurpose.trim()) {
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
      const appRef = doc(db, "investorApplications", selectedSMEForStage.id);
      const nextStageValue = deriveNextStage(nextStage);

      await updateDoc(appRef, {
        stage: nextStage,
        nextStage: nextStageValue,
        pipelineStage: nextStage,
        updatedAt: new Date().toISOString()
      });

      const auth = getAuth();
      const user = auth.currentUser;
      const { smeId, funderId } = (await getDoc(appRef)).data();

      // Sync to SME side
      const smeQuery = query(
        collection(db, "smeApplications"),
        where("smeId", "==", smeId),
        where("funderId", "==", funderId)
      );
      const smeSnapshot = await getDocs(smeQuery);

      if (!smeSnapshot.empty) {
        const smeDocRef = smeSnapshot.docs[0].ref;

        await updateDoc(smeDocRef, {
          stage: nextStage,
          nextStage: nextStageValue,
          pipelineStage: nextStage,
          updatedAt: new Date().toISOString()
        });

        if (nextStage === "Under Review") {
          const availabilityData = availabilities.map(avail => ({
            date: avail.date.toISOString(),
            timeSlots: avail.timeSlots,
            timeZone: avail.timeZone,
            status: avail.status
          }));

          await updateDoc(appRef, {
            availableDates: availabilityData,
            meetingLocation,
            meetingPurpose
          });

          await updateDoc(smeDocRef, {
            availableDates: availabilityData,
            meetingLocation,
            meetingPurpose
          });

          // Add to calendar
          await addDoc(collection(db, "smeCalendarEvents"), {
            smeId,
            funderId: user.uid,
            title: meetingPurpose,
            date: availabilityData[0].date,
            location: meetingLocation,
            type: "meeting",
            createdAt: new Date().toISOString()
          });
        }
      }

      setUpdatedStages(prev => ({ ...prev, [selectedSMEForStage.id]: nextStage }));

      // Prepare message
      let subject = nextStage === "Termsheet" ? "Termsheet Shared" : `Application ${nextStage}`;
      let content = message;

      if (nextStage === "Under Review") {
        subject = meetingPurpose;
        const rsvpLink = `${window.location.origin}/calendar`;

        content += `

        Meeting Details:
        Time: [click to RSVP](${rsvpLink})
        Location: ${meetingLocation}

        Available Dates:
        ${availabilities
            .map(a =>
              new Date(a.date).toLocaleDateString('en-ZA', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }) + ` (${a.timeSlots?.[0]?.start} - ${a.timeSlots?.[0]?.end})`
            )
            .join("\n")}`;
      }

      // Send messages
      await Promise.all([
        addDoc(collection(db, "messages"), {
          to: smeId,
          from: user.uid,
          subject,
          content,
          date: new Date().toISOString(),
          read: false,
          type: "inbox"
        }),
        addDoc(collection(db, "messages"), {
          to: smeId,
          from: user.uid,
          subject,
          content,
          date: new Date().toISOString(),
          read: true,
          type: "sent"
        })
      ]);

      setNotification({ type: "success", message: `Application moved to ${nextStage} successfully` });
      setTimeout(() => setNotification(null), 3000);
      setShowNextStageModal(false);
    } catch (error) {
      console.error("Error updating next stage:", error);
      setNotification({ type: "error", message: "Failed to update next stage" });
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
                      {sme.status === "Approved"
                        ? "Accepted"
                        : sme.status === "scheduled"
                          ? "Meeting Scheduled"
                          : sme.status || "Pending"}
                    </span>
                  </td>

                  <td style={{ whiteSpace: "nowrap" }}>
                    {updatedStages[sme.id] ? (
                      <div className={styles.currentStageBadge}>
                        {updatedStages[sme.id]}
                      </div>
                    ) : (
                      <button
                        className={styles.actionBtn}
                        title="Set Stage"
                        onClick={() => handleNextStageChange(sme)}
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      className={styles.actionBtn}
                      title="Decline application"
                      onClick={() => openModal(sme, "decline")}
                      disabled={sme.status === "Declined"}
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

                      {showCalendarModal && (
                        <div className={styles.calendarModalOverlay} onClick={() => setShowCalendarModal(false)}>
                          <div className={styles.calendarModal} onClick={(e) => e.stopPropagation()}>
                            <h3>Select Available Meeting Dates</h3>
                            <div className={styles.timeSelection}>
                              <label>Available Time:</label>
                              <div className={styles.timeInputs}>
                                <input
                                  type="time"
                                  value={timeSlot.start}
                                  onChange={(e) => handleTimeChange('start', e.target.value)}
                                />
                                <span>to</span>
                                <input
                                  type="time"
                                  value={timeSlot.end}
                                  onChange={(e) => handleTimeChange('end', e.target.value)}
                                />
                              </div>
                            </div>
                            <DayPicker
                              mode="multiple"
                              selected={tempDates}
                              onSelect={handleDateSelect}
                              className="brown-calendar"
                            />
                            <div className={styles.modalActions}>
                              <button
                                type="button"
                                onClick={() => setShowCalendarModal(false)}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className={styles.acceptBtn}
                                onClick={saveSelectedDates}
                                disabled={!tempDates.length}
                              >
                                Save Dates
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={styles.availabilitySection}>
                      <label>Available Meeting Dates:</label>
                      <button
                        type="button"
                        className={styles.selectDatesBtn}
                        onClick={() => {
                          setTempDates([]);
                          setShowCalendarModal(true);
                        }}
                      >
                        + Select Available Dates
                      </button>

                      {availabilities.length > 0 && (
                        <div className={styles.availabilityList}>
                          {availabilities
                            .sort((a, b) => a.date - b.date)
                            .map((availability, index) => (
                              <div key={index} className={styles.availabilityItem}>
                                <span className={styles.availabilityDate}>
                                  {availability.date.toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                                <span className={styles.availabilityTime}>
                                  {availability.timeSlots[0].start} - {availability.timeSlots[0].end}
                                </span>
                                <button
                                  type="button"
                                  className={styles.removeBtn}
                                  onClick={() => removeAvailability(availability.date)}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                        </div>
                      )}

                      {formErrors.availabilities && (
                        <p className={styles.errorText}>
                          <AlertTriangle size={14} /> {formErrors.availabilities}
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
                <button className={`${styles.stageOption} ${nextStage === "Under Review" ? styles.active : ''}`}
                  onClick={() => setNextStage("Under Review")}>
                  Under Review
                </button>
                <button className={`${styles.stageOption} ${nextStage === "Termsheet" ? styles.active : ''}`}
                  onClick={() => setNextStage("Termsheet")}>
                  Termsheet
                </button>
                <button className={`${styles.stageOption} ${nextStage === "Deal Successful" ? styles.active : ''}`}
                  onClick={() => setNextStage("Deal Successful")}>
                  Deal Successful
                </button>
                <button className={`${styles.stageOption} ${nextStage === "Deal Declined" ? styles.active : ''}`}
                  onClick={() => setNextStage("Deal Declined")}>
                  Deal Declined
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

            {nextStage === "Under Review" && (
              <div className={styles.meetingFields}>
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

                  {showCalendarModal && (
                    <div className={styles.calendarModalOverlay} onClick={() => setShowCalendarModal(false)}>
                      <div className={styles.calendarModal} onClick={(e) => e.stopPropagation()}>
                        <h3>Select Available Meeting Dates</h3>
                        <div className={styles.timeSelection}>
                          <label>Available Time:</label>
                          <div className={styles.timeInputs}>
                            <input
                              type="time"
                              value={timeSlot.start}
                              onChange={(e) => handleTimeChange('start', e.target.value)}
                            />
                            <span>to</span>
                            <input
                              type="time"
                              value={timeSlot.end}
                              onChange={(e) => handleTimeChange('end', e.target.value)}
                            />
                          </div>
                        </div>
                        <DayPicker
                          mode="multiple"
                          selected={tempDates}
                          onSelect={handleDateSelect}
                          className="brown-calendar"
                        />
                        <div className={styles.modalActions}>
                          <button
                            type="button"
                            onClick={() => setShowCalendarModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className={styles.acceptBtn}
                            onClick={saveSelectedDates}
                            disabled={!tempDates.length}
                          >
                            Save Dates
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.availabilitySection}>
                  <label>Available Meeting Dates:</label>
                  <button
                    type="button"
                    className={styles.selectDatesBtn}
                    onClick={() => {
                      setTempDates([]);
                      setShowCalendarModal(true);
                    }}
                  >
                    + Select Available Dates
                  </button>

                  {availabilities.length > 0 && (
                    <div className={styles.availabilityList}>
                      {availabilities
                        .sort((a, b) => a.date - b.date)
                        .map((availability, index) => (
                          <div key={index} className={styles.availabilityItem}>
                            <span className={styles.availabilityDate}>
                              {availability.date.toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                            <span className={styles.availabilityTime}>
                              {availability.timeSlots[0].start} - {availability.timeSlots[0].end}
                            </span>
                            <button
                              type="button"
                              className={styles.removeBtn}
                              onClick={() => removeAvailability(availability.date)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                    </div>
                  )}

                  {formErrors.availabilities && (
                    <p className={styles.errorText}>
                      <AlertTriangle size={14} /> {formErrors.availabilities}
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