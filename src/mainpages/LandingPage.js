import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { 
  FaArrowRight, FaUsers, FaUserTie, FaHandHoldingHeart,
  FaChartLine, FaGlobe, FaChevronRight, FaShieldAlt,
  FaLightbulb, FaHandshake, FaTimes, FaPaperPlane, FaCheck,
  FaComments, FaLightbulb as FaPromise, FaBullseye, FaChartBar
} from 'react-icons/fa';
import { MdCorporateFare, MdTrendingUp } from 'react-icons/md';
import './LandingPage.css';

const images = {
  heroBg: "https://www.shutterstock.com/image-photo/group-business-people-outlines-lit-600nw-2145032061.jpg",
  ecosystem: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  scoreMeter: "https://images.unsplash.com/photo-1581093450021-4a7360e9a7e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  pathway: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  africaMap: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  testimonial1: "https://randomuser.me/api/portraits/women/44.jpg",
  testimonial2: "https://randomuser.me/api/portraits/men/32.jpg",
  testimonial3: "https://randomuser.me/api/portraits/women/68.jpg",
  bigScore: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
};

const colors = {
  primary: '#754A2D',
  secondary: '#9E6E3C',
  dark: '#372C27',
  light: '#F2F0E6',
  neutral: '#D3D2CE',
  accent: '#BCAE9C',
  scoreBg: '#F8F4EF'
};

