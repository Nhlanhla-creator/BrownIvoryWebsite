"use client";

import { useState } from "react";
import { Eye, FileText, MessageCircle, Phone, Star } from "lucide-react";
import styles from "./suppliers.module.css";

export function SupplierTable() {
  const [suppliers] = useState([
    {
      id: "1",
      name: "Supplier A",
      serviceCategory: "Legal",
      serviceOffered: "Contract Law",
      sectorExperience: "Finance, ICT",
      matchPercentage: 92,
      location: "Johannesburg, South Africa",
      bbbeeLevel: "Level 1",
      budgetFit: "High",
      availability: "Immediate",
      deliveryMode: "Remote",
      rating: 4.8,
      status: "New Lead",
    },
    {
      id: "2",
      name: "Supplier B",
      serviceCategory: "Accounting",
      serviceOffered: "Financial Statements",
      sectorExperience: "Retail, Manufacturing",
      matchPercentage: 87,
      location: "Cape Town, South Africa",
      bbbeeLevel: "Level 2",
      budgetFit: "Medium",
      availability: "Within 1 week",
      deliveryMode: "On-site",
      rating: 4.5,
      status: "Engaged",
    },
    {
      id: "3",
      name: "Supplier C",
      serviceCategory: "IT",
      serviceOffered: "Software Development",
      sectorExperience: "Finance, Healthcare",
      matchPercentage: 85,
      location: "Durban, South Africa",
      bbbeeLevel: "Level 3",
      budgetFit: "High",
      availability: "Within 1 month",
      deliveryMode: "Hybrid",
      rating: 4.7,
      status: "Negotiating",
    },
    {
      id: "4",
      name: "Supplier D",
      serviceCategory: "Marketing",
      serviceOffered: "Digital Marketing",
      sectorExperience: "Retail, Tourism",
      matchPercentage: 80,
      location: "Pretoria, South Africa",
      bbbeeLevel: "Level 4",
      budgetFit: "Medium",
      availability: "Immediate",
      deliveryMode: "Remote",
      rating: 4.2,
      status: "Contracted",
    },
    {
      id: "5",
      name: "Supplier E",
      serviceCategory: "HR",
      serviceOffered: "Recruitment",
      sectorExperience: "All sectors",
      matchPercentage: 78,
      location: "Bloemfontein, South Africa",
      bbbeeLevel: "Level 2",
      budgetFit: "Low",
      availability: "Within 1 week",
      deliveryMode: "On-site",
      rating: 4.0,
      status: "Completed",
    },
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case "New Lead":
        return styles.statusNew;
      case "Engaged":
        return styles.statusEngaged;
      case "Negotiating":
        return styles.statusNegotiating;
      case "Contracted":
        return styles.statusContracted;
      case "Completed":
        return styles.statusCompleted;
      default:
        return styles.statusDefault;
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={14} fill="#8D6E63" color="#8D6E63" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className={styles.halfStar}>
          <Star size={14} fill="#8D6E63" color="#8D6E63" />
        </div>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={14} color="#8D6E63" />);
    }

    return (
      <div className={styles.starRating}>
        {stars} ({rating.toFixed(1)})
      </div>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.supplierTable}>
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Service Category</th>
            <th>Service Offered</th>
            <th>Sector Experience</th>
            <th>% Match</th>
            <th>Location</th>
            <th>BBBEE Level</th>
            <th>Budget Fit</th>
            <th>Availability</th>
            <th>Delivery Mode</th>
            <th>Av. Supplier Rating</th>
            <th>Engagement Status</th>
            <th>Action/View</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.serviceCategory}</td>
              <td>{supplier.serviceOffered}</td>
              <td>{supplier.sectorExperience}</td>
              <td className={styles.matchPercentage}>{supplier.matchPercentage}%</td>
              <td>{supplier.location}</td>
              <td>{supplier.bbbeeLevel}</td>
              <td>{supplier.budgetFit}</td>
              <td>{supplier.availability}</td>
              <td>{supplier.deliveryMode}</td>
              <td>{renderStars(supplier.rating)}</td>
              <td>
                <span className={getStatusClass(supplier.status)}>{supplier.status}</span>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
