import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    email: 'contact@company.com',
    phone: '',
    notifications: true,
    marketingEmails: false,
    darkMode: false,
    language: 'en',
    timezone: 'UTC',
    twoFactorAuth: false
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Simulate loading settings
    const timer = setTimeout(() => {
      setFormData({
        ...formData,
        phone: '+1 (555) 123-4567',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Settings saved:', formData);
      setIsSaving(false);
      setSaveSuccess(true);
      
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      email: 'contact@company.com',
      phone: '+1 (555) 123-4567',
      notifications: true,
      marketingEmails: false,
      darkMode: false,
      language: 'en',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      twoFactorAuth: false
    });
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    console.log('Account deletion requested');
    // Add actual deletion logic here
  };

  return (
    <div className="settings-page with-sidebar">
      <h2>Settings</h2>
      
      <div className="settings-tabs">
        <button 
          className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Account
        </button>
        <button 
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button 
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button 
          className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="settings-form">
        {activeTab === 'account' && (
          <div className="form-section">
            <h3>Account Information</h3>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <p className="form-hint">For account recovery and security notifications</p>
            </div>
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div className="form-section">
            <h3>Notification Preferences</h3>
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={formData.notifications}
                onChange={handleInputChange}
              />
              <label htmlFor="notifications">Enable Email Notifications</label>
            </div>
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="marketingEmails"
                name="marketingEmails"
                checked={formData.marketingEmails}
                onChange={handleInputChange}
              />
              <label htmlFor="marketingEmails">Receive Marketing Emails</label>
            </div>
          </div>
        )}
        
        {activeTab === 'security' && (
          <div className="form-section">
            <h3>Security Settings</h3>
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="twoFactorAuth"
                name="twoFactorAuth"
                checked={formData.twoFactorAuth}
                onChange={handleInputChange}
              />
              <label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</label>
            </div>
            <div className="form-group">
              <label>Password</label>
              <button type="button" className="change-password-btn">
                Change Password
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'preferences' && (
          <div className="form-section">
            <h3>Appearance</h3>
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="darkMode"
                name="darkMode"
                checked={formData.darkMode}
                onChange={handleInputChange}
              />
              <label htmlFor="darkMode">Dark Mode</label>
            </div>
            
            <div className="form-group">
              <label>Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="pt">Portuguese</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Timezone</label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="CET">Central European Time (CET)</option>
              </select>
            </div>
          </div>
        )}
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={handleReset}
          >
            Reset
          </button>
          <button type="submit" className="save-btn" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          {saveSuccess && (
            <span className="save-success">✓ Settings saved successfully</span>
          )}
        </div>
      </form>
      
      <div className="danger-zone">
        <h3>Danger Zone</h3>
        <div className="danger-zone-content">
          <div className="danger-action">
            <div>
              <h4>Logout</h4>
              <p>Sign out of your account on all devices</p>
            </div>
            <button className="logout-btn">Logout</button>
          </div>
          
          <div className="danger-action">
            <div>
              <h4>Delete Account</h4>
              <p>Permanently remove your account and all data</p>
            </div>
            {showDeleteConfirm ? (
              <div className="delete-confirm">
                <p>Are you sure? This cannot be undone.</p>
                <button 
                  className="confirm-delete-btn"
                  onClick={confirmDelete}
                >
                  Confirm Delete
                </button>
                <button 
                  className="cancel-delete-btn"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                className="delete-account-btn"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;