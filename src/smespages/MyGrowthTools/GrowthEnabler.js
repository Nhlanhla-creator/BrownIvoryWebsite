import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import './GrowthEnabler.css';

const GrowthEnabler = () => {
  const serviceData = [
    { name: 'Consulting', value: 35, color: '#9E6E3C' },
    { name: 'Training', value: 25, color: '#754A2D' },
    { name: 'Mentorship', value: 20, color: '#BCAE9C' },
    { name: 'Networking', value: 15, color: '#D3D2CE' },
    { name: 'Other', value: 5, color: '#F2F0E6' }
  ];

  const providerMatches = [
    {
      id: 1,
      name: 'Growth Experts Inc.',
      services: 'Business Strategy, Scaling',
      matchScore: 88,
      rating: 4.7,
      status: 'Recommended'
    },
    // Add more provider matches...
  ];

  return (
    <div className="growth-enabler-page">
      <h2>Growth Enabler Dashboard</h2>
      
      <div className="growth-grid">
        {/* Services Chart */}
        <div className="growth-card services-card">
          <h3>Services Breakdown</h3>
          <div className="chart-container">
            <PieChart width={300} height={200}>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Provider Matches */}
        <div className="growth-card matches-card">
          <h3>Provider Matches</h3>
          <div className="matches-table">
            <table>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Services</th>
                  <th>Match Score</th>
                  <th>Rating</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {providerMatches.map((provider) => (
                  <tr key={provider.id}>
                    <td>{provider.name}</td>
                    <td>{provider.services}</td>
                    <td>
                      <div className="score-bar">
                        <div 
                          className="score-fill" 
                          style={{ width: `${provider.matchScore}%` }}
                        />
                        <span className="score-value">{provider.matchScore}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(provider.rating) ? 'star filled' : 'star'}>★</span>
                        ))}
                        <span className="rating-value">{provider.rating}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${provider.status.toLowerCase()}`}>
                        {provider.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthEnabler;