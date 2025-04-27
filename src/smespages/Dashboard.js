import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Dashboard.css';

// Data arrays from the form code
const africanCountries = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon', 
  'Central African Republic', 'Chad', 'Comoros', 'Congo', 'DR Congo', 'Djibouti', 'Egypt', 
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 
  'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 
  'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 
  'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 
  'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
];

const businessStages = [ 
  'Idea Stage',
  'Concept Validation',
  'Prototype Ready',
  'MVP Launched',
  'Early Traction',
  'Revenue-Generating',
  'Product-Market Fit',
  'Scaling / Growth',
  'Expansion / Internationalization',
  'Established / Mature',
  'Pivoting',
  'Exit Stage (e.g. Acquisition / IPO)',
  'Other'
];

const profitabilityStatuses = [
  'Pre-revenue',
  'Loss-making',
  'Break-even',
  'Profitable',
  'Consistently Profitable',
  'Recently Turned Profitable',
  'High Growth with Losses',
  'Seasonally Profitable',
  'Not Disclosed',
  'Other'
];

const bbbeeLevels = [
  'Level 1 Contributor',
  'Level 2 Contributor',
  'Level 3 Contributor',
  'Level 4 Contributor',
  'Level 5 Contributor',
  'Level 6 Contributor',
  'Level 7 Contributor',
  'Level 8 Contributor',
  'Non-Compliant',
  'Not Applicable'
];

const businessModels = [
  'Manufacturer', 'Retailer', 'E-commerce', 'Private Label / White Label',
  'Consulting / Agency', 'Freemium', 'Subscription', 'Pay-Per-Use', 'Time-Based Billing',
  'Marketplace', 'Two-Sided Platform', 'Peer-to-Peer (P2P)', 'Aggregator',
  'Licensing', 'Franchise', 'Patent Licensing',
  'SaaS (Software as a Service)', 'PaaS / IaaS', 'Open-Source + Support', 'Data Monetization',
  'Brokerage', 'Lending / Credit', 'Leasing', 'Crowdfunding',
  'D2C (Direct-to-Consumer)', 'B2B (Business-to-Business)', 'B2C (Business-to-Consumer)', 'B2G (Business-to-Government)',
  'Razor and Blade', 'Freemium-to-Paid Upgrade', 'Pay-What-You-Want', 'Usage-Based Pricing', 'Circular Economy',
  'Other'
];

const steps = [
  'Profile Form',
  'Company Overview',
  'Ownership & Compliance',
  'Financial Diligence',
  'Operational Diligence',
  'Pitch & Market'
];

