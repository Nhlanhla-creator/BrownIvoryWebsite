import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = (mode = 'login') => {
    navigate(`/LoginRegister?mode=${mode}`);
  };

  const handleNavigation = (path) => {
    if (path.startsWith('#')) {
      const element = document.getElementById(path.substring(1));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  // Styles
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.5rem', // Reduced side padding
      backgroundColor: '#FFFFFF',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
    },
    logoContainer: {
      flex: '0 0 auto',
      marginRight: '0.5rem' // Reduced from 1.5rem to move logo left
    },
    logo: {
      width: '250px',
      height: 'auto',
      maxHeight: '80px',
      cursor: 'pointer'
    },
    navContainer: {
      display: 'flex',
      flex: '1 1 auto',
      justifyContent: 'center',
      margin: '0 1rem' // Adjusted margin
    },
    nav: {
      display: 'flex',
      gap: '0.6rem'
    },
    navButton: {
      minWidth: '100px',
      padding: '0.5rem 0',
      textAlign: 'center',
      fontSize: '0.95rem'
    },
    authContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.2rem',
      flex: '0 0 auto',
      marginLeft: '0.5rem' // Adjusted margin
    },
    loginButton: {
      minWidth: '100px',
      padding: '0.5rem 0',
      textAlign: 'center',
      fontSize: '0.95rem',
      backgroundColor: '#A78B71',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    registerText: {
      color: '#808080',
      fontSize: '0.75rem',
      cursor: 'pointer',
      transition: 'color 0.2s',
      whiteSpace: 'nowrap'
    }
  };

  return (
    <header style={styles.header}>
      {/* Logo on left - now positioned slightly more to the left */}
      <div style={styles.logoContainer}>
        <picture onClick={() => handleNavigation('/')}>
          <source srcSet="/MainLogo.webp" type="image/webp" />
          <source srcSet="/MainLogo.png" type="image/png" />
          <img
            src="/logo.png"
            alt="Brown Ivory Group Logo"
            style={styles.logo}
            width="250"
            height="80"
            loading="lazy"
          />
        </picture>
      </div>

      {/* Centered Navigation */}
      <div style={styles.navContainer}>
        <nav style={styles.nav}>
          <button 
            className="nav-button"
            onClick={() => handleNavigation('/')}
            style={styles.navButton}
          >
            Home
          </button>
          
          <button 
            className="nav-button"
            onClick={() => handleNavigation('/HowItWorks')}
            style={styles.navButton}
          >
            How it works
          </button>
          
          <button 
            className="nav-button"
            onClick={() => handleNavigation('/BigScorePage')}
            style={styles.navButton}
          >
            BIG score
          </button>
          
          <button 
            className="nav-button"
            onClick={() => handleNavigation('/resources')}
            style={styles.navButton}
          >
            Resources
          </button>
          
          <button 
            className="nav-button"
            onClick={() => handleNavigation('/ContactPage')}
            style={styles.navButton}
          >
            Contact Us
          </button>
          
          <button 
            className="nav-button"
            onClick={() => handleNavigation('/FAQPage')}
            style={styles.navButton}
          >
            FAQs
          </button>
        </nav>
      </div>

      {/* Auth section on right */}
      <div style={styles.authContainer}>
        <button 
          className="login-button"
          onClick={() => handleLoginClick('login')}
          style={styles.loginButton}
        >
          Login
        </button>
        <span 
          style={styles.registerText}
          onClick={() => handleLoginClick('register')}
        >
          Not registered yet?
        </span>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .nav-button {
          background-color: #5D432C;
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .nav-button:hover {
          background-color: #372C27;
          transform: translateY(-1px);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .login-button:hover {
          background-color: #8a6d52;
          transform: translateY(-1px);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        @media (max-width: 1200px) {
          ${styles.navButton}, ${styles.loginButton} {
            min-width: 90px;
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 1024px) {
          ${styles.navButton}, ${styles.loginButton} {
            min-width: 85px;
            font-size: 0.85rem;
            padding: 0.4rem 0;
          }
          
          ${styles.logo} {
            width: 220px;
          }
        }
        
        @media (max-width: 768px) {
          ${styles.navContainer}, ${styles.authContainer} {
            display: none;
          }
          
          header {
            padding: 0.8rem;
            justify-content: center;
          }
          
          ${styles.logoContainer} {
            margin-right: 0;
          }
          
          ${styles.logo} {
            width: 200px;
            max-height: 70px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;