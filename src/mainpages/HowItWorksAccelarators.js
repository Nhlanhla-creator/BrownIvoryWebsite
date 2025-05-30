import React from 'react';
import { FaClipboardList, FaUserFriends, FaChartBar } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const HowItWorksAccelerators = () => {
  return (
    <div style={styles.appContainer}>
      <Header />

      {/* Main Content Container */}
      <div style={styles.container}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroContent}>
            <h1 style={styles.mainTitle}>How BIG Works for Accelerators</h1>
            <p style={styles.subTitle}>Identify. Nurture. Track.</p>
          </div>
        </section>

        {/* Content & Steps */}
        <div style={styles.contentContainer}>
          <h2 style={styles.contentTitle}>Supercharge Your Cohort in 3 Steps</h2>
          <p style={styles.videoTitle}>Explainer Video: "Building Stronger SMEs"</p>

          {/* Steps */}
          <div style={styles.stepsContainer}>
            {/* Step 1 */}
            <div style={styles.stepCard}>
              <div style={styles.stepCircle}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepIcon}><FaClipboardList size={32} /></div>
              </div>
              <h3 style={styles.stepTitle}>List Program</h3>
              <ul style={styles.stepDetails}>
                <li>Set eligibility criteria</li>
                <li>Define focus areas</li>
                <li>Establish timelines</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div style={styles.stepCard}>
              <div style={styles.stepCircle}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepIcon}><FaUserFriends size={32} /></div>
              </div>
              <h3 style={styles.stepTitle}>Recruit SMEs</h3>
              <ul style={styles.stepDetails}>
                <li>Auto-matched applicants</li>
                <li>View score history</li>
                <li>Assess potential</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div style={styles.stepCard}>
              <div style={styles.stepCircle}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepIcon}><FaChartBar size={32} /></div>
              </div>
              <h3 style={styles.stepTitle}>Monitor Progress</h3>
              <ul style={styles.stepDetails}>
                <li>Track improvements</li>
                <li>Generate reports</li>
                <li>Showcase success</li>
              </ul>
            </div>
          </div>

          {/* CTA Button */}
          <button style={styles.ctaButton}>Join as Partner</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Color palette matching header/footer
const colors = {
  darkBrown: '#372C27',
  mediumBrown: '#754A2D',
  lightBrown: '#9E6E3C',
  cream: '#F2F0E6',
  lightGray: '#BCAE9C',
  white: '#FFFFFF'
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    backgroundImage: 'linear-gradient(rgba(55, 44, 39, 0.21), rgba(55, 44, 39, 0.36)), url(/brown.jpg)',
    backgroundSize: 'cover',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
    backgroundColor: colors.cream,
    color: colors.darkBrown,
    flex: 1
  },
  heroSection: {
    height: '350px',
    marginBottom: '50px',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundImage: `linear-gradient(rgba(55, 44, 39, 0.8), rgba(55, 44, 39, 0.8)), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  },
  heroContent: {
    padding: '20px',
    maxWidth: '800px'
  },
  mainTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    color: colors.white,
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
  },
  subTitle: {
    fontSize: '1.5rem',
    color: colors.lightGray,
    marginBottom: '40px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
  },
  contentContainer: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  contentTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: colors.mediumBrown,
    marginBottom: '20px',
    position: 'relative',
    paddingBottom: '15px'
  },
  videoTitle: {
    fontSize: '1.2rem',
    color: colors.lightBrown,
    marginBottom: '40px',
    fontStyle: 'italic'
  },
  stepsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '30px',
    marginBottom: '50px'
  },
  stepCard: {
    flex: '1',
    minWidth: '280px',
    maxWidth: '340px',
    backgroundColor: colors.white,
    padding: '30px 20px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  stepCardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
  },
  stepCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: colors.mediumBrown,
    margin: '0 auto 25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
    boxShadow: '0 4px 10px rgba(117, 74, 45, 0.3)',
    transition: 'all 0.3s',
  },
  stepNumber: {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '5px'
  },
  stepIcon: {
    color: colors.white
  },
  stepTitle: {
    fontSize: '1.3rem',
    color: colors.mediumBrown,
    marginBottom: '20px',
    fontWeight: '600'
  },
  stepDetails: {
    textAlign: 'left',
    paddingLeft: '20px',
    listStyle: 'none',
    marginBottom: '20px'
  },
  stepDetailsLi: {
    marginBottom: '12px',
    position: 'relative',
    paddingLeft: '25px',
    lineHeight: '1.5',
  },
  stepDetailsLiBefore: {
    content: '"•"',
    position: 'absolute',
    left: '0',
    top: '0',
    color: colors.lightBrown,
    fontSize: '1.8rem',
    lineHeight: '1',
  },
  ctaButton: {
    padding: '15px 40px',
    backgroundColor: colors.lightBrown,
    color: colors.white,
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.2rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(158, 110, 60, 0.3)',
    transition: 'all 0.3s',
  },
  ctaButtonHover: {
    backgroundColor: colors.mediumBrown,
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 16px rgba(117, 74, 45, 0.4)'
  }
};

export default HowItWorksAccelerators;
