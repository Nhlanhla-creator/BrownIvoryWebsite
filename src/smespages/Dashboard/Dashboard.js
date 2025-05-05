"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
  FileText,
  Upload,
  ExternalLink,
  Check,
} from "lucide-react"
import "./Dashboard.css"
import { auth } from "../../firebaseConfig"

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
  const [deadlines, setDeadlines] = useState([
    { date: 15, title: "Tax Submission" },
    { date: 30, title: "Compliance Review" },
  ])

  // State for company summary modal
  const [showCompanySummary, setShowCompanySummary] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)

  // State for document selection modal
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [selectedDocuments, setSelectedDocuments] = useState([])

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
  const toggleStepDetails = (index) => {
    const newSteps = [...dealflowSteps]
    // Close all other open steps
    newSteps.forEach((step, i) => {
      if (i !== index) step.showDetails = false
    })
    // Toggle the clicked step
    newSteps[index].showDetails = !newSteps[index].showDetails
    setDealflowSteps(newSteps)
  }

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
  const handleSendApplication = (investorId) => {
    // Update investor status
    setInvestorStatus({
      ...investorStatus,
      [investorId]: "sent",
    })

    // In a real app, you would also update the backend
    // For now, we'll just show a success message
    alert("Application sent successfully!")
  }

  // Handle cancelling application
  const handleCancelApplication = (investorId) => {
    // Update investor status
    setInvestorStatus({
      ...investorStatus,
      [investorId]: "cancelled",
    })

    // In a real app, you would also update the backend
    // For now, we'll just show a success message
    alert("Application cancelled successfully!")
  }

  // Handle viewing company summary
  const handleViewSummary = (investor) => {
    setSelectedCompany(investor)
    setShowCompanySummary(true)
  }

  // Handle document selection
  const handleDocumentSelection = () => {
    setShowDocumentModal(true)
  }

  // Toggle document selection
  const toggleDocumentSelection = (docId) => {
    const updatedDocs = documents.map((doc) => (doc.id === docId ? { ...doc, selected: !doc.selected } : doc))
    setDocuments(updatedDocs)
  }

  // Submit selected documents
  const submitSelectedDocuments = () => {
    const selected = documents.filter((doc) => doc.selected)
    setSelectedDocuments(selected)
    setShowDocumentModal(false)
    alert(`${selected.length} documents submitted successfully!`)
  }

  // Handle term sheet signing
  const handleSignTermSheet = () => {
    alert("Term sheet signed successfully! You will be notified when the investor acknowledges receipt.")
  }

  // Filter closed deals by outcome
  const getFilteredClosedDeals = () => {
    if (outcomeFilter === "all") {
      return vcData["Closed"]
    }
    return vcData["Closed"].filter((deal) => deal.outcome.toLowerCase() === outcomeFilter.toLowerCase())
  }

  // Expected actions for each step
  const expectedActions = {
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
    "Investor Interest": ["Company Overview", "Executive Summary"],
    "Application Sent": ["Business Plan", "Financial Projections", "Cap Table"],
    "Pitch Review": ["Pitch Deck", "Market Analysis", "Competitive Analysis"],
    "Due Diligence": ["Financial Statements", "Legal Documents", "Customer Contracts", "IP Documentation"],
    "Term Sheet": ["Term Sheet Draft", "Capitalization Table", "Valuation Report"],
    "Final Review": ["Final Agreement", "Banking Details", "Compliance Documents"],
    Approved: ["Closing Documents", "Banking Instructions"],
    Closed: ["Post-Closing Compliance Documents"],
  }

  // Profile completion data
  const profileCompletion = 80

  // Big Score data
  const bigScoreData = [
    { name: "Funding", value: 25, color: "#A67C52" },
    { name: "Compliance", value: 20, color: "#8D6E63" },
    { name: "Financial", value: 15, color: "#6D4C41" },
    { name: "Operations", value: 25, color: "#5D4037" },
    { name: "Pitch", value: 15, color: "#4E342E" },
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

  // Ratings data
  const ratings = [
    { name: "Investor A", rating: 4, date: "Apr 15, 2023" },
    { name: "Investor B", rating: 3, date: "Apr 10, 2023" },
    { name: "Investor C", rating: 5, date: "Apr 5, 2023" },
  ]

  // Enhanced matches data with additional fields
  const matches = [
    {
      name: "VC Firm A",
      match: 92,
      stage: "Due Diligence",
      revenue: "$2.5M",
      fundingStage: "Series A",
      industry: "FinTech",
      location: "New York",
      fundingAmount: "$5M",
    },
    {
      name: "Angel Investor B",
      match: 87,
      stage: "Term Sheet",
      revenue: "$1.2M",
      fundingStage: "Seed",
      industry: "Healthcare",
      location: "Boston",
      fundingAmount: "$2M",
    },
    {
      name: "Corporate Fund C",
      match: 79,
      stage: "Review",
      revenue: "$3.7M",
      fundingStage: "Series B",
      industry: "SaaS",
      location: "San Francisco",
      fundingAmount: "$10M",
    },
    {
      name: "Seed Fund D",
      match: 75,
      stage: "Initial Contact",
      revenue: "$800K",
      fundingStage: "Pre-Seed",
      industry: "E-commerce",
      location: "Austin",
      fundingAmount: "$1.5M",
    },
    {
      name: "Venture Group E",
      match: 72,
      stage: "Screening",
      revenue: "$4.2M",
      fundingStage: "Series A",
      industry: "AI/ML",
      location: "Seattle",
      fundingAmount: "$7M",
    },
  ]

  // Recommendations based on score
  const getRecommendations = () => {
    const currentMonthScore = monthlyScoreData[currentMonth]?.score || 0
    if (currentMonthScore < 50) {
      return ["Improve financial documentation", "Complete compliance checklist", "Update pitch deck"]
    } else if (currentMonthScore < 70) {
      return ["Enhance operational metrics", "Practice investor pitch", "Expand investor outreach"]
    } else {
      return ["Explore additional funding rounds", "Network with tier-1 investors", "Optimize financial projections"]
    }
  }

  // Handle calendar day click
  const handleDayClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
    setNewDeadline({
      title: "",
      date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(
        2,
        "0",
      )}`,
    })
    setShowDeadlineModal(true)
  }

  // Add new deadline
  const addDeadline = () => {
    if (newDeadline.title.trim() && newDeadline.date) {
      const day = new Date(newDeadline.date).getDate()
      setDeadlines([...deadlines, { date: day, title: newDeadline.title }])
      setShowDeadlineModal(false)
      setNewDeadline({ title: "", date: "" })
    }
  }

  // Remove deadline
  const removeDeadline = (index) => {
    const newDeadlines = [...deadlines]
    newDeadlines.splice(index, 1)
    setDeadlines(newDeadlines)
  }

  // Toggle Big Score Summary
  const toggleBigScoreSummary = () => {
    setShowBigScoreSummary(!showBigScoreSummary)
  }

  return (
    <div className="dashboard-content">
      <h1 className="welcome-text">Welcome back, {userName}!</h1>

      {/* First Row - Progress Tracker */}
      <div className="tracker-card">
        <div className="tracker-header">
          <h3 className="card-title">Funding Tracker</h3>
        </div>
        <div className="tracker-content">
          <div className="tracker-steps">
            {dealflowSteps.map((step, index) => (
              <div
                key={index}
                className={`tracker-step ${step.completed ? "completed" : step.active ? "active" : ""}`}
                onClick={() => toggleStepDetails(index)}
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
                  <span className="step-label">{step.label}</span>
                  {step.description && <span className="step-description">{step.description}</span>}
                </div>
                {index < dealflowSteps.length - 1 && <ChevronRight size={16} className="step-arrow" />}
              </div>
            ))}
          </div>
          <div className="tracker-details">
            {dealflowSteps.map(
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

                    {/* Outcome Filter for Closed deals */}
                    {step.label === "Closed" && (
                      <div className="outcome-filter">
                        <h5>Filter by Outcome:</h5>
                        <div className="filter-options">
                          <button
                            className={`filter-btn ${outcomeFilter === "all" ? "active" : ""}`}
                            onClick={() => setOutcomeFilter("all")}
                          >
                            All
                          </button>
                          <button
                            className={`filter-btn ${outcomeFilter === "success" ? "active" : ""}`}
                            onClick={() => setOutcomeFilter("success")}
                          >
                            Success
                          </button>
                          <button
                            className={`filter-btn ${outcomeFilter === "failed" ? "active" : ""}`}
                            onClick={() => setOutcomeFilter("failed")}
                          >
                            Failed
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Investor Table */}
                    {step.label === "Closed" ? (
                      // Special handling for Closed deals with filtering
                      <div className="investor-table-container">
                        <h5>Deals:</h5>
                        {getFilteredClosedDeals().length > 0 ? (
                          <table className="investor-table">
                            <thead>
                              <tr>
                                <th>Investor</th>
                                <th>Match</th>
                                <th>Outcome</th>
                                <th>Notes</th>
                                <th>Funding</th>
                                <th>Location</th>
                                <th>Amount</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getFilteredClosedDeals().map((investor, i) => (
                                <tr key={i}>
                                  <td>{investor.name}</td>
                                  <td>{investor.matchScore}%</td>
                                  <td>
                                    <span className={`outcome-badge ${investor.outcome.toLowerCase()}`}>
                                      {investor.outcome}
                                    </span>
                                  </td>
                                  <td>{investor.notes}</td>
                                  <td>{investor.fundingStage}</td>
                                  <td>{investor.location}</td>
                                  <td>{investor.fundingAmount}</td>
                                  <td className="investor-actions">
                                    <button className="step-action-btn">View History</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="no-investors">No {outcomeFilter !== "all" ? outcomeFilter : ""} deals found.</p>
                        )}
                      </div>
                    ) : vcData[step.label] && vcData[step.label].length > 0 ? (
                      // Regular investor tables for other steps
                      <div className="investor-table-container">
                        <h5>Interested Investors:</h5>
                        <table className="investor-table">
                          <thead>
                            <tr>
                              <th>Investor</th>
                              <th>Match</th>
                              {step.label === "Investor Interest" && (
                                <>
                                  <th>Focus</th>
                                  <th>Website</th>
                                </>
                              )}
                              {step.label === "Application Sent" && (
                                <>
                                  <th>Date Sent</th>
                                  <th>Status</th>
                                </>
                              )}
                              {step.label === "Pitch Review" && (
                                <>
                                  <th>Reviewed</th>
                                  <th>Feedback</th>
                                </>
                              )}
                              {step.label === "Due Diligence" && (
                                <>
                                  <th>Progress</th>
                                  <th>Remaining Items</th>
                                </>
                              )}
                              {step.label === "Term Sheet" && (
                                <>
                                  <th>Date Sent</th>
                                  <th>Status</th>
                                </>
                              )}
                              {step.label === "Final Review" && (
                                <>
                                  <th>Reviewers</th>
                                  <th>Expected Completion</th>
                                </>
                              )}
                              {step.label === "Approved" && (
                                <>
                                  <th>Approval Date</th>
                                  <th>Funding Date</th>
                                </>
                              )}
                              <th>Funding</th>
                              <th>Location</th>
                              <th>Amount</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vcData[step.label].map((investor, i) => (
                              <tr key={i}>
                                <td>{investor.name}</td>
                                <td>{investor.matchScore}%</td>
                                {step.label === "Investor Interest" && (
                                  <>
                                    <td>{investor.companyFocus}</td>
                                    <td>
                                      <a href={`https://${investor.website}`} target="_blank" rel="noopener noreferrer">
                                        {investor.website}
                                      </a>
                                    </td>
                                  </>
                                )}
                                {step.label === "Application Sent" && (
                                  <>
                                    <td>{investor.applicationDate}</td>
                                    <td>
                                      {investorStatus[investor.id] === "cancelled" ? (
                                        <span className="status-cancelled">Cancelled</span>
                                      ) : (
                                        investor.reviewStatus
                                      )}
                                    </td>
                                  </>
                                )}
                                {step.label === "Pitch Review" && (
                                  <>
                                    <td>{investor.pitchReviewed}</td>
                                    <td>{investor.feedback}</td>
                                  </>
                                )}
                                {step.label === "Due Diligence" && (
                                  <>
                                    <td>{investor.progress}</td>
                                    <td>{investor.remainingItems}</td>
                                  </>
                                )}
                                {step.label === "Term Sheet" && (
                                  <>
                                    <td>{investor.dateSent}</td>
                                    <td>{investor.status}</td>
                                  </>
                                )}
                                {step.label === "Final Review" && (
                                  <>
                                    <td>{investor.reviewers}</td>
                                    <td>{investor.expectedCompletion}</td>
                                  </>
                                )}
                                {step.label === "Approved" && (
                                  <>
                                    <td>{investor.approvalDate}</td>
                                    <td>{investor.fundingDate}</td>
                                  </>
                                )}
                                <td>{investor.fundingStage}</td>
                                <td>{investor.location}</td>
                                <td>{investor.fundingAmount}</td>
                                <td className="investor-actions">
                                  {step.label === "Investor Interest" && (
                                    <>
                                      {investorStatus[investor.id] === "sent" ? (
                                        <button className="step-action-btn success" disabled>
                                          <Check size={12} /> Application Sent
                                        </button>
                                      ) : (
                                        <button
                                          className="step-action-btn"
                                          onClick={() => handleSendApplication(investor.id)}
                                        >
                                          Send Application
                                        </button>
                                      )}
                                      <button
                                        className="step-action-btn secondary"
                                        onClick={() => handleViewSummary(investor)}
                                      >
                                        View Summary
                                      </button>
                                    </>
                                  )}
                                  {step.label === "Application Sent" && (
                                    <>
                                      {investorStatus[investor.id] === "cancelled" ? (
                                        <button className="step-action-btn muted" disabled>
                                          Application Cancelled
                                        </button>
                                      ) : (
                                        <button
                                          className="step-action-btn warning"
                                          onClick={() => handleCancelApplication(investor.id)}
                                        >
                                          Cancel Application
                                        </button>
                                      )}
                                    </>
                                  )}
                                  {step.label === "Pitch Review" && (
                                    <button className="step-action-btn" onClick={handleDocumentSelection}>
                                      Submit Documents
                                    </button>
                                  )}
                                  {step.label === "Due Diligence" && (
                                    <button className="step-action-btn" onClick={handleDocumentSelection}>
                                      Submit Documents
                                    </button>
                                  )}
                                  {step.label === "Term Sheet" && (
                                    <button className="step-action-btn" onClick={handleSignTermSheet}>
                                      Sign Document
                                    </button>
                                  )}
                                  {step.label === "Final Review" && (
                                    <button className="step-action-btn">Check Status</button>
                                  )}
                                  {step.label === "Approved" && (
                                    <button className="step-action-btn">View Details</button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="no-investors">No investors at this stage yet.</p>
                    )}

                    {/* Status Information */}
                    {step.completed && (
                      <div className="step-complete-info">
                        <p>
                          Completed on: <strong>May 10, 2023</strong>
                        </p>
                        <p>
                          Approved by: <strong>Investment Committee</strong>
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

      {/* First Content Row - Profile, Big Score, Calendar */}
      <div className="main-stats-row">
        {/* Profile Completion */}
        <div className="profile-card compact">
          <div className="card-header">
            <h3>Profile Completion</h3>
            <button className="update-btn" onClick={() => navigate("/profile")}>
              Update
            </button>
          </div>
          <div className="completion-ring">
            <ResponsiveContainer width="100%" height={80}>
              <PieChart>
                <Pie
                  data={[{ value: profileCompletion }, { value: 100 - profileCompletion }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={35}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  <Cell fill="#8B5A2B" />
                  <Cell fill="#E5E7EB" />
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="completion-percent">
                  {profileCompletion}%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="completion-text">
            {profileCompletion >= 70 ? "Your profile looks strong!" : "Complete your profile for better matches"}
          </p>
        </div>

        {/* Big Score */}
        <div className="readiness-card compact">
          <div className="card-header">
            <h3>Big Score</h3>
            <div className="score-actions">
              <span className="score-badge">{totalScore}/100</span>
              <button className="view-summary-btn" onClick={toggleBigScoreSummary}>
                {showBigScoreSummary ? "Hide Summary" : "View Summary"}
                <ChevronDown className={`summary-icon ${showBigScoreSummary ? "rotate" : ""}`} size={16} />
              </button>
            </div>
          </div>
          <div className="score-donut">
            <ResponsiveContainer width="100%" height={80}>
              <PieChart>
                <Pie
                  data={bigScoreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {bigScoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="donut-score">
                  {totalScore}
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="score-legend">
            {bigScoreData.map((item, index) => (
              <div key={index} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                <span>{item.name}</span>
                <span className="legend-value">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Big Score Summary (Collapsible) */}
          {showBigScoreSummary && (
            <div className="big-score-summary">
              <div className="trend-chart">
                <ResponsiveContainer width="100%" height={120}>
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
              <div className="trend-actions">
                <button className="time-filter active">3M</button>
                <button className="time-filter">6M</button>
                <button className="time-filter">12M</button>
              </div>
              <div className="recommendations">
                <h4>Recommendations</h4>
                <ul>
                  {getRecommendations().map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="events-card compact">
          <div className="card-header">
            <h3>Upcoming Events</h3>
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

        {/* Ratings */}
        <div className="ratings-card compact">
          <div className="card-header">
            <h3>My Ratings</h3>
            <button className="view-all" onClick={() => navigate("/investor")}>
              View All
            </button>
          </div>
          <div className="ratings-list">
            {ratings.map((rating, index) => (
              <div key={index} className="rating-item">
                <div className="rating-info">
                  <h4>{rating.name}</h4>
                  <p>{rating.date}</p>
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
            ))}
          </div>
        </div>
      </div>

      {/* Second Row - Top Matches and Calendar */}
      <div className="second-row">
        {/* Matches Table */}
        <div className="matches-table-card">
          <div className="card-header">
            <h3>Top Matches</h3>
            <button className="view-all" onClick={() => navigate("/find-matches")}>
              View All
            </button>
          </div>
          <div className="matches-table">
            <table>
              <thead>
                <tr>
                  <th>Investor</th>
                  <th>Match</th>
                  <th>Revenue</th>
                  <th>Funding Stage</th>
                  <th>Industry</th>
                  <th>Location</th>
                  <th>Funding Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match, index) => (
                  <tr key={index} className="match-row">
                    <td className="investor-name">{match.name}</td>
                    <td className="match-score-cell">
                      <div className="match-score-wrapper">
                        <div className="match-bar" style={{ width: `${match.match}%` }}></div>
                        <span className="match-percent">{match.match}%</span>
                      </div>
                    </td>
                    <td>{match.revenue}</td>
                    <td>{match.fundingStage}</td>
                    <td>{match.industry}</td>
                    <td>{match.location}</td>
                    <td>{match.fundingAmount}</td>
                    <td className="match-action">
                      <button className="view-investor-btn" onClick={() => navigate("/investor")}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar */}
        <div className="calendar-card">
          <div className="card-header">
            <h3>Calendar</h3>
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

      {/* Company Summary Modal */}
      {showCompanySummary && selectedCompany && (
        <div className="modal-overlay">
          <div className="company-modal">
            <div className="modal-header">
              <h3>Company Summary: {selectedCompany.name}</h3>
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
              <h3>Select Documents to Submit</h3>
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

      {/* Deadline Modal */}
      {showDeadlineModal && (
        <div className="modal-overlay">
          <div className="deadline-modal">
            <div className="modal-header">
              <h3>Add New Deadline</h3>
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
    </div>
  )
}

export default Dashboard
