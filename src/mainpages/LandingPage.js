import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import AuthForm from '../smespages/LoginRegister';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaComment, FaTimes, FaHandshake, FaChartLine, FaLightbulb, FaUsers, FaMoneyBillWave, FaTools } from 'react-icons/fa';

const LandingPage = ({ authMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const showAuthForm = authMode || location.pathname === '/AuthForm';
  const [activeTab, setActiveTab] = useState('solutions');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m the BIG assistant. How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const services = [
    {
      title: "SME Funding Seekers",
      icon: <FaMoneyBillWave size={32} color="#9E6E3C" />,
      shortDesc: "For SMEs looking for funding opportunities",
      fullDesc: "Connect with investors and financial institutions to secure the capital you need to grow your business. We help SMEs access grants, loans, and investment opportunities tailored to their needs.",
      benefits: [
        "Access to diverse funding sources",
        "Investor matching based on your business profile",
        "Guidance on preparing funding applications",
        "Network with potential investors"
      ],
      path: "/SMEFunding"
    },
    {
      title: "Service Providers",
      icon: <FaTools size={32} color="#9E6E3C" />,
      shortDesc: "Connect with professional service providers",
      fullDesc: "Find vetted professionals and service providers to support your SME needs. Whether you need legal, accounting, marketing, or technical expertise, we connect you with qualified providers.",
      benefits: [
        "Verified professionals with SME experience",
        "Competitive pricing options",
        "Specialized services for your industry",
        "Easy comparison of service providers"
      ],
      path: "/ServiceProvider"
    },
    {
      title: "Purpose Partners",
      icon: <FaHandshake size={32} color="#9E6E3C" />,
      shortDesc: "For SMEs supporting social causes",
      fullDesc: "Connect with NGOs and community organizations to create meaningful social impact. Whether you're looking to support local initiatives or develop CSR programs, we help you find the right partners.",
      benefits: [
        "Match with aligned social causes",
        "Impact measurement tools",
        "Community engagement opportunities",
        "CSR program development support"
      ],
      path: "/PurposePartner"
    },
    {
      title: "Investors",
      icon: <FaChartLine size={32} color="#9E6E3C" />,
      shortDesc: "For investors seeking SME opportunities",
      fullDesc: "Discover promising SMEs looking for investment. We connect you with pre-vetted businesses that match your investment criteria and provide due diligence support to facilitate successful deals.",
      benefits: [
        "Access to quality deal flow",
        "Pre-screened investment opportunities",
        "Sector-specific investment options",
        "Deal facilitation support"
      ],
      path: "/Investors"
    },
    {
      title: "Growth Enablers",
      icon: <FaUsers size={32} color="#9E6E3C" />,
      shortDesc: "CSR initiatives and enterprise support",
      fullDesc: "For corporations and organizations looking to support SME growth through CSR programs, mentorship, or enterprise development initiatives. Connect with SMEs that align with your support objectives.",
      benefits: [
        "CSR program implementation support",
        "Mentorship matching",
        "Enterprise development partnerships",
        "Impact measurement reporting"
      ],
      path: "/GrowthEnabler"
    },
    {
      title: "Business Solutions",
      icon: <FaLightbulb size={32} color="#9E6E3C" />,
      shortDesc: "Tailored solutions for SME challenges",
      fullDesc: "Access innovative tools and solutions designed specifically for SME needs. From technology platforms to operational support, we connect you with solutions that help your business thrive.",
      benefits: [
        "Customized business solutions",
        "Technology tools for SMEs",
        "Operational efficiency support",
        "Innovation and growth strategies"
      ],
      path: "/Solutions"
    },
  ];

  const [expandedCard, setExpandedCard] = useState(null);

  // AI responses with more context
  const aiResponses = {
    greeting: "Hello! I'm the BIG assistant. How can I help you today?",
    funding: "We offer several funding solutions including grants, loans, and investor connections. Would you like me to connect you with our capital solutions team?",
    partnership: "Our partner network connects you with vetted suppliers and service providers. I can help you find the right partners for your business needs.",
    impact: "Our social impact advisory helps align your business goals with community needs. We can help measure and maximize your social impact.",
    investment: "For investment opportunities, we facilitate connections between SMEs and investors. Would you like information on preparing your business for investment?",
    services: "We provide access to professional services including legal, accounting, and marketing experts. All our professionals are vetted for SME experience.",
    development: "Our enterprise development programs help businesses scale effectively through training and mentorship.",
    default: "I'd be happy to help with that. Our team specializes in SME support. Would you like me to connect you with the appropriate department?",
    contact: "You can reach us at info@brownivorygroup.com or call +1 (555) 123-4567 during business hours.",
    thanks: "You're welcome! Is there anything else I can help you with today?"
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const newUserMessage = { sender: 'user', text: inputMessage };
    setChatMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Determine AI response based on keywords
    const userMessage = inputMessage.toLowerCase();
    let aiResponse = aiResponses.default;

    if (userMessage.includes('hello') || userMessage.includes('hi')) {
      aiResponse = aiResponses.greeting;
    } else if (userMessage.includes('fund') || userMessage.includes('money') || userMessage.includes('capital')) {
      aiResponse = aiResponses.funding;
    } else if (userMessage.includes('partner') || userMessage.includes('supplier') || userMessage.includes('network')) {
      aiResponse = aiResponses.partnership;
    } else if (userMessage.includes('impact') || userMessage.includes('social') || userMessage.includes('csr')) {
      aiResponse = aiResponses.impact;
    } else if (userMessage.includes('invest') || userMessage.includes('funding') || userMessage.includes('capital')) {
      aiResponse = aiResponses.investment;
    } else if (userMessage.includes('service') || userMessage.includes('professional') || userMessage.includes('consultant')) {
      aiResponse = aiResponses.services;
    } else if (userMessage.includes('develop') || userMessage.includes('growth') || userMessage.includes('scale')) {
      aiResponse = aiResponses.development;
    } else if (userMessage.includes('contact') || userMessage.includes('email') || userMessage.includes('phone')) {
      aiResponse = aiResponses.contact;
    } else if (userMessage.includes('thank') || userMessage.includes('thanks')) {
      aiResponse = aiResponses.thanks;
    }

    // Simulate typing delay
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'bot', text: aiResponse }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'about':
        return (
          <div style={styles.tabContent}>
            <h3 style={styles.solutionsHeading}>About Brown Ivory Group</h3>
            <p style={styles.tabText}>We empower SMEs through innovative services and strategic partnerships.</p>
          </div>
        );
      case 'how-it-works':
        return (
          <div style={styles.tabContent}>
            <h3 style={styles.solutionsHeading}>How It Works</h3>
            <ol style={styles.stepsList}>
              <li style={styles.stepItem}>Register as SME, Service Provider, or Investor</li>
              <li style={styles.stepItem}>Complete your profile with necessary details</li>
              <li style={styles.stepItem}>Submit required documents for verification</li>
              <li style={styles.stepItem}>View your matches with compatible partners</li>
              <li style={styles.stepItem}>Connect and collaborate with matched partners</li>
              <li style={styles.stepItem}>Apply for services or funding opportunities</li>
            </ol>
          </div>
        );
      default:
        return (
          <div style={styles.tabContent}>
            <h3 style={styles.solutionsHeading}>Smart Solutions for High-Growth Enterprises</h3>
            <p style={styles.tabText}>Your one-stop destination for essential business tools, expert services, and tailored solutions to drive operational efficiency and scalable success.</p>
          </div>
        );
    }
  };

  const handleServiceClick = (path) => {
    navigate(path);
  };

  const toggleCardExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div style={styles.pageWrapper}>
      <Header />
      <main style={styles.mainContent}>
        {showAuthForm ? (
          <AuthForm />
        ) : (
          <>
            <section style={styles.heroSection} id="home">
              <div style={styles.textColumn}>
                <h1 style={styles.mainTitle}>
                  Welcome To <span style={styles.highlight}>Brown Ivory Group</span> (BIG)
                </h1>
                <p style={styles.tagline}>
                  <span style={styles.taglineHighlight}>BIG on Ideas</span> • 
                  <span style={styles.taglineHighlight}> BIG on Growth</span> • 
                  <span style={styles.taglineHighlight}> BIG on Impact</span>
                </p>
              </div>

              <div style={styles.contentGrid}>
                <div style={styles.smartSolutionsSection}>
                  <div style={styles.tabButtons}>
                    <button 
                      style={{...styles.tabButton, ...(activeTab === 'solutions' ? styles.activeTab : {})}}
                      onClick={() => setActiveTab('solutions')}
                    >
                      SOLUTIONS
                    </button>
                    <button 
                      style={{...styles.tabButton, ...(activeTab === 'about' ? styles.activeTab : {})}}
                      onClick={() => setActiveTab('about')}
                    >
                      ABOUT
                    </button>
                    <button 
                      style={{...styles.tabButton, ...(activeTab === 'how-it-works' ? styles.activeTab : {})}}
                      onClick={() => setActiveTab('how-it-works')}
                    >
                      HOW IT WORKS
                    </button>
                  </div>
                  
                  {renderContent()}
                  
                  <div style={styles.actionButtons}>
                    <button style={styles.actionButton}>EXPLORE MARKETPLACE</button>
                    <button style={styles.actionButton}>GET STARTED</button>
                  </div>
                </div>

                {/* Fixed video section - size remains constant */}
                <div style={styles.videoGrid}>
                  <div style={styles.videoWrapper}>
                    <iframe 
                      style={styles.video}
                      src="https://www.youtube.com/embed/1p61X8LLZFs" 
                      title="Video 1"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div style={styles.videoWrapper}>
                    <iframe 
                      style={styles.video}
                      src="https://www.youtube.com/embed/HCbzLdSIxGE" 
                      title="Video 2"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div style={styles.videoWrapper}>
                    <iframe 
                      style={styles.video}
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      title="Video 3"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div style={styles.videoWrapper}>
                    <iframe 
                      style={styles.video}
                      src="https://www.youtube.com/embed/9bZkp7q19f0" 
                      title="Video 4"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>

            <section style={styles.servicesSection} id="services-section">
              <h2 style={styles.servicesTitle}>Our Comprehensive Services</h2>
              <p style={styles.servicesSubtitle}>Tailored solutions designed to empower your business journey</p>

              <div style={styles.servicesGrid}>
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    style={{
                      ...styles.serviceCard,
                      height: expandedCard === index ? 'auto' : '200px',
                      minHeight: expandedCard === index ? '350px' : '200px'
                    }}
                    onClick={() => toggleCardExpand(index)}
                  >
                    <div style={styles.serviceIcon}>{service.icon}</div>
                    <h3 style={styles.serviceTitle}>{service.title}</h3>
                    <p style={styles.serviceShortDesc}>{service.shortDesc}</p>
                    
                    {expandedCard === index && (
                      <div style={styles.expandedContent}>
                        <p style={styles.serviceFullDesc}>{service.fullDesc}</p>
                        <h4 style={styles.benefitsTitle}>Key Benefits:</h4>
                        <ul style={styles.benefitsList}>
                          {service.benefits.map((benefit, i) => (
                            <li key={i} style={styles.benefitItem}>{benefit}</li>
                          ))}
                        </ul>
                        <button 
                          style={styles.readMoreButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleServiceClick(service.path);
                          }}
                        >
                          Learn More
                        </button>
                      </div>
                    )}
                    
                    {expandedCard !== index && (
                      <div style={styles.readMoreHint}>Click to expand ▼</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Enhanced Chat Widget */}
      {isChatOpen ? (
        <div style={styles.chatOpen}>
          <div style={styles.chatHeader}>
            <h4>BIG Assistant</h4>
            <button 
              style={styles.closeChat}
              onClick={() => setIsChatOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          <div style={styles.chatMessages}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={msg.sender === 'bot' ? styles.botMessage : styles.userMessage}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div style={styles.typingIndicator}>
                <div style={styles.typingDot}></div>
                <div style={styles.typingDot}></div>
                <div style={styles.typingDot}></div>
              </div>
            )}
          </div>
          <form style={styles.chatInput} onSubmit={handleSendMessage}>
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about our services..." 
              style={styles.chatInputField}
            />
            <button type="submit" style={styles.chatSendButton}>
              Send
            </button>
          </form>
        </div>
      ) : (
        <div style={styles.chatClosed} onClick={() => setIsChatOpen(true)}>
          <FaComment size={24} style={styles.chatIcon} />
        </div>
      )}

      <Footer />
    </div>
  );
};

