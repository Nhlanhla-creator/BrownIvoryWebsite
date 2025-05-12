"use client";

import { useState } from "react";
import { Eye, FileText, MessageCircle, ExternalLink } from "lucide-react";
import styles from "./funding.module.css";

export function FundingTable() {
  const [funders] = useState([
    {
      id: "1",
      name: "Funder A",
      matchPercentage: 92,
      investmentType: "Equity, Convertible",
      targetStage: "Seed, Series A",
      ticketSize: "$50K - $500K",
      sectorFocus: "ICT, Agri, Energy",
      geographicFocus: "South Africa",
      supportOffered: "Mentorship, Technical Assistance",
      applicationDeadline: "2025-06-15",
      responseTime: "5 days",
      status: "Rejected",
    },
    {
      id: "2",
      name: "Funder B",
      matchPercentage: 87,
      investmentType: "Debt, Blended",
      targetStage: "Growth, Maturity",
      ticketSize: "$200K - $2M",
      sectorFocus: "Manufacturing, Retail",
      geographicFocus: "SADC Region",
      supportOffered: "Market Access, ESG Support",
      applicationDeadline: "2025-07-01",
      responseTime: "7 days",
      status: "Funded",
    },
    {
      id: "3",
      name: "Funder C",
      matchPercentage: 85,
      investmentType: "Grant, Equity",
      targetStage: "Pre-seed, Seed",
      ticketSize: "$10K - $100K",
      sectorFocus: "Healthcare, Education",
      geographicFocus: "South Africa, Namibia",
      supportOffered: "Mentorship, Network Access",
      applicationDeadline: "2025-06-30",
      responseTime: "10 days",
      status: "Under Review",
    },
    {
      id: "4",
      name: "Funder D",
      matchPercentage: 80,
      investmentType: "Equity",
      targetStage: "Series A, Growth",
      ticketSize: "$500K - $5M",
      sectorFocus: "ICT, Financial Services",
      geographicFocus: "Africa (All)",
      supportOffered: "Technical Assistance",
      applicationDeadline: "2025-08-15",
      responseTime: "14 days",
      status: "Not Contacted",
    },
    {
      id: "5",
      name: "Funder E",
      matchPercentage: 78,
      investmentType: "Debt",
      targetStage: "Maturity, Turnaround",
      ticketSize: "$1M - $10M",
      sectorFocus: "Manufacturing, Mining",
      geographicFocus: "South Africa",
      supportOffered: "None",
      applicationDeadline: "2025-07-15",
      responseTime: "3 days",
      status: "Applied",
    },
  ]);

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

  return (
    <div className={styles.tableContainer}>
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
          {funders.map((funder) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}