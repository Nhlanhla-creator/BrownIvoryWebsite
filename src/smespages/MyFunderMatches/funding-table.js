"use client"
import { useState, useEffect } from "react";
import { Eye, Check } from "lucide-react";
import styles from "./funding.module.css";
import { db } from "../../firebaseConfig";
import { doc, getDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import InvestorProfileSummary from "../../investorpages/InvestorUniversalProfile/investor-profile-summary";

const ADJACENT_INDUSTRIES = {
  ict: ["technology", "software", "digital services"],
  education: ["e-learning", "training", "edtech"],
  manufacturing: ["construction", "engineering", "industrial"],
  healthcare: ["medtech", "biotech", "pharmaceuticals"],
};

const FUNDING_STAGES = ["Pre-Seed", "Seed", "Series A", "Series B", "Growth"];

const DOCUMENTS = [
  "Pitch Deck", "Business Plan", "Company Registration Certificate ",
  "Certified IDs of Directors & Shareholders", "Share Register",
  "Proof of Address (Utility Bill, Lease Agreement)", "Tax Clearance Certificate",
  "Use of Funds Breakdown", "B-BBEE Certificate",
  "VAT/UIF/PAYE/COIDA Certificates", "Industry Accreditations",
  "Company Profile / Brochure", "Client References )",
  "5 Year Budget (Income Statement, Cashflows, Balance Sheet) ",
  "Previous Program Reports", "Bank Statements (6 months) ",
  "Bank Details Confirmation Letter", "Loan Agreements ",
  "Financial Statements", "Support Letters / Endorsements ", "Scope of Work"
];

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
            const matchScore = calculateMatchScore(businessData, fund);
            if (matchScore >= 30) {
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

        setAllFunders(matchedFunds);
        setFunders(applyFilters(matchedFunds, filters));
      } catch (error) {
        setNotification({ type: "error", message: "Failed to load funder data." });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!filters || allFunders.length === 0) return;
    setFunders(applyFilters(allFunders, filters));
  }, [filters]);

  const applyFilters = (funders, filters) => {
    return funders
      .filter((funder) => {
        const {
          location, matchScore, minValue, maxValue,
          instruments, stages, sectors, supportTypes,
          funderType, sortBy
        } = filters || {};

        if (location && !funder.geographicFocus.toLowerCase().includes(location.toLowerCase())) return false;
        if (matchScore && funder.matchPercentage < matchScore) return false;
        if (minValue && funder.maxInvestment < Number(minValue)) return false;
        if (maxValue && funder.minInvestment > Number(maxValue)) return false;
        if (instruments?.length && !instruments.some(i => funder.investmentType.toLowerCase().includes(i.toLowerCase()))) return false;
        if (stages?.length && !stages.some(s => funder.targetStage.toLowerCase().includes(s.toLowerCase()))) return false;
        if (sectors?.length && !sectors.some(sector => funder.sectorFocus.toLowerCase().includes(sector.toLowerCase()))) return false;
        if (supportTypes?.length && !supportTypes.some(support => funder.supportOffered.toLowerCase().includes(support.toLowerCase()))) return false;
        if (funderType && funder.website?.toLowerCase().includes(funderType.toLowerCase()) === false) return false;

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "Match Score (High to Low)": return b.matchPercentage - a.matchPercentage;
          case "Match Score (Low to High)": return a.matchPercentage - b.matchPercentage;
          case "Amount (High to Low)": return b.maxInvestment - a.maxInvestment;
          case "Amount (Low to High)": return a.minInvestment - b.minInvestment;
          default: return 0;
        }
      });
  };

  const calculateMatchScore = (business, fund) => {
    let score = 0;
    const sector = (business.economicSector || "").toLowerCase();
    const stage = (business.operationStage || "").toLowerCase();
    const location = (business.location || "").toLowerCase();
    const amount = parseFloat(business.useOfFunds?.amountRequested || 0);

    if (fund.sectorFocus?.some(s => s.toLowerCase() === sector)) score += 30;
    else if (ADJACENT_INDUSTRIES[sector]?.some(ai => fund.sectorFocus?.includes(ai))) score += 20;

    const stageIndex = FUNDING_STAGES.indexOf(business.operationStage);
    const fundStageIndex = FUNDING_STAGES.indexOf(fund.stages?.[0]);
    if (stageIndex === fundStageIndex) score += 30;
    else if (Math.abs(stageIndex - fundStageIndex) === 1) score += 15;

    const min = parseFloat(fund.ticketMin || 0);
    const max = parseFloat(fund.ticketMax || 0);
    if (amount >= min && amount <= max) score += 25;
    else if (max > min) {
      const midpoint = (min + max) / 2;
      const penalty = Math.abs(amount - midpoint) / (max - min) * 25;
      score += Math.max(0, 25 - penalty);
    }

    if (fund.geographicFocus?.some(l => l.toLowerCase() === location)) score += 15;

    return Math.min(100, Math.round(score));
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

  const handleUpload = (doc) => {
    setSubmittedDocuments((prev) => [...prev, doc]);
  };

  const submitApplication = async (funder) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user || !currentBusiness) throw new Error("Missing user or business");

      const requiredDocs = funder.fullProfile?.productsServices?.funds?.find(f => f.name === funder.name)?.requiredDocuments || [];

      const applicationData = {
        smeId: user.uid,
        funderId: funder.funderId,
        fundName: funder.name,
        smeName: currentBusiness.registeredName || "Unnamed Business",
        investmentType: funder.investmentType,
        matchPercentage: funder.matchPercentage,
        location: currentBusiness.location || "Not specified",
        stage: currentBusiness.operationStage || "Not specified",
        sector: currentBusiness.economicSector || "Not specified",
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

  if (loading) {
    return <div className={styles.loadingContainer}><p>Loading matches...</p></div>;
  }

  const Info = ({ label, value }) => (
    <div className="info-item p-2 rounded">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );

  return (
    <div className={modalFunder || applyingFunder ? styles.blurredContainer : ""}>
      <h2 className={styles.sectionTitle}>Funding Matches</h2>

      {notification && <div className={`${styles.notification} ${styles[notification.type]}`}>{notification.message}</div>}

      {funders.length === 0 ? (
        <div className={styles.noResults}>
          <p>No matching funders found. Try adjusting your profile.</p>
        </div>
      ) : (
        <table className={styles.fundingTable}>
          <thead>
            <tr><th>Funder</th><th>Match</th><th>Type</th><th>Stage</th><th>Ticket Size</th><th>Sector</th><th>Location</th><th>Support</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {funders.map(funder => (
              <tr key={funder.id}>
                <td>{funder.name}</td>
                <td>{funder.matchPercentage}%</td>
                <td>{funder.investmentType}</td>
                <td>{funder.targetStage}</td>
                <td>{funder.ticketSize}</td>
                <td>{funder.sectorFocus}</td>
                <td>{funder.geographicFocus}</td>
                <td>{funder.supportOffered}</td>
                <td>{statuses[funder.id] || "Not Applied"}</td>
                <td>
                  <button onClick={() => handleViewClick(funder)} className={styles.viewButton}><Eye size={16} /> View</button>
                  {statuses[funder.id] ? <span className={styles.sentBadge}><Check size={16} /> Sent</span> :
                    <button onClick={() => setApplyingFunder(funder)} className={styles.applyButton}>Apply</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalFunder && modalFunder.data && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{modalFunder.name} Profile Summary</h3>
              <button onClick={() => setModalFunder(null)}>✖</button>
            </div>
            <div className={styles.modalBody}>
              <InvestorProfileSummary data={modalFunder.data} onEdit={() => { }} />
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={() => setModalFunder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {applyingFunder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Application Documents</h3>
              <button onClick={() => setApplyingFunder(null)}>✖</button>
            </div>
            <div className={styles.documentsList}>
              <p><strong>Required Documents:</strong></p>
              {(applyingFunder.fullProfile?.productsServices?.funds?.find(f => f.name === applyingFunder.name)?.requiredDocuments || []).map(doc => {
                const submitted = submittedDocuments.includes(doc);
                return (
                  <label key={doc} className={styles.documentItem}>
                    <input type="checkbox" checked={submitted} readOnly />
                    <span>{doc}</span>
                    {!submitted && <button onClick={() => handleUpload(doc)}>Upload</button>}
                  </label>
                );
              })}
            </div>
            <div className={styles.modalActions}>
              <button
                onClick={() => submitApplication(applyingFunder)}
                className={styles.submitButton}
              >
                Submit Application
              </button>
              <button onClick={() => setApplyingFunder(null)} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
