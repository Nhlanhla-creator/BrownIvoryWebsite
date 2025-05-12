"use client"

import { useState } from "react"
import { Slider } from "./slider"
import styles from "./suppliers.module.css"

export function FilterSuppliers() {
  const [location, setLocation] = useState("")
  const [matchScore, setMatchScore] = useState([50])
  const [minValue, setMinValue] = useState("")
  const [maxValue, setMaxValue] = useState("")
  const [entityType, setEntityType] = useState("")
  const [sectors, setSectors] = useState([])
  const [bbbeeLevel, setBbbeeLevel] = useState("")
  const [procurementCategories, setProcurementCategories] = useState([])
  const [availability, setAvailability] = useState("")
  const [sortBy, setSortBy] = useState("")

  const handleSectorChange = (sector) => {
    if (sectors.includes(sector)) {
      setSectors(sectors.filter((s) => s !== sector))
    } else {
      setSectors([...sectors, sector])
    }
  }

  const handleProcurementChange = (category) => {
    if (procurementCategories.includes(category)) {
      setProcurementCategories(procurementCategories.filter((c) => c !== category))
    } else {
      setProcurementCategories([...procurementCategories, category])
    }
  }

  const locations = [
    "South Africa", "Namibia", "Botswana", "Zimbabwe", "Mozambique",
    "Lesotho", "Eswatini", "Zambia", "Malawi", "Angola",
  ]

  const entityTypes = ["Pty Ltd", "CC", "NGO", "Co-op", "Sole Proprietor", "Partnership"]

  const industryOptions = [
    "Agriculture", "Mining", "Manufacturing", "Energy", "Construction",
    "Retail", "Transport", "Finance", "Real Estate", "ICT",
    "Tourism", "Education", "Health", "Arts", "Other Services",
  ]

  const bbbeeLevels = [
    "Level 1", "Level 2", "Level 3", "Level 4", "Level 5",
    "Level 6", "Level 7", "Level 8", "Non-Compliant",
  ]

  const procurementOptions = [
    "Services", "Goods", "Construction", "Professional Services", "IT Solutions"
  ]

  const availabilityOptions = [
    "Immediate", "Within 1 week", "Within 1 month", "Within 3 months", "Custom"
  ]

  const sortOptions = [
    "Match Score (High to Low)", "Match Score (Low to High)",
    "Rating (High to Low)", "Rating (Low to High)",
    "Date Added (Newest First)", "Date Added (Oldest First)",
  ]

  return (
    <div className={styles.filterGrid}>
      {/* Location Dropdown */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Location (dropdown)</h3>
        <select
          className={styles.filterSelect}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Match Score Slider */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Match Score (slider)</h3>
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

      {/* Contract Value Range */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Contract value range (min/max input)</h3>
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

      {/* Entity Type */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Supplier Entity Type (dropdown)</h3>
        <select
          className={styles.filterSelect}
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
        >
          <option value="">Select Entity Type</option>
          {entityTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Sector Multi-select */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Industry/Sector (Dropdown, multi)</h3>
        <div className={styles.dropdownContainer}>
          <button
            className={styles.multiSelectButton}
            onClick={() =>
              document.getElementById("sector-dropdown")?.classList.toggle("hidden")
            }
          >
            {sectors.length ? `${sectors.length} selected` : "Select Sectors"}
          </button>
          <div id="sector-dropdown" className={`hidden ${styles.dropdownMenu}`}>
            {industryOptions.map((sector) => (
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

      {/* BBBEE Level */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>BBBEE Level (Dropdown)</h3>
        <select
          className={styles.filterSelect}
          value={bbbeeLevel}
          onChange={(e) => setBbbeeLevel(e.target.value)}
        >
          <option value="">Select BBBEE Level</option>
          {bbbeeLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Procurement Categories */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Procurement Category (Checkboxes)</h3>
        <div className={styles.checkboxGroup}>
          {procurementOptions.map((category) => (
            <div key={category} className={styles.checkboxItem}>
              <input
                type="checkbox"
                id={`proc-${category}`}
                checked={procurementCategories.includes(category)}
                onChange={() => handleProcurementChange(category)}
                className={styles.checkbox}
              />
              <label htmlFor={`proc-${category}`} className={styles.checkboxLabel}>
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Availability (dropdown)</h3>
        <select
          className={styles.filterSelect}
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Select Availability</option>
          {availabilityOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Sort by (drop down)</h3>
        <select
          className={styles.filterSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Select Sort Option</option>
          {sortOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
