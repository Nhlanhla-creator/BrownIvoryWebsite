"use client"

import { useState } from "react"
import styles from "./InvestorDashboard.module.css"

const TopMatches = () => {
  const [selectedCategory, setSelectedCategory] = useState("Customers")

  // Category data for Top Matches
  const categoryData = {
    Customers: [
      {
        name: "Customer A",
        serviceCategory: "Product Support",
        serviceNeeded: "Technical Assistance",
        match: 92,
        location: "Johannesburg",
        dealSize: "R50,000",
        status: "New Lead",
      },
      {
        name: "Customer B",
        serviceCategory: "Consulting",
        serviceNeeded: "Business Strategy",
        match: 87,
        location: "Cape Town",
        dealSize: "R75,000",
        status: "Proposal Sent",
      },
      {
        name: "Customer C",
        serviceCategory: "Implementation",
        serviceNeeded: "System Setup",
        match: 82,
        location: "Durban",
        dealSize: "R30,000",
        status: "Negotiating",
      },
    ],
    Suppliers: [
      {
        name: "Supplier A",
        serviceCategory: "Raw Materials",
        serviceOffered: "Premium Components",
        match: 90,
        location: "Pretoria",
        rating: "4.8/5",
        status: "Available",
      },
      {
        name: "Supplier B",
        serviceCategory: "Logistics",
        serviceOffered: "Express Delivery",
        match: 85,
        location: "Bloemfontein",
        rating: "4.5/5",
        status: "Limited Stock",
      },
      {
        name: "Supplier C",
        serviceCategory: "Equipment",
        serviceOffered: "Industrial Machinery",
        match: 78,
        location: "Port Elizabeth",
        rating: "4.2/5",
        status: "Available",
      },
    ],
    Funders: [
      {
        name: "Funder A",
        investmentType: "Equity",
        match: 88,
        location: "Johannesburg",
        stageFocus: "Series A",
        status: "Accepting Applications",
      },
      {
        name: "Funder B",
        investmentType: "Debt",
        match: 82,
        location: "Cape Town",
        stageFocus: "Growth Stage",
        status: "Due Diligence",
      },
      {
        name: "Funder C",
        investmentType: "Grant",
        match: 75,
        location: "Pretoria",
        stageFocus: "Early Stage",
        status: "Reviewing",
      },
    ],
    Support: [
      {
        name: "Program A",
        programType: "Accelerator",
        match: 91,
        location: "Johannesburg",
        focusArea: "Tech Startups",
        status: "Applications Open",
      },
      {
        name: "Program B",
        programType: "Incubator",
        match: 86,
        location: "Durban",
        focusArea: "Social Enterprise",
        status: "Cohort Starting",
      },
      {
        name: "Program C",
        programType: "ESD",
        match: 79,
        location: "Cape Town",
        focusArea: "Manufacturing",
        status: "Ongoing Support",
      },
    ],
  }

  // Get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case "Customers":
        return "#5D4037" // Dark brown
      case "Suppliers":
        return "#8D6E63" // Medium brown
      case "Funders":
        return "#A67C52" // Light brown
      case "Support":
        return "#BCAAA4" // Pale brown
      default:
        return "#6b7280" // Gray
    }
  }

  return (
    <div className={styles.matchesTableCard}>
      <div className={styles.cardHeader}>
        <h3>Top Matches</h3>
        <div className={styles.categoryTabs}>
          {Object.keys(categoryData).map((category) => (
            <button
              key={category}
              className={`${styles.categoryTab} ${selectedCategory === category ? styles.active : ""}`}
              style={{
                borderColor: selectedCategory === category ? getCategoryColor(category) : "transparent",
              }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.matchesTable}>
        <table>
          <thead>
            <tr>
              {selectedCategory === "Customers" && (
                <>
                  <th>Customer Name</th>
                  <th>Service Category</th>
                  <th>Service Needed</th>
                  <th>% Match</th>
                  <th>Location</th>
                  <th>Deal Size</th>
                  <th>Status</th>
                </>
              )}
              {selectedCategory === "Suppliers" && (
                <>
                  <th>Supplier Name</th>
                  <th>Service Category</th>
                  <th>Service Offered</th>
                  <th>% Match</th>
                  <th>Location</th>
                  <th>Av. Supplier Rating</th>
                  <th>Status</th>
                </>
              )}
              {selectedCategory === "Funders" && (
                <>
                  <th>Funder Name</th>
                  <th>Investment Type</th>
                  <th>% Match</th>
                  <th>Location</th>
                  <th>Stage/Focus</th>
                  <th>Status</th>
                </>
              )}
              {selectedCategory === "Support" && (
                <>
                  <th>Program Name</th>
                  <th>Program Type</th>
                  <th>% Match</th>
                  <th>Location</th>
                  <th>Focus Area</th>
                  <th>Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {categoryData[selectedCategory].map((item, index) => (
              <tr key={index} className={styles.matchRow}>
                {selectedCategory === "Customers" && (
                  <>
                    <td className={styles.investorName}>{item.name}</td>
                    <td>{item.serviceCategory}</td>
                    <td>{item.serviceNeeded}</td>
                    <td className={styles.matchScoreCell}>
                      <div className={styles.matchScoreWrapper}>
                        <div className={styles.matchBar} style={{ width: `${item.match}%` }}></div>
                        <span className={styles.matchPercent}>{item.match}%</span>
                      </div>
                    </td>
                    <td>{item.location}</td>
                    <td>{item.dealSize}</td>
                    <td>
                      <span className={styles.statusBadge}>{item.status}</span>
                    </td>
                  </>
                )}
                {selectedCategory === "Suppliers" && (
                  <>
                    <td className={styles.investorName}>{item.name}</td>
                    <td>{item.serviceCategory}</td>
                    <td>{item.serviceOffered}</td>
                    <td className={styles.matchScoreCell}>
                      <div className={styles.matchScoreWrapper}>
                        <div className={styles.matchBar} style={{ width: `${item.match}%` }}></div>
                        <span className={styles.matchPercent}>{item.match}%</span>
                      </div>
                    </td>
                    <td>{item.location}</td>
                    <td>{item.rating}</td>
                    <td>
                      <span className={styles.statusBadge}>{item.status}</span>
                    </td>
                  </>
                )}
                {selectedCategory === "Funders" && (
                  <>
                    <td className={styles.investorName}>{item.name}</td>
                    <td>{item.investmentType}</td>
                    <td className={styles.matchScoreCell}>
                      <div className={styles.matchScoreWrapper}>
                        <div className={styles.matchBar} style={{ width: `${item.match}%` }}></div>
                        <span className={styles.matchPercent}>{item.match}%</span>
                      </div>
                    </td>
                    <td>{item.location}</td>
                    <td>{item.stageFocus}</td>
                    <td>
                      <span className={styles.statusBadge}>{item.status}</span>
                    </td>
                  </>
                )}
                {selectedCategory === "Support" && (
                  <>
                    <td className={styles.investorName}>{item.name}</td>
                    <td>{item.programType}</td>
                    <td className={styles.matchScoreCell}>
                      <div className={styles.matchScoreWrapper}>
                        <div className={styles.matchBar} style={{ width: `${item.match}%` }}></div>
                        <span className={styles.matchPercent}>{item.match}%</span>
                      </div>
                    </td>
                    <td>{item.location}</td>
                    <td>{item.focusArea}</td>
                    <td>
                      <span className={styles.statusBadge}>{item.status}</span>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopMatches
