"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./smespages/Sidebar/Sidebar"
import AuthForm from "./smespages/LoginRegister"
import LandingPage from "./mainpages/LandingPage"
import Dashboard from "./smespages/Dashboard/Dashboard"
import Profile from "./smespages/UniversalProfile/UniversalProfile"
import FindMatches from "./smespages/FindMatches/FindMatches"
import Investor from "./smespages/Investor/Investor"
import GrowthEnabler from "./smespages/GrowthEnabler/GrowthEnabler"
import Messages from "./smespages/Messages/Messages"
import Settings from "./smespages/Settings/Settings"
import AboutPage from "./mainpages/About"
import HowItWorksAccelerators from "./mainpages/HowItWorksAccelarators"
import HowItWorksCorporates from "./mainpages/HowItWorksCoporate"
import HowItWorksInvestors from "./mainpages/HowItWorksInvestor"
import HowItWorksSMSE from "./mainpages/HowItWorksSMSE"
import BigScorePage from "./mainpages/BIGScorePage"
import HowItWorks from "./mainpages/HowItWorks"
import LoginRegister from "./smespages/LoginRegister"
import ProfileTracker from "./smespages/UniversalProfile/profile-tracker"
import Instructions from "./smespages/UniversalProfile/instructions"
import EntityOverview from "./smespages/UniversalProfile/entity-overview"
import OwnershipManagement from "./smespages/UniversalProfile/ownership-management"
import ContactDetails from "./smespages/UniversalProfile/contact-details"
import LegalCompliance from "./smespages/UniversalProfile/legal-compliance"
import ProductsServices from "./smespages/UniversalProfile/products-services"
import HowDidYouHear from "./smespages/UniversalProfile/how-did-you-hear"
import DeclarationConsent from "./smespages/UniversalProfile/declaration-consent"

// Funding Application Components
import FundingApplicationLanding, {
  FundingApplicationTracker,
} from "./smespages/FundingApplication/funding-application-landing"
import ApplicationOverview from "./smespages/FundingApplication/application-overview"
import UseOfFunds from "./smespages/FundingApplication/use-of-funds"
import EnterpriseReadiness from "./smespages/FundingApplication/enterprise-readiness"
import FinancialOverview from "./smespages/FundingApplication/financial-overview"
import GrowthPotential from "./smespages/FundingApplication/growth-potential"
import SocialImpact from "./smespages/FundingApplication/social-impact"
import DeclarationCommitment from "./smespages/FundingApplication/declaration-commitment"

import "./App.css"
import DashboardHeader from "./smespages/DashboardHeader/DashboardHeader"

