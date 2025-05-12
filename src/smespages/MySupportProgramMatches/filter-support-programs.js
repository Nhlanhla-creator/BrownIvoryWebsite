"use client"

import { useState } from "react"
import { Slider } from "./slider"
import styles from "./support-programs.module.css"

export function FilterSupportPrograms() {
  const [location, setLocation] = useState("")
  const [matchScore, setMatchScore] = useState([50])
  const [programType, setProgramType] = useState("")
  const [enterpriseStage, setEnterpriseStage] = useState("")
  const [sectors, setSectors] = useState([])
  const [supportTypes, setSupportTypes] = useState([])
  const [programDuration, setProgramDuration] = useState("")
  const [applicationDeadline, setApplicationDeadline] = useState("")
  const [sortBy, setSortBy] = useState("")

  const handleSectorChange = (sector) => {
    if (sectors.includes(sector)) {
      setSectors(sectors.filter((s) => s !== sector))
    } else {
      setSectors([...sectors, sector])
    }
  }

  const handleSupportChange = (support) => {
    if (supportTypes.includes(support)) {
      setSupportTypes(supportTypes.filter((s) => s !== support))
    } else {
      setSupportTypes([...supportTypes, support])
    }
  }

  const locations = [
    "South Africa",
    "Namibia",
    "Botswana",
    "Zimbabwe",
    "Mozambique",
    "Lesotho",
    "Eswatini",
    "Zambia",
    "Malawi",
    "Angola",
  ]

  const programTypeOptions = [
    "Incubator",
    "Accelerator",
    "ESD (Enterprise Supplier Development)",
    "Export Development",
    "Innovation Hub",
    "Mentorship Program",
  ]

  const enterpriseStageOptions = ["Startup", "Growth", "Maturity", "Turnaround"]

  const sectorOptions = [
    "ICT",
    "Agriculture",
    "Energy",
    "Manufacturing",
    "Retail",
    "Healthcare",
    "Education",
    "Financial Services",
    "Tourism",
    "Mining",
  ]

  const supportOptions = [
    "Mentorship",
    "Funding Access",
    "Market Access",
    "Technical Support",
    "Export Assistance",
    "Legal Support",
    "Office Space",
    "Networking",
  ]

  const durationOptions = ["< 3 months", "3-6 months", "6-12 months", "> 12 months"]

  const sortOptions = [
    "Match Score (High to Low)",
    "Match Score (Low to High)",
    "Application Deadline (Soonest First)",
    "Program Duration (Shortest First)",
    "Program Duration (Longest First)",
  ]

  return (
    <div className={styles.filterGrid}>
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Location (dropdown)</h3>
        <select className={styles.filterSelect} value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Match Score (slider)</h3>
        <div className={styles.sliderContainer}>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            value={matchScore}
            onValueChange={setMatchScore}
            className={styles.purpleSlider}
          />
          <div className={styles.sliderValue}>{matchScore[0]}%</div>
        </div>
      </div>

      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Program Type (Dropdown)</h3>
        <select className={styles.filterSelect} value={programType} onChange={(e) => setProgramType(e.target.value)}>
          <option value="">Select Program Type</option>
          {programTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Target Enterprise Stage (Dropdown)</h3>
        <select
          className={styles.filterSelect}
          value={enterpriseStage}
          onChange={(e) => setEnterpriseStage(e.target.value)}
        >
          <option value="">Select Enterprise Stage</option>
          {enterpriseStageOptions.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Sector Focus (Dropdown, multi)</h3>
        <div className={styles.dropdownContainer}>
          <button
            className={styles.multiSelectButton}
            onClick={() => document.getElementById("sector-dropdown")?.classList.toggle("hidden")}
          >
            {sectors.length ? `${sectors.length} selected` : "Select Sectors"}
          </button>
          <div id="sector-dropdown" className={`hidden ${styles.dropdownMenu}`}>
            {sectorOptions.map((sector) => (
              <div key={sector} className={styles.dropdownItem}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={sectors.includes(sector)}
                    onChange={() => handleSectorChange(sector)}
                    className={styles.checkbox}
                  />
                  {sector}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Support Offered (Checkboxes)</h3>
        <div className={styles.checkboxGroup}>
          {supportOptions.map((support) => (
            <div key={support} className={styles.checkboxItem}>
              <input
                type="checkbox"
                id={`support-${support}`}
                checked={supportTypes.includes(support)}
                onChange={() => handleSupportChange(support)}
                className={styles.checkbox}
              />
              <label htmlFor={`support-${support}`} className={styles.checkboxLabel}>
                {support}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Program Duration (Dropdown Range)</h3>
        <select
          className={styles.filterSelect}
          value={programDuration}
          onChange={(e) => setProgramDuration(e.target.value)}
        >
          <option value="">Select Duration</option>
          {durationOptions.map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Application Deadline Rate (date Picker)</h3>
        <input
          type="date"
          className={styles.filterInput}
          value={applicationDeadline}
          onChange={(e) => setApplicationDeadline(e.target.value)}
        />
      </div>

      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Sort by (drop down)</h3>
        <select className={styles.filterSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Select Sort Option</option>
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
