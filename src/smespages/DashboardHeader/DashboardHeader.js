import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, Mail, Search, Calendar, ChevronDown, 
  Settings, LogOut, User, HelpCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DashboardHeader.css';
import { auth } from "../../firebaseConfig";

const Header = ({ companyName, profileImage, setProfileImage }) => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const userName = user ? user.displayName || user.email.split('@')[0] : "User";
  const userEmail = user ? user.email : "";
  
  const [date, setDate] = useState(new Date());
  const [unreadNotifications] = useState(3);
  const [unreadMessages] = useState(2);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const notificationsRef = useRef(null);
  const messagesRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Update date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle clicks outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setShowMessages(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };
  
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };
  
  // Format date
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="dashboard-header">
      <div className="header-left">
        {/* Added logo container */}
        <div className="header-logo">
          <img 
            src="/PrimaryLogo.jpg" 
            alt="Company Logo" 
            className="logo-image"
          />
        </div>
        
        <h1 className="welcome-message">
          Welcome back, <span className="user-name">{userName}</span>
          <span className="date-display">
            <Calendar size={14} className="calendar-icon" />
            {formattedDate}
          </span>
        </h1>
      </div>
      
      <div className="header-right">
        <div className="header-icons">
          <div className="icon-wrapper" ref={notificationsRef}>
            <button
              className={`icon-button ${showNotifications ? 'active' : ''}`}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessages(false);
                setShowProfileMenu(false);
              }}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="notification-badge">{unreadNotifications}</span>
              )}
            </button>
            
            {showNotifications && (
              <div className="dropdown-menu notifications-dropdown">
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  <button className="mark-read-button">Mark all as read</button>
                </div>
                <div className="dropdown-divider"></div>
                <div className="notifications-list">
                  <div className="notification-item unread">
                    <div className="notification-icon success"></div>
                    <div className="notification-content">
                      <p className="notification-text">Your profile was updated successfully</p>
                      <p className="notification-time">Just now</p>
                    </div>
                  </div>
                  <div className="notification-item unread">
                    <div className="notification-icon warning"></div>
                    <div className="notification-content">
                      <p className="notification-text">Please complete your KYC verification</p>
                      <p className="notification-time">2 hours ago</p>
                    </div>
                  </div>
                  <div className="notification-item unread">
                    <div className="notification-icon info"></div>
                    <div className="notification-content">
                      <p className="notification-text">New feature available: Document sharing</p>
                      <p className="notification-time">Yesterday</p>
                    </div>
                  </div>
                </div>
                <div className="dropdown-footer">
                  <button onClick={() => navigate('/notifications')}>View all notifications</button>
                </div>
              </div>
            )}
          </div>
          
          <div className="icon-wrapper" ref={messagesRef}>
            <button
              className={`icon-button ${showMessages ? 'active' : ''}`}
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
                setShowProfileMenu(false);
              }}
              aria-label="Messages"
            >
              <Mail size={20} />
              {unreadMessages > 0 && (
                <span className="message-badge">{unreadMessages}</span>
              )}
            </button>
            
            {showMessages && (
              <div className="dropdown-menu messages-dropdown">
                <div className="dropdown-header">
                  <h3>Messages</h3>
                  <button className="mark-read-button">Mark all as read</button>
                </div>
                <div className="dropdown-divider"></div>
                <div className="messages-list">
                  <div className="message-item unread">
                    <div className="message-avatar">
                      <img src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                    </div>
                    <div className="message-content">
                      <p className="message-sender">Support Team</p>
                      <p className="message-text">Your request has been processed...</p>
                      <p className="message-time">10 min ago</p>
                    </div>
                  </div>
                  <div className="message-item unread">
                    <div className="message-avatar">
                      <img src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
                    </div>
                    <div className="message-content">
                      <p className="message-sender">John Doe</p>
                      <p className="message-text">I've shared the document with you...</p>
                      <p className="message-time">Yesterday</p>
                    </div>
                  </div>
                </div>
                <div className="dropdown-footer">
                  <button onClick={() => navigate('/messages')}>View all messages</button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="profile-wrapper" ref={profileRef}>
          <button 
            className="profile-button profile-button-simple"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
              setShowMessages(false);
            }}
          >
            <div className="profile-image-container">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="profile-image" 
                />
              ) : (
                <div className="profile-placeholder">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </button>
          
          {showProfileMenu && (
            <div className="dropdown-menu profile-dropdown">
              <div className="dropdown-header">
                <div className="profile-info-large">
                  <div className="profile-image-large">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" />
                    ) : (
                      <div className="profile-placeholder-large">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <label htmlFor="profile-upload" className="change-avatar-button">
                      Change
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="profile-name-large">{userName}</h3>
                    <p className="profile-email-large">{userEmail}</p>
                    <p className="profile-role">{companyName || "Company Name"}</p>
                  </div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-menu-items">
                <button className="dropdown-item" onClick={() => navigate('/profile')}>
                  <User size={16} />
                  <span>My Profile</span>
                </button>
                <button className="dropdown-item" onClick={() => navigate('/settings')}>
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button className="dropdown-item" onClick={() => navigate('/help')}>
                  <HelpCircle size={16} />
                  <span>Help & Support</span>
                </button>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-footer">
                <button className="logout-button" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;