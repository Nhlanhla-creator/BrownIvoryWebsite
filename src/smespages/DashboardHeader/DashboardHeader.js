import React, { useState } from 'react';
import { Bell, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DashboardHeader.css';
import { auth } from "../../firebaseConfig";

const Header = ({ companyName, profileImage, setProfileImage }) => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const userName = user ? user.email : "User";

  const [unreadNotifications] = useState(3);
  const [unreadMessages] = useState(2);
  const [hoverNotifications, setHoverNotifications] = useState(false);
  const [hoverMessages, setHoverMessages] = useState(false);

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

  return (
    <header className="header">
      <h1 className="welcome-text">Welcome back, {userName}!</h1>
      <div className="header-right">
        <div className="icon-buttons">
          <button
            className="icon-button notification-button"
            onClick={() => navigate('/notifications')}
            onMouseEnter={() => setHoverNotifications(true)}
            onMouseLeave={() => setHoverNotifications(false)}
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="notification-badge">{unreadNotifications}</span>
            )}
            {hoverNotifications && (
              <div className="dropdown-preview">
                <p>You have {unreadNotifications} new notifications.</p>
                <ul>
                  <li>Notification placeholder 1</li>
                  <li>Notification placeholder 2</li>
                  <li>Notification placeholder 3</li>
                </ul>
              </div>
            )}
          </button>

          <button
            className="icon-button message-button"
            onClick={() => navigate('/messages')}
            onMouseEnter={() => setHoverMessages(true)}
            onMouseLeave={() => setHoverMessages(false)}
          >
            <Mail size={20} />
            {unreadMessages > 0 && (
              <span className="message-badge">{unreadMessages}</span>
            )}
            {hoverMessages && (
              <div className="dropdown-preview">
                <p>You have {unreadMessages} new messages.</p>
                <ul>
                  <li>Message placeholder 1</li>
                  <li>Message placeholder 2</li>
                </ul>
              </div>
            )}
          </button>
        </div>

        <div className="profile-section">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
