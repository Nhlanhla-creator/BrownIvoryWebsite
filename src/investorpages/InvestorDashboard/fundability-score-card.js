"use client"

import { useState, useEffect } from "react"
import { ChevronDown, X } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import styles from "./fundability.module.css"

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
    ) || 0 // Default value if calculation fails

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

  // Document checking functions
  const checkDocumentExists = (data, path) => {
    const parts = path.split(".")
    let value = data
    for (const part of parts) {
      value = value?.[part]
      if (value === undefined || value === null || value === "") {
        return false
      }
      if (typeof value === "object" && (value.url || value.fileName)) {
        return true
      }
    }
    return true
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

    const presentCount = requiredDocuments.filter((path) => checkDocumentExists(profileData, path)).length

    return presentCount / requiredDocuments.length
  }

  const calculateMissingDocuments = (profileData) => {
    if (!profileData) return []

    const documentMapping = [
      {
        key: "companyregistrationcertificate",
        path: "entityOverview.registrationCertificate",
        displayName: "Company Registration Certificate",
      },
      {
        key: "proofofoperatingaddress",
        path: "entityOverview.proofOfAddress",
        displayName: "Proof of Operating Address",
      },
      {
        key: "certifiedids",
        path: "ownershipManagement.certifiedIds",
        displayName: "Certified IDs",
      },
      {
        key: "shareregister",
        path: "ownershipManagement.shareRegister",
        displayName: "Share Register",
      },
      {
        key: "taxclearancecertificate",
        path: "legalCompliance.taxClearanceCert",
        displayName: "Tax Clearance Certificate",
      },
      {
        key: "bbbeecertificate",
        path: "legalCompliance.bbbeeCert",
        displayName: "B-BBEE Certificate",
      },
      {
        key: "signeddeclarationconsentform",
        path: "declarationConsent.signedDocument",
        displayName: "Signed Declaration/Consent Form",
      },
    ]

    return documentMapping
      .filter(({ path }) => !checkDocumentExists(profileData, path))
      .map(({ key, displayName }) => ({ key, displayName }))
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
      <div className={styles.fundabilityCard}>
        <div className={styles.cardHeader}>
          <h3>BIG Fundability Score</h3>
        </div>

        <div className={styles.scoreContainer}>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreValue}>{totalFundabilityScore}%</span>
          </div>
        </div>

        <button className={styles.viewMoreBtn} onClick={() => setShowScoreSummaryModal(true)}>
          View More
          <ChevronDown className={styles.chevronIcon} size={16} />
        </button>
      </div>

      {/* Score Summary Modal */}
      {showScoreSummaryModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3>BIG Fundability Score Summary</h3>
              <button className={styles.closeBtn} onClick={() => setShowScoreSummaryModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.scoreSummary}>
                <div className={styles.summaryScoreCircle}>
                  <span>{totalFundabilityScore}%</span>
                </div>

                <div className={styles.summaryDetails}>
                  <div className={styles.operationStage}>
                    <span>Operation Stage:</span>
                    <span className={styles.stageValue}>
                      {profileData?.entityOverview?.operationStage || "ideation"}
                    </span>
                  </div>
                  <div className={styles.categoryGrid}>
                    {fundabilityScoreData.map((item, index) => (
                      <div key={index} className={styles.categoryItem}>
                        <div className={styles.categoryColor} style={{ backgroundColor: item.color }}></div>
                        <span className={styles.categoryName}>{item.name}</span>
                        <span className={styles.categoryScore}>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Score Breakdown */}
              <div className={styles.scoreBreakdown}>
                <h4>Score Breakdown</h4>
                <div className={styles.breakdownList}>
                  {fundabilityScoreData.map((category, index) => (
                    <div key={index} className={styles.breakdownItem}>
                      <div className={styles.breakdownHeader}>
                        <div className={styles.breakdownColor} style={{ backgroundColor: category.color }}></div>
                        <span className={styles.breakdownName}>{category.name}</span>
                        <span className={styles.breakdownWeight}>{category.weight} weight</span>
                      </div>
                      <div className={styles.breakdownDetails}>
                        <p>{category.description}</p>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{
                              width: `${category.value}%`,
                              backgroundColor: category.color,
                            }}
                          ></div>
                          <span className={styles.progressValue}>{category.value}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Document Status Section */}
              <div className={styles.documentStatus}>
                <h4>Compliance Document Status ({Math.round(complianceScore)}%)</h4>

                <div className={styles.documentGrid}>
                  {[
                    "Company Registration Certificate",
                    "Proof of Operating Address",
                    "Certified IDs",
                    "Share Register",
                    "Tax Clearance Certificate",
                    "B-BBEE Certificate",
                    "Signed Declaration/Consent Form",
                  ].map((doc, index) => {
                    const docKey = doc.toLowerCase().replace(/\s+/g, "").replace(/-/g, "").replace(/\//g, "")
                    const isMissing = missingDocuments.some((missingDoc) => missingDoc.key === docKey)

                    return (
                      <div
                        key={index}
                        className={`${styles.documentItem} ${!isMissing ? styles.documentPresent : styles.documentMissing}`}
                      >
                        <div className={styles.documentStatusIndicator}></div>
                        <span className={styles.documentName}>{doc}</span>
                        <span className={styles.documentStatusText}>{!isMissing ? "Uploaded" : "Missing"}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Monthly Score Trend */}
              <div className={styles.scoreTrend}>
                <h4>Score Trend</h4>
                <div className={styles.chartContainer}>
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
                <div className={styles.timeFilters}>
                  {["3M", "6M", "12M", "YTD", "1Y", "ALL"].map((filter) => (
                    <button
                      key={filter}
                      className={`${styles.filterBtn} ${selectedTimeFilter === filter ? styles.active : ""}`}
                      onClick={() => setSelectedTimeFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Funding Opportunities */}
              <div className={styles.fundingOpportunities}>
                <h4>Funding Opportunities</h4>
                <div className={styles.opportunitiesList}>
                  {fundingOpportunities.map((opportunity, index) => (
                    <div
                      key={index}
                      className={`${styles.opportunityItem} ${opportunity.available ? styles.available : styles.unavailable}`}
                    >
                      <div className={styles.opportunityInfo}>
                        <h5>{opportunity.name}</h5>
                        <p>{opportunity.description}</p>
                      </div>
                      <div className={styles.opportunityStatus}>
                        <span className={styles.minScore}>Min. Score: {opportunity.minScore}%</span>
                        <span className={styles.statusBadge}>
                          {opportunity.available ? "Available" : "Not Available"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className={styles.recommendations}>
                <h4>Recommendations</h4>
                <ul className={styles.recommendationsList}>
                  {getRecommendations().map((rec, index) => (
                    <li key={index} className={styles.recommendationItem}>
                      <div className={styles.recommendationBullet}></div>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.closeModalBtn} onClick={() => setShowScoreSummaryModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
