import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/LoginRegister');
  };

  const handleNavigation = (path) => {
    if (path.startsWith('#')) {
      // Handle internal page anchor links
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  // Inline styles for the main elements
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
    },
    buttonGroup: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center',
    }
  };

  return (
    <>
      {/* CSS for pseudo-classes */}
      <style>
        {`
          .logo-container:hover {
            transform: scale(1.03);
            transition: transform 0.3s ease;
          }
          
          .nav-button {
            text-decoration: none;
            color: #FFFFFF;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            position: relative;
            padding: 0.6rem 1.5rem;
            border-radius: 6px;
            background-color: #5D432C;
            border: none;
            cursor: pointer;
            overflow: hidden;
          }
          
          .nav-button:hover {
            background-color: #372C27;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }
          
          .nav-button:active {
            transform: translateY(0);
          }
          
          .nav-button::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #F2F0E6;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease;
          }
          
          .nav-button:hover::after {
            transform: scaleX(1);
            transform-origin: left;
          }
          
          .login-button {
            background: none;
            color: #372C27;
            border: none;
            padding: 0.7rem 1.4rem;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            border-radius: 6px;
            transition: all 0.3s ease;
          }
          
          .login-button:hover {
            color: #9E6E3C;
            background-color: rgba(158, 110, 60, 0.1);
            transform: translateY(-2px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .login-button:active {
            transform: translateY(0);
          }
          
          .get-started-button {
            background-color: #754A2D;
            color: #FFFFFF;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 700;
            font-size: 1rem;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(117, 74, 45, 0.2);
          }
          
          .get-started-button:hover {
            background-color: #9E6E3C;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(117, 74, 45, 0.3);
          }
          
          .get-started-button:active {
            transform: translateY(0);
          }
          
          @media (max-width: 1024px) {
            .nav {
              gap: 0.5rem;
            }
          }
          
          @media (max-width: 768px) {
            .button-group {
              display: none;
            }
          }
        `}
      </style>

      <header style={styles.header}>
        <div style={styles.logoContainer} className="logo-container">
          <img 
            src='/PrimaryLogo.jpg' 
            alt="Brown Ivory Group Logo" 
            style={styles.logo} 
            onClick={() => handleNavigation('/')} 
          />
        </div>
        <nav style={styles.nav} className="nav">
          <button 
            className="nav-button"
            onClick={() => handleNavigation('/')}
          >
            Home
          </button>
          
          <button 
            className="nav-button"
            onClick={() => handleNavigation('/HowItWorks')}
          >
            How it works
          </button>
          
          <button 
            className="nav-button"
            onClick={() => handleNavigation('/BigScorePage')}
          >
            BIG score
          </button>
          
          <button 
            className="nav-button"
            onClick={() => handleNavigation('/resources')}
          >
            Resources
          </button>
          
          <button 
            className="nav-button"
            onClick={() => handleNavigation('#footer-contact')}
          >
            Contact Us
          </button>
        </nav>
        <div style={styles.buttonGroup} className="button-group">
          <button className="login-button" onClick={handleLoginClick}>Login</button>
          <button className="get-started-button">Get Started</button>
        </div>
      </header>
    </>
  );
};

export default Header;
