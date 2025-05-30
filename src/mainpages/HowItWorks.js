import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUserEdit, FaChartLine, FaHandshake, FaFilter, FaFileAlt, 
  FaMoneyBillWave, FaBullseye, FaUsers, FaHandHoldingUsd, 
  FaClipboardList, FaUserFriends, FaChartBar 
} from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const tabContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { opacity: 0, y: -20 }
};

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('smes');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleTabChange = (tab) => {
    setIsVideoLoaded(false);
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'investors':
        return <InvestorsContent isVideoLoaded={isVideoLoaded} setIsVideoLoaded={setIsVideoLoaded} />;
      case 'corporates':
        return <CorporatesContent isVideoLoaded={isVideoLoaded} setIsVideoLoaded={setIsVideoLoaded} />;
      case 'accelerators':
        return <AcceleratorsContent isVideoLoaded={isVideoLoaded} setIsVideoLoaded={setIsVideoLoaded} />;
      default:
        return <SMESContent isVideoLoaded={isVideoLoaded} setIsVideoLoaded={setIsVideoLoaded} />;
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Animated background */}
      <motion.div 
        style={styles.fullPageBackground}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      
      <Header />
      
      <div style={styles.contentContainer}>
        {/* Hero Section */}
        <motion.section 
          style={styles.heroSection}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={styles.heroContent}>
            <motion.h1 
              style={styles.mainTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              How BIG Marketplace Works
            </motion.h1>
            <motion.p 
              style={styles.subTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              For Every Stakeholder in the SMSE Ecosystem
            </motion.p>
          </div>
        </motion.section>

        {/* Main Content Area */}
        <motion.div 
          style={styles.mainContentArea}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Tab Navigation */}
          <motion.div 
            style={styles.tabContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { id: 'smes', label: 'For SMSEs', icon: <FaUserEdit style={styles.tabIcon} /> },
              { id: 'investors', label: 'For Investors', icon: <FaMoneyBillWave style={styles.tabIcon} /> },
              { id: 'corporates', label: 'For Corporates', icon: <FaBullseye style={styles.tabIcon} /> },
              { id: 'accelerators', label: 'For Accelerators', icon: <FaUsers style={styles.tabIcon} /> }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                style={activeTab === tab.id ? styles.activeTab : styles.tab}
                onClick={() => handleTabChange(tab.id)}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon} {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Dynamic Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>

          {/* Trust Section */}
          <motion.div 
            style={styles.trustSection}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4 }}
          >
            <p style={styles.trustText}>Trusted by 50+ funders and 500+ SMEs</p>
            <div style={styles.logoGrid}>
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i} 
                  style={styles.logoPlaceholder}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div style={styles.logoIcon}>🏢</div>
                  <span>Partner {i+1}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

