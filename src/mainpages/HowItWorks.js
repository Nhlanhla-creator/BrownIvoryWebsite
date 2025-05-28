import React, { useState } from 'react';
import { FaUserEdit, FaChartLine, FaHandshake, FaFilter, FaFileAlt, FaMoneyBillWave, FaBullseye, FaUsers, FaHandHoldingUsd, FaClipboardList, FaUserFriends, FaChartBar } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('smes');

  const renderContent = () => {
    switch (activeTab) {
      case 'investors':
        return <InvestorsContent />;
      case 'corporates':
        return <CorporatesContent />;
      case 'accelerators':
        return <AcceleratorsContent />;
      default:
        return <SMESContent />;
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Full page background */}
      <div style={styles.fullPageBackground}></div>
      
      <Header />
      
      <div style={styles.contentContainer}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroContent}>
            <h1 style={styles.mainTitle}>How BIG Marketplace Works</h1>
            <p style={styles.subTitle}>For Every Stakeholder in the SMSE Ecosystem</p>
          </div>
        </section>

        {/* Main Content Area */}
        <div style={styles.mainContentArea}>
          {/* Tab Navigation */}
          <div style={styles.tabContainer}>
            <button 
              style={activeTab === 'smes' ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab('smes')}
            >
              <FaUserEdit style={styles.tabIcon} /> For SMSEs
            </button>
            <button 
              style={activeTab === 'investors' ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab('investors')}
            >
              <FaMoneyBillWave style={styles.tabIcon} /> For Investors
            </button>
            <button 
              style={activeTab === 'corporates' ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab('corporates')}
            >
              <FaBullseye style={styles.tabIcon} /> For Corporates
            </button>
            <button 
              style={activeTab === 'accelerators' ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab('accelerators')}
            >
              <FaUsers style={styles.tabIcon} /> For Accelerators
            </button>
          </div>

          {/* Dynamic Content */}
          {renderContent()}

          {/* Trust Section */}
          <div style={styles.trustSection}>
            <p style={styles.trustText}>Trusted by 50+ funders and 500+ SMEs</p>
            <div style={styles.logoGrid}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={styles.logoPlaceholder}>
                  <div style={styles.logoIcon}>🏢</div>
                  <span>Partner {i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// SMSEs Content Component
const SMESContent = () => {
  return (
    <div style={styles.contentSection}>
      <h2 style={styles.contentTitle}>Get Scored. Get Matched. Grow.</h2>
      
      {/* Main Explainer Video Section */}
      <div style={styles.mainVideoContainer}>
        <div style={styles.videoWrapper}>
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/jMoLC58LKF0" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0 }}
          ></iframe>
        </div>
      </div>
      
      <div style={styles.stepsContainer}>
        {/* Step 1 */}
        <div style={styles.stepCard}>
          <div style={styles.stepNumberCircle}>
            <span style={styles.stepNumber}>1</span>
          </div>
          <div style={styles.stepHeader}>
            <div style={styles.stepIcon}><FaUserEdit size={24} /></div>
            <h3 style={styles.stepTitle}>Create Your Profile</h3>
          </div>
          <ul style={styles.stepDetails}>
            <li>Takes 5 minutes</li>
            <li>Upload basic docs (tax, registration, pitch deck)</li>
          </ul>
        </div>

        {/* Step 2 */}
        <div style={styles.stepCard}>
          <div style={styles.stepNumberCircle}>
            <span style={styles.stepNumber}>2</span>
          </div>
          <div style={styles.stepHeader}>
            <div style={styles.stepIcon}><FaChartLine size={24} /></div>
            <h3 style={styles.stepTitle}>Get Your BIG Score</h3>
          </div>
          <ul style={styles.stepDetails}>
            <li>We analyze compliance, growth potential, and pitch quality</li>
            <li>Receive a score (0-100) + actionable feedback</li>
          </ul>
        </div>

        {/* Step 3 */}
        <div style={styles.stepCard}>
          <div style={styles.stepNumberCircle}>
            <span style={styles.stepNumber}>3</span>
          </div>
          <div style={styles.stepHeader}>
            <div style={styles.stepIcon}><FaHandshake size={24} /></div>
            <h3 style={styles.stepTitle}>Unlock Opportunities</h3>
          </div>
          <ul style={styles.stepDetails}>
            <li>Funders: See matched investors/grants</li>
            <li>Mentors: Connect with advisors to improve weak areas</li>
            <li>Programs: Apply to accelerators if score is low</li>
          </ul>
        </div>
      </div>

      <button style={styles.ctaButton}>Get Your Score Now</button>
    </div>
  );
};

// Investors Content Component
const InvestorsContent = () => {
  return (
    <div style={styles.contentSection}>
      <h2 style={styles.contentTitle}>Discover. Verify. Invest.</h2>
      
      {/* Main Explainer Video Section */}
      <div style={styles.mainVideoContainer}>
        <div style={styles.videoWrapper}>
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/jMoLC58LKF0" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0 }}
          ></iframe>
        </div>
      </div>
      
      <div style={styles.stepsContainer}>
        {/* Step 1 */}
        <div style={styles.stepCard}>
          <div style={styles.stepNumberCircle}>
            <span style={styles.stepNumber}>1</span>
          </div>
          <div style={styles.stepHeader}>
            <div style={styles.stepIcon}><FaFilter size={24} /></div>
            <h3 style={styles.stepTitle}>Set Your Criteria</h3>
          </div>
          <ul style={styles.stepDetails}>
            <li>Industry, risk level, ticket size</li>
            <li>Opt-in for auto-matched SMEs</li>
          </ul>
        </div>

        {/* Step 2 */}
        <div style={styles.stepCard}>
          <div style={styles.stepNumberCircle}>
            <span style={styles.stepNumber}>2</span>
          </div>
          <div style={styles.stepHeader}>
            <div style={styles.stepIcon}><FaFileAlt size={24} /></div>
            <h3 style={styles.stepTitle}>Review Scored Profiles</h3>
          </div>
          <ul style={styles.stepDetails}>
            <li>Filter by BIG Score, growth metrics, or compliance</li>
            <li>View SME pitch decks + score breakdowns</li>
          </ul>
        </div>

        {/* Step 3 */}
        <div style={styles.stepCard}>
          <div style={styles.stepNumberCircle}>
            <span style={styles.stepNumber}>3</span>
          </div>
          <div style={styles.stepHeader}>
            <div style={styles.stepIcon}><FaMoneyBillWave size={24} /></div>
            <h3 style={styles.stepTitle}>Connect & Fund</h3>
          </div>
          <ul style={styles.stepDetails}>
            <li>Message SMEs via platform</li>
            <li>Track portfolio performance</li>
          </ul>
        </div>
      </div>

      <button style={styles.ctaButton}>Browse SMEs Now</button>
    </div>
  );
};

// Corporates Content Component
const CorporatesContent = () => {
  return (
    <div style={styles.contentSection}>
      <h2 style={styles.contentTitle}>Source. Partner. Amplify Impact.</h2>
      
      {/* Main Explainer Video Section */}
      <div style={styles.mainVideoContainer}>
        <div style={styles.videoWrapper}>
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/jMoLC58LKF0" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0 }}
          ></iframe>
        </div>
      </div>
      
      <div style={styles.stepsContainer}>
        {/* Step 1 */}
        <div style={styles.stepCard}>
          <div style={styles.stepNumberCircle}>
            <span style={styles.stepNumber}>1</span>
          </div>
          <div style={styles.stepHeader}>
            <div style={styles.stepIcon}><FaBullseye size={24} /></div>
            <h3 style={styles.stepTitle}>Define Your Goals</h3>
          </div>
          <ul style={styles.stepDetails}>
            <li>Select focus areas (e.g., women-led, green biz)</li>
          </ul>
        </div>

        {/* Step 2 */}
        <div style={styles.stepCard}>
          <div style={styles.stepNumberCircle}>
            <span style={styles.stepNumber}>2</span>
          </div>
          <div style={styles.stepHeader}>
            <div style={styles.stepIcon}><FaUsers size={24} /></div>
            <h3 style={styles.stepTitle}>Access Vetted SMEs</h3>
          </div>
          <ul style={styles.stepDetails}>
            <li>BIG Score ensures compliance and impact alignment</li>
            <li>Dashboard tracks SME progress over time</li>
          </ul>
        </div>

        {/* Step 3 */}
        <div style={styles.stepCard}>
          <div style={styles.stepNumberCircle}>
            <span style={styles.stepNumber}>3</span>
          </div>
          <div style={styles.stepHeader}>
            <div style={styles.stepIcon}><FaHandHoldingUsd size={24} /></div>
            <h3 style={styles.stepTitle}>Partner or Fund</h3>
          </div>
          <ul style={styles.stepDetails}>
            <li>Sponsor accelerators</li>
            <li>Direct contracts with high-scoring SMEs</li>
          </ul>
        </div>
      </div>

      <button style={styles.ctaButton}>Explore SMEs</button>
    </div>
  );
};

// Accelerators Content Component
const AcceleratorsContent = () => {
  return (
    <div style={styles.contentSection}>
      <h2 style={styles.contentTitle}>Identify. Nurture. Track.</h2>
      
      {/* Main Explainer Video Section */}
      <div style={styles.mainVideoContainer}>
        <div style={styles.videoWrapper}>
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/jMoLC58LKF0" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0 }}
          ></iframe>
        </div>
      </div>
      
      <div style={styles.stepsContainer}>
        {/* Step 1 */}
        <div style={styles.stepCard}>
          <div style={styles.stepNumberCircle}>
            <span style={styles.stepNumber}>1</span>
          </div>
          <div style={styles.stepHeader}>
            <div style={styles.stepIcon}><FaClipboardList size={24} /></div>
            <h3 style={styles.stepTitle}>List Your Program</h3>
          </div>
          <ul style={styles.stepDetails}>
            <li>Add eligibility criteria (e.g., "Scores 40-60")</li>
          </ul>
        </div>

        {/* Step 2 */}
        <div style={styles.stepCard}>
          <div style={styles.stepNumberCircle}>
            <span style={styles.stepNumber}>2</span>
          </div>
          <div style={styles.stepHeader}>
            <div style={styles.stepIcon}><FaUserFriends size={24} /></div>
            <h3 style={styles.stepTitle}>Recruit from BIG's Pipeline</h3>
          </div>
          <ul style={styles.stepDetails}>
            <li>Auto-receive applications from aligned SMEs</li>
            <li>View SME score history</li>
          </ul>
        </div>

        {/* Step 3 */}
        <div style={styles.stepCard}>
          <div style={styles.stepNumberCircle}>
            <span style={styles.stepNumber}>3</span>
          </div>
          <div style={styles.stepHeader}>
            <div style={styles.stepIcon}><FaChartBar size={24} /></div>
            <h3 style={styles.stepTitle}>Monitor Progress</h3>
          </div>
          <ul style={styles.stepDetails}>
            <li>Track SME score improvements post-program</li>
            <li>Highlight success stories to attract funders</li>
          </ul>
        </div>
      </div>

      <button style={styles.ctaButton}>Join as a Partner</button>
    </div>
  );
};

// Color palette
const colors = {
  darkBrown: '#372C27',
  mediumBrown: '#754A2D',
  lightBrown: '#9E6E3C',
  cream: '#F8F5F0',
  lightGray: '#BCAE9C',
  warmGray: '#9E8D7B',
  white: '#FFFFFF',
  checkmarkBrown: '#754A2D',
  accent: '#E67E22'
};

// Main Styles
const styles = {
  appContainer: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
     backgroundImage: 'linear-gradient(rgba(180, 168, 162, 0.85), rgba(148, 138, 133, 0.89)), url(https://wallcoveringsmart.com/cdn/shop/products/Floralivorypearloffwhitegoldmetallicappletreesbirdstexturedwallpaper.jpg?v=1674418164)',
    backgroundSize: 'cover',
  },
  fullPageBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/011/950/301/small_2x/abstract-brown-liquid-background-design-with-various-shapes-and-copy-space-area-suitable-for-posters-and-banners-free-vector.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    zIndex: -1,
    opacity: 0.5
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    position: 'relative'
  },
  heroSection: {
    position: 'relative',
    height: '350px',
    marginBottom: '40px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(55, 44, 39, 0.12)',
    backgroundImage: 'linear-gradient(rgba(55, 44, 39, 0.85), rgba(55, 44, 39, 0.85)), url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  heroContent: {
    padding: '20px',
    maxWidth: '800px',
    zIndex: 2
  },
  mainTitle: {
    fontSize: '2.8rem',
    fontWeight: '800',
    color: colors.white,
    marginBottom: '20px',
    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
    lineHeight: '1.2'
  },
  subTitle: {
    fontSize: '1.4rem',
    color: colors.lightGray,
    marginBottom: '30px',
    lineHeight: '1.5',
    fontWeight: '400'
  },
  mainContentArea: {
    backgroundColor: 'rgba(248, 245, 240, 0.9)',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  tab: {
    padding: '15px 30px',
    backgroundColor: 'transparent',
    color: colors.darkBrown,
    border: `2px solid ${colors.lightBrown}`,
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    ':hover': {
      backgroundColor: colors.lightBrown,
      color: colors.white,
      transform: 'translateY(-2px)',
      boxShadow: `0 5px 15px rgba(158, 110, 60, 0.2)`
    }
  },
  activeTab: {
    padding: '15px 30px',
    backgroundColor: colors.lightBrown,
    color: colors.white,
    border: `2px solid ${colors.lightBrown}`,
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transform: 'translateY(-2px)',
    boxShadow: `0 5px 15px rgba(158, 110, 60, 0.3)`
  },
  tabIcon: {
    fontSize: '1.2rem'
  },
  contentSection: {
    marginBottom: '60px'
  },
  contentTitle: {
    fontSize: '2.2rem',
    fontWeight: '700',
    color: colors.mediumBrown,
    textAlign: 'center',
    marginBottom: '20px',
    position: 'relative',
    ':after': {
      content: '""',
      display: 'block',
      width: '80px',
      height: '4px',
      backgroundColor: colors.lightBrown,
      margin: '15px auto',
      borderRadius: '2px'
    }
  },
  mainVideoContainer: {
    margin: '0 auto 40px',
    maxWidth: '800px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
  },
  videoWrapper: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  stepsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
    marginBottom: '50px',
  },
  stepCard: {
    backgroundColor: colors.white,
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(55, 44, 39, 0.08)',
    borderTop: `4px solid ${colors.mediumBrown}`,
    position: 'relative',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-8px)',
      boxShadow: `0 15px 30px rgba(158, 110, 60, 0.15)`
    }
  },
  stepNumberCircle: {
    position: 'absolute',
    top: '-20px',
    left: '30px',
    width: '40px',
    height: '40px',
    backgroundColor: colors.mediumBrown,
    color: colors.white,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    boxShadow: `0 4px 12px rgba(117, 74, 45, 0.3)`
  },
  stepNumber: {
    position: 'relative',
    zIndex: 1
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '15px'
  },
  stepIcon: {
    color: colors.lightBrown,
    fontSize: '1.5rem'
  },
  stepTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: colors.mediumBrown,
    margin: 0
  },
  stepDetails: {
    paddingLeft: '10px',
    color: colors.darkBrown,
    lineHeight: '1.8',
    listStyleType: 'none',
    marginBottom: '25px',
    ' li': {
      position: 'relative',
      paddingLeft: '25px',
      marginBottom: '10px',
      ':before': {
        content: '"✓"',
        position: 'absolute',
        left: 0,
        color: colors.checkmarkBrown,
        fontWeight: 'bold'
      }
    }
  },
  ctaButton: {
    display: 'block',
    margin: '0 auto',
    padding: '16px 45px',
    backgroundColor: colors.lightBrown,
    color: colors.white,
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: `0 5px 20px rgba(158, 110, 60, 0.3)`,
    ':hover': {
      backgroundColor: colors.mediumBrown,
      transform: 'translateY(-3px)',
      boxShadow: `0 8px 25px rgba(117, 74, 45, 0.4)`
    }
  },
  trustSection: {
    textAlign: 'center',
    margin: '80px 0',
    padding: '50px 0',
    backgroundColor: colors.white,
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(55, 44, 39, 0.05)'
  },
  trustText: {
    fontSize: '1.4rem',
    color: colors.mediumBrown,
    marginBottom: '30px',
    fontWeight: '600'
  },
  logoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '30px',
    marginTop: '30px',
    padding: '0 20px'
  },
  logoPlaceholder: {
    backgroundColor: colors.cream,
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    color: colors.mediumBrown,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
    boxShadow: '0 3px 10px rgba(0,0,0,0.03)',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
    }
  },
  logoIcon: {
    fontSize: '2rem'
  }
};

export default HowItWorks;