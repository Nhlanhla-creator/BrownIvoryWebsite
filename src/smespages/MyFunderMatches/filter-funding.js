"use client"

import { useState, useEffect } from "react"
import { Slider } from "./slider"
import { Filter, X } from "lucide-react"
import styles from "./funding.module.css"

export function FilterFunding({ onFilterChange, filters }) {
  const [location, setLocation] = useState(filters.location || "")
  const [matchScore, setMatchScore] = useState([filters.matchScore || 50])
  const [minValue, setMinValue] = useState(filters.minValue || "")
  const [maxValue, setMaxValue] = useState(filters.maxValue || "")
  const [instruments, setInstruments] = useState(filters.instruments || [])
  const [stages, setStages] = useState(filters.stages || [])
  const [sectors, setSectors] = useState(filters.sectors || [])
  const [supportTypes, setSupportTypes] = useState(filters.supportTypes || [])
  const [funderType, setFunderType] = useState(filters.funderType || "")
  const [sortBy, setSortBy] = useState(filters.sortBy || "")
  const [isStageDropdownOpen, setIsStageDropdownOpen] = useState(false)
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false)
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange({
      location,
      matchScore: matchScore[0],
      minValue,
      maxValue,
      instruments,
      stages,
      sectors,
      supportTypes,
      funderType,
      sortBy,
    })
  }, [location, matchScore, minValue, maxValue, instruments, stages, sectors, supportTypes, funderType, sortBy])

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

  const handleClearFilters = () => {
    setLocation("")
    setMatchScore([50])
    setMinValue("")
    setMaxValue("")
    setInstruments([])
    setStages([])
    setSectors([])
    setSupportTypes([])
    setFunderType("")
    setSortBy("")
  }

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible)
  }

  // Count active filters
  const activeFilterCount = [
    location,
    minValue,
    maxValue,
    ...instruments,
    ...stages,
    ...sectors,
    ...supportTypes,
    funderType,
    sortBy,
  ].filter(Boolean).length

  return (
    <div className={styles.filterSection}>
      <div className={styles.filterToggle} onClick={toggleFilterVisibility}>
        <Filter size={16} />
        <span>Filters</span>
        {activeFilterCount > 0 && <span className={styles.filterBadge}>{activeFilterCount}</span>}
        {isFilterVisible ? <X size={16} /> : <span className={styles.filterArrow}>›</span>}
      </div>

      <div className={`${styles.filterContent} ${isFilterVisible ? styles.filterVisible : ""}`}>
        <div className={styles.filterCard}>
          <h3 className={styles.filterTitle}>Location</h3>
          <select className={styles.filterSelect} value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">All Locations</option>
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
          <h3 className={styles.filterTitle}>Investment Range</h3>
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
          <h3 className={styles.filterTitle}>Preferred Instruments</h3>
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
          <h3 className={styles.filterTitle}>Stage Focus</h3>
          <div className={styles.dropdownContainer}>
            <button className={styles.multiSelectButton} onClick={() => setIsStageDropdownOpen(!isStageDropdownOpen)}>
              {stages.length ? `${stages.length} selected` : "Select Stages"}
            </button>
            {isStageDropdownOpen && (
              <div className={styles.dropdownMenu}>
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
                <div className={styles.dropdownActions}>
                  <button onClick={() => setIsStageDropdownOpen(false)} className={styles.dropdownButton}>
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.filterCard}>
          <h3 className={styles.filterTitle}>Sector</h3>
          <div className={styles.dropdownContainer}>
            <button className={styles.multiSelectButton} onClick={() => setIsSectorDropdownOpen(!isSectorDropdownOpen)}>
              {sectors.length ? `${sectors.length} selected` : "Select Sectors"}
            </button>
            {isSectorDropdownOpen && (
              <div className={styles.dropdownMenu}>
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
                <div className={styles.dropdownActions}>
                  <button onClick={() => setIsSectorDropdownOpen(false)} className={styles.dropdownButton}>
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.filterCard}>
          <h3 className={styles.filterTitle}>Support Offered</h3>
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
          <h3 className={styles.filterTitle}>Funder Type</h3>
          <select className={styles.filterSelect} value={funderType} onChange={(e) => setFunderType(e.target.value)}>
            <option value="">All Funder Types</option>
            {funderTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterCard}>
          <h3 className={styles.filterTitle}>Sort by</h3>
          <select className={styles.filterSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Default Sorting</option>
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterActions}>
          <button className={styles.clearFiltersButton} onClick={handleClearFilters}>
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  )
}
