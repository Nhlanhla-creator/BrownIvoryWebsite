import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { 
  FaArrowRight, FaHandshake, FaChartLine, FaBuilding, 
  FaUsers, FaCheck, FaChartBar, FaRoad, 
  FaGlobeAfrica, FaLightbulb, FaBullseye, FaHandHoldingHeart,
  FaSearch, FaChartPie, FaMedal, FaSeedling
} from 'react-icons/fa';
import { 
  MdBusiness, MdAttachMoney, MdCorporateFare, MdSupport,
  MdScore, MdTrendingUp, MdAssessment
} from 'react-icons/md';
import './LandingPage.css';

// Colors object defined at the top level
const colors = {
  primary: '#754A2D',
  primaryLight: '#9E6E3C',
  dark: '#372C27',
  light: '#F2F0E6',
  neutral: '#D3D2CE',
  accent: '#BCAE9C'
};

const LandingPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Card definitions
  const cardDefinitions = {
    smse: "Small and Medium-Sized Enterprises looking to grow their business through funding and partnerships.",
    investor: "Individuals or organizations looking to invest in verified, high-potential African businesses.",
    corporate: "Companies seeking to fulfill CSI/ESD requirements by partnering with aligned SMSEs.",
    support: "Accelerators, incubators and development agencies supporting SMSE growth."
  };

  return (
    <div className="landing-page">
      <Header />
      
      {/* 1. Hero Section */}
      <section className="hero-section" style={{ 
        backgroundColor: colors.dark,
        backgroundImage: 'linear-gradient(rgba(55, 44, 39, 0.85), rgba(55, 44, 39, 0.85)), url(https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
        minHeight: '45vh',
        padding: '50px 0',
        position: 'relative'
      }}>
        <div className="section-curve-bottom" style={{ 
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
          transform: 'rotate(180deg)'
        }}>
          <svg 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            style={{
              display: 'block',
              width: 'calc(100% + 1.3px)',
              height: '80px'
            }}
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              style={{ fill: colors.light }}
            ></path>
          </svg>
        </div>
        
        <div className="container slim">
          <div className="hero-content">
            <h1 style={{ color: colors.light, fontSize: '2rem' }}>
              <span className="text-pop">BIG</span> on Ideas. <span className="text-pop">BIG</span> on Growth. <span className="text-pop">BIG</span> on Impact.
            </h1>
            <p className="hero-subhead" style={{ 
              color: colors.accent,
              fontSize: '1rem'
            }}>
              Holistic solutions designed to propel high-impact enterprises forward.
            </p>
            <div className="animated-cta">
              <Link 
                to="/AuthForm" 
                className="cta-button pulse" 
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.light,
                  padding: '10px 20px'
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who is it for */}
      <section className="audience-section" style={{ 
        backgroundImage: 'url("/background7.avif")',
        backgroundSize: 'cover',
        padding: '80px 0 120px',
        position: 'relative'
      }}>
        <div className="section-curve-top" style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0
        }}>
          <svg 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            style={{
              display: 'block',
              width: 'calc(100% + 1.3px)',
              height: '80px'
            }}
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              style={{ fill: colors.dark }}
            ></path>
          </svg>
        </div>
        
        <div className="section-curve-bottom" style={{ 
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
          transform: 'rotate(180deg)'
        }}>
          <svg 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            style={{
              display: 'block',
              width: 'calc(100% + 1.3px)',
              height: '80px'
            }}
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              style={{ fill: '#4B372F' }}
            ></path>
          </svg>
        </div>
        
        <div className="container slim">
          <h2 style={{ 
            color: colors.dark,
            textDecoration: 'underline',
            textDecorationColor: colors.primary,
            textUnderlineOffset: '10px',
            textDecorationThickness: '3px',
            textAlign: 'center'
          }} className="section-title">Who is it for</h2>
          <div className="audience-grid">
            {[
              { 
                id: 'smse',
                icon: <MdBusiness className="icon-pop"/>, 
                title: "SMSEs", 
                text: "Get Visibility. Get Scored. Get Matched. Grow your business.",
                link: "HowItWorksSMSE"
              },
              { 
                id: 'investor',
                icon: <MdAttachMoney className="icon-pop"/>, 
                title: "Investors", 
                text: "Discover. Verify. Invest. Find investment-ready SMSEs.",
                link: "HowItWorksInvestors"
              },
              { 
                id: 'corporate',
                icon: <MdCorporateFare className="icon-pop"/>, 
                title: "Corporates", 
                text: "Source. Partner. Amplify Impact. Accelerate CSI & ESD impact.",
                link: "HowItWorksCorporates"
              },
              { 
                id: 'support',
                icon: <MdSupport className="icon-pop"/>, 
                title: "Support Partners", 
                text: "Identify. Nurture. Track. Boost your cohort with partnerships.",
                link: "HowItWorksAccelerators"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="audience-card card-hover" 
                style={{ 
                  backgroundColor: 'white',
                  borderTop: `4px solid ${colors.primary}`,
                  outline: '2px solid #9E6E3C',
                  outlineOffset: '2px',
                  borderRadius: '8px',
                }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="audience-icon">
                  {item.icon}
                </div>
                <h3 style={{ color: colors.dark, textAlign: 'center' }}>{item.title}</h3>
                <p style={{ color: colors.dark, textAlign: 'center' }}>{item.text}</p>
                
                {hoveredCard === item.id && (
                  <div className="card-definition" style={{ 
                    position: 'absolute',
                    bottom: '-80px',
                    left: 0,
                    width: '100%',
                    zIndex: 10
                  }}>
                    <div className="definition-content">
                      <p>{cardDefinitions[item.id]}</p>
                      <div className="definition-arrow" style={{ 
                        top: '-10px',
                        bottom: 'auto',
                        borderTop: 'none',
                        borderBottom: `10px solid ${colors.primary}`
                      }}></div>
                    </div>
                  </div>
                )}
                
                <div className="card-footer">
                  <div className="more-options">
                    <span className="more-link" style={{ color: colors.primary }}>More ↓</span>
                    <div className="more-dropdown">
                      <Link to={`/${item.link}`} className="dropdown-item">
                        <span>How it works</span> <FaArrowRight />
                      </Link>
                      <Link to="/AuthForm" className="dropdown-item">
                        <span>Get started</span> <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                  <Link to={`/${item.link}`} className="mini-button" style={{ 
                    backgroundColor: colors.primary,
                    color: colors.light,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>→</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What is BIG Marketplace */}
      <section className="marketplace-section animate-on-scroll" style={{ 
        padding: '120px 0 80px',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(to right, #4B372F, #A68B73, #EBDDCB)',
        position: 'relative'
      }}>
        <div className="section-curve-top" style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0
        }}>
          <svg 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            style={{
              display: 'block',
              width: 'calc(100% + 1.3px)',
              height: '80px'
            }}
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              style={{ fill: colors.light }}
            ></path>
          </svg>
        </div>
        
        <div className="container" style={{ width: '80%' }}>
          <div className="marketplace-content" style={{ 
            backgroundColor: 'white',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ 
              color: colors.dark,
              fontSize: '2.2rem',
              marginBottom: '20px',
              textAlign: 'center'
            }} className="section-title">
              What is BIG Marketplace?
            </h2>
            <p className="tagline" style={{ 
              color: colors.primary, 
              fontSize: '1.2rem',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              The trust layer for business in Africa.<br/>One profile. One score. Many doors.
            </p>
            
            <div className="feature-cards">
              <div className="feature-card">
                <FaSearch className="feature-icon" style={{ color: colors.primary }} />
                <p style={{ color: colors.dark }}>Get matched to funders, services, and impact opportunities.</p>
              </div>
              <div className="feature-card">
                <MdScore className="feature-icon" style={{ color: colors.primary, fontSize: '1.8rem' }} />
                <p style={{ color: colors.dark }}>Track your BIG Score and see exactly what's missing.</p>
              </div>
              <div className="feature-card">
                <FaMedal className="feature-icon" style={{ color: colors.primary }} />
                <p style={{ color: colors.dark }}>Grow your credibility with verified compliance.</p>
              </div>
            </div>

            <div style={{ 
              marginTop: '40px', 
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              gap: '20px'
            }}>
              <Link 
                to="/AboutPage" 
                className="cta-button" 
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.light,
                  display: 'inline-block',
                  padding: '12px 25px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                About Marketplace →
              </Link>
              <Link 
                to="/AboutPage" 
                className="cta-button" 
                style={{ 
                  backgroundColor: colors.primaryLight,
                  color: colors.light,
                  display: 'inline-block',
                  padding: '12px 25px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Introducing the BIG score */}
      <section className="score-section animate-on-scroll" style={{ 
        padding: '120px 0 80px',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'url("/background4.jpg")',
        position: 'relative'
      }}>
        <div className="section-curve-top" style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0
        }}>
          <svg 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            style={{
              display: 'block',
              width: 'calc(100% + 1.3px)',
              height: '80px'
            }}
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              style={{ fill: colors.light }}
            ></path>
          </svg>
        </div>
        
        <div className="container" style={{ width: '80%' }}>
          <div className="score-content" style={{ 
            backgroundColor: 'white',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            outline: '2px solid #9E6E3C',
            outlineOffset: '2px',
            borderRadius: '8px'
          }}>
            <h2 style={{ 
              color: colors.dark,
              fontSize: '2.2rem',
              marginBottom: '20px',
              textAlign: 'center'
            }} className="section-title">
              Introducing the BIG Score
            </h2>
            <p className="score-headline" style={{ 
              color: colors.primary,
              fontSize: '1.2rem',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Think of it as a credit score — but smarter for your business.
            </p>
            
            <div className="score-visual">
              <div className="score-meter-container">
                <div className="score-meter" style={{ backgroundColor: colors.neutral }}>
                  <div className="meter-fill" style={{ 
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
                    width: '75%',
                    height: '100%'
                  }}></div>
                </div>
                <div className="meter-labels">
                  <span style={{ color: colors.dark }}>0</span>
                  <span className="active" style={{ color: colors.primary }}>75 - Fundable!</span>
                  <span style={{ color: colors.dark }}>100</span>
                </div>
              </div>
            </div>
            
            <div className="score-benefits">
              <div className="benefit">
                <MdTrendingUp className="benefit-icon" style={{ color: colors.primary, fontSize: '1.8rem' }} />
                <h4 style={{ color: colors.dark }}>Capital Access</h4>
                <p style={{ color: colors.dark }}>Loans, grants, equity based on your score</p>
              </div>
              <div className="benefit">
                <FaChartPie className="benefit-icon" style={{ color: colors.primary }} />
                <h4 style={{ color: colors.dark }}>Opportunities</h4>
                <p style={{ color: colors.dark }}>New customers, corporate contracts</p>
              </div>
              <div className="benefit">
                <MdAssessment className="benefit-icon" style={{ color: colors.primary, fontSize: '1.8rem' }} />
                <h4 style={{ color: colors.dark }}>Guidance</h4>
                <p style={{ color: colors.dark }}>Personalized improvement roadmap</p>
              </div>
            </div>

            <div style={{ 
              marginTop: '40px', 
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              gap: '20px'
            }}>
              <Link 
                to="/bigscorepage" 
                className="cta-button" 
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.light,
                  display: 'inline-block',
                  padding: '12px 25px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                Learn About BIG Score →
              </Link>
              <Link 
                to="/AuthForm" 
                className="cta-button" 
                style={{ 
                  backgroundColor: colors.primaryLight,
                  color: colors.light,
                  display: 'inline-block',
                  padding: '12px 25px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Don't Qualify Yet? */}
      <section className="pathway-section" style={{ 
        padding: '120px 0 80px',
        background: 'linear-gradient(120deg, #372C27, #9E6E3C 50%, #F2F0E6 100%)',
        color: colors.light,
        position: 'relative'
      }}>
        <div className="section-curve-top" style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0
        }}>
          <svg 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            style={{
              display: 'block',
              width: 'calc(100% + 1.3px)',
              height: '80px'
            }}
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              style={{ fill: 'white' }}
            ></path>
          </svg>
        </div>
        
        <div className="container slim">
          <div className="pathway-content">
            <h2 style={{ 
              color: colors.light,
              fontSize: '2.2rem',
              fontWeight: '700',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Don't Qualify Yet? We've Got You.
              <span style={{
                display: 'block',
                width: '80px',
                height: '4px',
                background: colors.accent,
                margin: '15px auto 0'
              }}></span>
            </h2>
            <p className="pathway-headline" style={{ 
              color: colors.accent,
              fontSize: '1.2rem',
              fontWeight: '500',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              BIG doesn't shut doors — it shows you where to go.
            </p>
            
            <div className="pathway-animation">
              <div className="path-step" style={{ 
                backgroundColor: colors.light,
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <div className="step-icon">
                  <FaSeedling style={{ color: colors.primary, fontSize: '1.5rem' }} />
                </div>
                <div className="step-number" style={{ 
                  backgroundColor: colors.primary,
                  color: colors.light
                }}>1</div>
                <p style={{ color: colors.dark }}>Get Your Score</p>
              </div>
              <div className="path-connector" style={{ backgroundColor: colors.accent }}></div>
              <div className="path-step" style={{ 
                backgroundColor: colors.light,
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <div className="step-icon">
                  <FaChartLine style={{ color: colors.primary, fontSize: '1.5rem' }} />
                </div>
                <div className="step-number" style={{ 
                  backgroundColor: colors.primary,
                  color: colors.light
                }}>2</div>
                <p style={{ color: colors.dark }}>Improve</p>
              </div>
              <div className="path-connector" style={{ backgroundColor: colors.accent }}></div>
              <div className="path-step" style={{ 
                backgroundColor: colors.light,
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <div className="step-icon">
                  <FaHandshake style={{ color: colors.primary, fontSize: '1.5rem' }} />
                </div>
                <div className="step-number" style={{ 
                  backgroundColor: colors.primary,
                  color: colors.light
                }}>3</div>
                <p style={{ color: colors.dark }}>Get Funded</p>
              </div>
            </div>

            <div style={{ 
              marginTop: '40px', 
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              gap: '20px'
            }}>
              <Link 
                to="/AuthForm" 
                className="cta-button" 
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.light,
                  display: 'inline-block',
                  padding: '12px 25px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Vision, Mission and Promises */}
      <section className="vision-section" style={{ 
        padding: '120px 0 80px',
        backgroundImage: 'url("/background5.webp")',
        position: 'relative'
      }}>
        <div className="section-curve-top" style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0
        }}>
          <svg 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            style={{
              display: 'block',
              width: 'calc(100% + 1.3px)',
              height: '80px'
            }}
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              style={{ fill: colors.light }}
            ></path>
          </svg>
        </div>
        
        <div className="container slim">
          <div className="vision-content">
            <h2 style={{ 
              color: colors.dark,
              textAlign: 'center',
              marginBottom: '15px'
            }}>Our Vision, Mission and Promises</h2>
            <p className="vision-headline" style={{ 
              color: colors.primary,
              fontSize: '1.2rem',
              fontWeight: '500',
              marginBottom: '40px',
              textAlign: 'center',
              
            }}>
              Fund Thousands. Transform Millions.
            </p>
            
            <div className="vision-cards">
              <div className="vision-row">
                <div className="vision-card" style={{ 
                  backgroundColor: 'white',
                  outline: '2px solid #9E6E3C',
                  outlineOffset: '2px',
                  borderRadius: '8px',
                }}>
                  <div className="vision-icon">
                    <FaLightbulb style={{ color: colors.primary, fontSize: '2rem' }} />
                  </div>
                  <h3 style={{ color: colors.dark, textAlign: 'center' }}>Our Vision</h3>
                  <p style={{ color: colors.dark, textAlign: 'center' }}>
                    We believe SMEs are the backbone of Africa's economy — and deserve access, tools, and a seat at the table.
                  </p>
                </div>
                <div className="vision-card" style={{ 
                  backgroundColor: 'white',
                  outline: '2px solid #9E6E3C',
                  outlineOffset: '2px',
                  borderRadius: '8px',
                }}>
                  <div className="vision-icon">
                    <FaBullseye style={{ color: colors.primary, fontSize: '2rem' }} />
                  </div>
                  <h3 style={{ color: colors.dark, textAlign: 'center' }}>Our Mission</h3>
                  <p style={{ color: colors.dark, textAlign: 'center' }}>
                    To close the $330B SME funding gap in Africa by making growth accessible, not accidental.
                  </p>
                </div>
              </div>
              <div className="promise-card-container">
                <div className="vision-card promise-card" style={{ 
                  backgroundColor: 'white',
                  outline: '2px solid #9E6E3C',
                  outlineOffset: '2px',
                  borderRadius: '8px',
                }}>
                  <div className="vision-icon">
                    <FaHandHoldingHeart style={{ color: colors.primary, fontSize: '2rem' }} />
                  </div>
                  <h3 style={{ color: colors.dark, textAlign: 'center' }}>Our Promises</h3>
                  <p style={{ color: colors.dark, textAlign: 'center' }}>
                    To provide transparent scoring, fair opportunities, and continuous support for all SMSEs.
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              marginTop: '40px',
              display: 'flex',
              justifyContent: 'center',
              gap: '20px'
            }}>
              <button className="cta-button" style={{ 
                backgroundColor: colors.primary,
                color: colors.light,
                padding: '12px 25px',
                border: 'none'
              }}>
                Join the Movement
              </button>
              <Link 
                to="/AuthForm" 
                className="cta-button" 
                style={{ 
                  backgroundColor: colors.primaryLight,
                  color: colors.light,
                  padding: '12px 25px',
                  textDecoration: 'none'
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;