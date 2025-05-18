import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Briefcase,
  BarChart2,
  Mail,
  Search
} from "lucide-react";
import styles from "./InvestorHeader.module.css";
import {auth} from "../../firebaseConfig"
function InvestorHeader({ companyName, profileImage, setProfileImage }) {
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
const user = auth.currentUser
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

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

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "opportunity":
        return <Briefcase size={18} />;
      case "update":
        return <BarChart2 size={18} />;
      case "message":
        return <Mail size={18} />;
      default:
        return null;
    }
  };

  return (
    <header className={styles["investor-header"]}>
      <div className={styles["header-left"]}>
        <h1>Investor {user.email || "x"}</h1>
      </div>

      <div className={styles["header-right"]}>
        <div className={styles["search-bar"]}>
          <input type="text" placeholder="Search ..." />
          <button className={styles["search-button"]}>
            <Search size={18} />
          </button>
        </div>

        <div className={styles["notification-container"]} ref={notificationRef}>
          <button className={styles["notification-button"]} onClick={handleNotificationClick}>
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className={styles["notification-badge"]}>{unreadCount}</span>
            )}
          </button>

          {notificationsOpen && (
            <div className={styles["notification-dropdown"]}>
              <div className={styles["notification-header"]}>
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className={styles["mark-read-button"]}>
                    Mark all as read
                  </button>
                )}
              </div>

              <div className={styles["notification-list"]}>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`${styles["notification-item"]} ${!notification.read ? styles["unread"] : ""}`}
                    >
                      <div className={styles["notification-icon"]}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className={styles["notification-content"]}>
                        <p>{notification.message}</p>
                        <span className={styles["notification-time"]}>{notification.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles["no-notifications"]}>No notifications</p>
                )}
              </div>

              <div className={styles["notification-footer"]}>
                <Link to="/investor-notifications">View all notifications</Link>
              </div>
            </div>
          )}
        </div>

        <div className={styles["profile-container"]} ref={dropdownRef}>
          <button className={styles["profile-button"]} onClick={handleProfileClick}>
            <div className={styles["profile-image"]}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <div className={styles["profile-placeholder"]}>
                  {companyName.charAt(0)}
                </div>
              )}
            </div>
            <span className={styles["company-name"]}>{companyName}</span>
          </button>

          {dropdownOpen && (
            <div className={styles["profile-dropdown"]}>
              <ul>
                <li>
                  <Link to="/investor-profile">My Profile</Link>
                </li>
                <li>
                  <Link to="/investor-settings">Settings</Link>
                </li>
                <li>
                  <button onClick={triggerFileInput}>Change Profile Picture</button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                </li>
                <li className={styles["divider"]}></li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default InvestorHeader;
