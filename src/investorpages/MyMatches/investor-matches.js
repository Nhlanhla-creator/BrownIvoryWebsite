"use client"

import { useState } from "react"

import InvestorDealFlowPipeline  from "./investor-deal-flow"
import { InvestorInsights } from "./investor-insights"
import { FilterFunding } from "./filter-funding"
import { InvestorSMETable } from "./investor-sme-table"

import styles from "./investor-funding.module.css"

export default function InvestorDashboardPage() {
  const [filters, setFilters] = useState({ 
    location: "",
    matchScore: 50,
    minValue: "",
    maxValue: "",
    instruments: [],
    stages: [],
    sectors: [],
    supportTypes: [],
    smeType: "",
    sortBy: "",
  })

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  return (
    <div className={styles.mainContent}>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>My Matches and Insights</h1>

        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}></h2>
          <InvestorDealFlowPipeline />
        </div>
      

        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Investment Insights</h2>
          <InvestorInsights />
        </div>
       

        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Filter SMEs</h2>
          <FilterFunding onFilterChange={handleFilterChange} filters={filters} />
        </div>

        <div className={styles.sectionCard}>
        
          <InvestorSMETable filters={filters} />
        </div>

       
      </div>
    </div>
  )
}