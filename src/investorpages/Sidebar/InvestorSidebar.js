"use client"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
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
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react"
import styles from "./InvestorSidebar.module.css"

function InvestorSidebar({ companyName }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState({})
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Load collapsed state from localStorage on component mount
  useEffect(() => {
    const savedCollapsedState = localStorage.getItem("investorSidebarCollapsed")
    if (savedCollapsedState !== null) {
      setIsCollapsed(JSON.parse(savedCollapsedState))
    }
  }, [])

  // Save collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("investorSidebarCollapsed", JSON.stringify(isCollapsed))
    
    if (isCollapsed) {
      document.body.classList.add("sidebar-collapsed")
    } else {
      document.body.classList.remove("sidebar-collapsed")
    }
  }, [isCollapsed])

  // Close submenus when navigating away from them
  useEffect(() => {
    const currentPath = location.pathname
    const newExpandedMenus = {}

    // Check which menu should remain expanded based on current path
    menuItems.forEach(item => {
      if (item.hasSubmenu) {
        const shouldStayOpen = item.subItems.some(
          subItem => currentPath === subItem.route || currentPath.startsWith(subItem.route + "/")
        )
        if (shouldStayOpen) {
          newExpandedMenus[item.id] = true
        }
      }
    })

    setExpandedMenus(newExpandedMenus)
  }, [location.pathname])

  const menuItems = [
    { id: "home", label: "Home", icon: <Home size={18} />, route: "/" },
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: <LayoutDashboard size={18} />, 
      route: "/investor-dashboard" 
    },
    { 
      id: "profile", 
      label: "Universal Profile", 
      icon: <User size={18} />, 
      route: "/investor-profile" 
    },
    { 
      id: "matches", 
      label: "Matches", 
      icon: <HeartHandshake size={18} />, 
      route: "/investor-matches" 
    },
    { 
      id: "documents", 
      label: "Documents", 
      icon: <Book size={18} />, 
      route: "/investor-documents" 
    },
    { 
      id: "messages", 
      label: "Messages", 
      icon: <MessageSquare size={18} />, 
      route: "/investor-messages" 
    },
    {
      id: "billing",
      label: "Billing & Payments",
      icon: <CreditCard size={18} />,
      route: "/investor/billing",
      hasSubmenu: true,
      subItems: [
        {
          id: "billing-info",
          label: "Billing Information",
          icon: <FileText size={16} />,
          route: "/investor/billing/info",
        },
        {
          id: "subscriptions",
          label: "Subscriptions",
          icon: <FileText size={16} />,
          route: "/investor/billing/subscriptions",
        },
        {
          id: "transactions",
          label: "Grotwth tools Orders",
          icon: <FileText size={16} />,
          route: "/investor/billing/growth-tools-orders",
        },
      ],
    },
    { 
      id: "settings", 
      label: "Settings", 
      icon: <Settings size={18} />, 
      route: "/investor-settings" 
    },
  ]

  const handleItemClick = (item) => {
    if (item.hasSubmenu) {
      // Toggle only the clicked menu, close others
      setExpandedMenus(prev => ({
        [item.id]: !prev[item.id]
      }))
    } else {
      navigate(item.route)
      
      // Close all submenus when navigating to a top-level item
      setExpandedMenus({})
      
      if (window.innerWidth <= 768) {
        setIsCollapsed(true)
      }
    }
  }

  const handleSubItemClick = (subItem, e) => {
    e.stopPropagation()
    navigate(subItem.route)
    
    if (window.innerWidth <= 768) {
      setIsCollapsed(true)
    }
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className={`${styles.mobileToggle} ${isCollapsed ? styles.collapsed : ''}`}>
        <button onClick={toggleSidebar}>
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      
      <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
        {/* Toggle Button */}
        <div className={styles.sidebarToggle} onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </div>
        
        {/* Header */}
        <div className={styles.companyHeader}>

          {!isCollapsed && (
            <div className={styles.companyInfo}>
              <div className={styles.companyName}>{companyName}</div>
              <div className={styles.dashboardTitle}>Investor Portal</div>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className={styles.menuContainer}>
          <ul className={styles.menu}>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`
                  ${styles.menuItem}
                  ${location.pathname === item.route || 
                    (item.hasSubmenu && item.subItems.some(sub => location.pathname === sub.route)) ? styles.active : ''}
                  ${item.hasSubmenu ? styles.hasSubmenu : ''}
                  ${expandedMenus[item.id] ? styles.expanded : ''}
                `}
                onClick={() => handleItemClick(item)}
              >
                <div className={styles.menuItemWrapper}>
                  <div className={styles.menuIconContainer}>{item.icon}</div>
                  {!isCollapsed && (
                    <>
                      <span className={styles.menuLabel}>{item.label}</span>
                      {item.hasSubmenu && (
                        <span className={styles.submenuToggle}>
                          {expandedMenus[item.id] ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className={styles.sidebarTooltip}>
                    {item.label}
                  </div>
                )}

                {item.hasSubmenu && expandedMenus[item.id] && !isCollapsed && (
                  <ul className={styles.submenu}>
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.id}
                        className={`${styles.submenuItem} ${location.pathname === subItem.route ? styles.active : ''}`}
                        onClick={(e) => handleSubItemClick(subItem, e)}
                      >
                        <div className={styles.submenuIcon}>{subItem.icon}</div>
                        <span className={styles.submenuLabel}>{subItem.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <div className={styles.logoutSection} onClick={() => navigate("/auth")}>
          <div className={styles.menuIconContainer}>
            <LogOut size={18} />
          </div>
          {!isCollapsed && <span className={styles.menuLabel}>Log Out</span>}
        </div>
      </div>
    </>
  )
}

export default InvestorSidebar