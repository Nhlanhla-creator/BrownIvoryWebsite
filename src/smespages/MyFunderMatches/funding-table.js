"use client"

import { useState, useEffect } from "react"
import { Eye, ExternalLink, Search } from "lucide-react"
import styles from "./funding.module.css"
import { db } from "../../firebaseConfig"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Configuration matching Python implementation
const ADJACENT_INDUSTRIES = {
  "ict": ["technology", "software", "digital services"],
  "education": ["e-learning", "training", "edtech"],
  "manufacturing": ["construction", "engineering", "industrial"],
  "healthcare": ["medtech", "biotech", "pharmaceuticals"]
}

const FUNDING_STAGES = ["Pre-Seed", "Seed", "Series A", "Series B", "Growth"]

export function FundingTable({ filters }) {
  const [funders, setFunders] = useState([])
  const [currentBusiness, setCurrentBusiness] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth()
        const user = auth.currentUser
        
        if (!user) throw new Error("User not authenticated")

        // Fetch business profile with financial data
        const businessRef = doc(db, "universalProfiles", user.uid)
        const businessSnap = await getDoc(businessRef)
        
        if (!businessSnap.exists()) throw new Error("Business profile not found")
        
        const businessData = {
          ...businessSnap.data().entityOverview,
          financials: businessSnap.data().financialOverview,
          useOfFunds: businessSnap.data().useOfFunds
        }
        setCurrentBusiness(businessData)

        // Fetch investors and funds
        const investorsSnapshot = await getDocs(collection(db, "MyuniversalProfiles"))
        const matchedFunds = []

        investorsSnapshot.forEach(investorDoc => {
          const funds = investorDoc.data().productsServices?.funds || []
          
          funds.forEach(fund => {
            const matchScore = calculateMatchScore(businessData, fund)
            
            if (matchScore >= 6) { // Minimum score threshold
              matchedFunds.push({
                id: `${investorDoc.id}_${fund.name}`,
                name: fund.name || "Unnamed Fund",
                matchPercentage: matchScore,
                investmentType: fund.type?.join(", ") || "Various",
                targetStage: fund.stages?.join(", ") || "Various",
                ticketSize: formatTicketSize(fund.ticketMin, fund.ticketMax),
                sectorFocus: fund.sectorFocus?.join(", ") || "Various",
                geographicFocus: fund.geographicFocus?.join(", ") || "Various",
                supportOffered: fund.support?.join(", ") || "Not specified",
                minInvestment: Number(fund.ticketMin) || 0,
                maxInvestment: Number(fund.ticketMax) || 0,
                ...fund
              })
            }
          })
        })

        // Hybrid Gale-Shapley inspired sorting
        const sortedFunds = matchedFunds.sort((a, b) => 
          b.matchPercentage - a.matchPercentage || 
          a.minInvestment - b.minInvestment
        )
        
        setFunders(sortedFunds)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

   const calculateMatchScore = (business, fund) => {
    let score = 0
    const businessSector = (business.economicSector || "").toLowerCase().trim()
    const businessStage = (business.operationStage || "").toLowerCase().trim()
    const businessLocation = (business.location || "").toLowerCase().trim()
    const requestedAmount = parseFloat(business.useOfFunds?.amountRequested || 0)

    // Industry Match (30%)
    if (fund.sectorFocus?.some(s => s.toLowerCase() === businessSector)) {
      score += 30
    } else if (ADJACENT_INDUSTRIES[businessSector]?.some(ai => 
      fund.sectorFocus?.includes(ai))) {
      score += 20
    }

    // Stage Match (30%)
    const stageIndex = FUNDING_STAGES.indexOf(business.operationStage)
    const fundStageIndex = FUNDING_STAGES.indexOf(fund.stages?.[0])
    if (stageIndex === fundStageIndex) {
      score += 30
    } else if (Math.abs(stageIndex - fundStageIndex) === 1) {
      score += 15
    }

    // Financial Match (25%)
    const min = parseFloat(fund.ticketMin || 0)
    const max = parseFloat(fund.ticketMax || Infinity)
    if (requestedAmount >= min && requestedAmount <= max) {
      score += 25
    } else {
      const midpoint = (min + max) / 2
      const penalty = Math.abs(requestedAmount - midpoint) / (max - min) * 25
      score += Math.max(0, 25 - penalty)
    }

    // Location Match (15%)
    if (fund.geographicFocus?.some(l => l.toLowerCase() === businessLocation)) {
      score += 15
    }

    return Math.min(100, Math.round(score)) // Cap at 100%
  }

  const formatTicketSize = (min, max) => {
    if (!min && !max) return "Not specified"
    return `R${Number(min).toLocaleString()} - R${Number(max).toLocaleString()}`
  }


  return (
    <div>
      <div className={styles.tableHeader}>
        <h2 className={styles.sectionTitle}>Funding Matches</h2>
        {currentBusiness && (
          <div className={styles.businessSummary}>
            Matching for: {currentBusiness.registeredName || "Your Business"} | 
            Sector: {currentBusiness.economicSector || "N/A"} | 
            Location: {currentBusiness.location || "N/A"} | 
            Stage: {currentBusiness.operationStage || "N/A"}
          </div>
        )}
        <div className={styles.tableSearch}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search funders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.tableStats}>
          <span className={styles.statItem}>
            <span className={styles.statValue}>{funders.length}</span> matches
          </span>
          <span className={styles.statItem}>
            <span className={styles.statValue}>
              {funders.filter(f => f.matchPercentage >= 80).length}
            </span> high matches
          </span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading matches...</p>
          </div>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {funders.length > 0 ? (
                funders.map(funder => (
                  <tr key={funder.id}>
                    <td className={styles.funderName}>{funder.name}</td>
                    <td className={styles.matchPercentage}>
                      <div className={styles.matchBarContainer}>
                        <div 
                          className={styles.matchBar} 
                          style={{ width: `${funder.matchPercentage}%` }}
                        ></div>
                        <span>{funder.matchPercentage}%</span>
                      </div>
                    </td>
                    <td>{funder.investmentType}</td>
                    <td>{funder.targetStage}</td>
                    <td>{funder.ticketSize}</td>
                    <td>{funder.sectorFocus}</td>
                    <td>{funder.geographicFocus}</td>
                    <td>{funder.supportOffered}</td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button className={styles.actionButton} title="View Details">
                          <Eye size={14} />
                        </button>
                        <button className={styles.actionButton} title="Apply">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className={styles.noResults}>
                    {!loading && 'No matching funds found. Try adjusting your filters.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}