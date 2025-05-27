"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import "./App.css"

// Layout Components
import Sidebar from "./smespages/Sidebar/Sidebar"
import InvestorSidebar from "./investorpages/Sidebar/InvestorSidebar"
import SupportProgramSidebar from "./supportprogram/SupportSidebar/SupportSidebar"
import DashboardHeader from "./smespages/DashboardHeader/DashboardHeader"
import InvestorHeader from "./investorpages/Header/InvestorHeader"
import SupportProgramHeader from "./supportprogram/Header/SupportHeader"
import Documents from "./investorpages/Documents"

// Public Pages
import LandingPage from "./mainpages/LandingPage"
import AboutPage from "./mainpages/About"
import HowItWorks from "./mainpages/HowItWorks"
import BigScorePage from "./mainpages/BIGScorePage"
import HowItWorksSMSE from "./mainpages/HowItWorksSMSE"
import HowItWorksAccelerators from "./mainpages/HowItWorksAccelarators"
import HowItWorksCorporates from "./mainpages/HowItWorksCoporate"
import HowItWorksInvestors from "./mainpages/HowItWorksInvestor"
import FAQPage from "./mainpages/FAQs"

// Auth Components
import AuthForm from "./smespages/LoginRegister"
import LoginRegister from "./smespages/LoginRegister"
import { Dashboard as InvestorDashboard } from "./investorpages/InvestorDashboard/InvestorDashboard"
import SupportProgramDashboard from "./supportprogram/SupportProgramDashboard/SupportProgramDashboard"

// Protected Pages
import { Dashboard } from "./smespages/SMSEDashboard/Dashboard"
import Profile from "./smespages/UniversalProfile/UniversalProfile"
import FindMatches from "./smespages/MyMatches/FindMatches"
import MyDocuments from "./smespages/MyDocuments/myDocuments"
import GrowthEnabler from "./smespages/MyGrowthTools/GrowthEnabler"
import Messages from "./smespages/Messages/Messages"
import Calendar from "./smespages/MyCalender/Calendar"
import Settings from "./smespages/Settings/Settings"

// SME Universal Profile Components
import SMEProfileTracker from "./smespages/UniversalProfile/profile-tracker"
import SMEInstructions from "./smespages/UniversalProfile/instructions"
import SMEEntityOverview from "./smespages/UniversalProfile/entity-overview"
import SMEOwnershipManagement from "./smespages/UniversalProfile/ownership-management"
import SMEContactDetails from "./smespages/UniversalProfile/contact-details"
import SMELegalCompliance from "./smespages/UniversalProfile/legal-compliance"
import SMEProductsServices from "./smespages/UniversalProfile/products-services"
import SMEHowDidYouHear from "./smespages/UniversalProfile/how-did-you-hear"
import SMEDeclarationConsent from "./smespages/UniversalProfile/declaration-consent"
import RegistrationSummary from "./smespages/UniversalProfile/registration-summary" // Import the registration summary component
import ProfileSummary from "./smespages/Documents"

// Investor Universal Profile Components
import InvestorUniversalProfile from "./investorpages/InvestorUniversalProfile/InvestorUniversalProfile"
import InvestorProfileTracker from "./investorpages/InvestorUniversalProfile/ProfileTracker"
import InvestorInstructions from "./investorpages/InvestorUniversalProfile/Instructions"
import InvestorEntityOverview from "./investorpages/InvestorUniversalProfile/EntityOverview"
import InvestorOwnershipManagement from "./investorpages/InvestorUniversalProfile/OwnershipManagement"
import InvestorContactDetails from "./investorpages/InvestorUniversalProfile/ContactDetails"
import InvestorLegalCompliance from "./investorpages/InvestorUniversalProfile/LegalCompliance"
import InvestorProductsServices from "./investorpages/InvestorUniversalProfile/ProductsService"
import InvestorHowDidYouHear from "./investorpages/InvestorUniversalProfile/HowDidYouHear"
import InvestorDeclarationConsent from "./investorpages/InvestorUniversalProfile/DeclarationConsent"

// Support Programs Universal Profile Components
import SupportUniversalProfile from "./supportprogram/SupportProgramUniversalProfile/SupportUniversalProfile"
import SupportProfileTracker from "./supportprogram/SupportProgramUniversalProfile/SupportProfileTracker"
import SupportInstructions from "./supportprogram/SupportProgramUniversalProfile/SupportInstructions"
import SupportEntityOverview from "./supportprogram/SupportProgramUniversalProfile/SupportEntityOverView"
import SupportOwnershipManagement from "./supportprogram/SupportProgramUniversalProfile/SupportOwnershipManagement"
import SupportContactDetails from "./supportprogram/SupportProgramUniversalProfile/SupportContactDetails"
import SupportLegalCompliance from "./supportprogram/SupportProgramUniversalProfile/SupportLegalCompliance"
import SupportProductsServices from "./supportprogram/SupportProgramUniversalProfile/SupportProductService"
import SupportHowDidYouHear from "./supportprogram/SupportProgramUniversalProfile/SupportHowDidYouHear"
import SupportDeclarationConsent from "./supportprogram/SupportProgramUniversalProfile/SupportDeclarationConsent"

