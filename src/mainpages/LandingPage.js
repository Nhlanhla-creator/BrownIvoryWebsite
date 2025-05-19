import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { 
  FaArrowRight, FaHandshake, FaChartLine,
  FaUsers, FaUserTie, FaHandHoldingHeart,
  FaLightbulb, FaBullseye, FaShieldAlt,
  FaGlobeAfrica, FaMedal, FaRocket
} from 'react-icons/fa';
import { 
  MdBusiness, MdCorporateFare, MdTrendingUp 
} from 'react-icons/md';
import './LandingPage.css';

const colors = {
  primary: '#754A2D',
  primaryLight: '#9E6E3C',
  dark: '#372C27',
  light: '#F2F0E6',
  highlight: '#D4A259'
};

const LandingPage = () => {
  return (
    <div className="landing-page" style={{ 
      backgroundColor: colors.light,
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{ 
        background: `linear-gradient(rgba(55, 44, 39, 0.9), rgba(55, 44, 39, 0.9))`,
        color: colors.light,
        padding: '50px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: colors.highlight,
            color: colors.dark,
            padding: '8px 20px',
            borderRadius: '20px',
            fontWeight: 700,
            marginBottom: '20px',
            fontSize: '0.8rem',
            display: 'inline-block'
          }}>
            AFRICA'S BUSINESS CATALYST
          </div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 700,
            marginBottom: '15px'
          }}>
            <span style={{ color: colors.highlight }}>BIG</span> Marketplace
          </h1>
          <p style={{ 
            fontSize: '1rem',
            marginBottom: '30px',
            lineHeight: 1.5
          }}>
            Transforming African businesses through smart connections and growth-focused partnerships
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={primaryButtonStyle}>
              Get Started <FaArrowRight style={{ marginLeft: '8px' }} />
            </Link>
            <Link to="/demo" style={secondaryButtonStyle}>
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Who Benefits Section - Single Line */}
      <section style={{ 
        padding: '40px 20px',
        backgroundColor: colors.light,
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '30px',
          color: colors.dark
        }}>
          Who Benefits From BIG?
        </h2>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '30px'
        }}>
          <div style={benefitItemStyle}>
            <FaUsers size={16} color={colors.highlight} />
            <span>Growing SMEs</span>
          </div>
          <div style={benefitItemStyle}>
            <FaUserTie size={16} color={colors.highlight} />
            <span>Investors</span>
          </div>
          <div style={benefitItemStyle}>
            <MdCorporateFare size={16} color={colors.highlight} />
            <span>Corporates</span>
          </div>
          <div style={benefitItemStyle}>
            <FaHandHoldingHeart size={16} color={colors.highlight} />
            <span>Service Providers</span>
          </div>
        </div>
      </section>

      {/* BIG Advantage Section */}
      <section style={{ 
        padding: '50px 20px',
        backgroundColor: '#f8f8f8',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '20px',
              color: colors.dark
            }}>
              The BIG Advantage
            </h2>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: 1.5,
              marginBottom: '20px'
            }}>
              Africa's premier growth platform combining intelligent matching with comprehensive business assessment.
            </p>
            <Link to="/about" style={primaryButtonStyle}>
              Discover Our Platform <FaArrowRight style={{ marginLeft: '8px' }} />
            </Link>
          </div>
          <div style={{ 
            height: '250px',
            background: '#ddd',
            borderRadius: '8px'
          }}>
            {/* Image placeholder */}
          </div>
        </div>
      </section>

      {/* BIG Score Section */}
      <section style={{ 
        padding: '50px 20px',
        backgroundColor: colors.light,
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '20px',
              color: colors.dark
            }}>
              The BIG Score Difference
            </h2>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: 1.5,
              marginBottom: '20px'
            }}>
              Our proprietary scoring system evaluates your business across multiple dimensions to provide a clear picture of your growth potential.
            </p>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <Link to="/bigscore" style={primaryButtonStyle}>
                Learn More <FaArrowRight style={{ marginLeft: '8px' }} />
              </Link>
              <Link to="/register" style={{
                ...primaryButtonStyle,
                backgroundColor: colors.highlight,
                color: colors.dark
              }}>
                Get Your Score
              </Link>
            </div>
          </div>
          <div style={{ 
            height: '250px',
            background: '#ddd',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: `8px solid ${colors.highlight}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: 700,
              color: colors.primary,
              background: 'white'
            }}>
              87
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section style={{ 
        padding: '50px 20px',
        backgroundColor: colors.primary,
        color: colors.light,
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '40px'
        }}>
          Our Core Principles
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          <div style={principleCardStyle}>
            <div style={principleIconStyle}>
              <FaLightbulb size={30} color={colors.highlight} />
            </div>
            <h3 style={{ 
              fontSize: '1.2rem',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              Our Vision
            </h3>
            <p style={{ 
              fontSize: '0.9rem',
              lineHeight: 1.5,
              textAlign: 'center'
            }}>
              An Africa where every SME thrives through equitable access to resources and opportunities.
            </p>
          </div>
          
          <div style={principleCardStyle}>
            <div style={principleIconStyle}>
              <FaBullseye size={30} color={colors.highlight} />
            </div>
            <h3 style={{ 
              fontSize: '1.2rem',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              Our Mission
            </h3>
            <p style={{ 
              fontSize: '0.9rem',
              lineHeight: 1.5,
              textAlign: 'center'
            }}>
              To bridge Africa's $330B SME funding gap through transparent scoring and smart connections.
            </p>
          </div>
          
          <div style={principleCardStyle}>
            <div style={principleIconStyle}>
              <FaShieldAlt size={30} color={colors.highlight} />
            </div>
            <h3 style={{ 
              fontSize: '1.2rem',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              Our Promise
            </h3>
            <p style={{ 
              fontSize: '0.9rem',
              lineHeight: 1.5,
              textAlign: 'center'
            }}>
              Fair access, transparent evaluation, and continuous support for all African businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ 
        padding: '50px 20px',
        backgroundColor: colors.light,
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: `${colors.highlight}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px'
          }}>
            <FaRocket size={30} color={colors.highlight} />
          </div>
          <h2 style={{ 
            fontSize: '1.8rem',
            fontWeight: 600,
            marginBottom: '15px',
            color: colors.dark
          }}>
            Ready to Grow With BIG?
          </h2>
          <p style={{ 
            fontSize: '1rem',
            lineHeight: 1.5,
            marginBottom: '30px'
          }}>
            Join Africa's most dynamic business platform and unlock new opportunities today.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={primaryButtonStyle}>
              Register Now <FaArrowRight style={{ marginLeft: '8px' }} />
            </Link>
            <Link to="/contact" style={secondaryButtonStyle}>
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Style objects
const primaryButtonStyle = {
  backgroundColor: colors.primary,
  color: colors.light,
  padding: '10px 25px',
  borderRadius: '30px',
  fontWeight: 600,
  textDecoration: 'none',
  fontSize: '0.9rem',
  display: 'inline-flex',
  alignItems: 'center'
};

const secondaryButtonStyle = {
  backgroundColor: 'transparent',
  color: colors.primary,
  border: `1px solid ${colors.primary}`,
  padding: '10px 25px',
  borderRadius: '30px',
  fontWeight: 500,
  textDecoration: 'none',
  fontSize: '0.9rem',
  display: 'inline-flex',
  alignItems: 'center'
};

const benefitItemStyle = {
  backgroundColor: 'white',
  padding: '10px 20px',
  borderRadius: '30px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '0.9rem',
  fontWeight: 500,
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  borderLeft: `3px solid ${colors.highlight}`
};

const principleCardStyle = {
  backgroundColor: 'rgba(255,255,255,0.1)',
  padding: '30px 20px',
  borderRadius: '8px',
  textAlign: 'center'
};

const principleIconStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255,0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  border: `1px solid ${colors.highlight}`
};

export default LandingPage;