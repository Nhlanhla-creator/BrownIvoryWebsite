import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const BIGScorePage = () => {
  const [activeTab, setActiveTab] = useState('funding');

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
                    For: SMSEs seeking capital or social enterprises proving impact. The BIG Score for funding evaluates organizations based on their investment readiness, operational reliability, and ESG/impact alignment.
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
                    Weightings Focus: Financial viability, market traction, and scalability. Weightings Shift as You Grow.
                  </p>
                  
                  <div style={{ 
                    overflowX: 'auto',
                    marginBottom: '40px',
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
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Pre-Revenue</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Scaling</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Mature</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Data Sources</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Compliance</td>
                          <td style={{ padding: '15px' }}>15%</td>
                          <td style={{ padding: '15px' }}>20%</td>
                          <td style={{ padding: '15px' }}>25%</td>
                          <td style={{ padding: '15px' }}>Uploaded docs + govt APIs</td>
                        </tr>
                        <tr style={{ backgroundColor: '#D3D2CE' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Financial Health</td>
                          <td style={{ padding: '15px' }}>20%</td>
                          <td style={{ padding: '15px' }}>30%</td>
                          <td style={{ padding: '15px' }}>35%</td>
                          <td style={{ padding: '15px' }}>Xero/QuickBooks + projections</td>
                        </tr>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Operational Strength</td>
                          <td style={{ padding: '15px' }}>20%</td>
                          <td style={{ padding: '15px' }}>20%</td>
                          <td style={{ padding: '15px' }}>15%</td>
                          <td style={{ padding: '15px' }}>Team profiles + LinkedIn</td>
                        </tr>
                        <tr style={{ backgroundColor: '#D3D2CE' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Pitch Quality</td>
                          <td style={{ padding: '15px' }}>25%</td>
                          <td style={{ padding: '15px' }}>15%</td>
                          <td style={{ padding: '15px' }}>10%</td>
                          <td style={{ padding: '15px' }}>ChatGPT deck analysis</td>
                        </tr>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Impact Proof</td>
                          <td style={{ padding: '15px' }}>20%</td>
                          <td style={{ padding: '15px' }}>15%</td>
                          <td style={{ padding: '15px' }}>15%</td>
                          <td style={{ padding: '15px' }}>Sector benchmarks (Briter/AfDB)</td>
                        </tr>
                      </tbody>
                    </table>
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
                    B. Social Enterprises (Impact-Driven)
                  </h4>
                  <p style={{ 
                    fontStyle: 'italic',
                    color: '#754A2D',
                    marginBottom: '20px',
                    paddingLeft: '45px'
                  }}>
                    Weightings Focus: Impact metrics, sustainability, and community alignment. Weightings Favor Real-World Change:
                  </p>
                  
                  <div style={{ 
                    overflowX: 'auto',
                    marginBottom: '40px',
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
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Early-Stage</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Growing</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Mature</th>
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>What We Measure</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Impact Proof</td>
                          <td style={{ padding: '15px' }}>40%</td>
                          <td style={{ padding: '15px' }}>35%</td>
                          <td style={{ padding: '15px' }}>30%</td>
                          <td style={{ padding: '15px' }}>SDG alignment, beneficiary stories</td>
                        </tr>
                        <tr style={{ backgroundColor: '#D3D2CE' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Financial Sustainability</td>
                          <td style={{ padding: '15px' }}>15%</td>
                          <td style={{ padding: '15px' }}>25%</td>
                          <td style={{ padding: '15px' }}>30%</td>
                          <td style={{ padding: '15px' }}>Grant diversity, earned income %</td>
                        </tr>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Governance</td>
                          <td style={{ padding: '15px' }}>20%</td>
                          <td style={{ padding: '15px' }}>20%</td>
                          <td style={{ padding: '15px' }}>25%</td>
                          <td style={{ padding: '15px' }}>Board diversity, transparency</td>
                        </tr>
                        <tr style={{ backgroundColor: '#D3D2CE' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Community Roots</td>
                          <td style={{ padding: '15px' }}>25%</td>
                          <td style={{ padding: '15px' }}>20%</td>
                          <td style={{ padding: '15px' }}>15%</td>
                          <td style={{ padding: '15px' }}>Local partnerships, participatory design</td>
                        </tr>
                      </tbody>
                    </table>
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
                    marginBottom: '40px',
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
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Data Sources</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Compliance</td>
                          <td style={{ padding: '15px' }}>SME legitimacy, legal compliance, licensing</td>
                          <td style={{ padding: '15px' }}>20%</td>
                          <td style={{ padding: '15px' }}>Vendor management docs, Tax docs, certifications</td>
                        </tr>
                        <tr style={{ backgroundColor: '#D3D2CE' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Reliability</td>
                          <td style={{ padding: '15px' }}>Financial and operational strength/health</td>
                          <td style={{ padding: '15px' }}>50%</td>
                          <td style={{ padding: '15px' }}>SLAs, Team capacity</td>
                        </tr>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Customer Love</td>
                          <td style={{ padding: '15px' }}>Real-time ratings and reviews from actual customers</td>
                          <td style={{ padding: '15px' }}>30%</td>
                          <td style={{ padding: '15px' }}>Net Promoter Score, repeat business</td>
                        </tr>
                      </tbody>
                    </table>
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
                    marginBottom: '40px',
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
                          <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Data Sources</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Compliance</td>
                          <td style={{ padding: '15px' }}>NGO legitimacy, legal compliance, licensing</td>
                          <td style={{ padding: '15px' }}>25%</td>
                          <td style={{ padding: '15px' }}>NGO registration, audits</td>
                        </tr>
                        <tr style={{ backgroundColor: '#D3D2CE' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Impact Proof</td>
                          <td style={{ padding: '15px' }}>Environmental and social responsibility practices, ESG compliance</td>
                          <td style={{ padding: '15px' }}>40%</td>
                          <td style={{ padding: '15px' }}>Beneficiary testimonials, SDG reports</td>
                        </tr>
                        <tr style={{ backgroundColor: '#F2F0E6' }}>
                          <td style={{ padding: '15px', fontWeight: '500' }}>Service Quality</td>
                          <td style={{ padding: '15px' }}>Reliability, consistency in service delivery, operational efficiency - Real-time ratings and reviews from actual customers</td>
                          <td style={{ padding: '15px' }}>35%</td>
                          <td style={{ padding: '15px' }}>Partner/corporate ratings</td>
                        </tr>
                      </tbody>
                    </table>
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