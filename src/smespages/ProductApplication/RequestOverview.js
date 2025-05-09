import React from "react";
import FormField from "./FormField";
import { engagementTypes, deliveryModes, africanCountries } from "./applicationOptions";
import "./ProductApplication.css";

const RequestOverview = ({ data = {}, updateData }) => {
  // Initialize with default values
  const formData = {
    purpose: '',
    engagementType: '',
    deliveryModes: [],
    startDate: '',
    endDate: '',
    location: '',
    minBudget: '',
    maxBudget: '',
    esdProgram: null,
    ...data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (field, value) => {
    const currentValues = formData[field] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    updateData({
      ...formData,
      [field]: newValues
    });
  };

  const handleRadioChange = (value) => {
    updateData({
      ...formData,
      esdProgram: value === 'yes'
    });
  };

  return (
    <div className="request-overview-form">
      <h2>Request Overview</h2>

      {/* Purpose Textarea */}
      <FormField label="Purpose of Request" required>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="form-textarea large"
          rows={4}
        />
      </FormField>

      <div className="grid-container">
        {/* Engagement Type Dropdown */}
        <FormField label="Type of Engagement" required>
          <select
            name="engagementType"
            value={formData.engagementType}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select engagement type</option>
            {engagementTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </FormField>

        {/* Delivery Mode Checkboxes */}
        <FormField label="Preferred Delivery Mode" required>
          <div className="checkbox-group">
            {deliveryModes.map(mode => (
              <label key={mode} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.deliveryModes.includes(mode)}
                  onChange={() => handleCheckboxChange('deliveryModes', mode)}
                />
                {mode}
              </label>
            ))}
          </div>
        </FormField>

        {/* Date Inputs */}
        <FormField label="Start Date" required>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="form-input"
            min={new Date().toISOString().split('T')[0]}
          />
        </FormField>

        <FormField label="End Date" required>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="form-input"
            min={formData.startDate || new Date().toISOString().split('T')[0]}
          />
        </FormField>

        {/* Location Dropdown */}
        <FormField label="Location" required>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select country</option>
            {africanCountries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </FormField>

        {/* Budget Inputs */}
        <FormField label="Budget Range (ZAR)" required>
          <div className="flex-row">
            <input
              type="number"
              name="minBudget"
              value={formData.minBudget}
              onChange={handleChange}
              placeholder="Min"
              className="form-input"
              min="0"
            />
            <span className="mx-2">to</span>
            <input
              type="number"
              name="maxBudget"
              value={formData.maxBudget}
              onChange={handleChange}
              placeholder="Max"
              className="form-input"
              min={formData.minBudget || "0"}
            />
          </div>
        </FormField>

        {/* Radio Buttons */}
        <FormField label="Linked to ESD/CSR Program?">
          <div className="radio-group">
            <label className="radio-item">
              <input
                type="radio"
                name="esdProgram"
                checked={formData.esdProgram === true}
                onChange={() => handleRadioChange('yes')}
              />
              Yes
            </label>
            <label className="radio-item">
              <input
                type="radio"
                name="esdProgram"
                checked={formData.esdProgram === false}
                onChange={() => handleRadioChange('no')}
              />
              No
            </label>
          </div>
        </FormField>
      </div>
    </div>
  );
};

export default RequestOverview;