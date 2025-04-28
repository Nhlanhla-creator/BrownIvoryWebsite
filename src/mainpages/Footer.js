import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer} id="footer-contact">
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <h3 style={styles.footerHeading}>Contact Us</h3>
          <div style={styles.contactItem}>
            <FaMapMarkerAlt style={styles.contactIcon} />
            <span>123 Business Ave, City, Country</span>
          </div>
          <div style={styles.contactItem}>
            <FaPhone style={styles.contactIcon} />
            <span>+1 (234) 567-8900</span>
          </div>
          <div style={styles.contactItem}>
            <FaEnvelope style={styles.contactIcon} />
            <span>info@brownivorygroup.com</span>
          </div>
        </div>

        <div style={styles.footerSection}>
          <h3 style={styles.footerHeading}>Follow Us</h3>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.socialLink}><FaFacebook /></a>
            <a href="#" style={styles.socialLink}><FaTwitter /></a>
            <a href="#" style={styles.socialLink}><FaLinkedin /></a>
          </div>
        </div>

        <div style={styles.footerSection}>
          <h3 style={styles.footerHeading}>Quick Links</h3>
          <a href="#home" style={styles.footerLink}>Home</a>
          <a href="#about" style={styles.footerLink}>About</a>
          <a href="#services-section" style={styles.footerLink}>Services</a>
          <a href="#footer-contact" style={styles.footerLink}>Contact</a>
        </div>
      </div>

      <div style={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Brown Ivory Group. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#372C27',
    color: '#fff',
    padding: '3rem 2rem 1rem',
    width: '100%',
    boxSizing: 'border-box'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1.5rem'
    }
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  footerHeading: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    borderBottom: '1px solid #9E6E3C',
    paddingBottom: '0.5rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    fontSize: '1rem',
    lineHeight: '1.5'
  },
  contactIcon: {
    color: '#9E6E3C',
    fontSize: '1.2rem',
    minWidth: '20px'
  },
  socialIcons: {
    display: 'flex',
    gap: '1.5rem',
  },
  socialLink: {
    color: '#fff',
    fontSize: '1.5rem',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#BCAE9C',
    },
  },
  footerLink: {
    color: '#fff',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    fontSize: '1rem',
    marginBottom: '0.5rem',
    display: 'block',
    ':hover': {
      color: '#BCAE9C',
    },
  },
  footerBottom: {
    textAlign: 'center',
    borderTop: '1px solid #9E6E3C',
    paddingTop: '1.5rem',
    fontSize: '0.9rem',
    maxWidth: '1200px',
    margin: '0 auto'
  }
};

export default Footer;
