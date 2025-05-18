"use client"

import { useState } from "react"
import "./top-matches.css"

export function TopMatchesTable({ selectedCategory: initialCategory = "Customers" }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

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

  const getStatusClass = (status) => {
    if (
      status.includes("New") ||
      status.includes("Open") ||
      status.includes("Available") ||
      status.includes("Accepting")
    ) {
      return "status-positive"
    } else if (
      status.includes("Limited") ||
      status.includes("Reviewing") ||
      status.includes("Due") ||
      status.includes("Negotiating")
    ) {
      return "status-pending"
    } else {
      return "status-neutral"
    }
  }

  const getMatchClass = (match) => {
    if (match >= 90) {
      return "match-excellent"
    } else if (match >= 80) {
      return "match-good"
    } else {
      return "match-average"
    }
  }

  return (
    <div className="top-matches-container">
      <div className="top-matches-header">
        <h3>Top Matches</h3>
        <div className="category-tabs">
          {Object.keys(categoryData).map((category) => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="matches-table">
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
              <tr key={index} className={index % 2 === 0 ? "row-even" : "row-odd"}>
                {selectedCategory === "Customers" && (
                  <>
                    <td className="name-cell">{item.name}</td>
                    <td>{item.serviceCategory}</td>
                    <td>{item.serviceNeeded}</td>
                    <td className={`match-cell ${getMatchClass(item.match)}`}>{item.match}%</td>
                    <td>{item.location}</td>
                    <td>{item.dealSize}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(item.status)}`}>{item.status}</span>
                    </td>
                  </>
                )}
                {selectedCategory === "Suppliers" && (
                  <>
                    <td className="name-cell">{item.name}</td>
                    <td>{item.serviceCategory}</td>
                    <td>{item.serviceOffered}</td>
                    <td className={`match-cell ${getMatchClass(item.match)}`}>{item.match}%</td>
                    <td>{item.location}</td>
                    <td>{item.rating}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(item.status)}`}>{item.status}</span>
                    </td>
                  </>
                )}
                {selectedCategory === "Funders" && (
                  <>
                    <td className="name-cell">{item.name}</td>
                    <td>{item.investmentType}</td>
                    <td className={`match-cell ${getMatchClass(item.match)}`}>{item.match}%</td>
                    <td>{item.location}</td>
                    <td>{item.stageFocus}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(item.status)}`}>{item.status}</span>
                    </td>
                  </>
                )}
                {selectedCategory === "Support" && (
                  <>
                    <td className="name-cell">{item.name}</td>
                    <td>{item.programType}</td>
                    <td className={`match-cell ${getMatchClass(item.match)}`}>{item.match}%</td>
                    <td>{item.location}</td>
                    <td>{item.focusArea}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(item.status)}`}>{item.status}</span>
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
