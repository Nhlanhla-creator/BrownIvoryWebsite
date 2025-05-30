import React from 'react';
import { FaBullseye, FaUsers, FaHandHoldingUsd } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const HowItWorksCorporates = () => {
  return (
    <div style={styles.appContainer}>
      <Header />
      
      <div style={styles.container}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroContent}>
            <h1 style={styles.mainTitle}>How BIG Works for Corporates</h1>
            <p style={styles.subTitle}>Source. Partner. Amplify Impact.</p>
          </div>
        </section>

        {/* Steps Section */}
        <div style={styles.contentContainer}>
          <h2 style={styles.contentTitle}>Meet Your CSI Goals in 3 Steps</h2>
          <p style={styles.videoTitle}>Explainer Video: "Strategic Partnerships"</p>
          
          <div style={styles.stepsContainer}>
            {/* Step 1 */}
            <div style={styles.stepCard}>
              <div style={styles.stepCircle}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepIcon}><FaBullseye size={32} /></div>
              </div>
              <h3 style={styles.stepTitle}>Define Goals</h3>
              <ul style={styles.stepDetails}>
                <li>Select focus areas</li>
                <li>Set impact targets</li>
                <li>Choose industries</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div style={styles.stepCard}>
              <div style={styles.stepCircle}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepIcon}><FaUsers size={32} /></div>
              </div>
              <h3 style={styles.stepTitle}>Access Vetted SMEs</h3>
              <ul style={styles.stepDetails}>
                <li>BIG Score verification</li>
                <li>Impact alignment</li>
                <li>Dashboard tracking</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div style={styles.stepCard}>
              <div style={styles.stepCircle}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepIcon}><FaHandHoldingUsd size={32} /></div>
              </div>
              <h3 style={styles.stepTitle}>Partner or Fund</h3>
              <ul style={styles.stepDetails}>
                <li>Sponsor programs</li>
                <li>Direct contracts</li>
                <li>Supplier development</li>
              </ul>
            </div>
          </div>

          <button style={styles.ctaButton}>Explore SMEs</button>
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
    backgroundImage: 'linear-gradient(rgba(55, 44, 39, 0.21), rgba(55, 44, 39, 0.36)), url(/brown.jpg)',
    backgroundSize: 'cover',
  },
  container: {
    fontFamily: "'Arial', sans-serif",
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: colors.cream,
    color: colors.darkBrown,
    flex: '1'
  },
  heroSection: {
    height: '300px',
    marginBottom: '40px',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundImage: 'linear-gradient(rgba(55, 44, 39, 0.8), rgba(55, 44, 39, 0.8)), url(https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  heroContent: {
    padding: '20px',
    maxWidth: '800px'
  },
  mainTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  },
  subTitle: {
    fontSize: '1.3rem',
    color: colors.lightGray,
    marginBottom: '30px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
  },
  contentContainer: {
    marginBottom: '60px',
    textAlign: 'center'
  },
  contentTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
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
    gap: '40px',
    marginBottom: '50px'
  },
  stepCard: {
    flex: '1',
    minWidth: '280px',
    maxWidth: '320px',
    backgroundColor: colors.white,
    padding: '30px 20px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 30px rgba(0,0,0,0.15)'
    }
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
    position: 'relative',
    boxShadow: '0 5px 15px rgba(117, 74, 45, 0.3)',
    transition: 'all 0.3s ease'
  },
  stepNumber: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  stepIcon: {
    color: colors.white
  },
  stepTitle: {
    fontSize: '1.4rem',
    color: colors.mediumBrown,
    marginBottom: '20px',
    fontWeight: '600'
  },
  stepDetails: {
    textAlign: 'left',
    paddingLeft: '20px',
    listStyleType: 'none',
    marginBottom: '20px',
    li: {
      marginBottom: '12px',
      position: 'relative',
      paddingLeft: '25px',
      lineHeight: '1.5',
      ':before': {
        content: '"•"',
        position: 'absolute',
        left: '0',
        color: colors.lightBrown,
        fontSize: '1.8rem',
        lineHeight: '1rem',
        top: '3px'
      }
    }
  },
  ctaButton: {
    padding: '15px 40px',
    backgroundColor: colors.lightBrown,
    color: colors.white,
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(158, 110, 60, 0.3)',
    ':hover': {
      backgroundColor: colors.mediumBrown,
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 12px rgba(117, 74, 45, 0.4)'
    },
    ':active': {
      transform: 'translateY(1px)'
    }
  }
};

export default HowItWorksCorporates;