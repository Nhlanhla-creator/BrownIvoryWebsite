"use client"

import { useState, useEffect, useCallback } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  CheckCircle,
  ChevronRight,
  Star,
  Plus,
  X,
  ChevronDown,
  FileText,
  Upload,
  ExternalLink,
  Check,
  ChevronLeft,
  Calendar,
} from "lucide-react"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../firebaseConfig"
import { useNavigate } from "react-router-dom"
import styles from "./InvestorDashboard.module.css"

const Dashboard = () => {
  const user = auth.currentUser
  const userName = user ? user.email : "User"
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentMonth] = useState(new Date().getMonth())
  const [showDeadlineModal, setShowDeadlineModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [newDeadline, setNewDeadline] = useState({ title: "", date: "" })
  const [showBigScoreSummary, setShowBigScoreSummary] = useState(false)
  const [showServiceScoreSummary, setShowServiceScoreSummary] = useState(false)
  const [deadlines, setDeadlines] = useState([
    { date: 15, title: "Tax Submission" },
    { date: 30, title: "Compliance Review" },
  ])
  const [selectedCategory, setSelectedCategory] = useState("Customers")

  // State for company summary modal
  const [showCompanySummary, setShowCompanySummary] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)

  // In your Dashboard component
  const [complianceScore, setComplianceScore] = useState(0)
  const [profileData, setProfileData] = useState(null)
  const [missingDocuments, setMissingDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryScores, setCategoryScores] = useState({
    financialHealth: 0,
    operationalStrength: 0,
    pitchQuality: 0,
    impactProof: 0,
  })

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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = auth.currentUser?.uid
        if (!userId) {
          console.error("User not logged in")
          return
        }

        const docRef = doc(db, "universalProfiles", userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setProfileData(docSnap.data())
        } else {
          console.error("No profile found")
        }
      } catch (err) {
        console.error("Error fetching profile data:", err)
      }
    }

    fetchProfileData()
  }, [])

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
        compliance: Math.round(complianceScoreValue * weights.compliance),
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
    }
  }, [profileData])

  // Update calculation functions to return 0-100 scores
  const calculateComplianceScore = (profileData) => {
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

    return (presentCount / requiredDocuments.length) * 100
  }

  const calculateFinancialHealth = (profileData) => {
    let score = 0

    // Financial indicators
    if (profileData?.entityOverview?.financialYearEnd) score += 0
    if (profileData?.entityOverview?.yearsInOperation) {
      const years = Number.parseInt(profileData.entityOverview.yearsInOperation)
      score += Math.min(years * 0, 0) // Up to 20 points for longevity
    }
    if (profileData?.productsServices?.annualTurnover) score += 0
    if (profileData?.legalCompliance?.taxClearanceNumber) score += 0
    if (profileData?.legalCompliance?.vatNumber) score += 0

    return Math.min(100, score)
  }

  const calculateOperationalStrength = (profileData) => {
    let score = 0

    if (profileData?.entityOverview?.employeeCount) {
      const employees = Number.parseInt(profileData.entityOverview.employeeCount)
      score += Math.min(employees * 0, 0) // Up to 20 points for team size
    }
    if (profileData?.entityOverview?.yearsInOperation) {
      const years = Number.parseInt(profileData.entityOverview.yearsInOperation)
      score += Math.min(years * 0, 0) // Up to 20 points for longevity
    }
    if (profileData?.productsServices?.keyClients?.length > 0) {
      score += Math.min(profileData.productsServices.keyClients.length * 0, 0)
    }
    if (profileData?.ownershipManagement?.directors?.length > 0) score += 0
    if (profileData?.contactDetails?.website) score += 0

    return Math.min(100, score)
  }

  const calculatePitchQuality = (profileData) => {
    let score = 0

    if (profileData?.entityOverview?.businessDescription) {
      const descLength = profileData.entityOverview.businessDescription.length
      score += Math.min(descLength / 1, 0) // Up to 30 points for description
    }
    if (profileData?.productsServices?.productCategories?.products?.length > 0) {
      score += Math.min(profileData.productsServices.productCategories.products.length * 0, 0)
    }
    if (profileData?.productsServices?.serviceCategories?.services?.length > 0) {
      score += Math.min(profileData.productsServices.serviceCategories.services.length * 0, 0)
    }
    if (profileData?.entityOverview?.targetMarket) score += 0

    return Math.min(100, score)
  }

  const calculateImpactProof = (profileData) => {
    let score = 0

    if (
      profileData?.entityOverview?.targetMarket?.includes("social") ||
      profileData?.entityOverview?.targetMarket?.includes("impact")
    ) {
      score += 0
    }
    if (
      profileData?.entityOverview?.businessDescription?.includes("impact") ||
      profileData?.entityOverview?.businessDescription?.includes("social")
    ) {
      score += 0
    }
    if (profileData?.howDidYouHear?.source === "Referral") score += 0
    if (profileData?.declarationConsent?.accuracy) score += 0
    if (profileData?.declarationConsent?.dataProcessing) score += 0

    return Math.min(100, score)
  }

  // Set other categories to 0 (12.5% each when implemented)
  const fundabilityScoreData = [
    {
      name: "Compliance",
      value: complianceScore,
      color: "#8D6E63",
      weight: operationStageWeights[profileData?.entityOverview?.operationStage || "ideation"]?.compliance * 100 + "%",
      description: "Legal and regulatory documentation completeness",
    },
    {
      name: "Financial Health",
      value: categoryScores.financialHealth,
      color: "#6D4C41",
      weight:
        operationStageWeights[profileData?.entityOverview?.operationStage || "ideation"]?.financialHealth * 100 + "%",
      description: "Financial stability and performance metrics",
    },
    {
      name: "Operational Strength",
      value: categoryScores.operationalStrength,
      color: "#A67C52",
      weight:
        operationStageWeights[profileData?.entityOverview?.operationStage || "ideation"]?.operationalStrength * 100 +
        "%",
      description: "Team size, experience, and operational capabilities",
    },
    {
      name: "Pitch Quality",
      value: categoryScores.pitchQuality,
      color: "#795548",
      weight:
        operationStageWeights[profileData?.entityOverview?.operationStage || "ideation"]?.pitchQuality * 100 + "%",
      description: "Business narrative clarity and attractiveness",
    },
    {
      name: "Impact Proof",
      value: categoryScores.impactProof,
      color: "#5D4037",
      weight: operationStageWeights[profileData?.entityOverview?.operationStage || "ideation"]?.impactProof * 100 + "%",
      description: "Social/environmental impact and market need validation",
    },
    // Additional category for visualization (not included in total score)
    {
      name: "Stage Weighting Profile",
      value: 100,
      color: "#BCAAA4",
      weight: "N/A",
      description: `Current weighting: ${profileData?.entityOverview?.operationStage || "ideation"} stage`,
    },
  ]

  // Calculate total score
  const totalFundabilityScore = Math.round(
    complianceScore +
      categoryScores.financialHealth +
      categoryScores.operationalStrength +
      categoryScores.pitchQuality +
      categoryScores.impactProof,
  )

  // State for document selection modal
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [selectedDocuments, setSelectedDocuments] = useState([])

  // State for detailed reviews modal
  const [showDetailedReviews, setShowDetailedReviews] = useState(false)

  // State for outcome filter
  const [outcomeFilter, setOutcomeFilter] = useState("all")

  // State to track application status for each investor
  const [investorStatus, setInvestorStatus] = useState({})

  // Sample documents for selection
  const availableDocuments = [
    { id: 1, name: "Business Plan.pdf", size: "2.4 MB", date: "May 1, 2023", selected: false },
    { id: 2, name: "Financial Projections.xlsx", size: "1.8 MB", date: "May 3, 2023", selected: false },
    { id: 3, name: "Pitch Deck.pptx", size: "5.2 MB", date: "May 5, 2023", selected: false },
    { id: 4, name: "Market Analysis.pdf", size: "3.1 MB", date: "May 7, 2023", selected: false },
    { id: 5, name: "Team Bios.docx", size: "1.2 MB", date: "May 10, 2023", selected: false },
  ]

  const [documents, setDocuments] = useState(availableDocuments)

  // Written tracker steps - Modified to ensure words are on two lines with <br/>
  const [trackerSteps, setTrackerSteps] = useState([
    { label: "Universal Business\nProfile", description: "", completed: true, showDetails: false },
    { label: "Compliance &\nLegitimacy Check", description: "", completed: true, showDetails: false },
    { label: "Market Visibility\nand Matching", description: "", completed: true, showDetails: false },
    { label: "Funding &\nFundability Check", description: "", active: true, showDetails: false },
    { label: "Life-Cycle Adjusted\nScoring", description: "", completed: false, showDetails: false },
    { label: "Growth\nRecommendations", description: "", completed: false, showDetails: false },
  ])

  const toggleStepDetails = (index) => {
    const newSteps = [...trackerSteps]
    // Close all other open steps
    newSteps.forEach((step, i) => {
      if (i !== index) step.showDetails = false
    })
    // Toggle the clicked step
    newSteps[index].showDetails = !newSteps[index].showDetails
    setTrackerSteps(newSteps)
  }

  // Replace the existing dealflowSteps state with this enhanced version that includes data for each step
  const [dealflowSteps, setDealflowSteps] = useState([
    { label: "Investor Interest", description: "Investors showing interest", completed: true, showDetails: false },
    { label: "Application Sent", description: "Submitted applications", completed: true, showDetails: false },
    { label: "Pitch Review", description: "Under investor review", completed: true, showDetails: false },
    { label: "Due Diligence", description: "", active: true, showDetails: false },
    { label: "Term Sheet", description: "Negotiating terms", completed: false, showDetails: false },
    { label: "Final Review", description: "Final approval process", completed: false, showDetails: false },
    { label: "Approved", description: "Funding approved", completed: false, showDetails: false },
    { label: "Closed", description: "Deal completed", completed: false, showDetails: false },
  ])

  // Add these new data structures after the dealflowSteps state
  // Sample VC data for each step
  // Replace the vcData object with this enhanced version that includes more relevant information
  const [vcData, setVcData] = useState({
    "Investor Interest": [
      {
        id: "vc-a",
        name: "VC Firm A",
        matchScore: 92,
        stage: "Initial Interest",
        fundingStage: "Series A",
        industry: "FinTech",
        location: "South Africa",
        fundingAmount: "R5M",
        expectedResponse: "May 15, 2023",
        website: "www.vcfirma.co.za",
        companyFocus: "Early-stage fintech startups with proven traction",
        contactPerson: "John Smith",
        description:
          "VC Firm A is a leading venture capital firm in South Africa focusing on early-stage fintech startups. They have a strong track record of successful investments in payment solutions, digital banking, and financial inclusion technologies.",
        portfolio: ["PayFast", "TymeBank", "Lulalend"],
        investmentCriteria: "Minimum R500K monthly revenue, 30% YoY growth, clear path to profitability",
      },
      {
        id: "angel-b",
        name: "Angel Investor B",
        matchScore: 87,
        stage: "Initial Interest",
        fundingStage: "Seed",
        industry: "Healthcare",
        location: "Namibia",
        fundingAmount: "R2M",
        expectedResponse: "May 18, 2023",
        website: "www.angelb.com",
        companyFocus: "Healthcare innovation and medical devices",
        contactPerson: "Sarah Johnson",
        description:
          "Angel Investor B is a prominent angel investor with a background in healthcare. They focus on innovative healthcare solutions, medical devices, and health tech startups across Southern Africa.",
        portfolio: ["MediCheck", "HealthConnect", "PharmaDirect"],
        investmentCriteria: "Proven concept, regulatory approval path, addressable market of R100M+",
      },
    ],
    "Application Sent": [
      {
        id: "vc-a",
        name: "VC Firm A",
        matchScore: 92,
        stage: "Application Review",
        fundingStage: "Series A",
        industry: "FinTech",
        location: "South Africa",
        fundingAmount: "R5M",
        expectedResponse: "May 22, 2023",
        applicationDate: "May 5, 2023",
        reviewStatus: "Under Review",
        estimatedCompletionTime: "2-3 weeks",
      },
      {
        id: "corp-c",
        name: "Corporate Fund C",
        matchScore: 79,
        stage: "Application Review",
        fundingStage: "Series B",
        industry: "SaaS",
        location: "Zambia",
        fundingAmount: "R10M",
        expectedResponse: "May 25, 2023",
        applicationDate: "May 7, 2023",
        reviewStatus: "Initial Screening",
        estimatedCompletionTime: "3-4 weeks",
      },
    ],
    "Pitch Review": [
      {
        id: "vc-a",
        name: "VC Firm A",
        matchScore: 92,
        stage: "Pitch Evaluation",
        fundingStage: "Series A",
        industry: "FinTech",
        location: "South Africa",
        fundingAmount: "R5M",
        expectedResponse: "June 1, 2023",
        pitchDate: "May 15, 2023",
        pitchReviewed: "Yes",
        feedback: "Strong business model, needs market validation",
        nextSteps: "Due diligence phase",
      },
    ],
    "Due Diligence": [
      {
        id: "vc-a",
        name: "VC Firm A",
        matchScore: 92,
        stage: "Due Diligence",
        fundingStage: "Series A",
        industry: "FinTech",
        location: "South Africa",
        fundingAmount: "R5M",
        expectedResponse: "June 15, 2023",
        startDate: "June 1, 2023",
        progress: "60%",
        remainingItems: "Financial audit, Customer verification",
        assignedAnalyst: "Michael Brown",
      },
    ],
    "Term Sheet": [
      {
        id: "vc-a",
        name: "VC Firm A",
        matchScore: 92,
        stage: "Term Sheet",
        fundingStage: "Series A",
        industry: "FinTech",
        location: "South Africa",
        fundingAmount: "R5M",
        documentSent: "Yes",
        dateSent: "June 20, 2023",
        expectedResponse: "June 30, 2023",
        keyTerms: "10% equity, board seat, vesting schedule",
        status: "Awaiting signature",
      },
    ],
    "Final Review": [
      {
        id: "vc-a",
        name: "VC Firm A",
        matchScore: 92,
        stage: "Final Review",
        fundingStage: "Series A",
        industry: "FinTech",
        location: "South Africa",
        fundingAmount: "R5M",
        reviewStarted: "July 5, 2023",
        expectedCompletion: "July 15, 2023",
        reviewers: "Investment Committee",
        status: "In progress",
        remainingSteps: "Final approval, Legal review",
      },
    ],
    Approved: [
      {
        id: "vc-a",
        name: "VC Firm A",
        matchScore: 92,
        stage: "Approved",
        fundingStage: "Series A",
        industry: "FinTech",
        location: "South Africa",
        fundingAmount: "R5M",
        approvalDate: "July 20, 2023",
        fundingDate: "August 1, 2023",
        approvedBy: "Investment Board",
        conditions: "Milestone-based funding release",
        nextSteps: "Legal documentation, Bank transfers",
      },
    ],
    Closed: [
      {
        id: "vc-a",
        name: "VC Firm A",
        matchScore: 92,
        stage: "Closed",
        fundingStage: "Series A",
        industry: "FinTech",
        location: "South Africa",
        fundingAmount: "R5M",
        closingDate: "August 10, 2023",
        outcome: "Success",
        fundingReceived: "R5M",
        milestones: "Product launch: Q4 2023, Revenue target: R2M by Q2 2024",
        notes: "Successful funding round with favorable terms",
      },
      {
        id: "angel-b",
        name: "Angel Investor B",
        matchScore: 87,
        stage: "Closed",
        fundingStage: "Seed",
        industry: "Healthcare",
        location: "Namibia",
        fundingAmount: "R0",
        closingDate: "July 5, 2023",
        outcome: "Failed",
        reason: "Misalignment on valuation and growth projections",
        notes: "Investor concerned about market entry strategy",
      },
    ],
  })

  // Handle sending application
  const handleSendApplication = useCallback((investorId) => {
    // Update investor status
    setInvestorStatus((prevStatus) => ({
      ...prevStatus,
      [investorId]: "sent",
    }))

    // In a real app, you would also update the backend
    // For now, we'll just show a success message
    alert("Application sent successfully!")
  }, [])

  // Handle cancelling application
  const handleCancelApplication = useCallback((investorId) => {
    // Update investor status
    setInvestorStatus((prevStatus) => ({
      ...prevStatus,
      [investorId]: "cancelled",
    }))

    // In a real app, you would also update the backend
    // For now, we'll just show a success message
    alert("Application cancelled successfully!")
  }, [])

  // Handle viewing company summary
  const handleViewSummary = useCallback((investor) => {
    setSelectedCompany(investor)
    setShowCompanySummary(true)
  }, [])

  // Handle document selection
  const handleDocumentSelection = useCallback(() => {
    setShowDocumentModal(true)
  }, [])

  // Toggle document selection
  const toggleDocumentSelection = useCallback(
    (docId) => {
      const updatedDocs = documents.map((doc) => (doc.id === docId ? { ...doc, selected: !doc.selected } : doc))
      setDocuments(updatedDocs)
    },
    [documents],
  )

  // Submit selected documents
  const submitSelectedDocuments = useCallback(() => {
    const selected = documents.filter((doc) => doc.selected)
    setSelectedDocuments(selected)
    setShowDocumentModal(false)
    alert(`${selected.length} documents submitted successfully!`)
  }, [documents])

  // Handle term sheet signing
  const handleSignTermSheet = useCallback(() => {
    alert("Term sheet signed successfully! You will be notified when the investor acknowledges receipt.")
  }, [])

  // Filter closed deals by outcome
  const getFilteredClosedDeals = useCallback(() => {
    if (outcomeFilter === "all") {
      return vcData["Closed"]
    }
    return vcData["Closed"].filter((deal) => deal.outcome.toLowerCase() === outcomeFilter.toLowerCase())
  }, [outcomeFilter, vcData])

  // Expected actions for each step
  const expectedActions = {
    "Universal Business\nProfile": "Complete your business profile with all required information.",
    "Compliance &\nLegitimacy Check": "Ensure all compliance documents are up to date and submitted.",
    "Market Visibility\nand Matching": "Improve your market visibility and find potential matches.",
    "Funding &\nFundability Check": "Prepare your funding documents and improve fundability score.",
    "Life-Cycle Adjusted\nScoring": "Review your business lifecycle and adjust strategies accordingly.",
    "Growth\nRecommendations": "Implement growth strategies based on recommendations.",
    "Investor Interest": "Respond to investor inquiries and provide initial company information.",
    "Application Sent": "Wait for application review and prepare for potential follow-up questions.",
    "Pitch Review": "Prepare for pitch presentation and gather supporting materials.",
    "Due Diligence": "Provide financial records, legal documents, and business plans for verification.",
    "Term Sheet": "Review and negotiate term sheet details with legal counsel.",
    "Final Review": "Address any final concerns and prepare for closing documentation.",
    Approved: "Complete final paperwork and prepare for fund transfer.",
    Closed: "Funds received. Begin implementing growth strategy.",
  }

  // Required documents for each step
  const requiredDocuments = {
    "Universal Business\nProfile": ["Company Overview", "Executive Summary"],
    "Compliance &\nLegitimacy Check": ["Business Registration", "Tax Compliance", "Industry Certifications"],
    "Market Visibility\nand Matching": ["Market Analysis", "Competitive Analysis", "Target Customer Profile"],
    "Funding &\nFundability Check": ["Financial Statements", "Business Plan", "Funding Requirements"],
    "Life-Cycle Adjusted\nScoring": ["Growth Metrics", "Business Lifecycle Assessment", "Industry Benchmarks"],
    "Growth\nRecommendations": ["Strategic Plan", "Implementation Timeline", "Resource Requirements"],
    "Investor Interest": ["Company Overview", "Executive Summary"],
    "Application Sent": ["Business Plan", "Financial Projections", "Cap Table"],
    "Pitch Review": ["Pitch Deck", "Market Analysis", "Competitive Analysis"],
    "Due Diligence": ["Financial Statements", "Legal Documents", "Customer Contracts", "IP Documentation"],
    "Term Sheet": ["Term Sheet Draft", "Capitalization Table", "Valuation Report"],
    "Final Review": ["Final Agreement", "Banking Details", "Compliance Documents"],
    Approved: ["Closing Documents", "Banking Instructions"],
    Closed: ["Post-Closing Compliance Documents"],
  }

  // Legitimacy score data
  const legitimacyScore = complianceScore * 2

  // Service Score data
  const serviceScoreData = [
    { name: "Compliance", value: 20, color: "#8D6E63" },
    { name: "Reliability", value: 50, color: "#6D4C41" },
    { name: "Customer Satisfaction", value: 30, color: "#A67C52" },
  ]

  // Total score calculation
  const totalServiceScore = serviceScoreData.reduce((sum, item) => sum + item.value, 0)

  const bigScoreData = [
    { name: "Compliance", value: 15, color: "#8D6E63" },
    { name: "Financial Health", value: 20, color: "#6D4C41" },
    { name: "Operational Strength", value: 20, color: "#A67C52" },
    { name: "Pitch Quality", value: 20, color: "#795548" },
    { name: "Impact Proof", value: 20, color: "#5D4037" },
  ]

  // Total score calculation
  const totalScore = bigScoreData.reduce((sum, item) => sum + item.value, 0)

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

  // Calendar navigation
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  // Get days in month and first day of month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  // Upcoming events
  const upcomingEvents = [
    { title: "Investor Meetup", date: "May 15, 2023", type: "meeting" },
    { title: "Pitch Workshop", date: "May 20, 2023", type: "workshop" },
    { title: "Funding Deadline", date: "May 30, 2023", type: "deadline" },
  ]

  // Updated ratings data with real names and detailed reviews
  const ratings = [
    {
      name: "Michael Thompson",
      rating: 4,
      date: "Apr 15, 2023",
      comment:
        "Great service and support! The team was very responsive to our needs and provided excellent guidance throughout the entire process.",
      company: "Thompson Enterprises",
      position: "CEO",
    },
    {
      name: "Priya Patel",
      rating: 4,
      date: "Apr 2, 2023",
      comment:
        "Very responsive team. They addressed all our concerns promptly and provided valuable insights for our business growth.",
      company: "Patel Innovations",
      position: "COO",
    },
  ]

  // Category data for Top Matches
  const categoryData = {
    Customers: [
      {
        name: "Customer A",
        serviceCategory: "Product Support",
        serviceNeeded: "Technical Assistance",
        match: 92,
        location: "Johannesburg",
        dealSize: "R50,000",
        status: "New Lead",
      },
      {
        name: "Customer B",
        serviceCategory: "Consulting",
        serviceNeeded: "Business Strategy",
        match: 87,
        location: "Cape Town",
        dealSize: "R75,000",
        status: "Proposal Sent",
      },
      {
        name: "Customer C",
        serviceCategory: "Implementation",
        serviceNeeded: "System Setup",
        match: 82,
        location: "Durban",
        dealSize: "R30,000",
        status: "Negotiating",
      },
    ],
    Suppliers: [
      {
        name: "Supplier A",
        serviceCategory: "Raw Materials",
        serviceOffered: "Premium Components",
        match: 90,
        location: "Pretoria",
        rating: "4.8/5",
        status: "Available",
      },
      {
        name: "Supplier B",
        serviceCategory: "Logistics",
        serviceOffered: "Express Delivery",
        match: 85,
        location: "Bloemfontein",
        rating: "4.5/5",
        status: "Limited Stock",
      },
      {
        name: "Supplier C",
        serviceCategory: "Equipment",
        serviceOffered: "Industrial Machinery",
        match: 78,
        location: "Port Elizabeth",
        rating: "4.2/5",
        status: "Available",
      },
    ],
    Funders: [
      {
        name: "Funder A",
        investmentType: "Equity",
        match: 88,
        location: "Johannesburg",
        stageFocus: "Series A",
        status: "Accepting Applications",
      },
      {
        name: "Funder B",
        investmentType: "Debt",
        match: 82,
        location: "Cape Town",
        stageFocus: "Growth Stage",
        status: "Due Diligence",
      },
      {
        name: "Funder C",
        investmentType: "Grant",
        match: 75,
        location: "Pretoria",
        stageFocus: "Early Stage",
        status: "Reviewing",
      },
    ],
    Support: [
      {
        name: "Program A",
        programType: "Accelerator",
        match: 91,
        location: "Johannesburg",
        focusArea: "Tech Startups",
        status: "Applications Open",
      },
      {
        name: "Program B",
        programType: "Incubator",
        match: 86,
        location: "Durban",
        focusArea: "Social Enterprise",
        status: "Cohort Starting",
      },
      {
        name: "Program C",
        programType: "ESD",
        match: 79,
        location: "Cape Town",
        focusArea: "Manufacturing",
        status: "Ongoing Support",
      },
    ],
  }

  // Recommendations based on score
  const getRecommendations = useCallback(() => {
    const currentMonthScore = monthlyScoreData[currentMonth]?.score || 0
    if (currentMonthScore < 50) {
      return ["Improve financial documentation", "Complete compliance checklist", "Update pitch deck"]
    } else if (currentMonthScore < 70) {
      return ["Enhance operational metrics", "Practice investor pitch", "Expand investor outreach"]
    } else {
      return ["Explore additional funding rounds", "Network with tier-1 investors", "Optimize financial projections"]
    }
  }, [currentMonth, monthlyScoreData])

  // Handle calendar day click
  const handleDayClick = useCallback(
    (day) => {
      setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
      setNewDeadline({
        title: "",
        date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(
          day,
        ).padStart(2, "0")}`,
      })
      setShowDeadlineModal(true)
    },
    [currentDate],
  )

  // Add new deadline
  const addDeadline = useCallback(() => {
    if (newDeadline.title.trim() && newDeadline.date) {
      const day = new Date(newDeadline.date).getDate()
      setDeadlines([...deadlines, { date: day, title: newDeadline.title }])
      setShowDeadlineModal(false)
      setNewDeadline({ title: "", date: "" })
    }
  }, [deadlines, newDeadline])

  // Remove deadline
  const removeDeadline = useCallback(
    (index) => {
      const newDeadlines = [...deadlines]
      newDeadlines.splice(index, 1)
      setDeadlines(newDeadlines)
    },
    [deadlines],
  )

  // Toggle Big Score Summary
  const [showScoreSummaryModal, setShowScoreSummaryModal] = useState(false)
  const toggleBigScoreSummary = useCallback(() => {
    setShowScoreSummaryModal(!showScoreSummaryModal)
  }, [showScoreSummaryModal])

  // Toggle Service Score Summary
  const toggleServiceScoreSummary = useCallback(() => {
    setShowServiceScoreSummary(!showServiceScoreSummary)
  }, [showServiceScoreSummary])

  // Get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case "Customers":
        return "#5D4037" // Dark brown
      case "Suppliers":
        return "#8D6E63" // Medium brown
      case "Funders":
        return "#A67C52" // Light brown
      case "Support":
        return "#BCAAA4" // Pale brown
      default:
        return "#6b7280" // Gray
    }
  }

  // Get category background color (lighter shade)
  const getCategoryBgColor = (category) => {
    switch (category) {
      case "Customers":
        return "bg-brown-100"
      case "Suppliers":
        return "bg-brown-50"
      case "Funders":
        return "bg-brown-200"
      case "Support":
        return "bg-brown-300"
      default:
        return "bg-gray-100"
    }
  }

  // Get category text color
  const getCategoryTextColor = (category) => {
    switch (category) {
      case "Customers":
        return "text-brown-800"
      case "Suppliers":
        return "text-brown-700"
      case "Funders":
        return "text-brown-600"
      case "Support":
        return "text-brown-500"
      default:
        return "text-gray-800"
    }
  }

  // Add this state at the top level of your component with other state declarations:
  const [visibleReviewDetails, setVisibleReviewDetails] = useState({})
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)
  // Add this with the other state declarations
  const [calendarViewFilter, setCalendarViewFilter] = useState("month")

  // Updated CSS classes with brown shades
  const styles = {
    primaryBrown: "#5D4037",
    lightBrown: "#8D6E63",
    darkBrown: "#3E2723",
    accentBrown: "#A67C52",
    paleBrown: "#D7CCC8",
    backgroundBrown: "#EFEBE9",
  }

  // Updated Calendar Component - More Compact
  const CompactCalendar = () => {
    const [showFullCalendar, setShowFullCalendar] = useState(false)
    
    return (
      <div className="compact-calendar">
        <div className="calendar-header">
          <span className="current-month">
            {currentDate.toLocaleString('default', { month: 'short', year: 'numeric' })}
          </span>
          <button 
            className="view-calendar-btn"
            onClick={() => setShowFullCalendar(true)}
          >
            <Calendar size={16} />
          </button>
        </div>
        
        <div className="calendar-days-grid compact">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="day-header compact">{day}</div>
          ))}
          
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="empty-day compact"></div>
          ))}
          
          {Array.from({ length: Math.min(14, daysInMonth) }).map((_, i) => {
            const day = i + 1
            const isDeadline = deadlines.some(d => d.date === day)
            const isToday = day === new Date().getDate() && 
              currentDate.getMonth() === new Date().getMonth() && 
              currentDate.getFullYear() === new Date().getFullYear()
              
            return (
              <div
                key={`day-${day}`}
                className={`calendar-day compact ${isDeadline ? 'deadline' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                <span className="day-number">{day}</span>
                {isDeadline && <div className="deadline-dot"></div>}
              </div>
            )
          })}
        </div>
        
        {/* Full Calendar Modal */}
        {showFullCalendar && (
          <div className="modal-overlay">
            <div className="ios-calendar-modal">
              <div className="modal-header">
                <h3>Calendar</h3>
                <button onClick={() => setShowFullCalendar(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div className="ios-calendar">
                  <div className="calendar-header">
                    <button onClick={() => navigateMonth("prev")} className="month-nav-btn">
                      <ChevronLeft size={16} />
                    </button>
                    <span className="current-month">
                      {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
                    </span>
                    <button onClick={() => navigateMonth("next")} className="month-nav-btn">
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="calendar-days-header">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                      <div key={day} className="day-header">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="calendar-days-grid">
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={`empty-${i}`} className="empty-day"></div>
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1
                      const isDeadline = deadlines.some((d) => d.date === day)
                      const isToday =
                        day === new Date().getDate() &&
                        currentDate.getMonth() === new Date().getMonth() &&
                        currentDate.getFullYear() === new Date().getFullYear()

                      const hasEvents = upcomingEvents.some((event) => {
                        const eventDate = new Date(event.date)
                        return (
                          eventDate.getDate() === day &&
                          eventDate.getMonth() === currentDate.getMonth() &&
                          eventDate.getFullYear() === currentDate.getFullYear()
                        )
                      })

                      return (
                        <div
                          key={`day-${day}`}
                          className={`calendar-day ${isDeadline ? "deadline" : ""} ${isToday ? "today" : ""} ${hasEvents ? "has-events" : ""}`}
                          onClick={() => handleDayClick(day)}
                        >
                          <span className="day-number">{day}</span>
                          {hasEvents && <div className="event-dot"></div>}
                          {isDeadline && <div className="deadline-dot"></div>}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="upcoming-events">
                  <h4 className="events-title">Upcoming Events</h4>
                  <div className="events-list">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="ios-event-item">
                        <div className={`event-color-indicator ${event.type}`}></div>
                        <div className="event-details">
                          <span className="event-title">{event.title}</span>
                          <span className="event-date">{event.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="ios-button add" onClick={() => setShowDeadlineModal(true)}>
                  <Plus size={14} /> Add Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Updated Big Legitimacy Score Component with Popup
  const LegitimacyScoreCard = () => {
    return (
      <div className="readiness-card compact" style={{ borderColor: styles.lightBrown }}>
        <div className="card-header">
          <h3 style={{ fontWeight: "500", color: styles.primaryBrown }}>BIG Legitimacy Score</h3>
        </div>

        <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
          <div 
            className="score-circle" 
            style={{ 
              backgroundColor: styles.backgroundBrown,
              color: styles.primaryBrown,
              borderColor: styles.accentBrown
            }}
          >
            {legitimacyScore}%
          </div>
        </div>

        <button
          className="view-summary-btn centered-btn"
          onClick={() => setShowBigScoreSummary(!showBigScoreSummary)}
          style={{ backgroundColor: styles.paleBrown, color: styles.primaryBrown }}
        >
          View More
          <ChevronDown className={`summary-icon ${showBigScoreSummary ? "rotate" : ""}`} size={16} />
        </button>

        {showBigScoreSummary && (
          <div className="score-summary-content">
            <p className="summary-title" style={{ color: styles.darkBrown }}>Legitimacy Verification:</p>
            <ul className="summary-list">
              <li className="summary-item">
                <div className="summary-bullet" style={{ backgroundColor: styles.accentBrown }}></div>
                <span>Business registration verified</span>
                <span className="status-indicator verified" style={{ color: styles.primaryBrown }}>✓</span>
              </li>
              <li className="summary-item">
                <div className="summary-bullet" style={{ backgroundColor: styles.accentBrown }}></div>
                <span>Tax compliance confirmed</span>
                <span className="status-indicator verified" style={{ color: styles.primaryBrown }}>✓</span>
              </li>
              <li className="summary-item">
                <div className="summary-bullet" style={{ backgroundColor: styles.accentBrown }}></div>
                <span>Industry certifications valid</span>
                <span className="status-indicator verified" style={{ color: styles.primaryBrown }}>✓</span>
              </li>
              <li className="summary-item">
                <div className="summary-bullet" style={{ backgroundColor: styles.accentBrown }}></div>
                <span>Company address verified</span>
                <span className="status-indicator verified" style={{ color: styles.primaryBrown }}>✓</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  }

  // Updated Top Matches Table without Action column
  const TopMatchesTable = () => {
    return (
      <div className="matches-table-card" style={{ 
        borderColor: styles.lightBrown,
        backgroundColor: styles.backgroundBrown
      }}>
        <div className="card-header">
          <h3 style={{ fontWeight: "500", color: styles.primaryBrown }}>Top Matches</h3>
          <div className="category-tabs">
            {Object.keys(categoryData).map((category) => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? "active" : ""}`}
                style={{
                  borderColor: selectedCategory === category ? getCategoryColor(category) : "transparent",
                  color: selectedCategory === category ? styles.primaryBrown : styles.lightBrown,
                }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="matches-table">
          <table>
            <thead>
              <tr style={{ backgroundColor: styles.paleBrown }}>
                {selectedCategory === "Customers" && (
                  <>
                    <th style={{ color: styles.primaryBrown }}>Customer Name</th>
                    <th style={{ color: styles.primaryBrown }}>Service Category</th>
                    <th style={{ color: styles.primaryBrown }}>Service Needed</th>
                    <th style={{ color: styles.primaryBrown }}>% Match</th>
                    <th style={{ color: styles.primaryBrown }}>Location</th>
                    <th style={{ color: styles.primaryBrown }}>Deal Size</th>
                    <th style={{ color: styles.primaryBrown }}>Status</th>
                  </>
                )}
                {selectedCategory === "Suppliers" && (
                  <>
                    <th style={{ color: styles.primaryBrown }}>Supplier Name</th>
                    <th style={{ color: styles.primaryBrown }}>Service Category</th>
                    <th style={{ color: styles.primaryBrown }}>Service Offered</th>
                    <th style={{ color: styles.primaryBrown }}>% Match</th>
                    <th style={{ color: styles.primaryBrown }}>Location</th>
                    <th style={{ color: styles.primaryBrown }}>Av. Supplier Rating</th>
                    <th style={{ color: styles.primaryBrown }}>Status</th>
                  </>
                )}
                {selectedCategory === "Funders" && (
                  <>
                    <th style={{ color: styles.primaryBrown }}>Funder Name</th>
                    <th style={{ color: styles.primaryBrown }}>Investment Type</th>
                    <th style={{ color: styles.primaryBrown }}>% Match</th>
                    <th style={{ color: styles.primaryBrown }}>Location</th>
                    <th style={{ color: styles.primaryBrown }}>Stage/Focus</th>
                    <th style={{ color: styles.primaryBrown }}>Status</th>
                  </>
                )}
                {selectedCategory === "Support" && (
                  <>
                    <th style={{ color: styles.primaryBrown }}>Program Name</th>
                    <th style={{ color: styles.primaryBrown }}>Program Type</th>
                    <th style={{ color: styles.primaryBrown }}>% Match</th>
                    <th style={{ color: styles.primaryBrown }}>Location</th>
                    <th style={{ color: styles.primaryBrown }}>Focus Area</th>
                    <th style={{ color: styles.primaryBrown }}>Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {categoryData[selectedCategory].map((item, index) => (
                <tr 
                  key={index} 
                  className="match-row"
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'white' : styles.backgroundBrown,
                    borderBottom: `1px solid ${styles.paleBrown}`
                  }}
                >
                  {selectedCategory === "Customers" && (
                    <>
                      <td className="investor-name" style={{ color: styles.darkBrown }}>{item.name}</td>
                      <td style={{ color: styles.primaryBrown }}>{item.serviceCategory}</td>
                      <td style={{ color: styles.primaryBrown }}>{item.serviceNeeded}</td>
                      <td className="match-score-cell">
                        <div className="match-score-wrapper">
                          <div
                            className="match-bar"
                            style={{
                              width: `${item.match}%`,
                              background: `linear-gradient(90deg, ${styles.accentBrown}, ${styles.paleBrown})`,
                            }}
                          ></div>
                          <span className="match-percent" style={{ color: styles.primaryBrown }}>
                            {item.match}%
                          </span>
                        </div>
                      </td>
                      <td style={{ color: styles.primaryBrown }}>{item.location}</td>
                      <td style={{ color: styles.primaryBrown }}>{item.dealSize}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ 
                            backgroundColor: styles.paleBrown,
                            color: styles.primaryBrown
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                    </>
                  )}
                  {selectedCategory === "Suppliers" && (
                    <>
                      <td className="investor-name" style={{ color: styles.darkBrown }}>{item.name}</td>
                      <td style={{ color: styles.primaryBrown }}>{item.serviceCategory}</td>
                      <td style={{ color: styles.primaryBrown }}>{item.serviceOffered}</td>
                      <td className="match-score-cell">
                        <div className="match-score-wrapper">
                          <div
                            className="match-bar"
                            style={{
                              width: `${item.match}%`,
                              background: `linear-gradient(90deg, ${styles.accentBrown}, ${styles.paleBrown})`,
                            }}
                          ></div>
                          <span className="match-percent" style={{ color: styles.primaryBrown }}>
                            {item.match}%
                          </span>
                        </div>
                      </td>
                      <td style={{ color: styles.primaryBrown }}>{item.location}</td>
                      <td style={{ color: styles.primaryBrown }}>{item.rating}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ 
                            backgroundColor: styles.paleBrown,
                            color: styles.primaryBrown
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                    </>
                  )}
                  {selectedCategory === "Funders" && (
                    <>
                      <td className="investor-name" style={{ color: styles.darkBrown }}>{item.name}</td>
                      <td style={{ color: styles.primaryBrown }}>{item.investmentType}</td>
                      <td className="match-score-cell">
                        <div className="match-score-wrapper">
                          <div
                            className="match-bar"
                            style={{
                              width: `${item.match}%`,
                              background: `linear-gradient(90deg, ${styles.accentBrown}, ${styles.paleBrown})`,
                            }}
                          ></div>
                          <span className="match-percent" style={{ color: styles.primaryBrown }}>
                            {item.match}%
                          </span>
                        </div>
                      </td>
                      <td style={{ color: styles.primaryBrown }}>{item.location}</td>
                      <td style={{ color: styles.primaryBrown }}>{item.stageFocus}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ 
                            backgroundColor: styles.paleBrown,
                            color: styles.primaryBrown
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                    </>
                  )}
                  {selectedCategory === "Support" && (
                    <>
                      <td className="investor-name" style={{ color: styles.darkBrown }}>{item.name}</td>
                      <td style={{ color: styles.primaryBrown }}>{item.programType}</td>
                      <td className="match-score-cell">
                        <div className="match-score-wrapper">
                          <div
                            className="match-bar"
                            style={{
                              width: `${item.match}%`,
                              background: `linear-gradient(90deg, ${styles.accentBrown}, ${styles.paleBrown})`,
                            }}
                          ></div>
                          <span className="match-percent" style={{ color: styles.primaryBrown }}>
                            {item.match}%
                          </span>
                        </div>
                      </td>
                      <td style={{ color: styles.primaryBrown }}>{item.location}</td>
                      <td style={{ color: styles.primaryBrown }}>{item.focusArea}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ 
                            backgroundColor: styles.paleBrown,
                            color: styles.primaryBrown
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container" style={{ backgroundColor: styles.backgroundBrown }}>
      <div className="content">
        <main className="dashboard-main">
          {/* Written Tracker */}
          <div className="tracker-card" style={{ borderColor: styles.lightBrown }}>
            <div className="tracker-header">
              <h3 className="card-title" style={{ color: styles.primaryBrown }}>Application Tracker</h3>
            </div>
            <div className="tracker-content">
              <div className="tracker-steps">
                {trackerSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`tracker-step ${step.completed ? "completed" : step.active ? "active" : ""}`}
                    data-tooltip={`${expectedActions[step.label]}`}
                  >
                    <div className="step-marker">
                      {step.completed ? (
                        <CheckCircle size={16} color={styles.primaryBrown} />
                      ) : step.active ? (
                        <div className="active-dot" style={{ backgroundColor: styles.accentBrown }}></div>
                      ) : (
                        <div className="inactive-dot" style={{ backgroundColor: styles.paleBrown }}></div>
                      )}
                    </div>
                    <div className="step-info">
                      <span className="step-label" style={{ color: styles.primaryBrown }}>
                        {step.label.split("\n").map((line, i) => (
                          <span key={i} className="step-label-line">
                            {line}
                            {i === 0 && <br />}
                          </span>
                        ))}
                      </span>
                      {step.description && <span className="step-description">{step.description}</span>}
                    </div>
                    {index < trackerSteps.length - 1 && (
                      <ChevronRight size={16} className="step-arrow" color={styles.lightBrown} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* First Content Row */}
          <div className="main-stats-row">
            <LegitimacyScoreCard />
            
            {/* Customer Reviews & Ratings */}
            <div className="ratings-card compact" style={{ borderColor: styles.lightBrown }}>
              <div className="card-header">
                <h3 style={{ fontWeight: "500", color: styles.primaryBrown }}>Customer Reviews & Ratings</h3>
              </div>
              <div className="ratings-summary">
                <div className="ratings-count">
                  <span className="text-2xl font-bold" style={{ color: styles.primaryBrown }}>25</span>
                  <span className="text-sm" style={{ color: styles.lightBrown }}>Reviews</span>
                </div>
                <div className="average-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < 4 ? styles.accentBrown : styles.paleBrown}
                        color={i < 4 ? styles.accentBrown : styles.paleBrown}
                      />
                    ))}
                  </div>
                  <span className="text-sm" style={{ color: styles.lightBrown }}>4.0 Average</span>
                </div>
              </div>

              <button
                className="view-summary-btn centered-btn"
                onClick={() => setShowDetailedReviews(!showDetailedReviews)}
                style={{ backgroundColor: styles.paleBrown, color: styles.primaryBrown }}
              >
                View More
                <ChevronDown className={`summary-icon ${showDetailedReviews ? "rotate" : ""}`} size={16} />
              </button>

              {showDetailedReviews && (
                <div className="ratings-list">
                  {ratings.slice(0, 3).map((rating, index) => (
                    <div
                      key={index}
                      className="rating-item-with-details"
                      onMouseEnter={() => setVisibleReviewDetails({ ...visibleReviewDetails, [index]: true })}
                      onMouseLeave={() => setVisibleReviewDetails({ ...visibleReviewDetails, [index]: false })}
                    >
                      <div className="rating-header">
                        <div className="rating-info">
                          <div className="rating-name-actions">
                            <h4 style={{ color: styles.primaryBrown }}>{rating.name}</h4>
                            <button
                              className="view-details-btn"
                              onClick={() => {
                                setSelectedReview(rating)
                                setShowReviewModal(true)
                              }}
                              style={{ color: styles.accentBrown }}
                            >
                              View Details
                            </button>
                          </div>
                          <div className="stars">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < rating.rating ? styles.accentBrown : styles.paleBrown}
                                color={i < rating.rating ? styles.accentBrown : styles.paleBrown}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      {visibleReviewDetails[index] && (
                        <div className="rating-comment">
                          <p style={{ color: styles.primaryBrown }}>{rating.comment.substring(0, 100)}...</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Big Fundability Score */}
            <div className="readiness-card compact" style={{ borderColor: styles.lightBrown }}>
              <div className="card-header">
                <h3 style={{ fontWeight: "500", color: styles.primaryBrown }}>BIG Fundability Score</h3>
              </div>

              <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                <div 
                  className="score-circle"
                  style={{ 
                    backgroundColor: styles.backgroundBrown,
                    color: styles.primaryBrown,
                    borderColor: styles.accentBrown
                  }}
                >
                  {totalFundabilityScore}
                </div>
              </div>

              <button 
                className="view-summary-btn centered-btn"
                onClick={toggleBigScoreSummary}
                style={{ backgroundColor: styles.paleBrown, color: styles.primaryBrown }}
              >
                View More
                <ChevronDown className={`summary-icon ${showScoreSummaryModal ? "rotate" : ""}`} size={16} />
              </button>
            </div>

            {/* Compact Calendar */}
            <div className="ios-calendar-card compact" style={{ borderColor: styles.lightBrown }}>
              <div className="card-header">
                <h3 style={{ fontWeight: "500", color: styles.primaryBrown }}>Calendar & Events</h3>
              </div>
              <CompactCalendar />
              <div className="upcoming-events">
                <h4 className="events-title" style={{ color: styles.primaryBrown }}>Upcoming</h4>
                <div className="events-list">
                  {upcomingEvents.slice(0, 2).map((event, index) => (
                    <div key={index} className="ios-event-item">
                      <div 
                        className={`event-color-indicator ${event.type}`}
                        style={{ backgroundColor: styles.accentBrown }}
                      ></div>
                      <div className="event-details">
                        <span className="event-title" style={{ color: styles.primaryBrown }}>{event.title}</span>
                        <span className="event-date" style={{ color: styles.lightBrown }}>{event.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  className="add-event-btn" 
                  onClick={() => setShowDeadlineModal(true)}
                  style={{ backgroundColor: styles.paleBrown, color: styles.primaryBrown }}
                >
                  <Plus size={14} color={styles.primaryBrown} /> Add Event
                </button>
              </div>
            </div>
          </div>

          {/* Second Row - Top Matches */}
          <div className="second-row">
            <TopMatchesTable />
          </div>

          {/* Detailed Reviews Modal */}
          {showDetailedReviews && (
            <div className="modal-overlay">
              <div className="reviews-modal">
                <div className="modal-header">
                  <h3 style={{ fontWeight: "500", color: "#555" }}>Detailed Customer Reviews</h3>
                  <button onClick={() => setShowDetailedReviews(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="reviews-summary">
                    <div className="ratings-count">
                      <span className="text-3xl font-bold" style={{ color: styles.primaryBrown }}>25</span>
                      <span className="text-sm" style={{ color: styles.lightBrown }}>Total Reviews</span>
                    </div>
                    <div className="average-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            fill={i < 4 ? styles.accentBrown : styles.paleBrown}
                            color={i < 4 ? styles.accentBrown : styles.paleBrown}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold" style={{ color: styles.primaryBrown }}>4.0 Average</span>
                    </div>
                  </div>
                  <div className="reviews-list-detailed">
                    {ratings.map((rating, index) => (
                      <div key={index} className="review-item-detailed">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <h4 style={{ color: styles.primaryBrown }}>{rating.name}</h4>
                            <p className="reviewer-company" style={{ color: styles.lightBrown }}>
                              {rating.company} • {rating.position}
                            </p>
                            <p style={{ color: styles.lightBrown }}>{rating.date}</p>
                          </div>
                          <div className="stars">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                fill={i < rating.rating ? styles.accentBrown : styles.paleBrown}
                                color={i < rating.rating ? styles.accentBrown : styles.paleBrown}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="review-comment">
                          <p style={{ color: styles.primaryBrown }}>{rating.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    className="cancel-btn" 
                    onClick={() => setShowDetailedReviews(false)}
                    style={{ backgroundColor: styles.paleBrown, color: styles.primaryBrown }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Deadline Modal */}
          {showDeadlineModal && (
            <div className="modal-overlay">
              <div className="ios-modal">
                <div className="modal-header">
                  <h3>New Event</h3>
                  <button onClick={() => setShowDeadlineModal(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={newDeadline.title}
                      onChange={(e) => setNewDeadline({ ...newDeadline, title: e.target.value })}
                      placeholder="Enter event title"
                      className="ios-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={newDeadline.date}
                      onChange={(e) => setNewDeadline({ ...newDeadline, date: e.target.value })}
                      className="ios-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Event Type</label>
                    <select className="ios-select" defaultValue="meeting">
                      <option value="meeting">Meeting</option>
                      <option value="deadline">Deadline</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    className="ios-button cancel" 
                    onClick={() => setShowDeadlineModal(false)}
                    style={{ backgroundColor: styles.paleBrown, color: styles.primaryBrown }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="ios-button add" 
                    onClick={addDeadline}
                    style={{ backgroundColor: styles.primaryBrown, color: 'white' }}
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Company Summary Modal */}
          {showCompanySummary && selectedCompany && (
            <div className="modal-overlay">
              <div className="company-modal">
                <div className="modal-header">
                  <h3 style={{ fontWeight: "500", color: "#555" }}>Company Summary: {selectedCompany.name}</h3>
                  <button onClick={() => setShowCompanySummary(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="company-info">
                    <div className="info-group">
                      <h4>Company Focus</h4>
                      <p>{selectedCompany.companyFocus}</p>
                    </div>
                    <div className="info-group">
                      <h4>Investment Criteria</h4>
                      <p>{selectedCompany.investmentCriteria}</p>
                    </div>
                    <div className="info-group">
                      <h4>Portfolio Companies</h4>
                      <ul className="portfolio-list">
                        {selectedCompany.portfolio.map((company, index) => (
                          <li key={index}>{company}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="info-group">
                      <h4>Description</h4>
                      <p>{selectedCompany.description}</p>
                    </div>
                    <div className="info-group">
                      <h4>Contact Person</h4>
                      <p>{selectedCompany.contactPerson}</p>
                    </div>
                    <div className="info-group">
                      <h4>Website</h4>
                      <a
                        href={`https://${selectedCompany.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="website-link"
                      >
                        <ExternalLink size={14} /> {selectedCompany.website}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    className="cancel-btn" 
                    onClick={() => setShowCompanySummary(false)}
                    style={{ backgroundColor: styles.paleBrown, color: styles.primaryBrown }}
                  >
                    Close
                  </button>
                  <button
                    className="add-btn"
                    onClick={() => {
                      handleSendApplication(selectedCompany.id)
                      setShowCompanySummary(false)
                    }}
                    style={{ backgroundColor: styles.primaryBrown, color: 'white' }}
                  >
                    Send Application
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Document Selection Modal */}
          {showDocumentModal && (
            <div className="modal-overlay">
              <div className="document-modal">
                <div className="modal-header">
                  <h3 style={{ fontWeight: "500", color: "#555" }}>Select Documents to Submit</h3>
                  <button onClick={() => setShowDocumentModal(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="document-list-container">
                    <table className="document-selection-table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Document Name</th>
                          <th>Size</th>
                          <th>Date Uploaded</th>
                        </tr>
                      </thead>
                      <tbody>
                        {documents.map((doc) => (
                          <tr
                            key={doc.id}
                            className={doc.selected ? "selected" : ""}
                            onClick={() => toggleDocumentSelection(doc.id)}
                          >
                            <td>
                              <div className={`checkbox ${doc.selected ? "checked" : ""}`}>
                                {doc.selected && <Check size={14} />}
                              </div>
                            </td>
                            <td>
                              <div className="document-name">
                                <FileText size={16} className="doc-icon" />
                                {doc.name}
                              </div>
                            </td>
                            <td>{doc.size}</td>
                            <td>{doc.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="upload-section">
                    <button className="upload-btn">
                      <Upload size={14} /> Upload New Document
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    className="cancel-btn" 
                    onClick={() => setShowDocumentModal(false)}
                    style={{ backgroundColor: styles.paleBrown, color: styles.primaryBrown }}
                  >
                    Cancel
                  </button>
                  <button
                    className="add-btn"
                    onClick={submitSelectedDocuments}
                    disabled={!documents.some((doc) => doc.selected)}
                    style={{ backgroundColor: styles.primaryBrown, color: 'white' }}
                  >
                    <Check size={16} /> Submit Selected Documents
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Score Summary Modal */}
          {showScoreSummaryModal && (
            <div className="modal-overlay">
              <div className="reviews-modal" style={{ maxWidth: "700px" }}>
                <div className="modal-header">
                  <h3 style={{ fontWeight: "500", color: "#555" }}>BIG Fundability Score Summary</h3>
                  <button onClick={() => setShowScoreSummaryModal(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-body">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "20px",
                      marginBottom: "20px",
                      padding: "15px",
                      backgroundColor: "#f8f5f2",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                        border: "1px solid #e8e0da",
                        color: "#555",
                        fontWeight: "600",
                        fontSize: "1.5rem",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                        flexShrink: 0,
                      }}
                    >
                      {totalFundabilityScore}%
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <span style={{ fontSize: "0.9rem", color: "#666" }}>Operation Stage:</span>
                        <span
                          style={{
                            fontWeight: "600",
                            color: "#555",
                            textTransform: "uppercase",
                          }}
                        >
                          {profileData?.entityOverview?.operationStage || "ideation"}
                        </span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                        {fundabilityScoreData.map((item, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              backgroundColor: "white",
                              padding: "8px 12px",
                              borderRadius: "6px",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                            }}
                          >
                            <div
                              style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "3px",
                                backgroundColor: item.color,
                              }}
                            ></div>
                            <span style={{ fontSize: "0.85rem", color: "#555" }}>{item.name}</span>
                            <span
                              style={{
                                marginLeft: "auto",
                                fontWeight: "600",
                                color: "#555",
                                backgroundColor: "#f0f0f0",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                fontSize: "0.8rem",
                              }}
                            >
                              {item.value}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* New Compliance Document Status Section */}
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "8px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      marginBottom: "20px",
                    }}
                  >
                    <h4 style={{ fontWeight: "500", color: "#555", marginBottom: "15px" }}>
                      Compliance Document Status ({complianceScore}%)
                    </h4>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
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
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              backgroundColor: "white",
                              padding: "8px 12px",
                              borderRadius: "6px",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                              borderLeft: `3px solid ${isPresent ? "#4CAF50" : "#F44336"}`,
                            }}
                          >
                            <div
                              style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundColor: isPresent ? "#4CAF50" : "#F44336",
                              }}
                            ></div>
                            <span style={{ fontSize: "0.85rem", color: "#555" }}>{doc}</span>
                            <span
                              style={{
                                marginLeft: "auto",
                                fontSize: "0.75rem",
                                color: isPresent ? "#4CAF50" : "#F44336",
                                fontWeight: "500",
                              }}
                            >
                              {isPresent ? "Uploaded" : "Missing"}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Score Categories Section */}
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "8px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "15px",
                      }}
                    >
                      <h4 style={{ fontWeight: "500", color: "#555", marginBottom: "15px" }}>
                        Score Breakdown by Category
                      </h4>
                      <div
                        style={{
                          backgroundColor: "#f0f0f0",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "0.85rem",
                          fontWeight: "500",
                        }}
                      >
                        Current Stage: {profileData?.entityOverview?.operationStage?.toUpperCase() || "IDEATION"}
                      </div>
                    </div>
                    <div className="score-categories">
                      {fundabilityScoreData
                        .filter((cat) => cat.name !== "Stage Weighting Profile")
                        .map((category, index) => (
                          <div key={index} className="category-item">
                            <div className="category-header">
                              <div className="category-color" style={{ backgroundColor: category.color }}></div>
                              <h4>{category.name}</h4>
                              <span className="category-weight">Weight: {category.weight}</span>
                            </div>
                            <div className="category-details">
                              <p>{category.description}</p>
                              <div className="score-bar">
                                <div
                                  className="score-progress"
                                  style={{
                                    width: `${category.value}%`,
                                    backgroundColor: category.color,
                                  }}
                                ></div>
                                <span className="score-value">{category.value}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "8px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      marginBottom: "20px",
                    }}
                  >
                    <h4 style={{ fontWeight: "500", color: "#555", marginBottom: "15px" }}>Monthly Score Trend</h4>
                    <div style={{ height: "200px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyScoreData}>
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                          <Tooltip
                            formatter={(value) => [`Score: ${value}`, null]}
                            labelFormatter={(label) => `Month: ${label}`}
                          />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#8B5A2B"
                            strokeWidth={2}
                            dot={{ fill: "#8B5A2B", stroke: "#fff", strokeWidth: 1, r: 3 }}
                            activeDot={{ r: 5, strokeWidth: 1, stroke: "#fff" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "10px" }}>
                      <button className="time-filter active">3M</button>
                      <button className="time-filter">6M</button>
                      <button className="time-filter">12M</button>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "8px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <h4 style={{ fontWeight: "500", color: "#555", marginBottom: "10px" }}>Recommendations</h4>
                    <ul
                      style={{
                        listStyleType: "none",
                        padding: "0",
                        margin: "0",
                        display: "grid",
                        gap: "8px",
                      }}
                    >
                      {getRecommendations().map((rec, index) => (
                        <li
                          key={index}
                          style={{
                            padding: "10px",
                            backgroundColor: "#f8f5f2",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            color: "#555",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor: "#8D6E63",
                              marginRight: "10px",
                            }}
                          ></div>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="modal-footer" style={{ marginTop: "20px" }}>
                  <button
                    className="cancel-btn"
                    onClick={() => setShowScoreSummaryModal(false)}
                    style={{
                      backgroundColor: styles.paleBrown,
                      color: styles.primaryBrown,
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Review Detail Modal */}
          {showReviewModal && selectedReview && (
            <div className="modal-overlay">
              <div className="reviews-modal" style={{ maxWidth: "500px" }}>
                <div className="modal-header">
                  <h3 style={{ fontWeight: "500", color: "#555" }}>Customer Review</h3>
                  <button onClick={() => setShowReviewModal(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-body">
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "15px",
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "5px", color: "#444" }}>
                          {selectedReview.name}
                        </h4>
                        <p style={{ fontSize: "0.85rem", color: "#666", margin: "0 0 5px 0" }}>
                          {selectedReview.company} • {selectedReview.position}
                        </p>
                        <p style={{ fontSize: "0.8rem", color: "#888", margin: 0 }}>{selectedReview.date}</p>
                      </div>
                      <div className="stars" style={{ marginLeft: "auto" }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            fill={i < selectedReview.rating ? styles.accentBrown : styles.paleBrown}
                            color={i < selectedReview.rating ? styles.accentBrown : styles.paleBrown}
                          />
                        ))}
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "15px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "6px",
                        marginTop: "10px",
                        border: "1px solid #eee",
                      }}
                    >
                      <p style={{ fontSize: "0.9rem", lineHeight: "1.6", color: "#555", margin: 0 }}>
                        {selectedReview.comment}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="cancel-btn"
                    onClick={() => setShowReviewModal(false)}
                    style={{
                      backgroundColor: styles.paleBrown,
                      color: styles.primaryBrown,
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard