"use client"

import { useState } from "react"
import { Eye, FileText, MessageCircle, ExternalLink } from "lucide-react"
import styles from "./support-programs.module.css"

export function SupportProgramTable() {
  const [programs] = useState([
    {
      id: "1",
      name: "Program A",
      type: "Accelerator",
      matchPercentage: 92,
      location: "Johannesburg, South Africa",
      sectorFocus: "ICT, Fintech",
      targetStage: "Startup, Growth",
      supportOffers: "Mentorship, Market Access, Technical Support",
      duration: "6 months",
      deliveryMode: "Hybrid",
      applicationDeadline: "2025-06-15",
      status: "New",
    },
    {
      id: "2",
      name: "Program B",
      type: "Incubator",
      matchPercentage: 87,
      location: "Cape Town, South Africa",
      sectorFocus: "Agriculture, Clean Energy",
      targetStage: "Startup",
      supportOffers: "Mentorship, Funding Access",
      duration: "12 months",
      deliveryMode: "Virtual",
      applicationDeadline: "2025-07-01",
      status: "Applied",
    },
    {
      id: "3",
      name: "Program C",
      type: "ESD",
      matchPercentage: 85,
      location: "Durban, South Africa",
      sectorFocus: "Manufacturing",
      targetStage: "Growth, Maturity",
      supportOffers: "Technical Support, Export Readiness",
      duration: "9 months",
      deliveryMode: "Onsite",
      applicationDeadline: "2025-06-30",
      status: "Interview",
    },
    {
      id: "4",
      name: "Program D",
      type: "Accelerator",
      matchPercentage: 80,
      location: "Pretoria, South Africa",
      sectorFocus: "Healthcare, Biotech",
      targetStage: "Growth",
      supportOffers: "Mentorship, Market Access",
      duration: "4 months",
      deliveryMode: "Virtual",
      applicationDeadline: "2025-08-15",
      status: "Accepted",
    },
    {
      id: "5",
      name: "Program E",
      type: "ESD",
      matchPercentage: 78,
      location: "Bloemfontein, South Africa",
      sectorFocus: "Retail, E-commerce",
      targetStage: "Startup, Growth",
      supportOffers: "Funding Access, Technical Support",
      duration: "6 months",
      deliveryMode: "Hybrid",
      applicationDeadline: "2025-07-15",
      status: "Rejected",
    },
  ])

  const getStatusClass = (status) => {
    switch (status) {
      case "New":
        return styles.statusNew
      case "Applied":
        return styles.statusApplied
      case "Interview":
        return styles.statusInterview
      case "Accepted":
        return styles.statusAccepted
      case "Rejected":
        return styles.statusRejected
      default:
        return styles.statusDefault
    }
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.programTable}>
        <thead>
          <tr>
            <th>Program Name</th>
            <th>Program Type</th>
            <th>% Match</th>
            <th>Location</th>
            <th>Sector Focus</th>
            <th>Target Stage</th>
            <th>Support Offers</th>
            <th>Program Duration</th>
            <th>Delivery Mode</th>
            <th>Application Deadline</th>
            <th>Status</th>
            <th>Action/View</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program.id}>
              <td>{program.name}</td>
              <td>{program.type}</td>
              <td className={styles.matchPercentage}>{program.matchPercentage}%</td>
              <td>{program.location}</td>
              <td>{program.sectorFocus}</td>
              <td>{program.targetStage}</td>
              <td>{program.supportOffers}</td>
              <td>{program.duration}</td>
              <td>{program.deliveryMode}</td>
              <td>{program.applicationDeadline}</td>
              <td>
                <span className={getStatusClass(program.status)}>{program.status}</span>
              </td>
              <td>
                <div className={styles.actionButtons}>
                  <button className={styles.actionButton} title="View Details">
                    <Eye size={16} />
                  </button>
                  <button className={styles.actionButton} title="Apply">
                    <ExternalLink size={16} />
                  </button>
                  <button className={styles.actionButton} title="Documents">
                    <FileText size={16} />
                  </button>
                  <button className={styles.actionButton} title="Message">
                    <MessageCircle size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
