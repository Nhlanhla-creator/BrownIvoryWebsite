import React from 'react';
import FormField from './FormField';
import { bbeeLevels, ownershipTypes } from './applicationOptions';
import "./ProductApplication.css";

const MatchingPreferences = ({ data = {}, updateData }) => {
  const formData = {
    bbeeLevel: '',
    ownershipPrefs: [],
    sectorExperience: '',
    ...data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ ...formData, [name]: value });
  };

  const handleOwnershipChange = (type) => {
    const currentValues = formData.ownershipPrefs || [];
    const updatedValues = currentValues.includes(type)
      ? currentValues.filter(t => t !== type)
      : [...currentValues, type];
    
    updateData({ ...formData, ownershipPrefs: updatedValues });
  };

  return (
    <div className="matching-preferences-form">
      <h2>Matching Preferences</h2>
      
      <FormField label="Preferred B-BBEE Level">
        <select
          name="bbeeLevel"
          value={formData.bbeeLevel || ''}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select level</option>
          {bbeeLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Ownership Preferences">
        <div className="checkbox-grid">
          {ownershipTypes.map(type => (
            <label key={type} className="checkbox-item">
              <input
                type="checkbox"
                checked={formData.ownershipPrefs?.includes(type) || false}
                onChange={() => handleOwnershipChange(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Sector Experience Required">
        <textarea
          name="sectorExperience"
          value={formData.sectorExperience || ''}
          onChange={handleChange}
          className="form-textarea"
          rows={3}
        />
      </FormField>
    </div>
  );
};

export default MatchingPreferences;