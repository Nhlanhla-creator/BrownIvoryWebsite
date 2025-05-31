import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import './MeetingDetails.css';

const MeetingDetails = ({ meeting, onAction, onClose }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [investorName, setInvestorName] = useState('');

  useEffect(() => {
    const fetchInvestorName = async () => {
      try {
        if (meeting?.funderId) {
          const investorRef = doc(db, "MyuniversalProfiles", meeting.funderId);
          const investorSnap = await getDoc(investorRef);
          if (investorSnap.exists()) {
            const data = investorSnap.data();
            const name = data?.formData?.entityOverview?.registeredName;
            setInvestorName(name || 'Investor');
          }
        }
      } catch (err) {
        console.error('Failed to fetch investor name:', err);
      }
    };

    fetchInvestorName();

    // Auto-select the first available slot if none is selected
    if (meeting?.slots?.length && !selectedSlot) {
      const firstAvailable = meeting.slots.find(slot => slot.status === 'available');
      if (firstAvailable) setSelectedSlot(firstAvailable);
    }
  }, [meeting]);

  const formatTimeSlot = (timeSlot) => {
    if (!timeSlot || !timeSlot.start || !timeSlot.end) return 'No time specified';
    return `${timeSlot.start} - ${timeSlot.end}`;
  };

  const formatDate = (date) => {
    if (!date) return 'No date specified';
    return date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleAccept = async () => {
    if (!selectedSlot) {
      showResponseMessage('Please select a time slot first');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      showResponseMessage('You must be logged in to confirm a meeting');
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Validate required data
      if (!selectedSlot?.date) throw new Error("Meeting date is missing");
      if (!selectedSlot?.timeSlots?.length) throw new Error("No time slots available");
      if (!meeting?.funderId) throw new Error("Investor reference missing");

      // Extract the original document ID from the slot ID
      const slotIdParts = selectedSlot.id.split('-');
      const calendarEventId = slotIdParts[0]; // Gets the document ID before the first hyphen

      // 2. Get the calendar event
      const calendarEventRef = doc(db, "smeCalendarEvents", calendarEventId);
      const calendarEventSnap = await getDoc(calendarEventRef);

      if (!calendarEventSnap.exists()) {
        throw new Error("Calendar event not found - please refresh and try again");
      }

      // 3. Prepare meeting confirmation data
      const updates = {
        status: "scheduled",
        scheduledDate: selectedSlot.date.toISOString(),
        scheduledTimeSlot: selectedSlot.timeSlots[0],
        updatedAt: new Date().toISOString(),
        // Mark other slots as not available
        availableDates: calendarEventSnap.data().availableDates.map(slot => ({
          ...slot,
          status: slot.date === selectedSlot.date.toISOString() ? "scheduled" : "unavailable"
        }))
      };

      // 4. Update calendar event
      await updateDoc(calendarEventRef, updates);

      // 5. Create confirmation message (matching your database format)
      const messageContent =
        `Your meeting with ${meeting.smeName || "an SME"} has been confirmed.\n\n` +
        `📅 Date: ${formatDate(selectedSlot.date)}\n` +
        `⏰ Time: ${formatTimeSlot(selectedSlot.timeSlots[0])} (${selectedSlot.timeZone})\n` +
        `📍 Location: ${meeting.location}\n\n` ;

      const confirmationMessage = {
        from: user.uid,
        fromName: meeting.smeName || "SME User",
        to: meeting.funderId,
        toName: investorName,
        subject: `Confirmed: ${meeting.title}`,
        content: messageContent,
        date: new Date().toISOString(),
        read: false,
        type: "inbox",
        meetingId: calendarEventId,
        timeZone: selectedSlot.timeZone
      };

      // 6. Send message to investor
      await addDoc(collection(db, "messages"), confirmationMessage);

      // 7. Update related applications if they exist
      try {
        const calendarData = calendarEventSnap.data();
        if (calendarData.smeAppId) {
          const smeAppRef = doc(db, "smeApplications", calendarData.smeAppId);
          await updateDoc(smeAppRef, {
            meetingStatus: "scheduled",
            lastUpdated: new Date().toISOString()
          });
        }

        if (calendarData.investorAppId) {
          const investorAppRef = doc(db, "investorApplications", calendarData.investorAppId);
          await updateDoc(investorAppRef, {
            meetingStatus: "scheduled",
            lastUpdated: new Date().toISOString()
          });
        }
      } catch (updateError) {
        console.log("Application updates not critical:", updateError);
      }

      // 8. Success
      showResponseMessage('Meeting confirmed! Investor notified.');
      if (onAction) {
        onAction(selectedSlot.id, 'scheduled');
      }
    } catch (error) {
      console.error("Error in handleAccept:", {
        error,
        meeting,
        selectedSlot,
        user: user?.uid
      });
      showResponseMessage(`Failed to confirm meeting: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = () => {
    showResponseMessage('Meeting declined.');
    if (onAction) {
      onAction(meeting.id, 'cancelled');
    }
  };

  const showResponseMessage = (message) => {
    setResponseMessage(message);
    setShowResponse(true);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="meeting-details-container">
      <div className="meeting-details-card">
        <div className="meeting-header">
          <h2>{meeting.title}</h2>
          <button className="close-btn" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#5A3921" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="meeting-content">
          <div className="meeting-info">
            <div className="info-row">
              <div className="info-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#8C6842" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Investor</span>
              </div>
              <div className="info-value">{investorName}</div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.657 16.657L13.414 20.9C13.039 21.2746 13.0306 21.4852 12.0005 21.4852C11.4704 21.4852 10.962 21.2746 10.587 20.9L6.343 16.657C5.22422 15.5382 4.46234 14.1127 4.15369 12.5609C3.84504 11.009 4.00349 9.4005 4.60901 7.93871C5.21452 6.47693 6.2399 5.22749 7.55548 4.34846C8.87107 3.46943 10.4178 3.00024 12 3.00024C13.5822 3.00024 15.1289 3.46943 16.4445 4.34846C17.7601 5.22749 18.7855 6.47693 19.391 7.93871C19.9965 9.4005 20.155 11.009 19.8463 12.5609C19.5377 14.1127 18.7758 15.5382 17.657 16.657Z" stroke="#8C6842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Location</span>
              </div>
              <div className="info-value">{meeting.location}</div>
            </div>

            <div className="info-row">
              <div className="info-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#8C6842" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Available Slots</span>
              </div>
              <div className="info-value slots-container">
                {meeting.slots.map((slot, index) => (
                  <div
                    key={index}
                    className={`time-slot ${selectedSlot?.id === slot.id ? 'selected' : ''} ${slot.status}`}
                    onClick={() => slot.status === 'available' && setSelectedSlot(slot)}
                  >
                    <div className="slot-date">{formatDate(slot.date)}</div>
                    <div className="slot-time">{formatTimeSlot(slot.timeSlots?.[0])} ({slot.timeZone})</div>
                    {slot.status === 'scheduled' && (
                      <div className="slot-status">Confirmed</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showResponse ? (
            <div className="response-message">
              <p>{responseMessage}</p>
              <button onClick={handleClose} className="close-message-btn">
                Close
              </button>
            </div>
          ) : (
            <div className="meeting-actions">
              <button
                className="accept-btn"
                onClick={handleAccept}
                disabled={isProcessing || !selectedSlot || selectedSlot.status !== 'available'}
              >
                {isProcessing ? 'Processing...' : 'Confirm Selected Slot'}
              </button>
              <button
                className="reject-btn"
                onClick={handleReject}
                disabled={isProcessing}
              >
                Decline All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;