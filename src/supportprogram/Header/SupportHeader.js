"use client"
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./SupportProgramHeader.module.css" // You'll need to create this CSS file

function SupportProgramHeader({ companyName, profileImage, setProfileImage }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "application",
      message: "New program application received",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "update",
      message: "Beneficiary XYZ has completed milestone 2",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      type: "message",
      message: "You have a new message from a program participant",
      time: "3 days ago",
      read: true,
    },
  ])

  const fileInputRef = useRef(null)
  const dropdownRef = useRef(null)
  const notificationRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleProfileClick = () => setDropdownOpen(!dropdownOpen)
  const handleNotificationClick = () => setNotificationsOpen(!notificationsOpen)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => setProfileImage(e.target.result)
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const triggerFileInput = () => fileInputRef.current.click()

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }))
    setNotifications(updated)
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className={styles["support-header"]}>
      <div className={styles["header-left"]}>
        <h1>Support Program Portal</h1>
      </div>

      <div className={styles["header-right"]}>
        <div className={styles["search-bar"]}>
          <input type="text" placeholder="Search programs..." />
          <button className={styles["search-button"]}>
            <span>🔍</span>
          </button>
        </div>

        <div className={styles["notification-container"]} ref={notificationRef}>
          <button className={styles["notification-button"]} onClick={handleNotificationClick}>
            <span>🔔</span>
            {unreadCount > 0 && <span className={styles["notification-badge"]}>{unreadCount}</span>}
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
                        {notification.type === "application" && <span>📝</span>}
                        {notification.type === "update" && <span>📊</span>}
                        {notification.type === "message" && <span>✉️</span>}
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
                <Link to="/support-notifications">View all notifications</Link>
              </div>
            </div>
          )}
        </div>

        <div className={styles["profile-container"]} ref={dropdownRef}>
          <button className={styles["profile-button"]} onClick={handleProfileClick}>
            <div className={styles["profile-image"]}>
              {profileImage ? (
                <img src={profileImage || "/placeholder.svg"} alt="Profile" />
              ) : (
                <div className={styles["profile-placeholder"]}>{companyName.charAt(0)}</div>
              )}
            </div>
            <span className={styles["company-name"]}>{companyName}</span>
          </button>

          {dropdownOpen && (
            <div className={styles["profile-dropdown"]}>
              <ul>
                <li>
                  <Link to="/support-profile">My Profile</Link>
                </li>
                <li>
                  <Link to="/support-settings">Settings</Link>
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
  )
}

export default SupportProgramHeader
