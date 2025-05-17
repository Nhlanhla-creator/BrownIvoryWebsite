"use client"

import { useState, useEffect } from "react"
import { Eye, ExternalLink, Search } from "lucide-react"
import styles from "./funding.module.css"
import { db } from "../../firebaseConfig"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const ADJACENT_INDUSTRIES = {
  ict: ["technology", "software", "digital services"],
  education: ["e-learning", "training", "edtech"],
  manufacturing: ["construction", "engineering", "industrial"],
  healthcare: ["medtech", "biotech", "pharmaceuticals"]
}

const FUNDING_STAGES = ["Pre-Seed", "Seed", "Series A", "Series B", "Growth"]

const DOCUMENTS = [
  "Pitch Deck",
  "Business Plan",
  "Company Registration Certificate ",
  "Certified IDs of Directors & Shareholders",
  "Share Register",
  "Proof of Address (Utility Bill, Lease Agreement)",
  "Tax Clearance Certificate",
  "Use of Funds Breakdown",
  "B-BBEE Certificate",
  "VAT/UIF/PAYE/COIDA Certificates",
  "Industry Accreditations",
  "Company Profile / Brochure",
  "Client References )",  
  "5 Year Budget (Income Statement, Cashflows, Balance Sheet) ",
  "Previous Program Reports",
  "Bank Statements (6 months) ",
  "Bank Details Confirmation Letter",
  "Loan Agreements ",
  "Financial Statements",
  "Support Letters / Endorsements ",
  "Scope of Work"
]

export function FundingTable({ filters }) {
  const [funders, setFunders] = useState([])
  const [currentBusiness, setCurrentBusiness] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [statuses, setStatuses] = useState({})
  const [modalFunder, setModalFunder] = useState(null)
  const [applyingFunder, setApplyingFunder] = useState(null)
  const [selectedDocs, setSelectedDocs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create demo business profile for testing
        const demoBusiness = {
          economicSector: "technology",
          operationStage: "Seed",
          location: "Gauteng",
          useOfFunds: {
            amountRequested: "1000000" // R1,000,000
          }
        }
        setCurrentBusiness(demoBusiness)

        // Create demo funder that will match perfectly with the demo business
        const demoFunder = {
          id: "demo_funder_123",
          name: "Demo ",
          matchPercentage: 100,
          investmentType: "Equity",
          targetStage: "Seed",
          ticketSize: "R500,000 - R2,000,000",
          sectorFocus: "Technology",
          geographicFocus: "Gauteng, Western Cape",
          supportOffered: "Mentorship",
          website: "https://demo-venture-capital.example.com",
          minInvestment: 500000,
          maxInvestment: 2000000,
          stages: ["Seed"],
          type: ["Equity", "Convertible Note"],
          ticketMin: "500000",
          ticketMax: "2000000"
        }

        // Normally you would fetch from Firestore here, but for demo we'll just use our test funder
        setFunders([demoFunder])
        
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const calculateMatchScore = (business, fund) => {
    // For demo purposes, we'll just return the match percentage from our demo funder
    if (fund.id === "demo_funder_123") return 100
    
    let score = 0
    const businessSector = (business.economicSector || "").toLowerCase().trim()
    const businessStage = (business.operationStage || "").toLowerCase().trim()
    const businessLocation = (business.location || "").toLowerCase().trim()
    const requestedAmount = parseFloat(business.useOfFunds?.amountRequested || 0)

    if (fund.sectorFocus?.some(s => s.toLowerCase() === businessSector)) {
      score += 30
    } else if (ADJACENT_INDUSTRIES[businessSector]?.some(ai =>
      fund.sectorFocus?.includes(ai))) {
      score += 20
    }

    const stageIndex = FUNDING_STAGES.indexOf(business.operationStage)
    const fundStageIndex = FUNDING_STAGES.indexOf(fund.stages?.[0])
    if (stageIndex === fundStageIndex) {
      score += 30
    } else if (Math.abs(stageIndex - fundStageIndex) === 1) {
      score += 15
    }

    const min = parseFloat(fund.ticketMin || 0)
    const max = parseFloat(fund.ticketMax || Infinity)
    if (requestedAmount >= min && requestedAmount <= max) {
      score += 25
    } else {
      const midpoint = (min + max) / 2
      const penalty = Math.abs(requestedAmount - midpoint) / (max - min) * 25
      score += Math.max(0, 25 - penalty)
    }

    if (fund.geographicFocus?.some(l => l.toLowerCase() === businessLocation)) {
      score += 15
    }

    return Math.min(100, Math.round(score))
  }

  const formatTicketSize = (min, max) => {
    if (!min && !max) return "Not specified"
    return `R${Number(min).toLocaleString()} - R${Number(max).toLocaleString()}`
  }

  const handleSendClick = (funderId) => {
    setApplyingFunder(funderId)
    setSelectedDocs([])
  }

  const confirmApplication = () => {
    setStatuses(prev => ({ ...prev, [applyingFunder]: "Under Review" }))
    setApplyingFunder(null)
  }

  const toggleDoc = (doc) => {
    setSelectedDocs(prev =>
      prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc]
    )
  }

  const closeModal = () => setModalFunder(null)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className={modalFunder || applyingFunder ? styles.blurredContainer : ""}>
      <h2 className={styles.sectionTitle}>Funding Matches</h2>
      
      {funders.length === 0 ? (
        <p>No matching funders found. Try adjusting your business profile.</p>
      ) : (
        <table className={styles.fundingTable}>
          <thead>
            <tr>
            <th>Funder</th>
                <th>Match</th>
                <th>Type</th>
                <th>Stage</th>
                <th>Ticket Size</th>
                <th>Sector</th>
                <th>Location</th>
                <th>Support</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
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
                  <button onClick={() => setModalFunder(funder)}>View Profile</button>
                  {statuses[funder.id] ? (
                    <span>Application Sent</span>
                  ) : (
                    <button onClick={() => handleSendClick(funder.id)}>Send Application</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* View Profile Modal */}
      {modalFunder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{modalFunder.name}</h3>
              <button onClick={closeModal}>✖</button>
            </div>
            <div>
              <p><strong>Match Score:</strong> {modalFunder.matchPercentage}%</p>
              <p><strong>Investment Type:</strong> {modalFunder.investmentType}</p>
              <p><strong>Target Stage:</strong> {modalFunder.targetStage}</p>
              <p><strong>Sector Focus:</strong> {modalFunder.sectorFocus}</p>
              <p><strong>Ticket Size:</strong> {modalFunder.ticketSize}</p>
              <p><strong>Geographic Focus:</strong> {modalFunder.geographicFocus}</p>
              <p><strong>Support Offered:</strong> {modalFunder.supportOffered}</p>
              <p><strong>Website:</strong> <a href={modalFunder.website} target="_blank" rel="noreferrer">{modalFunder.website}</a></p>
            </div>
          </div>
        </div>
      )}

      {/* Send Application Modal */}
      {applyingFunder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Select Documents to Send</h3>
              <button onClick={() => setApplyingFunder(null)}>✖</button>
            </div>
            <div>
              {DOCUMENTS.map(doc => (
                <label key={doc}>
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(doc)}
                    onChange={() => toggleDoc(doc)}
                  />{" "}
                  {doc}
                </label>
              ))}
            </div>
            <button
              onClick={confirmApplication}
              disabled={selectedDocs.length === 0}
            >
              Submit Application
            </button>
          </div>
        </div>
      )}
    </div>
  )
}