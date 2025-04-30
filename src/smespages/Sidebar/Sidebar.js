import React from 'react';
import './Sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  FileText,
  Search,
  DollarSign,
  BarChart2,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react';

const Sidebar = ({ companyName = "Company Name" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} />, route: '/dashboard' },
    { id: 'profile', label: 'Profile', icon: <User size={18} />, route: '/profile' },
    { id: 'application', label: 'Application', icon: <FileText size={18} />, route: '/application' },
    { id: 'find-matches', label: 'View Matches', icon: <Search size={18} />, route: '/find-matches' },
    { id: 'investor', label: 'Investor', icon: <DollarSign size={18} />, route: '/investor' },
    { id: 'growth-enabler', label: 'Growth Enabler', icon: <BarChart2 size={18} />, route: '/growth' },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} />, route: '/messages' },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} />, route: '/settings' },
  ];

  return (
    <div className="sidebar">
      {/* Company Header Section */}
      <div className="company-header">
        <div className="company-info">
          <div className="company-name">{companyName}</div>
          <div className="dashboard-title">Dashboard</div>
        </div>
      </div>
      
      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => navigate(item.route)}
            className={location.pathname === item.route ? 'active' : ''}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </li>
        ))}
      </ul>
      
      <div className="logout-section" onClick={() => navigate('/auth')}>
        <span className="menu-icon"><LogOut size={18} /></span>
        <span className="menu-label">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;