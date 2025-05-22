import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Mail,
  Calendar,
  ChevronDown,
  Settings,
  LogOut,
  User,
  HelpCircle
} from "lucide-react";
import styles from "./InvestorHeader.module.css";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

function InvestorHeader({ companyName, profileImage, setProfileImage }) {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "opportunity",
      message: "New investment opportunity matching your criteria",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "update",
      message: "Portfolio company X has published a quarterly report",
      time: "1 day ago",
      read: false
    },
    {
      id: 3,
      type: "message",
      message: "You have a new message from ABC Ventures",
      time: "3 days ago",
      read: true
    }
  ]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => setDropdownOpen(!dropdownOpen);
  const handleNotificationClick = () => setNotificationsOpen(!notificationsOpen);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
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

  const unreadCount = notifications.filter(n => !n.read).length;
  const userName = user ? user.displayName || user.email.split('@')[0] : "User";
  const userEmail = user ? user.email : "";

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  if (loading) {
    return <div className={styles.loading}>Loading user data...</div>;
  }

  if (!user) {
    return <div className={styles.notSignedIn}>Please sign in</div>;
  }

  return (
    <header className={styles.header}>
      <div className={styles["header-left"]}>
        <div className={styles["header-logo"]}>
          <img 
            src="/PrimaryLogo.jpg" 
            alt="Company Logo" 
            className={styles["logo-image"]}
          />
        </div>
        
        <div className={styles["welcome-container"]}>
          <h1 className={styles["welcome-message"]}>
            Welcome back, <span className={styles["user-name"]}>{userName}</span>
          </h1>
          <div className={styles["date-display"]}>
            <Calendar size={14} className={styles["calendar-icon"]} />
            {formattedDate}
          </div>
        </div>
      </div>


      <div className={styles["header-right"]}>
        <div className={styles["header-icons"]}>
          <div className={styles["icon-wrapper"]} ref={notificationRef}>
            <button
              className={`${styles["icon-button"]} ${notificationsOpen ? styles.active : ''}`}
              onClick={handleNotificationClick}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className={styles["notification-badge"]}>{unreadCount}</span>
              )}
            </button>

            {notificationsOpen && (
              <div className={styles["dropdown-menu"]}>
                <div className={styles["dropdown-header"]}>
                  <h3>Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className={styles["mark-read-button"]}>
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className={styles["dropdown-divider"]}></div>
                <div className={styles["notifications-list"]}>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`${styles["notification-item"]} ${!notification.read ? styles.unread : ''}`}
                      >
                        <div className={`${styles["notification-icon"]} ${styles[notification.type]}`}></div>
                        <div className={styles["notification-content"]}>
                          <p className={styles["notification-text"]}>{notification.message}</p>
                          <p className={styles["notification-time"]}>{notification.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={styles["no-notifications"]}>No notifications</p>
                  )}
                </div>
                <div className={styles["dropdown-footer"]}>
                  <button onClick={() => navigate('/investor-notifications')}>View all notifications</button>
                </div>
              </div>
            )}
          </div>

          <div className={styles["icon-wrapper"]}>
            <button
              className={styles["icon-button"]}
              aria-label="Messages"
              onClick={() => navigate('/investor-messages')}
            >
              <Mail size={20} />
            </button>
          </div>
        </div>

        <div className={styles["profile-wrapper"]} ref={dropdownRef}>
          <button 
            className={styles["profile-button"]}
            onClick={handleProfileClick}
          >
            <div className={styles["profile-image-container"]}>
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className={styles["profile-image"]} 
                />
              ) : (
                <div className={styles["profile-placeholder"]}>
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </button>

          {dropdownOpen && (
            <div className={styles["dropdown-menu"]}>
              <div className={styles["dropdown-header"]}>
                <div className={styles["profile-info-large"]}>
                  <div className={styles["profile-image-large"]}>
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" />
                    ) : (
                      <div className={styles["profile-placeholder-large"]}>
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <label htmlFor="profile-upload" className={styles["change-avatar-button"]}>
                      Change
                      <input
                        id="profile-upload"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className={styles["profile-name-large"]}>{userName}</h3>
                    <p className={styles["profile-email-large"]}>{userEmail}</p>
                    <p className={styles["profile-role"]}>{companyName || "Company Name"}</p>
                  </div>
                </div>
              </div>
              <div className={styles["dropdown-divider"]}></div>
              <div className={styles["dropdown-menu-items"]}>
                <button className={styles["dropdown-item"]} onClick={() => navigate('/investor-profile')}>
                  <User size={16} />
                  <span>My Profile</span>
                </button>
                <button className={styles["dropdown-item"]} onClick={() => navigate('/investor-settings')}>
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button className={styles["dropdown-item"]} onClick={() => navigate('/help')}>
                  <HelpCircle size={16} />
                  <span>Help & Support</span>
                </button>
              </div>
              <div className={styles["dropdown-divider"]}></div>
              <div className={styles["dropdown-footer"]}>
                <button className={styles["logout-button"]} onClick={handleLogout}>
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
}

export default InvestorHeader;