// Funding Application
import FundingApplication from "./smespages/FundingApplication/FundingApplication"

// Product Application
import ProductApplication from "./smespages/ProductApplication/ProductApplication"
//my calender

// Add these imports at the top of the file with the other imports
import CustomerMatchesPage from "./smespages/MyCustomerMatches/customer-matches"
import FundingMatchesPage from "./smespages/MyFunderMatches/funders-matches"
import SupplierMatchesPage from "./smespages/MySupplierMatches/supplier-matches"
import SupportProgramMatchesPage from "./smespages/MySupportProgramMatches/support-program-matches"
import MatchesPage from "./investorpages/MyMatches/investor-matches"


// Billing and Payment Components
// import MySubscriptions from "./smespages/BillingInformation/my-subscriptions"
// import BillingInfo from "./smespages/BillingInformation/billing-info"
// import InvestorsSubscriptions from "./investorpages/BillingAndPayments/investors-subscriptions"
// import BillingInfoInvestors from "./investorpages/BillingAndPayments/billing-info-investors"

// // Growth Tools Orders
// import GrowthToolsOrders from "./smespages/BillingInformation/growth-tools-orders"
// import InvestorGrowthToolsOrders from "./investorpages/BillingAndPayments/investor-growth-tools-orders"

// Initial Data States
const initialFormData = {
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
    entityType: "smse",
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
}

