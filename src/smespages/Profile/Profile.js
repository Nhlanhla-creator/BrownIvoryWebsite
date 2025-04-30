import React, { useState, useEffect } from 'react';
import './Profile.css';

const africanCountries = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon',
  'Central African Republic', 'Chad', 'Comoros', 'Congo', 'DR Congo', 'Djibouti', 'Egypt',
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea',
  'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi',
  'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria',
  'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia',
  'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
];

const Profile = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    industry: '',
    website: '',
    services: ''
  });
  const [isEditMode, setIsEditMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('companyProfile');
    if (saved) {
      setFormData(JSON.parse(saved));
      setIsEditMode(false); // Show summary on return
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('companyProfile', JSON.stringify(formData));
    window.location.href = '/dashboard';
  };

  const handleUpdate = () => {
    setIsEditMode(true);
  };

  return (
    <div className="profile-page">
      <h2>Company Profile</h2>
      <p className="profile-description">
        {isEditMode
          ? 'Complete or update your company profile'
          : 'Here is your saved company profile summary'}
      </p>

      {isEditMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h3>Basic Information</h3>

            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Country of Operation</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a country</option>
                {africanCountries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Industry Sector</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an industry</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Mining">Mining</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div className="form-group">
              <label>Website / Social Media Links</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://yourcompany.com"
              />
            </div>

            <div className="form-group">
              <label>What are you looking for?</label>
              <select
                name="services"
                value={formData.services}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an option</option>
                <option value="Funding">Funding</option>
                <option value="Growth Enablers">Growth Enablers</option>
                <option value="Investor">Investor</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="summary-card">
          <p><strong>Company Name:</strong> {formData.companyName}</p>
          <p><strong>Country:</strong> {formData.country}</p>
          <p><strong>Industry:</strong> {formData.industry}</p>
          <p><strong>Website:</strong> <a href={formData.website} target="_blank" rel="noreferrer">{formData.website}</a></p>
          <p><strong>Looking for:</strong> {formData.services}</p>
          <div className="form-actions">
            <button className="save-btn" onClick={handleUpdate}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
