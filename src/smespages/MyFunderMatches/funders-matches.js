"use client"

import { useState } from "react"
import { FundingFlowPipeline } from "./funding-flow-pipeline"
import { FundingInsights } from "./funding-insights"
import { FilterFunding } from "./filter-funding"
import { FundingTable } from "./funding-table"
import styles from "./funding.module.css"

export default function FundingMatchesPage() {
  const [filters, setFilters] = useState({
    location: "",
    matchScore: 50,
    minValue: "",
    maxValue: "",
    instruments: [],
    stages: [],
    sectors: [],
    supportTypes: [],
    funderType: "",
    sortBy: "",
  })

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  return (
    <div className={styles.mainContent}>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>My Funding Matches</h1>

        <div className={styles.sectionCard}>
          <FundingFlowPipeline />
        </div>

        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>My Funding Matches Insights</h2>
          <FundingInsights />
        </div>

        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Filter Matches</h2>
          <FilterFunding onFilterChange={handleFilterChange} filters={filters} />
        </div>

        <div className={styles.sectionCard}>
          <FundingTable filters={filters} />
        </div>
      </div>
    </div>
  )
}