const stepContent = {
  'Profile Form': {
    fields: [
      { name: 'companyName', label: 'Company Name', type: 'text', required: true },
      { name: 'country', label: 'Country of Operation', type: 'select', options: africanCountries, required: true },
      { name: 'industry', label: 'Industry Sector', type: 'select', options: [
        'Agriculture', 'Forestry', 'Fishing', 'Mining', 'Oil & Gas',
        'Automotive', 'Aerospace & Defense', 'Chemical Manufacturing', 'Food & Beverage', 'Electronics',
        'Textiles', 'Machinery', 'Construction', 'Shipbuilding', 'Steel & Metal Works',
        'Pharmaceuticals', 'Plastics & Rubber', 'Banking', 'Insurance', 'Investment Management',
        'Accounting', 'Consulting', 'Legal Services', 'Real Estate', 'E-commerce',
        'Retail', 'Fashion', 'Consumer Goods', 'Hospitality', 'Tourism',
        'Restaurants', 'Airlines', 'Railroads', 'Trucking', 'Shipping & Freight',
        'Warehousing', 'Software', 'IT Services', 'Telecommunications', 'Internet & Media',
        'Data Analytics', 'Cybersecurity', 'Cloud Computing', 'Hospitals', 'Biotech',
        'Medical Devices', 'Health Insurance', 'Film & TV', 'Music', 'Publishing',
        'Gaming', 'Sports & Recreation', 'Streaming', 'Primary Education', 'Higher Education',
        'EdTech', 'Vocational Training', 'Utilities', 'Waste Management', 'Public Services',
        'Government', 'Defense & Military', 'NGOs', 'Religious Organizations',
        'Scientific R&D', 'Market Research', 'Think Tanks', 'Executive Leadership',
        'Policy & Decision Making', 'Other'
      ], required: true },
      { name: 'website', label: 'Website / Social Media Links', type: 'url' },
      { name: 'optInServiceProvider', label: 'Opt-in as Service Provider?', type: 'checkbox' },
      { name: 'servicesOffered', label: 'Services Offered', type: 'textarea', condition: (formData) => formData.optInServiceProvider },
      { name: 'serviceCaseStudies', label: 'Service Case Studies (upload)', type: 'file', condition: (formData) => formData.optInServiceProvider }
    ],
    description: 'Basic information about your company'
  },
  'Company Overview': {
    fields: [
      { name: 'description', label: 'Company Description', type: 'textarea', required: true },
      { name: 'businessModel', label: 'Business Model', type: 'select', options: businessModels, required: true },
      { name: 'stage', label: 'Stage of Business', type: 'select', options: businessStages, required: true },
      { name: 'targetMarket', label: 'Target Market/Geography', type: 'text', required: true },
      { name: 'products', label: 'Key Products/Services', type: 'textarea', required: true }
    ],
    description: 'Detailed overview of your business'
  },
  'Ownership & Compliance': {
    fields: [
      { name: 'ownershipStructure', label: 'Ownership Structure', type: 'textarea', required: true },
      { name: 'bbbeeStatus', label: 'B-BBEE Status', type: 'select', options: bbbeeLevels, required: true },
      { name: 'taxClearance', label: 'Tax Clearance Certificate', type: 'file', required: true },
      { name: 'registrationNumber', label: 'Registration Number', type: 'text', required: true },
      { name: 'registrationDoc', label: 'Company Registration Document', type: 'file', required: true },
      { name: 'directorIds', label: 'Director IDs', type: 'file', required: true },
      { name: 'shareholderCerts', label: 'Shareholder Certificates', type: 'file' }
    ],
    description: 'Legal and compliance documentation'
  },
  'Financial Information': {
    fields: [
      { name: 'annualRevenue', label: 'Annual Revenue (Last FY)', type: 'number', required: true },
      { name: 'profitabilityStatus', label: 'Profitability Status', type: 'select', options: profitabilityStatuses, required: true },
      { name: 'fundingRound', label: 'Current Funding Round', type: 'select', options: businessStages, required: true },
      { name: 'askAmount', label: 'Ask Amount (Funding Required)', type: 'number', required: true },
      { name: 'useOfFunds', label: 'Use of Funds (breakdown %)', type: 'textarea', required: true },
      { name: 'financialStatements', label: 'Financial Statements (upload)', type: 'file', required: true },
      { name: 'accountingSoftware', label: 'Accounting Software Used', type: 'text' }
    ],
    description: 'Financial details and funding requirements'
  },
  'Operational Information': {
    fields: [
      { name: 'keyPartners', label: 'Key Partners', type: 'textarea', required: true },
      { name: 'keyActivities', label: 'Key Activities', type: 'textarea', required: true },
      { name: 'revenueStreams', label: 'Revenue Streams', type: 'textarea', required: true },
      { name: 'keyResources', label: 'Key Resources', type: 'textarea', required: true },
      { name: 'valueProposition', label: 'Value Proposition', type: 'textarea', required: true },
      { name: 'channels', label: 'Channels', type: 'textarea', required: true },
      { name: 'costStructure', label: 'Cost Structure', type: 'textarea', required: true },
      { name: 'customerSegments', label: 'Customer Segments', type: 'textarea', required: true },
      { name: 'customerRelationships', label: 'Customer Relationships', type: 'textarea', required: true }
    ],   
    description: 'Team and operational details'
  },
  'Pitch & Market': {
    fields: [
      { name: 'pitchDeck', label: 'Pitch Deck (upload)', type: 'file', required: true },
    ],
    description: 'Market opportunity and competitive positioning'
  }
};

