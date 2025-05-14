"use client";

import { useState, useEffect } from "react";
import { Eye, FileText, MessageCircle, ExternalLink } from "lucide-react";
import styles from "./funding.module.css";
import { db } from '../../firebaseConfig';
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

export function FundingTable() {
  const [funders, setFunders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBusiness, setCurrentBusiness] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch current business profile
        const businessDocRef = doc(db, "universalProfiles", "${userId}");
        const businessDocSnap = await getDoc(businessDocRef);
        
        if (!businessDocSnap.exists()) {
          throw new Error("Business profile not found");
        }
        
        const businessData = businessDocSnap.data().entityOverview;
        setCurrentBusiness(businessData);

        // 2. Fetch all investors who might match
        const investorsCollectionRef = collection(db, "MyuniversalProfiles");
        const investorsQuery = query(
          investorsCollectionRef,
          where("entityOverview.investmentType", "!=", null)
        );
        
        const investorsSnapshot = await getDocs(investorsQuery);
        const matchedInvestors = [];

        for (const doc of investorsSnapshot.docs) {
          const investorData = doc.data().entityOverview;
          const funds = doc.data().productsServices?.funds || [];
          
          const matchScore = calculateMatchScore(businessData, { ...investorData, funds });
          
          if (matchScore > 70) { // Only include investors with good matches
            matchedInvestors.push({
              id: doc.id,
              name: investorData.registeredName || investorData.tradingName || "Unnamed Investor",
              matchPercentage: matchScore,
              investmentType: investorData.investmentType || "Not specified",
              targetStage: investorData.stages?.join(", ") || "Various",
              ticketSize: investorData.ticketMin && investorData.ticketMax 
                ? `R${Number(investorData.ticketMin).toLocaleString()} - R${Number(investorData.ticketMax).toLocaleString()}`
                : "Not specified",
              sectorFocus: investorData.sectorFocus?.join(", ") || investorData.sectors?.join(", ") || "Various",
              geographicFocus: investorData.geographicFocus?.join(", ") || investorData.location || "Various",
              supportOffered: investorData.supportOffered?.join(", ") || "None",
              applicationDeadline: investorData.deadline || "Not specified",
              responseTime: investorData.responseTime || "Not specified",
              status: "Not Contacted" // Default status
            });
          }
        }

        matchedInvestors.sort((a, b) => b.matchPercentage - a.matchPercentage);
        setFunders(matchedInvestors);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateMatchScore = (business, investor) => {
    let score = 0;
    
    // Economic Sector Match (40%)
    const businessSector = business.economicSector?.toLowerCase();
    if (investor.sectorFocus?.some(s => s.toLowerCase() === businessSector)) {
      score += 40;
    } else if (investor.sectors?.some(s => s.toLowerCase() === businessSector)) {
      score += 40;
    } else if (investor.funds?.some(fund => 
      fund.sectorFocus?.some(s => s.toLowerCase() === businessSector)
    )) {
      score += 40;
    }
    
    // Location Match (30%)
    const businessLocation = business.location?.toLowerCase();
    if (investor.geographicFocus?.some(l => l.toLowerCase() === businessLocation)) {
      score += 30;
    } else if (investor.funds?.some(fund => 
      fund.geographicFocus?.some(l => l.toLowerCase() === businessLocation)
    )) {
      score += 30;
    } else if (investor.location?.toLowerCase() === businessLocation) {
      score += 20;
    }
    
    // Operation Stage Match (30%)
    const businessStage = business.operationStage?.toLowerCase();
    if (investor.stages?.some(s => s.toLowerCase() === businessStage)) {
      score += 30;
    } else if (investor.funds?.some(fund => 
      fund.stages?.some(s => s.toLowerCase() === businessStage)
    )) {
      score += 30;
    }
    
    return score;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Not Contacted":
        return styles.statusNotContacted;
      case "Applied":
        return styles.statusApplied;
      case "Under Review":
        return styles.statusUnderReview;
      case "Funded":
        return styles.statusFunded;
      case "Rejected":
        return styles.statusRejected;
      default:
        return styles.statusDefault;
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading investor matches...</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      {currentBusiness && (
        <div className={styles.businessSummary}>
          <h3>Matching investors for: {currentBusiness.registeredName || currentBusiness.tradingName || "Your Business"}</h3>
          <p>Sector: {currentBusiness.economicSector} | Location: {currentBusiness.location} | Stage: {currentBusiness.operationStage}</p>
        </div>
      )}
      
      <table className={styles.fundingTable}>
        <thead>
          <tr>
            <th>Funder Name</th>
            <th>% Match</th>
            <th>Investment Type</th>
            <th>Target Stage</th>
            <th>Ticket Size Range</th>
            <th>Sector Focus</th>
            <th>Geographic Focus</th>
            <th>Support Offered</th>
            <th>Application Deadline</th>
            <th>Ave Response time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {funders.length > 0 ? (
            funders.map((funder) => (
              <tr key={funder.id}>
                <td>{funder.name}</td>
                <td className={styles.matchPercentage}>{funder.matchPercentage}%</td>
                <td>{funder.investmentType}</td>
                <td>{funder.targetStage}</td>
                <td>{funder.ticketSize}</td>
                <td>{funder.sectorFocus}</td>
                <td>{funder.geographicFocus}</td>
                <td>{funder.supportOffered}</td>
                <td>{funder.applicationDeadline}</td>
                <td>{funder.responseTime}</td>
                <td>
                  <span className={getStatusClass(funder.status)}>{funder.status}</span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={styles.actionButton} title="View Details">
                      <Eye size={16} />
                    </button>
                    <button className={styles.actionButton} title="Apply">
                      <ExternalLink size={16} />
                    </button>
                    <button className={styles.actionButton} title="Track">
                      <FileText size={16} />
                    </button>
                    <button className={styles.actionButton} title="Feedback">
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className={styles.noResults}>
                No matching investors found. Try adjusting your business profile.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}