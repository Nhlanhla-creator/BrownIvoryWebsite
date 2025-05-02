import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth, storage } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Application.css';

const Application = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState('Company Overview');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pitchEvaluation, setPitchEvaluation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Business model options
  const businessModels = [
    'Manufacturer', 'Retailer', 'E-commerce', 'Private Label / White Label',
    'Consulting / Agency', 'Freemium', 'Subscription', 'Pay-Per-Use', 'Time-Based Billing',
    'Marketplace', 'Two-Sided Platform', 'Peer-to-Peer (P2P)', 'Aggregator',
    'Licensing', 'Franchise', 'Patent Licensing',
    'SaaS (Software as a Service)', 'PaaS / IaaS', 'Open-Source + Support', 'Data Monetization',
    'Brokerage', 'Lending / Credit', 'Leasing', 'Crowdfunding',
    'Razor and Blade', 'Freemium-to-Paid Upgrade', 'Pay-What-You-Want', 'Usage-Based Pricing', 'Circular Economy',
    'Other'
  ];

  // Business stage options
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
    'Exit Stage (e.g. Acquisition / IPO)'
  ];

  // B-BBEE Status options
  const bbbeeStatuses = [
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

  // Profitability statuses
  const profitabilityStatuses = [
    'Pre-Revenue',
    'Break-Even',
    'Profitable',
    'Loss-Making'
  ];

  const steps = [
    'Company Overview',
    'Ownership & Compliance',
    'Financial Due Diligence',
    'Operational Due Diligence',
    'Pitch & Market'
  ];

  const stepDescriptions = {
    'Company Overview': [
      "• Provide a clear and compelling description of your company's purpose and vision",
      "• Define your target market with as much specificity as possible",
      "• Highlight your key products/services and what makes them unique"
    ],
    'Ownership & Compliance': [
      "• Detail your company's ownership structure and equity distribution",
      "• Upload all required legal documents for verification",
      "• Ensure registration numbers match official records",
      "• Include identification for all directors and major shareholders"
    ],
    'Financial Due Diligence': [
      "• Report accurate financial figures from your most recent fiscal year",
      "• Be transparent about your current profitability status",
      "• Specify the type of funding round you're currently pursuing",
      "• Clearly articulate how you will use the requested funds",
      "• Upload complete financial statements for the past 2-3 years"
    ],
    'Operational Due Diligence': [
      "• Identify key partners that contribute to your business success",
      "• Describe the core activities that drive your operations",
      "• Outline all revenue streams and their relative importance",
      "• List critical resources required for business continuity",
      "• Articulate your unique value proposition clearly",
      "• Explain your customer acquisition and distribution channels",
      "• Provide insight into your cost structure and major expenses",
      "• Define your target customer segments precisely",
      "• Describe how you maintain relationships with customers"
    ],
    'Pitch & Market': [
      "• Upload a comprehensive pitch deck (PDF format preferred)",
      "• Ensure your deck includes: Problem statement, Solution, Market size, Business model,, and Ask",
      "• Our AI will evaluate your pitch on key dimensions and provide feedback",
      "• You'll receive a detailed scorecard with improvement suggestions",
      "• You may revise and resubmit based on the feedback before final submission"
    ]
  };

  const stepContent = {
    'Company Overview': {
    
      fields: [
        { name: 'companyDescription', label: 'Company Description', type: 'textarea', required: true },
        { name: 'businessModel', label: 'Business Model', type: 'select', options: businessModels, required: true },
        { name: 'stageOfBusiness', label: 'Stage of Business', type: 'select', options: businessStages, required: true },
        { name: 'targetMarket', label: 'Target Market/Geography', type: 'text', required: true },
        { name: 'keyProducts', label: 'Key Products/Services', type: 'textarea', required: true }
      ]
    },
    'Ownership & Compliance': {
      
      fields: [
        { name: 'ownershipStructure', label: 'Ownership Structure', type: 'textarea', required: true },
        { name: 'bbbeeStatus', label: 'B-BBEE Status', type: 'select', options: bbbeeStatuses, required: true },
        { name: 'taxClearance', label: 'Tax Clearance Certificate', type: 'file', required: true },
        { name: 'registrationNumber', label: 'Registration Number', type: 'text', required: true },
        { name: 'registrationDoc', label: 'Company Registration Document', type: 'file', required: true },
        { name: 'directorIds', label: 'Director IDs', type: 'file', required: true },
        { name: 'shareholderCerts', label: 'Shareholder Certificates', type: 'file' }
      ]
    },
    'Financial Due Diligence': {
      
      fields: [
        { name: 'annualRevenue', label: 'Annual Revenue (Last FY)', type: 'number', required: true },
        { name: 'profitabilityStatus', label: 'Profitability Status', type: 'select', options: profitabilityStatuses, required: true },
        { name: 'fundingRound', label: 'Current Funding Round', type: 'select', options: businessStages, required: true },
        { name: 'askAmount', label: 'Ask Amount (Funding Required)', type: 'number', required: true },
        { name: 'useOfFunds', label: 'Use of Funds (breakdown %)', type: 'textarea', required: true },
        { name: 'financialStatements', label: 'Financial Statements (upload)', type: 'file', required: true },
        { name: 'accountingSoftware', label: 'Accounting Software Used', type: 'text' }
      ]
    },
    'Operational Due Diligence': {
      
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
      ]
    },
    'Pitch & Market': {
     
      fields: [
        { name: 'pitchDeck', label: 'Pitch Deck (PDF, PPT, or DOCX)', type: 'file', required: true, accept: '.pdf,.ppt,.pptx,.doc,.docx' }
      ]
    }
  };

  const formatSectionName = (name) => {
    return name.replace(/\s+/g, '');
  };

  const uploadFile = async (file, fieldName) => {
    if (!file) return null;
    
    try {
      const fileRef = ref(storage, `SMEs/${auth.currentUser.uid}/application/${fieldName}/${file.name}`);
      await uploadBytes(fileRef, file);
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  // Load application data from Firestore
  const loadApplicationData = async () => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const loadedData = {};
      
      for (const step of steps) {
        const docName = formatSectionName(step);
        const docRef = doc(db, 'SMEs', auth.currentUser.uid, 'application', docName);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          loadedData[docName] = docSnap.data();
        }
      }

      // Merge all sections into formData
      setFormData(prev => ({
        ...prev,
        ...Object.values(loadedData).reduce((acc, section) => ({ ...acc, ...section }), {})
      }));

    } catch (err) {
      console.error('Error loading application data:', err);
      setError('Failed to load application data');
    } finally {
      setLoading(false);
    }
  };

  // Save section data to Firestore
  const saveSectionToFirestore = async (sectionName) => {
    if (!auth.currentUser) return;
  
    try {
      const sectionData = {};
      const fields = stepContent[sectionName].fields;
  
      for (const field of fields) {
        const fieldValue = formData[field.name];
  
        if (fieldValue !== undefined) {
          if (field.type === 'file') {
            if (fieldValue instanceof File) {
              const fileUrl = await uploadFile(fieldValue, field.name);
              if (fileUrl) {
                sectionData[field.name] = fileUrl;
                sectionData[`${field.name}_filename`] = fieldValue.name;
              }
            } else if (typeof fieldValue === 'string') {
              // Already a URL, no need to upload
              sectionData[field.name] = fieldValue;
            }
          } else {
            sectionData[field.name] = fieldValue;
          }
        }
      }
  
      const docName = formatSectionName(sectionName);
      const docRef = doc(db, 'SMEs', auth.currentUser.uid, 'application', docName);
      await setDoc(docRef, sectionData);
  
    } catch (error) {
      console.error(`Error saving ${sectionName} data:`, error);
      setError(`Failed to save ${sectionName} data`);
    }
  };
  

  useEffect(() => {
    loadApplicationData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateStep = () => {
    const currentFields = stepContent[activeStep].fields;
    const newErrors = {};
    
    currentFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = 'This field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    try {
      await saveSectionToFirestore(activeStep);
      
      const currentIndex = steps.indexOf(activeStep);
      if (currentIndex < steps.length - 1) {
        setActiveStep(steps[currentIndex + 1]);
      }
    } catch (err) {
      console.error('Error saving section:', err);
      setError('Failed to save section');
    }
  };

  const handleBack = () => {
    const currentIndex = steps.indexOf(activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1]);
    }
  };

  const evaluatePitch = () => {
    setIsEvaluating(true);
    
    setTimeout(() => {
      const scores = [/* your score calculation */];
      const totalScore = scores.reduce((sum, item) => sum + (item.score * item.weight / 100), 0);
      
      setPitchEvaluation({
        scores,
        totalScore,
        recommendations: [/* your recommendations */]
      });
      setIsEvaluating(false);
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    if (activeStep === 'Pitch & Market' && !pitchEvaluation) {
      evaluatePitch();
      return;
    }

    setIsSubmitting(true);
    
    try {
      await saveSectionToFirestore(activeStep);
      
      const appStatusRef = doc(db, 'SMEs', auth.currentUser.uid, 'application', 'status');
      await setDoc(appStatusRef, {
        status: 'submitted',
        submittedAt: new Date(),
        completedSections: steps.map(step => formatSectionName(step))
      }, { merge: true });

      navigate('/dashboard?application=submitted');
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = async () => {
    try {
      await saveSectionToFirestore(activeStep);
      alert('Draft saved successfully!');
    } catch (err) {
      console.error('Error saving draft:', err);
      alert('Failed to save draft');
    }
  };

  // renderField function remains the same
  const renderField = (field) => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            rows={4}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className={errors[field.name] ? 'error' : ''}
          />
        );
      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className={errors[field.name] ? 'error' : ''}
          >
            <option value="">Select an option</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'file':
        return (
          <div className="file-upload">
            <input
              type="file"
              name={field.name}
              onChange={handleChange}
              className={errors[field.name] ? 'error' : ''}
              accept={field.accept}
            />
            {formData[field.name] && (
              <div className="file-name">
                Selected: {formData[field.name].name || formData[`${field.name}_filename`]}
              </div>
            )}
          </div>
        );
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className={errors[field.name] ? 'error' : ''}
          />
        );
    }
  };

  return (
    <div className="application-page">
      {/* Loading indicator */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading your application...</p>
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}

      <div className="application-header">
        <h2>Investment Application</h2>
        <p className="application-description">
          Complete all sections to submit your application for funding consideration.
        </p>
      </div>

      <div className="application-tracker-container">
        <div className="application-tracker">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div 
                className={`tracker-step ${activeStep === step ? 'active' : ''}`}
                onClick={() => setActiveStep(step)}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-name">{step}</div>
              </div>
              {index < steps.length - 1 && <div className="step-connector" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="step-content-container">
        <div className="step-content">
          <div className="step-header">
            <h3>{activeStep}</h3>
            <p className="step-description">{stepContent[activeStep]?.description}</p>
            <div className="step-requirements">
              <h4>Key Requirements:</h4>
              <ul>
                {stepDescriptions[activeStep].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <form className="application-form">
            {stepContent[activeStep]?.fields.map((field) => (
              <div key={field.name} className="form-field">
                <label>
                  {field.label}
                  {field.required && <span className="required">*</span>}
                </label>
                {renderField(field)}
                {errors[field.name] && <p className="error-message">{errors[field.name]}</p>}
              </div>
            ))}

            {activeStep === 'Pitch & Market' && pitchEvaluation && (
              <div className="pitch-evaluation">
                <div className="evaluation-header">
                  <h4>Pitch Evaluation Results</h4>
                  <div className="overall-score">
                    <div className="total-score-display">
                      <span className="score-number">{pitchEvaluation.totalScore.toFixed(0)}</span>
                      <span className="score-divider">/</span>
                      <span className="score-total">100</span>
                    </div>
                    <div className="score-description">Overall Pitch Score</div>
                  </div>
                </div>
                
                <div className="score-breakdown">
                  <h5>Detailed Breakdown:</h5>
                  {pitchEvaluation.scores.map((item, index) => (
                    <div key={index} className="score-item">
                      <div className="score-info">
                        <span className="score-name">{item.name}</span>
                        <span className="score-percentage">{item.score}/100</span>
                      </div>
                      <div className="score-description">{item.description}</div>
                      <div className="score-bar">
                        <div 
                          className="bar-fill" 
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="recommendations">
                  <h5>Recommendations:</h5>
                  <div className="recommendation-content">
                    {pitchEvaluation.recommendations.map((rec, i) => (
                      <p key={i}>{rec}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isEvaluating && (
              <div className="evaluation-loading">
                <div className="spinner"></div>
                <p>Analyzing your pitch deck...</p>
              </div>
            )}

            <div className="form-actions">
              <div className="left-actions">
                <button type="button" className="save-draft-btn" onClick={saveDraft}>
                  Save Draft
                </button>
              </div>
              <div className="right-actions">
                {steps.indexOf(activeStep) > 0 && (
                  <button type="button" className="back-btn" onClick={handleBack}>
                    Back
                  </button>
                )}
                <button 
                  type="button" 
                  className="next-btn" 
                  onClick={activeStep === 'Pitch & Market' && !pitchEvaluation ? evaluatePitch : 
                           activeStep === 'Pitch & Market' && pitchEvaluation ? handleSubmit : handleNext}
                  disabled={isSubmitting || isEvaluating}
                >
                  {isSubmitting ? 'Submitting...' : 
                   isEvaluating ? 'Analyzing...' :
                   activeStep === 'Pitch & Market' && !pitchEvaluation ? 'Evaluate Pitch' :
                   activeStep === 'Pitch & Market' && pitchEvaluation ? 'Submit Application' : 'Continue'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Application;