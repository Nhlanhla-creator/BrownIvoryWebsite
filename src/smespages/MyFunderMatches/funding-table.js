"use client"

import { useState, useEffect } from "react"
import { Eye, ExternalLink, Search } from "lucide-react"
import styles from "./funding.module.css"

// Mock data for demonstration
const mockFunders = [
  {
    id: "1",
    name: "Brown Capital Ventures",
    matchPercentage: 95,
    investmentType: "Equity",
    targetStage: "Seed, Series A",
    ticketSize: "R500,000 - R5,000,000",
    sectorFocus: "ICT, Fintech",
    geographicFocus: "South Africa",
    supportOffered: "Mentorship, Technical Assistance",
    applicationDeadline: "2023-12-31",
    responseTime: "3-5 days",
    status: "Not Contacted",
  },
  {
    id: "2",
    name: "Savanna Growth Fund",
    matchPercentage: 88,
    investmentType: "Debt",
    targetStage: "Growth",
    ticketSize: "R2,000,000 - R10,000,000",
    sectorFocus: "Agriculture, Manufacturing",
    geographicFocus: "Southern Africa",
    supportOffered: "Market Access",
    applicationDeadline: "2023-11-15",
    responseTime: "7-10 days",
    status: "Applied",
  },
  {
    id: "3",
    name: "Umoja Impact Investors",
    matchPercentage: 85,
    investmentType: "Blended Finance",
    targetStage: "Early Growth",
    ticketSize: "R1,000,000 - R8,000,000",
    sectorFocus: "Clean Energy, Agriculture",
    geographicFocus: "East Africa, South Africa",
    supportOffered: "Technical Assistance, ESG Support",
    applicationDeadline: "2023-10-30",
    responseTime: "5-7 days",
    status: "Under Review",
  },
  {
    id: "4",
    name: "Baobab Venture Partners",
    matchPercentage: 82,
    investmentType: "Equity, Convertible Note",
    targetStage: "Seed",
    ticketSize: "R250,000 - R3,000,000",
    sectorFocus: "Healthcare, EdTech",
    geographicFocus: "South Africa, Botswana",
    supportOffered: "Mentorship, Network Access",
    applicationDeadline: "2023-12-15",
    responseTime: "2-4 days",
    status: "Not Contacted",
  },
  {
    id: "5",
    name: "Serengeti Growth Capital",
    matchPercentage: 80,
    investmentType: "Equity",
    targetStage: "Series A, Growth",
    ticketSize: "R5,000,000 - R20,000,000",
    sectorFocus: "Retail, Logistics",
    geographicFocus: "Pan-African",
    supportOffered: "Strategic Partnerships",
    applicationDeadline: "2023-11-30",
    responseTime: "7-14 days",
    status: "Not Contacted",
  },
  {
    id: "6",
    name: "Acacia Innovation Fund",
    matchPercentage: 78,
    investmentType: "Grant, Equity",
    targetStage: "Pre-seed, Seed",
    ticketSize: "R100,000 - R1,500,000",
    sectorFocus: "AgriTech, CleanTech",
    geographicFocus: "South Africa",
    supportOffered: "Technical Assistance, Mentorship",
    applicationDeadline: "2023-10-15",
    responseTime: "5-10 days",
    status: "Funded",
  },
  {
    id: "7",
    name: "Kalahari Angels",
    matchPercentage: 75,
    investmentType: "Equity, Convertible Note",
    targetStage: "Seed",
    ticketSize: "R250,000 - R2,000,000",
    sectorFocus: "ICT, E-commerce",
    geographicFocus: "Southern Africa",
    supportOffered: "Mentorship, Network Access",
    applicationDeadline: "2023-12-01",
    responseTime: "3-5 days",
    status: "Rejected",
  },
  {
    id: "8",
    name: "Sahara Development Bank",
    matchPercentage: 72,
    investmentType: "Debt",
    targetStage: "Growth, Mature",
    ticketSize: "R5,000,000 - R50,000,000",
    sectorFocus: "Manufacturing, Infrastructure",
    geographicFocus: "Africa-wide",
    supportOffered: "Financial Advisory",
    applicationDeadline: "2023-11-20",
    responseTime: "14-21 days",
    status: "Not Contacted",
  },
]

