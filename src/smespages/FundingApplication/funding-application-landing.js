import { Link } from "react-router-dom"
import { ArrowRight, FileText, DollarSign, BarChart, Users, CheckSquare, CheckCircle } from "lucide-react"
import "./FundingApplication.css"
// Sections data used by both the tracker and the landing page
const sections = [
  { id: "applicationOverview", label: "Application Overview", path: "/applications/funding/application-overview" },
  { id: "useOfFunds", label: "Use of Funds", path: "/applications/funding/use-of-funds" },
  { id: "enterpriseReadiness", label: "Enterprise Readiness", path: "/applications/funding/enterprise-readiness" },
  { id: "financialOverview", label: "Financial Overview", path: "/applications/funding/financial-overview" },
  { id: "growthPotential", label: "Growth Potential", path: "/applications/funding/growth-potential" },
  { id: "socialImpact", label: "Social Impact & Alignment", path: "/applications/funding/social-impact" },
  {
    id: "declarationCommitment",
    label: "Declaration  & Commitment",
    path: "/applications/funding/declaration-commitment",
  },
]

// Tracker component (now as a sub-component)
function FundingApplicationTracker({ activeSection }) {
  // Get completed sections from localStorage
  const getCompletedSections = () => {
    const savedCompletedSections = localStorage.getItem("fundingApplicationCompletedSections")
    return savedCompletedSections ? JSON.parse(savedCompletedSections) : {}
  }

  const completedSections = getCompletedSections()

  return (
    <div className="profile-tracker">
      <div className="profile-tracker-inner">
        {sections.map((section) => (
          <Link
            key={section.id}
            to={section.path}
            className={`profile-tracker-button ${
              activeSection === section.id ? "active" : completedSections[section.id] ? "completed" : "pending"
            }`}
          >
            {/* Removed the line break splitting to prevent layout issues */}
            <span className="tracker-label">{section.label}</span>
            {completedSections[section.id] && <CheckCircle className="check-icon" />}
          </Link>
        ))}
      </div>
    </div>
  )
}

// Main component that combines both the tracker and landing page
export default function FundingApplicationLanding({ activeSection }) {
  return (
    <div className="funding-application-landing">
      <div className="header-section">
        <h1>Funding and Support Application</h1>
        <p className="text-lg text-gray-600 mb-8">
          Complete this application to apply for funding and support for your business. Your information will be used to
          match you with suitable funding opportunities.
        </p>
      </div>

      {/* Include the tracker at the top of the landing page */}
      <FundingApplicationTracker activeSection={activeSection} />

      <div className="application-info">
        <h2>Application Process</h2>
        <p className="mb-4">
          This application consists of 7 sections. You can save your progress at any time and return to complete it
          later. All your information is kept secure and confidential.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="process-card">
            <div className="flex items-center mb-2">
              <FileText className="text-blue-600 mr-2" size={20} />
              <h3 className="font-medium">Application Overview</h3>
            </div>
            <p className="text-sm text-gray-600">Basic information about your funding request</p>
          </div>

          <div className="process-card">
            <div className="flex items-center mb-2">
              <DollarSign className="text-green-600 mr-2" size={20} />
              <h3 className="font-medium">Use of Funds</h3>
            </div>
            <p className="text-sm text-gray-600">How you plan to use the requested funding</p>
          </div>

          <div className="process-card">
            <div className="flex items-center mb-2">
              <BarChart className="text-purple-600 mr-2" size={20} />
              <h3 className="font-medium">Enterprise Readiness</h3>
            </div>
            <p className="text-sm text-gray-600">Your business's current state and readiness for funding</p>
          </div>

          <div className="process-card">
            <div className="flex items-center mb-2">
              <BarChart className="text-orange-600 mr-2" size={20} />
              <h3 className="font-medium">Financial Overview</h3>
            </div>
            <p className="text-sm text-gray-600">Financial information about your business</p>
          </div>

          <div className="process-card">
            <div className="flex items-center mb-2">
              <BarChart className="text-red-600 mr-2" size={20} />
              <h3 className="font-medium">Growth Potential</h3>
            </div>
            <p className="text-sm text-gray-600">Your business's growth prospects and plans</p>
          </div>

          <div className="process-card">
            <div className="flex items-center mb-2">
              <Users className="text-indigo-600 mr-2" size={20} />
              <h3 className="font-medium">Social Impact</h3>
            </div>
            <p className="text-sm text-gray-600">The social and environmental impact of your business</p>
          </div>

          <div className="process-card">
            <div className="flex items-center mb-2">
              <CheckSquare className="text-teal-600 mr-2" size={20} />
              <h3 className="font-medium">Declaration & Commitment</h3>
            </div>
            <p className="text-sm text-gray-600">Final declarations and commitments</p>
          </div>
        </div>
      </div>

      <div className="required-documents">
        <h2>Required Documents</h2>
        <p className="mb-4">
          You'll need to have the following documents ready to upload during the application process:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Business Plan (PDF format)</li>
          <li>Financial Statements or Management Accounts</li>
          <li>Bank Statements (last 6 months)</li>
          <li>Bank Details Confirmation</li>
          <li>5-Year Budget (Income Statement, Cashflows, Balance Sheet)</li>
          <li>Pitch Deck (if available)</li>
          <li>Signed Declaration Form</li>
        </ul>
      </div>

      <div className="cta-section flex justify-center mt-8">
        <Link
          to="/applications/funding/application-overview"
          className="btn-primary flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Start Application <ArrowRight className="ml-2" size={20} />
        </Link>
      </div>

      <div className="help-section mt-8 text-center">
        <p className="text-gray-600">
          Need help? Contact our support team at{" "}
          <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
            support@example.com
          </a>
        </p>
      </div>
    </div>
  )
}

// Export the tracker component separately so it can be used in other files
export { FundingApplicationTracker }
