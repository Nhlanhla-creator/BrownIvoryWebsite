import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  BarChart, Home, User, FileText, Search, MessageSquare, Settings, 
  LogOut, ChevronDown, ChevronRight, ChevronLeft,
  Briefcase, Handshake, ShoppingCart, Wrench, Calendar,
  CreditCard, FileBox, Users, Building, CircleDollarSign,
  BookOpen, Mail, Menu, X, HelpCircle, PenTool
} from "lucide-react";

import "./Sidebar.css";

// Custom Funding Icon
const FundingIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const Sidebar = ({ companyName = "Company Name" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeItem, setActiveItem] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Load collapsed state from localStorage on component mount
  useEffect(() => {
    const savedCollapsedState = localStorage.getItem("sidebarCollapsed");
    if (savedCollapsedState !== null) {
      setIsCollapsed(JSON.parse(savedCollapsedState));
    }
  }, []);

  // Save collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
    
    // Add/remove class to the body to adjust main content
    if (isCollapsed) {
      document.body.classList.add("sidebar-collapsed");
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
  }, [isCollapsed]);

  // Update active menu based on current path
  useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);

    // Close other menus when navigating to a new section
    const newExpandedMenus = {};
    
    // Find which menu should be expanded based on current path
    Object.keys(menuItems).forEach((key) => {
      const item = menuItems[key];
      if (
        item.hasSubmenu &&
        item.subItems.some((sub) => sub.route === path)
      ) {
        newExpandedMenus[item.id] = true;
      }
    });
    
    setExpandedMenus(newExpandedMenus);
  }, [location]);

  const menuItems = [
    { id: "home", label: "Home", icon: <Home size={18} />, route: "/HomePage" },
    {
      id: "dashboard",
      label: "My Big Score",
      icon: <BarChart size={18} />,
      route: "/dashboard",
    },
    {
      id: "profile",
      label: "My Profile",
      icon: <User size={18} />,
      route: "/profile",
    },
    {
      id: "applications",
      label: "My Applications",
      icon: <Briefcase size={18} />,
      route: "/applications",
      hasSubmenu: true,
      subItems: [
        {
          id: "funding-applications",
          label: "Funding & Support",
          icon: <FundingIcon size={16} />,
          route: "/applications/funding",
        },
        {
          id: "product-applications",
          label: "Products & Services",
          icon: <ShoppingCart size={16} />,
          route: "/applications/product",
        },
      ],
    },
    {
      id: "matches",
      label: "My Matches",
      icon: <Handshake size={18} />,
      route: "/matches",
      hasSubmenu: true,
      subItems: [
        {
          id: "funder-matches",
          label: "Funders",
          icon: <CircleDollarSign size={16} />,
          route: "/funding-matches",
        },
        {
          id: "support-matches",
          label: "Support Programs",
          icon: <HelpCircle size={16} />,
          route: "/support-program-matches",
        },
        {
          id: "customer-matches",
          label: "Customers",
          icon: <Users size={16} />,
          route: "/customer-matches",
        },
        {
          id: "supplier-matches",
          label: "Suppliers",
          icon: <Building size={16} />,
          route: "/supplier-matches",
        },
      ],
    },
    {
      id: "growth-tools",
      label: "My Growth Tools",
      icon: <Wrench size={18} />,
      route: "/growth",
    },
    {
      id: "documents",
      label: "My Documents",
      icon: <FileBox size={18} />,
      route: "/my-documents",
    },
    {
      id: "messages",
      label: "My Messages",
      icon: <Mail size={18} />,
      route: "/messages",
    },
    {
      id: "calendar",
      label: "My Calendar",
      icon: <Calendar size={18} />,
      route: "/calendar",
    },
    {
      id: "billing",
      label: "Billing & Payments",
      icon: <CreditCard size={18} />,
      route: "/billing",
      hasSubmenu: true,
      subItems: [
        {
          id: "billing-info",
          label: "Billing Information",
          icon: <FileText size={16} />,
          route: "/billing/info",
        },
        {
          id: "subscriptions",
          label: "Subscriptions",
          icon: <BookOpen size={16} />,
          route: "/billing/subscriptions",
        },
        {
          id: "tool-orders",
          label: "Growth Tool Orders",
          icon: <PenTool size={16} />,
          route: "/billing/growth-tools-orders",
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={18} />,
      route: "/settings",
    },
  ];

  const handleItemClick = (item) => {
    if (item.hasSubmenu) {
      // Close all other menus when opening a new one
      const newExpandedMenus = {};
      
      // Toggle the clicked menu
      newExpandedMenus[item.id] = !expandedMenus[item.id];
      
      setExpandedMenus(newExpandedMenus);
    } else {
      navigate(item.route);
      setActiveItem(item.route);
      
      // On mobile or when collapsed, auto-collapse the sidebar after navigation
      if (window.innerWidth <= 768) {
        setIsCollapsed(true); 
      }
    }
  };

  const handleSubItemClick = (subItem, e) => {
    e.stopPropagation();
    navigate(subItem.route);
    setActiveItem(subItem.route);
    
    // On mobile, auto-collapse the sidebar after navigation
    if (window.innerWidth <= 768) {
      setIsCollapsed(true);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Toggle Button - Visible only on small screens */}
      <div className={`sidebar-mobile-toggle ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <button onClick={toggleSidebar}>
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Toggle Button */}
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </div>
        
        {/* Header */}
        <div className="company-header">
          {!isCollapsed && (
            <div className="company-info">
              <div className="company-name">{companyName}</div>
              <div className="dashboard-title">SMSE Dashboard</div>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="menu-container">
          <ul className="menu">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`
                  ${activeItem === item.route ? "active" : ""}
                  ${item.hasSubmenu ? "has-submenu" : ""}
                  ${item.hasSubmenu && expandedMenus[item.id] ? "expanded" : ""}
                `}
                onClick={() => handleItemClick(item)}
              >
                <div className="menu-item-wrapper">
                  <div className="menu-icon-container">{item.icon}</div>
                  {!isCollapsed && (
                    <>
                      <span className="menu-label">{item.label}</span>
                      {item.hasSubmenu && (
                        <span className="submenu-toggle">
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

                {/* Show tooltip when collapsed */}
                {isCollapsed && (
                  <div className="sidebar-tooltip">
                    {item.label}
                  </div>
                )}

                {item.hasSubmenu && expandedMenus[item.id] && !isCollapsed && (
                  <ul className="submenu">
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.id}
                        className={activeItem === subItem.route ? "active" : ""}
                        onClick={(e) => handleSubItemClick(subItem, e)}
                      >
                        <div className="submenu-icon">{subItem.icon}</div>
                        <span className="submenu-label">{subItem.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <div className="logout-section" onClick={() => navigate("/auth")}>
          <div className="menu-icon-container">
            <LogOut size={18} />
          </div>
          {!isCollapsed && <span className="menu-label">Logout</span>}
        </div>
      </div>
    </>
  );
};

export default Sidebar;