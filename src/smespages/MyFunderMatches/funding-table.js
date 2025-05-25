"use client";
import { useState, useEffect } from "react";
import { Eye, Check } from "lucide-react";
import styles from "./funding.module.css";
import { db, storage } from "../../firebaseConfig";
import {
  doc, getDoc, collection, getDocs, addDoc,
  query, where, updateDoc, serverTimestamp
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import InvestorProfileSummary from "../../investorpages/InvestorUniversalProfile/investor-profile-summary";
import get from "lodash.get"

const ADJACENT_INDUSTRIES = {
  ict: ["technology", "software", "digital services"],
  education: ["e-learning", "training", "edtech"],
  manufacturing: ["construction", "engineering", "industrial"],
  healthcare: ["medtech", "biotech", "pharmaceuticals"],
};

const FUNDING_STAGES = ["Pre-Seed", "Seed", "Series A", "Series B", "Growth"];

const DOCUMENT_PATHS = {
  "Pitch Deck": "enterpriseReadiness.pitchDeckFile",
  "Business Plan": "enterpriseReadiness.businessPlanFile",
  "Company Registration Certificate": "entityOverview.registrationCertificate",
  "Certified IDs of Directors & Shareholders": "ownershipManagement.certifiedIds",
  "Share Register": "ownershipManagement.shareRegister",
  "Proof of Address (Utility Bill, Lease Agreement)": "contactDetails.proofOfAddress",
  "Tax Clearance Certificate": "legalCompliance.taxClearanceCert",
  "B-BBEE Certificate": "legalCompliance.bbbeeCert",
  "VAT/UIF/PAYE/COIDA Certificates": [
    "legalCompliance.vatNumber",
    "legalCompliance.uifNumber",
    "legalCompliance.coidaNumber",
    "legalCompliance.payeNumber"
  ],
  "Industry Accreditations": "legalCompliance.industryAccreditationDocs",
  "Company Profile / Brochure": "productsServices.companyProfile",
  "Client References": "productsServices.clientReferences",
  "5 Year Budget (Income Statement, Cashflows, Balance Sheet)": "useOfFunds.budgetDocuments",
  "Previous Program Reports": "enterpriseReadiness.programReports",
  "Bank Statements (6 months)": "financialOverview.bankStatements",
  "Bank Details Confirmation Letter": "financialOverview.bankConfirmation",
  "Loan Agreements": "financialOverview.loanAgreements",
  "Financial Statements": "financialOverview.financialStatements",
  "Support Letters / Endorsements": "growthPotential.supportLetters",
  "Scope of Work": null
};

const formatLabel = (value) => {
  if (!value) return "";

  return value
    .toString()
    .split(",") // split on commas
    .map(item => item.trim())
    .map(word => {
      if (word.toLowerCase() === "ict") return "ICT";
      if (word.toLowerCase() === "southafrica" || word.toLowerCase() === "south_africa") return "South Africa";

      // Capitalize each word in compound terms (like Green Energy → Green Energy)
      return word
        .split(/[_\s-]+/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
    })
    .join(", ");
};

const formatDocumentLabel = (label) => {
  if (!label) return "";
  return label
    .replace(/_/g, " ") // replace underscores with spaces
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

export function FundingTable({ filters, onApplicationSubmitted }) {
  const [funders, setFunders] = useState([]);
  const [allFunders, setAllFunders] = useState([]);
  const [currentBusiness, setCurrentBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState({});
  const [modalFunder, setModalFunder] = useState(null);
  const [applyingFunder, setApplyingFunder] = useState(null);
  const [notification, setNotification] = useState(null);
  const [submittedDocuments, setSubmittedDocuments] = useState([]);
  const [profileData, setProfileData] = useState({});

  const getRequiredDocs = (funder) => {
    const funds = funder.fullProfile?.productsServices?.funds || [];
    const matchedFund = funds.find(f =>
      f.name?.toLowerCase().trim() === funder.name?.toLowerCase().trim()
    );
    return matchedFund?.requiredDocuments || [];
  };

  const checkSubmittedDocs = (requiredDocs, data) => {
    const submitted = [];
    for (const docLabel of requiredDocs) {
      const path = DOCUMENT_PATHS[docLabel];
      if (!path) continue;
      const value = Array.isArray(path)
        ? path.map(p => get(data, p)).find(v => !!v)
        : get(data, path);
      if (value && (Array.isArray(value) ? value.length > 0 : true)) {
        submitted.push(docLabel);
      }
    }
    return submitted;
  };

  const handleApplyClick = async (funder) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const [funderSnap, profileSnap] = await Promise.all([
        getDoc(doc(db, "MyuniversalProfiles", funder.funderId)),
        getDoc(doc(db, "universalProfiles", user.uid))
      ]);

      if (!funderSnap.exists() || !profileSnap.exists()) throw new Error("Missing data");

      const funderData = funderSnap.data();
      const profileData = profileSnap.data();

      const fund = (funderData.formData?.productsServices?.funds || []).find(f =>
        f.name?.toLowerCase().trim() === funder.name?.toLowerCase().trim()
      );

      const requiredDocs = fund?.requiredDocuments || [];
      const alreadySubmitted = checkSubmittedDocs(requiredDocs, profileData);

      setProfileData(profileData);
      setSubmittedDocuments(alreadySubmitted);
      setApplyingFunder({
        ...funder,
        fullProfile: funderData.formData,
        requiredDocuments: requiredDocs
      });
    } catch (err) {
      console.error("Error loading funder or profile", err);
      setNotification({ type: "error", message: "Failed to load application requirements." });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const businessRef = doc(db, "universalProfiles", user.uid);
        const businessSnap = await getDoc(businessRef);
        if (!businessSnap.exists()) throw new Error("Business profile not found");

        const businessData = {
          ...(businessSnap.data().entityOverview || {}),
          financials: businessSnap.data().financialOverview || {},
          useOfFunds: businessSnap.data().useOfFunds || {},
          smeId: user.uid,
        };

        setCurrentBusiness(businessData);

        const investorsSnapshot = await getDocs(collection(db, "MyuniversalProfiles"));
        const matchedFunds = [];

        investorsSnapshot.forEach((investorDoc) => {
          const investorData = investorDoc.data();
          const funds = investorData.formData?.productsServices?.funds || [];

          funds.forEach((fund) => {
            const matchScore = calculateHybridScore(businessData, fund);
            if (matchScore >= 10) {
              matchedFunds.push({
                id: `${investorDoc.id}_${fund.name}`,
                funderId: investorDoc.id,
                name: fund.name || "Unnamed Fund",
                matchPercentage: matchScore,
                investmentType: (fund.type || []).join(", ") || "Various",
                targetStage: (fund.stages || []).join(", ") || "Various",
                ticketSize: formatTicketSize(fund.ticketMin, fund.ticketMax),
                sectorFocus: (fund.sectorFocus || []).join(", ") || "Various",
                geographicFocus: (fund.geographicFocus || []).join(", ") || "Various",
                supportOffered: (fund.supportOffered || []).join(", ") || "Not specified",
                website: investorData.formData?.contactDetails?.website || "#",
                minInvestment: Number(fund.ticketMin) || 0,
                maxInvestment: Number(fund.ticketMax) || 0,
              });
            }
          });
        });

        matchedFunds.sort((a, b) => b.matchPercentage - a.matchPercentage);
        setAllFunders(matchedFunds);
        setFunders(matchedFunds);

        const appSnapshot = await getDocs(query(collection(db, "smeApplications"), where("smeId", "==", user.uid)));
        const appStatusMap = {};
        appSnapshot.forEach(doc => {
          const data = doc.data();
          appStatusMap[`${data.funderId}_${data.fundName}`] = data.status;
        });
        setStatuses(appStatusMap);
      } catch (error) {
        setNotification({ type: "error", message: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateHybridScore = (business, fund) => {
    const weights = { sector: 0.3, stage: 0.25, ticketSize: 0.25, location: 0.1, support: 0.1 };
    let score = 0;

    const sectorMatch = fund.sectorFocus?.some(focus =>
      business.economicSectors?.some(sector =>
        focus.toLowerCase() === sector.toLowerCase() ||
        ADJACENT_INDUSTRIES[sector?.toLowerCase()]?.includes(focus.toLowerCase())
      )
    ) ? 10 : 0;
    score += sectorMatch * weights.sector;

    const stageMatch = fund.stages?.includes(business.operationStage) ? 10 : 0;
    score += stageMatch * weights.stage;

    const amount = parseFloat(business.useOfFunds?.amountRequested || 0);
    const min = parseFloat(fund.ticketMin || 0);
    const max = parseFloat(fund.ticketMax || 0);
    const midpoint = (min + max) / 2;
    const penalty = max > min ? Math.abs(amount - midpoint) / (max - min) * 10 : 10;
    const ticketScore = Math.max(0, 10 - penalty);
    score += ticketScore * weights.ticketSize;

    const locationMatch = fund.geographicFocus?.some(loc => loc.toLowerCase() === business.location?.toLowerCase()) ? 10 : 0;
    score += locationMatch * weights.location;

    const supportMatch = fund.supportOffered?.some(s =>
      business.supportNeeded?.some(need => need.toLowerCase() === s.toLowerCase())
    ) ? 10 : 0;
    score += supportMatch * weights.support;

    return Math.round(score * 10);
  };

  const formatTicketSize = (min, max) => {
    if (!min && !max) return "Not specified";
    return `R${Number(min).toLocaleString()} - R${Number(max).toLocaleString()}`;
  };

  const handleViewClick = async (funder) => {
    try {
      const docSnap = await getDoc(doc(db, "MyuniversalProfiles", funder.funderId));
      if (!docSnap.exists()) return;
      const data = docSnap.data();
      setModalFunder({ name: funder.name, data: data.formData });
      funder.fullProfile = data.formData;
    } catch (err) {
      console.error("Error loading funder profile", err);
    }
  };

  const handleUpload = async (docLabel, file) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || !file) return;

    const storageRef = ref(storage, `documents/${user.uid}/${docLabel}.pdf`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      const profileRef = doc(db, "universalProfiles", user.uid);
      const path = DOCUMENT_PATHS[docLabel];
      const timestampField = `${path}UpdatedAt`;

      await updateDoc(profileRef, {
        [path]: downloadURL,
        [timestampField]: serverTimestamp()
      });

      setSubmittedDocuments(prev => [...prev, docLabel]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const submitApplication = async (funder) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user || !currentBusiness) throw new Error("Missing user or business");

      const requiredDocs = getRequiredDocs(funder);

      const applicationData = {
        smeId: user.uid,
        funderId: funder.funderId,
        fundName: funder.name,
        smeName: currentBusiness.registeredName || "Unnamed Business",
        investmentType: funder.investmentType,
        matchPercentage: funder.matchPercentage,
        location: currentBusiness.location || "Not specified",
        stage: currentBusiness.operationStage || "Not specified",
        sector: currentBusiness.economicSectors?.join(", ") || "Not specified",
        fundingNeeded: currentBusiness.useOfFunds?.amountRequested || "Not specified",
        applicationDate: new Date().toISOString().split("T")[0],
        status: "Application Received",
        teamSize: currentBusiness.teamSize || "Not specified",
        revenue: currentBusiness.financials?.annualRevenue || "Not specified",
        focusArea: currentBusiness.businessDescription || "Not specified",
        documents: requiredDocs,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "investorApplications"), applicationData);
      await addDoc(collection(db, "smeApplications"), applicationData);
      onApplicationSubmitted?.();

      setStatuses((prev) => ({ ...prev, [funder.id]: "Application Sent" }));
      setApplyingFunder(null);
      setNotification({ type: "success", message: "Application submitted!" });
    } catch (err) {
      setNotification({ type: "error", message: err.message });
    }
  };

  if (loading) return <div className={styles.loadingContainer}><p>Loading matches...</p></div>;

  return (
    <div className={modalFunder || applyingFunder ? styles.blurredContainer : ""}>
      <h2 className={styles.sectionTitle}>Funding Matches</h2>
      {notification && <div className={`${styles.notification} ${styles[notification.type]}`}>{notification.message}</div>}

      {funders.length === 0 ? (
        <div className={styles.noResults}><p>No matching funders found. Try adjusting your profile.</p></div>
      ) : (
        <table className={styles.fundingTable}>
          <thead>
            <tr>
              <th>Funder</th><th>Match</th><th>Type</th><th>Stage</th>
              <th>Ticket Size</th><th>Sector</th><th>Location</th>
              <th>Support</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {funders.map(funder => (
              <tr key={funder.id}>
                <td>{funder.name}</td>
                <td>{funder.matchPercentage}%</td>
                <td>{formatLabel(funder.investmentType)}</td>
                <td>{formatLabel(funder.targetStage)}</td>
                <td>{funder.ticketSize}</td>
                <td>{formatLabel(funder.sectorFocus)}</td>
                <td>{formatLabel(funder.geographicFocus)}</td>
                <td>{formatLabel(funder.supportOffered)}</td>
                <td>{capitalize(statuses[funder.id]) || "Not Applied"}</td>
                <td>
                  <button onClick={() => handleViewClick(funder)} className={styles.viewButton}><Eye size={16} /> View</button>
                  {statuses[funder.id] ? <span className={styles.sentBadge}><Check size={16} /> Sent</span> : <button onClick={() => handleApplyClick(funder)} className={styles.applyButton}>Apply</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalFunder && modalFunder.data && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}><h3>{modalFunder.name} Profile Summary</h3><button onClick={() => setModalFunder(null)}>✖</button></div>
            <div className={styles.modalBody}><InvestorProfileSummary data={modalFunder.data} onEdit={() => { }} /></div>
            <div className={styles.modalActions}><button className={styles.cancelButton} onClick={() => setModalFunder(null)}>Close</button></div>
          </div>
        </div>
      )}

      {applyingFunder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}><h3>Application Documents</h3><button onClick={() => setApplyingFunder(null)}>✖</button></div>
            <div className={styles.documentsList}>
              <p><strong>Required Documents:</strong></p>
              {getRequiredDocs(applyingFunder).map(doc => {
                const submitted = submittedDocuments.includes(doc);
                return (
                  <label key={doc} className={styles.documentItem}>
                    <input type="checkbox" checked={submitted} readOnly />
                    <span>{formatDocumentLabel(doc)}</span>
                    {!submitted && (
                      <input type="file" onChange={e => handleUpload(doc, e.target.files[0])} />
                    )}
                  </label>
                );
              })}
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => submitApplication(applyingFunder)} className={styles.submitButton}>Submit Application</button>
              <button onClick={() => setApplyingFunder(null)} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
