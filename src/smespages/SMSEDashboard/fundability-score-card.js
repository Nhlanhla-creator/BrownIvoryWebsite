"use client"

import { useState, useEffect } from "react"
import { ChevronDown, X } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import "./fundability-score.css"

export function FundabilityScoreCard({ profileData }) {
  const [showScoreSummaryModal, setShowScoreSummaryModal] = useState(false)
  const [complianceScore, setComplianceScore] = useState(0)
  const [categoryScores, setCategoryScores] = useState({
    financialHealth: 0,
    operationalStrength: 0,
    pitchQuality: 0,
    impactProof: 0,
  })
  const [missingDocuments, setMissingDocuments] = useState([])
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("3M")

  // Brown color palette
  const brownPalette = {
    lightBrown: "#f5f0e1",
    mediumBrown: "#e6d7c3",
    accentBrown: "#c8b6a6",
    primaryBrown: "#a67c52",
    darkBrown: "#7d5a50",
    textBrown: "#4a352f",
    backgroundBrown: "#faf7f2",
    paleBrown: "#f0e6d9",
  }

  // Define weights for each operating stage
  const operationStageWeights = {
    ideation: {
      compliance: 0.15,
      financialHealth: 0.1,
      operationalStrength: 0.15,
      pitchQuality: 0.3,
      impactProof: 0.3,
    },
    startup: {
      compliance: 0.2,
      financialHealth: 0.15,
      operationalStrength: 0.2,
      pitchQuality: 0.25,
      impactProof: 0.2,
    },
    growth: {
      compliance: 0.25,
      financialHealth: 0.2,
      operationalStrength: 0.25,
      pitchQuality: 0.15,
      impactProof: 0.15,
    },
    mature: {
      compliance: 0.3,
      financialHealth: 0.25,
      operationalStrength: 0.2,
      pitchQuality: 0.1,
      impactProof: 0.15,
    },
    turnaround: {
      compliance: 0.35,
      financialHealth: 0.2,
      operationalStrength: 0.15,
      pitchQuality: 0.15,
      impactProof: 0.15,
    },
  }

  // Add body class when modal is open to prevent background scrolling
  useEffect(() => {
    if (showScoreSummaryModal) {
      document.body.classList.add("modal-open")
    } else {
      document.body.classList.remove("modal-open")
    }

    // Cleanup function
    return () => {
      document.body.classList.remove("modal-open")
    }
  }, [showScoreSummaryModal])

  // Update the score calculation to use stage-specific weights
  useEffect(() => {
    if (profileData) {
      const operationStage = profileData.entityOverview?.operationStage || "ideation"
      const weights = operationStageWeights[operationStage] || operationStageWeights.ideation

      // Calculate individual scores (0-100 range)
      const complianceScoreValue = calculateComplianceScore(profileData)
      const financialHealth = calculateFinancialHealth(profileData)
      const operationalStrength = calculateOperationalStrength(profileData)
      const pitchQuality = calculatePitchQuality(profileData)
      const impactProof = calculateImpactProof(profileData)

      // Apply weights
      const weightedScores = {
        compliance: Math.round(complianceScoreValue * weights.compliance * 100),
        financialHealth: Math.round(financialHealth * weights.financialHealth),
        operationalStrength: Math.round(operationalStrength * weights.operationalStrength),
        pitchQuality: Math.round(pitchQuality * weights.pitchQuality),
        impactProof: Math.round(impactProof * weights.impactProof),
      }

      // Update state
      setComplianceScore(weightedScores.compliance)
      setCategoryScores({
        financialHealth: weightedScores.financialHealth,
        operationalStrength: weightedScores.operationalStrength,
        pitchQuality: weightedScores.pitchQuality,
        impactProof: weightedScores.impactProof,
      })

      // Calculate missing documents
      const missingDocs = calculateMissingDocuments(profileData)
      setMissingDocuments(missingDocs)
    }
  }, [profileData])

  // Calculate total score
  const totalFundabilityScore =
    Math.round(
      complianceScore +
        categoryScores.financialHealth +
        categoryScores.operationalStrength +
        categoryScores.pitchQuality +
        categoryScores.impactProof,
    ) || 75 // Default value if calculation fails

  // Monthly score data
  const monthlyScoreData = [
    { name: "Jan", score: 45 },
    { name: "Feb", score: 50 },
    { name: "Mar", score: 55 },
    { name: "Apr", score: 60 },
    { name: "May", score: 65 },
    { name: "Jun", score: 70 },
    { name: "Jul", score: 75 },
    { name: "Aug", score: null },
    { name: "Sep", score: null },
    { name: "Oct", score: null },
    { name: "Nov", score: null },
    { name: "Dec", score: null },
  ]

  // Quarterly score data
  const quarterlyScoreData = [
    { name: "Q1", score: 50 },
    { name: "Q2", score: 65 },
    { name: "Q3", score: 75 },
    { name: "Q4", score: null },
  ]

  // Yearly score data
  const yearlyScoreData = [
    { name: "2021", score: 40 },
    { name: "2022", score: 55 },
    { name: "2023", score: 75 },
  ]

  // Get chart data based on selected time filter
  const getChartData = () => {
    switch (selectedTimeFilter) {
      case "3M":
        return monthlyScoreData.slice(0, 3)
      case "6M":
        return monthlyScoreData.slice(0, 6)
      case "12M":
        return monthlyScoreData
      case "YTD":
        return monthlyScoreData.slice(0, new Date().getMonth() + 1)
      case "1Y":
        return quarterlyScoreData
      case "ALL":
        return yearlyScoreData
      default:
        return monthlyScoreData.slice(0, 3)
    }
  }

  // Recommendations based on score
  const getRecommendations = () => {
    if (totalFundabilityScore < 50) {
      return [
        "Complete your business profile with all required information",
        "Upload missing compliance documents",
        "Improve your financial documentation",
        "Update your business description to be more comprehensive",
        "Add more details about your products and services",
      ]
    } else if (totalFundabilityScore < 70) {
      return [
        "Enhance your operational metrics",
        "Practice and refine your investor pitch",
        "Expand your investor outreach",
        "Consider adding more team members with relevant experience",
        "Develop a more detailed growth strategy",
      ]
    } else {
      return [
        "Explore additional funding rounds",
        "Network with tier-1 investors",
        "Optimize your financial projections",
        "Consider expanding to new markets",
        "Develop partnerships with established companies",
      ]
    }
  }

  // Score calculation functions
  const calculateComplianceScore = (profileData) => {
    if (!profileData) return 0.8 // Default value

    const requiredDocuments = [
      "entityOverview.registrationCertificate",
      "entityOverview.proofOfAddress",
      "ownershipManagement.certifiedIds",
      "ownershipManagement.shareRegister",
      "legalCompliance.taxClearanceCert",
      "legalCompliance.bbbeeCert",
      "declarationConsent.signedDocument",
    ]

    const presentCount = requiredDocuments.filter((path) => {
      const parts = path.split(".")
      let value = profileData
      for (const part of parts) {
        value = value?.[part]
        if (value === undefined || value === null || value === "") {
          return false
        }
        if (typeof value === "object" && value.url) {
          return true
        }
      }
      return true
    }).length

    return presentCount / requiredDocuments.length
  }

  const calculateMissingDocuments = (profileData) => {
    const requiredDocuments = [
      "companyregistrationcertificate",
      "proofofoperatingaddress",
      "certifiedids",
      "shareregister",
      "proofofaddress",
      "taxclearancecertificate",
      "bbbeecertificate",
      "signeddeclarationconsentform",
    ]

    return requiredDocuments.filter((docKey) => {
      return ["proofofaddress", "bbbeecertificate"].includes(docKey)
    })
  }

  const calculateFinancialHealth = (profileData) => {
    if (!profileData) return 70 // Default value

    let score = 0

    // Financial indicators
    if (profileData?.entityOverview?.financialYearEnd) score += 20
    if (profileData?.entityOverview?.yearsInOperation) {
      const years = Number.parseInt(profileData.entityOverview.yearsInOperation)
      score += Math.min(years * 5, 20) // Up to 20 points for longevity
    }
    if (profileData?.productsServices?.annualTurnover) score += 20
    if (profileData?.legalCompliance?.taxClearanceNumber) score += 20
    if (profileData?.legalCompliance?.vatNumber) score += 20

    return Math.min(100, score)
  }

  const calculateOperationalStrength = (profileData) => {
    if (!profileData) return 65 // Default value

    let score = 0

    if (profileData?.entityOverview?.employeeCount) {
      const employees = Number.parseInt(profileData.entityOverview.employeeCount)
      score += Math.min(employees * 2, 20) // Up to 20 points for team size
    }
    if (profileData?.entityOverview?.yearsInOperation) {
      const years = Number.parseInt(profileData.entityOverview.yearsInOperation)
      score += Math.min(years * 4, 20) // Up to 20 points for longevity
    }
    if (profileData?.productsServices?.keyClients?.length > 0) {
      score += Math.min(profileData.productsServices.keyClients.length * 5, 20)
    }
    if (profileData?.ownershipManagement?.directors?.length > 0) score += 20
    if (profileData?.contactDetails?.website) score += 20

    return Math.min(100, score)
  }

  const calculatePitchQuality = (profileData) => {
    if (!profileData) return 75 // Default value

    let score = 0

    if (profileData?.entityOverview?.businessDescription) {
      const descLength = profileData.entityOverview.businessDescription.length
      score += Math.min(descLength / 10, 30) // Up to 30 points for description
    }
    if (profileData?.productsServices?.productCategories?.products?.length > 0) {
      score += Math.min(profileData.productsServices.productCategories.products.length * 10, 30)
    }
    if (profileData?.productsServices?.serviceCategories?.services?.length > 0) {
      score += Math.min(profileData.productsServices.serviceCategories.services.length * 10, 20)
    }
    if (profileData?.entityOverview?.targetMarket) score += 20

    return Math.min(100, score)
  }

  const calculateImpactProof = (profileData) => {
    if (!profileData) return 60 // Default value

    let score = 0

    if (
      profileData?.entityOverview?.targetMarket?.includes("social") ||
      profileData?.entityOverview?.targetMarket?.includes("impact")
    ) {
      score += 20
    }
    if (
      profileData?.entityOverview?.businessDescription?.includes("impact") ||
      profileData?.entityOverview?.businessDescription?.includes("social")
    ) {
      score += 20
    }
    if (profileData?.howDidYouHear?.source === "Referral") score += 20
    if (profileData?.declarationConsent?.accuracy) score += 20
    if (profileData?.declarationConsent?.dataProcessing) score += 20

    return Math.min(100, score)
  }

  // Fundability score data
  const fundabilityScoreData = [
    {
      name: "Compliance",
      value: complianceScore || 15,
      color: "#8D6E63",
      weight: operationStageWeights[profileData?.entityOverview?.operationStage || "ideation"]?.compliance * 100 + "%",
      description: "Legal and regulatory documentation completeness",
    },
    {
      name: "Financial Health",
      value: categoryScores.financialHealth || 20,
      color: "#6D4C41",
      weight:
        operationStageWeights[profileData?.entityOverview?.operationStage || "ideation"]?.financialHealth * 100 + "%",
      description: "Financial stability and performance metrics",
    },
    {
      name: "Operational Strength",
      value: categoryScores.operationalStrength || 20,
      color: "#A67C52",
      weight:
        operationStageWeights[profileData?.entityOverview?.operationStage || "ideation"]?.operationalStrength * 100 +
        "%",
      description: "Team size, experience, and operational capabilities",
    },
    {
      name: "Pitch Quality",
      value: categoryScores.pitchQuality || 20,
      color: "#795548",
      weight:
        operationStageWeights[profileData?.entityOverview?.operationStage || "ideation"]?.pitchQuality * 100 + "%",
      description: "Business narrative clarity and attractiveness",
    },
    {
      name: "Impact Proof",
      value: categoryScores.impactProof || 20,
      color: "#5D4037",
      weight: operationStageWeights[profileData?.entityOverview?.operationStage || "ideation"]?.impactProof * 100 + "%",
      description: "Social/environmental impact and market need validation",
    },
  ]

  // Funding opportunities based on score
  const fundingOpportunities = [
    {
      name: "Venture Capital",
      minScore: 80,
      description: "Equity investment for high-growth businesses",
      available: totalFundabilityScore >= 80,
    },
    {
      name: "Angel Investment",
      minScore: 70,
      description: "Early-stage funding from individual investors",
      available: totalFundabilityScore >= 70,
    },
    {
      name: "Bank Loans",
      minScore: 65,
      description: "Traditional debt financing with collateral",
      available: totalFundabilityScore >= 65,
    },
    {
      name: "Government Grants",
      minScore: 60,
      description: "Non-dilutive funding for specific sectors",
      available: totalFundabilityScore >= 60,
    },
    {
      name: "Crowdfunding",
      minScore: 50,
      description: "Raising small amounts from many individuals",
      available: totalFundabilityScore >= 50,
    },
  ]

  return (
    <>
      <div className="fundability-card">
        <div className="card-header">
          <h3>BIG Fundability Score</h3>
        </div>

        <div className="score-container">
          <div className="score-circle">
            <span className="score-value">{totalFundabilityScore}%</span>
          </div>
        </div>

        <button className="view-more-btn" onClick={() => setShowScoreSummaryModal(true)}>
          View More
          <ChevronDown className="chevron-icon" size={16} />
        </button>
      </div>

      {/* Score Summary Modal */}
      {showScoreSummaryModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>BIG Fundability Score Summary</h3>
              <button className="close-btn" onClick={() => setShowScoreSummaryModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="score-summary">
                <div className="summary-score-circle">
                  <span>{totalFundabilityScore}%</span>
                </div>

                <div className="summary-details">
                  <div className="operation-stage">
                    <span>Operation Stage:</span>
                    <span className="stage-value">{profileData?.entityOverview?.operationStage || "ideation"}</span>
                  </div>
                  <div className="category-grid">
                    {fundabilityScoreData.map((item, index) => (
                      <div key={index} className="category-item">
                        <div className="category-color" style={{ backgroundColor: item.color }}></div>
                        <span className="category-name">{item.name}</span>
                        <span className="category-score">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Score Breakdown */}
              <div className="score-breakdown">
                <h4>Score Breakdown</h4>
                <div className="breakdown-list">
                  {fundabilityScoreData.map((category, index) => (
                    <div key={index} className="breakdown-item">
                      <div className="breakdown-header">
                        <div className="breakdown-color" style={{ backgroundColor: category.color }}></div>
                        <span className="breakdown-name">{category.name}</span>
                        <span className="breakdown-weight">{category.weight} weight</span>
                      </div>
                      <div className="breakdown-details">
                        <p>{category.description}</p>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${category.value}%`,
                              backgroundColor: category.color,
                            }}
                          ></div>
                          <span className="progress-value">{category.value}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Document Status Section */}
              <div className="document-status">
                <h4>Compliance Document Status ({Math.round(complianceScore)}%)</h4>

                <div className="document-grid">
                  {[
                    "Company Registration Certificate",
                    "Proof of Operating Address",
                    "Certified IDs",
                    "Share Register",
                    "Proof of Address",
                    "Tax Clearance Certificate",
                    "B-BBEE Certificate",
                    "Signed Declaration/Consent Form",
                  ].map((doc, index) => {
                    const docKey = doc.toLowerCase().replace(/\s+/g, "").replace(/-/g, "").replace(/\//g, "")
                    const isPresent = !missingDocuments.includes(docKey)

                    return (
                      <div
                        key={index}
                        className={`document-item ${isPresent ? "document-present" : "document-missing"}`}
                      >
                        <div className="document-status-indicator"></div>
                        <span className="document-name">{doc}</span>
                        <span className="document-status-text">{isPresent ? "Uploaded" : "Missing"}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Monthly Score Trend */}
              <div className="score-trend">
                <h4>Score Trend</h4>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getChartData()}>
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(value) => [`Score: ${value}`, null]}
                        labelFormatter={(label) => `Period: ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#A67C52"
                        strokeWidth={2}
                        dot={{ fill: "#A67C52", stroke: "#fff", strokeWidth: 1, r: 3 }}
                        activeDot={{ r: 5, strokeWidth: 1, stroke: "#fff" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="time-filters">
                  {["3M", "6M", "12M", "YTD", "1Y", "ALL"].map((filter) => (
                    <button
                      key={filter}
                      className={`filter-btn ${selectedTimeFilter === filter ? "active" : ""}`}
                      onClick={() => setSelectedTimeFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Funding Opportunities */}
              <div className="funding-opportunities">
                <h4>Funding Opportunities</h4>
                <div className="opportunities-list">
                  {fundingOpportunities.map((opportunity, index) => (
                    <div
                      key={index}
                      className={`opportunity-item ${opportunity.available ? "available" : "unavailable"}`}
                    >
                      <div className="opportunity-info">
                        <h5>{opportunity.name}</h5>
                        <p>{opportunity.description}</p>
                      </div>
                      <div className="opportunity-status">
                        <span className="min-score">Min. Score: {opportunity.minScore}%</span>
                        <span className="status-badge">{opportunity.available ? "Available" : "Not Available"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="recommendations">
                <h4>Recommendations</h4>
                <ul className="recommendations-list">
                  {getRecommendations().map((rec, index) => (
                    <li key={index} className="recommendation-item">
                      <div className="recommendation-bullet"></div>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button className="close-modal-btn" onClick={() => setShowScoreSummaryModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
