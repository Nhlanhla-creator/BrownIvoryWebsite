"use client"

import { useState } from "react"
import { Slider } from "./slider"
import styles from "./funding.module.css"

export function FilterFunding() {
  const [location, setLocation] = useState("")
  const [matchScore, setMatchScore] = useState([50])
  const [minValue, setMinValue] = useState("")
  const [maxValue, setMaxValue] = useState("")
  const [instruments, setInstruments] = useState([])
  const [stages, setStages] = useState([])
  const [sectors, setSectors] = useState([])
  const [supportTypes, setSupportTypes] = useState([])
  const [funderType, setFunderType] = useState("")
  const [sortBy, setSortBy] = useState("")

  const handleInstrumentChange = (instrument) => {
    if (instruments.includes(instrument)) {
      setInstruments(instruments.filter((i) => i !== instrument))
    } else {
      setInstruments([...instruments, instrument])
    }
  }

  const handleStageChange = (stage) => {
    if (stages.includes(stage)) {
      setStages(stages.filter((s) => s !== stage))
    } else {
      setStages([...stages, stage])
    }
  }

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

  const instrumentOptions = ["Equity", "Debt", "Grant", "Convertible Note", "Blended Finance", "Quasi-Equity"]

  const stageOptions = ["Pre-seed", "Seed", "Series A", "Growth", "Maturity", "Turnaround"]

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

  const supportOptions = ["Mentorship", "Technical Assistance", "Market Access", "Network Access", "ESG Support"]

  const funderTypeOptions = [
    "Venture Capital",
    "Angel Investor",
    "Bank",
    "Development Finance Institution",
    "Corporate Investor",
    "Government Agency",
    "Impact Investor",
  ]

  const sortOptions = [
    "Match Score (High to Low)",
    "Match Score (Low to High)",
    "Deadline (Soonest First)",
    "Amount (High to Low)",
    "Amount (Low to High)",
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
        <h3 className={styles.filterTitle}>Min Match Score (%)</h3>
        <div className={styles.sliderContainer}>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            value={matchScore}
            onValueChange={setMatchScore}
            className={styles.brownSlider}
          />
          <div className={styles.sliderValue}>{matchScore[0]}%</div>
        </div>
      </div>

      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Investment Range (input fields)</h3>
        <div className={styles.rangeInputs}>
          <input
            type="text"
            placeholder="Min"
            className={styles.filterInput}
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
          />
          <input
            type="text"
            placeholder="Max"
            className={styles.filterInput}
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Preferred Instruments (Checkboxes)</h3>
        <div className={styles.checkboxGroup}>
          {instrumentOptions.map((instrument) => (
            <div key={instrument} className={styles.checkboxItem}>
              <input
                type="checkbox"
                id={`inst-${instrument}`}
                checked={instruments.includes(instrument)}
                onChange={() => handleInstrumentChange(instrument)}
                className={styles.checkbox}
              />
              <label htmlFor={`inst-${instrument}`} className={styles.checkboxLabel}>
                {instrument}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Stage Focus (Dropdown, multi)</h3>
        <div className={styles.dropdownContainer}>
          <button
            className={styles.multiSelectButton}
            onClick={() => document.getElementById("stage-dropdown")?.classList.toggle("hidden")}
          >
            {stages.length ? `${stages.length} selected` : "Select Stages"}
          </button>
          <div id="stage-dropdown" className={`hidden ${styles.dropdownMenu}`}>
            {stageOptions.map((stage) => (
              <div key={stage} className={styles.dropdownItem}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={stages.includes(stage)}
                    onChange={() => handleStageChange(stage)}
                    className={styles.checkbox}
                  />
                  {stage}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Sector (Dropdown, multi)</h3>
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
        <h3 className={styles.filterTitle}>Funder Type (dropdown)</h3>
        <select className={styles.filterSelect} value={funderType} onChange={(e) => setFunderType(e.target.value)}>
          <option value="">Select Funder Type</option>
          {funderTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
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
