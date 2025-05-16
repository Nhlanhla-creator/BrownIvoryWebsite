import React, { useState, useRef, useEffect } from 'react';
import './signuppop.css';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import {auth} from './firebaseConfig';
// Import jsPDF for PDF generation
import { jsPDF } from 'jspdf';
// Import html2canvas for capturing content for PDF
import html2canvas from 'html2canvas';

const NDASignupPopup = ({ currentUser = null }) => {
  const [showNDA, setShowNDA] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [userInfo, setUserInfo] = useState({
    email: currentUser?.email || '',
    role: currentUser?.role || '',
    
    company: currentUser?.company || ''
  });
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [viewingSignedNDA, setViewingSignedNDA] = useState(false);
  const [savedNDA, setSavedNDA] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfExists, setPdfExists] = useState(false);
  const canvasRef = useRef(null);
  const ndaContentRef = useRef(null);
  const signedNdaRef = useRef(null);
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
  const user = auth.currentUser;
  // Get user ID from props or session
  const userId = currentUser.id || localStorage.getItem('userId') || `user_${Date.now()}`;

  // Check for existing NDA on component mount
  useEffect(() => {
    // Save userId for future reference
    localStorage.setItem('userId', userId);
    
    // First check localStorage as a fallback
    const existingNDA = localStorage.getItem('signedNDA');
    if (existingNDA) {
      const parsedNDA = JSON.parse(existingNDA);
      setSavedNDA(parsedNDA);
      setPdfExists(!!parsedNDA.pdfUrl);
    }
    
    // Then check if we have a userId and fetch from Firebase
    if (userId) {
      fetchNDAFromFirebase(userId);
    }
  }, [userId]);
  
  // Fetch NDA from Firebase
  const fetchNDAFromFirebase = async (uid) => {
    setLoading(true);
    try {
      // Get NDA metadata from Firestore
      const ndaDoc = await getDoc(doc(db, "ndas", currentUser.uid));
      
      if (ndaDoc.exists()) {
        // Get signature from Storage
        const signatureUrl = await getDownloadURL(ref(storage, `ndas/${uid}/signature`));
        
        const ndaData = {
          ...ndaDoc.data(),
          signature: signatureUrl
        };
        
        // If PDF URL is available, add it to the data
        if (ndaDoc.data().pdfUrl) {
          ndaData.pdfUrl = ndaDoc.data().pdfUrl;
        }
        
        setSavedNDA(ndaData);
        localStorage.setItem('signedNDA', JSON.stringify(ndaData)); // Backup to localStorage
      }
    } catch (error) {
      console.error("Error fetching NDA:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle NDA form submission
  const handleNDAFormSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.email || !userInfo.role) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    setErrorMessage('');
    setShowNDA(true);
  };

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

  // Submit signed NDA
  const handleSubmitNDA = async () => {
    if (!signatureData) {
      alert('Please sign the document before submitting');
      return;
    }

    setLoading(true);
    
    // Create the signed document with user info and date
    const signedDocument = {
      userInfo,
      signature: signatureData, // Base64 data URL
      ndaContent: "KELE Mining Solutions NDA", // Reference to NDA content
      dateSigned: new Date().toISOString(),
    };

    try {
      // Save to localStorage as backup
      localStorage.setItem('signedNDA', JSON.stringify(signedDocument));
      
      // Save to Firebase if configured
      if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        // Upload signature image to Storage with optimized settings
        const signatureRef = ref(storage, `ndas/${userId}/signature`);
        await uploadString(signatureRef, signatureData, 'data_url');
        
        // Get the download URL for the signature
        const signatureUrl = await getDownloadURL(signatureRef);
        
        // Save NDA document to Firestore without the large signature data
        const ndaDocData = {
          userInfo,
          signatureUrl, // URL to the stored signature
          ndaContent: "KELE Mining Solutions NDA",
          dateSigned: new Date().toISOString(),
        };
        
        await setDoc(doc(db, "ndas", userId), ndaDocData);
        
        // Update local state with the Firebase storage URL
        signedDocument.signatureUrl = signatureUrl;
      }
      
      setSavedNDA(signedDocument);
      
      // Close NDA popup and complete registration
      setShowNDA(false);
      setRegistrationComplete(true);
      
      // Generate and save PDF automatically after signing
      setTimeout(() => {
        if (viewingSignedNDA || registrationComplete) {
          generateAndSavePDF(signedDocument);
        }
      }, 1000);
    } catch (error) {
      console.error("Error saving NDA:", error);
      alert(`Error saving NDA: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // View signed NDA
  const viewSignedNDA = () => {
    setViewingSignedNDA(true);
    
    // If we're viewing the signed NDA but don't have a PDF yet, generate it
    if (savedNDA && !savedNDA.pdfUrl && firebaseConfig.apiKey !== "YOUR_API_KEY") {
      // Use setTimeout to allow the signedNdaRef to be populated after render
      setTimeout(() => {
        generateAndSavePDF(savedNDA);
      }, 1000);
    }
  };

  // Return to dashboard
  const returnToDashboard = () => {
    setViewingSignedNDA(false);
  };

  // Handle deleting the NDA
  const deleteNDA = async () => {
    if (window.confirm("Are you sure you want to delete your signed NDA? This action cannot be undone.")) {
      setLoading(true);
      
      try {
        // Remove from localStorage
        localStorage.removeItem('signedNDA');
        
        // Delete from Firebase if configured
        if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
          // Delete signature from Storage
          const signatureRef = ref(storage, `ndas/${userId}/signature`);
          await deleteObject(signatureRef);
          
          // Delete PDF from Storage if it exists
          if (savedNDA.pdfUrl) {
            const pdfRef = ref(storage, `ndas/${userId}/signed_nda.pdf`);
            await deleteObject(pdfRef);
          }
          
          // Delete NDA document from Firestore
          await deleteDoc(doc(db, "ndas", userId));
        }
        
        setSavedNDA(null);
        setViewingSignedNDA(false);
        setRegistrationComplete(false);
      } catch (error) {
        console.error("Error deleting NDA:", error);
        alert(`Error deleting NDA: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Improved function to create PDF from NDA content
  const generateAndSavePDF = async (ndaData) => {
    if (!signedNdaRef.current) {
      console.error("Cannot generate PDF: NDA content reference not available");
      return;
    }
    
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
      
      // Store PDF in Firebase Storage if configured
      if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
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
        setPdfExists(true);
        localStorage.setItem('signedNDA', JSON.stringify(updatedNDA));
        
        console.log("PDF saved to Firebase Storage:", pdfUrl);
      }
      
      return pdfBlob;
    } catch (error) {
      console.error("Error generating and saving PDF:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to download the PDF
  const downloadPDF = async () => {
    // If PDF already exists in storage, download it directly
    if (savedNDA && savedNDA.pdfUrl) {
      // Open PDF URL in new tab
      window.open(savedNDA.pdfUrl, '_blank');
      return;
    }
    
    // Otherwise generate and download a new PDF
    if (!signedNdaRef.current) return;
    
    setLoading(true);
    try {
      // Create a filename for the PDF
      const fileName = `NDA_${savedNDA.userInfo.email.replace('@', '_at_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Generate PDF
      const pdfBlob = await generateAndSavePDF(savedNDA);
      
      // Create a URL for the PDF blob and trigger download
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.click();
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert(`Error generating PDF: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Component cleanup
  useEffect(() => {
    return () => {
      // Cleanup any pending operations if needed
    };
  }, []);
  
  // Effect to monitor when signedNdaRef becomes available
  useEffect(() => {
    if (viewingSignedNDA && signedNdaRef.current && savedNDA && !savedNDA.pdfUrl && !pdfExists) {
      // Generate PDF in Firebase when viewing NDA for the first time
      if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        generateAndSavePDF(savedNDA);
      }
    }
  }, [viewingSignedNDA, savedNDA, pdfExists]);

  const today = new Date().toLocaleDateString();

  return (
    <div className="container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Processing...</p>
        </div>
      )}
    
      {!registrationComplete && !viewingSignedNDA && !savedNDA && (
        <div className="signup-form">
          <h1>NDA Required</h1>
          
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleNDAFormSubmit}>
            <div className="form-group">
              <label>Email Address*</label>
              <input 
                type="email" 
                value={userInfo.email}
                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Company Name*</label>
              <input 
                type="text" 
                value={userInfo.company}
                onChange={(e) => setUserInfo({...userInfo, company: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Role/Position*</label>
              <input 
                type="text" 
                value={userInfo.role}
                onChange={(e) => setUserInfo({...userInfo, role: e.target.value})}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              Continue to NDA
            </button>
          </form>
        </div>
      )}

      {(registrationComplete || (savedNDA && !viewingSignedNDA)) && (
        <div className="success-message">
          <h1>NDA Complete!</h1>
          <p>Thank you for signing the NDA agreement. Your document has been saved.</p>
          <div className="user-info-box">
            <p><strong>Email:</strong> {savedNDA ? savedNDA.userInfo.email : userInfo.email}</p>
            <p><strong>Company:</strong> {savedNDA ? savedNDA.userInfo.company : userInfo.company}</p>
            <p><strong>Role:</strong> {savedNDA ? savedNDA.userInfo.role : userInfo.role}</p>
            <p><strong>Date Signed:</strong> {savedNDA ? new Date(savedNDA.dateSigned).toLocaleDateString() : today}</p>
          </div>
          <div className="button-group">
            <button 
              className="btn btn-primary"
              onClick={viewSignedNDA}
            >
              View Signed NDA
            </button>
            <button 
              className="btn btn-success"
              onClick={() => alert("You would be redirected to the application dashboard.")}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}

      {viewingSignedNDA && savedNDA && (
        <div className="signed-nda-viewer">
          <div className="signed-nda-header">
            <h2>Signed NDA Document</h2>
            <button className="close-btn" onClick={returnToDashboard}>×</button>
          </div>
          
          <div 
            className="signed-nda-content"
            ref={signedNdaRef}
          >
            <div className="nda-title">
              <h3>CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT</h3>
              <p>Between</p>
              <p className="company-name">KELE MINING SOLUTIONS PROPRIETARY LIMITED</p>
              <p>(Registration Number: 2013/124544/07)</p>
              <p>AND</p>
              <p className="company-name">{savedNDA.userInfo.company}</p>
            </div>
            
            <h4>Introduction</h4>
            <ol>
              <li>The parties wish to record the terms and conditions upon which the disclosing party shall disclose confidential information to the other, which terms and conditions shall constitute a binding and enforceable agreement between the parties and their agents.</li>
              <li>This agreement shall also bind the parties, notwithstanding the date of signature hereof, in the event that either party shall have disclosed any confidential information to the other party prior to date of signature hereof.</li>
              <li>For the purposes of this agreement the party which discloses confidential information shall be referred to as "the disclosing party" and the party which receives the confidential information shall be referred to as "the receiving party".</li>
            </ol>
            
            <h4>The Confidential Information</h4>
            <ol start="4">
              <li>"Confidential Information" shall, for the purpose of this agreement include, without limitation, any technical, commercial or scientific information, know-how, trade secrets, processes, machinery, designs, drawings, technical specifications, terms of agreements, details of investment strategies, organisational strategies or structure of either party, products or services offered by either party or any other matter which relates to the</li>
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
          
            <div className="signature-information">
              <div className="signature-details">
                <p><strong>Signed by:</strong> {savedNDA.userInfo.email}</p>
                <p><strong>Company:</strong> {savedNDA.userInfo.company}</p>
                <p><strong>Role:</strong> {savedNDA.userInfo.role}</p>
                <p><strong>Date Signed:</strong> {new Date(savedNDA.dateSigned).toLocaleDateString()}</p>
              </div>
              
              <div className="signature-image-container">
                <p><strong>Signature:</strong></p>
                <img 
                  src={savedNDA.signature || savedNDA.signatureUrl} 
                  alt="Digital Signature" 
                  className="signature-image" 
                />
              </div>
            </div>
          </div>
          
          <div className="button-group">
            <button 
              className="btn btn-primary"
              onClick={downloadPDF}
            >
              {pdfExists || (savedNDA && savedNDA.pdfUrl) ? "View/Download PDF" : "Generate & Download PDF"}
            </button>
            <button 
              className="btn btn-danger"
              onClick={deleteNDA}
            >
              Delete NDA
            </button>
            <button 
              className="btn btn-secondary"
              onClick={returnToDashboard}
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* NDA Popup Dialog */}
      {showNDA && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Confidentiality and Non-Disclosure Agreement</h2>
            </div>
            
            <div 
              ref={ndaContentRef}
              onScroll={handleScroll}
              className="nda-content"
            >
              <div className="nda-title">
                <h3>CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT</h3>
                <p>Between</p>
                <p className="company-name">KELE MINING SOLUTIONS PROPRIETARY LIMITED</p>
                <p>(Registration Number: 2013/124544/07)</p>
                <p>AND</p>
                <p className="company-name">{userInfo.company}</p>
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
                <p><strong>Company:</strong> {userInfo.company}</p>
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
                  onClick={() => setShowNDA(false)}
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