const styles = {
  pageWrapper: {
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: '#F5F1EA',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  mainContent: {
    flex: 1,
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
    boxSizing: 'border-box'
  },
  heroSection: {
    marginBottom: '3rem',
  },
  textColumn: {
    marginBottom: '2rem',
    textAlign: 'center'
  },
  mainTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#372C27',
    marginBottom: '0.5rem',
    lineHeight: '1.2',
    '@media (max-width: 768px)': {
      fontSize: '2rem'
    }
  },
  highlight: {
    color: '#9E6E3C',
    textShadow: '1px 1px 2px rgba(55, 44, 39, 0.1)',
  },
  tagline: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#754A2D',
    marginBottom: '2rem',
    lineHeight: '1.4',
    '@media (max-width: 768px)': {
      fontSize: '1.2rem'
    }
  },
  taglineHighlight: {
    color: '#372C27',
    fontWeight: '700',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr'
    }
  },
  smartSolutionsSection: {
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    border: '2px solid #372C27',
    boxShadow: '0 8px 32px rgba(55, 44, 39, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    '@media (max-width: 768px)': {
      padding: '1.5rem'
    }
  },
  tabButtons: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  tabButton: {
    backgroundColor: 'transparent',
    color: '#754A2D',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.9rem',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(117, 74, 45, 0.1)',
      transform: 'translateY(-2px)'
    }
  },
  activeTab: {
    backgroundColor: '#754A2D',
    color: '#FFFFFF',
    boxShadow: '0 4px 8px rgba(117, 74, 45, 0.3)'
  },
  tabContent: {
    minHeight: '150px',
    padding: '1rem 0'
  },
  solutionsHeading: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#754A2D',
    marginBottom: '1.5rem',
    lineHeight: '1.3'
  },
  tabText: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '1.2rem'
  },
  stepsList: {
    paddingLeft: '1.5rem',
    lineHeight: '1.8'
  },
  stepItem: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: '#555'
  },
  actionButtons: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '1.5rem',
    '@media (max-width: 480px)': {
      flexDirection: 'column'
    }
  },
  actionButton: {
    backgroundColor: '#754A2D',
    color: '#FFFFFF',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.95rem',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#9E6E3C',
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 12px rgba(117, 74, 45, 0.3)'
    }
  },
  // Fixed video section styles
  videoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    height: 'fit-content',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  videoWrapper: {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(55, 44, 39, 0.2)',
    transition: 'transform 0.3s ease',
    height: '200px', // Fixed height
    ':hover': {
      transform: 'scale(1.02)'
    }
  },
  video: {
    width: '100%',
    height: '100%',
    border: 'none'
  },
  servicesSection: {
    width: '100%',
    padding: '3rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(55, 44, 39, 0.1)',
    marginBottom: '3rem',
    '@media (max-width: 768px)': {
      padding: '2rem 1rem'
    }
  },
  servicesTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#372C27',
    textAlign: 'center',
    marginBottom: '0.5rem',
    '@media (max-width: 768px)': {
      fontSize: '1.8rem'
    }
  },
  servicesSubtitle: {
    fontSize: '1.1rem',
    color: '#754A2D',
    textAlign: 'center',
    marginBottom: '2rem',
    fontStyle: 'italic',
    '@media (max-width: 768px)': {
      fontSize: '1rem'
    }
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr'
    }
  },
  serviceCard: {
    backgroundColor: '#F2F0E6',
    color: '#372C27',
    border: '2px solid #9E6E3C',
    borderRadius: '12px',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
    }
  },
  serviceIcon: {
    marginBottom: '1rem'
  },
  serviceTitle: {
    fontWeight: '700',
    fontSize: '1.2rem',
    marginBottom: '0.8rem',
    color: '#754A2D'
  },
  serviceShortDesc: {
    fontSize: '0.95rem',
    color: '#555',
    marginBottom: '1rem'
  },
  expandedContent: {
    width: '100%',
    textAlign: 'left',
    marginTop: '1rem'
  },
  serviceFullDesc: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '1.2rem'
  },
  benefitsTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#754A2D',
    margin: '1rem 0 0.5rem',
    textAlign: 'left'
  },
  benefitsList: {
    paddingLeft: '1.2rem',
    marginBottom: '1.5rem'
  },
  benefitItem: {
    fontSize: '0.85rem',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '0.5rem',
    textAlign: 'left'
  },
  readMoreButton: {
    backgroundColor: '#754A2D',
    color: '#FFFFFF',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '4px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#9E6E3C',
      transform: 'translateY(-2px)'
    }
  },
  readMoreHint: {
    position: 'absolute',
    bottom: '1rem',
    fontSize: '0.8rem',
    color: '#9E6E3C',
    fontStyle: 'italic'
  },
  // Enhanced chat styles
  chatOpen: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '350px',
    height: '450px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000
  },
  chatHeader: {
    backgroundColor: '#754A2D',
    color: 'white',
    padding: '1.2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeChat: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1.4rem',
    transition: 'transform 0.2s ease',
    ':hover': {
      transform: 'rotate(90deg)'
    }
  },
  chatMessages: {
    flex: 1,
    padding: '1.5rem',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F0E6',
    padding: '0.8rem 1.2rem',
    borderRadius: '12px 12px 12px 0',
    maxWidth: '80%',
    color: '#372C27',
    fontSize: '0.9rem'
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#754A2D',
    color: '#FFFFFF',
    padding: '0.8rem 1.2rem',
    borderRadius: '12px 12px 0 12px',
    maxWidth: '80%',
    fontSize: '0.9rem'
  },
  typingIndicator: {
    display: 'flex',
    gap: '0.5rem',
    alignSelf: 'flex-start',
    padding: '0.8rem 1.2rem'
  },
  typingDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#9E6E3C',
    borderRadius: '50%',
    animation: 'typingAnimation 1.4s infinite ease-in-out'
  },
  chatInput: {
    display: 'flex',
    padding: '1rem',
    borderTop: '1px solid #eee',
    backgroundColor: 'white'
  },
  chatInputField: {
    flex: 1,
    padding: '0.8rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '0.9rem',
    outline: 'none',
    ':focus': {
      borderColor: '#9E6E3C'
    }
  },
  chatSendButton: {
    backgroundColor: '#754A2D',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0 1.2rem',
    marginLeft: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#9E6E3C'
    }
  },
  chatClosed: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    backgroundColor: '#754A2D',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#9E6E3C',
      transform: 'scale(1.1)'
    }
  },
  chatIcon: {
    color: 'white',
    fontSize: '1.8rem'
  }
};

export default LandingPage;