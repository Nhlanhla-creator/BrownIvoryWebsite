"use client";
import { useState, useEffect, useRef } from "react";
import { Eye, Check, ChevronDown } from "lucide-react";
import styles from "./funding.module.css";
import { db, storage } from "../../firebaseConfig";
import {
  doc, getDoc, collection, getDocs, addDoc,
  query, where, updateDoc, serverTimestamp
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { DOCUMENT_PATHS, getDocumentURL } from "../../utils/documentUtils";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import InvestorProfileSummary from "../../investorpages/InvestorUniversalProfile/summaryformatch";
import get from "lodash.get";
import { FundingInsights } from "./funding-insights";

const ADJACENT_INDUSTRIES = {
  ict: ["technology", "software", "digital services"],
  education: ["e-learning", "training", "edtech"],
  manufacturing: ["construction", "engineering", "industrial"],
  healthcare: ["medtech", "biotech", "pharmaceuticals"],
};

const FUNDING_STAGES = ["Pre-Seed", "Seed", "Series A", "Series B", "Growth"];

// Pipeline stage definitions with colors and next stages
const PIPELINE_STAGES = {
  MATCH: {
    label: "Match",
    color: "#F5EBE0", // Light cream/beige brown
    next: "send application"
  },
  APPLICATION_SENT: {
    label: "Application Sent",
    color: "#E8D5C4",
    next: "Pending"
  },
  UNDER_REVIEW: {
    label: "Under Review",
    color: "#FFE0B2",
    next: "Pending"
  },
  TERM_SHEET: {
    label: "Termsheet",
    color: "#C8E6C9",
    next: "Deal Closed"
  },
  DEAL_CLOSED: {
    label: "Deal Closed",
    color: "#A5D6A7", // Green
    next: "N/A"
  },
  DECLINED: {
    label: "Declined",
    color: "#FFCDD2", // Light red
    next: "N/A"
  }
};

// Simplified statuses
const APPLICATION_STATUSES = {
  NO_APPLICATION: {
    label: "Application not sent",
    color: "#E0E0E0" // Light gray
  },
  PENDING: {
    label: "Pending",
    color: "#FFE082" // Amber
  },
  ACCEPTED: {
    label: "Accepted",
    color: "#81C784" // Green
  },
  DECLINED: {
    label: "Declined",
    color: "#E57373" // Red
  }
};

// Text truncation component
const TruncatedText = ({ text, maxLines = 2 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const textRef = useRef(null);
  
  useEffect(() => {
    if (!text || !textRef.current) {
      setShowSeeMore(false);
      return;
    }

    // More aggressive detection - show "See more" for longer text
    const charLimit = maxLines * 35; // Chars per line for sensitivity
    const hasLongText = text.length > charLimit;
    
    // Also check for multiple commas (indicating multiple items)
    const hasMultipleItems = (text.match(/,/g) || []).length >= 2;
    
    setShowSeeMore(hasLongText || hasMultipleItems);
  }, [text, maxLines]);

  if (!text || text === '-' || text === 'Not specified' || text === 'Various') {
    return <span>{text || '-'}</span>;
  }

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.truncatedTextContainer}>
      <div 
        ref={textRef}
        className={`${styles.truncatedText} ${isExpanded ? styles.expanded : ''}`}
        style={{
          '--max-lines': maxLines,
          WebkitLineClamp: isExpanded ? 'none' : maxLines,
        }}
      >
        {text}
      </div>
      {showSeeMore && (
        <button 
          className={styles.seeMoreButton}
          onClick={toggleExpanded}
        >
          {isExpanded ? 'See less' : 'See more'}
          <ChevronDown 
            size={12} 
            style={{ 
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} 
          />
        </button>
      )}
    </div>
  );
};

const formatLabel = (value) => {
  if (!value) return "";

  return value
    .toString()
    .split(",")
    .map(item => item.trim())
    .map(word => {
      if (word.toLowerCase() === "ict") return "ICT";
      if (word.toLowerCase() === "southafrica" || word.toLowerCase() === "south_africa") return "South Africa";
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
    .replace(/_/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

const getStatusColor = (status) => {
  const statusKey = Object.keys(APPLICATION_STATUSES).find(key =>
    APPLICATION_STATUSES[key].label.toLowerCase() === status?.toLowerCase()
  );
  return statusKey ? APPLICATION_STATUSES[statusKey].color : "#E0E0E0";
};

const getStageColor = (stage) => {
  const stageKey = Object.keys(PIPELINE_STAGES).find(key =>
    PIPELINE_STAGES[key].label.toLowerCase() === stage?.toLowerCase()
  );
  return stageKey ? PIPELINE_STAGES[stageKey].color : "#E0E0E0";
};

const getNextStage = (currentStage) => {
  const stageEntry = Object.values(PIPELINE_STAGES).find(stage =>
    stage.label.toLowerCase() === currentStage?.toLowerCase()
  );
  return stageEntry ? stageEntry.next : "N/A";
};

export function FundingTable({ filters, onApplicationSubmitted }) {
  const [funders, setFunders] = useState([]);
  const [allFunders, setAllFunders] = useState([]);
  const [currentBusiness, setCurrentBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState({});
  const [pipelineStages, setPipelineStages] = useState({});
  const [applicationDates, setApplicationDates] = useState({});
  const [waitingTimes, setWaitingTimes] = useState({});
  const [modalFunder, setModalFunder] = useState(null);
  const [applyingFunder, setApplyingFunder] = useState(null);
  const [notification, setNotification] = useState(null);
  const [submittedDocuments, setSubmittedDocuments] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [insightsData, setInsightsData] = useState({});

  const getRequiredDocs = (funder) => {
    const funds = funder.fullProfile?.productsServices?.funds || [];
    const matchedFund = funds.find(f => f.name?.toLowerCase().trim() === funder.name?.toLowerCase().trim());
    return matchedFund?.requiredDocuments || [];
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

      if (!funderSnap.exists() || !profileSnap.exists()) {
        throw new Error("Missing funder or profile data");
      }

      const funderData = funderSnap.data();
      const profile = profileSnap.data();
      const requiredDocs = getRequiredDocs({ ...funder, fullProfile: funderData.formData });

      const submitted = requiredDocs.filter((docLabel) => {
        const path = DOCUMENT_PATHS[docLabel];
        if (!path) return false;

        let value = Array.isArray(path)
          ? path.map(p => get(profile, p)).find(v => typeof v === "string" || (v && v.url))
          : get(profile, path);

        if (value && typeof value === "object" && value.url) {
          value = value.url;
        }

        return typeof value === "string" && value.startsWith("http");
      });

      setProfileData(profile);
      setSubmittedDocuments(submitted);
      setApplyingFunder({
        ...funder,
        fullProfile: funderData.formData,
        requiredDocuments: requiredDocs
      });
    } catch (err) {
      console.error("Error in handleApplyClick:", err);
      setNotification({ type: "error", message: "Failed to load application requirements." });
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

      setSubmittedDocuments(prev => [...new Set([...prev, docLabel])]);
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
      const applicationDate = new Date().toISOString().split("T")[0];

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
        applicationDate,

        pipelineStage: "Application Sent",
        teamSize: currentBusiness.teamSize || "Not specified",
        revenue: currentBusiness.financials?.annualRevenue || "Not specified",
        focusArea: currentBusiness.businessDescription || "Not specified",
        documents: requiredDocs,
        createdAt: new Date().toISOString(),
        waitingTime: "3-5 days"
      };

      await Promise.all([
        addDoc(collection(db, "investorApplications"), applicationData),
        addDoc(collection(db, "smeApplications"), applicationData)
      ]);

      setStatuses((prev) => ({ ...prev, [funder.id]: "Pending" }));
      setPipelineStages((prev) => ({ ...prev, [funder.id]: "Application Sent" }));
      setApplicationDates((prev) => ({ ...prev, [funder.id]: applicationDate }));
      setWaitingTimes((prev) => ({ ...prev, [funder.id]: "3-5 days" }));

      onApplicationSubmitted?.();
      setApplyingFunder(null);
      setNotification({ type: "success", message: "Application submitted!" });
    } catch (err) {
      setNotification({ type: "error", message: err.message });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");

        const businessSnap = await getDoc(doc(db, "universalProfiles", user.uid));
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

        investorsSnapshot.forEach((docSnap) => {
          const investor = docSnap.data();
          const funds = investor.formData?.productsServices?.funds || [];

          funds.forEach((fund) => {
            const score = calculateHybridScore(businessData, fund);
            if (score >= 10) {
              const entityOverview = investor.formData?.entityOverview || {};
              matchedFunds.push({
                id: `${docSnap.id}_${fund.name}`,
                funderId: docSnap.id,
                name: fund.name || "Unnamed Fund",
                matchPercentage: score,
                investmentType: (fund.type || []).join(", ") || "Various",
                targetStage: (fund.stages || []).join(", ") || "Various",
                ticketSize: formatTicketSize(fund.ticketMin, fund.ticketMax),
                sectorFocus: (fund.sectorFocus || []).join(", ") || "Various",
                geographicFocus: (fund.geographicFocus || []).join(", ") || "Various",
                supportOffered: (fund.supportOffered || []).join(", ") || "Not specified",
                website: investor.formData?.contactDetails?.website || "#",
                minInvestment: Number(fund.ticketMin) || 0,
                maxInvestment: Number(fund.ticketMax) || 0,
                deadline: entityOverview.deadline || "-",
                responseTime: entityOverview.responseTime || "-"
              });
            }
          });
        });

        matchedFunds.sort((a, b) => b.matchPercentage - a.matchPercentage);
        setAllFunders(matchedFunds);
        setFunders(matchedFunds);

        const useBreakdown = {};
        const typeBreakdown = {};
        const sectorMatchCount = {};
        const sectorDistribution = {};
        const timelineCount = Array(12).fill(0); // Jan to Dec
        const activityByMonth = Array(12).fill().map(() => ({ matches: 0, applications: 0, deals: 0 }));

        let totalFundingRequested = 0;
        let funderIds = new Set();
        let totalMatches = matchedFunds.length;

        matchedFunds.forEach(funder => {
          // Funding Types
          (funder.investmentType?.split(",") || []).forEach(type => {
            const cleanType = type.trim();
            if (cleanType) typeBreakdown[cleanType] = (typeBreakdown[cleanType] || 0) + 1;
          });

          // Sector Focus
          (funder.sectorFocus?.split(",") || []).forEach(sector => {
            const cleanSector = sector.trim();
            if (cleanSector) {
              sectorMatchCount[cleanSector] = (sectorMatchCount[cleanSector] || 0) + 1;
              sectorDistribution[cleanSector] = (sectorDistribution[cleanSector] || 0) + 1;
            }
          });

          // Growth Stages
          if (funder.targetStage) {
            const stage = funder.targetStage.trim();
            useBreakdown[stage] = (useBreakdown[stage] || 0) + 1;
          }

          funderIds.add(funder.funderId);
        });

        const appSnapshot = await getDocs(query(
          collection(db, "smeApplications"),
          where("smeId", "==", user.uid)
        ));

        // Funding applications stats
        let appCount = 0;
        let totalAmount = 0;
        appSnapshot.forEach(doc => {
          const data = doc.data();
          const monthIndex = new Date(data.applicationDate).getMonth();

          appCount++;
          const amount = parseFloat(data.fundingNeeded || 0);
          if (!isNaN(amount)) totalAmount += amount;

          if (data.pipelineStage === "Application Sent") activityByMonth[monthIndex].applications++;
          if (data.pipelineStage === "Deal Closed" || data.pipelineStage === "Deal Successful") activityByMonth[monthIndex].deals++;
          activityByMonth[monthIndex].matches++;
        });

        // Final insights state
        setInsightsData({
          fundingUseBreakdown: useBreakdown,
          fundingTypeBreakdown: typeBreakdown,
          topMatchedSectors: Object.fromEntries(
            Object.entries(sectorMatchCount).sort((a, b) => b[1] - a[1]).slice(0, 5)
          ),
          sectorDistribution,
          timelineProgress: activityByMonth.map((v, i) => ({
            month: new Date(0, i).toLocaleString("default", { month: "short" }),
            applications: v.applications,
            matches: v.matches,
          })),
          monthlyActivity: activityByMonth.map((v, i) => ({
            month: new Date(0, i).toLocaleString("default", { month: "short" }),
            matches: v.matches,
            applications: v.applications,
            deals: v.deals,
          })),
          averageFundingAmount: appCount ? Math.round(totalAmount / appCount) : 0,
          matchRate: totalMatches ? Math.round((appCount / totalMatches) * 100) : 0,
          activeFundersCount: funderIds.size,
        });

        const appStatusMap = {};
        const pipelineStageMap = {};
        const applicationDateMap = {};
        const waitingTimeMap = {};

        appSnapshot.forEach(doc => {
          const data = doc.data();
          const key = `${data.funderId}_${data.fundName}`;
          appStatusMap[key] = data.status || "Pending";
          pipelineStageMap[key] = data.pipelineStage || "Application Sent";
          applicationDateMap[key] = data.applicationDate || new Date().toISOString().split("T")[0];
          waitingTimeMap[key] = data.waitingTime || "3-5 days";
        });

        setStatuses(appStatusMap);
        setPipelineStages(pipelineStageMap);
        setApplicationDates(applicationDateMap);
        setWaitingTimes(waitingTimeMap);
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
        (ADJACENT_INDUSTRIES[sector?.toLowerCase()] || []).includes(focus.toLowerCase())
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

    const supportMatch = fund.supportOffered?.some(s => business.supportNeeded?.some(need => need.toLowerCase() === s.toLowerCase())) ? 10 : 0;
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
    setModalFunder({ 
      name: funder.name, 
      data: data.formData,
      matchPercentage: funder.matchPercentage // Add this line
    });
    funder.fullProfile = data.formData;
  } catch (err) {
    console.error("Error loading funder profile", err);
  }
};

  if (loading) return <div className={styles.loadingContainer}><p>Loading matches...</p></div>;

  return (
    <div className={modalFunder || applyingFunder ? styles.blurredContainer : ""}>
      <h2 className={styles.sectionTitle}>Funding Matches</h2>
      {notification && <div className={`${styles.notification} ${styles[notification.type]}`}>{notification.message}</div>}

      <FundingInsights insightsData={insightsData} />

      {funders.length === 0 ? (
        <div className={styles.noResults}><p>No matching funders found. Try adjusting your profile.</p></div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.fundingTable}>
            <thead>
              <tr>
                <th>Funder</th>
                <th>Location</th>
                <th>Sector</th>
                <th>Funding Stage</th>
                <th>Support Offered</th>
                <th>Funding Type</th>
                <th>Ticket Size</th>
                <th>Match</th>
                <th>Application Deadline</th>
                <th>Current Stage</th>
                <th>Next Stage</th>
                <th>Waiting Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {funders.map(funder => {
                const status = statuses[funder.id] || "Application not sent";
                const pipelineStage = pipelineStages[funder.id] || "Match";
                const nextStage = getNextStage(pipelineStage);
              
                return (
                  <tr key={funder.id}>
                    <td>
                      <span
                        onClick={() => handleViewClick(funder)}
                        style={{
                          color: '#a67c52',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          fontWeight: '500'
                        }}
                      >
                        {funder.name}
                      </span>
                    </td>
                    <td>
                      <TruncatedText text={formatLabel(funder.geographicFocus)} maxLines={2} />
                    </td>
                    <td>
                      <TruncatedText text={formatLabel(funder.sectorFocus)} maxLines={2} />
                    </td>
                    <td>
                      <TruncatedText text={formatLabel(funder.targetStage)} maxLines={2} />
                    </td>
                    <td>
                      <TruncatedText text={formatLabel(funder.supportOffered)} maxLines={2} />
                    </td>
                    <td>
                      <TruncatedText text={formatLabel(funder.investmentType)} maxLines={2} />
                    </td>
                    <td>{funder.ticketSize}</td>
                    <td>{funder.matchPercentage}%</td>
                    <td>{funder.deadline || "-"}</td>
                    <td>
                      <span className={styles.stageBadge} style={{ backgroundColor: getStageColor(pipelineStage) }}>
                        {capitalize(pipelineStage)}
                      </span>
                    </td>
                    <td>
                      <TruncatedText text={nextStage} maxLines={2} />
                    </td>
                    <td>{funder.responseTime || "-"}</td>
                    <td>
                      <div className={styles.actionButtons}>
                        {statuses[funder.id] ? (
                          <span className={styles.sentBadge}><Check size={16} /> Sent</span>
                        ) : (
                          <button onClick={() => handleApplyClick(funder)} className={styles.applyButton}>Apply</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {modalFunder && modalFunder.data && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{modalFunder.name} Profile Summary</h3>
              <button onClick={() => setModalFunder(null)}>✖</button>
            </div>
            <div className={styles.modalBody}>
              <InvestorProfileSummary data={modalFunder.data }  match={modalFunder.matchPercentage}  onEdit={() => { }} />
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
              {getRequiredDocs(applyingFunder).map(docLabel => {
                const path = DOCUMENT_PATHS[docLabel];
                const value = Array.isArray(path)
                  ? path.map(p => get(profileData, p)).find(v => typeof v === "string" || (v && v.url))
                  : get(profileData, path);

                const submitted = Boolean(
                  value && (typeof value === "string" || (typeof value === "object" && value.url))
                );

                const lastUpdated = get(profileData, `${path}UpdatedAt`);
                const formattedDate = lastUpdated?.seconds
                  ? new Date(lastUpdated.seconds * 1000).toLocaleDateString()
                  : null;

                return (
                  <div key={docLabel} className={styles.documentItem}>
                    <label className={styles.documentLabel}>
                      <input type="checkbox" checked={submitted} readOnly />
                      <span>{formatDocumentLabel(docLabel)}</span>
                      {submitted && formattedDate && (
                        <span className={styles.timestamp}>
                          (Updated {formattedDate})
                        </span>
                      )}
                    </label>

                    {!submitted && (
                      <input
                        type="file"
                        onChange={(e) => handleUpload(docLabel, e.target.files[0])}
                        accept=".pdf"
                        className={styles.fileInput}
                      />
                    )}
                  </div>
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