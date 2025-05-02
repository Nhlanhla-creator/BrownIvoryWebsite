import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './Application.css'; // Optional: use styles from your form

const steps = [
  'Company Overview',
  'Ownership & Compliance',
  'Financial Due Diligence',
  'Operational Due Diligence',
  'Pitch & Market'
];

// Define the fields you want to display for each step
const stepContent = {
  'Company Overview': ['companyDescription', 'businessModel', 'stageOfBusiness', 'targetMarket', 'keyProducts'],
  'Ownership & Compliance': ['ownershipStructure', 'bbbeeStatus', 'taxClearance', 'registrationNumber', 'registrationDoc', 'directorIds', 'shareholderCerts'],
  'Financial Due Diligence': ['annualRevenue', 'profitabilityStatus', 'fundingRound', 'askAmount', 'useOfFunds', 'financialStatements', 'accountingSoftware'],
  'Operational Due Diligence': ['keyPartners', 'keyActivities', 'revenueStreams', 'keyResources', 'valueProposition', 'channels', 'costStructure', 'customerSegments', 'customerRelationships'],
  'Pitch & Market': ['pitchDeck']
};

const formatSectionName = (name) => {
  return name.replace(/\s+/g, '');
};

const ApplicationSummary = () => {
  const [applicationData, setApplicationData] = useState({});
  const [loading, setLoading] = useState(true);

  const loadAllApplicationData = async () => {
    try {
      const data = {};
      for (const step of steps) {
        const docName = formatSectionName(step);
        const docRef = doc(db, 'SMEs', auth.currentUser.uid, 'application', docName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          data[step] = docSnap.data();
        }
      }
      setApplicationData(data);
    } catch (err) {
      console.error('Error fetching application data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllApplicationData();
  }, []);

  if (loading) return <div>Loading application summary...</div>;

  return (
    <div className="application-summary">
      <h2>Application Summary</h2>
      {steps.map((step) => {
        const sectionData = applicationData[step];
        if (!sectionData) return null;

        return (
          <div key={step} className="application-section">
            <h3>{step}</h3>
            <ul>
              {stepContent[step].map((field) => {
                const value = sectionData[field];
                const fileName = sectionData[`${field}_filename`];

                return (
                  <li key={field}>
                    <strong>{field}:</strong>{' '}
                    {typeof value === 'string' && value.startsWith('https://') ? (
                      <a href={value} target="_blank" rel="noopener noreferrer">
                        {fileName || 'View File'}
                      </a>
                    ) : (
                      <span>{value || 'Not provided'}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationSummary;
