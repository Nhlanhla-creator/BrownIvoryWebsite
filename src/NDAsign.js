import React, { useState, useRef, useEffect } from 'react';
import './signuppop.css';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
// Import jsPDF for PDF generation
import { jsPDF } from 'jspdf';

const NDASignupPopup = ({ onRegistrationComplete, registrationData }) => {
  // Extract registration data from props with default values to prevent undefined errors
  const initialUserInfo = {
    email: registrationData?.email || '',
    role: registrationData?.role || '',
    company: registrationData?.company || '',
    password: registrationData?.password || '', 
    uid: registrationData?.uid || '' 
  };

  const [showNDA, setShowNDA] = useState(true); // Start showing the NDA
  const [signatureData, setSignatureData] = useState(null);
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [savedNDA, setSavedNDA] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signedPdfUrl, setSignedPdfUrl] = useState(null);
  const canvasRef = useRef(null);
  const ndaContentRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDfcXO4GbNdPFY7qGbjwH1z3A78FwXiFAE",
    authDomain: "tuts-7ea8c.firebaseapp.com",
    projectId: "tuts-7ea8c",
    storageBucket: "tuts-7ea8c.appspot.com",
    messagingSenderId: "546514581101",
    appId: "1:546514581101:web:a34e661b6cad46f01db164",
    measurementId: "G-LK13NE8TBS",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const db = getFirestore(app);
  const firebaseAuth = getAuth(app);

  // Handle data passed from registration screen
  useEffect(() => {
    if (registrationData && Object.keys(registrationData).length > 0) {
      // Make sure to properly set userInfo with valid data or defaults
      setUserInfo({
        email: registrationData.email || '',
        role: registrationData.role || '',
        company: registrationData.company || '',
        password: registrationData.password || '',
        uid: registrationData.uid || ''
      });
      
      // Only show NDA if we have the required data
      if (registrationData.email && registrationData.role && registrationData.company) {
        setShowNDA(true);
      }
    }
  }, [registrationData]);
  
  // Handle NDA content scroll
  const handleScroll = () => {
    if (ndaContentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = ndaContentRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setIsScrolledToBottom(true);
      }
    }
  };

  // Canvas signature handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  // For touch devices
  const handleTouchStart = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const handleTouchMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      setSignatureData(canvas.toDataURL('image/png', 0.7)); // Compress the image
      setIsDrawing(false);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureData(null);
  };

  // Handle user registration and NDA submission
  const handleSubmitNDA = async () => {
    if (!signatureData) {
      alert('Please sign the document before submitting');
      return;
    }

    // Validate required fields before proceeding
    if (!userInfo.email || !userInfo.company || !userInfo.role) {
      setErrorMessage('Required information is missing. Please ensure all fields are filled.');
      return;
    }

    setLoading(true);
    
    try {
      let userId = userInfo.uid || null;
      
      // 1. If user already has a UID (from registration in parent component), use it
      // Otherwise create a new user account if registration data is provided
      if (!userId && userInfo.email && userInfo.password) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            firebaseAuth, 
            userInfo.email, 
            userInfo.password
          );
          
          userId = userCredential.user.uid;
          console.log("New user created with ID:", userId);
        } catch (error) {
          console.error("Error creating user:", error);
          setErrorMessage(`Registration failed: ${error.message}`);
          setLoading(false);
          return;
        }
      } else if (!userId) {
        // Use current authenticated user if available or generate temp ID
        userId = auth.currentUser?.uid || `temp_${Date.now()}`;
      }
      
      // 2. Create the signed document with user info and date
      const signedDate = new Date();
      const signedDocument = {
        userInfo: {
          email: userInfo.email,
          company: userInfo.company,
          role: userInfo.role
        },
        signature: signatureData, // Base64 data URL
        ndaContent: "KELE Mining Solutions NDA",
        dateSigned: signedDate.toISOString(),
      };

      // 3. Upload signature image to Storage
      const signatureRef = ref(storage, `ndas/${userId}/signature`);
      await uploadString(signatureRef, signatureData, 'data_url');
      
      // 4. Get the download URL for the signature
      const signatureUrl = await getDownloadURL(signatureRef);
      
      // 5. Save NDA document to Firestore with the signature URL
      const ndaDocData = {
        userInfo: {
          email: userInfo.email,
          company: userInfo.company,
          role: userInfo.role
        },
        signatureUrl,
        ndaContent: "KELE Mining Solutions NDA",
        dateSigned: signedDate.toISOString(),
      };
      
      await setDoc(doc(db, "ndas", userId), ndaDocData);
      
      // 6. Generate and save PDF
      signedDocument.signatureUrl = signatureUrl;
      setSavedNDA(signedDocument);
      
      // 7. Generate PDF immediately after signing
      const pdfBlob = await generateAndSavePDF(signedDocument, userId);
      
      // 8. Close NDA popup and complete registration
      setShowNDA(false);
      setRegistrationComplete(true);
      
      // 9. Notify parent component that registration is complete with PDF URL
      if (onRegistrationComplete && typeof onRegistrationComplete === 'function') {
        onRegistrationComplete({
          userId,
          userInfo: signedDocument.userInfo,
          ndaSigned: true,
          pdfUrl: signedPdfUrl,
          signatureUrl
        });
      }
    } catch (error) {
      console.error("Error saving NDA:", error);
      setErrorMessage(`Error saving NDA: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Improved function to create PDF from NDA content
  const generateAndSavePDF = async (ndaData, userId) => {
    setLoading(true);
    try {
      // Create new PDF with A4 dimensions
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10; // 10mm margin
      
      // Add a header to the PDF
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT', pageWidth / 2, margin + 10, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Between', pageWidth / 2, margin + 20, { align: 'center' });
      
      pdf.setFont('helvetica', 'bold');
      pdf.text('KELE MINING SOLUTIONS PROPRIETARY LIMITED', pageWidth / 2, margin + 30, { align: 'center' });
      
      pdf.setFont('helvetica', 'normal');
      pdf.text('(Registration Number: 2013/124544/07)', pageWidth / 2, margin + 40, { align: 'center' });
      
      pdf.text('AND', pageWidth / 2, margin + 50, { align: 'center' });
      
      pdf.setFont('helvetica', 'bold');
      pdf.text(ndaData.userInfo.company, pageWidth / 2, margin + 60, { align: 'center' });
      
      // Add Introduction section
      pdf.setFont('helvetica', 'bold');
      pdf.text('Introduction', margin, margin + 75);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      
      const introText = [
        "1. The parties wish to record the terms and conditions upon which the disclosing party shall disclose confidential",
        "information to the other, which terms and conditions shall constitute a binding and enforceable agreement between",
        "the parties and their agents.",
        "",
        "2. This agreement shall also bind the parties, notwithstanding the date of signature hereof, in the event that either",
        "party shall have disclosed any confidential information to the other party prior to date of signature hereof.",
        "",
        "3. For the purposes of this agreement the party which discloses confidential information shall be referred to as",
        "the disclosing party and the party which receives the confidential information shall be referred to as the receiving party",
      ];
      
      let yPosition = margin + 85;
      introText.forEach(line => {
        pdf.text(line, margin, yPosition);
        yPosition += 5; // 5mm line spacing
      });
      
      // Add Confidential Information section
      pdf.setFont('helvetica', 'bold');
      pdf.text('The Confidential Information', margin, yPosition + 5);
      
      pdf.setFont('helvetica', 'normal');
      const confInfoText = [
        "4. Confidential Information shall, for the purpose of this agreement include, without limitation, any technical",
        "commercial or scientific information, know-how, trade secrets, processes, machinery, designs, drawings, technical",
        "specifications, terms of agreements, details of investment strategies, organisational strategies or structure of either",
        "party, products or services offered by either party or any other matter which relates to the business of either party",
        "in respect of which information is not readily available in the normal course of business which may come to the",
        "knowledge of the other party in whatever form, disclosed to or assessed by either party during the course of his",
        "relationship with the other party."
      ];
      
      yPosition += 15;
      confInfoText.forEach(line => {
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      
      // Add Disclosure section
      pdf.setFont('helvetica', 'bold');
      pdf.text('Disclosure of confidential information', margin, yPosition + 5);
      
      pdf.setFont('helvetica', 'normal');
      const disclosureText = [
        "5. The disclosing party shall only disclose the confidential information to the receiving party to the extent deemed",
        "necessary or desirable by the disclosing party in its discretion.",
        "",
        "6. The receiving party acknowledges that the confidential information is a valuable, special and unique proprietary",
        "asset to the disclosing party.",
        "",
        "7. The receiving party agrees that it will not, during or after the course of their relationship and/or the term of this",
        "agreement as described in Clause 25, disclose the confidential information to any third party for any reason or",
        "purpose whatsoever without the prior written consent of the disclosing party, save in accordance with the provisions",
        "of this agreement. In this agreement third party means any party other than the parties."
      ];
      
      yPosition += 15;
      disclosureText.forEach(line => {
        // Check if we need a new page
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin + 10;
        }
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      
      // Add Term section
      pdf.setFont('helvetica', 'bold');
      
      // Check if we need a new page
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = margin + 10;
      } else {
        yPosition += 10;
      }
      
      pdf.text('Term', margin, yPosition);
      
      pdf.setFont('helvetica', 'normal');
      const termText = [
        "27. Subject to clause 2, this agreement shall commence upon the date of signature of the last signing party hereto",
        "(the effective date) and shall endure for a period of 12 (twelve) months (the term) thereafter, or for a period of one",
        "year from the date of the last disclosure of confidential information to the receiving party, whichever is the longer",
        "period, whether or not the parties continue to have any relationship for that period of time."
      ];
      
      yPosition += 10;
      termText.forEach(line => {
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      
      // Add Governing Law section
      pdf.setFont('helvetica', 'bold');
      
      // Check if we need a new page
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = margin + 10;
      } else {
        yPosition += 10;
      }
      
      pdf.text('Governing law', margin, yPosition);
      
      pdf.setFont('helvetica', 'normal');
      const lawText = [
        "36. This agreement and the relationship of the parties in connection with the subject matter of this agreement and",
        "each other shall be governed and determined in accordance with the laws of the Republic of South Africa."
      ];
      
      yPosition += 10;
      lawText.forEach(line => {
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      
      // Add note
      yPosition += 10;
      pdf.text('Note: This is a summarized version of the NDA. By signing below, you acknowledge that you have read and agree', margin, yPosition);
      yPosition += 5;
      pdf.text('to the full terms and conditions of the KELE Mining Solutions Non-Disclosure Agreement.', margin, yPosition);
      
      // Add a new page for signature if needed
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin + 10;
      } else {
        yPosition += 20;
      }
      
      // Add signature information
      pdf.setFont('helvetica', 'bold');
      pdf.text('Signed by:', margin, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(ndaData.userInfo.email, margin + 40, yPosition);
      
      yPosition += 10;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Company:', margin, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(ndaData.userInfo.company, margin + 40, yPosition);
      
      yPosition += 10;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Role:', margin, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(ndaData.userInfo.role, margin + 40, yPosition);
      
      yPosition += 10;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Date Signed:', margin, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(new Date(ndaData.dateSigned).toLocaleDateString(), margin + 40, yPosition);
      
      // Add signature image
      yPosition += 15;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Signature:', margin, yPosition);
      
      // Handle different signature sources
      const signatureSource = ndaData.signature || ndaData.signatureUrl;
      
      if (signatureSource) {
        yPosition += 5;
        try {
          // Draw signature on the PDF
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              try {
                // Calculate aspect ratio to fit signature within reasonable bounds
                const maxWidth = 80; // 80mm max width
                const aspectRatio = img.width / img.height;
                const width = Math.min(maxWidth, img.width / 4); // Adjust scale as needed
                const height = width / aspectRatio;
                
                // Add the image to the PDF
                pdf.addImage(img, 'PNG', margin, yPosition, width, height, null, 'FAST');
                resolve();
              } catch (e) {
                reject(e);
              }
            };
            img.onerror = reject;
            img.src = signatureSource;
          });
        } catch (err) {
          console.error("Error adding signature to PDF:", err);
        }
      }
      
      // Get the PDF as a blob with compression settings
      const pdfBlob = pdf.output('blob');
      
      // Store PDF in Firebase Storage
      // Create a reference to the PDF file location
      const pdfRef = ref(storage, `ndas/${userId}/signed_nda.pdf`);
      
      // Upload the PDF blob to Firebase Storage
      await uploadBytes(pdfRef, pdfBlob);
      
      // Get the download URL
      const pdfUrl = await getDownloadURL(pdfRef);
      
      // Update the NDA document in Firestore with the PDF URL
      await setDoc(doc(db, "ndas", userId), { 
        ...ndaData,
        pdfUrl,
        lastUpdated: new Date().toISOString()
      }, { merge: true });
      
      // Update local state
      const updatedNDA = { ...savedNDA, pdfUrl };
      setSavedNDA(updatedNDA);
      setSignedPdfUrl(pdfUrl);
      
      console.log("PDF saved to Firebase Storage:", pdfUrl);
      
      return pdfBlob;
    } catch (error) {
      console.error("Error generating and saving PDF:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toLocaleDateString();

  return (
    <div className="container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Processing document...</p>
        </div>
      )}
    
      {registrationComplete && savedNDA && (
        <div className="success-message">
          <h1>NDA Complete!</h1>
          <p>Thank you for signing the NDA agreement. Your document has been saved.</p>
          <div className="user-info-box">
            {/* Safely access user information */}
            <p><strong>Email:</strong> {savedNDA.userInfo?.email || 'N/A'}</p>
            <p><strong>Company:</strong> {savedNDA.userInfo?.company || 'N/A'}</p>
            <p><strong>Role:</strong> {savedNDA.userInfo?.role || 'N/A'}</p>
            <p><strong>Date Signed:</strong> {savedNDA.dateSigned ? new Date(savedNDA.dateSigned).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div className="button-group">
            {signedPdfUrl && (
              <a 
                href={signedPdfUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                View Signed NDA
              </a>
            )}
            <button 
              className="btn btn-success"
              onClick={() => {
                // Call onRegistrationComplete one more time as a safety measure
                if (onRegistrationComplete && typeof onRegistrationComplete === 'function') {
                  onRegistrationComplete({
                    userInfo: savedNDA.userInfo,
                    ndaSigned: true,
                    pdfUrl: signedPdfUrl
                  });
                }
              }}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* NDA Popup Dialog - Always visible until registrationComplete is true */}
      {showNDA && !registrationComplete && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Confidentiality and Non-Disclosure Agreement</h2>
            </div>
            
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
            
            <div 
              ref={ndaContentRef}
              onScroll={handleScroll}
              className="nda-content"
            >
              <div className="nda-title">
                <h3>CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT</h3>
                <p>Between</p>
                <p className="company-name">Brown Ivory Group</p>
                <p>(Registration Number: 2013/124544/07)</p>
                <p>AND</p>
                <p className="company-name">{userInfo.company || '[Company Name]'}</p>
              </div>
              
              <h4>Introduction</h4>
              <ol>
                <li>The parties wish to record the terms and conditions upon which the disclosing party shall disclose confidential information to the other, which terms and conditions shall constitute a binding and enforceable agreement between the parties and their agents.</li>
                <li>This agreement shall also bind the parties, notwithstanding the date of signature hereof, in the event that either party shall have disclosed any confidential information to the other party prior to date of signature hereof.</li>
                <li>For the purposes of this agreement the party which discloses confidential information shall be referred to as "the disclosing party" and the party which receives the confidential information shall be referred to as "the receiving party".</li>
              </ol>
              
              <h4>The Confidential Information</h4>
              <ol start="4">
                <li>"Confidential Information" shall, for the purpose of this agreement include, without limitation, any technical, commercial or scientific information, know-how, trade secrets, processes, machinery, designs, drawings, technical specifications, terms of agreements, details of investment strategies, organisational strategies or structure of either party, products or services offered by either party or any other matter which relates to the business of either party in respect of which information is not readily available in the normal course of business which may come to the knowledge of the other party in whatever form, disclosed to or assessed by either party during the course of his relationship with the other party.</li>
              </ol>
              
              <h4>Disclosure of confidential information</h4>
              <ol start="5">
                <li>The disclosing party shall only disclose the confidential information to the receiving party to the extent deemed necessary or desirable by the disclosing party in its discretion.</li>
                <li>The receiving party acknowledges that the confidential information is a valuable, special and unique proprietary asset to the disclosing party.</li>
                <li>The receiving party agrees that it will not, during or after the course of their relationship and/or the term of this agreement as described in Clause 25, disclose the confidential information to any third party for any reason or purpose whatsoever without the prior written consent of the disclosing party, save in accordance with the provisions of this agreement. In this agreement "third party" means any party other than the parties.</li>
              </ol>
              
              <h4>Term</h4>
              <ol start="27">
                <li>Subject to clause 2, this agreement shall commence upon the date of signature of the last signing party hereto ("the effective date") and shall endure for a period of 12 (twelve) months ("the term") thereafter, or for a period of one year from the date of the last disclosure of confidential information to the receiving party, whichever is the longer period, whether or not the parties continue to have any relationship for that period of time.</li>
              </ol>
              
              <h4>Governing law</h4>
              <ol start="36">
                <li>This agreement and the relationship of the parties in connection with the subject matter of this agreement and each other shall be governed and determined in accordance with the laws of the Republic of South Africa.</li>
              </ol>
              
              <p className="nda-note">Note: This is a summarized version of the NDA. By signing below, you acknowledge that you have read and agree to the full terms and conditions of the KELE Mining Solutions Non-Disclosure Agreement.</p>
            </div>
            
            <div className="signature-section">
              <div className="signature-info">
                <p><strong>Date:</strong> {today}</p>
                <p><strong>Company:</strong> {userInfo.company || 'N/A'}</p>
                <p><strong>Email:</strong> {userInfo.email || 'N/A'}</p>
                <p><strong>Role:</strong> {userInfo.role || 'N/A'}</p>
                <p><strong>Signature:</strong></p>
                
                <div className="signature-canvas-container">
                  <canvas 
                    ref={canvasRef} 
                    width="400" 
                    height="100"
                    className="signature-canvas"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={endDrawing}
                    onMouseLeave={endDrawing}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={endDrawing}
                  />
                </div>
                
                <button 
                  onClick={clearSignature}
                  className="clear-signature-btn"
                >
                  Clear Signature
                </button>
              </div>
              
              <div className="button-group">
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    // If the user cancels, we should call onRegistrationComplete with a cancelled status
                    if (onRegistrationComplete && typeof onRegistrationComplete === 'function') {
                      onRegistrationComplete({
                        cancelled: true
                      });
                    }
                  }}
                >
                  Cancel
                </button>
                
                <button 
                  className={`btn ${isScrolledToBottom && signatureData ? 'btn-success' : 'btn-disabled'}`}
                  disabled={!isScrolledToBottom || !signatureData}
                  onClick={handleSubmitNDA}
                >
                  I Agree & Sign
                </button>
              </div>
              
              {!isScrolledToBottom && (
                <p className="warning-text">Please scroll through the entire document before signing.</p>
              )}
              
              {!signatureData && isScrolledToBottom && (
                <p className="warning-text">Please sign the document.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NDASignupPopup;