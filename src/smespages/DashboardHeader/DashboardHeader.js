import React, { useState } from 'react';
import { Bell, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DashboardHeader.css';

const Header = ({ companyName, profileImage, setProfileImage }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadNotifications] = useState(3);
  const [unreadMessages] = useState(2);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
    setIsDropdownOpen(false);
  };

  const handleMessagesClick = () => {
    navigate('/messages');
    setIsDropdownOpen(false);
  };

  const handleProfileUpdate = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    navigate('/login');
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <h1 className="welcome-text">Welcome back, {companyName || 'Valued User'}!</h1>
      
      <div className="header-right">
        <div className="icon-buttons">
          <button 
            className="icon-button notification-button"
            onClick={handleNotificationClick}
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="notification-badge">{unreadNotifications}</span>
            )}
          </button>
          
          <button 
            className="icon-button message-button"
            onClick={handleMessagesClick}
          >
            <Mail size={20} />
            {unreadMessages > 0 && (
              <span className="message-badge">{unreadMessages}</span>
            )}
          </button>
        </div>

        <div className="profile-section">
          <div className="profile-dropdown-container">
            <label htmlFor="profile-upload" className="profile-image-container">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-placeholder">
                  {companyName?.charAt(0)?.toUpperCase() || '?'}
                </div>
              )}
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>

            <button 
              className="dropdown-chevron"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-label="Toggle profile menu"
            >
              {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {isDropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-profile-image">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" />
                    ) : (
                      <div className="dropdown-placeholder">
                        {companyName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    )}
                  </div>
                  <div className="dropdown-profile-info">
                    <h3>{companyName || 'Your Company'}</h3>
                    <p>contact@company.com</p>
                  </div>
                </div>
                
                <div className="dropdown-menu">
                  <button 
                    className="dropdown-item"
                    onClick={handleProfileUpdate}
                  >
                    Update Profile
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={handleSettingsClick}
                  >
                    Notification Settings
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;