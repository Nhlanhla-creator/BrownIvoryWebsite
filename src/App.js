import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './smespages/Sidebar/Sidebar';
import Header from './smespages/Header/Header';

import AuthForm from './smespages/LoginRegister';
import LandingPage from './mainpages/LandingPage';
import Investors from './mainpages/Investors';
import PurposePartner from './mainpages/PurposePartner';
import ServiceProvider from './mainpages/ServiceProvider';
import SMEFunding from './mainpages/SMEFunding';
import Solutions from './mainpages/Solutions';
import GrowthEnablerMain from './mainpages/GrowthEnabler';
import Dashboard from './smespages/Dashboard/Dashboard';
import Profile from './smespages/Profile/Profile';
import Application from './smespages/Application/Application';
import FindMatches from './smespages/FindMatches/FindMatches';
import Investor from './smespages/Investor/Investor';
import GrowthEnabler from './smespages/GrowthEnabler/GrowthEnabler';
import Messages from './smespages/Messages/Messages';
import Settings from './smespages/Settings/Settings';

import './App.css';

function App() {
  const [profileImage, setProfileImage] = useState(null);
  const companyName = 'Acme Inc';

  const renderProtectedRoute = (Component) => (
    <div className="app-layout">
      <Sidebar companyName={companyName} />
      <div className="main-content">
        <Header
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
        <Route path="/investors" element={<Investors />} />
        <Route path="/purpose-partner" element={<PurposePartner />} />
        <Route path="/service-provider" element={<ServiceProvider />} />
        <Route path="/sme-funding" element={<SMEFunding />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/growth-enabler" element={<GrowthEnablerMain />} />
        <Route path="/auth" element={renderProtectedRoute(AuthForm)} />
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

