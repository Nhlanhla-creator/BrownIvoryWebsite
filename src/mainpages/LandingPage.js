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
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
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

  const handleLoginClick = (mode = 'login') => {
    console.log('Navigating to register'); // Debug log
    navigate(`/LoginRegister?mode=${mode}`);
  };

  return (
    <div className="landing-page" style={{ 
      backgroundColor: colors.light,
      fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif",
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <style>
        {`
          .benefit-card {
            position: relative;
          }
          .benefit-card .tooltip {
            visibility: hidden;
            opacity: 0;
            width: 100%;
            background-color: ${colors.dark};
            color: #fff;
            text-align: center;
            border-radius: 4px;
            padding: 10px;
            position: absolute;
            z-index: 1;
            bottom: 100%;
            left: 0;
            transition: all 0.3s ease;
            font-size: 0.8rem;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
          }
          .benefit-card:hover .tooltip {
            visibility: visible;
            opacity: 1;
          }
        `}
      </style>
      
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
          position: 'relative'
        }}>
          <div style={{
            width: '100%',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <h1 style={{ 
              fontSize: '3.1rem',
              fontWeight: '800',
              lineHeight: '1.2',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              margin: '0 auto',
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'clip'
            }}>
              <span style={{ color: colors.secondary }}>BIG</span> on Ideas. <span style={{ color: colors.secondary }}>BIG</span> on Growth. <span style={{ color: colors.secondary }}>BIG</span> on Impact.
            </h1>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '60% 40%',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div style={{ zIndex: 1 }}>
              <p style={{ 
                fontSize: '1.5rem',
                margin: '0 0 20px 0',
                opacity: 0.9
              }}>
                Holistic solutions designed to propel high-impact enterprises forward — because scaling success requires strategy, insight, and the right partnerships.
              </p>
              <p style={{ 
                fontSize: '1rem',
                margin: '0 0 25px 0',
                fontWeight: '500'
              }}>
                We're closing the Small, Medium, and Social Enterprises (SMSEs) funding gap in Africa — with the tools, trust, and pathways to grow your business.
              </p>
              <p style={{
                fontSize: '0.9rem',
                fontStyle: 'italic',
                marginBottom: '25px'
              }}>
                Trusted by 500+ SMSEs and 50+ funders across Africa
              </p>
              <div style={{ 
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => handleLoginClick('register')}
                  style={{
                    backgroundColor: colors.secondary,
                    color: colors.light,
                    padding: '12px 30px',
                    borderRadius: '50px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    ':hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Get Started
                </button>
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
                  See Demo
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
            <div className="benefit-card" style={{
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
              <div className="tooltip">
                SMSEs = Small, Medium and Social Enterprises. These are businesses with 5-250 employees and annual revenues between $50k-$15M.
              </div>
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
              }}>
                Get visibility. Get<br />Scored. Get matched.
              </p>
              <p style={{
                fontSize: '0.85rem',
                color: colors.dark,
                marginBottom: '15px'
              }}>
                Grow your business with access to funding and partnerships.
              </p>
              <Link to="/HowItWorksSMSE" style={{
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
              <button
                onClick={() => handleLoginClick('register')}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.light,
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Get Started
              </button>
            </div>

            {/* Investors Card */}
            <div className="benefit-card" style={{
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
              <div className="tooltip">
                Investors include venture capitalists, angel investors, impact investors, and other funding institutions looking for investment-ready businesses.
              </div>
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
              }}>
                Discover. Verify.<br />Invest.
              </p>
              <p style={{
                fontSize: '0.85rem',
                color: colors.dark,
                marginBottom: '15px'
              }}>
                Discover investment-ready SMSEs with verified compliance and growth readiness.
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
              <button
                onClick={() => handleLoginClick('register')}
                style={{
                  backgroundColor: colors.secondary,
                  color: colors.light,
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Get Started
              </button>
            </div>

            {/* Corporates Card */}
            <div className="benefit-card" style={{
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
              <div className="tooltip">
                Corporates include large companies looking for suppliers, partners, or investment opportunities through their CSI, ESD or procurement programs.
              </div>
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
              }}>Source. Partner. Amplify impact.</p>
              <p style={{
                fontSize: '0.85rem',
                color: colors.dark,
                marginBottom: '15px'
              }}>
                Accelerate CSI & ESD impact by sourcing verified SMSEs that align with your goals.
              </p>
              <Link to="/HowItWorksCorporates" style={{
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
              <button
                onClick={() => handleLoginClick('register')}
                style={{
                  backgroundColor: colors.dark,
                  color: colors.light,
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Get Started
              </button>
            </div>

            {/* Support Partners Card */}
            <div className="benefit-card" style={{
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
              <div className="tooltip">
                Support partners include incubators, accelerators, development agencies and other organizations that support SMSE growth.
              </div>
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
              }}>
                Identify. Nurture.<br />Track.
              </p>
              <p style={{
                fontSize: '0.85rem',
                color: colors.dark,
                marginBottom: '15px'
              }}>
                Boost your cohort with funding, marketplace access, mentorship, and partnerships.
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
              <button
                onClick={() => handleLoginClick('register')}
                style={{
                  backgroundColor: colors.accent,
                  color: colors.dark,
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Get Started
              </button>
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
                The trust layer for business in Africa.
              </p>
              <p style={{ 
                fontSize: '1.1rem',
                marginBottom: '25px',
                color: colors.dark,
                textTransform: 'uppercase'
              }}>
                One profile. One score. Many doors.
              </p>
              
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '10px' }} />
                  <span style={{ color: colors.dark }}>Get matched to funders, services, and impact opportunities.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '10px' }} />
                  <span style={{ color: colors.dark }}>Track your BIG Score and see exactly what's missing.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '10px' }} />
                  <span style={{ color: colors.dark }}>Grow your credibility with verified compliance.</span>
                </div>
              </div>
              
              <p style={{ 
                fontSize: '1rem',
                marginBottom: '25px',
                color: colors.dark
              }}>
                Whether you're an entrepreneur, investor, or corporate champion — BIG connects you to who (and what) you need to grow.
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
                    BIG Marketplace was founded to solve one problem: Africa's SMEs lack trust, not potential. We combine data, partnerships, and technology to create a fair, transparent ecosystem where:
                  </p>
                  <ul style={{ 
                    listStyleType: 'disc',
                    paddingLeft: '20px',
                    marginBottom: '12px'
                  }}>
                    <li style={{ marginBottom: '6px', textTransform: 'uppercase' }}>SMSEs prove their credibility.</li>
                    <li style={{ marginBottom: '6px', textTransform: 'uppercase' }}>Funders find verified opportunities.</li>
                    <li style={{ textTransform: 'uppercase' }}>Corporates maximize impact.</li>
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
                The BIG Marketplace ecosystem connects SMSEs with funders, support partners, and customers.
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
              Introducing the <span style={{ color: colors.primary }}>BIG</span> Score
            </h2>
            <p style={{ 
              fontSize: '1rem',
              color: colors.dark,
              maxWidth: '800px',
              margin: '0 auto',
              textTransform: 'uppercase'
            }}>
              A comprehensive assessment that evaluates your business across multiple dimensions
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
                Our proprietary BIG Score evaluates your financial health, operational maturity, compliance status, and growth potential.
              </p>
              <ul style={{ 
                listStyleType: 'none',
                padding: 0,
                margin: '0 0 15px 0',
                textAlign: 'left'
              }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '8px', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.85rem' }}>Financial health: Revenue trends, profitability</span>
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '8px', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.85rem' }}>Operational maturity: Systems, processes</span>
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '8px', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.85rem' }}>Compliance status: Legal, regulatory</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <FaCheck style={{ color: colors.primary, marginRight: '8px', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.85rem' }}>Growth potential: Market opportunity</span>
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
                Your BIG Score opens doors to opportunities matched to your business's current stage and potential.
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
                    Funding
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
                    Partnerships
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
                    Compliance
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
                    Guidance
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center',
            marginTop: '20px'
          }}>
            <Link to="/BigScorePage" style={{
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
                If your score is low, we'll guide you to:
              </p>
              <ul style={{ 
                listStyleType: 'disc',
                paddingLeft: '20px',
                marginBottom: '15px'
              }}>
                <li style={{ marginBottom: '6px' }}>Accelerators to refine your model.</li>
                <li style={{ marginBottom: '6px'}}>Mentors to fix compliance gaps.</li>
                <li style={{marginBottom: '6px' }}>Incubators to prep for funding.</li>
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
                We believe SMEs are the backbone of Africa's economy — and deserve access, tools, and a seat at the table. BIG Marketplace is how we make that real.
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
                To close the $330B SME funding gap in Africa by making growth accessible, not accidental.
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
                To build a continent-wide trust economy where every SME has a fair chance to grow and every investor finds quality opportunities.
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
              We're building a continent-wide trust economy. Join us.
            </p>
            
            <button
              onClick={() => handleLoginClick('register')}
              style={{
                backgroundColor: colors.primary,
                color: colors.light,
                padding: '12px 30px',
                borderRadius: '50px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Get Started
            </button>
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
          {/* Robot Head Design */}
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Eyes */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '100%',
              marginBottom: '5px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: colors.primary,
                borderRadius: '50%'
              }}></div>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: colors.primary,
                borderRadius: '50%'
              }}></div>
            </div>
            {/* Mouth */}
            <div style={{
              width: '16px',
              height: '6px',
              backgroundColor: colors.primary,
              borderRadius: '0 0 8px 8px'
            }}></div>
          </div>
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

      {/* Chatbot Window with Robot Head */}
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
          {/* Chatbot Header with Robot Head */}
          <div style={{
            backgroundColor: colors.primary,
            color: 'white',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Robot Head Icon */}
              <div style={{
                marginRight: '10px',
                width: '30px',
                height: '30px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {/* Eyes */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  width: '100%',
                  marginBottom: '3px'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: colors.primary,
                    borderRadius: '50%'
                  }}></div>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: colors.primary,
                    borderRadius: '50%'
                  }}></div>
                </div>
                {/* Mouth */}
                <div style={{
                  width: '12px',
                  height: '4px',
                  backgroundColor: colors.primary,
                  borderRadius: '0 0 6px 6px'
                }}></div>
              </div>
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