import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import ApplicationSummary from './ApplicationSummary'; // Import the ApplicationSummary component
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    industry: '',
    website: '',
    services: ''
  });
  const [isEditMode, setIsEditMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const profileRef = doc(db, 'businessProfile', auth.currentUser.uid, 'profileData', 'details');
        const docSnap = await getDoc(profileRef);
        
        if (docSnap.exists()) {
          setFormData(docSnap.data());
          setIsEditMode(false);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!auth.currentUser) {
      setError('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Save to businessProfile/{userId}/profileData/details
      const profileRef = doc(db, 'businessProfile', auth.currentUser.uid, 'profileData', 'details');
      await setDoc(profileRef, {
        ...formData,
        userId: auth.currentUser.uid, // Store user ID for reference
        email: auth.currentUser.email, // Store user email
        lastUpdated: new Date() // Add timestamp
      });
      
      setSuccessMessage('Profile saved successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        setIsEditMode(false);
      }, 3000);
      
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    setIsEditMode(true);
  };

  if (loading) {
    return <div className="profile-page">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h2>Company Profile</h2>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

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
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
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
      <ApplicationSummary /> {/* Include the ApplicationSummary component here */}
    </div>
  );
};

export default Profile;