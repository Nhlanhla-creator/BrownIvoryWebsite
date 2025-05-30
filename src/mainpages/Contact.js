import React from 'react';
import { FaPaperPlane, FaCircle, FaRegDotCircle } from 'react-icons/fa';
import Header from './Header'; 
import Footer from './Footer'; 

const ContactFormPage = () => {
  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: 'linear-gradient(rgba(242, 240, 230, 0.38), rgba(242, 240, 230, 0.19)), url(/background10.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif",
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    },
    formContainer: {
      maxWidth: '800px',
      width: '100%',
      margin: '2rem 0',
      padding: '3rem',
      backgroundColor: 'rgba(242, 240, 230, 0.85)',
      borderRadius: '20px',
      border: '2px dashed #9E6E3C',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(55, 44, 39, 0.15)',
      backdropFilter: 'blur(2px)',
    },
    decorativeShape1: {
      position: 'absolute',
      top: '-30px',
      right: '-30px',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      border: '2px solid #754A2D',
      opacity: '0.3',
    },
    decorativeShape2: {
      position: 'absolute',
      bottom: '-20px',
      left: '-20px',
      width: '80px',
      height: '80px',
      border: '2px dashed #BCAE9C',
      transform: 'rotate(45deg)',
      opacity: '0.4',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '600',
      color: '#372C27',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      position: 'relative',
      zIndex: '1',
      textAlign: 'center',
    },
    titleIcon: {
      color: '#9E6E3C',
      fontSize: '1.5rem',
    },
    formGroup: {
      marginBottom: '1.8rem',
      position: 'relative',
      zIndex: '1',
    },
    input: {
      width: '100%',
      padding: '1.2rem',
      borderRadius: '12px',
      border: '2px solid #BCAE9C',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif",
      fontSize: '1rem',
      transition: 'all 0.3s ease',
    },
    submitButton: {
      width: '100%',
      padding: '1.2rem',
      border: 'none',
      borderRadius: '12px',
      backgroundColor: '#9E6E3C',
      color: '#F2F0E6',
      fontSize: '1.1rem',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.8rem',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    dots: {
      position: 'absolute',
      right: '30px',
      top: '40px',
      color: '#9E6E3C',
      opacity: '0.1',
      fontSize: '1.5rem',
    },
  };

  // Add hover/focus effects that can't be in the style object
  const inputFocusEffect = {
    outline: 'none',
    borderColor: '#9E6E3C',
    boxShadow: '0 0 0 3px rgba(158, 110, 60, 0.2)',
  };

  const buttonHoverEffect = {
    backgroundColor: '#754A2D',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(117, 74, 45, 0.3)',
  };

  return (
    <div style={styles.page}>
      <Header />
      
      <div style={styles.content}>
        <div style={styles.formContainer}>
          {/* Decorative elements */}
          <div style={styles.decorativeShape1}></div>
          <div style={styles.decorativeShape2}></div>
          <div style={styles.dots}>
            <FaCircle />
            <FaRegDotCircle />
            <FaCircle />
          </div>
          
          <h2 style={styles.title}>
            <FaPaperPlane style={styles.titleIcon} />
            Send Us a Message
          </h2>
          
          <form>
            <div style={styles.formGroup}>
              <input 
                type="text" 
                placeholder="Your Name" 
                style={styles.input} 
                required 
                onFocus={(e) => Object.assign(e.target.style, inputFocusEffect)}
                onBlur={(e) => {
                  e.target.style.outline = 'none';
                  e.target.style.borderColor = '#BCAE9C';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div style={styles.formGroup}>
              <input 
                type="email" 
                placeholder="Your Email" 
                style={styles.input} 
                required 
                onFocus={(e) => Object.assign(e.target.style, inputFocusEffect)}
                onBlur={(e) => {
                  e.target.style.outline = 'none';
                  e.target.style.borderColor = '#BCAE9C';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div style={styles.formGroup}>
              <input 
                type="text" 
                placeholder="Subject" 
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, inputFocusEffect)}
                onBlur={(e) => {
                  e.target.style.outline = 'none';
                  e.target.style.borderColor = '#BCAE9C';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div style={styles.formGroup}>
              <textarea 
                placeholder="Your Message..." 
                rows="6" 
                style={{...styles.input, minHeight: '180px'}} 
                required
                onFocus={(e) => Object.assign(e.target.style, inputFocusEffect)}
                onBlur={(e) => {
                  e.target.style.outline = 'none';
                  e.target.style.borderColor = '#BCAE9C';
                  e.target.style.boxShadow = 'none';
                }}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              style={styles.submitButton}
              onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverEffect)}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#9E6E3C';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactFormPage;