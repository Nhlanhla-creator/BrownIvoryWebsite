import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from '../src/smespages/LoginRegister';
import Dashboard from './smespages/Dashboard';
import TotalMatchedFunders from './smespages/TotalMatchedFunders';
import ApplicationsSent from './smespages/ApplicationsSent';
import PendingApplications from './smespages/PendingApplications';
import FunderInterestReceived from './smespages/FunderInterestReceived';
import MeetingsScheduled from './smespages/MeetingsScheduled';
import FeedbackReceived from './smespages/FeedbackReceived';
import ComplianceStatus from './smespages/ComplianceStatus';
import BIGScoreSummary from './smespages/BIGScoreSummary';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/TotalMatchedFunders" element={<TotalMatchedFunders />} />
        <Route path="/ApplicationsSent" element={<ApplicationsSent />} />
        <Route path="/PendingApplications" element={<PendingApplications />} />
        <Route path="/FunderInterestReceived" element={<FunderInterestReceived />} />
        <Route path="/MeetingsScheduled" element={<MeetingsScheduled />} />
        <Route path="/FeedbackReceived" element={<FeedbackReceived />} />
        <Route path="/ComplianceStatus" element={<ComplianceStatus />} />
        <Route path="/BIGScoreSummary" element={<BIGScoreSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
