import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLoginClick = () => {
    navigate('/AuthForm');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleServiceClick = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img 
          src='/PrimaryLogo.jpg' 
          alt="Brown Ivory Group Logo" 
          style={styles.logo} 
          onClick={handleHomeClick} 
        />
      </div>
      <nav style={styles.nav}>
        <button 
          style={styles.link} 
          onClick={handleHomeClick} 
        >
          Home
        </button>
        
        {/* How it works link */}
        <button 
          style={styles.link}
          onClick={() => handleNavClick('/how-it-works')}
        >
          How it works
        </button>
        
        {/* BIG score link */}
        <button 
          style={styles.link}
          onClick={() => handleNavClick('/BigScorePage')}
        >
          BIG score
        </button>
        
        {/* Resources dropdown */}
        <div 
          style={styles.dropdownContainer}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button style={{
            ...styles.link,
            ...(showDropdown ? styles.linkActive : {})
          }}>
            Resources
          </button>
          {showDropdown && (
            <div style={styles.dropdown}>
              <button 
                style={styles.dropdownItem}
                onClick={() => handleServiceClick('/SMEFunding')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F2F0E6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                SME Funding
              </button>
              <button 
                style={styles.dropdownItem}
                onClick={() => handleServiceClick('/ServiceProvider')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F2F0E6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Service Provider
              </button>
              <button 
                style={styles.dropdownItem}
                onClick={() => handleServiceClick('/PurposePartner')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F2F0E6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Purpose Partner
              </button>
              <button 
                style={styles.dropdownItem}
                onClick={() => handleServiceClick('/Investors')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F2F0E6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Investors
              </button>
              <button 
                style={styles.dropdownItem}
                onClick={() => handleServiceClick('/GrowthEnabler')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F2F0E6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Growth Enabler
              </button>
              <button 
                style={styles.dropdownItem}
                onClick={() => handleServiceClick('/Solutions')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F2F0E6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Solutions
              </button>
            </div>
          )}
        </div>
        
        {/* Contact Us link */}
        <button 
          style={styles.link}
          onClick={() => handleNavClick('/contact-us')}
        >
          Contact Us
        </button>
      </nav>
      <div style={styles.buttonGroup}>
        <button style={styles.login} onClick={handleLoginClick}>Login</button>
        <button style={styles.getStarted}>Get Started</button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 3rem',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
    boxSizing: 'border-box'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'scale(1.03)',
    },
    cursor: 'pointer'
  },
  logo: {
    height: 'auto',
    width: '220px',
    maxHeight: '80px',
    objectFit: 'contain',
  },
  nav: {
    display: 'flex',
    gap: '0.5rem',
    position: 'relative',
    '@media (max-width: 1024px)': {
      gap: '0.5rem'
    }
  },
  link: {
    textDecoration: 'none',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    padding: '0.6rem 1.5rem',
    borderRadius: '6px',
    backgroundColor: '#5D432C',
    border: 'none',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#372C27',
      transform: 'translateY(-2px)',
    },
  },
  linkActive: {
    backgroundColor: '#372C27',
    transform: 'translateY(-2px)',
  },
  dropdownContainer: {
    position: 'relative',
    display: 'inline-block'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#FFFFFF',
    minWidth: '200px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    borderRadius: '6px',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 0',
    animation: 'fadeIn 0.3s ease-in-out'
  },
  dropdownItem: {
    color: '#372C27',
    padding: '0.8rem 1.5rem',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'left',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#F2F0E6',
      color: '#754A2D',
      transform: 'translateX(5px)'
    }
  },
  buttonGroup: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  login: {
    background: 'none',
    color: '#372C27',
    border: 'none',
    padding: '0.7rem 1.4rem',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    ':hover': {
      color: '#9E6E3C',
      backgroundColor: 'rgba(158, 110, 60, 0.1)',
      transform: 'translateY(-2px)',
    },
  },
  getStarted: {
    backgroundColor: '#754A2D',
    color: '#FFFFFF',
    border: 'none',
    padding: '0.8rem 2rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '1rem',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(117, 74, 45, 0.2)',
    ':hover': {
      backgroundColor: '#9E6E3C',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(117, 74, 45, 0.3)',
    },
  },
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(-10px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  }
};

export default Header;
