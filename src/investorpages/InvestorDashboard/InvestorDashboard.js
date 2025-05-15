"use client"

import { useState, useEffect, useCallback } from "react"
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Star,
  Plus,
  X,
  ChevronDown,
  Mail,
  FileText,
  Upload,
  ExternalLink,
  Check,
} from "lucide-react"
import styles from "./InvestorDashboard.module.css"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../firebaseConfig"
import { useNavigate } from "react-router-dom"

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
        return "#1e3a8a" // Dark blue
      case "Suppliers":
        return "#9b1c1c" // Dark red
      case "Funders":
        return "#065f46" // Dark green
      case "Support":
        return "#d97706" // Dark amber
      default:
        return "#6b7280" // Gray
    }
  }

  // Get category background color (lighter shade)
  const getCategoryBgColor = (category) => {
    switch (category) {
      case "Customers":
        return "bg-blue-100"
      case "Suppliers":
        return "bg-red-100"
      case "Funders":
        return "bg-green-100"
      case "Support":
        return "bg-amber-100"
      default:
        return "bg-gray-100"
    }
  }

  // Get category text color
  const getCategoryTextColor = (category) => {
    switch (category) {
      case "Customers":
        return "text-blue-800"
      case "Suppliers":
        return "text-red-800"
      case "Funders":
        return "text-green-800"
      case "Support":
        return "text-amber-800"
      default:
        return "text-gray-800"
    }
  }

  // Add this state at the top level of your component with other state declarations:
  const [visibleReviewDetails, setVisibleReviewDetails] = useState({})
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)

  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles.content}>
        <main className={styles["dashboard-main"]}>
          {/* Written Tracker */}
          <div className={styles["tracker-card"]}>
            <div className={styles["tracker-header"]}>
              <h3 className={styles["card-title"]}>Application Tracker</h3>
            </div>
            <div className={styles["tracker-content"]}>
              <div className={styles["tracker-steps"]}>
                {trackerSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`${styles["tracker-step"]} ${step.completed ? styles.completed : ""} ${step.active ? styles.active : ""}`}
                    onClick={() => toggleStepDetails(index)}
                    style={{ backgroundColor: "#fafafa", borderColor: "#e5e5e5" }}
                  >
                    <div className={styles["step-marker"]}>
                      {step.completed ? (
                        <CheckCircle size={16} />
                      ) : step.active ? (
                        <div className={styles["active-dot"]}></div>
                      ) : (
                        <div className={styles["inactive-dot"]}></div>
                      )}
                    </div>
                    <div className={styles["step-info"]}>
                      <span className={styles["step-label"]} style={{ fontWeight: "500", color: "#555" }}>
                        {step.label.split("\n").map((line, i) => (
                          <span key={i} className={styles["step-label-line"]}>
                            {line}
                            {i === 0 && <br />}
                          </span>
                        ))}
                      </span>
                      {step.description && <span className={styles["step-description"]}>{step.description}</span>}
                    </div>
                    {index < trackerSteps.length - 1 && <ChevronRight size={16} className={styles["step-arrow"]} />}
                  </div>
                ))}
              </div>
              <div className={styles["tracker-details"]}>
                {trackerSteps.map(
                  (step, index) =>
                    step.showDetails && (
                      <div key={`details-${index}`} className={styles["step-details-panel"]}>
                        <h4>{step.label}</h4>

                        {/* Expected Actions */}
                        <div className={styles["step-expectations"]}>
                          <h5>Expected Actions:</h5>
                          <p>{expectedActions[step.label]}</p>
                        </div>

                        {/* Required Documents */}
                        <div className={styles["step-documents"]}>
                          <h5>Required Documents:</h5>
                          <ul className={styles["document-list"]}>
                            {requiredDocuments[step.label].map((doc, i) => (
                              <li key={i}>{doc}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Status Information */}
                        {step.completed && (
                          <div className={styles["step-complete-info"]}>
                            <p>
                              Completed on: <strong>May 10, 2023</strong>
                            </p>
                            <p>
                              Approved by: <strong>System Verification</strong>
                            </p>
                          </div>
                        )}

                        {step.active && (
                          <div className={styles["step-pending-info"]}>
                            <p>
                              Current status: <strong>In Progress</strong>
                            </p>
                            <p>
                              Expected completion: <strong>June 15, 2023</strong>
                            </p>
                          </div>
                        )}

                        {!step.completed && !step.active && (
                          <div className={styles["step-pending-info"]}>
                            <p>
                              Estimated start: <strong>July 1, 2023</strong>
                            </p>
                            <p>
                              Required documents: <strong>{requiredDocuments[step.label].join(", ")}</strong>
                            </p>
                          </div>
                        )}
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>

          {/* First Content Row - Legitimacy Score, Customer Reviews, Fundability Score, Upcoming Events */}
          <div className={styles["main-stats-row"]}>
            {/* Big Legitimacy Score */}
            <div className={`${styles["readiness-card"]} ${styles.compact}`}>
              <div className={styles["single-line-header"]}>
                <h3 style={{ fontWeight: "500", color: "#555" }}>BIG Legitimacy Score</h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 10px" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8f5f2",
                    border: "1px solid #e8e0da",
                    color: "#555",
                    fontWeight: "500",
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  {legitimacyScore}%
                </div>

                <div style={{ width: "100%" }}>
                  <p style={{ fontSize: "0.8rem", color: "#666", marginBottom: "8px", textAlign: "center" }}>
                    Legitimacy Verification:
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    <li
                      style={{
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "6px",
                        color: "#555",
                        backgroundColor: "white",
                        padding: "6px 10px",
                        borderRadius: "4px",
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "#8D6E63",
                          marginRight: "8px",
                        }}
                      ></div>
                      Business registration verified
                    </li>
                    <li
                      style={{
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "6px",
                        color: "#555",
                        backgroundColor: "white",
                        padding: "6px 10px",
                        borderRadius: "4px",
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "#8D6E63",
                          marginRight: "8px",
                        }}
                      ></div>
                      Tax compliance confirmed
                    </li>
                    <li
                      style={{
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        color: "#555",
                        backgroundColor: "white",
                        padding: "6px 10px",
                        borderRadius: "4px",
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "#8D6E63",
                          marginRight: "8px",
                        }}
                      ></div>
                      Industry certifications valid
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Customer Reviews & Ratings */}
            <div className={`${styles["ratings-card"]} ${styles.compact}`}>
              <div className={styles["single-line-header"]}>
                <h3 style={{ fontWeight: "500", color: "#555" }}>Customer Reviews & Ratings</h3>
              </div>
              <div className={styles["ratings-summary"]}>
                <div className={styles["ratings-count"]}>
                  <span className="text-2xl font-bold text-brown-800">25</span>
                  <span className="text-sm text-brown-600">Reviews</span>
                </div>
                <div className={styles["average-rating"]}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < 4 ? "#C69C6D" : "#E5E7EB"}
                        color={i < 4 ? "#C69C6D" : "#E5E7EB"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-brown-600">4.0 Average</span>
                </div>
              </div>
              <div
                className={styles["ratings-list"]}
                style={{
                  maxHeight:
                    visibleReviewDetails[0] || visibleReviewDetails[1] || visibleReviewDetails[2] ? "250px" : "180px",
                }}
              >
                {ratings.slice(0, 3).map((rating, index) => (
                  <div
                    key={index}
                    className={styles["rating-item-with-details"]}
                    style={{
                      backgroundColor: "#fafafa",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      marginBottom: "8px",
                    }}
                  >
                    <div className={styles["rating-header"]}>
                      <div className={styles["rating-info"]}>
                        <div className={styles["rating-name-actions"]}>
                          <h4 style={{ fontWeight: "500" }}>{rating.name}</h4>
                          <button
                            className={styles["view-details-btn"]}
                            style={{ backgroundColor: "#f5f5f5", color: "#666" }}
                            onClick={() => {
                              setSelectedReview(rating)
                              setShowReviewModal(true)
                            }}
                          >
                            View Details
                          </button>
                        </div>
                        <div className={styles.stars}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < rating.rating ? "#C69C6D" : "#E5E7EB"}
                              color={i < rating.rating ? "#C69C6D" : "#E5E7EB"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Big Fundability Score */}
            <div className={`${styles["readiness-card"]} ${styles.compact}`}>
              <div className={styles["single-line-header"]}>
                <h3 style={{ fontWeight: "500", color: "#555" }}>BIG Fundability Score</h3>
              </div>
              <button
                className={`${styles["view-summary-btn"]} ${styles["centered-btn"]}`}
                onClick={toggleBigScoreSummary}
              >
                View Summary
                <ChevronDown className={styles["summary-icon"]} size={16} />
              </button>

              <div className={styles["score-donut"]}>
                <ResponsiveContainer width="100%" height={90}>
                  <PieChart>
                    <Pie
                      data={fundabilityScoreData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={40}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {fundabilityScoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={styles["donut-score"]}
                      style={{ fontWeight: "500", fill: "#555" }}
                    >
                      {totalFundabilityScore}
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className={styles["score-legend"]}>
                {fundabilityScoreData.map((item, index) => (
                  <div key={index} className={styles["legend-item"]}>
                    <div className={styles["legend-color"]} style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                    <span className={styles["legend-value"]}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className={`${styles["events-card"]} ${styles.compact}`}>
              <div className={styles["single-line-header"]}>
                <h3 style={{ fontWeight: "500", color: "#555" }}>Upcoming Events</h3>
                <button className={styles["add-event-btn"]} onClick={() => setShowDeadlineModal(true)}>
                  <Plus size={14} /> Add
                </button>
              </div>
              <div className={`${styles["events-list"]} ${styles.scrollable}`}>
                {upcomingEvents.map((event, index) => (
                  <div key={index} className={styles["event-item"]}>
                    <div className={`${styles["event-icon"]} ${styles[event.type]}`}>
                      {event.type === "meeting" && <Users size={12} />}
                      {event.type === "workshop" && <TrendingUp size={12} />}
                      {event.type === "deadline" && <Award size={12} />}
                    </div>
                    <div className={styles["event-details"]}>
                      <h5>{event.title}</h5>
                      <p>{event.date}</p>
                    </div>
                  </div>
                ))}
                {deadlines.map((deadline, index) => (
                  <div key={`deadline-${index}`} className={styles["event-item"]}>
                    <div className={`${styles["event-icon"]} ${styles.deadline}`}>
                      <Award size={12} />
                    </div>
                    <div className={styles["event-details"]}>
                      <h5>{deadline.title}</h5>
                      <p>
                        {currentDate.toLocaleString("default", { month: "long" })} {deadline.date}
                      </p>
                      <button
                        className={styles["remove-deadline"]}
                        onClick={(e) => {
                          e.stopPropagation()
                          removeDeadline(index)
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Row - Top Matches and Calendar */}
          <div className={styles["second-row"]}>
            {/* Matches Table */}
            <div className={styles["matches-table-card"]}>
              <div className={styles["card-header"]}>
                <h3 style={{ fontWeight: "500", color: "#555" }}>Top Matches</h3>
                <div className={styles["category-tabs"]}>
                  {Object.keys(categoryData).map((category) => (
                    <button
                      key={category}
                      className={`${styles["category-tab"]} ${selectedCategory === category ? styles.active : ""}`}
                      style={{
                        borderColor: selectedCategory === category ? getCategoryColor(category) : "transparent",
                        color: selectedCategory === category ? getCategoryColor(category) : "#6b7280",
                      }}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles["matches-table"]}>
                <table>
                  <thead>
                    <tr style={{ backgroundColor: `${getCategoryBgColor(selectedCategory)}` }}>
                      {selectedCategory === "Customers" && (
                        <>
                          <th className={getCategoryTextColor(selectedCategory)}>Customer Name</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Service Category</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Service Needed</th>
                          <th className={getCategoryTextColor(selectedCategory)}>% Match</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Location</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Deal Size</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Status</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Action</th>
                        </>
                      )}
                      {selectedCategory === "Suppliers" && (
                        <>
                          <th className={getCategoryTextColor(selectedCategory)}>Supplier Name</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Service Category</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Service Offered</th>
                          <th className={getCategoryTextColor(selectedCategory)}>% Match</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Location</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Av. Supplier Rating</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Status</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Action</th>
                        </>
                      )}
                      {selectedCategory === "Funders" && (
                        <>
                          <th className={getCategoryTextColor(selectedCategory)}>Funder Name</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Investment Type</th>
                          <th className={getCategoryTextColor(selectedCategory)}>% Match</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Location</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Stage/Focus</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Status</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Action</th>
                        </>
                      )}
                      {selectedCategory === "Support" && (
                        <>
                          <th className={getCategoryTextColor(selectedCategory)}>Program Name</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Program Type</th>
                          <th className={getCategoryTextColor(selectedCategory)}>% Match</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Location</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Focus Area</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Status</th>
                          <th className={getCategoryTextColor(selectedCategory)}>Action</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData[selectedCategory].map((item, index) => (
                      <tr key={index} className={styles["match-row"]}>
                        {selectedCategory === "Customers" && (
                          <>
                            <td className={styles["investor-name"]}>{item.name}</td>
                            <td>{item.serviceCategory}</td>
                            <td>{item.serviceNeeded}</td>
                            <td className={styles["match-score-cell"]}>
                              <div className={styles["match-score-wrapper"]}>
                                <div
                                  className={styles["match-bar"]}
                                  style={{
                                    width: `${item.match}%`,
                                    background: `linear-gradient(90deg, ${getCategoryColor(
                                      selectedCategory,
                                    )}, rgba(107, 114, 128, 0.3))`,
                                  }}
                                ></div>
                                <span className={styles["match-percent"]}>{item.match}%</span>
                              </div>
                            </td>
                            <td>{item.location}</td>
                            <td>{item.dealSize}</td>
                            <td>
                              <span className={styles["status-badge"]}>{item.status}</span>
                            </td>
                            <td className={styles["match-action"]}>
                              <button className={styles["view-investor-btn"]}>View</button>
                            </td>
                          </>
                        )}
                        {selectedCategory === "Suppliers" && (
                          <>
                            <td className={styles["investor-name"]}>{item.name}</td>
                            <td>{item.serviceCategory}</td>
                            <td>{item.serviceOffered}</td>
                            <td className={styles["match-score-cell"]}>
                              <div className={styles["match-score-wrapper"]}>
                                <div
                                  className={styles["match-bar"]}
                                  style={{
                                    width: `${item.match}%`,
                                    background: `linear-gradient(90deg, ${getCategoryColor(
                                      selectedCategory,
                                    )}, rgba(107, 114, 128, 0.3))`,
                                  }}
                                ></div>
                                <span className={styles["match-percent"]}>{item.match}%</span>
                              </div>
                            </td>
                            <td>{item.location}</td>
                            <td>{item.rating}</td>
                            <td>
                              <span className={styles["status-badge"]}>{item.status}</span>
                            </td>
                            <td className={styles["match-action"]}>
                              <button className={styles["view-investor-btn"]}>View</button>
                            </td>
                          </>
                        )}
                        {selectedCategory === "Funders" && (
                          <>
                            <td className={styles["investor-name"]}>{item.name}</td>
                            <td>{item.investmentType}</td>
                            <td className={styles["match-score-cell"]}>
                              <div className={styles["match-score-wrapper"]}>
                                <div
                                  className={styles["match-bar"]}
                                  style={{
                                    width: `${item.match}%`,
                                    background: `linear-gradient(90deg, ${getCategoryColor(
                                      selectedCategory,
                                    )}, rgba(107, 114, 128, 0.3))`,
                                  }}
                                ></div>
                                <span className={styles["match-percent"]}>{item.match}%</span>
                              </div>
                            </td>
                            <td>{item.location}</td>
                            <td>{item.stageFocus}</td>
                            <td>
                              <span className={styles["status-badge"]}>{item.status}</span>
                            </td>
                            <td className={styles["match-action"]}>
                              <button className={styles["view-investor-btn"]}>View</button>
                            </td>
                          </>
                        )}
                        {selectedCategory === "Support" && (
                          <>
                            <td className={styles["investor-name"]}>{item.name}</td>
                            <td>{item.programType}</td>
                            <td className={styles["match-score-cell"]}>
                              <div className={styles["match-score-wrapper"]}>
                                <div
                                  className={styles["match-bar"]}
                                  style={{
                                    width: `${item.match}%`,
                                    background: `linear-gradient(90deg, ${getCategoryColor(
                                      selectedCategory,
                                    )}, rgba(107, 114, 128, 0.3))`,
                                  }}
                                ></div>
                                <span className={styles["match-percent"]}>{item.match}%</span>
                              </div>
                            </td>
                            <td>{item.location}</td>
                            <td>{item.focusArea}</td>
                            <td>
                              <span className={styles["status-badge"]}>{item.status}</span>
                            </td>
                            <td className={styles["match-action"]}>
                              <button className={styles["view-investor-btn"]}>View</button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calendar */}
            <div className={styles["calendar-card"]}>
              <div className={styles["card-header"]}>
                <h3 style={{ fontWeight: "500", color: "#555" }}>My Calendar</h3>
                <div className={styles["calendar-actions"]}>
                  <a
                    href="https://outlook.office.com/calendar/addcalendar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["outlook-btn"]}
                    style={{ textDecoration: "none", display: "flex", justifyContent: "center" }}
                  >
                    <Mail size={14} className="mr-1" /> Integrate with Outlook
                  </a>
                  <div className={styles["month-navigation"]}>
                    <button onClick={() => navigateMonth("prev")}>
                      <ChevronLeft size={14} />
                    </button>
                    <span>{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</span>
                    <button onClick={() => navigateMonth("next")}>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles["mini-calendar"]}>
                <div className={styles["calendar-header"]}>
                  {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <div key={day} className={styles["day-header"]}>
                      {day}
                    </div>
                  ))}
                </div>
                <div className={styles["calendar-days"]}>
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className={styles["empty-day"]}></div>
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const isDeadline = deadlines.some((d) => d.date === day)
                    const isToday =
                      day === new Date().getDate() &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear()

                    return (
                      <div
                        key={`day-${day}`}
                        className={`${styles["calendar-day"]} ${isDeadline ? styles.deadline : ""} ${isToday ? styles.today : ""}`}
                        onClick={() => handleDayClick(day)}
                      >
                        {day}
                        {isDeadline && <div className={styles["deadline-dot"]}></div>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Reviews Modal */}
          {showDetailedReviews && (
            <div className={styles["modal-overlay"]}>
              <div className={styles["reviews-modal"]}>
                <div className={styles["modal-header"]}>
                  <h3 style={{ fontWeight: "500", color: "#555" }}>Detailed Customer Reviews</h3>
                  <button onClick={() => setShowDetailedReviews(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className={styles["modal-body"]}>
                  <div className={styles["reviews-summary"]}>
                    <div className={styles["ratings-count"]}>
                      <span className="text-3xl font-bold text-brown-800">25</span>
                      <span className="text-sm text-brown-600">Total Reviews</span>
                    </div>
                    <div className={styles["average-rating"]}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            fill={i < 4 ? "#C69C6D" : "#E5E7EB"}
                            color={i < 4 ? "#C69C6D" : "#E5E7EB"}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-brown-800">4.0 Average</span>
                    </div>
                  </div>
                  <div className={styles["reviews-list-detailed"]}>
                    {ratings.map((rating, index) => (
                      <div key={index} className={styles["review-item-detailed"]}>
                        <div className={styles["review-header"]}>
                          <div className={styles["reviewer-info"]}>
                            <h4>{rating.name}</h4>
                            <p className={styles["reviewer-company"]}>
                              {rating.company} • {rating.position}
                            </p>
                            <p>{rating.date}</p>
                          </div>
                          <div className={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                fill={i < rating.rating ? "#C69C6D" : "#E5E7EB"}
                                color={i < rating.rating ? "#C69C6D" : "#E5E7EB"}
                              />
                            ))}
                          </div>
                        </div>
                        <div className={styles["review-comment"]}>
                          <p>{rating.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles["modal-footer"]}>
                  <button className={styles["cancel-btn"]} onClick={() => setShowDetailedReviews(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Deadline Modal */}
          {showDeadlineModal && (
            <div className={styles["modal-overlay"]}>
              <div className={styles["deadline-modal"]}>
                <div className={styles["modal-header"]}>
                  <h3 style={{ fontWeight: "500", color: "#555" }}>Add New Deadline</h3>
                  <button onClick={() => setShowDeadlineModal(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className={styles["modal-body"]}>
                  <div className={styles["form-group"]}>
                    <label>Title</label>
                    <input
                      type="text"
                      value={newDeadline.title}
                      onChange={(e) => setNewDeadline({ ...newDeadline, title: e.target.value })}
                      placeholder="Enter deadline title"
                    />
                  </div>
                  <div className={styles["form-group"]}>
                    <label>Date</label>
                    <input
                      type="date"
                      value={newDeadline.date}
                      onChange={(e) => setNewDeadline({ ...newDeadline, date: e.target.value })}
                    />
                  </div>
                </div>
                <div className={styles["modal-footer"]}>
                  <button className={styles["cancel-btn"]} onClick={() => setShowDeadlineModal(false)}>
                    Cancel
                  </button>
                  <button className={styles["add-btn"]} onClick={addDeadline}>
                    <Plus size={16} /> Add Deadline
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Company Summary Modal */}
          {showCompanySummary && selectedCompany && (
            <div className={styles["modal-overlay"]}>
              <div className={styles["company-modal"]}>
                <div className={styles["modal-header"]}>
                  <h3 style={{ fontWeight: "500", color: "#555" }}>Company Summary: {selectedCompany.name}</h3>
                  <button onClick={() => setShowCompanySummary(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className={styles["modal-body"]}>
                  <div className={styles["company-info"]}>
                    <div className={styles["info-group"]}>
                      <h4>Company Focus</h4>
                      <p>{selectedCompany.companyFocus}</p>
                    </div>
                    <div className={styles["info-group"]}>
                      <h4>Investment Criteria</h4>
                      <p>{selectedCompany.investmentCriteria}</p>
                    </div>
                    <div className={styles["info-group"]}>
                      <h4>Portfolio Companies</h4>
                      <ul className={styles["portfolio-list"]}>
                        {selectedCompany.portfolio.map((company, index) => (
                          <li key={index}>{company}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles["info-group"]}>
                      <h4>Description</h4>
                      <p>{selectedCompany.description}</p>
                    </div>
                    <div className={styles["info-group"]}>
                      <h4>Contact Person</h4>
                      <p>{selectedCompany.contactPerson}</p>
                    </div>
                    <div className={styles["info-group"]}>
                      <h4>Website</h4>
                      <a
                        href={`https://${selectedCompany.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles["website-link"]}
                      >
                        <ExternalLink size={14} /> {selectedCompany.website}
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles["modal-footer"]}>
                  <button className={styles["cancel-btn"]} onClick={() => setShowCompanySummary(false)}>
                    Close
                  </button>
                  <button
                    className={styles["add-btn"]}
                    onClick={() => {
                      handleSendApplication(selectedCompany.id)
                      setShowCompanySummary(false)
                    }}
                  >
                    Send Application
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Document Selection Modal */}
          {showDocumentModal && (
            <div className={styles["modal-overlay"]}>
              <div className={styles["document-modal"]}>
                <div className={styles["modal-header"]}>
                  <h3 style={{ fontWeight: "500", color: "#555" }}>Select Documents to Submit</h3>
                  <button onClick={() => setShowDocumentModal(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className={styles["modal-body"]}>
                  <div className={styles["document-list-container"]}>
                    <table className={styles["document-selection-table"]}>
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
                            className={doc.selected ? styles.selected : ""}
                            onClick={() => toggleDocumentSelection(doc.id)}
                          >
                            <td>
                              <div className={`${styles.checkbox} ${doc.selected ? styles.checked : ""}`}>
                                {doc.selected && <Check size={14} />}
                              </div>
                            </td>
                            <td>
                              <div className={styles["document-name"]}>
                                <FileText size={16} className={styles["doc-icon"]} />
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
                  <div className={styles["upload-section"]}>
                    <button className={styles["upload-btn"]}>
                      <Upload size={14} /> Upload New Document
                    </button>
                  </div>
                </div>
                <div className={styles["modal-footer"]}>
                  <button className={styles["cancel-btn"]} onClick={() => setShowDocumentModal(false)}>
                    Cancel
                  </button>
                  <button
                    className={styles["add-btn"]}
                    onClick={submitSelectedDocuments}
                    disabled={!documents.some((doc) => doc.selected)}
                  >
                    <Check size={16} /> Submit Selected Documents
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Score Summary Modal */}
          {showScoreSummaryModal && (
            <div className={styles["modal-overlay"]}>
              <div className={styles["reviews-modal"]} style={{ maxWidth: "700px" }}>
                <div className={styles["modal-header"]}>
                  <h3 style={{ fontWeight: "500", color: "#555" }}>BIG Fundability Score Summary</h3>
                  <button onClick={() => setShowScoreSummaryModal(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className={styles["modal-body"]}>
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
                    <div className={styles["score-categories"]}>
                      {fundabilityScoreData
                        .filter((cat) => cat.name !== "Stage Weighting Profile")
                        .map((category, index) => (
                          <div key={index} className={styles["category-item"]}>
                            <div className={styles["category-header"]}>
                              <div
                                className={styles["category-color"]}
                                style={{ backgroundColor: category.color }}
                              ></div>
                              <h4>{category.name}</h4>
                              <span className={styles["category-weight"]}>Weight: {category.weight}</span>
                            </div>
                            <div className={styles["category-details"]}>
                              <p>{category.description}</p>
                              <div className={styles["score-bar"]}>
                                <div
                                  className={styles["score-progress"]}
                                  style={{
                                    width: `${category.value}%`,
                                    backgroundColor: category.color,
                                  }}
                                ></div>
                                <span className={styles["score-value"]}>{category.value}%</span>
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
                      <button className={`${styles["time-filter"]} ${styles.active}`}>3M</button>
                      <button className={styles["time-filter"]}>6M</button>
                      <button className={styles["time-filter"]}>12M</button>
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
                <div className={styles["modal-footer"]} style={{ marginTop: "20px" }}>
                  <button
                    className={styles["cancel-btn"]}
                    onClick={() => setShowScoreSummaryModal(false)}
                    style={{
                      backgroundColor: "#f5f5f5",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      color: "#555",
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
            <div className={styles["modal-overlay"]}>
              <div className={styles["reviews-modal"]} style={{ maxWidth: "500px" }}>
                <div className={styles["modal-header"]}>
                  <h3 style={{ fontWeight: "500", color: "#555" }}>Customer Review</h3>
                  <button onClick={() => setShowReviewModal(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className={styles["modal-body"]}>
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
                      <div className={styles.stars} style={{ marginLeft: "auto" }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            fill={i < selectedReview.rating ? "#C69C6D" : "#E5E7EB"}
                            color={i < selectedReview.rating ? "#C69C6D" : "#E5E7EB"}
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
                <div className={styles["modal-footer"]}>
                  <button
                    className={styles["cancel-btn"]}
                    onClick={() => setShowReviewModal(false)}
                    style={{
                      backgroundColor: "#f5f5f5",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      color: "#555",
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
