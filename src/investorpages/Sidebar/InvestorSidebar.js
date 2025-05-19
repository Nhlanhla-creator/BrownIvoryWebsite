"use client"
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  LayoutDashboard,
  User,
  Book,
  HeartHandshake,
  FileText,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react"
import styles from "./InvestorSidebar.module.css"

function InvestorSidebar({ companyName }) {
  const location = useLocation()
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/")

  return (
    <div className={styles.sidebar}>
      <div className={styles.companyHeader}>
        <div className={styles.logoCircle}>{companyName.charAt(0)}</div>
        <div className={styles.companyInfo}>
          <div className={styles.companyName}>{companyName}</div>
          <div className={styles.dashboardTitle}>Investor Portal</div>
        </div>
      </div>

      <div className={styles.menuContainer}>
        <ul className={styles.menu}>
          {[
            { to: "/", label: "Home", icon: <Home size={20} /> },
            { to: "/investor-dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
            { to: "/investor-profile", label: "Universal Profile", icon: <User size={20} /> },
            { to: "/investor-matches", label: "Matches", icon: <HeartHandshake size={20} /> },
            { to: "/investor-documents", label: "Documents", icon: <Book size={20} /> },
            { to: "/investor-messages", label: "Messages", icon: <MessageSquare size={20} /> },
            { to: "/investor-billing", label: "Billing & Payments", icon: <CreditCard size={20} /> },
            { to: "/investor-settings", label: "Settings", icon: <Settings size={20} /> },
          ].map((item) => (
            <li key={item.to} className={isActive(item.to) ? styles.active : ""}>
              <Link to={item.to} className={styles.menuItemWrapper}>
                <div className={styles.menuIconContainer}>{item.icon}</div>
                <span className={styles.menuLabel}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.logoutSection}>
        <LogOut size={20} style={{ marginRight: "12px" }} />
        <span>Log Out</span>
      </div>
    </div>
  )
}

export default InvestorSidebar
