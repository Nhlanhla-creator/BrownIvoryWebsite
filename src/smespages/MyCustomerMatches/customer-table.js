"use client"

import { useState } from "react"
import { Eye, FileText, MessageCircle, Phone } from "lucide-react"
import styles from "./customers.module.css"

export function CustomerTable() {
  const [customers] = useState([
    {
      id: "1",
      name: "Customer A",
      entity: "Pty Ltd",
      serviceCategory: "Legal",
      specificService: "Tax Return Filing",
      matchPercentage: 92,
      location: "Johannesburg, South Africa",
      dealSize: "$15,000",
      urgency: "Immediate (1 week)",
      startDate: "2025-05-20",
      status: "New Lead",
    },
    {
      id: "2",
      name: "Customer B",
      entity: "CC",
      serviceCategory: "Accounting",
      specificService: "Financial Statements",
      matchPercentage: 87,
      location: "Cape Town, South Africa",
      dealSize: "$8,500",
      urgency: "Urgent (1 month)",
      startDate: "2025-06-01",
      status: "Proposal Sent",
    },
    {
      id: "3",
      name: "Customer C",
      entity: "NGO",
      serviceCategory: "IT",
      specificService: "Custom App Development",
      matchPercentage: 78,
      location: "Durban, South Africa",
      dealSize: "$45,000",
      urgency: "Standard (2-3 months)",
      startDate: "2025-07-15",
      status: "In Discussions",
    },
    {
      id: "4",
      name: "Customer D",
      entity: "Pty Ltd",
      serviceCategory: "Marketing",
      specificService: "Digital Marketing Campaign",
      matchPercentage: 85,
      location: "Pretoria, South Africa",
      dealSize: "$22,000",
      urgency: "Urgent (1 month)",
      startDate: "2025-06-10",
      status: "Negotiating",
    },
    {
      id: "5",
      name: "Customer E",
      entity: "Co-op",
      serviceCategory: "Accounting",
      specificService: "Tax Return Filing",
      matchPercentage: 90,
      location: "Bloemfontein, South Africa",
      dealSize: "$7,500",
      urgency: "Immediate (1 week)",
      startDate: "2025-05-25",
      status: "Delivered",
    },
  ])

  const getStatusClass = (status) => {
    switch (status) {
      case "New Lead":
        return styles.statusNew
      case "Proposal Sent":
        return styles.statusProposal
      case "In Discussions":
        return styles.statusDiscussion
      case "Negotiating":
        return styles.statusNegotiating
      case "Delivered":
        return styles.statusDelivered
      default:
        return styles.statusDefault
    }
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.customerTable}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer Entity</th>
            <th>Service Category</th>
            <th>Specific Service Needed</th>
            <th>% Match</th>
            <th>Location</th>
            <th>Estimated Deal Size/Budget</th>
            <th>Urgency</th>
            <th>Preferred Start Date</th>
            <th>Engagement Status</th>
            <th>Action/View</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-t hover:bg-gray-50">
              <td>{customer.name}</td>
              <td>{customer.entity}</td>
              <td>{customer.serviceCategory}</td>
              <td>{customer.specificService}</td>
              <td className={styles.matchPercentage}>{customer.matchPercentage}%</td>
              <td>{customer.location}</td>
              <td>{customer.dealSize}</td>
              <td>{customer.urgency}</td>
              <td>{customer.startDate}</td>
              <td>
                <span className={getStatusClass(customer.status)}>{customer.status}</span>
              </td>
              <td>
                <div className={styles.actionButtons}>
                  <button className={styles.actionButton} title="View Details">
                    <Eye size={16} />
                  </button>
                  <button className={styles.actionButton} title="Documents">
                    <FileText size={16} />
                  </button>
                  <button className={styles.actionButton} title="Message">
                    <MessageCircle size={16} />
                  </button>
                  <button className={styles.actionButton} title="Call">
                    <Phone size={16} />
                  </button>
                </div>
              </td>
              <td>
                <button className="text-blue-500 hover:underline">Add Note</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