function App() {
  const [profileImage, setProfileImage] = useState(null)
  const companyName = "Acme Inc"

  // State for Universal Profile form data
  const [formData, setFormData] = useState({
    entityOverview: {},
    ownershipManagement: {
      shareholders: [
        {
          name: "",
          idRegNo: "",
          country: "",
          shareholding: "",
          race: "",
          gender: "",
          isYouth: false,
          isDisabled: false,
        },
      ],
      directors: [{ name: "", id: "", position: "", nationality: "", isExec: false }],
    },
    contactDetails: {
      sameAsPhysical: false,
    },
    legalCompliance: {},
    productsServices: {
      entityType: "smse", // Default to SMSE
      productCategories: [],
      serviceCategories: [],
      keyClients: [],
      fundTypes: [],
      investmentInstruments: [],
      targetStages: [],
      sectorFocus: [],
      geographicFocus: [],
      supportOffered: [],
      programTypes: [],
      targetEnterpriseTypes: [],
      supportOfferings: [],
    },
    howDidYouHear: {},
    declarationConsent: {
      accuracy: false,
      dataProcessing: false,
      termsConditions: false,
    },
  })

  // State for Funding Application form data
  const [fundingFormData, setFundingFormData] = useState({
    applicationOverview: {
      submissionChannel: "Online Portal",
      applicationDate: new Date().toISOString().split("T")[0],
    },
    useOfFunds: {
      fundingItems: [
        {
          category: "",
          subArea: "",
          description: "",
          amount: "",
        },
      ],
    },
    enterpriseReadiness: {
      barriers: [],
    },
    financialOverview: {},
    growthPotential: {},
    socialImpact: {},
    declarationCommitment: {
      confirmIntent: false,
      commitReporting: false,
      consentShare: false,
    },
  })

  // Function to update form data
  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }

  // Function to update funding application form data
  const updateFundingFormData = (section, data) => {
    setFundingFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }

  const renderProtectedRoute = (Component, props = {}) => (
    <div className="app-layout">
      <Sidebar companyName={companyName} />
      <div className="main-content">
        <DashboardHeader companyName={companyName} profileImage={profileImage} setProfileImage={setProfileImage} />
        <div className="page-content">
          <Component {...props} />
        </div>
      </div>
    </div>
  )

  // Render Universal Profile section with tracker
  const renderProfileSection = (Component, section) => (
    <div className="app-layout">
      <Sidebar companyName={companyName} />
      <div className="main-content">
        <DashboardHeader companyName={companyName} profileImage={profileImage} setProfileImage={setProfileImage} />
        <div className="page-content">
          <h1 className="text-3xl font-bold text-brown-800 mb-8">My Universal Profile</h1>
          <ProfileTracker activeSection={section} />
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <Component data={formData[section]} updateData={(data) => updateFormData(section, data)} />
          </div>
        </div>
      </div>
    </div>
  )

  // Render Funding Application section with tracker
  const renderFundingSection = (Component, section) => (
    <div className="app-layout">
      <Sidebar companyName={companyName} />
      <div className="main-content">
        <DashboardHeader companyName={companyName} profileImage={profileImage} setProfileImage={setProfileImage} />
        <div className="page-content">
          <h1 className="text-3xl font-bold text-brown-800 mb-8">Funding and Support Application</h1>
          <FundingApplicationTracker activeSection={section} />
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <Component data={fundingFormData[section]} updateData={(data) => updateFundingFormData(section, data)} />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/BigScorePage" element={<BigScorePage />} />
        <Route path="/HowItWorksSMSE" element={<HowItWorksSMSE />} />
        <Route path="/HowItWorksAccelerators" element={<HowItWorksAccelerators />} />
        <Route path="/HowItWorksCorporates" element={<HowItWorksCorporates />} />
        <Route path="/HowItWorksInvestors" element={<HowItWorksInvestors />} />
        <Route path="/LoginRegister" element={<LoginRegister />} />
        <Route path="/AboutPage" element={<AboutPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={renderProtectedRoute(Dashboard)} />
        <Route path="/profile" element={renderProtectedRoute(Profile)} />
        <Route path="/applications/funding" element={renderProtectedRoute(FundingApplicationLanding)} />
        <Route path="/find-matches" element={renderProtectedRoute(FindMatches)} />
        <Route path="/investor" element={renderProtectedRoute(Investor)} />
        <Route path="/growth" element={renderProtectedRoute(GrowthEnabler)} />
        <Route path="/messages" element={renderProtectedRoute(Messages)} />
        <Route path="/settings" element={renderProtectedRoute(Settings)} />

        {/* Universal Profile Routes */}
        <Route path="/profile/instructions" element={renderProfileSection(Instructions, "instructions")} />
        <Route path="/profile/entity-overview" element={renderProfileSection(EntityOverview, "entityOverview")} />
        <Route
          path="/profile/ownership-management"
          element={renderProfileSection(OwnershipManagement, "ownershipManagement")}
        />
        <Route path="/profile/contact-details" element={renderProfileSection(ContactDetails, "contactDetails")} />
        <Route path="/profile/legal-compliance" element={renderProfileSection(LegalCompliance, "legalCompliance")} />
        <Route path="/profile/products-services" element={renderProfileSection(ProductsServices, "productsServices")} />
        <Route path="/profile/how-did-you-hear" element={renderProfileSection(HowDidYouHear, "howDidYouHear")} />
        <Route
          path="/profile/declaration-consent"
          element={renderProfileSection(DeclarationConsent, "declarationConsent")}
        />

        {/* Funding Application Routes */}
        <Route
          path="/applications/funding/application-overview"
          element={renderFundingSection(ApplicationOverview, "applicationOverview")}
        />
        <Route path="/applications/funding/use-of-funds" element={renderFundingSection(UseOfFunds, "useOfFunds")} />
        <Route
          path="/applications/funding/enterprise-readiness"
          element={renderFundingSection(EnterpriseReadiness, "enterpriseReadiness")}
        />
        <Route
          path="/applications/funding/financial-overview"
          element={renderFundingSection(FinancialOverview, "financialOverview")}
        />
        <Route
          path="/applications/funding/growth-potential"
          element={renderFundingSection(GrowthPotential, "growthPotential")}
        />
        <Route
          path="/applications/funding/social-impact"
          element={renderFundingSection(SocialImpact, "socialImpact")}
        />
        <Route
          path="/applications/funding/declaration-commitment"
          element={renderFundingSection(DeclarationCommitment, "declarationCommitment")}
        />

        {/* Redirects */}
        <Route path="/universal-profile" element={<Navigate to="/profile/instructions" replace />} />
        <Route path="/applications/funding-application" element={<Navigate to="/applications/funding" replace />} />
      </Routes>
    </Router>
  )
}

export default App