function App() {
  const [profileImage, setProfileImage] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const [showSummary, setShowSummary] = useState(false) // State to control showing the summary
  const companyName = "Acme Inc"

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }

  // Function to handle form submission and show summary
  const handleFormSubmit = () => {
    setShowSummary(true)
  }

  // Helper function to determine if a route is an investor route
  const isInvestorRoute = (pathname) => {
    return pathname.startsWith("/investor-dashboard")
  }

  // Helper function to determine if a route is a support program route
  const isSupportProgramRoute = (pathname) => {
    return pathname.startsWith("/support-")
  }

  // SME Protected Layout
  const SMELayout = ({ children }) => {
    const location = useLocation()

    return (
      <div className="app-layout">
        <Sidebar companyName={companyName} />
        <div className="main-content">
          <DashboardHeader companyName={companyName} profileImage={profileImage} setProfileImage={setProfileImage} />
          <div className="page-content">{children}</div>
        </div>

        {/* Registration Summary Modal - will only show when showSummary is true */}
        <RegistrationSummary data={formData} open={showSummary} onClose={() => setShowSummary(false)} />
      </div>
    )
  }

  // Investor Protected Layout
  const InvestorLayout = ({ children }) => {
    const location = useLocation()

    return (
      <div className="app-layout">
        <InvestorSidebar companyName={companyName} />
        <div className="main-content">
          <InvestorHeader companyName={companyName} profileImage={profileImage} setProfileImage={setProfileImage} />
          <div className="page-content">{children}</div>
        </div>
      </div>
    )
  }

  // Support Program Protected Layout
  const SupportProgramLayout = ({ children }) => {
    const location = useLocation()

    return (
      <div className="app-layout">
        <SupportProgramSidebar companyName={companyName} />
        <div className="main-content">
          <SupportProgramHeader
            companyName={companyName}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
          <div className="page-content">{children}</div>
        </div>
      </div>
    )
  }

  const renderSMERoute = (Component, props = {}) => (
    <SMELayout>
      <Component {...props} />
    </SMELayout>
  )

  const renderInvestorRoute = (Component, props = {}) => (
    <InvestorLayout>
      <Component {...props} />
    </InvestorLayout>
  )

  const renderSupportProgramRoute = (Component, props = {}) => (
    <SupportProgramLayout>
      <Component {...props} />
    </SupportProgramLayout>
  )

  const renderSMEProfileSection = (Component, section) => (
    <SMELayout>
      <h1 className="text-3xl font-bold text-brown-800 mb-8">My Universal Profile</h1>
      <SMEProfileTracker activeSection={section} />
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        {formData[section] ? (
          <Component
            data={formData[section]}
            updateData={(data) => updateFormData(section, data)}
            onSubmit={section === "declarationConsent" ? handleFormSubmit : undefined}
          />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </SMELayout>
  )

  const renderInvestorProfileSection = (Component, section) => (
    <InvestorLayout>
      <h1 className="text-3xl font-bold text-brown-800 mb-8">My Universal Profile</h1>
      <InvestorProfileTracker activeSection={section} />
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        {formData[section] ? (
          <Component data={formData[section]} updateData={(data) => updateFormData(section, data)} />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </InvestorLayout>
  )

  const renderSupportProfileSection = (Component, section) => (
    <SupportProgramLayout>
      <h1 className="text-3xl font-bold text-brown-800 mb-8">My Universal Profile</h1>
      <SupportProfileTracker activeSection={section} />
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        {formData[section] ? (
          <Component data={formData[section]} updateData={(data) => updateFormData(section, data)} />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </SupportProgramLayout>
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
        <Route path="/FAQPage" element={<FAQPage />} />

        {/* Protected SME Dashboard Routes */}
        <Route path="/dashboard" element={renderSMERoute(Dashboard)} />
        <Route path="/profile" element={renderSMERoute(Profile)} />
        <Route path="/find-matches" element={renderSMERoute(FindMatches)} />
        <Route path="/my-documents" element={renderSMERoute(MyDocuments)} />
        <Route path="/growth" element={renderSMERoute(GrowthEnabler)} />
        <Route path="/messages" element={renderSMERoute(Messages)} />
       <Route path="/calendar" element={renderSMERoute(Calendar)} /> 
        <Route path="/settings" element={renderSMERoute(Settings)} />
        <Route path="/documents" element={renderSMERoute(ProfileSummary)} />

        {/* SME Billing and Payments Routes */}
        {/* <Route path="/billing/subscriptions" element={renderSMERoute(MySubscriptions)} />
        <Route path="/billing/info" element={renderSMERoute(BillingInfo)} />
        <Route path="/billing/growth-tools-orders" element={renderSMERoute(GrowthToolsOrders)} /> */}

        {/* Protected Investor Dashboard Routes */}
        <Route path="/investor-documents" element={renderInvestorRoute(Documents)} />
        <Route path="/investor-dashboard" element={renderInvestorRoute(InvestorDashboard)} />
        <Route path="/investor-profile" element={renderInvestorRoute(InvestorUniversalProfile)} />
        <Route path="/investor-opportunities" element={renderInvestorRoute(FindMatches)} />
        <Route path="/investor-portfolio" element={<div>Coming Soon</div>} />
        <Route path="/investor-messages" element={renderInvestorRoute(Messages)} />
       <Route path="/investor-calendar" element={renderInvestorRoute(Calendar)} /> 
        <Route path="/investor-settings" element={renderInvestorRoute(Settings)} />

        {/* Investor Billing and Payments Routes */}
        {/* <Route path="/investor/billing/subscriptions" element={renderInvestorRoute(InvestorsSubscriptions)} />
        <Route path="/investor/billing/info" element={renderInvestorRoute(BillingInfoInvestors)} />
        <Route path="/investor/billing/growth-tools-orders" element={renderInvestorRoute(InvestorGrowthToolsOrders)} /> */}

        {/* Protected Support Program Dashboard Routes */}
        <Route path="/support-dashboard" element={renderSupportProgramRoute(SupportProgramDashboard)} />
        <Route path="/support-profile" element={renderSupportProgramRoute(SupportUniversalProfile)} />
        <Route path="/support-beneficiaries" element={renderSupportProgramRoute(FindMatches)} />
        <Route path="/support-matches" element={renderSupportProgramRoute(FindMatches)} />
        <Route path="/support-analytics" element={renderSupportProgramRoute(GrowthEnabler)} />
        <Route path="/support-messages" element={renderSupportProgramRoute(Messages)} />
        <Route path="/support-settings" element={renderSupportProgramRoute(Settings)} />


        {/* Application Routes */}
        <Route path="/applications/funding" element={renderSMERoute(FundingApplication)} />
        <Route path="/applications/funding/:section" element={renderSMERoute(FundingApplication)} />
        <Route path="/applications/product" element={renderSMERoute(ProductApplication)} />
        <Route path="/applications/product/:section" element={renderSMERoute(ProductApplication)} />

        {/* SME Universal Profile Sub-Routes */}
        <Route path="/profile/instructions" element={renderSMEProfileSection(SMEInstructions, "instructions")} />
        <Route path="/profile/entity-overview" element={renderSMEProfileSection(SMEEntityOverview, "entityOverview")} />
        <Route
          path="/profile/ownership-management"
          element={renderSMEProfileSection(SMEOwnershipManagement, "ownershipManagement")}
        />
        <Route path="/profile/contact-details" element={renderSMEProfileSection(SMEContactDetails, "contactDetails")} />
        <Route
          path="/profile/legal-compliance"
          element={renderSMEProfileSection(SMELegalCompliance, "legalCompliance")}
        />
        <Route
          path="/profile/products-services"
          element={renderSMEProfileSection(SMEProductsServices, "productsServices")}
        />
        <Route path="/profile/how-did-you-hear" element={renderSMEProfileSection(SMEHowDidYouHear, "howDidYouHear")} />
        <Route
          path="/profile/declaration-consent"
          element={renderSMEProfileSection(SMEDeclarationConsent, "declarationConsent")}
        />

        {/* Investor Universal Profile Sub-Routes */}
        <Route
          path="/investor-profile/instructions"
          element={renderInvestorProfileSection(InvestorInstructions, "instructions")}
        />
        <Route
          path="/investor-profile/entity-overview"
          element={renderInvestorProfileSection(InvestorEntityOverview, "entityOverview")}
        />
        <Route
          path="/investor-profile/ownership-management"
          element={renderInvestorProfileSection(InvestorOwnershipManagement, "ownershipManagement")}
        />
        <Route
          path="/investor-profile/contact-details"
          element={renderInvestorProfileSection(InvestorContactDetails, "contactDetails")}
        />
        <Route
          path="/investor-profile/legal-compliance"
          element={renderInvestorProfileSection(InvestorLegalCompliance, "legalCompliance")}
        />
        <Route
          path="/investor-profile/products-services"
          element={renderInvestorProfileSection(InvestorProductsServices, "productsServices")}
        />
        <Route
          path="/investor-profile/how-did-you-hear"
          element={renderInvestorProfileSection(InvestorHowDidYouHear, "howDidYouHear")}
        />
        <Route
          path="/investor-profile/declaration-consent"
          element={renderInvestorProfileSection(InvestorDeclarationConsent, "declarationConsent")}
        />

        {/* Support Program Universal Profile Sub-Routes */}
        <Route
          path="/support-profile/instructions"
          element={renderSupportProfileSection(SupportInstructions, "instructions")}
        />
        <Route
          path="/support-profile/entity-overview"
          element={renderSupportProfileSection(SupportEntityOverview, "entityOverview")}
        />
        <Route
          path="/support-profile/ownership-management"
          element={renderSupportProfileSection(SupportOwnershipManagement, "ownershipManagement")}
        />
        <Route
          path="/support-profile/contact-details"
          element={renderSupportProfileSection(SupportContactDetails, "contactDetails")}
        />
        <Route
          path="/support-profile/legal-compliance"
          element={renderSupportProfileSection(SupportLegalCompliance, "legalCompliance")}
        />
        <Route
          path="/support-profile/products-services"
          element={renderSupportProfileSection(SupportProductsServices, "productsServices")}
        />
        <Route
          path="/support-profile/how-did-you-hear"
          element={renderSupportProfileSection(SupportHowDidYouHear, "howDidYouHear")}
        />
        <Route
          path="/support-profile/declaration-consent"
          element={renderSupportProfileSection(SupportDeclarationConsent, "declarationConsent")}
        />

        {/* Add these routes in the Routes component, after the existing routes and before the redirects */}
        <Route path="/customer-matches" element={renderSMERoute(CustomerMatchesPage)} />
        <Route path="/funding-matches" element={renderSMERoute(FundingMatchesPage)} />
        <Route path="/supplier-matches" element={renderSMERoute(SupplierMatchesPage)} />
        <Route path="/support-program-matches" element={renderSMERoute(SupportProgramMatchesPage)} />
        <Route path="/investor-matches" element={renderInvestorRoute(MatchesPage)} />

        {/* Redirects */}
        <Route path="/universal-profile" element={<Navigate to="/investor-profile" replace />} />
        <Route path="/investor-universal-profile" element={<Navigate to="/investor-profile/instructions" replace />} />
        <Route path="/support-universal-profile" element={<Navigate to="/support-profile/instructions" replace />} />
        <Route path="/applications/funding-application" element={<Navigate to="/applications/funding" replace />} />
        <Route path="/applications/product-application" element={<Navigate to="/applications/product" replace />} />


        {/* Billing Redirects */}
        {/* <Route path="/billing" element={<Navigate to="/billing/subscriptions" replace />} />
        <Route path="/investor/billing" element={<Navigate to="/investor/billing/subscriptions" replace />} /> */}
      </Routes>
    </Router>
  )
}

export default App