// SMSEs Content Component
const SMESContent = ({ isVideoLoaded, setIsVideoLoaded }) => {
  return (
    <div style={styles.contentSection}>
      <motion.h2 
        style={styles.contentTitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Get Scored. Get Matched. Grow.
      </motion.h2>
      
      {/* Main Explainer Video Section */}
      <motion.div 
        style={styles.mainVideoContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div style={styles.videoWrapper}>
          {!isVideoLoaded && (
            <motion.div
              style={styles.videoPlaceholder}
              initial={{ opacity: 1 }}
              animate={{ opacity: isVideoLoaded ? 0 : 1 }}
              exit={{ opacity: 0 }}
            >
              <div style={styles.loadingSpinner}></div>
            </motion.div>
          )}
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/jMoLC58LKF0" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0 }}
            onLoad={() => setIsVideoLoaded(true)}
          />
        </div>
      </motion.div>
      
      <motion.div 
        style={styles.stepsContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Step 1 */}
        <motion.div 
          style={styles.stepCard}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
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
        </motion.div>

        {/* Step 2 */}
        <motion.div 
          style={styles.stepCard}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
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
        </motion.div>

        {/* Step 3 */}
        <motion.div 
          style={styles.stepCard}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
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
        </motion.div>
      </motion.div>

      <motion.button 
        style={styles.ctaButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Your Score Now
      </motion.button>
    </div>
  );
};

// Investors Content Component
const InvestorsContent = ({ isVideoLoaded, setIsVideoLoaded }) => {
  return (
    <div style={styles.contentSection}>
      <motion.h2 
        style={styles.contentTitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Discover. Verify. Invest.
      </motion.h2>
      
      {/* Main Explainer Video Section */}
      <motion.div 
        style={styles.mainVideoContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div style={styles.videoWrapper}>
          {!isVideoLoaded && (
            <motion.div
              style={styles.videoPlaceholder}
              initial={{ opacity: 1 }}
              animate={{ opacity: isVideoLoaded ? 0 : 1 }}
              exit={{ opacity: 0 }}
            >
              <div style={styles.loadingSpinner}></div>
            </motion.div>
          )}
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/jMoLC58LKF0" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0 }}
            onLoad={() => setIsVideoLoaded(true)}
          />
        </div>
      </motion.div>
      
      <motion.div 
        style={styles.stepsContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Step 1 */}
        <motion.div 
          style={styles.stepCard}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
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
        </motion.div>

        {/* Step 2 */}
        <motion.div 
          style={styles.stepCard}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
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
        </motion.div>

        {/* Step 3 */}
        <motion.div 
          style={styles.stepCard}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
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
        </motion.div>
      </motion.div>

      <motion.button 
        style={styles.ctaButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Browse SMEs Now
      </motion.button>
    </div>
  );
};

// Corporates Content Component
const CorporatesContent = ({ isVideoLoaded, setIsVideoLoaded }) => {
  return (
    <div style={styles.contentSection}>
      <motion.h2 
        style={styles.contentTitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Source. Partner. Amplify Impact.
      </motion.h2>
      
      {/* Main Explainer Video Section */}
      <motion.div 
        style={styles.mainVideoContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div style={styles.videoWrapper}>
          {!isVideoLoaded && (
            <motion.div
              style={styles.videoPlaceholder}
              initial={{ opacity: 1 }}
              animate={{ opacity: isVideoLoaded ? 0 : 1 }}
              exit={{ opacity: 0 }}
            >
              <div style={styles.loadingSpinner}></div>
            </motion.div>
          )}
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/jMoLC58LKF0" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0 }}
            onLoad={() => setIsVideoLoaded(true)}
          />
        </div>
      </motion.div>
      
      <motion.div 
        style={styles.stepsContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Step 1 */}
        <motion.div 
          style={styles.stepCard}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
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
        </motion.div>

        {/* Step 2 */}
        <motion.div 
          style={styles.stepCard}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
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
        </motion.div>

        {/* Step 3 */}
        <motion.div 
          style={styles.stepCard}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
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
        </motion.div>
      </motion.div>

      <motion.button 
        style={styles.ctaButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Explore SMEs
      </motion.button>
    </div>
  );
};

// Accelerators Content Component
const AcceleratorsContent = ({ isVideoLoaded, setIsVideoLoaded }) => {
  return (
    <div style={styles.contentSection}>
      <motion.h2 
        style={styles.contentTitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Identify. Nurture. Track.
      </motion.h2>
      
      {/* Main Explainer Video Section */}
      <motion.div 
        style={styles.mainVideoContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div style={styles.videoWrapper}>
          {!isVideoLoaded && (
            <motion.div
              style={styles.videoPlaceholder}
              initial={{ opacity: 1 }}
              animate={{ opacity: isVideoLoaded ? 0 : 1 }}
              exit={{ opacity: 0 }}
            >
              <div style={styles.loadingSpinner}></div>
            </motion.div>
          )}
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/jMoLC58LKF0" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0 }}
            onLoad={() => setIsVideoLoaded(true)}
          />
        </div>
      </motion.div>
      
      <motion.div 
        style={styles.stepsContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Step 1 */}
        <motion.div 
          style={styles.stepCard}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
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
        </motion.div>

        {/* Step 2 */}
        <motion.div 
          style={styles.stepCard}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
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
        </motion.div>

        {/* Step 3 */}
        <motion.div 
          style={styles.stepCard}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
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
        </motion.div>
      </motion.div>

      <motion.button 
        style={styles.ctaButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Join as a Partner
      </motion.button>
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
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(5px)'
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
    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
    position: 'relative'
  },
  videoWrapper: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  videoPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.cream,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  loadingSpinner: {
    width: '50px',
    height: '50px',
    border: `5px solid ${colors.lightBrown}`,
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
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