"use client"

import { useState, useCallback } from "react"
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
import "./Dashboard.css"
import { auth } from "../../firebaseConfig"
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
  const legitimacyScore = 80

  // Big Fundability Score data
  const fundabilityScoreData = [
    { name: "Compliance", value: 15, color: "#8D6E63" },
    { name: "Financial Health", value: 20, color: "#6D4C41" },
    { name: "Operational Strength", value: 20, color: "#A67C52" },
    { name: "Pitch Quality", value: 20, color: "#795548" },
    { name: "Impact Proof", value: 20, color: "#5D4037" },
  ]

  // Service Score data
  const serviceScoreData = [
    { name: "Compliance", value: 20, color: "#8D6E63" },
    { name: "Reliability", value: 50, color: "#6D4C41" },
    { name: "Customer Satisfaction", value: 30, color: "#A67C52" },
  ]

  // Total score calculation
  const totalFundabilityScore = fundabilityScoreData.reduce((sum, item) => sum + item.value, 0)
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
    <div className="dashboard-container">
      <div className="content">
        <main className="dashboard-main">
          {/* Written Tracker */}
          <div className="tracker-card">
            <div className="tracker-header">
              <h3 className="card-title">Application Tracker</h3>
            </div>
            <div className="tracker-content">
              <div className="tracker-steps">
                {trackerSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`tracker-step ${step.completed ? "completed" : step.active ? "active" : ""}`}
                    onClick={() => toggleStepDetails(index)}
                    style={{ backgroundColor: "#fafafa", borderColor: "#e5e5e5" }}
                  >
                    <div className="step-marker">
                      {step.completed ? (
                        <CheckCircle size={16} />
                      ) : step.active ? (
                        <div className="active-dot"></div>
                      ) : (
                        <div className="inactive-dot"></div>
                      )}
                    </div>
                    <div className="step-info">
                      <span className="step-label" style={{ fontWeight: "500", color: "#555" }}>
                        {step.label.split("\n").map((line, i) => (
                          <span key={i} className="step-label-line">
                            {line}
                            {i === 0 && <br />}
                          </span>
                        ))}
                      </span>
                      {step.description && <span className="step-description">{step.description}</span>}
                    </div>
                    {index < trackerSteps.length - 1 && <ChevronRight size={16} className="step-arrow" />}
                  </div>
                ))}
              </div>
              <div className="tracker-details">
                {trackerSteps.map(
                  (step, index) =>
                    step.showDetails && (
                      <div key={`details-${index}`} className="step-details-panel">
                        <h4>{step.label}</h4>

                        {/* Expected Actions */}
                        <div className="step-expectations">
                          <h5>Expected Actions:</h5>
                          <p>{expectedActions[step.label]}</p>
                        </div>

                        {/* Required Documents */}
                        <div className="step-documents">
                          <h5>Required Documents:</h5>
                          <ul className="document-list">
                            {requiredDocuments[step.label].map((doc, i) => (
                              <li key={i}>{doc}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Status Information */}
                        {step.completed && (
                          <div className="step-complete-info">
                            <p>
                              Completed on: <strong>May 10, 2023</strong>
                            </p>
                            <p>
                              Approved by: <strong>System Verification</strong>
                            </p>
                          </div>
                        )}

                        {step.active && (
                          <div className="step-pending-info">
                            <p>
                              Current status: <strong>In Progress</strong>
                            </p>
                            <p>
                              Expected completion: <strong>June 15, 2023</strong>
                            </p>
                          </div>
                        )}

                        {!step.completed && !step.active && (
                          <div className="step-pending-info">
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
          <div className="main-stats-row">
            {/* Big Legitimacy Score */}
            <div className="readiness-card compact">
              <div className="card-header single-line-header">
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
            <div className="ratings-card compact">
              <div className="card-header single-line-header">
                <h3 style={{ fontWeight: "500", color: "#555" }}>Customer Reviews & Ratings</h3>
              </div>
              <div className="ratings-summary">
                <div className="ratings-count">
                  <span className="text-2xl font-bold text-brown-800">25</span>
                  <span className="text-sm text-brown-600">Reviews</span>
                </div>
                <div className="average-rating">
                  <div className="stars">
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
                className="ratings-list"
                style={{
                  maxHeight:
                    visibleReviewDetails[0] || visibleReviewDetails[1] || visibleReviewDetails[2] ? "250px" : "180px",
                }}
              >
                {ratings.slice(0, 3).map((rating, index) => (
                  <div
                    key={index}
                    className="rating-item-with-details"
                    style={{
                      backgroundColor: "#fafafa",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      marginBottom: "8px",
                    }}
                  >
                    <div className="rating-header">
                      <div className="rating-info">
                        <div className="rating-name-actions">
                          <h4 style={{ fontWeight: "500" }}>{rating.name}</h4>
                          <button
                            className="view-details-btn"
                            style={{ backgroundColor: "#f5f5f5", color: "#666" }}
                            onClick={() => {
                              setSelectedReview(rating)
                              setShowReviewModal(true)
                            }}
                          >
                            View Details
                          </button>
                        </div>
                        <div className="stars">
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
            <div className="readiness-card compact">
              <div className="card-header single-line-header">
                <h3 style={{ fontWeight: "500", color: "#555" }}>BIG Fundability Score</h3>
              </div>
              <button className="view-summary-btn centered-btn" onClick={toggleBigScoreSummary}>
                View Summary
                <ChevronDown className="summary-icon" size={16} />
              </button>

              <div className="score-donut">
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
                      className="donut-score"
                      style={{ fontWeight: "500", fill: "#555" }}
                    >
                      {totalFundabilityScore}
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="score-legend">
                {fundabilityScoreData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                    <span className="legend-value">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="events-card compact">
              <div className="card-header single-line-header">
                <h3 style={{ fontWeight: "500", color: "#555" }}>Upcoming Events</h3>
                <button className="add-event-btn" onClick={() => setShowDeadlineModal(true)}>
                  <Plus size={14} /> Add
                </button>
              </div>
              <div className="events-list scrollable">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="event-item">
                    <div className={`event-icon ${event.type}`}>
                      {event.type === "meeting" && <Users size={12} />}
                      {event.type === "workshop" && <TrendingUp size={12} />}
                      {event.type === "deadline" && <Award size={12} />}
                    </div>
                    <div className="event-details">
                      <h5>{event.title}</h5>
                      <p>{event.date}</p>
                    </div>
                  </div>
                ))}
                {deadlines.map((deadline, index) => (
                  <div key={`deadline-${index}`} className="event-item">
                    <div className="event-icon deadline">
                      <Award size={12} />
                    </div>
                    <div className="event-details">
                      <h5>{deadline.title}</h5>
                      <p>
                        {currentDate.toLocaleString("default", { month: "long" })} {deadline.date}
                      </p>
                      <button
                        className="remove-deadline"
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
          <div className="second-row">
            {/* Matches Table */}
            <div className="matches-table-card">
              <div className="card-header">
                <h3 style={{ fontWeight: "500", color: "#555" }}>Top Matches</h3>
                <div className="category-tabs">
                  {Object.keys(categoryData).map((category) => (
                    <button
                      key={category}
                      className={`category-tab ${selectedCategory === category ? "active" : ""}`}
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
              <div className="matches-table">
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
                      <tr key={index} className="match-row">
                        {selectedCategory === "Customers" && (
                          <>
                            <td className="investor-name">{item.name}</td>
                            <td>{item.serviceCategory}</td>
                            <td>{item.serviceNeeded}</td>
                            <td className="match-score-cell">
                              <div className="match-score-wrapper">
                                <div
                                  className="match-bar"
                                  style={{
                                    width: `${item.match}%`,
                                    background: `linear-gradient(90deg, ${getCategoryColor(
                                      selectedCategory,
                                    )}, rgba(107, 114, 128, 0.3))`,
                                  }}
                                ></div>
                                <span className="match-percent">{item.match}%</span>
                              </div>
                            </td>
                            <td>{item.location}</td>
                            <td>{item.dealSize}</td>
                            <td>
                              <span className="status-badge">{item.status}</span>
                            </td>
                            <td className="match-action">
                              <button className="view-investor-btn">View</button>
                            </td>
                          </>
                        )}
                        {selectedCategory === "Suppliers" && (
                          <>
                            <td className="investor-name">{item.name}</td>
                            <td>{item.serviceCategory}</td>
                            <td>{item.serviceOffered}</td>
                            <td className="match-score-cell">
                              <div className="match-score-wrapper">
                                <div
                                  className="match-bar"
                                  style={{
                                    width: `${item.match}%`,
                                    background: `linear-gradient(90deg, ${getCategoryColor(
                                      selectedCategory,
                                    )}, rgba(107, 114, 128, 0.3))`,
                                  }}
                                ></div>
                                <span className="match-percent">{item.match}%</span>
                              </div>
                            </td>
                            <td>{item.location}</td>
                            <td>{item.rating}</td>
                            <td>
                              <span className="status-badge">{item.status}</span>
                            </td>
                            <td className="match-action">
                              <button className="view-investor-btn">View</button>
                            </td>
                          </>
                        )}
                        {selectedCategory === "Funders" && (
                          <>
                            <td className="investor-name">{item.name}</td>
                            <td>{item.investmentType}</td>
                            <td className="match-score-cell">
                              <div className="match-score-wrapper">
                                <div
                                  className="match-bar"
                                  style={{
                                    width: `${item.match}%`,
                                    background: `linear-gradient(90deg, ${getCategoryColor(
                                      selectedCategory,
                                    )}, rgba(107, 114, 128, 0.3))`,
                                  }}
                                ></div>
                                <span className="match-percent">{item.match}%</span>
                              </div>
                            </td>
                            <td>{item.location}</td>
                            <td>{item.stageFocus}</td>
                            <td>
                              <span className="status-badge">{item.status}</span>
                            </td>
                            <td className="match-action">
                              <button className="view-investor-btn">View</button>
                            </td>
                          </>
                        )}
                        {selectedCategory === "Support" && (
                          <>
                            <td className="investor-name">{item.name}</td>
                            <td>{item.programType}</td>
                            <td className="match-score-cell">
                              <div className="match-score-wrapper">
                                <div
                                  className="match-bar"
                                  style={{
                                    width: `${item.match}%`,
                                    background: `linear-gradient(90deg, ${getCategoryColor(
                                      selectedCategory,
                                    )}, rgba(107, 114, 128, 0.3))`,
                                  }}
                                ></div>
                                <span className="match-percent">{item.match}%</span>
                              </div>
                            </td>
                            <td>{item.location}</td>
                            <td>{item.focusArea}</td>
                            <td>
                              <span className="status-badge">{item.status}</span>
                            </td>
                            <td className="match-action">
                              <button className="view-investor-btn">View</button>
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
            <div className="calendar-card">
              <div className="card-header">
                <h3 style={{ fontWeight: "500", color: "#555" }}>My Calendar</h3>
                <div className="calendar-actions">
                  <a
                    href="https://outlook.office.com/calendar/addcalendar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="outlook-btn"
                    style={{ textDecoration: "none", display: "flex", justifyContent: "center" }}
                  >
                    <Mail size={14} className="mr-1" /> Integrate with Outlook
                  </a>
                  <div className="month-navigation">
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
              <div className="mini-calendar">
                <div className="calendar-header">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <div key={day} className="day-header">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="calendar-days">
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

                    return (
                      <div
                        key={`day-${day}`}
                        className={`calendar-day ${isDeadline ? "deadline" : ""} ${isToday ? "today" : ""}`}
                        onClick={() => handleDayClick(day)}
                      >
                        {day}
                        {isDeadline && <div className="deadline-dot"></div>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
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
                      <span className="text-3xl font-bold text-brown-800">25</span>
                      <span className="text-sm text-brown-600">Total Reviews</span>
                    </div>
                    <div className="average-rating">
                      <div className="stars">
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
                  <div className="reviews-list-detailed">
                    {ratings.map((rating, index) => (
                      <div key={index} className="review-item-detailed">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <h4>{rating.name}</h4>
                            <p className="reviewer-company">
                              {rating.company} • {rating.position}
                            </p>
                            <p>{rating.date}</p>
                          </div>
                          <div className="stars">
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
                        <div className="review-comment">
                          <p>{rating.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="cancel-btn" onClick={() => setShowDetailedReviews(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Deadline Modal */}
          {showDeadlineModal && (
            <div className="modal-overlay">
              <div className="deadline-modal">
                <div className="modal-header">
                  <h3 style={{ fontWeight: "500", color: "#555" }}>Add New Deadline</h3>
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
                      placeholder="Enter deadline title"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={newDeadline.date}
                      onChange={(e) => setNewDeadline({ ...newDeadline, date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="cancel-btn" onClick={() => setShowDeadlineModal(false)}>
                    Cancel
                  </button>
                  <button className="add-btn" onClick={addDeadline}>
                    <Plus size={16} /> Add Deadline
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
                  <button className="cancel-btn" onClick={() => setShowCompanySummary(false)}>
                    Close
                  </button>
                  <button
                    className="add-btn"
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
                  <button className="cancel-btn" onClick={() => setShowDocumentModal(false)}>
                    Cancel
                  </button>
                  <button
                    className="add-btn"
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
                      }}
                    >
                      {totalFundabilityScore}%
                    </div>

                    <div style={{ flex: 1 }}>
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
                <div className="modal-footer">
                  <button
                    className="cancel-btn"
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