const LandingPage = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm BIG Marketplace assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [expandedAbout, setExpandedAbout] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    setTimeout(() => {
      const responses = [
        "That's a great question! Our platform connects SMSEs with investors and corporate partners.",
        "To get started, simply click on the 'Get Started' button and create your profile.",
        "The BIG Score evaluates businesses across financial health, market potential, management quality, and innovation.",
        "Our matching algorithm considers your business profile and needs to find the best partners for you.",
        "You can learn more by visiting our 'How It Works' pages for each user type."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, sender: 'bot' }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="landing-page" style={{ 
      backgroundColor: colors.light,
      fontFamily: "'Poppins', sans-serif",
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{ 
        background: `linear-gradient(90deg, ${colors.dark} 0%, rgba(55, 44, 39, 0.7) 50%, rgba(55, 44, 39, 0.3) 100%), url(${images.heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 20px',
        textAlign: 'left',
        color: colors.light,
        position: 'relative',
        minHeight: '55vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '70% 30%',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div style={{ zIndex: 1 }}>
            <h1 style={{ 
              fontSize: '2.8rem', 
              fontWeight: '800',
              marginBottom: '15px',
              lineHeight: '1.2',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              <span style={{ color: colors.secondary }}>BIG</span> ON IDEAS. <span style={{ color: colors.secondary }}>BIG</span> ON GROWTH. <span style={{ color: colors.secondary }}>BIG</span> ON IMPACT.
            </h1>
            <p style={{ 
              fontSize: '1.2rem',
              margin: '0 0 20px 0',
              opacity: 0.9
            }}>
              HOLISTIC SOLUTIONS DESIGNED TO PROPEL HIGH-IMPACT ENTERPRISES FORWARD — BECAUSE SCALING SUCCESS REQUIRES STRATEGY, INSIGHT, AND THE RIGHT PARTNERSHIPS.
            </p>
            <p style={{ 
              fontSize: '1rem',
              margin: '0 0 25px 0',
              fontWeight: '500'
            }}>
              WE'RE CLOSING THE SMALL, MEDIUM, AND SOCIAL ENTERPRISES (SMSEs) FUNDING GAP IN AFRICA — WITH THE TOOLS, TRUST, AND PATHWAYS TO GROW YOUR BUSINESS.
            </p>
            <p style={{
              fontSize: '0.9rem',
              fontStyle: 'italic',
              marginBottom: '25px'
            }}>
              TRUSTED BY 500+ SMSES AND 50+ FUNDERS ACROSS AFRICA
            </p>
            <div style={{ 
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              <Link to="/register" style={{
                backgroundColor: colors.secondary,
                color: colors.light,
                padding: '12px 30px',
                borderRadius: '50px',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                ':hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                }
              }}>
                GET STARTED
              </Link>
              <Link to="/demo" style={{
                backgroundColor: 'transparent',
                color: colors.light,
                border: `2px solid ${colors.secondary}`,
                padding: '12px 30px',
                borderRadius: '50px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                ':hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}>
                SEE DEMO
              </Link>
            </div>
          </div>
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              width: '100%',
              height: '300px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}></div>
          </div>
        </div>
      </section>

      {/* Who Benefits Section */}
      <section style={{ 
        padding: '50px 20px',
        position: 'relative',
        backgroundColor: colors.light
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)'
        }}></div>
        
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{ 
            textAlign: 'center',
            fontSize: '2.2rem',
            fontWeight: '700',
            marginBottom: '50px',
            color: colors.dark,
            textTransform: 'uppercase'
          }}>
            Who Benefits From <span style={{ color: colors.primary }}>BIG</span>?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px'
          }}>
            {/* SMSEs Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '25px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              borderTop: `4px solid ${colors.primary}`,
              transition: 'transform 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <div style={{
                backgroundColor: `${colors.primary}10`,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                border: `2px solid ${colors.primary}`
              }}>
                <FaUsers size={24} color={colors.primary} />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>SMSEs</h3>
              <p style={{ 
                fontSize: '1rem',
                fontWeight: '600',
                color: colors.primary,
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>Get Visibility. Get Scored. Get Matched.</p>
              <p style={{
                fontSize: '0.85rem',
                color: colors.dark,
                marginBottom: '15px'
              }}>
                GROW YOUR BUSINESS WITH ACCESS TO FUNDING AND PARTNERSHIPS.
              </p>
              <Link to="/HowItWorksSMEs" style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: colors.primary,
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>
                How It Works <FaChevronRight style={{ marginLeft: '5px' }} />
              </Link>
              <Link to="/register" style={{
                backgroundColor: colors.primary,
                color: colors.light,
                padding: '8px 20px',
                borderRadius: '50px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase'
              }}>
                Get Started
              </Link>
            </div>

            {/* Investors Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '25px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              borderTop: `4px solid ${colors.secondary}`,
              transition: 'transform 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <div style={{
                backgroundColor: `${colors.secondary}10`,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                border: `2px solid ${colors.secondary}`
              }}>
                <FaUserTie size={24} color={colors.secondary} />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>Investors</h3>
              <p style={{ 
                fontSize: '1rem',
                fontWeight: '600',
                color: colors.secondary,
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>Discover. Verify. Invest.</p>
              <p style={{
                fontSize: '0.85rem',
                color: colors.dark,
                marginBottom: '15px'
              }}>
                DISCOVER INVESTMENT-READY SMSES WITH VERIFIED COMPLIANCE AND GROWTH READINESS.
              </p>
              <Link to="/HowItWorksInvestors" style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: colors.secondary,
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>
                How It Works <FaChevronRight style={{ marginLeft: '5px' }} />
              </Link>
              <Link to="/register" style={{
                backgroundColor: colors.secondary,
                color: colors.light,
                padding: '8px 20px',
                borderRadius: '50px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase'
              }}>
                Get Started
              </Link>
            </div>

            {/* Corporates Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '25px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              borderTop: `4px solid ${colors.dark}`,
              transition: 'transform 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <div style={{
                backgroundColor: `${colors.dark}10`,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                border: `2px solid ${colors.dark}`
              }}>
                <MdCorporateFare size={24} color={colors.dark} />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>Corporates</h3>
              <p style={{ 
                fontSize: '1rem',
                fontWeight: '600',
                color: colors.dark,
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>Source. Partner. Amplify Impact.</p>
              <p style={{
                fontSize: '0.85rem',
                color: colors.dark,
                marginBottom: '15px'
              }}>
                ACCELERATE CSI & ESD IMPACT BY SOURCING VERIFIED SMSES THAT ALIGN WITH YOUR GOALS.
              </p>
              <Link to="/HowItWorksCorporate" style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: colors.dark,
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>
                How It Works <FaChevronRight style={{ marginLeft: '5px' }} />
              </Link>
              <Link to="/register" style={{
                backgroundColor: colors.dark,
                color: colors.light,
                padding: '8px 20px',
                borderRadius: '50px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase'
              }}>
                Get Started
              </Link>
            </div>

            {/* Support Partners Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '25px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              borderTop: `4px solid ${colors.accent}`,
              transition: 'transform 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <div style={{
                backgroundColor: `${colors.accent}10`,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                border: `2px solid ${colors.accent}`
              }}>
                <FaHandHoldingHeart size={24} color={colors.accent} />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>Support Partners</h3>
              <p style={{ 
                fontSize: '1rem',
                fontWeight: '600',
                color: colors.accent,
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>Identify. Nurture. Track.</p>
              <p style={{
                fontSize: '0.85rem',
                color: colors.dark,
                marginBottom: '15px'
              }}>
                BOOST YOUR COHORT WITH FUNDING, MARKETPLACE ACCESS, MENTORSHIP, AND PARTNERSHIPS.
              </p>
              <Link to="/HowItWorksAccelerators" style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: colors.accent,
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>
                How It Works <FaChevronRight style={{ marginLeft: '5px' }} />
              </Link>
              <Link to="/register" style={{
                backgroundColor: colors.accent,
                color: colors.dark,
                padding: '8px 20px',
                borderRadius: '50px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase'
              }}>
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: `linear-gradient(to right, ${colors.accent}, ${colors.neutral})`,
          clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)'
        }}></div>
      </section>

      {/* What is BIG Marketplace Section */}
      <section style={{ 
        padding: '50px 20px',
        position: 'relative',
        background: `linear-gradient(135deg, ${colors.neutral} 0%, ${colors.light} 100%)`
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: `linear-gradient(to right, ${colors.secondary}, ${colors.primary})`,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 70%)'
        }}></div>
        
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ 
                fontSize: '2.2rem',
                fontWeight: '700',
                marginBottom: '15px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>
                What is <span style={{ color: colors.primary }}>BIG</span> Marketplace?
              </h2>
              <p style={{ 
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '15px',
                color: colors.primary,
                textTransform: 'uppercase'
              }}>
                The Trust Layer For Business In Africa.
              </p>
              <p style={{ 
                fontSize: '1.1rem',
                marginBottom: '25px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>
                One Profile. One Score. Many Doors.
              </p>
              
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '10px' }} />
                  <span style={{ color: colors.dark }}>GET MATCHED TO FUNDERS, SERVICES, AND IMPACT OPPORTUNITIES.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '10px' }} />
                  <span style={{ color: colors.dark }}>TRACK YOUR BIG SCORE AND SEE EXACTLY WHAT'S MISSING.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '10px' }} />
                  <span style={{ color: colors.dark }}>GROW YOUR CREDIBILITY WITH VERIFIED COMPLIANCE.</span>
                </div>
              </div>
              
              <p style={{ 
                fontSize: '1rem',
                marginBottom: '25px',
                color: colors.dark
              }}>
                WHETHER YOU'RE AN ENTREPRENEUR, INVESTOR, OR CORPORATE CHAMPION — BIG CONNECTS YOU TO WHO (AND WHAT) YOU NEED TO GROW.
              </p>
              
              {!expandedAbout && (
                <button 
                  onClick={() => setExpandedAbout(true)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: colors.primary,
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase'
                  }}
                >
                  Learn More <FaChevronRight style={{ marginLeft: '5px' }} />
                </button>
              )}
              
              {expandedAbout && (
                <div style={{ 
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <p style={{ 
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    color: colors.dark,
                    marginBottom: '12px'
                  }}>
                    BIG MARKETPLACE WAS FOUNDED TO SOLVE ONE PROBLEM: AFRICA'S SMES LACK TRUST, NOT POTENTIAL. WE COMBINE DATA, PARTNERSHIPS, AND TECHNOLOGY TO CREATE A FAIR, TRANSPARENT ECOSYSTEM WHERE:
                  </p>
                  <ul style={{ 
                    listStyleType: 'disc',
                    paddingLeft: '20px',
                    marginBottom: '12px'
                  }}>
                    <li style={{ marginBottom: '6px', textTransform: 'uppercase' }}>SMSEs PROVE THEIR CREDIBILITY.</li>
                    <li style={{ marginBottom: '6px', textTransform: 'uppercase' }}>FUNDERS FIND VERIFIED OPPORTUNITIES.</li>
                    <li style={{ textTransform: 'uppercase' }}>CORPORATES MAXIMIZE IMPACT.</li>
                  </ul>
                </div>
              )}
            </div>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <img 
                src={images.ecosystem} 
                alt="BIG Marketplace Ecosystem" 
                style={{ 
                  width: '100%',
                  height: 'auto',
                  borderRadius: '4px'
                }} 
              />
              <p style={{ 
                fontSize: '0.8rem',
                color: colors.dark,
                marginTop: '10px',
                fontStyle: 'italic',
                textTransform: 'uppercase'
              }}>
                The BIG Marketplace Ecosystem Connects SMSEs With Funders, Support Partners, And Customers.
              </p>
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: `linear-gradient(to right, ${colors.dark}, ${colors.accent})`,
          clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0 100%)'
        }}></div>
      </section>

      {/* BIG Score Section - Clean and Consistent */}
      <section style={{ 
        padding: '60px 20px',
        position: 'relative',
        backgroundColor: colors.scoreBg,
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(188, 174, 156, 0.1) 0%, rgba(188, 174, 156, 0.05) 90%)'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: `linear-gradient(to right, ${colors.accent}, ${colors.neutral})`,
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)'
        }}></div>
        
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h2 style={{ 
              fontSize: '2.2rem',
              fontWeight: '700',
              marginBottom: '15px',
              color: colors.dark,
              textTransform: 'uppercase'
            }}>
              Introducing The <span style={{ color: colors.primary }}>BIG</span> Score
            </h2>
            <p style={{ 
              fontSize: '1rem',
              color: colors.dark,
              maxWidth: '800px',
              margin: '0 auto',
              textTransform: 'uppercase'
            }}>
              A COMPREHENSIVE ASSESSMENT THAT EVALUATES YOUR BUSINESS ACROSS MULTIPLE DIMENSIONS
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '25px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              borderTop: `4px solid ${colors.primary}`,
              textAlign: 'center'
            }}>
              <div style={{
                backgroundColor: `${colors.primary}20`,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                border: `2px solid ${colors.primary}`
              }}>
                <FaChartBar size={24} color={colors.primary} />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>How It Works</h3>
              <p style={{ 
                fontSize: '0.9rem',
                color: colors.dark,
                marginBottom: '15px'
              }}>
                OUR PROPRIETARY BIG SCORE EVALUATES YOUR FINANCIAL HEALTH, OPERATIONAL MATURITY, COMPLIANCE STATUS, AND GROWTH POTENTIAL.
              </p>
              <ul style={{ 
                listStyleType: 'none',
                padding: 0,
                margin: '0 0 15px 0',
                textAlign: 'left'
              }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '8px', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.85rem' }}>FINANCIAL HEALTH: REVENUE TRENDS, PROFITABILITY</span>
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '8px', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.85rem' }}>OPERATIONAL MATURITY: SYSTEMS, PROCESSES</span>
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '8px', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.85rem' }}>COMPLIANCE STATUS: LEGAL, REGULATORY</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '8px', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.85rem' }}>GROWTH POTENTIAL: MARKET OPPORTUNITY</span>
                </li>
              </ul>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '25px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              borderTop: `4px solid ${colors.secondary}`,
              textAlign: 'center'
            }}>
              <div style={{
                backgroundColor: `${colors.secondary}20`,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                border: `2px solid ${colors.secondary}`
              }}>
                <MdTrendingUp size={24} color={colors.secondary} />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>What It Unlocks</h3>
              <p style={{ 
                fontSize: '0.9rem',
                color: colors.dark,
                marginBottom: '15px'
              }}>
                YOUR BIG SCORE OPENS DOORS TO OPPORTUNITIES MATCHED TO YOUR BUSINESS'S CURRENT STAGE AND POTENTIAL.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '15px'
              }}>
                <div style={{
                  backgroundColor: `${colors.primary}10`,
                  padding: '10px',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: colors.primary,
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    FUNDING
                  </div>
                </div>
                <div style={{
                  backgroundColor: `${colors.secondary}10`,
                  padding: '10px',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: colors.secondary,
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    PARTNERSHIPS
                  </div>
                </div>
                <div style={{
                  backgroundColor: `${colors.accent}10`,
                  padding: '10px',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: colors.accent,
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    COMPLIANCE
                  </div>
                </div>
                <div style={{
                  backgroundColor: `${colors.dark}10`,
                  padding: '10px',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: colors.dark,
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    GUIDANCE
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center',
            marginTop: '20px'
          }}>
            <Link to="/bigscore" style={{
              backgroundColor: colors.primary,
              color: colors.light,
              padding: '12px 30px',
              borderRadius: '50px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase'
            }}>
              Learn More About BIG Score
            </Link>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: `linear-gradient(to right, ${colors.secondary}, ${colors.primary})`,
          clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)'
        }}></div>
      </section>

      {/* Don't Qualify Section */}
      <section style={{ 
        padding: '50px 20px',
        position: 'relative',
        backgroundColor: colors.light
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 70%)'
        }}></div>
        
        <div style={{ 
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={images.pathway} 
                alt="Pathway to Success" 
                style={{ 
                  width: '100%',
                  height: 'auto'
                }} 
              />
            </div>
            
            <div>
              <h2 style={{ 
                fontSize: '2.2rem',
                fontWeight: '700',
                marginBottom: '15px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>
                Don't Qualify Yet? We've Got You.
              </h2>
              <p style={{ 
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: '15px',
                color: colors.primary,
                textTransform: 'uppercase'
              }}>
                BIG Doesn't Shut Doors — It Shows You Where To Go.
              </p>
              <p style={{ 
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '15px',
                color: colors.dark
              }}>
                IF YOUR SCORE IS LOW, WE'LL GUIDE YOU TO:
              </p>
              <ul style={{ 
                listStyleType: 'disc',
                paddingLeft: '20px',
                marginBottom: '15px'
              }}>
                <li style={{ marginBottom: '6px', textTransform: 'uppercase' }}>ACCELERATORS TO REFINE YOUR MODEL.</li>
                <li style={{ marginBottom: '6px', textTransform: 'uppercase' }}>MENTORS TO FIX COMPLIANCE GAPS.</li>
                <li style={{ textTransform: 'uppercase' }}>INCUBATORS TO PREP FOR FUNDING.</li>
              </ul>
              <p style={{ 
                fontSize: '1.1rem',
                fontWeight: '600',
                color: colors.primary,
                marginBottom: '25px',
                textTransform: 'uppercase'
              }}>
                BIG Is More Than A Marketplace. It's A Pathway.
              </p>
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: `linear-gradient(to right, ${colors.accent}, ${colors.neutral})`,
          clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0 100%)'
        }}></div>
      </section>

      {/* Vision, Mission & Promise Section */}
      <section style={{ 
        padding: '50px 20px',
        position: 'relative',
        background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 100%), url(${images.africaMap})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: colors.light
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`,
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)'
        }}></div>
        
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{ 
            fontSize: '2.2rem',
            fontWeight: '700',
            marginBottom: '40px',
            textAlign: 'center',
            textTransform: 'uppercase'
          }}>
            Our <span style={{ color: colors.secondary }}>Purpose</span>
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px',
            marginBottom: '30px'
          }}>
            {/* Vision */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: '8px',
              padding: '25px',
              textAlign: 'center',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              borderTop: `4px solid ${colors.primary}`
            }}>
              <div style={{
                backgroundColor: `${colors.primary}20`,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                border: `2px solid ${colors.primary}`
              }}>
                <FaBullseye size={24} color={colors.primary} />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>Our Vision</h3>
              <p style={{ 
                fontSize: '0.9rem',
                lineHeight: '1.6',
                color: colors.dark
              }}>
                WE BELIEVE SMES ARE THE BACKBONE OF AFRICA'S ECONOMY — AND DESERVE ACCESS, TOOLS, AND A SEAT AT THE TABLE. BIG MARKETPLACE IS HOW WE MAKE THAT REAL.
              </p>
            </div>
            
            {/* Mission */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: '8px',
              padding: '25px',
              textAlign: 'center',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              borderTop: `4px solid ${colors.secondary}`
            }}>
              <div style={{
                backgroundColor: `${colors.secondary}20`,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                border: `2px solid ${colors.secondary}`
              }}>
                <FaHandshake size={24} color={colors.secondary} />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>Our Mission</h3>
              <p style={{ 
                fontSize: '0.9rem',
                lineHeight: '1.6',
                color: colors.dark
              }}>
                TO CLOSE THE $330B SME FUNDING GAP IN AFRICA BY MAKING GROWTH ACCESSIBLE, NOT ACCIDENTAL.
              </p>
            </div>
            
            {/* Promise */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: '8px',
              padding: '25px',
              textAlign: 'center',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              borderTop: `4px solid ${colors.accent}`
            }}>
              <div style={{
                backgroundColor: `${colors.accent}20`,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                border: `2px solid ${colors.accent}`
              }}>
                <FaPromise size={24} color={colors.accent} />
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>Our Promise</h3>
              <p style={{ 
                fontSize: '0.9rem',
                lineHeight: '1.6',
                color: colors.dark
              }}>
                TO BUILD A CONTINENT-WIDE TRUST ECONOMY WHERE EVERY SME HAS A FAIR CHANCE TO GROW AND EVERY INVESTOR FINDS QUALITY OPPORTUNITIES.
              </p>
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ 
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '25px',
              color: colors.secondary,
              textTransform: 'uppercase'
            }}>
              We're Building A Continent-Wide Trust Economy. Join Us.
            </p>
            
            <Link to="/register" style={{
              backgroundColor: colors.primary,
              color: colors.light,
              padding: '12px 30px',
              borderRadius: '50px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase'
            }}>
              Get Started
            </Link>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
          clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)'
        }}></div>
      </section>

      {/* Scroll to top button */}
      {showScroll && 
        <button onClick={scrollTop} style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: colors.primary,
          color: 'white',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 100,
          transition: 'all 0.3s ease',
          ':hover': {
            transform: 'scale(1.1)'
          }
        }}>
          <FaArrowRight style={{ transform: 'rotate(-90deg)' }} />
        </button>
      }

      {/* Chatbot Button */}
      <button 
        onClick={() => setChatbotOpen(!chatbotOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '100px',
          backgroundColor: colors.primary,
          color: 'white',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 5px 25px rgba(0,0,0,0.3)',
          zIndex: 100,
          transition: 'all 0.3s ease',
          ':hover': {
            transform: 'scale(1.1)'
          }
        }}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FaComments size={32} />
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: colors.secondary,
            color: 'white',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            1
          </div>
        </div>
      </button>

      {/* Chatbot Window */}
      {chatbotOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '100px',
          width: '350px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          zIndex: 101,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transform: chatbotOpen ? 'translateY(0)' : 'translateY(20px)',
          opacity: chatbotOpen ? 1 : 0,
          transition: 'all 0.3s ease'
        }}>
          {/* Chatbot Header */}
          <div style={{
            backgroundColor: colors.primary,
            color: 'white',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaComments style={{ marginRight: '10px' }} />
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                BIG MARKETPLACE ASSISTANT
              </h3>
            </div>
            <button 
              onClick={() => setChatbotOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              <FaTimes />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div style={{
            flex: 1,
            padding: '20px',
            height: '300px',
            overflowY: 'auto',
            backgroundColor: '#f9f9f9'
          }}>
            {messages.map((message, index) => (
              <div 
                key={index}
                style={{
                  marginBottom: '15px',
                  textAlign: message.sender === 'user' ? 'right' : 'left'
                }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '10px 15px',
                  borderRadius: message.sender === 'user' 
                    ? '18px 18px 0 18px' 
                    : '18px 18px 18px 0',
                  backgroundColor: message.sender === 'user' 
                    ? colors.primary 
                    : '#e5e5ea',
                  color: message.sender === 'user' ? 'white' : 'black',
                  maxWidth: '80%'
                }}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Chat Input */}
          <div style={{
            display: 'flex',
            padding: '15px',
            borderTop: '1px solid #eee',
            backgroundColor: 'white'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '10px 15px',
                borderRadius: '20px',
                border: `1px solid ${colors.neutral}`,
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                backgroundColor: colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                marginLeft: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                ':hover': {
                  backgroundColor: colors.secondary
                }
              }}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LandingPage;