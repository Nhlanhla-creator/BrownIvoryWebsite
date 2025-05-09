import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Layout Components
import Sidebar from "./smespages/Sidebar/Sidebar";
import DashboardHeader from "./smespages/DashboardHeader/DashboardHeader";

// Public Pages
import LandingPage from "./mainpages/LandingPage";
import AboutPage from "./mainpages/About";
import HowItWorks from "./mainpages/HowItWorks";
import BigScorePage from "./mainpages/BIGScorePage";
import HowItWorksSMSE from "./mainpages/HowItWorksSMSE";
import HowItWorksAccelerators from "./mainpages/HowItWorksAccelarators";
import HowItWorksCorporates from "./mainpages/HowItWorksCoporate";
import HowItWorksInvestors from "./mainpages/HowItWorksInvestor";

// Auth Components
import AuthForm from "./smespages/LoginRegister";
import LoginRegister from "./smespages/LoginRegister";

// Protected Pages
import Dashboard from "./smespages/Dashboard/Dashboard";
import Profile from "./smespages/UniversalProfile/UniversalProfile";
import FindMatches from "./smespages/FindMatches/FindMatches";
import Investor from "./smespages/Investor/Investor";
import GrowthEnabler from "./smespages/GrowthEnabler/GrowthEnabler";
import Messages from "./smespages/Messages/Messages";
import Settings from "./smespages/Settings/Settings";

// Universal Profile Components
import ProfileTracker from "./smespages/UniversalProfile/profile-tracker";
import Instructions from "./smespages/UniversalProfile/instructions";
import EntityOverview from "./smespages/UniversalProfile/entity-overview";
import OwnershipManagement from "./smespages/UniversalProfile/ownership-management";
import ContactDetails from "./smespages/UniversalProfile/contact-details";
import LegalCompliance from "./smespages/UniversalProfile/legal-compliance";
import ProductsServices from "./smespages/UniversalProfile/products-services";
import HowDidYouHear from "./smespages/UniversalProfile/how-did-you-hear";
import DeclarationConsent from "./smespages/UniversalProfile/declaration-consent";

// Funding Application
import FundingApplication from "./smespages/FundingApplication/FundingApplication";

// Product Application
import ProductApplication from "./smespages/ProductApplication/ProductApplication";

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
};

function App() {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const companyName = "Acme Inc";

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const ProtectedLayout = ({ children }) => (
    <div className="app-layout">
      <Sidebar companyName={companyName} />
      <div className="main-content">
        <DashboardHeader 
          companyName={companyName} 
          profileImage={profileImage} 
          setProfileImage={setProfileImage} 
        />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );

  const renderProtectedRoute = (Component, props = {}) => (
    <ProtectedLayout>
      <Component {...props} />
    </ProtectedLayout>
  );

  const renderProfileSection = (Component, section) => (
    <ProtectedLayout>
      <h1 className="text-3xl font-bold text-brown-800 mb-8">My Universal Profile</h1>
      <ProfileTracker activeSection={section} />
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        {formData[section] ? (
          <Component 
            data={formData[section]} 
            updateData={(data) => updateFormData(section, data)} 
          />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </ProtectedLayout>
  );

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

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={renderProtectedRoute(Dashboard)} />
        <Route path="/profile" element={renderProtectedRoute(Profile)} />
        <Route path="/find-matches" element={renderProtectedRoute(FindMatches)} />
        <Route path="/investor" element={renderProtectedRoute(Investor)} />
        <Route path="/growth" element={renderProtectedRoute(GrowthEnabler)} />
        <Route path="/messages" element={renderProtectedRoute(Messages)} />
        <Route path="/settings" element={renderProtectedRoute(Settings)} />

        {/* Application Routes */}
        <Route path="/applications/funding" element={renderProtectedRoute(FundingApplication)} />
        <Route path="/applications/funding/:section" element={renderProtectedRoute(FundingApplication)} />
        <Route path="/applications/product" element={renderProtectedRoute(ProductApplication)} />
        <Route path="/applications/product/:section" element={renderProtectedRoute(ProductApplication)} />

        {/* Universal Profile Sub-Routes */}
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

        {/* Redirects */}
        <Route path="/universal-profile" element={<Navigate to="/profile/instructions" replace />} />
        <Route path="/applications/funding-application" element={<Navigate to="/applications/funding" replace />} />
        <Route path="/applications/product-application" element={<Navigate to="/applications/product" replace />} />
      </Routes>
    </Router>
  );
}

export default App;