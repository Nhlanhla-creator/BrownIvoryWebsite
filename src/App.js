import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './smespages/Sidebar/Sidebar';
import Header from './mainpages/Header';
import AuthForm from './smespages/LoginRegister';
import LandingPage from './mainpages/LandingPage';
import Dashboard from './smespages/Dashboard/Dashboard';
import Profile from './smespages/Profile/Profile';
import Application from './smespages/Application/Application';
import FindMatches from './smespages/FindMatches/FindMatches';
import Investor from './smespages/Investor/Investor';
import GrowthEnabler from './smespages/GrowthEnabler/GrowthEnabler';
import Messages from './smespages/Messages/Messages';
import Settings from './smespages/Settings/Settings';
import AboutPage from './mainpages/About';
import HowItWorksAccelerators from './mainpages/HowItWorksAccelarators';
import HowItWorksCorporates from './mainpages/HowItWorksCoporate';
import HowItWorksInvestors from './mainpages/HowItWorksInvestor';
import HowItWorksSMSE from './mainpages/HowItWorksSMSE';
import BigScorePage from './mainpages/BIGScorePage';
import HowItWorks from './mainpages/HowItWorks';
import LoginRegister from './smespages/LoginRegister';

import './App.css';
import DashboardHeader from './smespages/DashboardHeader/DashboardHeader'; 

function App() {
  const [profileImage, setProfileImage] = useState(null);
  const companyName = 'Acme Inc';

  const renderProtectedRoute = (Component) => (
    <div className="app-layout">
      <Sidebar companyName={companyName} />
      <div className="main-content">
      <DashboardHeader 
          companyName={companyName}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
        <div className="page-content">
          <Component />
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
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
        <Route path="/dashboard" element={renderProtectedRoute(Dashboard)} />
        <Route path="/profile" element={renderProtectedRoute(Profile)} />
        <Route path="/application" element={renderProtectedRoute(Application)} />
        <Route path="/find-matches" element={renderProtectedRoute(FindMatches)} />
        <Route path="/investor" element={renderProtectedRoute(Investor)} />
        <Route path="/growth" element={renderProtectedRoute(GrowthEnabler)} />
        <Route path="/messages" element={renderProtectedRoute(Messages)} />
        <Route path="/settings" element={renderProtectedRoute(Settings)} />
      </Routes>
    </Router>
  );
}

export default App;

