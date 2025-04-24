import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { 
  CheckCircle, AlertCircle, Loader2, ChevronRight, ChevronLeft, 
  HelpCircle, LifeBuoy, ArrowUp, ArrowDown, Minus, 
  ChevronDown, ChevronUp, Menu, X, Settings, User, 
  FileText, BarChart2, DollarSign, Shield, Mail, LogOut 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const africanCountries = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon', 
  'Central African Republic', 'Chad', 'Comoros', 'Congo', 'DR Congo', 'Djibouti', 'Egypt', 
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 
  'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 
  'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 
  'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 
  'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
];


const businessStages = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Growth', 'Mature'];
const profitabilityStatuses = ['Profitable', 'Break-even', 'Pre-revenue', 'Loss-making'];
const bbbeeLevels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Non-compliant'];
const businessModels = [
  'B2B', 'B2C', 'B2B2C', 'Marketplace', 'Subscription', 'Freemium', 
  'SaaS', 'PaaS', 'IaaS', 'E-commerce', 'Direct Sales', 'Franchise', 'Other'
];

const steps = [
  'Profile Form',
  'Company Overview',
  'Ownership & Compliance',
  'Financial Information',
  'Operational Information',
  'Pitch & Market',
  'Optional Dual Role',
  'Done',
];

