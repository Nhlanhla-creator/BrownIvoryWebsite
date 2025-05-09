import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BarChart, Home, User, FileText, Search, MessageSquare, Settings, LogOut, ChevronDown, ChevronRight, PenToolIcon as Tool, Shield, Users, Building, HelpCircle ,Book} from "lucide-react";

import "./Sidebar.css";

// Custom Rand Icon
const RandIcon = ({ size = 16, className = "" }) => (
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
    <text
      x="7"
      y="19"
      fontSize="16"
      fontWeight="bold"
      fontFamily="sans-serif"
    >
      R
    </text>
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
      strokeWidth="1"
    />
  </svg>
);

const Sidebar = ({ companyName = "Company Name" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);

    Object.keys(menuItems).forEach((key) => {
      const item = menuItems[key];
      if (
        item.hasSubmenu &&
        item.subItems.some((sub) => sub.route === path)
      ) {
        setExpandedMenus((prev) => ({ ...prev, [item.id]: true }));
      }
    });
  }, [location]);

  const menuItems = [
    { id: "home", label: "Home", icon: <Home size={18} />, route: "/" },
    {
      id: "dashboard",
      label: "My Dashboard",
      icon: <BarChart size={18} />,
      route: "/dashboard",
    },
    {
      id: "profile",
      label: "My Universal Profile",
      icon: <User size={18} />,
      route: "/profile",
    },
    {
      id: "applications",
      label: "My Applications",
      icon: <FileText size={18} />,
      route: "/applications",
      hasSubmenu: true,
      subItems: [
     
        {
          id: "for-funders",
          label: "Funding & Support",
          icon: <RandIcon size={16} />,
          route: "/applications/funding",
        },
        {
          id: "for-customers",
          label: "Products or Service",
          icon: <Users size={16} />,
          route: "/applications/product",
        },
      ],
    },
    {
      id: "matches",
      label: "My Matches",
      icon: <Search size={18} />,
      route: "/matches",
      hasSubmenu: true,
      subItems: [
        {
          id: "customers",
          label: "Customers",
          icon: <Users size={16} />,
          route: "/matches/customers",
        },
        {
          id: "suppliers",
          label: "Suppliers",
          icon: <Building size={16} />,
          route: "/matches/suppliers",
        },
        {
          id: "funders",
          label: "Funders",
          icon: <RandIcon size={16} />,
          route: "/matches/funders",
        },
        {
          id: "support-programs",
          label: "Support Programs",
          icon: <HelpCircle size={16} />,
          route: "/matches/support",
        },
      ],
    },
    {
      id: "growth",
      label: "My Growth Tools",
      icon: <Tool size={18} />,
      route: "/Growth",
    },
    {
      id: "tools",
      label: "My Documents",
      icon: <Book size={18} />,
      route: "/tools",
    },
    
    {
      id: "messages",
      label: "Messages",
      icon: <MessageSquare size={18} />,
      route: "/messages",
    },
    {
      id: "legal",
      label: "Billing and Payments",
      icon: <RandIcon size={18} />,
      route: "/legal",
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
      setExpandedMenus((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
    } else {
      navigate(item.route);
      setActiveItem(item.route);
    }
  };

  const handleSubItemClick = (subItem, e) => {
    e.stopPropagation();
    navigate(subItem.route);
    setActiveItem(subItem.route);
  };

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="company-header">
        <div className="logo-circle">{companyName.charAt(0)}</div>
        <div className="company-info">
          <div className="company-name">{companyName}</div>
          <div className="dashboard-title">Dashboard</div>
        </div>
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
              </div>

              {item.hasSubmenu && expandedMenus[item.id] && (
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
        <span className="menu-label">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
