import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const BIGScorePage = () => {
  const [activeTab, setActiveTab] = useState('funding');
  const [expandedTables, setExpandedTables] = useState({
    fundability: false,
    scoringRubric1: false,
    scoringRubric2: false,
    serviceTraditional: false,
    serviceSocial: false
  });

  const toggleTable = (tableName) => {
    setExpandedTables(prev => ({
      ...prev,
      [tableName]: !prev[tableName]
    }));
  };

  return (
    <div style={{ 
      backgroundImage: 'url("https://static.vecteezy.com/system/resources/thumbnails/011/950/301/small_2x/abstract-brown-liquid-background-design-with-various-shapes-and-copy-space-area-suitable-for-posters-and-banners-free-vector.jpg")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      fontFamily: "'Poppins', sans-serif",
      color: '#372C27'
    }}>
      <div style={{
       backgroundColor: 'rgba(242, 240, 230, 0.36)',
        minHeight: '100vh'
      }}>
        <Header />
        
        {/* Hero Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(55, 44, 39, 0.9) 0%, rgba(158, 111, 60, 0.36) 100%), url("https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '120px 20px',
          textAlign: 'center',
          color: '#F2F0E6',
          marginBottom: '60px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: 'rgba(242, 240, 230, 0.1)',
            zIndex: 1
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            right: '-30px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: 'rgba(158, 110, 60, 0.2)',
            zIndex: 1
          }}></div>
          <div style={{
            position: 'relative',
            zIndex: 2
          }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              marginBottom: '20px',
              letterSpacing: '1px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>BIG Score</h1>
            <p style={{
              fontSize: '1.5rem',
              maxWidth: '800px',
              margin: '0 auto 40px',
              lineHeight: '1.6'
            }}>Africa's first AI-powered trust metric for credible business partnerships</p>
            <button style={{
              backgroundColor: '#9E6E3C',
              color: 'white',
              border: 'none',
              padding: '16px 50px',
              borderRadius: '30px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 1
            }}>
              <span style={{
                position: 'relative',
                zIndex: 2
              }}>Calculate Your BIG Score</span>
              <span style={{
                position: 'absolute',
                top: '0',
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: '0.5s',
                zIndex: 1
              }}></span>
            </button>
          </div>
        </div>
        
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 20px 60px',
          position: 'relative'
        }}>
          {/* Floating decorative elements */}
          <div style={{
            position: 'absolute',
            top: '100px',
            right: '-50px',
            width: '100px',
            height: '100px',
            backgroundImage: 'url("https://www.transparentpng.com/thumb/abstract/abstract-pattern-png-5.png")',
            backgroundSize: 'contain',
            opacity: 0.1,
            zIndex: 0
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '200px',
            left: '-50px',
            width: '150px',
            height: '150px',
            backgroundImage: 'url("https://www.transparentpng.com/thumb/abstract/abstract-background-png-4.png")',
            backgroundSize: 'contain',
            opacity: 0.1,
            zIndex: 0
          }}></div>
          
          {/* What is BIG Score Section */}
          <div style={{ 
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            marginBottom: '60px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '5px',
              background: 'linear-gradient(90deg, #9E6E3C, #754A2D)'
            }}></div>
            <h2 style={{ 
              color: '#754A2D', 
              fontSize: '2.2rem',
              fontWeight: '700',
              marginBottom: '25px',
              position: 'relative',
              display: 'inline-block'
            }}>
              <span style={{
                position: 'absolute',
                bottom: '-10px',
                left: '0',
                width: '50px',
                height: '3px',
                backgroundColor: '#9E6E3C',
                borderRadius: '3px'
              }}></span>
              What is the BIG Score?
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              lineHeight: '1.8',
              maxWidth: '800px',
              margin: '0 auto 30px'
            }}>
              The BIG Score is Africa's first AI-powered trust metric that validates SMEs, social enterprises, and ESG-focused businesses as credible partners for funding, supply chains, and impact collaborations.
            </p>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              flexWrap: 'wrap',
              marginBottom: '30px'
            }}>
              {[
                "A credit score for business credibility",
                "A growth roadmap for SMEs",
                "A risk-reducer for funders and corporates"
              ].map((item, index) => (
                <div key={index} style={{
                  backgroundColor: '#F2F0E6',
                  padding: '30px',
                  borderRadius: '12px',
                  width: '280px',
                  textAlign: 'center',
                  flex: '1',
                  minWidth: '250px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                  borderTop: '3px solid #9E6E3C',
                  ':hover': {
                    transform: 'translateY(-10px)'
                  }
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#754A2D',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: '#F2F0E6',
                    fontSize: '1.5rem'
                  }}>
                    {index === 0 ? '📊' : index === 1 ? '🚀' : '🛡️'}
                  </div>
                  <p style={{
                    fontWeight: '600',
                    color: '#372C27',
                    fontSize: '1.1rem'
                  }}>{item}</p>
                </div>
              ))}
            </div>
            
            <p style={{ 
              fontStyle: 'italic',
              color: '#754A2D',
              fontWeight: '500',
              fontSize: '1.1rem',
              position: 'relative',
              padding: '20px',
              backgroundColor: 'rgba(158, 110, 60, 0.1)',
              borderRadius: '8px',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              <span style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                fontSize: '2rem',
                lineHeight: '1',
                color: 'rgba(158, 110, 60, 0.3)'
              }}>"</span>
              Powered by blockchain-backed data and dynamic AI analysis, it replaces guesswork with standardized, actionable insights.
              <span style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                fontSize: '2rem',
                lineHeight: '1',
                color: 'rgba(158, 110, 60, 0.3)'
              }}>"</span>
            </p>
          </div>

          {/* Why BIG Score Wins Section */}
          <div style={{ 
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            marginBottom: '60px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '150px',
              height: '150px',
              backgroundColor: 'rgba(158, 110, 60, 0.05)',
              borderRadius: '50%',
              transform: 'translate(50px, -50px)'
            }}></div>
            <h2 style={{ 
              color: '#372C27', 
              fontSize: '2.2rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '50px',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: '#9E6E3C',
                borderRadius: '2px'
              }}></span>
              Why the BIG Score Wins for Everyone
            </h2>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              position: 'relative',
              zIndex: 1
            }}>
              {/* Column 1 */}
              <div style={{ 
                backgroundColor: '#F2F0E6',
                padding: '30px',
                borderRadius: '12px',
                minHeight: '350px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                borderLeft: '5px solid #754A2D',
                ':hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#754A2D',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#F2F0E6',
                  fontSize: '1.5rem'
                }}>🏢</div>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  marginBottom: '20px',
                  color: '#754A2D'
                }}>For SMEs & Social Enterprises</h3>
                <ul style={{ 
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  flex: '1'
                }}>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ marginRight: '10px', color: '#9E6E3C' }}>✅</span> 
                    <span>See exactly where you stand with clear scoring breakdowns</span>
                  </li>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ marginRight: '10px', color: '#9E6E3C' }}>📈</span> 
                    <span>Boost visibility to the right funders and customers</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ marginRight: '10px', color: '#9E6E3C' }}>🔍</span> 
                    <span>Get tailored "next steps" to improve your score</span>
                  </li>
                </ul>
              </div>
              
              {/* Column 2 */}
              <div style={{ 
                backgroundColor: '#D3D2CE',
                padding: '30px',
                borderRadius: '12px',
                minHeight: '350px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                borderLeft: '5px solid #372C27',
                ':hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#372C27',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#F2F0E6',
                  fontSize: '1.5rem'
                }}>💰</div>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  marginBottom: '20px',
                  color: '#372C27'
                }}>For Funders & Investors</h3>
                <ul style={{ 
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  flex: '1'
                }}>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ marginRight: '10px', color: '#754A2D' }}>⏱️</span> 
                    <span>Cut due diligence time by 70% with pre-vetted opportunities</span>
                  </li>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ marginRight: '10px', color: '#754A2D' }}>📊</span> 
                    <span>Compare apples-to-apples with standardized metrics</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ marginRight: '10px', color: '#754A2D' }}>🤖</span> 
                    <span>AI-matched recommendations aligned with your criteria</span>
                  </li>
                </ul>
              </div>
              
              {/* Column 3 */}
              <div style={{ 
                backgroundColor: '#9E6E3C',
                padding: '30px',
                borderRadius: '12px',
                minHeight: '350px',
                display: 'flex',
                flexDirection: 'column',
                color: '#F2F0E6',
                transition: 'transform 0.3s ease',
                borderLeft: '5px solid #F2F0E6',
                ':hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#F2F0E6',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#9E6E3C',
                  fontSize: '1.5rem'
                }}>🏭</div>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>For Corporates</h3>
                <ul style={{ 
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  flex: '1'
                }}>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ marginRight: '10px' }}>🛡️</span> 
                    <span>Source verified partners with compliance & ESG tracking</span>
                  </li>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ marginRight: '10px' }}>🌱</span> 
                    <span>Meet CSI/ESD goals with impact-proven suppliers</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ marginRight: '10px' }}>⚡</span> 
                    <span>Reduce procurement risk with real-time performance data</span>
                  </li>
                </ul>
              </div>
              
              {/* Column 4 */}
              <div style={{ 
                backgroundColor: '#754A2D',
                padding: '30px',
                borderRadius: '12px',
                minHeight: '350px',
                display: 'flex',
                flexDirection: 'column',
                color: '#F2F0E6',
                transition: 'transform 0.3s ease',
                borderLeft: '5px solid #D3D2CE',
                ':hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#D3D2CE',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#754A2D',
                  fontSize: '1.5rem'
                }}>🚀</div>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>For Accelerators</h3>
                <ul style={{ 
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  flex: '1'
                }}>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ marginRight: '10px' }}>🎯</span> 
                    <span>Identify cohort gaps and tailor support</span>
                  </li>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ marginRight: '10px' }}>📈</span> 
                    <span>Demonstrate program ROI with score improvements</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ marginRight: '10px' }}>💡</span> 
                    <span>Spot high-potential outliers for investor showcases</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div style={{ 
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            marginBottom: '60px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '80px',
              height: '80px',
              backgroundImage: 'url("https://www.transparentpng.com/thumb/hexagon/hexagon-pattern-png-5.png")',
              backgroundSize: 'contain',
              opacity: 0.1,
              zIndex: 0
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '80px',
              height: '80px',
              backgroundImage: 'url("https://www.transparentpng.com/thumb/hexagon/hexagon-pattern-png-5.png")',
              backgroundSize: 'contain',
              opacity: 0.1,
              zIndex: 0
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ 
                color: '#372C27', 
                fontSize: '2.2rem',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '40px'
              }}>
                How It Works
              </h2>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '40px',
                flexWrap: 'wrap'
              }}>
                <button 
                  onClick={() => setActiveTab('funding')}
                  style={{ 
                    backgroundColor: activeTab === 'funding' ? '#9E6E3C' : '#F2F0E6',
                    color: activeTab === 'funding' ? 'white' : '#372C27',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '30px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: activeTab === 'funding' ? '0 4px 15px rgba(158, 110, 60, 0.4)' : '0 4px 15px rgba(0,0,0,0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <span style={{
                    position: 'relative',
                    zIndex: 2
                  }}>BIG Score for Funding</span>
                  {activeTab === 'funding' && (
                    <span style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                      transform: 'rotate(45deg)',
                      zIndex: 1
                    }}></span>
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab('service')}
                  style={{ 
                    backgroundColor: activeTab === 'service' ? '#9E6E3C' : '#F2F0E6',
                    color: activeTab === 'service' ? 'white' : '#372C27',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '30px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: activeTab === 'service' ? '0 4px 15px rgba(158, 110, 60, 0.4)' : '0 4px 15px rgba(0,0,0,0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <span style={{
                    position: 'relative',
                    zIndex: 2
                  }}>BIG Score for Customer Service</span>
                  {activeTab === 'service' && (
                    <span style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                      transform: 'rotate(45deg)',
                      zIndex: 1
                    }}></span>
                  )}
                </button>
              </div>
              
              {activeTab === 'funding' ? (
                <div>
                  <h3 style={{ 
                    color: '#754A2D', 
                    fontSize: '1.7rem',
                    fontWeight: '700',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      width: '30px',
                      height: '30px',
                      backgroundColor: '#754A2D',
                      borderRadius: '6px',
                      marginRight: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F2F0E6',
                      fontSize: '1rem'
                    }}>1</span>
                    BIG Score for Funding
                  </h3>
                  <p style={{ 
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '45px'
                  }}>
                    The Fundability Score is a comprehensive measure of how ready an enterprise is to attract and secure funding. It evaluates key dimensions such as business strategy, financial strength, market clarity, traction, and governance. The score adapts to the SME's stage of growth — whether early, scaling, or mature — to ensure fair, relevant evaluation.
                  </p>
                  
                  <h4 style={{ 
                    color: '#9E6E3C',
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    marginBottom: '15px',
                    paddingLeft: '45px',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '30px',
                      height: '2px',
                      backgroundColor: '#9E6E3C'
                    }}></span>
                    Fundability Score Components
                  </h4>
                  
                  <div style={{ 
                    overflowX: 'auto',
                    marginBottom: '20px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    borderRadius: '12px'
                  }}>
                    <table style={{ 
                      width: '100%',
                      borderCollapse: 'collapse',
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}>
                      <thead>
                        <tr style={{ 
                          backgroundColor: '#9E6E3C',
                          color: 'white'
                        }}>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Category</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Description</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Early Stage</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Scaling</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Mature</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>1. Leadership Strength</td>
                          <td style={{ padding: '15px' }}>AI evaluation of uploaded leadership profiles</td>
                          <td style={{ padding: '15px' }}>14%</td>
                          <td style={{ padding: '15px' }}>8%</td>
                          <td style={{ padding: '15px' }}>4%</td>
                        </tr>
                        <tr style={{ backgroundColor: '#D3D2CE' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>2. Financial Readiness</td>
                          <td style={{ padding: '15px' }}>Existence of accounting/ERP system, books up-to-date and clean, Tax and VAT compliance results</td>
                          <td style={{ padding: '15px' }}>11%</td>
                          <td style={{ padding: '15px' }}>13%</td>
                          <td style={{ padding: '15px' }}>11%</td>
                        </tr>
                        {expandedTables.fundability && (
                          <>
                            <tr style={{ backgroundColor: '#F2F0E6' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>3. Financial Strength</td>
                              <td style={{ padding: '15px' }}>Profitability and revenue growth</td>
                              <td style={{ padding: '15px' }}>5%</td>
                              <td style={{ padding: '15px' }}>8%</td>
                              <td style={{ padding: '15px' }}>14%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#D3D2CE' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>4. Operational Strength & Operating Model Clarity</td>
                              <td style={{ padding: '15px' }}>Upload Operating Model (eg business model canvas) + Pitch Deck + Business Plan, + AI evaluation of operating Model</td>
                              <td style={{ padding: '15px' }}>10%</td>
                              <td style={{ padding: '15px' }}>8%</td>
                              <td style={{ padding: '15px' }}>8%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#F2F0E6' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>5. Pitch and Business Plan Evaluation - Problem Clarity</td>
                              <td style={{ padding: '15px' }}>AI evaluation of uploaded Pitch Deck &/ Business Plan</td>
                              <td style={{ padding: '15px' }}>7%</td>
                              <td style={{ padding: '15px' }}>5%</td>
                              <td style={{ padding: '15px' }}>3%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#D3D2CE' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>5. Pitch and Business Plan Evaluation - Solution Fit</td>
                              <td style={{ padding: '15px' }}>AI evaluation of uploaded Pitch Deck &/ Business Plan</td>
                              <td style={{ padding: '15px' }}>7%</td>
                              <td style={{ padding: '15px' }}>5%</td>
                              <td style={{ padding: '15px' }}>3%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#F2F0E6' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>5. Pitch and Business Plan Evaluation - Market Analysis</td>
                              <td style={{ padding: '15px' }}>AI evaluation of uploaded Pitch Deck &/ Business Plan</td>
                              <td style={{ padding: '15px' }}>4%</td>
                              <td style={{ padding: '15px' }}>6%</td>
                              <td style={{ padding: '15px' }}>7%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#D3D2CE' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>5. Pitch and Business Plan Evaluation - Competitive Landscape</td>
                              <td style={{ padding: '15px' }}>AI evaluation of uploaded Pitch Deck &/ Business Plan</td>
                              <td style={{ padding: '15px' }}>4%</td>
                              <td style={{ padding: '15px' }}>6%</td>
                              <td style={{ padding: '15px' }}>7%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#F2F0E6' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>5. Pitch and Business Plan Evaluation - Revenue Streams</td>
                              <td style={{ padding: '15px' }}>AI evaluation of uploaded Pitch Deck &/ Business Plan</td>
                              <td style={{ padding: '15px' }}>5%</td>
                              <td style={{ padding: '15px' }}>6%</td>
                              <td style={{ padding: '15px' }}>6%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#D3D2CE' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>5. Pitch and Business Plan Evaluation - Financial Projections</td>
                              <td style={{ padding: '15px' }}>AI evaluation of uploaded Pitch Deck &/ Business Plan</td>
                              <td style={{ padding: '15px' }}>4%</td>
                              <td style={{ padding: '15px' }}>6%</td>
                              <td style={{ padding: '15px' }}>7%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#F2F0E6' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>5. Pitch and Business Plan Evaluation - Traction</td>
                              <td style={{ padding: '15px' }}>AI evaluation of uploaded Pitch Deck &/ Business Plan</td>
                              <td style={{ padding: '15px' }}>6%</td>
                              <td style={{ padding: '15px' }}>9%</td>
                              <td style={{ padding: '15px' }}>5%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#D3D2CE' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>5. Pitch and Business Plan Evaluation - MVP Maturity</td>
                              <td style={{ padding: '15px' }}>AI evaluation of uploaded Pitch Deck &/ Business Plan</td>
                              <td style={{ padding: '15px' }}>6%</td>
                              <td style={{ padding: '15px' }}>6%</td>
                              <td style={{ padding: '15px' }}>6%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#F2F0E6' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>5. Pitch and Business Plan Evaluation - Investor IRR</td>
                              <td style={{ padding: '15px' }}>AI evaluation of uploaded Pitch Deck &/ Business Plan</td>
                              <td style={{ padding: '15px' }}>3%</td>
                              <td style={{ padding: '15px' }}>5%</td>
                              <td style={{ padding: '15px' }}>6%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#D3D2CE' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>6. Contract Evaluation</td>
                              <td style={{ padding: '15px' }}>Scope Clarity, Risk Allocation, Payment Terms, Growth Opportunity, Profitability</td>
                              <td style={{ padding: '15px' }}>3%</td>
                              <td style={{ padding: '15px' }}>5%</td>
                              <td style={{ padding: '15px' }}>6%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#F2F0E6' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>7. Governance</td>
                              <td style={{ padding: '15px' }}>Decision-Making Clarity, Policies & Controls, Board or Advisory Oversight, External Accountability, Conflict Resolution / Ethics, Separation of Duties</td>
                              <td style={{ padding: '15px' }}>3%</td>
                              <td style={{ padding: '15px' }}>4%</td>
                              <td style={{ padding: '15px' }}>6%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#D3D2CE' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>8. Impact Proof</td>
                              <td style={{ padding: '15px' }}>Are roles and responsibilities clearly assigned? Is leadership accountable? Existence of documented internal controls (e.g., procurement, finance, HR) Is there external input or advisory support for oversight? Are financial and operational approvals clearly structured? Are there anti-fraud, tax, and regulatory guidelines or monitoring mechanisms?</td>
                              <td style={{ padding: '15px' }}>6%</td>
                              <td style={{ padding: '15px' }}>4%</td>
                              <td style={{ padding: '15px' }}>3%</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <button 
                      onClick={() => toggleTable('fundability')}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#9E6E3C',
                        border: '1px solid #9E6E3C',
                        padding: '8px 20px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      {expandedTables.fundability ? 'Show Less' : 'Show More'}
                      <span style={{ 
                        marginLeft: '8px',
                        transform: expandedTables.fundability ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}>
                        ▼
                      </span>
                    </button>
                  </div>
                  
                  <h4 style={{ 
                    color: '#9E6E3C',
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    marginBottom: '15px',
                    paddingLeft: '45px',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '30px',
                      height: '2px',
                      backgroundColor: '#9E6E3C'
                    }}></span>
                    Scoring Rubric
                  </h4>
                  
                  <div style={{ 
                    overflowX: 'auto',
                    marginBottom: '20px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    borderRadius: '12px'
                  }}>
                    <table style={{ 
                      width: '100%',
                      borderCollapse: 'collapse',
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}>
                      <thead>
                        <tr style={{ 
                          backgroundColor: '#9E6E3C',
                          color: 'white'
                        }}>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Score</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Leadership Strength</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Financial Readiness</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Financial Strength</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>0</td>
                          <td style={{ padding: '15px' }}>No relevant experience; no diversity</td>
                          <td style={{ padding: '15px' }}>No financial documents uploaded; unclear or missing accounting system</td>
                          <td style={{ padding: '15px' }}>No cash flow data or financial ratios provided; business operating at a consistent loss</td>
                        </tr>
                        <tr style={{ backgroundColor: '#D3D2CE' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>1-2</td>
                          <td style={{ padding: '15px' }}>Limited experience; minimal diversity</td>
                          <td style={{ padding: '15px' }}>Uploaded outdated financials; ad hoc or spreadsheet-based systems; basic tax info only</td>
                          <td style={{ padding: '15px' }}>Irregular cash flow; minimal margins; signs of financial instability or high cost structure</td>
                        </tr>
                        {expandedTables.scoringRubric1 && (
                          <>
                            <tr style={{ backgroundColor: '#F2F0E6' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>3-4</td>
                              <td style={{ padding: '15px' }}>Strong core team with track record; some diversity/coachability</td>
                              <td style={{ padding: '15px' }}>Recent financials uploaded; basic accounting system (e.g., Wave, Zoho); fair tax record</td>
                              <td style={{ padding: '15px' }}>Positive cash flow or acceptable burn rate; decent margins; cost base partially optimized</td>
                            </tr>
                            <tr style={{ backgroundColor: '#D3D2CE' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>5</td>
                              <td style={{ padding: '15px' }}>Exceptional team (scaled startups before); diverse + mentorship sought</td>
                              <td style={{ padding: '15px' }}>Strong financial management (e.g., Xero, Sage); clean financial statements; tax & VAT fully compliant</td>
                              <td style={{ padding: '15px' }}>Strong, stable cash flow; healthy profit margins; lean cost structure; reserves to sustain operations</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <button 
                      onClick={() => toggleTable('scoringRubric1')}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#9E6E3C',
                        border: '1px solid #9E6E3C',
                        padding: '8px 20px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      {expandedTables.scoringRubric1 ? 'Show Less' : 'Show More'}
                      <span style={{ 
                        marginLeft: '8px',
                        transform: expandedTables.scoringRubric1 ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}>
                        ▼
                      </span>
                    </button>
                  </div>
                  
                  <div style={{ 
                    overflowX: 'auto',
                    marginBottom: '20px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    borderRadius: '12px'
                  }}>
                    <table style={{ 
                      width: '100%',
                      borderCollapse: 'collapse',
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}>
                      <thead>
                        <tr style={{ 
                          backgroundColor: '#9E6E3C',
                          color: 'white'
                        }}>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Score</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Operational Strength</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Problem Clarity</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Solution Fit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>0</td>
                          <td style={{ padding: '15px' }}>No operating model uploaded; unclear how the business works</td>
                          <td style={{ padding: '15px' }}>No clear articulation of the problem being solved</td>
                          <td style={{ padding: '15px' }}>No clear solution defined or not aligned to the problem</td>
                        </tr>
                        <tr style={{ backgroundColor: '#D3D2CE' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>1-2</td>
                          <td style={{ padding: '15px' }}>Vague or overly technical explanation of operations; low relevance to business type</td>
                          <td style={{ padding: '15px' }}>Vague problem statement; lacks urgency or real-world framing</td>
                          <td style={{ padding: '15px' }}>Basic idea shared; limited differentiation or depth</td>
                        </tr>
                        {expandedTables.scoringRubric2 && (
                          <>
                            <tr style={{ backgroundColor: '#F2F0E6' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>3-4</td>
                              <td style={{ padding: '15px' }}>Clear business model canvas or SOPs; some gaps in detail or delivery readiness</td>
                              <td style={{ padding: '15px' }}>Reasonable clarity, but may lack specificity or data</td>
                              <td style={{ padding: '15px' }}>Good product/service fit; addresses problem with workable model</td>
                            </tr>
                            <tr style={{ backgroundColor: '#D3D2CE' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>5</td>
                              <td style={{ padding: '15px' }}>Strong, well-structured operations document; lean, scalable, and tailored to the growth strategy</td>
                              <td style={{ padding: '15px' }}>Sharp, compelling articulation with clear urgency and supporting context</td>
                              <td style={{ padding: '15px' }}>Clear, validated solution with strong market fit and clear value proposition</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <button 
                      onClick={() => toggleTable('scoringRubric2')}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#9E6E3C',
                        border: '1px solid #9E6E3C',
                        padding: '8px 20px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      {expandedTables.scoringRubric2 ? 'Show Less' : 'Show More'}
                      <span style={{ 
                        marginLeft: '8px',
                        transform: expandedTables.scoringRubric2 ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}>
                        ▼
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 style={{ 
                    color: '#754A2D', 
                    fontSize: '1.7rem',
                    fontWeight: '700',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      width: '30px',
                      height: '30px',
                      backgroundColor: '#754A2D',
                      borderRadius: '6px',
                      marginRight: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F2F0E6',
                      fontSize: '1rem'
                    }}>2</span>
                    BIG Score for Customer Service
                  </h3>
                  <p style={{ 
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    paddingLeft: '45px'
                  }}>
                    This version of the BIG Score validates SMEs and ESG-focused organizations providing services to customers, ensuring transparency, reliability, and satisfaction.
                  </p>
                  
                  <h4 style={{ 
                    color: '#9E6E3C',
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    marginBottom: '15px',
                    paddingLeft: '45px',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '30px',
                      height: '2px',
                      backgroundColor: '#9E6E3C'
                    }}></span>
                    A. Traditional SMEs (Profit-Driven)
                  </h4>
                  <p style={{ 
                    fontStyle: 'italic',
                    color: '#754A2D',
                    marginBottom: '20px',
                    paddingLeft: '45px'
                  }}>
                    Weightings: Service quality > compliance > operational strength.
                  </p>
                  
                  <div style={{ 
                    overflowX: 'auto',
                    marginBottom: '20px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    borderRadius: '12px'
                  }}>
                    <table style={{ 
                      width: '100%',
                      borderCollapse: 'collapse',
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}>
                      <thead>
                        <tr style={{ 
                          backgroundColor: '#9E6E3C',
                          color: 'white'
                        }}>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Category</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Description</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Weighting</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Compliance</td>
                          <td style={{ padding: '15px' }}>SME legitimacy, legal compliance, licensing</td>
                          <td style={{ padding: '15px' }}>20%</td>
                        </tr>
                        {expandedTables.serviceTraditional && (
                          <>
                            <tr style={{ backgroundColor: '#D3D2CE' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>Reliability</td>
                              <td style={{ padding: '15px' }}>Financial and operational strength/health</td>
                              <td style={{ padding: '15px' }}>50%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#F2F0E6' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>Customer Love</td>
                              <td style={{ padding: '15px' }}>Real-time ratings and reviews from actual customers</td>
                              <td style={{ padding: '15px' }}>30%</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <button 
                      onClick={() => toggleTable('serviceTraditional')}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#9E6E3C',
                        border: '1px solid #9E6E3C',
                        padding: '8px 20px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      {expandedTables.serviceTraditional ? 'Show Less' : 'Show More'}
                      <span style={{ 
                        marginLeft: '8px',
                        transform: expandedTables.serviceTraditional ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}>
                        ▼
                      </span>
                    </button>
                  </div>
                  
                  <h4 style={{ 
                    color: '#9E6E3C',
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    marginBottom: '15px',
                    paddingLeft: '45px',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '30px',
                      height: '2px',
                      backgroundColor: '#9E6E3C'
                    }}></span>
                    B. Social Enterprises (Impact Driven)
                  </h4>
                  <p style={{ 
                    fontStyle: 'italic',
                    color: '#754A2D',
                    marginBottom: '20px',
                    paddingLeft: '45px'
                  }}>
                    Weightings: Impact delivery > stakeholder feedback > compliance.
                  </p>
                  
                  <div style={{ 
                    overflowX: 'auto',
                    marginBottom: '20px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    borderRadius: '12px'
                  }}>
                    <table style={{ 
                      width: '100%',
                      borderCollapse: 'collapse',
                      borderRadius: '12px',
                      overflow: 'hidden'
                    }}>
                      <thead>
                        <tr style={{ 
                          backgroundColor: '#9E6E3C',
                          color: 'white'
                        }}>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Category</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Description</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Weighting</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Compliance</td>
                          <td style={{ padding: '15px' }}>NGO legitimacy, legal compliance, licensing</td>
                          <td style={{ padding: '15px' }}>25%</td>
                        </tr>
                        {expandedTables.serviceSocial && (
                          <>
                            <tr style={{ backgroundColor: '#D3D2CE' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>Impact Proof</td>
                              <td style={{ padding: '15px' }}>Environmental and social responsibility practices, ESG compliance</td>
                              <td style={{ padding: '15px' }}>40%</td>
                            </tr>
                            <tr style={{ backgroundColor: '#F2F0E6' }}>
                              <td style={{ padding: '15px', fontWeight: '500' }}>Service Quality</td>
                              <td style={{ padding: '15px' }}>Reliability, consistency in service delivery, operational efficiency - Real-time ratings and reviews from actual customers</td>
                              <td style={{ padding: '15px' }}>35%</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <button 
                      onClick={() => toggleTable('serviceSocial')}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#9E6E3C',
                        border: '1px solid #9E6E3C',
                        padding: '8px 20px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      {expandedTables.serviceSocial ? 'Show Less' : 'Show More'}
                      <span style={{ 
                        marginLeft: '8px',
                        transform: expandedTables.serviceSocial ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}>
                        ▼
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Why BIG Score Works Section */}
          <div style={{ 
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            marginBottom: '60px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundImage: 'url("https://www.transparentpng.com/thumb/abstract/abstract-background-png-4.png")',
              backgroundSize: 'cover',
              opacity: 0.03,
              zIndex: 0
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ 
                color: '#372C27', 
                fontSize: '2.2rem',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '40px',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  bottom: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  backgroundColor: '#9E6E3C',
                  borderRadius: '2px'
                }}></span>
                Why the BIG Score Works
              </h2>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '30px',
                marginBottom: '40px',
                flexWrap: 'wrap'
              }}>
                <div style={{ 
                  backgroundColor: '#F2F0E6',
                  padding: '30px',
                  borderRadius: '12px',
                  width: '450px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '5px',
                    height: '100%',
                    backgroundColor: '#754A2D'
                  }}></div>
                  <h3 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    marginBottom: '25px',
                    color: '#754A2D'
                  }}>Traditional Due Diligence</h3>
                  <ul style={{ 
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'rgba(158, 110, 60, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px',
                        color: '#9E6E3C',
                        fontSize: '1.2rem'
                      }}>❌</div>
                      <span>Subjective opinions</span>
                    </li>
                    <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'rgba(158, 110, 60, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px',
                        color: '#9E6E3C',
                        fontSize: '1.2rem'
                      }}>❌</div>
                      <span>Static PDF reports</span>
                    </li>
                    <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'rgba(158, 110, 60, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px',
                        color: '#9E6E3C',
                        fontSize: '1.2rem'
                      }}>❌</div>
                      <span>Hidden criteria</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'rgba(158, 110, 60, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px',
                        color: '#9E6E3C',
                        fontSize: '1.2rem'
                      }}>❌</div>
                      <span>Manual processes</span>
                    </li>
                  </ul>
                </div>
                
                <div style={{ 
                  backgroundColor: '#9E6E3C',
                  padding: '30px',
                  borderRadius: '12px',
                  width: '450px',
                  color: '#F2F0E6',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '5px',
                    height: '100%',
                    backgroundColor: '#F2F0E6'
                  }}></div>
                  <h3 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    marginBottom: '25px'
                  }}>BIG Score Advantage</h3>
                  <ul style={{ 
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'rgba(242, 240, 230, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px',
                        color: '#F2F0E6',
                        fontSize: '1.2rem'
                      }}>✅</div>
                      <span>AI-driven objectivity</span>
                    </li>
                    <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'rgba(242, 240, 230, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px',
                        color: '#F2F0E6',
                        fontSize: '1.2rem'
                      }}>✅</div>
                      <span>Live score tracking</span>
                    </li>
                    <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'rgba(242, 240, 230, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px',
                        color: '#F2F0E6',
                        fontSize: '1.2rem'
                      }}>✅</div>
                      <span>Transparent weightings</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: 'rgba(242, 240, 230, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px',
                        color: '#F2F0E6',
                        fontSize: '1.2rem'
                      }}>✅</div>
                      <span>Blockchain-verified data</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#D3D2CE',
                padding: '30px',
                borderRadius: '12px',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '5px',
                  background: 'linear-gradient(90deg, #9E6E3C, #754A2D)'
                }}></div>
                <p style={{ 
                  fontStyle: 'italic',
                  fontSize: '1.3rem',
                  lineHeight: '1.8',
                  marginBottom: '15px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    fontSize: '4rem',
                    lineHeight: '1',
                    color: 'rgba(158, 110, 60, 0.1)',
                    zIndex: 0
                  }}>"</span>
                  The BIG Score helped us identify 3x more investable SMEs in half the time.
                  <span style={{
                    position: 'absolute',
                    bottom: '-40px',
                    right: '-20px',
                    fontSize: '4rem',
                    lineHeight: '1',
                    color: 'rgba(158, 110, 60, 0.1)',
                    zIndex: 0
                  }}>"</span>
                </p>
                <p style={{ 
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: '#754A2D',
                  position: 'relative',
                  zIndex: 1
                }}>— [Investor Name], [Fund]</p>
              </div>
            </div>
          </div>

          {/* Get Your BIG Score Section */}
          <div style={{ 
            backgroundColor: '#754A2D',
            padding: '80px 40px',
            borderRadius: '16px',
            textAlign: 'center',
            color: '#F2F0E6',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 15px 40px rgba(117, 74, 45, 0.4)',
            marginBottom: '60px'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundImage: 'url("https://www.transparentpng.com/thumb/abstract/abstract-pattern-png-5.png")',
              backgroundSize: 'cover',
              opacity: 0.05,
              zIndex: 0
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ 
                fontSize: '2.5rem',
                fontWeight: '800',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>Get Your BIG Score Today</h2>
              <p style={{ 
                fontSize: '1.3rem',
                maxWidth: '800px',
                margin: '0 auto 40px',
                lineHeight: '1.6'
              }}>
                Discover your organization's BIG Score and unlock growth and impact opportunities:
              </p>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '30px',
                marginBottom: '50px',
                flexWrap: 'wrap'
              }}>
                {[
                  { number: 1, title: "Onboard", desc: "Share basic docs (5 min)", icon: "📝" },
                  { number: 2, title: "Evaluate", desc: "AI reviews your profile and gives you a score", icon: "🤖" },
                  { number: 3, title: "Enhance", desc: "Get targeted improvement suggestions", icon: "📈" },
                  { number: 4, title: "Expand", desc: "Connect confidently with investors, corporates, and customers", icon: "🌍" }
                ].map((step, index) => (
                  <div key={index} style={{
                    width: '220px',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      backgroundColor: '#F2F0E6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 15px',
                      color: '#754A2D',
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <span style={{
                        position: 'absolute',
                        top: '5px',
                        left: '5px',
                        fontSize: '1.2rem',
                        opacity: 0.3
                      }}>{step.icon}</span>
                      {step.number}
                    </div>
                    <h3 style={{ 
                      fontWeight: '700',
                      fontSize: '1.3rem',
                      marginBottom: '10px',
                      color: '#F2F0E6'
                    }}>{step.title}</h3>
                    <p style={{ 
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      color: 'rgba(242, 240, 230, 0.9)'
                    }}>{step.desc}</p>
                  </div>
                ))}
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '30px',
                marginBottom: '40px',
                flexWrap: 'wrap'
              }}>
                <button style={{ 
                  backgroundColor: '#372C27',
                  color: 'white',
                  border: 'none',
                  padding: '18px 50px',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 1
                }}>
                  <span style={{
                    position: 'relative',
                    zIndex: 2
                  }}>Get Scored Now</span>
                  <span style={{
                    position: 'absolute',
                    top: '0',
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: '0.5s',
                    zIndex: 1
                  }}></span>
                </button>
                <button style={{ 
                  backgroundColor: '#F2F0E6',
                  color: '#372C27',
                  border: 'none',
                  padding: '18px 50px',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 1
                }}>
                  <span style={{
                    position: 'relative',
                    zIndex: 2
                  }}>See Sample Report</span>
                  <span style={{
                    position: 'absolute',
                    top: '0',
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(55, 44, 39, 0.1), transparent)',
                    transition: '0.5s',
                    zIndex: 1
                  }}></span>
                </button>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '40px',
                flexWrap: 'wrap',
                position: 'relative',
                zIndex: 1
              }}>
                <p style={{ 
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'rgba(242, 240, 230, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '10px'
                  }}>🏆</span>
                  "Backed by [Partner Logos]"
                </p>
                <p style={{ 
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'rgba(242, 240, 230, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '10px'
                  }}>📊</span>
                  "500+ SMEs scored"
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default BIGScorePage;