const Dashboard = () => {
  // Form state
  const [activeForm, setActiveForm] = useState(null); // Start with null (no form shown)
  const [formData, setFormData] = useState({});
  const [filePreviews, setFilePreviews] = useState({});
  const [pitchEvaluation, setPitchEvaluation] = useState(null);
  const [formProgress, setFormProgress] = useState({
    'Profile Form': false,
    'Company Overview': false,
    'Ownership & Compliance': false,
    'Financial Information': false,
    'Operational Information': false,
    'Pitch & Market': false
  });
  // Dashboard state
  const [showInvestorMatches, setShowInvestorMatches] = useState(false);
  const [showServiceMatches, setShowServiceMatches] = useState(false);
  const [showGrowthMatches, setShowGrowthMatches] = useState(false);
  const [showPurposeMatches, setShowPurposeMatches] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(80);
  const [date, setDate] = useState(new Date());

  // Data for charts
  const profileData = [
    { name: 'Completed', value: profileCompletion, color: '#4CAF50' },
    { name: 'Remaining', value: 100 - profileCompletion, color: '#F44336' }
  ];

  const bigScoreData = [
    { name: 'Funding', value: 25, color: '#9E6E3C' },
    { name: 'Compliance', value: 20, color: '#754A2D' },
    { name: 'Financial Health', value: 15, color: '#BCAE9C' },
    { name: 'Operational', value: 25, color: '#D3D2CE' },
    { name: 'Pitch', value: 15, color: '#F2F0E6' }
  ];

  const monthlyScoreData = [
    { name: 'Jan', score: 45 },
    { name: 'Feb', score: 50 },
    { name: 'Mar', score: 55 },
    { name: 'Apr', score: 60 },
    { name: 'May', score: 65 },
    { name: 'Jun', score: 70 },
    { name: 'Jul', score: 75 },
    { name: 'Aug', score: 80 },
    { name: 'Sep', score: 82 },
    { name: 'Oct', score: 85 },
    { name: 'Nov', score: 88 },
    { name: 'Dec', score: 90 }
  ];

  const fundingData = [
    { name: 'Grant', value: 30, color: '#4CAF50' },
    { name: 'Debt', value: 40, color: '#2196F3' },
    { name: 'Equity', value: 30, color: '#FFC107' }
  ];

  const funnelData = [
    { name: 'Total Matches', value: 100, fill: '#9E6E3C' },
    { name: 'Application Sent', value: 80, fill: '#754A2D' },
    { name: 'Pending Application', value: 60, fill: '#BCAE9C' },
    { name: 'Funder Interest', value: 40, fill: '#D3D2CE' },
    { name: 'Meetings Scheduled', value: 30, fill: '#F2F0E6' },
    { name: 'Feedback Received', value: 20, fill: '#9E6E3C' },
    { name: 'Successful Closer', value: 10, fill: '#754A2D' }
  ];

  const providerData = [
    { name: 'Provider A', percent: 85 },
    { name: 'Provider B', percent: 70 },
    { name: 'Provider C', percent: 60 },
    { name: 'Provider D', percent: 45 }
  ];

  const matchesData = [
    { name: 'ABC Mining', location: 'Johannesburg', industry: 'Mining', amount: 'R500,000', score: 85 },
    { name: 'XYZ Minerals', location: 'Cape Town', industry: 'Mining', amount: 'R750,000', score: 78 },
    { name: 'Gold Fields', location: 'Pretoria', industry: 'Mining', amount: 'R1,200,000', score: 92 }
  ];

  const upcomingEvents = [
    { title: 'Investor Meetup', date: 'May 15, 2023' },
    { title: 'Pitch Workshop', date: 'May 20, 2023' },
    { title: 'Funding Deadline', date: 'May 30, 2023' }
  ];

  const messages = [
    { sender: 'Investor X', content: 'Interested in your pitch', time: '2h ago' },
    { sender: 'Service Provider Y', content: 'Please submit documents', time: '1d ago' },
    { sender: 'Growth Partner', content: 'Meeting scheduled', time: '3d ago' }
  ];

  // Form functions from the form code
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviews(prev => ({ ...prev, [name]: reader.result }));
        };
        reader.readAsDataURL(file);
        setFormData(prev => ({ ...prev, [name]: file }));
      }
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormClick = (formName) => {
    setActiveForm(formName); // Set the active form when a step is clicked
  };

  const evaluatePitch = () => {
    // Simplified evaluation based only on document upload
    if (!formData.pitchDeck) {
      alert('Please upload your pitch deck first');
      return;
    }
    
    const scores = [
      { name: 'Problem Clarity', score: Math.floor(Math.random() * 51) + 50, weight: 20 },
      { name: 'Solution Uniqueness', score: Math.floor(Math.random() * 51) + 50, weight: 20 },
      { name: 'Business Model', score: Math.floor(Math.random() * 51) + 50, weight: 20 },
      { name: 'Market Size', score: Math.floor(Math.random() * 51) + 50, weight: 10 },
      { name: 'Competitive Advantage', score: Math.floor(Math.random() * 51) + 50, weight: 10 }
    ];

    const totalScore = Math.round(
      scores.reduce((sum, item) => sum + (item.score * item.weight / 100), 0)
    );

    setPitchEvaluation({
      scores,
      totalScore,
      recommendations: [
        "Consider refining your financial projections",
        "Add more market validation data",
        "Highlight your team's expertise more prominently"
      ]
    });

    setFormProgress(prev => ({ ...prev, [activeForm]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeForm === 'Pitch & Market') {
      evaluatePitch();
    } else {
      setFormProgress(prev => ({ ...prev, [activeForm]: true }));
      const currentIndex = steps.indexOf(activeForm);
      if (currentIndex < steps.length - 1) {
        setActiveForm(steps[currentIndex + 1]);
      } else {
        setActiveForm(null); // Close form after last step
      }
    }
  };


  const renderField = (field) => {
    if (field.condition && !field.condition(formData)) return null;

    switch (field.type) {
      case 'textarea':
        return (
          <div className="form-field" key={field.name}>
            <label>
              {field.label}
              {field.required && <span className="required-asterisk">*</span>}
            </label>
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              required={field.required}
              rows={4}
            />
          </div>
        );
      case 'select':
        return (
          <div className="form-field" key={field.name}>
            <label>
              {field.label}
              {field.required && <span className="required-asterisk">*</span>}
            </label>
            <select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              required={field.required}
            >
              <option value="">Select an option</option>
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      case 'checkbox':
        return (
          <div className="form-field checkbox-field" key={field.name}>
            <label>
              <input
                type="checkbox"
                name={field.name}
                checked={formData[field.name] || false}
                onChange={handleInputChange}
              />
              {field.label}
              {field.required && <span className="required-asterisk">*</span>}
            </label>
          </div>
        );
      case 'file':
        return (
          <div className="form-field" key={field.name}>
            <label>
              {field.label}
              {field.required && <span className="required-asterisk">*</span>}
            </label>
            <input
              type="file"
              name={field.name}
              onChange={handleInputChange}
              required={field.required && !formData[field.name]}
            />
            {filePreviews[field.name] && (
              <div className="file-preview">
                {field.name.includes('image') ? (
                  <img src={filePreviews[field.name]} alt="Preview" width="100" />
                ) : (
                  <span>File uploaded: {formData[field.name]?.name}</span>
                )}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="form-field" key={field.name}>
            <label>
              {field.label}
              {field.required && <span className="required-asterisk">*</span>}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              required={field.required}
            />
          </div>
        );
    }
  };

  const renderPitchEvaluation = () => {
    if (!pitchEvaluation) return null;

    return (
      <div className="pitch-evaluation">
        <h3>Pitch Evaluation</h3>
        <div className="score-summary">
          <div className="total-score">
            <span>Total Score:</span>
            <span className="score-value">{pitchEvaluation.totalScore}%</span>
          </div>
          
          <div className="score-details">
            <BarChart
              width={500}
              height={300}
              data={pitchEvaluation.scores}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#9E6E3C" />
            </BarChart>
          </div>
          
          <div className="recommendations">
            <h4>Recommendations for Improvement:</h4>
            <ul>
              {pitchEvaluation.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const totalBigScore = bigScoreData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Welcome to Your SME Dashboard</h1>
        <div className="header-action-buttons">
          <button className="action-btn help-btn">Help</button>
          <button className="action-btn settings-btn">Settings</button>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Top Row - Profile Completion and Form Registration */}
        <div className="top-section-row">
          {/* Profile Completion - Narrow */}
          <div className="profile-completion-card">
            <h2 className="card-title">Profile Completion</h2>
            <div className="pie-chart-wrapper">
              <PieChart width={200} height={200}>
                <Pie
                  data={profileData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {profileData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <button className="primary-action-btn">Update Profile</button>
          </div>

          {/* Form Registration - Wide */}
          <div className={`form-registration-card ${activeForm ? 'active-form' : ''}`}>
        <h2 className="card-title">Form Registration</h2>
        <div className="form-progress-tracker">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div 
                className={`form-step ${formProgress[step] ? 'completed-step' : ''} ${activeForm === step ? 'active-step' : ''}`}
                onClick={() => handleFormClick(step)}
              >
                <div className="step-indicator">{formProgress[step] ? '✓' : index + 1}</div>
                <div className="step-description">{step}</div>
              </div>
              {index < steps.length - 1 && <div className="step-connector">→</div>}
            </React.Fragment>
          ))}
        </div>

        {activeForm && (
          <form onSubmit={handleSubmit} className="form-preview-panel">
            <h3 className="form-preview-title">{activeForm}</h3>
            <p className="form-preview-text">{stepContent[activeForm].description}</p>
            
            <div className="form-fields">
              {stepContent[activeForm].fields.map(field => renderField(field))}
            </div>
            
            {activeForm === 'Pitch & Market' && pitchEvaluation && renderPitchEvaluation()}
            
            <div className="form-action-buttons">
              <button 
                type="button" 
                className="secondary-action-btn"
                onClick={() => setActiveForm(null)}
              >
                Cancel
              </button>
              <button type="submit" className="primary-action-btn">
                {activeForm === 'Pitch & Market' ? 'Evaluate Pitch' : 'Continue'}
              </button>
            </div>
          </form>
        )}
      </div>
      </div>

        {/* Column 1 */}
        <div className="dashboard-column-1">
          {/* My Big Score */}
          <div className="score-card">
            <h2 className="card-title">My Big Score</h2>
            <div className="pie-chart-wrapper score-chart">
              <PieChart width={200} height={200}>
                <Pie
                  data={bigScoreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {bigScoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <div className="total-score-display">
                {totalBigScore}%
              </div>
            </div>
            <div className="score-legend">
              {bigScoreData.map((item, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-color-box" style={{ backgroundColor: item.color }}></div>
                  <span className="legend-label">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary of My Big Score */}
          <div className="score-summary-card">
            <h2 className="card-title">Summary of My Big Score</h2>
            <div className="area-chart-wrapper">
              <AreaChart width={300} height={200} data={monthlyScoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#754A2D" fill="#BCAE9C" />
              </AreaChart>
            </div>
            <div className="recommendations-section">
              <h4 className="recommendations-title">Recommendations:</h4>
              <ul className="recommendations-list">
                <li className="recommendation-item">Improve financial documentation</li>
                <li className="recommendation-item">Attend pitch training</li>
                <li className="recommendation-item">Update compliance certificates</li>
              </ul>
              <p className="overall-score">Overall Score: 90%</p>
            </div>
          </div>

          {/* My Calendar */}
          <div className="calendar-card">
            <h2 className="card-title">My Calendar</h2>
            <div className="calendar-wrapper">
              <Calendar
                onChange={setDate}
                value={date}
                tileClassName={({ date, view }) => {
                  if (date.getDate() === 15 || date.getDate() === 30) {
                    return 'highlighted-date';
                  }
                }}
              />
            </div>
            <div className="deadlines-section">
              <h4 className="deadlines-title">Upcoming Deadlines:</h4>
              <ul className="deadlines-list">
                <li className="deadline-item">May 15: Tax Submission</li>
                <li className="deadline-item">May 30: Compliance Review</li>
              </ul>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="events-card">
            <h2 className="card-title">Upcoming Events</h2>
            <div className="events-list">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="event-list-item">
                  <div className="event-date">{event.date}</div>
                  <div className="event-name">{event.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* My Investor Ratings */}
          <div className="ratings-card">
            <h2 className="card-title">My Investor Ratings</h2>
            <div className="ratings-list">
              <div className="rating-item">
                <span className="rating-name">Investor A</span>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= 4 ? 'star filled-star' : 'star empty-star'}>★</span>
                  ))}
                </div>
              </div>
              <div className="rating-item">
                <span className="rating-name">Investor B</span>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= 3 ? 'star filled-star' : 'star empty-star'}>★</span>
                  ))}
                </div>
              </div>
              <div className="rating-item">
                <span className="rating-name">Investor C</span>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= 5 ? 'star filled-star' : 'star empty-star'}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="dashboard-column-2">
          {/* Summary of Application */}
          <div className="application-summary-card">
            <h2 className="card-title">Summary of Application</h2>
            <div className="summary-details">
              <div className="detail-row">
                <span className="detail-label">Funding Asked:</span>
                <span className="detail-value">R100,000</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Stage:</span>
                <span className="detail-value">Idea Stage</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Industry:</span>
                <span className="detail-value">Mining</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">South Africa</span>
              </div>
            </div>
          </div>

          {/* My Investor Matches */}
          <div className="matches-card">
            <div className="matches-header">
              <h2 className="card-title">My Investor Matches</h2>
              <button 
                className="toggle-matches-btn" 
                onClick={() => setShowInvestorMatches(!showInvestorMatches)}
              >
                {showInvestorMatches ? 'Hide Matches' : 'View Matches'}
              </button>
            </div>
            {showInvestorMatches && (
              <div className="matches-table-wrapper">
                <table className="matches-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Industry</th>
                      <th>Amount</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchesData.map((match, index) => (
                      <tr key={index} className="match-row">
                        <td className="match-data">{match.name}</td>
                        <td className="match-data">{match.location}</td>
                        <td className="match-data">{match.industry}</td>
                        <td className="match-data">{match.amount}</td>
                        <td className="match-data">
                          <div className="score-indicator-bar" style={{ width: `${match.score}%` }}></div>
                          <span className="score-value">{match.score}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Dealflow */}
          <div className="dealflow-card">
            <h2 className="card-title">Dealflow</h2>
            <div className="dealflow-tracker">
              {[
                { label: 'Application Completed', completed: true },
                { label: 'Investors Interested', completed: true },
                { label: 'In Progress', active: true },
                { label: 'Successful', completed: false },
                { label: 'Not Profitable', completed: false },
                { label: 'Done', completed: false }
              ].map((step, index) => (
                <React.Fragment key={index}>
                  <div className={`dealflow-step ${step.completed ? 'completed-step' : ''} ${step.active ? 'active-step' : ''}`}>
                    <div className="step-icon">{step.completed ? '✓' : step.active ? '!' : index + 1}</div>
                    <div className="step-label">{step.label}</div>
                  </div>
                  {index < 5 && <div className="step-connector">→</div>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Funnel Graph */}
          <div className="funnel-card">
            <h2 className="card-title">Dealflow Funnel</h2>
            <div className="bar-chart-wrapper">
              <BarChart
                width={300}
                height={300}
                data={funnelData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </div>

          {/* Funding Chart */}
          <div className="funding-card">
            <h2 className="card-title">Funding Chart</h2>
            <div className="pie-chart-wrapper">
              <PieChart width={300} height={200}>
                <Pie
                  data={fundingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fundingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="dashboard-column-3">
          {/* My Service Provider */}
          <div className="service-provider-card">
            <h2 className="card-title">My Service Provider</h2>
            
            {/* Service Provider Matches */}
            <div className="matches-card">
              <div className="matches-header">
                <h2 className="card-title">My Service Provider Matches</h2>
                <button 
                  className="toggle-matches-btn" 
                  onClick={() => setShowServiceMatches(!showServiceMatches)}
                >
                  {showServiceMatches ? 'Hide Matches' : 'View Matches'}
                </button>
              </div>
              {showServiceMatches && (
                <div className="matches-table-wrapper">
                  <table className="matches-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Industry</th>
                        <th>Amount</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchesData.map((match, index) => (
                        <tr key={index} className="match-row">
                          <td className="match-data">{match.name}</td>
                          <td className="match-data">{match.location}</td>
                          <td className="match-data">{match.industry}</td>
                          <td className="match-data">{match.amount}</td>
                          <td className="match-data">
                            <div className="score-indicator-bar" style={{ width: `${match.score}%` }}></div>
                            <span className="score-value">{match.score}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Service Provider Dealflow */}
            <div className="dealflow-card">
              <h2 className="card-title">Dealflow</h2>
              <div className="dealflow-tracker">
                {[
                  { label: 'Application Completed', completed: true },
                  { label: 'Investors Interested', completed: true },
                  { label: 'In Progress', active: true },
                  { label: 'Successful', completed: false }
                ].map((step, index) => (
                  <React.Fragment key={index}>
                    <div className={`dealflow-step ${step.completed ? 'completed-step' : ''} ${step.active ? 'active-step' : ''}`}>
                      <div className="step-icon">{step.completed ? '✓' : step.active ? '!' : index + 1}</div>
                      <div className="step-label">{step.label}</div>
                    </div>
                    {index < 3 && <div className="step-connector">→</div>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Provider Matches Chart */}
            <div className="bar-chart-wrapper">
              <BarChart
                width={300}
                height={250}
                data={providerData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percent" fill="#9E6E3C" />
              </BarChart>
            </div>
          </div>

          {/* My Messages */}
          <div className="messages-card">
            <h2 className="card-title">My Messages</h2>
            <div className="messages-list">
              {messages.map((message, index) => (
                <div key={index} className="message-item">
                  <div className="message-sender">{message.sender}</div>
                  <div className="message-content">{message.content}</div>
                  <div className="message-time">{message.time}</div>
                </div>
              ))}
            </div>
            <button className="view-all-btn">View All Messages</button>
          </div>

          {/* My Service Provider Ratings */}
          <div className="ratings-card">
            <h2 className="card-title">My Service Provider Ratings</h2>
            <div className="ratings-list">
              <div className="rating-item">
                <span className="rating-name">Provider X</span>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= 4 ? 'star filled-star' : 'star empty-star'}>★</span>
                  ))}
                </div>
              </div>
              <div className="rating-item">
                <span className="rating-name">Provider Y</span>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= 3 ? 'star filled-star' : 'star empty-star'}>★</span>
                  ))}
                </div>
              </div>
              <div className="rating-item">
                <span className="rating-name">Provider Z</span>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= 5 ? 'star filled-star' : 'star empty-star'}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4 */}
        <div className="dashboard-column-4">
          {/* Growth Enabler */}
          <div className="growth-enabler-card">
            <h2 className="card-title">Growth Enabler</h2>
            
            {/* Growth Enabler Matches */}
            <div className="matches-card">
              <div className="matches-header">
                <h2 className="card-title">My Growth Enabler Matches</h2>
                <button 
                  className="toggle-matches-btn" 
                  onClick={() => setShowGrowthMatches(!showGrowthMatches)}
                >
                  {showGrowthMatches ? 'Hide Matches' : 'View Matches'}
                </button>
              </div>
              {showGrowthMatches && (
                <div className="matches-table-wrapper">
                  <table className="matches-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Industry</th>
                        <th>Amount</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchesData.map((match, index) => (
                        <tr key={index} className="match-row">
                          <td className="match-data">{match.name}</td>
                          <td className="match-data">{match.location}</td>
                          <td className="match-data">{match.industry}</td>
                          <td className="match-data">{match.amount}</td>
                          <td className="match-data">
                            <div className="score-indicator-bar" style={{ width: `${match.score}%` }}></div>
                            <span className="score-value">{match.score}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Growth Enabler Dealflow */}
            <div className="dealflow-card">
              <h2 className="card-title">Dealflow</h2>
              <div className="dealflow-tracker">
                {[
                  { label: 'Application Completed', completed: true },
                  { label: 'Investors Interested', completed: true },
                  { label: 'In Progress', active: true }
                ].map((step, index) => (
                  <React.Fragment key={index}>
                    <div className={`dealflow-step ${step.completed ? 'completed-step' : ''} ${step.active ? 'active-step' : ''}`}>
                      <div className="step-icon">{step.completed ? '✓' : step.active ? '!' : index + 1}</div>
                      <div className="step-label">{step.label}</div>
                    </div>
                    {index < 2 && <div className="step-connector">→</div>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Growth Enabler Chart */}
            <div className="bar-chart-wrapper">
              <BarChart
                width={300}
                height={250}
                data={providerData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percent" fill="#754A2D" />
              </BarChart>
            </div>
          </div>

          {/* Growth Enabler Ratings */}
          <div className="ratings-card">
            <h2 className="card-title">Growth Enabler Ratings</h2>
            <div className="ratings-list">
              <div className="rating-item">
                <span className="rating-name">Partner A</span>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= 4 ? 'star filled-star' : 'star empty-star'}>★</span>
                  ))}
                </div>
              </div>
              <div className="rating-item">
                <span className="rating-name">Partner B</span>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= 3 ? 'star filled-star' : 'star empty-star'}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Purpose Partners */}
          <div className="purpose-partners-card">
            <h2 className="card-title">Purpose Partners</h2>
            
            {/* Purpose Partner Matches */}
            <div className="matches-card">
              <div className="matches-header">
                <h2 className="card-title">My Purpose Matches</h2>
                <button 
                  className="toggle-matches-btn" 
                  onClick={() => setShowPurposeMatches(!showPurposeMatches)}
                >
                  {showPurposeMatches ? 'Hide Matches' : 'View Matches'}
                </button>
              </div>
              {showPurposeMatches && (
                <div className="matches-table-wrapper">
                  <table className="matches-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Industry</th>
                        <th>Amount</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchesData.map((match, index) => (
                        <tr key={index} className="match-row">
                          <td className="match-data">{match.name}</td>
                          <td className="match-data">{match.location}</td>
                          <td className="match-data">{match.industry}</td>
                          <td className="match-data">{match.amount}</td>
                          <td className="match-data">
                            <div className="score-indicator-bar" style={{ width: `${match.score}%` }}></div>
                            <span className="score-value">{match.score}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Purpose Partner Dealflow */}
            <div className="dealflow-card">
              <h2 className="card-title">Dealflow</h2>
              <div className="dealflow-tracker">
                {[
                  { label: 'Application Completed', completed: true },
                  { label: 'Investors Interested', completed: true },
                  { label: 'In Progress', active: true }
                ].map((step, index) => (
                  <React.Fragment key={index}>
                    <div className={`dealflow-step ${step.completed ? 'completed-step' : ''} ${step.active ? 'active-step' : ''}`}>
                      <div className="step-icon">{step.completed ? '✓' : step.active ? '!' : index + 1}</div>
                      <div className="step-label">{step.label}</div>
                    </div>
                    {index < 2 && <div className="step-connector">→</div>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Purpose Partner Chart */}
            <div className="bar-chart-wrapper">
              <BarChart
                width={300}
                height={250}
                data={providerData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percent" fill="#BCAE9C" />
              </BarChart>
            </div>
          </div>

          {/* Partner Ratings */}
          <div className="ratings-card">
            <h2 className="card-title">Partner Ratings</h2>
            <div className="ratings-list">
              <div className="rating-item">
                <span className="rating-name">Partner A</span>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= 4 ? 'star filled-star' : 'star empty-star'}>★</span>
                  ))}
                </div>
              </div>
              <div className="rating-item">
                <span className="rating-name">Partner B</span>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= 3 ? 'star filled-star' : 'star empty-star'}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;