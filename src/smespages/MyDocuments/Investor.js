import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './Investor.css';

const InvestorDashboard = () => {
  const [expandedStage, setExpandedStage] = useState(null);
  const [selectedFundingType, setSelectedFundingType] = useState(null);

  // Data - unchanged from your original
  const applicationFunnel = [
    { stage: 'Initial Matches', count: 85, fill: '#9E6E3C' },
    { stage: 'Applications Sent', count: 62, fill: '#754A2D' },
    { stage: 'Under Review', count: 45, fill: '#BCAE9C' },
    { stage: 'Meetings Held', count: 28, fill: '#D3D2CE' },
    { stage: 'Term Sheets', count: 15, fill: '#F2F0E6' },
    { stage: 'Funded', count: 9, fill: '#9E6E3C' }
  ];

  const fundingData = [
    { name: 'Grant', value: 30, color: '#9E6E3C' },
    { name: 'Debt', value: 40, color: '#754A2D' },
    { name: 'Equity', value: 30, color: '#BCAE9C' }
  ];

  const investorMatches = [
    { id: 1, name: 'ABC Ventures', type: 'Venture Capital', matchScore: 92, lastContact: '2023-05-10', status: 'Active' },
    { id: 2, name: 'XYZ Capital', type: 'Private Equity', matchScore: 85, lastContact: '2023-05-08', status: 'Pending' }
  ];

  const recentActivities = [
    { date: 'May 15, 2023', content: 'Meeting scheduled with ABC Ventures', type: 'meeting' }
  ];

  // Toggle functions
  const toggleStage = (stage) => {
    setExpandedStage(expandedStage === stage ? null : stage);
  };

  return (
    <div className="investor-dashboard">
      {/* Pipeline Tracker - Compact horizontal version */}
      <div className="pipeline-tracker-container">
        <h2>Dealflow Pipeline</h2>
        <div className="pipeline-tracker">
          {applicationFunnel.map((item, index) => (
            <div 
              key={index} 
              className={`pipeline-stage ${expandedStage === item.stage ? 'active' : ''}`}
              onClick={() => toggleStage(item.stage)}
            >
              <div className="stage-count" style={{ backgroundColor: item.fill }}>
                {item.count}
              </div>
              <div className="stage-label">{item.stage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Stage Details */}
      {expandedStage && (
        <div className="stage-details">
          <div className="details-header">
            <h3>{expandedStage} Details</h3>
            <button className="close-btn" onClick={() => setExpandedStage(null)}>
              × Close
            </button>
          </div>
          <div className="details-table">
            <table>
              <thead>
                <tr>
                  <th>Investor</th>
                  <th>Type</th>
                  <th>Match Score</th>
                  <th>Last Contact</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {investorMatches.map((investor) => (
                  <tr key={investor.id}>
                    <td>{investor.name}</td>
                    <td>{investor.type}</td>
                    <td>
                      <div className="score-bar">
                        <div 
                          className="score-fill" 
                          style={{ width: `${investor.matchScore}%` }}
                        />
                        <span className="score-value">{investor.matchScore}%</span>
                      </div>
                    </td>
                    <td>{investor.lastContact}</td>
                    <td>
                      <span className={`status-badge ${investor.status.toLowerCase()}`}>
                        {investor.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Funding Chart - Your original pie chart */}
        <div className="dashboard-card funding-card">
          <h3>Funding Breakdown</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fundingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  onClick={(data) => setSelectedFundingType(data.name)}
                >
                  {fundingData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke={selectedFundingType === entry.name ? '#372C27' : '#fff'}
                      strokeWidth={selectedFundingType === entry.name ? 2 : 1}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {selectedFundingType && (
            <div className="selected-type">
              Selected: {selectedFundingType}
              <button onClick={() => setSelectedFundingType(null)}>Clear</button>
            </div>
          )}
        </div>

        {/* Investor Matches - Your original table */}
        <div className="dashboard-card matches-card">
          <h3>Top Investor Matches</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Investor</th>
                  <th>Type</th>
                  <th>Match Score</th>
                  <th>Last Contact</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {investorMatches.map((investor) => (
                  <tr key={investor.id}>
                    <td>{investor.name}</td>
                    <td>{investor.type}</td>
                    <td>
                      <div className="score-bar">
                        <div 
                          className="score-fill" 
                          style={{ width: `${investor.matchScore}%` }}
                        />
                        <span className="score-value">{investor.matchScore}%</span>
                      </div>
                    </td>
                    <td>{investor.lastContact}</td>
                    <td>
                      <span className={`status-badge ${investor.status.toLowerCase()}`}>
                        {investor.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity - Your original component */}
        <div className="dashboard-card activity-card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div className="activity-item" key={index}>
                <div className="activity-date">{activity.date}</div>
                <div className="activity-content">{activity.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;