export function FundingTable({ filters }) {
  const [funders, setFunders] = useState(mockFunders)
  const [filteredFunders, setFilteredFunders] = useState(mockFunders)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

  // Apply filters when they change
  useEffect(() => {
    setLoading(true)

    // Filter the funders based on the current filters
    let filtered = [...funders]

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (funder) =>
          funder.name.toLowerCase().includes(term) ||
          funder.sectorFocus.toLowerCase().includes(term) ||
          funder.geographicFocus.toLowerCase().includes(term),
      )
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter((funder) => funder.geographicFocus.includes(filters.location))
    }

    // Apply match score filter
    if (filters.matchScore) {
      filtered = filtered.filter((funder) => funder.matchPercentage >= filters.matchScore)
    }

    // Apply investment range filter
    if (filters.minValue) {
      const minValue = Number.parseFloat(filters.minValue.replace(/[^0-9.-]+/g, ""))
      if (!isNaN(minValue)) {
        filtered = filtered.filter((funder) => {
          const ticketMin = Number.parseFloat(funder.ticketSize.split(" - ")[0].replace(/[^0-9.-]+/g, ""))
          return !isNaN(ticketMin) && ticketMin >= minValue
        })
      }
    }

    if (filters.maxValue) {
      const maxValue = Number.parseFloat(filters.maxValue.replace(/[^0-9.-]+/g, ""))
      if (!isNaN(maxValue)) {
        filtered = filtered.filter((funder) => {
          const ticketMax = Number.parseFloat(funder.ticketSize.split(" - ")[1].replace(/[^0-9.-]+/g, ""))
          return !isNaN(ticketMax) && ticketMax <= maxValue
        })
      }
    }

    // Apply instruments filter
    if (filters.instruments && filters.instruments.length > 0) {
      filtered = filtered.filter((funder) =>
        filters.instruments.some((instrument) => funder.investmentType.includes(instrument)),
      )
    }

    // Apply stages filter
    if (filters.stages && filters.stages.length > 0) {
      filtered = filtered.filter((funder) => filters.stages.some((stage) => funder.targetStage.includes(stage)))
    }

    // Apply sectors filter
    if (filters.sectors && filters.sectors.length > 0) {
      filtered = filtered.filter((funder) => filters.sectors.some((sector) => funder.sectorFocus.includes(sector)))
    }

    // Apply support types filter
    if (filters.supportTypes && filters.supportTypes.length > 0) {
      filtered = filtered.filter((funder) =>
        filters.supportTypes.some((support) => funder.supportOffered.includes(support)),
      )
    }

    // Apply funder type filter
    if (filters.funderType) {
      filtered = filtered.filter((funder) => funder.name.includes(filters.funderType))
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "Match Score (High to Low)":
          filtered.sort((a, b) => b.matchPercentage - a.matchPercentage)
          break
        case "Match Score (Low to High)":
          filtered.sort((a, b) => a.matchPercentage - b.matchPercentage)
          break
        case "Deadline (Soonest First)":
          filtered.sort((a, b) => new Date(a.applicationDeadline) - new Date(b.applicationDeadline))
          break
        case "Amount (High to Low)":
          filtered.sort((a, b) => {
            const aMax = Number.parseFloat(a.ticketSize.split(" - ")[1].replace(/[^0-9.-]+/g, ""))
            const bMax = Number.parseFloat(b.ticketSize.split(" - ")[1].replace(/[^0-9.-]+/g, ""))
            return bMax - aMax
          })
          break
        case "Amount (Low to High)":
          filtered.sort((a, b) => {
            const aMin = Number.parseFloat(a.ticketSize.split(" - ")[0].replace(/[^0-9.-]+/g, ""))
            const bMin = Number.parseFloat(b.ticketSize.split(" - ")[0].replace(/[^0-9.-]+/g, ""))
            return aMin - bMin
          })
          break
        default:
          break
      }
    }

    setFilteredFunders(filtered)

    // Simulate loading delay
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [funders, filters, searchTerm])

  const getStatusClass = (status) => {
    switch (status) {
      case "Not Contacted":
        return styles.statusNotContacted
      case "Applied":
        return styles.statusApplied
      case "Under Review":
        return styles.statusUnderReview
      case "Funded":
        return styles.statusFunded
      case "Rejected":
        return styles.statusRejected
      default:
        return styles.statusDefault
    }
  }

  return (
    <div>
      <div className={styles.tableHeader}>
        <h2 className={styles.sectionTitle}>Funding Matches</h2>
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
            <span className={styles.statValue}>{filteredFunders.length}</span> matches
          </span>
          <span className={styles.statItem}>
            <span className={styles.statValue}>{filteredFunders.filter((f) => f.matchPercentage >= 80).length}</span>{" "}
            high matches
          </span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Filtering results...</p>
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
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFunders.length > 0 ? (
                filteredFunders.map((funder) => (
                  <tr key={funder.id}>
                    <td className={styles.funderName}>{funder.name}</td>
                    <td className={styles.matchPercentage}>{funder.matchPercentage}%</td>
                    <td>{funder.investmentType}</td>
                    <td>{funder.targetStage}</td>
                    <td>{funder.ticketSize}</td>
                    <td>{funder.sectorFocus}</td>
                    <td>{funder.geographicFocus}</td>
                    <td>{funder.supportOffered}</td>
                    <td>{funder.applicationDeadline}</td>
                    <td>
                      <span className={getStatusClass(funder.status)}>{funder.status}</span>
                    </td>
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
                  <td colSpan="11" className={styles.noResults}>
                    No matching investors found. Try adjusting your filters.
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
