"use client"

import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./top-matches.css";

export function TopMatchesTable({ selectedCategory: initialCategory = "Funders" }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [funderMatches, setFunderMatches] = useState([]);

  useEffect(() => {
    const fetchFunderApplications = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const q = query(collection(db, "smeApplications"), where("smeId", "==", user.uid));
        const snapshot = await getDocs(q);

        const results = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().fundName,
          investmentType: doc.data().investmentType,
          match: doc.data().matchPercentage,
          location: doc.data().location,
          stageFocus: doc.data().stage,
          status: doc.data().status
        }));

        setFunderMatches(results);
      } catch (error) {
        console.error("Failed to load funder matches:", error);
      }
    };

    if (selectedCategory === "Funders") {
      fetchFunderApplications();
    }
  }, [selectedCategory]);

  const getStatusClass = (status) => {
    if (["New", "Open", "Available", "Accepting", "Application Received"].some(s => status.includes(s))) {
      return "status-positive";
    } else if (["Limited", "Reviewing", "Due", "Negotiating"].some(s => status.includes(s))) {
      return "status-pending";
    } else {
      return "status-neutral";
    }
  };

  const getMatchClass = (match) => {
    if (match >= 90) return "match-excellent";
    if (match >= 80) return "match-good";
    return "match-average";
  };

  return (
    <div className="top-matches-container">
      <div className="top-matches-header">
        <h3>Top Matches</h3>
        <div className="category-tabs">
          {["Funders"].map((category) => (
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
              <th>Funder Name</th>
              <th>Investment Type</th>
              <th>% Match</th>
              <th>Location</th>
              <th>Stage/Focus</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {funderMatches.length === 0 ? (
              <tr>
                <td colSpan="6">No submitted applications yet.</td>
              </tr>
            ) : (
              funderMatches.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "row-even" : "row-odd"}>
                  <td className="name-cell">{item.name}</td>
                  <td>{item.investmentType}</td>
                  <td className={`match-cell ${getMatchClass(item.match)}`}>{item.match}%</td>
                  <td>{item.location}</td>
                  <td>{item.stageFocus}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