const stepContent = {
  'Profile Form': {
    fields: [
      { name: 'companyName', label: 'Company Name', type: 'text', required: true },
      { name: 'registrationNumber', label: 'Registration Number', type: 'text', required: true },
      { name: 'country', label: 'Country of Operation', type: 'select', options: africanCountries, required: true },
      { name: 'industry', label: 'Industry Sector', type: 'select', options: [
        'Agriculture', 'Technology', 'Finance', 'Healthcare', 'Education', 
        'Manufacturing', 'Retail', 'Energy', 'Transportation', 'Construction', 'Other'
      ], required: true },
      { name: 'website', label: 'Website / Social Media Links', type: 'url' },
      { name: 'languages', label: 'Languages for Communication',type: 'text', required: true },
    ],
    description: 'Basic information about your company'
  },
  'Company Overview': {
    fields: [
      { name: 'description', label: 'Company Description', type: 'textarea', required: true },
      { name: 'businessModel', label: 'Business Model', type: 'combobox', options: businessModels, required: true },
      { name: 'stage', label: 'Stage of Business', type: 'select', options: businessStages, required: true },
      { name: 'targetMarket', label: 'Target Market/Geography', type: 'text', required: true },
      { name: 'products', label: 'Key Products/Services', type: 'textarea', required: true }
    ],
    description: 'Detailed overview of your business'
  },
  'Ownership & Compliance': {
    fields: [
      { name: 'ownershipStructure', label: 'Ownership Structure', type: 'textarea', required: true },
      { name: 'bbbeeStatus', label: 'B-BBEE Status', type: 'combobox', options: bbbeeLevels, required: true },
      { name: 'taxClearance', label: 'Tax Clearance Certificate', type: 'file', required: true },
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
      { name: 'numEmployees', label: 'Number of Employees', type: 'number', required: true },
      { name: 'keyTeamMembers', label: 'Key Team Members (roles & bios)', type: 'textarea', required: true },
      { name: 'operationalMetrics', label: 'Key Operational Metrics', type: 'textarea' },
      { name: 'supplyChainPartners', label: 'Supply Chain Partners', type: 'textarea' }
    ],
    description: 'Team and operational details'
  },
  'Pitch & Market': {
    fields: [
      { name: 'pitchDeck', label: 'Pitch Deck (upload)', type: 'file', required: true },
      { name: 'marketSize', label: 'Market Size & Opportunity', type: 'textarea', required: true },
      { name: 'competitorLandscape', label: 'Competitor Landscape', type: 'textarea' },
      { name: 'tractionMetrics', label: 'Traction Metrics', type: 'textarea' }
    ],
    description: 'Market opportunity and competitive positioning'
  },
  'Optional Dual Role': {
    fields: [
      { name: 'optInServiceProvider', label: 'Opt-in as Service Provider?', type: 'checkbox' },
      { name: 'servicesOffered', label: 'Services Offered', type: 'textarea' },
      { name: 'serviceCaseStudies', label: 'Service Case Studies (upload)', type: 'file' }
    ],
    description: 'Optional service provider information'
  },
  'Done': {
    fields: [],
    description: 'All sections completed successfully'
  }
};

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState('Profile Form');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [showStepInfo, setShowStepInfo] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();

  const statBlocks = [
    { label: 'Total Matched Funders', route: '/TotalMatchedFunders', value: 18, trend: 'up', change: '+3' },
    { label: 'Applications Sent', route: '/ApplicationsSent', value: 12, trend: 'neutral', change: '0' },
    { label: 'Pending Applications', route: '/PendingApplications', value: 3, trend: 'down', change: '-1' },
    { label: 'Funder Interest Received', route: '/FunderInterestReceived', value: 5, trend: 'up', change: '+2' },
    { label: 'Meetings Scheduled', route: '/MeetingsScheduled', value: 2, trend: 'up', change: '+1' },
    { label: 'Feedback Received', route: '/FeedbackReceived', value: 4, trend: 'neutral', change: '0' },
    { label: 'Compliance Status', route: '/ComplianceStatus', value: '80%', trend: 'up', change: '+5%' },
    { label: 'BIG Score Summary', route: '/BIGScoreSummary', value: '75%', trend: 'up', change: '+3%' }
  ];

  const toggleDropdown = (fieldName) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : 
                type === 'file' ? e.target.files[0] : 
                value;
    setFormData(prev => ({ ...prev, [name]: val }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectOption = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setOpenDropdowns(prev => ({ ...prev, [fieldName]: false }));
    
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleMultiselectOption = (fieldName, value) => {
    const currentValues = Array.isArray(formData[fieldName]) ? formData[fieldName] : [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setFormData(prev => ({ ...prev, [fieldName]: newValues }));
    
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const currentFields = stepContent[currentStep].fields;
    const newErrors = {};
    
    currentFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setSaveStatus('Saving...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('Saved successfully');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      setSaveStatus('Error saving data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (!validateForm()) return;
    
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      setShowStepInfo(false);
    }
  };

  const handlePrev = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      setShowStepInfo(false);
    }
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
    setShowStepInfo(true);
  };

  const renderInputField = (field) => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            className={`form-input ${errors[field.name] ? 'error' : ''}`}
            rows="4"
          />
        );
      case 'select':
        return (
          <div className="custom-select">
            <div 
              className={`select-header ${errors[field.name] ? 'error' : ''}`}
              onClick={() => toggleDropdown(field.name)}
            >
              <span>{formData[field.name] || 'Select an option'}</span>
              {openDropdowns[field.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {openDropdowns[field.name] && (
              <div className="select-options">
                {field.options.map(opt => (
                  <div 
                    key={opt} 
                    className={`option ${formData[field.name] === opt ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(field.name, opt)}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'combobox':
        return (
          <div className="custom-select">
            <div 
              className={`select-header ${errors[field.name] ? 'error' : ''}`}
              onClick={() => toggleDropdown(field.name)}
            >
              <span>{formData[field.name] || 'Select or type'}</span>
              {openDropdowns[field.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {openDropdowns[field.name] && (
              <div className="select-options">
                <input
                  type="text"
                  placeholder="Type to search..."
                  className="combobox-search"
                  onClick={(e) => e.stopPropagation()}
                />
                {field.options.map(opt => (
                  <div 
                    key={opt} 
                    className={`option ${formData[field.name] === opt ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(field.name, opt)}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'multiselect':
        return (
          <div className="custom-multiselect">
            <div 
              className={`select-header ${errors[field.name] ? 'error' : ''}`}
              onClick={() => toggleDropdown(field.name)}
            >
              <div className="selected-values">
                {Array.isArray(formData[field.name]) && formData[field.name].length > 0 
                  ? formData[field.name].join(', ') 
                  : 'Select options'}
              </div>
              {openDropdowns[field.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {openDropdowns[field.name] && (
              <div className="select-options">
                {field.options.map(opt => (
                  <div 
                    key={opt} 
                    className={`option ${Array.isArray(formData[field.name]) && formData[field.name].includes(opt) ? 'selected' : ''}`}
                    onClick={() => handleMultiselectOption(field.name, opt)}
                  >
                    <input
                      type="checkbox"
                      checked={Array.isArray(formData[field.name]) && formData[field.name].includes(opt)}
                      readOnly
                    />
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'file':
        return (
          <div className="file-upload">
            <input
              type="file"
              name={field.name}
              onChange={handleInputChange}
              className={`form-input ${errors[field.name] ? 'error' : ''}`}
            />
            {formData[field.name] && (
              <span className="file-name">{formData[field.name].name}</span>
            )}
          </div>
        );
      case 'checkbox':
        return (
          <label className="checkbox-container">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleInputChange}
            />
            <span className="checkmark"></span>
          </label>
        );
      default:
        return (
          <input
            type={field.type || 'text'}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            className={`form-input ${errors[field.name] ? 'error' : ''}`}
          />
        );
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome to Your SME Dashboard</h1>
          <p className="subtitle">Manage your funding applications and business profile</p>
        </div>
        <div className="header-actions">
          <button className="btn-help">
            <HelpCircle size={18} />
            <span>Help Center</span>
          </button>
          <button className="btn-support">
            <LifeBuoy size={18} />
            <span>Settings</span>
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <div className="completion-card">
            <div className="progress-container">
              <div className="progress-circle">
                <svg className="progress-ring" viewBox="0 0 100 100">
                  <circle className="progress-ring-circle-bg" cx="50" cy="50" r="45" />
                  <circle className="progress-ring-circle" cx="50" cy="50" r="45" 
                    strokeDasharray="283" strokeDashoffset={283 * 0.25} />
                </svg>
                <div className="progress-text">75%</div>
              </div>
              <div className="progress-info">
                <h3>Profile Completion</h3>
                <p>Complete all sections to improve your funding chances</p>
                <button className="btn-view-details">View Details</button>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            {statBlocks.map((block, index) => (
              <div
                key={index}
                className={`stat-block ${block.trend}`}
                onClick={() => navigate(block.route)}
              >
                <div className="stat-content">
                  <h3>{block.label}</h3>
                  <div className="stat-value-container">
                    <p className="stat-value">{block.value}</p>
                    <span className={`trend-indicator ${block.trend}`}>
                      {block.trend === 'up' ? <ArrowUp size={16} /> : 
                       block.trend === 'down' ? <ArrowDown size={16} /> : 
                       <Minus size={16} />}
                      <span className="change-value">{block.change}</span>
                    </span>
                  </div>
                </div>
                <div className="stat-footer">
                  <span>View details</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-main">
          <div className="tracker-container">
            <div className="tracker">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`tracker-step ${currentStep === step ? 'active' : ''} ${
                    steps.indexOf(currentStep) > idx ? 'completed' : ''
                  }`}
                  onClick={() => handleStepClick(step)}
                >
                  <div className="step-icon">
                    {steps.indexOf(currentStep) > idx ? (
                      <CheckCircle size={18} />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  <span>{step}</span>
                  {idx < steps.length - 1 && <div className="step-connector"></div>}
                </div>
              ))}
            </div>
          </div>

          {showStepInfo && (
            <div className="step-info-card">
              <h3>{currentStep}</h3>
              <p>{stepContent[currentStep].description}</p>
              <button 
                className="btn-close-info"
                onClick={() => setShowStepInfo(false)}
              >
                Close
              </button>
            </div>
          )}

          <div className="form-container">
            <div className="form-header">
              <div className="form-title-container">
                <h2>{currentStep}</h2>
                <span className="step-counter">
                  Step {steps.indexOf(currentStep) + 1} of {steps.length}
                </span>
              </div>
              {!showStepInfo && (
                <p className="step-description">{stepContent[currentStep].description}</p>
              )}
              <div className="status-message">
                {saveStatus && (
                  <span className={saveStatus.includes('success') ? 'success' : 'error'}>
                    {saveStatus.includes('success') ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                    {saveStatus}
                  </span>
                )}
              </div>
            </div>

            <div className="form-content">
              {stepContent[currentStep].fields.map((field, index) => (
                <div key={index} className="form-group">
                  <label>
                    {field.label}
                    {field.required && <span className="required">*</span>}
                  </label>
                  {renderInputField(field)}
                  {errors[field.name] && (
                    <p className="error-message">
                      <AlertCircle size={14} /> {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button 
                className="btn-secondary" 
                onClick={handlePrev}
                disabled={steps.indexOf(currentStep) === 0}
              >
                <ChevronLeft size={18} /> Previous
              </button>
              <div className="action-group">
                <button 
                  className="btn-outline" 
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 size={18} className="spin" /> : 'Save Draft'}
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleNext}
                  disabled={steps.indexOf(currentStep) === steps.length - 1 || isLoading}
                >
                  Next Step <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}